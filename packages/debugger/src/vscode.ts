{
  let lib: any;
  const config = require("./config").default;
  if (
    !config.globalNS ||
    !(lib = (<any>global)[config.globalNS]) ||
    lib.runtime !== "vscode"
  ) {
    lib = { ...require("./main"), ...require("./vscode/main") };
    if (config.globalNS) (<any>global)[config.globalNS] = lib;
    lib.Serialization.regModule(lib,"#EDBG");
    lib.runtime = "vscode";
  }
  lib.Serialization.updateInitialSnapshot(global);
  module.exports = lib;
}
