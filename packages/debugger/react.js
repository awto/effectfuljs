"use strict";

const config = require("./config").default;

let lib;
if (!config.globalNS || !(lib = global[config.globalNS]) || lib.runtime !== "vscode") {
  const scheduler = config.timeTravel ? require("./deps/scheduler-t.js") : require("./deps/scheduler.js");
  const S = require("@effectful/serialization");
  S.regOpaqueRec(scheduler, "@effectful/react/scheduler");
  const { dataSymbol } = require("./state");
  if (typeof MessageChannel !== "undefined") {
    let count = 0;
    const someFunction = Object.values(scheduler).find(i => typeof i === "function");
    for (const i of someFunction[dataSymbol].$) {
      if (i instanceof MessageChannel || i instanceof MessagePort) S.regOpaqueObject(i, `@effectful/scheduler/msg#${count++}`);
    }
  }

  lib = require("./vscode");
} else lib.Serialization.updateInitialSnapshot(global);

module.exports = lib;