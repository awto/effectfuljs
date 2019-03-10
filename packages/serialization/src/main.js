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
export function write(value, opts) {
  if (typeof value !== "object" || Array.isArray(value))
    throw new TypeError("wrong argument type");
  const ctx = new WriteContext(opts);
  const res = [];
  res.push(ctx.step(value, res, 0));
  if (ctx.refs.length) {
    const refs = ctx.refs.filter(i => i.ref != null);
    if (refs.length) {
      let id = 0;
      const dict = {};
      for (const i of refs) {
        dict[(i.ref["#ref"] = id++)] = i.data;
        i.parent[i.index] = i.ref;
      }
      return { ...res[0], "#shared": dict };
    }
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
export function read(json) {
  if (typeof json !== "object")
    throw new TypeError("root value must be Object");
  const ctx = new ReadContext();
  const vals = (ctx.shared = new Map());
  const { "#shared": shared } = json;
  const tasks = [];
  if (shared) {
    for (const i of Object.keys(shared)) {
      const json = shared[i];
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
  bind[descriptorSymbol] = {
    write(ctx) {
      return {
        "#type": BindDescriptor.name,
        "#data": ctx.step({ func, self, args })
      };
    }
  };
  return bind;
}

const BindDescriptor = regObjectDescriptor({
  name: "Bind",
  read(ctx, json) {
    const data = ctx.step(json["#data"]);
    return bind(data.func, data.self, ...data.args);
  },
  create(ctx, json) {
    const data = ctx.step(json["#data"]);
    return bind(data.func, data.self, ...data.args);
  },
  readContent() {}
});

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
  constructor(opts) {
    this.sharedRefs = new Map();
    this.refs = [];
    this.ignore = opts && opts.ignore;
  }
  /**
   * Invokes write recursively for nested values
   * @param {any} value - value to write
   * @param {JSONArray|JSONObject} - parent where to assign returning value
   * @param {JSONArray|JSONObject} parent - container for the value output
   * @param {number|string} key  - either name of a field if parent is an object
   *                               or number index if it is an array
   */
  step(value, parent, key) {
    const descriptor = getValueDescriptor(value);
    if (!descriptor) {
      if (this.ignore) return void 0;
      throw new TypeError(`not writable value ${value} at ${key} of ${parent}`);
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
 * if property name starts with `#` char it will double it
 * @private
 * @param {String} name
 * @returns {String}
 */
function escape(name) {
  return name[0] === "#" ? "#" + name : name;
}

/**
 * referce of `escape`
 * @private
 * @param {String} name
 * @returns {String}
 */
function unescape(name) {
  return name[0] === "#" ? (name[1] !== "#" ? null : name.substr(1)) : name;
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
const objectDescriptor = {
  read(ctx, json) {
    const value = this.create(ctx, json);
    this.readContent(ctx, json, value);
    return value;
  },
  write(ctx, value) {
    const parts = {};
    for (const i of Object.keys(value))
      parts[escape(i)] = ctx.step(value[i], parts, i);
    if (this.valuePrototype !== void 0) parts["#type"] = this.name;
    return parts;
  },
  create() {
    if (this.valueConstructor) return new this.valueConstructor();
    if (this.valuePrototype !== void 0)
      return Object.create(this.valuePrototype);
    return {};
  },
  readContent(ctx, json, value) {
    for (const i in json) {
      let name = unescape(i);
      if (name == null) continue;
      value[name] = ctx.step(json[i]);
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
export function refAwareDescriptor(descriptor) {
  return descriptor.noRefs
    ? descriptor
    : {
        ...descriptor,
        read(ctx, json) {
          const ref = json["#ref"];
          if (ref != null) return ctx.shared.get(ref);
          return this.readNoRef(ctx, json);
        },
        write(ctx, value, parent, index) {
          let info = ctx.sharedRefs.get(value);
          if (info == null) {
            ctx.sharedRefs.set(
              value,
              (info = { ref: null, parent, index, descriptor })
            );
            if (this.always && parent) info.ref = {};
            info.data = this.writeNoRef(ctx, value, parent, index);
            ctx.refs.push(info);
            return info.data;
          }
          if (info.ref == null) info.ref = {};
          return info.ref;
        },
        writeNoRef: descriptor.write,
        readNoRef: descriptor.read,
        noRefs: descriptor
      };
}

/**
 * Adds a descriptor to an internal global registry for creating value instances
 * by type names on reading.
 *
 * The name will be changed to a unique value if some other descriptor with the
 * same name is already registered.
 *
 * @param {Descriptor}
 * @returns {Descriptor}
 */
export function regDescriptor(descriptor) {
  const name = guessDescriptorName(descriptor);
  let uniq = name,
    i = 0;
  /* eslint-disable no-empty */
  for (; descriptorByName.get(uniq) != null; uniq = `${name}_${++i}`) {}
  descriptor = { ...descriptor, name: uniq };
  descriptorByName.set(descriptor.name, descriptor);
  if (descriptor.typeofTag)
    descriptorByTypeOfProp.set(descriptor.typeofTag, descriptor);
  return descriptor;
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
 * Same as `regDescriptor` but ensures `descriptor` is references aware
 * @param {ObjectDescriptor} descriptor
 * @returns {Descriptor}
 */
export function regObjectDescriptor(descriptor) {
  return regDescriptor(refAwareDescriptor(descriptor));
}

/**
 * The function registers `value` as opaque. The library outputs names instead
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
  return (value[descriptorSymbol] = regObjectDescriptor({
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
export function regOpaquePrim(value, name) {
  let descriptor;
  if ((descriptor = descriptorByValue.get(value))) return descriptor;
  descriptor = regDescriptor({ ...OpaqueDescriptor, name, value });
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
export function regConstructor(constr, descriptor = objectDescriptor) {
  const prototype = constr.prototype;
  return (prototype[descriptorSymbol] = regDescriptor(
    refAwareDescriptor({
      ...descriptor,
      valuePrototype: prototype,
      name: constr.name
    })
  ));
}

const PojsoDescriptor = regObjectDescriptor(objectDescriptor);

const PrimDescriptor = {
  write(ctx, value) {
    return value;
  },
  read(ctx, json) {
    return json;
  }
};

const RefDescriptor = {
  read(ctx, json) {
    return ctx.shared.get(json["#ref"]);
  }
};

const OpaqueDescriptor = {
  read(ctx, json) {
    return this.create(ctx, json);
  },
  readContent() {},
  create(ctx, json) {
    const res = descriptorByName.get(json["#oid"]);
    if (!res) throw new Error(`not found object ${json["#oid"]}`);
    return this.value;
  },
  write() {
    return { "#oid": this.name };
  }
};

const SymbolDescriptor = regDescriptor({
  write(ctx, value) {
    return { "#type": "Symbol", name: Symbol.keyFor(value) };
  },
  read(ctx, value) {
    return Symbol.for(value.name);
  },
  name: "Symbol"
});

let BigIntDescriptor =
  typeof BigInt === "function" &&
  regDescriptor({
    write(ctx, value) {
      return { "#int": value.toString() };
    },
    read(ctx, value) {
      return BigInt(value["#int"]);
    },
    name: "BigInt"
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
      const proto = Object.getPrototypeOf(value);
      if (proto == null || proto === Object.prototype) {
        if (value.$$typeof) return descriptorByTypeOfProp.get(value.$$typeof);
        return PojsoDescriptor;
      }
      break;
    case "function":
      return value[descriptorSymbol] || null;
    case "symbol":
      if (Symbol.keyFor(value)) return SymbolDescriptor;
      break;
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
  if ("#ref" in json) return RefDescriptor;
  if ("#oid" in json) return lookupDescriptor(json["#oid"]);
  if ("#type" in json) return lookupDescriptor(json["#type"]);
  if ("#int" in json) return BigIntDescriptor;
  return PojsoDescriptor;
}

const ArrayDescriptor = regConstructor(Array, {
  ...objectDescriptor,
  write(ctx, value) {
    const res = [];
    for (const i of value) res.push(ctx.step(i, res, res.length));
    return res;
  },
  valueConstructor: Array,
  name: "Array",
  readContent(ctx, json, value) {
    for (const i of json) value.push(ctx.step(i));
  }
});

const IterableDescriptor = {
  ...objectDescriptor,
  write(ctx, value) {
    const json = [];
    for (const i of value) json.push(ctx.step(i, json, json.length));
    return { "#type": this.name, "#data": json };
  },
  readContent(ctx, json, value) {
    for (const i of json["#data"]) value.add(ctx.step(i));
  }
};

regConstructor(Set, {
  ...IterableDescriptor,
  valueConstructor: Set,
  name: "Set"
});

regConstructor(Map, {
  ...IterableDescriptor,
  valueConstructor: Map,
  name: "Map",
  readContent(ctx, json, value) {
    for (const [k, v] of json["#data"]) value.set(ctx.step(k), ctx.step(v));
  }
});
