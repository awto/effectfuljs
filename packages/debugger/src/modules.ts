import * as State from "./state";
import { persistModule } from "./instr/rt";
import config from "./config";
import { getCurModule } from "./engine";

const { context, token, thunkSymbol, saved } = State;

const { defineProperty } = saved.Object;

export function moduleExports() {
  const mod = getCurModule();
  const topMeta = mod.topLevel;
  const cjs = mod.cjs;
  const hot = mod.version > 0;
  if (config.verbose)
    saved.console.log(
      `DEBUGGER: exporting:"${cjs.id}", "${context.moduleId}", fullPath:"${mod.fullPath}", name:"${mod.name}"`
    );
  if (context.onLoad) context.onLoad(mod, hot);
  if (hot) return;
  const fun = topMeta.func(null);
  context.call = cjs && cjs.id === context.moduleId ? persistModule : null;
  context.moduleId = null;
  try {
    if (persistModule(fun, mod.name, cjs, cjs.exports) !== token) return;
    defineProperty(cjs.exports, thunkSymbol, { value: 1, configurable: true });
  } catch (e) {
    if (e !== token) throw e;
    defineProperty(cjs.exports, thunkSymbol, { value: 2, configurable: true });
  }
}
