/**
 * handles placeholders like $.M
 *
 * TODO: now doens't work if interleaved with variable declarations
 */
import * as Kit from "./kit"
import {Tag,symbol,symName,enter,leave,tok,symKind} from "./kit"
import * as assert from "assert"
import {stmtExpr} from "./kit/stmtExpr"
import * as Prop from "./propagate"

export const mark = symbol("placeholder.mark")

export const reifyId = Kit.sysId("reify")

export function inject(s) {
  s = Kit.auto(s)
  function check(i) {
    const qn = i.value.qname
    return qn != null && qn.length === 2
      && qn[0] === s.opts.ns && qn[1] === "$"
  }
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.MemberExpression:
          if (check(i)) {
            Kit.skip(s.copy(i))
            yield s.tok(i.pos,mark)
            continue
          }
          break
        case Tag.CallExpression:
          if (check(i)) {
            Kit.skip(s.peelTo(Tag.arguments))
            yield s.enter(i.pos,mark)
            yield* walk()
            yield* s.leave()
            Kit.skip(s.leave())
            continue
          }
          break
        }
      }
      yield i
    }
  }
  return walk()
}

export const split = Kit.pipe(
  function placeholderSplitMark(si) {
    const sa = Kit.toArray(si)
    const s = Kit.auto(sa)
    function stmt(i) {
      let ph = false
      for(const j of s.sub()) {
        if (j.enter) {
          switch(j.type) {
          case mark:
            ph = true
            break
          case Tag.BlockStatement:
            block(j)
          }
        }
      }
      return i.value.ph = ph
    }
    function block(i) {
      Kit.skip(s.findPos(Tag.body))
      let ph = false
      for(const i of s.sub()) {
        if (i.enter) {
          if (i.type === Tag.BlockStatement) {
            block(i)
          } else {
            ph = stmt(i) || ph
          }
        }
      }
      i.value.ph = ph
    }
    function walk(sw) {
      for(const i of s.sub()) {
        if (i.enter && i.type === Tag.BlockStatement)
          block(i)
      }
    }
    walk()
    return sa
  },
  function placeholderBlockSplit(s) {
    s = Kit.auto(s)
    const uniq = Uniq.store(s)
    function* block() {
      let stmts = []
      for(const j of s.sub()) {
        if (j.enter) {
          if (j.type === Tag.VariableDeclaration) {
            yield* s.copy(j)
          } else if (j.value.ph) {
            const n = uniq()
            stmts = [...function*() {
              const lab = s.label()
              yield s.enter(Tag.push,Tag.VariableDeclaration,{node:{kind:"var"}})
              yield s.enter(Tag.declarations,Tag.Array)
              yield s.enter(Tag.push,Tag.VariableDeclarator)
              yield s.tok(Tag.id,Tag.Identifier,{node:n})
              yield s.enter(Tag.init,Tag.CallExpression)
              yield Kit.idTok(Tag.callee,reifyId)
              yield s.enter(Tag.arguments,Tag.Array)
              yield s.enter(Tag.push,Tag.ArrowFunctionExpression,{node:{params:[]}})
              yield s.enter(Tag.body,Tag.BlockStatement)
              yield s.enter(Tag.body,Tag.Array)
              yield* stmts
              yield* lab()
              yield s.peel(j)
              yield* stmt(n)
              yield* lab()
            }()]
          } else {
            stmts.push(s.peel(j),...walk(),...s.leave(j))
          }
        }
      }
      yield* stmts
    }
    function* stmt(n) {
      for(const i of s.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Tag.BlockStatement:
            if (i.value.ph) {
              yield* s.peelTo(Tag.body)
              yield* block()
              yield* s.leave()
              continue
            }
            break
          case mark:
            if (i.leave || s.curLev() == null) {
              Kit.skip(s.copy(i))
              yield s.tok(i.pos,Tag.Identifier,{node:n})
            } else {
              yield s.enter(i.pos,Tag.SequenceExpression)
              yield s.enter(Tag.expressions,Tag.Array)
              yield s.enter(Tag.push,Tag.CallExpression)
              yield Kit.packId(s,Tag.callee)
              yield s.enter(Tag.arguments,Tag.Array)
              yield s.tok(Tag.push,Tag.Identifier,{node:n})
              yield* s.leave()
              yield* s.leave()
              yield* walk()
              yield* s.leave()
            }
            continue
          }
        }
        yield i
      }
    }
    function* walk() {
      for(const i of s.sub()) {
        yield i
        if (i.enter && i.type === Tag.BlockStatement && i.value.ph) {
          yield* s.peelTo(Tag.body)
          yield* block()
          yield* s.leave()
        }
      }
    }
    return walk()
  }
)

export const all = Kit.pipe(inject,split)


