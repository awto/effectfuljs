export * from "./apiMin";
export * from "./generator";
export * from "./asyncGenerator";
export { unwrapImport, wrapExport } from "./modules";
import config from "./config"

if (config.globalNS)
  (<any>global)[config.globalNS] = exports;
