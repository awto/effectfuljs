import * as State from "./state";
import * as RT from "./instr/rt";
import config from "./config";

const Ctx = State.context;

export const unwrapImport = RT.unwrapImport;

export function wrapExport(top: any): any {
  const data = top[State.dataSymbol];
  if (!data) return top;
  const mod = data.meta.module;
  const cjs = mod.cjs;
  const hot = mod.version > 0;
  const force = !hot && (!cjs || cjs.id !== Ctx.moduleId);
  if (config.verbose)
    State.saved.console.log(
      `exporting "${cjs.id}"/"${Ctx.moduleId}", fullPath:"${
        mod.fullPath
      }", name:"${mod.name}" run:${force}`
    );
  Ctx.moduleId = null;
  const res = (Ctx.call = RT.wrapExport)(top, mod);
  if (Ctx.onLoad) Ctx.onLoad(mod, hot);
  if (force) {
    Ctx.call = null;
    return RT.unwrapImport(res, mod.name);
  }
  Ctx.call = RT.unwrapImport;
  return res;
}
