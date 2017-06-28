import * as R from "ramda"
import * as Kit from "./kit"
import * as T from "babel-types"

import * as trace from "estransducers/trace"
import * as assert from "assert"
import * as Debug from "./debug"

const {Tag} = Kit

/**
 * injects import from `require` options if it doesn't exist already
 * if option `inject` is true, will use `ns` as namespace parameter if 
 * specified or some unique variable
 */
export function* inject(mods,si) {
  const s = Kit.auto(si)
  yield* s.till(i => i.type === Tag.Array && i.pos === Tag.body)
  switch(s.opts.modules) {
  case "commonjs":
    for (const [ns,mod] of mods)
      yield* s.toks(Tag.push,`var $S = require("${mod}")`,ns)
    break
  default:
    for (const [ns,mod] of mods)
      yield* s.toks(Tag.push,`import * as $S from "${mod}"`,ns)
  }
  yield* s
}
