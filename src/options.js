import {enableIf} from "./kit"

export const ifTopLevel = enableIf(i => i.topLevel)
export const ifState = enableIf(i => i.state === true)
export const ifJsExceptions = enableIf(i => i.jsExceptions === true)
export const ifEsRebind = enableIf(i => i.esRebind === true)
export const ifDirectives = enableIf(i => i.directives !== false)
export const ifContextState = enableIf(i => i.contextState)
export const ifLoose = enableIf(i => i.loose)

export function validate(opts) {
  const errors = []
  if (opts.contextState)
    if (!opts.contextState)
      errors.push("`contextState` cannot be specified without `scopeContext`")
    if (!opts.contextState)
      errors.push("`contextMethodOps` cannot be specified without `scopeContext`")
  return errors
}
