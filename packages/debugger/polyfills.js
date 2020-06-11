const path = require("core-js-pure/internals/path");

path.ArrayPrototype.push = function push() {
  let ilen = this.length,
    alen = arguments.length;
  for (let i = 0; i < alen; ++i) {
    this[ilen + i] = arguments[i];
  }
  return ilen + alen;
};

path.ArrayPrototype.pop = function pop() {
  let len = this.length;
  if (len) {
    --len;
    const ret = this[len];
    this.length = len;
    return ret;
  }
  return void 0;
};

path.ArrayPrototype.shift = function shift() {
  return path.ArrayPrototype.splice.call(this, 0, 1)[0];
};

path.ArrayPrototype.unshift = function unshift() {
  const arr = Array.from(arguments);
  arr.unshift(0, 0);
  path.ArrayPrototype.splice.apply(this, arr);
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
