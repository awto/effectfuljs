import * as R from "@effectful/es-persist-serialization"
import {save, load} from "./state"

/** 
 * saves application state into `localStorage` on each message 
 * @type {Transducer}
 */
export default async function* saveLocal(input) {
  if (!await R.managed) {
    yield* input
    return
  }
  try {
    const init = localStorage.getItem("counters")
    if (init)
      await load(JSON.parse(init))
  } catch(e) {}
  for await(const i of input) {
    yield i
    if (i.type === "FLUSH") {
      const frame = await save()
      if (frame)
        localStorage.setItem("counters", JSON.stringify(frame))
      else
        yield i
    }
  }
}

