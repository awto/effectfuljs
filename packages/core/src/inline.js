import * as Kit from "./kit"
import {Tag,invariant} from "./kit"
import * as Block from "./block"
import * as Bind from "./bind"
import * as Ctrl from "./control"
import * as Except from "./exceptions"
import * as Branch from "./branch"
import * as Loop from "./loops"
import * as Par from "./par"

/** marks frames with only jump in its payload, so no needs to check reentry */
export function markSimpleRedir(si) {
  const s = Kit.auto(si)
  return s.opts.inlineReentryCheck || !s.opts.defunt ? _markSimpleRedir() : s
  function* _markSimpleRedir() {
    for(const i of s) {
      if (i.enter && i.type === Block.frame) {
        const j = s.cur()
        i.value.simpleRedir = j.type === Block.letStmt && i.value.eff
          || j.type === Ctrl.jump
          || j.type === Block.app
      }
      yield i
    }
  }
}

/**
 * inline assignments to function's global continuations's fields at each step
 */
export function storeContinuations(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const {contextSym} = root
  const contextStore = contextSym && s.opts.contextMethodOps
  const noPureJumpsStore = !s.opts.defunct
        && (s.opts.contextBy === "reference" || s.opts.contextBy === "closure")
  if (s.opts.contextBy === "closure") {
    if (s.opts.storeResultCont && !s.opts.inlineResultContAssign)
      throw s.error(
        "`storeResultCont` with `contextBy:\"closure\"` needs `inlineResultContAssign`")
    if (s.opts.storeErrorCont && !s.opts.inlineErrorContAssign)
      throw s.error(
        "`storeErrorCont`+`contextBy:\"closure\"` needs `inlineErrorContAssign`")
    if (s.opts.storeCont && !s.opts.inlineContAssign)
      throw s.error(
        "`storeCont`+`contextBy:\"closure\"` needs `inlineContAssign`")
  }
  function makeSym(name,pat,threadLocal) {
    if (!name)
      return false
    if (contextStore)
      return Kit.sysId(name,true,threadLocal)
    const res = Bind.tempVarSym(root,pat)
    res.fieldName = name
    return res
  }
  root.runningContSym = makeSym(s.opts.storeRunningCont,"gc",true)
  const res = s.opts.inlineResultContAssign && root.resContSym
  root.errContSym = makeSym(s.opts.storeErrorCont,"ec",true)
  const err = s.opts.inlineErrorContAssign && root.errContSym
  const inlineConts = s.opts.inlineContAssign
  const inlineContJumps = inlineConts  || s.opts.inlinePureJumps === "tail"
  root.contSym = makeSym(s.opts.storeCont,"sc",true)
  const cont = inlineContJumps && root.contSym
  const errIgnore = s.opts.inlineErrorContAssign === "ignore"
  const resIgnore = s.opts.inlineResultContAssign === "ignore"
  const thisCtx = s.opts.contextBy === "this"
  if (s.opts.defunct) {
    root.handlerSym = makeSym(s.opts.storeHandler || "$run","rn")
    if (!s.opts.defunctHandlerInProto && s.opts.contextBy !== "closure") {
      root.errHandlerSym = makeSym("$err","rn")
      root.resHandlerSym = makeSym("$fin","rn")
    }
  }
  const reentry = !s.opts.defunct && s.opts.inlineReentryCheck && cont
  if (!err && !res && !cont)
    return s
  return _storeContinuations()
  function* _assign(l,r) {
    yield s.enter(Tag.push,Tag.AssignmentExpression,{node:{operator:"="}})
    yield s.tok(Tag.left,Tag.Identifier,{sym:l,lhs:true,rhs:false,decl:false})
    yield s.tok(Tag.right,Tag.Identifier,{sym:r,lhs:false,rhs:true,decl:false})
    yield* s.leave()
  }
  function* _storeContinuations() {
    for(const i of s) {
      if (i.enter && i.type === Block.frame && i.value.errSym && errIgnore) {
        Kit.skip(s.copy(i))
        continue
      }
      yield i
      if (i.enter && i.type === Block.frame) {
        const f = i.value
        let assignResult = false, assignError = false, assignCont = false
        const rframe = f.resultContRedir
        const eframe = f.catchContRedir
        if (f.enters && f.enters.size) {
          if (rframe && res) {
            for(const j of f.enters) {
              if (j.ref.resultContRedir !== rframe) {
                assignResult = true
                break
              }
            }
          }
          if (eframe && err) {
            for(const j of f.enters) {
              if (eframe && err && j.ref.catchContRedir !== eframe) {
                assignError = true
                break
              }
            }
          }
        } else {
          assignResult = true
          assignError = true
        }
        if (res && rframe && !rframe.removed && assignResult && !resIgnore)
          yield* _assign(res,rframe.declSym)
        if (err && eframe && !eframe.removed && assignError && !errIgnore)
          yield* _assign(err,eframe.declSym)
        if (reentry && !f.first && !f.simpleRedir)
          yield* _assign(reentry,Block.alreadyRunningSym)
        for(const j of s.sub()) {
          if (j.enter) {
            switch(j.type) {
            case Block.letStmt:
              if (!j.value.eff || !inlineConts)
                break
            case Ctrl.jump:
              if (j.value.reflected || j.value.cloneCtx != null)
                break
              if (noPureJumpsStore && j.type === Ctrl.jump
                  && !j.value.rec && !thisCtx || !inlineContJumps)
                break
              const {goto} = j.value
              if (cont
                  // TODO: for pure jumps somtimes the destination isn't saved
                  /* && (f.first || goto !== f || reentry) */
                  && !j.value.delegateCtx)
                yield* _assign(cont,goto.declSym)
            }
          }
          yield j
        }
      }
    }
  }
}

function* assignValue(s,contextSym) {
  yield s.enter(Tag.push,Tag.AssignmentExpression,
                {node:{operator:"="}})
  yield* s.toks(Tag.left,"=$I.value",contextSym)
  yield* s.curLev() ? Kit.reposOne(s.one(),Tag.right)
    : Kit.scope.emitUndefined(Tag.right)
  Kit.skip(s.sub())
  yield* s.leave()
}

/**
 * inlining yield/yield* expressions for generators implementation
 * handles options:
 *  - `inlineYieldOp: "iterator" || "iteratorResult" || "iteratorResultPromise"`
 *  - `inlineYieldStarOp: "iterator"`
 *  - `inlineScopeOp: "unwrap" | "context"`
 */
function generatorsYield(si) {
  const s = Kit.auto(si)
  const {inlineYieldOp,inlineYieldStarOp,inlineScopeOp} = s.opts
  const inlineYield = inlineYieldOp === "iterator"
  const inlineYieldResult = inlineYieldOp === "iteratorResult"
  const inlineYieldResultPromise = inlineYieldOp === "iteratorResultPromise"
  const inlineYieldStar = inlineYieldStarOp === "iterator"
  const inlineScopeUnwrap = inlineScopeOp === "unwrap"
  const inlineScopeRetCtx = inlineScopeOp === "context"
  const cont = s.opts.storeCont
  if (!inlineYieldStar && !inlineYield && !inlineYieldResult
      && !inlineYieldResultPromise
      && !inlineScopeUnwrap && !inlineScopeRetCtx)
    return s
  const {contextSym} = s.first.value
  const root = s.first.value
  if (!contextSym)
    throw s.error(
      "inlineYieldOp: 'iterator' can be used only with scope context")
  if ((inlineYield || inlineYieldStar) && !s.opts.inlineContAssign)
    throw s.error("inlineYieldOp: 'iterator' requires inlineContAssign: true")
  const noResult = s.opts.returnContext === false
  return _generatorsYield()
  function* _generatorsYield() {
    for(const i of s) {
      if (i.enter && i.type === Block.letStmt && i.value.eff) {
        switch(i.value.bindName) {
        case "yld":
          if (!inlineYield && !inlineYieldResult && !inlineYieldResultPromise)
            break
          if (inlineYield) {
            const ctx = contextSym
            yield* assignValue(s,ctx)
            if (!noResult)
              yield s.tok(Tag.push,Tag.Identifier,{result:true,sym:ctx})
            s.close(i)
            continue
          }
          yield* s.template(Tag.push,
                            inlineYieldResult
                            ? `=({value:$E,done:false})`
                            : `=Promise.resolve({value:$E,done:false})`,
                            {result:true})
          yield* s.curLev() ? Kit.reposOne(s.one(),Tag.value)
            : Kit.scope.emitUndefined(Tag.right)
          Kit.skip(s.sub())
          yield* s.sub()
          yield* s.leave()
          s.close(i)
          continue
        case "yldStar":
          if (!inlineYieldStar)
            break
          yield s.enter(Tag.push,Tag.CallExpression,{result:!noResult})
          yield s.tok(Tag.callee,Tag.Identifier,{sym:Block.delegateSym})
          yield s.enter(Tag.arguments,Tag.Array)
          yield* s.sub()
          yield* s.leave()
          yield* s.leave()
          s.close(i)
          continue
        case "scope":
          if (inlineScopeUnwrap) {
            yield s.enter(Tag.push,Tag.MemberExpression,{result:true})
            yield s.tok(Tag.object,Tag.Identifier,{sym:contextSym})
            yield s.tok(Tag.property,Tag.Identifier,{node:{name:"unwrap"}})
            yield* s.leave()
            s.close(i)
            continue
          }
          if (inlineScopeRetCtx) {
            if (!noResult)
              yield s.tok(Tag.push,Tag.Identifier,{sym:contextSym,result:true})
            s.close(i)
            continue
          }
          break
        }
      }
      yield i
    }
  }
}

/** resolve handler for promises */
const resolveSym = Kit.sysId("$resolve",true)
resolveSym.threadLocal = true
/** promise rejection handler */
const rejectSym = Kit.sysId("$reject",true)
rejectSym.threadLocal = true
/** cancelation handler for moving state */
const cancelSym = Kit.sysId("$cancel",true)
cancelSym.threadLocal = true
/** resulting promise resolving callback */
const onResolveSym = Kit.sysId("$rs",true)
onResolveSym.threadLocal = true
/** resulting promise rejection callback */
const onRejectSym = Kit.sysId("$rj",true)
onRejectSym.threadLocal = true

/**
 * inline chain operation as ES Promise operation
 * handles option `inlineChainOp === "promise"`
 */
export function promises(si) {
  const s = Kit.auto(si)
  const {contextBy,defunct} = s.opts
  if (s.opts.inlineChainOp !== "promise")
    return s
  const root = s.first.value
  const {errFrameRedir,resFrameRedir,contextSym} = root
  const ctxRef = contextBy === "reference"
  const left = s.opts.leftChain
  let localResolve = resolveSym
  let localReject = rejectSym
  if (contextBy === "closure" && defunct) {
    localResolve = root.implFrame.value.declSym
    if (!root.errMap || !root.errMapSym)
      localReject = left ? onRejectSym : null
    else
      localReject = Kit.scope.newSym("$reject")
  }
  root.localRejectSym = localReject
  root.localResolveSym = localResolve
  return left ? s : _promises()
  function* _promises() {
    for(const i of s) {
      yield i
      if (i.type === Block.chain)
        break
    }
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.letStmt:
          if (!i.value.goto
              || i.value.opSym !== Block.chainId
              || i.value.reflected)
            break
          const errCnt = i.value.ref.catchContRedir
          const lab = s.label()
          yield s.enter(i.pos,Block.effExpr,i.value)
          yield* localReject
            ? s.template(i.pos,`=Promise.resolve($E).then($I,$I)`,
                         localResolve,localReject)
            : s.template(i.pos,`=Promise.resolve($E).then($I)`, localResolve)
          if (!i.leave)
            yield* s.sub()
          yield* lab()
          s.close(i)
          continue
        }
      }
      yield i
    }
    yield* s
  }
}

/**
 * context-less async function implementation, the state is stored in closure
 */
export function promisesClosure(si) {
  const s = Kit.auto(si)
  if (s.opts.inlineChainOp !== "promise" || s.opts.contextBy !== "closure")
    return s
  const root = s.first.value
  const left = s.opts.leftChain
  const {errFrameRedir,resFrameRedir,contextSym,savedDecls} = root
  if (!s.opts.defunct)
    throw s.error(`'inlineChainOp:"leftChain"' requires 'defunct'`)
  const decls = savedDecls
  let localLoopSym
  let loopImplSym
  const localReject = root.localRejectSym
  const localResolve = root.localResolveSym
  let localPromiseSym, resolveContSym, rejectContSym
  if (left) {
    localLoopSym = Kit.scope.newSym("$loop")
    loopImplSym = Kit.scope.newSym("$loop$impl")
    decls.set(localLoopSym,
              {raw:null,
               init:[s.tok(Tag.init,Tag.Identifier,{sym:loopImplSym})]})
    root.localPromiseSym = localPromiseSym = Kit.scope.newSym("$res"),
    savedDecls.set(localPromiseSym,{})
    resolveContSym = root.promiseResolveSym = onResolveSym
    rejectContSym = root.promiseRejectSym = onRejectSym
    root.promiseLoopSym = localLoopSym
  }
  const handlerSym = root.implFrame.value.declSym
  let scopeTmpVar
  if (left) {
    scopeTmpVar = Kit.scope.newSym()
    decls.set(scopeTmpVar,{})
  }
  return _promisesClosure()
  function* _promisesClosure() {
    let first = null
    for(first of s) {
      yield first
      if (first.type === Block.frame) {
        break
      }
    }
    if (left)
      yield* s.toks(Tag.push,`=$I=new Promise(function(rs,rj){$I=rs,$I=rj})`,
                    localPromiseSym,resolveContSym,rejectContSym)
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.app:
          i.value.result = false
          break
        case Ctrl.jump:
          if (i.value.reflected)
            break
          if (!i.leave && s.curLev()) {
            yield* scopeTmpVar
              ? s.template(i.pos,`=$I = $I($E)`,scopeTmpVar,handlerSym)
              : s.template(i.pos,`=$I($E)`,{result:true},handlerSym)
            yield* s.sub()
            yield* s.leave()
          } else
            yield* scopeTmpVar
              ? s.toks(i.pos,`=$I = $I(void 0)`,scopeTmpVar,handlerSym)
              : s.toks(i.pos,`=$I(void 0)`,{result:true},handlerSym)
          s.close(i)
          continue
        case Block.letStmt:
          if (!i.value.eff)
            break
          if (i.value.bindName === "scope") {
            yield* scopeTmpVar
              ? s.toks(i.pos,`=$I = $I(void 0)`,scopeTmpVar,handlerSym)
              : s.toks(i.pos,`=$I(void 0)`,{result:true},handlerSym)
            Kit.skip(s.sub())
            s.close(i)
            continue
          }
          yield s.enter(i.pos,Block.effExpr,{reflected:true,tmpVar:scopeTmpVar})
          yield* s.sub()
          yield* s.leave()
          s.close(i)
          continue
        }
      }
      yield i
    }
    const lab = s.label()
    const threadPat = Kit.scope.newSym()
    if (left) {
      yield* localReject
        ? s.toks(Tag.push,`=Promise.resolve($I).then($I,$I)`,
                 scopeTmpVar,localLoopSym,localReject)
        : s.toks(Tag.push,`=Promise.resolve($I).then($I)`,scopeTmpVar,localLoopSym)
      yield s.tok(Tag.push,Tag.Identifier,{result:true,sym:localPromiseSym})
    }
    yield s.close(first)
    for(const i of s.sub()) {
      if (i.enter) {
        if (i.type === Block.letStmt && i.value.eff) {
          yield s.enter(i.pos,Block.effExpr,i.value)
          yield* s.sub()
          yield* s.leave()
          s.close(i)
          continue
        }
      }
      yield i
    }
    if (left) {
      yield* localReject
        ? s.toks(Tag.push,
          `function $I(p) {  Promise.resolve($I(p)).then($I,$I); }`,
          loopImplSym,handlerSym,localLoopSym,localReject)
        : s.toks(Tag.push,
          `function $I(p) {  Promise.resolve($I(p)).then($I); }`,
                 loopImplSym,handlerSym,localLoopSym)
      if (localReject) {
        if (s.opts.storeErrorCont) {
          if (!root.contSym)
            throw s.error(`this configuration requires "storeCont"`)
          yield* s.toks(
            Tag.push,
            `function $I(e) {  $I = $I; $I(e) }`,
            localReject,root.contSym,root.errContSym,localLoopSym)
        } else if (root.errMapSym) {
          if (!root.runningContSym)
            throw s.error(`this configuration requires "storeRunningCont"`)
          if (!root.contSym)
            throw s.error(`this configuration requires "storeCont"`)
          yield* s.toks(Tag.push,`function $I(e) { $I = $I($I); $I && $I(e) }`,
                        localReject,root.contSym,root.errMapSym,
                        root.runningContSym,localLoopSym,localLoopSym)
        }
      }
    } else {
      if (localReject) {
        if (s.opts.storeErrorCont) {
          if (!root.contSym)
            throw s.error(`this configuration requires "storeCont"`)
          yield* s.toks(Tag.push,`function $I(e) { $I = $I; return $I(e) }`,
                        localReject,root.contSym,root.errContSym,localResolve)
        } else if (root.errMapSym) {
          if (!root.runningContSym)
            throw s.error(`this configuration requires "storeRunningCont"`)
          if (!root.contSym)
            throw s.error(`this configuration requires "storeCont"`)
          yield* s.toks(Tag.push,`function $I(e) { $I = $I($I); return $I(e) }`,
                        localReject,root.contSym,root.errMapSym,
                        root.runningContSym,localResolve)
        }
      }
    }
    yield* lab()
    yield* s
  }
}


/** 
 * handles `inlinePureJumps` option (inlines pure jumps between frames)
 * possible values:
 *    - 'call' - replaces with simple function call
 *    - 'tail' - moves the call to the end of frame
 *    - 'promise' - wraps with promise resolve
 *    - 'exit' - doesn't call anything and leaves it to caller to re-call
 */
export function jumpOps(si) {
  const s = Kit.auto(si)
  const inlineJumps = s.opts.inlinePureJumps === "call"
  const inlineScope = s.opts.inlineScopeOp === "call"
  const jumpsExit = s.opts.inlinePureJumps === "exit"
  const promiseJumps = s.opts.inlinePureJumps === "promise"
  const promiseRec = s.opts.inlineChainOp === "promise"
  if (s.opts.inlinePureJumps && !inlineJumps && !jumpsExit && !promiseJumps
      && s.opts.inlinePureJumps && s.opts.inlinePureJumps !== "tail") {
    throw s.error(
      `unsupported value ${s.opts.inlinePureJumps} for inlinePureJumps`)
  }
  if (!inlineJumps && !inlineScope && !jumpsExit && !promiseJumps)
    return s
  if (inlineScope && !s.opts.defunct)
    throw s.error("`inlineScope:'call'` requires `defunct:true`")
  if (jumpsExit || promiseJumps) {
    if (!s.opts.inlineContAssign)
      throw s.error(
        "`inlineJumps:'exit'|'promise' works only with `{inlineContAssign:true}`")
  }
  const {jsTailCalls,contextBy} = s.opts
  const root = s.first.value
  const cont = s.opts.storeCont
  const {contextSym} = root
  if (!contextSym)
    throw s.error('`inlinePureJumps: "call"` requires context object')
  const jumpId = Kit.sysId(s.opts.pureBindName)
  const jumpRId = Kit.sysId(s.opts.pureBindName + "R")
  const scopeId = Kit.sysId("scope")
  const inlineCont = root.handlerSym || s.opts.inlineContAssign && root.contSym
  const refCtx = contextBy === "reference" || contextBy === "closure"
  const paramCtx = contextBy === "parameter"
  const thisCtx = contextBy === "this"
  const noResult = s.opts.returnContext === false
  return Kit.toArray(_jumpOps())
  function* _jumpOps() {
    for(const i of s) {
      yield i
      if (i.enter && i.type === Block.frame) {
        let cnt = 0
        let catchClause = false
        for(const j of s.sub()) {
          if (j.enter) {
            switch(j.type) {
            case Block.app:
              if (j.value.sym === jumpId && inlineJumps
                  || j.value.sym == jumpRId && inlineJumps && jsTailCalls
                  || j.value.sym === scopeId && inlineScope) {
                if (!inlineCont
                    && !j.value.hasCont
                    && !j.value.hasErrorCont
                    && !j.value.hasResultCont) {
                  Kit.skip(s.copy(j))
                  if (!noResult)
                    yield s.tok(Tag.push,Tag.Identifier,
                                {result:true,sym:contextSym})
                  continue
                }
                const tail = !catchClause
                if (tail)
                  cnt++
                const lab = s.label()
                yield s.enter(j.pos,Tag.CallExpression,
                              {result:!noResult,tail})
                let bind = j.value.hasBindVal ? [...s.one()] : []
                if (refCtx && j.value.sym === scopeId) {
                  yield s.tok(Tag.callee,Tag.Identifier,
                              {sym:root.implFrame.value.declSym})
                } else if (j.value.passCont) {
                  yield* Kit.reposOne(s.one(),Tag.callee)
                } else if ((refCtx || paramCtx) && j.value.goto
                           && !j.value.delegateCtx) {
                  yield s.tok(Tag.callee,Tag.Identifier,{sym:j.value.goto})
                } else if (j.value.delegateCtx) {
		  yield* s.toks(Tag.callee,`=$I.$s.${cont}`,j.value.delegateCtx)
                } else {
                  yield s.tok(Tag.callee,Tag.Identifier,{sym:inlineCont})
                }
                yield s.enter(Tag.arguments,Tag.Array)
                if (paramCtx)
                  yield s.tok(Tag.push,Tag.Identifier,{sym:contextSym})
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
              if (j.value.sym === jumpRId
                  && (inlineJumps || jumpsExit || promiseJumps)
                  || j.value.sym === jumpId && (jumpsExit || promiseJumps)) {
                const ctx = j.value.delegateCtx || contextSym
                if (promiseRec || promiseJumps) {
                  yield* s.template(Tag.push,`=Promise.resolve($E).then($1)`,
                                    {result:true},j.value.goto)
                  yield* s.one()
                  yield* s.leave()
                } else {
                  if (j.value.hasBindVal)
                    yield* assignValue(s,ctx)
                  if (j.value.delegateCtx) {
                    yield* s.toks(Tag.push,"=$1.$s.$running = true, $1.$s",{result:true},ctx)
                  } else {
                    yield* s.toks(Tag.push,"$I.$running = true", ctx)
                    if (!noResult)
                      yield s.tok(Tag.push,Tag.Identifier,{sym:ctx,result:true})
                  }
                }
                Kit.skip(s.sub())
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
  const {errFrameRedir,resFrameRedir} = root
  return _jsExceptions()
  function* _jsExceptions() {
    if (skipFirst)
      yield* s.till(i => i.type === Block.frame && i.leave)
    for(const i of s) {
      yield i
      if (i.enter && i.type === Block.frame) {
        i.value.hasTryWrap = false
        const {catchContRedir:goto} = i.value
        const node = {}
        if (!goto || i.value === errFrameRedir
            || i.value === resFrameRedir
            || i.value.last
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
                && j.value.goto.catchContRedir !== goto) {
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

/** 
 * handles `inlinePureOp` option (inline pure operation)
 */
export function pureOp(si) {
  const s = Kit.auto(si)
  if (!s.opts.inlinePureOp)
    return s
  const {inlineYieldOp} = s.opts
  const template = s.opts.inlinePureOp
  const asis = template === "asis"
  const generators = template === "iterator"
  const inlineYieldResult = inlineYieldOp === "iteratorResult"
  const inlineYieldResultPromise = inlineYieldOp === "iteratorResultPromise"
  const promise = template === "promise" && !s.opts.leftChain
  if (!asis && !generators && !promise)
    return s
  const {contextSym} = s.first.value
  if (!contextSym && generators)
    throw s.error("not implemented inlinePure: 'iterator' without context")
  const field = s.opts.storeCont, exitField = s.opts.storeResultCont
  const exitCont = s.opts.defunct ? "0" : `$1.${exitField}`
  const root = s.first.value
  return _pureOp()
  function* _pureOp() {
    for(const i of s) {
      if (i.enter && i.type === Block.app) {
        if (i.value.sym === Block.pureId) {
          const lab = s.label()
          if (asis) {
            yield s.enter(i.pos, Block.effExpr, i.value)
            if (!i.leave)
              yield* s.sub()
          } else if (promise) {
            yield s.enter(i.pos, Block.effExpr, i.value)
            yield* s.template(Tag.push,`=Promise.resolve($E)`)
            if (s.curLev())
              yield* s.sub()
          } else {
            yield* s.toks(Tag.push,`$1.${field} = ${exitCont}`,contextSym)
            if (inlineYieldResult || inlineYieldResultPromise) {
              yield s.enter(i.pos, Block.effExpr, i.value)
              yield* s.template(Tag.push,
                                inlineYieldResult ? `=({value:$E,done:true})`
                                : `=Promise.resolve({value:$E,done:true})`)
              yield* s.curLev() ? Kit.reposOne(s.one(),Tag.value)
                : Kit.scope.emitUndefined(Tag.value)
              Kit.skip(s.sub())
            } else {
              yield* assignValue(s,contextSym)
              yield* s.toks(Tag.push,`=$I.done = true`,contextSym)
              yield s.enter(i.pos, Block.effExpr, i.value)
              yield s.tok(Tag.push,Tag.Identifier,{sym:contextSym})
            }
          }
          yield* lab()
          s.close(i)
          continue
        }
      }
      yield i
    }
  }
}

/** 
 * handles `inlinePureOp` option (inline pure operation)
 */
export function pureOpLeft(si) {
  const s = Kit.auto(si)
  if (s.opts.inlinePureOp !== "promise" || !s.opts.leftChain)
    return s
  const root = s.first.value
  return _pureOpLeft()
  function* _pureOpLeft() {
    let reflected = false
    for(const i of s) {
      if (i.enter) {
        switch(i.type) {
        case Block.effExpr:
          reflected = i.value.reflected
          break
        case Block.app:
          if (i.value.sym !== Block.pureId)
            break
          yield s.enter(i.pos, Block.effExpr, i.value)
          if (reflected || i.value.reflected)
            yield* s.template(Tag.push,`=Promise.resolve($E)`)
          else {
            if (i.value.result === false)
              i.value.reflected = true
            yield* s.template(Tag.push,`=$I = void 0,$I($E)`,
                              root.promiseLoopSym,root.promiseResolveSym)
          }
          if (s.curLev())
            yield* s.sub()
          yield* s.leave()
          yield* s.leave()
          s.close(i)
          continue
        }
      }
      if (i.leave && i.type === Block.effExpr)
        reflected = false
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
  const asReject = s.opts.inlineRaiseOp === "promise" && !s.opts.leftChain
  const asRejectLeft = s.opts.inlineRaiseOp === "promise" && s.opts.leftChain
  if (!asThrow && !asReject && !asRejectLeft)
    throw new Error(`unknown 'inlineRaiseOp' option ${s.opts.inlineRaiseOp}`)
  const {resContSym,contSym} = s.first.value
  const {defunct} = s.opts
  const noResult = s.opts.returnContext === false
  const root = s.first.value
  return _raiseOp()
  function* _raiseOp() {
    for(const i of s) {
      const lab = s.label()
      if (i.enter && i.type === Block.app && i.value.sym === Except.raiseId) {
        if (asThrow) {
          if (contSym && defunct)
            yield* s.toks(Tag.push,`$I = 0`,contSym)
          else if (contSym && resContSym)
            yield* s.toks(Tag.push,`$I = $I`,contSym,resContSym)
          yield s.enter(i.pos,Tag.ThrowStatement)
          yield* Kit.reposOne(s.sub(),Tag.argument)
        } else if (asRejectLeft) {
          yield* i.value.result === false
            ? s.template(Tag.push,`=$I = void 0, $I($E), $I`,
                         {result:true},root.promiseLoopSym,
                         root.promiseRejectSym,root.localPromiseSym)
            : s.template(Tag.push,`=$I = void 0, $I($E)`,
                         {result:true},root.promiseLoopSym,root.promiseRejectSym)
          yield* Kit.reposOne(s.sub(),Tag.push)
        } else {
          if (defunct)
            yield* s.template(Tag.push,
                            `=$I = 0, Promise.reject($E)`,
                              {result:true},contSym)
          else
            yield* s.template(Tag.push,
                            `=$I = $I, Promise.reject($E)`,
                              {result:true},contSym,resContSym)
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
  return _throwStatements()
  function* _throwStatements() {
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

/** 
 * converts `fork`/`share` expressions into `Promise.all` 
 * if `inlineFork:"promise"` 
 */
export function inlinePar(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  if (s.opts.inlineFork !== "promise" || !root.hasPar)
    return s
  if (!s.opts.defunct)
    throw s.error(`inlineFor:"promise" requires "defunct":true`)
  throw s.error("Not Implemented: `par` with `inline`")
  return _inlinePar()
  function* _inlinePar() {
    for(const i of s.sub()) {
      if (i.enter && i.type === Block.app) {
        const {sym} = i.value
        if (sym === Par.shareId) {
          const next = s.cur().value
          next.tmpVar = i.value.tmpVar
          next.reflected = i.value.reflected
          yield* _inlinePar()
          s.close(i)
          continue
        }
        if (sym === Par.forkId) {
          yield s.enter(i.pos,Block.effExpr,i.value)
          yield* s.template(Tag.push,"=Promise.all($E)")
          yield* s.sub()
          yield* s.leave()
          yield* s.leave()
          s.close(i)
          continue
        }
      }
      yield i
    }
  }
}

/** coerce checks inlining (`inlineCoerce:true`) */
export function coerce(si) {
  const s = Kit.auto(si)
  if (!s.opts.coerce || !s.opts.inlineCoerce)
    return s
  const root = s.first.value
  const {bindName,inlineCoerceCheckIsFunc:checkIsFunc} = s.opts
  return _coerce()
  function needsCoerce(n) {
    return !n || n === bindName || n === "map"
  }
  function* _coerce() {
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

/** injects interpretation `for-of` with `invertForOf:true` (CPS style) */
export function invertForOf(si) {
  const sa = Kit.toArray(si)
  const root = sa[0].value
  if (!root.opts.invertForOf || !root.hasForOf || !root.opts.inlineYieldStar)
    return sa
  const jumpsExit = root.opts.inlinePureJumps === "exit"
  const dirCall = root.opts.storeCont === "step"
  return inject()
  function inject() {
    const s = Kit.auto(sa)
    const ctx = root.contextSym
    const {storeResultCont,storeCont:cont} = s.opts
    if (!ctx)
      throw s.error("not implemented: `invertForOf` without context object")
    if (s.opts.state)
      throw s.error("not implemented: `invertForOf` with `state`")
    if (!s.opts.inlineContAssign)
      throw s.error("not implemented: `invertForOf` without `inlineContAssign`")
    if (!s.opts.markRepeat)
      throw s.error("not implemented: `invertForOf` without `markRepeat`")
    if (s.opts.defunct)
      throw s.error("not implemented: `invertForOf` with `defunct`")
    const paramCtx = s.opts.contextBy === "parameter"
    const frames = []
    const res = Kit.toArray(_inject(s))
    return res
    function* _inject(sw) {
      for(const i of sw) {
        if (i.enter) {
	  if ((i.type === Ctrl.jump || i.type === Block.letStmt)
	      && i.value.frameArgs) {
	    const args = i.value.frameArgs
	    for(const [n,v] of args) {
	      if (!v.substLoop)
		continue
	      args.set(n, v.substLoop)
	    }
	  }
          switch(i.type) {
          case Tag.MemberExpression:
            if (!i.value.forOfInfo)
              break
            yield s.tok(i.pos,Tag.Identifier,{sym:i.value.forOfInfo.patSym})
            Kit.skip(s.copy(i))
            continue
          case Block.frame:
	    frames.push(i.value)
            i.value.declSym.forOfInfo = i.value.forOfInfo
	    if (i.value.forOfFin) {
	      const cur = i.value.forOfFin
	      const exit = cur.exit.goto
	      const up = cur.up
	      yield i
	      Kit.skip(s.sub())
	      yield* s.toks(Tag.push, `=$1.$exit()`,
			    {result:true}, cur.sym)
	      yield s.close(i)
	      continue
	    }
            if (!i.value.forOfInfo)
              break
            yield i
            yield* s.toks(Tag.push,"=$2.$s = $1.unwrap.$t",
			  ctx,i.value.forOfInfo.sym)
            continue
          case Block.letStmt:
            if (!i.value.eff)
              break
            if (i.value.bindName === "yldStar") {
              i.value.storeCont = false
              break
            }
          case Ctrl.jump: {
            const {goto} = i.value
            const {forOfInfo} = goto
            if (!forOfInfo)
              break
            i.value.storeCont = false
            i.value.delegateCtx = goto.forOfInfo.sym
	    const exit = forOfInfo.exit.goto
	    const up = exit.forOfInfo
	    if (up) {
	      yield* s.toks(Tag.push,
			    `=$1.$r = $2.$s, $1.$rstep = $2.$s.$step`,
			    forOfInfo.sym, up.sym)
	    }
            // TODO: if there are no inner loops this may be avoided
            yield* s.toks(Tag.push,`=$1.$yld = $2`,
			  ctx, goto.declSym)
            break }
          case Tag.IfStatement:
            if (!i.value.forOfInfo)
              break
            Kit.skip(s.one())
            yield* Kit.reposOne(_inject(s.one()),i.pos)
            Kit.skip(s.one())
            s.close(i)
            continue
          case Tag.AssignmentExpression:
            const j = s.cur()
            if (j.type !== Tag.Identifier || !j.value.forOfInfo)
              break
            const {forOfInfo} = j.value
	    let exit, up
	    if (forOfInfo.exit.indirJumps) {
	      for(const [dst,redir] of forOfInfo.exit.indirJumps) {
		if (redir === forOfInfo.fin.goto) {
		  up = forOfInfo.up = dst.forOfInfo
                  dst.declSym.dynForOf = forOfInfo
                  break
		}
	      }
	    }
            const lab = s.label()
            yield s.enter(i.pos,Tag.SequenceExpression)
            yield s.enter(Tag.expressions,Tag.Array)
	    if (forOfInfo.exit.indirJumps) {
	      for(const [dst,redir] of forOfInfo.exit.indirJumps)
		yield* s.toks(Tag.push, `=$I = $I`, redir.declSym, dst.declSym)
	    }
            yield s.peel(Kit.setPos(i,Tag.push))
            yield* s.one()
            const call = s.take()
            yield call
            invariant(call.type === Tag.CallExpression)
            const iterSym = s.take()
            invariant(iterSym.value.sym === Loop.iteratorId)
            iterSym.value.sym = Block.delegateSym
            yield* s.copy(iterSym)
            yield s.peel()
            yield* s.sub()
            yield s.tok(Tag.push,Tag.Identifier,{sym:ctx})
            const ancestors = forOfInfo.body.repeat
            let parent
            for(let j = ancestors.length-2;j>=0;j--) {
              const p = ancestors[j]
              if (p.origLoop && p.origLoop.forOfInfo) {
                parent = p.origLoop.forOfInfo
                break
              }
            }
            if (up) {
              yield* s.toks(Tag.push, `=$I.$s`, up.sym)
              yield* s.toks(Tag.push, `=$I.$s.${cont}`, up.sym)
            } else {
              yield s.tok(Tag.push, Tag.Identifier, {sym:ctx})
              yield s.tok(Tag.push, Tag.Identifier,
                          {sym:forOfInfo.fin.goto.declSym})
            }
            if (parent)
              yield s.tok(Tag.push,Tag.Identifier,{sym:parent.body.declSym})
            yield* s.leave()
            yield s.close(call)
            yield* s.sub()
            yield* lab()
	    continue
          }
        }
        yield i
      }
    }
  }
}

/** handles `contextBy: "closure"` */
function replaceContextByClosure(si) {
  const s = Kit.auto(si)
  if (s.opts.contextBy !== "closure")
    return s
  const root = s.first.value
  const ctx = root.contextSym
  const decls = root.savedDecls
  const contSym = root.contSym
  decls.delete(ctx)
  const syms = new Map()
  return _replaceCtx()
  function* _replaceCtx() {
    for(const i of s) {
      if (i.enter && i.type === Tag.Identifier
          && i.value.sym && i.value.sym.scoped) {
        const {sym} = i.value
        let subst = syms.get(sym)
        if (!subst) {
          syms.set(sym, subst = Kit.scope.newSym(i.value.sym.name))
          decls.set(subst,{raw:null})
        }
        i.value.sym = subst
      }
      yield i
    }
  }
}

const yldId = Kit.sysId("yld")

/** runs after `Flat.interpretJumps` */
export const control = jumpOps

/** runs before `Flat.interpretApp` */
export const ops = Kit.pipe(
  pureOp,
  pureOpLeft,
  raiseOp,
  replaceContextByClosure,
  Kit.toArray
)

/** runs before `Block.interpretJumps` */
export const jumps = Kit.pipe(
  inlinePar,
  promises,
  promisesClosure,
  coerce,
  generatorsYield)
