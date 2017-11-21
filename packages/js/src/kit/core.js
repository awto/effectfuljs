import {Tag,produce as esproduce,symbol,toArray,isSymbol,
        symName,symInfo,consume as esconsume,scope} from "estransducers"
import {pipe,curry,Wrapper} from "estransducers/kit"
import * as T from "babel-types"
import * as assert from "assert"

let curId = 0

export function tagValue(pos, type, v) {
  if (v.tag != null)
    return v
  const info = symInfo(type)
  const res = {tag:true}
  res.id = curId++
  res.origType = type
  res.origPos = pos
  res.stmt = info.stmt
  res.expr = info.expr
  res.func = info.func
  res.coerce = info.coerce
  res.boundary =
    (res.stmt && !(type === Tag.VariableDeclaration && pos === Tag.init)
     || type === Tag.CatchClause)
  Object.assign(res,v)
  return res
}

function guessType(pos,type,value) {
  if (pos.pos && type == null && value == null) {
    type = pos.type
    value = pos.value
    pos = pos.pos
  }
  if (type == null) {
    type = pos
  } else if (!isSymbol(type) && value == null) {
    value = type
    type = null
  }
  if (type == null) {
    type = pos
    if (value.node && value.node.type) {
      type = Tag[value.node.type]
      if (type == null)
        type = pos
    }
  }
  if (value == null) {
    value = {}
  }
  if (value.node == null) {
    switch(type) {
    case Tag.Array:
      value.node = []
      break
    case Tag.Null:
      value.node = null
      break
    default:
      value.node = {}
    }
  }
  return [pos,type,value]
}

export function* removeNulls(s) {
  const stack = []
  for(const i of s) {
    if (i.type === Tag.Null) {
      if (i.enter && i.pos != Tag.push && stack[0])
        stack[0][symName(i.pos)] = null
      continue
    }
    yield i
    if (i.enter)
      stack.unshift(i.value.node)
    if (i.leave)
      stack.shift()
  }
}

Tag.AutoClose = symbol("AutoClose","ctrl")

export function* completeAutoClose(s) {
  const stack = []
  let level = 0
  for(const i of s) {
    if (i.pos === Tag.AutoClose) {
      if (i.enter)
        stack.push(level)
      if (i.leave) {
        for(let j = stack.shift(); j < level; j++)
          yield leave()
      }
    } else {
      if (i.enter) 
        level++
      if (i.leave)
        level--
      yield i
    }
  }
}

export function tok(pos,type,value) {
  [pos,type,value] = guessType(pos,type,value)
  value = tagValue(pos,type,value)
  return {enter:true,leave:true,type,pos,value}
}

export function enter() {
  let [pos,type,value] = guessType.apply(null, arguments)
  assert.ok(pos && type && value)
  value = tagValue(pos,type,value)
  return {enter:true,leave:false,type,pos,value}
}

export const Any = symbol("Any","ctrl")

export function leave() {
  if (!arguments.length)
    return {enter:false,leave:true,type:Any,pos:Any,value:{}}
  const [pos,type,value] = arguments.length ?
    guessType.apply(null, arguments) :
    [Any,Any,{}]
  return {enter:false,leave:true,type,pos,value}
}

/**
  * sets `parentType` field describing current parent node type 
  * in the stream for each token
  */ 
export function* resetParent(s) {
  const stack = []
  for(const i of s) {
    if (i.enter) {
      i.value.parentType = stack[0]
      stack.unshift(i.type)
    }
    yield i
    if (i.leave)
      stack.shift()
  }
}

/**
  * resets level field field of value, to current value,
  * it must be reapplied after each change
  */
export function* resetLevel(s) {
  let level = 0
  for(const i of s) {
    //TODO: keep level in stream
    if (i.enter)
      level++
    // i.level = level
    // yield i
    yield {enter:i.enter,leave:i.leave,type:i.type,
           pos:i.pos,value:i.value,level}
    if (i.leave)
      level--
  }
}

/**
  * modifies token replacing its `type` field
  */
export function setType(i,type) {
  return {enter:i.enter,leave:i.leave,type,pos:i.pos,value:i.value}
}

/**
  * modifies token replacing its `pos` field
  */
export function setPos(i,pos) {
  return {enter:i.enter,leave:i.leave,type:i.type,pos,value:i.value}
}

export function* repeat(num, tok) {
  for(let i = 0; i < num; i++)
    yield tok
}

export function* completeAny(s) {
  const stack = []
  for(const i of s) {
    if (i.enter)
      stack.unshift(i)
    if (i.leave) {
      const t = stack.shift()
      i.value = t.value
      if (i.pos === Any) {
        yield {enter:i.enter,leave:i.leave,type:t.type,
               pos:t.pos,value:i.value,comment:i.comment}
        continue
      }
    }
    yield i
  }
}

export const consume = esconsume

export function* completeSubst(s) {
  const sl = auto(s)
  function* subst(pos) {
    for(const i of sl.sub()) {
      if (i.type === Subst) {
        if (i.enter)
          yield* subst(pos)
      } else {
        yield sl.peel(setPos(i,pos))
        yield* walk()
        yield* sl.leave()
      }
    }
  }
  function* walk() {
    for(const i of sl.sub()) {
      if (i.type === Subst) {
        if (i.enter) {
          assert.ok(!i.leave)
          yield* subst(i.pos)
        }
      } else
        yield i
    }
  }
  yield* walk()
}

export const complete = pipe(completeAny,resetLevel)

export const Subst = symbol("Subst","ctrl")

export function* wrap(i,tok,value) {
  if (i.enter)
    yield enter(i.pos,tok,value)
  yield i
  if (i.leave)
    yield leave(i.pos,tok,value)
}

export function* bracket(i, pos, tok, value) {
  yield enter(pos, tok, value)
  yield *i
  yield leave(pos, tok, value)
}

export const map = curry(function* map(f, s) {
  for(const i of s) 
    yield f(i)
})

export const filter = curry(function* filter(pred, s) {
  for(const i of s) 
    if (pred(i))
      yield i
})

export function* concatArraysPass(s) {
  let buf = null
  for(const i of s) {
    if (buf != null) {
      if (!i.enter || i.pos !== buf.pos) {
        yield buf
        yield i
      }
      buf = null
    } else if (i.leave && i.type === Tag.Array) {
      buf = i
    } else {
      yield i
    }
  }
  if (buf != null)
    yield buf
}

const sysSyms = new Map()

/** returns Symbol marked with lib=true field */
export function sysId(name) {
  let res = sysSyms.get(name)
  if (res != null)
    return res
  sysSyms.set(name, res = scope.newSym(name,true))
  res.lib = true
  res.nsDefault = false
  return res
}

/** returns `tok` with type = Tag.Identifier at `pos` with `sym` */
export function idTok(pos,sym) {
  return tok(pos,Tag.Identifier,{sym})
}

export function lookahead(s) {
  if (s.lookahead != null)
    return s
  const i = s[Symbol.iterator]()
  return {
    lookahead: i.next(),
    take(v) {
      const n = this.next(v)
      return n.done ? null : n.value
    },
    cur() {
      const la = this.lookahead
      return la.done ? null : la.value
    },
    next(v) {
      const cur = this.lookahead
      if (cur.done)
        return cur
      this.lookahead = i.next(v)
      return cur
    },
    [Symbol.iterator] () {
      return {
        next: (v) => this.next(v)
      }
    },
    closedLevel() {
      return this.lookahead.done || !this.lookahead.value.enter
    }
  }
}

/**
 * iterator for current level sequence, takes `lookahead` iterable
 */
export function* sub(s) {
  const {lookahead} = s
  if (lookahead.done)
    return
  const {value} = lookahead
  if (!value.enter)
    return
  const exit = value.level
  for(const i of s) {
    yield i
    if (s.lookahead.done || s.lookahead.value.level < exit)
      return
  }
}

export function* one(s) {
  const c = s.cur()
  if (c == null)
    return
  if (!c.enter)
    return
  const exit = c.level
  for(const i of s) {
    //TODO: use the one from s
    const level = i.level
    yield i
    if (i.leave && exit === level)
      return
  }
}

// TODO: merge with sub
export function* until(pred,s) {
  const i = s.cur()
  if (i == null)
    return
  if (!i.enter)
    return
  const level = i.level
  const exit = level - 1
  for(const i of s) {
    yield i
    const c = s.cur()
    if (!c)
      return
    const cur = c.value.level
    if (cur === exit || cur === level && pred(c))
      return
  }
}

export function* nextLevel(s) {
  const i = s.take()
  assert.ok(i.enter)
  yield i
  if (!i.leave) {
    yield* tillLevel(i.level,s)
  }
}

/**
 * sub as `sub` but for reversed iterator
 */
export function* rsub(s) {
  const {lookahead} = s
  if (lookahead.done)
    return
  const {value} = lookahead
  if (value.enter)
    return
  const exit = value.level-1
  for(const i of s) {
    yield i
    if (s.lookahead.done || s.lookahead.value.level === exit)
      return
  }
}

export function swapTok(i) {
  return {enter:i.leave,leave:i.enter,type:i.type,pos:i.pos,value:i.value}
}

export function* swap(s) {
  for(const i of s)
    yield {enter:i.leave,leave:i.enter,type:i.type,pos:i.pos,value:i.value}
}

/**
 * takes reverse iterator and creates normal order array with the elements
 */
export function rfrom(s) {
  return Array.from(s).reverse()
}


/**
 * values until leaving specified level
 */
export function* tillLevel(level,s) {
  for(const i of s) {
    yield i
    if (i.leave && i.level === level)
      return
  }
}

export function* tillExit(s) {
  let level = null
  for(const i of s) {
    if (i.leave) {
      if (level == null || level > i.level)
        return
    }
    yield i
    if (i.enter) {
      if (level == null)
        level = i.level
    }
  }
}

export function skip(s) {
  const i = s[Symbol.iterator]()
  for(;;) {
    const v = i.next()
    if (v.done)
      return v.value
  }
}

export const prepare =
  pipe(
    resetLevel,
    function* prepare(s) {
      const stack = []
      const si = lookahead(s)
      for(const i of si) {
        let key = false
        switch(i.pos) {
        case Tag.label:
          if (i.enter)
            skip(sub(si))
          continue
        case Tag.id:
          key = true
          break
        case Tag.property:
        case Tag.key:
          if (i.enter && i.type === Tag.Identifier) {
            const f = stack[0]
            if (f && f.computed)
              key = true
          }
          break
        }
        if (i.enter) {
          const tv = tagValue(i.pos,i.type,{node:i.value.node})
          if (key)
            tv.expr = false
          stack.unshift(tv)
        }
        yield {enter:i.enter,leave:i.leave,
               type:i.type,pos:i.pos,
               value:stack[0]}
        if (i.leave)
          stack.shift()
      }
    },
    resetLevel
  )


export function produce(ast, pos) {
  return prepare(esproduce(ast,pos))
}

export function finalize(s) {
  return s
}

export function* findValue(pred,s) {
  for(const i of s) {
    yield i
    if (i.enter && pred(i.value))
      return i
  }
  return null
}


export function* copyOne(s) {
  for(const i of s) {
    yield i
    break
  }
}

export function* copyOneWithPos(s,pos) {
  for(const i of s) {
    yield setPos(i,pos)
    break
  }
}

export const peel = curry(function* peel(step, s) {
  const i = s.take()
  yield enter(i)
  yield* step(s)
  if (i.leave)
    yield leave(i)
  else
    yield s.take()
})

/**
 * removes nodes with specified type without content 
 */
export const rmEmpty = curry(function* rmEmpty(ty,s) {
  const sl = lookahead(s)
  for(const i of sl) {
    if (i.type === ty && i.enter) {
      if (i.leave)
        continue
      const c = sl.cur()
      if (c != null) {
        if (c.type === ty) {
          sl.next()
          continue
        }
      }
    }
    yield i
  }
})

/**
 * removes all additional information from nodes
 */
export function* strip(s) {
  for(const i of s) {
    if (i.enter) {
      switch(i.type) {
      case Tag.Array:
      i.value.node = []
        break
      case Tag.Null:
        i.value.node = null
        break
      default:
        if (Tag[i.type] != null && i.pos !== Tag.top) {
          const r = {}
          for(const j of T.BUILDER_KEYS[symName(i.type)])
            r[j] = i.value.node[j]
          if (i.value.node.leadingComments) {
            r.leadingComments = []
            for(const j of i.value.node.leadingComments)
              r.leadingComments.push({type:j.type,value:j.value})
          }
          i.value.node = r
        }
      }
    }
    yield i
  }
}

function ctor(pos,type,value) {
  [pos,type,value] = guessType(pos,type,value)
  value = tagValue(pos,type,value)
  if (this != null && value.opts == null)
    value.opts = this.opts
  return [pos,type,value]
}

function CtorWrap(i) {
  Wrapper.call(this,i)
}

CtorWrap.prototype = new Wrapper()
CtorWrap.prototype.valCtor = ctor
export function auto(i) { 
  return new CtorWrap(i)
}
