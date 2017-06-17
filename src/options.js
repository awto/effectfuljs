import {enableIf} from "./kit"

export const ifLeft = enableIf(i => i.chain === "left")
export const ifRight = enableIf(i => i.chain === "right")
export const ifLFlat = enableIf(i => i.chain === "leftFlat" || !i.chain)
export const ifNested = enableIf(i => i.chain !== "leftFlat")
export const ifState = enableIf(i => i.state === true)
export const ifClosure = enableIf(i => i.closure === true)
export const onChainType = (opts) => {
  let cur = opts.lflat
  if (opts.right != null)
    cur = enableIf(i => i.chain === "right", opts.right, cur)
  if (opts.left != null)
    cur = enableIf(i => i.chain === "left", opts.left, cur)
  return cur
}
