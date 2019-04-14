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
    let id = 0;
    const dict = {};
    for (const i of refs) {
      dict[(i.ref.r = id++)] = i.data;
      i.parent[i.index] = i.ref;
    }
    return { ...res[0], x: dict };
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
  const vals = (ctx.shared = opts.shared || (opts.shared = new Map()));
  const { x } = json;
  const tasks = [];
  if (x) {
    for (const i of Object.keys(x)) {
      const json = x[i];
      const descriptor = getJsonDescriptor(json);
      const value = descriptor.create(ctx, json);
      vals.set(+i, value);
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

const BindDescriptor = regDescriptor({
  name: "Bind",
  read(ctx, json) {
    return bind(
      ctx.step(json.func),
      ctx.step(json.self),
      ...ctx.step(json.args)
    );
  },
  create(ctx, json) {
    return this.read(ctx, json);
  },
  readContent() {}
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
  const bind = (...rest) => func.apply(self, [...args, ...rest]);
  bind[descriptorSymbol] = refAwareDescriptor(
    keysDescriptor({
      write(ctx) {
        const res = { $: BindDescriptor.name };
        res.func = ctx.step(func, res, "func");
        res.self = ctx.step(self, res, "self");
        res.args = ctx.step(args, res, "args");
        return res;
      }
    })
  );
  return bind;
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
 * name of a property to specify `Descriptor` for JS value
 *
 * @type {Symbol}
 */
export const descriptorSymbol = Symbol("@effectful/serialization/descriptor");

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
  read(ctx, json) {
    const value = this.create(ctx, json);
    this.readContent(ctx, json, value);
    return value;
  },
  write(ctx, value) {
    const json = {};
    if (value.constructor === Object) return json;
    else if (!this.valuePrototype) {
      json.p = ctx.step(Object.getPrototypeOf(value), json, "p");
    }
    return json;
  },
  create(ctx, json) {
    if (this.valueConstructor) return new this.valueConstructor();
    if (this.valuePrototype !== void 0)
      return Object.create(this.valuePrototype);
    const protoJson = json.p;
    if (protoJson === null) return Object.create(null);
    if (protoJson) return Object.create(ctx.step(protoJson));
    return {};
  },
  readContent() {}
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
      if (ref != null) return ctx.shared.get(ref);
      return descriptor.read(ctx, json);
    },
    write(ctx, value, parent, index) {
      let info = ctx.sharedRefs.get(value);
      if (info == null) {
        ctx.sharedRefs.set(
          value,
          (info = { ref: null, parent, index, descriptor })
        );
        if (this.always && parent) info.ref = {};
        info.data = descriptor.write(ctx, value, parent, index);
        return info.data;
      }
      if (info.ref == null) {
        ctx.refs.push(info);
        info.ref = {};
      }
      return info.ref;
    },
    create(ctx, json) {
      return descriptor.create(ctx, json);
    },
    readContent(ctx, json, value) {
      return descriptor.readContent(ctx, json, value);
    },
    noRefs: descriptor,
    always: false
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
 *  - Saving `Object.keys` (if `descriptor.keys !== false`)
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
        ? function(ctx, json) {
            const value = this.create(ctx, json);
            this.readContent(ctx, json, value);
            return value;
          }
        : descriptor.create;
    }
  }
  if (!descriptor.readContent) descriptor.readContent = function() {};
  const name = guessDescriptorName(descriptor);
  let uniq = name,
    i = 0;
  /* eslint-disable no-empty */
  for (; descriptorByName.get(uniq) != null; uniq = `${name}_${++i}`) {}
  let final = { ...descriptor, name: uniq };
  if (descriptor.keys !== false) final = keysDescriptor(final);
  if (descriptor.default$ !== false) {
    const saved = final;
    final = {
      ...final,
      write(ctx, value, parent, index) {
        const json = saved.write(ctx, value, parent, index);
        if (
          json.constructor === Object &&
          value &&
          value.constructor !== Object &&
          !json.$
        )
          json.$ = uniq;
        return json;
      }
    };
  }
  if (descriptor.refAware !== false) final = refAwareDescriptor(final);
  descriptorByName.set(uniq, final);
  if (descriptor.typeofTag)
    descriptorByTypeOfProp.set(descriptor.typeofTag, final);
  return {
    name: uniq,
    read: final.read,
    write: final.write,
    readContent: final.readContent,
    create: final.create
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

/**
 * This function registers `value` as opaque. The library outputs names instead
 * of stored data for them. The values should be registered with the same name
 * on writing and reading sides. Adds `[descriptorSymbol]` property to the
 * value.
 *
 * @param {any} value
 * @param {?string} name
 * @returns {Descriptor}
 */
export function regOpaqueObject(value, name = guessObjectName(value)) {
  if (value.hasOwnProperty(descriptorSymbol)) return value[descriptorSymbol];
  return (value[descriptorSymbol] = regDescriptor({
    ...OpaqueDescriptor,
    name,
    value
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

/** same as `regConstructor` but it also uses `constr` with new to build the object */
export function regNewConstructor(constr, descriptor = descriptorTemplate) {
  return regConstructor(constr, { valueConstructor: constr, ...descriptor });
}

const PojsoDescriptor = regDescriptor(descriptorTemplate);

const PrimDescriptor = {
  read(ctx, json) {
    return json;
  },
  write(ctx, value) {
    return value;
  },
  refAware: false,
  keys: false,
  default$: false
};

const RefDescriptor = {
  read(ctx, json) {
    return ctx.shared.get(json.r);
  }
};

/** wraps descriptor by adding its own property into the saved dictionary */
function keysDescriptor(descriptor) {
  const getKeys = descriptor.getNames || Object.keys;
  return {
    write(ctx, value, parent, index) {
      const json = descriptor.write(ctx, value, parent, index);
      const keys = getKeys(value);
      if (!keys.length) return json;
      const props = (json.d = {});
      for (const i of keys) props[i] = ctx.step(value[i], props, i);
      return json;
    },
    read(ctx, json) {
      const value = descriptor.read(ctx, json);
      const props = json.d;
      if (!props) return value;
      for (const i in props) value[i] = ctx.step(props[i]);
      return value;
    },
    readContent(ctx, json, value) {
      descriptor.readContent(ctx, json, value);
      const props = json.d;
      if (props) for (const i in props) value[i] = ctx.step(props[i]);
    },
    create(ctx, json) {
      return descriptor.create(ctx, json);
    }
  };
}

const OpaqueDescriptor = {
  read(ctx, json) {
    return this.create(ctx, json);
  },
  write() {
    return { i: this.name };
  },
  readContent() {},
  create(ctx, json) {
    const res = descriptorByName.get(json.i);
    if (!res) throw new Error(`not found object ${json.i}`);
    return this.value;
  },
  keys: false,
  default$: false
};

const SymbolDescriptor = regDescriptor({
  write(ctx, value, parent, index) {
    const key = Symbol.keyFor(value);
    if (key) return { $: "Symbol", key };
    const global = descriptorByValue.get(value);
    if (global) return global.write(ctx, value, parent, index);
    if (ctx.knownSyms) {
      let descr = ctx.knownSyms.get(value);
      if (!descr) {
        const text = String(value);
        const name = text.substring(7 /*"Symbol("*/, text.length - 1);
        let tup = ctx.symsByName.get(name);
        if (!tup) ctx.symsByName.set(name, (tup = []));
        descr = { name, id: tup.length, value };
        tup.push(descr);
        ctx.knownSyms.set(value, descr);
      }
      const res = { $: "Symbol", name: descr.name };
      if (descr.id) res.id = descr.id;
      return res;
    }
    if (!ctx.ignore) throw new Error(`couldn't write "${value}"`);
    return void 0;
  },
  read(ctx, json) {
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
  },
  name: "Symbol",
  refAware: false,
  keys: false,
  default$: false
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
    name: "BigInt",
    refAware: false,
    keys: false,
    default$: false
  });

function getValueDescriptor(value) {
  switch (typeof value) {
    case "number":
    case "undefined":
    case "boolean":
    case "string":
      return PrimDescriptor;
    case "object":
      if (!value) return PrimDescriptor;
      const descriptor = value[descriptorSymbol];
      if (descriptor) return descriptor;
      if (value.$$typeof) return descriptorByTypeOfProp.get(value.$$typeof);
      return PojsoDescriptor;
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
  if (!json || typeof json !== "object") return PrimDescriptor;
  if (Array.isArray(json)) return ArrayDescriptor;
  if ("r" in json) return RefDescriptor;
  if ("i" in json) return lookupDescriptor(json.i);
  if ("$" in json) return lookupDescriptor(json.$);
  if ("int" in json) return BigIntDescriptor;
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
  keys: false,
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
