import * as State from "./state";
import * as RT from "./instr/rt";
import config from "./config";

const roots = config.roots && new Set(config.roots);

const Ctx = State.context;

export function wrapExport(top: any, descr: any): any {
  // checking if we are in the managed import
  const res = RT.wrapExport(top, descr);
  const data = top[State.dataSymbol];
  if (!data) return res;
  // debugger;
  if (!Ctx.running && (!roots || roots.has(data.meta.module.name))) {
    RT.unwrapImport(res, data.meta.module.name);
  }
  return res;
}

export const unwrapImport = RT.unwrapImport;
