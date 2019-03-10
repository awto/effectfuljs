/** business logic */
import { createProducer, pipe, anim } from "./kit";
import React from "react";

/**
 * merges all box elements emited on former stage into one
 * @type {Transducer}
 */
export async function* collectBoxes(input) {
  const boxes = {};
  let root;
  for await (const i of input) {
    if (i.type !== "ROOT") yield i;
    switch (i.type) {
      case "BOX":
        boxes[i.key] = i.value;
        yield i;
        break;
      case "DELETE":
        delete boxes[i.key];
        yield i;
        break;
      case "ROOT":
        root = i.value;
        break;
      default:
        yield i;
        continue;
    }
    if (root != null)
      yield {
        type: "ROOT",
        value: React.cloneElement(root, {}, ...Object.values(boxes))
      };
  }
}

/**
 * emits BOX elements when drawing and a resulting box when finished
 * @type {Transducer}
 */
export async function* insertBox(input, event) {
  for await (const i of input) {
    if (i.type === "DONE" || i.type === "MARK")
      yield {
        type: "BOX",
        key: i.key,
        value: (
          <div
            className={i.type === "MARK" ? "drawing" : "box"}
            style={{
              left: Math.min(i.start.x, i.x) + window.pageXOffset,
              top: Math.min(i.start.y, i.y) + window.pageYOffset,
              width: Math.abs(i.start.x - i.x),
              height: Math.abs(i.start.y - i.y)
            }}
            key={i.key}
            onContextMenu={event({ type: "DELETE", key: i.key })}
          />
        )
      };
    yield i;
  }
}

/**
 * emits boxes container, handling draw control flow
 * @type {Transducer}
 */
export async function* rootContainer(input, event) {
  let key = 0;
  for (;;) {
    yield {
      type: "ROOT",
      value: <div onMouseDown={event({ type: "START", key: ++key }, true)} />
    };
    for await (const i of input) {
      yield i;
      if (i.type === "START" && i.button === 0) {
        yield {
          type: "ROOT",
          value: (
            <div
              onMouseUp={event({ type: "DONE", key, start: i })}
              onMouseMove={event({ type: "MARK", key, start: i })}
            />
          )
        };
        break;
      }
    }
    for await (const i of input) {
      yield i;
      if (i.type === "DONE") break;
    }
  }
}

/**
 * adds delete animation
 * @type {Transducer}
 */
export const animateDelete = (opts = {}) =>
  async function* animateDelete(input) {
    for await (const i of input) {
      if (i.type === "DELETE") {
        for await (const j of anim(opts)) {
          yield {
            type: "BOX",
            key: i.key,
            value: (
              <div
                className="box"
                style={{
                  // rounding to avoid dealing with floats in tests
                  left: Math.round(
                    i.rect.x + j * (i.x - i.rect.x) + window.pageXOffset
                  ),
                  top: Math.round(
                    i.rect.y + j * (i.y - i.rect.y) + window.pageYOffset
                  ),
                  width: Math.round(i.rect.width * (1 - j)),
                  height: Math.round(i.rect.height * (1 - j))
                }}
              />
            )
          };
        }
      }
      yield i;
    }
  };
