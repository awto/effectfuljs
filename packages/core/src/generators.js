import * as Kit from "./kit"
import {Tag} from "./kit"
import {scope,jump} from "./control"
import * as Bind from "./bind"
import * as Block from "./block"

/** marks ES syntax extensions as effectful operations  */
export function prepare(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  function* skip() {
    for(const i of s.sub()) {
      yield i
      if (i.enter && i.value.func) {
        yield* func(i.value)
      }
    }
  }
  function func(root) {
    if (root.opts.transform && (root.node.generator || root.node.async))
      return convert(root)
    return skip()
  }
  function* convert(root) {
    root.node.generator = false
    root.node.async = false
    if (root.coerce == null)
      root.coerce = false
    for(const i of s) {
      if (i.enter) {
        switch(i.type) {
        case Tag.ForOfStatement:
          if (!i.value.node.await && s.opts.pureForOf)
            break
        case Tag.AwaitExpression:
        case Tag.YieldExpression:
          i.value.bind = true
          if (!s.curLev()) {
            yield s.peel(i)
            yield s.tok(Tag.argument,Tag.Identifier,
                        {sym:Kit.scope.undefinedSym})
            yield* s.leave()
            continue           
          }
          break
        default:
          if(i.value.func) {
            yield i
            yield* func(i.value)
            continue
          }
        }
      }
      yield i
    }
  }
  return skip()
}

/** replaces `function.sent` to a special temp variable */
export function* functionSentPrepare(si) {
  let sym
  const s = Kit.auto(si)
  const root = s.first.value
  for(const i of s) {
    if (i.enter) {
      switch(i.type) {
      case Tag.MetaProperty:
        const {node} = i.value
        if (node.meta.name === "function" && node.property.name === "sent") {
          if (!sym)
            sym = root.functionSentSym = Bind.tempVarSym(root,"sent")
          yield s.tok(i.pos,Tag.Identifier,{sym,lhs:false,rhs:true,decl:false})
          Kit.skip(s.copy(i))
          continue
        }
      }
    }
    yield i
  }
}

/** assigns the special temp variable for function.sent */
export function functionSentAssign(si) {
  const s = Kit.auto(si)
  const root = s.first.value
  const sym = s.first.value.functionSentSym
  if (!sym)
    return s
  return walk()
  function* walk() {
    for(const i of s) {
      yield i
      if (i.enter && i.type === Block.frame && i.value.wfsent) {
        // function.sent may be used either in this frame or
        // in some next frame in this case it is to be passed there
        let found = false
        up: for(const j of i.value.exits) {
          for(const k of j.gotoDests) {
            if (k.frameParamsClos.has(sym)) {
              found = true
              break up
            }
          }
          if (j.frameArgs && j.frameArgs.has(sym)) {
            found = true
            break
          }
        }
        if (!found) {
          i.value.stateVars.w.delete(sym)
          continue
        }
        // patSym could be cleaned because not used
        let patSym = i.value.patSym || root.commonPatSym
            || (i.value.patSym = Kit.scope.newSym("p"))
        yield s.enter(Tag.push,Tag.AssignmentExpression,{node:{operator:"="}})
        yield s.tok(Tag.left,Tag.Identifier,{sym})
        yield s.tok(Tag.right,Tag.Identifier,{sym:patSym})
        yield* s.leave()
      }
    } 
  }
}

