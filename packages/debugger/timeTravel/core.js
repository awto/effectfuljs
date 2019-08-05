"use strict";

exports.__esModule = true;
exports.reset = reset;
exports.checkpoint = checkpoint;
exports.replay = replay;
exports.allProps = allProps;
exports.captureSnapshot = captureSnapshot;
exports.defaultWrap = defaultWrap;
exports.wrapImpl = wrapImpl;
exports.unwrapTarget = unwrapTarget;
exports.getWrapper = getWrapper;
exports.defaultTraceMeta = exports.defaultTrapsWithGetter = exports.defaultTraps = exports.record = exports.journal = exports.TraceData = exports.notTraceable = exports.traceDataSymbol = exports.traceMetaSymbol = void 0;

var _config = require("../config");

var _state = require("../state");

var _serialization = require("@effectful/serialization");

/** extension point for tracing customization */
const traceMetaSymbol = Symbol("@effectful/debugger/traceMeta");
/** trace related information stored in the object */

exports.traceMetaSymbol = traceMetaSymbol;
const traceDataSymbol = Symbol("@effectful/debugger/traceData");
exports.traceDataSymbol = traceDataSymbol;
const notTraceable = {
  wrap(target) {
    target[traceDataSymbol] = false;
    return target;
  }

};
/** Class for representing trace data steps */

exports.notTraceable = notTraceable;

class TraceData {
  constructor(meta, proxy, target) {
    this.meta = meta;
    this.proxy = proxy;
    this.target = target;
    this.lastUpdate = journal.now;
    this.prototypeChanged = false;
  }

}

exports.TraceData = TraceData;
const journal = {
  now: null,
  past: null,
  future: null
};
exports.journal = journal;

function reset() {
  journal.past = journal.now = journal.future = null;
}
/**
 * Returns an object which can be passed
 * to `undo` to restored the current state
 */


function checkpoint() {
  journal.future = null;
  const {
    now
  } = journal;
  if (now) now.prev = journal.past;
  journal.past = now;
  return journal.now = {
    prev: null
  };
}
/**
 * Registers a function(`f`) to be executed on replay in backward order
 */


const record = _config.default.timeTravel ? function record(f) {
  if (!f) return;
  const {
    now
  } = journal;
  if (!now) return;
  f.prev = now.operations || undefined;
  now.operations = f;
} : function () {};
/** runs all actions stored in the cocord */

exports.record = record;

function replay(rec) {
  for (let i = rec.operations; i != null; i = i.prev) i.call();
}
/** Returns own property names and symbols */


function* allProps(obj) {
  yield* Object.getOwnPropertyNames(obj);
  yield* Object.getOwnPropertySymbols(obj);
}

class ObjectSnapshot {
  constructor(data) {
    this.data = data;
    this.at = data.lastUpdate;
    this.snapshot = Object.getOwnPropertyDescriptors(data.target);
    data.lastUpdate = journal.now;
    data.prototypeChanged = false;
  }

  call() {
    const {
      data,
      at,
      snapshot
    } = this;
    const {
      prototypeChanged,
      proto,
      target
    } = data;

    if (_config.default.timeTravelForward) {
      data.lastUpdate = null;
      captureSnapshot(data);

      if (prototypeChanged) {
        data.proto = Object.getPrototypeOf(target);
        data.prototypeChanged = true;
      }
    }

    data.lastUpdate = at;
    if (prototypeChanged) Object.setPrototypeOf(target, proto);

    for (const i of allProps(target)) if (!(i in snapshot)) delete target[i];

    for (const i of allProps(snapshot)) {
      const descr = snapshot[i];

      if (!descr.set) {
        if (descr.enumberable && descr.writeable) target[i] = descr.value;else Object.defineProperty(target, i, descr);
      }
    }
  }

}

(0, _serialization.regConstructor)(ObjectSnapshot);

function captureSnapshot(data) {
  if (!journal.now || data.lastUpdate === journal.now) return;
  record(new ObjectSnapshot(data));
}

const defaultTraps = {
  set(target, prop, value) {
    captureSnapshot(target[traceDataSymbol]);
    return Reflect.set(target, prop, value);
  },

  setPrototypeOf(target, proto) {
    const data = target[traceDataSymbol];
    captureSnapshot(data);
    data.prototypeChanged = true;
    data.proto = Object.getPrototypeOf(target);
    return Reflect.setPrototypeOf(target, unwrapTarget(proto));
  },

  // TODO: getters of __proto__ property should return wrapped prototype too
  getPrototypeOf(target) {
    return getWrapper(Object.getPrototypeOf(target));
  },

  deleteProperty(target, prop) {
    captureSnapshot(target[traceDataSymbol]);
    return Reflect.deleteProperty(target, prop);
  }

};
exports.defaultTraps = defaultTraps;
const defaultTrapsWithGetter = { ...defaultTraps,

  get(target, prop) {
    return Reflect.get(target, prop);
  }

};
exports.defaultTrapsWithGetter = defaultTrapsWithGetter;

function defaultWrap(meta, target, traps = defaultTraps) {
  const {
    proto
  } = meta;

  if (proto) {
    const origProto = Object.getPrototypeOf(target);
    traps = { ...traps,

      getPrototypeOf() {
        return origProto;
      }

    };

    traps.getPrototypeOf = () => origProto;

    Object.setPrototypeOf(target, proto);
  }

  const proxy = new _state.saved.Proxy(target, traps);
  target[traceDataSymbol] = new TraceData(meta, proxy, target);
  return proxy;
}

const defaultTraceMeta = {
  wrap(arg) {
    return defaultWrap(this, arg);
  },

  proto: null
};
exports.defaultTraceMeta = defaultTraceMeta;

function wrapImpl(target) {
  if (!target) return target;
  const type = typeof target;

  if (type === "object" || type === "function") {
    if (target.hasOwnProperty(traceDataSymbol)) return target;
    return (target[traceMetaSymbol] || defaultTraceMeta).wrap(target);
  }

  return target;
}
/**
 * if `target` is a proxy returns its enclosing value
 * or returns `target` otherwise
 */


function unwrapTarget(target) {
  if (!target || !target.hasOwnProperty(traceDataSymbol)) return target;
  return target[traceDataSymbol].target;
}
/**
 * for values tracked by some proxy returns the proxy,
 * or returns `target` if it is already the proxy
 */


function getWrapper(maybeProxy) {
  if (!maybeProxy || !maybeProxy.hasOwnProperty(traceDataSymbol)) return maybeProxy;
  return maybeProxy[traceDataSymbol].proxy;
}