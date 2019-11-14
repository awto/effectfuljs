import { parse as babelParse } from "@babel/parser";
import { produce } from "./core";
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
 * parses string `s` and outputs its token stream at `pos`
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
export function* toks(pos, parent, s, ...syms) {
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
      if (!mod === "*") invariant(body.length === 1);
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
      memo.set(s, r);
    }
    s = r;
  }
  function* replace(s) {
    if (!syms.length) {
      yield* s;
      return s;
    }
    for (const i of s) {
      const { node } = i;
      node.loc = node.start = node.end = null;
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
      yield i;
    }
    return s;
  }
  if (Array.isArray(s)) {
    for (const i of s) yield* replace(produce(i, pos, {}, parent));
  } else yield* replace(produce(s, pos, {}, parent));
}

/**
 * same as `toks` but extends formats with `$_`/'$E` identifier to mark
 * a position where the output stream must be stopped
 *
 * to continue emitting `yield*` the returned callback passing the new parent
 *
 * each invocation of `template` and the returned callback returns focused token
 * or for the last hole the root token
 *
 * in expression statements $E focuses only the expression, while `$_` is for
 * the statement, in other contexts they do matches the same
 */
export function* template(pos, parent, code, ...syms) {
  const arr = Array.from(toks(pos, parent, code, ...syms));
  let x = 0;
  const len = arr.length;
  yield* refocus(parent);
  return refocus;

  function* refocus(parent) {
    invariant(x >= len);
    arr[x].parent = parent;
    for (; x < len; ++x) {
      const f = arr[x];
      switch (f.type) {
        case Tag.ExpressionStatement:
          const next = arr[x + 1];
          if (next.type === Tag.Identifier && next.node.name === "$_") {
            ++x;
            return f.parent;
          }
          break;
        case Tag.Identifier:
          const name = f.node.name;
          if (name === "$_" || name === "$E") return f.parent;
          break;
        default:
          yield f;
      }
    }
    return arr[0];
  }
}
