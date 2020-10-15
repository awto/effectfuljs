import * as Kit from "./kit";
import * as path from "path";
import config from "./config";
import * as Ctx from "./context";
import { regId } from "./dom";

const { Tag, next } = Kit;
export { parentScope };

export const sysSyms = new Map();

export function prepare(root) {
  Ctx.root = root;
  for (const i of sysSyms.values()) i.hasRead = false;
  root.ctxSym = newSym("");
  root.localsSym = newSym("l");
  root.patSym = newSym("p");
  root.nsSym = newSym(config.ns || "M");
  root.modSym = newSym("m");
  root.nextId = root.prevId = root;
  root.ctxSym.frameLocal = root.patSym.frameLocal = root.localsSym.frameLocal = true;
  index(root);
  assignSym(root);
  funcSyms();
}

export const ASYNC_FUNCTION_FLAG = 1;
export const GENERATOR_FUNCTION_FLAG = 1 << 1;
export const ARROW_FUNCTION_FLAG = 1 << 2;
export const HAS_THIS_FLAG = 1 << 3;
export const HAS_ARGUMENTS_FLAG = 1 << 4;
export const FILE_TOP_LEVEL_FLAG = 1 << 5;
export const BLACKBOX_FLAG = 1 << 7;
export const SLOPPY_FLAG = 1 << 8;
export const HAS_FUNCTION_SENT_FLAG = 1 << 9;
export const HAS_DICTIONARY_SCOPE_FLAG = 1 << 10;
export const ASYNC_OR_GENERATOR_FUNCTION_FLAG =
  ASYNC_FUNCTION_FLAG | GENERATOR_FUNCTION_FLAG;
export const PLAIN_FUNCTION_FLAG = 0;

export const HAS_EH_BRK_FLAG = 1;
export const EXPR_BRK_FLAG = 1 << 1;
export const STMT_BRK_FLAG = 1 << 2;
export const DEBUGGER_STMT_BRK_FLAG = 1 << 3;
export const EXIT_BRK_FLAG = 1 << 4;
export const EMPTY_BRK_FLAG = 1 << 5;

/**
 * splits a single doc into a doc for each function
 *  - `funcDef` - the new function's doc
 *  - `funcPos` - from the own function's doc into its original node
 */
export function split() {
  eraseFuncDecls();
  const fileRoot = Ctx.root;
  const { ctxSym, firstChild: file } = fileRoot;
  for (let i = file; i; i = i.nextFunc) {
    i.root = fileRoot;
    i.eff = false;
    i.brkFlags = 0;
    const { node } = i;
    if (!node.loc) node.loc = Kit.approxLoc(i);
    const root = Kit.tok(Tag.root, Tag.Root, node);
    root.origFunc = i;
    root.module = i.root;
    const { generator, async } = node;
    let flags = i.flags;
    if (i.type === Tag.ArrowFunctionExpression) {
      flags |= ARROW_FUNCTION_FLAG;
    } else if (i.type === Tag.File) {
      flags |= FILE_TOP_LEVEL_FLAG;
      if (config.evalContext) flags |= ARROW_FUNCTION_FLAG;
    }
    if (async) flags |= ASYNC_FUNCTION_FLAG;
    if (generator) {
      root.needsResFrame = true;
      flags |= GENERATOR_FUNCTION_FLAG;
    } else {
      root.needsResFrame = true;
    }
    if (config.blackbox) flags |= BLACKBOX_FLAG;
    i.flags = flags;
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
    const func = i.parentFunc;
    for (let i = func; i; i = i.parentFunc) {
      i.flags |= HAS_THIS_FLAG;
      if (i.type !== Tag.ArrowFunctionExpression) break;
    }
    Kit.replace(i, Kit.memExpr(i.pos, ctxSym, "self"));
  }
  for (let i = fileRoot.nextNewTarget; i !== fileRoot; i = i.nextNewTarget)
    Kit.replace(i, Kit.memExpr(i.pos, ctxSym, "newTarget"));
  for (
    let i = fileRoot.nextArgumentsExpression;
    i !== fileRoot;
    i = i.nextArgumentsExpression
  ) {
    const func = i.parentFunc;
    for (let i = func; i; i = i.parentFunc) {
      i.flags |= HAS_ARGUMENTS_FLAG;
      if (i.type !== Tag.ArrowFunctionExpression) break;
    }
    Kit.replace(i, Kit.memExpr(i.pos, ctxSym, "args"));
  }
  for (
    let i = fileRoot.nextFunctionSentExpression;
    i !== fileRoot;
    i = i.nextFunctionSentExpression
  ) {
    i.parentFunc.flags |= HAS_FUNCTION_SENT_FLAG;
    Kit.replace(i, Kit.memExpr(i.pos, ctxSym, "sent"));
  }
  funcConstrs();
}

/** runs `func` for each sub-function */
export function forEach(func) {
  for (let i = Ctx.root.firstChild; i; i = i.nextFunc) func(i.funcDef);
}

let symNum = 0;

export function newSym(name) {
  if (!name) name = "";
  const num = ++symNum;
  const res = {
    name,
    orig: name,
    id: `${name}_${num}`,
    fieldName: null,
    strict: false,
    bound: true,
    unordered: false,
    extDepth: 0,
    decl: null,
    block: null,
    func: null,
    num,
    emitConstMethod: emitSym,
    capt: false,
    hasRead: false,
    hasWrite: false,
    singleWrite: false,
    scope: null,
    rhs: null,
    varSym: null,
    frameLocal: false,
    temp: false,
    param: false,
    metaArgs: null
  };
  res.varSym = res;
  return res;
}

/** gets runtime symbol for a runtime name */
export function sysSym(name) {
  let res = sysSyms.get(name);
  if (res != null) return res;
  sysSyms.set(name, (res = newSym(name)));
  res.strict = true;
  res.lib = true;
  res.name = `$${name}`;
  res.nsDefault = false;
  res.hasRead = false;
  return res;
}

export function sysId(pos, sym) {
  // return Kit.memExpr(pos, Ctx.root.nsSym, sym.orig);
  sym.hasRead = true;
  return Kit.id(pos, sym);
}

export function id(pos, sym, scope) {
  const tok = Kit.id(pos, sym);
  regId(tok);
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
  const { ctxSym, firstChild: file } = Ctx.root;
  for (let i = file; i; i = i.nextFunc) {
    if (i.type !== Tag.File) {
      const constr = Kit.node(i.pos, Tag.CallExpression);
      Kit.append(constr, Kit.id(Tag.callee, i.metaSym));
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
    ? path.basename(config.filename /*, path.extname(config.filename)*/)
    : "module";
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
      if (i.type === Tag.FunctionExpression) idSym.bound = idSym.hasRead;
      if (name[0] === "$") reservedSyms.add(name);
    } else {
      if (i === file) {
        idSym = newSym(moduleName);
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
      for (let i of reservedSyms)
        if (i.substr(0, len) === safePrefix) continue up;
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
      const funAssign = assign(Tag.expression);
      Kit.copyMeta(i, funAssign);
      i.type = Tag.FunctionExpression;
      i.pos = Tag.right;
      Kit.detach(idTok);
      Kit.detach(i);
      Kit.append(funAssign, id(Tag.left, idSym, parentScope(i)));
      Kit.append(funAssign, i);
      Kit.append(expr, funAssign);
      if (lastHoisted) {
        Kit.insertAfter(lastHoisted, expr);
      } else {
        let next = block.firstChild;
        if (next.pos !== Tag.body) next = next.nextSibling;
        Kit.prepend(next, expr);
      }
      block.lastHoisted = expr;
    }
  }
}

export function replaceRhs(from, to) {
  from.replaceTo = to;
  if (from.parent) Kit.replace(from, to);
  const { cfgItem } = from;
  if (cfgItem && cfgItem.doc === from) {
    cfgItem.doc = to;
    to.cfgItem = cfgItem;
  }
  if (!to.refDoc) to.refDoc = from.refDoc || from;
  return to;
}

/** replaces variable identifiers with getters of its context object */
export function injectVarGetters() {
  const root = Ctx.root;
  const globalsEnv = config.expGlobalsEnv;
  if (config.expInlineCalls) {
    for (let i = root.firstChild; i; i = i.nextFunc) {
      let varCount = i.scopeDecls.size + i.symScopePool.varCount;
      for (const j of i.params) j.index = ++varCount;
    }
  }
  for (let i = root.nextId; i !== root; i = i.nextId) {
    if (!i.parent && !i.cfgItem) continue;
    let sym = i.sym;
    if (!sym.bound) continue;
    if (sym === exportsSym) {
      replaceRhs(i, Kit.memExpr(i.pos, moduleSym, "exports"));
      continue;
    }
    if (!sym.decl) {
      if (globalsEnv && sym.fieldName) {
        const me = Kit.node(i.pos, Tag.MemberExpression);
        Kit.append(me, Kit.memExpr(Tag.object, root.ctxSym, "$g"));
        Kit.append(
          me,
          Kit.tok(Tag.property, Tag.Identifier, { name: sym.fieldName })
        );
        replaceRhs(i, me);
      }
      continue;
    }
    if (sym.varSym) {
      sym = sym.varSym;
      if (sym.frameLocal) continue;
    }
    replaceRhs(i, idExpr(i.pos, sym, i.scope));
  }
}

export function scopeExpr(pos, fromScope, sym) {
  const { localsSym } = Ctx.root;
  const toScope = sym.scope;
  let res = Kit.id(Tag.object, localsSym);
  let depth = sym.extDepth;
  for (let i = fromScope; i && i !== toScope; i = i.parentScope) ++depth;
  for (let i = 0; i < depth; ++i) {
    const memExpr = Kit.node(Tag.object, Tag.MemberExpression);
    Kit.append(memExpr, res);
    Kit.append(memExpr, Kit.num(Tag.property, 0));
    res = memExpr;
  }
  res.pos = pos;
  return res;
}

export function idExpr(pos, sym, fromScope) {
  if (sym.frameLocal) return Kit.id(pos, sym);
  if (sym.fieldName) return Kit.memExpr(pos, Ctx.root.ctxSym, sym.fieldName);
  const res = Kit.node(pos, Tag.MemberExpression);
  const memExpr = scopeExpr(Tag.object, fromScope, sym);
  Kit.append(res, memExpr);
  const { index } = sym;
  let num;
  if (isNaN(index)) {
    // eslint-disable-next-line no-console
    console.warn(
      `WARNING: UNDEFINDED identifier: "${config.filename} ${sym.name}"`,
      sym.decl.type
    );
    num = Kit.tok(Tag.property, Tag.Identifier, {
      name: `___UNDEF_____${sym.name}___`
    });
  } else {
    num = Kit.num(Tag.property, index);
  }
  Kit.insertAfter(memExpr, num);
  if (config.debug && sym.orig)
    num.node.trailingComments = [
      {
        type: "CommentBlock",
        value: sym.orig || sym.name
      }
    ];
  return res;
}

export const forInIteratorSym = sysSym("forInIterator");
export const iteratorSym = sysSym("iterator");
export const iteratorMSym = sysSym("iteratorM");
export const yieldSym = sysSym("yld");
export const yieldAGSym = sysSym("yldAG");
export const awaitSym = sysSym("awt");
export const iterErrSym = sysSym("iterErr");
export const iterErrUndefSym = sysSym("iterErrUndef");
export const iterFinSym = sysSym("iterFin");
export const iterNextSym = sysSym("iterNext");
export const pushScopeSym = sysSym("pushScope");
export const popScopeSym = sysSym("popScope");
export const copyScopeSym = sysSym("copyScope");
export const contextSym = sysSym("context");
export const shiftPropSym = sysSym("shiftSym");
export const callSym = sysSym("call");

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

export function index(root) {
  let lastBlock = null;
  let lastIdDecl = null;
  let idDecls = null;
  let lastLoop = null;
  let lastFunc = null;
  const loopsSubscopeAlways = config.loopsSubScopes === "always";
  root.declClause = root.parentClass = root.parentLoop = root.block = null;
  root.parentFunc = root.parentBlock = root.origParent = null;
  root.globals = new Map(globals);
  root.nextCallExpression = root.prevCallExpression = root;
  root.nextAssignmentExpression = root.prevAssignmentExpression = root;
  root.nextUpdateExpression = root.prevUpdateExpression = root;
  root.nextDeleteExpression = root.prevDeleteExpression = root;
  root.nextGetterExpression = root.prevGetterExpression = root;
  root.nextThisExpression = root.prevThisExpression = root;
  root.nextFunctionSentExpression = root.prevFunctionSentExpression = root;
  root.nextNewTarget = root.prevNewTarget = root;
  root.parentStmt = null;
  root.funcs = null;
  root.loops = null;
  for (let i = root.firstChild; i !== root; i = next(i)) {
    const parent = i.parent;
    const isFunc = parent.isFuncScope;
    const isLoop = !!parent.loopScope;
    let parentBlock = (i.parentBlock = parent.isBlockScope
      ? parent
      : parent.parentBlock);

    const parentFunc = (i.parentFunc = isFunc ? parent : parent.parentFunc);
    const parentLoop = (i.parentLoop = isFunc
      ? null
      : (i.parentLoop = isLoop ? parent : parent.parentLoop));
    i.parentLoop = parentLoop;
    i.parentMaybeScope = parentLoop || parentFunc;
    i.isFuncScope = i.isBlockScope = i.isScopeNode = false;
    i.scopeDecls = null;
    i.root = root;
    i.declClause =
      (i.pos === Tag.id && i.type !== Tag.PrivateName) ||
      i.pos === Tag.param ||
      i.pos === Tag.params ||
      i.pos === Tag.local
        ? i
        : parent.declClause;
    i.parentStmt =
      parent.isStmt || parent.type === Tag.VariableDeclarator
        ? parent
        : parent.parentStmt;
    let isBlockScope = false;
    let isExpr = false;
    let isStmt = false;
    switch (i.type) {
      case Tag.FunctionExpression:
      case Tag.ArrowFunctionExpression:
      case Tag.File:
      case Tag.FunctionDeclaration: {
        i.params = new Set();
        i.isFuncScope = true;
        isBlockScope = true;
        i.blockDecls = new Set();
        i.funcDecls = new Set();
        i.blockVars = new Map();
        i.isScopeNode = true;
        i.block = null;
        i.nextFunc = null;
        i.scopeDecls = new Set();
        i.flags = 0;
        if (lastFunc) lastFunc.nextFunc = i;
        else root.funcs = i;
        lastFunc = i;
        isBlockScope = true;
        break;
      }
      case Tag.ForInStatement:
      case Tag.ForOfStatement:
      case Tag.WhileStatement:
      case Tag.DoWhileStatement:
      case Tag.ForStatement: {
        i.loopScope = new Set();
        isBlockScope = true;
        i.isScopeNode = loopsSubscopeAlways;
        isStmt = true;
        if (lastLoop) lastLoop.nextLoop = i;
        else root.loops = i;
        lastLoop = i;
        break;
      }
      case Tag.BlockStatement:
        isBlockScope = !isLoop && !isFunc;
        break;
      case Tag.SwitchStatement:
        isBlockScope = true;
        break;
      case Tag.CatchClause:
        isBlockScope = true;
        isStmt = true;
        break;
      case Tag.VariableDeclarator:
        isStmt = true;
        break;
      case Tag.Identifier: {
        let isDecl = false;
        switch (i.pos) {
          case Tag.param:
          case Tag.id:
            isDecl = true;
            break;
          case Tag.push:
            if (parent.pos === Tag.params) isDecl = true;
            else isExpr = true;
            break;
          case Tag.property:
          case Tag.key:
            if (!parent.node.computed) break;
          default:
            isExpr = true;
        }
        if (isDecl) {
          i.nextIdDecl = null;
          if (lastIdDecl) lastIdDecl.nextIdDecl = i;
          else idDecls = i;
          lastIdDecl = i;
        } else if (isExpr) {
          regId(i);
        }
        i.sym = null;
        break;
      }
      case Tag.DirectiveLiteral:
        parentBlock.blockDirs.add(i.node.value);
        break;
      case Tag.ExpressionStatement:
        if (i.firstChild.type === Tag.StringLiteral)
          parentBlock.blockDirs.add(i.node);
        break;
      case Tag.MetaProperty:
        isExpr = true;
        switch (i.node.meta.name) {
          case "function":
            if (i.node.property.name === "sent") {
              const before = root.prevFunctionSentExpression;
              i.nextFunctionSentExpression = root;
              root.prevFunctionSentExpression = before.nextFunctionSentExpression = i;
              i.prevFunctionSentExpression = before;
            }
            break;
          case "new":
            if (i.node.property.name === "target") {
              const before = root.prevNewTarget;
              i.nextNewTarget = root;
              root.prevFunctionSentExpression = before.nextNewTarget = i;
              i.prevNewTarget = before;
            }
            break;
        }
        break;
      case Tag.NewExpression:
      case Tag.CallExpression: {
        isExpr = true;
        const before = root.prevCallExpression;
        i.eff = true;
        i.nextCallExpression = root;
        root.prevCallExpression = before.nextCallExpression = i;
        i.prevCallExpression = before;
        break;
      }
      case Tag.ThisExpression: {
        isExpr = true;
        const before = root.prevThisExpression;
        i.nextThisExpression = root;
        root.prevThisExpression = before.nextThisExpression = i;
        i.prevThisExpression = before;
        break;
      }
      case Tag.UpdateExpression: {
        isExpr = true;
        const before = root.prevUpdateExpression;
        i.nextUpdateExpression = root;
        root.prevUpdateExpression = before.nextUpdateExpression = i;
        i.prevUpdateExpression = before;
        break;
      }
      case Tag.AssignmentExpression: {
        isExpr = true;
        const before = root.prevAssignmentExpression;
        i.nextAssignmentExpression = root;
        root.prevAssignmentExpression = before.nextAssignmentExpression = i;
        i.prevAssignmentExpression = before;
        break;
      }
      case Tag.UnaryExpression: {
        isExpr = true;
        if (i.node.operator !== "delete") break;
        const before = root.prevDeleteExpression;
        i.nextDeleteExpression = root;
        root.prevDeleteExpression = before.nextDeleteExpression = i;
        i.prevDeleteExpression = before;
        break;
      }
      case Tag.YieldExpression:
      case Tag.AwaitExpression:
      case Tag.ArrayExpression:
      case Tag.ObjectExpression:
      case Tag.LogicalExpression:
      case Tag.ConditionalExpression:
      case Tag.BindExpression:
      case Tag.TaggedTemplateExpression:
      case Tag.BinaryExpression:
        isExpr = true;
        if (i.node.operator === "in") {
          const before = root.prevGetterExpression;
          i.nextGetterExpression = root;
          root.prevGetterExpression = before.nextGetterExpression = i;
          i.prevGetterExpression = before;
        }
        break;
      case Tag.MemberExpression: {
        isExpr = true;
        const pty = parent.type;
        if (
          (i.pos === Tag.left &&
            (pty === Tag.AssignmentExpression ||
              pty === Tag.ForInStatement ||
              pty === Tag.ForOfStatement)) ||
          pty === Tag.CallExpression ||
          pty === Tag.UpdateExpression ||
          (pty === Tag.UnaryExpression && parent.node.operator === "delete")
        )
          break;
        const before = root.prevGetterExpression;
        i.nextGetterExpression = root;
        root.prevGetterExpression = before.nextGetterExpression = i;
        i.prevGetterExpression = before;
        break;
      }
      case Tag.ImportDeclaration:
      case Tag.ExportNamedDeclaration:
      case Tag.ExportDefaultDeclaration:
      case Tag.ExportAllDeclaration:
        throw notSupported(
          i,
          "modules",
          "@babel/plugin-transform-modules-comminjs"
        );
      case Tag.AssignmentPattern:
      case Tag.ArrayPattern:
      case Tag.ObjectPattern:
      case Tag.RestElement:
        throw notSupported(
          i,
          "extended patterns",
          "@babel/plugin-transform-destructuring, @babel/plugin-transform-parameters"
        );
      case Tag.ClassPrivateMethod:
      case Tag.ClassPrivateProperty:
        throw notSupported(
          i,
          "private methods",
          "@babel/plugin-proposal-private-methods"
        );
      case Tag.ClassProperty:
        throw notSupported(
          i,
          "classes properties",
          "@babel/plugin-proposal-class-properties"
        );
      case Tag.ClassExpression:
      case Tag.ClassDeclaration:
        throw notSupported(i, "classes", "@babel/plugin-transform-classes");
      case Tag.ObjectMethod:
        throw notSupported(
          i,
          "shorthand properties",
          "@babel/plugin-transform-shorthand-properties"
        );
      case Tag.SpreadElement:
        throw notSupported(i, "spread", "@babel/plugin-transform-spread");
    }
    i.isBlockScope = isBlockScope;
    i.isExpr = isExpr;
    i.isStmt = isStmt;
    if (isBlockScope) {
      const blockDirs = new Set();
      i.blockDirs = blockDirs;
      i.blockDecls = new Set();
      i.blockVars = new Map();
      i.lastBlock = lastBlock;
      if (!lastBlock) root.firstBlock = i;
      lastBlock = i;
    }
    if (isExpr) i.brkFlags |= EXPR_BRK_FLAG;
  }
  root.lastBlock = lastBlock;
  root.lastIdDecl = lastIdDecl;
  root.idDecls = idDecls;
}

function notSupported(doc, name, plugins) {
  return Kit.error(
    `${name} syntax isn't implemented yet (this can be handled by "${plugins}") `,
    doc
  );
}

function emitSym(pos) {
  const res = Kit.tok(pos, Tag.Identifier, {});
  res.sym = this;
  return res;
}

export const undefinedSym = newSym("undefined");
export const globalSym = newSym("global");
export const argumentsSym = newSym("arguments");
export const ObjectSym = newSym("Object");
export const ArraySym = newSym("Array");
export const SymbolSym = newSym("Symbol");
export const evalSym = newSym("eval");
export const requireSym = newSym("require");
undefinedSym.strict = globalSym.strict = argumentsSym.strict = ObjectSym.strict = true;
ArraySym.strict = SymbolSym.strict = evalSym.strict = requireSym.strict = true;
export const pureSyms = {
  [PLAIN_FUNCTION_FLAG]: sysSym("ret"),
  [ASYNC_FUNCTION_FLAG]: sysSym("retA"),
  [GENERATOR_FUNCTION_FLAG]: sysSym("retG"),
  [ASYNC_OR_GENERATOR_FUNCTION_FLAG]: sysSym("retAG")
};
export const unhandledSyms = {
  [PLAIN_FUNCTION_FLAG]: sysSym("unhandled"),
  [ASYNC_FUNCTION_FLAG]: sysSym("unhandledA"),
  [GENERATOR_FUNCTION_FLAG]: sysSym("unhandledG"),
  [ASYNC_OR_GENERATOR_FUNCTION_FLAG]: sysSym("unhandledAG")
};
export const moduleSym = newSym("module");
export const exportsSym = newSym("exports");
export const raiseSym = sysSym("raise");

export const globals = [
  ["undefined", undefinedSym],
  ["global", globalSym],
  ["arguments", argumentsSym],
  ["Object", ObjectSym],
  ["Array", ArraySym],
  ["eval", evalSym],
  ["require", requireSym],
  ["module", moduleSym],
  ["exports", exportsSym],
  ["process", newSym("process")],
  ["window", newSym("window")]
];

function assignSym(root) {
  const { idDecls } = root;
  root.nextArgumentsExpression = root.prevArgumentsExpression = root;
  let lastScope = null;
  const fileGlobals = (root.globals = new Map(globals));
  const { evalContext, evalParams } = config;
  const file = root.funcs;
  const rootScopeDepth = config.scopeDepth;
  let loopsSubscopeClosure = config.loopsSubScopes === "closure";
  if (evalContext) {
    for (const i in evalContext) {
      const [index, depth] = evalContext[i];
      const sym = newSym(i);
      fileGlobals.set(i, sym);
      sym.scope = sym.decl = sym.declPos = file;
      sym.extDepth = rootScopeDepth - depth;
      sym.index = index;
    }
  }
  if (evalParams) {
    const fileParams = file.params;
    const decls = file.scopeDecls;
    const bdecls = file.blockDecls;
    for (const i of evalParams) {
      const sym = newSym(i);
      fileGlobals.set(i, sym);
      sym.scope = sym.decl = sym.declPos = file;
      fileParams.add(sym);
      sym.param = true;
      decls.add(sym);
      bdecls.add(sym);
    }
  }
  const sloppyProgram =
    file.node.program.sourceType === "script" &&
    !file.blockDirs.has("use strict");
  if ((file.sloppy = sloppyProgram)) file.flags |= SLOPPY_FLAG;
  for (let i = file.nextFunc; i; i = i.nextFunc) {
    if (
      (i.sloppy =
        i.parentClass == null &&
        i.parentFunc.sloppy &&
        !i.blockDirs.has("use strict"))
    )
      i.flags |= SLOPPY_FLAG;
  }
  for (let i = file; i; i = i.nextFunc) {
    if (lastScope) lastScope.nextScope = i;
    else root.scopes = i;
    lastScope = i;
    i.isScopeNode = true;
  }
  for (let i = idDecls; i; i = i.nextIdDecl) {
    const declClause = i.declClause;
    const declClauseParent = declClause.parent;
    let sym;
    let block;
    let unordered = true;
    switch (declClause.pos) {
      case Tag.local:
        block = root.firstChild.firstChild;
        break;
      case Tag.id:
        switch (declClauseParent.type) {
          case Tag.VariableDeclarator:
            const declaration = declClauseParent.parent.parent;
            if (declaration.node.kind === "var") {
              block = i.parentFunc;
            } else {
              unordered = false;
              block = i.parentBlock;
            }
            break;
          case Tag.ClassExpression:
          case Tag.FunctionExpression:
            block = declClauseParent;
            break;
          case Tag.ClassDeclaration:
          case Tag.FunctionDeclaration:
            block = declClauseParent.sloppy
              ? declClauseParent.parentFunc
              : declClauseParent.parentBlock;
            break;
        }
        break;
      case Tag.param:
        block = declClause.parentBlock;
        unordered = false;
        break;
      case Tag.params:
        block = declClause.parentFunc;
        unordered = false;
        break;
    }
    const name = i.node.name;
    if (block) {
      if (
        sloppyProgram &&
        evalParams == null &&
        unordered &&
        block.type === Tag.File
      ) {
        sym = fileGlobals.get(name);
        if (!sym) {
          sym = newSym(name, true);
          sym.strict = true;
          sym.fieldName = name;
          fileGlobals.set(name, sym);
        }
      } else {
        sym = block.blockVars.get(name);
        if (sym && !sym.unordered && !unordered)
          throw Kit.error(`Identifier ${name} has already been declared`, i);
        if (!sym) sym = newSym(name);
        block.blockVars.set(name, sym);
        sym.unordered = unordered;
        sym.decl = declClause;
        const func = (sym.func = declClause.parentFunc);
        func.funcDecls.add(sym);
        if ((sym.param = declClause.pos === Tag.params)) {
          func.params.add(sym);
          sym.param = true;
        }
        sym.block = block;
        block.blockDecls.add(sym);
      }
      i.sym = sym;
    }
  }
  for (let i = idDecls; i; i = i.nextIdDecl) {
    const { sym } = i;
    const parent = i.parent;
    if (i.pos === Tag.id && parent.type === Tag.VariableDeclarator) {
      sym.hasWrite = sym.singleWrite =
        i.nextSibling.pos === Tag.init && i.parentLoop == null;
      if (i.parentLoop) {
        const decl = parent.parent.parent;
        if (decl.pos === Tag.init && decl.node.kind !== "var") {
          const maybeLoop = decl.parent;
          if (maybeLoop.type === Tag.ForStatement)
            maybeLoop.loopScope.add(i.sym);
        }
      }
    } else sym.hasWrite = sym.singleWrite = true;
  }
  for (let i = root.nextId; i !== root; i = i.nextId) {
    const name = i.node.name;
    let sym;
    for (let j = i.parentBlock; j; j = j.parentBlock) {
      sym = j.blockVars.get(name);
      if (sym) break;
    }
    if (sym) {
      let read = false;
      let write = false;
      switch (i.pos) {
        case Tag.left:
          if (i.parent.type === Tag.AssignmentExpression) {
            write = true;
            read = i.parent.node.operator !== "=";
          } else read = true;
          break;
        case Tag.argument:
          if (i.parent.type === Tag.UpdateOperator) write = true;
          read = true;
          break;
        default:
          read = true;
      }
      const sameScope = i.parentFunc === sym.func;
      if (read) sym.hasRead = true;
      if (write) {
        if (!sym.hasWrite) {
          sym.hasWrite = true;
          sym.singleWrite = sameScope && i.parentLoop == null;
        } else sym.singleWrite = false;
      }
      if (!sameScope) sym.capt = true;
    } else {
      sym = fileGlobals.get(name);
      if (!sym) {
        sym = newSym(name, true);
        sym.strict = true;
        sym.fieldName = name;
        fileGlobals.set(name, sym);
      } else if (sym === argumentsSym) {
        const before = root.prevArgumentsExpression;
        i.nextArgumentsExpression = root;
        root.prevArgumentsExpression = before.nextArgumentsExpression = i;
        i.prevArgumentsExpression = before;
      }
      sym.hasWrite = sym.hasRead = true;
    }
    i.sym = sym;
  }
  for (let i = idDecls; i; i = i.nextIdDecl) {
    const { sym } = i;
    if (sym.capt && sym.singleWrite) sym.capt = false;
    if ((loopsSubscopeClosure && !sym.capt) || sym.unordered) continue;
    i.parentMaybeScope.isScopeNode = true;
  }
  for (let i = root.loops; i; i = i.nextLoop) {
    if (!i.isScopeNode) continue;
    i.scopeDecls = new Set();
    if (lastScope) lastScope.nextScope = i;
    else root.scopes = i;
    lastScope = i;
    i.parentScope = parentScope(i);
  }
  for (let i = root.funcs; i; i = i.nextFunc) i.parentScope = parentScope(i);
  for (let i = idDecls; i; i = i.nextIdDecl) {
    const sym = i.sym;
    const block = sym.block;
    if (!block) continue;
    const scope = block.isScopeNode ? block : parentScope(block);
    sym.scope = scope;
    scope.scopeDecls.add(sym);
    i.scope = parentScope(i);
    sym.declPos = i;
  }
  for (let i = root.nextId; i !== root; i = i.nextId) i.scope = parentScope(i);
  for (let i = idDecls; i; i = i.nextIdDecl) if (i.decl) regId(i);
  return root;
}

function parentScope(node) {
  let j;
  for (
    j = node.parentMaybeScope;
    j && !j.isScopeNode;
    j = j.parentMaybeScope
  ) {}
  return j;
}

export function regCall(i) {
  const { root } = Ctx;
  const before = root.prevCallExpression;
  i.eff = true;
  i.nextCallExpression = root;
  root.prevCallExpression = before.nextCallExpression = i;
  i.prevCallExpression = before;
  return i;
}

export function assign(pos) {
  const i = Kit.assign(pos);
  const { root } = Ctx;
  const before = root.prevAssignmentExpression;
  i.nextAssignmentExpression = root;
  root.prevAssignmentExpression = before.nextAssignmentExpression = i;
  i.prevAssignmentExpression = before;
  return i;
}

export function locFrameSym(root) {
  const sym = newSym("");
  const list = root.locBindSyms;
  sym.nextPat = list;
  sym.prevPat = list.prevPat;
  list.prevPat = list.prevPat.nextPat = sym;
  sym.frameLocal = true;
  Kit.setSymName(sym, root.localVars.varCount++, "_");
  return sym;
}

export function sysMemExpr(pos, sym, name) {
  const res = Kit.node(pos, Tag.MemberExpression);
  Kit.append(res, sysId(Tag.object, sym));
  Kit.append(res, Kit.tok(Tag.property, Tag.Identifier, { name }));
  return res;
}

const DEBUG_BRKS = config.debug;

export const brkSym = sysSym("brk");

export function brkExpr(i) {
  const loc = Kit.approxLoc(i);
  i.node.loc = loc;
  if (!loc) return null;
  const call = Kit.node(Tag.expression, Tag.CallExpression);
  call.eff = true;
  call.refDoc = i;
  call.brkFlags |= STMT_BRK_FLAG;
  const args = Kit.insertAfter(
    Kit.append(call, sysId(Tag.callee, brkSym)),
    Kit.arr(Tag.arguments, [])
  );
  if (DEBUG_BRKS) Kit.append(args, Kit.emitConst(Tag.push, Kit.locStr(loc)));
  return call;
}

export function isSysCall(i) {
  const callee = i.firstChild;
  return callee.type === Tag.Identifier && callee.sym && callee.sym.lib;
}
