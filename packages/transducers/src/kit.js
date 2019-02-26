import * as assert from "assert"
import {produce,consume,Tag,enter,resetFieldInfo,
        leave,tok,symbol,symInfo,typeInfo,removeNulls,isSymbol,
       } from "./core"
import * as T from "@babel/types"
import {parse as babelParse} from "@babel/parser"

const BROWSER_DEBUG = typeof window !== "undefined" && window.chrome
      || process.env.EFFECTUL_DEBUG
let _opts = {}

let leanWrap

function LeanIterator(iter) {
  this.value = void 0
  this.done = false
  this.iter = iter[Symbol.iterator]()
}

LeanIterator.prototype[Symbol.iterator] = function() { return this.iter }
LeanIterator.prototype.step = function step(v) {
  var next = this.iter.next(v)
  this.done = next.done
  this.value = next.value
  return this
}
  
if (Symbol.effectfulIterator) {
  leanWrap = function leanWrap(cont) {
    return cont[Symbol.effectfulIterator]
      ? cont[Symbol.effectfulIterator]()
      : new LeanIterator(cont)
  }
} else {
  leanWrap = function leanWrap(cont) {
    return new LeanIterator(cont)
  }
}

/** runs `fun` and reset global options after its exit */
export function optsScope(fun) {
  const save = _opts
  try {
    return fun()
  } finally {
    _opts = save
  }
}

/** returns function calling `fun` and reseting global options after exit */
export function optsScopeLift(fun) {
  return function() {
    const save = _opts
    try {
      return fun.apply(this,arguments)
    } finally {
      _opts = save
    }
  }
}

/** sets global options */
export function setOpts(opts) {
  _opts = opts
}

export function getOpts() {
  return _opts
}

const memo = new Map()

export function parse(jsCode) {
  return babelParse(jsCode,{sourceType:"module",plugins:["dynamicImport"]})
}

/**
 * parses string `s` and outuputs its token stream at `pos`
 * following prefixes are supported in the string
 *  - '=' - the string is JS expression
 *  - '*' - the string is a list of statements
 *  - '>' - variable declarator
 *  - otherwise it is considered to be a statement
 * 
 * if in the code in `s` identifier starts with `$` it has special meaning
 * if next character is:
 *  - digit - it will replaces symbol of identifier by `syms` 
 *            at the corresponding position (1 based)
 *  - `$` -   keeps only one `$`
 *  - `I` -   unshifts a symbol from `syms` and replaces the symbol of 
 *            the identifier
 */
export function* toks(pos,s,...syms) {
  if (Array.isArray(s))
    yield* clone(s)
  let value
  if (syms.length && syms[0].name == null)
    value = syms.shift()
  if (s.substr != null) {
    let r = memo.get(s)
    if (r == null) {
      let mod = null
      let js = s
      switch(s[0]) {
      case "=": // expression
      case "*": // list of statements
      case ">": // var declarator
        mod = s[0]
        js = s.slice(1)
      }
      const b = parse(js)
      assert.equal(b.type, "File")
      assert.equal(b.program.type, "Program")
      if (!mod === "*")
        assert.equal(b.program.body.length, 1)
      switch(mod) {
      case "=":
        assert.equal(b.program.body[0].type, "ExpressionStatement")
        r = b.program.body[0].expression
        break
      case ">":
        assert.equal(b.program.body[0].type, "ExpressionStatement")
        const s = b.program.body[0].expression
        assert.equal(s.type,"AssignmentExpression")
        r = T.variableDeclarator(s.left,s.right)
        break
      case "*":
        break
      default:
        r = b.program.body[0]
      }
      if (mod === "=" || mod === ">") {
      } else if (mod === "*") {
        r = b.program.body
      } else {
        r = b.program.body[0]
      }
      memo.set(s,r)
    }
    s = r
  }
  function* replace(s) {
    if (!syms.length) {
      yield* s
      return s
    }
    for(const i of s) {
      if (i.enter) {
        const {node} = i.value
        node.loc = node.start = node.end = null
        if (i.type === Tag.Identifier
            && i.value.node.name[0] === "$") {
          const {name} = node
          const rest = name.substr(1)
          switch(rest[0]) {
          case "$":
            node.name = rest
            break
          case "I":
            assert.ok(syms.length > 0)
            i.value.node.name = (i.value.sym = syms.shift()).name
            break
          default:
            if (rest.length && !isNaN(rest))
              i.value.node.name = (i.value.sym = syms[rest-1]).name
          }
        }
      }
      yield i
    }
    return s
  }
  if (Array.isArray(s)) {
    for(const i of s)
      yield* replace(clone(produce(i,pos,value)))
  } else
    yield* replace(clone(produce(s,pos,value)))
}

/** runs iterable `s` and ignores its output, returns its result */
export function skip(s) {
  let i = leanWrap(s).step()
  if (i.done)
    return i.value
  let node = i.value.node
  let pos = node && (node.loc || node._loc)
  const babel = _opts.babel
  const name = i.value.value.stageName
  if (!babel || _opts.debug || BROWSER_DEBUG) {
    for(;!(i = i.step()).done;) {}
  } else {
    try {
      for(;!(i = i.step()).done;) {
        const next = i.value.node
        if (next && (next._loc || next.loc))
          node = next
      }
    } catch(e) {
      if (!e.esNode)
        e.esNode = node
      throw e
    }
  }
  return i.value
}

/** modifies token replacing its `type` field */
export function setType(i,type) {
  return {enter:i.enter,leave:i.leave,type,pos:i.pos,value:i.value}
}

/** modifies token replacing its `pos` field */
export function setPos(i,pos) {
  return {enter:i.enter,leave:i.leave,type:i.type,pos,value:i.value}
}

/** changes position on a first level of Iterable `s` */
export function* repos(s,pos) {
  let i = leanWrap(s), level = 0
  while(!(i = i.step()).done) {
    const v = i.value
    if (v.enter)
      level++
    yield level === 1 ? setPos(v,pos) : v
    if (v.leave)
      level--
  }
  return i.value
}


/** probably faster version of `reposOne` if there is only one child */
export function* reposOne(s,pos) {
  let i = leanWrap(s).step()
  if (i.done)
    return i.value
  let p = setPos(i.value,pos)
  for(;!(i = i.step()).done;p = i.value)
    yield p
  yield setPos(p,pos)
  return i.value
}

/** same as `reposOne` but works only for arrays avoiding traversal */
export function reposOneArr(arr,pos) {
  arr[0] = setPos(arr[0],pos)
  arr[arr.length-1] = setPos(arr[arr.length-1],pos)
  return arr
}

/** token to mark inner tag position must be changed to this tag postion */
export const Subst = symbol("Subst","ctrl")

/** applied `Subst` tokens */
export function* completeSubst(s) {
  const sl = auto(s)
  function* subst(pos) {
    for(const i of sl.sub()) {
      if (i.type === Subst) {
        if (i.enter)
          yield* subst(pos)
      } else {
        yield sl.peel(setPos(i,pos))
        yield* walk()
        yield* sl.leave()
      }
    }
  }
  function* walk() {
    for(const i of sl.sub()) {
      if (i.type === Subst) {
        if (i.enter) {
          assert.ok(!i.leave)
          yield* subst(i.pos)
        }
      } else
        yield i
    }
  }
  yield* walk()
}

/** 
 * same as `Array.from` but returns `s` if it is already `Array`
 */
export function toArray(s) {
  if (Array.isArray(s))
    return s
  if (s.toArray)
    return s.toArray()
  const res = []
  result(s, res)
  return res
}

/** 
 * same as `Array.from` but outputs the array into `buf` 
 * and returns iterable result
 */
export function result(s,buf) {
  let i = leanWrap(s).step()
  if (i.done)
    return i.value
  buf.push(i.value)
  const name = i.value.value && i.value.value.stageName
  const babel = _opts.babel
  // for debugging purposes,
  // let the debugger catch the exception in browser
  if (!babel || _opts.debug || BROWSER_DEBUG) {
    for(;!(i = i.step()).done;)
      buf.push(i.value)
    return i.value
  }
  try {
    for(;!(i = i.step()).done;)
      buf.push(i.value)
  } catch(e) {
    if (e.esNode)
      throw e
    let msg = e.origMessage = e.origMessage || e.message 
    if (name)
      msg += ` during ${name}`
    let node = e.esNode || i && i.value.node // || si._last
    if (!node || !node.loc && !node._loc) {
      msg += " (the position is approximated)"
      for(const i of reverse(buf)) {
        node = i.value.node
        if (node && (node.loc || node._loc)) {
          e.esNode = node
          break
        }
      }
    } else
      e.esNode = node
    throw e
  }
  return i.value
}

/**
 * values until leaving specified level
 */
export function* tillLevel(level,s) {
  for(const i of s) {
    yield i
    if (i.leave && s.level === level)
      return
  }
}

/** to be removed */
export function* toBlockBody(s) {
  const lab = s.label()
  const i = s.cur()
  if (i.type === Tag.BlockStatement) {
    s.peel()
    skip(s.peelTo(Tag.body))
    return function*() {
      skip(lab())
    }
  } else {
    yield s.enter(Tag.push,Subst)
    return lab
  }
}

/** to be removed */
export function* inBlockBody(s,inner) {
  const lab = s.label()
  const i = s.cur()
  if (i.type !== Tag.BlockStatement) {
    yield s.enter(Tag.push,Subst)
    yield* inner
    yield* lab()
  } else {
    s.peel()
    skip(s.peelTo(Tag.body))
    yield* inner
    skip(lab())
  }
}

/** copies everything until first not-import statement */
export function* fileBody(s) {
  yield* s.till(i => i.pos === Tag.body && i.type === Tag.Array)
  while(s.cur().type === Tag.ImportDeclaration)
    yield* s.one()
}

export function hasAnnot(node,name) {
  return node.leadingComments
    && node.leadingComments.length
    && node.leadingComments.find(v => v.value.trim() === name) !== undefined
}

/** clones all tags and their `value` and `value.node` fields */
export function* clone(s) {
  const stack = []
  for(const i of s) {
    let value = null
    if (i.enter) {
      stack.push(value = Object.assign({},i.value))
      const isArray = value.isArray = i.type === Tag.Array
      if (isArray)
        value.node = value.node.concat()
      else if (value.node != null && Tag[i.type] != null) {
        value.node = Object.assign({},value.node)
        if (value.node.leadingComments != null)
          value.node.leadingComments = value.node.leadingComments.concat()
        if (value.node.trealingComments != null)
          value.node.trealingComments = value.node.trealingComments.concat()
      }
    }
    if (i.leave)
      value = stack.pop()
    yield {enter:i.enter,leave:i.leave,type:i.type,pos:i.pos,value}
  }
}

/**
 * leaves all items un-amended until (and including) an item where 
 * `pred` is true
 */
export function* till(pred, s) {
  for(const i of s) {
    yield i
    if (pred(i))
      return i
  }
  return null
}

/** 
 * copies the stream until `pred` returns true for next token 
 * the found token is not consumed
 * returns true if found
 */
export const find = curry(function* find(pred, s) {
  if (pred(s.cur()))
    return true
  for(const i of s) {
    yield i
    if (pred(s.cur()))
      return true
  }
  return false
})

export const Opts = symbol("Options")
export const UpdateOpts = symbol("MergeOptions")

/** concatenates iterables in arguments into a single iterable */
export function* concat(...args) {
  for(const i of args)
    yield* i
}

/** like `concat` but with its last argument application curried */
export function prepend(...args) {
  return function*(s) {
    for(const i of args)
      yield* i
    yield* s
  }
}

/** shares single iterator between several uses */
export function share(s) {
  let i = leanWrap(s)
  return {
    [Symbol.iterator]() { return this },
    next(v) {
      i = i.step()
      return {value:i.value,done:i.done}
    },
    take(v) {
      i = i.step()
      return i.done ? null : i.value
    }
  }
}

/** to be removed */
export const wrap = curry(function* wrap(name,f,s) {
  const si = auto(s)
  const iter = f(si)[Symbol.iterator]()
  let i
  try {
    let j
    for(;!(j = iter.next()).done;) {
      i = j.value
      yield i
    }
    return j.value
  } catch(e) {
    const babel = _opts.babel
    if (babel != null) {
      let msg = `${e.message} during ${name}`
      let node = e.esNode || i && i.value.node // || si._last
      if (!node || !node.loc && !node._loc) {
        for(const i of si) {
          node = i.value.node
          if (node && (node.loc || node._loc))
            throw babel.root.hub.file.buildCodeFrameError(node, msg)
        }
        node = babel.root.node
        e.esNode = node
      }
      throw babel.root.hub.file.buildCodeFrameError(node, msg)
    }
    throw e
  }
})

/** marks all next exceptions with `name`, eagerly consumes the former stage */
export function stage(name, s) {
  const res = toArray(s)
  res[0].value.stageName = name
  return res
}

/** to be removed */
export const checkpointLazy = curry(function* checkpointLazy(name,s) {
  const babel = _opts.babel
  const iter = s[Symbol.iterator]()
  let last, i
  try {
    for(;;) {
      const j = iter.next()
      i = j.value
      if (j.done)
        return i
      if (i.enter && i.value.node != null && i.value.node.loc != null)
        last = i.value.node
      yield i
    }
  } catch(e) {
    if (babel != null) {
      const node = e.esNode || i && i.value.node || last
            || babel.root.node
      throw babel.root.hub.file.buildCodeFrameError(
        node, `${e.message} during ${name}`)
    }
    throw e
  }
})

/** to be removed */
export const checkpoint = curry(function(name,s) {
  return [...checkpointLazy(name,s)]
})

/**
 * babel plugin visitor methods, typically to be applied only to Program node
 */
export const babelBridge = curry(function babelBridge(pass,path,state) {
  const optSave = _opts
  _opts = Object.assign({args:Object.assign({},state.opts),
                         file:Object.assign(state.file.opts),
                         babel:{root:path,state}},
                        _opts)
  if (_opts.debug || BROWSER_DEBUG) {
    pass(produce({type:"File",program:path.node}))
  } else {
    try {
      pass(produce({type:"File",program:path.node}))
    } catch(e) {
      console.log(e)
      throw path.hub.file.buildCodeFrameError(e.esNode, e.message)
    }
  }
  _opts = optSave
})

export function babelPreset(pass) {
  return {
    plugins: [
      function (t) {
        return {
          visitor:{
            Program(path,state) {
              path.skip()
              babelBridge(i => consume(pass(i)),path,state)
            }
          }
        }
      }
    ]
  }
}

export const transform = curryN(2,function transform(pass,ast,opts) {
  const optSave = _opts
  Object.assign(_opts = {},{args:{},file:{},babel:false},opts)
  try {
    return consume(pass(produce(ast))).top
  } finally {
    _opts = optSave
  }
})

/**
 * copies input stream to output and returns it as array
 */
export function* tee(s,buf) {
  if (buf == null)
    buf = []
  for(const i of s) {
    yield i
    buf.push(i)
  }
  return buf
}

export const makeExpr = symbol("makeExpr")
export const makeStmt = symbol("makeStmt")

export function makeExprPass(s) {
  s = auto(s)
  function* subst(pos) {
    const t = s.peel()
    yield s.enter(pos,t.type,t.value)
    yield* walk()
    yield* s.leave()
    skip(s.leave())
  }
  function* toExpr(pos) {
    const j = s.curLev()
    if (j == null)
      return
    if (j.type === makeExpr || j.type === makeStmt) {
      yield s.peel(j)
      yield* toExpr(pos)
      yield s.leave()
    } else {
      const ti = typeInfo(j)
      if (ti.block) {
        yield s.enter(pos,Tag.CallExpression)
        yield s.enter(Tag.callee,Tag.ArrowFunctionExpression)
        yield s.tok(Tag.params,Tag.Array)
        yield* subst(Tag.body)
        yield* s.leave()
        yield s.tok(Tag.arguments,Tag.Array)
        yield* s.leave()
      } else if (ti.stmt) {
        yield s.enter(pos,Tag.CallExpression)
        const lab = s.label()
        yield s.enter(Tag.callee,Tag.ArrowFunctionExpression)
        yield s.tok(Tag.params,Tag.Array)
        yield s.enter(Tag.body,Tag.BlockStatement)
        yield s.enter(Tag.body,Tag.Array)
        yield* subst(Tag.push)
        yield* lab()
        yield s.tok(Tag.arguments,Tag.Array)
        yield* s.leave()
      } else if (ti.expr) {
        yield* subst(pos)
      } else {
        throw new Error("internal: cannot convert to expression")
      }
    }
  }
  function* toStmt(pos) {
    const j = s.curLev()
    if (j == null)
      return
    if (j.type === makeExpr || j.type === makeStmt) {
      yield s.peel(j)
      yield* toStmt(pos)
      yield s.leave()
    } else {
      const ti = symInfo(j.type)
      if (ti.stmt || ti.block) {
        yield* subst(pos)
      } else {
        yield s.enter(pos,Tag.ExpressionStatement)
        yield* subst(Tag.expression)
        yield* s.leave()
      }
    }
  }
  function* walk(pos) {
    for(const i of s.sub()) {
      switch(i.type) {
      case makeExpr:
        if (i.enter) {
          pos = pos || i.pos
          yield* toExpr(pos)
        }
        break
      case makeStmt:
        if (i.enter) {
          pos = pos || i.pos
          yield* toStmt(pos)
        }
        break
      default:
        yield i
      }
    }
  }
  return walk()
}

/**
 * detects if there it is a block statement with only a single result, and removes it
 */
export function removeEmptyBlocks(si) {
  const s = auto(si)
  function* walk(sw) {
    for(const i of sw) {
      if (i.enter && i.type === Tag.BlockStatement) {
        const lab = s.label()
        const buf = [s.peel(i),...s.peelTo(Tag.body)]
        if (s.curLev() == null) {
          yield* buf
          yield* lab()
          continue
        }
        const fi = i.value.fieldInfo
        if (fi.expr || fi.stmt) {
          const one = [...walk(s.one())]
          if (s.curLev() != null
              || fi.expr && fi.block && typeInfo(one[0]).stmt) {
            yield* buf
            yield* one
            yield* walk(s.sub())
            yield* lab()
            continue
          }
          one[0].pos = one[one.length-1].pos = i.pos
          one[0].value.fieldInfo = fi
          yield* one
          skip(lab())
        }
        continue
      }
      yield i
    }
  }
  return walk(s)
}

function* adjustFieldTypeImpl(s) {
  s = auto(s)
  yield s.peel()
  yield* walk()
  yield* s.leave()
  function* subst(pos,i) {
    if (i.leave) {
      yield s.tok(pos,i.type,i.value)
    } else {
      yield s.peel(setPos(i,pos))
      yield* walk()
      yield* s.leave()
    }
  }
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter) {
        const fi = i.value.fieldInfo || {}, ti = typeInfo(i)
        if (i.type === Tag.Array && fi.array
            || i.type !== Tag.Array && !ti.stmt && !ti.block && !ti.expr
            || fi.stmt && ti.stmt
            || fi.expr && ti.expr
            || fi.block && ti.block
            || ti.decl && fi.decl)
        {
          yield i
          continue
        }
        if (i.type === Tag.Array) {
          if (fi.block || fi.stmt) {
            yield s.enter(i.pos,Tag.BlockStatement)
            yield* subst(Tag.body,i)
            yield* s.leave()
          } else if (fi.expr) {
            yield s.enter(i.pos,Tag.SequenceExpression)
            yield* subst(Tag.expressions,i)
            yield* s.leave()
          } else
            yield i
          continue
        }
        if (fi.block) {
          const lab = s.label()
          yield s.enter(i.pos,Tag.BlockStatement)
          yield s.enter(Tag.body,Tag.Array)
          if (ti.expr) {
            if (i.value.result) {
              yield s.enter(Tag.push,Tag.ReturnStatement)
              yield* subst(Tag.argument,i)
            } else {
              yield s.enter(Tag.push,Tag.ExpressionStatement)
              yield* subst(Tag.expression,i)
            }
          } else {
            assert.ok(ti.stmt)
            yield* subst(Tag.push,i)
          }
          yield* lab()
          continue
        }
        if (fi.stmt && ti.expr) {
          if (i.value.result) {
            yield s.enter(i.pos,Tag.ReturnStatement)
            yield* subst(Tag.argument,i)
            yield* s.leave()
          } else {
            yield s.enter(i.pos,Tag.ExpressionStatement)
            yield* subst(Tag.expression,i)
            yield* s.leave()
            }
          continue
        }
        if (fi.expr) {
          yield s.enter(i.pos,Tag.CallExpression)
          yield s.enter(Tag.callee,Tag.ArrowFunctionExpression,
                        {node:{expression:true}})
          yield s.tok(Tag.params,Tag.Array)
          if (!ti.block) {
            yield s.enter(Tag.body,Tag.BlockStatement)
            yield s.enter(Tag.body,Tag.Array)
            yield* subst(Tag.push,i)
            yield* s.leave()
            yield* s.leave()
          } else {
            yield* subst(Tag.body,i)
          }
          yield* s.leave()
          yield s.tok(Tag.arguments,Tag.Array)
          yield* s.leave()
          continue
        }
      }
      yield i
    }
  }
  return walk()
}

/**
 * for expr/stmt if field type is different to actual value assigned 
 * it tries to change the value's type
 */
export const adjustFieldType = pipe(
  resetFieldInfo,
  adjustFieldTypeImpl
)

/** like `adjustFieldType` but with some simplifications */
export const adjustFieldTypeSimple = pipe(
  resetFieldInfo,
  removeEmptyBlocks,
  adjustFieldTypeImpl
)

export function* cons(a, s) {
  yield a
  yield* s
}

/** 
 * lookahead: returns first element and a stream with same elements
 *    
 *   `Iterable<A> -> [A, Iterable<A>]`  
 */
export function la(s) {
  const i = leanWrap(s).step()
  const v = i.value
  return [v, cons(v,i)]
}

/** 
 * runs `fn` passing `value.opts` of the stream's first output
 * if its resulting value is positive applies it to the original
 * stream or returns it unchanged
 *
 *     (Opts -> Toks?) -> Toks -> Toks
 */ 
export const select = curry(function select(fn,s) {
  const [h, sn] = la(s)
  const pass = fn(h.value.opts)
  return pass ? pass(sn) : sn
})

/** 
 * if `pred` returns true on `opts` field of some first element
 * wraps transforms `s` using `pass` otherwise returns s unchanged
 *
 *     (Value -> boolean) -> (Toks -> Toks) -> (Toks -> Toks)? -> Toks -> Toks
 */
export const enableIf = curryN(2,function enableIf(pred,t,e,s) {
  if (s == null) {
    if (e != null && typeof e !== "function") {
      s = e
      e = i => i
    }
  }
  if (e == null)
    e = i => i
  const f = function(s) {
    const [h, sn] = la(s)
    if (!h.value.opts)
      h.value.opts = _opts
    return pred(h.value) ? t(sn) : e(sn)
  }
  return s != null ? f(s) : f
})

export const packed = symbol("packed")

/** packs not interested tokens into `packed` node */
export const pack = curry(function* pack(pred,s) {
  let buf = []
  for(const i of s) {
    if (i.type === packed) {
      buf.push(...i.value.node)
    } else if (pred(i)) {
      if (buf.length) {
        yield tok(packed,packed,{node:buf})
        buf = []
      }
      yield i
    } else
      buf.push(i)
  }
  if (buf.length)
    yield tok(packed,packed,{node:buf})
})

/** unpacks all `packed` nodes */
export function* unpack(s) {
  for(const i of s) {
    if (i.type === packed) {
      if (i.enter)
        yield* i.value.node
    }
    else
      yield i
  }
}

export const filter = curry(function* filter(pred,s) {
  for(const i of s)
    if (pred(i))
      yield i
})

export const flatMap = curry(function* flatMap(act,s) {
  for(const i of s)
    yield* act(i)
})

export const map = curry(function* map(fun,s) {
  for(const i of s)
    yield fun(i)
})

export const forEach = curry(function forEach(act,s) {
  for(const i of s)
    act(i)
})

/**
 * reverse array iterator
 */
export function reverse(arr) {
  arr = toArray(arr)
  let i = arr.length
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return i === 0 ? {value:null,done:true} : {value:arr[--i],done:false}
        }
      }
    }
  }
}

/**
 * adds value `v` to an Array in a map `m` value by `k`
 * creates the Array if needed 
 */
export function mapPush(m, k, v) {
  let l = m.get(k)
  if (l == null)
    m.set(k, l = [])
  l.push(v)
}

/**
 * Returns Map's `m` value by `k` if it doesn't exist inserts an empty array, 
 * and returns it.
 */
export function mapArr(m, k) {
  let l = m.get(k)
  if (l == null)
    m.set(k, l = [])
  return l
}

/** 
 * adds value `v` to a Set in a map `m` value by `k`
 * creates the Set if needed 
 */
export function mapAdd(m, k, v) {
  let l = m.get(k)
  if (l == null)
    m.set(k, l = new Set)
  l.add(v)
}

export function groupWith/*::<K,V,W>*/(i/*:Iterable<[K,V]>*/,
                                       accum/*:(w:W,v:V,k?:K) => W*/,
                                       init/*::?: (k?:K) => W*/)
/*: Map<K,W>*/ {
  const ret/*:Map<K,W>*/ = new Map()
  if (init == null)
    init = () => null
  for(const [k,v] of i) {
    const l = ret.get(k)
    ret.set(k,l == null ? accum(init(k),v,k) : accum(l,v,k))
  }
  return ret
}

export function group/*::<K,V>*/(i/*:Iterable<[K,V]>*/)/*: Map<K,V[]>*/ {
  const ret/*:Map<K,V[]>*/ = new Map()
  for(const [k,v] of i)
    mapPush(ret, k, v)
  return ret
  // return groupWith<K,V,V[]>(i,(w:V[],v:V) => (w.push(v),w), () => [])
}

export function groupUniq/*::<K,V>*/(i/*:Iterable<[K,V]>*/)/*: Map<K,Set<V>>*/ {
  const ret/*:Map<K,V[]>*/ = new Map()
  for(const [k,v] of i)
    mapAdd(ret, k, v)
  return ret
  // return groupWith<K,V,V[]>(i,(v:V,w:V[]) => (w.add(v),w), () => new Set())
}

/** a postprocess pass for any pass removing some expressions */
export const cleanEmptyExprs = pipe(
  function markLastSubExpr(si) {
    const s = auto(si)
    function* _markLastSubExp() {
      for(const i of s.sub()) {
        yield i
        if (i.type === Tag.SequenceExpression) {
          const inner = [..._markLastSubExp()]
          if (inner.length > 2)
            inner[inner.length - 2].value.last = true
          yield* inner
        }
      }
    }
    return _markLastSubExp()
  },
  function cleanEmptyExprs(si) {
    const s = auto(si)
    function canSkip(inner) {
      if (!inner.length)
        return true
      const t = inner[0]
      if (t.type === Tag.Null || t.value.canIgnore)
        return true
      return false
    }
    function* _cleanEmptyExprs(sw,ignore) {
      for(const i of sw) {
        if (i.enter) {
          switch(i.type) {
          case Tag.SequenceExpression:
            const j = s.take()
            const buf = []
            for(let nxt;(nxt = s.curLev()) != null;) {
              const inner = [..._cleanEmptyExprs(s.one(),!nxt.value.last || ignore)]
              if (nxt.value.last && !ignore || !canSkip(inner))
                buf.push(inner)
            }
            switch(buf.length) {
            case 1:
              yield* reposOneArr(buf[0],i.pos)
            case 0:
              s.close(j)
              s.close(i)
              break
            default:
              yield i
              yield j
              for(const k of buf)
                yield* k
              yield s.close(j)
              yield s.close(i)
            }
            continue
          case Tag.ExpressionStatement:
            const inner = [..._cleanEmptyExprs(s.one(),true)]
            if (canSkip(inner)) {
              if (i.pos !== Tag.push)
                yield s.tok(i.pos,Tag.Null)
              s.close(i)
            } else {
              yield i
              yield* inner
              yield s.close(i)
            }
            continue
          }
          ignore = false
        }
        yield i
      }
    }
    return _cleanEmptyExprs(s)
  },
  removeNulls)

/**
 * similar to Ramda.pipe, likely less efficient, 
 * but Ramda dependency can be dropped
 */
export function pipe() {
  var args = arguments
  if ((BROWSER_DEBUG || _opts.debug) && ![...args].every(Boolean))
    throw new Error(`pipe with an empty function`)
  return function pipeImpl(cur) {
    for(let i = 0, len = args.length; i < len; ++i)
      cur = args[i](cur)
    return cur
  }
}

/**
 * similar to Ramda.curryN, likely less efficient, 
 * but Ramda dependency can be dropped
 */
export function curryN(num,fun,trace) {
  function step(args) {
    return function curryStep() {
      const next = args.concat(Array.from(arguments))
      return next.length >= num ? fun.apply(undefined, next)
        : step(next)
    }
  }
  return step([])
}

/**
 * similar to Ramda.curry, likely less efficient, 
 * but Ramda dependency can be dropped
 */
export function curry(fun,trace) {
  return curryN(fun.length,fun,trace)
}

/** console.time for generator `s` */
export const time = curry(function*(name, s) {
  console.time(name)
  return (yield* s)
})

/** console.time for generator `s` */
export const timeEnd = curry(function*(name, s) {
  try {
    return (yield* s)
  } finally {
    console.timeEnd(name)
  }
})

/** 
 * iterators wrapper keeping a single element lookahead, which may be accessed
 * with `cur` method
 *
 * the iterator may be shared
 */
export function Wrapper(cont) {
  this.value = void 0
  this._cont = cont
  if (cont) {
    const iter = this._inner = (leanWrap(cont)).step()
    const i = iter.value
    assert.ok(!iter.done,"input iterator should be not-empty")
    this.done = iter.done
    this.first = i
    this.opts = i.value && i.value.opts || _opts
    if (i.value)
      i.value.opts = this.opts
  } else
    this.opts = getOpts()
  this._stack = []
  this._tstack = []
  this.level = 0
}

const AFp = Wrapper.prototype

AFp.cur = function cur() { return this._inner.value }

AFp.step = function() {
  if (this._inner.done)
    return this.pure()
  const t = this.value = this._inner.value
  if (t.value) {
    if (t.value.opts) 
      this.opts = t.value.opts
    else if (t.value)
      t.value.opts = this.opts
  }
  this._inner = this._inner.step()
  if (t.enter)
    this.level++
  if (t.leave)
    this.level--
  return this
}

AFp[Symbol.iterator] = function() { return this }

AFp.toArray = function toArray() {
  if (Array.isArray(this._cont))
    return this._cont
  const res = [this.first]
  result(this._inner, res)
  return res  
}

if (Symbol.effectfulIterator) {
  AFp[Symbol.effectfulIterator] = function() { return this }
//  AFp.exit = function(v) {
//    this.done = true
//    this.value = v
//    return this
//  }
//  AFp.handle = function(e) { throw e }
}

AFp.pure = function(v) {
  this.value = v
  this.done = true
  return this
}

/** ES Iterator's interface `next` */
AFp.next = function() {
  this.step()
  return {value:this.value,done:this.done}
}

/**
 * same as `next` but returns either next value or null if done
 */
AFp.take = function() {
  this.step()
  return this.done ? void 0 : this.value
}

/** smart constructor for a token */
AFp.valCtor = function(pos,type,value) {
  let node = null
  if (value == null) { 
    if (type != null && !isSymbol(type)) {
      if (type.node != null) {
        value = type
        node = value.node
        type = null
      } else if (type.type != null) {
          node = type
        value = {node}
        type = null
      } else if (value == null) {
        value = type
        type = null
      }
    }
    if (value == null)
      value = {}
  } else
    node = value.node
  if (type == null) {
    if (value != null && value.typeInfo != null) {
      type = value.typeInfo.sym
    } else if (node != null && node.type != null) {
      type = Tag[node.type]
    } else {
      if (symInfo(pos).kind === "ctrl")
        type = pos
    }
  }
  assert.ok(type,"couldn't guess type")
  if (node == null) {
    value.node = node =
      type === Tag.Array ? [] : type === Tag.Null ? null : {}
  }
  if (!value.opts)
    value.opts = this.opts
  return [pos,type,value]
}

/** 
 * outputs tokens from parsed template
 * see module `toks` function for details 
 */
AFp.toks = toks

const ctrlTok = {$:"ctrlTok"}
const ctrlTokGen = {$:"ctrlTokGen"}
const storedTok = {$:"storedTok"}
const templateTok = {$:ctrlTokGen,
                     *run(t) {
                       yield* t._tstack.shift()
                       return true
                     }}

const skipTag = {$:ctrlTok,run(t) { t.take(); },t:"skip"}
const vCloseTag = {$:ctrlTok,run() {},t:"close"}

/** outputs opening tag */
AFp.enter = function(p,t,v) {
  const [pos,type,value] = this.valCtor(p,t,v)
  assert.ok(pos && type && value)
  const res = {enter:true,leave:false,pos,type,value}
  this._stack.unshift({$:storedTok,
                       tok:{enter:false,leave:true,
                            pos,type,value}})
  return res
}

/** outputs terminal tag */
AFp.tok = function tok(p,t,v) {
  const [pos,type,value] = this.valCtor(p,t,v)
  return {enter:true,leave:true,pos,type,value}
}

/** outputs closing tag doing other actions stored in the stack */
AFp.leave = function*() {
  let f
  while((f=this._stack.shift())) {
    switch(f.$) {
    case ctrlTok:
      if (f.run(this))
        return
      break
    case ctrlTokGen:
      if (yield* f.run(this))
        return
      break
    default:
      yield f.tok
      return f.tok
    }
  }
}

/** 
 * gets a mark (function) to close all tags opened 
 * after the function is called 
 */
AFp.label = function() {
  const pos = this._stack.length
  const t = this
  return function*() {
    const sub = t._stack.splice(0,t._stack.length - pos)
    for(const i of sub) {
      switch(i.$) {
      case ctrlTok:
        i.run(t)
        break
      case ctrlTokGen:
        yield* i.run(t)
        break
      default:
        yield i.tok
      }
    }
  }
}

function* one(t) {
  const c = t.cur()
  if (c == null || !c.enter)
    return null
  const exit = t.level
  c.value.stageName = t.first.value.stageName
  let i
  for(i of t) {
    yield i
    if (exit >= t.level)
      return i
  }
  return i
}

function* sub(t) {
  const c = t.cur()
  if (c == null || !c.enter)
    return null
  c.value.stageName = t.first.value.stageName
  const exit = t.level
  let i
  for(i of t) {
    yield i
    if (exit >= t.level) {
      const c = t.cur()
      if (c == null || !c.enter || exit > t.level)
        return i
    }
  }
  return i
}

/** gets next tag if it is in the current level or null otherwise */
AFp.curLev = function() {
  const v = this.cur()
  if (!v || !v.enter)
    return null
  return v
}

/** 
 * outputs all tokens until token with position `pos`
 * on the current level, returns the tag if found, it doesn't
 * remove the tag from the original iterator
 */
AFp.untilPos = function*(pos) {
  var i
  while((i = this.curLev()) != null && i.pos !== pos)
    yield* one(this)
  return i
}

/** same as `findPos` but also outputs the found tag */
AFp.toPos = function*(pos) {
  const p = yield* this.findPos(pos)
  assert.ok(p)
  yield p
  return p
}

/**
 * - if `i` is undefined reads a token from the stream
 * - makes an opening tag (copied from the read one or i) and returns it
 * - save closing tag into a stack to output it after leaving its level
 */
AFp.peel = function(i) {
  if (i == null) 
    i = this.take()
  assert.ok(i.enter)
  const res = this.enter(i.pos,i.type,i.value)
  this._stack.unshift(i.leave ? vCloseTag : skipTag)
  return res
}

/** 
 * looks a `pos` tag in the input and returns it, 
 * also output its peel
 */
AFp.peelTo = function*(pos) {
  assert.notEqual(this._stack[0],vCloseTag)
  const i = yield *this.findPos(pos)
      assert.ok(i);
  yield this.peel(i);
  return i
}

/** 
 * same us `peel` without parameters but don't crashes 
 * if there is nothing to peel (returns undefined)
 */
AFp.peelOpt = function() {
  const v = this.cur()
  if (!v || !v.enter)
    return null
  return this.peel()
}

function* empty() {}

/** 
 * returns an iterator, if next tag is opening the iterator will 
 * output all tokens until it is closed, or empty otherwise
 */
AFp.one = function*() {
  if (this._stack[0] !== vCloseTag) {
    return (yield* one(this))
  }
  return null
}

/** 
 * returns an iterator to traverse all tokens until exiting from 
 * the current level
 */
AFp.sub = function*() {
  if (this._stack[0] !== vCloseTag)
    return (yield* sub(this))
  return null
}

/** same as `untilPos` but takes the tag from the original stream */
AFp.findPos = function*(pos) {
  if (this._stack[0] !== vCloseTag) {
    const i = yield* this.untilPos(pos)
    if (i != null)
      this.take()
    return i
  }
  return null
}

/** peels `i` outputs it, outputs all inner  */
AFp.copy = function*(i) {
  if (!i)
    i = this.take(i)
  yield i
  if (!i.leave) {
    yield* this.sub()
    const j = this.take()
    assert.ok(i.value === j.value)
    j.type = i.type
    j.pos = i.pos
    yield j
  }
}

/** copies everything till closing of open tag `i` */
AFp.tillClose = function*(i) {
  for(const j of this) {
    yield j
    if (j.value == i.value)
      return j
  }
}

export function* tillVal(value, iter) {
  for(const i of iter) {
    yield i
    if (i.value === value)
      return i
  }
  return null
}

/** 
 * like `AFp.one` but returns everything until matching value 
 * - this won't work if some inner iterator consumes the closing tag
 */
export function* single(iter) {
  const {done,value} = iter.next()
  if (done)
    return null
  yield value
  if (!value.leave)
    yield* tillVal(value.value,iter)
  return value
}

/** 
 * consumes next tag if `i` is not closing one
 * crashes for debugging purposes if the tag is not closing tag of `i`
 */
AFp.close = function(i) {
  if (!i.leave) {
    const j = this.take()
    assert.ok(i.value === j.value)
    return j
  }
  return null
}

/** 
 * same as `toks` but extends formats with `$_`/'$E` identifier to mark 
 * a position where output stream must be stopped, the position is a 
 * result of the function, to continue emitting use `refocus`
 * to exit the template use `leave`
 * in expression statements $E focuses only the expression, while `$_` is for 
 * the statement, in other contexts they do matches the same
 */
AFp.template = function*(pos,node,...syms) {
  if (node.substr != null)
    node = toArray(toks(pos,node,...syms))
  this._stack.unshift(templateTok)
  this._tstack.unshift(node)
  return (yield* this.refocus())
}

/** emits current template stream till next `$_`/`$E` */
AFp.refocus = function*() {
  const arr = this._tstack[0]
  while(arr.length) {
    const f = arr.shift()
    if (f.enter) {
      switch(f.type) {
      case Tag.ExpressionStatement:
        const n = arr[0]
        if (n != null
            && n.type === Tag.Identifier
            && n.value.node.name === "$_")
        {
          while(arr.length && arr.shift().value !== f.value) {}
          return f.pos
        }
        break
      case Tag.Identifier:
        if (f.type === Tag.Identifier) {
          const n = f.value.node.name
          if (n === "$_" || n === "$E") {
            while(arr.length && arr.shift().value !== f.value) {}
            return f.pos
          }
        }
        break
      }
    }
    yield f
  }
  throw new Error("next placeholder is not found")
}

AFp.till = function(pred) { return till(pred,this) }

/** alias of module's find */
AFp.find = function(pred) { return find(pred,this); }

/** generates error referring with `node` position */
AFp.error = function(msg,node) {
  if (this._name != null)
    msg += " during " + this._name
  const e = new SyntaxError(msg)
  if (node)
    e.esOrigNode = node
  if (!node || !node._loc && !node.loc) {
    for(const i of this) {
      node = i.value.node
      if(node && (node.loc || node._loc)) {
        e.esNode = node
        return e
      }
    }
  }
  return e
}

/** alias of the module's `tillLevel` */
AFp.tillLevel = function(level) {
  return tillLevel(level,this)
}

/** adds utility funcitons to iterable object `cont` */
export function auto(cont) {
  return new Wrapper(cont)
}

