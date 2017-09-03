import {Tag,symInfo,enter,leave,tok} from "./kit"
import * as Kit from "./kit"
import * as assert from "assert"
import * as Debug from "./debug"
import * as Block from "./block"
import {scope as EsScope} from "estransducers"

export const assignSymbolsDecls = EsScope.assignSymbolsDecls


/**
 * unfortunately ObjectMethod type in babylon AST doesn't fit the split 
 * pattern, as next passes want the key to remain in parent scope
 * so this pass replaces them to `{Object|Class}Property` and `FunctionExpression`
 * if on restore the value is still a FunctionExpression it can be converted
 * back to {Object|Class}Property with `restoreMethods`
 */
function methodsHack(si) {
  const s = Kit.auto(si)
  function* walk(sw,cl) {
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Tag.ClassDeclaration:
        case Tag.ClassExpression:
          yield i
          yield* walk(s.sub(),i.value)
          continue
        case Tag.ClassMethod:
          i.value.ref = cl
        case Tag.ObjectMethod:
          if (i.value.node.kind === "method") {
            yield s.enter(i.pos,
                          i.type === Tag.ObjectMethod
                          ? Tag.ObjectProperty
                          : Tag.ClassProperty,
                          {origType:i.type,
                           node:{computed:i.value.computed,
                                 static:i.value.static}
                          })
            const k = s.cur()
            yield* walk(s.one())
            yield s.enter(Tag.value,Tag.FunctionExpression,i.value)
            if (k.type === Tag.Identifier) {
              i.value.funcId = Kit.scope.newSym(k.value.node.name)
              i.value.origType = i.type
              yield s.tok(Tag.id,Tag.Identifier,{node:{name:k.value.node.name}})
            }
            yield* walk(s.sub())
            yield* s.leave()
            yield* s.leave()
            s.close(i)
            continue
          }
        }
      }
      yield i
    }
  }
  return walk(s)
}

/** 
 * restorinng `ObjectMethod` from `ObjectProperty` saved before
 * using `methodsHack` 
 */
function restoreMethods(si) {
  const s = Kit.auto(si)
  function* walk(sw) {
    for(const i of sw) {
      if (i.enter
          && (i.type === Tag.ObjectProperty || i.type === Tag.ClassProperty)
          && i.value.origType != null) {
        const key = Kit.toArray(walk(s.one()))
        if (s.cur().type === Tag.FunctionExpression) {
          const f = s.take()
          if (s.cur().pos === Tag.id)
            Kit.skip(s.one())
          yield s.enter(i.pos,i.value.origType,f.value)
          yield* key
          yield* walk(s.sub())
          yield* s.leave()
          s.close(f)
          s.close(i)
          continue
        }
        yield i
        yield* key
        continue
      } else
        yield i
    }
  }
  return walk(s)
}

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
  const s = Kit.auto(methodsHack(si))
  const frames = []
  frames.push([...walk(s.take())])
  return frames
  function* walk(p) {
    yield s.enter(Tag.top,p.type,p.value)
    for(const i of s.sub()) {
      if (i.enter && !i.leave && s.curLev() != null && i.value.func) {
        frames.push([...walk(i)])
        i.value.parScope = p.value
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
export function restore(root,scopes) {
  let start
  const m = new Map()
  for(const i of scopes) {
    const value = i[0].value
    if (value === root)
      start = i
    else
      m.set(value,i)
  }
  assert.ok(start)
  return restoreMethods(walk(start,Tag.top))
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
}

/** runs `pass` for each function in `s` */
export const subScopes = Kit.curry(function(pass, s) {
  const res = []
  for(const i of splitScopes(s))
    res.push([...pass(i)])
  return restore(res)
})

