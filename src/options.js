import {enableIf} from "./kit"

export const ifTopLevel = enableIf(i => i.topLevel)
export const ifState = enableIf(i => i.state === true)
