import * as Kit from "./kit"
import {Tag,TypeInfo as TI,symbol,enter,leave,
        tok,resetFieldInfo,symInfo} from "./core"
import * as assert from "assert"
import * as Trace from "./trace"

let symNum = 0
let curSymId = 0

symInfo(Tag.ClassDeclaration).funDecl = true
symInfo(Tag.FunctionDeclaration).funDecl = true

// String -> Sym
export function newSym(name, strict = false, decl) {
  if (!name)
    name = ""
  return { name,
           orig: name,
           id: `${name}_${curSymId++}`,
           strict,
           decl,
           num: symNum++,
           type:null}
}

/** `sort` comparator */
function byNum(a, b) { return a.num - b.num }

export const undefinedSym = newSym("undefined", true)
export const argumentsSym = newSym("arguments", true)
export const ObjectSym = newSym("Object", true)
export const ArraySym = newSym("Array", true)
export const SymbolSym = newSym("Symbol", true)

const globals = new Map([["undefined",undefinedSym],
                         ["arguments",argumentsSym],
                         ["Object",ObjectSym],
                         ["Array",ArraySym],
                         ["Symbol",SymbolSym]])

/**
 * sets temporal `node.name` for each Identifier for debug dumps outputs
 */
export function* tempNames(s) {
  for(const i of s) {
    if (i.enter && i.type === Tag.Identifier
        && i.value.sym != null
        && !i.value.node.name) {
      i.value.node.name = i.value.sym.strict
        ? i.value.sym.name
        : i.value.sym.id 
    }
    yield i
  }
}

/**
 * resets symbols decl map for resolving names
 * for new identifiers from transform passes,
 * the transform pass has to use sym field to identifier 
 * symbols in `Identifier` nodes
 */
export const resetSym = Kit.pipe(
  resetFieldInfo,
  function resetSym(si) {
    const sa = Kit.toArray(si)
    const s = Kit.auto(sa)
    function id(i, blockScope) {
      const {sym} = i
      if (sym != null) {
        if (i.decl == null) {
          const fi = i.fieldInfo
          i.decl = fi.declVar
        }
        if (sym.orig != null)
          sym.name = sym.orig
        if (i.node.name == null)
          i.node.name = sym.name
        if (i.decl && blockScope != null)
          blockScope.add(sym)
      }
    }
    function walk(sw,blockScope) {
      for(const i of sw) {
        if (i.enter) {
          switch(i.type) {
          case Tag.JSXIdentifier:
            const name = i.value.node.name
            if (i.value.sym)
              id(i.value,blockScope)
            break
          case Tag.Identifier:
            id(i.value,blockScope)
            break
          case Tag.FunctionDeclaration:
            const j = s.curLev()
            if (j) {
              id(j.value,blockScope)
              Kit.skip(s.one())
            }
          case Tag.FunctionExpression:
          case Tag.ObjectMethod:
          case Tag.ClassMethod:
          case Tag.ArrowFunctionExpression:
            // parameters must be added to body's scope
            const nscope = new Set()
            for(let j; (j = s.curLev()) != null;) {
              if (j.pos === Tag.body) {
                s.take()
                walk(s.sub(), j.value.decls = nscope)
              } else {
                walk(s.one(), nscope)
              }
            }
            break
          case Tag.Program:
          case Tag.BlockStatement:
          case Tag.SwitchStatement:
          case Tag.CatchClause:
          case Tag.ForStatement:
          case Tag.ForInStatement:
          case Tag.ForAwaitStatement:
          case Tag.ForOfStatement:
            walk(i.value.decls = new Set())
            break
          }
        }
      }
    }
    walk(s)
    return sa
  })

/** puts init field before id in VariableDeclarator and for-of, for-in */
function reorderVarDecl(si) {
  const s = Kit.auto(si)
  function* walk(sw) {
    for(const i of sw) {
      yield i
      if (i.enter) {
        switch(i.type) {
        case Tag.VariableDeclarator:
          if (i.value.node.kind !== "var") {
            const id = [...walk(s.one())]
            if (s.curLev() != null) {
              assert.equal(s.curLev().pos,Tag.init)
              yield* walk(s.one())
            }
            yield* id
          }
          break
        case Tag.AssignmentPattern:
          const left = [...walk(s.one())]
          yield* s.one()
          yield* left
          break
        case Tag.ForAwaitStatement:
        case Tag.ForOfStatement:
        case Tag.ForInStatement:
          const j = s.curLev()
          if (j.type === Tag.VariableDeclaration) {
            const left = [...walk(s.one())]
            yield* s.one()
            yield* left
          }
          break
        }
      }
    }
  }
  return walk(s)
}

export function cloneSym(sym) {
  const res = newSym(sym.orig)
  res.declScope = sym.declScope
  res.declLoop = sym.declLoop
  res.captLoop = sym.captLoop
  res.declBlock = sym.declBlock
  res.decl = sym.decl
  res.param = sym.param
  return res
}

/**
 * assigns unique Symbol object for each variable declaration and usage
 * stores it in sym fields, for root value stores map syms mapping the
 * sym object to a SymbolInfo structure
 * 
 *     interface Sym {
 *       name: String;
 *       orig: String;
 *       num: number;
 *       sym: Symbol;
 *       unordered: boolean;
 *       declScope: TokenValue;
 *       declLoop?: TokenValue; -- loop scope
 *       captLoop?: TokenValue; -- loop to be captured in
 *       declBlock?: TokenValue;
 *       decl?: TokenValue;
 *       param?: TokenValue;
 *     }
 * 
 * for each identifier referening variable:
 *
 *     type Value = Value & {sym:Sym,decl?:true} 
 *                        & {decls?:Map<string,Sym>}
 *                        & {root?:boolean}
 * 
 */
export const assignSym = Kit.pipe(
  resetFieldInfo,
  Kit.toArray,
  // collecting each declaration in each block before resolving
  // because function's may use the ones declared after
  function collectDecls(si) {
    const sa = Kit.toArray(si)
    const s = Kit.auto(sa)
    const report = s.first.type === Tag.File && !s.first.value.scopeDone
    s.first.value.scopeDone = true
    function _collectDecls(func,block,funcSyms,funcVars,blockSyms,loop) {
      function checkScope(val,syms) {
        // checking the scope only the first time
        if (report) {
          const m = new Map()
          for(const i of syms) {
            if (!i.strict || i.func || i.unordered || i.declScope == null)
              continue
            let l = m.get(i.orig)
            if (l == null)
              m.set(i.orig,l = [])
            l.push(i)
          }
          for(const i of m.values()) {
            if (i.length > 1) {
              throw s.error(`Identifier ${i[0].orig} has already been declared`,
                            i[i.length-1].decl)
            }
          }
        }
        val.decls = new Set(syms)
      }
      function pat(sw,param,params,unordered,nextSyms) {
        for(const k of sw) {
          if (k.enter) {
            // TODO: make it stronger
            if (k.pos === Tag.key) {
              if (s.curLev())
                _collectDecls(func,block,funcSyms,funcVars,blockSyms,loop)
              continue
            }
            switch(k.type) {
            case Tag.Identifier:
              if (!k.value.fieldInfo.declVar)
                break
              const sym = id(k,nextSyms,unordered,loop)
              if (sym && params) {
                params.push(sym)
                sym.param = param
              }
              break
            case Tag.AssignmentPattern:
              pat(s.one(),param,params,unordered,nextSyms)
              _collectDecls(func,block,funcSyms,funcVars,blockSyms,loop)
              break
            }
          }
        }
      }
      function id(i,syms,unordered,loop) {
        const fi = i.value.fieldInfo
        if (fi.declVar) {
          i.value.decl = true
          let {node:{name},sym} = i.value
          if (sym != null)
            name = sym.orig
          else {
            if (unordered && name && name.length)
              sym = i.value.sym = funcVars.get(name)
            if (!sym)
              sym = i.value.sym = newSym(name,true,i.value)
          }
          if (unordered)
            funcVars.set(name,sym)
          syms.push(sym)
          sym.unordered = unordered
          sym.declScope = func
          sym.declBlock = block
          sym.captLoop = sym.declLoop = unordered ? null : loop
          sym.param = null
          sym.func = null
          sym.decl = i
          return sym
        } else if (fi.expr || fi.lval) {
          i.value.decl = false
        }
        return null
      }
      for(const i of s.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Tag.ThisExpression:
            break
          case Tag.ForStatement:
            {
              const nextSyms = []
              const ini = s.cur()
              if (ini.pos === Tag.init
                  && ini.type === Tag.VariableDeclaration
                  && ini.value.node.kind !== "var") {
                s.take()
                _collectDecls(func,i.value,funcSyms,funcVars,nextSyms,loop)
                for(const j of nextSyms)
                  j.captLoop = i.value
                s.close(ini)
              }
              _collectDecls(func,i.value,funcSyms,funcVars,nextSyms,i.value)
              checkScope(i.value,nextSyms)
            }
            break
          case Tag.ForInStatement:
          case Tag.ForAwaitStatement:
          case Tag.ForOfStatement:
            {
              const nextSyms = []
              _collectDecls(func,i.value,funcSyms,funcVars,nextSyms,i.value)
              checkScope(i.value,nextSyms)
            }
            break
          case Tag.BlockStatement:
          case Tag.SwitchStatement:
            {
              const nextSyms = []
              _collectDecls(func,i.value,funcSyms,funcVars || new Map(),
                            nextSyms,loop)
              checkScope(i.value,nextSyms)
            }
            break
          case Tag.ArrowFunctionExpression:
            if (!i.leave && s.curLev()) {
              const nextSyms = []
              assert.ok(s.cur().pos, Tag.params)
              const params = []
              for(const j of s.one()) {
                if (j.enter)
                  pat(s.sub(),i.value,params,false,nextSyms)
              }
              const block = s.cur()
              for(const k of params) {
                k.declScope = i.value
                k.declBlock = block.value
              }
              if (block.type === Tag.BlockStatement)
                s.take()
              _collectDecls(i.value,block.value,nextSyms,new Map(),nextSyms)
              i.value.body = block.value
              i.value.paramSyms = params
              i.value.parScope = func
              checkScope(block.value,nextSyms)
              if (block.type === Tag.BlockStatement)
                s.close(block)
              s.close(i)
            }
            break
          case Tag.ClassMethod:
          case Tag.ObjectMethod:
            const k = s.take()
            assert.equal(k.pos, Tag.key)
            if (!k.leave) {
              _collectDecls(func,block,funcSyms,funcVars,blockSyms,loop)
              s.close(k)
            }
          case Tag.File:
          case Tag.FunctionExpression:
          case Tag.FunctionDeclaration:
            if (!i.leave && s.curLev()) {
              const nextSyms = []
              const ti = symInfo(i.type)
              let j = s.peel()
              let funcId
              if (j.pos === Tag.id) {
                const fd = ti.funDecl
                id(j,
                   fd && funcSyms != null
                   ? func.sloppy ? funcSyms : blockSyms
                   : nextSyms,
                   fd)
                assert.ok(j.value.sym)
                Kit.skip(s.one())
                Kit.skip(s.leave())
                funcId = j.value.sym
                j = s.peel()
              }
              const params = []
              if (j.pos === Tag.params) {
                pat(s.sub(),i.value,params,false,nextSyms)
                Kit.skip(s.leave())
                j = s.peel()
              }
              assert.ok(j.pos === Tag.body || j.pos === Tag.program)
              let sloppy = func && func.sloppy
              const st = j.value.node.sourceType
              if (st === "script")
                sloppy = true
              else if (st === "module")
                sloppy = false
              if (j.value.blockDirs && j.value.blockDirs.has("use strict"))
                sloppy = false
              i.value.sloppy = sloppy
              j.value.root = true
              _collectDecls(i.value,j.value,nextSyms,new Map(),nextSyms)
              for(const k of params) {
                k.declScope = i.value
                k.declBlock = j.value
              }
              if (funcId) {
                if (!ti.funDecl) {
                  funcId.declScope = i.value
                  funcId.declBlock = j.value
              }
                funcId.func = i.value
              }
              if (!i.value.funcId)
                i.value.funcId = funcId
              i.value.paramSyms = params
              i.value.parScope = func
              checkScope(j.value,nextSyms)
              Kit.skip(s.leave())
            }
            break
          case Tag.VariableDeclaration:
            const unordered = i.value.node.kind === "var"
            const dstSyms = unordered ? funcSyms : blockSyms
            for(const j of s.sub()) {
              if (j.enter && !j.leave && j.type === Tag.VariableDeclarator) {
                const k = s.curLev()
                if(k && k.pos === Tag.id)
                  pat(s.one(),null,null,unordered,dstSyms)
                _collectDecls(func,block,funcSyms,funcVars,blockSyms,loop)
              }
            }
            break
          case Tag.CatchClause:
            if (s.cur().pos === Tag.param) {
              const nextSyms = []
              pat(s.one(),null,null,undefined,nextSyms)
              _collectDecls(func,i.value,funcSyms,funcVars,nextSyms,loop)
              checkScope(i.value,nextSyms)
            }
            break
          case Tag.JSXIdentifier:
            i.value.decl = false
            break
          case Tag.Identifier:
            const fi = i.value.fieldInfo
            if (fi.declVar) {
              id(i,blockSyms,undefined,loop)
            } else if (fi.expr || fi.lval)
              i.value.decl = false
            break
          }
        }
      }
    }
    _collectDecls(s.first.value.body)
    return sa
  },
  function assignSym(si) {
    const sa = Kit.toArray(si)
    const s = Kit.auto(sa)
    const root = s.first.value
    function decls(sw,func,scope) {
      for(const i of sw) {
        if (i.enter) {
          switch(i.type) {
          case Tag.JSXIdentifier:
            const name = i.value.node.name
            if (i.pos !== Tag.property && name[0].toLowerCase() === name[0])
              break
          case Tag.Identifier:
            let {sym} = i.value
            if (i.value.decl === true) {
              if (sym.strict && (!sym.unordered || sym.funcId))
                scope.set(sym.name,sym)
            } else if (i.value.decl === false) {
              if (sym == null) {
                const {name} = i.value.node
                let sym = scope.get(name)
                if (sym == null) {
                  let undef = globals.get(name)
                  if (undef == null) {
                    globals.set(name,undef = newSym(name,true,i.value))
                    undef.num = -1
                    undef.unordered = false
                    undef.declScope = null
                  }
                  i.value.sym = undef
                  break
                }
                i.value.sym = sym
              }
            }
            break
          case Tag.Program:
          case Tag.BlockStatement:
          case Tag.SwitchStatement:
          case Tag.CatchClause:
          case Tag.ForStatement:
          case Tag.ForInStatement:
          case Tag.ForAwaitStatement:
          case Tag.ForOfStatement:
            const bscope = new Map(scope)
            if (i.value.decls) {
              for(const sym of i.value.decls) {
                if (sym.strict)
                bscope.set(sym.name,sym)
              }
            }
            decls(s.sub(),func,bscope)
            break
          case Tag.ObjectMethod:
            decls(s.one(),func,scope)
          case Tag.ArrowFunctionExpression:
          case Tag.FunctionExpression:
          case Tag.File:
          case Tag.FunctionDeclaration:
          case Tag.ClassMethod:
          case Tag.ClassPrivateMethod:
            decls(s.sub(),i.value,new Map(scope))
            break
          }
        }
      }
    }
    decls(s,s.first.value,new Map(),new Map())
    return sa
  })

/** assigns field `body` for each function pointing to its `Tag.body` value */
export function assignBody(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  for(const i of s) {
    if (i.enter) {
      switch(i.type) {
      case Tag.FunctionDeclaration:
      case Tag.Program:
      case Tag.FunctionExpression:
      case Tag.ObjectMethod:
      case Tag.ClassMethod:
      case Tag.ClassPrivateMethod:
      case Tag.ArrowFunctionExpression:
        for(const j of s) {
          if (j.enter && j.pos === Tag.body) {
            i.value.body = j.value
            break
          }
        }
      }
    }
  }
  return sa
}

/** 
 * for each variable sets its usages scope (list of functions where the 
 * variable is used except declaration function)
 * 
 *     type Sym = Sym & { refScopes: Set<TokenValue> }
 */
export function calcRefScopes(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  function scope(root) {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.FunctionDeclaration:
          Kit.skip(s.one())
        case Tag.FunctionExpression:
        case Tag.ObjectMethod:
        case Tag.ClassMethod:
        case Tag.ClassPrivateMethod:
        case Tag.ArrowFunctionExpression:
          scope(i.value)
          break
        case Tag.Identifier:
          const si = i.value.sym
          if (si != null && si.declScope !== root)
            (si.refScopes || (si.refScopes = new Set())).add(root)
        }
      }
    }
  }
  scope(s.first.value)
  return sa
}

/** 
 * for each block calculates a set of variables referenced in it 
 *
 *    type Value = Value * { varRefs?: Set<Sym> }
 */
function calcBlockRefs(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  function walk(totDecls) {
    const use = new Set()
    for(const i of s.sub()) {
      if (i.enter) {
        if (i.value.decls != null && !i.leave) {
          const decls = new Set(i.value.decls)
          const nextDecls = new Set(totDecls)
          decls.forEach(nextDecls.add,nextDecls)
          const used = walk(nextDecls)
          const cur = i.value.varRefs = new Set()
          for(const j of decls)
            cur.add(j)
          for(const j of used) {
            cur.add(j)
            if (!decls.has(j))
              use.add(j)
          }
        }
        if (i.type === Tag.Identifier
            && i.value.sym != null
            && i.value.decl === false) {
          use.add(i.value.sym)
        }
      }
    }
    return use
  }
  walk(new Set())
  return sa
}

const nameOpts = ["a","b","c","d","e","f","g","h","k","m","n","x","y","z"]

function namePos(n,pos) {
  if (!n.length) {
    const len = nameOpts.length
    if (pos < len)
      return nameOpts[pos]
    return `${nameOpts[pos % len]}${Math.floor(pos / len)}`
  }
  if (n[n.length-1] === "_")
    return n + (pos+1)
  if (pos === 0) {
    return reserved.get(n) || n
  }
  if (pos === 1)
    return "_" + n
  return `${n}${pos-1}`
}

const reserved = new Map([["arguments","args"]])

/** 
 * after adding some names, there may be some naming conflicts
 * this pass resolves them by looking for same name but different symbols ids
 * and renaming them accordingly
 */
function solve(si) {
  const sa = Kit.toArray(si)
  const root = sa[0].value
  const allIds = new Set()
  const idToks = []
  const decls = new Set()
  const scopes = []
  for(const i of sa) {
    if (i.enter) {
      if (i.value.varRefs != null)
        scopes.push(i.value)
      if (i.type === Tag.Identifier && i.value.sym) {
        if (i.value.decl)
          decls.add(i.value.sym)
        idToks.push(i.value)
      }
    }
  }
  // each block where name is used
  // Map<string,Set<BlockValue>>
  const namesStore = new Map()
  // each block where Sym is referred
  // Map<Sym,Set<BlockValue>>
  const symsStore = new Map()
  // blocks with symbol names conflicts
  // Map<string,{syms:Sym[],block:BlockValue}[]>
  const conflicts = new Map()
  for(const i of scopes) {
    const names = new Map()
    for(const j of i.varRefs) {
      allIds.add(j)
      Kit.mapAdd(symsStore,j,i)
      // if ((j.hasDecl = decls.has(j))) {
      j.hasDecl = decls.has(j)
      Kit.mapPush(names,j.orig,j)
      // }
    }
    for(const [name,syms] of names) {
      if (syms.length > 1 || !name.length || reserved.has(name))
        Kit.mapPush(conflicts,name,{syms,block:i})
    }
  }
  for(const j of allIds) {
    j.name = j.orig
  }
  if (conflicts.size) {
    const table = []
    for(const [name,i] of conflicts) {
      const allSyms = new Set()
      const cur = {name,syms:allSyms,rawSets:[]}
      table.push(cur)
      for(const {syms} of i) {
        cur.rawSets.push(syms)
        syms.forEach(allSyms.add,allSyms)
      }
      for(const j of allSyms)
        j.name = null
    }
    for(const i of allIds) {
      if (i.name) {
        let cur = namesStore.get(i.name)
        if (!cur)
          namesStore.set(i.name,cur = new Set())
        symsStore.get(i).forEach(cur.add,cur)
      }
    }
    for(const {name,rawSets} of table) {
      for(const tup of rawSets) {
        tup.sort(byNum)
        let pos = 0
        tup: for(const i of tup) {
          if (i.name != null)
            continue
          let result = i.orig
          let nameScopes
          const symScopes = symsStore.get(i)
	  if (i.hasDecl) {
            lookup: for(;;) {
              result = namePos(name,pos++)
              nameScopes = namesStore.get(result)
              if (!nameScopes)
		break
              for(const j of symScopes) {
		if (nameScopes.has(j))
                  continue lookup
              }
              break
            }
	  }
          if (!nameScopes)
            namesStore.set(result, nameScopes = new Set())
          symScopes.forEach(nameScopes.add,nameScopes)
          i.name = result
        }
      }
    }
  }
  for(const j of allIds) {
    if (!j.hasDecl && !j.strict && !j.global) {
      j.name = `${j.name}_UNDECL_${j.num}`
      console.warn(
        `INTERNAL ERROR: not declared generated symbol name ${j.name}`)
    }
  }  
  for(const i of idToks) {
    if (!i.sym.name) {
      i.sym.name = `UNKNOWN_${i.sym.id}`
      console.warn(
        `INTERNAL ERROR: not resolved symbol name ${i.sym.name}`)
    }
    i.node.name = i.sym.name || (i.sym.name = i.sym.orig)
  }
  return sa
}
  
export const prepare = Kit.pipe(collectBlockDirectives,assignSym)

export const reset = assignSym

export const resolve = Kit.pipe(
  reset,
  calcBlockRefs,
  replaceUndefined,
  solve)

/** emits `void 0` at `pos` */
export function* emitUndefined(pos) {
  assert.ok(pos)
  const value = {node:{operator:"void",prefix:true}}
  yield enter(pos,Tag.UnaryExpression,value)
  yield tok(Tag.argument,Tag.NumericLiteral,{node:{value:"0"}})
  yield leave(pos,Tag.UnaryExpression,value)
}

/** replaces `undefined` -> `void 0` for generated `undefined` */
export function* replaceUndefined(s) {
  let p
  for(const i of s) {
    if (i.type === Tag.Identifier
        && i.value.sym === undefinedSym
        && !i.value.node.loc) {
      if (p && i.pos === Tag.argument) {
        switch(p.type) {
        case Tag.ReturnStatement:
        case Tag.YieldExpression:
          i.value.node.argument = null
          continue
        }
      }
      if (i.enter)
        yield* emitUndefined(i.pos)
      continue
    }
    yield (p = i)
  }
}

export const tempVar = symbol("tempVar")

export function* emitTempVar() {
  const sym = newSym("_temp")
  yield tok(tempVar,tempVar,{sym})
  return sym
}

/** emit `var` declarations for each `tempVar` */
export const resolveTempVars = Kit.pipe(
  function collectTempVars(si) {
    const s = Kit.auto(si)
    function* walk(b) {
      for(const i of s.sub()){
        if (i.enter) {
          switch(i.type) {
          case Tag.BlockStatement:
          case Tag.Program:
            yield i
            walk(i.value.tempVars = [])
            continue
          case tempVar:
            b.push(i.value.sym)
            s.close(i)
            continue
          }
        }
        yield i
      }
    }
    return walk([])
  },
  Kit.toArray,
  function* emplaceTempVars(si) {
    const s = Kit.auto(si)
    for(const i of s) {
      yield i
      if (i.enter) {
        switch(i.type) {
        case Tag.BlockStatement:
        case Tag.Program:
          if (i.value.tempVars && i.value.tempVars.length) {
            const lab = s.label()
            yield* s.peelTo(Tag.body)
            yield s.enter(Tag.push,Tag.VariableDeclaration,{node:{kind:"var"}})
            yield s.enter(Tag.declarations, Tag.Array)
            for(const sym of i.value.tempVars) {
              yield s.enter(Tag.push, Tag.VariableDeclarator)
              yield s.tok(Tag.id, Tag.Identifier, {sym})
              yield* s.leave()
            }
            yield* lab()
          }
        }
      }
    }
  })


/** collects JS directives (strings in beginnigs of the block),
 *  to block's blockDirs field 
 */
export function collectBlockDirectives(si) {
  const sa = Kit.toArray(si)
  const s = Kit.auto(sa)
  _collectDirectives()
  return sa
  function _collectDirectives(dirs)  {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.Program:
        case Tag.BlockStatement:
          _collectDirectives(i.value.blockDirs = new Set())
          break
        case Tag.DirectiveLiteral:
          dirs.add(i.value.node.value)
          break
        case Tag.ExpressionStatement:
          if (s.cur().type === Tag.StringLiteral)
            dirs.add(i,s.cur().value.node.value)
          break
        }
      }
    }
  }
}
