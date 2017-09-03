import * as Kit from "./kit"
import * as T from "babel-types"
import * as RT from "estransducers/rt"

const {Tag} = Kit

const emptyMap = new Map()

/** collects all symbol with library ns */
export function collect(s) {
  const sa = Kit.toArray(s)
  const root = sa[0].value
  const rootNs = root.$ns
  const mods = root.injectRT || emptyMap
  for(const i of sa) {
    if (i.enter && i.type === Tag.Identifier
        && i.value.sym && i.value.sym.lib) {
      const ns = i.value.ns || (i.value.ns = rootNs)
      const def = mods.get(ns)
      if (def)
        def.usages.add(i.value.sym)
    }
  }
  return sa
}

/**
 * injects import from `require` options if it doesn't exist already
 * if option `inject` is true, will use `ns` as namespace parameter if 
 * specified or some unique variable
 */
export function inject(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const mods = root.injectRT
  if (!mods.size)
    return s
  const rt = root.rt = {importSyms:[],
                        importNs:[],
                        inlineSyms:[]}
  for(const [ns,def] of mods) {
    if (!def.usages.size)
      continue
    if (def.content)
      rt.inlineSyms.push({syms:def.usages,content:def.content})
    else
      rt.importSyms.push({syms:def.usages,
                          ns:def.ns,
                          module:def.module})
  }
  return RT.importSyms(s)
}


export function* interpretLibSyms(si) {
  const s = Kit.auto(si)
  for(const i of s) {
    if (i.enter && i.type === Tag.Identifier
        && i.pos !== Tag.property && !i.value.decl
        && i.value.sym && i.value.ns != null) {
      const {sym,ns} = i.value
      if (sym != null && sym !== Kit.coerceId) {
        if (!ns) {
          yield s.tok(i.pos,i.type,{sym})
        } else {
          const e = s.enter(i.pos,Tag.MemberExpression,{})
          yield e
          yield s.tok(Tag.object,Tag.Identifier,{sym:ns})
          yield s.tok(Tag.property,Tag.Identifier,{sym,node:{name:sym.name}})
          yield* s.leave()
        }
      } else {
        if (!ns)
          yield s.tok(i.pos,Tag.Identifier,{sym:Kit.coerceId})
        else
          yield s.tok(i.pos,Tag.Identifier,{sym:ns})
      }
      s.close(i)
    } else
      yield i
  }
}

