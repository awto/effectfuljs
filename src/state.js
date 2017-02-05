import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,produce,consume,symbol} from "estransducers"
import * as T from "babel-types"
import * as assert from "assert"
const {enter,leave,tok} = Kit
import * as Block from "./block"
import * as Loop  from "./loops"
import * as Debug from "./debug"
import * as Uniq from "./uniq"
import * as Scope from "./scope"
import * as trace from "estransducers/trace"

const branched = symbol("branched")
const branch = symbol("branch")

function initEnv(opts) {
  opts = opts || {}
  return {
    // names written in by the node
    lhs: opts.lhs || new Set(),
    // names read in by the node
    rhs: opts.rhs || new Set(),
    // read by the node and its children
    tr: null,
    // written by the node and its children
    tw: null
  }
}

function getEnv(i) {
  return i.value.env || (i.value.env = initEnv())
}

function* branches(s) {
  const stack = []
  for(const i of s) {
    switch(i.pos) {
    case Tag.consequent:
    case Tag.alternate:
      let f = stack[0]
      if (i.enter) {
        if (f == null || f.l !== i.level) {
          yield enter(branched,f = {l:i.level})
          stack.unshift(f)
        }
        yield enter(branch, f)
      }
      if (i.leave)
        yield leave(branch, f)
      break
    default:
      if (i.enter) { 
        const f = stack[0]
        if (f != null && f.l >= i.level)
          yield leave(branched,stack.shift())
      }
    }
    yield i
  }
}

export const saveDecls = R.pipe(
  function* saveDecls(s) {
    const sl = Kit.auto(s)
    const top = sl.peel()
    const decls = []
    function* walk() {
      for(const i of sl.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Tag.FunctionDeclaration:
            decls.push(...sl.copy(i))
            continue
          case Tag.VariableDeclaration:
            if (i.value.node.kind !== "var")
              throw sl.error(`not implemented ${i.value.node.kind} declarations`)
            decls.push(sl.peel(Kit.setPos(i,Tag.push)))
            decls.push(sl.peel()) // declarations
            const declarators = []
            const stmt = i.pos !== Tag.init && i.pos !== Tag.left
            for(const j of sl.sub()) {
              assert.ok(j.enter)
              assert.equal(j.type,Tag.VariableDeclarator)
              decls.push(sl.peel(j))
              let id = null, hasInit = false
              let assign = false
              const asgn = []
              for(const k of sl.sub()) {
                if (k.enter) {
                  switch(k.pos) {
                  case Tag.init:
                    hasInit = true
                    decls.push(sl.tok(Tag.init,Tag.Null))
                    asgn.push(sl.peel(Kit.setPos(k,Tag.right)),
                              ...sl.sub(),
                              ...sl.leave())
                    continue
                  case Tag.id:
                    id = k.value.node
                    asgn.push(sl.tok(Tag.left,Tag.Identifier,{node:id}))
                  }
                }
                decls.push(k)
              }
              if (hasInit)
                declarators.push(asgn)
               else 
                yield sl.tok(i.pos,
                             i.pos === Tag.left && id ? {node:id} : Tag.Null)
              decls.push(...Array.from(sl.leave()))
            }
            if (declarators.length) {
              if (stmt && i.pos === Tag.push) {
                for(const k of declarators) {
                  yield sl.enter(Tag.push,Tag.ExpressionStatement)
                  yield sl.enter(Tag.expression,
                                 Tag.AssignmentExpression,
                                 {node:{operator:"="}})
                  yield* k
                  yield* sl.leave()
                  yield* sl.leave()
                }
              } else {
                const lab = sl.label()
                if (stmt)
                  yield sl.enter(i.pos,Tag.ExpressionStatement)
                let pos = stmt ? Tag.expression : i.pos
                if (declarators.length !== 1) {
                  yield sl.enter(pos,Tag.SequenceExpression)
                  yield sl.enter(Tag.expressions,Tag.Array)
                  pos = Tag.push
                }
                for(const k of declarators) {
                  yield sl.enter(pos,
                                 Tag.AssignmentExpression,
                                 {node:{operator:"="}})
                  yield* k
                  yield* sl.leave()
                }
                yield* lab()
              }
            }
            decls.push(
              ...Array.from(sl.leave()),
              ...Array.from(sl.leave()))
            continue
          }
        }
        yield i
      }
    }
    if (!top.value.topEff) {
      yield* sl.copy(top)
      return
    }
    yield top
    for(const i of sl.sub()) {
      yield i
      if (i.enter && i.type === Tag.Array && i.pos === Tag.body) {
        const after = Array.from(walk())
        top.value.decls = decls
        yield* after
      }
    }
    yield* sl.leave()
  },Kit.removeNulls,Array.from)

export function* restoreDecls(s) {
  const sl = Kit.auto(s)
  const top = sl.take()
  yield top
  if (top.value.decls) {
    for(const i of sl) {
      yield i
      if (i.enter && i.type === Tag.Array && i.pos === Tag.body) {
        yield* top.value.decls
        break
      }
    }
  }
  yield* sl
}

function* resetEnv(s) {
  for(const i of s) {
    if (i.enter)
      i.value.env = null
    yield i
  }
}

function prepareEnvSparse(s) {
  const sl = Kit.auto(resetEnv(s))
  const top = sl.cur()
  const locals = top.value.topEnv.locals
  
  function pat() {
    //TODO: ES6
    const res = new Set()
    const i = sl.cur()
    if (i.type === Tag.Identifier && !i.value.key) {
      const n = i.value.node.name
      if (locals.has(n))
        res.add(i.value.node.name)
      Kit.skip(sl.one())
    } else {
       walk()
    }
    return res
  }
  function walk() {
    for(const i of sl.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.VariableDeclarator:
          const lhs = pat()
          const pos = Kit.skip(sl.findPos(Tag.init))
          if (pos != null) 
            i.value.env = initEnv({lhs})
          break
        case Tag.UpdateExpression:
        case Tag.AssignmentExpression:
          const vs = pat()
          i.value.env = initEnv({ lhs: vs,
                                  rhs: i.value.node.operator !== "=" && vs})
          break
        case Tag.ForInStatement:
        case Tag.ForOfStatement:
          i.value.env = initEnv({lhs:pat()})
          break
        case Tag.Identifier:
          if (!i.value.key) {
            const n = i.value.node.name
            if (locals.has(n)) 
              i.value.env = initEnv({rhs:new Set([i.value.node.name])})
          }
          break
        }
      }
    }
  }
  walk()
}

function framesEnv(s) {
  const sl = Kit.auto(s)
  const top = sl.cur()
  const topEnv = top.value.topEnv
  const wr = new Set(topEnv != null && topEnv.params || [])
  return walk(null, null, wr, new Set(wr))
  //TODO: move everything to node
  function walk(rd,locwr,wr,globwr,br) {
    let locs = null
    const totw = new Set()
    for(const i of sl.sub()) {
      if (i.enter) {
        i.value.node.localWrites = i.value.node.write
          = i.value.node.read = i.value.node.save = null
      }
      switch(i.type) {
      case Block.frame:
        if (i.enter) {
          if (rd == null) {
            rd = i.value.node.read = new Set()
          }
          if (locwr == null)
            locwr = i.value.node.localWrites = new Set() 
          i.value.node.update = new Set(globwr)
        }
        if (i.leave) {
          if (wr.size) {
            assert.ok(!i.value.eff)
            i.value.node.save = new Set(wr)
            wr.clear()
          }
          rd = null
          locwr = null
        }
        break
      case Block.letStmt:
        if (i.value.eff) {
         if (i.enter) {
            i.value.node.update = new Set(globwr)
          }
          if (i.leave) {
            i.value.node.write = new Set(wr)
            wr.clear()
          }
        }
        break
      case Loop.repeat:
        if (i.enter) {
          rd = null
          const rw = i.value.node.rewrite
                = walk(null, null, new Set(), globwr)
          rw.forEach(totw.add,totw)
        }
        break
      case Tag.IfStatement:
      case Tag.ConditionalExpression:
      case Tag.SwitchStatement:
        if (i.enter && i.value.eff) {
          const rw = walk(rd,locwr,wr,globwr,true)
          rw.forEach(totw.add,totw,br)
          wr.clear()
        }
      }
      if (i.enter) {
        if (br) {
          switch(i.pos) {
          case Tag.alternate:
          case Tag.consequent:
            if (!i.leave) {
              const cw = new Set(wr)
              const cgw = new Set(globwr)
              const rw = walk(rd,locwr,cw,cgw)
              assert.equal(cw.size,0)
              rw.forEach(totw.add,totw)
            }
            break
          }
        }
        if (rd != null && i.value.env != null) {
          for(const j of i.value.env.rhs) {
            if (!wr.has(j))
              rd.add(j)
          }
          for(const j of i.value.env.lhs) {
            wr.add(j)
            locwr.add(j)
            globwr.add(j)
            totw.add(j)
          }
        }
      }
    }
    return totw
  }
}

export function varsInScope(top) {
  const {params,locals,refs,all} = top.topEnv = {params:new Set(),
                                                 locals:new Set(),
                                                 refs:new Set(),
                                                 all:new Set()}
  const opts = top.opts
  if (opts.refs != null)
    Object.keys(opts.refs).forEach(refs.add,refs)
  const ctx = top.ctx
  for(const s of ctx.refs.values()) {
    all.add(s.name)
    if (s.root === top) {
      if (s.param)
        params.add(s.name)
      if (s.capt == null) {
        locals.add(s.name)
        continue
      }
    }
    refs.add(s.name)
  }
}

export function removeUselessWrites(s) {
  const sa = Kit.toArray(s)
  const sl = Kit.auto(Kit.swap(Kit.reverse(sa)))
  function walk(cur,fork,forkCur) {
    function clean(from,i) {
      if (from != null) {
        for(const j of from) {
          if (!cur.has(j))
            from.delete(j)
          else
            cur.delete(j)
        }
        if (from.size) {
          const upd = i.value.node.update
          const copy = i.value.node.copy = new Set()
          for(const j of cur) {
            if (!from.has(j) && upd.has(j)) {
              copy.add(j)
            }
          }
        }
      }
    }
    for(const i of sl.sub()) {
      if (i.enter) {
        if (fork != null) {
          switch(i.pos) {
          case Tag.alternate:
          case Tag.consequent:
            if (!i.leave) {
              const br = new Set(fork)
              walk(br)
              br.forEach(cur.add,cur)
            }
            continue
          }
        }
        switch(i.type) {
        case Loop.repeat:
          if (i.value.env != null) {
            const {tr,tw} = i.value.env
            for(const i of tr) {
              if (tw.has(i))
                cur.add(i)
            }
          }
          continue
        case Tag.IfStatement:
        case Tag.ConditionalExpression:
        case Tag.SwitchStatement:
          const f = new Set(cur)
          cur.clear()
          walk(cur, f)
          continue
        }
      }
      if (i.leave) {
        clean(i.value.node.write,i)
        clean(i.value.node.save,i)
        if (i.value.node.read != null) {
          i.value.node.read.forEach(cur.add,cur)
        }
      }
    }
  }
  walk(new Set())
  return sa
}

export const calcStateDepsVars = R.curry(function calcStateDepsVars(sort, s) {
  const sa = Kit.toArray(s)
  const sl = Kit.auto(sa)
  function seq(fs,i,par) {
    const vars = new Map()
    const tr = new Set()
    const tw = new Set()
    let num = 0
    // i.value.depVars = vars
    while(sl.curLev() != null) {
      const i = sl.cur()
      const x = num++
      let cx = fs[x]
      if (cx == null) {
        cx = fs[x] = { f:i.value,
                       fwd:new Set(),
                       x,
                       ref: i.value }
      } else {
        assert.equal(cx.x,x)
      }
      const [r,w] = walk(sl.one(),cx)
      i.value.deps = cx
      const rs = cx.rs = new Set()
      const ws = cx.ws = new Set()
      for(const j of r) {
        let f = vars.get(j)
        if (f == null)
          vars.set(j,f = {r:new Set(),w:new Set()})
        f.r.add(cx)
        rs.add(j)
        tr.add(j)
      }
      for(const j of w) {
        let f = vars.get(j)
        if (f == null)
          vars.set(j,f = {r:new Set(),w:new Set()})
        f.w.add(cx)
        ws.add(j)
        tw.add(j)
      }
    }
    sort(vars,fs,par)
    return [tr,tw]
  }
  function walk(sw,cx) {
    const r = new Set()
    const w = new Set()
    for(const i of sw) {
      if (i.enter) {
        if (i.value.node.read)
          i.value.node.read.forEach(r.add,r)
        if (i.value.node.write)
          i.value.node.write.forEach(w.add,w)
        if (i.value.node.save)
          i.value.node.save.forEach(w.add,w)
        if (i.type === Block.chain) {
          const fs = i.value.deps || (i.value.deps = [])
          const [nr,nw] = seq(fs,i,r,w)
          if (cx != null)
            cx.sub = fs
          nr.forEach(r.add,r)
          nw.forEach(w.add,w)
        }
      }
    }
    return [r,w]
  }
  walk(sl.sub())
  return sa
})



export const calcDataFlowDeps = calcStateDepsVars(
  function sortForDataFlow(vars,fs) {
    const scope = new Map()
    for(const i of fs) {
      for(const j of i.rs) {
        const f = scope.get(j)
        if (f != null)
          f.fwd.add(i.x)
      }
      for(const j of i.ws) {
        scope.set(j,i)
      }
    }
  })

export const calcClosOptDeps = R.pipe(
  function calcLocals(s) {
    const sa = Kit.toArray(s)
    const sl = Kit.auto(sa)
    function frame(i,par) {
      const locr = i.value.node.lread = new Set(i.value.node.read)
      const locu = i.value.node.lupdate = new Set()
      const subw = i.value.node.subw = new Set()
      par.forEach(locr.delete,locr)
      for (const j of sl.sub()) {
        if (j.enter) {
          switch(j.type) {
          case Block.letStmt:
            const w = j.value.node.write
            if (w != null) {
              w.forEach(locu.add,locu)
              w.forEach(subw.add,subw)
            }
            if (!i.leave) {
              const nw = walk(new Set([...par,...subw,...locu]))
              for(const j of nw) {
                locu.delete(j)
                locr.delete(j)
                par.delete(j)
                subw.add(j)
              }
            }
            break
          case Block.frame:
            const nw = frame(j,par)
            for(const j of nw) {
              locu.delete(j)
              locr.delete(j)
              par.delete(j)
              subw.add(j)
            }
            break
          }
        }
      }
      return subw
    }
    function walk(par) {
      const ret = new Set()
      for(const i of sl.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Block.frame:
            frame(i,par).forEach(ret.add,ret)
            break
          }
        }
      }
      return ret
    }
    walk(new Set())
    return sa
  },
  calcStateDepsVars(
    function sortForClosureOpt(vars,fs) {
      const scope = new Map()
      for(const i of fs) {
        const n = i.ref.node,
              u = n.lupdate,
              r = n.lread,
              t = n.subw
        for(const j of i.rs) {
          const f = scope.get(j)
          if (f != null) {
            if (f.x !== 0)
              f.fwd.add(i.x)
          }
        }
        n.subw.forEach(scope.delete,scope)
        for(const j of u) {
          scope.set(j,i)
        }
        for(const j of r) {
          if(!scope.has(j)) {
            scope.set(j,i)
          }
        }
      }
    }))

/**
 * resets dependency in case of frame doesn't end on let
 */
export const resetFwdDepForNonBind = R.pipe(
  Block.markFrameBindsKind,
  function* resetFwdDepForNonBind(s) {
    for(const i of s) {
      if (i.enter && i.type === Block.frame
          && !i.value.bindsResult && i.value.deps != null)
        i.value.deps.fwd.clear()
      yield i
    }
  })

function agrBck(s) {
  const sl = Kit.auto(Kit.swap(Kit.reverse(s)))
  function walk(cur,br) {
    for(const i of sl.sub()) {
      if (i.enter) {
        const env = getEnv(i)
        env.br = new Set(cur)
        if (i.value.eff) {
          switch(i.type) {
          case Tag.IfStatement:
          case Tag.ConditionalExpression:
          case Tag.SwitchStatement:
            const br = new Set(cur)
            cur.clear()
            walk(br,cur)
          }
        }
        if (br) {
          switch(i.pos) {
          case Tag.consequent:
          case Tag.alternate:
            if (!i.leave) {
              const ncur = new Set(cur)
              walk(ncur,br)
              ncur.forEach(br.add,br)
            }
            continue
          }
        }
        walk(cur,br)
        env.lhs.forEach(cur.delete,cur)
        env.rhs.forEach(cur.add,cur)
      }
    }
  }
  walk(new Set())
}

function agrFwd(s) {
  const sl = Kit.auto(s)
  function walk(br,bw) {
    const r = new Set(), w = new Set()
    for(const i of sl.sub()) {
      if (i.enter) {
        const env = getEnv(i)
        const tw = env.tw = new Set(env.lhs)
        const tr = env.tr = new Set(env.rhs)
        let nr, nw
        if (!i.leave) {
          if (i.value.eff) {
            switch(i.type) {
            case Tag.IfStatement:
            case Tag.ConditionalExpression:
            case Tag.SwitchStatement:
              br = tr, bw = tw
            }
          }
          [nw,nr] = walk(br,bw)
          if (bw) {
            switch(i.pos) {
            case Tag.consequent:
            case Tag.alternate:
              nr.forEach(br.add,br)
              nw.forEach(bw.add,bw)
            }
          }
          nw.forEach(tw.add,tw)
          nr.forEach(tr.add,tr)
        }
        for(const j of tr)
          if (!w.has(j))
            r.add(j)
        tw.forEach(w.add,w)
      }
    }
    return [w,r]
  }
  walk(new Set())
}

export function aggregate(s) {
  const sa = Kit.toArray(s)
  agrFwd(sa)
  agrBck(sa)
  return sa
}

export function prepare(s) {
  const sa = Kit.toArray(s)
  varsInScope(sa[0].value)
  prepareEnvSparse(sa)
  return sa
}

export function calcState(s) {
  const sa = Kit.toArray(s)
//  varsInScope(sa)
  prepareEnvSparse(sa)
  framesEnv(sa)
  return sa
}

export function recalcState(s) {
  const sa = Kit.toArray(s)
  framesEnv(sa)
  return sa
}

export const writeState = symbol("writeState")
export const readState = symbol("readState")

export function* injectLetWrites(s) {
  const sl = Kit.auto(s)
  const uniq = Uniq.store(sl)
  function* walk() {
    for(const i of sl.sub()) {
      if (i.enter && i.type === Block.letStmt 
          && i.value.node.write != null && i.value.node.write.size) 
      {
        const lab = sl.label()
        yield sl.peel(i)
        yield sl.enter(Tag.push,Block.chain,{kind:"pseq"})
        yield tok(Tag.push,writeState,
                       {node:{w:i.value.node.write || new Set(),
                              c:i.value.node.copy || new Set()},
                        bind:true})
        //TODO: remove info
        yield sl.enter(Tag.push,Block.frame,
                       {info:{hasStmts:false,hasBind:true}})
        yield sl.enter(Tag.push,Block.letStmt,{pat:[]})
        yield* walk()
        yield* lab()
      } else if (i.enter && i.type === Block.frame
            && i.value.node.save && i.value.node.save.size)
      {
        yield sl.peel(i)
        let found = false
        const r = [
          sl.enter(Tag.push,Block.letStmt,{eff:true,pat:[]}),
          tok(Tag.expression,writeState,
              {node:{w:i.value.node.save || new Set(),
                     c:i.value.node.copy || new Set()},
               bind:true}),
          ...sl.leave()]
        for(const j of sl.sub()) {
          if (j.enter && j.type === Tag.ReturnStatement) {
            assert.equal(j.pos,Tag.push)
            assert.ok(j.value.last)
            const lab = sl.label()
            yield sl.enter(Tag.push,Tag.VariableDeclaration,{node:{kind:"var"}})
            yield sl.enter(Tag.declarations, Tag.Array)
            yield sl.enter(Tag.push,Tag.VariableDeclarator)
            const node = uniq()
            yield sl.tok(Tag.id,Tag.Identifier,{node})
            if (sl.curLev() != null) {
              const j = sl.take()
              yield sl.peel(Kit.setPos(j,Tag.init))
              yield* sl.sub()
            }
            yield* lab()
            yield sl.enter(Tag.push,Block.chain)
            yield sl.enter(Tag.push,Block.frame)
            yield* r
            r.length = 0
            yield* sl.leave()
            yield sl.enter(Tag.push,Block.frame)
            yield sl.peel(j)
            yield sl.enter(Tag.argument,Tag.Identifier,{node})
            yield* lab()
          } else
            yield j
        }
        yield* r
        yield* sl.leave()
      } else     
        yield i
    }
  }
  yield* walk()
}

// frame must be inside chain
export function* injectFrameReads(s) {
  const sl = Kit.auto(s)
  function* walk(d) {
    for(const i of sl.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Block.frame:
          const r = i.value.node.read
          if (r != null && r.size) {
            const pat = [T.objectPattern(
              [...r].map(j => 
                         T.objectProperty(T.identifier(j),
                                          T.identifier(j),
                                          false,true)))]
            const value = Kit.tagValue(Tag.push,readState,
                                       {node:{r},eff:true,bind:true,pat})
            const nd = Object.create(d)
            for(const j of r)
              nd[j] = {ref:value}
            const lab = sl.label()
            let pos = i.pos
            if (i.pos !== Tag.push || i.value.ipat && i.value.ipat.length) {
              yield sl.enter(i.pos,Block.chain)
              pos = Tag.push
            }
            yield sl.enter(Tag.push,Block.frame,
                           {info:{hasStmts:false,hasBind:true}})
            yield tok(Tag.push,readState,value)
            yield* sl.leave()
            yield sl.peel(Kit.setPos(i,Tag.push))
            yield* walk(nd)
            yield* lab()
            continue
          }
          break
        }
      }
      yield i
    }
  }
  yield* walk({})
}

export function* interpretStateOpts(s) {
  const sl = Kit.auto(s)
  const locs = getEnv(sl.cur()).locals
  for(const i of sl) {
    switch(i.type) {
    case readState:
      if (i.enter) {
        const lab = sl.label()
        yield sl.enter(i.pos,Block.letStmt,{pat:i.value.pat})
        yield sl.enter(Tag.expression,Block.effExpr)
        yield sl.enter(Tag.expression,Tag.CallExpression,{bind:true,eff:true})
        yield* Kit.packId(sl,Tag.callee,"get")
        yield sl.enter(Tag.arguments,Tag.Array)
        yield* lab()
      }
      continue
    case writeState:
      if (i.enter) {
        const lab = sl.label()
        yield sl.enter(i.pos,Block.effExpr)
        yield sl.enter(i.pos,Tag.CallExpression,{bind:true,eff:true})
        const vars = []
        const {w,c} = i.value.node
        vars.push(...w,...c)
        vars.sort()
        if (c.size) {
          yield* Kit.packId(sl,Tag.callee,"modify")
          yield sl.enter(Tag.arguments, Tag.Array)
          yield sl.enter(Tag.push,Tag.ArrowFunctionExpression,
                         {node:{
                           expression: true,
                           params:c.size
                             ? [{type:"Identifier",name:"s"}]
                             : []}})
          yield sl.enter(Tag.body,Tag.ObjectExpression)
        } else {
          yield* Kit.packId(sl,Tag.callee,"set")
          yield sl.enter(Tag.arguments, Tag.Array)
          yield sl.enter(Tag.push,Tag.ObjectExpression)
        }
        yield sl.enter(Tag.properties,Tag.Array)
        for(const j of vars) {
          yield sl.enter(Tag.push,Tag.ObjectProperty)
          yield tok(Tag.key,Tag.Identifier,{node:{name:j},key:true})
          if (c.has(j)) {
            yield sl.enter(Tag.value,Tag.MemberExpression)
            yield tok(Tag.object,Tag.Identifier,{node:{name:"s"}})
            yield tok(Tag.property,Tag.Identifier,{node:{name:j}})
            yield* sl.leave()
          } else if (w.has(j)) {
            yield tok(Tag.value,Tag.Identifier,{node:{name:j}})
          } else {
            yield tok(Tag.value,Tag.NullLiteral)
          }
          yield* sl.leave()
        }
        yield* lab()
      }
      continue
    }
    yield i
  }
}

export const injectClosureReads = R.pipe(
  function* injectClosureReads(s) {
    const sl = Kit.auto(s)
    function* walk(loc,fork) {
      for(const i of sl.sub()) {
        yield i
        if (i.enter) {
          switch(i.type) {
          case Loop.repeat:
            // if (i.enter && i.value.node.rewrite) {
            //  i.value.node.rewrite.forEach(loc.delete,loc)
            // }
            if (i.enter && i.value.env != null) {
              i.value.env.tw.forEach(loc.delete,loc)
            }
            break
          case Tag.IfStatement:
          case Tag.ConditionalExpression:
          case Tag.SwitchStatement:
            yield* walk(new Set(loc),loc)
            break
          case Block.frame:
            if (i.value.node.read && i.value.node.read.size) {
              // assert.ok(i.type,Block.frame)
              const lloc = i.value.node.localWrites || new Set()
              for(const j of i.value.node.read) {
                if (loc.has(j)) {
                  i.value.node.read.delete(j)
                  if (lloc.has(j)) {
                    const patId = {node: yield* Uniq.id(j)}
                    const lab = sl.label()
                    yield sl.enter(Tag.push,Tag.VariableDeclaration,
                                   {node:{kind:"var"}})
                    yield sl.enter(Tag.declarations,Tag.Array)
                    yield sl.enter(Tag.push,Tag.VariableDeclarator)
                    yield tok(Tag.id,Tag.Identifier,patId)
                    yield tok(Tag.init,Tag.Identifier,{node:{name:j}})
                    yield* lab()
                    yield tok(renameVar,{node:{from:j,to:patId}})
                  }
                } else {
                  yield tok(renameVar,{node:{from:j,to:false}})
                }
              }
            }
          default:
            const branch = i.pos === Tag.alternate || i.pos === Tag.consequent
            const lloc = branch ? new Set(loc) : loc
            if (i.value.node.localWrites && i.value.node.localWrites.size
                || i.value.node.read && i.value.node.read.size
                || branch) {
              const locals = new Set([...(i.value.node.localWrites || []),
                                     ...(i.value.node.read || [])])
              locals.forEach(lloc.add,lloc)
              if (!i.leave) {
                yield* walk(lloc)
              }
              if (i.value.node.localWrites)
                i.value.node.localWrites.forEach(lloc.delete,lloc)
            }
            if (branch && fork) {
              for(const j of fork) {
                if (!lloc.has(j))
                  fork.delete(j)
              }
            }
          }
        }
      }
    }
    yield* walk(new Set())
  },
  Uniq.collect)

const renameVar = symbol("renameVar")
export function* renameVarPass(s) {
  const sl = Kit.auto(s)
  function* walk(m) {
    const loc = new Map(m)
    for(const i of sl.sub()) {
      switch(i.type) {
      case Tag.Identifier:
        if (!i.value.key) {
          const t = loc.get(i.value.node.name)
          if (t) {
            if (i.enter) {
              yield tok(i.pos,t)
            }
            continue
          }
        }
        break
      case renameVar:
        if (i.enter) {
          loc.set(i.value.node.from,i.value.node.to)
        }
        continue
      case Block.chain:
        yield i
        if (i.enter) {
          yield* walk(loc)
        }
        continue
      }
      yield i
    }
  }
  yield* walk()
}

