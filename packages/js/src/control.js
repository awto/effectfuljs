import * as Kit from "./kit"
import {Tag,produce,consume,symbol,scope as vars} from "estransducers"
import * as assert from "assert"
import * as Block from "./block"
import * as Debug from "./debug"

export const blockId = Kit.sysId("block")
export const scopeId = Kit.sysId("scope")

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
          case Tag.ForAwaitStatement:
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
export function removeLabeldStatement(s) {
  const sl = Kit.auto(s)
  function* walk() {
    for(const i of sl.sub()) {
      if (i.type === Tag.LabeledStatement && i.value.eff) {
        if (i.enter)
          yield* Kit.reposOne(walk(),i.pos)
        continue
      }
      yield i
    }
  }
  return walk()
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
      // TODO: this is needed only for ctx as first arg
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
                                    ctrl:i.value.ctrl,
                                    directives,
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
                  result: i.type === Tag.ReturnStatement && s.curLev() != null
                });
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

