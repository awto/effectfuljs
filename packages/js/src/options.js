import {enableIf} from "./kit"

export const ifTopLevel = enableIf(i => i.opts.topLevel)
export const ifState = enableIf(i => i.opts.state === true)
export const ifJsExceptions = enableIf(i => i.opts.jsExceptions === true)
export const ifEsRebind = enableIf(i => i.opts.esRebind === true)
export const ifDirectives = enableIf(i => i.opts.directives !== false)
export const ifContextState = enableIf(i => i.opts.contextState)
export const ifLoose = enableIf(i => i.opts.loose)
export const ifDefunct = enableIf(i => i.opts.defunct)

export function validate(opts) {
  const errors = []
  if (opts.contextState && !opts.scopeContext)
    errors.push("`contextState` cannot be specified without `scopeContext`")
  if (opts.contextMethodOps && !opts.scopeContext)
    errors.push("`contextMethodOps` cannot be specified without `scopeContext`")
  if (opts.topLevel && opts.contextBy === "reference")
    errors.push("`topLevel` cannot be specified with `contextBy:'reference'`")
  return errors
}
