import * as R from "ramda"
import {Tag,symInfo,enter,leave,tok} from "./kit"
import * as Kit from "./kit"
import * as assert from "assert"
import * as Debug from "./debug"
import * as Block from "./block"
import {scope as EsScope} from "estransducers"

export const assignSymbolsDecls = EsScope.assignSymbolsDecls

/** 
 * adds variables generated after assignSymbolDecls into ctx 
 */
export function recalcLocals(sl) {
  const sa = Kit.toArray(sl)
  const s = Kit.auto(sa)
  const root = s.take().value
  const ctx = root.ctx
  const {locs,vars,refs} = ctx
  Kit.skip(s.untilPos(Tag.body))
  walk(vars)
  return sa
  function walk(vars,block) {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.BlockStatement:
          walk(i.value.blockVars = Object.create(vars),i.value)
          break
        case Tag.Identifier:
          const info = vars[i.value.node.name]
          if (info != null) {
            i.value.sym = info.sym
            refs.set(info.sym,info)
            if (info.root !== root) {
              (info.capt || (info.capt = new Set())).add(root)
            }
          }
          break
        case Tag.VariableDeclarator:
          for(const j of s.one()) {
            if (j.enter && j.type === Tag.Identifier && j.value.sym == null) {
              const {name} = j.value.node
              const sym = j.value.sym = Symbol(name)
              const info = {sym,name,param:false,root,block,value:i.value}
              locs.set(sym,info)
              vars[name] = info
            }
          }
          break
        }
      }
    }
  }
}

/** 
 * takes a stream of tokens and split it into an array of streams
 * with each element representing a function from the original stream
 */
export function splitScopes(si) {
  const s = Kit.auto(si)
  const frames = []
  frames.push([...walk(s.take())])
  return frames
  
  function* walk(p) {
    yield s.enter(Tag.top,p.type,p.value)
    for(const i of s.sub()) {
      if (i.enter && !i.leave && s.curLev() != null && i.value.func) {
        frames.push([...walk(i)])
        yield s.tok(i.pos,i.type,i.value)
        continue
      }
      yield i
    }
    yield* s.leave()
    s.close(p)
  }
}

/** 
 * converts list of token streams into a single stream with all scopes 
 * unfolded in original positions
 */
export function restore(scopes) {
  const a = Kit.toArray(scopes)
  const s = a.pop()
  const m = new Map(a.map(i => {
    const j = Kit.toArray(i)
    return [j[0].value,j]
  }))
  function* walk(si,pos,type) {
    const s = Kit.toArray(si)
    let first = Kit.setPos(s[0],pos)
    if (type != null)
      first = Kit.setType(first,type)
    yield first
    assert.equal(s[0].pos, Tag.top)
    assert.equal(s[s.length-1].pos, Tag.top)
    assert.equal(s[s.length-1].value, s[0].value)
    for(const i of s.slice(1,s.length-1)) {
      if (i.value.func) {
        const sub = m.get(i.value)
        if (sub != null) {
          if (i.enter) {
            yield* walk(sub,i.pos,i.type)
          }
          continue
        }
      }
      yield i
    }
    yield Kit.setPos(s[s.length-1],pos)
  }
  return walk(s,Tag.top)
}

/** runs `pass` for each function in `s` */
export const subScopes = R.curry(function(pass, s) {
  const res = []
  for(const i of splitScopes(s))
    res.push([...pass(i)])
  return restore(res)
})


