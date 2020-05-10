import {
  context,
  dataSymbol,
  FunctionDescr,
  defaultErrHandler,
  defaultFinHandler,
  saved
} from "./state";
import * as S from "@effectful/serialization";
import config from "./config";
function nop() {}

export const regOpaqueRec = config.persistState ? S.regOpaqueRec : nop;
export const regAutoOpaqueConstr = config.persistState
  ? S.regAutoOpaqueConstr
  : nop;

const noProps = { props: false, propsSnapshot: false };

const {
  boundFunSymbol,
  boundThisSymbol,
  boundArgsSymbol,
  descriptorSymbol
} = S;

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

export function regFun(meta: FunctionDescr) {
  const constr = meta.func;
  const funcDescr = S.regDescriptor<any>({
    name: `p#${meta.persistName}`,
    create() {
      return constr();
    },
    readContent(ctx, json, value) {
      let data = value[dataSymbol];
      data.$ = ctx.step((<any>json).$$);
      data.parent = ctx.step((<any>json).p);
    },
    write(ctx, value) {
      const json: any = {};
      const proto = value[dataSymbol];
      json.$$ = ctx.step(proto.$, json, "$$");
      json.p = ctx.step(proto.parent, json, "p");
      return json;
    },
    // TODO: save the props in snapshot so they can be updated
    overrideProps: {
      [dataSymbol]: false,
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
    const fun = (<any>bind)[boundFunSymbol];
    context.call = context.call === bind ? fun : null;
    const boundArgs: any[] = (<any>bind)[boundArgsSymbol];
    // avoiding spreads because they are monkey patched
    const arr: any[] = Array(rest.length + boundArgs.length + 1);
    arr[0] = (<any>bind)[boundThisSymbol];
    let index = 0;
    for (const i of boundArgs) arr[++index] = i;
    for (const i of rest) arr[++index] = i;
    return savedCall.apply(fun, <any>arr);
  }
  if (config.persistState) (<any>bind)[descriptorSymbol] = BindDescriptor;
  return bind;
}

if (config.patchRT && config.persistState) {
  Function.prototype.bind = function bind(
    this: any,
    self: any,
    ...args: any[]
  ): (...args: any[]) => any {
    const res = <any>makeBind();
    res[boundFunSymbol] = this;
    res[boundThisSymbol] = self;
    res[boundArgsSymbol] = args;
    return res;
  };
}

export const extra: Set<any> = new Set();
