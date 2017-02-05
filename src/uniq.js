import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,produce,consume,symbol} from "estransducers"
import * as T from "babel-types"

let uniqNum = 0

const uniqVar = symbol("uniqVar")

export function calcLike(like) {
  if (!like)
    return null
  if (like.substr != null) 
    return like
  if (like.type !== null) {
    switch(like.type) {
    case "UpdateExpression":
      return calcLike(like.argument)
    case "CallExpression":
      return calcLike(like.callee)
    case "AssignmentExpression":
      return calcLike(like.left)
    }
  }
}

export function* id(like) {
  const name = `uniq_name_${like || "U"}_${uniqNum++}`, v = T.identifier(name)
  yield Kit.tok(uniqVar,{node:{like,name}})
  return v
}

export function* wildcard() {
  const ret = id("_")
  ret.wildcard = true
}

function queryIds(s) {
  const dir = {}
  for(const i of s) {
    if (i.type === Tag.Identifier)
      dir[i.value.node.name] = i.value
  }
  const res = []
  for(const i in dir)
    res.push(i)
  return res.sort()
}

const nameOpts = ["a","b","c","d","e","f","g","h","k","m","n","x","y","z"]

/**
 * takes `Kit.auto` stream, not started, and returns a function for
 * emiting unique identifier, like `id` but no needs for `collect`
 */
export function store(b) {
  const top = b.cur()
  const store = top.value.uniqVars || (top.value.uniqVars = {})
  return function uniqId(like) {
    const name = `uniq_name_${like || "U"}_${uniqNum++}`,
          v = T.identifier(name)
    store[name] = {like,name}
    return v
  }
}

export function* collect(s) {
  const sl = Kit.lookahead(s)
  const top = sl.cur()
  const res = top.value.uniqVars || (top.value.uniqVars = {})
  for(const i of sl) {
    if (i.type === uniqVar) {
      if (i.enter)
        res[i.value.node.name] = i.value.node
    } else
      yield i
  }
  return res
}

export const subst = R.pipe(
  function subst(s) {
    const a = Kit.toArray(s)
    const ids = {}
    for (const i of queryIds(a))
      ids[i] = 1
    let curopt = 0
    const rename = a[0].value.uniqVars || {}
    for(const i of a) {
      switch(i.type) {
      case uniqVar:
        rename[i.value.node.name] = i.value.node
        continue
      case Tag.Identifier:
        const rn = rename[i.value.node.name]
        if (rn != null) {
          if (rn.v == null) {
            let {like,name} = rn
            if (!ids[name])
              continue
            if (like == null) {
              for(const j of nameOpts) {
                if (!ids[j]) {
                  like = j
                  break
                }
              }
              if (like == null)
                like = nameOpts[curopt++ % nameOpts.length]
            }
            let cur = ids[like] || 0
            let nm = null
            for(;;) {
              nm = cur === 0 ? like : `${like}${cur}`
              ++cur
              if (ids[nm] == null)
                break
            }
            ids[like] = cur
            rn.v = nm
          }
          i.value.node.name = rn.v
        }
        break
      }
    }
    return a
  },
  function* clean(s) {
    for(const i of s) {
      if (i.type !== uniqVar) {
        yield i
      }
    }
  })

