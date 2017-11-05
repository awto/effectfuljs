import * as Kit from "./kit"
import {Tag,symbol,tok} from "./kit"
import * as assert from "assert"
import * as Block from "./block"
import * as Ctrl from "./control"
import * as Prop from "./propagate"

export function interpretPureLet(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter && i.type === Block.letStmt && !i.value.eff) {
        const lab = s.label()
        let pos = i.pos
        if (i.value.sym && i.value.sym.bound) {
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

export function tempVarSym(top, pat, byVal = top.opts.state) {
  const sym = Kit.scope.newSym(pat)
  top.scopeDecls.add(sym)
  sym.track = true
  sym.byVal = top.opts.state
  sym.declScope = top
  sym.bound = true
  setSymInterpr(sym)
  if (sym.interpr === closureVar && top.savedDecls)
    top.savedDecls.set(sym,{raw:null})
  return sym
}

/** 
 * extracts all effectful expressions into separate statements in a block, 
 * injects `letStmt` and `bindPat` to mark extracted expressions and its 
 * original location
 */
export const flatten = Kit.pipe(
  Kit.removeNulls,
  function* flatten(si) {
    const s = Kit.auto(si)
    const root = s.first.value
    function* scope() {
      for(const i of s.sub()) {
        if (i.enter) {
          if (i.type === Block.chain) {
            yield s.peel(i)
            yield* scope()
            yield* s.leave()
          } else if (i.value.eff || i.value.shallowEff) {
            const sub = [], inner = []
            Kit.result(walk(sub,s.sub()),inner)
            for(const j of sub)
              yield* j
            yield i
            yield* inner
            yield s.close(i)
          } else {
            yield* s.copy(i)
          }
        }
      }
    }
    function bind(i,buf,sym,skip) {
      if (!sym)
        sym = tempVarSym(root)
      sym.bound = false
      buf.push([...function*() {
        const lab = s.label()
        yield s.enter(Tag.push,Block.letStmt,{sym})
        if (!i.leave) {
          yield s.peel(Kit.setPos(i,Tag.expression))
          yield* i.value.eff ? walk(buf,s.sub(),true) : s.sub()
        } else
          yield Kit.setPos(i,Tag.expression)
        yield* lab()
      }()])
      return s.tok(i.pos,Block.bindPat,{sym})
    }
    function* walk(buf,sw,expr) {
      for(const i of sw) {
        if (i.enter) {
          if (!expr && i.value.expr && !i.value.eff) {
            yield* s.copy(i)
            continue
          }
          switch(i.type) {
          case Block.chain:
            yield s.peel(i)
            yield* scope()
            yield* s.leave()
            continue
          case Tag.Identifier:
            if (!i.value.sym || i.value.lhs ||
                !i.value.sym.closCapt || i.value.sym.singleAssign) {
              break
            }
            // may have a side effect in getter too
          case Tag.AssignmentExpression:
            if (i.value.eff) {
              const sym = tempVarSym(root)
              sym.bound = false
              buf.push([...function*() {
                yield s.enter(Tag.push,Block.letStmt,{sym})
                const op = i.value.node.operator
                const lhs = [
                  s.peel(),
                  ...walk(buf,s.sub(),true),
                  ...s.leave()]
                if (op !== "=" && s.cur().value.eff &&
                    lhs.some(i => i.type === Tag.Identifier
                             && i.value.sym
                             && i.value.sym.closCapt)) {
                  // closure scoped variable may change in parent context
                  // but we still need to capture its rhs
                  const sub = tempVarSym(root)
                  sub.bound = false
                  buf.push([...function*() {
                    yield s.enter(Tag.push,Block.letStmt,{sym:sub})
                    yield* Kit.clone(lhs)
                    yield* s.leave()
                  }()])
                  yield s.enter(Tag.expression,Tag.AssignmentExpression,
                                {node:{operator:"="}})
                  yield* lhs
                  yield s.enter(Tag.right,Tag.BinaryExpression,
                                {node:{operator:op.substr(0,op.length-1)}})
                  yield s.tok(Tag.left,Block.bindPat,{sym:sub})
                  yield* walk(buf,s.one(),true)
                  yield* s.leave()
                  yield* s.leave()
                  s.close(i)
                } else {
                  yield s.peel(i)
                  yield* lhs
                  yield* walk(buf,s.one(),true)
                  yield* s.leave()
                }
                yield* s.leave()
              }()])
              yield s.tok(i.pos,Block.bindPat,{sym})
              continue
            }
          case Tag.UpdateExpression:
            s.cur().value.lhs = true
            yield bind(i,buf)
            continue
          case Tag.MemberExpression:
            if (i.pos === Tag.callee || i.value.lhs) {
              yield i
              continue
            }
          case Tag.CallExpression:
            yield bind(i,buf)
            continue
          case Tag.ConditionalExpression:
            if (!i.value.eff) {
              yield bind(i,buf)
              continue
            }
            let sym
            buf.push([...function*(){
              yield s.enter(Tag.push,Tag.IfStatement)
              const ilab = s.label()
              yield* walk(buf,s.one(),true)
              const cbuf = []
              const abuf = []
              const c = s.take()
              const csym = tempVarSym(root)
              csym.bound = false
              const cpat = bind(c,cbuf,csym)
              const a = s.take()
              let asym
              if (a.value.eff === c.value.eff) {
                asym = sym = csym
              } else {
                if (c.value.eff) {
                  sym = csym
                  asym = tempVarSym(root)
                } else {
                  sym = asym = tempVarSym(root)
                }
              }
              asym.bound =  false
              const eff = a.value.eff || c.value.eff
              const apat = bind(a,abuf,asym)
              function* branch(pos, c, cbuf, cpat) {
                if (eff)
                  yield s.enter(pos,Block.chain)
                else {
                  yield s.enter(pos,Tag.BlockStatement)
                  yield s.enter(Tag.body,Tag.Array)
                }
                for(const j of cbuf)
                  yield* j
                if (eff && !c.value.eff) {
                  yield s.enter(Tag.push,Block.letStmt,{sym,eff:true})
                  yield s.enter(Tag.expression,Block.pure,{bind:true})
                  yield Kit.setPos(cpat,Tag.push)
                }
                yield* ilab()
              }
              yield* branch(Tag.consequent,c,cbuf,cpat)
              yield* branch(Tag.alternate,a,abuf,apat)
              yield* s.leave()
            }()])
            yield s.tok(i.pos,Block.bindPat,{sym})
            s.close(i)
            continue
          case Tag.LogicalExpression:
            if (!i.value.eff) {
              yield bind(i,buf)
              continue
            }
            const or = i.value.node.operator === "||"
            const left = s.take()
            let rpat
            buf.push([...function*(){
              const lab = s.label()
              yield s.enter(Tag.push,Tag.IfStatement)
              const lsym = tempVarSym(root)
              lsym.bound = false
              const ilab = s.label()
              if (or) {
                yield s.enter(Tag.test,Tag.UnaryExpression,
                              {node:{operator:"!"}})
                yield bind(Kit.setPos(left,Tag.argument),buf,lsym)
                yield* s.leave()
              } else {
                yield bind(Kit.setPos(left,Tag.test),buf,lsym)
              }
              const right = s.take()
              const subBuf = []
              if (right.value.eff) {
                yield s.enter(Tag.consequent,Block.chain)
                const rsym = tempVarSym(root)
                rsym.bound = false
                rpat = bind(Kit.setPos(right,i.pos), subBuf, rsym)
                for(const i of subBuf)
                  yield* i
                yield* ilab()
                yield s.enter(Tag.alternate,Block.chain)
                yield s.enter(Tag.push,Block.letStmt,{sym:rsym,eff:true})
                yield s.enter(Tag.expression,Block.pure,{bind:true})
                yield s.tok(Tag.push,Block.bindPat,{sym:lsym})
              } else {
                yield s.enter(Tag.consequent,Tag.BlockStatement)
                yield s.enter(Tag.body,Tag.Array)
                rpat = s.tok(i.pos,Block.bindPat,{sym:lsym})
                bind(right,subBuf,lsym)
                for(const j of subBuf)
                  yield* j
              }
              yield* lab()
            }()])
            yield rpat
            s.close(i)
            continue
          }
          if (i.value.bind) {
            yield bind(i,buf)
            continue
          }
          if (!i.value.stmt && !i.value.expr) {
            yield i
            continue
          }
          if (!expr && i.value.expr) {
            yield i
            yield* walk(buf,s.sub(),true)
            yield s.close(i)
            continue
          }
          if (!i.value.eff  && !i.value.shallowEff) {
            yield* s.copy(i)
            continue
          }
        }
        yield i
      }
    }
    yield* s.till(i => i.type === Block.chain)
    yield* scope()
    yield* s
  },
  function* flattenCleanup(si) {
    const s = Kit.auto(si)
    for(const i of s) {
      if (i.enter) {
        switch(i.type) {
        case Tag.ExpressionStatement:
          const b = s.curLev()
          if (b && b.type === Block.bindPat) {
            b.value.sym.result = i.type === Tag.ReturnStatement
            Kit.skip(s.copy(i))
            continue
          }
          break
        }
      }
      yield i
    }
  },
  Prop.recalcEff
)

/** 
 * as Sym::interp value means the var is a field of threaded context object
 */
export const ctxField = {$:"xf",frameLocal:true}
/** as Sym::interp value means the var is threaded as parameter to frames */
export const paramThread = {$:"t",frameLocal:false}
export const closureVar = {$:"cv",frameLocal:true}

paramThread.ctxStore = false

/** assigns interpr field to a symbol depending on current options */
export function setSymInterpr(si) {
  function calc() {
    const opts = si.declScope.opts
    const topLevel = opts.topLevel
    const ctx = opts.contextState
    const capt = si.closCapt
    const byVal = si.byVal
    const transform = si.declScope.opts.transform
    const effScope = si.declScope.topEff
    if (si.global || !si.track || !effScope && !capt)
      return undefined
    if (ctx)
      return ctxField
    if (!transform)
      return topLevel && capt ? ctxField : undefined
    if (byVal)
      return paramThread
    if (topLevel)
      return ctxField
    // return capt ? closureVar : undefined
    return closureVar
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

