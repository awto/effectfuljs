import config from "./config";

export const journal = {
  /** a list of changes */
  trace: null,
  /** this is true when `undoing` changes to avoid re-recording them */
  paused: !config.timeTravel
};

/**
 * Returns an object which can be passed
 * to `undo` to restored the current state
 */
export function checkpoint() {
  const next = {
    undone: false,
    snapshots: null,
    operations: null,
    version: journal.trace ? journal.trace.version + 1 : 0,
    prev: journal.trace,
    next: null
  };
  if (journal.trace) journal.trace.next = next;
  domFlush();
  journal.trace = next;
  return next;
}

/** extension point for tracing customization */
export const traceMetaSymbol = Symbol("@effectful/debugger/traceMeta");
/** trace related information stored in the object */
export const traceDataSymbol = Symbol("@effectful/debugger/traceData");

/**
 * Registers a function(`f`) to be executed on `undo` call
 * The functions are executed in backward order
 */
export function record(f) {
  if (!f) return;
  if (journal.trace && !journal.paused) {
    f.prev = journal.trace.operations;
    journal.trace.operations = f;
  }
}

/**
 * This rollbacks all changed objects and runs functions registered by `record`.
 * The `from` parameter is an object returned by `checkpoint` functions.
 * If `from` isn't specified rollbacks to the latest `checkpoint` call if it exists.
 */
export function undo(from) {
  const { trace } = journal;
  if (!trace) return;
  if (!from) from = trace;
  domFlush();
  const savedPaused = journal.paused;
  journal.paused = true;
  try {
    if (config.objectSnapshots) {
      for (let i = from; i != null; i = i.next) {
        const destVersion = i.version;
        if (i.undone) throw new TypeError("The checkpoint was already undone");
        i.undone = true;
        for (let j = i.snapshots; j; j = j.prev) {
          if (j.data.version >= destVersion) {
            j.call(j);
            j.data.version = destVersion;
          }
        }
        trace.snapshots = null;
      }
    }
    for (let i = trace, till = from.prev; i != null && i != till; i = i.prev)
      for (let j = i.operations; j != null; j = j.prev) j();
    journal.trace = from.prev;
    if (from.prev) from.prev.next = null;
  } finally {
    domFlush();
    journal.paused = savedPaused;
  }
  return from;
}

export const SysProxy = Proxy;

function* allProps(obj) {
  yield* Object.getOwnPropertyNames(obj);
  yield* Object.getOwnPropertySymbols(obj);
}

function objectSnapshot(data) {
  if (!journal.trace) return null;
  const { target } = data;
  const copy = Object.getOwnPropertyDescriptors(target);
  return {
    target,
    data,
    version: journal.trace.version,
    copy,
    proto: Object.getPrototypeOf(target),
    call: data.meta.undo
  };
}

function objectUndo(rec) {
  const { copy, target } = rec;
  if (rec.prototypeChanged) Object.setPrototypeOf(target, rec.proto);
  for (const i of allProps(target)) if (!(i in copy)) delete target[i];
  for (const i of allProps(copy)) {
    const descr = copy[i];
    if (!descr.set) {
      if (descr.enumberable && descr.writeable) target[i] = descr.value;
      else Object.defineProperty(target, i, descr);
    }
  }
}

function makeSnapshot(data) {
  if (!journal.trace) return null;
  let last = journal.trace.snapshots;
  if (journal.trace && journal.trace !== data.lastUpdate) {
    data.lastUpdate = journal.trace;
    data.version = journal.trace.version;
    last = data.lastSnapshot = data.meta.takeSnapshot(data);
    last.prev = journal.trace.snapshots;
    journal.trace.snapshots = last;
  }
  return last;
}

/** Class for representing trace data steps */
export function TraceData() {}

const handler = config.objectSnapshots
  ? {
      set(target, prop, value) {
        makeSnapshot(target[traceDataSymbol]);
        return Reflect.set(target, prop, value);
      },
      setPrototypeOf(target, proto) {
        const last = makeSnapshot(target[traceDataSymbol]);
        if (last) last.prototypeChanged = true;
        return Reflect.setPrototypeOf(target, unwrapTarget(proto));
      },
      // TODO: getters of __proto__ property should return wrapped prototype too
      getPrototypeOf(target) {
        return getWrapper(Object.getPrototypeOf(target));
      },
      deleteProperty(target, prop) {
        makeSnapshot(target[traceDataSymbol]);
        return Reflect.deleteProperty(target, prop);
      }
    }
  : {
      set(target, prop, value) {
        if (target[traceDataSymbol].createdAt !== journal.trace) {
          if (target.hasOwnProperty(prop)) {
            // DOESN'T WORK/DOESN'T WORK - computed properties will get values
            // from the current value
            const old = target[prop];
            record(() => (target[prop] = old));
          } else {
            record(() => delete target[prop]);
          }
        }
        return Reflect.set(target, prop, value);
      },
      setPrototypeOf(target, proto) {
        if (target[traceDataSymbol].createdAt !== journal.trace) {
          const saved = Object.getPrototypeOf(target);
          record(() => Object.setPrototypeOf(target, saved));
        }
        return Reflect.setPrototypeOf(target, unwrapTarget(proto));
      },
      deleteProperty(target, prop) {
        if (
          target[traceDataSymbol].createdAt !== journal.trace &&
          target.hasOwnProperty(prop)
        ) {
          const value = target[prop];
          record(() => (target[prop] = value));
        }
        return Reflect.deleteProperty(target, prop);
      }
    };

const defaultWrap = config.objectSnapshots
  ? function defaultWrap(target) {
      const { proto } = this;
      const proxy = new SysProxy(target, handler);
      if (proto) {
        // const origProto = Object.getPrototypeOf(target);
        // handler.getPrototypeOf = () => origProto;
        Object.setPrototypeOf(target, proto);
      }
      const data = (target[traceDataSymbol] = new TraceData());
      data.meta = this;
      data.proxy = proxy;
      data.target = target;
      data.lastUpdate = journal.trace;
      data.lastSnapshot = null;
      return proxy;
    }
  : function defaultWrap(target) {
      const { proto } = this;
      const proxy = new SysProxy(target, handler);
      const data = (target[traceDataSymbol] = new TraceData());
      data.meta = this;
      data.proxy = proxy;
      data.target = target;
      data.lastUpdate = journal.trace;
      data.lastSnapshot = null;
      if (proto) Object.setPrototypeOf(target, proto);
      return proxy;
    };

export const defaultTraceMeta = {
  wrap: defaultWrap,
  proto: null,
  proxy: null
};

if (config.objectSnapshots) {
  defaultTraceMeta.takeSnapshot = objectSnapshot;
  defaultTraceMeta.undo = objectUndo;
}

export const wrap = config.timeTravel
  ? function wrap(target) {
      if (!target) return target;
      const type = typeof target;
      if (type === "object" || type === "function") {
        if (target.hasOwnProperty(traceDataSymbol)) return target;
        return (target[traceMetaSymbol] || defaultTraceMeta).wrap(target);
      }
      return target;
    }
  : function wrap(v) {
      return v;
    };

function prototypeFwds(resProto) {
  const proto = Object.getPrototypeOf(resProto);
  for (const i of allProps(proto)) {
    if (i === "constructor") continue;
    const orig = Object.getOwnPropertyDescriptor(proto, i).value;
    if (typeof orig !== "function") continue;
    if (resProto.hasOwnProperty(i)) continue;
    resProto[i] = function() {
      return orig.apply(this[traceDataSymbol].target, arguments);
    };
  }
  return resProto;
}

function genProxyPrototype(constr, effMethods) {
  const proto = constr.prototype;
  const res = Object.create(proto);
  for (const i of effMethods) {
    const orig = Object.getOwnPropertyDescriptor(proto, i).value;
    res[i] = function() {
      const data = this[traceDataSymbol];
      makeSnapshot(data);
      return orig.apply(data.target, arguments);
    };
  }
  return prototypeFwds(res);
}

export const mapMeta = (Map.prototype[traceMetaSymbol] = {
  wrap: defaultWrap
});

if (config.objectSnapshots) {
  mapMeta.proto = genProxyPrototype(Map, ["set", "delete", "clear"]);
  if (config.iterableSnapshot) {
    mapMeta.takeSnapshot = function takeSnapshot(data) {
      const snapshot = objectSnapshot(data);
      if (snapshot) snapshot.copyIter = [...data.target];
      return snapshot;
    };
    mapMeta.undo = function undo(snapshot) {
      objectUndo(snapshot);
      const { target, copyIter } = snapshot;
      target.clear();
      for (const [k, v] of copyIter) target.set(k, v);
    };
  } else {
    mapMeta.takeSnapshot = objectSnapshot;
    mapMeta.undo = objectUndo;
  }
}

if (!config.iterableSnapshot) {
  mapMeta.proto = Object.create(Map.prototype);
  mapMeta.proto.set = function(k, v) {
    const { target, createdAt } = this[traceDataSymbol];
    if (createdAt !== journal.trace) {
      if (target.has(v)) {
        const old = target.get(v);
        record(() => target.set(k, old));
      } else {
        record(() => target.delete(k));
      }
    }
    return Map.prototype.set.call(target, k, v);
  };
  mapMeta.proto.delete = function(k) {
    const { target, createdAt } = this[traceDataSymbol];
    if (createdAt !== journal.trace) {
      if (target.has(k)) {
        const old = target.get(k);
        record(() => target.set(k, old));
      }
    }
    return Map.prototype.delete.call(target, k);
  };
  mapMeta.proto.clear = function() {
    const { target, createdAt } = this[traceDataSymbol];
    if (createdAt !== journal.trace) {
      const cur = [...target];
      record(() => {
        target.clear();
        for (const [k, v] of cur) target.set(k, v);
      });
    }
    return Map.prototype.clear.call(target);
  };
  prototypeFwds(mapMeta.proto);
}

export const setMeta = (Set.prototype[traceMetaSymbol] = {
  wrap: defaultWrap
});

if (config.objectSnapshots) {
  //  setMeta.proto = genProxyPrototype(Set, ["add", "delete", "clear"]);
  if (config.iterableSnapshot) {
    setMeta.takeSnapshot = function takeSnapshot(data) {
      const snapshot = objectSnapshot(data);
      if (snapshot) snapshot.copyIter = [...data.target];
      return snapshot;
    };
    setMeta.undo = function undo(snapshot) {
      objectUndo(snapshot);
      const { target, copyIter } = snapshot;
      target.clear();
      for (const i of copyIter) target.add(i);
    };
  } else {
    setMeta.takeSnapshot = objectSnapshot;
    setMeta.undo = objectUndo;
  }
}

if (!config.iterableSnapshot) {
  setMeta.proto = Object.create(Set.prototype);
  setMeta.proto.add = function(v) {
    const { target, createdAt } = this[traceDataSymbol];
    if (createdAt !== journal.trace && !target.has(v))
      record(() => target.delete(v));
    return Set.prototype.add.call(target, v);
  };
  setMeta.proto.delete = function(v) {
    const { target, createdAt } = this[traceDataSymbol];
    if (createdAt !== journal.trace && target.has(v))
      record(() => target.add(v));
    return Set.prototype.delete.call(target, v);
  };
  setMeta.proto.clear = function() {
    const { target, createdAt } = this[traceDataSymbol];
    if (createdAt !== journal.trace) {
      const cur = [...target];
      record(() => {
        target.clear();
        for (const i of cur) target.add(cur);
      });
    }
    return Set.prototype.clear.call(target);
  };
  prototypeFwds(setMeta.proto);
}

function domRecord(changes) {
  if (!changes.length) return;
  record(function() {
    for (let i = changes.length - 1; i >= 0; --i) {
      const rec = changes[i];
      switch (rec.type) {
        case "childList":
          for (const node of rec.addedNodes) node.remove();
          for (const node of rec.removedNodes)
            rec.target.insertBefore(node, rec.nextSibling);
          break;
        case "attributes":
          rec.target.setAttribute(rec.attributeName, rec.oldValue);
          break;
        case "characterData":
          rec.target.data = rec.oldValue;
          break;
      }
    }
  });
}

function flushObserver(data) {
  if (data.observer) {
    const changes = data.observer.takeRecords();
    if (changes.length && journal.trace && !journal.paused)
      record(domRecord(changes));
  }
}

const domObserverSymbol = Symbol("@effectful/debugger/dom");

let observing = new Set();

function domFlush() {
  for (const root of observing) {
    const data = root[domObserverSymbol];
    if (data) flushObserver(data);
  }
}

/**
 * This enables tracking DOM using MutationObserver.
 * Pass `null` to disable tracking.
 */
export function domTrack(root) {
  let data = root[domObserverSymbol];
  if (!root) {
    if (data && data.observer) {
      flushObserver();
      data.observer.disconnect();
      data.observer = null;
    }
    observing.remove(root);
    return;
  }
  observing.add(root);
  if (!data) data = root[domObserverSymbol] = { root };
  if (!data.observer) {
    const observer = (data.observer = new MutationObserver(changes => {
      journal.trace &&
        !journal.paused &&
        changes.length &&
        data.root &&
        domRecord(changes);
    }));
    observer.observe(data.root, {
      childList: true,
      attributes: true,
      subtree: true,
      attributeOldValue: true,
      characterData: true,
      characterDataOldValue: true
    });
  }
}

/**
 * if `target` is a proxy returns its enclosing value
 * or returns `target` otherwise
 */
export function unwrapTarget(target) {
  if (!target || !target.hasOwnProperty(traceDataSymbol)) return target;
  return target[traceDataSymbol].target;
}

/**
 * for values tracked by some proxy returns the proxy,
 * or returns `target` if it is already the proxy
 */
export function getWrapper(maybeProxy) {
  if (!maybeProxy || !maybeProxy.hasOwnProperty(traceDataSymbol))
    return maybeProxy;
  return maybeProxy[traceDataSymbol].proxy;
}

/**
 * when constructing new objects replacing its prototype to unwrapped one,
 * otherwise it will catch all setters of not yet wrapped target
 */
export const unwrapPrototype = config.timeTravel
  ? function(target) {
      const proto = Object.getPrototypeOf(target);
      if (proto.hasOwnProperty(traceDataSymbol))
        Object.setPrototypeOf(target, proto[traceDataSymbol].target);
    }
  : function(target) {};
