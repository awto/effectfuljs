import * as Kit from "./kit"
import {Tag} from "./kit"
import * as assert from "assert"
import * as Block from "./block"
import * as Ctrl from "./control"
import * as Loop from "./loops"
import * as Bind from "./bind"
import * as State from "./state"
import {ifDefunct} from "./options"
import * as Except from "./exceptions"
import * as Policy from "./policy"
import * as Defunct from "./defunct"
import * as Gens from "./generators"
import * as Inline from "./inline"

const undefinedSym = Kit.scope.undefinedSym

function byNum(a, b) {
  return a.num - b.num
}

function byNumFst(a, b) {
  return a[0].num - b[0].num
}

const emptyArr = []

// in frameArgs binds jump inner content
const argSym = Kit.scope.newSym("arg")

// temporal marker of all frames inside finally block
const finallyBlock = Kit.symbol("finally.block")
// temporal marker of all frames inside catchBlock
const catchBlock = Kit.symbol("catch.block")
// temporal marker delimiting handler block for both catch and finally
const handleBlock = Kit.symbol("try.handle")

function unboundTempVar(root,name) {
  const res = Bind.tempVarSym(root,name)
  res.bound = false
  return res
}

function addArg(args,lhs,rhs) {
  for(const [l,r] of args) {
    if (r === lhs) {
      args.set(l,rhs)
      return
    }
  }
  args.set(lhs,rhs)
}

/** 
 * convers to a flat stracture (without nested frames) 
 *     type ExitVal = JumpVal | LetStmtVal
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
   */
  function convertPrepare(si) {
    const s = Kit.auto(si)
    const root = s.first.value
    function* walk() {
      let res = false
      for(const i of s.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Tag.ReturnStatement:
            // remaining return statements are either last
            // in the functions or stmtExpr
            const cur = s.curLev()
            if (cur) {
              if (cur.value.eff) {
                cur.value.result = true
                yield* Kit.reposOne(s.sub(), i.pos)
              } else {
                yield s.enter(i.pos, Block.pure, {result:true})
                yield* Kit.reposOne(s.sub(), Tag.push)
                yield* s.leave()
              }
            }
            s.close(i)
            continue
          case Loop.repeat:
          case Ctrl.jump:
          case Block.choice:
          case Block.frame:
            res = true
            break
          case Block.letStmt:
            i.value.result = i.value.sym
              && i.value.sym.bound
              && i.value.sym.result
            if (i.value.eff) {
              res = true
              const inner = []
              if (Kit.result(walk(),inner)) {
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
              const lab = s.label()
              if (i.pos !== Tag.push || i.value.directives) {
                yield s.enter(i.pos,Tag.BlockStatement)
                if (i.value.directives)
                  yield* i.value.directives
                yield s.enter(Tag.body,Tag.Array)
              }
              cur = yield* walk(s.sub(),cur)
              const goto = frames.length > fl ? frames[fl][0].value : null
              yield s.tok(Tag.push,Ctrl.jump,{goto})
              yield* lab()
              if (i.value.brkRefs)
                for(const j of i.value.brkRefs)
                  cur.push(j)
              s.close(i)
            }
            continue
          case Block.frame:
            setGoto(cur,i.value)
            const declSym = i.value.declSym = Kit.scope.newSym("_")
            const inner = [i]
            frames.push(inner)
            cur = Kit.result(Kit.repos(walk(s.sub(),[],true),Tag.push),inner)
            const last = inner[inner.length-1]
            if (!i.value.eff && inner[inner.length-1].type !== Ctrl.jump) {
              const j = s.tok(Tag.push,Ctrl.jump)
              inner.push(j)
              cur.push(j.value)
            }
            inner.push(s.close(i))
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
              const bodyOpen = frames[fl][0].value
              const bodyClose = frames[hl-1][0].value
              const handle = frames[hl][0].value
              const onOpen = bodyOpen.onOpen || (bodyOpen.onOpen = [])
              const onClose = bodyClose.onClose || (bodyClose.onClose = [])
              handle.tryBody = frames[fl][0].value
              switch(i.value.sym) {
              case Except.handleId:
                const errSym = params[0].value.sym
                onOpen.unshift(s.enter(Tag.push,catchBlock,
                                       {handle:handle,errSym}))
                onClose.push(...s.leave())
                cur = bodyJumps.concat(hjumps)
                break
              case Except.finallyId:
                const finJump = {
                  declSym:unboundTempVar(s.first.value,"fc"),
                  // catchContRedir:{declSym:unboundTempVar(s.first.value,"fe")},
                  // resultContRedir:{declSym:unboundTempVar(s.first.value,"fr")},
                  dynamicJump:true,
                  instances:new Set(),
                  handle}
                handle.contArg = finJump
                onOpen.unshift(s.enter(Tag.push,finallyBlock,{handle}))
                onClose.push(...s.leave())
                setGoto(hjumps, finJump)
                cur = bodyJumps
                break
              default:
                throw s.error(`unsupported "app" ${i.value.node.name}`)
              }
              s.close(i)
              const handleClose = frames[frames.length-1][0].value;
              (handle.onOpen || (handle.onOpen = []))
                .unshift(s.enter(Tag.push,handleBlock,{}));
              (handleClose.onClose || (handleClose.onClose = []))
                .push(...s.leave())
              continue
            }
            break
          case Block.pure:
            const pj = s.enter(i.pos, Ctrl.jump, {result:i.value.result})
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
            if (j != null && j.type === Block.pure) {
              s.take()
              yield s.enter(i.pos, Ctrl.jump, i.value)
              if (!j.leave)
                yield* s.sub()
              yield* s.leave()
              s.close(j)
              s.close(i)
              cur.push(i.value)
              continue
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
                  if (s.opts.markRec !== false)
                    l.bindName = "repeat"
                }
            }
            cur = []
            s.close(i)
            continue
          }
        }
        yield i
      }
      return cur
    }
    for(const i of s) {
      switch(i.type) {
      case Block.chain:
        if (i.enter) {
          yield Kit.setPos(i,Tag.body)
          yield* walk(s.sub(),[])
          for(const j of frames) {
            const v = j[0].value
            if (v.onOpen) {
              yield* v.onOpen
              v.onOpen = null
            }
            yield* j
            if (v.onClose) {
              yield* v.onClose
              v.onClose = null
            }
          }
          yield Kit.setPos(s.close(i),Tag.body)
          continue
        }
        break
      default:
        yield i
      }
    }
  },
  Kit.toArray,
  // * removes useless frames:
  //   - frame with the only statement is a jump
  //   - inlines frames with only 1 jump into it
  // processing all frames at once to handle non-local jumps
  // this is a bit inefficient, maps will contain all items from the module
  function postproc(sa) {
    const s = Kit.auto(sa)
    const root = s.first.value
    const bindName = s.opts.bindName || "chain"
    walk()
    return sa
    function walk() {
      for(const i of s.sub()) {
        if (i.enter) {
          switch(i.type) {
            case Block.frame:
            for(const j of s.sub()) {
              if (j.enter) {
                switch(j.type) {
                case Block.bindPat:
                  break
                case Block.letStmt:
                  if (!j.value.eff)
                    break
                  if (j.value.bindName == null)
                    j.value.bindName = bindName
                  j.value.suspending = j.value.bindName !== bindName
                case Ctrl.jump:
                  const bindJump = j.type === Block.letStmt
                  j.value.bindJump = bindJump
                  j.value.ref = i.value
                  }
              }
            }
          }
        }
      }
    }
  },
  // wraps chain with extra frames for exiting the function,
  // normally or with exception
  function* wrapChain(sa) {
    const s = Kit.auto(sa)
    const root = s.first.value
    let first = sa.find(i => i.type === Block.frame)
    if (!first)
      return s
    first = first.value
    for(const i of s) {
      yield i
      if (i.enter && i.type === Block.chain)
        break
    }
    const j = s.cur()
    function* ctrlFrames() {
      const sym = root.resSym = unboundTempVar(root,"r")
        // Bind.tempVarSym(root,"r")
      const f = s.enter(Tag.push, Block.frame,
                        {declSym:Kit.scope.newSym("ret"),root,last:true})
      root.resFrame = f.value
      yield f
      yield s.enter(j.pos,Block.app,{sym:Block.pureId,
                                     insideCtx:true,last:true})
      yield s.tok(Tag.push,Tag.Identifier,{sym,lhs:false,rhs:true,decl:false})
      yield* s.leave()
      yield* s.leave()
      const psym = Kit.scope.newSym("r") // Bind.tempVarSym(root)
      const fr = s.enter(Tag.push, Block.frame,
                         {declSym:Kit.scope.newSym("retv"),
                          root,errSym:psym,last:true})
      root.resFrameRedir = fr.value
      f.value.resultRedir = {errSym:psym,redir:fr.value}
      yield fr
      yield s.enter(j.pos,Block.app,{sym:Block.pureId,insideCtx:true})
      yield s.tok(Tag.push,Tag.Identifier,{sym:psym})
      yield* s.leave()
      yield* s.leave()
      const esym = Kit.scope.newSym("e") // Bind.tempVarSym(root)
      const er = s.enter(Tag.push, Block.frame,
                         {declSym:Kit.scope.newSym("errv"),root,errSym:esym})
      yield er
      root.errFrameRedir = er.value
      yield s.enter(j.pos,Block.app,{sym:Except.raiseId,insideCtx:true})
      yield s.tok(Tag.push,Tag.Identifier,{sym:esym})
      yield* s.leave()
      yield* s.leave()
      return [sym,f.value,fr.value,er.value]
    }
    if (s.opts.scopePrefix) {
      const lab = s.label()
      const frame = s.enter(Tag.push, Block.frame,
                            {declSym:Kit.scope.newSym("_"),
                             root,result:false})
      yield frame
      yield s.tok(Tag.push, Block.letStmt,
                  {goto:first,ref:frame.value,bindJump:true,
                   eff:true,bindName:"scope",init:true})
      yield* lab()
    } else if (first.enters && first.enters.size) {
      // the function starts from loop
      const frame = s.enter(Tag.push, Block.frame,
                            {declSym:Kit.scope.newSym("_"),root})
      const jump = s.tok(Tag.push, Ctrl.jump,
                         {goto:first,ref:frame.value,result:false})
      yield frame
      yield jump
      yield* s.leave()
    } else {
      // first frame is inlined into function so must be skipped
      yield* s.one()
    }
    const resFrameCont = Kit.toArray(ctrlFrames())
    yield* s.sub()
    // needs to be in the end so `cleanup` pass can remove them if needed
    yield* resFrameCont
    yield* s
  },
  /** 
   * for each frame and jump adds 
   *   finally continuations:
   *   - preCompose: FrameVal[] 
   *   catch continuations for frames:
   *   - catchCont - {preCompose:FrameVal[],errSym:Sym,Goto:FrameVal} 
   */
  Kit.toArray,
  function preComposeTryCatch(si) {
    const s = Kit.auto(si)
    const root = s.first.value
    const {resFrame} = root
    const preCompose = root.preCompose || []
    preCompose.unshift(resFrame)
    const errPreCompose = []
    const resCont = root.resCont
    const errSym = unboundTempVar(root,"err")
    return Kit.toArray(walk({goto:null,errSym,preCompose:[]}))
    function* walk(cc) {
      for(const i of s.sub()) {
        if (i.enter) {
          switch(i.type) {
          case finallyBlock:
            const cont = i.value.handle.contArg
            preCompose.unshift(i.value.handle)
            errPreCompose.unshift(i.value.handle)
            const errSym = unboundTempVar(root,"err")
            yield* walk({goto:cc.goto,errSym,
                         preCompose:[...errPreCompose]})
            preCompose.shift()
            errPreCompose.shift()
            s.close(i)
            const fh = s.take()
            assert.ok(fh.type === handleBlock)
            const args = cont.args || (cont.args = new Map())
            addArg(args,cc.errSym,errSym)
            yield* walk(cc)
            s.close(fh)
            continue
          case catchBlock:
            yield* walk({goto:i.value.handle,errSym:i.value.errSym,
                         preCompose:[...cc.preCompose]})
            s.close(i)
            const ch = s.take()
            assert.ok(ch.type === handleBlock)
            yield* walk(cc)
            s.close(ch)
            continue
          case Block.letStmt:
            if (!i.value.eff)
              break
          case Ctrl.jump:
            if (i.value.goto) {
              if (i.value.goto.handle)
                i.value.goto.preCompose = i.value.goto.handle.preCompose
            }
            i.value.preCompose = [...preCompose]
            break
          case Block.frame:
            i.value.catchCont = cc
            i.value.preCompose = [...preCompose]
            i.value.errPreCompose = [...errPreCompose]
            break
          }
        }
        yield i
      }
    }
  },
  Kit.toArray,
  // for try-finally (without catch) statements generates a frame for throwing
  // catched exception again
  function* addReThrowFrames(si) {
    const s = Kit.auto(si)
    const root = s.first.value
    const termFrames = []
    const errFrames = new Map()
    function* makeErrFrame(catchCont) {
      const lab = s.label()
      const sym = catchCont.errSym
      const res = s.enter(Tag.push,Block.frame,
                          {declSym:Kit.scope.newSym("throw_"),
                           root,eff:true,throwSym:sym,insideCtx:true})
      yield res
      yield s.enter(Tag.push,Block.app,{sym:Except.raiseId,
                                     insideCtx:true,last:true})
      yield s.tok(Tag.push,Tag.Identifier,
                  {sym,lhs:false,rhs:true,decl:false})
      yield* lab()
      return res.value
    }
    for(const i of s) {
      yield i
      if (i.type === Block.chain)
        break
    }
    for(const i of s.sub()) {
      yield i
      if (i.enter && i.type === Block.frame) {
        const {catchCont} = i.value
        if (!catchCont.goto) {
          let frame = errFrames.get(catchCont.errSym)
          if (!frame) {
            const content = Kit.toArray(makeErrFrame(catchCont))
            frame = content[0].value
            termFrames.push(...content)
            errFrames.set(catchCont.errSym,frame)
          }
          catchCont.goto = frame
        }
      }
    }
    yield* termFrames
    yield* s
  },
  // emits auxiliary frames if there are jumps through several finally blocks
  function* composeFinallyBlocks(si) {
    const s = Kit.auto(si)
    const root = s.first.value
    const {resFrame,resSym,errFrameRedir} = root
    const storeResultCont = root.opts.storeResultCont
    const redirFrames = []
    for(const i of s) {
      yield i
      if (i.type === Block.chain)
        break
    }
    for(const i of s.sub()) {
      if (i.enter && i.type === Block.frame) {
        yield* frame(i)
        continue
      }
      yield i
    }
    yield* redirFrames
    yield* s
    function cutChain(jump,dstChain) {
      let res = jump.preCompose || emptyArr
      if (!res.length)
        return res
      res = [...res]
      const dst = jump.goto
      if (!dst)
        return res
      if (!dstChain)
        return res
      for(const i of Kit.reverse(dstChain)) {
        if (i === res[res.length-1])
          res.pop()
        else
          break
      }
      return res
    }
    function preComposeFrame(jump,chain) {
      const len = chain.length
      jump.preCompose = null
      if (len) {
        const indirJumps = jump.indirJumps = new Map()
        for(let i = 0;;) {
          const step = chain[i++]
          const cont = step.contArg
          if (i < len) {
            const next = chain[i]
            indirJumps.set(next,cont)
            cont.instances.add(next)
          } else {
            if (jump.goto) {
              indirJumps.set(jump.goto,cont)
              cont.instances.add(jump.goto)
            } else {
              if (jump.result) {
                resSym.bound = true;
                (jump.frameArgs || (jump.frameArgs = new Map()))
                  .set(resSym,argSym)
              }
            }
            break
          }
        }
        jump.goto = chain[0]
      }
    }
    function* makeRedir(cont,finFrame) {
      if (cont.goto && cont.goto.throwSym) {
        cont.redir = errFrameRedir
        return
      }
      const sym = Kit.scope.newSym()
      const redir = s.enter(
        Tag.push,Block.frame,
        {declSym:Kit.scope.newSym("ce_"),root,errSym:sym})
      cont.redir = redir.value
      yield redir
      const args = new Map(cont.frameArgs)
      yield s.tok(Tag.push,Ctrl.jump,{
        goto:cont.goto,
        ref:redir.value,
        indirJumps:cont.indirJumps,
        frameArgs:args})
      if (cont.errSym) {
        cont.errSym.bound = true
        args.set(cont.errSym,sym)
      }
      yield* s.leave()
    }
    function* frame(i) {
      const frame = i.value
      let {catchCont} = i.value
      function getResCont() {
        if (frame.resultCont)
          return frame.resultCont
        const result = frame.preCompose && frame.preCompose[0] || resFrame
        if (result.resultRedir)
          return frame.resultCont = result.resultRedir
        const resCont = frame.resultCont = result.resultRedir = {errSym:resSym}
        preComposeFrame(resCont,frame.preCompose)
        redirFrames.push(...makeRedir(resCont,resFrame))
        return resCont
      }
      if (catchCont) {
        if (!catchCont.composed) {
          const chain = cutChain(
            catchCont,
            catchCont.goto && catchCont.goto.errPreCompose)
          preComposeFrame(catchCont,chain)
          redirFrames.push(...makeRedir(catchCont,frame))
          catchCont.composed = true
        }
        i.value.catchContRedir = catchCont.redir
      } else
        i.value.catchContRedir = errFrameRedir
      yield i
      if (catchCont && !catchCont.goto)
        catchCont = null
      if (!frame.savedDecls)
        frame.savedDecls = new Map()
      for(const j of s.sub()) {
        if (j.enter) {
          if (storeResultCont)
            getResCont()
          switch(j.type) {
          case Block.letStmt:
            if (!j.value.eff)
              break
          case Ctrl.jump:
            if (frame === resFrame)
              break
            preComposeFrame(
              j.value,
              cutChain(
                j.value,
                j.value.goto && j.value.goto.preCompose || emptyArr))
            if (j.type === Block.letStmt
                && j.value.goto === resFrame
                && j.value.result) {
              const resultCont = getResCont()
              j.value.goto = resultCont.goto
              j.value.sym = resultCont.errSym
            }
            break
          }
        }
        yield j
      }
      if (frame.resultCont)
        frame.resultContRedir = frame.resultCont.redir
      yield s.close(i)
    }
  },
  Inline.throwStatements,
  Kit.toArray,
  function optimize(sa) {
    const cfg = new Map()
    sa = getCfgFolded(sa,cfg)
    instantiateJumps(cfg.keys())
    optUselessFrames(cfg)
    instantiateJumps(cfg.keys())
    resetEnters(cfg.keys())
    optInlineFrames(cfg)
    function jumpArgs(j,first) {
      if (j.indirJumps) {
        const args = j.frameArgs || (j.frameArgs = new Map)
        for(const [dest,cont] of j.indirJumps) {
          if (!cont.reachable)
            continue
          args.set(cont.declSym,dest.declSym)
          cont.declSym.bound = true
        }
      }
    }
    for(const i of cfg.keys()) {
      if (i.throwSym)
        i.throwSym.bound = true
      for(const j of i.exits)
        jumpArgs(j,i.root)
      if (i.catchCont)
        jumpArgs(i.catchCont,i.root.first)
    }
    return unfoldCfg(cfg,sa)
  },
  Kit.toArray)

/** generates local copies of variables used in each frame */
function* copyFrameVars(si) {
  const s = Kit.auto(si)
  const frame = yield* s.till(i => i.enter && i.type === Block.frame)
  const root = s.first.value
  const ctxSym = root.contextSym
  const rootDecls = root.savedDecls || (root.savedDecls = new Map())
  const reuseTemps = s.opts.reuseTempVars !== false
  const commonPatSym = root.commonPatSym
  yield* frameContent(frame.value)
  for(const i of s) {
    yield i
    if (i.enter && i.type === Block.frame)
      yield* frameContent(i.value)
  }
  function isRef(sym) {
    return sym.interpr === Bind.ctxField
      || sym.interpr === Bind.closureVar
  }
  function* frameContent(frame) {
    const first = frame === root.first
    const decls = frame.savedDecls
    const sw = frame.stateVars
    const subst = new Map()
    const vars = new Set()
    if (sw) {
      sw.w.forEach(vars.add,vars)
      sw.r.forEach(vars.add,vars)
    }
    const patSym = frame.errSym || frame.patSym
    let patCopy
    if (patSym && isRef(patSym) /*&& vars.has(patSym)*/ && patSym.extBind) {
      patCopy = commonPatSym || Kit.scope.newSym()
      yield s.enter(Tag.push,Tag.AssignmentExpression,{node:{operator:"="}})
      yield s.tok(Tag.left,Tag.Identifier,{sym:patSym})
      yield s.tok(Tag.right,Tag.Identifier,{sym:patCopy})
      yield* s.leave()
    } else if (commonPatSym) {
      patCopy = commonPatSym
    }
    if (patCopy) {
      if (frame.errSym)
        frame.errSym = patCopy
      else
        frame.patSym = patCopy
    }
    const tempVars = []
    const substPatSym = commonPatSym && patSym ? function*() {
      for(const i of s.sub()) {
        if (i.enter && (i.type === Block.bindPat || i.type === Tag.Identifier)
            && i.value.sym === patSym) {
          i.value.sym = commonPatSym
        }
        yield i
      }
    } : function() { return s.sub() }
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.bindPat:
        case Tag.Identifier:
          if (i.value.sym) {
            if (commonPatSym && i.value.sym === patSym)
              i.value.sym = commonPatSym
            if (i.value.sym.interpr === Bind.ctxField)
              i.value.insideCtx = !frame.first
          }
          break
        case Block.letStmt:
          if (!i.value.eff)
            break
        case Ctrl.jump:
          if (!i.value.gotoDests.length)
            break
          const del = new Set()
          const args = i.value.frameArgs
          let assignArg
          const assign = []
          if (args) {
            for(let [left,right] of args) {
              if (isRef(left)) {
                if (right === argSym)
                  assignArg = left
                else {
                  if (commonPatSym && patSym && right === patSym)
                    right = commonPatSym
                  assign.push(
                    [left,[s.tok(Tag.right,Tag.Identifier,
                                 {sym:right})]])
                }
              }
            }
          }
          if (!first && s.opts.cleanupFrameVars) {
            const nextList = []
            for(const j of i.value.gotoDests)
              nextList.push(...j.frameParamsClos)
            const next = new Set(nextList)
            for(const i of vars) {
              if (!next.has(i) && !i.closCapt && isRef(i))
                del.add(i)
            }
          }
          assign.sort(byNumFst)
          let inner = i.leave ? null : Kit.toArray(substPatSym())
          if (assignArg && inner) {
            assign.push([assignArg,Kit.reposOneArr(inner,Tag.right)])
            inner = null
          }
          if (del.size) {
            const delList = []
            for(const i of del) {
              delList.push([i,[s.tok(Tag.right,Tag.NullLiteral)]])
            }
            delList.sort(byNumFst)
            const subst = new Map()
            let tmpVarNum = 0
            function getCopy(sym) {
              let copy = subst.get(sym)
              if (!copy) {
                if (!reuseTemps || !(copy = tempVars[tmpVarNum++])) {
                  copy = Kit.scope.newSym()
                  if (reuseTemps)
                    tempVars.push(copy)
                  decls.set(copy,{raw:null})
                }
                assign.push([copy,[s.tok(Tag.right,Tag.Identifier,{sym})]])
                subst.set(sym,copy)
              }
              return copy
            }
            if (i.value.goto && i.value.goto.dynamicJump
                && del.has(i.value.goto.declSym))
              i.value.goto.declSym = getCopy(i.value.goto.declSym)
            if (inner) {
              for(const j of inner) {
                let sym
                if (j.enter) {
                  switch(j.type) {
                  case Block.bindPat:
                    if (commonPatSym && patSym && j.value.sym === patSym) {
                      j.value.sym = commonPatSym
                      break
                    }
                  case Tag.Identifier:
                    if ((sym = j.value.sym) && del.has(sym)) {
                      j.value.sym = getCopy(sym)
                    }
                  }
                }
              }
            }
            assign.push(...delList)
          }
          const lab = s.label()
          assert.ok(i.pos === Tag.push)
          if (assign.length) {
            yield s.enter(Tag.push, Tag.SequenceExpression)
            yield s.enter(Tag.expressions, Tag.Array)
            for(const [sym,init] of assign) {
              yield s.enter(Tag.push,Tag.AssignmentExpression,
                            {node:{operator:"="}})
              yield s.tok(Tag.left,Tag.Identifier,{sym})
              yield* init
              yield* s.leave()
            }
            yield* lab()
          }
          yield s.peel(i)
          if (inner && inner.length)
            yield* Kit.reposOneArr(inner, Tag.push)
          yield* lab()
          continue
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
    if (thread) {
      for(const j of thread)
        yield s.tok(Tag.push,Tag.Identifier,{sym:j})
    }
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
  const ctxSym = s.first.value.contextSym
  if (ctxSym && ctxSym.bound && s.opts.contextBy === "parameter") {
    paramPrefix = function*() {
      yield s.tok(Tag.push, Tag.Identifier, {sym:ctxSym})
    }
  }
  const byThis = ctxSym && s.opts.contextBy === "this"
  let num = 0
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.chain:
          yield s.enter(i.pos,Tag.BlockStatement)
          if (i.value.directives)
            yield* i.value.directives
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
        case Block.frame:
          const fn = num++
          i.value.frameStep = s.first.value
          const flab = s.label()
          if (fn !== 0) {
            i.value.declSym.orig = `_${fn}`
            if (byThis)
              (i.value.savedDecls || (i.value.savedDecls = new Map())).set(
                ctxSym,
                {raw:null,init:[s.tok(Tag.init,Tag.ThisExpression)]})
            const thread = i.value.threadParams
            i.value.func = true
            yield s.enter(Tag.push,Tag.FunctionDeclaration,i.value)
            yield s.tok(Tag.id,Tag.Identifier,{sym:i.value.declSym})
            const paramLab = s.label()
            yield s.enter(Tag.params,Tag.Array)
            yield* paramPrefix(i.value)
            if (i.value.ctrlParam)
              yield s.tok(Tag.push,Tag.Identifier,{sym:i.value.ctrlParam})
            const patSym = i.value.errSym || i.value.patSym
            if (patSym && (thread && thread.length || !patSym.dummy))
              yield s.tok(Tag.push,Tag.Identifier,{sym:patSym})
            if (thread && thread.length)
              yield* thread.length <= unpackMax
                ? args(thread) : paramUnpack(thread)
            yield* paramLab()
            yield s.enter(Tag.body,Tag.BlockStatement)
            yield s.enter(Tag.body,Tag.Array)
          } else {
            // first frame is erased, so copying its vars here
            const {savedDecls} = root
            for(const [j,v] of i.value.savedDecls)
              if (!savedDecls.has(j))
                savedDecls.set(j,v)
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
  const {bindName,pureBindName,unpackMax} = s.opts
  const root = s.first.value
  const ctxSym = root.contextSym
  const requireFinalPure = s.opts.scopePostfix
  const passCont = !s.opts.inlineContAssign
  const passCatchCont = !s.opts.inlineErrorContAssign
  const passResultCont = !s.opts.inlineResultContAssign
  const {resFrameRedir} = root
  function* argPack(arr,inner) {
    function* arg(i,pos,last) {
      if (i === argSym) {
        if (inner) 
          yield* Kit.reposOneArr(inner, Tag.push)
        else if (i !== last)
          yield s.tok(Tag.push,Tag.Identifier,{sym:undefinedSym})
      }
      else
        yield s.tok(Tag.push,Tag.Identifier,{sym:i})
    }
    if (inner && inner.length && !arr.find(([i]) => i === argSym))
      yield* Kit.reposOneArr(inner, Tag.push)
    if (arr.length) {
      const last = arr[arr.length-1][1]
      if (arr.length <= unpackMax) {
        for(const j of arr)
          yield* arg(j[1],Tag.push,last)
      } else {
        const lab = s.label()
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
        for(const j of arr)
          yield* arg(j[1],Tag.push,last)
        yield* lab()
      }
    }
  }
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.letStmt:
          if (!i.value.eff)
            break
        case Ctrl.jump:
          const frame = i.value.ref
          const pure = i.type === Ctrl.jump
          const insideCtx = !frame.first
          const rec = i.value.rec
          const lab = s.label()
          const {goto,gotoDests,ref} = i.value
          const pos = i.pos
          const ctx = ctxSym
          const defaultName = pure ? pureBindName : bindName
          let name = i.value.bindName || defaultName
          const st = s.opts.static || !s.opts.methodOps[name]
          assert.ok(gotoDests.length)
          if (!gotoDests.length && !requireFinalPure && name === defaultName) {
            yield pure
              ? s.enter(pos,Block.app,{sym:Block.pureId,insideCtx})
              : s.enter(pos,Block.effExpr)
            if (!i.leave)
              yield* walk()
          } else {
            const {sym:patSym} = i.value
            const threadArgs = i.value.threadArgs || emptyArr
            let catchCont, resCont
            if (goto) {
              if (passCatchCont && goto.catchContRedir
                  && !goto.catchContRedir.removed)
                catchCont = goto.catchContRedir.declSym
              if (passResultCont && goto.resultContRedir
                  && !goto.resultContRedir.removed)
                resCont = goto.resultContRedir.declSym
            }
            const appVal = {sym:Kit.sysId(name),static:st,
                            insideCtx:!i.value.ref.first}
            if (s.curLev()) {
              if (s.opts.markBindValue !== false)
                name += "B"
              appVal.hasBindVal = true
            } else if (i.type === Ctrl.jump && s.opts.markBindValue === false) {
                appVal.hasBindVal = true
            }
            if (threadArgs && threadArgs.length) {
              if (s.opts.markArgNum !== false) {
                if (threadArgs.length > unpackMax)
                  name += "N"
                else
                  name += threadArgs.length
              }
              appVal.threadArgsNum = threadArgs.length
            }
            if (rec) {
              if (s.opts.markRec !== false)
                name += "R"
              appVal.repeatJump = true
            }
            if (catchCont && passCatchCont) {
              if (s.opts.markErrorCont !== false)
                name += "H"
              appVal.hasErrorCont = true
            }
            if (resCont && passResultCont) {
              if (s.opts.markResultCont !== false)
                name += "F"
              appVal.hasResultCont = true
            }
            if (passCont)
              appVal.hasCont = true
            yield s.enter(pos,Block.app,appVal)
            assert.ok(goto)
            if (s.curLev())
              yield* walk()
            else if (appVal.hasBindVal)
              yield s.tok(Tag.push,Tag.Identifier,{sym:Kit.scope.undefinedSym})
            if (passCont)
              yield s.tok(Tag.push,Tag.Identifier,{sym:goto.declSym})
            if (catchCont && passCatchCont)
              yield s.tok(Tag.push,Tag.Identifier,{sym:catchCont})
            if (resCont && passResultCont)
              yield s.tok(Tag.push,Tag.Identifier,{sym:resCont})
            yield* argPack(threadArgs)
          }
          yield* lab()
          s.close(i)
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
    if (!i.errSym && !(i.patSym && !i.patSym.dummy)) {
      const {enters} = i
      if (enters && enters.size > 0) {
        [{sym:i.patSym}] = enters
      }
    }
  }
}

/**
 * calculate inter-frame dependecies
 *  - `frameLocals: Set<Symbol>`: used or written by the frame but not read:
 *  - `frameParams: Set<Symbol>`: needed by the frame
 *  - `framePat: Set<Symbol>`: received from bound effectful value
 *  - `frameAvail: Set<Symbol>`: value assigned in some former frame
 *  - `frameParamsClos: Set<Symbol>`: needed by the frame or some next frame
 */
function calcVarDeps(sa) {
  const frames = getCfg(sa)
  calcPatSym(frames)
  sa = cfgPostProcess(sa)
  State.calcFlatCfg(frames,sa)
  return sa
}

/** 
 * if bind variable is used only in the frame where it is bound 
 * we can avoid tracking it
 */
function localizeBinds(sa) {
  const s = Kit.auto(sa)
  const forseBind = s.opts.markBindValue === false || s.opts.defunct
  const rootDecls = s.first.value.savedDecls
  const bindVars = new Set()
  for(const i of s) {
    if (i.enter && i.type === Block.frame) {
      if (i.value.patSym && !i.value.patSym.dummy) {
        i.value.patSym.boundAt = i.value
        bindVars.add(i.value.patSym)
        i.value.patSym.extBind = false
      }
      for(const j of s.sub()) {
        if (j.enter) {
          switch(j.type) {
          case Block.letStmt:
            if (j.value.eff) {
              if (forseBind && j.value.gotoDests) {
                for(const k of j.value.gotoDests) {
                  if (!k.patSym && !k.errSym) {
                    const sym = Kit.scope.newSym()
                    sym.dummy = true
                    k.patSym = sym
                  }
                }
              }
            } else {
              if (j.value.sym) {
                j.value.sym.boundAt = i.value
                bindVars.add(j.value.sym)
                j.value.sym.extBind = false
              }
            }
            break
          case Block.bindPat:
            const {sym} = j.value
            sym.bound = true;
            if (sym.boundAt !== i.value)
              sym.extBind = true
            break
          }
        }
      }
    }
  }
  for(const i of bindVars) {
    if (!i.extBind) {
      i.interpr = null
      rootDecls.delete(i)
      if (i.bound && i.boundAt.patSym !== i)
        i.boundAt.savedDecls.set(i,{raw:null})
    }
  }
}

const cfgPostProcess = Kit.pipe(
  cleanup,
  Kit.toArray)

/** 
 * removes a few useless items from resulting code 
 *  - frames with `remove:true` property
 *  - result/exception frames if they are not used
 *  - not bound identifiers
 */
function cleanup(si) {
  const sa = Kit.toArray(si)
  localizeBinds(sa)
  const s = Kit.auto(sa)
  const root = s.first.value
  const {resFrame,resFrameRedir,errFrameRedir,
         resSym,savedDecls,contextSym} = root
  const needResultCont = s.opts.keepLastPure || s.opts.storeResultCont
  const needErrorCont = s.opts.keepLastRaise || s.opts.storeErrorCont
  const [resJump] = resFrame.exits
  if (contextSym.bound === false)
    root.contextSym = null
  const ns = s.opts.contextMethodOps && root.contextSym
  for(const i of savedDecls.keys())
    if (i.bound === false)
      savedDecls.delete(i)
  function* writeResult(j) {
    yield s.enter(j.pos,Block.app,{sym:Block.pureId,
                                   insideCtx:!j.value.ref.first})
    const args = j.value.frameArgs
    let sym
    if ((sym = args && args.get(resSym))) {
      if (sym === argSym)
        yield* inner()
      else
        yield s.tok(Tag.push,Tag.Identifier,
                    {sym,lhs:false,rhs:true,decl:false})
    } else if (s.curLev()) {
      yield* inner()
    } else if (resSym.bound)
      yield s.tok(Tag.push,Tag.Identifier,
                  {sym:resSym,lhs:false,rhs:true,decl:false})
    yield* s.leave()
    s.close(j)
  }
  function* writeError(j) {
    const lab = s.label()
    const errSym = j.value.goto.throwSym
    const sym =
          errSym && j.value.frameArgs && j.value.frameArgs.get(errSym) ||
          errSym
    yield s.enter(j.pos,Tag.CallExpression,{result:true})
    yield s.tok(Tag.callee,Tag.Identifier,{sym:Except.raiseId,ns})
    yield s.enter(Tag.arguments,Tag.Array)
    yield s.tok(Tag.push,Tag.Identifier,
                {sym,lhs:false,rhs:true,decl:false})
    yield* lab()
    s.close(j)
  }
  function* inner() {
    for(const i of s.sub()) {
      if (i.enter && i.type === Tag.Identifier
          && i.value.sym && i.value.sym.bound === false) {
        Kit.skip(s.copy(i))
      } else
        yield i
    }
  }
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.ThrowStatement:
          if (i.pos === Tag.push) {
            yield i
            if (!i.leave) {
              yield* inner()
              yield s.close(i)
            }
            Kit.skip(s.sub())
            continue
          }
          break
        case Block.frame:
          if (i.value.patSym && i.value.patSym.bound === false)
            i.value.patSym = null
          if (i.value.errSym && i.value.errSym.bound === false)
            i.value.errSym = null
          if ((i.value === errFrameRedir || i.value.throwSym)
              && !i.value.required) {
            Kit.skip(s.copy(i))
            i.value.removed = true
            continue
          }
          if (i.value === resFrame || i.value === resFrameRedir) {
            if (i.value.required || i.value.first) {
              yield i
              for(const j of inner()) {
                if (j.enter && j.type === Ctrl.jump)
                  yield* writeResult(j)
                else
                  yield j
              }
            } else {
              i.value.removed = true
              Kit.skip(s.copy(i))
            }
            continue
          }
          if (i.value.patSym && i.value.patSym.interpr
              && !i.value.patSym.bound) {
            i.value.patSym.interpr = null
            i.value.patSym.dummy = true
          }
          if (i.value.catchContRedir) {
            if (i.value.catchContRedir === errFrameRedir
                && !needErrorCont)
              i.value.catchContRedir = null
            else
              i.value.catchContRedir.required = true
              
          }
          if (i.value.resultContRedir) {
            if (needResultCont)
              i.value.resultContRedir.required = true
            else
              i.value.resultContRedir = null
          }
          break
        case Block.letStmt:
          if (i.value.sym && !i.value.sym.bound)
            i.value.sym = null
          if (!i.value.eff)
            break
        case Ctrl.jump:
          assert.ok(i.value.goto)
          const args = i.value.frameArgs
          if (args) {
            for(const j of args.keys())
              if (j.bound === false)
                args.delete(j)
          }
          if (i.value.goto === resFrameRedir && !needResultCont) {
            const catchCont = i.value.ref.catchContRedir
            yield s.enter(i.pos,Block.effExpr)
            yield* inner()
            yield* s.leave()
            s.close(i)
            continue
          }
          if (i.value.goto === resFrame) {
            if (i.type === Ctrl.jump) {
              const [exit] = resFrame.exits
              i.value.goto = exit && exit.goto
              yield* writeResult(i)
              resFrame.enters.delete(i.value)
              continue
            }
          } else if (i.value.goto.throwSym) {
            if (i.type === Ctrl.jump) {
              const [exit] = i.value.goto.exits
              yield* writeError(i)
              i.value.goto.enters.delete(i.value)
              i.value.goto = exit && exit.goto
              continue
            }
          }
          for(const j of i.value.gotoDests)
            j.required = true
        }
      }
      yield i
    }
  }
  return walk()
}

/** 
 * for each jump adds another field gotoDests: FrameVal[] 
 * listing all possible jumps 
 */
function instantiateJumps(frames) {
  function flatten(goto,res) {
    if (goto.dynamicJump) {
      for(const i of goto.instances)
        flatten(i,res)
    } else {
      res.push(goto)
    }
  }
  for(const i of frames) {
    for(const j of i.exits) {
      const dst = j.goto
      if (dst) {
        if (dst.dynamicJump) {
          if (dst.args) {
            const args = j.frameArgs || (j.frameArgs = new Map)
            for(const [l,r] of dst.args)
              args.set(l,r)
          }
          const dests = []
          flatten(dst,dests)
          switch(dests.length) {
          case 0:
            const {errFrame,resFrame} = j.ref.root
            const ngoto = resFrame === j.ref || errFrame === j.ref
                  ? null : j.ref.root.resFrame
            dst.declSym.bound = false
            if (dst.catchContRedir)
              dst.catchContRedir.declSym.bound = false
            if (dst.resultContRedir)
              dst.resultContRedir.declSym.bound = false
            j.ref.contArg = null
            j.gotoDests = []
            j.goto = ngoto
            if (ngoto)
              j.gotoDests.push(ngoto)
            break
          case 1:
            j.goto = dests[0]
            const {contArg} = j.ref
            dst.declSym.bound = false
            if (dst.catchContRedir)
              dst.catchContRedir.declSym.bound = false
            if (dst.resultContRedir)
              dst.resultContRedir.declSym.bound = false
            j.ref.contArg = null
            j.goto.enters.add(j)
            j.gotoDests = dests
            break
          default:
            j.gotoDests = dests
            for(const k of j.gotoDests)
              k.enters.add(j)
            dst.declSym.bound = true
          }
        } else {
          j.gotoDests = [dst]
        }
      } else
        j.gotoDests = []
      if (i.catchContRedir && j.opts.storeErrorCont
          && !j.opts.inlineErrorContAssign)
        j.gotoDests.push(i.catchContRedir)
      if (i.resultContRedir && i.resultContRedir
          && j.opts.storeResultCont
          && !j.opts.inlineResultContAssign)
        j.gotoDests.push(i.resultContRedir)
    }
  }
}

/** 
 * if collapse === true fills collapsed:Map<FrameVal,Token[]> 
 * and collapses all frames into tokens saving their content 
 * in the Map's value, if `collapsed` is null it doesn't collapse frames
 * fills frames: FrameVal[] with a list of frame (if defined)
 * calculates FrameVal & {enters:Set<JumpVal>,exits:Set<JumpVal>}
 */
function* prepareCfg(si, collapsed, framesList) {
  const s = Kit.auto(si)
  const root = s.first.value
  let first
  const frames = []
  for(const i of s) {
    if (i.enter && i.type === Block.frame) {
      i.value.first = !first
      if (first == null)
        root.first = first = i.value
      i.value.root = root
      frames.push(i.value)
      if (framesList)
        framesList.push(i.value)
      yield s.tok(i.pos,i.type,i.value)
      const start = s.cur()
      const buf = []
      for(const j of s.sub()) {
        if (j.enter) {
          switch (j.type) {
          case Block.letStmt:
            if (!j.value.eff)
              break
          case Ctrl.jump:
            j.value.singleSymResult = null
            j.value.singleJump = false
            if (j.type === Ctrl.jump && start === j && j.value.goto
                && !j.value.goto.dynamicJump) {
              const k = s.curLev()
              if (k) {
                if (k.type === Block.bindPat)
                  i.value.singleSymResult = k.value.sym
              } else {
                i.value.singleJump = j.value.goto
                // simplifying next substitution
                if (!j.leave) {
                  buf.push(s.tok(j.pos,j.type,j.value))
                  s.close(j)
                  continue
                }
              }
            }
          }
        }
        buf.push(j)
      }
      resetExits(i.value,buf)
      if (collapsed) {
        collapsed.set(i.value,buf)
        s.close(i)
      } else {
        yield i
        yield* buf
      }
    } else
      yield i
  }
}

function resetExits(frame,content) {
  const exits = frame.exits = new Set()
  frame.enters = new Set()
  const start = content[0]
  for(const j of content) {
    if (j.enter) {
      switch (j.type) {
      case Block.letStmt:
        if (!j.value.eff)
          break
      case Ctrl.jump:
        j.value.ref = frame
        exits.add(j.value)
      }
    }
  }
}

function resetEnters(frames) {
  for(const i of frames) {
    for(const j of i.exits) {
      if (j.gotoDests) {
        for(const k of j.gotoDests) {
          k.enters.add(j)
        }
      } else if (j.goto && j.goto.enters)
        j.goto.enters.add(j)
    }
  }
}

/** restores original stream after `prepareCfg` folded frames */
function* restoreFromCfg(cfg, si) {
  for(const i of si) {
    if (i.enter && i.type === Block.frame) {
      assert.ok(i.leave)
      const f = cfg.get(i.value)
      if (!f)
        continue
      yield Kit.enter(i.pos,i.type,i.value)
      yield* f
      yield Kit.leave(i.pos,i.type,i.value)
    } else
      yield i
  }
}

/** inlines frames with only 1 jump into it */
function optInlineFrames(cfg) {
  for(const [i,toks] of cfg) {
    if (i.noInline)
      continue
    if (i.enters.size === 1) {
      const [enter] = i.enters
      if (!enter.result && !enter.bindJump
          && !enter.goto.dynamicJump
          && !(enter.frameArgs && enter.frameArgs.size)
          && !(enter.indirJumps && enter.indirJumps.size)
          && enter.ref.catchCont === i.catchCont) {
        enter.inlineFrame = toks
        i.removed = true
        for(const j of i.exits) {
          j.ref = enter.ref
          enter.ref.exits.add(j)
        }
        enter.ref.exits.delete(enter)
        cfg.delete(i)
      }
    }
  }
}

/** removes not reachable and frame with only 1 jump */
function optUselessFrames(cfg) {
  for(const i of cfg.keys()) {
    i.hasBindJump = false
    i.reachable = false
    for(const j of i.exits) {
      if (j.bindJump) {
        i.hasBindJump = true
        break
      }
    }
    const skipFirst = i.noInline = i.first || i.last
  }
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
  for(const i of cfg.keys()) {
    if (i.first) {
      markReachable(i)
      markReachable(i.root.resFrameRedir)
    }
  }
  for(const i of cfg.keys()) {
    if (!i.reachable) {
      i.removed = true
      cfg.delete(i)
      continue
    }
    if (i.catchContRedir)
      i.catchContRedir.noInline = true
    if (i.resultContRedir)
      i.resultContRedir.noInline = true
  }
  for(const i of cfg.keys()) {
    if (i.noInline)
      continue
    i.removed = false
    const [exit] = i.exits
    if (i.singleSymResult && exit.result) {
      i.substJump = i.root.resFrameRedir
      i.removed = true
      cfg.delete(i)
    } else if (i.singleJump && exit
               && !(exit.goto && exit.goto.dynamicJump
                    && exit.goto.args && exit.goto.args.size)
               && !(exit.indirJumps && exit.indirJumps.size)
               && !(exit.frameArgs && exit.frameArgs.size))
    {
      i.substJump = exit.goto
      i.removed = true
      cfg.delete(i)
    }
  }
  // applying the substitutes
  for(const i of cfg.keys()) {
    for(const j of i.exits) {
      const indir = j.indirJumps
      if (indir) {
        for(const [goto,arg] of indir) {
          assert.ok(goto.reachable)
          if (!goto.substJump)
            continue
          indir.delete(goto)
          let subst
          for(let k = goto.substJump;k;k = k.substJump)
            subst = k
          if (subst)
            indir.set(subst,arg)
        }
      }
      const {goto} = j
      if (!goto)
        continue
      if (goto.dynamicJump) {
        substDyn(goto)
        continue
      }
      let subst
      for(let k = goto.substJump;k;k=k.substJump)
        subst = k
      if (subst)
        j.goto = subst
    }
  }
  function substDyn(goto) {
    const {instances} = goto
    for(let dst of instances) {
      if (!dst.reachable) {
        instances.delete(dst)
        continue
      }
      if (dst.substJump) {
        instances.delete(dst)
        for(let k = dst.substJump;k;k = k.substJump)
          dst = k
        if (dst)
          instances.add(dst)
      }
      if (dst.dynamicJump)
        substDyn(dst)
    }
  }
}

/** applyies inlines previously marked by `optimizeJump` */
function applyInlines(si) {
  function* walk(sw) {
    let skip = false
    for(const i of sw) {
      if (skip) {
        if (i.value === skip)
          skip = false
        continue
      }
      if (i.enter) {
        switch(i.type) {
        case Block.letStmt:
          if (!i.value.eff)
            break
        case Ctrl.jump:
          if (i.value.inlineFrame) {
            yield* walk(i.value.inlineFrame)
            if (!i.leave)
              skip = i.value
            continue
          }
        }
      }
      yield i
    }
  }
  return walk(si)
}

/** 
 * returns optimized CFG and replaces frames in scopes to folded tokens
 * it is just applies `prepareCfg` to each item in `scopes` 
 */
function getCfgFolded(sa,cfg) {
  return Kit.toArray(prepareCfg(sa,cfg))
}

/** same as getCfgFolded but doesn't fold tokens */
function getCfg(sa) {
  const cfg = []
  Kit.skip(prepareCfg(sa,null,cfg))
  resetEnters(cfg)
  return cfg
}

/** reverse of `getCfgFolds` */
function unfoldCfg(cfg,sa) {
  return Kit.toArray(applyInlines(restoreFromCfg(cfg,sa)))
}

/** conferts flat structure to JS expressions */
export const interpret = Kit.pipe(
  Kit.toArray,
  calcVarDeps,
  Inline.storeContinuations,
  ifDefunct(Defunct.prepare),
  Gens.functionSentAssign,
  Bind.interpretPureLet,
  copyFrameVars,
  Policy.stage("interpretFrames"),
  Kit.toArray,
  ifDefunct(Defunct.convert),
  Inline.jumps,
  interpretJumps,
  Kit.toArray,
  Inline.control,
  interpretFrames,
  Kit.toArray,
  ifDefunct(Defunct.substSymConsts))

