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
import * as Bind from "./bind"

export const repeatId = Kit.sysId("repeat")
export const forParId = Kit.sysId("forPar")
export const forInIteratorId = Kit.sysId("forInIterator")
export const iteratorId = Kit.sysId("iterator")
export const effIteratorId = Kit.sysId("iteratorM")

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
        if (i.enter) {
          switch(i.type) {
          case Tag.ForStatement:
          case Tag.ForInStatement:
          case Tag.ForOfStatement:
          case Tag.ForAwaitStatement:
          case Tag.DoWhileStatement:
          case Tag.WhileStatement:
            const lab = s.label()
            if (i.pos !== Tag.push && i.value.eff) {
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
        if (i.enter) {
          switch(i.type) {
          case Tag.ForStatement:
          case Tag.ForInStatement:
          case Tag.ForOfStatement:
          case Tag.ForAwaitStatement:
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
              if (p.type === Tag.EmptyStatement) {
                Kit.skip(s.copy(p))
              } else {
                yield s.peel(Kit.setPos(p,Tag.push))
                yield* walk()
              }
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
                                                   eff:true,bind:true})
          yield* lab()
        } else
          yield i
      }
    }
    return walk()
  },
  Kit.completeSubst)

function forOfStmtImpl(loose, s) {
  s = Kit.auto(s)
  const all = loose || s.opts.loose
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
      yield Kit.enter(i)
      if (!i.leave) {
        yield* s.sub()
        yield s.take()
      }
      yield* val(Tag.right)
      yield* lab()
    }
  }
  let loopnum = 0
  function* walk(sw) {
    for(const i of sw) {
      if (all || i.value.eff) {
        switch(i.type) {
        case Tag.ForInStatement:
          if (loose)
            break
        case Tag.ForAwaitStatement:
        case Tag.ForOfStatement:
          yield Kit.setType(i,Tag.ForStatement)
          if (i.enter) {
            const sym = Bind.tempVarSym(s.first.value,"loop")
            sym.declBlock = sym.declLoop = i.value
            sym.hasRefs = true
            const iterVar = {sym,lhs:true,decl:true}
            const init = Kit.toArray(readLeft(sym))
            const end = s.label()
            yield* openVarDecl(iterVar,s,"var")
            yield s.enter(Tag.init,Tag.CallExpression)
            const bind = !loose
                  && i.type !== Tag.ForInStatement
                  && (i.type === Tag.ForAwaitStatement
                      || i.value.node.async
                      || s.opts.pureForOf === false)
            yield Kit.idTok(Tag.callee,
                            i.type === Tag.ForInStatement ? forInIteratorId
                            : bind ? effIteratorId
                            : iteratorId)
            yield s.enter(Tag.arguments,Tag.Array)
            const j = s.take()
            yield Kit.setPos(j,Tag.push)
            if (!i.leave) {
              yield* s.sub()
              yield Kit.setPos(s.take(),Tag.push)
            }
            yield* end()
            yield s.enter(Tag.test,Tag.UnaryExpression,{node:{operator:"!"}})
            yield s.enter(Tag.argument,Tag.MemberExpression)
            yield s.enter(Tag.object,Tag.AssignmentExpression,{node:{operator:"="}})
            yield s.tok(Tag.left,Tag.Identifier,{sym,lhs:true,rhs:false})
            yield s.enter(Tag.right,Tag.CallExpression,{bind,eff:bind})
            yield s.enter(Tag.callee,Tag.MemberExpression)
            yield s.tok(Tag.object,Tag.Identifier,{sym,lhs:false,rhs:true})
            yield s.tok(Tag.property,Tag.Identifier,{node:{name:"step"}})
            yield* s.leave()
            yield s.tok(Tag.arguments,Tag.Array)
            yield* s.leave()
            yield* s.leave()
            yield s.tok(Tag.property, Tag.Identifier, {node:{name:"done"}})
            yield* end()
            const body = s.curLev()
            assert.equal(body.pos, Tag.body)
            if (body.type === Tag.BlockStatement) {
              yield s.peel()
              yield* s.peelTo(Tag.body)
              yield* init
              yield* walk(s.sub())
            } else {
              yield s.enter(Tag.body, Tag.BlockStatement)
              yield s.enter(Tag.body, Tag.Array)
              if (body.type === Tag.EmptyStatement)
                Kit.skip(s.one())
              else {
                yield* init
                yield* Kit.reposOne(walk(s.one()), Tag.push)
              }
            }
            yield* end()
          }
          continue
        }
      }
      yield i
    }
  }
  return walk(s)
}


export const forOfStmt = (s) => forOfStmtImpl(false,s)
export const looseForOf = (s) => forOfStmtImpl(true,s)

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
                            eff:true,bind:true,jump:name})
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
            let upd = null, test = null, hasBody = false, locals
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
                  if (j.value.node.kind !== "var") {
                    locals = []
                    for(const k of sl.sub()) {
                      if (k.enter && k.type === Tag.Identifier && k.value.decl) {
                        const sym = k.value.sym
                        if (sym.closCapt && sym.byVal) {
                          const copy = Kit.scope.cloneSym(sym)
                          k.value.sym = copy
                          copy.byVal = true
                          copy.track = sym.track
                          copy.state = sym.state
                          copy.declScope.scopeDecls.add(copy)
                          k.value.node.name = undefined
                          copy.captLoop = copy.declLoop
                          Bind.setSymInterpr(copy)
                          locals.push({sym,copy})
                        }
                      }
                      yield k
                    }
                    yield* sl.leave()
                    break
                  }
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
                const llab = sl.label()
                if (locals && locals.length) {
                  const lab = sl.label()
                  yield sl.enter(Tag.push,Tag.VariableDeclaration,
                                {node:{kind:"let"}})
                  yield sl.enter(Tag.declarations,Tag.Array)
                  for(const {sym,copy} of locals) {
                    yield sl.enter(Tag.push,Tag.VariableDeclarator)
                    yield sl.tok(Tag.id,Tag.Identifier,
                                {decl:true,lhs:true,rhs:false,sym})
                    yield sl.tok(Tag.init,Tag.Identifier,
                                {decl:false,lhs:false,rhs:true,sym:copy})
                    yield* sl.leave()
                  }
                  yield* lab()
                }
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
                               {eff:true,bind:true,jump:i.value.ctrl[0]})
                }
                if (locals) {
                  yield* llab()
                  for(const {sym,copy} of locals) {
                    yield sl.enter(Tag.push, Tag.ExpressionStatement)
                    yield sl.enter(Tag.expression, Tag.AssignmentExpression,
                                   {node:{operator:"="}})
                    yield sl.tok(Tag.left,Tag.Identifier,
                                 {decl:false,lhs:true,rhs:false,sym:copy})
                    yield sl.tok(Tag.right,Tag.Identifier,
                                 {decl:false,lhs:true,rhs:false,sym})
                    yield* sl.leave()
                    yield* sl.leave()
                  }
                  locals = undefined
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
          yield sl.enter(Tag.expression,repeat,i.value)
          yield* walk()
          yield* lab()
        }
      } else
        yield i
    }
  }
  yield* walk()
}

export function interpretRepeat(s) {
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
          yield* Kit.reposOne(walk(), Tag.body)
          yield* lab()
        }
        continue
      }
      yield i
    }
  }
  return walk()
}

