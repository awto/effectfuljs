import * as Kit from "./kit"
import {Tag} from "./kit"
import * as assert from "assert"
import * as Block from "./block"
import * as Ctrl from "./control"
import * as Loop from "./loops"
import * as Bind from "./bind"
import * as State from "./state"
import * as Opts from "./options"
import * as Except from "./exceptions"
import * as Policy from "./policy"
import {stmtExpr} from "./kit/stmtExpr"

const undefinedSym = Kit.scope.undefinedSym

function byNum(a, b) {
  return a.num - b.num
}

function byNumFst(a, b) {
  return a[0].num - b[0].num
}

const emptySet = new Set()
const emptyArr = []

// in frameArgs binds jump inner content
const argSym = Kit.scope.newSym("arg")

/** 
 * convers to a flat stracture (without nested frames) 
 *     type ExitVal = JumpVal | LetStmtVal
 *     type FrameVal = FrameVal & { 
 *               exits: JumpVal[], 
 *               enters: JumpVal[],
 *               finallyCont?: FrameVal[],
 *               catchCont?: FrameVal,
 *               tryBody?: FrameVal -- for starting frames of catch/finally 
 *               }
 *     type ExitVal = ExitVal & {
 *               ref: FrameVal,
 *               goto?: FrameVal
 *               }
 */
export const convert = Kit.pipe(
  /**
   * removes redundant lets to simplify next step
   * this pass is actually workaround of not very nice output
   * from the former passes, they were designed for now abandoned nested mode 
   * TODO: make it redundant
   */
  function cleanLets(si) {
    const s = Kit.auto(si)
    if (s.opts.scopeContext)
      s.first.value.contextSym = Kit.scope.newSym("ctx")
    function* walk() {
      let res = false
      for(const i of s.sub()) {
        if (i.enter) {
          switch(i.type) {
          case stmtExpr:
            yield i
            yield* walk()
            continue
          case Tag.ReturnStatement:
            // remaining return statements are either last
            // in the functions or stmtExpr
            if (!i.leave) {
              if (i.value.eff)
                yield* Kit.reposOne(s.sub(), i.pos)
              else {
                yield s.enter(i.pos, Block.pure)
                yield* Kit.reposOne(s.sub(), Tag.push)
                yield* s.leave()
              }
            }
            s.close(i)
            continue
          case Block.choice:
          case Block.frame:
          case Ctrl.jump:
          case Ctrl.scope:
            res = true
            break
          case Block.letStmt:
            if (i.value.eff) {
              const inner = []
              if (Kit.result(walk(),inner)) {
                // ConditionalExpression may contain sub-frames
                if (inner.length)
                  inner[0].value.result = true
                yield* Kit.reposOneArr(inner,i.pos)
                s.close(i)
              } else {
                yield i
                yield *inner
                yield s.close(i)
              }
              continue
            } else if (i.value.result) {
              // last not-eff letStmt must be turned into explicit return
              yield s.enter(i.pos, Block.pure)
              if (s.curLev())
                yield* Kit.reposOne(s.sub(), Tag.push)
              yield* s.leave()
              s.close(i)
              continue
            }
            break
          }
        }
        yield i
      }
      return res
    }
    return walk()
  },
  Block.saveFrameLet,
  function* convert(si) {
    const s = Kit.auto(si)
    const root = s.first.value
    const frames = []
    let finContNum = 0
    function setGoto(jumps, value) {
      for(const i of jumps)
        if (i.goto == null)
          i.goto = value
    }
    function* walk(sw,cur) {
      let srclet
      for(const i of sw) {
        if (i.enter) {
          switch(i.type) {
          case Tag.IfStatement:
            yield i
            yield* s.one()
            assert.ok(!cur.length)
            cur.push(...yield* walk(s.one(),[]))
            if (s.curLev() != null)
              cur.push(...yield* walk(s.one(),[]))
            yield s.close(i)
            continue
          case Block.chain:
            {
              const fl = frames.length
              cur = yield* walk(s.sub(),cur)
              const goto = frames.length > fl ? frames[fl][0].value : null
              yield s.tok(i.pos,Ctrl.jump,{goto})
              s.close(i)
            }
            continue
          case Block.frame:
            setGoto(cur,i.value)
            i.value.srcLet = srclet
            const declSym = i.value.declSym = Kit.scope.newSym("_")
            if (i.value.eff) {
              const inner = [i]
              frames.push(inner)
              cur = Kit.result(Kit.repos(walk(s.sub(),[]),Tag.push),inner)
              inner.push(s.close(i))
            } else {
              frames.push([...function*() {
                yield i
                let last
                cur = []
                for(const j of walk(s.sub(),[])) {
                  if (j.enter && j.type === Ctrl.jump && !j.value.goto)
                    cur.push(j.value)
                  yield last = j
                }
                if (!last || last.type !== Ctrl.jump) {
                  const j = s.tok(Tag.push,Ctrl.jump)
                  yield j
                  cur.push(j.value)
                }
                yield s.close(i)
              }()])
            }
            srclet = i.value.effLet
            continue
          case Block.app:
            if (i.value.eff) {
              assert.ok(!cur.length)
              let fl = frames.length
              const bodyJumps = yield* walk(s.one(),cur)
              const j = s.curLev()
              let params
              if (j.pos === Tag.params) {
                const j = s.take()
                params = [...s.one()]
                s.close(j)
              }
              const hl = frames.length
              const hjumps = Kit.skip(walk(s.one(),[]))
              const handle = frames[hl][0].value
              handle.tryBody = frames[fl][0].value
              switch(i.value.sym) {
              case Except.handleId:
                assert.equal(params[0].type, Tag.Identifier)
                const exceptSym = params[0].value.sym
//                handle.frameParams = new Set([exceptSym])
                handle.exceptSym = exceptSym
                for(let j = fl; j < hl; j++) {
                  const f = frames[j][0]
                  if (f.value.catchCont == null) {
                    f.value.catchCont = {goto:handle,
                                         exceptSym,
                                         gotoDests:[handle]}
                  }
                }
                cur = bodyJumps.concat(hjumps)
                break
              case Except.finallyId:
                for(let j = fl; j < hl; j++) {
                  const f = frames[j][0].value
                  const t = f.finallyCont || (f.finallyCont = [])
                  t.push(handle)
                }
                // may be lost during subst, they same like catchCont, or finCont
                // maybe better keep a dictionary rather than dir link?
                handle.finContId = finContNum++
                const contSym = Bind.tempVarSym(s.first.value,"cb")
                const instances = new Set()
                const finJump = {
                  declSym: contSym,
                  dynamicJump: true,
                  instances,
                  finallyCont: handle.finallyCont || (handle.finallyCont = [])
                }
                handle.contArg = finJump
                setGoto(hjumps, finJump)
                cur = bodyJumps
                break
              default:
                throw s.error(`unsupported "app" ${i.value.node.name}`)
              }
              s.close(i)
               continue
            }
            break
          case Block.pure:
            const pj = s.enter(i.pos, Ctrl.jump)
            yield pj
            if (!i.leave) {
              yield* s.sub()
              s.close(i)
            }
            cur.push(pj.value)
            yield* s.leave()
            continue
          case Block.letStmt:
            const j = s.curLev()
            if (j != null) {
              switch(j.type) {
              case Block.pure:
                s.take()
                yield s.enter(i.pos, Ctrl.jump, i.value)
                if (!j.leave)
                  yield* s.sub()
                yield* s.leave()
                s.close(j)
                s.close(i)
                cur.push(i.value)
                continue
              case Tag.ConditionalExpression:
                if (i.value.eff) {
                  j.value.result = true
                  yield Kit.setPos(s.take(),i.pos)
                  yield* s.one()
                  assert.ok(!cur.length)
                  cur.push(...(yield* walk(s.one(), [])))
                  cur.push(...(yield* walk(s.one(), [])))
                  for(const k of cur)
                    k.sym = i.value.sym
                  yield Kit.setPos(s.close(j),i.pos)
                  s.close(i)
                  continue
                }
                break
              }
            }
            yield* s.copy(i)
            if (i.value.eff)
              cur.push(i.value)
            continue
          case Loop.repeat:
            const fl = frames.length
            const ncur = yield* walk(s.sub(),cur)
            if (frames.length > fl) {
              const k = frames[fl][0].value
              k.savedDecls = i.value.savedDecls
                for(const l of ncur)
                  if (l.goto == null) {
                    l.goto = k
                    if (s.opts.markRec !== false)
                      l.bindName = "jR"
                  }
            }
            cur = []
            s.close(i)
            continue
          case Ctrl.scope:
            cur = yield* walk(s.sub(),cur)
            for(const j of i.value.brkRefs) {
              cur.push(j)
            }
            s.close(i)
            continue
          }
        }
        yield i
      }
      return cur
    }
    for(const i of s) {
      if (i.enter && i.type === Block.chain) {
        yield i
        yield* walk(s.sub(),[])
        for(const j of frames) {
          yield* j
        }
        yield s.close(i)
      } else
        yield i
    }
  },
  // * removes useless frames:
  //   - frame with the only statement is a jump
  //   - inlines frames with only 1 jump into it
  function postproc(si) {
    const frames = new Map()
    const sa = Kit.toArray(si)
    const singleJumps = []
    const jumps = []
    const packed = [...pack()]
    const substJumps = new Map()
    function substComp(from, res) {
      for (const i of from) {
        const f = substFrame(i)
        if (f == null) {
          res.push(i)
        } else {
          if (f.preCompose && f.preCompose.length)
            res.push(...f.preCompose)
          if (f.goto) {
            if (f.goto.dynamicJump)
              assert.equal(f.goto.contArg, i.contArg)
            else
              res.push(f.goto)
          } else
            return true
        }
      }
      return false
    }
    function substFrame(from) {
      const f = substJumps.get(from)
      if (f == null)
        return null
      let preCompose = []
      let {goto, result} = f
      if (f.preCompose && f.preCompose.length) {
        if (substComp(f.preCompose, preCompose))
          goto = null
      }
      if (goto != null) {
        const nf = substFrame(goto)
        if (nf != null) {
          if (nf.preCompose)
            preCompose.push(...nf.preCompose)
          goto = nf.goto
          result = nf.result
        }
      }
      return {goto, preCompose, result}
    }
    function subst(jump) {
      const f = substFrame(jump.goto)
      const preCompose = []
      const exit = substComp(jump.preCompose, preCompose)
      jump.preCompose = preCompose
      if (f != null) {
        jump.goto = f.goto
        jump.result = f.result
        jump.preCompose.push(...f.preCompose)
      }
      if (exit)
        jump.goto = null
    }
    const DEB_NO_OPT = false
    if (DEB_NO_OPT)
      return sa
    const DEB_NO_EMPTY_OPTS = false
    if (!DEB_NO_EMPTY_OPTS) 
      for (const {frame,jump} of singleJumps) {
        frames.delete(frame)
        if (frame.contArg != null && jump.goto != null)
          jump.goto.contArg = frame.contArg
        substJumps.set(frame, jump)
      }
    for (const i of jumps) {
      let cur = i.goto
      if (cur && frames.has(i.ref)) {
        subst(i)
        cur = i.goto
        if (cur && cur.enters)
          cur.enters.push(i)
      }
    }
    const DEB_NO_INLINE = false
    const inline = new Map()
    for (const [i,v] of frames) {
      i.finallyCont = null
      if (!DEB_NO_INLINE
          // only 1 direct jump
          && i.enters.length === 1
          // it is Ctrl.jump
          && !i.enters[0].bindJump
          // it doesn't passes anything furthe
          && !i.enters[0].result
          // the jump is to go through finally handles
          && !(i.enters[0].preCompose && i.enters[0].preCompose.length) 
          // no dynamic jumps to the frame
          && !i.tryBody && !i.catchCont
         ) {
        inline.set(i,v)
        frames.delete(i)
      }
    }
    return unpack()
    function getPreCompose(src, dst) {
      const srcFin = src.finallyCont
      if (srcFin == null)
        return []
      const dstFin = dst && dst.finallyCont
      let finsteps
      if (!dstFin)
        return srcFin
      const res = []
      const exit = dstFin[0]
      for(const j of srcFin) {
        // collecting finally block control exits with this jump
        if (dstFin.indexOf(j) === -1 || j.tryBody === dst)
          res.push(j)
      }
      return res
    }
    function* pack() {
      const s = Kit.auto(sa)
      const root = s.first.value
      // if context is added as a first argument the call cannot be eta-reduced
      function* frame(value) {
        value.enters = []
        const j = s.cur()
        const maybeSingle = j.type === Ctrl.jump
        const {catchCont} = value
        if (catchCont) {
          jumps.push(catchCont)
          catchCont.preCompose = getPreCompose(value, catchCont.goto)
          catchCont.ref = value
          catchCont.goto.exceptSym = catchCont.exceptSym
          // makes a copy of exception's frame in case if it behind any finally
          catchCont.goto.exceptFrameCopy = catchCont.goto.exceptFrameCopy
            || catchCont.preCompose.length
        }
        for (const i of s.sub()) {
          if (i.enter) {
            switch(i.type) {
            case Ctrl.jump:
              const j = s.curLev()
              // j != null may be only if it is ReturnStmt
              // it should stay if it returns some pure expression
              // if the return has effectful argument it is a bind pattern
              const result = i.value.result  = j != null
                    // && j.type !== Block.bindPat
              const keepPure = result || !i.value.goto
              if (maybeSingle && !keepPure)
                singleJumps.push({frame:value,jump:i.value})
              else if (!i.value.goto && !result)
                root.emptyResFrame = value
            case Block.letStmt:
              jumps.push(i.value)
              i.value.ref = value
              i.value.preCompose = getPreCompose(value, i.value.goto)
              i.value.bindJump = i.type === Block.letStmt
              break
            }
          }
          yield i
        }
      }
      for (const i of s) {
        if (i.enter && i.type === Block.frame) {
          yield s.tok(i.pos,Block.frame,i.value)
          frames.set(i.value,[...frame(i.value)])
          s.close(i)
        } else
          yield i
      }
    }
    function* unpack() {
      function* frame(value,content) {
        const s = Kit.auto(content)
        for(const i of s) {
          if (i.enter) {
            const {goto} = i.value
            if (i.type === Ctrl.jump && goto) {
              const fi = inline.get(goto)
              if (fi != null) {
                let chainValue
                if (i.pos !== Tag.push) {
                  yield (chainValue = Kit.enter(i.pos,Block.chain,chainValue))
                }
                yield* frame(value,fi)
                if (chainValue)
                  yield Kit.swapTok(chainValue)
                if (!i.leave)
                  Kit.skip(s.sub())
                s.close(i)
                continue
              }
            }
            if (i.type === Ctrl.jump
                || i.type === Block.letStmt && i.value.eff) {
              i.value.ref = value
              assert.ok(!i.value.goto
                        || i.value.goto.dynamicJump
                        || frames.has(i.value.goto))
            }
          }
          yield i
        }
      }
      for(const i of packed) {
        if (i.enter && i.type === Block.frame) {
          const f = frames.get(i.value)
          i.value.finallyCont = null
          if (f != null) {
            const {catchCont} = i.value
            if (catchCont != null) {
              catchCont.goto.enters.push(i.value.catchCont)
            }
            yield Kit.enter(i.pos,Block.frame,i.value)
            yield* frame(i.value,f)
            yield Kit.leave(i.pos,Block.frame,i.value)
          }
        } else
          yield i
      }
    }
  },
  // adds extra frame into start of the frame's chain, if there is a jump to it
  // or target library requires it (e.g. Promise)
  function* prefixFrame(si) {
    const s = Kit.auto(si)
    for(const i of s) {
      if (i.enter && i.type === Block.frame) {
        if (s.opts.scopePrefix) {
          const lab = s.label()
          const frame = s.enter(Tag.push, Block.frame,
                                {declSym:Kit.scope.newSym("_")})
          yield frame
          yield s.tok(Tag.push, Block.letStmt,
                      {goto: i.value, ref: frame.value, bindJump:true,
                       eff:true,bindName:"scope",init:true})
          yield* lab()
        } else if (i.value.enters && i.value.enters.length) {
          const frame = s.enter(Tag.push, Block.frame,
                                {declSym:Kit.scope.newSym("_")})
          const jump = s.tok(Tag.push, Ctrl.jump,
                             {goto: i.value, ref: frame.value})
          yield frame
          yield jump
          yield* s.leave()
        }
        yield i
        yield* s
        break
      } else
        yield i
      
    }
  },
  // emits auxiliary frames if there are jumps through several finally blocks
  function* composeFinallyBlocks(si) {
    const s = Kit.auto(si)
    const root = s.first.value
    let resFrame, resSym, resJumps = []
    for(let i; (i = s.cur()) && i.type !== Block.frame;)
      yield s.take()
    yield* walk()
    if (resFrame) {
      const lab = s.label()
      const f = s.enter(Tag.push,Block.frame,{declSym:resFrame})
      for(const i of resJumps)
        i.instances.add(f.value)
      yield f
      yield s.enter(Tag.push,Ctrl.jump,{result:true,ref:f,goto:null})
      if (resSym)
        yield s.tok(Tag.push, Tag.Identifier,{lhs:false,rhs:true,sym:resSym})
      yield* lab()
    }
    yield* s
    function preComposeFrame(jump) {
      const chain = jump.preCompose || emptyArr, len = chain.length
      if (len) {
        const [h, ...t] = jump.preCompose || emptyArr
        const args = jump.frameArgs || (jump.frameArgs = new Map())
        for(let i = 0;;) {
          const step = chain[i++]
          const cont = step.contArg
          const arg = cont.declSym
          if (i < len) {
            const next = chain[i]
            args.set(arg,next.declSym)
            cont.instances.add(next)
          } else {
            if (jump.goto) {
              args.set(arg,jump.goto.declSym)
              cont.instances.add(jump.goto)
            } else {
              if (jump.result) {
                if (!resSym)
                    resSym = Bind.tempVarSym(s.first.value,"r")
                // jump.sym = resSym
                args.set(resSym,argSym)
              } else {
                // likely there is a frame to fit already
                if (root.emptyResFrame) {
                  args.set(arg,root.emptyResFrame.declSym)
                  cont.instances.add(root.emptyResFrame)
                  break
                }
              }
              if (!resFrame)
                resFrame = Kit.scope.newSym("r_")
              args.set(arg,resFrame)
              resJumps.push(cont)
            }
            break
          }
        }
        jump.goto = h
      }
    }
    function* walk() {
      for(const i of s.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Block.frame:
            let {catchCont} = i.value
            if (catchCont != null && catchCont.goto.exceptFrameCopy) {
              const contFrame = catchCont.goto
              const sym = catchCont.exceptSym
              if (sym) {
                // turning catchCont into a usual frame
                contFrame.exceptSym = null
                contFrame.frameParams = new Set([sym])
              }
              const memo = catchCont.goto.preCompMemo
                    || (catchCont.goto.preCompMemo = new Map())
              const comp = catchCont.preCompose[0]
              let wrap = memo.get(comp)
              if (!wrap) {
                // if catch is behind finally block - precomposing it
                // two frame is needed to avoid exception parameter duplication
                const copySym = Bind.tempVarSym(s.first.value,"ex")
                const catchFrame = s.enter(Tag.push,Block.frame,
                                               {declSym:Kit.scope.newSym("_c"),
                                                exceptSym:copySym
                                               })
                yield catchFrame
                const jump = s.tok(Tag.push, Ctrl.jump,
                                   {goto:catchCont.goto,
                                    ref:catchFrame.value,
                                    preCompose:catchCont.preCompose,
                                    frameArgs:new Map([[sym, copySym]])
                                   })
                yield jump
                yield* s.leave()
                wrap = catchFrame.value
                memo.set(comp,wrap)
                preComposeFrame(jump.value)
              }
              i.value.catchCont = {
                goto:wrap,
                exceptSym:wrap.exceptSym,
                gotoDests:[wrap.ref]
              }
              catchCont = i.value.catchCont
            }
            yield i
            const lab = s.label()
            if (catchCont != null) {
              if (s.opts.jsExceptions !== false) {
                yield s.enter(Tag.push, Tag.TryStatement)
                yield s.enter(Tag.block, Tag.BlockStatement)
                yield s.enter(Tag.body, Tag.Array)
              }
            }
            yield* walk(i.value)
            if (catchCont != null && s.opts.jsExceptions !== false) {
              yield* s.leave()
              yield* s.leave()
              yield s.enter(Tag.handler, Tag.CatchClause)
              const sym = catchCont.exceptSym
              yield s.tok(Tag.param,Tag.Identifier,{sym})
              yield s.enter(Tag.body,Tag.BlockStatement)
              yield s.enter(Tag.body,Tag.Array)
              yield s.enter(Tag.push,Ctrl.jump,{
                goto:catchCont.goto,
                ref:i.value,
                exceptSym: catchCont.exceptSym
              })
              yield* lab()
            }
            yield s.close(i)
            continue
          case Ctrl.jump:
          case Block.letStmt:
            preComposeFrame(i.value)
            break
          }
        }
        yield i
      }
    }
  })

Bind.paramThread.optBindAssign = true
Bind.ctxField.optBindAssign = true
Bind.objField.optBindAssign = false

/** moves bind patterns into frame's function declaration arguments */
const optimizeBindAssign = Kit.pipe(
  function optimizeBindAssign(si) {
    const s = Kit.auto(si)
    function* walk() {
      for(const i of s.sub()) {
        if (i.type === Tag.AssignmentExpression
            && i.value.node.operator === "="
            && s.cur().type === Tag.Identifier
           ) {
          // reference variables cannot go to patterns
          const sym = s.cur().value.sym
          if (sym && sym.interpr && sym.interpr.optBindAssign) {
            const left = Kit.toArray(s.one())
            const j = s.cur()
            if (j.type === Block.bindPat) {
              const jump = j.value.ref
              if (jump.eff) {
                jump.goto.patSym = jump.sym = sym
                Kit.skip(s.one())
                s.close(i)
                if (i.pos !== Tag.expression)
                  yield* Kit.reposOne(Kit.clone(left),i.pos)
                continue
              }
            }
            yield i
            yield* left
            yield* walk()
            yield s.close(i)
            continue
          }
        }
        yield i
      }
    }
    return walk()
  },
  function* cleanEmptyLet(si) {
    const s = Kit.auto(si)
    for(const i of s) {
      if (i.enter && i.type === Block.letStmt
          && s.cur().value === i.value) {
        s.close(i)
      } else
        yield i
    }
  })

/** flat structure related optimizations */
export const optimize = Kit.pipe(
  Array.from,
  //  Bind.optimizePureLets,
  //   Array.from,
  optimizeBindAssign,
  Kit.cleanEmptyExprs)

/** generates context reads and writes */
export function* copyCtxVars(si) {
  const s = Kit.auto(si)
  const frame = yield* s.till(i => i.enter && i.type === Block.frame)
  const root = s.first.value
  const ctxSym = root.contextSym
  const decls = root.savedDecls || (root.savedDecls = new Map())
  decls.set(ctxSym, {raw:null,init:[
    s.enter(Tag.init, Tag.CallExpression),
    s.tok(Tag.callee, Tag.Identifier,
          {sym:Kit.sysId(s.opts.scopeConstructor || "context")}),
    s.tok(Tag.arguments, Tag.Array),
    ...s.leave()]})
  yield* frameContent(frame.value)
  for(const i of s) {
    yield i
    if (i.enter && i.type === Block.frame)
      yield* frameContent(i.value)
  }
  function* memExpr(pos, sym) {
    const lab = s.label()
    yield s.enter(pos, Tag.MemberExpression)
    yield s.tok(Tag.object, Tag.Identifier, {sym:ctxSym})
    assert.ok(sym.fieldName)
    yield s.tok(Tag.property, Tag.Identifier, {node:{name:sym.fieldName}})
    yield* lab()
  }
  function* ctxAssign(sym) {
    yield s.enter(Tag.push, Tag.AssignmentExpression, {node:{operator:"="}})
    yield* memExpr(Tag.left,sym)
  }
  function* frameContent(frame) {
    const decls = frame.savedDecls || (frame.savedDecls = new Map())
    const sw = frame.stateVars
    function addSym(i,init) {
      if (frame.patSym !== i
          && (!frame.first || i.param !== root)
          && !(frame.stateVars.d && frame.stateVars.d.has(i))) {
        decls.set(i,{raw:null,init})
      }
    }
    if (sw) {
      const pat = frame.framePat
      const exceptSym = frame.exceptSym
      for(const i of sw.w)
        if (i.interpr === Bind.ctxField && i !== exceptSym)
          addSym(i)
      for(const i of sw.r)
        if (i.interpr === Bind.ctxField)
          addSym(i,Kit.toArray(memExpr(Tag.init, i)))
    }
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.letStmt:
          if (!i.value.eff)
            break
        case Ctrl.jump:
          if (!i.value.gotoDests.length)
            break
          const {r,w} = frame.stateVars
          const nextList = []
          for(const j of i.value.gotoDests)
            nextList.push(...j.frameParamsClos)
          const next = new Set(nextList)
          const tv = new Set([...r, ...w])
          const reset = []
          const del = new Set()
          for(const sym of w) {
            if (sym.interpr === Bind.ctxField) {
              if (next.has(sym)) {
                reset.push(sym)
              } else if (r.has(sym))
                del.add(sym)
            }
          }
          for(const sym of r) {
            if (sym.interpr === Bind.ctxField && !next.has(sym))
              del.add(sym)
          }
          const args = i.value.frameArgs
          const assign = []
          if (args)
            for(const i of args)
              if (/*i[1] !== argSym &&*/ i[0].interpr === Bind.ctxField)
                assign.push(i)
          const delVars = [...del].sort(byNum)
          reset.sort(byNum)
          if (reset.length || delVars.length || assign.length/* || patSym*/) {
            const lab = s.label()
            yield s.enter(i.pos, Tag.SequenceExpression, {result:true})
            yield s.enter(Tag.expressions, Tag.Array)
            const slab = s.label()
            for(const j of delVars) {
              yield* ctxAssign(j)
              yield s.tok(Tag.right,Tag.Identifier,{sym:undefinedSym})
              yield* slab()
            }
            for(const j of reset) {
              yield* ctxAssign(j)
              yield s.tok(Tag.right, Tag.Identifier, {sym:j})
              yield* slab()
            }
            let inner = i.leave ? [] : Kit.toArray(s.sub())
            for(const [sym,init] of assign) {
              yield* ctxAssign(sym)
              if (init === argSym) {
                yield* Kit.reposOneArr(inner, Tag.right)
                inner = null
              } else 
                yield s.tok(Tag.right, Tag.Identifier, {sym:init})
              yield* slab()
            }
            yield s.peel(Kit.setPos(i, Tag.push))
            if (inner && inner.length)
              yield* Kit.reposOneArr(inner, Tag.push)
            yield* lab()
            continue
          }
        }
      }
      yield i
    }
  }
}

export function interpretFrames(si) {
  const s = Kit.auto(si)
  const unpackMax = s.opts.unpackMax
  const root = s.first.value
  function* args(thread) {
    if (thread)
      for(const j of thread)
        yield s.tok(Tag.push,Tag.Identifier,{sym:j})
  }
  function* arrUnpack(thread) {
    yield s.enter(Tag.push,Tag.ArrayPattern)
    yield s.enter(Tag.elements,Tag.Array)
    yield* args(thread)
    yield* s.leave()
    yield* s.leave()
  }
  function* objUnpack(thread) {
    yield s.enter(Tag.push,Tag.ObjectPattern)
    yield s.enter(Tag.properties,Tag.Array)
    for(const j of thread) {
      yield s.enter(Tag.push,Tag.ObjectProperty,{node:{shorthand:true}})
      yield s.tok(Tag.key,Tag.Identifier,{sym:j})
      yield s.tok(Tag.value,Tag.Identifier,{sym:j})
      yield* s.leave()
    }
    yield* s.leave()
    yield* s.leave()
  }
  let paramUnpack
  switch(s.opts.packArgs) {
  case "apply"  : paramUnpack = args; break
  case "object" : paramUnpack = objUnpack; break
  default       : paramUnpack = arrUnpack
  }
  let paramPrefix = function*(){}
  let obj
  if (s.opts.scopeContext) {
    const sym = s.first.value.contextSym
    if (s.opts.contextMethodOps)
      obj = sym
    paramPrefix = function*() {
      yield s.tok(Tag.push, Tag.Identifier, {sym})
    }
  }
  let num = 0
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.chain:
          yield s.enter(i.pos,Tag.BlockStatement)
          yield s.enter(Tag.body,Tag.Array)
          yield* walk()
          yield* s.leave()
          yield* s.leave()
          s.close(i)
          continue
        case Block.bindPat:
          yield s.tok(i.pos,Tag.Identifier,i.value)
          s.close(i)
          continue
        case Tag.Identifier:
          if (obj && i.value.sym && i.value.sym.lib && num !== 1)
            i.value.ns = obj
          break
        case Block.frame:
          const fn = num++
          if (fn !== 0)
            i.value.declSym.orig = `_${fn}`
          i.value.frameStep = s.first.value
          const flab = s.label()
          if (fn !== 0) {
            const {catchCont} = i.value
            const patSym = i.value.patSym
            const thread = i.value.threadParams
            i.value.func = true
            if (i.value.optPatSym) {
              i.value.optPatSym.orig = `_${fn}A`
              yield s.enter(Tag.push,Tag.FunctionDeclaration,i.value)
              yield s.tok(Tag.id,Tag.Identifier,{sym:i.value.declSym})
              const paramsLab = s.label()
              yield s.enter(Tag.params,Tag.Array)
              yield* paramPrefix(i.value)
              yield* paramUnpack(thread)
              yield* paramsLab()
              yield s.enter(Tag.body,Tag.BlockStatement)
              yield s.enter(Tag.body,Tag.Array)
              yield s.enter(Tag.push,Tag.ReturnStatement)
              yield s.enter(Tag.argument,Tag.CallExpression)
              yield s.tok(Tag.callee,Tag.Identifier,{sym:i.value.optPatSym})
              yield s.enter(Tag.arguments, Tag.Array)
              yield* args(thread)
              yield* paramsLab()
              yield* s.leave()
            }
            yield s.enter(Tag.push,Tag.FunctionDeclaration,i.value)
            yield s.tok(Tag.id,Tag.Identifier,
                        {sym:i.value.optPatSym || i.value.declSym})
            const paramLab = s.label()
            yield s.enter(Tag.params,Tag.Array)
            yield* paramPrefix(i.value)
            if (thread && thread.length) {
              if (thread.length <= unpackMax) {
                yield* args(thread)
              } else {
                if (i.value.optPat) { 
                  for(const j of thread)
                    yield s.tok(Tag.push,Tag.Identifier,{sym:j})
                } else {
                  yield* paramUnpack(thread)
                }
              }
            }
            yield* paramLab()
            yield s.enter(Tag.body,Tag.BlockStatement)
            yield s.enter(Tag.body,Tag.Array)
          } else {
            // first frame is erased, so copying its vars here
            if (i.value.savedDecls) {
              const {savedDecls} = root
              for(const [j,v] of i.value.savedDecls)
                if (!savedDecls.has(j))
                  savedDecls.set(j,v)
            }
          }
          yield* walk()
          yield* flab()
          s.close(i)
          continue
        }
      }
      yield i
    }
  }
  return walk()
}

export function interpretJumps(si) {
  const s = Kit.auto(si)
  const packAsObj = s.opts.packArgs === "object"
  const unpackMax = s.opts.unpackMax
  const bindName = s.opts.bindName
  const ctxSym = s.first.value.contextSym
  function* argPack(arr,optPat,inner) {
    function* arg(i,pos) {
      if (i === argSym) {
        yield* Kit.reposOneArr(inner, Tag.push)
      }
      else
        yield s.tok(Tag.push,Tag.Identifier,{sym:i})
    }
    if (inner && inner.length && !arr.find(([i]) => i === argSym))
      yield* Kit.reposOneArr(inner, Tag.push)
    if (arr.length) {
      if (arr.length <= unpackMax) {
        for(const j of arr)
          yield* arg(j[1],Tag.push)
      } else {
        const lab = s.label()
        if (!optPat) {
          if (packAsObj) {
            yield s.enter(Tag.push, Tag.ObjectExpression)
            yield s.enter(Tag.properties, Tag.Array)
            for(const j of arr) {
              yield s.enter(Tag.push, Tag.ObjectProperty,
                            {node:{shorthand:true}})
              yield s.tok(Tag.key,Tag.Identifier,{sym:j[0]})
              yield* arg(j[1],Tag.value)
              yield* s.leave()
            }
            yield* lab()
            return
          }
          yield s.enter(Tag.push, Tag.ArrayExpression)
          yield s.enter(Tag.elements, Tag.Array)
        }
        for(const j of arr)
          yield* arg(j[1],Tag.push)
        yield* lab()
      }
    }
  }
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Ctrl.jump:
          const {goto,gotoDests,ref} = i.value
          const lab = s.label()
          const rec = i.value.rec
          const threadArgs = i.value.threadArgs || emptyArr
          const scopeOp = i.value.init
          const obj = (!scopeOp || s.opts.contextState)
                && s.opts.contextMethodOps && ctxSym
          const pos = i.pos
          if (gotoDests.length) {
            if (i.value.bindName) {
              let name = i.value.bindName
              if (threadArgs && threadArgs.length && s.opts.markArgNum) {
                if (threadArgs.length > unpackMax)
                  name += "N"
                else
                  name += threadArgs.length
              }
              yield s.enter(pos,Block.app,{sym:Kit.sysId(name),obj})
              yield s.tok(Tag.push,Tag.Identifier,{sym:goto.declSym})
              if (ctxSym && !scopeOp && !obj)
                yield s.tok(Tag.push,Tag.Identifier,{sym:ctxSym})
            } else {
              yield s.enter(pos,Tag.CallExpression,{result:true})
              yield s.tok(Tag.callee,Tag.Identifier,
                          {sym:goto.optPatSym || goto.declSym})
              yield s.enter(Tag.arguments,Tag.Array)
              if (ctxSym && !scopeOp)
                yield s.tok(Tag.push,Tag.Identifier,{sym:ctxSym})
            }
            let inner
            if (!i.leave)
              inner = Kit.toArray(s.sub())
            if (s.opts.markBindValue === false
                && gotoDests[0].patSym
                && threadArgs.length)
              yield s.tok(Tag.push,Tag.Identifier,{sym:undefinedSym})
            yield* argPack(threadArgs, goto.optPat, inner)
          } else {
            yield s.enter(pos, Tag.CallExpression, {result:true})
            yield s.tok(Tag.callee, Tag.Identifier, {sym:Block.pureId,ns:obj})
            yield s.enter(Tag.arguments, Tag.Array)
            const bind = s.curLev() != null
            if (ctxSym && !scopeOp && !s.opts.contextThis)
              yield s.tok(Tag.push,Tag.Identifier,{sym:ctxSym})
            let inner
            if (!i.leave)
              yield* s.sub()
            if (threadArgs)
              yield* argPack(threadArgs)
          }
          yield* lab()
          s.close(i)
          continue
        case Block.letStmt:
          if (i.value.eff) {
            const lab = s.label()
            const {goto,gotoDests,ref} = i.value
            const {catchCont} = ref
            const pos = i.pos
            if (!gotoDests.length && catchCont == null
                && i.value.bindName == null) {
              yield s.enter(pos,Block.effExpr)
              if (!i.leave)
                yield* walk()
            } else {
              let name = i.value.bindName || bindName
              const obj = ctxSym && s.opts.contextMethodOps && ctxSym
              const {sym:patSym,rec} = i.value
              const threadArgs = i.value.threadArgs || emptyArr
              const {catchCont} = ref
              if (patSym || s.opts.markBindValue === false)
                name += "B"
              if (threadArgs && threadArgs.length && s.opts.markArgNum) {
                if (threadArgs.length > unpackMax)
                  name += "N"
                else
                  name += threadArgs.length
              }
              if (rec && s.opts.markRec !== false)
                name += "R"
              if (catchCont != null || s.opts.markCatchCont === false)
                name += "H"
              yield s.enter(pos,Block.app,{sym:Kit.sysId(name),obj})
              if (ctxSym && !obj)
                yield s.tok(Tag.push, Tag.Identifier, {sym:ctxSym})
              if (!i.leave)
                yield* walk()
              yield s.tok(Tag.push,Tag.Identifier,
                          {sym:goto ? goto.declSym : Block.pureId,
                           ns:!goto && obj})
              if (catchCont != null)
                yield s.tok(Tag.push,Tag.Identifier,
                            {sym:catchCont.goto.declSym})
              yield* argPack(threadArgs)
            }
            yield* lab()
            s.close(i)
          }
          continue
        }
      }
      yield i
    }
  }
  return walk()
}

/** calculates `patSym` field */
function calcPatSym(cfg) {
  for(const i of cfg) {
    if (!i.exceptSym) {
      const {enters} = i
      if (enters && enters.length > 0) {
        i.patSym = enters[0].sym
      }
    }
  }
}

/** if `markBindValue` is false adds dummy bind parameter to frames */
function addDummyPatSym(cfg) {
  for(const i of cfg) {
    if (!i.patSym && !i.exceptSym) {
      const {enters} = i
      if (enters && enters.some(i => i.bindJump)) {
        i.patSym = Kit.scope.newSym()
        i.patSym.dummy = true
      }
    }
  }
}

/**
 * tries to avoid packing dependencies for direct calls
 */
function calcOptPat(cfg, unpackMax) {
  for(const i of cfg) {
    i.optPat = !i.patSym && i.threadParams
      && unpackMax && i.threadParams.length > unpackMax
      && i.enters.some(i => !i.bindJump && !i.bindName)
    if (i.optPat)
      i.optPatSym = i.enters.some(i => i.bindJump) && Kit.scope.newSym("_")
  }
}

/**  
 * calculates control flow graph for each jump 
 * enters/exits fields for frame, and ref field for jumps
 * returns all frame values
 */
function calcCfg(sa) {
  const s = Kit.auto(sa)
  const cfg = []
  function setDests(f,j) {
    j.ref = f
    const dests = j.gotoDests = []
    const {goto,catchCont} = j
    if (goto) {
      if (goto.dynamicJump) {
        flattenInstances(goto,dests)
      } else
        dests.push(goto)
    }
    /*
    if (catchCont) {
      dests.push(catchCont.goto)
    }
    */
    if (dests.length)
      f.exits.push(j)
  }
  function flattenInstances(goto, dests) {
    if (!goto)
      return
    for(const i of goto.instances) {
      if (i.dynamicJump) {
        flattenInstances(i,dests)
      } else {
        dests.push(i)
      }
    }
  }
  for(const i of s) {
    if (i.enter && i.type === Block.frame) {
      const frame = i.value
      frame.exits = []
      cfg.push(frame)
      frame.enters = []
      // if (frame.catchCont)
      //  setDests(frame, frame.catchCont)
      for(const j of s.sub()) {
        if (j.enter) {
          switch(j.type) {
          case Block.letStmt:
            if (!j.value.eff)
              break
            setDests(frame,j.value)
            if (frame.catchCont)
              j.value.gotoDests.push(frame.catchCont.goto)
            break
          case Ctrl.jump:
            setDests(frame,j.value)
            break
          }
        }
      }
    }
  }
  for(const i of cfg)
    for(const j of i.exits)
      for(const k of j.gotoDests)
        k.enters.push(j)
  return cfg
}

/**
 * calculate inter-frame dependecies 
 *  - `frameLocals: Set<Symbol>`: used or written by the frame but not read: 
 *  - `frameParams: Set<Symbol>`: needed by the frame
 *  - `framePat: Set<Symbol>`: received from bound effectful value    
 *  - `frameAvail: Set<Symbol>`: value assigned in some former frame
 *  - `frameParamsClos: Set<Symbol>`: needed by the frame or some next frame
 */
function calcVarDeps(si) {
  const sa = Kit.toArray(si)
  const root = sa[0].value
  const opts = root.opts
  const cfg = calcCfg(sa)
  cfg[0].first = true
  const anyRemoved = false // removeNoEntersJumps(cfg)
  calcPatSym(cfg)
  if (opts.markBindValue === false)
    addDummyPatSym(cfg)
  State.calcFlatCfg(cfg,sa)
  calcOptPat(cfg, opts.unpackMax)
  return anyRemoved ? cleanRemoved(sa) : sa
}

/** discharges frames without enters (sets `removed` property) */
function removeNoEntersJumps(cfg) {
  let any = false
  function walk(f) {
    if (!f.first && !f.enters.length && !f.removed) {
      f.removed = true
      any = true
      for(const i of f.exits) {
        for(const j of i.gotoDests) {
          const x = j.enters.indexOf(i)
          if(x >= 0) { // may be already removed on some other stack
            j.enters.splice(x, 1)
            if (!j.enters.length)
              walk(j)
          }
        }
      }
    }
  }
  cfg.forEach(walk)
  return any
}

/** remove frames marked with `removed` field */
function* cleanRemoved(si) {
  const s = Kit.auto(si)
  for(const i of s) {
    if (i.enter && i.type === Block.frame && i.value.removed) {
      Kit.skip(s.sub())
      s.close(i)
      continue
    }
    yield i
  }
}

/** conferts flat structure to JS expressions */
export const interpret = Kit.pipe(
  optimize,
  calcVarDeps,
  Bind.interpretPureLet,
  Block.interpretPure,
  Opts.ifContextState(copyCtxVars),
  Policy.stage("interpretFrames"),
  interpretFrames,
  Kit.toArray,
  interpretJumps)

