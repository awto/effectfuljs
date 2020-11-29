"use strict";

const config = require("./config").default;

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
  const { closures, context, CLOSURE_PARENT } = require("./state");
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
  const savedContextOnAfterLoad = context.onAfterLoad;
  context.onAfterLoad = function(mod) {
    // this is taken from NextJS, may be better to use some more generic handlers
    if (typeof self !== "undefined" && "$RefreshHelpers$" in self) {
      const module = mod.cjs;
      const currentExports = module.exports;
      const hotData = module.hot.data;
      const prevExports = (hotData && hotData.prevExports) || null;
      self.$RefreshHelpers$.registerExportsForReactRefresh(
        currentExports,
        module.i
      );
      if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
        module.hot.dispose(function(data) {
          data.prevExports = currentExports;
        });
        module.hot.accept();
        if (prevExports !== null) {
          if (
            self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(
              prevExports,
              currentExports
            )
          )
            module.hot.invalidate();
          else self.$RefreshHelpers$.scheduleUpdate();
        }
      } else {
        var isNoLongerABoundary = prevExports !== null;
        if (isNoLongerABoundary) module.hot.invalidate();
      }
    }
    savedContextOnAfterLoad && savedContextOnAfterLoad(mod);
  };
} else lib.Serialization.updateInitialSnapshot(global);

module.exports = lib;
