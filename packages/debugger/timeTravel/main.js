"use strict";

exports.__esModule = true;
exports.propHack = propHack;
exports.DOM = exports.Core = exports.traceMetaSymbol = exports.traceDataSymbol = exports.Record = exports.Operation = exports.unwrapPrototype = exports.record = exports.wrap = exports.checkpoint = exports.redo = exports.undo = exports.reset = exports.journal = void 0;

var _config = require("../config");

var Core = require("./core");

exports.Operation = Core.Operation;
exports.Record = Core.Record;
exports.traceDataSymbol = Core.traceDataSymbol;
exports.traceMetaSymbol = Core.traceMetaSymbol;
exports.Core = Core;

var DOM = require("./dom");

exports.DOM = DOM;

var _serialization = require("@effectful/serialization");

const journal = Core.journal;
exports.journal = journal;
const reset = Core.reset;
exports.reset = reset;
const flush = _config.default.timeTravel && _config.default.mutationObserver ? DOM.flush : function () {};
const undoImpl = _config.default.timeTravelForward ? function undo() {
  const {
    now,
    past
  } = journal;
  if (!now || !past) return null;
  const {
    future
  } = journal;
  now.prev = future;
  journal.future = now;
  journal.now = past;
  journal.past = past.prev;
  const ops = past.operations;
  past.operations = void 0;

  for (let i = ops; i != null; i = i.prev) i.call();

  return past;
} : function undo() {
  const {
    now,
    past
  } = journal;
  if (!now || !past) return null;
  journal.now = null;

  for (let i = past.operations; i != null; i = i.prev) i.call();

  journal.now = past;
  journal.past = past.prev;
  return past;
};
/**
 * This rollbacks all changed objects and runs functions registered by `record`,
 * (assumes an empty last checkpoint).
 */

const undo = _config.default.timeTravel ? function undo() {
  flush();

  try {
    return undoImpl();
  } finally {
    flush();
  }
} : function undo() {
  return null;
};
exports.undo = undo;
const redo = _config.default.timeTravel ? function redo() {
  flush();
  const {
    now,
    future
  } = journal;
  if (!now || !future) return null;
  const ops = now.operations;
  now.operations = void 0;

  for (let i = ops; i != null; i = i.prev) i.call();

  flush();
  const {
    past
  } = journal;
  now.prev = past;
  journal.past = now;
  journal.now = future;
  journal.future = future.prev;
  return future;
} : function redo() {
  return null;
};
/**
 * Returns an object which can be passed
 * to `undo` to restored the current state
 */

exports.redo = redo;
const checkpoint = _config.default.timeTravel ? _config.default.mutationObserver ? function checkpoint() {
  flush();
  return Core.checkpoint();
} : Core.checkpoint : function () {
  return null;
};
/** Values wrapper injected by the compiler */

exports.checkpoint = checkpoint;
const wrap = _config.default.timeTravel ? Core.wrapImpl : function wrap(v) {
  return v;
};
/** Registers an operation to be called on `undo` in reverse direction */

exports.wrap = wrap;
const record = _config.default.timeTravel ? Core.record : function record(_) {};
/**
 * when constructing new objects replacing its prototype to unwrapped one,
 * otherwise it will catch all setters of not yet wrapped target
 */

exports.record = record;
const unwrapPrototype = _config.default.timeTravel ? function (target) {
  const proto = Object.getPrototypeOf(target);
  if (proto.hasOwnProperty(Core.traceDataSymbol)) Object.setPrototypeOf(target, proto[Core.traceDataSymbol].target);
} : function (_) {};
exports.unwrapPrototype = unwrapPrototype;
const deleteTag = {};
const PropSnapshot = _config.default.timeTravelForward ? function (target, index, oldValue, newValue) {
  this.target = target;
  this.index = index;
  this.newValue = newValue;
  this.oldValue = oldValue;
  this.back = true;
} : function (target, index, oldValue, newValue) {
  this.target = target;
  this.index = index;
  this.newValue = newValue;
  this.oldValue = oldValue;
  this.back = true;
};
PropSnapshot.prototype.call = _config.default.timeTravelForward ? function () {
  if (this.back) {
    if (this.oldValue === deleteTag) delete this.target[this.index];else this.target[this.index] = this.oldValue;
  } else this.target[this.index] = this.newValue;

  this.back = !this.back;
  Core.record(this);
} : function () {
  if (this.oldValue === deleteTag) delete this.target[this.index];else this.target[this.index] = this.oldValue;
};
(0, _serialization.regConstructor)(PropSnapshot);
/**
 * defines setter a getter in `value` to support time travel
 * TODO: delete handler
 */

function propHack(value, propName) {
  const sym = Symbol(`${propName}`);
  Object.defineProperty(value, propName, {
    set(value) {
      this[sym] = value;
      Core.record(new PropSnapshot(this, propName, deleteTag, value));
      Object.defineProperty(this, propName, {
        configurable: true,

        set(value) {
          Core.record(new PropSnapshot(this, propName, this[sym], value));
          this[sym] = value;
        },

        get() {
          return this[sym];
        }

      });
    },

    get() {}

  });
}