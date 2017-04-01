import * as R from "ramda"
import {Tag,symbol} from "./kit"
import * as Kit from "./kit"
import * as T from "babel-types"
import * as Block from "./block"
import * as State from "./state"
import * as Prop from "./propagate"

import * as assert from "assert"
import * as Debug from "./debug"

/// ops
export const op = symbol("op")

const opNamesMap = new Map()
const opNamesReserved = new Set()

function getOpName(i) {
  switch(i.type) {
  case Tag.AssignmentExpression:
    switch(i.value.node.operator) {
    case "="   : return "assignOp"
    case "+="  : return "plusAssignOp"
    case "-="  : return "minusAssignOp"
    case "*="  : return "multAssignOp"
    case "/="  : return "divAssignOp"
    case "%="  : return "modAssignOp"
    case "<<=" : return "lshiftAssignOp"
    case ">>=" : return "rshiftAssignOp"
    case ">>>=": return "rushiftAssignOp"
    case "|="  : return "bwOrAssignOp"
    case "^="  : return "bwXorAssignOp"
    case "&="  : return "bwAndAssignOp"
    default:
      throw new Error(`Unknown assignment operator ${i.value.node.operator}`)
    }
  case Tag.BinaryExpression:
    switch(i.value.node.operator) {
    case "-"     : return "unaryMinusOp"
    case "+"     : return "unaryPlusOp"
    case "!"     : return "notOp"
    case "~"     : return "invertOp"
    case "typeof": return "typeofOp"
    case "void"  : return "voidOp"
    case "delete": return "deleteOp"
    default:
      throw new Error(`Unknown binary operator ${i.value.node.operator}`)
    }
  case Tag.UnaryExpression:
    switch(i.value.node.operator) {
    case "=="        : return "eqOp"
    case "!="        : return "neqOp"
    case "==="       : return "strictEqOp"
    case "!=="       : return "strictNeqOp"
    case "<"         : return "lsOp"
    case "<="        : return "leOp"
    case ">"         : return "mrOp"
    case ">="        : return "meOp"
    case "<<"        : return "lshiftOp"
    case ">>"        : return "rshiftOp"
    case ">>>"       : return "urshiftEqOp"
    case "+"         : return "plusOp"
    case "-"         : return "minusOp"
    case "*"         : return "multOp"
    case "/"         : return "divOp"
    case "%"         : return "ModOp"
    case "|"         : return "bwOrOp"
    case "^"         : return "bwXorOp"
    case "&"         : return "bwAndOp"
    case "in"        : return "inOp"
    case "instanceof": return "instanceOfOp"
    default:
      throw new Error(`Unknown binary operator ${i.value.node.operator}`)
    }
  case Tag.UpdateExpression:
    let name = null
    switch(i.value.node.operator) {
    case "++": name = "Incr"; break
    case "--":  name = "Decr"; break
    default:
      throw new Error(`Unknown update operator ${i.value.node.operator}`)
    }
    return i.value.node.prefix ? `pref${name}Op` : `${name.toLowerCase()}Op`
  case Tag.LogicalExpression:
    switch(i.value.node.operator) {
    case "||": return "orOp"
    case "&&": return "andOp"
    default:
      throw new Error(`Unknown logical operator ${i.value.node.operator}`)
    }
  }
  let res = opNamesMap.get(i.type)
  if (res != null)
    return res
  res = symName(i.type).match(/[A-Z]/g).join("")
  assert.ok(!opNamesReserved.has(res))
  opNamesMap.set(i.type,res)
  return res
}

export function injectOps(si) {
  const nset = new Map()
  const s = Kit.auto(si)
  function setEnv(ops) {
    for(const j in ops) {
      const v = ops[j]
      if (v === false)
        nset.delete(Tag[j])
      else
        nset.set(j,v === true ? false : v)
    }
  }
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        const ops = i.value.configDiff && i.value.configDiff.ops
        if (ops != null)
          setEnv(ops)
        const v = nset.get(i.type)
        if (v != null) {
          s.peel(i)
          yield s.enter(i.pos,op,{node: {src:i.value,type:i.type},
                                  bind: true,
                                  name: v || getOpName(i)})
          yield* walk()
          yield* s.leave()
          Kit.skip(s.leave())
          continue
        }
      }
      yield i
    }
  }
  if (s.opts.ops != null)
    setEnv(s.opts.ops)
  return walk()
}

export const interpretOps = R.pipe(function interpretOpts(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter && i.type === op) {
        const lab = s.label()
        yield s.enter(i.pos,Block.effExpr)
        yield s.enter(i.pos,Tag.CallExpression)
        yield* Kit.packId(s,Tag.callee,i.value.name)
        yield s.enter(Tag.arguments,Tag.Array)
        yield s.enter(Tag.push,Kit.Subst)
        yield* walk()
        yield* lab()
      }
    }
  }
})


