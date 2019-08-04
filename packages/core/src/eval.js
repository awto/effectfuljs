import { Tag, auto, sysId, emitConst, scope } from "./kit";

/**
 * If the code is an argument of `eval` this injects context variables refs
 */
export function substVars(si) {
  const s = auto(si);
  const ctx = s.opts.evalCtx;
  if (!ctx) return s;
  const opts = s.opts;
  if (!opts.contextState)
    throw s.error("`eval` requires `contextState` option");
  const varField = opts.varStorageField;
  const name = opts.closureStorageField || opts.varStorageField || "$$";
  return _injectCtx();
  function* _injectCtx(ctxSym) {
    for (const i of s) {
      if (i.enter) {
        if (
          i.type === Tag.Identifier &&
          ctxSym &&
          i.value.sym &&
          !i.value.sym.declScope
        ) {
          const info = ctx[i.value.sym.orig];
          if (info) {
            const [prop, depth] = info;
            yield s.enter(i.pos, Tag.MemberExpression);
            if (varField) yield s.enter(Tag.object, Tag.MemberExpression);
            for (let i = 0; i < depth; ++i)
              yield s.enter(Tag.object, Tag.MemberExpression);
            yield s.tok(Tag.object, Tag.Identifier, { sym: ctxSym });
            for (let i = 0; i < depth; ++i) {
              yield s.tok(Tag.property, Tag.Identifier, { node: { name } });
              yield* s.leave();
            }
            if (varField) {
              yield s.tok(Tag.property, Tag.Identifier, {
                node: { name: varField }
              });
              yield* s.leave();
            }
            yield s.tok(Tag.property, Tag.Identifier, { node: { name: prop } });
            yield* s.leave();
            s.close(i);
            continue;
          }
        } else if (i.value.func) {
          yield i;
          let nextCtx = ctxSym;
          if (!ctxSym) {
            nextCtx = i.value.paramSyms[0];
            nextCtx.strict = false;
          }
          yield* _injectCtx(nextCtx);
          continue;
        }
      }
      yield i;
    }
  }
}

/** for each `eval` call calculates its scope description */
export function prepare(si) {
  const s = auto(si);
  const root = s.first.value;
  if (!s.opts.injectEvalCtx) return s;
  if (!s.opts.injectFuncMeta && !s.opts.injectModuleMeta)
    throw s.error(`"injectEvalCtx" requires "injectFuncMeta"`);
  if (s.opts.closureShortcuts !== false)
    throw s.error(`"injectEvalCtx" doesn't work with "closureShortcuts"`);
  const loc = root.node && root.node.program && root.node.program.loc;
  if (!loc) return s;
  const stack = [];
  let tup;
  const evalCtx = root.evalCtxSym;
  return _injectScopeInfo(s);
  function* _injectScopeInfo(sw) {
    for (const i of sw) {
      if (i.enter && tup) {
        if (i.type === Tag.CallExpression && i.value.node && i.value.node.loc) {
          const callee = s.cur();
          if (
            callee.type === Tag.Identifier &&
            callee.value.sym &&
            callee.value.sym.declScope == null &&
            callee.value.sym.orig === "eval"
          ) {
            yield i;
            yield* _injectScopeInfo(s.one());
            yield s.peel();
            yield* _injectScopeInfo(s.sub());
            yield _emitScope(i);
            yield* s.leave();
            continue;
          }
        }
        if (evalCtx && i.type === Tag.Identifier && evalCtx === i.value.sym) {
          yield _emitScope(i);
          s.close(i);
          continue;
        }
      }
      if (i.value.func) {
        if (i.enter) {
          stack.push(i.value);
          tup = i.value.scopeMeta = [];
        }
        if (i.leave) {
          stack.pop();
          tup = stack.length && stack[stack.length - 1].scopeMeta;
        }
      }
      yield i;
    }
    function _emitScope(i) {
      const id = tup.length;
      const scope = getScope(i.value.node.loc);
      const meta = {
        value: i.value,
        scope,
        node: []
      };
      tup.push(meta);
      return s.tok(Tag.push, Tag.NumericLiteral, { node: { value: id } });
    }
    function getScope(nodeLoc) {
      let current;
      for (const root of stack) {
        let rootLoc = root.node.loc;
        /** some babel passes break location, trying to recover,
         * but this needs something better
         */
        if (!rootLoc) {
          const { body } = root.node;
          if (body) {
            rootLoc = body.loc;
            if (!rootLoc) {
              const block = body.body;
              if (block && Array.isArray(block)) {
                const locs = block.map(i => i.loc).filter(Boolean);
                if (!locs.length)
                  rootLoc = {
                    start: locs.start,
                    end: locs.end
                  };
              }
            }
          }
        }
        if (!rootLoc) return null;
        const memo = root.scopeMemo || (root.scopeMemo = new Map());
        const scopeStack = [];
        for (const j of root.scopeDecls) {
          if (!j.decl || !j.strict || !j.decl.value.node.loc) continue;
          const range = {
            ...((j.declRange && j.declRange.node && j.declRange.node.loc) ||
              loc)
          };
          if (!j.unordered) {
            const decl = j.decl.value.node.loc;
            range.line = decl.line;
            range.column = decl.column;
          }
          if (
            (nodeLoc.start.line > range.start.line ||
              (nodeLoc.start.line === range.start.line &&
                nodeLoc.start.column > range.start.column)) &&
            (nodeLoc.end.line < range.end.line ||
              (nodeLoc.end.line === range.end.line &&
                nodeLoc.end.column < range.end.column))
          )
            scopeStack.push({ loc: range.start, sym: j });
        }
        scopeStack.sort((a, b) => {
          const l = a.loc.line - b.loc.line;
          if (l === 0) return a.loc.column - b.loc.column;
          return l;
        });
        const vars = {};
        for (const j of scopeStack) vars[j.sym.orig] = j.sym;
        const hash = Object.values(vars)
          .map(i => i.id)
          .join();
        let descr = memo.get(hash);
        if (!descr) {
          memo.set(hash, (descr = { vars, parent: current }));
        } else if (!descr.sym) {
          descr.sym = scope.newSym("v_");
        }
        current = descr;
      }
      return current;
    }
  }
}

/** injects scope descriptions into meta arguments */
export function injectMeta(si) {
  const s = auto(si);
  if (!s.opts.injectEvalCtx) return s;
  const root = s.first.value;
  const decls = root.memoVars || (root.memoVars = new Map());
  for (const i of s.first.value.scopes) {
    if (i.scopeMemo) {
      for (const descr of i.scopeMemo.values()) {
        const expr = scopeExpr(descr);
        const { sym } = descr;
        if (sym) {
          decls.set(sym, [...emitConst(Tag.init, expr)]);
          descr.expr = sym;
        } else descr.expr = expr;
      }
    }
  }
  for (const i of s.first.value.scopes) {
    if (i.scopeMeta && i.metaArgs) {
      const tup = [];
      for (const j of i.scopeMeta) {
        if (j.scope) j.node.unshift(j.scope.expr);
        tup.push(j.node);
      }
      i.metaArgs[50] = [...emitConst(Tag.push, tup)];
    }
  }
  function scopeExpr({ vars, parent }) {
    const props = {};
    for (const name in vars) {
      const sym = vars[name];
      props[name] = sym.fieldName || sym.name;
    }
    const parExpr = parent && (parent.sym || scopeExpr(parent));
    return [props, parExpr || null];
  }
  return s;
}

/** Replaces global `eval` with `eval` RT operation */
export function wrap(si) {
  const s = auto(si);
  if (!s.opts.evalWrapArg) return s;
  const sym = sysId(s.opts.evalWrapArg);
  return _replace();
  function* _replace() {
    for (const i of s.sub()) {
      if (
        i.enter &&
        i.pos === Tag.callee &&
        i.type === Tag.Identifier &&
        i.value.sym &&
        !i.value.sym.declScope &&
        i.value.sym.orig === "eval"
      ) {
        yield* s.copy(i);
        for (const j of s) {
          yield j;
          if (j.pos === Tag.arguments) break;
        }
        const lab = s.label();
        yield s.enter(Tag.push, Tag.CallExpression);
        yield s.tok(Tag.callee, Tag.Identifier, { sym });
        yield s.enter(Tag.arguments, Tag.Array);
        yield* s.sub();
        yield* lab();
        continue;
      }
      yield i;
    }
  }
}
