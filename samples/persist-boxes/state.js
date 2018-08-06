/**
 * Implementation of storing state in localStorage and Undo/Redo
 */
import * as R from "@effectful/es-persist-serialization"
import React from "react"

async function* addFlush(input) {
  for await(const i of input) {
    yield i
    if (i.type === "DELETE" || i.type === "DONE")
      yield {type:"FLUSH"}
  }
}

export async function* saveLocal(input) {
  if (!await R.managed) {
    yield* input
    return
  }
  try {
    const init = localStorage.getItem("boxes")
    if (init) {
      const state = R.read(JSON.parse(init))
      R.context().running = state.running
      state.resume.resume()
      await R.abort
    }
  } catch(e) {
  }
  for await(const i of addFlush(input)) {
    yield i
    if (i.type === "DELETE" || i.type === "DONE") {
      let frame
      const resume = await R.idle
      if (resume && resume.resume) {
        frame = R.write({running:R.context().running,resume}) 
        localStorage.setItem("boxes", JSON.stringify(frame))
      }
    }
  }
}

