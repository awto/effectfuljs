import * as Kit from "./kit"
import {Tag} from "./kit"
import * as Block from "./block"
import * as Bind from "./bind"
import * as Ctrl from "./control"
import * as assert from "assert"
import * as Except from "./exceptions"
import * as Branch from "./branch"
import * as Loop from "./loops"

const alreadyRunningSym = Kit.sysId("alreadyRunning")

/**
 * inline assignments to function's global continuations's fields at each step
 */
export function storeContinuations(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const {contextSym} = root
  const contextStore = contextSym && s.opts.contextMethodOps
  function makeSym(name,pat) {
    if (!name)
      throw s.error(
        "inlining continuation assignment requires store<...>Cont property")
    if (name && contextStore)
      return Kit.sysId(name)
    const res = Bind.tempVarSym(root,pat)
    res.fieldName = `$${pat}`
    return res
  }
  const res = root.resContSym = s.opts.inlineResultContAssign
        && makeSym(s.opts.storeResultCont,"rc")
  const err = root.errContSym = s.opts.inlineErrorContAssign
        && makeSym(s.opts.storeErrorCont,"ec")
  const cont = root.contSym = s.opts.inlineContAssign
        && makeSym(s.opts.storeCont,"sc")
  if (s.opts.defunct)
    root.runSym = makeSym("$run","rn")
  const reentry = s.opts.inlineReentryCheck && cont
  if (reentry && s.opts.defunct)
    throw s.error(
      "`defunct:true` is not compatible with `inlineReentryCheck:true`")
  if (!err && !res && !cont)
    return s
  return walk()
  function* assign(l,r) {
    yield s.enter(Tag.push,Tag.AssignmentExpression,{node:{operator:"="}})
    yield s.tok(Tag.left,Tag.Identifier,{sym:l,lhs:true,rhs:false,decl:false})
    yield s.tok(Tag.right,Tag.Identifier,{sym:r,lhs:false,rhs:true,decl:false})
    yield* s.leave()
  }
  function* walk() {
    for(const i of s) {
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
        if (res && rframe && !rframe.removed && assignResult)
          yield* assign(res,rframe.declSym)
        if (err && eframe && !eframe.removed && assignError)
          yield* assign(err,eframe.declSym)
        const c = s.cur()
        if (reentry && !f.first && c.type !== Ctrl.jump
            && !(c.type !== Ctrl.letStmt && c.value.eff)
            && c.type !== Block.app) {
          yield* assign(reentry,alreadyRunningSym)
        }
        for(const j of s.sub()) {
          if (j.enter) {
            switch(j.type) {
            case Block.letStmt:
              if (!j.value.eff)
                break
            case Ctrl.jump:
              const {goto} = j.value
              if (cont && (f.first || goto !== f || reentry)
                  && !j.value.delegateCtx)
                yield* assign(cont,goto.declSym)
            }
          }
          yield j
        }
      }
    }
  }
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
 * handles options:
 *  - `inlineYieldOp: "iterator"`
 *  - `inlineYieldStarOp: "iterator"`
 *  - `inlineScopeOp`: "unwrap"`
 */
function generatorsYield(si) {
  const s = Kit.auto(si)
  const inlineYield = s.opts.inlineYieldOp === "iterator"
  const inlineYieldStar = s.opts.inlineYieldStarOp === "iterator"
  const inlineScope = s.opts.inlineScopeOp === "unwrap"
  if (!inlineYieldStar && !inlineYield && !inlineScope)
    return s
  const {contextSym} = s.first.value
  const root = s.first.value
  if (!contextSym)
    throw s.error(
      "inlineYieldOp: 'iterator' can be used only with scope context")
  if (!s.opts.inlineContAssign)
    throw s.error("inlineYieldOp: 'iterator' requires inlineContAssign: true")
  const field = s.opts.contFieldName
  const wrapGenerator = s.opts.wrapGeneratorResult
  return walk()
  function* walk() {
    for(const i of s) {
      if (i.enter && i.type === Block.letStmt && i.value.eff) {
        switch(i.value.bindName) {
        case "yld":
          if (!inlineYield)
            break
          const ctx = i.value.delegateCtx || contextSym
          yield* assignValue(s,ctx)
          yield s.tok(Tag.push,Tag.Identifier,{result:true,sym:ctx})
          s.close(i)
          continue
        case "yldStar":
          if (!inlineYieldStar)
            break
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
          if (wrapGenerator) {
            yield s.enter(Tag.push,Tag.MemberExpression,{result:true})
            yield s.tok(Tag.object,Tag.Identifier,{sym:contextSym})
            yield s.tok(Tag.property,Tag.Identifier,{node:{name:"unwrap"}})
            yield* s.leave()
          } else {
            yield s.tok(Tag.push,Tag.Identifier,{sym:contextSym,result:true})
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
  const root = s.first.value
  const {errFrameRedir,resFrameRedir} = root
  return walk()
  function* walk() {
    for(const i of s) {
      if (i.enter && i.type === Block.letStmt
          && i.value.goto
          && i.value.bindName === "chain") {
        if (i.value.threadArgs && i.value.threadArgs.length)
          throw s.error("`inlineChainOp: promise` with threaded arguments")
        if (s.opts.contextBy !== "reference")
          throw s.error(
            "`inlineChainOp: promise` without `contextBy: reference`")
        const lab = s.label()
        const errCnt = i.value.ref.catchContRedir
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
 *    - 'tail' - moves the call to the end of frame
 *    - 'exit' - doesn't call anything and leaves it to caller to re-call
 */
export function jumpOps(si) {
  const s = Kit.auto(si)
  const inlineJumps = s.opts.inlinePureJumps === "call"
  const inlineScope = s.opts.inlineScopeOp === "call"
  const jumpsExit = s.opts.inlinePureJumps === "exit"
  if (s.opts.inlinePureJumps && !inlineJumps && !jumpsExit
      && s.opts.inlinePureJumps && s.opts.inlinePureJumps !== "tail") {
    throw s.error(
      `unsupported value ${s.opts.inlinePureJumps} for inlinePureJumps`)
  }
  if (!inlineJumps && !inlineScope && !jumpsExit)
    return s
  if (inlineScope && !s.opts.defunct)
    throw s.error("`inlineScope:'call'` requires `defunct:true`")
  if (jumpsExit) {
    if (!s.opts.inlineContAssign)
      throw s.error(
        "`inlineJumps:'exit' works only with `{inlineContAssign:true}`")
  }
  const root = s.first.value
  const {contextSym} = root
  if (!contextSym)
    throw s.error('`inlinePureJumps: "call"` requires context object')
  const jumpId = Kit.sysId(s.opts.pureBindName)
  const jumpRId = Kit.sysId(s.opts.pureBindName + "R")
  const scopeId = Kit.sysId("scope")
  const inlineCont = root.runSym || s.opts.inlineContAssign && root.contSym
  const refCtx = s.opts.contextBy === "reference"
  const paramCtx = s.opts.contextBy === "parameter"
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
              if (j.value.sym === jumpId && inlineJumps
                  || j.value.sym === scopeId && inlineScope) {
                if (!inlineCont
                    && !j.value.hasCont
                    && !j.value.hasErrorCont
                    && !j.value.hasResultCont) {
                  Kit.skip(s.copy(j))
                  yield s.tok(Tag.push,Tag.Identifier,
                              {result:true,sym:contextSym})
                  continue
                }
                const tail = !catchClause
                if (tail)
                  cnt++
                const lab = s.label()
                yield s.enter(j.pos,Tag.CallExpression,
                              {result:true,tail})
                let bind = j.value.hasBindVal ? [...s.one()] : []
                if (refCtx && j.value.sym === scopeId) {
                  yield s.tok(Tag.callee,Tag.Identifier,
                              {sym:root.implFrame.value.declSym})
                } else if (inlineCont) {
                  yield s.tok(Tag.callee,Tag.Identifier,{sym:inlineCont})
                } else
                  yield* Kit.reposOne(s.one(),Tag.callee)
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
              if (j.value.sym === jumpRId && (inlineJumps || jumpsExit)
                  || j.value.sym === jumpId && jumpsExit) {
                const ctx = j.value.delegateCtx || contextSym
                if (j.value.hasBindVal)
                  yield* assignValue(s,ctx)
                yield* s.toks(Tag.push,"$I.$running = true",ctx)
                Kit.skip(s.sub())
                s.close(j)
                yield s.tok(Tag.push,Tag.Identifier,{sym:ctx,result:true})
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

export const delegateIteratorId = Kit.sysId("delegateIterator")

/**
 * injects interpretation `for-of` with `invertForOf:true` (CPS style)
 */
export function invertForOf(si) {
  const sa = Kit.toArray(si)
  const root = sa[0].value
  if (!root.opts.invertForOf)
    return sa
  const jumpsExit = root.opts.inlinePureJumps === "exit"
  recover(sa)
  return inject()
  function recover() {
    const s = Kit.auto(sa)
    for(const i of s) {
      if (i.enter && i.type === Tag.IfStatement) {
        const j = s.cur()
        const {forOfInfo} = j.value
        if (!forOfInfo)
          continue
        i.value.forOfInfo = j.value.forOfInfo
        Kit.skip(s.one())
        Kit.skip(s.one())
        assert.ok(s.cur().pos === Tag.alternate)
        assert.ok(s.cur().type === Tag.BlockStatement)
        let jump
        for(const j of s.one())
          if (j.enter && j.type === Ctrl.jump)
            jump = j.value
        assert.ok(jump)
        jump.goto.catchContRedir.required = true
        jump.goto.required = true
        const frame = jump.ref
        const patSym = forOfInfo.patSym = frame.patSym =
              frame.patSym
              || root.commonPatSym
              || Kit.scope.newSym("i")
        jump.ref.forOfInfo = forOfInfo
        forOfInfo.exit = jump
      }
    }
  }
  function inject() {
    const s = Kit.auto(sa)
    const cont = s.opts.storeCont
    if (s.opts.inlineYieldOp
        || !cont
        || s.opts.state
        || !s.opts.inlineContAssign)
      throw s.error(
        "not implemented: `invertForOf:true` without "+
          "`{state:false,inlineYieldOp:false," +
          "storeCont:'..',inlineContAssign:true}`")
    return walk(s)
    function* walk(sw) {
      for(const i of sw) {
        if (i.enter) {
          switch(i.type) {
          case Tag.MemberExpression:
            if (!i.value.forOfInfo)
              break
            yield s.tok(i.pos,Tag.Identifier,{sym:i.value.forOfInfo.patSym})
            Kit.skip(s.copy(i))
            continue
          case Block.letStmt:
            if (!i.value.eff)
              break
            if (!i.value.goto.forOfInfo)
              break
            i.value.delegateCtx = i.value.goto.forOfInfo.sym
            break
          case Ctrl.jump:
            if (!i.value.goto.forOfInfo)
              break
            const iterSym = i.value.delegateCtx = i.value.goto.forOfInfo.sym
            if (jumpsExit)
              break
            yield s.enter(Tag.push,Tag.CallExpression,{result:true})
            yield s.enter(Tag.callee,Tag.MemberExpression)
            yield s.tok(Tag.object,Tag.Identifier,{sym:iterSym})
            yield s.tok(Tag.property,Tag.Identifier,{node:{name:"step"}})
            yield* s.leave()
            yield* s.leave()
            s.close(i)
            continue
          case Tag.IfStatement:
            if (!i.value.forOfInfo)
              break
            Kit.skip(s.one())
            yield* Kit.reposOne(walk(s.one()),i.pos)
            Kit.skip(s.one())
            s.close(i)
            continue
          case Tag.AssignmentExpression:
            const j = s.cur()
            if (j.type !== Tag.Identifier || !j.value.forOfInfo)
              break
            yield i
            const {forOfInfo} = j.value
            for(const k of s.sub()) {
              if (k.enter && k.type === Tag.Identifier
                  && k.value.sym === Loop.iteratorId) {
                k.value.sym = delegateIteratorId
              } else if (k.enter && k.type === Tag.Array
                         && k.pos === Tag.arguments) {
                yield k
                while(s.curLev())
                  yield* s.one()
                yield s.tok(Tag.push,Tag.Identifier,
                            {sym:forOfInfo.exit.ref.declSym})
                yield s.tok(Tag.push,Tag.Identifier,
                            {sym:forOfInfo.exit.ref.catchContRedir.declSym})
                yield s.tok(Tag.push,Tag.Identifier,
                            {sym:forOfInfo.exit.goto.declSym})
                continue
              }
              yield k
            }
            yield* s.sub()
            yield s.close(i)
            continue
          }
        }
        yield i
      }
    }
  }
}

/** runs after `Flat.interpretJumps` */
export const control = jumpOps

/** runs before `Flat.interpretApp` */
export const ops = Kit.pipe(pureOp,raiseOp)


/** runs before `Block.interpretJumps` */
export const jumps = Kit.pipe(promises,
                              coerce,
                              generatorsYield)

