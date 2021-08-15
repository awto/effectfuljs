const path = require("core-js-pure/internals/path");
const isObject = require("core-js-pure/internals/is-object");
const isArray = require("core-js-pure/internals/is-array");
const toAbsoluteIndex = require("core-js-pure/internals/to-absolute-index");
const toLength = require("core-js-pure/internals/to-length");
const toIndexedObject = require("core-js-pure/internals/to-indexed-object");
const createProperty = require("core-js-pure/internals/create-property");
const max = Math.max;
const SPECIES = Symbol.species;
const staticToMethod = require("debugger-state");

if (!path.ArrayPrototype) {
  path.ArrayPrototype = {};
  for (const i of [
    "map",
    "filter",
    "find",
    "findIndex",
    "flatMap",
    "forEach",
    "reduce",
    "reduceRight",
    "some",
    "every"
  ]) {
    const stat = path.Array[i];
    path.ArrayPrototype[i] = staticToMethod(stat);
  }
}

path.ArrayPrototype.push = function push() {
  path.ArrayPrototype.splice.apply(this, [this.length, 0].concat(arguments));
  return this.length;
};

path.ArrayPrototype.pop = function pop() {
  return path.Array.splice(this, -1, 1)[0];
};

path.ArrayPrototype.shift = function shift() {
  return path.Array.splice(this, 0, 1)[0];
};

path.ArrayPrototype.unshift = function unshift() {
  path.ArrayPrototype.splice.apply(this, [0, 0].concat(arguments));
  return this.length;
};

path.objectAssign = function objectAssign() {
  const dest = arguments[0];
  for (let i = 1, len = arguments.length; i < len; ++i) {
    const value = arguments[i];
    if (!value) continue;
    const keys = Reflect.ownKeys(value);
    for (let j = 0, len = keys.length; j < len; ++j) {
      const name = keys[j];
      const descr = Object.getOwnPropertyDescriptor(value, name);
      if (descr.enumerable)
        dest[name] = descr.get ? descr.get.call(value) : descr.value;
    }
  }
  return dest;
};

path.objectEntries = function objectEntries(obj) {
  const ret = [];
  const keys = Reflect.ownKeys(obj);
  for (let i = 0, len = keys.length; i < len; ++i) {
    const prop = keys[i];
    ret.push([prop, obj[prop]]);
  }
  return ret;
};

path.objectValues = function objectValues(obj) {
  const ret = [];
  const keys = Reflect.ownKeys(obj);
  for (let i = 0, len = keys.length; i < len; ++i) {
    const prop = keys[i];
    ret.push(obj[prop]);
  }
  return ret;
};

path.ArrayPrototype.slice2 = function slice(start, end) {
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var Constructor, result, n;
  if (isArray(O)) {
    Constructor = O.constructor;
    if (
      typeof Constructor == "function" &&
      (Constructor === Array || isArray(Constructor.prototype))
    ) {
      Constructor = undefined;
    } else if (isObject(Constructor)) {
      Constructor = Constructor[SPECIES];
      if (Constructor === null) Constructor = undefined;
    }
  }
  result = new (Constructor === undefined ? Array : Constructor)(
    max(fin - k, 0)
  );
  for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};
