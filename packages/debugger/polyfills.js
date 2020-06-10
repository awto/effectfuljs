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
