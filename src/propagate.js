import * as Kit from "./kit"
import {Tag} from "estransducers"
import * as assert from "assert"

export function* propagateEff(s) {
  const stack = []
  const si = Kit.auto(s)
  let labs = {}
  let res = false
  //    let top = si.cur().value
  function propagate(s) {
    res = true
    for(const [v,i] of s) {
      if (v.eff)
        break
      v.eff = true
      if (v.ctrl)
        v.ctrlEff = true
      if (i != null) {
        for(const j of i)
          propagate(j)
      }
    }
  }
  function* expr(i) {
    yield si.peel(i)
    let eff = i.value.eff || i.value.bind
    for(const j of si.sub()) {
      eff = (yield* expr(j)) || eff
    }
    switch(i.type) {
    case Tag.Array:
      break
    default:
      i.value.eff = eff
    }
    yield* si.leave()
    return eff
  }
  let top = si.peel()
  const coerce = top.value.coerce || si.opts.coerce
  yield top
  for(const i of si.sub()) {
    if (i.enter) {
      if (i.value.expr && i.pos !== Tag.top && !i.value.boundary) {
        if (yield* expr(i))
          stack[0][0].shallowEff = true
        continue
      }
      if (i.value.boundary) {
        const v = i.value
        let info = null
        if (v.ctrl != null) {
          labs = Object.create(labs)
          info = []
          for(const j of v.ctrl) {
            // TODO: another pass
            if (j === "#ret" && !coerce)
              i.value.bind = true
            labs[j] = {block:v,buf:info}
          }
        }
        stack.unshift([v,info])
        if (v.jump) {
          const l = labs[v.jump]
          if (l == null)
            throw new Error(`no such label ${v.jump}`)
          if (l.block.eff)
            propagate(stack)
            else
              l.buf.push(stack.concat())
        }
      }
    }
    yield i
    if (i.leave) {
      if (i.value.boundary) {
        stack.shift()
        if (i.value.bind)
          i.value.eff = true
        if (i.value.ctrl)
          labs = Object.getPrototypeOf(labs)
        if (i.value.shallowEff || i.value.eff) {
          propagate(stack)
        }
      }
    }
  }
  top.value.topEff = res
  yield* si.leave()
}

// lightweight version of propagateEff, it doesn't follow labels
// must be performed after AST was changed 
export function recalcEff(s) {
  const sa = Kit.toArray(s)
  const stack = []
  let labs = {}
  for(const i of sa) {
    const v = i.value
    if (i.enter && i.pos !== Tag.top) {
      v.eff = v.bind
      v.shallowEff = null
      stack.unshift(i)
      if (v.ctrl) {
        labs = Object.create(labs)
        for(const j of v.ctrl) {
          labs[j] = v
        }
      }
      if (v.jump)
        v.eff = v.eff || labs[v.jump].ctrlEff 
    }
    if (i.leave) {
      stack.shift()
      const j = stack[0]
      if (j != null) {
        const f = j.value
        if (v.eff || v.shallowEff) {
            if (j.type === Tag.ForStatement
                && (i.pos === Tag.update || i.pos === Tag.test)) {
              f.eff = true
            } else if (v.expr && f.stmt) {
              f.shallowEff = true
            } else {
              f.eff = true
            }
          }
      }
      if (i.value.ctrl)
        labs = Object.getPrototypeOf(labs)
    }
  }
  return sa
}

export function* assignEff(s) {
  for(const i of s) {
    switch (i.type) {
    case Tag.CallExpression:
      i.value.bind = i.value.eff = true
      break
    }
    yield i
  }
}

/** in some positions VariableDeclarations aren't really statements, 
 *  e.g. `for` statement init, so the pass marks them
 */
function* prepForStmtVarDecl(s) {
  const stack = []
  for(const i of s) {
    switch(i.type) {
    case Tag.ForOfStatement:
    case Tag.ForInStatement:
    case Tag.ForStatement:
      if (i.enter)
        stack.unshift(i.level+1)
      if (i.leave)
        stack.shift()
      break
    case Tag.VariableDeclaration:
      if (stack[0] == i.level) {
        switch(i.pos) {
        case Tag.left:
        case Tag.init:
          if (i.enter) {
            i.value.stmt = false
            i.value.expr = true
            i.value.boundary = false
            i.value.decl = true
          }
          break
        }
      }
      break
    }
    if (stack[0] == i.level) {
      switch(i.pos) {
      case Tag.test:
      case Tag.update:
        i.value.boundary = true
      }
    }
    yield i
  }
}

export const prepare = Kit.pipe(
  prepForStmtVarDecl,
  Array.from)

