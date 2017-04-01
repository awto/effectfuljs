import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,symbol,symName,enter,leave,tok,symKind,scope} from "./kit"
import * as assert from "assert"
import * as Debug from "./debug"
import * as Trace from "./kit/trace"
import * as Prop from "./propagate"
import {stmtExpr} from "./kit/stmtExpr"

export const letStmt = symbol("letStmt")
export const frame = symbol("frame")
export const chain = symbol("chain")
export const bindPat = symbol("bindPat")
/* bind expression with a single tail */
export const effExpr = symbol("effExpr")
export const effBlock = symbol("effBlock")
export const app = symbol("app")
export const pure = symbol("pure")
export const sharedRef = symbol("sharedRef")

/**
 * Replaces binary `app` nodes with its first component member function call 
 * with `name`, passing second component as a function to its argument
 */
export const interpretApp = R.pipe(function (s) {
  const sl = Kit.auto(s)
  function* walk(sw) {
    for(const i of sw) {
      if (i.type === app) {
        if (i.enter) {
          const lab = sl.label()
          yield sl.enter(i.pos,effExpr)
          yield sl.enter(Tag.expression,Tag.CallExpression)
          yield sl.enter(Tag.callee,Tag.MemberExpression,{bind:true})
          yield sl.enter(Tag.object,Kit.Subst)
          const c = sl.cur()
          yield* walk(sl.one())
          yield* sl.leave()
          yield tok(Tag.property,Tag.Identifier,
                    {node:{name:i.value.node.name}})
          yield* sl.leave()
          yield sl.enter(Tag.arguments,Tag.Array)
          if (sl.cur().pos === Tag.params) {
            yield sl.enter(Tag.push,Tag.ArrowFunctionExpression)
            yield* sl.one()
            yield sl.enter(Tag.body,Kit.Subst)
          } else {
            yield sl.enter(Tag.push,Kit.Subst)
          }
          yield* walk(sl.one())
          yield* lab()
        }
      } else {
        yield i
      } 
    }
  }
  return walk(sl)
},Kit.completeSubst)

function countEffSeqFramesImpl(s) {
  const sl = Kit.auto(s)
  function* walk(sw) {
    for(const i of sw) {
      yield i
      if (i.enter && i.type === chain) {
        let count = 0, j
        while((j = sl.curLev()) != null) {
          yield* walk(sl.one())
          j.value.index = count++
        }
        i.value.count = count
      }
    }
  }
  return walk(sl)
}

const countEffSeqFrames = R.pipe(countEffSeqFramesImpl,Array.from)

//TODO: use matcher
function* markPureFrame(s) {
  const sl = Kit.auto(s)
  for(const i of sl) {
    yield i
    if (i.enter && i.type === frame) {
      const j = sl.take()
      yield j
      if (j.type !== letStmt) {
        continue
      }
      const k = sl.curLev()
      i.value.pureFrame = k != null && k.type === pure
    }
    //TODO: check argument
  }
}
export const cleanPureFrames = R.pipe(
  countEffSeqFramesImpl,
  markPureFrame,
  Array.from,
  function*(s) {
    const sl = Kit.auto(s)
    for(const i of sl) {
      if (i.type === frame && i.value.pureFrame && i.value.index > 0) {
        if (i.enter)
          Kit.skip(sl.sub())
      } else {
        yield i
      }
    }
  })

export const cleanupEffSeq = R.pipe(
  countEffSeqFrames,
  function* cleanupEffSeq(s) {
    const sl = Kit.auto(s)
    function* walk() {
      for(const i of sl.sub()) {
        if (i.enter && i.type === chain && i.value.count < 2) {
          yield sl.enter(i.pos,Kit.Subst)
          yield* walk()
          yield* sl.leave()
          sl.take()
          continue
        }
        yield i
      }
    }
    yield* walk()
  },
  Kit.completeSubst)

/** 
 * makes all chains explicitly left associative
 */
export const lassoc = R.pipe(
  countEffSeqFrames,
  function* bindExprs(s) {
    const sl = Kit.auto(s)
    function* walk(sw) {
      for(const i of sw) {
        yield i
        if (i.enter && i.type === chain && i.value.count > 1) {
          assert.ok(i.enter)
          const count = i.value.count
          for(let j = 2; j < count; j++)
            yield sl.enter(Tag.push,chain)
          yield* walk(sl.one())
          for(let j = 2; j < count; j++) {
            yield* walk(sl.one())
            yield* sl.leave()
          }
          yield* walk(sl.one())
        }
      }
    }
    yield* walk(sl)
  })

/** 
 * makes all chains explicitly right associative
 */
export const rassoc = R.pipe(
  countEffSeqFrames,
  function* rassocBindExprs(s) {
    const sl = Kit.auto(s)
    function* walk(sw) {
      for(const i of sw) {
        if (i.type === chain && i.value.count > 2) {
          if (i.enter) {
            const cnt = i.value.count
            const lab = sl.label()
            yield sl.enter(i.pos,chain)
            for(let k = 2; k < cnt; k++) {
              yield* walk(sl.one())
              yield sl.enter(Tag.push,chain)
            }
            yield* walk(sl.one())
            yield* walk(sl.one())
            yield* lab()
          }
        } else {
          yield i
        }
      }
    }
    yield* walk(sl)
  }
)

export const interpretParEffSeq = R.pipe(
  function* interpretArrEffSeq(s) {
    const sl = Kit.auto(s)
    function* walk(sw) {
      for(const i of sw) {
        if (i.type === chain && i.value.kind === "pseq") {
          if (i.enter) {
            const pat = []
            const lab = sl.label()
            yield sl.enter(i.pos,effExpr,{pat})
            yield sl.enter(Tag.expression,Tag.CallExpression)
            yield sl.enter(Tag.callee,Tag.MemberExpression)
            yield sl.enter(Tag.object,Kit.Subst)
            let j = sl.cur()
            assert.ok(j.value.eff)
            yield* walk(sl.one())
            yield* sl.leave()
            yield tok(Tag.property,Tag.Identifier,{node:{name:"mseq"}})
            yield* sl.leave()
            yield sl.enter(Tag.arguments,Tag.Array)
            while(sl.curLev() != null) {
              j = sl.cur()
              assert.ok(j.value.eff)
              yield sl.enter(Tag.push,Kit.Subst)
              yield* walk(sl.one())
              yield* sl.leave()
            }
            if (j.value.pat && j.value.pat.length)
              pat.push(...j.value.pat)
            yield* lab()
          }
        } else
          yield i
      }
    }
    yield* walk(sl)
  },
  Kit.completeSubst,
  Array.from
)

// TODO: remove (replace ipat with something else)
export function* setPatVarToArgs(s) {
  const sl = Kit.auto(s)
  function* walk(sw) {
    for(const i of sw) {
      yield i
      if (i.enter) {
        switch(i.type) {
        case chain:
          if (i.enter) {
            let pat = null
            while(sl.curLev() != null) {
              const cur = sl.cur()
              cur.value.ipat = pat
              yield* walk(sl.one())
              pat = cur.value.pat
            }
          }
        }
      }
    }
  }
  yield* walk(sl)
}

export function* interpretBinEffSeq(s) {
  const sl = Kit.auto(s)
  function* walk(sw) {
    for(const i of sw) {
      switch(i.type) {
      case bindPat:
        yield Kit.setType(i,Tag.Identifier)
        break
      case chain:
        if (i.enter) {
          assert.equal(i.value.count,2)
          const pat = sl.cur().value.pat
          const node = {name:"mbind"}
          const lab = sl.label()
          yield sl.enter(i.pos,app,{node})
          yield* walk(sl.one())
          yield sl.enter(Tag.params,Tag.Array)
          if (pat != null)
            yield* pat
          yield* sl.leave()
          if (!sl.cur().value.eff)
            node.name = "mapply"
          yield* walk(sl.sub())
          yield* lab()
        }
        break
      default:
        yield i
      }
    }
  }
  yield* walk(sl)
}

export const interpretBindFrame = R.pipe(
  function interpretBindFrame(s) {
    const sl = Kit.auto(s)
    let en = false
    function* walk() {
      for(const i of sl.sub()) {
        switch(i.type) {
        case letStmt:
          if (i.enter)  {
            if (i.value.eff) {
              const j = sl.curLev()
              if (j != null)
                j.value.result = true
              yield sl.enter(i.pos,Kit.Subst)
              yield* walk()
              yield* sl.leave()
            } else {
              const lab = sl.label()
              if (i.value.pat && i.value.pat.length) {
                assert.equal(i.pos,Tag.push)
                yield sl.enter(Tag.push,Tag.VariableDeclaration,
                               {node:{kind:"const"}})
                yield sl.enter(Tag.declarations,Tag.Array)
                yield sl.enter(Tag.push,Tag.VariableDeclarator)
                yield sl.enter(Tag.id,Kit.Subst)
                yield* i.value.pat
                yield* sl.leave()
                yield sl.enter(Tag.init,Kit.Subst)
                yield* walk()
              } else {
                yield sl.enter(i.pos,Tag.ExpressionStatement)
                yield sl.enter(Tag.expression,Kit.Subst)
                yield* walk()
              }
              yield* lab()
            }
          }
          break
        case frame:
          if (i.enter) {
            yield sl.enter(i.pos,effBlock)
            yield* walk()
            yield* sl.leave()
          }
          break
        default:
          yield i
        }
      }
    }
    return walk()
  },
  Kit.completeSubst,
  function removeEmptyBlocks(si) {
    const s = Kit.auto(si)
    function* walk(sw) {
      for(const i of sw) {
        if (i.enter && i.type === effBlock && s.curLev() != null) {
          const buf = [...walk(s.one())]
          if (s.curLev() != null) {
            yield i
            yield* buf
          } else {
            buf[0].pos = buf[buf.length-1].pos = i.pos
            yield* buf
            s.close(i)
          }
        } else
          yield i
      }
    }
    return walk(s)
  })

export const interpretCasts = R.pipe(
  function* cleanEffExpr(s) {
    const sl = Kit.auto(s)
    function* walk() {
      for(const i of sl.sub()) {
        switch(i.type) {
        case effExpr:
          if (i.enter) {
            yield sl.enter(i.pos,Kit.Subst)
            const j = sl.curLev()
            if (j != null)
              j.value.result = true
            yield* walk()
            yield* sl.leave()
          }
          break
        case effBlock:
          if (i.enter) {
            yield sl.enter(i.pos,Tag.BlockStatement)
            yield sl.enter(Tag.body,Tag.Array)
            yield* walk()
            yield* sl.leave()
            yield* sl.leave()
          }
          break
        default: 
          yield i
        }
      }
    }
    yield* walk()
  },
  Kit.completeSubst,
  Kit.adjustFieldType
)

export const splitEffBlock = R.pipe(
  function* splitEffBlock(s) {
    const sl = Kit.auto(s)
    function* block(i) {
      assert.ok(i.enter)
      if (i.value.eff || i.value.coerce) {
        const exit = sl.level-1
        const lab = sl.label()
        Kit.skip(sl.findPos(Tag.body))
        yield sl.enter(i.pos,chain)
        let r = sl.enter(Tag.push,frame)
        yield r
        for(const j of sl.sub()) {
          if (j.enter) {
            if (j.value.eff && j.type === Tag.BlockStatement) {
              yield* block(j)
            } else {
              yield sl.peel(j)
              yield* walk()
              yield* sl.leave()
            }
            if (j.value.eff) {
              r.value.eff = true
              yield* sl.leave()
              yield r = sl.enter(Tag.push,frame)
            }
          } else {
            yield j
          }
        }
        yield* lab()
        Kit.skip(Kit.tillLevel(exit,sl))
      } else {
        yield i
      }
    }
    function* walk() {
      for(const i of sl.sub()) {
        if(i.enter && i.type === Tag.BlockStatement)
          yield* block(i)
        else 
          yield i
      }
    }
    yield* walk()
  },
  //* removes empty frame, but keeps it if it is the only one in the chain
  function rmEmptyFrame(s) {
    s = Kit.auto(s)
    function* walk() {
      let first = true
      for(const i of s.sub()) {
        if (i.enter) {
          switch(i.type) {
          case frame:
            if (first) {
              first = false
            } else {
              if (s.cur().value === i.value) {
                s.take()
                continue
              }
            }
            break
          case chain:
            yield i
            yield* walk()
            continue
          }
        }
        yield i
      }
    }
    return walk()
  },
  Prop.recalcEff
)

export const factorEffSeq = R.pipe(
  countEffSeqFrames,
  saveFrameLet,
  function*(s) {
    const sl = Kit.auto(s)
    function* seq(i) {
      for(const j of sl.sub()) {
        yield j
        if (j.enter) {
          switch(j.type) {
          case frame:
            if (j.value.effLet != null) {
              for(const k of sl.sub()) {
                assert.ok(k.enter)
                if (k.type === letStmt && k.value.eff) {
                  const lab = sl.label()
                  j.value.effLet = null
                  // yield sl.enter(Tag.push,letStmt,{pat:[]}) //TODO: propagate to let
                  yield sl.enter(Tag.push,chain)
                  yield sl.enter(Tag.push,frame)
                  yield sl.peel(k)
                  yield* walk()
                  yield* sl.leave()
                  yield* sl.leave()
                  const t = sl.take()
                  assert.equal(t.value,j.value)
                  yield* walk()
                  yield* lab()
                  yield t
                } else {
                  yield sl.peel(k)
                  yield* walk()
                  yield* sl.leave()
                }
              }
              return
            }
            return
          case chain:
            if (j.value.count > 1) 
              yield* seq(j)
          }
          return
        }
      }
    }
    function* walk() {
      for(const i of sl.sub()) {
        yield i
        if (i.enter) {
          if (i.type === chain)
            yield* seq(i)
        }
      }
    }
    yield* walk()
  })

/**
 * calculates binds dependencies for a chain, so it can be arranged with 
 * `groupDeps` to utilize closures
 *
 *       type DepsInfo = { fwd: Set<number>, x: number, 
 *                         ref: Val, seq: DepsInfo[] }
 *   
 * for frames:
 * 
 *       type Val = Val & { deps: DepsInfo }
 *     
 * for chains:
 * 
 *       type Val = Val & { deps: DepsInfo[] }
 *     
 */
export const calcVarDeps = R.curry(function calcVarDeps(eff,s) {
  const sa = Kit.toArray(s)
  const sl = Kit.auto(sa)
  function seq() {
    const vars = new Map()
    const fs = []
    for(const i of sl.sub()) {      
      if (i.enter) {
        const cx = i.value.fdeps = { f:i.value,
                                     fwd:new Set(),
                                     x:fs.length,
                                     ref: i.value,
                                     seq:fs
                                   }
        fs.push(cx)
        switch(i.type) {
        case frame:
          for(const j of sl.sub()) {
            if (j.enter) {
              switch(j.type) {
              case bindPat:
                const ref = j.value.ref
                const v = vars.get(ref)
                if (v != null && cx !== v) {
                  v.fwd.add(cx.x)
                }
              break
              case letStmt:
                if (eff == null || eff === (j.value.eff || false)) {
                  vars.set(j.value, cx)
                }
                break
              case chain:
                j.value.deps = seq()
                break
              }
            }
          }
          break
        case chain:
          i.value.deps = seq()
          break
        }
      }
    }
    return fs
  }
  function walk() {
    for(const i of sl.sub()) {
      if (i.enter && i.type === chain)
        i.value.deps = seq()
    }
  }
  walk()
  return sa
})

/**
 * pattern variable of effectful bind is visible in the next frame, 
 * so this pass does same as `groupDeps` but shifts dependecies chain 
 */
export function* groupBindDeps(s) {
  const sl = Kit.auto(s)
  function* seq(deps) {
    const stack = []
    let num = 0
    for(const i of sl.sub()) {
      switch(i.type) {
      case frame:
        assert.ok(i.enter)
        const cx = i.value.fdeps
        yield sl.peel(i)
        yield* walk()
        yield* sl.leave()
        while(stack.length && cx.x >= stack[0]) {
          stack.shift()
          yield* sl.leave()
        }
        if (cx.fwd.size) {
          const nxt = Math.max(...cx.fwd)
          if (nxt > cx.x + 1) {
            stack.unshift(nxt)
            yield sl.enter(Tag.push, chain)
          }
        }
        break
      case chain:
        yield i
        if (i.enter && i.type === chain)
          yield* seq(i.value.deps)
        break
      default:
        yield i
      }
    }
    while(stack.length) {
      stack.shift()
      yield* sl.leave()
    }
  }
  function* walk() {
    for(const i of sl.sub()) {
      yield i
      if (i.enter && i.type === chain)
        yield* seq(i.value.deps)
    }
  }
  yield* walk()
}

/**
 * assuming chain will be interpreted further in a left associative order,
 * this pass emits additional chain to make right associative frame groups 
 * if this is specified in `DepsInfo`
 */
export const groupDeps = R.pipe(
  function* groupDeps(s) {
    const sl = Kit.auto(s)
    function* seq(deps) {
      const stack = []
      let num = 0
      for(const i of sl.sub()) {
        if (i.type === frame) {
          assert.ok(i.enter)
          const x = num++
          const cx = deps[x]
          if (cx.fwd.size && x !== 0) {
            const nxt = Math.max(...cx.fwd)
            if (nxt > cx.x) {
              stack.unshift(nxt)
              yield sl.enter(Tag.push, chain)
            }
          }
          yield sl.peel(i)
          yield* walk()
          yield* sl.leave()
          while(stack.length && cx.x >= stack[0]) {
            stack.shift()
            yield* sl.leave()
          }
        } else
          yield i
      }
      assert.equal(stack.length, 0)
    }
    function* walk() {
      for(const i of sl.sub()) {
        yield i
        if (i.enter && i.type === chain)
          yield* seq(i.value.deps)
      }
    }
    yield* walk()
  }
)

export const cleanStmtExpr = R.pipe(
  function* cleanStmtExpr(s) {
    for(const i of s) {
      yield i.type === stmtExpr ? Kit.setType(i,Kit.Subst) : i
    }
  },
  Kit.completeSubst)

/** 
 * extracts all effectful expressions into separate statements in a block, 
 * injects `letStmt` and `bindPat` to mark extracted expressions and its 
 * original location
 */
export const flatten = R.pipe(
  Kit.removeNulls,
  function* flatten(s) {
    const sl = Kit.auto(s)
    function* block(i) {
      if (i.value.eff || i.value.shallowEff) {
        if (i.type === Tag.BlockStatement) {
          yield sl.peel(i)
          yield* sl.peelTo(Tag.body)
          for(const j of sl.sub()) {
            assert.ok(j.enter
                      && (j.value.stmt || symKind(j.type) === "ctrl")
                      && j.pos === Tag.push)
            yield* j.value.eff || j.value.shallowEff ? frame(j) : sl.copy(j)
          }
          yield* sl.leave()
          yield* sl.leave()
        } else if (i.pos === Tag.push) {
          yield* frame(i)
        } else {
          yield sl.enter(i.pos,Tag.BlockStatement)
          yield sl.enter(Tag.body,Tag.Array)
          yield* frame(Kit.setPos(i,Tag.push))
          yield* sl.leave()
          yield* sl.leave()
        }
      } else {
        yield i
        yield* sl.sub()
      }
    }
    function* frameImpl(buf) {
      function* bind(i,pat,eff,like) {
        pat.sym = i.value.bindPat = scope.newSym()
        const value = pat.ref = Kit.tagValue(
          Tag.push,
          letStmt,
          {pat:[sl.tok(Tag.push,Tag.Identifier,pat)],eff})
        yield sl.enter(Tag.push,letStmt,value)
        yield sl.peel(Kit.setPos(i,Tag.expression))
        yield* frameImpl(buf)
        yield* sl.leave()
        yield* sl.leave()
      }
      function* inject(i) {
        const pat = {node:null}
        buf.push([...bind(i,pat,true)])
        yield tok(i.pos,bindPat,pat)
      }
      for(const i of sl.sub()) {
        if (i.enter) {
          if (i.value.stmt) {
            if (i.value.eff || i.value.shallowEff) {
              yield* block(i)
            } else {
              if (i.type === Tag.BlockStatement) {
                i.value.coerce = true
                yield sl.peel(i)
                yield* sl.sub()
                yield* sl.leave()
              } else {
                const lab = sl.label()
                yield sl.enter(i.pos,Tag.BlockStatement,{coerce:true})
                yield sl.enter(Tag.body,Tag.Array)
                yield sl.peel(Kit.setPos(i,Tag.push))
                yield* sl.sub()
                yield* lab()
              }
            }
            continue
          }
          if (i.value.bind || i.value.shared != null) {
            yield* inject(i)
            if (i.value.shared != null)
              i.value.shared.sym = i.value.bindPat
            continue
          }
          switch(i.type) {
          case Tag.UpdateExpression:
          case Tag.AssignmentExpression:
          case Tag.CallExpression:
            yield* inject(i)
            continue
          }
        }
        yield i
      }
    }
    function* frame(i) {
      if (i.leave) {
        yield i
        return
      }
      i = sl.peel(i)
      const buf = []
      const res = [...frameImpl(buf)]
      i.value.eff = null
      yield* [].concat(...buf)
      yield i
      yield* res
      yield* sl.leave()
    }
    yield sl.peel()
    for(const i of sl.sub()) {
      if (i.enter && i.value.stmt)
        yield* block(i,Tag.BlockStatement,Tag.body)
      else
        yield i
    }
    yield* sl.leave()
  },
  function* setSharedRef(s) {
    for(const i of s) {
      if (i.type === sharedRef) {
        if (i.enter) {
          yield tok(i.pos,Tag.Identifier,{sym:i.value.ref.sym})
        }
      } else
        yield i
    }
  },
  function* removeEmptyBinds(s) {
    const si = Kit.auto(s)
    function* subexpr(i,pos) {
      const exit = si.level-1
      const buf = [i]
      const p = Kit.result(si.findPos(pos),buf)
      if (p != null) {
        if (p.type === bindPat && p.value.ref.pat.length === 1) {
          Kit.skip(Kit.tillLevel(exit,si))
          p.value.ref.pat.length = 0
          if (i.pos !== Tag.push)
            yield tok(i.pos,Tag.Null)
        return
        }
        yield* buf
        yield p
        yield* walk()
      } else
        yield i
      yield* Kit.tillLevel(exit,si)
    }
    function* decls(i) {
      let empty = true
      yield si.peel(i)
      yield* si.peelTo(Tag.declarations)
      const exit = si.level
      for(const j of si.sub()) {
        assert.equal(j.type, Tag.VariableDeclarator)
        const buf = [j]
        const id = [...si.peelTo(Tag.id),...si.sub(),...si.leave()]
        buf.push(...id)
        const p = Kit.result(si.findPos(Tag.init),buf)
        if (p != null && p.type === bindPat) {
          Kit.skip(Kit.tillLevel(exit,si))
          p.value.ref.pat = id
          continue
        }
        empty = false
        yield* buf
        if (p != null)
          yield p
        yield* walk()
        yield* Kit.tillLevel(exit,si)
      }
      yield* si.leave()
      yield* si.leave()
      return empty
    }
    function* walk() {
      for(const i of si.sub()) {
        switch(i.type) {
        case Tag.ReturnStatement:
          if (i.value.last) {
            assert.ok(i.enter)
            yield* subexpr(i,Tag.argument)
          } else
            yield i
          break
        case Tag.ExpressionStatement:
          assert.ok(i.enter)
          yield* subexpr(i,Tag.expression)
          break
        case Tag.VariableDeclaration:
          assert.ok(i.enter)
          const buf = []
          if (!Kit.result(decls(i),buf)) {
            yield* buf
          } else {
            if (i.pos !== Tag.push) 
              yield tok(i.pos,Tag.Null)
          }
          break
        default:
          yield i
        }
      }
    }
    yield* walk()
  },
  Prop.recalcEff
)

export function* cleanPureEff(s) {
  s = Kit.auto(s)
  for(const i of s) {
    if (i.type === pure) {
      if (i.enter) {
        const j = s.curLev()
        if (j != null && j.value.eff) {
          s.peel(i)
          yield s.peel(Kit.setPos(s.take(),i.pos))
          yield* s.sub()
          yield* s.leave()
          const j = s.take()
          assert.equal(i.value,j.value)
          continue
        }
      }
    }
    yield i
  }
}

export const interpretPure = R.pipe(
  function*(s) {
    const sl = Kit.auto(s)
    function* walk() {
      for(const i of sl.sub()) {
        if (i.type === pure) {
          if (i.enter) {
            const lab = sl.label()
            yield sl.enter(i.pos,Tag.CallExpression)
            yield* Kit.packId(sl,Tag.callee,"pure")
            yield sl.enter(Tag.arguments,Tag.Array)
            yield sl.enter(Tag.push,Kit.Subst)
            yield* walk()
            yield* lab()
          }
        } else
          yield i
      }
    }
    yield* walk()
  },
  Kit.completeSubst,
  cleanStmtExpr
)

export const propagateBindVars = R.pipe(
  function* propagateBindVars(s) {
    const sl = Kit.auto(s)
    function* walk() {
      let res = null
      for(const i of sl.sub()) {
        yield i
        if (i.enter) {
          switch(i.type) {
          case chain:
          case frame:
            res = i.value.pat = yield* walk()
            break
          default:
            if (i.value.eff && i.value.pat && i.value.pat.length) {
              res = i.value.pat
            }
            const ires = yield* walk()
            if (ires && ires.length)
              res = ires
            break
          }
        }
      }
      return res
    }
    yield* walk()
  },
  Array.from,
  setPatVarToArgs)

/**
 * for frames ending with effectful let adds its reference to `effLet` field
 *
 *     type Value = Value & { effLet?: Value }
 * 
 * for `Block.frame`
 */
export function saveFrameLet(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  function walk(f) {
    for(const i of s) {
      if (i.enter) {
        switch(i.type) {
        case frame:
          if (i.value.eff)
            walk(i.value)
          break
        case letStmt:
          if (i.value.eff) {
            assert.ok(f)
            f.effLet = i.value
            f = null
          }
        }
      }
    }
  }
  walk()
  return sa
}
