/* eslint-disable no-console */
import generate from "@babel/generator";
import * as T from "@babel/types";
import config from "./config";
import { Tag, symKind, symInfo, typeInfo, symName, invariant } from "./types";
import { curry, pipe } from "./combinators";
import {
  resetFieldInfo,
  toArray,
  hier,
  lookahead,
  consume,
  fromIterable,
  skip,
  dft
} from "./core";

const MAX_TRACE_CODE_LEN = 40;

const enterStyles = "background: #222; color: #bada55;font-size:1.5em";
const leaveStyles = "color: #ee5757; background: black";
const newTagStyle = "color:purple;font-size:large";
const positionStyle = "color:gray;text-decoration:underline";
const dirStyle = "font-size:x-large;font-weight:bolder";

function defaultReplacer(n, v) {
  return n === "leadingComments" || n === "trailingComments" ? void 0 : v;
}

/**
 * outputs short description of AST node
 */
export function cg(ast, opts = {}) {
  var res;
  if (ast == null) {
    // console.error("<NULL>")
    return "<NULL>";
  }
  try {
    if (Array.isArray(ast)) {
      ast =
        ast.length > 0 && T.isExpression(ast[0])
          ? T.sequenceExpression(ast)
          : T.blockStatement(ast);
    }
    res = generate(ast, opts, "").code;
  } catch (e) {
    if (ast.type != null) console.log("ERROR:", e.stack);
  }
  if (res != null) {
    return res;
  }
  return "!!" + opts.compact
    ? JSON.stringify(ast, defaultReplacer)
    : JSON.stringify(ast, defaultReplacer, 2);
}

/**
 * same as `cg` but using compact syntax
 */
export function ccg(ast) {
  return cg(ast, { compact: true });
}

if (config.debug) {
  global.cg = cg;
  global.ccg = ccg;
}

export function* verify(s) {
  const stack = [];
  for (const { start, value: i } of hier(
    dft(resetFieldInfo(fromIterable(s)))
  )) {
    invariant(i.pos != null);
    invariant(i.type != null);
    const ti = typeInfo(i);
    const ctrlPos = symInfo(i.pos).kind === "ctrl";
    if (start) {
      if (stack.length) {
        const [f, keys] = stack[stack.length - 1];
        if (f.type === Tag.Array) {
          if (!ctrlPos) invariant(i.pos === Tag.push);
        } else if (keys != null && !ctrlPos) {
          let k;
          while ((k = keys.shift()) != null) {
            if (Tag[k] === i.pos) break;
          }
          invariant(k);
        }
      }
      if (i.fieldInfo != null) {
        if (i.type === Tag.Array) {
          invariant(i.fieldInfo.array);
        }
      }
      const keys = T.VISITOR_KEYS[symName(i.type)];
      stack.push([i, keys && [...keys]]);
      yield i;
    } else {
      const [f] = stack.pop();
      invariant(f != null);
      if (ti.kind !== "ctrl") invariant(f.type === i.type);
      invariant(f.pos === i.pos);
      invariant(f === i);
    }
  }
  invariant(stack.length === 0);
}

function pad(s) {
  if (s.length % 2) s += " ";
  const sps = Array(Math.max(20 - s.length / 2, 2)).join(" ");
  return sps + s + sps;
}

const traceImpl = config.color ? browserTraceImpl : traceNodeImpl;

function traceDocImpl(prefix, root) {
  skip(traceImpl(prefix, dft(root)));
  return root;
}

function* traceNodeImpl(prefix, s) {
  let x = 0;
  const chalk = require("chalk");
  for (const { start, value: i } of hier(s)) {
    const dir = chalk.bold(start ? "\\" : "/");
    const clevel = `${i.level}`;
    const descr = `${chalk.green(symName(i.pos))}:${
      i.type.ctrl
        ? chalk.green(symName(i.type))
        : chalk.green.bold(symName(i.type))
    }[${clevel}]`;
    let n = "";
    const { node } = i;
    const comments = [];
    let commentsTxt = "";
    const t = [].concat(i.comments || [], i.tcomments || []);
    if (t.length) {
      if (comments.length)
        commentsTxt = chalk.bold("[") + comments.join(" ") + chalk.bold("]");
    }
    if (node != null && i.type !== Tag.Array && symKind(i.type) !== "ctrl") {
      n = ccg(node);
      if (n.length > MAX_TRACE_CODE_LEN)
        n = n.substr(0, MAX_TRACE_CODE_LEN) + "...";
      n = chalk.yellow(n);
      const { loc } = node;
      if (loc != null) {
        let { source: f, start: s, end: e } = loc;
        n += chalk.blue(
          ` @${f || "?"}-${s.line}:${s.column}..${e.line}:${e.column}`
        );
      } else {
        n += chalk.bold(" @new");
      }
    }
    console.log(
      prefix,
      Array(i.level).join(" "),
      dir,
      `${descr}@${x}`,
      commentsTxt,
      n
    );
    if (start) yield i;
    x++;
  }
  console.log(prefix, "len:", x);
}

function* browserTraceImpl(prefix, s) {
  let x = 0;
  let first = true;
  for (const { start, value: i } of hier(s)) {
    if (first) {
      first = false;
      let name = symName(i.type);
      if (i.funcId) name += ":" + i.funcId.id;
      console.log(
        `%c${pad(prefix + " " + name.match(/[A-Z]/g).join(""))}%c`,
        `background:#2B81AF;color:#fff;font-size:xx-large;
                   text-shadow:rgba(0, 0, 0, 0.5) 2px 2px 1px`,
        ""
      );
      if (i.parent) console.log("ROOT", i.parent);
      console.log("SCOPE", i);
    }
    const styles = [];
    const dir = start ? "\u2192" : "\u2190";
    const clevel = `${i.level}`;
    const tp =
      i.pos === i.type
        ? symName(i.type)
        : `${symName(i.pos)}:${symName(i.type)}`;
    const descr = `${prefix}${tp}[${clevel}]`;
    const idtxt = i.id ? `-${i.id}` : "";
    let ldescr;
    if (i.pos === i.type) {
      ldescr = `${prefix}%c${symName(i.type)}%c[${clevel}]`;
      styles.push(
        symKind(i.type) === "ctrl"
          ? "color:navy;font-size:large"
          : "color:steelblue",
        ""
      );
    } else {
      ldescr = `${prefix}%c${symName(i.pos)}:%c${symName(i.type)}%c[${clevel}]`;
      styles.push(
        symKind(i.pos) === "ctrl"
          ? "color:olive;font-size:large"
          : "color:green"
      );
      styles.push(
        symKind(i.type) === "ctrl"
          ? "color:navy;font-size:large"
          : "color:steelblue",
        ""
      );
    }
    if (start && console.group != null) {
      if ((x === 0 && i.collapsed !== false) || i.collapsed)
        console.groupCollapsed(descr);
      else console.group(descr);
    }
    let n = "";
    const { node } = i;
    const comments = [];
    let commentsTxt = "";
    const t = [].concat(i.comments || [], i.tcomments || []);
    if (t.length) {
      const pstyle = "color:green;font-size:large";
      styles.push(pstyle);
      for (const j of t) {
        comments.push(`%c${j.txt}%c`);
        const mod = !i.enter
          ? "font-size:small;font-style:italic"
          : "font-weight:bolder;font-size:large";
        const s = `${j.style || ""}${mod}`;
        styles.push(s, "");
      }
      if (comments.length) {
        commentsTxt = "%c[" + comments.join(" ") + "%c]%c";
        styles.push(pstyle, "");
      }
    }
    if (node != null && i.type !== Tag.Array && symKind(i.type) !== "ctrl") {
      n = ccg(node);
      if (n.length > MAX_TRACE_CODE_LEN)
        n = n.substr(0, MAX_TRACE_CODE_LEN) + "...";
      n = `%c ${n} %c`;
      styles.push(i.enter ? enterStyles : leaveStyles, "");
      const { loc } = node;
      if (loc != null) {
        let { source: f, start: s, end: e } = loc;
        n += ` %c@${f || "?"}-${s.line}:${s.column}..${e.line}:${e.column}%c`;
        styles.push(positionStyle, "");
      } else {
        n += " %c@new%c";
        styles.push(newTagStyle, "");
      }
    }
    console.log(
      `%c${dir}%c ${ldescr}@${x}${idtxt}${commentsTxt} ${n}`,
      dirStyle,
      "",
      ...styles,
      i
    );
    if (start) yield i;
    else console.groupEnd();
    x++;
  }
  console.log(`${prefix}len: ${x}`);
}

function traceAllImpl(prefix, s) {
  return [
    ...(prefix[0] === "!" ? traceImpl(prefix, s) : verify(traceImpl(prefix, s)))
  ];
}

function traceArgs(impl) {
  return function traceImpl(prefix, s) {
    if (prefix == null || prefix.substr == null) {
      if (s == null) s = prefix;
      prefix = "";
    }
    if (prefix.length) prefix += ":";
    if (s == null) return s => impl(prefix, s);
    return impl(prefix, s);
  };
}

export function* cleanComments(s) {
  for (const i of s) {
    if (i.enter) {
      i.comments = null;
      i.tcomments = null;
      if (i.node) {
        i.node.leadingComments = null;
        i.node.trailingComments = null;
      }
    }
    yield i;
  }
}

export const traceLazy = traceArgs(traceImpl);
export const traceAll = traceArgs(traceAllImpl);
export const traceDoc = traceArgs(traceDocImpl);

export function* markNodeType(s) {
  for (const i of s) {
    const ti = typeInfo(i);
    if (ti.kind === "ctrl")
      (i.comments || (i.comments = [])).unshift({
        txt: symName(i.type),
        style: styles.nodetype
      });
    else if (i.comments != null && i.comments.length) {
      (i.comments || (i.comments = [])).unshift({
        txt: symName(i.type)
          .match(/[A-Z]/g)
          .join(""),
        style: styles.nodetype
      });
    }
    yield i;
  }
}

export const color = config.browserDebug
  ? function* color(s) {
      if (!config.color) {
        yield* s;
        return;
      }
      for (const i of hier(s)) {
        if (i.start && i.value.comments) {
          for (const j of i.value.comments) {
            if (j.style != null && typeInfo(i).kind === "node") {
              j.txt = `%c${j.txt}%c`;
              j.args = [j.style, ""];
            }
          }
        }
        if (!i.start && i.value.tcomments) {
          for (const j of i.value.tcomments) {
            if (j.style != null && typeInfo(i).kind === "node") {
              j.txt = `%c${j.txt}%c`;
              j.args = [j.style, ""];
            }
          }
        }
        if (i.start) yield i.value;
      }
    }
  : s => s;

function* getArgs(s) {
  for (const i of hier(s)) {
    if (i.start && i.value.comments) {
      for (const j of i.value.comments) {
        if (j.args) for (const k of j.args) yield k;
      }
    }
    if (!i.start && i.value.tcomments) {
      for (const j of i.value.tcomments) {
        if (j.args) for (const k of j.args) yield k;
      }
    }
  }
}

function* applyComments(s) {
  for (const i of hier(s)) {
    const node = i.value.node;
    if (i.start && node != null) {
      if (i.value.comments != null && i.value.comments.length) {
        (node.leadingComments || (node.leadingComments = [])).push({
          type: "CommentBlock",
          value: i.value.comments.map(v => v.txt).join("|")
        });
      }
      if (!i.start && i.value.tcomments != null && i.value.tcomments.length) {
        (node.trailingComments || (node.trailingComments = [])).push({
          type: "CommentBlock",
          value: i.value.tcomments.map(v => v.txt).join("|")
        });
      }
    }
    if (i.start) yield i.value;
  }
}

export const dumpToConsole = curry(function toConsole(tag, s) {
  s = lookahead(s);
  const root = s.buf;
  let name = symName(root.type)
    .match(/[A-Z]/g)
    .join("");
  if (root.funcId) name += ":" + root.funcId.id;
  if (config.browserDebug)
    (tag[0] === "+" ? console.group : console.groupCollapsed)(
      `dump %c${tag} %c${name}`,
      "color:orange;font-size:large",
      "color:coral"
    );
  else console.log(`dump ${tag}`);
  const col = pipe(color, tempNames, toArray, applyComments, toArray)(s);
  const args = Array.from(getArgs(col));
  consume(fromIterable(verify(col)));
  console.log(generate(col[0].node).code, ...args);
  if (config.browserDebug) console.groupEnd();
});

export const dumpDoc = curry(function(tag, root) {
  dumpToConsole(tag, dft(root));
  return root;
});

export const fin = pipe(tempNames, applyComments, toArray);

export function dumpToStr(s, opts = {}) {
  return generate(consume(s), opts).code;
}

export function setComment(i, txt, style = "none") {
  style = (style.substr && styles[style]) || style;
  (i.comments || (i.comments = [])).push({ txt, style });
  return i;
}

export function setEndComment(i, txt, style = "none") {
  style = (style.substr && styles[style]) || style;
  (i.tcomments || (i.tcomments = [])).push({ txt, style });
  return i;
}

export function copyComment(f, t) {
  if (f.comments != null) (t.comments || (t.comments = [])).push(...f.comments);
  if (f.tcomments != null)
    (t.tcomments || (t.tcomments = [])).push(...f.tcomments);
  return t;
}

const styles = {
  large: "font-size:xx-large;color:orange",
  hl: "font-size:large;color:navy;",
  small: "font-size:large;color:navy;",
  smallH: "font-size:large;color:orange;font-weight:bolder",
  nodetype: "font-size:xx-small;color:green;font-weight:bolder",
  none: ""
};

/**
 * sets temporal `node.name` for each Identifier for debug dumps outputs
 */
export function* tempNames(s) {
  for (const i of s) {
    if (
      i.type === Tag.Identifier &&
      i.sym != null &&
      (!i.node.name || i.node.name !== i.sym.orig)
    )
      i.node.name = i.sym.strict ? i.sym.name : i.sym.id;
    yield i;
  }
}

export function tempNamesRange(from, to) {
  for(const i of dft(from,to)) {
    if (
      i.type === Tag.Identifier &&
      i.sym != null &&
      (!i.node.name || i.node.name !== i.sym.orig)
    )
      i.node.name = i.sym.strict ? i.sym.name : i.sym.id;
  }
}
