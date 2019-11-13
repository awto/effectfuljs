import {
  node,
  num,
  str,
  tok,
  produce,
  produceNode,
  consume,
  replace,
  detach,
  assign,
  append,
  prepend,
  insertAfter,
  insertBefore,
  consumeRange,
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
  consume,
  emitConst,
  toks,
  toksRaw,
  template,
  curry,
  pipe,
  replace,
  detach,
  assign,
  append,
  prepend,
  insertAfter,
  insertBefore,
  Tag,
  consumeRange,
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
  next
};

/**
 * if the expression `i` has some side effects
 */
export function isPureExpr(i) {
  if (i.pure) return true;
  switch (i.type) {
    case Tag.FunctionExpression:
    case Tag.ArrowFunctionExpression:
    case Tag.Identifier:
    case Tag.RegExpLiteral:
    case Tag.NullLiteral:
    case Tag.StringLiteral:
    case Tag.BooleanLiteral:
    case Tag.NumericLiteral:
    case Tag.BinaryExpression:
    case Tag.ObjectExpression:
    case Tag.ClassExpression:
    case Tag.ArrayExpression:
    case Tag.ThisExpression:
      return true;
    case Tag.UnaryExpression:
      switch (i.node.operator) {
        case "delete":
        case "throw":
          return false;
      }
      return true;
  }
}

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
  return doc;
}

export function assignStmt(par, l, r) {
  l.pos = Tag.left;
  r.pos = Tag.right;
  const res = assign(Tag.expression);
  append(res, r);
  insertBefore(r, l);
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
      sym.index = index;
      sym.name = `${prefix || "_"}${sym.orig ? sym.orig + "$" : ""}${index}`;
    }
  : function setSymName(sym, index, prefix) {
      sym.index = index;
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
