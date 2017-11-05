import * as Kit from "./kit"
import {enter,leave,tok,symKind,Tag} from "./kit"
import * as Match from "estransducers/match"
import dump from "estransducers/dump"
import * as Debug from "./debug"

export const iife = Kit.pipe(
  Match.run("=(() => { return $$; })()"),
  function(s) {
    s = Kit.auto(s)
    function* walk() {
      for(const i of s.sub()) {
        if (i.type === Match.Root) {
          if (i.enter) {
            for(const j of s.sub()) {
              if (j.enter && j.type === Match.Placeholder) {
                yield s.enter(i.pos,Kit.Subst)
                yield* walk()
                yield* s.leave()
              }
            }
          }
        } else
          yield i
      }
    }
    return walk()
  },
  Kit.completeSubst)

export default Kit.pipe(iife)

// TODO:
export function inlineBinds() {
}


