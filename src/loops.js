import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,symbol} from "estransducers"
import * as T from "babel-types"
import * as assert from "assert"
import {openVarDecl,openBlock,peelBlockFrom} from "./kit/snippets"
import * as Debug from "./debug"
import {recalcEff} from "./propagate"
import * as Block from "./block"
import * as Ctrl from "./control"
import * as Trace from "estransducers/trace"

export const repeatId = Kit.sysId("repeat")
export const forParId = Kit.sysId("forPar")
export const forInIteratorId = Kit.sysId("forInIterator")
export const iteratorId = Kit.sysId("iterator")

/**
 * convers all kind of loops into `for` loops
 */
export function* whileStmt(s) {
  for(const i of s)
    yield i.type === Tag.WhileStatement && i.value.eff
          ? Kit.setType(i,Tag.ForStatement)
          : i
}

export const toBlocks = R.pipe(
  function toBlocksOuter(s) {
    s = Kit.auto(s)
    function* walk() {
      for(const i of s.sub()) {
        if (i.enter && i.value.eff) {
          switch(i.type) {
          case Tag.ForStatement:
          case Tag.ForInStatement:
          case Tag.ForOfStatement:
          case Tag.DoWhileStatement:
          case Tag.WhileStatement:
            const lab = s.label()
            if (i.pos !== Tag.push) {
              yield s.enter(i.pos,Tag.BlockStatement)
              yield s.enter(Tag.body,Tag.Array)
              yield s.peel(Kit.setPos(i,Tag.push))
            } else
              yield s.peel(i)
            yield* walk()
            yield* lab()
            continue
          }
        }
        yield i
      }
    }
    return walk()
  },
  function toBlocksInner(s) {
    s = Kit.auto(s)
    function* walk() {
      for(const i of s.sub()) {
        yield i
        if (i.enter && i.value.eff) {
          switch(i.type) {
          case Tag.ForStatement:
          case Tag.ForInStatement:
          case Tag.ForOfStatement:
          case Tag.DoWhileStatement:
          case Tag.WhileStatement:
            const p = yield* s.findPos(Tag.body)
            if (p == null) {
              const lab = s.label()
              yield s.enter(Tag.body,Tag.BlockStatement)
              yield s.enter(Tag.body,Tag.Array)
              yield* lab()
            } else if (p.type !== Tag.BlockStatement) {
              const lab = s.label()
              yield s.enter(Tag.body,Tag.BlockStatement)
              yield s.enter(Tag.body,Tag.Array)
              yield s.peel(Kit.setPos(p,Tag.push))
              yield* walk()
              yield* lab()
            } else
              yield p
          }
        }
      }
    }
    return walk()
  })

export const doWhileStmt = R.pipe(
  function doWhileStmt(s) {
    s = Kit.auto(s)
    function* walk() {
      for(const i of s.sub()) {
        if (i.value.eff && i.type === Tag.DoWhileStatement) {
          const lab = s.label()
          yield s.peel(Kit.setType(i,Tag.ForStatement))
          i.value.node.test = null
          const test = Array.from(s.one())
          yield s.peel()
          yield* s.peelTo(Tag.body)
          yield* walk()
          yield s.enter(Tag.push,Tag.IfStatement)
          yield s.enter(Tag.test,Tag.UnaryExpression,{node:{operator:"!"}})
          yield s.enter(Tag.argument, Kit.Subst)
          yield* test
          yield* s.leave()
          yield* s.leave()
          yield s.enter(Tag.consequent, Tag.BlockStatement)
          yield s.enter(Tag.body,Tag.Array)
          yield s.tok(Tag.push,Tag.BreakStatement,{jump:i.value.ctrl[0],
                                                   eff:i.value.eff})
          yield* lab()
        } else
          yield i
      }
    }
    return walk()
  },
  Kit.completeSubst)

export function forOfStmt(s) {
  s = Kit.auto(s)
  function* readLeft(sym) {
    function* val(pos) {
      yield s.enter(pos,Tag.MemberExpression)
      yield s.tok(Tag.object,Tag.Identifier,{sym,lhs:false,rhs:true})
      yield s.tok(Tag.property,{node:T.identifier("value")})
      yield* s.leave()
    }
    const i = s.take()
    if (i.type === Tag.VariableDeclaration) {
      yield Kit.setPos(i,Tag.push)
      i.value.stmt = true
      for(const j of s.sub()) {
        if (j.leave && j.type === Tag.VariableDeclarator)
          yield* val(Tag.init)
        yield j
      }
      yield Kit.setPos(s.take(), Tag.push)
    } else {
      const lab = s.label()
      yield s.enter(Tag.push,Tag.ExpressionStatement)
      yield s.enter(Tag.expression,Tag.AssignmentExpression,{node:{operator:"="}})
      yield Kit.enter(i) // ??
      if (!i.leave) {
        yield* s.sub()
        yield s.take()
      }
      yield* val(Tag.right)
      yield* lab()
    }
  }
  let loopnum = 0
  function* walk() {
    for(const i of s.sub()) {
      if (i.value.eff) {
        switch(i.type) {
        case Tag.ForInStatement:
        case Tag.ForOfStatement:
          yield Kit.setType(i,Tag.ForStatement)
          if (i.enter) {
            const sym = Kit.scope.newSym("loop")
            sym.declBlock = sym.declLoop = i.value
            sym.declScope = s.first.value
            sym.byVal = s.opts.state
            const iterVar = {sym,lhs:true,decl:true}
            const init = Array.from(readLeft(sym))
            const end = s.label()
            yield* openVarDecl(iterVar,s,"let")
            yield s.enter(Tag.init,Tag.CallExpression)
            yield Kit.idTok(Tag.callee,
                              i.type === Tag.ForInStatement
                              ? forInIteratorId
                              : iteratorId)
            yield s.enter(Tag.arguments,Tag.Array)
            const j = s.take()
            yield Kit.setPos(j,Tag.push)
            if (!i.leave) {
              yield* s.sub()
              yield Kit.setPos(s.take(),Tag.push)
            }
            yield* end()
            yield s.enter(Tag.test,Tag.AssignmentExpression,{node:{operator:"="}})
            yield s.tok(Tag.left,Tag.Identifier,{sym,lhs:true,rhs:false})
            yield s.enter(Tag.right,Tag.CallExpression)
            yield s.tok(Tag.callee,Tag.Identifier,{sym,lhs:false,rhs:true})
            yield s.tok(Tag.arguments,Tag.Array)
            yield* end()
            yield s.peel()
            yield* s.peelTo(Tag.body)
            //yield* peelBlockFrom(s)
            yield* init
            yield* walk()
            yield* end()
          }
          continue
        }
      }
      yield i
    }
  }
  return walk()
}

/**
 * transforms `for(init; test; upd) body` into for(;;) {...}
 */
export const normilizeFor = R.pipe(
  recalcEff,
  Ctrl.recalc,
  function removeContinue(s) {
    const sl = Kit.auto(s)
    function cntLab(n) {
      return n === "#" ? "$continue" : `${n}$continue`
    }
    function* walk() {
      for(const i of sl.sub()) {
        if (i.value.eff) {
          switch (i.type) {
          case Tag.ForStatement:
            if (i.enter && i.value.cntRefs != null && i.value.cntRefs.length) {
              const lab = sl.label()
              yield sl.peel(i)
              yield* sl.peelTo(Tag.body)
              yield* sl.peelTo(Tag.body)
              yield sl.enter(Tag.push,Tag.BlockStatement,
                             {eff:true,
                              ctrlEff:true,
                              ctrl:i.value.ctrl.map(cntLab)})
              yield sl.enter(Tag.body,Tag.Array)
              yield* walk()
              yield* lab()
              continue
            }
            break
          case Tag.ContinueStatement:
            if (i.enter) {
              const name = cntLab(i.value.jump)
              yield sl.tok(i.pos,Tag.BreakStatement,
                           {node:{label:{type:"Identifier",name}},
                            eff:true,jump:name})
            }
            continue
          }
        }
        yield i
      }
    }
    return walk()
  },
  function normilizeFor(s) {
    const sl = Kit.auto(s)
    function* walk() {
      for(const i of sl.sub()) {
        switch(i.type) {
        case Tag.ForStatement:
          if (!i.value.eff) {
            yield i
            if (i.enter)
              yield* sl.sub()
          } else {
            assert.ok(i.enter)
            assert.equal(i.pos,Tag.push)
            let upd = null, test = null, hasBody = false
            for(const j of sl.sub()) {
              assert.ok(j.enter)
              switch(j.pos) {
              case Tag.init:
                const ilab = sl.label()
                if (j.type !== Tag.VariableDeclaration) {
                  yield sl.enter(Tag.push,Tag.ExpressionStatement)
                  yield sl.peel(Kit.setPos(j,Tag.expression))
                }
                else {
                  j.value.stmt = true
                  yield sl.peel(Kit.setPos(j,Tag.push))
                }
                yield* sl.sub()
                yield* ilab()
                break
              case Tag.test:
                test = [sl.peel(j),...sl.sub(),...sl.leave()]
                break
              case Tag.update:
                upd = [sl.peel(Kit.setPos(j,Tag.expression)),
                       ...sl.sub(),...sl.leave()]
                break
              case Tag.body:
                assert.ok(j.enter)
                assert.equal(j.type,Tag.BlockStatement)
                hasBody = true
                const blab = sl.label()
                yield sl.peel(i)
                i.value.node.init = i.value.node.test = i.value.node.update = null
                yield sl.peel(j)
                yield* sl.peelTo(Tag.body)
                if (test != null) {
                  yield sl.enter(Tag.push,Tag.IfStatement)
                  yield* test
                  yield sl.enter(Tag.consequent,Tag.BlockStatement)
                  yield sl.enter(Tag.body,Tag.Array)
                }
                yield* walk()
                if (upd != null) {
                  yield sl.enter(Tag.push,Tag.ExpressionStatement)
                  yield* upd
                  yield* sl.leave()
                }
                if (test != null) {
                  yield* sl.leave()
                  yield* sl.leave()
                  yield sl.enter(Tag.alternate,Tag.BlockStatement)
                  yield sl.enter(Tag.body,Tag.Array)
                  yield sl.tok(Tag.push,Tag.BreakStatement,
                               {eff:true,jump:i.value.ctrl[0]})
                }
                yield* blab()
                break
              default:
                assert.fail()
              }
            }
            assert.ok(hasBody)
          }
          break
        default:
          yield i
        }       
      }
    }
    return walk({})
  },
  Kit.completeSubst,
  recalcEff
)

export const repeat = symbol("repeat","ctrl")

/**
 * replaces effectful `for` nodes with repeat
 * this means that `for` should be in form `for(;;) { body; }`
 */
export function* injectRepeat(s) {
  const sl = Kit.auto(s)
  function* walk() {
    for(const i of sl.sub()) {
      if (i.type === Tag.ForStatement && i.value.eff) {
        if (i.enter) {
          const lab = sl.label()
          yield sl.enter(i.pos,Block.letStmt,{pat:[]})
          yield sl.enter(Tag.expression,repeat)
          yield* walk()
          yield* lab()
        }
      } else
        yield i
    }
  }
  yield* walk()
}

export const interpretRepeat = R.pipe(function* interpretRepeat(s) {
  const sl = Kit.auto(s)
  function* walk() {
    for(const i of sl.sub()) {
      if (i.type === repeat) {
        if (i.enter) {
          const lab = sl.label()
          yield sl.enter(i.pos, Block.effExpr)
          yield sl.enter(Tag.expression, Tag.CallExpression)
          yield Kit.idTok(Tag.callee, repeatId)
          yield sl.enter(Tag.arguments, Tag.Array)
          yield sl.enter(Tag.push, Tag.ArrowFunctionExpression,{node:{params:[]}})
          // TODO: it may be already body
          yield sl.enter(Tag.body, Kit.Subst)
          yield* walk()
          yield* lab()
        }
        continue
      }
      yield i
    }
  }
  yield* walk()
}, Kit.completeSubst)

const forPar = symbol("forPar","ctrl")

export const injectParLoop = R.pipe(
  function checkParLoop(s) {
    function tw(v) {
      return v == null || v.env == null ||
        v.env.tw == null || v.env.tw.size === 0
        ? null :  v.env.tw
    }
    const sa = Kit.toArray(s)
    const sl = Kit.auto(sa)
    function walk() {
      L1: for(const i of sl.sub()) {
        if (i.enter && i.value.eff && !i.value.unwind) {
          switch(i.type) {
          case Tag.ForStatement:
            let j = sl.curLev()
            let uvars
            if (j != null && j.pos === Tag.init) {
              Kit.skip(sl.one())
              j = sl.curLev()
            }
            if (j != null && j.pos === Tag.test) {
              Kit.skip(sl.one())
              if (j.value.eff || tw(j.value)) {
                j.value.parEnabled = false
                continue
              }
              j = sl.curLev()
            }
            if (j != null && j.pos === Tag.update) {
              Kit.skip(sl.one())
              if (j.value.eff) {
                j.value.parEnabled = false
                continue
              }
              uvars = tw(j.value)
              j = sl.curLev()
            }
            if (j != null && j.pos === Tag.body) {
              const bw = tw(j.value)
              if (bw) {
                const af = i.value.env.br
                const tr = i.value.env.tr
                for(const k of bw) {
                  if (af.has(k) || tr.has(k)) {
                    j.value.parEnabled = false
                    continue L1
                  }
                }
              }
            }
            i.value.parEnabled = true
            i.value.uvars = uvars
          }
        }
      }
    }
    walk()
    return sa
  },
  function* injectParLoop(s) {
    const sl = Kit.auto(s)
    function* walk() {
      for(const i of sl.sub()) {
        if (i.type === Tag.ForStatement && i.value.parEnabled) {          
          if (i.enter) {
            const lab = sl.label(), uvars = i.value.uvars
            yield sl.enter(i.pos,Tag.ExpressionStatement,{eff:true})
            let pos = Tag.expression
            const uvarl = [...uvars].sort()
            if (uvarl.length) {
              yield sl.enter(pos,Tag.AssignmentExpression,
                             {node:{operator:"="}})
              pos = Tag.right
              if (uvarl.length === 1)
                yield sl.tok(Tag.left,Tag.Identifier,{node:{name:uvarl[0]}})
              else {
                yield sl.enter(Tag.left,Tag.ArrayPattern)
                yield sl.enter(Tag.elements,Tag.Array)
                for(const j of uvarl)
                  yield sl.tok(Tag.push,Tag.Identifier,{node:{name:j}})
                yield* sl.leave()
                yield* sl.leave()
              }
            }
            yield sl.enter(pos,forPar,
                           {expr:true,bind:true,eff:true,
                            node:{uvars:i.value.uvars}
                           })
            for(let j;(j = sl.curLev()) != null;) {
              switch(j.pos) {
              case Tag.update:
                yield sl.tok(Tag.update,Tag.Node,
                             {node:Kit.consume(sl.one()).update})
                break
              case Tag.body:
                yield* walk()
                break
              default:
                yield* sl.one()
              }
            }
            yield* walk()
            yield* lab()
          }
          continue
        }
        yield i
      }
    }
    yield* walk()
  }
)


export const interpretParLoop = R.pipe(
  function* interpretParLoop(s) {
    const sa = Kit.toArray(s)
    const sl = Kit.auto(sa)
    function* walk() {
      for(const i of sl.sub()) {
        if (i.type === forPar) {
          if (i.enter) {
            const uvars = [...i.value.node.uvars]
            const lab = sl.label()
            uvars.sort()
            let j = sl.curLev()
            if (j != null && j.pos === Tag.init) {
              if (j.type === Block.bindPat)
                Kit.skip(sl.one())
              else {
                yield sl.enter(Tag.push,Kit.Subst)
                yield* sl.one()
                yield* lab()
              }
              j = sl.curLev()
            }
            yield sl.enter(i.pos,Tag.CallExpression)
            yield Kit.idTok(Tag.callee,forParId)
            yield sl.enter(Tag.arguments, Tag.Array)
            const alab = sl.label()
            const uvtoks = []
            for(const k of uvars)
              uvtoks.push(sl.tok(Tag.push,Tag.Identifier,{node:{name:k}}))
            const plab = sl.label()
            const uvpat = [sl.enter(Tag.params, Tag.Array)]
            if (uvars.length === 1) {
              uvpat.push(...uvtoks)
            } else {
              uvpat.push(
                sl.enter(Tag.push,Tag.ArrayPattern),
                sl.enter(Tag.elements,Tag.Array),
                ...uvtoks)
            }
            uvpat.push(...plab())
            if (uvars.length !== 1) {
              yield sl.enter(Tag.push,Tag.ArrayExpression)
              yield sl.enter(Tag.elements,Tag.Array)
            }
            yield* uvtoks
            yield* alab()
            yield sl.enter(Tag.push, Tag.ArrowFunctionExpression,
                           {node:{expression:true}})
            if (j != null && j.pos === Tag.test) {
              yield* uvpat
              yield sl.enter(Tag.body,Kit.Subst)
              yield* sl.one()
              j = sl.curLev()
            } else {
              yield sl.tok(Tag.params, Tag.Array)
              yield sl.tok(Tag.body,Tag.BooleanLiteral,{node:{value:true}})
            }
            yield* alab()
            yield sl.enter(Tag.push, Tag.ArrowFunctionExpression,
                           {node:{expression:true}})
            if (j != null && j.pos === Tag.update) {
              yield* uvpat
              yield sl.enter(Tag.body,Tag.SequenceExpression)
              yield sl.enter(Tag.expressions,Tag.Array)
              yield sl.enter(Tag.push,Kit.Subst)
              yield* sl.one()
              yield* sl.leave()
              if (uvars.length !== 1) {
                yield sl.enter(Tag.push,Tag.ArrayExpression)
                yield sl.enter(Tag.elements,Tag.Array)
              }
              yield* uvtoks
            } else {
              yield sl.tok(Tag.params, Tag.Array)
              yield sl.tok(Tag.body,Tag.NullLiteral)
            }
            yield* alab()
            const node = {}
            yield sl.enter(Tag.push, Tag.ArrowFunctionExpression,{node})
            yield* uvpat
            // TODO: it may be already body
            yield sl.enter(Tag.body,Kit.Subst)
            yield* walk()
            yield* lab()
          }
          continue
        }
        yield i
      }
    }
    yield* walk()
  },
  Kit.completeSubst)

export function blockScope(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      yield i
      if (i.enter && i.type === Tag.ForStatement
          && i.value.eff && i.value.captureRefs) {
        const argCapt = [...i.value.captureRefs]
              .filter(s => s.declBlock === s.declLoop)
              .sort((a,b) => a.num - b.num)
        const lab = s.label()
        yield* s.peelTo(Tag.body)
        yield s.peel()
        yield s.enter(Tag.push, Tag.CallExpression)
        const clab = s.label()
        const func = s.enter(Tag.callee, Tag.ArrowFunctionExpression,
                             {isLocal: true})
        yield func
        func.value.localFuncRef = func.value
        yield s.enter(Tag.params, Tag.Array)
        for (const {sym} of argCapt)
          yield s.tok(Tag.push,Tag.Identifier,{sym})
        yield* s.leave()
        yield s.enter(Tag.body,Tag.BlockStatement)
        yield s.enter(Tag.body,Tag.Array)
        yield* walk()
        yield* clab()
        yield s.enter(Tag.arguments,Tag.Array)
        for(const sym of argCapt)
          yield s.tok(Tag.push, Tag.Identifier, {sym})
        yield* lab()
      }
    }
  }
  return walk()
}
