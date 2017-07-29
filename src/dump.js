import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,produce,consume,symName} from "./kit"
import * as Trace from "./kit/trace"
import * as fs from "fs"
import generate from "babel-generator"
import * as assert from "assert"
import * as T from "babel-types"

const isNode = typeof window === "undefined"

function isEsNode(i) {
  return Tag[i.type] != null && i.type !== Tag.Array
}

export function* markNodeType(s) {
  for(const i of s) {
    if (i.enter && i.value.comments != null && i.value.comments.length) {
      i.value.comments.unshift(
        {txt:(symName(i.type).match(/[A-Z]/g) || [symName(i.type)]).join(""),
         style:"font-size:xx-small;color:green;font-weight:bolder"})
    }
    yield i
  }
}

export const color = isNode
  ? s => s
  : function* color(s) {
      for(const i of s) {
        if (i.enter && i.value.comments) {
          for (const j of i.value.comments) {
            if (j.style != null && isEsNode(i)) {
              j.txt = `%c${j.txt}%c`
              j.args = [j.style,""]
            }
          }
        }
        yield i
      }
    }

function* cleanNonEs(s) {
  const comments = []
  for(const i of s) {
    if (Tag[i.type]) {
      if (i.type !== Tag.Array && i.enter && comments.length) {
        if (i.value.comments == null)
          i.value.comments = []
        i.value.comments.push(...comments)
        comments.length = 0
      }
      yield i
    } else {
      if (i.enter && i.value.comments != null)
        comments.push(...i.value.comments)
    }
  }
}

function* getArgs(s) {
  for(const i of s) {
    if (i.enter && i.value.comments) {
      for(const j of i.value.comments) {
        if (j.args)
          for(const k of j.args)
            yield k
      }
    }
  }
}

function* setComments(s) {
  for(const i of s) {
    const node = i.value.node
    if (i.enter && node != null
        && i.value.comments != null
        && i.value.comments.length)
    {       
      const cn = {type:"CommentBlock",value:""}
      if (node.leadingComments)
        node.leadingComments.push(cn)
      else
        node.leadingComments = [cn]
      for(const {txt} of i.value.comments) {
        if (cn.value.length)
          cn.value += "|"
        cn.value += txt
      }
    }
    yield i
  }
}

export const dumpFin = R.pipe(cleanNonEs,setComments,Array.from)

export const toConsole = R.curry(function toConsole(tag,s) {
  if (isNode)
    console.log(`dump ${tag}`)
  else
    console.group(`dump %c${tag}`,"color:orange;font-size:large")
  const col = R.pipe(cleanNonEs,color,Array.from)(s)
  const fin = R.pipe(setComments,Kit.finalize,Array.from)(col)
  const args = Array.from(getArgs(col))
  consume(fin)
  console.log(generate(fin[0].value.node).code,...args)
  if (!isNode)
    console.groupEnd()
})

export function toStr(s) {
  const fin = dumpFin(s)
  consume(Kit.finalize(fin))
  return generate(fin[0].value.node).code
}

export function copyComment(f,t) {
  assert.ok(t.enter)
  if (f.value.comments != null) {
    if (t.value.comments == null)
      t.value.comments = []
    t.value.comments.push(...f.value.comments)
  }
  return t
}

export function* cleanComments(s) {
  for(const i of s) {
    yield i
    if (i.leave)
      i.value.comments = null
  }
}
