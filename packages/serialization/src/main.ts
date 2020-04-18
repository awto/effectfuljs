/**
 * # Serialization library for @effectful toolchain
 */

const savedObject = {
  defineProperty: Object.defineProperty,
  getOwnPropertyDescriptors: Object.getOwnPropertyDescriptors,
  assign: Object.assign,
  create: Object.create,
  setPrototypeOf: Object.setPrototypeOf,
  getPrototypeOf: Object.getPrototypeOf,
  getOwnPropertySymbols: Object.getOwnPropertySymbols,
  getOwnPropertyNames: Object.getOwnPropertyNames,
  getOwnPropertyDescriptor: Object.getOwnPropertyDescriptor,
};

// tslint:disable-next-line
const savedConsol = { log: console.log, warn: console.warn };

function showStack(ctx: WriteContext, key: string | number, value: any) {
  savedConsol.warn("SF#0: ", key, value);
  let i = ctx.jobs;
  let num = 0;
  for (;;) {
    while (i && !i.started) i = i.nextJob;
    if (!i) break;
    savedConsol.warn(`SF#${++num}:`, i.index, ":", i.value);
    if (num > 200) break;
    i = i.nextJob;
  }
}

const LocMap = Map;
const LocWeakMap = WeakMap;
const LocSet = Set;

const hasPropDefault = Object.prototype.hasOwnProperty;

function hasProp(obj: any, name: symbol): boolean {
  return hasPropDefault.call(obj, name);
}

export interface State {
  /** name for a property storing descriptor */
  symbol: symbol;
  /** descriptors registered by type's name */
  byName: Map<string, Descriptor>;
  /** descriptors registered by some primitive value */
  byValue: Map<any, Descriptor>;
  /** descriptors registered by some value */
  byObject: WeakMap<any, Descriptor>;
  /**
   * react uses `$$typeof` property for its values, it is the mapping
   * @private
   */
  byTypeOfProp: Map<symbol, Descriptor>;
}

export const options = {
  descriptorSymForOpaque: true,
};

export interface IncompleteState {
  symbol?: symbol;
  byName?: Map<string, Descriptor>;
  byValue?: Map<any, Descriptor>;
  byObject?: WeakMap<any, Descriptor>;
  byTypeOfProp?: Map<symbol, Descriptor>;
}

/** symbol for storing global state */
declare let __effectfulSerializationState: IncompleteState;

function initializeState(init: IncompleteState): State {
  if (!init.symbol) init.symbol = Symbol("@effectful/serialization/descriptor");
  if (!init.byName) init.byName = new LocMap();
  if (!init.byValue) init.byValue = new LocMap();
  if (!init.byObject) init.byObject = new LocWeakMap();
  if (!init.byTypeOfProp) init.byTypeOfProp = new LocMap();
  return <State>init;
}

if (!(<any>global).__effectfulSerializationState)
  (<any>global).__effectfulSerializationState = {};

let state: State = initializeState(__effectfulSerializationState);

let ObjectConstr = Object;

/** name of a property to specify `Descriptor` for JS value */
export let descriptorSymbol: symbol = state.symbol;

let descriptorByName: Map<string, Descriptor> = state.byName;
let descriptorByValue: Map<any, Descriptor> = state.byValue;
let descriptorByObject: WeakMap<any, Descriptor> = state.byObject;
let descriptorByTypeOfProp: Map<symbol, Descriptor> = state.byTypeOfProp;

/**
 * Sets new state value
 *
 * After setting this each instance of this module will have own state
 */
export function resetState(init: IncompleteState = {}) {
  state = initializeState(init);
  descriptorSymbol = state.symbol;
  descriptorByName = state.byName;
  descriptorByValue = state.byValue;
  descriptorByObject = state.byObject;
  descriptorByTypeOfProp = state.byTypeOfProp;
}

export function getState(): State {
  return state;
}

/**
 * Conversion between JSON values and JS values. JSON values set is a subset
 * of JS values which can be converted to string using `JSON.stringify`
 * function and read back with `JSON.parse`.
 */

/** Options to amend `write` behavior */
export interface WriteOptions {
  /**
   * don't throw exception if there is any writting error
   */
  ignore?: boolean | "opaque" | "placeholder";
  /**
   * execute `console.warn` for each ignored value (if `ignore` isn't falsy)
   */
  warnIgnored?: boolean;
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
  /**
   * by default the serializer uses references only if the object is referred more than once
   * this may still lead to stack overflow in `JSON.stringify` esp. if the data has some
   * structures like linked lists, this option will always generate a reference
   */
  alwaysByRef?: boolean;
  verbose?: boolean;
}

/** Options to amend `write` behavior */
export interface ReadOptions {
  /** don't throw exception if there is any reading error */
  ignore?: boolean | "placeholder";
  warnIgnored?: boolean;
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

/* TODO after TS supports symbol indexes `{ [name: string | symbol]: boolean } */
const defaultOverrideProps: any = {
  [descriptorSymbol]: false,
};

const funcOverrideProps: { [name: string]: boolean } = {
  arguments: false,
  caller: false,
  length: false,
  name: false,
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

export interface WithTypeofTag {
  $$typeof?: symbol;
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
   * Make a snapshot of its original property values and won't write
   * them if they aren't changed
   */
  propsSnapshot?: boolean;

  /**
   * If !== false the descriptor will add property `$` equal to `name` by default
   */
  default$?: boolean;

  /**
   * `typeof value` for the values this serializes
   */
  typeofHint?: string;

  /** if `props !== false` this is a predicate to specify which properties should be output. */
  overrideProps?: { [name: string /*|symbol*/]: boolean };

  /** don't change the `name` to make it unique */
  strictName?: boolean;

  /** a prototype to be assigned with `Object.setPrototype` in reads */
  valuePrototype?: object | null | false;

  /** Serialized value's constructor */
  valueConstructor?: ValueConstructor<T>;

  /** constant value */
  value?: T;

  /** mask for property descriptor flags (configurable:1,enumerable:2,writable:4,no value = 8)  */
  propsDescrMask?: number;

  /**
   * if an object has this prototype it won't be recorded
   */
  defaultPrototype?: any;

  /**
   * for descriptors traversing properties with stores
   * original values which shouldn't be output
   */
  snapshot?: { [name: string]: PropertyDescriptor };
  /** if it is a value in a global scope this will store its name */
  globalName?: string;
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
  ) => JSONValue;
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
 * read back with `JSON.parse`
 */

/**
 * Converts JS Plain Object into JSON Object
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
  const alwaysByRef = opts.alwaysByRef;
  const x: any[] = [];
  for (let job; (job = ctx.jobs) != null; ) {
    if (job.started) {
      if (alwaysByRef) {
        if (job.ref) job.ref.r = x.push(job.data) - 1;
      } else refs.push(job);
      job = ctx.jobs = job.nextJob;
      continue;
    }
    job.started = true;
    job.data = <JSONObject>(
      (<any>job.descriptor).write(ctx, job.value, job.parent, job.index)
    );
  }
  if (!alwaysByRef && refs.length) {
    for (const info of refs)
      if (info.ref) {
        info.ref.r = x.push(info.data) - 1;
        if (info.parent) (<any>info.parent)[<any>info.index] = info.ref;
      } else if (info.parent) (<any>info.parent)[<any>info.index] = info.data;
  }
  return x.length
    ? savedObject.assign({ x }, <JSONObject>res[0])
    : <JSONObject>res[0];
}

/**
 * Converts JSON Object returned by {@link write} back to JS Object
 *
 * @param json - object to read
 */

const emptyArr: any[] = [];

export function read(json: JSONObject, opts: ReadOptions = {}) {
  if (typeof json !== "object")
    throw new TypeError("root value must be Object");
  const jsons = <any>json.x;
  const len = jsons ? jsons.length : 0;
  const ctx = new ReadContext(opts, jsons || emptyArr);
  if (len) {
    const vals = ctx.sharedVals;
    const descriptors = ctx.sharedDescriptors;
    for (let i = 0; i < len; ++i) {
      const propJson = jsons[i];
      descriptors[i] = getJsonDescriptor(ctx, propJson);
    }
    for (let i = 0; i < len; ++i) {
      const value = vals[i];
      if (value !== undef) continue;
      vals[i] = descriptors[i].create(ctx, jsons[i]);
    }
    for (let i = 0; i < len; ++i)
      descriptors[i].readContent(ctx, jsons[i], vals[i]);
  }
  return getJsonDescriptor(ctx, json).read(ctx, json);
}

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

export const boundThisSymbol = Symbol("@effectful/bind/this");
export const boundArgsSymbol = Symbol("@effectful/bind/args");
export const boundFunSymbol = Symbol("@effectful/bind/fun");

function makeBind(): (...args: any[]) => any {
  function bind(...rest: any[]): any {
    return (<any>bind)[boundFunSymbol].apply((<any>bind)[boundThisSymbol], [
      ...(<any>bind)[boundArgsSymbol],
      ...rest,
    ]);
  }
  (<any>bind)[descriptorSymbol] = BindDescriptor;
  return bind;
}

export const BindDescriptor = regDescriptor({
  name: "Bind",
  create() {
    return makeBind();
  },
  write() {
    return {};
  },
  overrideProps: { ...funcOverrideProps, prototype: false },
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
  res[boundThisSymbol] = self;
  res[boundFunSymbol] = func;
  res[boundArgsSymbol] = args;
  return res;
}

interface SharedRefInfo {
  ref: JSONObject | null;
  data: JSONObject | null;
  parent?: JSONObject | JSONArray;
  index?: string | number;
  value?: any;
  descriptor?: Descriptor<any>;
  nextJob?: SharedRefInfo;
  started?: boolean;
}

/**
 * An object passed to Descriptor's `write` method to support recursive
 * invocation for nested values
 */
export class WriteContext {
  sharedRefs: Map<any, SharedRefInfo>;
  refs: SharedRefInfo[];
  opts: WriteOptions;
  symsByName?: Map<string, SymbolDescr[]>;
  knownSyms?: Map<symbol, SymbolDescr>;
  jobs?: SharedRefInfo;

  constructor(opts: WriteOptions) {
    this.sharedRefs = opts.sharedRefs || (opts.sharedRefs = new LocMap());
    this.refs = [];
    this.opts = opts;
    this.symsByName = opts.symsByName || (opts.symsByName = new LocMap());
    this.knownSyms = opts.knownSyms || (opts.knownSyms = new LocMap());
    this.jobs = void 0;
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
      const { opts } = this;
      if (opts.ignore !== true && opts.verbose) showStack(this, key, value);
      if (!opts.ignore)
        throw new TypeError(
          `not serializable value "${value}" at "${key}" of "${parent}"`
        );
      // tslint:disable-next-line
      if (opts.warnIgnored && console.warn) {
        // tslint:disable-next-line
        console.warn("not serializable value", value);
      }
      if (opts.ignore === true) return NotSerializableToken;
      if (opts.ignore === "opaque") {
        descriptor =
          typeof value === "object" || typeof value === "function"
            ? regOpaqueObject(value)
            : regOpaquePrim(value);
      } else if (opts.ignore === "placeholder") {
        descriptor = NotSerializablePlaceholderDescriptor;
      } else
        throw new TypeError(
          `unsupported value for ignore option = ${opts.ignore}`
        );
    }
    if (descriptor) {
      return descriptor.write(this, value, parent, key);
    }
    return {};
  }
}

(<any>WriteContext.prototype).showStack = function (
  key: string | number,
  value: any
) {
  showStack(this, key, value);
};
const undef = { _undef: true };

/**
 * An object passed to Descriptor's `read` method to support recursive invocation
 * for nested values
 */
export class ReadContext {
  symsByName?: Map<string, SymbolDescr[]>;
  knownSyms: Map<symbol, SymbolDescr>;
  sharedJsons: JSONValue[];
  sharedVals: any[];
  sharedDescriptors: Descriptor[];
  opts: ReadOptions;
  constructor(opts: ReadOptions, sharedJsons: JSONValue[]) {
    this.knownSyms = opts.knownSyms || (opts.knownSyms = new LocMap());
    this.symsByName = opts.symsByName || (opts.symsByName = new LocMap());
    this.opts = opts;
    const len = sharedJsons.length;
    this.sharedJsons = sharedJsons;
    this.sharedVals = opts.shared || (opts.shared = Array(len).fill(undef));
    this.sharedDescriptors = Array(len);
  }
  /**
   * Invokes read recursively for nested values
   * @param json - value to read
   */
  step(json: JSONValue): any {
    return getJsonDescriptor(this, json).read(this, json);
  }
}

function defaultWrite<T>(
  this: Descriptor<T>,
  ctx: WriteContext,
  value: T
): JSONValue {
  const json: JSONObject = {};
  if (this.valuePrototype !== void 0) return json;
  const proto = savedObject.getPrototypeOf(value);
  if (proto === ObjectConstr.prototype || proto === this.defaultPrototype)
    return json;
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
    return savedObject.create(this.valuePrototype);
  const protoJson = <JSONObject>(<JSONObject>json).p;
  if (protoJson === void 0)
    return <T>(
      (this.defaultPrototype ? savedObject.create(this.defaultPrototype) : {})
    );
  if (protoJson === null) return savedObject.create(null);
  let protoValue;
  // TODO: since prototypes cannot be cyclic it could ensure this
  // on proper ordering objects in `r`, this way there are no needs
  // for `Object.setPrototype`
  if (protoJson.r != null) {
    protoValue = ctx.sharedVals[<number>protoJson.r];
    if (protoValue === undef) protoValue = null;
  } else if (protoJson.$ && !protoJson.f) protoValue = ctx.step(protoJson);
  return savedObject.create(protoValue || null);
}

/**
 * default implementaiton of {@link Descriptor}
 */
export const descriptorTemplate: Descriptor = {
  read: defaultRead,
  write: defaultWrite,
  create: defaultCreate,
  readContent(ctx: ReadContext, json: JSONValue, value: any) {
    if ((<JSONObject>json).p && savedObject.getPrototypeOf(value) === null) {
      savedObject.setPrototypeOf(value, ctx.step((<JSONObject>json).p));
    }
  },
};

/**
 * Enhances descriptor by adding reference handling. It some value is referenced
 * in more than one sub-value it will have a unique value id instead of the
 * value in the output.
 */
function refAwareDescriptor<T>(descriptor: Descriptor<T>): Descriptor<T> {
  return savedObject.assign({}, descriptor, {
    name: descriptor.name,
    read(ctx: ReadContext, json: JSONValue) {
      const ref = <number>(<JSONObject>json).r;
      if (ref != null) {
        const res = this.create(ctx, json);
        this.readContent(ctx, json, res);
        return res;
      }
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
          (ctx.jobs = info = {
            ref: null,
            data: null,
            parent,
            value,
            descriptor,
            index,
            nextJob: ctx.jobs,
            started: false,
          })
        );
        ctx.jobs = info;
        if (!ctx.opts.alwaysByRef) return null;
      }
      if (info.ref == null) info.ref = {};
      return info.ref;
    },
    create(ctx: ReadContext, json: JSONValue): T {
      const ref = <number>(<JSONObject>json).r;
      if (ref != null) {
        const value = ctx.sharedVals[ref];
        if (value !== undef) return value;
        return (ctx.sharedVals[ref] = ctx.sharedDescriptors[ref].create(
          ctx,
          ctx.sharedJsons[ref]
        ));
      }
      return descriptor.create(ctx, json);
    },
    readContent(ctx: ReadContext, json: JSONValue, value: any) {
      if ((<JSONObject>json).r != null) return;
      descriptor.readContent(ctx, json, value);
    },
  });
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
  descriptor: IncompleteDescriptor<T>
): Descriptor<T> {
  let {
    read: readImpl,
    readContent: readContentImpl,
    create: createImpl,
    write: writeImpl,
  } = descriptor;
  if (!readImpl) {
    if (descriptor.create)
      readImpl = descriptor.readContent ? defaultRead : descriptor.create;
  }
  if (
    !descriptor.defaultPrototype &&
    descriptor.props !== false &&
    descriptor.propsSnapshot !== false &&
    descriptor.value
  )
    descriptor.defaultPrototype = savedObject.getPrototypeOf(descriptor.value);
  const overrideProps = savedObject.assign(
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
  let final: Descriptor = savedObject.assign({}, descriptor, {
    read: readImpl,
    readContent: readContentImpl,
    create: createImpl,
    write: writeImpl,
    name: uniq,
    overrideProps,
  });
  if (descriptor.props !== false) final = propsDescriptor(final);
  if (descriptor.default$ !== false && uniq !== "Object") {
    const saved = final;
    final = savedObject.assign({}, final, {
      write(
        ctx: WriteContext,
        val: any,
        parent: JSONObject | JSONArray,
        index: number | string
      ): JSONValue {
        const json = <JSONObject>saved.write(ctx, val, parent, index);
        if (!json.$) json.$ = uniq;
        return json;
      },
    });
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
    value: descriptor.value,
    props: descriptor.props,
    default$: descriptor.default$,
    snapshot: final.snapshot,
  };
  return final;
}

/**
 * updates `snapshot` with the current values of its properties
 *
 * @param value - an object registered by `regOpaqueObject` before
 */
export function updateInitialSnapshot(value: any) {
  const descriptor = getValueDescriptor(value);
  if (!descriptor) throw new TypeError("not serializable value");
  if (!descriptor.snapshot || !descriptor.value || descriptor.value !== value)
    throw new TypeError("the object doesn't contain another snapshot");
  savedObject.assign(
    descriptor.snapshot,
    savedObject.getOwnPropertyDescriptors(value)
  );
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
  descriptor: IncompleteDescriptor<any> = { props: true, propsSnapshot: true }
): Descriptor {
  if (!value) return <any>null;
  const useSymbol = options.descriptorSymForOpaque !== false;
  if (useSymbol && hasProp(value, descriptorSymbol))
    return value[descriptorSymbol];
  let descr: Descriptor | undefined;
  if ((descr = descriptorByObject.get(value)) != null) return descr;

  descr = regDescriptor(
    savedObject.assign(
      {},
      OpaqueDescriptor,
      { name, typeofHint: typeof value },
      descriptor,
      { value }
    )
  );
  if (useSymbol) {
    try {
      savedObject.defineProperty(value, descriptorSymbol, {
        value: descr,
        configurable: true,
        writable: true,
      });
      return descr;
    } catch (e) {
      // not extensible
    }
  }
  descriptorByObject.set(value, descr);
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
  descriptor = regDescriptor(
    savedObject.assign({}, OpaquePrimDescriptor, {
      name,
      value,
      refAware: false,
    })
  );
  descriptorByValue.set(value, descriptor);
  return descriptor;
}

export function regPrim<T>(
  descriptor: Descriptor<T>,
  value: any,
  name: string = String(value)
) {
  descriptor = regDescriptor(
    savedObject.assign({}, descriptor, { name, value, refAware: false })
  );
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
  descriptor: IncompleteDescriptor<T> = {}
): Descriptor<T> {
  const descr = regDescriptor(
    savedObject.assign(
      { valuePrototype: constr.prototype, name: constr.name },
      descriptorTemplate,
      descriptor,
      {
        overrideProps: savedObject.assign({}, descriptor.overrideProps),
        propsSnapshot: descriptor.propsSnapshot,
      }
    )
  );
  savedObject.defineProperty(constr.prototype, descriptorSymbol, {
    value: descr,
    configurable: true,
    writable: true,
  });
  return descr;
}

export const NotSerializableDescriptor = regDescriptor({
  name: "NotSerializableToken",
  read() {
    throw new TypeError("Trying to use not serializable value");
  },
  create() {},
  readContent() {},
  write(): JSONValue {
    return NotSerializableToken;
  },
  props: false,
  refAware: false,
  default$: false,
});

const NotSerializablePlaceholderDescriptor = regDescriptor({
  name: "NotSerializable",
  read: notSerializableRead,
  create: notSerializableRead,
  readContent() {},
  write(): JSONValue {
    return {};
  },
  props: false,
  refAware: false,
});

function notSerializableRead(this: Descriptor) {
  if (this.name === "NotSerializable") return notSerializablePlaceholder;
  const res: any = function () {};
  res[descriptorSymbol] = this.name;
  return new Proxy(res, notSerializableTraps);
}

/** same as `regConstructor` but it also uses `constr` with new to build the object */
export function regNewConstructor<T>(
  constr: ValueConstructor<T>,
  descriptor: IncompleteDescriptor<T> = {}
): Descriptor {
  return regConstructor(
    constr,
    savedObject.assign(
      { valueConstructor: constr },
      descriptorTemplate,
      descriptor
    )
  );
}

const PojsoDescriptor = regDescriptor({
  ...descriptorTemplate,
  name: "Object",
});

export const PrimDescriptor: Descriptor = regDescriptor({
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
  default$: false,
});

const RefDescriptor: Descriptor = regDescriptor({
  name: "Ref",
  read(ctx: ReadContext, json: JSONValue): any {
    return ctx.sharedVals[<number>(<JSONObject>json).r];
  },
});

export const NotSerializableToken = { _notSerializable: true };

function writeProp(
  ctx: WriteContext,
  info: JSONArray,
  descr: PropertyDescriptor,
  flags: number
): JSONArray | undefined {
  if ((flags & 8) === 0) {
    const valueJson = ctx.step(descr.value, info, 1);
    if (valueJson === NotSerializableToken) return;
    info.push(valueJson);
  } else {
    info.push(null);
  }
  if (flags || descr.set || descr.get) info.push(flags);
  if (descr.get) info[3] = ctx.step(descr.get, info, 3);
  if (descr.set) info[4] = ctx.step(descr.set, info, 4);
  return info;
}

function descrFlags(descr: PropertyDescriptor): number {
  let flags = 0;
  if (!descr.configurable) flags = flags | 1;
  if (!descr.enumerable) flags = flags | 2;
  if (!descr.writable) flags = flags | 4;
  if (!("value" in descr)) {
    flags = flags | 8;
  }
  return flags;
}

function propFlags(
  snapshot: { [name: string]: PropertyDescriptor } | undefined,
  pred: { [name: string]: boolean },
  name: string,
  descr: PropertyDescriptor,
  mask: number
): number | undefined {
  let flags: number | undefined;
  if (pred[name] === false || ((flags = descrFlags(descr)) & mask) !== 0)
    return void 0;
  if (snapshot) {
    const init = snapshot[name];
    if (
      init &&
      (("value" in init && Object.is(init.value, descr.value)) ||
        ("get" in init && init.get === descr.get))
    )
      return void 0;
  }
  return flags;
}

/** Writing serialized `Object.defineProperty` descriptors to JSON */
export function writeProps(
  ctx: WriteContext,
  descrs: { [name: string]: PropertyDescriptor },
  pred: { [name: string]: boolean },
  mask: number,
  snapshot?: { [name: string]: PropertyDescriptor }
) {
  const props = [];
  let flags: number;
  for (const name in descrs) {
    const descr = descrs[name];
    if (
      (flags = <number>propFlags(snapshot, pred, name, descr, mask)) === void 0
    )
      continue;
    const propInfo = writeProp(ctx, [name], descr, flags);
    if (propInfo) props.push(propInfo);
  }
  for (const name of savedObject.getOwnPropertySymbols(descrs)) {
    const descr = descrs[<any>name];
    if (
      (flags = <number>propFlags(snapshot, pred, <any>name, descr, mask)) ===
      void 0
    )
      continue;
    const propJson: JSONArray = [];
    const sym = writeSym(
      ctx,
      name,
      propJson,
      0,
      !ctx.opts.ignore && !ctx.knownSyms
    );
    if (sym === NotSerializableToken) continue;
    propJson.push(sym);
    writeProp(ctx, propJson, descr, flags);
    if (propJson.length) props.push(propJson);
  }
  return props;
}

function readPropName(ctx: ReadContext, key: any): any {
  let name: any;
  if (key.substr) {
    name = key;
  } else if (key.$) {
    const descr = descriptorByName.get(key.$);
    if (descr) name = descr.read(ctx, key);
  }
  if (!name) name = readSym(ctx, key);
  return name;
}

function readPropDescriptor(
  ctx: ReadContext,
  pjson: JSONValue,
  flags: number,
  get: JSONValue,
  set: JSONValue,
  pdescr: PropertyDescriptor
): PropertyDescriptor {
  pdescr.configurable = (flags & 1) === 0;
  pdescr.enumerable = (flags & 2) === 0;
  if ((flags & 4) === 0) pdescr.writable = true;
  if ((flags & 8) === 0) pdescr.value = ctx.step(pjson);
  if (get) pdescr.get = ctx.step(get);
  if (set) pdescr.set = ctx.step(set);
  savedObject.defineProperty(pdescr, descriptorSymbol, {
    value: PropertyDescriptorDescriptor,
    configurable: true,
    writable: true,
  });
  return pdescr;
}

/** Reading serialized `Object.defineProperty` descriptors from JSON */
export function readProps<T>(ctx: ReadContext, props: any[], value: T) {
  for (const [key, pjson, flags, get, set] of props) {
    const name = readPropName(ctx, key);
    if (flags != null) {
      const pdescr = readPropDescriptor(ctx, pjson, flags, get, set, {});
      try {
        savedObject.defineProperty(value, name, pdescr);
        continue;
      } catch (e) {
        const sdescr = savedObject.getOwnPropertyDescriptor(value, name);
        if (!sdescr || sdescr.configurable || !sdescr.writable) throw e;
      }
    }
    (<any>value)[name] = ctx.step(pjson);
  }
}

/** A descriptor for `Object.getOwnPropertyDescriptors` object */
export const ObjectPropertiesDescriptor = {
  write(ctx: WriteContext, value: any): JSONValue {
    return {
      f: writeProps(ctx, value, defaultOverrideProps, 0),
    };
  },
  create() {
    return {};
  },
  readContent(ctx: ReadContext, json: JSONValue, value: any) {
    for (const [key, pjson, flags, get, set] of (<any>json).f) {
      value[readPropName(ctx, key)] = readPropDescriptor(
        ctx,
        pjson,
        flags,
        get,
        set,
        {}
      );
    }
  },
};

/** wraps descriptor by adding its own property into the saved dictionary */
function propsDescriptor<T>(descriptor: Descriptor<T>): Descriptor<T> {
  const pred = descriptor.overrideProps || defaultOverrideProps;
  let snapshot: any;
  if (
    descriptor.props !== false &&
    descriptor.propsSnapshot !== false &&
    descriptor.value
  ) {
    snapshot = savedObject.getOwnPropertyDescriptors(descriptor.value);
  }
  return {
    name: descriptor.name,
    write(
      ctx: WriteContext,
      value: T,
      parent: JSONArray | JSONObject,
      index: number | string
    ): JSONValue {
      const json = <JSONObject>descriptor.write(ctx, value, parent, index);
      const props = writeProps(
        ctx,
        savedObject.getOwnPropertyDescriptors(value),
        pred,
        descriptor.propsDescrMask || 0,
        this.snapshot
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
    },
    snapshot,
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
  write(ctx, value): JSONValue {
    if (value !== this.value || !this.name)
      return defaultWrite.call(<any>this, ctx, value); // PojsoPropsDescriptor.write(ctx, value, par, index);
    return { $: this.name };
  },
  create(): any {
    return this.value;
  },
  default$: false,
};

const OpaquePrimDescriptor: IncompleteDescriptor<any> = {
  ...OpaqueDescriptor,
  props: false,
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
      if (!ctx.symsByName)
        throw new TypeError(`couldn't write "${String(sym)}"`);
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
  if (!ignore && !ctx.opts.ignore)
    throw new TypeError(`couldn't write "${String(sym)}"`);
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
    // creating new symbols
    const descr = {
      name: <string>name,
      id,
      value: Symbol(<string>(<JSONObject>json).name),
    };
    if (!local) ctx.symsByName.set(<string>name, (local = []));
    local[id] = descr;
    if (ctx.knownSyms) ctx.knownSyms.set(descr.value, descr);
    return descr.value;
  }
  if (!ctx.opts.ignore)
    throw new TypeError(`couldn't read "${JSON.stringify(json)}"`);
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
    default$: false,
  });
}

const NaNDescriptor = specValueDescriptor("NaN", NaN);
const UndefDescriptor = specValueDescriptor("undefined", void 0);

const SymbolDescriptor = regDescriptor<symbol>({
  write: writeSym,
  read: readSym,
  name: "Symbol",
  refAware: false,
  props: false,
});

export const BigIntDescriptor =
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
        props: false,
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
        props: false,
      });

export let getObjectDescriptor: (
  value: any
) => Descriptor | undefined = function getObjectDescriptorImpl<
  T extends WithTypeofTag
>(value: T): Descriptor<T> | undefined {
  const descriptor = (<any>value)[descriptorSymbol];
  if (descriptor) return descriptor;
  if (value.$$typeof) {
    const res = descriptorByTypeOfProp.get(value.$$typeof);
    if (res) return res;
  }
  return;
};

export function regObjectDescriptorGetter(
  impl: (value: any) => Descriptor | undefined
) {
  getObjectDescriptor = impl;
}

export let getValueDescriptor: (
  value: any
) => Descriptor | undefined = function getValueDescriptorImpl(
  value: any
): Descriptor | undefined {
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
      return (
        getObjectDescriptor(value) ||
        (options.descriptorSymForOpaque === false &&
          descriptorByObject.get(value)) ||
        PojsoDescriptor
      );
    case "function":
      return getObjectDescriptor(value);
    case "symbol":
      return SymbolDescriptor;
    case "bigint":
      return BigIntDescriptor;
  }
  return descriptorByValue.get(value);
};

export function regValueDescriptorGetter(
  impl: (value: any) => Descriptor | undefined
) {
  getValueDescriptor = impl;
}

export function getJsonDescriptor(
  ctx: ReadContext,
  json: JSONValue
): Descriptor {
  if (typeof json !== "object" || json === null) return PrimDescriptor;
  if (Array.isArray(json)) return ArrayDescriptor;
  if ("$" in json) {
    const descriptor = descriptorByName.get(<string>json.$);
    if (!descriptor) {
      if (ctx.opts.warnIgnored)
        // tslint:disable-next-line
        console.warn(
          `reading value with not registered type "${json.$}"`,
          json
        );
      if (!ctx.opts.ignore)
        throw new TypeError(`not registered type:${json.$}`);
      if (ctx.opts.ignore === "placeholder")
        return regDescriptor(
          savedObject.assign({}, NotSerializablePlaceholderDescriptor, {
            name: <string>json.$,
          })
        );
      return UndefDescriptor;
    }
    return descriptor;
  }
  if ("r" in json) return RefDescriptor;
  return PojsoDescriptor;
}

// TODO: holes
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
  default$: false,
  globalName: "Array",
});

function iterableDescriptor<T extends Iterable<unknown>>(
  descriptor: IncompleteDescriptor<T>
): IncompleteDescriptor<T> {
  return savedObject.assign(
    {},
    descriptorTemplate,
    {
      write(
        this: Descriptor,
        ctx: WriteContext,
        value: Iterable<unknown>
      ): JSONValue {
        const json: JSONArray = [];
        for (const i of value) json.push(ctx.step(i, json, json.length));
        return { $: this.name || "Iterable", l: json };
      },
    },
    descriptor
  );
}

export const WeakSetWorkaround = class WeakSet {
  prop: symbol;
  constructor() {
    this.prop = Symbol("@effectful/weakset");
  }
  add(value: any) {
    switch (typeof value) {
      case "function":
      case "object":
        Object.defineProperty(value, this.prop, {
          configurable: true,
          writable: true,
          value: true,
        });
        break;
      default:
        throw TypeError("Invalid value used in weak set");
    }
    return this;
  }
  delete(value: any) {
    if (!value[this.prop]) return false;
    delete value[this.prop];
    return true;
  }
  has(value: any) {
    return !!value[this.prop];
  }
};

export const WeakMapWorkaround = class WeakMap {
  prop: symbol;
  constructor() {
    this.prop = Symbol("@effectful/weakmap");
  }
  set(key: any, value: any) {
    switch (typeof key) {
      case "function":
      case "object":
        Object.defineProperty(key, this.prop, {
          configurable: true,
          writable: true,
          value,
        });
        if (!(<any>Object).getOwnPropertyDescriptor(key, this.prop).writable)
          throw new Error("W");
        break;
      default:
        throw TypeError("Invalid value used in weak map");
    }
    return this;
  }
  get(key: any) {
    return key[this.prop];
  }
  delete(key: any) {
    if (!key[this.prop]) return false;
    delete key[this.prop];
    return true;
  }
  has(value: any) {
    return Object.prototype.hasOwnProperty.call(value, this.prop);
  }
};

regConstructor(WeakSetWorkaround, { name: "WeakSet" });
regConstructor(WeakMapWorkaround, { name: "WeakMap" });

regConstructor(WeakSet, {
  name: "WeakSet#Empty",
  write() {
    return {};
  },
  create() {
    return new WeakSet();
  },
});

regConstructor(WeakMap, {
  name: "WeakMap#Empty",
  write() {
    return {};
  },
  create() {
    return new WeakMap();
  },
});

regNewConstructor<Set<unknown>>(
  LocSet,
  iterableDescriptor({
    readContent(ctx: ReadContext, json: JSONValue, value: Set<unknown>) {
      for (const i of <JSONArray>(<JSONObject>json).l) value.add(ctx.step(i));
    },
    globalName: "Set",
  })
);

regNewConstructor(
  LocMap,
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
    },
    globalName: "Map",
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
  refAware: false,
  globalName: "RegExp",
});

/**
 * registers an object as opaque along with all other
 * values accessible from this object
 */
export function regOpaqueRec(
  value: any,
  prefix: string = value.constructor.name,
  opts: {
    deep?: boolean;
    descriptor?: IncompleteDescriptor<any>;
  } = {}
) {
  if (
    !value ||
    !(typeof value === "function" || typeof value === "object") ||
    hasProp(value, descriptorSymbol)
  )
    return;
  const descrs = savedObject.getOwnPropertyDescriptors(value);
  for (const i of savedObject.getOwnPropertySymbols(descrs)) {
    if (i === descriptorSymbol) continue;
    reg(descrs[<any>i], `${prefix}#${String(i)}`);
  }
  regOpaqueObject(value, prefix, opts.descriptor || { props: false });
  for (const i of savedObject.getOwnPropertyNames(descrs))
    reg(descrs[i], `${prefix}#${i}`);
  if (opts.deep) {
    const proto = savedObject.getPrototypeOf(value);
    if (proto) regOpaqueRec(proto, `${prefix}#proto`, opts);
  }
  function reg(descr: PropertyDescriptor, name: string) {
    const val = descr.value;
    if (!val) return;
    const ty = typeof val;
    if (ty === "function" || ty === "object") {
      if (opts.deep) {
        regOpaqueRec(val, name, opts);
      } else {
        regOpaqueObject(val, name, opts.descriptor);
      }
    } else if (ty === "symbol" && Symbol.keyFor(val) == null)
      regOpaquePrim(val, `${prefix}#${name}#${String(val)}`);
  }
}

/**
 * Opaque object will be added automatically if not known object built with
 * `constr` is encountered when writing.
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
      // tslint:disable-next-line
      if (!silent && console.warn) {
        showStack(ctx, name, value);
        // tslint:disable-next-line
        console.warn("auto opaque", name, value, new Error().stack);
      }
      return regOpaqueObject(value, name).write(ctx, value, parent, index);
    },
  });
}

export function rebindGlobal() {
  if ((<any>global)[descriptorSymbol]) return;
  const oldState = state;
  ObjectConstr = (<any>global).Object;
  state = <State>{
    byName: new LocMap(),
    byValue: new LocMap(state.byValue),
    byObject: state.byObject,
    byTypeOfProp: new LocMap(state.byTypeOfProp),
  };
  (<any>global).__effectfulSerializationState = {};
  for (let [name, descriptor] of oldState.byName) {
    if (descriptor.globalName) {
      const value = (<any>global)[descriptor.globalName];
      if (!value) continue;
      descriptor = savedObject.assign({}, descriptor, { value });
      savedObject.defineProperty(value, descriptorSymbol, {
        configurable: true,
        writable: true,
        value: descriptor,
      });
    }
    state.byName.set(name, descriptor);
  }
  state = initializeState(__effectfulSerializationState);
}

/**
 * Monkey patching platform objects to make them serializable,
 * run it as soon as possible if a global serialization is needed
 */
export function regGlobal() {
  (<any>global).WeakMap = WeakMapWorkaround;
  (<any>global).WeakSet = WeakSetWorkaround;
  if ((<any>global)[descriptorSymbol]) return;
  regOpaqueObject(<any>global, "#global");
  for (const name of Object.getOwnPropertyNames(global)) {
    try {
      const obj = (<any>global)[name];
      if (!obj) continue;

      if (typeof obj !== "function" && typeof obj !== "object") continue;
      if (Object.prototype.hasOwnProperty.call(obj,descriptorSymbol))
        continue;
      if (name === "location") {
        regOpaqueObject((<any>global).location, "location", { props: false });
        continue;
      }
      regOpaqueObject(obj, `#${name}`);
      for (const i of Object.getOwnPropertyNames(obj)) {
        // not registering prototypes to avoid unintended descriptor's inheritance
        if (i === "prototype") continue;
        const descr = <any>savedObject.getOwnPropertyDescriptor(obj, i);
        if (typeof descr.value !== "function") continue;
        regOpaqueObject(descr.value, `#G#${name}#{j}`);
      }
      if (typeof obj === "function") {
        for (const j of Object.getOwnPropertyNames(obj.prototype)) {
          if (j === "prototype") continue;
          const descr = <any>(
            savedObject.getOwnPropertyDescriptor(obj.prototype, j)
          );
          if (typeof descr.value !== "function") continue;
          regOpaqueObject(descr.value, `#G##${name}#{j}`);
        }
      }
    } catch (e) {
      continue;
    }
  }
}

regOpaquePrim(boundThisSymbol, "#this");
regOpaquePrim(boundArgsSymbol, "#args");
regOpaquePrim(boundFunSymbol, "#fun");

const notSerializableTraps: any = {};
for (const i of [
  "apply",
  "construct",
  "defineProperty",
  "deleteProperty",
  "enumerate",
  "getOwnPropertyDescriptor",
  "getPrototypeOf",
  "has",
  "isExtensible",
  "ownKeys",
  "preventExtensions",
  "set",
  "setPrototypeOf",
]) {
  notSerializableTraps[i] = function (target: any) {
    throw new TypeError(
      `${i} in a not restored object${
        target[descriptorSymbol] ? ` (${target[descriptorSymbol].name})` : ""
      }`
    );
  };
}

notSerializableTraps.get = function (target: any, prop: any) {
  if (prop === descriptorSymbol)
    return target[descriptorSymbol] || NotSerializableDescriptor;
  throw new TypeError(
    `getting ${prop} in a not restored object${
      target[descriptorSymbol] ? ` (${target[descriptorSymbol].name})` : ""
    }`
  );
};

/** an object which is replaces all not serializable values after read */
const notSerializablePlaceholder: any = new Proxy(function () {},
notSerializableTraps);

/** shorter format for properties descriptors */
export const PropertyDescriptorDescriptor = regDescriptor({
  read(_ctx: ReadContext, _json: JSONValue): PropertyDescriptor {
    return {};
  },
  readContent(ctx: ReadContext, json: JSONValue, value: PropertyDescriptor) {
    readPropDescriptor(
      ctx,
      (<any>json).v,
      (<any>json).f || 0,
      (<any>json).s,
      (<any>json).g,
      value
    );
  },
  write(ctx: WriteContext, value: PropertyDescriptor) {
    const res = writeProp(ctx, [], value, descrFlags(value));
    if (!res) return {};
    return <any>{ v: res[0], f: res[1], s: res[2], g: res[3] };
  },
  name: "PD",
  props: false,
});

export function regPropertyDescriptor(p: PropertyDescriptor) {
  savedObject.defineProperty(p, descriptorSymbol, {
    value: PropertyDescriptorDescriptor,
    configurable: true,
    writable: true,
  });
}

regConstructor(String, {
  create(_ctx, json) {
    return new String((<any>json).v);
  },
  write(_ctx, value: String) {
    return { v: String(value) };
  }
});

regConstructor(Number, {
  create(_ctx, json) {
    return new Number((<any>json).v);
  },
  write(_ctx, value: Number) {
    return { v: Number(value) };
  }
});

if (typeof ArrayBuffer !== "undefined") {
  const { encode, decode } = <any>require("base64-arraybuffer");
  regConstructor(ArrayBuffer, {
    name: "ArrayBuffer",
    write(_ctx, value: ArrayBuffer) {
      return { d: encode(value) };
    },
    create(_ctx, json) {
      return decode((<any>json).d);
    },
    props: false,
  });
  for (const name of [
    "DataView",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array",
    "BigInt64Array",
    "BigUint64Array",
  ]) {
    const Constr = (<any>global)[name];
    if (!Constr) continue;
    regConstructor(Constr, {
      name,
      write(ctx, value: any) {
        const res: any = { o: value.byteOffset, l: value.length };
        res.b = ctx.step(value.buffer, res, "b");
        return res;
      },
      create(ctx, json) {
        return new Constr(
          ctx.step((<any>json).b),
          (<any>json).o,
          (<any>json).l
        );
      },
      props: false,
    });
  }
}
