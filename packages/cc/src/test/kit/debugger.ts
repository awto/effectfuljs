"no-ctrl";

import { context, token, loop } from "@effectful/debugger/apiMin";

const TRACE = false;

export function debuggerLoop(fn: () => void): () => void {
  return function () {
    const savedEnabled = context.enabled;
    const savedLaunched = context.launched;
    const savedNeedsBreak = context.needsBreak;
    context.needsBreak = function (brk: any, frame: any, _param: any) {
      return brk !== frame.meta.exitBreakpoint;
    };
    context.enabled = true;
    context.launched = true;
    context.call = fn;
    const startTop = context.top;
    // context.top = null;
    context.running = true;
    try {
      if (TRACE)
        console.log("START")
      fn();
    } catch (e) {
      if (e !== token) throw e;
      for (;;) {
        if (TRACE)
          console.log(
            "STOPPED: ",
            context.brk?.location,
            context.brk?.meta.origName,
            context.brk?.meta.location,
            context.brk?.meta.module.fullPath,
          );
        try {
          const res = loop(void 0, startTop);
          if (res !== token) return res;
        } catch (e) {
          if (e !== token) throw e;
          continue;
        }
      }
    } finally {
      context.enabled = savedEnabled;
      context.launched = savedLaunched;
      context.needsBreak = savedNeedsBreak;
      context.top = startTop;
    }
  };
}

function wrapIt(): typeof it {
  const It = function (name: string, body: () => void) {
    it(name, debuggerLoop(body))
  };
  It.only = function (name: string, body: () => void) {
    it.only(name, debuggerLoop(body))
  }
  It.skip = it.skip;
  return It as any;
}

export const wrappedIt = wrapIt();