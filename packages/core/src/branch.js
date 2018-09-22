import * as Kit from "./kit"
import * as assert from "assert"
import {Tag,symbol,symInfo} from "./kit"
import * as Block from "./block"
import * as Bind from "./bind"
import * as Prop from "./propagate"

export const fork = symbol("branch.fork")
export const thread = symbol("branch.thread")

/** 
 * marks branched control flow with `Block.fork` and `Block.thread` 
 * used to unify passes behavior of switch/if statements
 */
export function mark(s) {
  s = Kit.auto(s)
  return _mark(s)
  function* _mark(sw) {
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Tag.IfStatement:
        case Tag.ConditionalExpression:
          yield s.enter(i.pos,fork,i.value)
          yield i
          yield* _mark(s.one())
          yield s.enter(Tag.consequent,thread,s.cur().value)
          yield* _mark(s.one())
          yield* s.leave()
          /// if there is no alternate in `if` we still create a branch
          const n = s.curLev()
          yield s.enter(Tag.alternate,thread,n && n.value)
          yield* _mark(s.one())
          yield* s.leave()
          yield s.close(i)
          yield* s.leave()
          continue
        case Tag.SwitchStatement:
          yield s.enter(i.pos,fork,i.value)
          yield i
          yield* _mark(s.one())
          let hasAlt = false
          for(const j of s.sub()) {
            if (j.enter && j.pos === Tag.consequent) {
              hasAlt = s.cur().pos !== Tag.test
              yield s.enter(Tag.consequent,thread,j.value)
              yield j
              yield* _mark(s.sub())
              yield s.close(j)
              yield* s.leave()
            } else
              yield j
          }
          if (!hasAlt) {
            yield s.enter(Tag.consequent,thread)
            yield* s.leave()
          }
          yield s.close(i)
          yield* s.leave()
          continue
        case Tag.LogicalExpression:
          /// logical expression may skip evaluating its second component
          yield s.enter(i.pos,fork,i.value)
          yield i
          yield* _mark(s.one())
          yield s.enter(Tag.right,thread,s.cur())
          yield* _mark(s.one())
          yield* s.leave()
          yield s.enter(Tag.alternate,thread,s.cur())
          yield* s.leave()
          yield s.close(i)
          yield* s.leave()
          continue
        }
      }
      yield i
    }
  }
}

/** 
 * if switch statement contains effects in tests it will resort to
 * a chain of if-statements
 */
export function normilizeSwitch(si) {
  const sa = Kit.toArray(si)
  let any = false
  mark()
  return any ? convert() : sa
  function mark() {
    const s = Kit.auto(sa)
    return walk()
    function stmt(i) {
      i.value.useIfs = false
      for(const j of s.sub()) {
        if (j.enter) {
          if (j.type === Tag.SwitchCase) {
            const k = s.curLev()
            if (k && k.pos === Tag.test && k.value.eff) {
              i.value.useIfs = true
              any = true
              break
            }
          } else if (j.type === Tag.SwitchStatement && i.value.eff) {
            stmt(j)
          }
        }
      }
    }
    function walk() {
      for(const i of s.sub()) {
        if (i.enter && i.type === Tag.SwitchStatement && i.value.eff) {
          stmt(i)
        }
      }
    }
  }
  function convert() {
    const s = Kit.auto(sa)
    return walk()
    function* walk() {
      for(const i of s.sub()) {
        if (i.enter && i.type === Tag.SwitchStatement && i.value.useIfs) {
          const lab = s.label()
          if (i.pos !== Tag.push) {
            yield s.enter(i.pos,Tag.BlockStatement)
            yield s.enter(Tag.body,Tag.Array)
          }
          const ilab = s.label()
          const sym = Bind.tempVarSym(s.first.value,"pat")
          yield s.enter(Tag.push,Tag.ExpressionStatement)
          yield s.enter(Tag.expression,Tag.AssignmentExpression,
                        {node:{operator:"="}})
          yield s.tok(Tag.left,Tag.Identifier,
                      {sym,lhs:true,rhs:false,decl:false})
          yield* Kit.reposOne(s.one(),Tag.right)
          yield* ilab()
          for(const j of s.sub()) {
            if (j.type === Tag.SwitchCase) {
              if (s.cur().pos === Tag.test) {
                yield s.enter(Tag.push, Tag.IfStatement)
                yield s.enter(Tag.test,Tag.BinaryExpression,
                              {node:{operator:"==="}})
                yield s.tok(Tag.left,Tag.Identifier,
                            {sym,lhs:false,rhs:true,decl:false})
                yield* Kit.reposOne(s.one(),Tag.right)
                yield* s.leave()
                yield s.enter(Tag.consequent,Tag.BlockStatement)
                yield* Kit.repos(walk(),Tag.body)
              } else {
                const conseq = s.take()
                assert.equal(conseq.pos,Tag.consequent)
                yield* walk()
                s.close(conseq)
              }
              yield* ilab()
              s.close(j)
            }
          }
          yield* lab()
          s.close(i)
          continue
        }
        yield i
      }
    }
  }
}

/** adds block statement to block-less branches */
export function toBlocks(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.SwitchStatement:
          if (i.value.eff) {
            const lab = s.label()
            yield s.enter(i.pos,Tag.BlockStatement,i.value)
            yield s.enter(Tag.body,Tag.Array)
            yield s.enter(Tag.push,Tag.SwitchStatement,{origSwitch:i.value})
            yield* walk()
            yield* lab()
            s.close(i)
            continue
          }
          break
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

/** removes empty branches */
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
 * for each effectful branching statements adds alternate statement 
 * if it doesn't exists
 */
export function addAlternate(si) {
  const s = Kit.auto(si)
  function* walk(sw) {
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Tag.IfStatement:
          if (i.value.eff) {
            yield i
            yield* walk(s.one())
            yield* walk(s.one())
            if (!s.curLev()) {
              yield s.enter(Tag.alternate,Tag.BlockStatement)
              yield s.enter(Tag.body,Tag.Array)
              yield* s.leave()
              yield* s.leave()
            }
            continue
          }
          break
        case Tag.SwitchStatement:
          if (i.value.eff) {
            yield i
            yield* s.one()
            yield s.peel()
            let found = false
            for(const j of s.sub()) {
              yield j
              if (s.cur().pos === Tag.consequent)
                found = true
              yield* walk(s.sub())
              yield s.close(j)
            }
            if (!found) {
              yield s.enter(Tag.push,Tag.SwitchCase)
              yield s.enter(Tag.consequent,Tag.Array)
              yield* s.leave()
              yield* s.leave()
            }
            yield* s.leave()
            yield s.close(i)
            continue
          }
          break
        }
      }
      yield i
    }
  }
  return walk(s)
}
