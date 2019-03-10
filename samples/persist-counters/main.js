/** @file application's entry point */
import React from "react";
import * as Counter from "./counter";
import { menuButton } from "./menu";
import { flushing, run, pipe, render } from "./kit";
import fork from "./fork";
import saveLocal from "./storage";
import undoRedo from "./undoredo";
import { incrementAsync, incrementIfOdd } from "./extras";

import trace from "./trace";

/**
 * outputs root's control on each `MENU` or `CONTROL` change
 * @type {Transducer}
 */
async function* rootControl(input) {
  for await (const i of Counter.prepControl(input)) {
    yield i.type === "COLLECTION"
      ? {
          type: "CONTROL",
          value: (
            <div>
              <div>{i.value.MENU}</div>
              <div>{i.value.CONTROL}</div>
            </div>
          )
        }
      : i;
  }
}

/**
 * recursive invocation for tree nodes
 * @type {Transducer}
 */
const rec = pipe(
  fork(
    pipe(
      menuButton(100, { type: "NEW" }),
      menuButton(500, { type: "DELETE" }),
      Counter.state,
      incrementAsync,
      incrementIfOdd,
      (input, dispatch) => rec(input, dispatch),
      Counter.mainControl
    )
  ),
  Counter.totals
);

/** entry point */
run(
  pipe(
    flushing,
    saveLocal,
    undoRedo,
    menuButton(100, { type: "NEW" }),
    rec,
    rootControl,
    render(document.getElementById("root"))
  )
);
