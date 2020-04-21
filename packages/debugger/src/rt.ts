/** Monkey-patching JS runtime */
import config from "./config";
import * as Instr from "./instr/rt";
import * as Engine from "./engine";
import { regOpaqueObject } from "@effectful/serialization";
import { saved } from "./state";

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
  saved.Object.defineProperty(proto, name, {
    configurable: true,
    writable: true,
    value: function impl() {
      if (context.call === impl)
        return (
          // TODO: move to faster apply
          (context.call = debugImpl.apply), debugImpl.apply(this, <any>arguments)
        );
      return (context.call = null), defImpl.apply(this, <any>arguments);
    }
  })
}

if (config.patchRT) {
  const Promise = (global.Promise = Engine.force(
    config.timeTravel ? require("./deps/promise-t") : require("./deps/promise")
  ));
  regOpaqueObject(Promise, "global#Promise");
  regOpaqueObject(Promise.prototype, "global#Promise#");
  switchDefault(Tp, "map", Instr.map);
  switchDefault(Ap, "map", Instr.map);
  switchDefault(Tp, "filter", Instr.filter);
  switchDefault(Ap, "filter", Instr.filter);
  switchDefault(Tp, "find", Instr.find);
  switchDefault(Ap, "find", Instr.find);
  switchDefault(Tp, "findIndex", Instr.findIndex);
  switchDefault(Ap, "findIndex", Instr.findIndex);
  switchDefault(Tp, "flatMap", Instr.flatMap);
  switchDefault(Ap, "flatMap", Instr.flatMap);
  switchDefault(Tp, "forEach", Instr.forEach);
  switchDefault(Ap, "forEach", Instr.forEach);
  switchDefault(Sp, "forEach", Instr.setForEach);
  switchDefault(Mp, "forEach", Instr.mapForEach);
  switchDefault(Tp, "reduce", Instr.reduce);
  switchDefault(Ap, "reduce", Instr.reduce);
  switchDefault(Tp, "reduceRight", Instr.reduceRight);
  switchDefault(Ap, "reduceRight", Instr.reduceRight);
  switchDefault(Tp, "some", Instr.some);
  switchDefault(Ap, "some", Instr.some);
  switchDefault(Tp, "every", Instr.every);
  switchDefault(Ap, "every", Instr.every);
  switchDefault(Array, "from", Instr.arrayFrom);
  global.eval = Engine.indirEval;
  if (config.expFunctionConstr) (<any>global).Function = Engine.FunctionConstr;
}
