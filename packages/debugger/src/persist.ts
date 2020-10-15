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
  undef
} = State;

const weakMapSet = native.WeakMap.set;
const nativeCall = native.FunctionMethods.call;

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
    json.m = ctx.step(descr.meta, json, "m");
    if (descr.parent) {
      json.p = ctx.step(descr.parent, json, "p");
      json.v = ctx.step(descr.parent.$, json, "v");
    }
    return json;
  }
});

export function regFun(meta: State.FunctionDescr) {
  const constr = meta.func;
  /*
  const funcDescr = S.regDescriptor<any>({
    name: `p#${meta.persistName}`,
    create() {
      return constr();
    },
    readContent(ctx, json, value) {
      let data = <State.ProtoFrame>closures.get(value);
      data.$ = ctx.step((<any>json).$$);
      data.parent = ctx.step((<any>json).p);
    },
    write(ctx, value) {
      const json: any = {};
      const proto = <State.ProtoFrame>closures.get(value);
      json.$$ = ctx.step(proto.$, json, "$$");
      json.p = ctx.step(proto.parent, json, "p");
      return json;
    },
    // TODO: save the props in snapshot so they can be updated
    overrideProps: {
      call: false,
      apply: false
    },
    typeofHint: "function"
  });
  (<any>meta).descriptor = funcDescr;
  */
  regOpaqueObject(constr, `c#${meta.persistName}`);
  regOpaqueObject(meta, `i#${meta.persistName}`);
  regOpaqueObject(meta.handler, `h#${meta.persistName}`);
  if (meta.errHandler && meta.errHandler !== defaultErrHandler)
    regOpaqueObject(meta.errHandler, `eh#${meta.persistName}`);
  if (meta.finHandler && meta.finHandler !== defaultFinHandler)
    regOpaqueObject(meta.finHandler, `fh#${meta.persistName}`);
}

const BindDescriptor = regDescriptor({
  name: "#b",
  create() {
    return makeBind();
  },
  write() {
    return {};
  },
  overrideProps: {
    arguments: false,
    caller: false,
    length: false,
    name: false,
    prototype: false
  }
});

function makeBind(): (...args: any[]) => any {
  function __effectful__Bind(this: any, ...rest: any[]): any {
    const { fun, self, args: boundArgs } = <any>binds.get(__effectful__Bind);
    if (context.call === __effectful__Bind) context.call = fun;
    const arr: any[] = Array(rest.length + boundArgs.length + 1);
    arr[0] = self === undef ? this : self;
    let index = 0;
    for (const i of boundArgs) arr[++index] = i;
    for (const i of rest) arr[++index] = i;
    return (<any>nativeCall).nativeApply(fun, <any>arr);
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
