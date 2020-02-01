import * as State from "./state";
import * as RT from "./instr/rt";
import config from "./config";

const context = State.context;

export function unwrapImport(mod: any, name: string) {
  return (context.call = RT.unwrapImport)(mod, name);
}

export function wrapExport(top: any): any {
  const data = top[State.dataSymbol];
  if (!data) return top;
  const mod = data.meta.module;
  const cjs = mod.cjs;
  const hot = mod.version > 0;
  const force =
    (!config.expEagerModuleExport || context.top) &&
    !hot &&
    (!cjs || cjs.id !== context.moduleId);
  if (config.verbose)
    State.saved.console.log(
      `DEBUGGER: exporting "${cjs.id}", "${context.moduleId}", fullPath:"${mod.fullPath}", name:"${mod.name}" run:${force}`
    );
  context.moduleId = null;
  const res = (context.call = RT.wrapExport)(top, cjs);
  if (context.onLoad) context.onLoad(mod, hot);
  if (force) {
    context.call = null;
    return RT.unwrapImport(res, mod.name);
  }
  context.call = RT.unwrapImport;
  return res;
}
