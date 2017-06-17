import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,symbol,tok} from "./kit"
import * as assert from "assert"
import * as Debug from "./debug"
import * as Trace from "./kit/trace"
import * as Block from "./block"
import * as Prop from "./propagate"

// TODO: remove (replace ipat with something else)
function* setPatVarToArgs(s) {
  const sl = Kit.auto(s)
  function* walk(sw) {
    for(const i of sw) {
      yield i
      if (i.enter) {
        switch(i.type) {
        case Block.chain:
          if (i.enter) {
            let pat = null
            while(sl.curLev() != null) {
              const cur = sl.cur()
              cur.value.ipat = pat
              yield* walk(sl.one())
              pat = cur.value.pat
            }
          }
        }
      }
    }
  }
  yield* walk(sl)
}

export const propagateBindVars = R.pipe(
  function* propagateBindVars(s) {
    const sl = Kit.auto(s)
    function* walk() {
      let res = null
      for(const i of sl.sub()) {
        yield i
        if (i.enter) {
          switch(i.type) {
          case Block.chain:
          case Block.frame:
            res = i.value.pat = yield* walk()
            break
          default:
            if (i.value.eff && i.value.pat && i.value.pat.length) {
              res = i.value.pat
            }
            const ires = yield* walk()
            if (ires && ires.length)
              res = ires
            break
          }
        }
      }
      return res
    }
    yield* walk()
  },
  Array.from,
  setPatVarToArgs)

export function interpretPureLet(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter && i.type === Block.letStmt && !i.value.eff) {
        const lab = s.label()
        if (i.value.pat && i.value.pat.length) {
          assert.equal(i.pos,Tag.push)
          yield s.enter(Tag.push,Tag.VariableDeclaration,
                         {node:{kind:"const"}})
          yield s.enter(Tag.declarations,Tag.Array)
          yield s.enter(Tag.push,Tag.VariableDeclarator)
          yield s.enter(Tag.id,Kit.Subst)
          yield* i.value.pat
          yield* s.leave()
          yield s.enter(Tag.init,Kit.Subst)
          yield* walk()
        } else {
          yield s.enter(i.pos,Kit.Subst)
          yield* walk()
        }
        yield* lab()
        s.close(i)
      } else
        yield i
    }
  }
  return Kit.completeSubst(walk())
}

export const interpret = R.pipe(
  interpretPureLet,
  function interpretBindFrame(s) {
    const sl = Kit.auto(s)
    let en = false
    function* walk() {
      for(const i of sl.sub()) {
        switch(i.type) {
        case Block.letStmt:
          if (i.enter)  {
            if (i.value.eff) {
              const j = sl.curLev()
              if (j != null)
                j.value.result = true
              yield sl.enter(i.pos,Kit.Subst)
              yield* walk()
              yield* sl.leave()
            }
          }
          break
        case Block.frame:
          if (i.enter) {
            yield sl.enter(i.pos,Block.effBlock)
            yield* walk()
            yield* sl.leave()
          }
          break
        default:
          yield i
        }
      }
    }
    return Kit.completeSubst(walk())
  },
  function removeEmptyBlocks(si) {
    const s = Kit.auto(si)
    function* walk(sw) {
      for(const i of sw) {
        if (i.enter && i.type === Block.effBlock && s.curLev() != null) {
          const buf = [...walk(s.one())]
          if (s.curLev() != null) {
            yield i
            yield* buf
          } else {
            buf[0].pos = buf[buf.length-1].pos = i.pos
            yield* buf
            s.close(i)
          }
        } else
          yield i
      }
    }
    return walk(s)
  })



/**
 * calculates binds dependencies for a chain, so it can be arranged with 
 * `groupDeps` to utilize closures
 *
 *       type DepsInfo = { fwd: Map<number,Sym[]>, 
 *                         x: number, 
 *                         ref: Val, seq: DepsInfo[] }
 *   
 * for frames:
 * 
 *       type Val = Val & { deps: DepsInfo }
 *     
 * for chains:
 * 
 *       type Val = Val & { deps: DepsInfo[] }
 *     
 */
export const calcVarDeps = R.curry(function calcVarDeps(eff,s) {
  const sa = Kit.toArray(s)
  const sl = Kit.auto(sa)
  function seq() {
    const vars = new Map()
    const fs = []
    for(const i of sl.sub()) {      
      if (i.enter) {
        const cx = i.value.fdeps = { f:i.value,
                                     fwd:new Map(),
                                     x:fs.length,
                                     ref: i.value,
                                     seq:fs
                                   }
        fs.push(cx)
        switch(i.type) {
        case Block.frame:
          for(const j of sl.sub()) {
            if (j.enter) {
              switch(j.type) {
              case Block.bindPat:
                const ref = j.value.ref
                const v = vars.get(ref)
                if (v != null) {
                  v.u.push(cx.x)
                }
              break
              case Block.letStmt:
                if (eff == null || eff === (j.value.eff || false)) {
                  // for effectful bind only next frame receives its bound name
                  vars.set(j.value,{x:i.value.eff?cx.x+1:cx.x,u:[]})
                }
                break
              case Block.chain:
                j.value.deps = seq()
                break
              }
            }
          }
          break
        case Block.chain:
          i.value.deps = seq()
          break
        }
      }
    }
    for(const [v,{x,u}] of vars) {
      const cx = fs[x]
      if (cx == null)
        continue
      for(const i of u) {
        if (i === x)
          continue
        let w = cx.fwd.get(i)
        if (w == null)
          cx.fwd.set(i,w = [])
        w.push(v.pat)
      }
    }
    return fs
  }
  function walk() {
    for(const i of sl.sub()) {
      if (i.enter && i.type === Block.chain)
        i.value.deps = seq()
    }
  }
  walk()
  return sa
})


/**
 * assuming chain will be interpreted further in a left associative order,
 * this pass emits additional chain to make right associative frame groups 
 * if this is specified in `DepsInfo`
 */
export const groupDeps = R.pipe(
  function* groupDeps(s) {
    const sl = Kit.auto(s)
    function* seq(deps) {
      const stack = []
      let num = 0
      for(const i of sl.sub()) {
        if (i.type === Block.frame) {
          assert.ok(i.enter)
          const x = num++
          const cx = deps[x]
          if (cx.fwd.size && x !== 0) {
            const nxt = Math.max(...cx.fwd.keys())
            if (nxt > cx.x) {
              stack.unshift(nxt)
              yield sl.enter(Tag.push, Block.chain)
            }
          }
          yield sl.peel(i)
          yield* walk()
          yield* sl.leave()
          while(stack.length && cx.x >= stack[0]) {
            stack.shift()
            yield* sl.leave()
          }
        } else
          yield i
      }
      assert.equal(stack.length, 0)
    }
    function* walk() {
      for(const i of sl.sub()) {
        yield i
        if (i.enter && i.type === Block.chain)
          yield* seq(i.value.deps)
      }
    }
    yield* walk()
  }
)

export const mconst = symbol("mconst")
export const munshiftTo = symbol("unshiftTo")

export function threadDeps(si) {
  const s = Kit.auto(si)
  function* walk(par) {
    for(const i of s.sub()) {
      yield i
      if (i.enter) {
        switch(i.type) {
        case Block.chain:
          let cur = []
          for(const j of s.sub()) {
            yield j
            if (j.enter) {
              const {fdeps} = j.value
              for(const [x,vs] of fdeps.fwd) {
                for(const pat of vs) {
                  cur.push({x,pat})                  
                }
              }
              cur = cur.filter(({x}) => x > fdeps.x)
              yield* walk(cur)
            }
          }
          break
        case Block.letStmt:
          if (i.value.eff && par != null)
            i.value.threadPat = par.map(i => i.pat)
          break
        }
      }
    }
  }
  return walk([])
}

export function injectThreadMaps(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      yield i
      if (i.enter && i.type === Block.letStmt
          && i.value.threadPat && i.value.threadPat.length) {
        const pat = i.value.pat
        i.value.pat = [...function*() {
          const lab = s.label()
          yield s.enter(Tag.push,Tag.ArrayPattern)
          yield s.enter(Tag.elements,Tag.Array)
          yield* pat
          for(const j of i.value.threadPat)
            yield* j
          yield* lab()
        }()]
        yield s.enter(Tag.expression,Block.chain,{kind:"pseq",eff:true})
        const lab = s.label()
        yield s.enter(Tag.push,Block.frame,{eff:true})
        yield s.enter(Tag.push,Block.letStmt,{pat,eff:true})
        yield* walk()
        yield* lab()
        yield s.enter(Tag.push,Block.frame,{eff:false})
        yield s.enter(Tag.push,Block.letStmt,{eff:false})
        yield s.enter(Tag.expression,Tag.ArrayExpression)
        yield s.enter(Tag.elements,Tag.Array)
        yield* pat
        for(const j of i.value.threadPat) 
          yield* j
        yield* walk()
        yield* lab()
        yield* s.leave()
        i.value.threadPat = null        
      }
    }
  }
  return walk()
}


/** 
 * extracts all effectful expressions into separate statements in a block, 
 * injects `letStmt` and `bindPat` to mark extracted expressions and its 
 * original location
 */
export const flatten = R.pipe(
  Kit.removeNulls,
  function* flatten(s) {
    const sl = Kit.auto(s)
    function* block(i) {
      if (i.value.eff || i.value.shallowEff) {
        if (i.type === Tag.BlockStatement) {
          yield sl.peel(i)
          yield* sl.peelTo(Tag.body)
          for(const j of sl.sub()) {
            assert.ok(j.enter
                      && (j.value.stmt || Kit.symKind(j.type) === "ctrl")
                      && j.pos === Tag.push)
            yield* j.value.eff || j.value.shallowEff ? frame(j) : sl.copy(j)
          }
          yield* sl.leave()
          yield* sl.leave()
        } else if (i.pos === Tag.push) {
          yield* frame(i)
        } else {
          yield sl.enter(i.pos,Tag.BlockStatement)
          yield sl.enter(Tag.body,Tag.Array)
          yield* frame(Kit.setPos(i,Tag.push))
          yield* sl.leave()
          yield* sl.leave()
        }
      } else {
        yield i
        yield* sl.sub()
      }
    }
    function* frameImpl(buf) {
      function* bind(i,pat,eff) {
        pat.sym = i.value.bindPat = Kit.scope.newSym()
        const value = pat.ref = Kit.tagValue(
          Tag.push,
          Block.letStmt,
          {pat:[sl.tok(Tag.push,Tag.Identifier,pat)],eff})
        yield sl.enter(Tag.push,Block.letStmt,value)
        yield sl.peel(Kit.setPos(i,Tag.expression))
        yield* frameImpl(buf)
        yield* sl.leave()
        yield* sl.leave()
      }
      function* inject(i) {
        const pat = {node:null,canIgnore:true}
        buf.push([...bind(i,pat,true)])
        yield sl.tok(i.pos,Block.bindPat,pat)
      }
      for(const i of sl.sub()) {
        if (i.enter) {
          if (i.value.stmt) {
            if (i.value.eff || i.value.shallowEff) {
              yield* block(i)
            } else {
              if (i.type === Tag.BlockStatement) {
                i.value.coerce = true
                yield sl.peel(i)
                yield* sl.sub()
                yield* sl.leave()
              } else {
                const lab = sl.label()
                yield sl.enter(i.pos,Tag.BlockStatement,{coerce:true})
                yield sl.enter(Tag.body,Tag.Array)
                yield sl.peel(Kit.setPos(i,Tag.push))
                yield* sl.sub()
                yield* lab()
              }
            }
            continue
          }
          if (i.value.bind || i.value.shared != null) {
            yield* inject(i)
            if (i.value.shared != null)
              i.value.shared.sym = i.value.bindPat
            continue
          }
          switch(i.type) {
          case Tag.UpdateExpression:
          case Tag.AssignmentExpression:
          case Tag.CallExpression:
            yield* inject(i)
            continue
          case Tag.SequenceExpression:
            let last = null
            const exprs = sl.take()
            assert.equal(exprs.type, Tag.Array)
            for(const j of sl.sub()) {
              if (last != null && last.length)
                last[0].value.ref.pat.length = 0
              last = [...inject(j)]
            }
            yield* Kit.reposOne(last,i.pos)
            sl.close(exprs)
            sl.close(i)
            continue
          }
        }
        yield i
      }
    }
    function* frame(i) {
      if (i.leave) {
        yield i
        return
      }
      i = sl.peel(i)
      const buf = []
      const res = [...frameImpl(buf)]
      i.value.eff = null
      yield* [].concat(...buf)
      yield i
      yield* res
      yield* sl.leave()
    }
    yield sl.peel()
    for(const i of sl.sub()) {
      if (i.enter && i.value.stmt)
        yield* block(i,Tag.BlockStatement,Tag.body)
      else
        yield i
    }
    yield* sl.leave()
  },
  function* setSharedRef(s) {
    for(const i of s) {
      if (i.type === Block.sharedRef) {
        if (i.enter) {
          yield tok(i.pos,Tag.Identifier,{sym:i.value.ref.sym})
        }
      } else
        yield i
    }
  },
  function* removeEmptyBinds(s) {
    const si = Kit.auto(s)
    function* subexpr(i,pos) {
      const exit = si.level-1
      const buf = [i]
      const p = Kit.result(si.findPos(pos),buf)
      if (p != null) {
        if (p.type === Block.bindPat && p.value.ref.pat.length === 1) {
          Kit.skip(Kit.tillLevel(exit,si))
          p.value.ref.pat.length = 0
          if (i.pos !== Tag.push)
            yield si.tok(i.pos,Tag.Null)
        return
        }
        yield* buf
        yield p
        yield* walk()
      } else
        yield i
      yield* Kit.tillLevel(exit,si)
    }
    function* walk() {
      for(const i of si.sub()) {
        switch(i.type) {
        case Tag.ReturnStatement:
          if (i.value.last) {
            assert.ok(i.enter)
            yield* subexpr(i,Tag.argument)
          } else
            yield i
          break
        case Tag.ExpressionStatement:
          assert.ok(i.enter)
          yield* subexpr(i,Tag.expression)
          break
        default:
          yield i
        }
      }
    }
    yield* walk()
  },
  Prop.recalcEff
)

/** removes redundant temp variables for JS effects binds */
export function optimizePureLets(si) {
  let curBind = null
  const s = Kit.auto(si)
  function* collect() {
    const cur = []
    const buf = [...function*() {
      for(const i of s.sub()) {
        yield i
        if(i.enter) {
          switch(i.type) {
          case Block.letStmt:
            i.value.sym = i.value.pat
              && i.value.pat.length
              && i.value.pat[0].type === Tag.Identifier
              && i.value.pat[0].value.sym
              || null
          case Block.bindPat:
            cur.push(i)
            break
          case Block.frame:
            yield s.tok(Kit.packed,{node:[...collect()]})
            break
          }
        }
      }
    }()]
    const pats = new Set(
      cur.map(i => i.type === Block.bindPat && i.value.sym).filter(i => i))
    const lets = new Set(
      cur.map(i => i.type === Block.letStmt && i.value.sym)
        .filter(i => i && pats.has(i)))
    const subst = new Set()
    const candidates = new Set()
    for(const i of cur) {
      const sym = i.value.sym
      if (i.type === Block.letStmt) {
        if (sym != null) {
          if (lets.has(sym))
            candidates.add(sym)
          else
            candidates.clear()
        }
      } else {
        if (sym != null && candidates.delete(sym)) {
          subst.add(sym)
        }
      }
    }
    const substDict = new Map()
    let curlet
    for(const i of buf) {
      switch(i.type) {
      case Block.letStmt:
        if (i.enter) {
          if (i.value.eff) {
            if (i.value.write != null && i.value.write.size) {
              curlet = []
              substDict.clean()
            }
          } else {
            const sym = i.value.sym
            if (subst.delete(sym)) {
              curlet = []
              substDict.set(sym,curlet)
              continue
            }
          }
        }
        if (i.leave && curlet != null) {
          if (i.value.eff)
            yield* curlet
          curlet = null
          continue
        }
        break
      case Block.bindPat:
        if (i.enter) {
          const sym = i.value.sym
          if (!sym)
            break
          const seq = substDict.get(sym)
          if (seq != null) {
            const rseq = Kit.reposOneArr(seq,i.pos)
            if (curlet != null)
              curlet.push(...rseq)
            else
              yield* rseq
            continue
          }
        }
        break
      }        
      if (curlet != null)
        curlet.push(i)
      else
        yield i
    }
  }
  function* walk() {
    for(const i of s) {
      yield i
      if (i.enter && i.type === Block.frame)
        yield* collect()
    }
  }
  return Kit.unpack(walk())
}

