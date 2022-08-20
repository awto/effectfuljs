/**
 * Implementation (partial) of v8 Stack-Trace API
 * https://v8.dev/docs/stack-trace-api
 *
 * This is needed for npm packages such as "bindings"
 * 
 * TODO: monkey patch runtime Error constructors 
 */

import { native, context, Frame, CLOSURE_FUNC, Brk } from "./state";
import config from "./config";
import { isNode } from "./state";

const NativeError = native.Error;

class CallSite {
  constructor(public frame: Frame, public brk: Brk | null) {}
  getFunctionName(): string {
    return this.frame.meta.origName || "unknown";
  }
  getFileName(): string {
    if (!isNode || (<any>Error)._edbg_short_file_names)
      return this.frame.meta.module.name;
    return this.frame.meta.module.fullPath || this.frame.meta.module.name;
  }
  getLineNumber(): number {
    return this.brk ? this.brk.line : 0;
  }
  getColumnNumber(): number {
    return this.brk && this.brk.column || 0;
  }
  getThis(): object | undefined {
    return this.frame.self;
  }
  getTypeName() {
    return undefined; // TODO
  }
  getFunction() {
    return this.frame.closure[CLOSURE_FUNC];
  }
  getMethodName(): string {
    return this.getFunctionName(); // TODO:
  }
  getEvalOrigin() {
    return undefined; // TODO:
  }
  isToplevel() {
    return false; // TODO:
  }
  isEval() {
    return false; // TODO:
  }
  isNative() {
    return false; // TODO;
  }
  isConstructor() {
    return this.frame.newTarget != null;
  }
  isAsync() {
    return false; // TODO:
  }
  isPromiseAll() {
    return false; // TODO:
  }
  isPromiseAny() {
    return false; // TODO:
  }
  getPromiseIndex() {
    return null;
  }
}

function captureStackTrace(e: any, constructorOpt: any) {
  const frame = context.top || context.pausedTop;
  return captureStackTraceFrom(e, constructorOpt, frame, false);
}

export function captureStackTraceFrom(e: any, constructorOpt: any, frame:Frame|null, eager: boolean) {
  const stack: CallSite[] = [];
  if (frame) {
    let i: Frame | null = frame;
    if (constructorOpt) {
      for (; i; i = i.caller) {
        if (i.closure[CLOSURE_FUNC] === constructorOpt) {
          i = i.caller;
          break;
        }
      }
    }
    let count = (<any>Error).stackTraceLimit || -1;
    for (; i && count >= 0; i = i.caller) {
      const brk = i.brk; // i.meta.states[i.state];
      native.Array.push.call(stack, new CallSite(i, brk));
      --count;
    }
  }
  if (config.debuggerDebug) {
    const nativeStack = native.Object.getOwnPropertyDescriptor(e, "stack");
    if (nativeStack)
      native.Object.defineProperty(e, "_deb_stack", nativeStack);
  }
  let memo: string | null = null;
  function get() {
    if (memo)
      return memo;
    if ((<any>Error).prepareStackTrace) {
      // return (context.call = (<any>Error).prepareStackTrace), (<any>Error).prepareStackTrace(e, stack);
      memo = (<any>Error).prepareStackTrace(e, stack);
      return memo;
    }
    const res: string[] = [`${e.name}: ${e.message}`];
    for (const i of stack)
      native.Array.push.call(
        res,
        `    at ${i.getFunctionName()} (${i.getFileName()}:${i.getLineNumber()}:${i.getColumnNumber()})`
      );
    memo = res.join("\n");
    return memo;
  }
  try {
    if (eager) {
      native.Object.defineProperty(e, "stack", {
        configurable: true,
        writable: true,
        enumerable: true,
        value: undefined
      });
      e.stack = get();
    } else
      native.Object.defineProperty(e, "stack", {
        configurable: true,
        enumerable: true,
        get
      });
  } catch(e) {
    // tslint:disable-next-line:no-console
    console.error("DEBUGGER: could't reset stack", e)
  }
}

if (config.patchRT) {
  NativeError.captureStackTrace = captureStackTrace;
}
