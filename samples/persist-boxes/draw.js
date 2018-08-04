/** business logic */
import {createProducer,pipe, anim} from "./kit"
import ReactDOM from "react-dom"
import React from "react"

/**
 * merges all box elements emited on former stage into one 
 */
export async function collectBoxes(input) {
  const element = document.getElementById("root")
  const boxes = {}
  let container
  for await(const i of input) {
    switch(i.type) {
    case "BOX":
      boxes[i.key] = i.value
      break
    case "DELETE":
      delete boxes[i.key]
      break
    case "ROOT":
      container = i.value
      break
    default:
      continue
    }
    ReactDOM.render(
      React.cloneElement(container,{},...Object.values(boxes)),
      element)
  }
}

/** emits BOX elements when drawing and a resulting box when finished */
export async function* insertBox(input, event) {
  for await(const i of input) {
    if (i.type === "DONE" || i.type === "MARK")
      yield {type:"BOX",
             key:i.key,
             value:
               <div className={i.type === "MARK" ? "drawing" : "box"}
                 style={{left: Math.min(i.start.x, i.x) + window.pageXOffset,
                         top: Math.min(i.start.y, i.y) + window.pageYOffset,
                         width: Math.abs(i.start.x - i.x), 
                         height: Math.abs(i.start.y - i.y)}}
                 key={i.key}
                 onContextMenu={event({type:"DELETE",key:i.key})}/>}
    yield i
  }
}

/** emits boxes container, handling draw control flow */
export async function* rootContainer(input, event) {
  let key = 0
  for(;;) {
    yield {type:"ROOT",
           value: <div onMouseDown={event({type:"START",key:++key},true)}/>}
    for await(const i of input) {
      yield i
      if (i.type === "START" && i.button === 0) {
        yield {type:"ROOT",
               value: <div
                 onMouseUp={event({type:"DONE",key,start:i})}
                 onMouseMove={event({type:"MARK",key,start:i})}/>}
        break
      } 
    }
    for await(const i of input) {
      yield i
      if (i.type === "DONE")
        break
    }
  }
}

/** adds delete animation */
export const animateDelete = (opts = {}) => async function* animateDelete(input) {
  for await(const i of input) {
    if (i.type === "DELETE") {
      for await(const j of anim(opts)) {
        yield {
          type:"BOX",
          key:i.key,
          value: <div className="box"
            style={{
              // rounding to avoid dealing with floats in tests
              left: Math.round(i.rect.x + j * (i.x - i.rect.x) + window.pageXOffset),
              top: Math.round(i.rect.y + j * (i.y - i.rect.y) + window.pageYOffset),
              width: Math.round(i.rect.width * (1 - j)),
              height: Math.round(i.rect.height * (1 - j))
            }}/>
        }
      }
    }
    yield i
  }
}

