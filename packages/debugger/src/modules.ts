import config from "./config";
import * as State from "./state";
import { wrapModule } from "./instr/rt";
import { compileModule } from "./engine";

const { context, token, native } = State;
const weakMapSet = native.WeakMap.set;

export function runTopLevel(mod: State.Module) {
  const cjs = mod.cjs;
  const id = (mod.cjs && mod.cjs.id) || "anonymous";
  context.call = id === context.moduleId ? wrapModule : null;
  context.moduleId = null;
  wrapModule(mod, cjs);
  return cjs.exports;
}

export function moduleExports() {
  const mod = compileModule();
  if (!mod) return;
  const cjs = mod.cjs;
  const hot = mod.version > 0;
  if (config.verbose)
    native.console.log(
      `DEBUGGER: exporting:"${cjs.id}", "${context.moduleId}", fullPath:"${mod.fullPath}", name:"${mod.name}"`
    );
  if (context.onLoad) context.onLoad(mod, hot);
  if (hot) return;
  const running = context.running;
  try {
    context.running = true;
    runTopLevel(mod);
  } catch (e) {
    if (e === token) {
      weakMapSet.call(State.thunks, cjs.exports, State.throwToken);
    } else {
      throw e;
    }
  } finally {
    context.running = running;
  }
}
