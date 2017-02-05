import * as R from "ramda"
import * as Kit from "./kit"
import * as assert from "assert"
import {Tag} from "estransducers"
import {recalcEff} from "./propagate"
import * as Block from "./block"
import * as Debug from "./debug"

export const inject = R.pipe(
  function* inject(s) {
    const sl = Kit.auto(s)
    function* walk(sw) {
      for(const i of sw) {
        if (i.value.eff) {
          switch(i.type) {
          case Tag.TryStatement:
            if (i.enter) {
              const body = sl.cur()
              assert.equal(body.pos,Tag.block)
              const buf = [...walk(sl.one())]
              let handle = null
              let handlePat = null
              let fin = null
              let j = sl.curLev()
              if (j != null && j.pos === Tag.handler) {
                const k = sl.peel()
                assert.equal(k.type,Tag.CatchClause)
                handlePat = k.value.node.param
                if (sl.curLev().pos === Tag.param)
                  Kit.skip(sl.one())
                handle = [...sl.one()]
                assert.equal(handle[0].pos,Tag.body)
                Kit.skip(sl.leave())
                j = sl.curLev()
              }
              if (j != null && j.pos === Tag.finalizer) {
                fin = [...sl.one()]
              }
              yield sl.enter(i.pos,Block.letStmt,{pat:[],bind:true,eff:true})
              if (fin != null)
                yield sl.enter(Tag.expression,Block.app,
                               {node:{name:"mfinally",pat:[]}})
              if (handle != null)
                yield sl.enter(Tag.expression,Block.app,
                               {node:{name:"mhandle",pat:[handlePat]}})
              yield* buf
              if (handle != null) {
                yield* handle
                yield* sl.leave()
              }
              if (fin != null) {
                yield* fin
                yield* sl.leave()
              }
              yield* sl.leave()
            }
            continue
          case Tag.ThrowStatement:
            if (i.enter) {
              const lab = sl.label()
              yield sl.enter(i.pos,Block.letStmt,{pat:[],bind:true,eff:true})
              yield sl.enter(Tag.expression,Tag.CallExpression)
              yield* Kit.packId(sl,Tag.callee,"raise")
              yield sl.enter(Tag.arguments,Tag.Array)
              yield sl.enter(Tag.push,Kit.Subst)
              yield* walk(sl.sub())
              yield* lab()
            }
            continue
          }
        }
        yield i
      }
    }
    yield* walk(sl)
  },
  Kit.completeSubst
)
