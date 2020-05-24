import * as State from "./state";
import * as S from "@effectful/serialization";
import config from "./config";
function nop() {}

const {
  context,
  defaultErrHandler,
  defaultFinHandler,
  saved,
  closures,
  binds
} = State;

const weakMapSet = saved.WeakMap.set;

export const regOpaqueRec = config.persistState ? S.regOpaqueRec : nop;
export const regAutoOpaqueConstr = config.persistState
  ? S.regAutoOpaqueConstr
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

export function regFun(meta: State.FunctionDescr) {
  const constr = meta.func;
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

const savedCall = saved.FunctionMethods.call;

function makeBind(): (...args: any[]) => any {
  function bind(...rest: any[]): any {
    const { fun, self, args: boundArgs } = <any>binds.get(bind);
    context.call = context.call === bind ? fun : null;
    const arr: any[] = Array(rest.length + boundArgs.length + 1);
    arr[0] = self;
    let index = 0;
    for (const i of boundArgs) arr[++index] = i;
    for (const i of rest) arr[++index] = i;
    return savedCall.apply(fun, <any>arr);
  }
  if (BindDescriptor) S.setObjectDescriptor(bind, BindDescriptor);
  return bind;
}

export const defaultBind = config.persistState ? function bind(
    this: any,
    self: any,
    ...args: any[]
  ): (...args: any[]) => any {
    const res = <any>makeBind();
    weakMapSet.call(binds, res, { fun: this, self, args });
    return res;
  } : Function.prototype.bind;

export const extra: Set<any> = new Set();

function opaqueWeakMap(map: WeakMap<any, any>, name: string) {
  const descr: S.IncompleteDescriptor<WeakMap<any, any>> = saved.Object.assign(
    {},
    S.WeakMapDescriptor
  );
  descr.name = name;
  descr.create = function() {
    return map;
  };
  S.setObjectDescriptor(map, S.regDescriptor(descr));
}

opaqueWeakMap(State.functions, "@effectful/debugger/context/functions");
opaqueWeakMap(closures, "@effectful/debugger/context/closures");
opaqueWeakMap(binds, "@effectful/debugger/context/binds");
opaqueWeakMap(State.objectKeys, "@effectful/debugger/context/objectKeys");
