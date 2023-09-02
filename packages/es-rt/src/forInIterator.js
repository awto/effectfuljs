import { LeanIteratorPrototype } from "./leanIterator";

function ForInIterator(obj) {
  var i, arr;
  this.obj = obj;
  arr = [];
  for (i in obj) arr.push(i);
  this.fields = arr;
  this.x = 0;
  this.useObjIn = typeof obj === "object";
}

ForInIterator.prototype = Object.create(LeanIteratorPrototype);

ForInIterator.prototype.step = function step() {
  for (;;) {
    if (this.x >= this.fields.length) {
      this.done = true;
      this.value = void 0;
      return this;
    }
    var val = (this.value = this.fields[this.x++]);
    if (!this.useObjIn || val in this.obj) return this;
  }
};

export function forInIterator(obj) {
  return new ForInIterator(obj);
}
