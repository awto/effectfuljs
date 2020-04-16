const config = require("./config").default;
let lib;
{
  if (
    !config.globalNS ||
    !(lib = (<any>global)[config.globalNS]) ||
    lib.runtime !== "vscode"
  ) {
    const { scheduler } = require("./instr/reactPatches");
    const S = require("@effectful/serialization");
    S.regOpaqueRec(scheduler, "@effectful/react/scheduler");
    const { dataSymbol } = require("./state");
    if (typeof MessageChannel !== "undefined") {
      let count = 0;
      const someFunction: any = Object.values(scheduler).find(
        (i) => typeof i === "function"
      );
      for (const i of someFunction[dataSymbol].$) {
        if (i instanceof MessageChannel || i instanceof MessagePort)
          S.regOpaqueObject(i, `@effectful/scheduler/msg#${count++}`);
      }
    }
    lib = require("./vscode");
  } else lib.Serialization.updateInitialSnapshot(global);
  module.exports = lib;
}
