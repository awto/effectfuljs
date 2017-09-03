import * as Kit from "./kit"
import * as assert from "assert"
import {Tag,symbol,symInfo} from "./kit"
import * as Debug from "./debug"
import * as Block from "./block"
import * as Prop from "./propagate"
import {stmtExpr} from "./kit/stmtExpr"

export const fork = symbol("branch.fork")
export const thread = symbol("branch.thread")

export function* mark(s) {
  for(const i of s) {
    if (i.enter) {
      switch(i.pos) {
      case Tag.consequent:
      case Tag.alternate:
        yield Kit.enter(i.pos,thread,i.value)
      }
      switch(i.type) {
      case Tag.IfStatement:
      case Tag.ConditionalExpression:
      case Tag.SwitchStatement:
        yield Kit.enter(i.pos,fork,i.value)
      }
    }
    yield i
    if (i.leave) {
      switch(i.type) {
      case Tag.IfStatement:
      case Tag.ConditionalExpression:
      case Tag.SwitchStatement:
        yield Kit.leave(i.pos,fork,i.value)
      }
      switch(i.pos) {
      case Tag.consequent:
      case Tag.alternate:
        yield Kit.leave(i.pos,thread,i.value)
      }
    }
  }
}

export function toBlocks(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.ConditionalExpression:
          yield i
          yield* s.sub()
          continue
        }
        switch(i.pos) {
        case Tag.consequent:
        case Tag.alternate:
          const lab = s.label()
          if (i.type === Tag.Array) {
            // switch/case
            yield i
            yield s.enter(Tag.push,Tag.BlockStatement)
            yield s.enter(Tag.body,Tag.Array)
            yield* walk()
          } else if (symInfo(i.type).expr) {
            yield i
            continue
          } else {
            if (i.type !== Tag.BlockStatement) {
              yield s.enter(i.pos,Tag.BlockStatement)
              yield s.enter(Tag.body,Tag.Array)
              yield s.peel(Kit.setPos(i,Tag.push))
            } else
              yield i
            yield* walk()
          }
          yield* lab()
          continue
        }
      }
      yield i
    }
  }
  return walk()
}

export function* clean(s) {
  s = Kit.auto(s)
  for(const i of s) {
    if (i.enter) {
      switch(i.pos) {
      case Tag.alternate:
        if (i.type === Tag.BlockStatement && i.value.node.loc == null) {
          const buf = []
          const j = Kit.result(s.findPos(Tag.body),buf)
          if (j.value === s.cur().value) {
            i.value.empty = true
            Kit.skip(s.till(v => v.leave && v.pos === Tag.alternate))
            continue
          }
          yield i
          yield* buf
          yield j
          continue
        }
      }
    }
    yield i
  }
}

/**
  E || F ==> E ? E : F
  E && F ==> E ? F : E

  if the expression requires coercion lifting
*/
function logicalToConditional(s) {
  s = Kit.auto(s)
  function* walk(sw) {
    for(const i of sw) {
      if (i.enter /* && s.opts.coerce === false */
          && i.value.eff && i.type === Tag.LogicalExpression)
      {
        const l = s.cur().value
        const ref = l.shared = {}
        s.peel(i)
        const lab = s.label()
        const j = s.enter(i.pos,Tag.ConditionalExpression,
                          {eff:true,bind:i.value.bind})
        j.value.shared = i.value.shared
        yield j
        yield* Kit.reposOne(walk(s.one()), Tag.test)
        if (i.value.node.operator === "&&") {
          yield* Kit.reposOne(walk(s.one()), Tag.consequent)
          yield s.tok(Tag.alternate,Block.sharedRef,{ref})
        } else {
          yield s.tok(Tag.consequent,Block.sharedRef,{ref})
          yield* Kit.reposOne(walk(s.one()), Tag.alternate)
        }
        yield* lab()
        Kit.skip(s.leave())
      } else 
        yield i
    }
  }
  return walk(s)
}

export const liftCoerce = Kit.pipe(
  function liftCoerce(s) {
    s = Kit.auto(s)
    function* walk(sw) {
      for(const i of sw) {
        yield i
        if (i.enter && s.opts.coerce === false
            && i.value.eff && i.type === Tag.ConditionalExpression)
        {
          yield* walk(s.one())
          for(const j of [Tag.consequent,Tag.alternate]) {
            const c = s.cur().value
            if (!c.eff) {
              yield s.enter(j,Block.pure)
              yield s.enter(Tag.expression,Kit.Subst)
              yield* walk(s.one())
              yield* s.leave()
              yield* s.leave()
            } else
              yield* walk(s.one())
          }
        }
      }
    }
    return walk(s)
  },
  Kit.completeSubst)

export function liftSwitchCoerce(s) {
  s = Kit.auto(s)
  function* walk() {
    for(const i of s.sub()) {
      yield i
      if (i.enter && i.type === Tag.SwitchCase && i.value.switchCaseLift) {
        const j = yield* s.till(j => j.pos === Tag.consequent)
        assert.ok(j)
        const k = s.cur()
        assert.equal(k.type, Tag.BlockStatement)
        if (!k.value.eff) {
          const lab = s.label()
          yield s.peel()
          yield* s.peelTo(Tag.body)
          yield* walk()
          yield s.enter(Tag.push,Tag.ExpressionStatement)
          yield s.tok(Tag.expression,Block.pure,{bind:true})
          yield* s.leave()
          yield* lab()
        }
      }
    }
  }
  return walk()
}

/**
 * setting boundary properties for logical expression so effect cannot escape
 */
export const prepareLogical = Kit.pipe(
  logicalToConditional,
  Kit.toArray,
  function calcNeedLift(sa) {
    const s = Kit.auto(sa)
    function walk(sw) {
      for(const i of sw) {
        if (i.enter) {
          switch(i.type) {
          case Tag.ConditionalExpression:
            walk(s.one())
            const c = s.cur()
            assert.equal(c.pos, Tag.consequent)
            walk(s.one())
            const a = s.cur()
            assert.equal(a.pos, Tag.alternate)
            walk(s.one())
            if (c.value.eff || a.value.eff)
              i.value.bind = c.value.liftExpr = a.value.liftExpr = true
            break
          case Tag.LogicalExpression:
            walk(s.one())
            const r = s.cur()
            assert.equal(r.pos, Tag.right)
            if (r.value.eff)
              i.value.bind = r.value.liftExpr = true
            break
          }
        }
      }
    }
    walk(s)
    return sa
  },
  function prepareLogical(s) {
    s = Kit.auto(s)
    function* walk() {
      for(const i of s.sub()) {
        if (i.value.liftExpr) {
          assert.ok(i.enter)
          const lab = s.label()
          yield s.enter(i.pos,stmtExpr,{eff:i.value.eff})
          yield s.enter(Tag.body,Tag.BlockStatement,{eff:i.value.eff})
          yield s.enter(Tag.body,Tag.Array)
          yield s.enter(Tag.push,Tag.ReturnStatement,
                        {last:true,eff:i.value.eff})
          yield s.peel(Kit.setPos(i,Tag.argument))
          yield* walk()
          yield* lab()
        } else
          yield i
      }
    }
    return walk()
  })

export const switchRewrite = Kit.pipe(
  function switchRewrite(s) {
    s = Kit.auto(s)
    function* walk() {
      for(const i of s.sub()) {
        yield i
        if (i.enter && i.value.eff) {
          if (i.type === Tag.SwitchStatement) {
            const cases = []
            yield* s.peelTo(Tag.cases)
            let hasDefault = false
            for(const j of s.sub()) {
              assert.ok(j.enter)
              assert.equal(j.type,Tag.SwitchCase)
              if (s.cur().pos !== Tag.test)
                hasDefault = true
              j.value.switchCaseLift = true
              const lab = s.label()
              cases.unshift({
                h: [s.peel(j),...s.peelTo(Tag.consequent)],
                b: [...walk()],
                f: [...lab()],
                eff: j.value.eff
              })
            }
            let last = null
            for(const j of cases) {
              const b = j.b
              if (b.length) {
                const k = b[b.length-1].value
                if (k.jump) {
                  if (i.value.ctrl.indexOf(k.jump) !== -1) {
                    k.jump = null
                    k.exit = false
                    k.last = true
                    let l
                    do {
                      l = b.pop()
                    } while (!l.enter || l.value !== k)
                  }
                  last = b
                  continue
                }
              }
              if (last != null)
                j.b.push(...Kit.clone(last))
              last = j.b
            }
            for(const j of cases.reverse()) {
              yield* j.h
              yield s.enter(Tag.push,Tag.BlockStatement)
              yield s.enter(Tag.body,Tag.Array)
              yield* Kit.clone(j.b)
              yield* s.leave()
              yield* s.leave()
              yield* j.f
            }
            if (!hasDefault) {
              const lab = s.label()
              const k = s.enter(Tag.push,Tag.SwitchCase)
              k.value.switchCaseLift = true
              yield k
              yield s.enter(Tag.consequent,Tag.Array)
              yield s.enter(Tag.push,Tag.BlockStatement)
              yield s.enter(Tag.body,Tag.Array)
              yield* lab()
            }
          }
        }
      }
    }
    return walk()
  }
)
  
/**
 * rewrites `switch` statements to a normal form where all branches execution 
 * control doesn't overlap
 *
 * must receive reverse order iterator
 */
function switchRewriteImpl(s) {
  const si = Kit.lookahead(s)
  function* cases() {
    let buf = []
    let hasDefault = false
    for(const i of Kit.rsub(si)) {
      yield i
      if (i.pos === Tag.cases && i.leave) {
        for(const j of Kit.rsub(si)) {
          if (j.pos === Tag.consequent) {
            if (j.leave) {
              const res = Array.from(walk())
              if (res.length && res[0].value.exit)
                buf = res 
              else {
                buf.push(...res)
              }
              yield Kit.leave()
              yield Kit.leave()
              yield Kit.leave()
              yield* Kit.clone(buf)
              yield Kit.enter(Tag.body,Tag.Array)
              yield Kit.enter(Tag.push,Tag.BlockStatement,{eff:j.value.eff})
              yield Kit.enter(Tag.consequent,Tag.Array)
            }
          } else {
            yield j
          }
        }
      }
    }
  }
  function* walk(t) {
    for(const i of Kit.rsub(si)) {
      switch(i.type) {
      case Tag.SwitchStatement:
        yield i
        if (i.leave) {
          yield* cases()
        }
        break
      default:
        yield i
      }
    }
  }
  return walk(0)
}


export const switchRewriteOld = Kit.pipe(
  Kit.reverse,
  switchRewriteImpl,
  Kit.reverse,
  Kit.completeAny,
  Prop.recalcEff)
