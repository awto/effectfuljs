export * from "./apiMin";
export * from "./generator";
export * from "./asyncGenerator";
export { moduleExports } from "./modules";
import config from "./config";
import * as TimeTravel from "./timeTravel/main";
export { TimeTravel };
export { config };
if (config.globalNS && !(<any>global)[config.globalNS])
  (<any>global)[config.globalNS] = exports;
