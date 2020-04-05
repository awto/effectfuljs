{
  let lib: any;
  const config = require("../config").default;
  if (
    !config.globalNS ||
    !(lib = (<any>global)[config.globalNS]) ||
    lib.backend !== "vscode"
  ) {
    const { capture, restore } = require("../vscode/handlers");
    lib = { ...require("../main"), backend: "vscode", capture, restore };
    if (config.globalNS) (<any>global)[config.globalNS] = lib;
    lib.Serialization.regModule(lib,"#EDBG");
  }
  lib.Serialization.updateInitialSnapshot(global);
  module.exports = lib;
}
