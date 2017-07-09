import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,trace,dump} from "./kit"
import * as assert from "assert"
import * as Block from "./block"
import * as Ctrl from "./control"
import * as Loop from "./loops"
import * as Bind from "./bind"
import * as State from "./state"
import {traceAll as deb_TraceAll,
        trace as deb_Trace,
        dump as deb_Dump} from "./debug"
import * as Except from "./exceptions"
import {stmtExpr} from "./kit/stmtExpr"

const defaultUnpackMax = 5

const emptySet = new Set()
const emptyArr = []

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
export const convert = R.pipe(
  // removes redundant lets to simplify next step
  function cleanLets(si) {
    const s = Kit.auto(si)
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
            yield s.enter(i.pos, Block.pure)
            if (!i.leave)
              yield* Kit.reposOne(s.sub(), Tag.push)
            yield* s.leave()
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
                for(const j of s.sub()) {
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
                const exceptSym = handle.exceptSym = params[0].value.sym
                for(let j = fl; j < hl; j++) {
                  const f = frames[j][0]
                  if (f.value.catchCont == null)
                    f.value.catchCont = {goto:handle,
                                         exceptSym,
                                         gotoDests:[handle]}
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
                const contSym = Kit.scope.newSym("cb")
                contSym.state = true
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
                  yield i
                  yield s.take()
                  yield* s.one()
                  assert.ok(!cur.length)
                  cur.push(...(yield* walk(s.one(), [])))
                  cur.push(...(yield* walk(s.one(), [])))
                  yield s.close(j)
                  yield s.close(i)
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
              for(const l of ncur)
                if (l.goto == null) {
                  l.goto = k
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
          && !i.tryBody) {
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
      function* frame(value) {
        value.enters = []
        const j = s.cur()
        const maybeSingle = j.type === Ctrl.jump
        const {catchCont} = value
        if (catchCont) {
          jumps.push(catchCont)
          catchCont.preCompose = getPreCompose(value, catchCont.goto)
          catchCont.ref = value
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
                    && j.type !== Block.bindPat
              if (maybeSingle && !result)
                singleJumps.push({frame:value,jump:i.value})
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
          yield s.tok(Tag.push, Ctrl.jump,
                      {goto: i.value, ref: frame.value, bindName:"scope"})
          yield* lab()
        } else if (i.value.catchCont != null
                   || i.value.enters && i.value.enters.length) {
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
    const finConts = []
    const emitSteps = []
    const doneFinSteps = new Map()
    // composes a few finally blocks into a single function
    function getFinStep(steps,cont,resSym) {
      if (steps.length === 0) {
        // lifted result
        if (resSym != null) {
          const lab = s.label()
          const f = s.enter(Tag.push,Block.frame,
                            {declSym:Kit.scope.newSym("r_"),
                             frameParams: new Set([resSym])})
          const res = f.value
          emitSteps.unshift([...function*(){
            yield f
            yield s.enter(Tag.push,Tag.CallExpression,{result:true})
            yield s.tok(Tag.callee,Tag.Identifier,{sym:Block.pureId})
            yield s.enter(Tag.arguments,Tag.Array)
            yield s.tok(Tag.push, Tag.Identifier, {sym:resSym})
            yield* lab()
          }()])
          return res
        }
        return cont
      }
      const id = steps.map(i => i.finContId)
            .concat([cont ? cont.id : resSym ? "@" : "#"]).join()
      let res = doneFinSteps.get(id)
      if (res != null)
        return res
      const nxt = getFinStep(steps.slice(1),cont,resSym)
      const arg = steps[0].contArg
      const jump = s.tok(Tag.push, Ctrl.jump, {
        goto: steps[0],
        ref: res,
        frameArgs: new Map([[arg.declSym,nxt ? nxt.declSym : Block.pureId]])
      })
      if (nxt)
        arg.instances.add(nxt)
      const f = s.enter(Tag.push,Block.frame,
                        {declSym:Kit.scope.newSym("f_")})
      res = f.value
      doneFinSteps.set(id,res)
      emitSteps.push([f,jump,...s.leave()])
      return res
    }
    // emits composed finally blocks into the main chain
    function* commitFinSteps() {
      for(const i of emitSteps)
        yield* i
      emitSteps.length = 0
    }
    // if jumps is to be precomposed generates frames for this
    function preComposeFrame(jump) {
      const resSym = !jump.goto && jump.result && new Kit.scope.newSym("r")
            || null
      const res = getFinStep(jump.preCompose || emptyArr,jump.goto, resSym)
      if (resSym != null && res.resultSym == null) {
        res.pat = [s.tok(Tag.push,Tag.Identifier,{sym:resSym})]
        res.resultSym = resSym
      }
      return jump.goto = res
    }
    // optimized version of preComposeFrame where 1 step may be omitted 
    function preComposeFrameOpt(jump) {
      const finsteps = jump.preCompose
      if (finsteps && finsteps.length) {
        if (jump.result)
          return preComposeFrame(jump)
        const nxt = getFinStep(finsteps.slice(1), jump.goto)
        const head = finsteps[0]
        if (nxt)
          head.contArg.instances.add(nxt)
        const args = jump.frameArgs || (jump.frameArgs = new Map())
        args.set(head.contArg.declSym, nxt ? nxt.declSym : Block.pureId)
        jump.goto = head
      }
    }
    function* walk() {
      for(const i of s.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Block.frame:
            yield i
            const {catchCont} = i.value
            const lab = s.label()
            if (catchCont != null) {
              preComposeFrame(catchCont)
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
              const sym = Kit.scope.newSym("e")
              yield s.tok(Tag.param,Tag.Identifier,{sym})
              yield s.enter(Tag.body,Tag.BlockStatement)
              yield s.enter(Tag.body,Tag.Array)
              yield s.enter(Tag.push,Ctrl.jump,catchCont)
              yield s.tok(Tag.push, Tag.Identifier, {sym})
              yield* lab()
            }
            yield s.close(i)
            yield* commitFinSteps()
            continue
          case Ctrl.jump:
            preComposeFrameOpt(i.value, true)
            break
          case Block.letStmt:
            if (i.value.ref.catchCont)
              preComposeFrame(i.value)
            else
              preComposeFrameOpt(i.value)
            break
          }
        }
        yield i
      }
    }
    yield* walk()
  })

/** moves bind patterns into frame's function declaration arguments */
const optimizeBindAssign = R.pipe(
  function optimizeBindAssign(si) {
    const s = Kit.auto(si)
    function* getLeft() {
      let res = false
      for(const i of s.one()) {
        if (i.enter && i.type === Tag.Identifier &&
            (!i.value.sym || !i.value.sym.byVal))
          res = true
        yield i
      }
      return res
    }
    function* walk() {
      for(const i of s.sub()) {
        if (i.type === Tag.AssignmentExpression
            && i.value.node.operator === "="
            && s.cur().type === Tag.Identifier
           ) {
          const left = []
          // reference variables cannot go to patterns
          if (Kit.result(getLeft(), left)) {
            yield i
            yield *left;
            continue
          }
          const j = s.cur()
          if (j.type === Block.bindPat) {
            const f = j.value.ref
            if (f.eff) {
              f.pat = Kit.reposOneArr(left,Tag.push)
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
export const optimize = R.pipe(
  Array.from,
  Bind.optimizePureLets,
  Array.from,
  optimizeBindAssign,
  Kit.cleanEmptyExprs)


/** conferts flat structure to JS expressions */
export const interpret = R.pipe(
  optimize,
  calcVarDeps,
  Bind.interpretPureLet,
  Block.interpretPure,
  function interpretBlocks(si) {
    const s = Kit.auto(si)
    const unpackMax = s.opts.unpackMax || defaultUnpackMax
    
    function* args(thread) {
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
      const sym = s.first.value.contextSym = Kit.scope.newSym("ctx")
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
              const pat = i.value.pat
              const thread = i.value.threadParams
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
                yield* args()
                yield* paramsLab()
                yield* s.leave()
              }
              yield s.enter(Tag.push,Tag.FunctionDeclaration,i.value)
              yield s.tok(Tag.id,Tag.Identifier,
                          {sym:i.value.optPatSym || i.value.declSym})
              const paramLab = s.label()
              yield s.enter(Tag.params,Tag.Array)
              yield* paramPrefix(i.value)
              if (pat && pat.length)
                yield *pat           
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
            }
            const locals = i.value.frameLocals
            if (locals != null && locals.size) {
              const vars = []
              if (fn === 0) {
                for(const j of locals) {
                  if (!j.param)
                    vars.push(j)
                }
              } else
                vars.push(...locals)
              if (vars.length) {
                vars.sort((a,b) => a.num - b.num)
                const lab = s.label()
                yield s.enter(Tag.push,Tag.VariableDeclaration,
                              {node:{kind:"var"}})
                yield s.enter(Tag.declarations,Tag.Array)
                for(const sym of vars) {
                  yield s.enter(Tag.push,Tag.VariableDeclarator)
                  yield s.tok(Tag.id,Tag.Identifier,{sym})
                  yield* s.leave()
                }
                yield* lab()
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
  },
  Array.from,
  function interpretJumps(si) {
    const s = Kit.auto(si)
    const packAsObj = s.opts.packArgs === "object"
    const unpackMax = s.opts.unpackMax || defaultUnpackMax
    const ctxSym = s.first.value.contextSym
    function* argPack(arr,optPat) {
      if (arr && arr.length) {
        if (arr.length <= unpackMax) {
          for(const i of arr)
            yield s.tok(Tag.push,Tag.Identifier,{sym:i[1]})
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
                yield s.tok(Tag.value,Tag.Identifier,{sym:j[1]})
                yield* s.leave()
              }
              yield* lab()
              return
            }
            yield s.enter(Tag.push, Tag.ArrayExpression)
            yield s.enter(Tag.elements, Tag.Array)
          }
          for(const j of arr)
            yield s.tok(Tag.push,Tag.Identifier,{sym:j[1]})
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
            const {threadArgs,rec} = i.value
            const scopeOp = i.value.bindName === "scope"
            const obj = ctxSym && !scopeOp && s.opts.contextMethodOps && ctxSym
            if (gotoDests.length) {
              let name = i.value.bindName || "j"
              if (threadArgs) {
                if (threadArgs.length > unpackMax)
                  name += "N"
                else
                  name += threadArgs.length
              }
              if (i.value.bindName) {
                yield s.enter(i.pos,Block.app,{sym:Kit.sysId(name),obj})
                yield s.tok(Tag.push,Tag.Identifier,{sym:goto.declSym})
                if (ctxSym && !scopeOp && !obj)
                  yield s.tok(Tag.push,Tag.Identifier,{sym:ctxSym})
              } else {
                yield s.enter(i.pos,Tag.CallExpression,{result:true})
                yield s.tok(Tag.callee,Tag.Identifier,
                            {sym:goto.optPatSym || goto.declSym})
                yield s.enter(Tag.arguments,Tag.Array)
                if (ctxSym && !scopeOp)
                  yield s.tok(Tag.push,Tag.Identifier,{sym:ctxSym})
              }
              if (!i.leave)
                yield* s.sub()
              yield* argPack(threadArgs, goto.optPat)
            } else {
              yield s.enter(i.pos, Tag.CallExpression, {result:true})
              yield s.tok(Tag.callee, Tag.Identifier, {sym:Block.pureId,ns:obj})
              yield s.enter(Tag.arguments, Tag.Array)
              const bind = s.curLev() != null
              if (ctxSym && !scopeOp && !obj)
                yield s.tok(Tag.push,Tag.Identifier,{sym:ctxSym})
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
              if (!gotoDests.length && catchCont == null
                  && i.value.bindName == null) {
                yield s.enter(i.pos,Block.effExpr)
                yield* walk()
              } else {
                let name = i.value.bindName || "j"
                const obj = ctxSym && s.opts.contextMethodOps && ctxSym
                name+="M"
                const {threadArgs,pat,rec} = i.value
                const {catchCont} = ref
                if (pat && pat.length)
                  name += "B"
                if (threadArgs && threadArgs.length) {
                  if (threadArgs.length > unpackMax)
                    name += "N"
                  else
                    name += threadArgs.length
                }
                if (rec)
                  name += "R"
                if (catchCont != null)
                  name += "E"
                yield s.enter(i.pos,Block.app,{sym:Kit.sysId(name),obj})
                if (ctxSym && !obj)
                  yield s.tok(Tag.push, Tag.Identifier, {sym:ctxSym})
                yield* walk()
                yield s.tok(Tag.push,Tag.Identifier,
                            {sym:goto ? goto.declSym : Block.pureId,
                             ns:!goto && obj})
                yield* argPack(threadArgs)
                if (catchCont != null)
                  yield s.tok(Tag.push,Tag.Identifier,
                              {sym:catchCont.goto.declSym})
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
  })

/** 
 * calculates parameters for each frame definition
 */
function resolveFrameParams(cfg) {
  for(const i of cfg) {
    const locals = i.frameLocals = new Set()
    const params = i.frameParams
          || (i.frameParams = new Set())
    const decls = i.frameDecls
    const src = i.srcLet
      
    const pat = i.pat = i.pat || src && src.pat
    const framePat = i.framePat = new Set(
      pat && pat
        .filter(i => i.enter && i.type === Tag.Identifier && i.value.sym)
        .map(i => i.value.sym))
    if (i.exceptSym) {
      assert.ok(!framePat.size)
      assert.ok(!(i.pat && i.pat.length))
      i.pat = [Kit.tok(Tag.push,Tag.Identifier,{sym:i.exceptSym})]
      i.framePat.add(i.exceptSym)
    }
    const sw = i.stateVars
    const exits = i.exits
    for(const {goto, frameArgs} of exits) {
      if (goto && goto.dynamicJump && goto.instances.size)
        params.add(goto.declSym)
      if (frameArgs)
        for(const j of frameArgs.values()) {
          if (j.state)
            params.add(j)
        }
    }
    if (decls != null)
      decls.forEach(params.delete, params)
    if (sw != null) {
      for(const i of sw.r.keys())
        params.add(i)
      if (exits != null) {
        for(const j of sw.w.keys()) {
          if (!sw.r.has(j) && !framePat.has(j) && !params.has(j))
            locals.add(j)
        }
      }
    }
  }
}

function* setContextArgs(si) {
  const s = Kit.auto(si)
  if (!s.opts.scopeContext || !s.opts.scopePrefix) {
    yield* s
    return
  }
  const ctx = Kit.scope.newSym("ctx")
  for (const i of s) {
    if (i.enter) {
      switch(i.type) {
      case Block.frame:
        const threadParams = i.value.threadParams || (i.value.threadParams = [])
        threadParams.unshift(ctx)
        break
      case Block.letStmt:
      case Ctrl.jump:
        if (i.value.bindName === "scope")
          break
        const threadArgs = i.value.threadArgs || (i.value.threadArgs = [])
        threadArgs.unshift([ctx,ctx])
        break
      }
    }
    yield i
  }
}

/** 
 * calculates what should be passed to binds on each `goto` and what should
 * be received in each frame's arguments
 *
 *     type FrameVal = FrameVal & { threadParams: Sym[] }
 *     type JumpVal = JumpVal & { threadArgs: Sym[][] }
 *
 *     (cfg: FrameVal[]) => {} 
 */
function resolveFrameArgs(cfg,root) {
  for(const i of cfg) {
    if (!root.captSym && !i.frameParams.size && !i.frameLocals.size
        && !i.framePat.size
        && i.exits.every(i => !i.frameArgs || !i.frameArgs.size)) {
      if (i.frameParamsClos.size > 1) {
        const sym = Kit.scope.newSym("s")
        i.threadParams = [sym]
        for(const j of i.exits)
          j.threadArgs = [[sym,sym]]
      }
      if (!i.frameParamsClos.size)
        continue
    }
    i.threadParams = [...i.frameParamsClos].sort((a, b) => a.num - b.num)
    if (root.captSym)
      i.threadParams.unshift(root.captSym)
    const visible = [...i.frameParamsClos,
                     ...i.frameLocals || emptyArr,
                     ...i.framePat || emptyArr].map(i => [i,i])
    for(const j of i.exits) {
      const [dst] = j.gotoDests
      if (dst == null) {
        j.threadArgs = []
        continue
      }
      let params = dst.frameParamsClos || emptyArr
      const argsMap = new Map([...visible,
                               ...(j.frameArgs ? j.frameArgs : emptyArr)])
      const args = []
      for(const k of params) {
        args.push([k,argsMap.get(k) || Kit.scope.undefinedSym])
      }
      j.threadArgs = args.sort(([a],[b]) => a.num - b.num)
      if (root.captSym)
        j.threadArgs.unshift([root.captSym,root.captSym])
    }
  }
}

/**
 * tries to avoid packing dependencies for direct calls
 */
function calcOptPat(cfg, unpackMax) {
  for(const i of cfg) {
    i.optPat = !i.pat && i.threadParams
      && i.threadParams.length > unpackMax
      && i.enters.some(i => !i.bindJump && !i.bindName)
    if (i.optPat)
      i.optPatSym = i.enters.some(i => i.bindJump) && Kit.scope.newSym("_")
  }
}

/** 
 * propagates informations about variable required to be read to 
 * all control flow ancestors chain
 * 
 */
function propagateArgs(cfg,root) {
  // propagating writes in fact rarely needed, only if there are some
  // uninitialized variables
  const dyn = []
  // checks what symbols may be assinged till the frame
  function calcAvail(frame,seen) {
    if (frame.frameAvail != null)
      return frame.frameAvail
    if (seen.has(frame))
      return emptySet
    seen.add(frame)
    const res = new Set()
    if (frame.framePat)
      frame.framePat.forEach(res.add,res)
    if (frame.enters != null && frame.enters.length) {
      for(const i of frame.enters) {
        if (i.frameArgs) {
          for(const j of i.frameArgs.keys())
            res.add(j)
        }
        const src = i.ref
        if (src.frameLocals)
          src.frameLocals.forEach(res.add,res)
        calcAvail(src,seen).forEach(res.add,res)
      }
    } else {
      if (root.paramSyms != null) {
        for(const i of root.paramSyms)
          res.add(i)
      }
      if (root.scopeCapt != null) {
        for(const i of root.scopeCapt)
          res.add(i)
      }
    }
    return res
  }
  function allReads(frame,seen) {
    if (frame.frameParamsClos != null)
      return new Set(frame.frameParamsClos)
    if (seen.has(frame))
      return emptySet
    seen.add(frame)
    const res = new Set(frame.frameParams)
    if (frame.exits != null) {
      for (const i of frame.exits) {
        const assigned = i.frameArgs && [...i.frameArgs.keys()] || emptyArr
        for(const j of i.gotoDests) {
          const cur = allReads(j,seen)
          assigned.forEach(cur.delete,cur)
          cur.forEach(res.add,res)
        }
      }
    }
    const locals = frame.frameLocals
    if (locals != null)
      locals.forEach(res.delete,res)
    const pat = frame.framePat
    if (pat != null)
      pat.forEach(res.delete,res)
    const avail = frame.frameAvail
    if (avail != null)
      for(const i of res)
        if (!avail.has(i))
          res.delete(i)
    return res
  }
  // preparing transitive closure of each jump argument
  for (const i of cfg) {
    const assigned = i.frameAvail = calcAvail(i,new Set())
    const params = i.frameParams
    const locals = i.frameLocals
    for (const j of i.exits) {
      if (j.gotoDests.length > 1)
        dyn.push(j.gotoDests)
    }
    for (const j of params) {
      if (!assigned.has(j)) {
        params.delete(j)
        locals.add(j)
      }
    }
  }
  // propagating transitive closure of each frame's parameters
  // each frame needs to receive all vars it needs plus all the
  // frames which could be next in control flow
  for (const i of Kit.reverse(cfg)) {
    i.frameParamsClos = allReads(i, new Set())
  }
  // unifying instances of dynamic jump, so all destinations frames
  // should have same number of parameters
  for(let i, store = new Map(); (i = dyn.pop()) != null;) {
    const params = new Set()
    for(const j of i)
      j.frameParamsClos.forEach(params.add,params)
    const redo = new Set()
    for(const j of i) {
      const dummy = new Set(params)
      const fparams = j.frameParamsClos
      fparams.forEach(dummy.delete,dummy)
      let si = store.get(j)
      store.set(j,si = new Set())
      if (dummy.size) {
        dummy.forEach(fparams.add,fparams)
        // avoiding duplicate decls
        const {frameLocals:fl} = j
        if (fl != null)
          dummy.forEach(fl.delete,fl)
        dyn.push(...si)
      }
      si.add(i)
    }
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
    const goto = j.goto
    if (goto) {
      if (goto.dynamicJump) {
        flattenInstances(goto,dests)
      } else
        dests.push(goto)
    }
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
      if (frame.catchCont)
        setDests(frame, frame.catchCont)
      for(const j of s.sub()) {
        if (j.enter) {
          switch(j.type) {
          case Block.letStmt:
            if (!j.value.eff)
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
 *  - `frameDecls: Set<Symbol>`: symbol declared in this frame
 */
function calcVarDeps(si) {
  const sa = Kit.toArray(State.calcFrameStateVars(si))
  const root = sa[0].value
  const opts = root.opts
  const cfg = calcCfg(sa)
  resolveFrameParams(cfg)
  propagateArgs(cfg,root)
  resolveFrameArgs(cfg,root)
  calcOptPat(cfg, opts.unpackMax || defaultUnpackMax)
  return sa
}
