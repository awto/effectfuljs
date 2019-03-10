/** @file Business logic and controls for a single counter */
import React from "react";
import { buildMenu } from "./menu";
import { pipe, collect, signal } from "./kit";

/**
 * Calculates the current counter value
 *
 * @type {Transducer}
 */
export async function* state(input) {
  let state = 0;
  yield { type: "VALUE", value: state };
  for await (const action of input) {
    switch (action.type) {
      case "INCREMENT":
        yield { type: "VALUE", value: ++state };
        continue;
      case "DECREMENT":
        yield { type: "VALUE", value: --state };
        continue;
    }
    yield action;
  }
}

/**
 * Collects information about current components menu, control and value
 *
 * @type {Transducer}
 */
export const prepControl = pipe(
  buildMenu,
  controlsList,
  collect(["MENU", "CONTROL", "VALUE"])
);

/**
 * Combines control's list items into a single control, using React fragments
 *
 * @type {Transducer}
 */
export async function* controlsList(input) {
  const values = {};
  for await (const i of input) {
    if (i.type === "ITEM") {
      if (i.value.type === "DELETE") {
        delete values[i.key];
      } else if (i.value.type === "CONTROL") {
        values[i.key] = React.cloneElement(i.value.value, { key: i.key });
      } else {
        yield i;
        continue;
      }
      yield { type: "CONTROL", value: <>{Object.values(values)}</> };
    } else yield i;
  }
}

/**
 * Calculates sum of all children counter's values
 *
 * @type {Transducer}
 */
export async function* totals(input) {
  const values = {};
  for await (const i of input) {
    yield i;
    if (i.type === "ITEM") {
      if (i.value.type === "DELETE") {
        delete values[i.key];
      } else if (i.value.type === "VALUE") {
        values[i.key] = i.value.value;
      } else continue;
      const arr = Object.values(values);
      yield {
        type: "MENU_ITEM",
        index: 5000,
        value: arr.length ? <b>Total {arr.reduce((a, b) => a + b, 0)}</b> : null
      };
    }
  }
}

/**
 * Emits counter control React element
 *
 * @type {Transducer}
 */
export async function* mainControl(input, dispatch) {
  for await (const i of prepControl(input))
    yield i.type === "COLLECTION"
      ? {
          type: "CONTROL",
          value: (
            <>
              <p>
                Clicked: {i.value.VALUE} times
                <button onClick={signal(dispatch, "INCREMENT")}>+</button>
                <button onClick={signal(dispatch, "DECREMENT")}>-</button>
                {i.value.MENU}
              </p>
              <div style={{ paddingLeft: 10 }}>{i.value.CONTROL}</div>
            </>
          )
        }
      : i;
}
