import {Tag} from "../core"
import * as Kit from "../kit"
import * as Trace from "../trace"
import dump from "../dump"
import * as Scope from "../scope"
import * as RT from "../rt"

import {symbol,produce} from "../core"

const fs = require("fs")
const path = require("path")

/** calculates captured vars dependencies */
function calcClosCapt(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  const closureSym = s.first.value.closureSym = Scope.newSym("closure")
  closureSym.global = true
  const rt = s.first.value.rt
  if (!s.opts.noRT)
    rt.inlineSyms.push({syms:[closureSym],
                        content:fs.readFileSync(
                          path.join(__dirname,"closConvRT.js"),"utf-8")
                       })
  function walk(root,sw) {
    const decls = root.clDecls = []
    const sym = root.closSym
          = Scope.newSym(root.node.id && root.node.id.name || "fn")
    const closDeps = new Set()
    function id(i) {
      const si = i.value.sym
      if (si != null) {
        if (si === Scope.argumentsSym && !root.argumentsSym) {
          root.argumentsSym = Scope.newSym("args")
          return
        }
        if (i.value.decl)
          decls.push(si)
        if (si.declScope) {
          if (si.declScope !== root)  {
            (si.refScopes || (si.refScopes = new Set())).add(root)
            closDeps.add(si.declScope)
          }
        }
      }
    }
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Tag.FunctionDeclaration:
          id(s.cur())
          Kit.skip(s.one())
        case Tag.FunctionExpression:
          walk(i.value,s.sub())
          break
        case Tag.Identifier:
          id(i)
          break
        }
      }
    }
    root.closDeps = [...closDeps].sort((a,b) => a.closSym.num - b.closSym.num)
  }
  walk(s.first.value,s)
  return sa;
}

const thisSym = Scope.newSym("this", true)
const globals = Scope.newSym("g")

/** replaces function calls, to call method */
function replaceCalls(si) {
  const s = Kit.auto(si)
  s.first.value.ctxSym = globals
  function* walk(sw,decls) {
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Tag.FunctionDeclaration:
        case Tag.FunctionExpression:
          yield i
          i.value.ctxSym = thisSym
          yield* walk(s.sub(),i.value.clDecls)
          continue
        case Tag.NewExpression:
        case Tag.CallExpression:
          const j = s.curLev()
          const lab = s.label()
          const constr = i.type === Tag.NewExpression
          yield s.peel(Kit.setType(i, Tag.CallExpression))
          yield s.enter(Tag.callee,Tag.MemberExpression)
          let sym
          if (j.type === Tag.MemberExpression) {
            s.take()
            yield s.enter(Tag.object,j.type,j.value)
            const k = s.curLev()
            if (k.type === Tag.Identifier || constr) {
              yield* s.one()
              sym = k.value.sym
            } else {
              decls.push(sym = Scope.newSym("temp"))
              yield* s.template(k.pos,"=$I = $_", sym)
              yield* Kit.reposOne(walk(s.one(),decls), Tag.right)
              yield* s.leave()
            }
            yield* walk(s.one(),decls)
            yield* s.leave()
            s.close(j)
          } else {
            sym = Scope.undefinedSym
            yield* Kit.reposOne(walk(s.one()), Tag.object)
          }
          yield s.tok(Tag.property,Tag.Identifier,
                      {node:{name:constr?"constr":"call"}})
          yield* s.leave()
          yield s.peel()
          if (!constr)
            yield s.tok(Tag.push,Tag.Identifier,{sym})
          yield* walk(s.sub(),decls)
          yield* s.leave()
          yield* lab()
          continue
        }
      }
      yield i
    }
  }
  return walk(s,s.first.value.clDecls)
}

function* functToObj(si) {
  const s = Kit.auto(si)
  const hoisted = []
  const rtSym = new Scope.newSym("RT")
  const closureSym = s.first.value.closureSym
  const dpref = s.opts.closDepPrefix || ""
  const dpost = s.opts.closDepPostfix || ""
  function* walk(sw,root,blockHoisted) {
    const selfSym = root.selfSym = Scope.newSym("self")
    function* func(i,pos) {
      const sym = i.value.closSym
      yield* s.template(pos, "=new $I($_)", {funcVal:i.value}, sym)
      for(const j of i.value.closDeps) {
        if (j === root)
          yield s.tok(Tag.push,Tag.Identifier,{sym:root.ctxSym})
        else
          yield* s.toks(Tag.push,`=this.${dpref}$I${dpost}`,j.closSym)
      }
      yield* s.leave()
      const objArr = Kit.toArray(obj(i.value,sym))
      objArr[0].value.closConstr = i.value
      hoisted.push(objArr)
      s.close(i)
    }
    for(const i of sw) {
      if (i.enter) {
        switch(i.type) {
        case Tag.BlockStatement:
          yield i
          yield* s.peelTo(Tag.body)
          const hoisted = []
          const buf = Kit.toArray(walk(s.sub(),root,hoisted))
          for(const j of hoisted)
            yield* j
          yield *buf
          yield* s.leave()
          continue
        case Tag.ThisExpression:
          yield s.tok(i.pos,Tag.Identifier,{sym:selfSym})
          s.close(i)
          continue
        case Tag.VariableDeclaration:
          const vlab = s.label()
          let pos = i.pos
          if (i.pos === Tag.left) {
            const j = s.take()
            const k = s.take()
            yield s.tok(i.pos,Tag.Identifier,{sym:s.curLev().value.sym})
            Kit.skip(s.sub())
            s.close(k)
            s.close(j)
            s.close(i)
            continue
          }
          if (pos === Tag.push) {
            yield s.enter(Tag.push, Tag.ExpressionStatement)
            pos = Tag.expression
          }
          let sym
          yield s.enter(pos, Tag.SequenceExpression)
          yield s.enter(Tag.expressions, Tag.Array)
          for(const j of s.sub()) {
            if (j.enter) {
              for(const j of s.sub()) {
                const id = Kit.toArray(s.one())
                sym = id[0].value.sym
                if (s.curLev() != null) {
                  yield* s.template(Tag.push,"=$I = $_",sym)
                  yield* Kit.reposOne(walk(s.one(),root,blockHoisted), Tag.right)
                  yield* s.leave()
                }
                s.close(j)
              }
            }
          }
          yield* vlab()
          s.close(i)
          continue
        case Tag.FunctionDeclaration:
          blockHoisted.push(Kit.toArray(function*(i) {
            yield* s.template(i.pos, "$I = $_", s.curLev().value.sym)
            yield* func(i, Tag.right)
            yield* s.leave()
          }(i)))
          continue
        case Tag.FunctionExpression:
          yield* func(i, i.pos)
          continue
        }
      }
      yield i
    }
  }
  function* obj(fun,sym) {
    const lab = s.label()
    yield* s.template(Tag.push,"*function $1($_){$_} $2($1, $_)",
                      sym,closureSym)
    for(const j of fun.closDeps)
      yield s.tok(Tag.push,Tag.Identifier,{sym:j.closSym})
    yield* s.refocus()
    for(const j of fun.closDeps)
      yield* s.toks(Tag.push,`$1.${dpref}${j.closSym.name}${dpost} = $2`,
                    fun.ctxSym,j.closSym)
    yield* s.refocus()
    yield s.enter(Tag.push,Tag.FunctionExpression,fun)
    yield* walk(s.sub(),fun)
    yield* lab()
  }
  yield* Kit.fileBody(s)
  const buf = Kit.toArray(walk(s,s.first.value,hoisted))
  yield* s.toks(Tag.push,"var $I = {}",s.first.value.ctxSym)
  for(const i of hoisted)
    yield* i
  yield* buf
  yield* s
}

function substIds(si) {
  const s = Kit.auto(si)
  const vpref = s.opts.closVarPrefix || ""
  const vpost = s.opts.closVarPostfix || ""
  const dpref = s.opts.closDepPrefix || ""
  const dpost = s.opts.closDepPostfix || ""
  function* emitDecls({clDecls:decls,argumentsSym,ctxSym}) {
    const locs = []
    const params = []
    for(const i of decls) {
      if (i.param) {
        if (i.refScopes)
          params.push(i)
      } else if (!i.refScopes)
        locs.push(i)
    }
    yield* s.till(i => i.pos === Tag.body && i.type === Tag.Array)
    const lab = s.label()
    if (locs.length || argumentsSym) {
      yield s.enter(Tag.push,Tag.VariableDeclaration,{node:{kind:"var"}})
      yield s.enter(Tag.declarations,Tag.Array)
      if (argumentsSym) {
        yield s.enter(Tag.push,Tag.VariableDeclarator)
        yield s.tok(Tag.id,Tag.Identifier,{sym:argumentsSym})
        yield* s.toks(Tag.init,"=Array.from(arguments).slice(1)")
        yield* s.leave()
      }
      for(const sym of locs) {
        yield s.enter(Tag.push,Tag.VariableDeclarator)
        yield s.tok(Tag.id,Tag.Identifier,{sym})
        yield* s.leave()
      }
      yield* lab()
    }
    if (params.length) {
      yield s.enter(Tag.push,Tag.ExpressionStatement)
      yield s.enter(Tag.expression,Tag.SequenceExpression)
      yield s.enter(Tag.expressions, Tag.Array)
      for(const i of params)
        yield* s.toks(Tag.push, `=$1.${vpref}${i.name}${vpost} = $2`, ctxSym, i)
      yield* lab()
    }
  }
  function* walk(root) {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.FunctionExpression:
          yield i
          yield* s.till(i => i.pos === Tag.params)
          yield s.tok(Tag.push,Tag.Identifier,{sym:i.value.selfSym})
          yield* emitDecls(i.value)
          yield* walk(i.value)
          continue
        case Tag.File:
          yield i
          yield* emitDecls(i.value)
          continue
        case Tag.Identifier:
          const {sym} = i.value
          if (sym && i.pos !== Tag.property) {
            if (sym === Scope.argumentsSym) {
              i.value.sym = root.argumentsSym
            } else if (sym.refScopes) {
              if (root === sym.declScope)
                yield* s.toks(i.pos,`=$I.${vpref}${sym.name}${vpost}`,root.ctxSym)
              else
                yield* s.toks(i.pos,
                              `=$I.${dpref}${sym.declScope.closSym.name}${dpost}.${vpref}${sym.name}${vpost}`,
                              root.ctxSym)
              s.close(i)
              continue
            }
          }
          break
        }
      }
      yield i
    }
  }
  return walk(s.first.value)
}

export default Kit.pipe(
  Scope.prepare,
  RT.init,
  calcClosCapt,
  replaceCalls,
  functToObj,
  Kit.toArray,
  substIds,
  RT.inline,
  Scope.resolve)
