import * as fs from "fs"
import * as path from "path"
import * as kit from "./generators"
import {run,pretty,prettyBlock,blockEqual} from "./core"
import tags from "./tags"
const defaults = require("../../src/config")
defaults.libs["./mfjscore"] = defaults.libs["@mfjs/core"]

function groupByPat(files, pats) {
  function walk(d, res) {
    for (const i in d) {
      const v = d[i]
      if (i[0] === "$") {
        res[i] = v
        continue
      }
      if (v.substr == null)
        res[i] = walk(v, {})
      let tag = null, base = null
      for (const j in pats) {
        const p = pats[j]
        const m = p.exec(i)
        if (m == null)
          continue
        for (const k of m.slice(1)) {
          if (k == null)
            continue
          base = k
          break
        }
        if (base == null) {
          res[j] = v
          break
        }
        if (p.ignoreCase)
          base = base.toLowerCase()
        tag = j
        break
      }
      if (tag == null)
        continue
      const b = res[base] != null ? res[base] : res[base] = {
        $basePath: path.join(d.$dirPath, base)
      }
      b[tag] = v
    }
    return res
  }
  return walk(files, {});
}

function getword(t) {
  const m = /^\s*(\w+)\s*(.*)/.exec(t)
  if ((m != null) && m.length === 3) {
    return [m[1].toLowerCase(), m[2]]
  }
  return []
}

function addInfo(d, ctx) {
  if (ctx == null)
    ctx = []
  d.$ctx = ctx
  const info = d.$info = []
  let minfo = null
  for (const i of Object.getOwnPropertyNames(d)) {
    if (i[0] === "$")
      continue
    const v = d[i]
    if (v.substr != null) {
      const re = /\*-\s+(.+)\s+/g
      while (true) {
        const m = re.exec(v);
        if (!((m != null) && m.length > 1))
          break
        info.push(m[1])
      }
      minfo = info;
    } else {
      addInfo(v, ctx.concat([i]))
      minfo = v.$info
    }
    if (!(minfo.length || (fpats[i] != null)))
      minfo.push.apply(minfo, tags(ctx, i))
  }
  return d
}

const options = {
  mode: true,
  "default": true
}

function interpretInfo(d) {
  if (d.$info != null) {
    for (let i of d.$info) {
      let [s,t] = getword(i)
      if (s === "qskip" && typeof window !== 'undefined') {
        s = "skip";
        d.$qskip = true;
      }
      if (s === "only" || s === "skip" || s === "noskip") {
        d["$" + s] = true
        i = t;
        [s,t] = getword(i)
        if (!((t != null) && t.length))
          continue
        
      }
      switch (s) {
      case "should":
        d.$it = i
        break;
      case "if":
      case "when":
      case "with":
        d.$context = i
        break
      default:
        if (options[s]) {
          const opts = d.$opts != null ? d.$opts : d.$opts = {};
          if (!((t != null) && t.length))
            t = true
          opts[s] = t
        } else {
          d.$describe = i
        }
      }
      if (d.inp != null) {
        if (!d.exp) {
          d.$skip = true
        }
      }
    }
  }
  for (const i of Object.getOwnPropertyNames(d)) {
    if (i[0] === "$")
      continue
    const v = d[i]
    if (v.substr != null)
      continue
    interpretInfo(v)
  }
}

function mochaBddWalk(d, ittxt, opts, skip) {
  const lst = []
  for (const i of Object.getOwnPropertyNames(d)) {
    if (i[0] !== "$") {
      const v = d[i]
      if (v.$it != null)
        ittxt = v.$it
      const nopts = {profile:"full"}
      Object.assign(nopts,opts,v.$opts)
      let fn = null
      skip = v.noskip == null
        && (skip || v.$skip != null || v.qskip && typeof window !== 'undefined')
      if (v.$dirPath != null) {
        fn = mochaBddWalk(v, ittxt, nopts, skip)
      } else if (v.inp != null) {
        const txt = ittxt ||
          `should have the same semantics in ${path.join.apply(path, v.$ctx)}`;
        const inp = v.inp, exp = v.exp || ""
        if (!exp.length)
          skip = true
        if (nopts.filename == null)
          nopts.filename = `${v.$basePath}-in.js`
        if (nopts.require == null)
          nopts.require = "./mfjscore"
        fn = skip ? () => it.skip(txt, () => {})
                  : () => it(txt, () => blockEqual(inp, exp, nopts))
      } else {
        continue
      }
      if (v.$context)
        fn = context.bind(null,v.$context,fn)
      if (v.$describe) {
        fn = describe.bind(null,v.$describe,fn)
      }
      lst.push(fn)
    }
  }
  return () => lst.forEach(i => i())
}

export function prepareList(files) {
  files = groupByPat(files, fpats)
  addInfo(files)
  interpretInfo(files)
  return files
}

const fpats = {
  inp: /^(.+)-in.js$/i,
  exp: /^(.+)-out.js$/i,
  info: /^info.txt$|^(.+)-info.txt$/i,
  $opts: /^(.+)-opts$/i,
  $only: /^only$|^only.tmp$|^(.+)-only$|^(.+)-only.tmp$/i,
  $skip: /^skip$|^skip.tmp$|^(.+)-skip$|^(.+)-skip.tmp$/i,
  $noskip: /^noskip$|^noskip.tmp$|^(.+)-noskip$|^(.+)-noskip.tmp$/i,
  $qskip: /^qskip$|^qskip.tmp$|^(.+)-qskip$|^(.+)-qskip.tmp$/i
}

export function mochaBdd(files) {
  files = prepareList(files)
  const f = mochaBddWalk(files)
  return f()
}

export function qunit(files) {
  files = prepareList(files)
  function walk(d, skip, opts) {
    for (const i of Object.getOwnPropertyNames(d)) {
      if (i[0] !== "$") {
        const v = d[i];
        const nopts = Object.assign({profile:"full"},opts,v.$opts)
        let nxtSkip = skip
        if ((v.$skip != null) || (nopts.$qskip != null))
          nxtSkip = true
        if (v.$noskip != null)
          nxtSkip = false
        if (v.$dirPath) {
          if (typeof QUnit !== "undefined" && QUnit !== null) {
            QUnit.module(i, function() {
              return walk(v, nxtSkip, nopts)
            })
          } else {
            console.log(`QUnit.module('${v.$ctx}');`)
            walk(v, nxtSkip, nopts)
          }
          continue
        }
        if (v.inp == null)
          continue
        if (typeof QUnit !== "undefined" && QUnit !== null) {
          const fn = nxtSkip ? "skip" : v.$only ? "only" : "test"
          if (nopts.filename == null)
            nopts.filename = `${v.$basePath}-in.js`
          if (nopts.require == null) {
            nopts.require = "./mfjscore"
          }
          QUnit[fn](i, function(a) {
            const res = run(nopts,v.inp)
            if (v.exp != null)
              a.equal(res, prettyBlock(v.exp), "should have the same semantics")
            
          })
        } else {
          console.log("QUnit.test", v.$ctx);
        }
      } 
    }
  }
  return walk(files)
}
