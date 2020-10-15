"use strict";

const config = require("./config").default;

let lib;
if (
  !config.globalNS ||
  !(lib = global[config.globalNS]) ||
  lib.runtime !== "vscode"
) {
  const scheduler = config.timeTravel
    ? require("./deps-t/scheduler/cjs/scheduler.production.min.js")
    : require("./deps-n/scheduler/cjs/scheduler.production.min.js");
  const S = require("@effectful/serialization");
  S.regOpaqueRec(scheduler, "@effectful/react/scheduler");
  const { closures, context } = require("./state");
  if (typeof MessageChannel !== "undefined") {
    let count = 0;
    const someFunction = closures.get(
      Object.values(scheduler).find(i => typeof i === "function")
    );
    for (const i of someFunction.parent.$) {
      if (i instanceof MessageChannel || i instanceof MessagePort)
        S.regOpaqueObject(i, `@effectful/scheduler/msg#${count++}`);
    }
  }
  lib = require("./vscode");
  const savedOnLoad = context.onLoad;
  context.onLoad = function(module, hot) {
    try {
    } finally {
      if (savedOnLoad) savedOnLoad(module, hot);
    }
  };
} else lib.Serialization.updateInitialSnapshot(global);

module.exports = lib;
