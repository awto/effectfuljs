import {Tag,symbol} from "./kit"
import * as Kit from "./kit"
import * as Block from "./block"
import * as State from "./state"
import * as Prop from "./propagate"

import * as assert from "assert"

const op = Block.op

const opNamesMap = new Map()
const opNamesReserved = new Set()

const assignmentOps = {
  "="   : Kit.sysId("assignOp"),
  "+="  : Kit.sysId("plusAssignOp"),
  "-="  : Kit.sysId("minusAssignOp"),
  "*="  : Kit.sysId("multAssignOp"),
  "/="  : Kit.sysId("divAssignOp"),
  "%="  : Kit.sysId("modAssignOp"),
  "<<=" : Kit.sysId("lshiftAssignOp"),
  ">>=" : Kit.sysId("rshiftAssignOp"),
  ">>>=": Kit.sysId("rushiftAssignOp"),
  "|="  : Kit.sysId("bwOrAssignOp"),
  "^="  : Kit.sysId("bwXorAssignOp"),
  "&="  : Kit.sysId("bwAndAssignOp")
}

const binaryOps = {
  "-"     : Kit.sysId("unaryMinusOp"),
  "+"     : Kit.sysId("unaryPlusOp"),
  "!"     : Kit.sysId("notOp"),
  "~"     : Kit.sysId("invertOp"),
  "typeof": Kit.sysId("typeofOp"),
  "void"  : Kit.sysId("voidOp"),
  "delete": Kit.sysId("deleteOp")
}

const unaryOps = {
  "=="        : Kit.sysId("eqOp"),
  "!="        : Kit.sysId("neqOp"),
  "==="       : Kit.sysId("strictEqOp"),
  "!=="       : Kit.sysId("strictNeqOp"),
  "<"         : Kit.sysId("lsOp"),
  "<="        : Kit.sysId("leOp"),
  ">"         : Kit.sysId("mrOp"),
  ">="        : Kit.sysId("meOp"),
  "<<"        : Kit.sysId("lshiftOp"),
  ">>"        : Kit.sysId("rshiftOp"),
  ">>>"       : Kit.sysId("urshiftEqOp"),
  "+"         : Kit.sysId("plusOp"),
  "-"         : Kit.sysId("minusOp"),
  "*"         : Kit.sysId("multOp"),
  "/"         : Kit.sysId("divOp"),
  "%"         : Kit.sysId("ModOp"),
  "|"         : Kit.sysId("bwOrOp"),
  "^"         : Kit.sysId("bwXorOp"),
  "&"         : Kit.sysId("bwAndOp"),
  "in"        : Kit.sysId("inOp"),
  "instanceof": Kit.sysId("instanceOfOp")
}

const updateOps = {
  "++": Kit.sysId("incrOp"),
  "--": Kit.sysId("decrOp")
}

const prefixUpdateOps = {
  "++": Kit.sysId("prefixIncrOp"),
  "--": Kit.sysId("prefixDecrOp")
}

const logicalOps = {
  "||": Kit.sysId("orOp"),
  "&&": Kit.sysId("andOp")
}

function getOpName(i) {
  switch(i.type) {
  case Tag.AssignmentExpression:
    return assignmentOps[i.value.node.operator]
  case Tag.BinaryExpression:
    return binaryOps[i.value.node.operator]
  case Tag.UnaryExpression:
    return unaryOps[i.value.node.operator]
  case Tag.UpdateExpression:
    return (i.value.node.prefix ? prefixUpdateOps : updateOps)
      [i.value.node.operator]
  case Tag.LogicalExpression:
    return logicalOps[i.value.node.operator]
  case Tag.YieldExpression:
    if (i.value.node.delegate)
      return Kit.sysId("yldStar")
    return Kit.sysId("yld")
  case Tag.AwaitExpression:
    return Kit.sysId("chain")
  }
  let res = opNamesMap.get(i.type)
  if (res != null)
    return res
  res = Kit.sysId(Kit.symName(i.type).match(/[A-Z]/g).join(""))
  assert.ok(!opNamesReserved.has(res))
  opNamesMap.set(i.type,res)
  return res
}

export function inject(si) {
  const nset = new Map()
  const s = Kit.auto(si)
  function setEnv(ops) {
    for(const j in ops) {
      const v = ops[j]
      if (v === false)
        nset.delete(Tag[j])
      else
        nset.set(Tag[j],v === true ? false : Kit.sysId(v))
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
          const name = v || getOpName(i)
          yield s.enter(i.pos,op,{node:{src:i.value,type:i.type},
                                  bind:true,expr:true,
                                  sym:name})
          yield* walk()
          yield* s.leave()
          s.close(i)
          continue
        }
      }
      yield i
    }
  }
  if (s.opts.ops != null)
    setEnv(s.opts.ops)
  if (!nset.size)
    return s
  return walk()
}

export function interpret(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter && i.type === op) {
        const lab = s.label()
        yield s.enter(i.pos,Block.effExpr)
        yield s.enter(Tag.expression,Tag.CallExpression)
        yield s.tok(Tag.callee,Tag.Identifier,{sym:i.value.sym})
        yield s.enter(Tag.arguments,Tag.Array)
        yield* Kit.reposOne(walk(), Tag.push)
        yield* lab()
        s.close(i)
        continue
      }
      yield i
    }
  }
  return walk()
}

/**
 * combines opts with bind into a single call for optimization purposes
 * e.g.
 *
 *    bind(yield a, cont) ==> bindYield(a, cont)
 */
export function combine(si) {
  const s = Kit.auto(si)
  const ops = s.opts.combineOps
  return ops ? _combine() : s
  function* _combine() {
    const defaultName = s.opts.bindName
    const defaultSym = Kit.sysId(defaultName)
    for(const i of s) {
      yield i
      if (i.enter && i.type === Block.letStmt && i.value.eff) {
        const j = s.curLev()
        if (j && j.type === op && (ops === true || ops[j.value.sym.orig])) {
          i.value.op = j.value
          i.value.opSym = j.value.sym
          i.value.bindName = j.value.sym.orig
          s.take()
          if (!j.leave) {
            yield* s.sub()
            s.close(j)
          }
          continue
        }
        i.value.op = null
        i.value.opSym = defaultSym
        i.value.bindName = defaultName
      }
    }
  }
}
