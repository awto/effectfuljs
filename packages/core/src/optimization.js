import * as Kit from "./kit"
import {Tag} from "./kit"
import * as assert from "assert"
import * as Block from "./block"
import * as Ctrl from "./control"

/**
 * # if it is a pure jump and it goes to a frame with 
 *   only 1 enter we can inline that frame 
 */
export function inlineFrames(si) {
  const sa = Kit.toArray(si)
  const root = sa[0].value
  const {resFrame,resFrameRedir,pureExitFrame,errFrameRedir} = root
  const {scopePostfix,staticPure,coerce} = root.opts
  Ctrl.convolveFrames(sa)
  const res = Kit.toArray(_inlineJumps(sa))
  return Kit.toArray(Block.cleanup(res))  
  function* _inlineJumps(si) {
    const s = Kit.auto(si)
    for(const i of s) {
      if (i.enter && i.type === Block.frame) {
        Kit.skip(s.sub())
        if (i.value.removed) {
          s.close(i)
        } else {
          yield i
          yield* _runInlineJumps(i.value,null)
          yield s.close(i)
        }
        continue
      }
      yield i
      
    }
    function* _runInlineJumps(frame,tmpVar) {
      const decls = frame.savedDecls
      const noHandlers
            = (!frame.catchContRedir || frame.catchContRedir === errFrameRedir)
            && (!frame.resultContRedir
                      || frame.resultContRedir === resFrameRedir)
      for(const {content} of frame.steps) {
        for(let i = 0, len = content.length;i<len;++i) {
          const j = content[i]
          if (j.enter) {
            switch(j.type) {
            case Block.letStmt:
              if (!j.value.eff || j.value.opSym && j.value.opSym !== Block.chainId)
                break
            case Ctrl.jump:
              if (tmpVar && !j.value.reflected) {
                j.value.tmpVar = tmpVar
                j.value.reflected = true
              }
              const {goto} = j.value
              if (!scopePostfix && noHandlers
                  && (!goto || goto === resFrameRedir
                      || goto === pureExitFrame)) {
                const lab = s.label()
                yield s.enter(Tag.push,Block.effExpr,{
                  tmpVar:j.value.tmpVar,reflected:j.value.reflected})
                if (!coerce && j.type === Ctrl.jump)
                  yield s.enter(Block.app,{sym:Block.pureId})
                if (!j.leave) {
                  ++i
                  for(;i<len;++i) {
                    const v = content[i]
                    if (v.value === j.value)
                      break
                    yield v
                  }
                }
                yield* lab()
                continue
              }
              if (j.type === Block.letStmt || j.value.rec
                  || j.value.indirJumps && j.value.indirJumps.size
                  || j.value.frameArgs && j.value.frameArgs.size)
                break
              if (goto.dynamicJump || goto.enters.size !== 1
                  || goto.required || goto.noInline || goto === resFrame
                  || goto.catchContRedir
                     && goto.catchContRedir !== frame.catchContRedir
                  || goto.resContRedir !== frame.resContRedir)
                break
              goto.removed = true
              const cont = j.value.content
              if (cont.length > 2 && j.value.sym && j.value.sym.bound) {
                yield s.enter(Tag.push, Block.letStmt, {sym:j.value.sym})
                yield* cont.slice(1, cont.length-1)
                yield* s.leave()
              }
              yield* _runInlineJumps(goto,j.value.tmpVar || tmpVar)
              for(const [n,v] of goto.savedDecls) {
                decls.set(n,v)
              }
              if (!j.leave) {
                do {
                  ++i
                } while(i < len && content[i].value !== j.value)
              }
              continue
            }
          }
          yield j
        }
      }
    }
  }
}

/**
 * removes frames with only 1 jump as its content
 */
export function removeSingleJumps(si) {
  const sa = Kit.toArray(si)
  const root = sa[0].value
  const {resFrame,resFrameRedir,pureExitFrame,errFrameRedir} = root
  const {scopePostfix,staticPure,coerce} = root.opts
  if (scopePostfix) {
    resFrame.noInline = true
    resFrameRedir.noInline = true
  }
  let res = sa
  Ctrl.convolveFrames(res)
  let {cfg} = root
  const cfgT = cfg.slice(1)
  for(const i of cfgT) {
    const goto = _singleJump(i)
    if (!goto)
      continue
    const {enters,exits:[exit]} = i
    for(const j of enters) {
      if (j.goto.dynamicJump)
        continue
      j.goto = goto
      goto.enters.add(j)
      enters.delete(j)
      if (goto.dynamicJump) {
        Ctrl.flattenGotoDests(goto,j.gotoDests = [])
      } else {
        j.gotoDests = [goto]
      }
    }
  }
  for(const i of cfgT) {
    if (i.enters.size === 0 && !i.noInline && !i.required) {
      i.removed = true
      if (i.patSym)
        i.patSym.bound = false
      for(const j of i.exits)
        j.goto.enters.delete(j)
    }
  }
  return Kit.toArray(Block.cleanup(res))

  function _singleJump(frame,cc,rc) {
    if (frame.noInline)
      return false
    if (frame.savedDecls && frame.savedDecls.size)
      return false
    const {steps} = frame
    if (!steps || steps.length !== 1)
      return false
    const [step] = steps
    if (step.origType !== Ctrl.jump)
      return false
    if (step.tmpVar)
      return false
    const {content} = step
    /** copying of frame's patter */
    let copySym 
    if (!content || content.length > 2) {
      const arg = content[1]
      if (arg.type !== Block.bindPat)
        return false
      copySym = arg.value.sym
    }
    if (frame.patSym !== copySym)
      return false
    if (step.rec || step.indirJumps && step.indirJumps.size)
      return false
    let {goto} = step
    if (step.frameArgs && step.frameArgs.size) {
      if (!step.result)
        return false
      if (goto === resFrame)
        return staticPure ? resFrameRedir : pureExitFrame
      return false
    }
    return goto
  }
}

/** removes never executing frames */
export function removeUnreachable(cfg) {
  for(const i of cfg) {
    i.hasBindJump = false
    i.reachable = false
    for(const j of i.exits) {
      if (j.bindJump) {
        i.hasBindJump = true
        break
      }
    }
    const skipFirst = i.noInline = i.noInline || i.first || i.last
  }

  const first = cfg[0]
  markReachable(first)
  markReachable(first.root.resFrameRedir)
  for(const i of cfg) {
    if (!i.reachable) {
      i.removed = true
      continue
    }
    if (i.catchContRedir)
      i.catchContRedir.noInline = true
    if (i.resultContRedir)
      i.resultContRedir.noInline = true
  }
  const res = []
  for(const i of cfg) {
    if (i.removed)
      continue
    res.push(i)
    // cleaning dynamic jumps
    for(const j of i.exits) {
      const {goto} = j
      if (!goto)
        continue
      if (goto.dynamicJump) {
        cleanupDyn(goto)
        continue
      }
    }
  }
  return res

  function markReachable(frame) {
    if (!frame)
      return
    if (frame.reachable)
      return
    frame.reachable = true
    if (frame.dynamicJump)
      return
    for(const i of frame.exits) {
      if (i.indirJumps)
        for(const j of i.indirJumps.keys())
          markReachable(j)
      if (i.goto)
        markReachable(i.goto)
    }
    if (!frame.last) {
      if (frame.resultContRedir)
        markReachable(frame.resultContRedir)
      if (frame.catchContRedir)
        markReachable(frame.catchContRedir)
    }
  }
  
  function cleanupDyn(goto) {
    const {instances} = goto
    for(let dst of instances) {
      if (!dst.reachable) {
        instances.delete(dst)
        continue
      }
      if (dst.dynamicJump)
        cleanupDyn(dst)
    }
  }
}
