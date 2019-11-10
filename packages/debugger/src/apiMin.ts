export * from "./engine";
export * from "./async";
export { context } from "./state";
import config from "./config"

if (config.globalNS)
  (<any>global)[config.globalNS] = exports;
