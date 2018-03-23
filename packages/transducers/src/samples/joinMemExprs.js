import {produce,consume,Tag} from "../core"
import * as Kit from "../kit"
import * as T from "@babel/types"
import * as assert from "assert"

function collectFuncDecls(s) {
  const sa = Kit.toArray(s)
  const sl = Kit.auto(sa)
  function walk() {
    for(const i of sl.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.FunctionDefinition:
        case Tag.FunctionExpression:
        case Tag.ArrowFunctionExpression:
        }
      }
    }
  }
  walk(new Set())
  return sa
}

function markKeyIds(s) {
  const sl = Kit.auto(s)
  function* walk(sw) {
    for(const i of sw) {
      yield i
      if (i.enter) {
        switch(i.type) {
        case Tag.FunctionDeclaration:
        case Tag.FunctionExpression:
          const j = sl.cur()
          if (j.pos === Tag.id) {
            j.value.key = true
            yield* sl.one()
          }
          break 
        case Tag.MemberExpression:
          yield* walk(sl.one())
          const k = sl.cur()
          if (k.type === Tag.Identifier) {
            k.value.key = true
            yield* sl.one()
          }
          break
        }
      }
    }
  }
  return walk(sl)
}

/**
 * joins not computed MemberExpressions into a single variable 
 * if its object is const and not used anywhere else
 */
export default Kit.pipe(
  markKeyIds,
  collectFuncDecls,
  function joinMemExprCollect(s) {
    const sa = Kit.toArray(s)
    const sl = Kit.auto(sa)
    function walk(dir) {
      for(const i of sl.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Tag.FunctionDefinition:
          case Tag.FunctionExpression:
          case Tag.ArrowFunctionExpression:
            //TODO:
            break
          case Tag.ImportNamespaceSpecifier:
            //TODO:
            break
          case Tag.VariableDeclaration:
            if (i.pos === Tag.push) {
              const vars = i.value.vars = []
              for(const j of sl.sub()) {
                if (j.enter && j.type === Tag.VariableDeclarator) {
                  for(const k of sl.one()) {
                    if (k.enter && k.type === Tag.Identifier) {
                      switch(i.value.node.kind) {
                      case "const":
                        const pack = Kit.hasAnnot(i.value.node,"@PACK")
                          || Kit.hasAnnot(j.value.node,"@PACK")
                        const info = {name:k.value.node.name,
                                      used:new Set(),
                                      enabled:true,
                                      pack}
                        
                        vars.push(info)
                        dir.set(k.value.node.name,info)
                        break
                      case "let":
                        dir.delete(k.value.node.name)
                        break
                      }
                    }
                  }
                  const n = sl.cur()
                  if (n.type === Tag.AssignmentExpression && n.pos === Tag.init) {
                    for(const j of vars)
                      j.enabled = false
                  }
                  walk(dir)
                }
              }
            }
            break
          case Tag.Identifier:
            if (!i.value.key) {
              const info = dir.get(i.value.node.name)
              if (info != null && !info.pack) {
                info.enabled = false
              }
            }
            break
          case Tag.AssignmentExpression:
          case Tag.CallExpression:
            const c = sl.cur()
            if (c.type === Tag.MemberExpression) {
              c.value.discharge = true
            }
            break
          case Tag.MemberExpression:
            const o = sl.cur()
            if (o.type === Tag.Identifier && !i.value.node.computed) {
              const info = dir.get(o.value.node.name)
              if (info != null) {
                if (i.value.discharge && !info.pack) {
                  info.enabled = false
                  break
                }
                Kit.skip(sl.one())
                const p = sl.cur()
                if (p.type !== Tag.Identifier && !info.pack) {
                  info.enabled = false
                  break
                }
                Kit.skip(sl.one())
                const path = i.value.path =
                      [o.value.node.name,p.value.node.name]
                i.value.varInfo = info
                info.used.add(p.value.node.name)
              }
            }
            break
          case Tag.BlockStatement:
            walk(new Map(dir))
          }
        }
      }
    }
    walk(new Map())
    return sa
  },
  function joinMemExprReplace(s) {
    const sl = Kit.auto(s)
    function* walk() {
      for(const i of sl.sub()) {
        if (i.enter) {
          switch(i.type) {
          case Tag.MemberExpression:
            if (i.value.varInfo != null && i.value.varInfo.enabled) {
              Kit.skip(sl.copy(i))
              yield sl.tok(i.pos,T.identifier(i.value.path.join("$")))
              continue
            }
            break
          case Tag.VariableDeclaration:
            if (i.value.vars != null) {
              yield sl.peel(i)
              yield* walk()
              yield* sl.leave()
              for(const j of i.value.vars) {
                if (j.enabled) {
                  for(const k of j.used)
                    yield* sl.toks(Tag.push,
                                   `let ${j.name}$${k} = ${j.name} && ${j.name}.${k}`)
                }
              }
              continue
            }
          }
        }
        yield i
      }
    }
    return walk()
  })

