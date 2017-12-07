import * as Kit from "./kit"
import * as assert from "assert"
import {Tag} from "./kit"
import {recalcEff} from "./propagate"
import * as Block from "./block"
import * as Debug from "./debug"

export const handleId = Kit.sysId("handle")
export const finallyId = Kit.sysId("finally")
export const raiseId = Kit.sysId("raise")

export function* inject(s) {
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
              if (sl.curLev().pos === Tag.param) {
                handlePat = [...sl.one()]
                handlePat[0].pos = handlePat[handlePat.length-1].pos = Tag.push
              }
              handle = [...walk(sl.one())]
              assert.equal(handle[0].pos,Tag.body)
              Kit.skip(sl.leave())
              j = sl.curLev()
            }
            if (j != null && j.pos === Tag.finalizer) {
              fin = [...walk(sl.one())]
            }
            yield sl.enter(i.pos,Block.letStmt,{pat:[],bind:true,eff:true})
            if (fin != null)
              yield sl.enter(Tag.expression,Block.app,{sym:finallyId})
            if (handle != null)
              yield sl.enter(Tag.expression,Block.app,{sym:handleId})
            yield* Kit.reposOneArr(buf,Tag.push)
            if (handle != null) {
              yield sl.enter(Tag.params,Tag.Array)
              if (handlePat)
                yield* handlePat
              yield* sl.leave()
              yield* Kit.reposOneArr(handle,Tag.push)
              yield* sl.leave()
            }
            if (fin != null) {
              yield sl.enter(Tag.params,Tag.Array)
              yield* sl.leave()
              yield* Kit.reposOneArr(fin,Tag.push)
              yield* sl.leave()
            }
            yield* sl.leave()
          }
          continue
        case Tag.ThrowStatement:
          if (i.enter && sl.opts.jsExceptions !== false) {
            const lab = sl.label()
            yield sl.enter(i.pos,Block.letStmt,{pat:[],bind:true,eff:true})
            yield sl.enter(Tag.expression,Tag.CallExpression)
            yield Kit.idTok(Tag.callee,raiseId)
            yield sl.enter(Tag.arguments,Tag.Array)
            yield* Kit.reposOne(walk(sl.sub()),Tag.push)
            yield* lab()
            sl.close(i)
            continue
          }
          break
        }
      }
      yield i
    }
  }
  yield* walk(sl)
}
