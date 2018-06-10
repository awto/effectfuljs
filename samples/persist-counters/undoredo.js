/** 
 * @file Undo-Redo functionality for applications 
 */
import * as R from "@effectful/es-persist-serialization"
import React from "react"
import {save, load} from "./state"
import {pipe,signal} from "./kit"

const undoStack = []
const redoStack = []

/** 
 * sets application's state to corresponding undo/redo position 
 * @type {Transducer}
 */
export async function* undoRedo(input) {
  for await(const i of input) {
    if (i.type === "FLUSH" || i.store === false) {
      yield i
      continue
    }
    const frame = await save()
    if (frame) {
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

/** 
 * adds undo/redo buttons 
 * @type {Transducer}
 */
async function* undoRedoMenu(input, dispatch) {
  for await(const i of input) {
    if (i.type === "FLUSH")
      yield {type:"MENU_ITEM", index: 200,
             value: <>
             {undoStack.length
                ? <button onClick={signal(dispatch,"UNDO")}>Undo</button> : null}
             {redoStack.length
                ? <button onClick={signal(dispatch,"REDO")}>Redo</button> : null}
             </>}
    yield i
  }
}

/** 
 * entry point for undo/redo feature if the program works 
 * in "@effectful/es-persist" environment 
 * @type {Transducer}
 */
const main = pipe(undoRedo, undoRedoMenu)

/** 
 * entry point for undo/redo feature
 * @type {Transducer}
 */
export default async function* undoRedoMain(input, dispatch) {
  yield* await R.managed ? main(input, dispatch) : input
} 
