import * as R from "ramda"
import * as Kit from "./kit"
import {Tag,symbol,symInfo} from "./kit"
import * as Match from "estransducers/match"
import {sync as resolve} from "resolve"
import * as path from "path"
import * as Uniq from "./uniq"
import {ifJsExceptions,ifDirectives} from "./options"

import * as assert from "assert"
import * as Trace from "estransducers/trace"
import * as Debug from "./debug"
import dump from "estransducers/dump"

/** token type for signaling config object changes */
export const config = symbol("config")
/** token holding diff object of current options */ 
export const configDiff = symbol("configDiff")
/** token for marking compile time handles applications */
export const ctImport = symbol("ctImport")

/** `R.pipe` working for 0 arguments */
function pipe(fs) {
  if (fs == null || fs.length === 0)
    return null
  return R.pipe(...fs)
}

/** composes function, removing duplicates */
export function postproc(f) {
  return function postprocRun(s) {
    let nxt = []
    for(let p, cur = s, curf = f;
        (curf = Kit.result(curf(cur),nxt)) != null;
        cur = nxt, nxt = []
       ) {}
    return nxt
  }
}

/** loads module `name` using commonjs `require` */
function resolveImport(name,opts,optional = false) {
  let r = opts.libs[name]
  if (r == null) {
    try {
      const cp = resolve(name, {
        basedir: path.dirname(opts.file.filename)
      })
      r = require(cp)
    } catch(e) {
      if (optional) {
        if (opts.resolveTrace)
          console.log(`couldn't resolve ${name} (%{e.message}), ignoring`)
      } else {
        throw new SyntaxError(`couldn't resolve ${name} (${e.message})`)
      }
    }
  }
  return r
}

/** applies `ctImport` from the stream */
export const ctImportPass = postproc(function* ctImportPass(s) {
  s = Kit.auto(s)
  let needInject = false
  const post = []
  for(const i of s) {
    if (i.type === ctImport) {
      if (i.enter) {
        const r = resolveImport(i.value.name,s.opts,i.value.optional)
        if (r != null) {
          const p = yield* r(i.value.$ns || s.opts.$ns, s.opts)
          if (p != null) {
            post.push(p)
          }
        }
      }
    } else
      yield i
  }
  return post.length ? R.pipe(...post) : null
})

/** 
 * in case if ns is loaded using command line it replaces all corresponding
 * global variables with the name of ns
 */
function* replaceGlobalNsName(si) {
  const s = Kit.auto(si)
  for(const i of s) {
    if (i.enter && i.type === Tag.Identifier
        && s.opts.$ns
        && !s.opts.$ns.strict
        && i.value.sym && !i.value.sym.declScope
        && i.value.node.name === s.opts.$ns.name) {
      i.value.sym = s.opts.$ns
    }
    yield i
  }
}

/** 
 * checks imports in the input and apply compile time handlers 
 * if they are available  
 */
export const imports =
  R.pipe(
    Match.inject([
      `>$$ = require($M)`,
      `=$$ = require($M)`,
      `import $$ from "$M"`,
      `import * as $$ from "$M"`
    ]),
    function* importDetect(s) {
      s = Kit.auto(s)
      const pat = new RegExp(s.opts.importPattern ||
                             /\@effectful\/core|.*\/mfjs$|.*-effectful$/gi)
      for(const i of s) {
        if (i.enter
              && i.type === Match.Placeholder && i.value.match !== false)
        {
          const j = s.cur()
          if (i.value.name === "M") {
            if (j.type === Tag.StringLiteral) {
              const name = j.value.node.value
              if (name == null || name !== s.opts.require
                  && !s.opts.libs[name] && !pat.test(name))
              {
                i.value.v.match = false
              }
            } else {
              i.value.v.match = false
            }
          } else {
            if (j.type !== Tag.Identifier) {
              i.value.v.match = false
            }
          }
        }
        yield i
      }
    },
    Match.commit,
    function* checkStaticImport(s) {
      s = Kit.auto(s)
      const first = yield* s.till(i => i.pos === Tag.top)
      const namespaces = first.value.namespaces = new Map()
      for(const i of s) {
        yield i
        if (i.enter) {
          if (i.type === Match.Root) {
            yield* s.till(j => j.enter && j.type === Match.Placeholder) 
            const name = s.cur().value.sym
            yield* s.till(j => j.enter && j.type === Match.Placeholder)
            const module = s.cur().value.node.value
            yield* s.till(j => j.leave && j.type === Match.Root)
            namespaces.set(module,name)
            if (i.value.index < 2)
              yield* s.till(j => j.leave && Kit.typeInfo(j).stmt)
            if (s.opts.require === module || s.opts.libs[module])
              yield s.tok(ctImport,{name:module,
                                    optional:true,
                                    $ns:name})
            for(const p of [`${module}-effectful-ct`,
                            path.join(module,"effectful-ct")]) {
              yield s.tok(ctImport,{name:p,optional:true,$ns:name})
            }
          }
        }
      }
    },
    Match.clean,
    Array.from)

/** marks place of profile application */
export const profile = symbol("profile")

/**
 * applies config merge to parent's block if it has `parentBlock` scope
 */
export const configDiffPass = R.pipe(
  propagateConfigDiff,
  function* setOpts(s) {
    s = Kit.auto(s)
    let cur = s.opts
    const stack = []
    for(const i of s) {
      if (i.value.optsDiff != null || i.value.optsAssign != null) {
        if (i.enter) {
          stack.push(cur)
          cur = clone(cur)
          if (i.value.optsDiff != null)
            cur = merge(cur, i.value.optsDiff)
          if (i.value.optsAssign != null)
            cur = Object.assign(cur,i.value.optsAssign)
        }
        i.value.opts = cur
        if (i.leave)
          cur = stack.pop()
      } else 
        i.value.opts = cur
      yield i
    }
  })

/** marks profile change calls in the code */
export const lookupProfiles = R.pipe(
  replaceGlobalNsName,
  Match.inject(["*$M.profile($$)","*$M.option($$)"]),
  Kit.toArray, //TODO: remove
  function* matchNs(s) {
    s = Kit.auto(s)
    for(const i of s) {
      yield i
      if (i.enter) {
        if (i.type === Match.Placeholder && i.value.v.match) {
          if (i.value.name === "M") {
            yield* s.till(j => j.type !== Match.Placeholder)
            const j = s.cur()
            if (j.type === Tag.Identifier
                && s.opts.$ns && s.opts.$ns === j.value.sym)
              continue
            i.value.v.match = false
          }
        }
      }
    }
  },
  Match.commit,
  function* lookupProfiles(s) {
    s = Kit.auto(s)
    function getConst() {
      const i = s.peel()
      switch(i.type) {
      case Tag.BooleanLiteral:
      case Tag.NumericLiteral:
      case Tag.StringLiteral:
        Kit.skip(s.leave())
        return i.value.node.value
      case Tag.NullLiteral:
        Kit.skip(s.leave())
        return i.value.node.value
      case Tag.RegExpLiteral:
        Kit.skip(s.leave())
        return new RegExp(i.value.node.pattern,i.value.node.flags)
      case Tag.ObjectExpression:
        const res = {}
        Kit.skip(s.peelTo(Tag.properties))
        for(const j of s.sub()) {
          s.peel(j)
          switch(j.type) {
          case Tag.ObjectProperty:
            const k = s.cur()
            assert.equal(k.pos, Tag.key)
            if (k.type !== Tag.Identifier)
              throw s.error("not supported object key")
            Kit.skip(s.copy())
            res[k.value.node.name] = getConst()
            break
          default:
            throw s.error("not supported object construct")
          }
          Kit.skip(s.leave())
        }
        Kit.skip(s.leave())
        Kit.skip(s.leave())
        return res
      default:
        throw s.error("not supported static expression")
      }
    }
    let any = false
    for(const i of s.sub()) {
      switch(i.type) {
      case Match.Root:
        if (i.enter) {
          if (i.value.index === 0) {
            Kit.skip(s.till(j=>j.enter && j.type === Match.Placeholder))
            const j = s.cur()
            Kit.skip(s.till(j => j.enter && j.type === Match.Placeholder))
            const k = s.cur()
            if (k.type !== Tag.StringLiteral)
              throw s.error("only string literals are supported")
            Kit.skip(s.till(j=>j.leave && j.type === Match.Root))
            const name = k.value.node.value
            const value = {ns:j.value.node.name,node:{name}}
            yield s.tok(profile,value)
          } else {
            Kit.skip(s.till(j=>j.enter && j.type === Match.Placeholder))
            const j = s.cur()
            Kit.skip(s.till(j => j.enter && j.type === Match.Placeholder))
            yield s.tok(i.pos,configDiff,{node:getConst(),alg:"merge"})
            any = true
            Kit.skip(s.till(j => j.leave && j.type === Match.Root))
          }
        }
        break
      case Match.Placeholder:
        continue
      default:
        yield i
      }
    }
  },
  Match.clean,
  configDiffPass
)

/** invokes profile handlers */
export const applyProfiles = postproc(function* applyProfiles(s) {
  s = Kit.auto(s)
  const post = []
  for(const i of s) {
    if (i.type === profile) {
      if (i.enter) {
        const run = i.value.run || s.opts.profiles[i.value.node.name]
        if (run == null) {
          throw s.error(`profile ${
             i.value.node.name} is not defined, available:[${
             Object.keys(s.opts.profiles)}]`)
        }
        const p = yield* run.call(i.value)
        if (p != null)
          post.push(p)
      }
      continue
    }
    yield i
  }
  return pipe(post)
})

/** handles profile tokens */
export const profiles = R.pipe(
  configDiffPass,
  ifDirectives(lookupProfiles),
  applyProfiles,
  configDiffPass)

/*
export const stack = symbol("stack") 

export const placeholder = R.curry(function* placeholder(name, s) {
  const sl = Kit.auto(s)
  function* walk() {
    for(const i of sl.sub()) {
      if (i.type === stack && i.value.key === name) {
        yield* i.value(walk(),i.value.node)
        continue
      }
      yield i
    }
  }
  yield* walk()
})
*/

/**
 * injects resulting items of `i.value.node` generator, passing it
 * `ExtIterator::sub` as an argument
 */
export const sub = symbol("sub")

/**
 * injects resulting items of `i.value.node` generator, passing it
 * `ExtIterator::one` as an argument
 */
export const one = symbol("one")

/**
 * handles `sub` tokens and `one` tokens
 */
export function applySubAndOne(s) {
  function* walk(si) {
    const sa = Kit.toArray(si)
    if (!sa.length)
      return
    s = Kit.auto(sa)
    for(const i of s) {
      if (i.enter) {
        switch(i.type) {
        case sub:
          assert.ok(i.leave)
          yield* walk(i.value.run(s.sub()))
          continue
        case one:
          assert.ok(i.leave)
          yield* walk(i.value.run(s.one()))
          continue
        }
      }
      yield i
    }
  }
  return walk(s)
}

/** 
 * moves content of to specified destination 
 * now only function scope works
 */
export const hoist = symbol("hoist")

/** 
 * interpret hoist tokens
 * TODO: move to estransducers
 */
export function applyHoist(si) {
  const s = Kit.auto(si)
  function* scope() {
    const buf = []
    const nxt = [...walk(buf)]
    yield* buf
    yield* nxt
  }
  function* walk(funScope) {
    for(const i of s.sub()) {
      if (i.type === hoist) {
        if (i.enter) {
          const buf = [...walk(funScope)]
          funScope.push(...buf)
        }
      } else if (i.enter && i.value.func) {
        yield i
        yield* scope()
      } else
        yield i
    }
  }
  return scope()
}

/**
 * specifies transform function
 */
export const preprocess = symbol("preprocess")

const MAX_PREPROCESS_COUNT = 10

/**
 * applies transform from `preprocess` token `node` field to 
 * the whole token stream, repeats process until no more `preprocess` 
 * tokens emitted
 */
export function preprocessPass(s) {
  let num = 0
  function* walk(s) {
    if (++num > MAX_PREPROCESS_COUNT)
      throw new Error("too many transforms")
    s = Kit.share(s)
    for(const i of s) {
      if (i.type === preprocess) {
        yield* s
        return i.value
      }
      yield i
    }
    return null
  }
  for(let i = s, j = [], next;;i = next.node(j), j = []) {
    next = Kit.result(walk(i), j)
    if (next === null)
      return j
  }
}

/** calculates qualified names for each expression if it is applicable */
export function setQNames(si) {
  const s = Kit.auto(si)
  function* getQName(ids) {
    const i = s.cur()
    switch(i.type) {
    case Tag.Identifier:
      ids.push(i.value.node.name)
      yield* s.copy()
      break
    case Tag.MemberExpression:
      const cur = i.value.qname = []
      yield s.peel()
      yield* getQName(cur)
      yield* getQName(cur)
      yield* s.leave()
      ids.push(...cur)
      break
    default:
      ids.push("*")
      yield* walk(s.one())
    }
  }
  function* walk(sw) {
    for(const i of sw) {
      yield i
      if (i.enter) {
        switch(i.type) {
        case Tag.CallExpression:
          yield* getQName(i.value.qname = [])
          break
        case Tag.VariableDeclarator:
        case Tag.AssignmentExpression:
          const cqn = []
          yield* getQName(cqn)
          const j = s.curLev()
          if (j != null) {
            j.lqname = cqn
            yield* walk(s.sub())
          }
          break
        }
      }
    }
  }
  return walk(s)
}

/** marks `throw` statement to be handled by monadic library rather than js */
export function* assignThrowEff(s) {
  for(const i of s) {
    if (i.enter && i.type === Tag.ThrowStatement)
      i.value.bind = true
    yield i
  }
}

/** 
 * marks call expressions to be effectful if they match some patter 
 * from `bindCalls` option 
 */
export function* assignBindCalls(s) {
  s = Kit.auto(s)
  for(const i of s) {
    if (s.opts.bindCalls != null && i.enter
        && i.type === Tag.CallExpression && i.value.bind == null)
    {
      const j = s.cur()
      const q = i.value.qname
      if (q != null) {
        const prof = s.opts.bindCalls
        if (prof != null) {
          let v = null
          if (v == null && prof.byQName != null)
            v = prof.byQName[q.join(".")]
          if (v == null && prof.byId != null)
            v = prof.byId[q[q.length-1]]
          if (v == null && prof.byNs != null && q.length > 1)
            v = prof.byNs[q[0]]
          if (v == null && prof.libNs && q.length === 2
              && q[0] === s.opts.$ns.name)
            v = prof.libNs[q[1]]
          if (v == null)
            v = prof.all
          if (v != null)
            i.value.bind = v
        }
      }
    }
    yield i
  }
}

/** object merging algorithm for options merge */ 
function merge(a,b) {
  if (!a)
    return b
  if (!b)
    return a
  if (Array.isArray(a))
    return a.concat(b)
  else if (typeof a === "object") {
    for(const i in b) {
      if (i[0] === "$")
        a[i] = b[i]
      else if (i in a) {
        a[i] = merge(a[i], b[i])
      } else
        a[i] = b[i]
    }
    return a
  }
  return b
}

function clone(obj) {
  return merge({}, obj)
}

/**
 * moves `configDiff` tokens into `optsDiff` property for each sub-token on 
 * the same level
 */
export function* propagateConfigDiff(s) {
  const stack = []
  let cur = {level:0,merge:null,assign:null}
  let level = 0
  for(const i of s) {
    if (i.type === configDiff) {
      if (i.enter) {
        if (cur.level < level) {
          stack.push(cur)
          cur = {level,merge:null,assign:null}
        }
        if (i.value.alg === "assign")
          cur.assign = Object.assign(cur.assign || {},i.value.node)
        else
          cur.merge = merge(cur.merge || {},i.value.node)
      }
      continue
    }
    if (i.enter) {
      if (cur.level === level) {
        if (cur.merge) 
          i.value.optsDiff = Object.assign({},cur.merge,i.value.optsDiff)
        if (cur.assign) {
          i.value.optsAssign = Object.assign({},cur.assign,i.value.optsAssign)
        }
      }
      level++
    }
    if (i.leave) {
      if (cur.level === level) {
        cur = stack.pop()
      }
      level--
    }
    yield i
  }
}

/** puts user config options into the stream */
function* emitInitOptions(s) {
  s = Kit.auto(s)
  let $ns = s.opts.$ns; 
  if (s.opts.require != null) {
    $ns = s.first.value.namespaces.get(s.opts.require)
    if (!$ns) {
      $ns = Kit.scope.newSym(s.opts.ns || "M")
      yield s.tok(ctImport,{name:s.opts.require,optional:false,$ns})
    }
  }
  yield* s
}

/** puts profile initial profile definitions into the stream */
export function* emitInitProfiles(s) {
  s = Kit.auto(s)
  yield* s.till(i => i.type === Tag.Array && i.pos === Tag.program)
  let {profiles} = s.opts
  if (profiles != null) {
    if (!Array.isArray(profiles))
      profiles = [profiles]
    for(const name of profiles) {
      yield s.tok(Tag.push,profile,{node:{name}})
    }
    if (s.opts.override)
      yield s.tok(Tag.push,configDiff,{alg:"merge",node:s.opts.override})
  }
  yield* s
}

/** combines a few preparation passes */
export const prepare = R.pipe(
  ifDirectives(imports),
  emitInitOptions,
  ctImportPass)

/** for `ns` function application marks inner expression to be effectful */
export function unwrapNs(si) {
  const s = Kit.auto(si)
  function* walk() {
    for(const i of s.sub()) {
      if (i.enter && i.type === Tag.CallExpression) {
        const j = s.cur()
        if (j.type === Tag.Identifier && j.value.sym === s.opts.$ns) {
          const def = s.opts.bindCalls
          if (def != null && def.ns) {
            const lab = s.label()
            s.peel(i)
            Kit.skip(s.peelTo(Tag.arguments))
            s.cur().value.bind = true
            yield* Kit.reposOne(walk(),i.pos)
            Kit.skip(lab())
            continue
          }
        }
      }
      yield i
    }
  }
  return walk()
}

/** sets options `opts` to each function root tag */
export const setFuncOpts = function setFuncOpts(opts) {
  const generator = opts.generator
  const async = opts.async
  return function* setFuncOpts(s) {
    for(const i of s) {
      if (i.enter && i.value.func
          && (generator == null || generator === !!i.value.node.generator)
          && (async == null || async === !!i.value.node.async))
        i.value.optsAssign = Object.assign(i.value.optsAssign || {},opts)
      yield i
    }
  }
}

/** 
 * posts option diff to the stream, 
 * so all the next in the scope options are updated with 
 * `x => Object.assign(x, opts)`
 */
export const injectOpts = (opts) => 
  function* injectOpts(s) {
    yield Kit.tok(configDiff,{node:opts,alg:"assign"})
  }

/** sets options to each sub-function */
export const injectFuncOpts = (opts, withSelf = false) => {
  const run = setFuncOpts(opts)
  return function* injectFuncOpts() {
    if (withSelf) {
      const value = {dst:"func"}
      yield Kit.enter(hoist,value)
      yield Kit.tok(one, {run})
      yield Kit.leave(hoist,value)
      return R.pipe(applyHoist,applySubAndOne)
    }
    yield Kit.tok(sub, {run})
    return applySubAndOne
  }
}


