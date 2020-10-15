export * from "./engine";
export * from "./async";
import { native, context, journal } from "./state";
import config from "./config";
import { compileModule } from "./engine";
export { context, journal, native };
export { forInIterator } from "./state";
export { __effectful_mcall as mcall } from "./engine";

export function moduleExports() {
  const mod = compileModule();
  if (!mod) return;
  const topMeta = mod.topLevel;
  const cjs = mod.cjs;
  if (config.verbose)
    native.console.log(
      `DEBUGGER: exporting pure module "${cjs.id}", "${context.moduleId}", fullPath:"${mod.fullPath}", name:"${mod.name}"`
    );
  context.moduleId = null;
  const func = topMeta.func(null);
  func();
}

export function unwrapImport(v: any): any {
  return v;
}
