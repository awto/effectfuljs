{
  let lib: any;
  const config = require("./config").default;
  if (
    !config.globalNS ||
    !(lib = (<any>global)[config.globalNS]) ||
    lib.runtime !== "vscode"
  ) {
    const { capture, restore } = require("./vscode/handlers");
    lib = { ...require("./main"), capture, restore };
    if (config.globalNS) (<any>global)[config.globalNS] = lib;
    lib.Serialization.regModule(lib,"#EDBG");
    lib.runtime = "vscode";
  }
  lib.Serialization.updateInitialSnapshot(global);
  module.exports = lib;
}
