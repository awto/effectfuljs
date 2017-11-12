import * as Kit from "./kit"
import {Tag} from "./kit"
import * as Block from "./block"
import * as Bind from "./bind"
import * as Ctrl from "./control"
import * as assert from "assert"
import * as Except from "./exceptions"

/** prepares vars for storing current state and bind */
export function* prepare(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const inline = s.opts.inlineJsExceptions
  const contSym = root.contSym || s.opts.storeCont
        && s.opts.contextMethodOps
        && (root.contSym = Kit.sysId(s.opts.storeCont))
  if (!contSym)
    throw s.error("`defunct:true` requires stored control state")
  if (!root.contextSym)
    throw s.error("`defunct:true` requires context object")
  root.implFrame = Kit.enter(
    Tag.push,Block.frame,{
      declSym:Kit.scope.newSym("_"),
      patSym:root.commonPatSym = Kit.scope.newSym("p"),
      savedDecls:new Map(),
      threadParams:[],root
    })
  const errMap = inline && (root.errMap = new Map())
  const errFrame = root.errFrameRedir
  let num = 0
  const first = (yield* s.till(i => i.type === Block.frame && i.leave)).value
  for(const i of s) {
    if (i.enter && i.type === Block.frame) {
      i.value.stateId = i.value.declSym.numConst = num++
      if (errMap) {
        const catchCont = i.value.catchContRedir
        if (catchCont && catchCont !== errFrame) {
          let frames = errMap.get(catchCont)
          if (!frames)
            errMap.set(catchCont,frames = [])
          frames.push(i.value)
        }
      }
    }
    yield i
  }
}

/** 
 * handles `inlineJsExceptions` option for defunct frames 
 * requires `root.errMap : Map<CatchFrameVal,FrameVal>` from `prepare`
 */
export function inlineExceptions(si) {
  const s = Kit.auto(si)
  if (!s.opts.inlineJsExceptions)
    return s
  const root = s.first.value
  const errMap = root.errMap
  if (!errMap.size && !s.opts.keepLastRaise)
    return s
  if (s.opts.inlinePureJumps !== "tail")
    throw s.error(
      "inlineJsExceptions && defunct requires inlinePureJumps:'tail'")
  const {contSym,commonPatSym} = root
  assert.ok(contSym && commonPatSym)
  const fieldSym = Kit.sysId(s.opts.contFieldName)
  const implFrame = root.implFrame.value
  return walk()
  function* walk() {
    for(const i of s) {
      yield i
      if (i.enter && i.value === implFrame)
        break
    }
    yield s.enter(Tag.push,Tag.TryStatement)
    const tlab = s.label()
    yield s.enter(Tag.block,Tag.BlockStatement)
    yield s.enter(Tag.body,Tag.Array)
    yield* s.sub()
    yield* tlab()
    yield s.enter(Tag.handler,Tag.CatchClause)
    const ex = Kit.scope.newSym("ex")
    yield s.tok(Tag.param,Tag.Identifier,{sym:ex})
    yield s.enter(Tag.body,Tag.BlockStatement)
    yield s.enter(Tag.body,Tag.Array)
    if (errMap.size) {
      yield s.enter(Tag.push,Tag.SwitchStatement)
      yield s.tok(Tag.discriminant,Tag.Identifier,{sym:contSym})
      yield s.enter(Tag.cases,Tag.Array)
      const clab = s.label()
      for(const [goto,i] of errMap) {
        const last = i[i.length-1]
        for(const j of i) {
          yield s.enter(Tag.push,Tag.SwitchCase)
          yield s.tok(Tag.test,Tag.NumericLiteral,
                      {node:{value:j.stateId}})
          yield s.enter(Tag.consequent,Tag.Array)
          if (j === last) {
            yield* s.toks(Tag.push,"$I = $I, $I = $I",
                          commonPatSym,ex,contSym,goto.declSym)
            yield s.tok(Tag.push,Tag.ContinueStatement)
          }
          yield* clab()
        }
      }
      yield s.enter(Tag.push,Tag.SwitchCase)
      yield s.enter(Tag.consequent,Tag.Array)
    }
    yield s.enter(Tag.push,Block.app,{sym:Except.raiseId})
    yield s.enter(Tag.push,Tag.Identifier,{sym:ex})
    yield* tlab()
    yield* s.leave()
    yield* s
  }
}


/** convert frames into `switch` cases */
export function* frames(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const {contextSym,contSym,errFrameRedir} = root
  const inlineJumps = s.opts.inlinePureJumps === "tail"
  assert.ok(contextSym)
  assert.ok(contSym)
  const decls = root.implFrame.value.savedDecls = new Map()
  const impl = root.implFrame.value
  const f = yield* s.till(i => i.type === Block.frame)
  // TODO: it top level this must be set in prototype
  yield* s.toks(Tag.push,`$I.$run = $I`,contextSym,impl.declSym)
  yield* s.sub()
  yield s.close(f)
  yield root.implFrame
  const lab = s.label()
  yield s.enter(Tag.push,Tag.SwitchStatement)
  yield s.tok(Tag.discriminant,Tag.Identifier,{sym:contSym})
  yield s.enter(Tag.cases,Tag.Array)
  const clab = s.label()
  let hasJumps = false
  for(const i of s.sub()) {
    if (i.enter && i.type === Block.frame) {
      if (i.value.catchContRedir !== errFrameRedir)
        hasJumps = true
      if (i.value.threadParams.length)
        throw new SyntaxError("not implemented: defunct with threaded params")
      yield s.enter(Tag.push, Tag.SwitchCase,i.value)
      yield s.tok(Tag.test,Tag.NumericLiteral,
                  {node:{value:i.value.stateId}})
      yield s.enter(Tag.consequent,Tag.Array)
      if (i.value.savedDecls) {
        for(const [sym,{raw,init}] of i.value.savedDecls) {
          assert.ok(!raw)
          assert.ok(!init)
          decls.set(sym,{raw:null})
        }
      }
      if (inlineJumps) {
        for(const j of s.sub()) {
          if (j.enter && j.type === Ctrl.jump && j.value.goto) {
            j.value.ctrlArg = j.value.goto.declSym
            j.value.goto = impl
            hasJumps = true
          }
          yield j
        }
      } else
        yield* s.sub()
      yield* clab()
      s.close(i)
    } else
      yield i
  }
  yield* lab()
  yield Kit.leave(root.implFrame)
  impl.hasJumps = hasJumps
  yield* s
}

export function* substSymConsts(si) {
  for(const i of si) {
    if (i.type === Tag.Identifier
        && i.value.sym
        && i.value.sym.numConst != null) {
      if (i.enter) {
        yield Kit.tok(i.pos,Tag.NumericLiteral,
                      {node:{value:i.value.sym.numConst}})
      }
    } else
      yield i
  }
}

/** converts pure jumps to tail calls loop */
export function tailJumps(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  if (s.opts.inlinePureJumps !== "tail")
    return s
  if (!s.opts.defunct) 
    throw s.error("`inlinePureJumps:'tail'` requires `defunct:true`")
  if (!s.opts.inlineContAssign)
    throw s.error("`inlinePureJumps:'tail'` requires `inlineContAssign:true`")
  return walk()
  //TODO: make a marking pass
  function* walk() {
    const implFrame = root.implFrame.value
    for(const i of s.sub()) {
      yield i
      if (i.enter && i.value === implFrame)
        break
    }
    const lab = s.label()
    if (implFrame.hasJumps) {
      yield s.enter(Tag.push,Tag.ForStatement)
      yield s.enter(Tag.body,Tag.BlockStatement)
      yield s.enter(Tag.body,Tag.Array)
    }
    for(const i of s.sub()) {
      if (i.enter && i.type === Ctrl.jump && !i.value.bindName) {
        if (s.curLev()) {
          yield s.enter(Tag.push,Tag.AssignmentExpression,
                        {node:{operator:"="}})
          yield s.tok(Tag.left,Tag.Identifier,{sym:root.commonPatSym})
          yield* Kit.reposOne(s.sub(),Tag.right)
          yield* s.leave()
        }
        s.close(i)
        yield s.tok(Tag.push,Tag.ContinueStatement)
      } else
        yield i
    }
    yield* lab()
    yield* s
  }
}

export const convert = Kit.pipe(
  frames,
  Kit.toArray,
  inlineExceptions,
  tailJumps)

