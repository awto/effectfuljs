/**
 * # Serialization library for @effectful toolchain
 */

/**
 * Conversion between JSON values and JS values. JSON values set is a subset
 * of JS values which can be converted to string using `JSON.stringify`
 * function and read back with `JSON.parse`.
 */

/** Options to amend `write` behavior */
export interface WriteOptions {
  /** don't throw exception if there is any writting error */
  ignore?: boolean | "opaque";
  /**
   * current reference's id assignment state,
   * this can be copied between writes to keep same refs ids
   */
  sharedRefs?: Map<any, SharedRefInfo>;
  /**
   * holds information about seen local Symbols, it can be copied between runs
   */
  symsByName?: Map<string, SymbolDescr[]>;
  /**
   * holds information about seen local Symbols, it can be copied between runs
   */
  knownSyms?: Map<symbol, SymbolDescr>;
}

/** Options to amend `write` behavior */
export interface ReadOptions {
  /** don't throw exception if there is any writting error */
  ignore?: boolean | "opaque";
  /**
   * holds information about seen local Symbols, it can be copied between runs
   */
  symsByName?: Map<string, SymbolDescr[]>;
  /**
   * holds information about seen local Symbols, it can be copied between runs
   */
  knownSyms?: Map<symbol, SymbolDescr>;

  /** references to shared object values */
  shared?: any[];
}

/** `JSON.stringify` serializable value */
export type JSONValue =
  | boolean
  | number
  | string
  | JSONObject
  | JSONArray
  | null;

/** `JSON.stringify` serializable Object */
export interface JSONObject {
  [name: string]: JSONValue;
}

/** `JSON.stringify` serializable Array */
export interface JSONArray extends Array<JSONValue> {}

const descriptorByName: Map<string, Descriptor> = new Map();
const descriptorByValue: Map<any, Descriptor> = new Map();
/**
 * react uses `$$typeof` property for its values, it is the mapping
 * @private
 */
const descriptorByTypeOfProp: Map<symbol, Descriptor> = new Map();

/** name of a property to specify `Descriptor` for JS value */
export const descriptorSymbol = Symbol("@effectful/serialization/descriptor");

/* TODO after TS supports symbol indexes `{ [name: string | symbol]: boolean } */
const defaultOverrideProps: any = {
  [descriptorSymbol]: false
};

const funcOverrideProps: { [name: string]: boolean } = {
  arguments: false,
  caller: false,
  length: false,
  name: false
};

/** Describes how to read values of a type */
export interface ReadDescriptor<T = unknown> {
  /**
   * Reads value from `json` value
   * @param ctx  - recursive reads handling for sub-values
   * @param json - input JSON
   * @returns     - resulting JS value
   */
  read: (ctx: ReadContext, json: JSONValue) => T;
  /**
   * The first part of `read`, just creates a corresponding value without traversing into children.
   * This is needed to avoid infinite loops on recursive values.
   * @param ctx  - recursive reads handling for sub-values
   * @param json - input JSON
   * @returns - resulting JS value
   */
  create: (ctx: ReadContext, json: JSONValue) => T;
  /**
   * The second part of `read`, creates children and sets them into `value`.
   * This is needed to avoid infinite loops on recursive values.
   * @param ctx  - recursive reads handling for sub-values
   * @param json - input JSON
   * @param value - resulting JS value
   */
  readContent: (ctx: ReadContext, json: JSONValue, value: T) => void;
}

export interface Serializable {
  [descriptorSymbol]?: Descriptor;
}

export interface Writeable {
  [descriptorSymbol]?: WriteDescriptor;
}

export interface WithTypeofTag {
  $$typeof?: symbol;
}

export interface SerializableObject {
  [name: string]: Serializable;
  [name: number]: Serializable;
}

export interface DescriptorOpts<T = unknown> {
  /** Unique type name */
  name?: string;

  /** dispatching descriptor by value of `$$typeof` property */
  typeofTag?: symbol;

  /**
   * If !== false, the descriptor recognizes shared objects and uses only references for them.
   * The default is `true`.
   */
  refAware?: boolean;

  /**
   * If !== false the descriptor will traverse own properties too
   */
  props?: boolean;

  /**
   * If !== false the descriptor will add property `$` equal to `name` by default
   */
  default$?: boolean;

  /**
   * `typeof value` for the values this serializes
   */
  typeofHint?: string;

  /**
   * if `props !== false` this is a predicate to specify which properties should be output.
   */
  overrideProps?: { [name: string /*|symbol*/]: boolean };

  /** this won't change the `name` to make it unique */
  strictName?: boolean;

  /** a prototype to be assigned with `Object.setPrototype` in reads */
  valuePrototype?: object | null | false;

  /** Serialized value's constructor */
  valueConstructor?: ValueConstructor<T>;

  /** constant value */
  value?: T;
}

interface ValueConstructor<T = unknown> {
  name?: string;
  new (...args: any[]): T;
}

/** Describes how write values of a type */
export interface WriteDescriptor<T = unknown> {
  /**
   * Sets `value` into `parent` on `index` position
   * @param ctx    - recursive writes for sub-values
   * @param parent - container for the value output
   * @param index  - either name of a field if parent is an object
   *                 or number index if it is an array
   */
  write: (
    ctx: WriteContext,
    value: T,
    parent: JSONObject | JSONArray,
    index: number | string
  ) => any;
}

export type Descriptor<T = any> = WriteDescriptor<T> &
  ReadDescriptor<T> &
  DescriptorOpts<T>;

/**
 * simplified version of a descriptor where missed properties can be calculated
 */
export type IncompleteDescriptor<T = unknown> = DescriptorOpts<T> & {
  create?: (ctx: ReadContext, json: JSONValue) => T;
  readContent?: (ctx: ReadContext, json: JSONValue, value: T) => void;
  read?: (ctx: ReadContext, json: JSONValue) => T;
  write?: (
    ctx: WriteContext,
    value: T,
    parent: JSONObject | JSONArray,
    index: number | string
  ) => JSONValue;
};

/**
 * Conversion between JSON values and JS values. JSON values set a subset of JS
 * values which can be converted to a string using `JSON.stringify` function and
 * read back with `JSON.parse`.
 */

/**
 * Converts JS Plain Object into JSON Object.
 *
 * It supports only plain objects as root value. To serialize anything else
 * just wrap it, e.g. `write({arr:[1]})`
 *
 * @param value - original object
 * @param opts - options
 */
export function write(value: object, opts: WriteOptions = {}): JSONObject {
  if (typeof value !== "object" || Array.isArray(value))
    throw new TypeError("wrong argument type");
  const ctx = new WriteContext(opts);
  const res: JSONArray = [];
  res.push(ctx.step(value, res, 0));
  const { refs } = ctx;
  if (refs.length) {
    const x = [];
    for (const info of refs)
      if (info.ref) {
        info.ref.r = x.push(info.data) - 1;
        if (info.parent) (<any>info.parent)[<any>info.index] = info.ref;
      }
    if (x.length) return { ...(<JSONObject>res[0]), x };
  }
  return <JSONObject>res[0];
}

/**
 * Converts JSON Object returned by {@link write} back to JS Object
 *
 * @param json - object to read
 */
export function read(json: JSONObject, opts: ReadOptions = {}) {
  if (typeof json !== "object")
    throw new TypeError("root value must be Object");
  const x = <any>json.x;
  const len = x ? x.length : 0;
  const ctx = new ReadContext(opts, len);
  const vals = ctx.shared;
  const tasks = [];
  if (len) {
    for (let i = 0; i < len; ++i) {
      const propJson = x[i];
      const descriptor = getJsonDescriptor(propJson);
      const value = descriptor.create(ctx, propJson);
      vals[i] = value;
      tasks.push({ propJson, value, descriptor });
    }
  }
  for (const { propJson, value, descriptor } of tasks)
    descriptor.readContent(ctx, propJson, value);
  return getJsonDescriptor(json).read(ctx, json);
}

/**
 * ## Shorcuts
 */

/**
 * `write` followed by `JSON.stringify`,
 * with same parameters as for `JSON.stringify`
 */
export function stringify(
  value: any,
  replacer?: (key: string, value: any) => any,
  spaces?: string | number
): string {
  return JSON.stringify(write(value), replacer, spaces);
}

/** `JSON.parse` followed by `read` */
export function parse(json: string): any {
  return read(JSON.parse(json));
}

type BindDescriptorType = ReadDescriptor & {
  func: any;
  self: any;
  args: any[];
};

function makeBind(): (...args: any[]) => any {
  function bindImpl(...rest: any[]): any {
    const { func, self, args } = <BindDescriptorType>(
      (<any>bindImpl)[descriptorSymbol]
    );
    return func.apply(self, [...args, ...rest]);
  }
  (<any>bindImpl)[descriptorSymbol] = { ...BindDescriptor };
  return bindImpl;
}

const BindDescriptor = regDescriptor({
  name: "Bind",
  readContent(ctx, json, value) {
    const descr = (<any>value)[descriptorSymbol];
    descr.func = ctx.step((<JSONObject>json).func);
    descr.self = ctx.step((<JSONObject>json).self);
    descr.args = ctx.step((<JSONObject>json).args);
  },
  create() {
    return makeBind();
  },
  typeofHint: "function",
  write(ctx: WriteContext, value: any): JSONObject {
    const { func, self, args } = value[descriptorSymbol];
    const res: JSONObject = { $: "Bind" };
    res.func = ctx.step(func, res, "func");
    res.self = ctx.step(self, res, "self");
    res.args = ctx.step(args, res, "args");
    return res;
  }
});

/**
 * like `Function.prototype.bind` but returs serializable object if all
 * arguments are serializable
 *
 * @param func
 * @param self - bound `this`
 * @param args - bound arguments
 */
export function bind(
  func: (...args: any[]) => any,
  self: any,
  ...args: any[]
): (...args: any[]) => any {
  const res = <any>makeBind();
  const descr = <BindDescriptorType>res[descriptorSymbol];
  descr.func = func;
  descr.self = self;
  descr.args = args;
  return res;
}

interface SharedRefInfo {
  ref: JSONObject | null;
  data: JSONObject | null;
  parent?: JSONObject | JSONArray;
  index?: string | number;
}

/**
 * An object passed to Descript's `write` method to support recursive
 * invocation for nested values
 */
class WriteContext {
  sharedRefs: Map<any, SharedRefInfo>;
  refs: SharedRefInfo[];
  ignore: boolean | "opaque";
  symsByName?: Map<string, SymbolDescr[]>;
  knownSyms?: Map<symbol, SymbolDescr>;

  constructor(opts: WriteOptions) {
    this.sharedRefs = opts.sharedRefs || (opts.sharedRefs = new Map());
    this.refs = [];
    this.ignore = !!opts.ignore;
    this.symsByName = opts.symsByName;
    this.knownSyms = opts.knownSyms;
    if (!this.knownSyms && this.symsByName)
      this.knownSyms = opts.knownSyms = new Map();
  }
  /**
   * Invokes write recursively for nested values
   * @param value - value to write
   * @param parent - container for the value output
   * @param key  - either name of a field if parent is an object
   *               or number index if it is an array
   */
  step(
    value: any,
    parent: JSONArray | JSONObject,
    key: number | string
  ): JSONValue {
    let descriptor = getValueDescriptor(value);
    if (!descriptor) {
      if (this.ignore === true) return NotSerializableToken;
      if (this.ignore === "opaque") {
        descriptor =
          typeof value === "object"
            ? regOpaqueObject(value)
            : regOpaquePrim(value);
      } else {
        throw new TypeError(
          `not writable value ${value} at ${key} of ${parent}`
        );
      }
    }
    return descriptor.write(this, value, parent, key);
  }
  /**
   * Register `data` to be a serialized representation of value,
   * returns an object with `ref` and `data` fields representing a reference
   * to the value and the value itself
   * @param value - value to write
   */
  ref(value: any): SharedRefInfo {
    let info = this.sharedRefs.get(value);
    if (info == null) {
      const ref = {};
      info = { ref, data: {} };
      this.refs.push(info);
      this.sharedRefs.set(value, info);
      return info;
    }
    if (!info.ref) info.ref = {};
    return info;
  }
}

/**
 * An object passed to Descriptor's `read` method to support recursive invocation
 * for nested values
 */
class ReadContext {
  ignore: boolean | "opaque";
  symsByName?: Map<string, SymbolDescr[]>;
  knownSyms: Map<symbol, SymbolDescr>;
  shared: any[];
  constructor(opts: ReadOptions, len: number = 0) {
    this.knownSyms = opts.knownSyms || (opts.knownSyms = new Map());
    this.symsByName = opts.symsByName;
    if (opts.ignore && !this.symsByName)
      this.symsByName = opts.symsByName = new Map();
    this.ignore = !!opts.ignore;
    this.shared = opts.shared || (opts.shared = new Array(len));
  }
  /**
   * Invokes read recursively for nested values
   * @param json - value to read
   */
  step(json: JSONValue): any {
    return getJsonDescriptor(json).read(this, json);
  }
}

function defaultWrite<T>(
  this: Descriptor<T>,
  ctx: WriteContext,
  value: T
): JSONValue {
  const json: JSONObject = {};
  if (this.valuePrototype !== void 0) return json;
  const proto = Object.getPrototypeOf(value);
  if (proto === null || proto === Object.prototype) return json;
  // ensuring prototype reference is ahead
  json.p = ctx.step(proto, json, "p");
  return json;
}

function defaultCreate<T>(
  this: Descriptor<T>,
  ctx: ReadContext,
  json: JSONValue
): T {
  if (this.valueConstructor) return new this.valueConstructor();
  if (this.valuePrototype !== void 0 && this.valuePrototype !== false)
    return Object.create(this.valuePrototype);
  const protoJson = <JSONObject>(<JSONObject>json).p;
  if (protoJson === void 0) return <T>{};
  if (protoJson === null) return Object.create(null);
  let protoValue;
  // TODO: since prototypes cannot be cyclic it could ensure this
  // on proper ordering objects in `r`, this way there are no needs
  // for `Object.setPrototype`
  if (protoJson.r != null) protoValue = ctx.shared[<number>protoJson.r];
  else if (protoJson.$ && !protoJson.f) protoValue = ctx.step(protoJson);
  return Object.create(protoValue || null);
}

/**
 * default implementaiton of {@link Descriptor}
 */
const descriptorTemplate: Descriptor = {
  read: defaultRead,
  write: defaultWrite,
  create: defaultCreate,
  readContent(ctx: ReadContext, json: JSONValue, value: any) {
    if ((<JSONObject>json).p && Object.getPrototypeOf(value) === null) {
      Object.setPrototypeOf(value, ctx.step((<JSONObject>json).p));
    }
  }
};

/**
 * Enhances descriptor by adding reference handling. It some value is referenced
 * in more than one sub-value it will have a unique value id instead of the
 * value in the output.
 */
function refAwareDescriptor<T>(descriptor: Descriptor<T>): Descriptor<T> {
  return {
    name: descriptor.name,
    read(ctx: ReadContext, json: JSONValue) {
      const ref = <number>(<JSONObject>json).r;
      if (ref != null) return ctx.shared[ref];
      return descriptor.read(ctx, json);
    },
    write(
      ctx: WriteContext,
      value: any,
      parent: JSONArray | JSONObject,
      index: string | number
    ): JSONValue {
      let info = ctx.sharedRefs.get(value);
      if (info == null) {
        ctx.sharedRefs.set(
          value,
          (info = {
            ref: null,
            data: null,
            parent,
            index
          })
        );
        info.data = descriptor.write(ctx, value, parent, index);
        ctx.refs.push(info);
        return info.data;
      }
      if (info.ref == null) info.ref = {};
      return info.ref;
    },
    create(ctx: ReadContext, json: JSONValue): T {
      return descriptor.create(ctx, json);
    },
    readContent(ctx: ReadContext, json: JSONValue, value: any) {
      return descriptor.readContent(ctx, json, value);
    }
  };
}

/**
 * Adds a descriptor to an internal global registry for creating value instances
 * by type names on reading.
 *
 * The name will be changed to a unique value if some other descriptor with the
 * same name is already registered.
 *
 * Adds missed functionality into the descriptor. This includes:
 *  - This includes reference awareness (if `descriptor.refAware !== false`)
 *  - Saving object's properties (if `descriptor.props !== false`)
 *  - Default methods (`read` from `create` and `readContent`)
 *  - Adding "$" property (if `descriptor.default$ !== false`)
 *
 * @param descriptor
 * @returns
 */
export function regDescriptor<T>(
  descriptor: IncompleteDescriptor<T>,
  value?: any
): Descriptor<T> {
  let {
    read: readImpl,
    readContent: readContentImpl,
    create: createImpl,
    write: writeImpl
  } = descriptor;
  if (!readImpl) {
    if (descriptor.create)
      readImpl = descriptor.readContent ? defaultRead : descriptor.create;
  }
  const overrideProps = Object.assign(
    {},
    defaultOverrideProps,
    descriptor.typeofHint === "function" && funcOverrideProps,
    descriptor.overrideProps
  );
  if (!readContentImpl) readContentImpl = function readContent() {};
  if (!readImpl)
    readImpl = function readCreate(
      this: ReadDescriptor<T>,
      ctx: ReadContext,
      json: JSONValue
    ): T {
      return this.create(ctx, json);
    };
  if (!createImpl) createImpl = descriptorTemplate.create;
  if (!writeImpl)
    writeImpl = function noWrite(_: WriteContext, val: any): any {
      throw new TypeError(`not writable ${val}`);
    };
  const name = guessDescriptorName(descriptor);
  let uniq = name;
  let i = 0;
  if (!descriptor.strictName)
    for (; descriptorByName.get(uniq) != null; uniq = `${name}_${++i}`) {}
  let final: Descriptor = {
    ...descriptor,
    read: readImpl,
    readContent: readContentImpl,
    create: createImpl,
    write: writeImpl,
    name: uniq,
    overrideProps
  };
  if (descriptor.props !== false) final = propsDescriptor(final);
  if (descriptor.default$ !== false && uniq !== "Object") {
    const saved = final;
    final = {
      ...final,
      write(ctx, val, parent, index): JSONValue {
        const json = saved.write(ctx, val, parent, index);
        if (!json.$) json.$ = uniq;
        return json;
      }
    };
  }
  const noRefs = final;
  descriptorByName.set(uniq, noRefs);
  if (descriptor.typeofTag)
    descriptorByTypeOfProp.set(descriptor.typeofTag, noRefs);
  if (descriptor.refAware !== false) final = refAwareDescriptor(final);
  final = {
    name: uniq,
    read: final.read,
    write: final.write,
    readContent: final.readContent,
    create: final.create,
    overrideProps,
    value: descriptor.value
  };
  if (value) value[descriptorSymbol] = final;
  return final;
}

/**
 * Tries to derive name for the `value`
 *
 * @param value
 */
function guessObjectName(value: any): string {
  return (
    value.name || (value.constructor && value.constructor.name) || "Object"
  );
}

/**
 * Tries to derive name for the `descriptor`.
 *
 * @param descriptor
 */
function guessDescriptorName(descriptor: DescriptorOpts): string {
  if (descriptor.name) return descriptor.name;
  if (descriptor.valuePrototype && (<any>descriptor.valuePrototype).name)
    return (<any>descriptor.valuePrototype).name;
  if (descriptor.valueConstructor && descriptor.valueConstructor.name)
    return descriptor.valueConstructor.name;
  if (
    descriptor.valuePrototype &&
    descriptor.valuePrototype.constructor &&
    descriptor.valuePrototype.constructor.name
  )
    return descriptor.valuePrototype.constructor.name;
  return "Object";
}

const PojsoPropsDescriptor = propsDescriptor(descriptorTemplate);

/**
 * This function registers `value` as opaque. The library outputs names instead
 * of stored data for them. The values should be registered with the same name
 * on writing and reading sides. Adds `[descriptorSymbol]` property to the
 * value.
 *
 * @param value
 * @param name
 * @param props - should the properties of the object be output too
 */
export function regOpaqueObject(
  value: any,
  name: string = guessObjectName(value),
  props: boolean = false
): Descriptor {
  if (value.hasOwnProperty(descriptorSymbol)) return value[descriptorSymbol];
  const descr = regDescriptor(
    {
      ...OpaqueDescriptor,
      name,
      value,
      props,
      typeofHint: typeof value
    },
    value
  );
  return descr;
}

/**
 * Same as `regOpaqueObject` but doesn't add `[descriptorSymbol]` property and
 * stores value->descriptor mapping in an internal global registry instead.
 * @see regOpaqObject
 */
export function regOpaquePrim<T>(
  value: T,
  name: string = String(value)
): Descriptor<T> {
  let descriptor = descriptorByValue.get(value);
  if (descriptor) return descriptor;
  descriptor = regDescriptor({
    ...OpaqueDescriptor,
    name,
    value,
    refAware: false
  });
  descriptorByValue.set(value, descriptor);
  return descriptor;
}

/**
 * Registers `prototype` of `constructor` as opaque value and use it
 * as the value's type in output. It also adds resulting `descriptorSymbol`
 * into a prototype.
 *
 * @see regOpaqueObject
 * @param constructor - plain JS constructor function or class
 * @param descriptor
 */
export function regConstructor<T>(
  constr: ValueConstructor<T>,
  descriptor: IncompleteDescriptor<T> = descriptorTemplate
): Descriptor<T> {
  return regDescriptor(
    {
      valuePrototype: constr.prototype,
      name: constr.name,
      ...descriptor
    },
    constr.prototype
  );
}

export const NotSerializableDescriptor = regDescriptor({
  name: "NotSerializable",
  read() {
    throw new Error("INTERNAL: trying to read not serializable value");
  },
  create() {},
  readContent() {},
  write(): JSONValue {
    return NotSerializableToken;
  },
  props: false,
  refAware: false,
  default$: false
});

/** same as `regConstructor` but it also uses `constr` with new to build the object */
export function regNewConstructor<T>(
  constr: ValueConstructor<T>,
  descriptor: IncompleteDescriptor<T> = descriptorTemplate
): Descriptor {
  return regConstructor(constr, { valueConstructor: constr, ...descriptor });
}

const PojsoDescriptor = regDescriptor({
  ...descriptorTemplate,
  name: "Object"
});

const PrimDescriptor: Descriptor = regDescriptor({
  name: "Prim",
  read(_: ReadContext, json: JSONValue): any {
    return json;
  },
  create(_: ReadContext, json: JSONValue): any {
    return json;
  },
  write(_: WriteContext, value: any): JSONValue {
    return value;
  },
  refAware: false,
  props: false,
  default$: false
});

const RefDescriptor: Descriptor = regDescriptor({
  name: "Ref",
  read(ctx: ReadContext, json: JSONValue): any {
    return ctx.shared[<number>(<JSONObject>json).r];
  }
});

export const NotSerializableToken = { _notSerializable: true };

function writeProp(
  ctx: WriteContext,
  info: JSONArray,
  descr: PropertyDescriptor
): JSONArray | undefined {
  let flags = 0;
  if ("value" in descr) {
    const valueJson = ctx.step(descr.value, info, 1);
    if (valueJson === NotSerializableToken) return;
    info.push(valueJson);
  } else {
    info.push(null);
    flags = flags | 8;
  }
  if (!descr.configurable) flags = flags | 1;
  if (!descr.enumerable) flags = flags | 2;
  if (!descr.writable) flags = flags | 4;
  if (flags || descr.set || descr.get) info.push(flags);
  if (descr.get) info[3] = ctx.step(descr.get, info, 3);
  if (descr.set) info[4] = ctx.step(descr.set, info, 4);
  return info;
}

/** Writing serialized `Object.defineProperty` descriptors to JSON */
export function writeProps(
  ctx: WriteContext,
  descrs: { [name: string]: PropertyDescriptor },
  pred: { [name: string]: boolean }
) {
  const props = [];
  for (const name in descrs) {
    if (pred[name] === false) continue;
    const propInfo = writeProp(ctx, [name], descrs[name]);
    if (propInfo) props.push(propInfo);
  }
  for (const name of Object.getOwnPropertySymbols(descrs)) {
    if (pred[<any>name] === false) continue;
    const propJson: JSONArray = [];
    const sym = writeSym(ctx, name, propJson, 0, !ctx.ignore && !ctx.knownSyms);
    if (sym === NotSerializableToken) continue;
    propJson.push(sym);
    writeProp(ctx, propJson, descrs[<any>name]);
    if (propJson.length) props.push(propJson);
  }
  return props;
}

/** Reading serialized `Object.defineProperty` descriptors from JSON */
export function readProps<T extends SerializableObject>(
  ctx: ReadContext,
  props: any[],
  value: T
) {
  for (const [key, pjson, flags, get, set] of props) {
    const name = key.substr
      ? key
      : key.$
      ? descriptorByName.get(key.$)
      : readSym(ctx, key);
    if (flags != null) {
      const pdescr: PropertyDescriptor = {};
      pdescr.configurable = (flags & 1) === 0;
      pdescr.enumerable = (flags & 2) === 0;
      if ((flags & 4) === 0) pdescr.writable = true;
      if ((flags & 8) === 0) pdescr.value = ctx.step(pjson);
      if (get) pdescr.get = ctx.step(get);
      if (set) pdescr.set = ctx.step(set);
      Object.defineProperty(value, name, pdescr);
    } else {
      value[name] = ctx.step(pjson);
    }
  }
}

/** wraps descriptor by adding its own property into the saved dictionary */
function propsDescriptor<T extends SerializableObject>(
  descriptor: Descriptor<T>
): Descriptor<T> {
  const pred = descriptor.overrideProps || defaultOverrideProps;
  return {
    name: descriptor.name,
    write(
      ctx: WriteContext,
      value: T,
      parent: JSONArray | JSONObject,
      index: number | string
    ): JSONValue {
      const json = descriptor.write(ctx, value, parent, index);
      const props = writeProps(
        ctx,
        Object.getOwnPropertyDescriptors(value),
        pred
      );
      if (props.length) json.f = props;
      return json;
    },
    read: defaultRead,
    readContent(ctx: ReadContext, json: JSONValue, value: T) {
      descriptor.readContent(ctx, json, value);
      const props = <JSONArray>(<JSONObject>json).f;
      if (props) readProps(ctx, props, value);
    },
    create(ctx, json) {
      return descriptor.create(ctx, json);
    }
  };
}

function defaultRead<T>(
  this: ReadDescriptor<T>,
  ctx: ReadContext,
  json: JSONValue
): T {
  const value = this.create(ctx, json);
  this.readContent(ctx, json, value);
  return value;
}

const OpaqueDescriptor: IncompleteDescriptor<any> = {
  write(ctx, value, par, index): JSONValue {
    if (value !== this.value || !this.name)
      return PojsoPropsDescriptor.write(ctx, value, par, index);
    return { $: this.name };
  },
  create(): any {
    return this.value;
  },
  default$: false
};

function writeSym(
  ctx: WriteContext,
  sym: symbol,
  parent: JSONArray | JSONObject,
  index: number | string,
  ignore?: boolean
): JSONValue {
  const key = Symbol.keyFor(sym);
  if (key) return { key };
  const global = descriptorByValue.get(sym);
  if (global) return global.write(ctx, sym, parent, index);
  if (!ignore && ctx.knownSyms) {
    let descr = ctx.knownSyms.get(sym);
    if (!descr) {
      if (!ctx.symsByName) throw new Error(`couldn't write "${String(sym)}"`);
      let name = sym.description;
      if (!name) {
        const text = String(sym);
        name = text.substring(7 /*"Symbol("*/, text.length - 1);
      }
      let tup = ctx.symsByName.get(name);
      if (!tup) ctx.symsByName.set(name, (tup = []));
      descr = { name, id: tup.length, value: sym };
      tup.push(descr);
      ctx.knownSyms.set(sym, descr);
    }
    const res: JSONObject = { name: descr.name };
    if (descr.id) res.id = descr.id;
    return res;
  }
  if (!ignore && !ctx.ignore)
    throw new Error(`couldn't write "${String(sym)}"`);
  return NotSerializableToken;
}

export const undefinedSymbol = Symbol("@effectful/serialization/undefined");

interface SymbolDescr {
  name: string;
  id: number;
  value: symbol;
}

function readSym(ctx: ReadContext, json: JSONValue): symbol {
  if ((<JSONObject>json).key) return Symbol.for(<string>(<JSONObject>json).key);
  const { name } = <JSONObject>json;
  if (name && ctx.symsByName) {
    let local = ctx.symsByName.get(<string>name);
    const id = <number>(<JSONObject>json).id || 0;
    if (local) {
      const descr = local[id];
      if (descr) return descr.value;
    }
    if (ctx.ignore) {
      const descr = {
        name: <string>name,
        id,
        value: Symbol(<string>(<JSONObject>json).name)
      };
      if (!local) ctx.symsByName.set(<string>name, (local = []));
      local[id] = descr;
      if (ctx.knownSyms) ctx.knownSyms.set(descr.value, descr);
      return descr.value;
    }
  }
  if (!ctx.ignore) throw new Error(`couldn't read "${JSON.stringify(json)}"`);
  return undefinedSymbol;
}

function specValueDescriptor<T>(name: string, value: T): Descriptor<T> {
  return regDescriptor({
    name,
    write(): JSONValue {
      return { $: name };
    },
    create(): any {
      return value;
    },
    refAware: false,
    props: false,
    default$: false
  });
}

const NaNDescriptor = specValueDescriptor("NaN", NaN);
const UndefDescriptor = specValueDescriptor("undefined", void 0);

const SymbolDescriptor = regDescriptor<symbol>({
  write: writeSym,
  read: readSym,
  name: "Symbol",
  refAware: false,
  props: false
});

const BigIntDescriptor =
  typeof BigInt === "function"
    ? regDescriptor({
        read(_: ReadContext, json: JSONValue): BigInt {
          return BigInt((<JSONObject>json).int);
        },
        write(_: WriteContext, value: BigInt) {
          return { int: value.toString() };
        },
        name: "Int",
        refAware: false,
        props: false
      })
    : regDescriptor({
        name: "Int",
        read(_: ReadContext, json: JSONValue): number {
          return <number>(<JSONObject>json).int;
        },
        write(_: WriteContext, value: number): JSONValue {
          return { int: String(value) };
        },
        refAware: false,
        props: false
      });

function getObjectDescriptor<T extends WithTypeofTag & Serializable>(
  value: T
): Descriptor<T> {
  const descriptor = value[descriptorSymbol];
  if (descriptor) return descriptor;
  if (value.$$typeof) {
    const res = descriptorByTypeOfProp.get(value.$$typeof);
    if (res) return res;
  }
  return PojsoDescriptor;
}

function getValueDescriptor(value: any): Descriptor | undefined {
  if (value === void 0) return UndefDescriptor;
  switch (typeof value) {
    case "number":
      if (isNaN(value)) return NaNDescriptor;
    case "undefined":
    case "boolean":
    case "string":
      return PrimDescriptor;
    case "object":
      if (!value) return PrimDescriptor;
      return getObjectDescriptor(value);
    case "function":
      return value[descriptorSymbol] || null;
    case "symbol":
      return SymbolDescriptor;
    case "bigint":
      return BigIntDescriptor;
  }
  return descriptorByValue.get(value);
}

function lookupDescriptor(typeName: string): Descriptor {
  const descriptor = descriptorByName.get(typeName);
  if (!descriptor) throw new TypeError(`not registered type:${typeName}`);
  return descriptor;
}

function getJsonDescriptor(json: JSONValue): Descriptor {
  if (typeof json !== "object" || json === null) return PrimDescriptor;
  if (Array.isArray(json)) return ArrayDescriptor;
  if ("$" in json) return lookupDescriptor(<string>json.$);
  if ("r" in json) return RefDescriptor;
  return PojsoDescriptor;
}

const ArrayDescriptor = regNewConstructor(Array, {
  ...descriptorTemplate,
  write(ctx: WriteContext, value: unknown[]): JSONArray {
    const json: JSONArray = [];
    for (const i of value) json.push(ctx.step(i, json, json.length));
    return json;
  },
  readContent(ctx: ReadContext, json: JSONValue, value: unknown[]) {
    for (const i of <JSONArray>json) value.push(ctx.step(i));
  },
  props: false,
  default$: false
});

function iterableDescriptor<T extends Iterable<unknown>>(
  descriptor: IncompleteDescriptor<T>
): IncompleteDescriptor<T> {
  return {
    ...descriptorTemplate,
    write(ctx: WriteContext, value: Iterable<unknown>): JSONValue {
      const json: JSONArray = [];
      for (const i of value) json.push(ctx.step(i, json, json.length));
      return { $: this.name || "Iterable", l: json };
    },
    ...descriptor
  };
}

regNewConstructor<Set<unknown>>(
  Set,
  iterableDescriptor({
    readContent(ctx: ReadContext, json: JSONValue, value: Set<unknown>) {
      for (const i of <JSONArray>(<JSONObject>json).l) value.add(ctx.step(i));
    }
  })
);

regNewConstructor(
  Map,
  iterableDescriptor({
    write(ctx: WriteContext, value: Map<unknown, unknown>): JSONObject {
      const k: JSONArray = [];
      const v: JSONArray = [];
      for (const [ki, vi] of value) {
        k.push(ctx.step(ki, k, k.length));
        v.push(ctx.step(vi, v, v.length));
      }
      return { k, v };
    },
    readContent(
      ctx: ReadContext,
      json: JSONValue,
      value: Map<unknown, unknown>
    ) {
      const { k, v } = <JSONObject>json;
      for (let i = 0, len = (<JSONArray>k).length; i < len; ++i)
        value.set(ctx.step((<JSONArray>k)[i]), ctx.step((<JSONArray>v)[i]));
    }
  })
);

regNewConstructor(RegExp, {
  name: "RegExp",
  write(_: WriteContext, value: RegExp): JSONObject {
    const json: JSONObject = { src: value.source, flags: value.flags };
    if (value.lastIndex) json.last = value.lastIndex;
    return json;
  },
  create(_: ReadContext, json: JSONValue): RegExp {
    const value = new RegExp(
      <string>(<JSONObject>json).src,
      <string>(<JSONObject>json).flags
    );
    if ((<JSONObject>json).last)
      value.lastIndex = <number>(<JSONObject>json).last;
    return value;
  },
  props: false,
  refAware: false
});

/**
 * registers an object as opaque along with all other
 * values accessible from this object
 */
export function regOpaqueRec(
  value: any,
  prefix: string = value.constructor.name,
  deep: boolean = false
) {
  if (
    typeof value.hasOwnProperty !== "function" ||
    value.hasOwnProperty(descriptorSymbol)
  )
    return;
  regOpaqueObject(value, prefix);
  const descrs = Object.getOwnPropertyDescriptors(value);
  for (const i of Object.getOwnPropertySymbols(descrs)) {
    if (i === descriptorSymbol) continue;
    reg(descrs[<any>i], `${prefix}#${String(i)}`);
  }
  for (const i of Object.getOwnPropertyNames(descrs))
    reg(descrs[i], `${prefix}#${i}`);
  if (deep) {
    const proto = Object.getPrototypeOf(value);
    if (proto) regOpaqueRec(proto, `${prefix}#proto`, true);
  }
  function reg(descr: PropertyDescriptor, name: string) {
    const val = descr.value;
    if (!val) return;
    const ty = typeof val;
    if (ty === "function" || ty === "object") {
      if (deep) {
        regOpaqueRec(val, name, deep);
      } else {
        regOpaqueObject(val, name);
      }
    } else if (ty === "symbol" && Symbol.keyFor(val) == null)
      regOpaquePrim(val, `${prefix}#${name}#${String(val)}`);
  }
}

/**
 * Opaque object will be added automatically if not known object built with
 * `constr` is encountered when writing.
 *
 */
export function regAutoOpaqueConstr(constr: any, silent?: boolean) {
  return (constr.prototype[descriptorSymbol] = {
    write(
      ctx: WriteContext,
      value: any,
      parent: any,
      index: string | number
    ): JSONValue {
      let name = constr.name;
      if (value.name) name += `:${value.name}`;
      else if (value.constructor !== constr) name += value.constructor.name;
      if (!silent) console.warn("auto opaque", name); // tslint:disable-line
      return regOpaqueObject(value, name).write(ctx, value, parent, index);
    }
  });
}
