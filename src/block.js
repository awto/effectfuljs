import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,symbol} from "./kit"
import * as assert from "assert"
import * as Debug from "./debug"
import * as Trace from "./kit/trace"
import * as Prop from "./propagate"
import {stmtExpr} from "./kit/stmtExpr"

/** 
  * saves result of operation with an effect 
  * (JS or monadic) into a temporal variable 
  */
export const letStmt = symbol("letStmt")
/** a block of code with at most 1 monadic effect */
export const frame = symbol("frame")
/** sequence of `frame`s */
export const chain = symbol("chain")
/** reference to `letStmt` */
export const bindPat = symbol("bindPat")
/** marks effectful expression, not requiring coercion */
export const effExpr = symbol("effExpr")
/** marks effectful block, not requiring coercion */
export const effBlock = symbol("effBlock")
/** a chain of applications to some library operation */
export const app = symbol("app")
/** marks an expression which shouldn't be bound */
export const pure = symbol("pure")
/** marks an expression to share in JS using some temporal variable */
export const sharedRef = symbol("sharedRef")

export const pureId = Kit.sysId("pure")
export const bindId = Kit.sysId("bind")
export const arrId = Kit.sysId("arr")
export const mapId = Kit.sysId("map")

/**
 * Replaces binary `app` nodes with its first component member function call 
 * with `name`, passing second component as a function to its argument
 */
export const interpretApp = R.pipe(function interpretApp(s) {
  const sl = Kit.auto(s)
  function* walk(sw) {
    for(const i of sw) {
      if (i.type === app) {
        if (i.enter) {
          const lab = sl.label()
          yield sl.enter(i.pos,effExpr)
          yield sl.enter(Tag.expression,Tag.CallExpression)
          const st = sl.opts.static
          if (st) {
            yield Kit.idTok(Tag.callee,i.value.sym)
            yield sl.enter(Tag.arguments,Tag.Array)
            yield sl.enter(Tag.push,Kit.Subst)
            yield* walk(sl.one())
            yield* sl.leave()
          } else {
            yield sl.enter(Tag.callee,Tag.MemberExpression,{bind:true})
            yield sl.enter(Tag.object,Kit.Subst)
            yield* walk(sl.one())
            yield* sl.leave()
            yield sl.tok(Tag.property,Tag.Identifier,{sym:i.value.sym})
            yield* sl.leave()
            yield sl.enter(Tag.arguments,Tag.Array)
          }
          const sub = sl.label()
          for(let j; (j = sl.curLev()) != null;) { 
            if (j.pos === Tag.params) {
              yield sl.enter(Tag.push,Tag.ArrowFunctionExpression)
              yield* sl.one()
              yield sl.enter(Tag.body,Kit.Subst)
            } else {
              yield sl.enter(Tag.push,Kit.Subst)
            }
            yield* walk(sl.one())
            yield* sub()
          }
          yield* lab()
        }
      } else {
        yield i
      } 
    }
  }
  return walk(sl)
},Kit.completeSubst)

/** 
 * for each `frame` adds its index in `chain` and for each `chain` 
 * total number of frames 
 */
function* countEffSeqFramesImpl(s) {
  const stack = []
  let level = 0
  for(const i of s) {
    yield i
    if (i.enter) {
      const f = stack[stack.length-1]
      if (f != null && f.l === level)
        i.value.index = f.c++
      level++
      if (i.type === chain)
        stack.push({l:level,c:0})
    }
    if (i.leave) {
      level--
      if (i.type === chain) {
        const f = stack.pop()
        i.value.count = f.c
      }
    }
  }
}

/** eager `countEffSeqFramesImpl` */
const countEffSeqFrames = R.pipe(countEffSeqFramesImpl,Array.from)

/** removes useless pure frames */
export const cleanPureFrames = R.pipe(
  countEffSeqFramesImpl,
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
  },
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

/** removes empty and single length chain tags */ 
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

/** converts chains marked with "pseq" kind to JS expressions */
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
            yield sl.tok(Tag.property,Tag.Identifier,{node:{name:"mseq"}})
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

/** converts chains to JS expressions */
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
          const sym = bindId
          const lab = sl.label()
          const head = sl.enter(i.pos,app,{sym})
          yield head
          yield* walk(sl.one())
          yield sl.enter(Tag.params,Tag.Array)
          if (pat != null)
            yield* pat
          yield* sl.leave()
          if (!sl.cur().value.eff)
            head.sym = mapId
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

/** corrects JS AST nodes types to match specification */
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

/** splits JS into frames with at most 1 effectful expression (the last one) */
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
        if(i.enter && i.value.eff && i.type === Tag.BlockStatement)
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

/** in each chain shifts associativity to right for a first frame */
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

/** removes `stmtExpr` tag */
export const cleanStmtExpr = R.pipe(
  function* cleanStmtExpr(s) {
    for(const i of s) {
      yield i.type === stmtExpr ? Kit.setType(i,Kit.Subst) : i
    }
  },
  Kit.completeSubst)

/** removes `pure` tag if its content is in fact effectful */
export function* cleanPureEff(s) {
  s = Kit.auto(s)
  for(const i of s) {
    if (i.type === pure) {
      if (i.enter) {
        const j = s.curLev()
        if (j != null && j.value.eff) {
          yield s.peel(Kit.setPos(s.take(),i.pos))
          yield* s.sub()
          yield* s.leave()
          s.close(i)
          continue
        }
      }
    }
    yield i
  }
}

/** converts `pure` tags into JS expressions */
export const interpretPure = R.pipe(
  function*(s) {
    const sl = Kit.auto(s)
    function* walk() {
      for(const i of sl.sub()) {
        if (i.type === pure) {
          if (i.enter) {
            const lab = sl.label()
            yield sl.enter(i.pos,Tag.CallExpression,{result:true})
            yield sl.tok(Tag.callee, Tag.Identifier, {sym: pureId})
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

export function* interpretLibSyms(si) {
  const s = Kit.auto(si)
  for(const i of s) {
    if (i.enter && i.type === Tag.Identifier
        && i.pos !== Tag.property
        && i.value.sym && i.value.sym.lib) {
      const sym = i.value.sym
      const ns = s.opts.$ns
      if (sym != null && sym !== Kit.coerceId) {
        if (ns == null) {
          yield s.tok(i.pos,{sym})
        } else {
          const e = s.enter(i.pos,Tag.MemberExpression,{})
          yield e
          yield s.tok(Tag.object,Tag.Identifier,{sym:ns})
          yield s.tok(Tag.property,Tag.Identifier,{sym,node:{name:sym.name}})
          yield* s.leave()
        }
      } else {
        if (ns == null)
          yield s.tok(i.pos,Tag.Identifier,{sym:Kit.coerceId})
        else
          yield s.tok(i.pos,Tag.Identifier,{sym:ns})
      }
      s.close(i)
    } else
      yield i
  }
}

