import * as R from "ramda"
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
export const assignLabels = R.pipe(
  function* assignLabels(s) {
    let labels = []
    const sl = Kit.auto(s)
    function* walk(labs,map,loc) {
      for(const i of sl.sub()) {
        yield i
        if (i.enter) {
          switch(i.type) {
          case Tag.LabeledStatement:
            yield* walk([...labs,i.value.node.label.name],map)
            break
          case Tag.BlockStatement:
            let bmap = map
            if (labs.length) {
              bmap = new Map(map)
              i.value.ctrl = labs
              const lname = labs[0]
              for(const i of labs)
                bmap.set(i,lname)
            }
            yield* walk([],bmap)
            break
          case Tag.WhileStatement:
          case Tag.DoWhileStatement:
          case Tag.ForStatement:
          case Tag.SwitchStatement:
          case Tag.ForInStatement:
          case Tag.ForOfStatement:
            const lmap = new Map(map)
            const lname = labs.length === 0 ? "#" : labs[0]
            i.value.ctrl = [lname]
            lmap.set("#",lname)
            for(const i of labs)
              lmap.set(i,lname)
            yield* walk([],lmap)
            break
          case Tag.ReturnStatement:
            if (!i.value.last) {
              i.value.jump = "#ret"
              i.value.exit = true
            }
            break
          case Tag.ContinueStatement:
          case Tag.BreakStatement:
            const lab = i.value.node.label
            const ln = lab == null ? "#" : lab.name
            if (!(i.value.jump = map.get(ln)))
              throw new Error(`no such label ${ln}`)
            i.value.exit = true
            break
          }
        }
      }
    }
    yield sl.peel()
    yield* walk(["#ret"],new Map([["#ret","#ret"]]))
    yield* sl.leave()
  })

/** wraps a control block, it can be referenced in `jump` tag */
export const scope = symbol("scope","ctrl")
/** 
 * specify a jump to end or beginning of `scope`, 
 * normilized to jumps end only
 */
export const jump = symbol("jump","ctrl")

/** removes AST JS LabeledStatement nodes */
export const removeLabeldStatement = R.pipe(
  function(s) {
    const sl = Kit.auto(s)
    function* walk() {
      for(const i of sl.sub()) {
        if (i.value.eff && i.type === Tag.LabeledStatement) {
          if (i.enter) {
            yield sl.enter(i.pos,Kit.Subst)
            yield* walk()
            yield* sl.leave()
          }
          continue
        }
        yield i
      }
    }
    return walk()
  },
  Kit.completeSubst)

//TODO: to 2 steps, marking unwinde + refs to jumps separately
/** 
 * re-calculates JS control information in `cntRefs` and `brkRefs` 
 * lists of `continue` and `break` statements for the block
 */
export function recalc(s) {
  const sa = Kit.toArray(s)
  const sl = Kit.auto(sa)
  const stack = []
  function walk(lab) {
    for(const i of sl.sub()) {
      if (i.enter) {
        stack.unshift(i.value)
        if (i.value.ctrl != null) {
          const nlab = Object.create(lab)
          i.value.cntRefs = []
          i.value.brkRefs = []
          for(const j of i.value.ctrl)
            nlab[j] = i.value
          walk(nlab)
        } else if (i.value.jump != null) {
          const ref = lab[i.value.jump]
          i.value.jumpRef = ref
          if (i.type === Tag.ContinueStatement) {
            ref.cntRefs.push(i.value)
          } else {
            ref.brkRefs.push(i.value)
          }
          for(const j of stack) {
            if (j === ref)
              break
            j.unwind = true
          }
        }
      }
      if (i.leave)
        stack.shift()
    }
  }
  walk({})
  return sa
}

export function recalcUnwind(s) {
  const sa = Kit.toArray(s)
  const stack = []
  for(const i of sa) {
    const v = i.value
    if (v.jumpRef != null) {
      for(const j of stack) {
        if (j === v.jumpRef)
          break
        j.unwind = true
      }
    }
    if (i.enter && !i.leave)
      stack.unshift(v)
    else if (i.leave)
      stack.shift()
  }
  return sa
}

/** 
 * injects `scope` and `jump` tags where instead of labeled 
 * staments `break` and `continue` 
 */
export const injectBlock = R.pipe(
  recalc,
  function* injectBlock(s) {
    const sl = Kit.auto(s)
    function labName(i) {
      let n = i.value.ctrl.filter(v => v !== "#")[0]
      if (n != null)
        return n
      return "label"
    }
    function* walk() {
      for(const i of sl.sub()) {
        if (i.value.ctrl && i.value.eff) {
          assert.ok(i.enter)
          const lab = sl.label()
          let labels = i.value.ctrl
          const top = i.value.ctrl[0] === "#ret"
          let pos = i.pos
          if (i.value.ctrlName != null
              || i.value.brkRefs && i.value.brkRefs.length)
          {
            //TODO: simplify this
            yield sl.enter(i.pos,Tag.ExpressionStatement)
            const node = {top}
            yield sl.enter(Tag.expression,scope,
                           {node,
                            sym:i.value.ctrlName || top && scopeId || blockId,
                            ctrl:i.value.ctrl.sort(),
                            expr:true,bind:true})
            i.value.ctrl = null
            for(const j of i.value.brkRefs)
              j.dst = node
            pos = Tag.body
            if (i.type !== Tag.BlockStatement) {
              yield sl.enter(pos,Tag.BlockStatement)
              yield sl.enter(Tag.body,Tag.Array)
              pos = Tag.push
            }
          }
          yield sl.peel(Kit.setPos(i,pos))
          yield* walk()
          yield* lab()
          continue
        }
        if (i.value.jump != null && i.value.eff) {
          if (i.enter) {
            const lab = sl.label()
            let pos = i.pos
            //TODO: after implicit casts are in this may be removed
            if (i.value.jumpKind !== "gen") {
              yield sl.enter(i.pos,Tag.ExpressionStatement)
              pos = Tag.expression
            }
            yield sl.enter(pos,jump,{
              bind: true,
              jump: i.value.jump,
              exit: i.value.exit,
              node: { dst:i.value.dst }})
            yield* Kit.reposOne(walk(), Tag.push)
            yield* lab()
          }
          continue
        }
        yield i  
      }
    }
    yield* walk()
  }
)

