/* eslint-disable no-console */
import generate from "@babel/generator";
import * as T from "@babel/types";
import config from "./config";
import {
  Tag,
  symKind,
  symInfo,
  typeInfo,
  symName,
  resetFieldInfo,
  invariant
} from "./types";

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
  for (const i of resetFieldInfo(s)) {
    invariant(i.pos != null);
    invariant(i.type != null);
    const ti = typeInfo(i);
    const ctrlPos = symInfo(i.pos).kind === "ctrl";
    if (i.enter && stack.length) {
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
    if (i.enter && i.value.fieldInfo != null) {
      if (i.type === Tag.Array) {
        invariant(i.value.fieldInfo.array);
      }
    }
    if (i.enter && !i.leave) {
      const keys = T.VISITOR_KEYS[symName(i.type)];
      stack.push([i, keys && [...keys]]);
    }
    if (!i.enter && i.leave) {
      const [f] = stack.pop();
      invariant(f != null);
      if (ti.kind !== "ctrl") invariant(f.type === i.type);
      invariant(f.pos === i.pos);
      invariant(f.value === i.value);
    }
    yield i;
  }
  invariant(stack.length === 0);
}

function pad(s) {
  if (s.length % 2) s += " ";
  const sps = Array(Math.max(20 - s.length / 2, 2)).join(" ");
  return sps + s + sps;
}

const traceImpl = config.color ? browserTraceImpl : traceNodeImpl;

function* traceNodeImpl(prefix, s) {
  let level = 0;
  let x = 0;
  const chalk = require("chalk");
  for (const i of s) {
    if (i.enter) level++;
    const dir = chalk.bold(i.leave ? (i.enter ? "|" : "/") : "\\");

    const clevel = s.level ? `/${s.level}` : "";
    const descr = `${chalk.green(symName(i.pos))}:${
      i.type.ctrl
        ? chalk.green(symName(i.type))
        : chalk.green.bold(symName(i.type))
    }[${level}${clevel}]`;
    let n = "";
    const { node } = i.value;
    const comments = [];
    let commentsTxt = "";
    const t = [].concat(i.value.comments || [], i.value.tcomments || []);
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
      Array(level).join(" "),
      dir,
      `${descr}@${x}`,
      commentsTxt,
      n
    );
    yield i;
    if (i.leave) {
      level--;
    }
    x++;
  }
  console.log(prefix, "len:", x);
}

function* browserTraceImpl(prefix, s) {
  let level = 0;
  let x = 0;
  let first = true;
  for (const i of s) {
    if (first) {
      first = false;
      let name = symName(i.type);
      if (i.value.funcId) name += ":" + i.value.id;
      console.log(
        `%c${pad(prefix + " " + name.match(/[A-Z]/g).join(""))}%c`,
        `background:#2B81AF;color:#fff;font-size:xx-large;
                   text-shadow:rgba(0, 0, 0, 0.5) 2px 2px 1px`,
        ""
      );
    }
    const styles = [];
    if (i.enter) level++;
    const dir = i.enter && i.leave ? "\u21c4" : i.enter ? "\u2192" : "\u2190";
    const clevel = s.level ? `/${s.level}` : "";
    const tp =
      i.pos === i.type
        ? symName(i.type)
        : `${symName(i.pos)}:${symName(i.type)}`;
    const descr = `${prefix}${tp}[${level}${clevel}]`;
    const idtxt = i.value.id ? `-${i.value.id}` : "";
    let ldescr;
    if (i.pos === i.type) {
      ldescr = `${prefix}%c${symName(i.type)}%c[${level}${clevel}]`;
      styles.push(
        symKind(i.type) === "ctrl"
          ? "color:navy;font-size:large"
          : "color:steelblue",
        ""
      );
    } else {
      ldescr = `${prefix}%c${symName(i.pos)}:%c${symName(
        i.type
      )}%c[${level}${clevel}]`;
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
    if (i.enter && !i.leave && console.group != null) {
      if ((x === 0 && i.value.collapsed !== false) || i.value.collapsed)
        console.groupCollapsed(descr);
      else console.group(descr);
    }
    let n = "";
    const { node } = i.value;
    const comments = [];
    let commentsTxt = "";
    const t = [].concat(i.value.comments || [], i.value.tcomments || []);
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
      i.value
    );
    yield i;
    if (i.leave) {
      if (!i.enter && console.group != null) console.groupEnd();
      level--;
    }
    x++;
  }
  console.log(`${prefix}: len: ${x}`);
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
    if (s == null || s[Symbol.iterator] == null) return s => impl(prefix, s);
    return impl(prefix, s);
  };
}

export function* cleanComments(s) {
  for (const i of s) {
    if (i.enter) {
      i.value.comments = null;
      i.value.tcomments = null;
      if (i.value.node) {
        i.value.node.leadingComments = null;
        i.value.node.trailingComments = null;
      }
    }
    yield i;
  }
}

export const traceLazy = traceArgs(traceImpl);
export const traceAll = traceArgs(traceAllImpl);
