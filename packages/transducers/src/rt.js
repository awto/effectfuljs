import * as Kit from "./kit"
import * as Scope from "./scope"
import {produce,Tag,TypeInfo as TI,symbol,tok,resetFieldInfo} from "./core"
import * as assert from "assert"

/** 
 * injects ES6 `import` or commonjs `require` 
 * commonjs if option `modules` === 'commonjs'
 * expects following fields:
 *      type Value = Value & { 
 *        rt: { importSyms: {syms:Sym[], ns: Sym, module:string} } }
 *      type Sym = Sym & { importFrom: String } 
 */
export function* importSyms(si) {
  const s = Kit.auto(si)
  const {rt} = s.first.value
  if (!rt.importSyms || !rt.importSyms.length) {
    yield* s
    return
  }
  yield* Kit.fileBody(s)
  const commonjs = s.opts.modules === "commonjs"
  for(const {syms,ns,module} of rt.importSyms) {
    if (ns == null) {
      const lab = s.label()
      yield* s.template(Tag.push,
                        commonjs
                        ? `var $_ = require("${module}")`
                        : `import $_ from "${module}"`)
      yield s.enter(Tag.id, Tag.ObjectPattern)
      yield s.enter(Tag.properties,Tag.Array)
      for(const sym of syms) {
        yield s.enter(Tag.push,Tag.ObjectProperty,{node:{shorthand:true}})
        yield s.tok(Tag.key, Tag.Identifier, {node:{name:sym.orig}})
        yield s.tok(Tag.value, Tag.Identifier, {decl:true,sym})
        yield* s.leave()
      }
      yield* lab()
    } else {
      yield* s.toks(Tag.push,
                    commonjs
                    ? `var $I = require("${module}")`
                    : `import * as $I from "${module}"`,
                    ns)
    }
  }
  yield* s
}

/** 
 * inlines runtime values
 * expects: 
 *      type Value = Value & { rt: { inline: {syms:Sym[],content:string}[] } }
 * inlines JS content from all `inlineSources` looking up for 
 * symbols in `inlineSym`
 */
export function* inline(si) {
  const s = Kit.auto(si)
  const {rt} = s.first.value
  const inlines = rt.inlineSyms
  if (!inlines || !inlines.length) {
    yield* s
    return
  }
  function* getBody(si) {
    const s = Kit.auto(si)
    Kit.skip(s.till(i => i.pos === Tag.body && i.type === Tag.Array))
    yield* s.sub()
    Kit.skip(s)
  }
  const buf = []
  const transf = Kit.pipe(Kit.parse,produce,Scope.prepare,getBody,Kit.toArray)
  for(const {syms,content} of inlines) {
    const symsMap = new Map()
    for(const i of syms)
      symsMap.set(i.orig,i)
    const p = transf(content)
    buf.push(p)
    for(const i of p) {
      if (i.enter) {
        const {node} = i.value
        node.loc = node.start = node.end = null
        if (i.type === Tag.Identifier) {
          const sym = symsMap.get(node.name)
          if (sym)
            i.value.sym = sym
          else if (i.value.decl && i.value.sym) {
            i.value.sym.strict = false
          }
        }
      }
    }
  }
  yield* Kit.fileBody(s)
  for(const i of buf)
    yield* i
  yield* s
}

/** initializes empty `rt` structure */
export function* init(si) {
  const [h,s] = Kit.la(si)
  h.value.rt = {importSyms:[],
                importNs:[],
                inlineSyms:[]}
  yield* s
}
