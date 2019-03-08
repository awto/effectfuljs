import * as Kit from "./kit"
import {Tag,produce,consume,symbol,scope as vars} from "@effectful/transducers"
import * as Block from "./block"

export const blockId = Kit.sysId("block")
export const scopeId = Kit.sysId("scope")
export const jumpId = Kit.sysId("jump")

/**
 * calculates links between control blocks and jumps referencing them
 */
export function assignLabels(s) {
  const sa = Kit.toArray(s)
  const sl = Kit.auto(sa)
  function scope(top) {
    let labels = []
    function walk(labs,map,brkLab) {
      for(const i of sl.sub()) {
        if (i.enter) {
          i.value.ctrl = null
          switch(i.type) {
          case Tag.LabeledStatement:
            walk([...labs,i.value.node.label.name],map,brkLab)
            break
          case Tag.BlockStatement:
            let bmap = map
            if (labs.length) {
              bmap = new Map(map)
              i.value.ctrl = labs[0]
              i.value.labs = [...labs]
              for(const j of labs)
                bmap.set(j,i.value)
            }
            walk([],bmap,brkLab)
            break
          case Tag.WhileStatement:
          case Tag.DoWhileStatement:
          case Tag.ForStatement:
          case Tag.SwitchStatement:
          case Tag.ForInStatement:
          case Tag.ForOfStatement:
            const lmap = new Map(map)
            const nextBrkLab = i.type === Tag.SwitchStatement ? "#s" : "#"
            const lname = labs.length === 0  ? nextBrkLab : labs[0]
            i.value.ctrl = lname
            i.value.labs = [...labs,"#"]
            lmap.set(nextBrkLab,i.value)
            for(const j of labs)
              lmap.set(j,i.value)
            walk([],lmap,nextBrkLab)
            break
          case Tag.ReturnStatement:
            if (!i.value.last)
              i.value.block = map.get("#ret")
            break
          case Tag.ContinueStatement:
          case Tag.BreakStatement:
            const lab = i.value.node.label
            const defaultLab = i.type === Tag.BreakStatement ? brkLab : "#"
            const ln = lab == null ? defaultLab : lab.name
            if (!(i.value.block = map.get(ln))) {
              // strange NO-OP requirement from regenerator test case
              if (labs.indexOf(ln) === -1)
                throw new Error(ln !== defaultLab ? `no such label ${ln}`
                                : `unsyntatic ${i.type === Tag.BreakStatement 
                                  ? "break" : "continue"}`)
            }
            break
          default:
            if (i.value.func)
              scope(i)
          }
        }
      }
    }
    walk(["#ret"],new Map())
    sl.close(top)
  }
  scope(sl.take())
  return sa
}

/** 
 * specify a jump to end or beginning of `scope`, 
 * normilized to jumps end only
 */
export const jump = symbol("jump","ctrl")

/** removes AST JS LabeledStatement nodes */
export function removeLabeledStatement(s) {
  const sl = Kit.auto(s)
  function* walk(cur) {
    for(const i of sl.sub()) {
      if (i.enter) {
	if (i.type === Tag.LabeledStatement) {
	  const c = sl.cur()
	  if (c.pos === Tag.label)
	    Kit.skip(sl.one())
	  const labs = cur || []
	  labs.push(i.value.node.label.name)
          yield* Kit.reposOne(walk(labs), i.pos)
	  sl.close(i)
          continue
	}
	i.value.savedLabs = cur
	cur = null
      }
      yield i
    }
  }
  return walk()
}

export function restoreLabeledStatements(s) {
  s = Kit.auto(s)
  return _restoreLabeledStatements()
  function* _restoreLabeledStatements() {
    for(const i of s.sub()) {
      if (i.enter && i.value.stmt && !i.value.eff
	  && i.value.savedLabs && i.value.savedLabs.length) {
	const lab = s.label()
	let pos = i.pos
	for(const j of i.value.savedLabs) {
	  yield s.enter(pos,Tag.LabeledStatement)
	  yield s.tok(Tag.label,Tag.Identifier,{node:{name:j}})
	  pos = Tag.body
	}
	yield s.peel(Kit.setPos(i,Tag.body))
	yield* _restoreLabeledStatements()
	yield* lab()
	continue
      }
      yield i
    }
  }
}

/** 
 * re-calculates JS control information in `cntRefs` and `brkRefs` 
 * lists of `continue` and `break` statements for the block
 */
export function recalc(s) {
  const sa = Kit.toArray(s)
  const sl = Kit.auto(sa)
  for(const i of sl.sub()) {
    if (i.enter) {
      const ref = i.value.block
      if (ref) {
        if (i.type === Tag.ContinueStatement)
          (ref.cntRefs || (ref.cntRefs = [])).push(i.value)
        else
          (ref.brkRefs || (ref.brkRefs = [])).push(i.value)
      }
    }
  }
  return sa
}

/**
 * adds explicit return statement if the last one isn't return already 
 * this is needed to avoid leaking of last effect result
 */
export function* injectExplicitRet(si) {
  const s = Kit.auto(si)
  if (s.first.type === Tag.File) {
    yield* s
    return
  }
  let stop
  for(const i of s) {
    yield i
    if (i.pos === Tag.body && i.type === Tag.Array) {
      stop = i.value
      break
    }
  }
  let last
  for(const j of s) {
    if (j.value === stop) {
      if (!last || last.type !== Tag.ReturnStatement)
        yield s.tok(Tag.push, Tag.ReturnStatement, {last:true})
      else
        last.value.last = true
    }
    yield j
    last = j
  }
}

/** 
 * injects `scope` and `jump` tags where instead of labeled 
 * staments `break` and `continue` 
 */
export const injectBlock = Kit.pipe(
  Kit.map(Kit.pipe(
    function* injectScopeRefs(s) {
      const sl = Kit.auto(s)
      function labName(i) {
        let n = i.value.ctrl
        if (n[0] === "#")
          return "label"
        return n
      }
      const root = sl.first.value
      function* walk() {
        for(const i of sl.sub()) {
          if (i.enter && i.type === Tag.BlockStatement && i.value.eff) {
            const lab = sl.label()
            sl.peel(i)
            let directives = sl.cur().pos === Tag.directives && [...sl.one()]
            if (directives.length <= 2)
              directives = null
            sl.peel()
            const top = i.value.ctrl === "#ret"
            const node = {top}
            const start = sl.enter(i.pos,Block.chain,
                                   {node,
                                    sym:top ? scopeId : blockId,
                                    ctrl:i.value.ctrl,opts:i.value.opts,
                                    directives,optsAssign:i.value.optsAssign,
                                    root,stmt:true,bind:true})
            yield start
            i.value.ctrlNode = start.value
            yield* walk()
            yield* sl.leave()
            Kit.skip(lab())
            continue
          }
          yield i  
        }
      }
      yield* walk()

    },
    Kit.toArray)),
  Array.from,
  Kit.map(
    function* injectJumps(si) {
      const s = Kit.auto(si)
      const root = s.first.value
      const ctxDeps = root.ctxDeps
      for(const i of s) {
        if (i.enter) {
          switch(i.type) {
          case Tag.BreakStatement:
          case Tag.ReturnStatement:
            if (i.value.block && i.value.eff && !i.value.last) {
              if (i.enter) {
                let pos = i.pos
                const {ctrlNode} = i.value.block
                const j = s.enter(pos,jump,{
                  bind:true,ctrlNode,
                  result: i.type === Tag.ReturnStatement && s.curLev() != null,
                  orig:i.value
                })
                if (ctrlNode)
                  (ctrlNode.brkRefs || (ctrlNode.brkRefs = [])).push(j.value)
                yield j
                yield* Kit.reposOne(s.sub(), Tag.push)
                yield* s.leave()
                s.close(i)
                continue
              }
            }
          }
        }
        yield i
      }
    }),
  Kit.map(Kit.toArray),
  Array.from)


/**
 * Saves frame's content into `steps` field list of its first level tokens
 * Content of that tokens is stored in `content` field of their values too.
 * Also collects jumps to and from each frame.
 *
 *    type FrameVal = FrameVal 
 *      & {enters, exits: Set<LetJumpVal>,
 *         steps:(Val & {content:Token[]})[]}
 *    type JumpVal = JumpVal & { hasArg: boolean }
 * \todo replace Flat.getCfg with this
 */
export function convolveFrames(sa) {
  const s = Kit.auto(sa)
  const root = s.first.value
  const cfg = root.cfg = []
  for(const i of s) {
    if (i.enter && i.type === Block.frame) {
      cfg.push(i.value)
      i.value.first = false
      const content = i.value.steps = []
      const exits = i.value.exits = new Set()
      i.value.enters = new Set()
      for(const j of s.sub()) {
        if (j.enter) {
          switch(j.type) {
          case Block.letStmt:
          case jump:
            if (j.value.goto)
              exits.add(j.value)
          }
          j.value.ref = i.value
          if (!j.leave) {
            const buf = j.value.content = [j]
            for(const k of s.sub()) {
              if (k.enter) {
                switch(k.type) {
                case Block.letStmt:
                case jump:
                  if (!k.leave) {
                    buf.push(...(k.value.content = [k,...s.sub(),s.close(k)]))
                  } else {
                    buf.push(k)
                    k.value.content = [k]
                  }
                  if (k.value.goto)
                    exits.add(k.value)
                  k.value.ref = i.value
                  continue
                }
              }
              buf.push(k)
            }
            buf.push(s.close(j))
            content.push(j.value)
          } else {
            j.value.content = [j]
            content.push(j.value)
          }
        }
      }
      if (content.length)
        content[content.length-1].fbound = true
    }
  }
  const first = root.first = cfg[0]
  first.first = true
  instantiateJumps(cfg)
  resetEnters(cfg)
  return sa
}

/**
 * Recalculate `enters:Set<JumpLetVal>` expecting `exits:Set<JumpLetVal>` 
 * is already calculated
 */
export function resetEnters(frames) {
  for(const i of frames) {
    for(const j of i.exits) {
      if (j.gotoDests) {
        for(const k of j.gotoDests)
          k.enters.add(j)
      } else if (j.goto && j.goto.enters)
        j.goto.enters.add(j)
    }
  }
}

/**
 * Returns flattened instances of dynamic jumps 
 */
export function flattenGotoDests(goto,res) {
  if (goto.dynamicJump) {
    for(const i of goto.instances)
      flattenGotoDests(i,res)
  } else {
    res.push(goto)
  }
}

/** 
 * for each jump adds another field gotoDests: FrameVal[] 
 * listing all possible jumps 
 */
export function instantiateJumps(frames) {
  const [{root:opts}] = frames
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
          flattenGotoDests(dst,dests)
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
            j.gotoDests = dests
            break
          default:
            j.gotoDests = dests
            dst.declSym.bound = true
          }
        } else {
          j.gotoDests = [dst]
        }
      } else
        j.gotoDests = []
      if (i.catchContRedir && opts.storeErrorCont
          && !opts.inlineErrorContAssign)
        j.gotoDests.push(i.catchContRedir)
      if (i.resultContRedir && i.resultContRedir
          && opts.storeResultCont
          && !opts.inlineResultContAssign)
        j.gotoDests.push(i.resultContRedir)
    }
  }
}

