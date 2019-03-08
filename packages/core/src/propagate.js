import * as Kit from "./kit"
import {Tag} from "./kit"

export function propagateEff(s) {
  const sa = Kit.toArray(s)
  const si = Kit.auto(sa)
  function func(i) {
    i.value.opts.transform ? sub(i.value) : skip()
    si.close(i)
  }
  function skip() {
    for(const i of si.sub())
      if (i.enter && i.value.func)
        func(i)
  }
  function sub(root) {
    let res = false
    const stack = []
    function propagate(s) {
      res = true
      for(const [v,i] of s) {
        const stop = v.eff
        v.eff = true
        if (v.ctrl) {
          v.ctrlEff = true
        }
        if (i != null) {
          for(const j of i)
            propagate(j)
        }
        if (stop)
          break
      }
    }
    function expr(i) {
      si.peel(i)
      let eff = i.value.eff || i.value.bind
      for(const j of si.sub()) {
        if (j.value.func) {
          func(j)
          continue
        }
        eff = expr(j) || eff
      }
      switch(i.type) {
      case Tag.Array:
        break
      default:
        i.value.eff = eff
      }
      Kit.skip(si.leave())
      return eff
    }
    const coerce = root.coerce || si.opts.coerce
    for(const i of si.sub()) {
      if (i.enter) {
        if (i.value.func) {
          func(i)
          continue
        }
        if (i.value.expr && i.pos !== Tag.top && !i.value.boundary) {
          if (expr(i))
            stack[0][0].shallowEff = true
          continue
        }
        if (i.value.boundary) {
          const v = i.value
          let info = []
          if (v.ctrl != null && v.ctrl.length) {
            v.effDeps = info
            if (v.ctrl === "#ret" && !coerce)
              v.bind = true
          }
          stack.unshift([v,info])
          if (v.block) {
            const l = v.block.effDeps
            if (l == null)
              throw new Error(`no such label ${v.block.ctrl}`)
            if (v.block.eff)
              propagate(stack)
            else
              l.push(stack.concat())
          }
        }
      }
      if (i.leave) {
        if (i.value.boundary) {
          if (i.value.bind) {
            propagate(stack)
            stack.shift()
          } else if (i.value.shallowEff || i.value.eff) {
            stack.shift()
            propagate(stack)
          } else {
            stack.shift()
          }
        }
      }
    }
    root.topEff = res
  }
  func(si.take())
  return sa
}
// lightweight version of propagateEff, it doesn't follow labels
// must be performed after AST was changed 
export function recalcEff(s) {
  const sa = Kit.toArray(s)
  const stack = []
  for(const i of sa) {
    const v = i.value
    if (i.enter && i.pos !== Tag.top) {
      v.eff = v.bind
      v.shallowEff = null
      stack.unshift(i)
      if (v.block)
        v.eff = v.eff || v.block.ctrlEff
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
            } else if (v.expr && f.stmt && !v.boundary) {
              f.shallowEff = true
            } else {
              f.eff = true
            }
          }
      }
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

