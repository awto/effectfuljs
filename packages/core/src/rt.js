import * as Kit from "./kit";

const { Tag } = Kit;

const emptyMap = new Map();
const emptyArr = [];

/**
 * collects all ES or CommonJS imports into root's import field
 *
 *    type RootValue = RootValue & {imports:Map<string,
 *                                              {ns?:IdValue,
 *                                               locals?:Map<string,IdValue>}[]> }
 */
export function collectImports(si) {
  const sa = Kit.toArray(si);
  const root = sa[0].value;
  const s = Kit.auto(sa);
  root.hasESM = false;
  const imports = (root.imports = new Map());
  function reg(path, ns, locals) {
    let mods = imports.get(path);
    if (!mods) imports.set(path, (mods = []));
    mods.push({ ns, locals });
  }
  for (const i of s) {
    if (i.enter) {
      switch (i.type) {
        case Tag.AssignmentExpression:
          if (i.value.node.operator !== "=") break;
        case Tag.VariableDeclarator:
          const pat = s.take();
          if (pat.type !== Tag.Identifier) break;
          s.close(pat);
          const call = s.take();
          if (!call.type === Tag.CallExpression) break;
          const callee = s.cur();
          if (
            callee.type !== Tag.Identifier ||
            callee.value.node.name !== "require"
          )
            break;
          for (const i of s) if (i.enter && i.pos === Tag.arguments) break;
          const mod = s.cur();
          if (mod.type !== Tag.StringLiteral) break;
          reg(mod.value.node.value, pat.value);
          break;
        case Tag.ExportNamedDeclaration:
        case Tag.ExportDefaultDeclaration:
        case Tag.ExportAllDeclaration:
          root.hasESM = true;
          break;
        case Tag.ImportDeclaration:
          let ns, locals;
          root.hasESM = true;
          for (const i of s.one()) {
            if (i.enter) {
              switch (i.type) {
                case Tag.ImportDefaultSpecifier:
                case Tag.ImportNamespaceSpecifier:
                  ns = s.cur().value;
                  break;
                case Tag.ImportSpecifier:
                  if (!locals) locals = new Map();
                  const loc = s.take();
                  s.close(loc);
                  locals.set(loc.value, s.cur().value.node.name);
                  break;
              }
            }
          }
          const src = s.cur();
          Kit.invariant(src.type === Tag.StringLiteral);
          reg(src.value.node.value, ns, locals);
          break;
        case Tag.BlockStatement:
          Kit.skip(s.copy(i));
          break;
      }
    }
  }
  return sa;
}

/** collects all symbol with library ns */
export function collectUsages(s) {
  const sa = Kit.toArray(s);
  const root = sa[0].value;
  const rootNs = root.$ns;
  const mods = root.injectRT || emptyMap;
  const store = root.opts.contextMethodOps;
  const ctxns = root.opts.transform && root.contextSym;
  const { injectOps } = root.opts;
  const module = root.module || root;
  const copies =
    module.tmpOpsCopies || (injectOps && (module.tmpOpsCopies = new Map()));
  const spec = root.opts.contextMethodOpsSpec || {};
  for (const i of sa) {
    if (
      i.enter &&
      i.type === Tag.Identifier &&
      i.value.sym &&
      i.value.sym.lib
    ) {
      let { sym, ns } = i.value;
      const name = sym.orig;
      if (
        ns == null &&
        ((store && spec[name] !== false) || (store === false && spec[name]))
      )
        ns = ctxns;
      ns = ns || rootNs;
      i.value.ns = ns;
      const def = mods.get(ns);
      if (def) add(def, sym, ns);
    }
  }
  return sa;

  function add(def, sym, ns) {
    let copy;
    if (injectOps) {
      const descr = sym.injectOps || (sym.injectOps = injectOps[sym.orig]);
      if (descr) {
        copy = copies.get(sym);
        if (!copy) {
          copy = Kit.scope.newSym(sym.orig);
          copy.tmpCopyOf = sym;
          copy.injectOps = descr;
          copies.set(sym, copy);
        }
        if (descr.deps) {
          const deps = (descr.depsSyms = []);
          for (const j of descr.deps) {
            const sym = Kit.sysId(j);
            deps.push(add(def, sym, ns) || sym);
          }
        }
      }
    }
    def.usages.add(sym);
    return copy;
  }
}

/**
 * injects import from `require` options if it doesn't exist already
 * if option `inject` is true, will use `ns` as namespace parameter if
 * specified or some unique variable
 */
export function inject(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  const mods = root.injectRT;
  if (!mods || !mods.size) return s;
  const commonjs = s.opts.modules === "commonjs" || s.opts.modules === "cjs";
  const esDefault = s.opts.modules === "esDefault";
  const importBuf = [];
  const initBuf = [];
  const inlineBuf = [];
  const copies = root.tmpOpsCopies;
  for (const def of mods.values()) {
    let syms = def.usages;
    if (!syms.size) continue;
    let importNs = true;
    const { ns } = def;
    if (copies) {
      importNs = false;
      syms = [];
      for (const sym of def.usages) {
        const copy = copies.get(sym);
        if (copy) {
          const { injectOps } = copy;
          if (injectOps) {
            if (injectOps.init) {
              inlineBuf.push(
                ...s.toks(
                  Tag.push,
                  injectOps.init,
                  copy,
                  ns,
                  ...(injectOps.depsSyms || emptyArr)
                )
              );
              continue;
            }
            importNs = true;
            syms.push(copy);
            initBuf.push(
              ...s.toks(Tag.push, `var $I = $I.${sym.orig}`, copy, ns)
            );
            continue;
          }
          importNs = true;
          syms.push(sym);
        } else importNs = true;
      }
    }
    if (importNs) {
      importBuf.push(
        ...s.toks(
          Tag.push,
          commonjs
            ? `var $I = require("${def.module}")`
            : esDefault
            ? `^import $I from "${def.module}"`
            : `^import * as $I from "${def.module}"`,
          ns
        )
      );
    }
  }
  if (importBuf.length || initBuf.length || inlineBuf.length) return _inject();
  return s;
  function* _inject() {
    yield* Kit.fileBody(s);
    yield* importBuf;
    yield* initBuf;
    yield* inlineBuf;
    yield* s;
  }
}

/** replaces symbols with special meaning with their interpretation */
export function interpretLibSyms(si) {
  const s = Kit.auto(si);
  if (s.opts.nsStatic) return s;
  const root = s.first.value;
  const ns = root.$ns;
  return _interpretLibSyms();
  function* _interpretLibSyms() {
    for (const i of s) {
      if (
        i.enter &&
        i.type === Tag.Identifier &&
        i.pos !== Tag.property &&
        !i.value.decl &&
        i.value.sym &&
        i.value.sym.lib
      ) {
        const { sym } = i.value;
        const copies = root.tmpOpsCopies;
        if (copies) {
          const copy = copies.get(sym);
          if (copy) {
            i.value.sym = copy;
            yield i;
            continue;
          }
        }
        if (sym.nsDefault) {
          yield s.tok(i.pos, Tag.Identifier, { sym: ns });
        } else if (ns) {
          yield s.enter(i.pos, Tag.MemberExpression, { origSym: sym });
          yield s.tok(Tag.object, Tag.Identifier, {
            sym: ns,
            origOp: i.value.origOp
          });
          yield s.tok(Tag.property, Tag.Identifier, {
            sym,
            node: { name: sym.name }
          });
          yield* s.leave();
          s.close(i);
        } else yield i;
      } else yield i;
    }
  }
}

/**
 * Replaces global `eval` with `eval` RT operation
 */
export function replaceGlobals(si) {
  const s = Kit.auto(si);
  const { replaceGlobals: map } = s.opts;
  if (!map) return s;
  return _replace();
  function* _replace() {
    for (const i of s) {
      yield i;
      if (
        i.enter &&
        i.pos === Tag.callee &&
        i.type === Tag.Identifier &&
        i.value.sym &&
        !i.value.sym.declScope
      ) {
        let name = map[i.value.sym.orig];
        if (!name) continue;
        if (name === true) name = i.value.sym.orig;
        i.value.sym = Kit.sysId(name);
      }
    }
  }
}
