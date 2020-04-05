import { Tag } from "./types";
import * as C from "./core";

const { next } = C;

let symNum = 0;

function emitSym(pos) {
  const res = C.tok(pos, Tag.Identifier, {});
  res.sym = this;
  return res;
}

// String -> Sym
export function newSym(name, strict = false, decl = null) {
  if (!name) name = "";
  const num = ++symNum;
  return {
    name,
    orig: name,
    id: `${name}_${num}`,
    strict,
    decl,
    block: null,
    func: null,
    num,
    type: null,
    emitConstMethod: emitSym,
    useFuncs: null,
    hasRead: false
  };
}

export const undefinedSym = newSym("undefined", true);
export const globalSym = newSym("global", true);
export const argumentsSym = newSym("arguments", true);
export const ObjectSym = newSym("Object", true);
export const ArraySym = newSym("Array", true);
export const SymbolSym = newSym("Symbol", true);
export const evalSym = newSym("eval", true);
export const requireSym = newSym("require", true);

export const globals = [
  ["undefined", undefinedSym],
  ["global", globalSym],
  ["arguments", argumentsSym],
  ["Object", ObjectSym],
  ["Array", ArraySym],
  ["eval", evalSym],
  ["require", evalSym]
];

export function cloneSym(sym) {
  const res = newSym(sym.orig);
  res.decl = sym.decl;
  res.block = sym.block;
  res.func = sym.func;
  return res;
}

function parentFunc(value) {
  for (let i = value.parent; i; i = i.parent)
    if (i.typeInfo.funcScope) return i;
  return null;
}

export function prepare(root) {
  let lastBlock = null;
  let lastId = null;
  let ids = null;
  let lastIdDecl = null;
  let idDecls = null;
  let lastClass = null;
  let classes = null;
  let lastLoop = null;
  let lastScope = null;
  let lastFunc = null;
  root.declClause = root.parentClass = root.parentLoop = null;
  root.parentFunc = root.parentBlock = root.origParent = null;
  const fileGlobals = (root.globals = new Map(globals));
  let sloppyProgram;
  // TODO: traverse only needed tokens
  let i = root.firstChild;
  do {
    const parent = i.parent;
    const pti = parent.typeInfo;
    i.origParent = parent;
    i.parentBlock = pti.blockScope ? parent : parent.parentBlock;
    const parFunc = (i.parentFunc = pti.funcScope ? parent : parent.parentFunc);
    const parentLoop = (i.parentLoop = pti.funcScope
      ? null
      : (i.parentLoop = pti.loopScope ? parent : parent.parentLoop));
    i.parentMaybeScope = parentLoop || parFunc;
    i.parentClass = pti.classDecl ? parent : parent.parentClass;
    i.scopeNode = false;
    i.scopeDecls = null;
    i.root = root;
    const ti = i.typeInfo;
    if (
      (i.pos === Tag.id && i.type !== Tag.PrivateName) ||
      i.pos === Tag.param ||
      i.pos === Tag.params ||
      i.pos === Tag.local
    ) {
      i.declClause = i;
    } else {
      i.declClause = parent.declClause;
    }
    if (ti.blockScope) {
      const blockDirs = new Set();
      if (
        (i.pos === Tag.body || i.pos === Tag.program) &&
        parent &&
        parent.typeInfo.funcScope
      ) {
        i.blockDecls = parent.blockDecls;
        i.blockVars = parent.blockVars;
        parent.blockDirs = i.blockDirs;
        parent.block = i;
      } else {
        i.blockDecls = new Set();
        i.blockVars = new Map();
      }
      i.parentFunc = parentFunc(i);
      i.lastBlock = lastBlock;
      if (!lastBlock) root.firstBlock = i;
      lastBlock = i;
      i.blockDirs = blockDirs;
    }
    if (ti.funcScope) {
      i.blockDecls = new Set();
      i.funcDecls = new Set();
      i.params = new Set();
      i.blockVars = new Map();
      i.parentFunc = parentFunc(i);
      i.scopeNode = true;
      i.block = null;
      i.nextFunc = null;
      i.scopeDecls = new Set();
      if (lastFunc) lastFunc.nextFunc = i;
      else root.funcs = i;
      if (lastScope) lastScope.nextScope = i;
      else root.scopes = i;
      lastScope = lastFunc = i;
    }
    if (ti.loopScope) {
      if (lastLoop) lastLoop.nextLoop = i;
      lastLoop = i;
    }
    switch (i.type) {
      case Tag.Program:
        sloppyProgram = i.node.sourceType === "script";
        break;
      case Tag.ClassExpression:
      case Tag.ClassDeclaration:
        if (lastClass) lastClass.nextClass = i;
        else classes = i;
        lastClass = i;
        break;
      case Tag.Identifier:
        const fi = i.fieldInfo;
        if (fi.declVar) {
          i.nextIdDecl = null;
          if (lastIdDecl) lastIdDecl.nextIdDecl = i;
          else idDecls = i;
          lastIdDecl = i;
        } else if (fi.expr || fi.lval) {
          i.nextId = null;
          if (lastId) lastId.nextId = i;
          else ids = i;
          lastId = i;
        }
        i.sym = null;
        break;
      case Tag.DirectiveLiteral:
        i.parentBlock.blockDirs.add(i.node);
        break;
      case Tag.ExpressionStatement:
        if (i.firstChild.type === Tag.StringLiteral)
          i.parentBlock.blockDirs.add(i.node);
    }
  } while ((i = next(i)) !== root);
  for (let i = lastFunc; i; i = i.nextFunc) {
    i.sloppy =
      i.parentClass == null &&
      (i.parentFunc == null
        ? sloppyProgram
        : i.parentFunc.sloppy && !i.blockDirs.has("use strict"));
  }
  for (let i = idDecls; i; i = i.nextIdDecl) {
    const declClause = i.declClause;
    const declClauseParent = declClause.parent;
    let sym,
      block,
      unordered = true;
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
        break;
      case Tag.params:
        block = declClause.parentFunc;
        break;
    }
    const name = i.node.name;
    if (block) {
      sym = block.blockVars.get(name);
      if (sym && !(sym.unordered && unordered))
        throw C.error(`Identifier ${name} has already been declared`, i);
      if (!sym) sym = newSym(name);
      block.blockVars.set(name, sym);
      sym.unordered = unordered;
      sym.decl = declClause;
      const func = (sym.func = declClause.parentFunc);
      func.funcDecls.add(sym);
      if ((sym.param = declClause.pos === Tag.params)) func.params.add(sym);
      sym.block = block;
      block.blockDecls.add(sym);
      i.sym = sym;
    }
  }
  for (let i = ids; i; i = i.nextId) {
    const name = i.node.name;
    let sym;
    for (let j = i.parentBlock; j; j = j.parentBlock) {
      sym = j.blockVars.get(name);
      if (sym) break;
    }
    if (sym) {
      sym.hasRead = true;
      if (i.parentFunc !== sym.func)
        (sym.useFuncs || (sym.useFuncs = new Set())).add(i.parentFunc);
    } else {
      sym = fileGlobals.get(name);
      if (!sym) {
        sym = newSym(name, true);
        fileGlobals.set(name, sym);
      }
    }
    i.sym = sym;
  }
  for (let i = idDecls; i; i = i.nextIdDecl) {
    if (!i.sym.useFuncs) continue;
    const scope = i.parentMaybeScope;
    if (!scope.scopeNode) {
      scope.scopeNode = true;
      scope.scopeDecls = new Set();
      if (lastScope) lastScope.nextScope = scope;
      else root.scopes = scope;
      lastScope = scope;
    }
  }
  for (let i = lastLoop; i; i = i.nextLoop) {
    if (!i.scopeNode) continue;
    i.parentScope = parentScope(i);
  }
  for (let i = lastFunc; i; i = i.nextFunc) i.parentScope = parentScope(i);
  for (let i = idDecls; i; i = i.nextIdDecl) {
    const sym = i.sym;
    const block = sym.block;
    const scope = block.scopeNode ? block : parentScope(block);
    sym.scope = scope;
    scope.scopeDecls.add(sym);
    i.scope = parentScope(i);
  }
  for (let i = ids; i; i = i.nextId) i.scope = parentScope(i);
  root.ids = ids;
  root.idDecls = idDecls;
  root.classes = classes;
  return root;
}

export function parentScope(node) {
  let j;
  for (j = node.parentMaybeScope; j && !j.scopeNode; j = j.parentMaybeScope) {}
  return j;
}

/**
 * makes all `syms` to have uniq name among them only
 * with prefix `pref` and postfix `postf`
 */
export function uniqFields(syms, pref = "", postf = "") {
  const names = new Set();
  // TODO: group by field name
  for (const sym of syms) {
    const orig = sym.orig;
    let name = `${pref}${namePos(orig, 0)}${postf}`;
    for (
      let cnt = 0;
      names.has(name);
      cnt++, name = `${pref}${namePos(orig, cnt)}${postf}`
    ) {} // eslint-disable-line no-empty
    names.add(name);
    sym.name = name;
  }
}

export function resolve(root) {
  for (let i = root.firstChild; i; i = i.nextFunc) uniqFields(i.funcDecls);
  for (let i = root.ids; i; i = i.nextId) i.node.name = i.sym.name;
  for (let i = root.idDecls; i; i = i.nextIdDecl) i.node.name = i.sym.name;
  return root;
}

export function tempVar(root, pat) {
  const sym = newSym(pat);
  sym.decl = null;
  sym.block = sym.func = root;
  root.funcDecls.add(sym);
  root.blockDecls.add(sym);
  return sym;
}

const nameOpts = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "k",
  "m",
  "n",
  "x",
  "y",
  "z"
];

export function namePos(n, pos) {
  if (!n || !n.length) {
    const len = nameOpts.length;
    if (pos < len) return nameOpts[pos];
    return `${nameOpts[pos % len]}${Math.floor(pos / len)}`;
  }
  if (n[n.length - 1] === "_") return n + (pos + 1);
  if (pos === 0) return reserved.get(n) || n;
  if (pos === 1) return "_" + n;
  return `${n}${pos - 1}`;
}

export const reserved = new Map([["arguments", "args"]]);
