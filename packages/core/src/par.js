/** 
 * implicit parallelization, detecting Applicative combinators 
 */

import * as Kit from "./kit"
import {Tag} from "./kit"

export function prepare(root, frames) {
  if (!root.opts.par)
    return
  const chains = []
  const seen = root.opts.denyClone && new Set()
  const inits = new Set()
  start(root.first)
  function start(from) {
    if (inits.has(from))
      return
    inits.add(from)
    const chain = []
    let cur = from
    for(;!cur.dynamicJump && cur.exits.size === 1 && chain.indexOf(cur) === -1;
        [{goto:cur}] = cur.exits) {
      if (seen) {
        if (seen.has(cur))
          continue
        seen.add(cur)
      }
      chain.push(cur)
    }
    if (cur && !cur.dynamicJump && cur.exits.size > 1) {
      for(const i of cur.exits)
        start(i.goto)
    }
    if (chain.length > 1)
      chains.push(chain)
  }
}




