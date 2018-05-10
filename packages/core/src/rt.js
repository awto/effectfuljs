import * as Kit from "./kit"
import * as RT from "@effectful/transducers/rt"
import * as assert from "assert"

const {Tag} = Kit

const emptyMap = new Map()

/** 
 * collects all ES or CommonJS imports into root's import field 
 *
 *    type RootValue = RootValue & {imports:Map<string,
 *                                              {ns?:IdValue,
 *                                               locals?:Map<string,IdValue>}[]> }
 */
export function collectImports(si) {
  const sa = Kit.toArray(si)
  const root = sa[0].value
  const s = Kit.auto(sa)
  const imports = root.imports = new Map()
  function reg(path, ns, locals) {
    let mods = imports.get(path)
    if (!mods)
      imports.set(path, mods = [])
    mods.push({ns,locals})
  }
  for(const i of s) {
    if (i.enter) {
      switch(i.type) {
      case Tag.AssignmentExpression:
        if (i.value.node.operator !== "=")
          break
      case Tag.VariableDeclarator:
        const pat = s.take()
        if (pat.type !== Tag.Identifier)
          break
        // TODO patterns
        s.close(pat)
        const call = s.take()
        if (!call.type === Tag.CallExpression)
          break
        const callee = s.cur()
        if (callee.type !== Tag.Identifier || callee.value.node.name !== "require")
          break
        for(const i of s)
          if (i.enter && i.pos === Tag.arguments)
            break
        const mod = s.cur()
        if (mod.type !== Tag.StringLiteral)
          break
        reg(mod.value.node.value,pat.value)
        break
      case Tag.ImportDeclaration:
        let ns, locals
        for(const i of s.one()) {
          if (i.enter) {
            switch(i.type) {
            case Tag.ImportDefaultSpecifier:
            case Tag.ImportNamespaceSpecifier:
              ns = s.cur().value
              break
            case Tag.ImportSpecifier:
              if (!locals)
                locals = new Map()
              const loc = s.take()
              s.close(loc)
              locals.set(s.cur().value.node.name,loc.value)
              break
            }
          }
        }
        const src = s.cur()
        assert.ok(src.type === Tag.StringLiteral)
        reg(src.value.node.value,ns,locals)
        break
      case Tag.BlockStatement:
        Kit.skip(s.copy(i))
        break
      }
    }
  }
  return sa
}

/** collects all symbol with library ns */
export function collectUsages(s) {
  const sa = Kit.toArray(s)
  const root = sa[0].value
  const rootNs = root.$ns
  const mods = root.injectRT || emptyMap
  const ctxns = root.opts.transform
        && root.opts.contextMethodOps && root.contextSym
  for(const i of sa) {
    if (i.enter && i.type === Tag.Identifier
        && i.value.sym && i.value.sym.lib) {
      let ns = i.value.ns
      if (ns == null)
        ns = ctxns
      ns = ns || rootNs
      i.value.ns = ns
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
  if (!mods || !mods.size)
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

/** replaces symbols with special meaning with their interpretation */
export function interpretLibSyms(si) {
  const s = Kit.auto(si)
  if (s.opts.nsStatic)
    return s
  const root = s.first.value
  const ns = root.$ns
  const nsStatic = s.opts.nsStatic
  return _interpretLibSyms()
  function* _interpretLibSyms() {
    for(const i of s) {
      if (i.enter && i.type === Tag.Identifier
          && i.pos !== Tag.property && !i.value.decl
          && i.value.sym && i.value.sym.lib) {
        const {sym} = i.value
        if (sym.nsDefault) {
          yield s.tok(i.pos,Tag.Identifier,{sym:ns})
        } else if (ns) {
          yield s.enter(i.pos,Tag.MemberExpression,{origSym:sym})
          yield s.tok(Tag.object,Tag.Identifier,{sym:ns})
          yield s.tok(Tag.property,Tag.Identifier,{sym,node:{name:sym.name}})
          yield* s.leave()
          s.close(i)
        } else
          yield i
      } else
        yield i
    }
  }
}

