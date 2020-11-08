"use strict";

const config = require("./config").default;

const REACT_RENDER_FLAG = 1 << 21;

let lib;
if (
  !config.globalNS ||
  !(lib = global[config.globalNS]) ||
  lib.runtime !== "vscode"
) {
  const scheduler = config.timeTravel
    ? require("./deps-t/scheduler/cjs/scheduler.development.js")
    : require("./deps-n/scheduler/cjs/scheduler.development.js");
  const react = config.timeTravel
    ? require("./deps-t/react/cjs/react.development.js")
    : require("./deps-n/react/cjs/react.development.js");
  const S = require("@effectful/serialization");
  S.regOpaqueRec(scheduler, "@effectful/react/scheduler");
  S.regOpaqueRec(react, "@effectful/react");
  const {
    mergeVersions,
    closures,
    context,
    native,
    CLOSURE_PARENT,
    CLOSURE_META,
    CLOSURE_FUNC
  } = require("./state");
  if (typeof MessageChannel !== "undefined") {
    let count = 0;
    const someFunction = closures.get(
      Object.values(scheduler).find(i => typeof i === "function")
    );
    for (const i of someFunction[CLOSURE_PARENT].$) {
      if (i instanceof MessageChannel || i instanceof MessagePort)
        S.regOpaqueObject(i, `@effectful/scheduler/msg#${count++}`);
    }
  }
  lib = require("./vscode");
} else lib.Serialization.updateInitialSnapshot(global);

module.exports = lib;
