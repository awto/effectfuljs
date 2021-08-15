/** Monkey-patching JS runtime */
import config from "./config";
import * as Instr from "./instr/rt";
import * as Engine from "./engine";
import { regOpaqueObject, regModule, regConstructor } from "./persist";
import { native, nativeFuncs } from "./state";
import * as TT from "./timeTravel/objects";
import { ManagedSet, ManagedMap } from "./timeTravel/es";
import { patchNative as patch } from "./state";

const context = Engine.context;

const Ap = Array.prototype;
const Tp = Object.getPrototypeOf(Int8Array.prototype);
const Sp = Set.prototype;
const Mp = Map.prototype;

function switchDefault(
  proto: any,
  name: string,
  debugImpl: (this: any, ...vals: any[]) => any
) {
  const defImpl: any = proto[name];
  // asNative(debugImpl, name);
  regOpaqueObject(
    value,
    "@effectful/debugger/polyfill/${proto.constructor.name}#${name}"
  );
  nativeFuncs.add(value);
  native.Object.defineProperty(proto, name, {
    configurable: true,
    writable: true,
    value
  });

  function value(this: any) {
    if (context.call === value)
      return (
        // TODO: move to faster apply
        (context.call = debugImpl.apply), debugImpl.apply(this, <any>arguments)
      );
    return (context.call = null), defImpl.apply(this, <any>arguments);
  }
}

const deps = config.timeTravel ? require("./deps-t") : require("./deps-n");
const { CoreJS } = deps;

regModule(CoreJS.ArrayPrototype, "@effectful/debugger/CoreJS/ArrayPrototype");
regModule(CoreJS.Array, "@effectful/debugger/CoreJS/Array");
regModule(Ap, "@effectful/debugger/Native/ArrayPrototype");
regModule(Tp, "@effectful/debugger/Native/TypedArrayPrototype");

if (config.patchRT) {
  global.Promise = deps.Promise;
  const CAp = CoreJS.ArrayPrototype;
  const CTp = CoreJS.ArrayPrototype;
  regOpaqueObject(deps.Promise, "global#Promise");
  regOpaqueObject(deps.Promise.prototype, "global#Promise#");
  for (const i of [
    "map",
    "filter",
    "find",
    "findIndex",
    "flatMap",
    "forEach",
    "reduce",
    "reduceRight",
    "some",
    "every"
  ]) {
    switchDefault(Tp, i, CTp[i]);
    switchDefault(Ap, i, CAp[i]);
  }
  switchDefault(Array, "from", CoreJS.Array.from);
  switchDefault(Sp, "forEach", Instr.setForEach);
  switchDefault(Mp, "forEach", Instr.mapForEach);
  global.eval = Engine.indirEval;
  if (config.expFunctionConstr) (<any>global).Function = Engine.FunctionConstr;
  if (config.timeTravel /*&& config.implicitCalls*/)
    (<any>global).Proxy = TT.PatchedProxy;
}

(<any>ManagedSet.prototype).forEach = Instr.setForEach;
(<any>ManagedMap.prototype).forEach = Instr.mapForEach;

if (config.timeTravel && config.patchRT) {
  TT.patchWithPolifil(Ap, "push", TT.arrayPush, CoreJS.ArrayPrototype.push);
  TT.patchWithPolifil(Ap, "pop", TT.arrayPop, CoreJS.ArrayPrototype.pop);
  TT.patchWithPolifil(
    Ap,
    "unshift",
    TT.arrayUnshift,
    CoreJS.ArrayPrototype.unshift
  );
  TT.patchWithPolifil(Ap, "shift", TT.arrayShift, CoreJS.ArrayPrototype.shift);
  patch(Ap, "sort", TT.arraySort);
  patch(Ap, "reverse", TT.arrayReverse);
  TT.patchWithPolifil(
    Ap,
    "splice",
    TT.arraySplice,
    CoreJS.ArrayPrototype.splice
  );
  TT.patchWithPolifil(Ap, "slice", Ap.slice, CoreJS.ArrayPrototype.slice2);
  TT.patchWithPolifil(Ap, "concat", Ap.concat, CoreJS.ArrayPrototype.concat);
  TT.patchWithPolifil(Ap, "flat", Ap.flat, CoreJS.ArrayPrototype.flat);
  TT.patchWithPolifil(
    Ap,
    "copyWithin",
    Ap.copyWithin,
    CoreJS.ArrayPrototype.copyWithin
  );
  TT.patchWithCopy(Ap, "reverse");
  TT.patchWithCopy(Ap, "sort");
  patch(Tp, "set", TT.typedArraySet);
  patch(Tp, "sort", TT.typedArraySort);
  patch(Tp, "reverse", TT.typedArrayReverse);
  patch(Tp, "fill", TT.typedArrayFill);
  TT.patchWithPolifil(Object, "assign", TT.objectAssign, CoreJS.objectAssign);
  TT.patchWithPolifil(
    Object,
    "entries",
    TT.objectEntries,
    CoreJS.objectEntries
  );
  TT.patchWithPolifil(Object, "values", TT.objectValues, CoreJS.objectValues);
}

const nativeSetTimeout = native.setTimeout;

let countNum = 0;

class TimeoutHandlerImpl {
  _nativeId: any;
  _id: number;
  _canceled: boolean;
  handler: TimeoutHandler;
  constructor() {
    this._id = ++countNum;
    this._canceled = false;
    this.handler = <any>null;
  }
  _reset(nativeId: any) {
    if (
      this._nativeId &&
      typeof nativeId &&
      nativeId.unref &&
      !this._nativeId.hasRef()
    )
      nativeId.unref();
    this._nativeId = nativeId;
  }
  [Symbol.toPrimitive]() {
    return this._id;
  }
}

const timeouts = new WeakMap<TimeoutHandler, TimeoutHandlerImpl>();

class TimeoutHandler {
  constructor(impl: TimeoutHandlerImpl) {
    timeouts.set(this, impl);
    impl.handler = this;
  }
  hasRef() {
    return this.impl()._nativeId.hasRef();
  }
  ref() {
    return this.impl()._nativeId.ref();
  }
  unref() {
    return this.impl()._nativeId.unref();
  }
  impl(): TimeoutHandlerImpl {
    return <any>timeouts.get(this);
  }
}

regConstructor(TimeoutHandler);

/**
 * when the code is stopped on breakpoint it releases main thread, and so `setTimeout`
 * callback may be scheduled before it is cleared, so we must check if it is cleared or not
 * before its execution
 */
function setTimeoutImpl(
  callback: (...args: any[]) => any,
  delay?: number,
  ...args: any[]
) {
  if (context.enabled && context.call === setTimeoutImpl) {
    const handlerImpl = new TimeoutHandlerImpl();
    const handler = new TimeoutHandler(handlerImpl);
    handlerImpl._reset(
      nativeSetTimeout(
        Instr.setTimeoutCallback.bind(null, callback, handler),
        delay,
        ...args
      )
    );
    return handler;
  }
  return nativeSetTimeout(callback, delay, ...args);
}

const nativeClearTimeout = native.clearTimeout;

function clearTimeoutImpl(id: any) {
  if (id instanceof TimeoutHandler) {
    const impl = id.impl();
    impl._canceled = true;
    nativeClearTimeout(impl._nativeId);
  } else {
    nativeClearTimeout(id);
  }
}

function scheduleInterval(
  callback: (...args: any[]) => any,
  id: TimeoutHandlerImpl,
  delay: number | undefined,
  args: any[]
) {
  id._reset(
    nativeSetTimeout(
      Instr.setTimeoutCallback.bind(
        null,
        resetInterval.bind(null, callback, id.handler, delay),
        id.handler
      ),
      delay,
      ...args
    )
  );
}

function resetInterval(
  callback: (...args: any[]) => any,
  id: TimeoutHandler,
  delay?: number,
  ...args: any[]
) {
  const impl = id.impl();
  scheduleInterval(callback, impl, delay, args);
  (context.call = callback)(...args);
}

regOpaqueObject(resetInterval, "@effectful/debugger/restartInterval");

const nativeSetInterval = native.setInterval;

function setIntervalImpl(
  callback: (...args: any[]) => any,
  delay?: number,
  ...args: any[]
) {
  if (context.enabled && context.call === setIntervalImpl) {
    const handlerImpl = new TimeoutHandlerImpl();
    const handler = new TimeoutHandler(handlerImpl);
    scheduleInterval(callback, handlerImpl, delay, args);
    return handler;
  }
  return nativeSetInterval(callback, delay, ...args);
}

let setImmediateImpl: any;
const nativeSetImmediate = native.setImmediate;
if (nativeSetImmediate) {
  setImmediateImpl = function setTimeoutImpl(
    callback: (...args: any[]) => any,
    ...args: any[]
  ) {
    if (context.enabled && context.call === setTimeoutImpl) {
      const handlerImpl = new TimeoutHandlerImpl();
      const handler = new TimeoutHandler(handlerImpl);
      handlerImpl._reset(
        (<any>nativeSetImmediate)(
          Instr.setTimeoutCallback.bind(null, callback, handler),
          ...args
        )
      );
      return handler;
    }
    return nativeSetImmediate(callback, ...args);
  };
}

export {
  setTimeoutImpl as setTimeout,
  clearTimeoutImpl as clearTimeout,
  setIntervalImpl as setInterval,
  clearTimeoutImpl as clearInterval,
  setImmediateImpl as setImmediate
};

if (config.patchRT) {
  (<any>global).setTimeout = setTimeoutImpl;
  (<any>global).clearTimeout = clearTimeoutImpl;
  (<any>global).setInterval = setIntervalImpl;
  (<any>global).clearInterval = clearTimeoutImpl;
  if (setImmediateImpl) {
    (<any>global).setImmediate = setImmediateImpl;
    (<any>global).clearImmediate = clearTimeoutImpl;
  }
}
