import {Tag,symInfo,enter,leave,tok} from "./kit"
import * as Kit from "./kit"
import * as assert from "assert"
import * as Debug from "./debug"
import * as Block from "./block"
import {scope as EsScope} from "estransducers"

export const assignSymbolsDecls = EsScope.assignSymbolsDecls


/**
 * unfortunately ObjectMethod type in babylon AST doesn't fit the split 
 * pattern, as next passes want the key to remain in parent scope
 * so this pass replaces them to `{Object|Class}Property` and `FunctionExpression`
 * on restore the value is converted back
 * back to {Object|Class}Property with `restoreMethods`
 */
function methodsHack(si) {
  const s = Kit.auto(si)
  function* walk(sw,cl) {
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Tag.ClassDeclaration:
        case Tag.ClassExpression:
          yield i
          const j = s.cur()
          i.value.classId = j.pos === Tag.id && j.value.sym
          yield* walk(s.sub(),i.value)
          continue
        case Tag.ClassMethod:
        case Tag.ClassPrivateMethod:
          i.value.ref = cl
        case Tag.ObjectMethod:
          if (i.value.node.kind === "method") {
            yield s.enter(i.pos,
                          i.type === Tag.ObjectMethod
                          ? Tag.ObjectProperty
                          : Tag.ClassProperty,
                          {origType:i.type,
                           node:{computed:i.value.computed,
                                 static:i.value.static}
                          })
            const k = s.cur()
            yield* walk(s.one())
            yield s.enter(Tag.value,Tag.FunctionExpression,i.value)
            if (k.type === Tag.Identifier) {
              i.value.funcId = Kit.scope.newSym(k.value.node.name)
              i.value.origType = i.type
              yield s.tok(Tag.id,Tag.Identifier,{node:{name:k.value.node.name}})
            }
            yield* walk(s.sub())
            yield* s.leave()
            yield* s.leave()
            s.close(i)
            continue
          }
        }
      }
      yield i
    }
  }
  return walk(s)
}

/**
 * restorinng `{Object|Class}Method` from `{Object|Class}ObjectProperty` 
 * saved before using `methodsHack` 
 */
function restoreMethods(si) {
  const s = Kit.auto(si)
  function* walk(sw) {
    for(const i of sw) {
      if (i.enter
          && (i.type === Tag.ObjectProperty || i.type === Tag.ClassProperty)
          && i.value.origType != null && i.value.origType !== i.type) {
        const key = Kit.toArray(walk(s.one()))
        if (s.cur().type === Tag.FunctionExpression) {
          const f = s.take()
          if (s.cur().pos === Tag.id)
            Kit.skip(s.one())
          yield s.enter(i.pos,i.value.origType,f.value)
          yield* key
          yield* walk(s.sub())
          yield* s.leave()
          s.close(f)
          s.close(i)
          continue
        }
        yield i
        yield* key
        continue
      } else if (i.enter && !i.leave && i.type === Tag.ClassExpression) {
        yield i
        if (i.value.classId && s.cur().pos !== Tag.id)
          yield s.tok(Tag.id,Tag.Identifier,{sym:i.value.classId})
      } else
        yield i
    }
  }
  return walk(s)
}

/** 
 * adds variables generated after assignSymbolDecls into ctx 
 */
export function recalcLocals(sl) {
  const sa = Kit.toArray(sl)
  const s = Kit.auto(sa)
  const root = s.take().value
  const ctx = root.ctx
  const {locs,vars,refs} = ctx
  Kit.skip(s.untilPos(Tag.body))
  walk(vars)
  return sa
  function walk(vars,block) {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.BlockStatement:
          walk(i.value.blockVars = Object.create(vars),i.value)
          break
        case Tag.Identifier:
          const info = vars[i.value.node.name]
          if (info != null) {
            i.value.sym = info.sym
            refs.set(info.sym,info)
            if (info.root !== root) {
              (info.capt || (info.capt = new Set())).add(root)
            }
          }
          break
        case Tag.VariableDeclarator:
          for(const j of s.one()) {
            if (j.enter && j.type === Tag.Identifier && j.value.sym == null) {
              const {name} = j.value.node
              const sym = j.value.sym = Symbol(name)
              const info = {sym,name,param:false,root,block,value:i.value}
              locs.set(sym,info)
              vars[name] = info
            }
          }
          break
        }
      }
    }
  }
}

/** 
 * takes a stream of tokens and split it into an array of streams
 * with each element representing a function from the original stream
 */
export function splitScopes(si) {
  const s = Kit.auto(methodsHack(si))
  const frames = []
  frames.push([...walk(s.take())])
  return frames
  function* walk(p) {
    yield s.enter(Tag.top,p.type,p.value)
    for(const i of s.sub()) {
      if (i.enter && !i.leave && s.curLev() != null && i.value.func) {
        frames.push([...walk(i)])
        i.value.parScope = p.value
        if (!i.value.funcId)
          i.value.funcId = Kit.scope.newSym("fn")
        if (i.value.opts.wrapFunction) {          
          i.value.wrapId = i.type === Tag.FunctionExpression ? i.value.funcId
            : Kit.scope.newSym(i.value.funcId.orig)
        }
        yield s.tok(i.pos,i.type,i.value)
        continue
      }
      yield i
    }
    yield* s.leave()
    s.close(p)
  }
}

/** 
 * converts list of token streams into a single stream with all scopes 
 * unfolded in original positions
 */
export function restore(root,scopes) {
  let start
  const m = new Map()
  for(const i of scopes) {
    const value = i[0].value
    if (value === root)
      start = i
    else
      m.set(value,i)
  }
  assert.ok(start)
  return restoreMethods(walk(start,Tag.top))
  function* walk(si,pos,type) {
    const s = Kit.toArray(si)
    const first = s[0]
    if (!type)
      type = first.type
    yield Kit.enter(pos,type,first.value)
    assert.equal(s[0].pos, Tag.top)
    assert.equal(s[s.length-1].pos, Tag.top)
    assert.equal(s[s.length-1].value, s[0].value)
    for(const i of s.slice(1,s.length-1)) {
      if (i.value.func) {
        const sub = m.get(i.value)
        if (sub != null) {
          if (i.enter) {
            yield* walk(sub,i.pos,i.type)
          }
          continue
        }
      }
      yield i
    }
    yield Kit.leave(pos,type,first.value)
  }
}

/** runs `pass` for each function in `s` */
export const subScopes = Kit.curry(function(pass, s) {
  const res = []
  for(const i of splitScopes(s))
    res.push([...pass(i)])
  return restore(res)
})

const emptyMap = new Map()

/**
 * if `wrapFunction` is set for a function expression or declaration 
 * it will be wrapped with the call to runtime function with name 
 * from the argument value
 */
export function funcWraps(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const ns = root.$ns
  const mods = root.injectRT || emptyMap
  const rootDefs = mods.get(ns)
  let any = false
  return reorder(walk(s))
  function sysId(name) {
    const sym = Kit.sysId(name)
    if (rootDefs)
      rootDefs.usages.add(sym)
    return sym
  }
  function check(i) {
    if (i.value.topEff && i.value.opts.transform
        && i.value.opts.wrapFunction) {
      if (i.value.opts.topLevel)
        throw s.error(
          "NOT IMPLEMENTED: ES object model  with top level handlers",i.value)
      return true
    }
    return false
  }
  function reorder(si) {
    const s = Kit.auto(Kit.toArray(si))
    let nsFound = !root.nsImported
    return walk(s)
    function* walk(sw,subst,buf) {
      for(const i of sw) {
        if (i.enter) {
          switch(i.type) {
          case Tag.ClassDeclaration:
          case Tag.ClassExpression:
            if (i.value.wraps.length) {
              const decl = i.type === Tag.ClassDeclaration
              const lab = s.label()
              let pos = i.pos
              let sym
              let slab
              if (decl) {
                sym = s.cur().value.sym
                assert.ok(sym)
                if (i.pos !== Tag.push) {
                  yield s.enter(i.pos,Tag.BlockStatement)
                  yield s.enter(Tag.body,Tag.Array)
                  pos = Tag.push
                }
                slab = s.label()
              } else {
                yield s.enter(pos,Tag.SequenceExpression)
                yield s.enter(Tag.expressions,Tag.Array)
                slab = s.label()
              }
              for(const j of i.value.wraps) {
                if (!j.keySimple) {
                  const sym = j.key[0].value.substTempVar
                  yield s.enter(Tag.push,Tag.AssignmentExpression,
                                {node:{operator:"="}})
                  yield s.tok(Tag.left,Tag.Identifier,{sym})
                  yield* Kit.reposOne(j.key,Tag.right)
                  yield* s.leave()
                  j.key = [s.tok(Tag.property,Tag.Identifier,{sym})]
                }
              }
              if (!decl) {
                sym = i.value.wrapsTempVar
                yield s.enter(Tag.push,Tag.AssignmentExpression,
                              {node:{operator:"="}})
                yield s.tok(Tag.left,Tag.Identifier,{sym})
                pos = Tag.right
              }
              yield s.peel(Kit.setPos(i,pos))
              const nsubst = new Map()
              for(const j of i.value.wraps) {
                nsubst.set(j.wrapId, j.buf = [...function*() {
                  yield s.enter(Tag.push,Tag.MemberExpression,
                                {node:{computed:j.computed}})
                  if (j.static) {
                    yield s.tok(Tag.object,Tag.Identifier,{sym})
                  } else {
                    yield s.enter(Tag.object,Tag.MemberExpression)
                    yield s.tok(Tag.object,Tag.Identifier,{sym})
                    yield s.tok(Tag.property,Tag.Identifier,
                                {node:{name:"prototype"}})
                    yield* s.leave()
                  }
                  yield* Kit.reposOne(j.key,Tag.property)
                  yield* s.leave()
                }()])
              }
              yield* walk(s.sub(),nsubst)
              yield* slab()
              if (decl) {
                yield s.enter(Tag.push,Tag.ExpressionStatement)
                yield s.enter(Tag.expression,Tag.SequenceExpression)
                yield s.enter(Tag.expressions,Tag.Array)
              }
              for(const {name,ns,buf} of i.value.wraps) {
                yield s.enter(Tag.push,Tag.CallExpression)
                yield s.tok(Tag.callee,Tag.Identifier,{sym:sysId(name),ns})
                yield s.enter(Tag.arguments,Tag.Array)
                yield* buf
                yield* slab()
              }
              if (!decl)
                yield s.tok(Tag.push,Tag.Identifier,{sym})
              yield* lab()
              continue
            }
            break
          case Tag.ClassPrivateMethod:
          case Tag.ClassMethod:
          case Tag.ClassProperty:
          case Tag.ClassPrivateProperty:
            yield i
            const ksym = s.cur().value.substTempVar
            if (ksym) {
              yield s.tok(Tag.key,Tag.Identifier,{sym:ksym})
              Kit.skip(s.one())
            }
            continue
          case Tag.Identifier:
            let substBuf
            const {sym} = i.value
            if (sym) {
              if (subst && i.pos !== Tag.property
                  && (substBuf = subst.get(i.value.sym))) {
                yield* Kit.clone(substBuf)
              } else {
                yield* s.copy(i)
              }
              if (sym === ns && i.value.lhs) {
                const j = s.cur()
                if (!j || !j.leave || j.type !== Tag.VariableDeclarator)
                  nsFound = true
              }
              continue
            }
            break
          case Tag.Program:
            if (i.value.wraps.length) {
              const lab = s.label()
              yield s.peel(i)
              yield* s.peelTo(Tag.body)
              if (i.type === Tag.Program) {
                while(s.curLev() && !nsFound) {
                  yield* walk(s.one(),subst)
                }
                yield* i.value.wraps
                yield* walk(s.sub(),subst)
              }
              yield* lab()
              continue
            }
            break
          case Tag.BlockStatement:
            if (i.value.wraps && i.value.wraps.length) {
              const lab = s.label()
              yield s.peel(i)
              yield* s.peelTo(Tag.body)
              yield* i.value.wraps
              yield* walk(s.sub(), subst)
              yield* lab()
              continue
            }
            break
          }
        }
        yield i
      }
    }
  }
  function* walk(sw, block, classKeys, classMethods) {
    function tempVar(name, sym = Kit.scope.newSym(name)) {
      const lab = s.label()
      block.push(s.enter(Tag.push,Tag.VariableDeclaration,
                         {node:{kind:"var"}}),
                 s.enter(Tag.declarations,Tag.Array),
                 s.enter(Tag.push,Tag.VariableDeclarator),
                 s.tok(Tag.id,Tag.Identifier,{sym}))
      block.push(...lab())
      return sym
    }
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Tag.Program:
        case Tag.BlockStatement:
          yield i
          yield* walk(s.sub(), i.value.wraps = [])
          continue
        case Tag.ObjectMethod:
          if (check(i)) {
            let j
            const lab = s.label()
            yield s.peel(Kit.setType(i,Tag.ObjectProperty))
            yield* s.one()
            yield s.enter(Tag.value,Tag.CallExpression)
            yield s.tok(Tag.callee,Tag.Identifier,
                        {ns:i.value.$ns,
                         sym:sysId(i.value.opts.wrapFunction)})
            yield s.enter(Tag.arguments,Tag.Array)
            yield s.enter(Tag.push,Tag.FunctionExpression)
            yield s.tok(Tag.id,Tag.Identifier,{sym:i.value.wrapId})
            yield* walk(s.sub(),block)
            yield* lab()
            continue
          }
          break
        case Tag.ClassPrivateMethod:
        case Tag.ClassMethod:
        case Tag.ClassProperty:
        case Tag.ClassPrivateProperty:
          yield i
          let key = Kit.toArray(walk(s.one(),block))
          yield* key
          let keySimple = false
          let computed = i.value.node.computed
          switch(key[0].type) {
          case Tag.Identifier:
          case Tag.StringLiteral:
          case Tag.NumericLiteral:
          case Tag.BooleanLiteral:
            keySimple = true
            break
          case Tag.MemberExpression:
            keySimple = key[1].type === Tag.Identifier
              && key[1].value.sym === Kit.scope.SymbolSym
            break
          }
          if (!keySimple)
            classKeys.push(key)
          yield* walk(s.sub(),block)
          if (check(i) && i.value.node.kind === "method")
            classMethods.push({key,keySimple,static:i.value.node.static,
                               computed,name:i.value.opts.wrapFunction,
                               wrapId:i.value.wrapId,
                               ns:i.value.$ns})
          continue
        case Tag.ClassExpression:
        case Tag.ClassDeclaration:
          yield i
          const keys = []
          const wraps = i.value.wraps = []
          yield* walk(s.sub(),block,keys,wraps)
          if (!wraps.length)
            continue
          if (wraps.some(i => !i.keySimple)) {
            for(const j of keys)
              j[0].value.substTempVar = tempVar()
          }
          if (i.value.wraps.length && i.type === Tag.ClassExpression) {
            i.value.wrapsTempVar
              = tempVar(i.value.node.id && i.value.node.id.name)
          }
          continue
        case Tag.FunctionDeclaration:
          if (check(i) && i.value.funcId) {
            const lab = s.label()
            const wraps = [
              s.enter(Tag.push,Tag.VariableDeclaration,{node:{kind:"var"}}),
              s.enter(Tag.declarations,Tag.Array),
              s.enter(Tag.push,Tag.VariableDeclarator),
              s.tok(Tag.id,Tag.Identifier,{sym:i.value.wrapId}),
              s.enter(Tag.init,Tag.CallExpression),
              s.tok(Tag.callee,Tag.Identifier,
                    {ns:i.value.$ns,
                     sym:sysId(i.value.opts.wrapFunction)}),
              s.enter(Tag.arguments,Tag.Array),
              s.tok(Tag.push,Tag.Identifier,{sym:i.value.funcId}),
              ...lab()]
            if (i.pos === Tag.push || i.pos === Tag.declaration) {
              yield s.peel(i)
              yield* walk(s.sub())
              yield* s.leave()
              block.push(...wraps)
            } else {
              yield s.enter(i.pos,Tag.BlockStatement)
              yield s.enter(Tag.body,Tag.Array)
              yield* wraps
              yield s.peel(i)
              yield* Kit.reposOne(walk(s.sub(),block),Tag.push)
              yield* s.leave()
            }
            yield* lab()
            continue
          }
          break
        case Tag.FunctionExpression:
          if (check(i)) {
            const lab = s.label()
            yield s.enter(i.pos,Tag.CallExpression)
            yield s.tok(Tag.callee,Tag.Identifier,
                        {ns:i.value.$ns,
                         sym:sysId(i.value.opts.wrapFunction)})
            yield s.enter(Tag.arguments,Tag.Array)
            yield s.peel(Kit.setPos(i,Tag.push))
            if (s.cur().pos !== Tag.id)
              yield s.tok(Tag.id,Tag.Identifier,{sym:i.value.wrapId})
            else
              s.cur().value.sym = i.value.wrapId
            yield* walk(s.sub(),block)
            yield* lab()
            continue
          }
          break
        case Tag.ArrowFunctionExpression:
          if (check(i)) {
            const lab = s.label()
            tempVar(null,i.value.wrapId)
            yield s.enter(i.pos,Tag.AssignmentExpression,{node:{operator:"="}})
            yield s.tok(Tag.left,Tag.Identifier,{sym:i.value.wrapId})
            yield s.enter(Tag.right,Tag.CallExpression)
            yield s.tok(Tag.callee,Tag.Identifier,
                        {ns:i.value.$ns,
                         sym:sysId(i.value.opts.wrapFunction)})
            yield s.enter(Tag.arguments,Tag.Array)
            yield s.peel(Kit.setPos(i,Tag.push))
            yield* walk(s.sub(),block)
            yield* lab()
            continue
          }
          break
        }
      }
      yield i
    }
  }
}



/** 
 * if arrow function has expression, converts it into block statement 
 * with return to simplify next steps
 */
export function arrowFunToBlock(si) {
  const s = Kit.auto(si)
  return walk(s)
  function* walk(sw) {
    for(const i of sw) {
      yield i
      if (i.enter && i.type === Tag.ArrowFunctionExpression
          && i.value.node.expression && i.value.opts.transform) {
        i.value.node.expression = false
        while(s.cur().pos !== Tag.body)
          yield* walk(s.one())
        const lab = s.label()
        yield s.enter(Tag.body,Tag.BlockStatement,{decls:s.cur().value.decls})
        yield s.enter(Tag.body,Tag.Array)
        yield s.enter(Tag.push,Tag.ReturnStatement)
        yield* Kit.reposOne(walk(s.one()),Tag.argument)
        yield* lab()
      }
    }
  }
}



