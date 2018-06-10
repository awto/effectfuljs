/** 
 * @file component and main menu handling
 */
import React from "react"
import {signal} from "./kit"

/**
 * collect "MENU_ITEM" messages into "MENU" control
 * @type {Transducer}
 */
export async function* buildMenu(input) {
  const items = {}
  for await(const i of input) {
    if (i.type === "MENU_ITEM") {
      items[i.index] = i.value && React.cloneElement(i.value,{key:i.index})
      yield {type:"MENU", value:<>{Object.values(items)}</>}
    } else
      yield i
  }
}

function guessText(value) {
  let text = value.type[0] + value.type.slice(1).toLowerCase()
  if (value.async)
    text += " async"
  if (value.test)
    text += ` if ${value.test.toLowerCase()}`
  return text
}

/** 
 * makes transducer emitting a menu button,
 * it will dispatch message `value` on clicking
 *
 * @param {number} index - relative button's position, should be unique
 * @param {Message} value 
 */
export function menuButton(index,value) {
  return async function* menuButton(input, dispatch) {
    yield {type:"MENU_ITEM",
           index,
           value:<button onClick={signal(dispatch,value.type,value)}>
                   {guessText(value)}
                 </button>}
    yield* input
  }
}

