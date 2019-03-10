/**
 * lean iterator for JS array
 */
import { LeanIteratorPrototype } from "./leanIterator";
import { iterator as iterSym } from "./symbol";

function ArrayLeanIterator(arr) {
  this.arr = arr;
  this.x = 0;
  this.done = arr.length === 0;
  this.value = void 0;
}

var ALIp = (ArrayLeanIterator.prototype = Object.create(LeanIteratorPrototype));

ALIp.step = function step() {
  if (this.x >= this.arr.length) return this.pure();
  this.value = this.arr[this.x++];
  return this;
};

Array.prototype[iterSym] = function() {
  return new ArrayLeanIterator(this);
};

ALIp[iterSym] = function() {
  return this;
};

ALIp.raise = function pure(ex) {
  this.value = void 0;
  this.done = true;
  throw ex;
};

ALIp.pure = function pure(value) {
  this.value = value;
  this.done = true;
  return this;
};

ALIp.exit = function exit() {
  this.value = void 0;
  this.done = true;
  return this;
};

ALIp.handle = function handle() {
  return this.exit();
};

ALIp.next = function next() {
  this.step();
  return { value: this.value, done: this.done };
};

ALIp[Symbol.iterator] = function() {
  return this;
};
