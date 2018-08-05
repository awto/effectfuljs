/**
 * Implementation of storing state in localStorage and Undo/Redo
 */
import * as R from "@effectful/es-persist-serialization"
import React from "react"

const undoStack = []
const redoStack = []

/** 
 * Returns JSON serialiable reference to the current thread state.
 *
 * @returns {Object}
 */
async function save() {
  const resume = await R.idle
  if (resume && resume.resume)
    return R.write({running:R.context().running,resume})
  return resume
}

/** 
 * Restores current application state to `from`.
 * The value is result of some former `save` invocation. 
 * After calling the function the current continuation will be abort 
 * and execution will continue
 * from the point where `save` was called.
 *
 * @param {Object} from
 * @param {any} param - result of `await save()` in the resumed continuation
 */
async function load(from, param) {
  if (!from)
    return
  const state = R.read(from)
  R.context().running = state.running
  state.resume.resume(param)
  await R.abort
}

/** 
 * implements undo-redo logic 
 * @type {Transducer}
 */
export async function* undoRedo(input) {
  yield* await R.managed ? _undoRedo() : input
  async function* _undoRedo() {
    for await(const i of input) {
      const frame = await save()
      if (frame) {
        frame = R.write({running:R.context().running,resume})
        switch(i.type) {
        case "UNDO":
          redoStack.push(frame)
          await load(undoStack.pop())
          break
        case "REDO":
          undoStack.push(frame)
          await load(redoStack.pop())
          break
        default:
          undoStack.push(frame)
          redoStack.length = 0
        }
        yield i
      }
    }
  }
}

/** 
 * adds Undo/Redo buttons into root 
 * @type {Transducer}
 */
export async function* undoRedoMenu(input, event) {
  yield* await R.managed ? _undoRedoMenu() : input
  async function* _undoRedoMenu() {
    for await(const i of input) {
      yield i.type !== "ROOT" ? i :
        {...i,
         value: <div>
           <button disabled={!undoStack.length} onClick={event({type:"UNDO"})}>Undo</button>
           <button disabled={!redoStack.length} onClick={event({type:"REDO"})}>Redo</button>
           {i.value}
         </div>}
    }
  }
}

