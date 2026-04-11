import * as State from "./state";
import * as S from "@effectful/serialization";
import config from "./config";
function nop() {}

const {
  context,
  defaultErrHandler,
  defaultFinHandler,
  native,
  closures,
  binds,
  undef,
  CLOSURE_META,
  CLOSURE_PARENT
} = State;

const weakMapSet = native.WeakMap.set;
const nativeReflectApply = native.Reflect.apply;

export const regOpaqueRec = config.persistState ? S.regOpaqueRec : nop;
export const regAutoOpaqueConstr = config.persistState
  ? S.regAutoOpaqueConstr
  : nop;
export const setObjectDescriptor = config.persistState
  ? S.setObjectDescriptor
  : nop;

const noProps = { props: false, propsSnapshot: false };

export const regOpaqueObject = config.persistState
  ? function(obj: any, name: string) {
      S.regOpaqueObject(obj, name, noProps);
    }
  : nop;
export const regDescriptor = config.persistState ? S.regDescriptor : nop;
export const regConstructor = config.persistState ? S.regConstructor : nop;

/** `Serialization.regOpaqueDeep` for module exports */
export function regModule(exp: any, name: string) {
  S.regOpaqueRec(exp, `${name || "?"}#exports`, {
    descriptor: { propsSnapshot: true, value: exp, props: true }
  });
}

if (typeof MessagePort !== "undefined") {
  S.regAutoOpaqueConstr(MessagePort);
  S.regAutoOpaqueConstr(MessageChannel);
}

export const ModuleDescriptor = S.regDescriptor<any>({
  name: "@effectful/debugger/module",
  create(_ctx, json: any) {
    return context.modules[json.id] || {};
  },
  readContent(ctx, json: any, module: any) {
    if (module.cjs && json.exports) {
      module.exports = module.cjs.exports = ctx.step(json.exports);
    }
  },
  write(ctx, module: any) {
    const res: any = { id: module.fullPath || module.id };
    if (module.cjs) res.exports = ctx.step(module.cjs.exports, res, "exports");
    return res;
  },
  props: false
});

export const FunctionDescriptor = S.regDescriptor<any>({
  name: "#F",
  create(ctx, json) {
    const meta = ctx.createStep((<any>json).m);
    const parentJson = (<any>json).p;
    let parent: State.Frame | null = null;
    if (parentJson) {
      parent = <State.Frame>ctx.createStep(parentJson);
      parent.$ = ctx.createStep((<any>json).v);
    }
    return meta.func(parent);
  },
  write(ctx, value) {
    const json: S.JSONObject = {};
    const descr = <State.Closure>State.closures.get(value);
    json.m = ctx.step(descr[CLOSURE_META], json, "m");
    const parent = descr[CLOSURE_PARENT];
    if (parent) {
      json.p = ctx.step(parent, json, "p");
      json.v = ctx.step(parent.$, json, "v");
    }
    return json;
  }
});

export function regFun(meta: State.FunctionDescr) {
  const constr = meta.func;
  regOpaqueObject(constr, `c#${meta.persistName}`);
  regOpaqueObject(meta, `i#${meta.persistName}`);
  regOpaqueObject(meta.handler, `h#${meta.persistName}`);
  if (meta.errHandler && meta.errHandler !== defaultErrHandler)
    regOpaqueObject(meta.errHandler, `eh#${meta.persistName}`);
  if (meta.finHandler && meta.finHandler !== defaultFinHandler)
    regOpaqueObject(meta.finHandler, `fh#${meta.persistName}`);
}

function stripAsyncFrameRuntime(value: any): any {
  if (!value || typeof value !== "object") return value;
  if (!("meta" in value) || !("awaiting" in value) || !("promise" in value)) {
    return null;
  }
  return {
    next: value.next,
    caller: value.caller,
    onReturn: value.onReturn,
    onError: value.onError,
    promise: value.promise,
    restoreEnabled: value.restoreEnabled
  };
}

function stepDeferred(
  ctx: S.WriteContext,
  value: any,
  parent: S.JSONObject | S.JSONArray,
  index: string | number
): S.JSONValue {
  const json = ctx.step(value, parent, index);
  if (
    json !== null ||
    value === null ||
    (typeof value !== "object" && typeof value !== "function")
  ) {
    return json;
  }
  const info = (ctx as any).sharedRefsMap.get(value);
  if (info) {
    if (info.ref == null) info.ref = {};
    return info.ref;
  }
  return json;
}

function stepAsyncFrame(
  ctx: S.WriteContext,
  value: any,
  parent: S.JSONObject | S.JSONArray,
  index: string | number
): S.JSONValue {
  if (!stripAsyncFrameRuntime(value)) return stepDeferred(ctx, value, parent, index);
  value.next = null;
  value.caller = null;
  value.onReturn = null;
  value.onError = null;
  if (typeof value.restoreEnabled === "function") {
    value.restoreEnabled = State.undef;
  }
  return stepDeferred(ctx, value, parent, index);
}

const BindDescriptor = regDescriptor({
  name: "#b",
  create(ctx, json: any) {
    const res = makeBind();
    weakMapSet.call(binds, res, {
      fun: ctx.createStep(json.f),
      self: ctx.createStep(json.s),
      args: ctx.createStep(json.a) || []
    });
    return res;
  },
  write(ctx, value: any) {
    const binding = <any>binds.get(value);
    const json: S.JSONObject = {};
    if (!binding) return json;
    json.f = stepDeferred(ctx, binding.fun, json, "f");
    json.s = stepAsyncFrame(ctx, binding.self, json, "s");
    json.a = stepDeferred(ctx, binding.args, json, "a");
    return json;
  },
  overrideProps: {
    arguments: false,
    caller: false,
    length: false,
    name: false,
    prototype: false
  },
  props: false
});

function makeBind(): (...args: any[]) => any {
  function __effectful__Bind(this: any, ...rest: any[]): any {
    const { fun, self, args: boundArgs } = <any>binds.get(__effectful__Bind);
    if (context.call === __effectful__Bind) context.call = fun;
    return nativeReflectApply(fun, self === undef ? this : self, [
      ...boundArgs,
      ...rest
    ]);
  }
  if (BindDescriptor) S.setObjectDescriptor(__effectful__Bind, BindDescriptor);
  return __effectful__Bind;
}

export const defaultBind = config.persistState
  ? function bind(
      this: any,
      self: any,
      ...args: any[]
    ): (...args: any[]) => any {
      const res = <any>makeBind();
      weakMapSet.call(binds, res, { fun: this, self, args });
      return res;
    }
  : Function.prototype.bind;

export const extra: Set<any> = new Set();

export function opaqueWeakMap(map: WeakMap<any, any>, name: string) {
  const descr: S.IncompleteDescriptor<WeakMap<any, any>> = native.Object.assign(
    {},
    S.WeakMapDescriptor
  );
  descr.name = name;
  descr.create = function() {
    return map;
  };
  S.setObjectDescriptor(map, S.regDescriptor(descr));
}

export function opaqueWeakSet(set: WeakSet<any>, name: string) {
  const descr: S.IncompleteDescriptor<WeakSet<any>> = native.Object.assign(
    {},
    S.WeakSetDescriptor
  );
  descr.name = name;
  descr.create = function() {
    return set;
  };
  S.setObjectDescriptor(set, S.regDescriptor(descr));
}

opaqueWeakMap(State.functions, "@effectful/debugger/context/functions");
opaqueWeakMap(closures, "@effectful/debugger/context/closures");
opaqueWeakMap(binds, "@effectful/debugger/context/binds");
