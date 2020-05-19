import * as State from "./state";
import { wrapModule } from "./instr/rt";
import config from "./config";
import { compileModule } from "./engine";

const { context, token, saved } = State;
const weakMapSet = saved.WeakMap.set;

export function runTopLevel(mod: State.Module) {
  const cjs = mod.cjs;
  const id = (mod.cjs && mod.cjs.id) || "anonymous";
  context.call = id === context.moduleId ? wrapModule : null;
  context.moduleId = null;
  if (wrapModule(mod, cjs) === token)
    weakMapSet.call(State.thunks, cjs.exports, State.returnToken);
  return cjs.exports;
}

export function moduleExports() {
  const mod = compileModule();
  if (!mod) return;
  const cjs = mod.cjs;
  const hot = mod.version > 0;
  if (config.verbose)
    saved.console.log(
      `DEBUGGER: exporting:"${cjs.id}", "${context.moduleId}", fullPath:"${mod.fullPath}", name:"${mod.name}"`
    );
  if (context.onLoad) context.onLoad(mod, hot);
  if (hot) return;
  try {
    runTopLevel(mod);
  } catch (e) {
    if (e !== token) throw e;
    weakMapSet.call(State.thunks, cjs.exports, State.throwToken);
  }
}
