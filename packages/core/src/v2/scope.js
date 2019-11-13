import * as Kit from "./kit";
import {
  prepare as prepareImpl,
  newSym as newSymImpl,
  undefinedSym,
  globalSym,
  argumentsSym,
  ObjectSym,
  ArraySym,
  SymbolSym,
  requireSym,
  evalSym,
  parentScope
} from "@effectful/transducers/v2/scope";
import * as path from "path";
import config from "./config";
import * as Ctx from "./context";

const { Tag, next } = Kit;
export { parentScope };

export function prepare(root) {
  Ctx.root = root;
  root.ctxSym = newSym("");
  root.patSym = newSym("p");
  root.nsSym = newSym(config.ns || "M");
  root.closSym = newSym("c");
  Kit.resetFieldInfo(root);
  prepareImpl(root);
  index(root);
  funcSyms();
}

export const ASYNC_FUNCTION_FLAG = 1;
export const GENERATOR_FUNCTION_FLAG = 2;
export const ARROW_FUNCTION_FLAG = 4;
export const HAS_THIS_FLAG = 8;
export const HAS_ARGUMENTS_FLAG = 16;
export const FILE_TOP_LEVEL_FLAG = 32;

/**
 * splits a single doc into a doc for each function
 *  - `funcDef` - the new function's doc
 *  - `funcPos` - from the own function's doc into its original node
 */
export function split() {
  eraseFuncDecls();
  const fileRoot = Ctx.root;
  const { ctxSym, patSym, firstChild: file } = fileRoot;
  const pureSym = sysSym("ret");
  const pureASym = sysSym("retA");
  const pureGSym = sysSym("retG");
  const pureAGSym = sysSym("retAG");
  for (let i = file; i; i = i.nextFunc) {
    i.root = fileRoot;
    const { node } = i;
    const root = Kit.tok(Tag.root, Tag.Root, node);
    root.ctxSym = ctxSym;
    root.patSym = patSym;
    root.origFunc = i;
    root.module = i.root;
    const { generator, async } = node;
    let flags =
      i.type === Tag.ArrowFunctionExpression
        ? ARROW_FUNCTION_FLAG
        : i.type === Tag.File
        ? FILE_TOP_LEVEL_FLAG
        : 0;
    if (async) flags |= ASYNC_FUNCTION_FLAG;
    if (generator) {
      root.needsResFrame = true;
      flags |= GENERATOR_FUNCTION_FLAG;
      if (async) {
        root.pureSym = pureAGSym;
      } else {
        root.pureSym = pureGSym;
      }
    } else {
      root.needsResFrame = true; //TODO: plain functions actually don't need it
      if (async) {
        root.pureSym = pureASym;
      } else {
        root.pureSym = pureSym;
      }
    }
    root.flags = flags;
    i.funcDef = root;
    const first = (root.firstChild = i.firstChild);
    let cur = first;
    do {
      cur.parent = root;
    } while ((cur = cur.nextSibling) !== first);
    i.firstChild = null;
  }

  for (
    let i = fileRoot.nextThisExpression;
    i !== fileRoot;
    i = i.nextThisExpression
  ) {
    const func = i.parentFunc.funcDef;
    func.flags |= HAS_THIS_FLAG;
    Kit.replace(i, Kit.memExpr(i.pos, ctxSym, "self"));
  }
  for (
    let i = fileRoot.nextArgumentsExpression;
    i !== fileRoot;
    i = i.nextArgumentsExpression
  ) {
    const func = i.parentFunc.funcDef;
    func.flags |= HAS_ARGUMENTS_FLAG;
    Kit.replace(i, Kit.memExpr(i.pos, ctxSym, "args"));
  }
  funcConstrs();
}

/** runs `func` for each sub-function */
export function forEach(func) {
  for (let i = Ctx.root.firstChild; i; i = i.nextFunc) func(i.funcDef);
}

export function newSym(name) {
  const res = newSymImpl(name);
  res.scope = null;
  res.init = null;
  res.rhs = null;
  res.phi = null;
  res.nextAssign = null;
  res.prevAssign = null;
  res.lib = false;
  res.nsDefault = false;
  res.bound = true;
  res.ordered = false;
  res.varSym = res;
  res.frameLocal = false;
  res.fieldName = null;
  res.temp = false;
  return res;
}

export const sysSyms = new Map();

/** gets runtime symbol for a runtime name */
export function sysSym(name) {
  let res = sysSyms.get(name);
  if (res != null) return res;
  sysSyms.set(name, (res = newSym(name, true)));
  res.lib = true;
  res.nsDefault = false;
  return res;
}

export function sysId(pos, sym) {
  return Kit.memExpr(pos, Ctx.root.nsSym, sym.orig);
}

export function id(pos, sym, scope) {
  const tok = Kit.id(pos, sym);
  if (sym.decl) {
    const root = sym.decl.root;
    tok.nextId = root.ids;
    root.ids = tok;
  }
  tok.prevRHS = sym.rhs;
  sym.rhs = tok;
  tok.scope = scope;
  Kit.invariant(scope);
  return tok;
}

export function ensureUnique(sym) {
  sym.name = Ctx.root.safePrefix + sym.orig;
}

/** injects functions constructors calls */
export function funcConstrs() {
  const { ctxSym, firstChild: file, closSym } = Ctx.root;
  for (let i = file; i; i = i.nextFunc) {
    if (i.type !== Tag.File) {
      const constr = Kit.node(i.pos, Tag.CallExpression);
      Kit.append(constr, Kit.memExpr(Tag.callee, closSym, i.metaSym.name));
      const args = Kit.arr(Tag.arguments);
      Kit.append(constr, args);
      const scopeId = Kit.id(Tag.push, ctxSym);
      Kit.append(args, scopeId);
      Kit.replace(i, constr);
    }
  }
}

/** calculates names for functions  */
export function funcSyms() {
  const { root } = Ctx;
  const { firstChild: file } = root;
  const moduleName = config.filename
    ? path.basename(config.filename, path.extname(config.filename))
    : "module";
  file.relativeName = path.relative(config.srcRoot, config.filename);
  let reservedSyms = new Set();
  for (let i of root.globals.keys()) if (i[0] === "$") reservedSyms.add(i);
  for (let i = file; i; i = i.nextFunc) {
    for (const { orig } of i.params)
      if (orig[0] === "$") reservedSyms.add(orig);
    const next = i.firstChild;
    let idSym;
    if (next.type === Tag.Identifier && next.pos === Tag.id) {
      idSym = next.sym;
      idSym.anonymous = false;
      const name = idSym.orig;
      if (name[0] === "$") reservedSyms.add(name);
    } else {
      if (i === file) {
        idSym = newSym(moduleName);
        // idSym.anonymous = true;
        idSym.name = moduleName;
      } else {
        idSym = newSym("f");
        idSym.anonymous = true;
      }
    }
    i.idSym = idSym;
    i.handlerSym = newSym(idSym.orig);
    i.metaSym = newSym(idSym.orig);
    const headName = idSym.orig;
    i.headSym = newSym(idSym.orig);
    if (headName[0] === "_" && !isNaN(headName[1]))
      i.headSym.name = "_" + headName;
  }
  Ctx.root.reservedSyms = reservedSyms.size ? reservedSyms : null;
  let safePrefix = "$";
  if (reservedSyms.size) {
    let num = 0;
    up: for (;;) {
      safePrefix = `$${num++}`;
      const len = safePrefix.length;
      for (let i of reservedSyms) {
        if (i.substr(0, len) === safePrefix) continue up;
      }
      break;
    }
  } else reservedSyms = null;
  Ctx.root.reservedSyms = reservedSyms;
  Ctx.root.safePrefix = safePrefix;
}

/** converts function declarations into function expressions */
export function eraseFuncDecls() {
  const file = Ctx.root.firstChild;
  for (let i = file; i; i = i.nextFunc) {
    if (i.type === Tag.FunctionDeclaration) {
      const idTok = i.firstChild;
      const idSym = idTok.sym;
      let block;
      for (
        block = i.parent;
        block &&
        block.type === Tag.Array &&
        (block.pos === Tag.body || block.pos === Tag.consequent);
        block = block.parent
      ) {}
      const lastHoisted = block.lastHoisted;
      const expr = Kit.node(i.pos, Tag.ExpressionStatement);
      const assign = Kit.assign(Tag.expression);
      i.type = Tag.FunctionExpression;
      i.pos = Tag.right;
      Kit.detach(idTok);
      Kit.detach(i);
      Kit.append(assign, id(Tag.left, idSym, parentScope(i)));
      Kit.append(assign, i);
      Kit.append(expr, assign);
      if (lastHoisted) {
        Kit.insertAfter(lastHoisted, expr);
      } else {
        block.lastHoisted = expr;
        let next = block.firstChild;
        if (next.pos !== Tag.body) next = next.nextSibling;
        Kit.prepend(next, expr);
      }
    }
  }
}

export function replaceRhs(from, to) {
  if (from.parent) Kit.replace(from, to);
  const { cfgItem } = from;
  if (cfgItem && cfgItem.doc === from) {
    cfgItem.doc = to;
    to.cfgItem = cfgItem;
  }
  return to;
}

/** replaces variable identifiers with getters of its context object */
export function injectVarGetters() {
  for (let i = Ctx.root.ids; i; i = i.nextId) {
    if (!i.parent && !i.cfgItem) continue;
    let sym = i.sym;
    if (!sym.decl) continue;
    if (sym.varSym) {
      sym = sym.varSym;
      if (sym.frameLocal) continue;
    }
    replaceRhs(i, idExpr(i.pos, sym, i.scope));
  }
}

export function scopeExpr(pos, fromScope, toScope) {
  const ctxSym = Ctx.root.ctxSym;
  let memExpr = Kit.node(pos, Tag.MemberExpression);
  let depth = 0;
  if (toScope && fromScope)
    for (let i = fromScope; i && i !== toScope; i = i.parentScope) {
      ++depth;
      const subExpr = Kit.node(Tag.object, Tag.MemberExpression);
      Kit.append(memExpr, subExpr);
      memExpr = subExpr;
    }
  let cur = Kit.id(Tag.object, ctxSym);
  Kit.append(memExpr, cur);
  for (let i = 0; i < depth; ++i) {
    cur = Kit.tok(Tag.property, Tag.Identifier, { name: "$$" });
    Kit.append(memExpr, cur);
    memExpr = memExpr.parent;
  }
  const prop = Kit.tok(Tag.property, Tag.Identifier, { name: "$" });
  Kit.append(memExpr, prop);
  return memExpr;
}

export function idExpr(pos, sym, fromScope) {
  if (sym.frameLocal) return Kit.id(Tag.left, sym);
  if (sym.fieldName)
    return Kit.memExpr(Tag.left, Ctx.root.ctxSym, sym.fieldName);
  const res = Kit.node(pos, Tag.MemberExpression);
  const memExpr = scopeExpr(Tag.object, fromScope, sym.scope);
  Kit.append(res, memExpr);
  const { name } = sym;
  Kit.invariant(name);
  const last = Kit.tok(Tag.property, Tag.Identifier, { name });
  Kit.insertAfter(memExpr, last);
  return res;
}

export const forInIteratorSym = sysSym("forInIterator");
export const iteratorSym = sysSym("iterator");
export const iteratorMSym = sysSym("iteratorM");
export const yieldSym = sysSym("yld");
export const awaitSym = sysSym("awt");
export const iterErrSym = sysSym("iterErr");
export const iterFinSym = sysSym("iterFin");
export const iterErrMSym = sysSym("iterErrM");
export const iterFinMSym = sysSym("iterFinM");
export const pushScopeSym = sysSym("pushScope");
export const popScopeSym = sysSym("popScope");
export { undefinedSym, argumentsSym, ObjectSym, ArraySym, SymbolSym };
export { globalSym, requireSym, evalSym };

export function tempSym(root, scope) {
  const sym = newSym();
  sym.temp = true;
  sym.releaseBlock = sym.lhs = sym.rhs = null;
  sym.scope = scope;
  sym.decl = root.origFunc;
  sym.prevBindId = root.bindIds;
  sym.usageBlock = null;
  root.bindIds = sym;
  return sym;
}

export function tempId(pos, sym, curScope) {
  return id(pos, sym, curScope);
}

export function assign(pos, file, node) {
  const res = Kit.assign(pos);
  if (node) {
    res.parentFunc = node.parentFunc;
    res.parentBlock = node.parentBlock;
    res.parentScope = node.parentScope;
  }
  const p = file.prevAssignmentExpression;
  res.nextAssignmentExpression = file;
  file.prevAssignmentExpression = p.nextAssignmentExpression = res;
  res.prevAssignmentExpression = p;
  return res;
}

export function index(root) {
  root.nextIdentifier = root.prevIdentifier = root;
  root.nextCallExpression = root.prevCallExpression = root;
  root.nextAssignmentExpression = root.prevAssignmentExpression = root;
  root.nextUpdateExpression = root.prevUpdateExpression = root;
  root.nextDeleteExpression = root.prevDeleteExpression = root;
  root.nextMemberExpression = root.prevMemberExpression = root;
  root.nextThisExpression = root.prevThisExpression = root;
  root.nextArgumentsExpression = root.prevArgumentsExpression = root;
  root.parentStmt = null;
  for (let i = root.firstChild; i !== root; i = next(i)) {
    switch (i.type) {
      case Tag.ImportDeclaration:
      case Tag.ExportNamedDeclaration:
      case Tag.ExportDefaultDeclaration:
      case Tag.ExportAllDeclaration:
        throw notSupported(i, "modules", "transform", "modules-commonjs");
      case Tag.AssignmentPattern:
      case Tag.ArrayPattern:
      case Tag.ObjectPattern:
      case Tag.RestElement:
        throw notSupported(
          i,
          "extended patterns",
          "transform",
          "destructuring"
        );
      case Tag.ClassPrivateMethod:
      case Tag.ClassPrivateProperty:
        throw notSupported(i, "private methods", "proposal");
      case Tag.ClassProperty:
        throw notSupported(i, "classes properties", "proposal");
      case Tag.ClassExpression:
      case Tag.ClassDeclaration:
        throw notSupported(i, "classes");
      case Tag.ObjectMethod:
        throw notSupported(i, "shorthand properties");
      case Tag.SpreadElement:
        throw notSupported(i, "spread");
    }
    const parent = i.parent;
    const pti = parent.typeInfo;
    const stmt = (i.parentStmt =
      pti.stmt || parent.type === Tag.VariableDeclarator
        ? parent
        : parent.parentStmt);
    const ti = i.typeInfo;
    if (ti.expr) {
      i.eff = false;
      i.brkKind = "e";
      if (stmt && !stmt.firstExpr) {
        i.firstInStmt = stmt;
        stmt.firstExpr = i;
      } else i.firstInStmt = null;
      switch (i.type) {
        case Tag.Identifier: {
          const { sym } = i;
          if (sym === argumentsSym) {
            const before = root.prevArgumentsExpression;
            i.nextArgumentsExpression = root;
            root.prevArgumentsExpression = before.nextArgumentsExpression = i;
            i.prevArgumentsExpression = before;
          } else {
            const before = root.prevIdentifier;
            i.nextIdentifier = root;
            root.prevIdentifier = before.nextIdentifier = i;
            i.prevIdentifier = before;
          }
          break;
        }
        case Tag.NewExpression:
        case Tag.CallExpression: {
          const before = root.prevCallExpression;
          i.eff = true;
          i.nextCallExpression = root;
          root.prevCallExpression = before.nextCallExpression = i;
          i.prevCallExpression = before;
          break;
        }
        case Tag.ThisExpression: {
          const before = root.prevThisExpression;
          i.nextThisExpression = root;
          root.prevThisExpression = before.nextThisExpression = i;
          i.prevThisExpression = before;
          break;
        }
        case Tag.UpdateExpression: {
          const before = root.prevUpdateExpression;
          i.nextUpdateExpression = root;
          root.prevUpdateExpression = before.nextUpdateExpression = i;
          i.prevUpdateExpression = before;
          break;
        }
        case Tag.AssignmentExpression: {
          const before = root.prevAssignmentExpression;
          i.nextAssignmentExpression = root;
          root.prevAssignmentExpression = before.nextAssignmentExpression = i;
          i.prevAssignmentExpression = before;
          break;
        }
        case Tag.UnaryExpression: {
          if (i.node.operator !== "delete") break;
          const before = root.prevDeleteExpression;
          i.nextDeleteExpression = root;
          root.prevDeleteExpression = before.nextDeleteExpression = i;
          i.prevDeleteExpression = before;
          break;
        }
      }
    } else if (ti.stmt) {
      i.firstExpr = null;
    }
  }
}

function notSupported(
  doc,
  name,
  plugin = "transform",
  pluginName = name.replace(/\s/g, "-")
) {
  return Kit.error(
    `${name} syntax isn't implemented yet (this can be handled by "@babel/plugin-${plugin}-${pluginName}") `,
    doc
  );
}
