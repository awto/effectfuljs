import { parse as babelParse } from "@babel/parser";
import { produceNode, append, node, num, arr, tok, clone,dft } from "./core";
import { invariant, Tag } from "./types";

const memo = new Map();

export function parse(jsCode) {
  return babelParse(jsCode, {
    sourceType: "module",
    allowReturnOutsideFunction: true,
    plugins: ["dynamicImport"]
  });
}

/**
 * parses string `s` and outputs its token value
 * following prefixes are supported in the string
 *  - '^' - module's top level
 *  - '=' - the string is JS expression
 *  - '*' - the string is a list of statements
 *  - '>' - variable declarator
 *  - otherwise it is considered to be a statement
 *
 * if in the code in `s` identifier starts with `$` it has special meaning
 * if next character is:
 *  - digit - it will replaces symbol of identifier by `syms`
 *            at the corresponding position (1 based)
 *  - `$` -   keeps only one `$`
 *  - `I` -   unshifts a symbol from `syms` and replaces the symbol of
 *            the identifier
 */
export function toks(pos, s, ...syms) {
  return toksRaw(pos, s, syms);
}

/** same as `toks` but avoiding variable length arguments */
export function toksRaw(pos, s, syms) {
  if (s.substr != null) {
    let r = memo.get(s);
    if (r == null) {
      let topLevel = false;
      if (s[0] === "^") {
        s = s.slice(1);
        topLevel = true;
      }
      let mod = null;
      let js = s;
      switch (s[0]) {
        case "=": // expression
        case "*": // list of statements
        case ">": // var declarator
          mod = s[0];
          js = s.slice(1);
      }
      js = topLevel ? js : `function main() { for(;;) {${js}} }`;
      const b = parse(js);
      const body = topLevel
        ? b.program.body
        : b.program.body[0].body.body[0].body.body;
      invariant(mod === "*" || body.length === 1);
      switch (mod) {
        case "=":
          invariant(body[0].type === "ExpressionStatement");
          r = body[0].expression;
          break;
        case ">":
          invariant(body[0].type === "ExpressionStatement");
          const s = body[0].expression;
          invariant(s.type === "AssignmentExpression");
          r = { type: "VariableDeclarator", id: s.left, init: s.right };
          break;
        case "*":
          break;
        default:
          r = body[0];
      }
      if (mod !== "=" && mod !== ">") {
        if (mod === "*") {
          r = body;
        } else {
          r = body[0];
        }
      }
      memo.set(s, (r = produceNode(pos, r)));
    }
    s = r;
  }
  function replace(root) {
    if (!syms || !syms.length) return root;
    for (const i of dft(root)) {
      const { node } = i;
      if (!Array.isArray(node)) node.loc = node.start = node.end = null;
      if (i.type === Tag.Identifier && node.name[0] === "$") {
        const { name } = node;
        const rest = name.substr(1);
        switch (rest[0]) {
          case "$":
            node.name = rest;
            break;
          case "I":
            invariant(syms.length > 0);
            node.name = (i.sym = syms.shift()).name;
            break;
          default:
            if (rest.length && !isNaN(rest))
              node.name = (i.sym = syms[rest - 1]).name;
        }
      }
    }
    return root;
  }
  s = clone(s);
  s.pos = pos;
  return replace(s);
}

/**
 * same as `toks` but extends formats with `$_`/'$E` identifier to mark
 * a position where the output stream must be stopped
 *
 * returns an array with the first item containing the whole node
 * and the next ones are placeholders
 *
 * in expression statements $E focuses only the expression, while `$_` is for
 * the statement, in other contexts they do matches the same
 */
export function template(pos, code, ...syms) {
  const root = toks(pos, code, ...syms);
  const ret = [root];
  for (const i of dft(root)) {
    switch (i.type) {
      case Tag.ExpressionStatement:
        const child = i.firstChild;
        if (child.type === Tag.Identifier && child.node.name === "$_")
          ret.push(i);
        break;
      case Tag.Identifier:
        const name = i.node.name;
        if (name === "$_" || name === "$E") ret.push(i);
        break;
    }
  }
  return ret;
}

/** converts compile time constant into a list of tokens */
export function emitConst(pos, value) {
  switch (typeof value) {
    case "number":
      return num(pos, value);
    case "string":
      return tok(pos, Tag.StringLiteral, { value });
    case "boolean":
      return tok(pos, Tag.BooleanLiteral, { value });
    case "object":
      if (value === null) return node(pos, Tag.NullLiteral);
      if (value.emitConstMethod) return value.emitConstMethod(pos);
      if (Array.isArray(value)) {
        const res = node(pos, Tag.ArrayExpression);
        const els = arr(Tag.elements);
        for (const j of value) append(els, emitConst(Tag.push, j));
        append(res, els);
        return res;
      }
      const res = node(pos, Tag.ObjectExpression);
      const props = arr(Tag.properties);
      for (const name in value) {
        const prop = node(Tag.push, Tag.ObjectProperty);
        append(prop, tok(Tag.key, Tag.Identifier, { name }));
        append(prop, emitConst(Tag.value, value[name]));
        append(props, prop);
      }
      append(res, props);
      return res;
  }
  return append(
    node(pos, Tag.UnaryExpression, { operator: "void" }),
    num(Tag.argument, 0)
  ).firstChild;
}
