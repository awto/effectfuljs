/* global BigInt */
/**
 * # Serialization library for @effectful toolchain
 */

const descriptorByName = new Map();
const descriptorByValue = new Map();
/**
 * react uses `$$typeof` property for its values, it is the mapping
 * @private
 */
const descriptorByTypeOfProp = new Map();

/**
 * name of a property to specify `Descriptor` for JS value
 *
 * @type {Symbol}
 */
export const descriptorSymbol = Symbol("@effectful/serialization/descriptor");

const defaultOverrideProps = {
  [descriptorSymbol]: false
};

const funcOverrideProps = {
  length: false,
  name: false,
  arguments: false,
  caller: false
};

/**
 * ## Top level API
 *
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
 * @param {Object} value - original object
 * @param {WriteOptions} opts - options
 */
export function write(value, opts = {}) {
  if (typeof value !== "object" || Array.isArray(value))
    throw new TypeError("wrong argument type");
  const ctx = new WriteContext();
  ctx.sharedRefs = opts.sharedRefs || (opts.sharedRefs = new Map());
  ctx.refs = [];
  ctx.ignore = !!opts.ignore;
  ctx.symsByName = opts.symsByName || (opts.symsByName = new Map());
  ctx.knownSyms = opts.knownSyms || (opts.knownSyms = new Map());
  const res = [];
  res.push(ctx.step(value, res, 0));
  const { refs } = ctx;
  if (refs.length) {
    const x = [];
    for (const info of refs)
      if (info.ref) {
        info.ref.r = x.push(info.data) - 1;
        if (info.parent) info.parent[info.index] = info.ref;
      }
    if (x.length) return { ...res[0], x };
  }
  return res[0];
}

/**
 * @typedef {Object} WriteOptions
 * @property {boolean} ignore - ignore errors
 */

/**
 * Converts JSON Object returned by {@link write} back to JS Object
 *
 * @param {Object} json - object to read
 */
export function read(json, opts = {}) {
  if (typeof json !== "object")
    throw new TypeError("root value must be Object");
  const ctx = new ReadContext();
  ctx.knownSyms = opts.knownSyms;
  ctx.symsByName = opts.symsByName;
  if (opts.ignore && !ctx.symsByName)
    ctx.symsByName = opts.symsByName = new Map();
  ctx.ignore = !!opts.ignore;
  const { x } = json;
  const len = x ? x.length : 0;
  const vals = (ctx.shared = opts.shared || (opts.shared = new Array(len)));
  const tasks = [];
  if (len) {
    for (let i = 0; i < len; ++i) {
      const json = x[i];
      const descriptor = getJsonDescriptor(json);
      const value = descriptor.create(ctx, json);
      vals[i] = value;
      tasks.push({ json, value, descriptor });
    }
  }
  for (const { json, value, descriptor } of tasks)
    descriptor.readContent(ctx, json, value);
  return getJsonDescriptor(json).read(ctx, json);
}

/**
 * ## Shorcuts
 */

/**
 * {@link write} followed by `JSON.stringify`,
 * with same parameters as for `JSON.stringify`
 */
export function stringify(value, replacer, spaces) {
  return JSON.stringify(write(value), replacer, spaces);
}

/** `JSON.parse` followed by {@link read} */
export function parse(json) {
  return read(JSON.parse(json));
}

function makeBind() {
  function bind(...rest) {
    const { func, self, args } = bind[descriptorSymbol];
    return func.apply(self, [...args, ...rest]);
  }
  bind[descriptorSymbol] = { ...BindDescriptor };
  return bind;
}

const BindDescriptor = regDescriptor({
  name: "Bind",
  readContent(ctx, json, value) {
    const descr = value[descriptorSymbol];
    descr.func = ctx.step(json.func);
    descr.self = ctx.step(json.self);
    descr.args = ctx.step(json.args);
  },
  create() {
    return makeBind();
  },
  typeofHint: "function",
  write(ctx, value) {
    const { func, self, args } = value[descriptorSymbol];
    const res = { $: BindDescriptor.name };
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
 * @param {function} func
 * @param {object} self - bound `this`
 * @param {...any} args - bound arguments
 */
export function bind(func, self, ...args) {
  const res = makeBind();
  const descr = res[descriptorSymbol];
  descr.func = func;
  descr.self = self;
  descr.args = args;
  return res;
}

/**
 * ## Extension
 */

/**
 *  Describes how to read/write values
 *
 * @class Descriptor
 */
/**
 * Sets `value` into `parent` on `index` position
 * @method Descriptor#write
 * @param {WriteContext} ctx - recursive writes for sub-values
 * @param {JSONArray|JSONObject} parent - container for the value output
 * @param {number|string} index  - either name of a field if parent is an object
 *                                 or number index if it is an array
 */
/**
 * Reads value from `json` value
 * @method Descriptor#read
 * @param {ReadContext} ctx - recursive reads handling for sub-values
 * @param {JSONValue} json  - input JSON
 * @returns - resulting JS value
 */
/**
 * @member {String} Descriptor#name - Unique type name
 */
/**
 * dispatching descriptor by value of `$$typeof` property
 * @name Descriptor#typeofTag
 * @type ?Symbol
 */

/**
 * An object passed to Descript's `write` method to support recursive
 * invocation for nested values
 */
class WriteContext {
  /**
   * Invokes write recursively for nested values
   * @param {any} value - value to write
   * @param {JSONArray|JSONObject} - parent where to assign returning value
   * @param {JSONArray|JSONObject} parent - container for the value output
   * @param {number|string} key  - either name of a field if parent is an object
   *                               or number index if it is an array
   */
  step(value, parent, key) {
    let descriptor = getValueDescriptor(value);
    if (!descriptor) {
      if (this.ignore === true) return void 0;
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

   * @param {any} value - value to write
   * @returns {{ref:JSONObject,data:JSONObject}} - a reference
   */
  ref(value) {
    const info = this.sharedRefs.get(value);
    if (info == null) {
      const ref = {};
      const info = { ref, data: {} };
      this.refs.push(info);
      this.sharedRefs.set(value, info);
      return info;
    }
    if (!info.ref) info.ref = {};
    return info;
  }
}

/**
 * An object passed to Descript's `read` method to support recursive invocation
 * for nested values
 */
class ReadContext {
  /**
   * Invokes read recursively for nested values
   * @param {JSONValue} json - value to read
   * @returns {any} - resulting JS sub value
   */
  step(json) {
    return getJsonDescriptor(json).read(this, json);
  }
}

/**
 * Helper for {@link Descriptor} implementation for Objects
 * @class ObjectDescriptor
 * @extends Descriptor
 */
/**
 * Just creates an object with needed type without filling in it with content
 * @method ObjectDescriptor#create
 * @param {ReadContext} ctx
 * @param {JSONValue} json
 * @returns {any}
 */
/**
 * Just creates an object with needed type without filling in it with content
 * @method ObjectDescriptor#readContent
 * @param {ReadContext} ctx
 * @param {JSONValue} json
 * @param {any} value - created in {@link ObjectDescriptor#create}
 * @returns {any}
 */

/**
 * default implementaiton of {@link ObjectDescriptor}
 * @implements ObjectDescriptor
 */
const descriptorTemplate = {
  read: defaultRead,
  write(ctx, value) {
    const json = {};
    if (this.valuePrototype) return json;
    const proto = Object.getPrototypeOf(value);
    if (proto === null || proto === Object.prototype) return json;
    // ensuring prototype reference is ahead
    json.p = ctx.step(proto, json, "p");
    return json;
  },
  create(ctx, json) {
    if (this.valueConstructor) return new this.valueConstructor();
    if (this.valuePrototype !== void 0)
      return Object.create(this.valuePrototype);
    const protoJson = json.p;
    if (protoJson === void 0) return {};
    if (protoJson === null) return Object.create(null);
    let protoValue;
    // TODO: since prototypes cannot be cyclic it could ensure this
    // on proper ordering objects in `r`, this way there are no needs
    // for `Object.setPrototype`
    if (protoJson.r != null) protoValue = ctx.shared[protoJson.r];
    else if (protoJson.$ && !protoJson.f) protoValue = ctx.step(protoJson);
    return Object.create(protoValue || null);
  },
  readContent(ctx, json, value) {
    if (json.p && Object.getPrototypeOf(value) === null) {
      Object.setPrototypeOf(value, ctx.step(json.p));
    }
  }
};

/**
 * Enhances descriptor by adding reference handling. It some value is referenced
 * in more than one sub-value it will have a unique value id instead of the
 * value in the output.
 *
 * @param {Descriptor}
 * @returns {Descriptor}
 */
function refAwareDescriptor(descriptor) {
  return {
    read(ctx, json) {
      const ref = json.r;
      if (ref != null) return ctx.shared[ref];
      return descriptor.read(ctx, json);
    },
    write(ctx, value, parent, index) {
      let info = ctx.sharedRefs.get(value);
      if (info == null) {
        ctx.sharedRefs.set(
          value,
          (info = { ref: null, empty: false, parent, index, descriptor })
        );
        info.data = descriptor.write(ctx, value, parent, index);
        ctx.refs.push(info);
        info.dep_id = ctx.refs.length;
        return info.data;
      }
      if (info.ref == null) info.ref = {};
      return info.ref;
    },
    create(ctx, json) {
      return descriptor.create(ctx, json);
    },
    readContent(ctx, json, value) {
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
 * @param {Descriptor} descriptor
 * @returns {Descriptor}
 */
export function regDescriptor(descriptor) {
  if (!descriptor.read) {
    if (descriptor.create) {
      descriptor.read = descriptor.readContent
        ? defaultRead
        : descriptor.create;
    }
  }
  descriptor.overrideProps = Object.assign(
    {},
    defaultOverrideProps,
    descriptor.typeofHint === "function" && funcOverrideProps,
    descriptor.overrideProps
  );
  if (!descriptor.readContent) descriptor.readContent = function() {};
  const name = guessDescriptorName(descriptor);
  let uniq = name,
    i = 0;
  if (!descriptor.strictName)
    for (
      ;
      descriptorByName.get(uniq) != null;
      uniq = `${name}_${++i}`
    ) {} /* eslint-disable-line no-empty */
  let final = { ...descriptor, name: uniq };
  if (descriptor.props !== false) final = propsDescriptor(final);
  if (descriptor.default$ !== false && uniq !== "Object") {
    const saved = final;
    final = {
      ...final,
      write(ctx, value, parent, index) {
        const json = saved.write(ctx, value, parent, index);
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
  return {
    name: uniq,
    read: final.read,
    write: final.write,
    readContent: final.readContent,
    create: final.create,
    overrideProps: descriptor.overrideProps,
    value: descriptor.value,
    noRefs
  };
}

/**
 * Tries to derive name for the `value`
 *
 * @param {any} value
 * @returns {String}
 * @private
 */
function guessObjectName(value) {
  return (
    value.name || (value.constructor && value.constructor.name) || "Object"
  );
}

/**
 * Tries to derive name for the `descriptor`.
 *
 * @param {Descriptor} descriptor
 * @returns {String}
 * @private
 */
function guessDescriptorName(descriptor) {
  if (descriptor.name) return descriptor.name;
  if (descriptor.valuePrototype && descriptor.valuePrototype.name)
    return descriptor.valuePrototype.name;
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
 * @param {any} value
 * @param {?string} name
 * @param {?boolean} props - should the properties of the object be output too
 * @returns {Descriptor}
 */
export function regOpaqueObject(
  value,
  name = guessObjectName(value),
  props = false
) {
  if (value.hasOwnProperty(descriptorSymbol)) return value[descriptorSymbol];
  return (value[descriptorSymbol] = regDescriptor({
    ...OpaqueDescriptor,
    name,
    value,
    props,
    typeofHint: typeof value
  }));
}

/**
 * Same as `regOpaqueObject` but doesn't add `[descriptorSymbol]` property and
 * stores value->descriptor mapping in an internal global registry instead.
 * @see regOpaqObject
 * @param {any} value
 * @param {!string} name
 * @returns {Descriptor}
 */
export function regOpaquePrim(value, name = String(value)) {
  let descriptor;
  if ((descriptor = descriptorByValue.get(value))) return descriptor;
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
 * @see regOpaqObject
 * @param {Function} constructor - plain JS constructor function or class
 * @param {?Descriptor} descriptor
 * @returns {Descriptor}
 */
export function regConstructor(constr, descriptor = descriptorTemplate) {
  const prototype = constr.prototype;
  return (prototype[descriptorSymbol] = regDescriptor({
    valuePrototype: prototype,
    name: constr.name,
    ...descriptor
  }));
}

export const NotSerializableDescriptor = regDescriptor({
  name: "NotSerializable",
  read() {
    throw new Error("INTERNAL: trying to read not serializable value");
  },
  create() {},
  readContent() {},
  write() {
    return NotSerializableToken;
  },
  props: false,
  refAware: false,
  default$: false
});

/** same as `regConstructor` but it also uses `constr` with new to build the object */
export function regNewConstructor(constr, descriptor = descriptorTemplate) {
  return regConstructor(constr, { valueConstructor: constr, ...descriptor });
}

const PojsoDescriptor = regDescriptor(descriptorTemplate);

const PrimDescriptor = {
  read(ctx, json) {
    return json;
  },
  create(ctx, json) {
    return json;
  },
  write(ctx, value) {
    return value;
  },
  refAware: false,
  props: false,
  default$: false
};

const RefDescriptor = {
  read(ctx, json) {
    return ctx.shared[json.r];
  }
};

export const NotSerializableToken = { _notSerializable: true };

/** wraps descriptor by adding its own property into the saved dictionary */
function propsDescriptor(descriptor) {
  const pred = descriptor.overrideProps || defaultOverrideProps;
  function writeProp(ctx, info, descr) {
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
  return {
    write(ctx, value, parent, index) {
      const json = descriptor.write(ctx, value, parent, index);
      const descrs = Object.getOwnPropertyDescriptors(value);
      const props = [];
      for (const name in descrs) {
        if (pred[name] === false) continue;
        const propInfo = writeProp(ctx, [name], descrs[name], value);
        if (propInfo) props.push(propInfo);
      }
      for (const name of Object.getOwnPropertySymbols(descrs)) {
        if (pred[name] === false) continue;
        const json = [];
        writeProp(ctx, json, descrs[name], value);
        if (json.length) {
          json.unshift(writeSym(ctx, name));
          props.push(json);
        }
      }
      if (props.length) json.f = props;
      return json;
    },
    read: defaultRead,
    readContent(ctx, json, value) {
      descriptor.readContent(ctx, json, value);
      const props = json.f;
      if (props) {
        for (const [key, pjson, flags, get, set] of props) {
          const name = key.substr
            ? key
            : key.$
            ? descriptorByName.get(key.$)
            : readSym(ctx, key);
          if (flags != null) {
            const pdescr = {};
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
    },
    create(ctx, json) {
      return descriptor.create(ctx, json);
    }
  };
}

function defaultRead(ctx, json) {
  const value = this.create(ctx, json);
  this.readContent(ctx, json, value);
  return value;
}

const OpaqueDescriptor = {
  write(ctx, value) {
    if (value !== this.value) {
      return PojsoPropsDescriptor.write(ctx, value);
    }
    return { $: this.name };
  },
  create() {
    return this.value;
  },
  default$: false
};

function writeSym(ctx, sym) {
  const key = Symbol.keyFor(sym);
  if (key) return { key };
  const global = descriptorByValue.get(sym);
  if (global) return global.write(ctx, sym);
  if (ctx.knownSyms) {
    let descr = ctx.knownSyms.get(sym);
    if (!descr) {
      const text = String(sym);
      const name = text.substring(7 /*"Symbol("*/, text.length - 1);
      let tup = ctx.symsByName.get(name);
      if (!tup) ctx.symsByName.set(name, (tup = []));
      descr = { name, id: tup.length, value: sym };
      tup.push(descr);
      ctx.knownSyms.set(sym, descr);
    }
    const res = { name: descr.name };
    if (descr.id) res.id = descr.id;
    return res;
  }
  if (!ctx.ignore) throw new Error(`couldn't write "${sym}"`);
}

function readSym(ctx, json) {
  if (json.key) return Symbol.for(json.key);
  const { name } = json;
  if (name && ctx.symsByName) {
    let local = ctx.symsByName.get(name);
    const id = json.id || 0;
    if (local) {
      const descr = local[id];
      if (descr) return descr.value;
    }
    if (ctx.ignore) {
      const descr = { name, id, value: Symbol(json.name) };
      if (!local) ctx.symsByName.set(name, (local = []));
      local[id] = descr;
      if (ctx.knownSyms) ctx.knownSyms.set(descr.value, descr);
      return descr.value;
    }
  }
  if (!ctx.ignore) throw new Error(`couldn't read "${JSON.stringify(json)}"`);
  return null;
}

function specValueDescriptor(name, value) {
  return regDescriptor({
    name,
    write() {
      return { $: name };
    },
    create() {
      return value;
    },
    refAware: false,
    props: false,
    default$: false
  });
}

const NaNDescriptor = specValueDescriptor("NaN", NaN);
const UndefDescriptor = specValueDescriptor("undefined");

const SymbolDescriptor = regDescriptor({
  write: writeSym,
  read: readSym,
  name: "Symbol",
  refAware: false,
  props: false
});

let BigIntDescriptor =
  typeof BigInt === "function" &&
  regDescriptor({
    read(ctx, value) {
      return BigInt(value.int);
    },
    write(ctx, value) {
      return { int: value.toString() };
    },
    name: "Int",
    refAware: false,
    props: false
  });

function getObjectDescriptor(value) {
  const descriptor = value[descriptorSymbol];
  if (descriptor) return descriptor;
  if (value.$$typeof) {
    const res = descriptorByTypeOfProp.get(value.$$typeof);
    if (res) return res;
  }
  return PojsoDescriptor;
}

function getValueDescriptor(value) {
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

function lookupDescriptor(typeName) {
  const descriptor = descriptorByName.get(typeName);
  if (!descriptor) throw new TypeError(`not registered type:${typeName}`);
  return descriptor;
}

function getJsonDescriptor(json) {
  if (typeof json !== "object" || json === null) return PrimDescriptor;
  if (Array.isArray(json)) return ArrayDescriptor;
  if ("$" in json) return lookupDescriptor(json.$);
  if ("r" in json) return RefDescriptor;
  return PojsoDescriptor;
}

const ArrayDescriptor = regNewConstructor(Array, {
  ...descriptorTemplate,
  write(ctx, value) {
    const json = [];
    for (const i of value) json.push(ctx.step(i, json, json.length));
    return json;
  },
  readContent(ctx, json, value) {
    for (const i of json) value.push(ctx.step(i));
  },
  props: false,
  default$: false
});

const IterableDescriptor = {
  ...descriptorTemplate,
  write(ctx, value) {
    const json = [];
    for (const i of value) json.push(ctx.step(i, json, json.length));
    return { $: this.name, l: json };
  },
  readContent(ctx, json, value) {
    for (const i of json.l) value.add(ctx.step(i));
  }
};

regNewConstructor(Set, IterableDescriptor);

regNewConstructor(Map, {
  ...IterableDescriptor,
  write(ctx, value) {
    const k = [];
    const v = [];
    for (const [ki, vi] of value) {
      k.push(ctx.step(ki, k, k.length));
      v.push(ctx.step(vi, v, v.length));
    }
    return { $: this.name, k, v };
  },
  readContent(ctx, json, value) {
    const { k, v } = json;
    for (let i = 0, len = k.length; i < len; ++i)
      value.set(ctx.step(k[i]), ctx.step(v[i]));
  }
});

regNewConstructor(RegExp, {
  write(ctx, value) {
    const json = { src: value.source, flags: value.flags };
    if (value.lastIndex) json.last = value.lastIndex;
    return json;
  },
  create(ctx, json) {
    const value = new RegExp(json.src, json.flags);
    if (json.last) value.lastIndex = json.last;
    return value;
  },
  props: false,
  refAware: false
});
