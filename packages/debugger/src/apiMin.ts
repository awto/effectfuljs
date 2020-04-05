export * from "./engine";
export * from "./async";
import { saved, context, journal } from "./state";
import config from "./config";
import { getCurModule } from "./engine";
if (config.globalNS && !(<any>global)[config.globalNS])
  (<any>global)[config.globalNS] = exports;
export { context, journal, saved };

export function moduleExports() {
  const mod = getCurModule();
  const topMeta = mod.topLevel;
  const cjs = mod.cjs;
  if (config.verbose)
    saved.console.log(
      `DEBUGGER: exporting pure module "${cjs.id}", "${context.moduleId}", fullPath:"${mod.fullPath}", name:"${mod.name}"`
    );
  context.moduleId = null;
  const func = topMeta.func(null);
  func();
}

export function unwrapImport(v: any): any {
  return v;
}
