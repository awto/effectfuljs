import * as Kit from "./kit"
import {Tag,symbol,tok} from "./kit"
import * as assert from "assert"
import * as Block from "./block"
import * as Prop from "./propagate"

export function interpretPureLet(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter && i.type === Block.letStmt && !i.value.eff) {
        const lab = s.label()
        let pos = i.pos
        if (i.value.sym) {
          assert.equal(i.pos,Tag.push)
          yield s.enter(Tag.push,Tag.ExpressionStatement)
          yield s.enter(Tag.expression,Tag.AssignmentExpression,
                        {node:{operator:"="}})
          yield s.tok(Tag.left,Tag.Identifier, {sym:i.value.sym})
          pos = Tag.right
        }
        yield* Kit.reposOne(walk(),pos)
        yield* lab()
        s.close(i)
      } else
        yield i
    }
  }
  return walk()
}

export function tempVarSym(top, pat, byVal = true) {
  const sym = Kit.scope.newSym(pat)
  top.scopeDecls.add(sym)
  sym.track = sym.state = true
  sym.byVal = byVal
  sym.declScope = top
  setSymInterpr(sym)
  return sym
}

/** 
 * extracts all effectful expressions into separate statements in a block, 
 * injects `letStmt` and `bindPat` to mark extracted expressions and its 
 * original location
 */
export const flatten = Kit.pipe(
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
        const sym = pat.sym = i.value.bindSym = tempVarSym(sl.first.value)
        const value = pat.ref = Kit.tagValue(
          Tag.push,
          Block.letStmt,
          {sym,eff})
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
              } else if (i.pos === Tag.push) {
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
              i.value.shared.sym = i.value.bindSym
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
                last[0].value.ref.sym = null
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
      sl.peel(i)
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
  function removeEmptyBinds(s) {
    const si = Kit.auto(s)
    function* subexpr(i,pos,result) {
      const exit = si.level-1
      const buf = [i]
      const p = Kit.result(si.findPos(pos),buf)
      if (p != null) {
        if (p.type === Block.bindPat) {
          Kit.skip(Kit.tillLevel(exit,si))
          p.value.ref.sym = null
          p.value.ref.result = result
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
            yield* subexpr(i,Tag.argument,true)
          } else
            yield i
          break
        case Tag.ExpressionStatement:
          assert.ok(i.enter)
          yield* subexpr(i,Tag.expression,false)
          break
        default:
          yield i
        }
      }
    }
    return walk()
  },
  Prop.recalcEff
)

/** as Sym::interp value means the var is a field of threaded context object */
export const ctxField = {$:"xf", frameLocal:true}
/**
 * as Sym::interp value means the var is field of a local variable,  
 * representing captured vars 
 */
export const objField = {$:"of", frameLocal:true}
/** as Sym::interp value means the var is threaded as parameter to frames */
export const paramThread = {$:"t", frameLocal:false}

/** assigns interpr field to a symbol depending on current options */
export function setSymInterpr(si) {
  function calc() {
    const opts = si.declScope.opts
    const topLevel = opts.topLevel
    const ctx = opts.contextState
    const capt = si.closCapt
    const byVal = si.byVal
    const transform = si.declScope.opts.transform
    if (si.global || !si.track)
      return undefined
    if (!transform)
      return topLevel && capt ? objField : undefined
    if (byVal)
      return ctx ? ctxField : paramThread
    if (ctx) {
      if (capt)
        return topLevel ? objField : undefined
      return topLevel ? ctxField : undefined
    }
    if (topLevel)
      return objField
    return undefined
  }
  si.interpr = calc()
}

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

