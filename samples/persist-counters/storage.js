import * as R from "@effectful/es-persist-serialization";
import { save, load } from "./state";

/**
 * saves application state into `localStorage` on each message
 * @type {Transducer}
 */
export default async function* saveLocal(input) {
  if (!(await R.managed)) {
    yield* input;
    return;
  }
  try {
    const init = localStorage.getItem("counters");
    if (init) await load(JSON.parse(init));
  } catch (e) {
    console.log("could not load", e)
  }
  for await (const i of input) {
    if (i.type === "FLUSH") {
      const frame = await save();
      if (frame) localStorage.setItem("counters", JSON.stringify(frame));
    }
    yield i;
  }
}
