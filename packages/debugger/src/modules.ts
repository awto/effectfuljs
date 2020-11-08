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
  if (hot && config.hot === true) return;
  const running = context.running;
  const top = context.top;
  try {
    context.running = true;
    runTopLevel(mod);
  } catch (e) {
    if (e === token && !hot) {
      let tail = context.pausedTop;
      weakMapSet.call(State.thunks, cjs.exports, tail);
      if (tail) {
        while (tail) {
          const next: State.Frame | null = tail.next;
          if (next === top) {
            tail.next = null;
            break;
          }
          tail = next;
        }
        context.top = top;
      }
    } else {
      throw e;
    }
  } finally {
    context.running = running;
  }
}
