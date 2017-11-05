import * as Kit from "./kit"
import {Tag} from "./kit"
import * as Block from "./block"
import * as Ctrl from "./control"
import * as assert from "assert"
import * as Except from "./exceptions"

const alreadyRunningSym = Kit.sysId("alreadyRunning")

/** 
 * sets continuation fields in context before any jump to other frame
 * handles `inlineResultContAssign` and `inlineErrorContAssign` option
 */
export function storeContinuations(si) {
  const s = Kit.auto(si)
  const res = s.opts.inlineResultContAssign
        && (s.opts.resultContFieldName || "$exit")
  const err = s.opts.inlineErrorContAssign
        && (s.opts.errorContFieldName || "$handle")
  const cont = s.opts.inlineReentryCheck
        && (s.opts.contFieldName || "$cont")
  if (!err && !res)
    return s
  const {contextSym} = s.first.value
  if (!contextSym)
    throw s.error(
      "not implemented: storing continuations without scope's context")
  return walk()
  function* walk() {
    for(const i of s) {
      yield i
      if (i.enter && i.type === Block.frame) {
        const frame = i.value
        let assignResult = false, assignError = false, assignCont = false
        const rframe = frame.resultContRedir
        const eframe = frame.catchContRedir
        if (frame.enters && frame.enters.size) {
          if (rframe && res) {
            for(const j of frame.enters) {
              if (j.ref.resultContRedir !== rframe) {
                assignResult = true
                break
              }
            }
          }
          if (eframe && err) {
            for(const j of frame.enters) {
              if (eframe && err && j.ref.catchContRedir !== eframe) {
                assignError = true
                break
              }
            }
          }
          if (cont) {
            for(const j of frame.enters) {
              if (j.bindJump) {
                assignCont = true
                break
              }
            }
          }
        } else {
          assignResult = true
          assignError = true
        }
        if (rframe && !rframe.removed && assignResult)
          yield* s.toks(Tag.push,`$I.${res} = $I`,contextSym,rframe.declSym)
        if (eframe && !eframe.removed && assignError)
          yield* s.toks(Tag.push,`$I.${err} = $I`,contextSym,eframe.declSym)
        if (cont && assignCont) {
          yield* s.toks(Tag.push,`$I.${cont} = $I`,contextSym,alreadyRunningSym)
        }
        yield* s.sub()
      }
    }
  }
}

/** 
 * context shallow copy on frame's effectful exit 
 * TODO:
 */
function copyConext(si) {
  
}

const delegateSym = Kit.sysId("delegate")

function* assignValue(s,contextSym) {
  yield s.enter(Tag.push,Tag.AssignmentExpression,
                {node:{operator:"="}})
  yield* s.toks(Tag.left,`=$I.value`, contextSym)
  yield* s.curLev() ? Kit.reposOne(s.sub(),Tag.right)
    : Kit.scope.emitUndefined(Tag.right)
  yield* s.leave()
}

/**
 * inlining yield/yield* expressions for generators implementation
 * handles `inlineYieldOp: "iterator"` options
 */
function generatorsYield(si) {
  const s = Kit.auto(si)
  if (s.opts.inlineYieldOp !== "iterator")
    return s
  let inlineScope = s.opts.inlineScopeOp
  if (s.opts.inlineScopeOp !== "iterator")
    inlineScope = "esIterator"
  const {contextSym} = s.first.value
  const root = s.first.value
  if (!contextSym)
    throw s.error(
      "inliningYield: 'generator' can be used only with scope context")
  const field = s.opts.contFieldName
  const wrapGenerator = s.opts.wrapGeneratorResult
  return walk()
  function* setCont(value) {
    yield* s.toks(Tag.push,`$I.${field} = $I`,contextSym,value.goto.declSym)
  }
  function* walk() {
    for(const i of s) {
      if (i.enter && i.type === Block.letStmt && i.value.eff) {
        switch(i.value.bindName) {
        case "yld":
          yield* setCont(i.value)
          yield* assignValue(s,contextSym)
          yield s.tok(Tag.push,Tag.Identifier,{result:true,sym:contextSym})
          s.close(i)
          continue
        case "yldStar":
          yield* setCont(i.value)
          yield s.enter(Tag.push,Tag.CallExpression,{result:true})
          yield s.tok(Tag.callee,Tag.Identifier,{sym:delegateSym})
          yield s.enter(Tag.arguments,Tag.Array)
          yield* s.sub()
          yield* s.leave()
          yield* s.leave()
          s.close(i)
          continue
        case "scope":
          if (!inlineScope)
            break
          yield* setCont(i.value)
          if (s.opts.defunct) {
            yield* s.toks(Tag.push,`$I.$run = $I`,
                          contextSym,root.implFrame.value.declSym)
          }
          if (wrapGenerator) {
            yield s.enter(Tag.push,Tag.MemberExpression,{result:true})
            yield s.tok(Tag.object,Tag.Identifier,{sym:contextSym})
            yield s.tok(Tag.property,Tag.Identifier,{node:{name:"unwrap"}})
            yield* s.leave()
          }
          s.close(i)
          continue
        }
      }
      yield i
    }
  }
}

/**
 * inline chain operation as ES Promise operation
 * handles option `inlineChainOp === "promise"`
 */
export function promises(si) {
  const s = Kit.auto(si)
  if (s.opts.inlineChainOp !== "promise")
    return s
  const inlineScope = s.opts.inlineScopeOp === "promise"
  const root = s.first.value
  const {errFrameRedir,resFrameRedir} = root
  return walk()
  function* walk() {
    for(const i of s) {
      if (i.enter && i.type === Block.letStmt
          && i.value.goto
          && (i.value.bindName === "chain"
              || inlineScope && i.value.bindName === "scope")) {
        if (i.value.threadArgs && i.value.threadArgs.length)
          throw s.error("`inlineChainOp: promise` with threaded arguments")
        if (s.opts.contextBy !== "reference")
          throw s.error(
            "`inlineChainOp: promise` without `contextBy: reference`")
        const lab = s.label()
        const errCnt = i.value.ref.catchContRedir
        debugger
        const needThen = i.value.goto !== resFrameRedir
              || (errCnt && errCnt !== errFrameRedir)
        if (needThen) {
          yield s.enter(i.pos,Tag.CallExpression,{result:true})
          yield s.enter(Tag.callee,Tag.MemberExpression)
          yield s.enter(Tag.object,Tag.CallExpression)
        } else
          yield s.enter(i.pos,Tag.CallExpression,{result:true})
        yield s.enter(Tag.callee,Tag.MemberExpression)
        yield s.tok(Tag.object,Tag.Identifier,{node:{name:"Promise"}})
        yield s.tok(Tag.property,Tag.Identifier,{node:{name:"resolve"}})
        yield* s.leave()
        yield s.enter(Tag.arguments,Tag.Array)
        if (!i.leave)
          yield* s.sub()
        yield* s.leave()
        yield* s.leave()
        if (needThen) {
          yield s.tok(Tag.property,Tag.Identifier,{node:{name:"then"}})
          yield* s.leave()
          yield s.enter(Tag.arguments,Tag.Array)
          yield s.tok(Tag.push,Tag.Identifier,{sym:i.value.goto.declSym})
          if (errCnt && errCnt !== errFrameRedir)
            yield s.tok(Tag.push,Tag.Identifier,
                        {sym:errCnt.declSym})
        }
        yield* lab()
        s.close(i)
        continue
      }
      yield i
    }
  }
}


/** 
 * handles `inlinePureJumps` option (inlines pure jumps between frames)
 * possible values:
 *    - 'call' - replaces with simple function call
 */
export function jumpOps(si) {
  const s = Kit.auto(si)
  if (!s.opts.inlinePureJumps
      || s.opts.defunct && s.opts.tailJumps)
    return s
  const jumpId = Kit.sysId(s.opts.pureBindName)
  return Kit.toArray(walk())
  function* walk() {
    for(const i of s) {
      yield i
      if (i.enter && i.type === Block.frame) {
        let cnt = 0
        let catchClause = false
        for(const j of s.sub()) {
          if (j.enter) {
            switch(j.type) {
            case Block.app:
              if (j.value.sym === jumpId) {
                const tail = !catchClause
                if (tail)
                  cnt++
                const lab = s.label()
                yield s.enter(j.pos,Tag.CallExpression,
                              {result:true,tail})
                let bind = j.value.hasBindVal ? [...s.one()] : []
                yield* Kit.reposOne(s.one(),Tag.callee)
                yield s.enter(Tag.arguments,Tag.Array)
                if (j.value.ctrlArg)
                  yield s.enter(Tag.push,Tag.Identifier,{sym:j.value.ctrlArg})
                yield* bind
                if (j.value.hasErrorCont)
                  Kit.skip(s.one())
                if (j.value.hasResultCont)
                  Kit.skip(s.one())
                yield* s.sub()
                yield* lab()
                s.close(j)
                continue
              }
              break
            case Tag.CatchClause:
              catchClause = true
              break
            case Tag.CallExpression:
              if (j.value.tail) {
                cnt++
              }
              break
            }
          }
          yield j
        }
        i.value.tailCallsNum = cnt
      }
    }
  }
}

/** 
 * wraps frames with try-catch blocks calling error handler in its catch 
 * runs with `inlineJsExceptions: true`
 */
export function jsExceptions(si) {
  const s = Kit.auto(si)
  if (!s.opts.inlineJsExceptions || s.opts.defunct)
    return s
  const root = s.first.value
  const skipFirst = s.opts.scopePrefix
  const {tailJumps} = s.opts
  let always = s.opts.inlineRaise !== "throw"
  const {errFrameRedir} = root
  return walk()
  function* walk() {
    if (skipFirst)
      yield* s.till(i => i.type === Block.frame && i.leave)
    for(const i of s) {
      yield i
      if (i.enter && i.type === Block.frame) {
        i.value.hasTryWrap = false
        const {catchContRedir:goto} = i.value
        const node = {}
        if (!goto || i.value === errFrameRedir
            || !always && (errFrameRedir === goto
                           || i.value.singleJump))
            continue
        i.value.hasTryWrap = true
        const lab = s.label()
        yield s.enter(Tag.push, Tag.TryStatement)
        yield s.enter(Tag.block, Tag.BlockStatement)
        yield s.enter(Tag.body, Tag.Array)
        let exits, exitLabSym
        if (tailJumps) {
          yield* s.sub()
        } else {
          for(const j of s.sub()) {
            if (j.enter && j.type === Ctrl.jump && j.value.goto
                && j.value.goto.catchContRedir !== goto
               ) {
              j.value.tail = true
              yield* s.copy(j)
              continue
            }
            yield j
          }
        }
        yield* s.leave()
        yield* s.leave()
        yield s.enter(Tag.handler,Tag.CatchClause)
        const sym = Kit.scope.newSym("ex")
        yield s.tok(Tag.param,Tag.Identifier,{sym})
        yield s.enter(Tag.body,Tag.BlockStatement)
        yield s.enter(Tag.body,Tag.Array)
        yield s.enter(Tag.push,Ctrl.jump,{
          goto,gotoDests:[goto],ref:i.value,sym:goto.errSym})
        if (goto.errSym) {
          goto.errSym.bound = true
          yield s.tok(Tag.push,Tag.Identifier,{sym})
        }
        yield* lab()
      }
    }
  }
}

/** moves tail calls to the end of the frame, out of surrounding try/catch  */
function reorderTailCalls(si) {
  const s = Kit.auto(si)
  if (!s.opts.inlineJsExceptions)
    return s
  const root = s.first.value
  const {tailJumps} = s.opts
  if (tailJumps)
    return s
  const thisCtx = root.opts.contextByThis
  return walk()
  function* walk() {
    for(const i of s) {
      yield i
      if (i.enter && i.type === Block.frame && i.value.hasTryWrap) {
        const num = i.value.tailCallsNum
        if (num) {
          const decls = i.value.first ? root.savedDecls
                : (i.value.savedDecls || (i.value.savedDecls = new Map()))
          const args = []
          const fnSym = num > 1 && !thisCtx && Kit.scope.newSym("fn")
          if (fnSym)
            decls.set(fnSym,{raw:null})
          let jump = null
          const lab = s.label()
          yield s.enter(Tag.push,Tag.LabeledStatement)
          yield s.tok(Tag.label,Tag.Identifier,{node:{name:"exit"}})
          yield s.enter(Tag.body,Tag.BlockStatement)
          yield s.enter(Tag.body,Tag.Array)
          for(const j of s.sub()) {
            if (j.enter && j.type === Tag.CallExpression && j.value.tail) {
              switch(j.type) {
              case Tag.CallExpression:
                if (j.value.tail) {
                  if (num === 1) {
                    jump = Kit.toArray(s.copy(j))
                  } else {
                    if (fnSym) {
                      yield s.enter(Tag.push,Tag.AssignmentExpression,
                                    {node:{operator:"="}})
                      yield s.tok(Tag.left,Tag.Identifier,{sym:fnSym})
                      yield* Kit.reposOne(s.one(),Tag.right)
                      yield* s.leave()
                    }
                    const a = s.take()
                    assert.ok(a.pos === Tag.arguments)
                    let argnum = 0
                    const ilab = s.label()
                    for(const k of s.sub()) {
                      yield s.enter(Tag.push,Tag.AssignmentExpression,
                                    {node:{operator:"="}})
                      const arg = args[argnum] || (args[argnum] = Kit.scope.newSym())
                      argnum++
                      yield s.tok(Tag.left,Tag.Identifier,{sym:arg})
                      yield s.peel(Kit.setPos(k,Tag.right))
                      yield* s.sub()
                      yield* ilab()
                    }
                    s.close(a)              
                    s.close(j)
                  }
                  yield s.enter(Tag.push,Tag.BreakStatement)
                  yield s.tok(Tag.label,Tag.Identifier,{node:{name:"exit"}})
                  yield* s.leave()
                  continue 
                }
                break
              case Tag.CatchClause:
                yield j
                yield* s.sub()
                break
              }
            }
            yield j
          }
          yield* lab()
          if (jump) {
            yield* jump
            continue
          }
          yield s.enter(Tag.push,Tag.CallExpression,{result:true})
          if (thisCtx) {
            yield s.enter(Tag.callee,Tag.MemberExpression)
            yield s.tok(Tag.object,Tag.ThisExpression)
            yield s.tok(Tag.property,Tag.Identifier,
                        {node:{name:s.opts.contFieldName}})
            yield* s.leave()
          } else
            yield s.tok(Tag.callee,Tag.Identifier,{sym:fnSym})
          yield s.enter(Tag.arguments,Tag.Array)
          for(const j of args) {
            decls.set(j,{raw:null})
            yield s.tok(Tag.push,Tag.Identifier,{sym:j})
          }
          yield* lab()
          continue
        }
        yield* s.sub()
      }
    }
  }
}

/** 
 * handles `inlinePureOp` option (inline pure operation)
 * possible values are:
 *   - "noop" - removes pure calls
 *   - "iterator" - changes lean iterator context fields
 */
export function pureOp(si) {
  const s = Kit.auto(si)
  if (!s.opts.inlinePureOp)
    return s
  const template = s.opts.inlinePureOp
  const noop = template === "noop"
  const generators = template === "iterator"
  const promise = template === "promise"
  if (!noop && !generators && !promise)
    throw s.error(`unsupported value ${s.opts.inlinePureOp}`)
  const {contextSym} = s.first.value
  if (!contextSym && generators)
    throw s.error("not implemented inlinePure: 'iterator' without context")
  const field = s.opts.contFieldName, exitField = s.opts.resultContFieldName
  return walk()
  function* val(pos) {
    const j = s.curLev()
    if (j) {
      j.value.result = true
      yield* Kit.reposOne(s.sub(),pos)
    } else {
      yield s.tok(Tag.push,Tag.Identifier,
                  {result:true,sym:Kit.scope.undefinedSym})
    }
  }
  function* walk() {
    for(const i of s) {
      if (i.enter && i.type === Block.app && i.value.sym === Block.pureId) {
        if (noop) {
          yield* val(i.pos)
        } else if (promise) {
          yield s.enter(Tag.push,Tag.CallExpression,{result:true})
          yield s.enter(Tag.callee,Tag.MemberExpression)
          yield s.tok(Tag.object,Tag.Identifier,{node:{name:"Promise"}})
          yield s.tok(Tag.property,Tag.Identifier,{node:{name:"resolve"}})
          yield* s.leave()
          yield s.enter(Tag.arguments,Tag.Array)
          if (s.curLev())
            yield* s.sub()
          yield* s.leave()
          yield* s.leave()
        } else {
          yield* s.toks(Tag.push,
                        `$1.${field} = $1.${exitField}, $1.done = true`,
                        contextSym)
          yield* assignValue(s,contextSym)
          yield s.tok(Tag.push,Tag.Identifier,{sym:contextSym,result:true})
        }
        s.close(i)
        continue
      }
      yield i
    }
  }
}

/** 
 * handles `inlineRaiseOp` option (inlines `raise` operation)
 * possible values are:
 *   - 'throw' - replaces with `throw` statement
 *   - 'promise` - replaces with `Promise.reject`
 */
export function raiseOp(si) {
  const s = Kit.auto(si)
  if (!s.opts.inlineRaiseOp)
    return s
  const asThrow = s.opts.inlineRaiseOp === "throw"
  const asReject = s.opts.inlineRaiseOp === "promise"
  if (!asThrow && !asReject)
    throw new Error(`unknown 'inlineRaiseOp' option ${s.opts.inlineRaiseOp}`)
  return walk()
  function* walk() {
    for(const i of s) {
      const lab = s.label()
      if (i.enter && i.type === Block.app && i.value.sym === Except.raiseId) {
        if (asThrow) {
          yield s.enter(i.pos,Tag.ThrowStatement)
          yield* Kit.reposOne(s.sub(),Tag.argument)
        } else {
          yield s.enter(i.pos,Tag.CallExpression,{result:true})
          yield* s.toks(Tag.callee,"=Promise.reject")
          yield s.enter(Tag.arguments,Tag.Array)
          yield* Kit.reposOne(s.sub(),Tag.push)
        }
        yield* lab()
        s.close(i)
        continue
      }
      yield i
    }
  }
}

/** converts throw statements into `raise` operations `inlineThrow` option */
export function throwStatements(si) {
  const s = Kit.auto(si)
  if (!s.opts.inlineThrow)
    return s
  const {errFrameRedir} = s.first.value
  return walk()
  function* walk() {
    for(const i of s) {
      let goto
      if (i.enter && i.type === Block.frame
          && (goto = i.value.catchContRedir)) {
        yield i
        for(const j of s.sub()) {
          if (j.enter && j.type === Tag.ThrowStatement) {
            yield s.enter(j.pos,Ctrl.jump,{ref:j.value,goto,
                                           sym:goto.errSym,
                                           gotoDests:[goto]})
            if (!j.leave)
              yield* s.sub()
            yield* s.leave()
            s.close(j)
            if (j.pos === Tag.push)
              Kit.skip(s.sub())
            continue
          }
          yield j
        }
        continue
      }
      yield i
    }
  }
}


export function coerce(si) {
  const s = Kit.auto(si)
  if (!s.opts.coerce || !s.opts.inlineCoerce)
    return s
  const root = s.first.value
  const {bindName,inlineCoerceCheckIsFunc:checkIsFunc} = s.opts
  return walk()
  function needsCoerce(n) {
    return !n || n === bindName || n === "map"
  }
  function* walk() {
    for(const i of s) {
      let name
      if (i.enter && i.type === Block.letStmt && i.value.eff
          && needsCoerce(name = i.value.bindName || bindName)) {
        const frame = i.value.ref
        const decls = frame.savedDecls || (frame.savedDecls = new Map())
        let sym, pos = i.pos
        const j = s.cur()
        const lab = s.label()
        if (j.type === Tag.Identifier && j.value.sym) {
          sym = j.value.sym
          Kit.skip(s.one())
        } else {
          sym = Kit.scope.newSym()
          decls.set(sym,{raw:null})
          yield s.enter(i.pos,Tag.SequenceExpression,{result:true})
          yield s.enter(Tag.expressions,Tag.Array)
          yield s.enter(Tag.push,Tag.AssignmentExpression,{node:{operator:"="}})
          yield s.tok(Tag.left,Tag.Identifier,{sym})
          yield* Kit.reposOne(s.one(),Tag.right)
          yield* s.leave()
          pos = Tag.push
        }
        yield s.enter(pos,Tag.ConditionalExpression,{result:true})
        let str = `=$1 && $1.${name}`
        if (checkIsFunc)
          str += `&& typeof $1.${name} === "function"`
        yield* s.toks(Tag.test,str,sym)
        yield s.enter(Tag.consequent,Block.letStmt,i.value)
        yield s.tok(Tag.push,Tag.Identifier,{sym})
        yield* s.leave()
        yield s.enter(Tag.alternate,Ctrl.jump,
                      Object.assign({},i.value,
                                    {bindJump:false,bindName:null}))
        yield s.tok(Tag.push,Tag.Identifier,{sym})
        yield* lab()
        s.close(i)
        continue
      }
      yield i
    }
  }
}

/** runs after `Flat.interpretJumps` */
export const control = Kit.pipe(jumpOps,
                                reorderTailCalls,
                                storeContinuations)

/** runs before `Flat.interpretApp` */
export const ops = Kit.pipe(pureOp,raiseOp)


/** runs before `Block.interpretJumps` */
export const jumps = Kit.pipe(promises,
                              coerce,
                              generatorsYield)

