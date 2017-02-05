import * as R from "ramda"
import * as Kit from "./kit"
import * as Trace from "./trace"
import {Tag,produce,consume,symbol,symName,symInfo,
        dump as D,trace as T} from "estransducers"
import generate from "babel-generator"
import * as Uniq from "./uniq"
import * as SE from "./kit/stmtExpr"

function isBindTok(v) {
  return isIf(v) || symInfo(v.type).kind === "ctrl"
} 

function isIf(v) {
  return v.pos === Tag.consequent ||
    v.pos === Tag.alternate ||
    v.type === Tag.IfStatement ||
    v.type === Tag.ArrowFunctionExpression;
}

function* traceHighlight(s) {
  function flag(n,opts = {}) {
    const def = opts.val == null ? true : opts.val
    const txt = opts.txt || n
    const collapsed = opts.collapsed || false
    const st = opts.st
    const ste = opts.ste || st
    const stl = opts.stl || st
    return i => {
      const st = i.enter ? ste : stl
      if(i.obj[n] === def) {
        i.collapsed = collapsed
        i.flags.push(`${st == null ? "" : "%c"}${txt}`)
        if (st != null)
          i.flagsStyles.push(st)
      }
    }
  }
  const flags = [flag("eff",{ste:"color:red;font-size:large",
                             stl:"color:orange;font-style:italic"}),
                 flag("shallowEff",{ste:"color:red",
                             stl:"color:orange;font-style:italic",
                             val:true,
                             txt:"shallow",collapsed:true}),
                 flag("eff",{ste:"color:green",
                             stl:"color:green;font-style:italic",
                             val:false,
                             txt:"pure",collapsed:true}),
                 flag("bracket",{ste:"color:blue;font-size:large",
                                 stl:"color:skyblue;font-style:italic"})
                ]
  for(const i of s) {
    flags.map(f => f(i))
    yield i
  }
}

function pad(s) {
  if (s.length % 2)
    s += ' '
  const sps = Array(Math.max(20 - s.length/2,2)).join(' ')
  return sps + s + sps
}

export const trace = R.curry((prefix,s) => {
  console.log(`%c${pad(prefix)}%c`,
              `background:#2B81AF;color:#fff;font-size:xx-large;
              text-shadow:rgba(0, 0, 0, 0.5) 2px 2px 1px`,
              "")
  return R.pipe(
    tracePrep,
    Trace.of(
      R.pipe(
        Trace.highlight(v => v.type === Kit.Subst
                        || isBindTok(v)),
        traceHighlight,Trace.prefix(prefix)
      )),
    D.cleanComments,
    T.verify,
    Array.from)(s)
})

export const traceC = R.curry((prefix,s) => {
  console.log(`${prefix}:`)
  return R.pipe(
    tracePrep,
    Trace.of(Trace.prefix(prefix)),
    D.cleanComments,
    T.verify)(s)
})

function varsPat(vars) {
  vars.map(v => v.type || (v.type = "Identifier"))
  if (vars.length === 1)
    return vars[0]
  return {type:"ArrayPattern", elements: vars}
}

function hl(t,e) {
  return D.setComment(e,t,"large")
}

function hls(t,e) {
  return D.setComment(e,t,"small")
}

export const markState = R.pipe(
  function* markState(s) {
    for(const i of s) {
      const comment = []
      if (i.enter) {
        if (i.value.env) {
          const env = i.value.env
          let {lhs,rhs,tw,tr,br} = env
          tw = tw || new Set()
          tr = tr || new Set()
          br = br || new Set()
          const c = new Set([...tr,...tw,...br,...lhs,...rhs])
          const r = []
          for(const i of c) {
            const m = []
            if (lhs.has(i))
              m.push("W")
            else if (tw.has(i))
              m.push("w")
            if (rhs.has(i))
              m.push("R")
            else if (tr.has(i))
              m.push("r")
            if (br.has(i))
              m.push(">")
            let mr = m.join("")
            if (mr.length)
              r.push([i,":",mr].join(''))
          }
          if (r.length)
            comment.push(r.join("|"))
        }
        if (i.value.node) {
          if (i.value.node.read && i.value.node.read.size) 
            comment.push(`R[${Array.from(i.value.node.read).join()}]`)
          if (i.value.node.write && i.value.node.write.size)
            comment.push(`W[${Array.from(i.value.node.write).join()}]`)
          if (i.value.node.save && i.value.node.save.size)
            comment.push(`s[${Array.from(i.value.node.save).join()}]`)
          if (i.value.node.localWrites && i.value.node.localWrites.size)
            comment.push(`L[${Array.from(i.value.node.localWrites).join()}]`)
          if (i.value.node.copy && i.value.node.copy.size)
            comment.push(`C[${Array.from(i.value.node.copy).join()}]`)      
          if (i.value.node.update && i.value.node.update.size)
            comment.push(`U[${Array.from(i.value.node.update).join()}]`)
        }
        yield comment.length ? hls(comment.join(''),i) : i
      } else
        yield i
    }
  }
)

export function* dumpDeps(s) {
  for(const i of s) {
    yield i.enter && i.value.deps != null
      ? hls("D:" +
            (i.value.deps.length
             ? JSON.stringify(i.value.deps.map(v => [...v.fwd || []]))
             : `${i.value.deps.x} -> ${JSON.stringify([...i.value.deps.fwd || []])}`
            ),i)
    : i
  }
}

export const dumbBindStmt = R.pipe(
  function* debDumbBindStmt(s) {
    for(const i of s) {
      switch(symName(i.type)) {
      case "letStmt":
        const hasBind = i.value.pat.length !== 0
        if (i.enter) {
          let s = null
          if (hasBind) {
            yield D.copyComment(i,D.setComment(
              Kit.enter(i.pos, Tag.VariableDeclaration,
                    {node:{
                      kind:"var"
                      // kind:"const"
                    },eff:i.value.eff}),
              "S","font-size:xx-large;color:orange"))
            yield Kit.enter(Tag.declarations,Tag.Array)
            const node = {id:varsPat(i.value.pat)}
            yield Kit.enter(Tag.push,Tag.VariableDeclarator,{node})
            yield Kit.enter(Tag.init,Kit.Subst)
          } else {
            yield D.copyComment(i,D.setComment(
              Kit.enter(i.pos,Tag.ExpressionStatement,{node:{},eff:i.value.eff}),
              "S","font-size:xx-large;color:orange"))
            yield Kit.enter(Tag.expression,Kit.Subst)
          }
        }
        if (i.leave)
          yield* Kit.repeat(hasBind ? 4 : 2, Kit.leave())
        break
      case "bindPat":
        if (i.enter)
          yield Kit.tok(i.pos,Tag.Identifier,{node:i.value.node})
        break
      default:
        yield i
      }
    } 
  },
  Kit.complete,
  Kit.completeSubst
)

export function* addLabels(s) {
  const sl = Kit.auto(s)
  const labs = {}
  function* walk(rename) {
    for(const i of sl.sub()) {
      if (i.value.ctrl) {
        if (i.enter) {
          const lab = sl.label()
          let pos = i.pos
          for(const j of i.value.ctrl) {
            if (j !== "#" && j !== "#ret") {
              let nm = j
              nm = nm.replace("#","_")
              const lx = labs[j] || 0
              if (lx !== 0)
                nm += lx
              labs[nm] = lx + 1
              rename[j] = nm 
              yield sl.enter(pos,Tag.LabeledStatement,
                             {node:{label:{type:"Identifier",name:nm}}})
              pos = Tag.body
            }
          }
          yield sl.peel(Kit.setPos(i,pos))
          yield* walk(Object.create(rename))
          yield* lab()
          continue
        }
      }
      if (i.value.node != null && i.value.node.label != null) {
        const name = rename[i.value.node.label.name]
        if (name != null)
          i.value.node.label = {type:"Identifier",name}
      }
      yield i
    } 
  }
  yield* walk({})
}

export const dumpEffBlock = R.pipe(
  function* dumpEffBlock(s) {
    const b = Kit.auto(s)
    function* walk() {
      for(const i of b.sub()) {
        switch(symName(i.type)) { 
        case "jump":
          if (i.enter) {
            yield D.copyComment(i,b.enter(i.pos,Tag.CallExpression))
            yield Kit.tok(Tag.callee,Tag.Identifier,{node:{name:"jump"}})
            yield b.enter(Tag.arguments,Tag.Array)
            const d = i.value.node.dst
            if (d != null)
              yield Kit.tok(Tag.push,Tag.StringLiteral,
                            {node:{value:i.value.node.dst.name}})
            yield* walk()
            yield* b.leave()
            yield* b.leave()
          }
          break
        case "scope":
          if (i.enter) {
            yield D.copyComment(i,D.setComment(
              b.enter(i.pos,Tag.BlockStatement),
              `$${i.value.node.name}`,
              "color:blue;font-size:large"))
            yield b.enter(Tag.body,Tag.Array)
            yield b.enter(Tag.push,Kit.Subst)
            yield* walk()
            yield* b.leave()
            yield* b.leave()
            yield* b.leave()
          }
          break
        case "writeState":
          if (i.enter) {
            yield D.copyComment(i,D.setComment(
              b.enter(i.pos,Tag.CallExpression,{node:{callee:{type:"Identifier",name:"write"}}}),
              `write`,
              "color:blue;font-size:large"))
            yield b.enter(Tag.arguments,Tag.Array)
            yield b.enter(Tag.push,Kit.Subst)
            yield* walk()
            yield* b.leave()
            yield* b.leave()
            yield* b.leave()
          }
          break
        case "forPar":
          if (i.enter) {
            yield D.copyComment(i,D.setComment(
              b.enter(i.pos,Tag.ArrowFunctionExpression,{node:{params:[]}}),
              `PAR`,
              "color:blue;font-size:large"))
            yield b.enter(Tag.body, Tag.ForStatement)
            yield* walk()
            yield* b.leave()
            yield* b.leave()
          }
          break
        case "effExpr":
          if (i.enter) {
            yield* walk()
          }
          break
        case "chain":
          if (i.enter) {
            yield D.copyComment(i,D.setComment(
              b.enter(i.pos,Tag.BlockStatement),
              `..`,
              "color:blue;font-size:large"))
            yield b.enter(Tag.body,Tag.Array)
            yield* walk()
            yield* b.leave()
            yield* b.leave()
          }
          break
        case "pure":
          if (i.enter) {
            yield D.copyComment(i,D.setComment(
              b.enter(i.pos,Tag.CallExpression,
                      {node:{callee:{type:"Identifier",name:"pure"}}}),
              `..`,
              "color:blue;font-size:large"))
            yield b.enter(Tag.arguments,Tag.Array)
            yield b.enter(Tag.push,Kit.Subst)
            yield* walk()
            yield* b.leave()
            yield* b.leave()
            yield* b.leave()
          }
          break
        case "frame":
          if (i.enter) {
            const lab = b.label()
            let txt =`#${i.value.pat && i.value.pat.length || ''}`
            if (i.value.bindsResult)
              txt += '_'
            if (i.value.hasStmts)
              txt += '='
            yield D.copyComment(i,D.setComment(
              b.enter(i.pos,Tag.BlockStatement),
              txt,
              "color:blue;font-size:large"))
            yield b.enter(Tag.body,Tag.Array)
            yield b.enter(Tag.push,Kit.Subst)
            yield* walk()
            yield* lab()
          }
          break
        default:
          if (i.type.ctrl) {
            if (i.type.arg === "b") {
              if (i.enter) {
                yield D.copyComment(i,D.setComment(
                  b.enter(i.pos,Tag.BlockStatement),
                  symName(i.type),
                  "color:blue;font-size:large"))
                yield b.enter(Tag.body,Tag.Array)
                yield b.enter(Tag.push,Kit.Subst)
                yield* walk()
                yield* b.leave()
                yield* b.leave()
                yield* b.leave()
              }
              break
            }
          }
          yield i
        }
      }
    }
    yield* walk()
  },
  Kit.completeSubst)

function* dumpCasts(s) {
  const sl = Kit.auto(s)
  function* toExpr(pos) {
    const lab = sl.label()
    const b = sl.take()
    if (b.value.stmt) {
      yield hl("expr",sl.enter(pos,Tag.CallExpression,{node:{arguments:[]}}))
      yield sl.enter(Tag.callee,Tag.FunctionExpression,{node:{parameters:[]}})
      if (b.type === Tag.BlockStatement)
        yield sl.peel(Kit.setPos(b,Tag.body))
      else {
        yield sl.enter(Tag.body,Tag.BlockStatement)
        yield sl.enter(Tag.body,Tag.Array)
        yield sl.peel(Kit.setPos(b,Tag.push))
      }
    } else {
      yield sl.peel(Kit.setPos(b,pos))
    }
    yield* walk()
    yield* lab()
  }
  function* toBlock(pos) {
    const lab = sl.label()
    const b = sl.take()
    if (b.value.expr) {
      yield hl("block",sl.enter(Tag.body,Tag.ExpressionStatement))
      yield sl.peel(Kit.setPos(b,Tag.expression))
    } else {
      if (symName(b.type) === "castToBlock" || symName(b.type) === "castToBody")  {
        yield* toBlock(pos)
        return
      }
      if (b.type === Tag.BlockStatement) {
        yield sl.peel(Kit.setPos(b,pos))
      } else {
        yield sl.enter(pos,Tag.BlockStatement)
        yield sl.enter(Tag.body,Tag.Array)
        yield sl.peel(Kit.setPos(b,Tag.push))
      }
    }
    yield* walk()
    yield* lab()
  }
  function* walk() {
    for(const i of sl.sub()) {
      switch(symName(i.type)) {
      case "castToExpr":
        if (i.enter)
          yield* toExpr(i.pos)
        break
      case "castToBody":
      case "castToBlock":
        if (i.enter)
          yield* toBlock(i.pos)
        break
      default:
        yield i
      }
    }
  }
  yield* walk()
}

const tracePrep = R.pipe(markState)


export function* markBindEff(s) {
  for(const i of s) {
    if (i.enter) {
      if (i.value.bind)
        D.setComment(i,"B","color:red;font-style:italic;")
      else if (i.value.bind === false)
        D.setComment(i,"P","color:red;font-style:italic;")
      else if (i.value.eff)
        D.setComment(i,"E","color:red;font-style:italic;")
      else if (i.value.shallowEff)
        D.setComment(i,"e","color:red;font-style:italic;")
    }
    yield i
  }
}


function* removeSubScopes(s) {
  for(const i of s) {
    if (i.enter && i.pos !== Tag.top) {
      switch(i.type) {
      case Tag.FunctionDeclaration:
        if (i.leave) {
          yield Kit.enter(i.pos,Tag.ExpressionStatement)
          yield Kit.tok(Tag.expression,Tag.Identifier,{node:{name:"$$$"}})
          yield Kit.leave(i.pos,Tag.ExpressionStatement)
          continue
        }
        break
      case Tag.FunctionExpression:
      case Tag.ArrowFunctionExpression:
        if (i.leave) {
          yield Kit.tok(i.pos,Tag.Identifier,{node:{name:"$$$"}})
          continue
        }
      }
    }
    yield i
  }
}

const dumpPrep = R.pipe(
  addLabels,
  markState,
  dumpDeps,
  dumbBindStmt,
  markBindEff,
  dumpEffBlock,
  dumpCasts,
  Uniq.subst)

export const mark = R.pipe(dumpPrep,D.fin)

export const dump = R.curry(function dumpConsole(tag,s) {
  s = Kit.toArray(s)
  D.toConsole(tag,dumpPrep(removeSubScopes(Kit.clone(s))))
  return s
})

