/** Monkey-patching JS runtime */
import config from "./config";
import * as Instr from "./instr/rt";
import * as Engine from "./engine";
import { regOpaqueObject, regModule } from "./persist";
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
const { CoreJS, Promise } = deps;

regModule(CoreJS.ArrayPrototype, "@effectful/debugger/CoreJS/ArrayPrototype");
regModule(CoreJS.Array, "@effectful/debugger/CoreJS/Array");
regModule(Ap, "@effectful/debugger/Native/ArrayPrototype");
regModule(Tp, "@effectful/debugger/Native/TypedArrayPrototype");

if (config.patchRT) {
  global.Promise = Promise;
  const CAp = CoreJS.ArrayPrototype;
  const CTp = CoreJS.ArrayPrototype;
  regOpaqueObject(Promise, "global#Promise");
  regOpaqueObject(Promise.prototype, "global#Promise#");
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
