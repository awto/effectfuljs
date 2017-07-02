import {enableIf} from "./kit"

export const ifTopLevel = enableIf(i => i.topLevel)
export const ifState = enableIf(i => i.state === true)
export const ifJsExceptions = enableIf(i => i.jsExceptions === true)
export const ifEsRebind = enableIf(i => i.esRebind === true)


