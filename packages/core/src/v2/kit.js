import {
  node,
  num,
  str,
  tok,
  produce,
  produceNode,
  replace,
  detach,
  assign as assignImpl,
  append,
  prepend,
  insertAfter,
  insertBefore,
  id,
  bool,
  block,
  arr,
  appendBlock,
  clone,
  resetFieldInfo,
  error,
  dft,
  next,
  prev,
  after
} from "@effectful/transducers/v2/core";
import { curry, pipe } from "@effectful/transducers/v2/combinators";
import {
  emitConst,
  toks,
  toksRaw,
  template
} from "@effectful/transducers/v2/template";
import {
  Tag,
  typeInfo,
  symInfo,
  invariant,
  symName
} from "@effectful/transducers/v2/types";
import config from "./config";

export {
  tok,
  node,
  num,
  str,
  produce,
  produceNode,
  emitConst,
  toks,
  toksRaw,
  template,
  curry,
  pipe,
  replace,
  detach,
  append,
  prepend,
  insertAfter,
  insertBefore,
  Tag,
  id,
  bool,
  block,
  arr,
  typeInfo,
  invariant,
  appendBlock,
  clone,
  resetFieldInfo,
  error,
  symName,
  dft,
  after,
  next,
  prev
};

export function memExpr(pos, objSym, propName) {
  const res = node(pos, Tag.MemberExpression);
  const obj = node(Tag.object, Tag.Identifier);
  obj.sym = objSym;
  const prop = tok(Tag.property, Tag.Identifier, { name: propName });
  append(res, prop);
  insertBefore(prop, obj);
  res.pure = true;
  return res;
}

export function exprStmt(par, doc) {
  doc.pos = Tag.expression;
  const res = node(Tag.push, Tag.ExpressionStatement);
  append(res, doc);
  append(par, res);
  copyMeta(doc, res);
  return doc;
}

export function assign(pos) {
  const ret = assignImpl(pos);
  ret.isBlockScope = false;
  ret.isExpr = true;
  ret.isStmt = false;
  return ret;
}

export function assignStmt(par, l, r) {
  l.pos = Tag.left;
  r.pos = Tag.right;
  const res = assign(Tag.expression);
  append(res, r);
  insertBefore(r, l);
  res.node.loc = l.node.loc || r.node.loc;
  return exprStmt(par, res);
}

export function throwStmt(par, msg, name) {
  const res = append(par, node(Tag.push, Tag.ThrowStatement));
  const arg = append(res, node(Tag.argument, Tag.NewExpression));
  const params = append(arg, arr(Tag.arguments));
  append(params, tok(Tag.push, Tag.StringLiteral, { value: msg }));
  insertBefore(params, tok(Tag.callee, Tag.Identifier, { name }));
  return par;
}

export const setSymName = config.debug
  ? function setSymName(sym, index, prefix) {
      sym.index = index + 1;
      sym.name = `${prefix || "_"}${
        sym.orig ? sym.orig.replace(/\W/g, "_") + "$" : ""
      }${index}`;
    }
  : function setSymName(sym, index, prefix) {
      sym.index = index + 1;
      sym.name = `${prefix || "_"}${index}`;
    };

/**
 * assign `node.name` from `sym.name`
 */
export function resetNames(root) {
  let sym,
    i = root;
  do {
    if (i.type === Tag.Identifier && (sym = i.sym) != null)
      i.node.name = (sym.varSym || sym).name;
  } while ((i = next(i)) !== root);
}

export function locStr(loc) {
  return loc
    ? `${loc.start.line}:${loc.start.column}-${loc.end.line}:${loc.end.column}`
    : null;
}

export function approxLoc(i) {
  let loc = i.node.loc;
  if (loc) return loc;
  loc = {};
  const last = after(i);
  let j = i;
  let minLine = Number.MAX_SAFE_INTEGER;
  let minCol = Number.MAX_SAFE_INTEGER;
  let maxLine = 0;
  let maxCol = 0;
  do {
    if (j.node && j.node.loc) {
      const { start, end } = j.node.loc;
      if (start.line <= minLine) {
        minLine = start.line;
        if (start.column < minCol) minCol = start.column;
      }
      if (end.line >= maxLine) {
        maxLine = end.line;
        if (end.column > maxCol) maxCol = end.column;
      }
    }
  } while ((j = next(j)) !== last);
  if (maxLine === 0) return null;
  return {
    start: { line: minLine, column: minCol },
    end: { line: maxLine, column: maxCol }
  };
}

export function consume(root) {
  let i = root;
  let sym;
  const seen = config.debug ? new Set() : null;
  do {
    if (seen) {
      if (seen.has(i)) throw new TypeError("INTERNAL: loop in a AST");
      seen.add(i);
    }
    const { parent, node } = i;
    if (parent) {
      if (i.pos === Tag.push) {
        parent.node.push(node);
      } else parent.node[symName(i.pos)] = node;
    }
    if (i.type === Tag.Array) node.length = 0;
    else if (node) {
      if (i.type === Tag.Identifier && (sym = i.sym) != null)
        node.name = (sym.varSym || sym).name;
      const ti = symInfo(i.type);
      if (ti) {
        if (ti.esType != null) i.node.type = ti.esType;
        if (ti.fields) Object.assign(i.node, ti.fields);
      }
    }
  } while ((i = next(i)) !== root);
}

export const isWindows =
  typeof process !== "undefined" && process.platform === "win32";

export function void0(pos) {
  const res = tok(pos, Tag.UnaryExpression, { operator: "void" });
  append(res, num(Tag.argument, 0));
  return res;
}

export function varDecl() {
  return tok(Tag.push, Tag.VariableDeclaration, { kind: "var" });
}

export function copyMeta(from, to) {
  to.node.loc = from.node.loc;
  to.parentFunc = from.parentFunc;
  to.parentBlock = from.parentBlock;
  to.parentLoop = from.parentLoop;
  to.parentMaybeScope = from.parentMaybeScope;
}

export function hasDirective(node, value) {
  for (const i of node.directives) {
    if (i.value && i.value.value === value) return true;
  }
  return false;
}
