/* eslint-disable @typescript-eslint/no-this-alias */
import config from "./config";
import * as State from "./state";
import { wrapModule } from "./instr/rt";
import { compileModule } from "./engine";
import { regOpaqueObject } from "./persist";

const { context, token, native } = State;
const weakMapSet = native.WeakMap.set;

function resumeModule(this: State.Frame | null) {
  let tail = this;
  if (tail) {
    while (tail.next) tail = tail.next;
    tail.next = context.top;
    context.top = this;
  }
  throw token;
}

regOpaqueObject(resumeModule, "#resume");

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
      let tail = context.top;
      weakMapSet.call(State.thunks, cjs.exports, resumeModule.bind(tail));
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
