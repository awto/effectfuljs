/** @file increment async and incremet if odd */
import * as R from "@effectful/es-persist-serialization"
import * as Kit from "./kit"
import React from "react"

function runIncrementAsync(dispatch) {
  setTimeout(() => dispatch({type:"INCREMENT"}), 1000)
}
R.regOpaqueObject(runIncrementAsync)

/** adds Increment Async button */
export async function* incrementAsync(input, dispatch) {
  yield {type:"MENU_ITEM",
         index:300,
         value:<button onClick={R.bind(runIncrementAsync,void 0,dispatch)}>
                  Increment Async
               </button> }
  yield* input
}

function nop() {}
R.regOpaqueObject(nop)

export async function* incrementIfOdd(input, dispatch) {
  for await(const i of input) {
    if (i.type === "VALUE")
      yield {type:"MENU_ITEM",index:400,
             value:<button onClick={i.value % 2 !== 0 ? Kit.signal(dispatch,"INCREMENT") : nop}>
                     Increment if odd
                    </button>}
    yield i
  }
}
