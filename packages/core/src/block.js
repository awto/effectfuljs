import * as Kit from "./kit"
import {Tag,symbol} from "./kit"
import * as assert from "assert"
import * as Prop from "./propagate"

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
/** a chain of applications to some library operation */
export const app = symbol("app")
/** marks an expression which shouldn't be bound */
export const pure = symbol("pure")
/** marks an expression to share in JS using some temporal variable */
export const sharedRef = symbol("sharedRef")
/** effectful operation */
export const op = symbol("op")
export const pureId = Kit.sysId("pure")
export const chainId = Kit.sysId("chain")
export const alreadyRunningSym = Kit.sysId("$alreadyRunning")
export const delegateSym = Kit.sysId("$delegate")
export const redirSym = Kit.sysId("$redir")
export const redirResultSym = Kit.sysId("$redirResult")

/** in frameArgs binds inner content of the jump tag */
export const argSym = Kit.scope.newSym("arg")

/**
 * Replaces binary `app` nodes with its first component member function call 
 * with `name`, passing second component as a function to its argument
 */
export function interpretApp(s) {
  const sl = Kit.auto(s)
  function* walk(sw) {
    for(const i of sw) {
      if (i.enter) {
        if (i.type === app) {
          const lab = sl.label()
          yield sl.enter(i.pos,effExpr,i.value)
          yield sl.enter(Tag.expression,Tag.CallExpression)
          if (i.value.static !== false) {
            yield sl.tok(Tag.callee,Tag.Identifier,
                         {sym:i.value.sym,origOp:i.value})
            yield sl.enter(Tag.arguments,Tag.Array)
            yield* Kit.reposOne(walk(sl.one()), Tag.push)
          } else {
            yield sl.enter(Tag.callee,Tag.MemberExpression,{bind:true})
            yield* Kit.reposOne(walk(sl.one()),Tag.object)
            // yield sl.tok(Tag.property,Tag.Identifier,{sym:i.value.sym})
            yield sl.tok(Tag.property,Tag.Identifier,
                         {node:{name:i.value.sym.orig},origSym:i.value.sym})
            yield* sl.leave()
            yield sl.enter(Tag.arguments,Tag.Array)
          }
          const sub = sl.label()
          for(let j; (j = sl.curLev()) != null;) { 
            let pos
            if (j.pos === Tag.params) {
              yield sl.enter(Tag.push,Tag.ArrowFunctionExpression)
              yield* sl.one()
              pos = Tag.body
            } else {
              pos = Tag.push
            }
            yield* Kit.repos(walk(sl.one()),pos)
            yield* sub()
          }
          yield* lab()
          sl.close(i)
          continue
        }
      }
      yield i
    }
  }
  return walk(sl)
}
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
const countEffSeqFrames = Kit.pipe(countEffSeqFramesImpl,Array.from)

/** removes useless pure frames */
export const cleanPureFrames = Kit.pipe(
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
export const cleanupEffSeq = Kit.pipe(
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

/** corrects JS AST nodes types to match specification */
export const interpretCasts = Kit.pipe(
  function* cleanEffExpr(s) {
    const sl = Kit.auto(s)
    function* walk() {
      for(const i of sl.sub()) {
        switch(i.type) {
        case effExpr:
          if (i.enter) {
            const j = sl.curLev()
            const result = j != null && !i.value.reflected
            if (i.value.tmpVar) {
              if (j) {
                yield sl.enter(i.pos, Tag.AssignmentExpression,
                               {node:{operator:"="},result})
                yield sl.tok(Tag.left, Tag.Identifier, {sym:i.value.tmpVar})
                yield* Kit.reposOne(walk(), Tag.right)
                yield* sl.leave()
              }
            } else {
              if (j) {
                j.value.result = result
                yield* Kit.reposOne(walk(), i.pos)
              }
            }
          }
          break
        default: 
          yield i
        }
      }
    }
    yield* walk()
  },
  Kit.adjustFieldType)

/** splits JS into frames with at most 1 effectful expression (the last one) */
export const splitEffBlock = Kit.pipe(
  function* splitEffBlock(s) {
    const sl = Kit.auto(s)
    function* block(i) {
      assert.ok(i.enter)
      const exit = sl.level-1
      const lab = sl.label()
      yield sl.peel(i)
      let r = sl.enter(Tag.push,frame)
      yield r
      for(const j of sl.sub()) {
        if (j.enter) {
          if (j.type === chain) {
            yield* block(j)
          } else {
            yield sl.peel(j)
            yield* walk()
            yield* sl.leave()
          }
          if (j.value.eff) {
            r.value.eff = true
//            r.value.parRegion = j.value.parRegion
            yield* sl.leave()
            yield r = sl.enter(Tag.push,frame)
          }
        } else {
          yield j
        }
      }
      yield* lab()
    }
    function* walk() {
      for(const i of sl.sub()) {
        if(i.enter && i.type === chain)
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

/** adds contextSym namespace to library symbols
 * (handling `contextMethodOps` and `contextMethodOpsSpec` options
 */
export function ctxMethods(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const {contextSym} = root
  const {contextMethodOps,contextMethodOpsSpec,scopeConstructor} = s.opts
  if (!contextSym || !contextMethodOps)
    return s
  if (!s.opts.static)
    throw new Error("`contextMethodOps:true` requires `static:true`")
  return walk()
  function* walk() {
    for(const i of s) {
      let sym
      if (i.enter && i.type === Tag.Identifier
          && (sym = i.value.sym) && sym.lib
          && sym.name !== scopeConstructor
          && contextMethodOpsSpec[sym.name] !== false
         ) {
        yield s.enter(i.pos, Tag.MemberExpression)
        if (sym.ctxField) {
          yield s.enter(Tag.object,Tag.MemberExpression)
          yield s.tok(Tag.object,Tag.Identifier,{sym:contextSym,
                                                 origOp:i.value.origOp})
          yield s.tok(Tag.property,Tag.Identifier,{node:{name:sym.ctxField}})
          yield* s.leave()
        } else {
          yield s.tok(Tag.object,Tag.Identifier,
                      {sym:contextSym,origOp:i.value.origOp})
        }
        yield s.tok(Tag.property,Tag.Identifier,{node:{name:i.value.sym.name}})
        yield* s.leave()
        s.close(i)
        continue
      }
      yield i
    }
  }
}

/** removes frames with `removed: true` */
export function* cleanup(si) {
  const s = Kit.auto(si)
  for(const i of s) {
    if (i.enter && i.type === frame) {
      if (i.value.removed)
        Kit.skip(s.copy(i))
      else 
        yield* s.copy(i)
    } else
      yield i
  }
}

/**
 * Sets 
 *  * `ignoreResult:true` - value for expressions where its result isn't needed
 *  * `lastSeqExpr:true` - for the last expression in `SequenceExpression`
 */
export function applyIgnoreResult(si) {
  const sa = Kit.toArray(si)
  function _markLastSeqExpr() {
    for(let x = 0, len = sa.length; x < len; ++x) {
      const i = sa[x]
      i.value.lastSeqExpr = false
      if (i.leave && i.type === Tag.SequenceExpression)
        sa[x-2].value.lastSeqExpr = true
    }
  }
  const s = Kit.auto(sa)
  _applyIgnoreResult(s,false)
  return sa
  function _applyIgnoreResult(sw,ignore) {
    for(const i of sw) {
      if (i.enter) {
        i.value.ignoreResult = ignore || i.pos === Tag.update
        switch(i.type) {
        case letStmt:
          if (!i.value.sym || !i.value.sym.bound)
            _applyIgnoreResult(s.sub(),true)
          break
        case Tag.SequenceExpression:
          s.take()
          for(let j;(j = s.curLev()) != null;)
            _applyIgnoreResult(s.one(),ignore || !j.value.last)
          break
        case Tag.ExpressionStatement:
          _applyIgnoreResult(s.sub(),true)
          break
        default:
          ignore = false
        }
      }
    }
  }
}
