"use strict";

exports.__esModule = true;
exports.flush = flush;
exports.track = track;
exports.DomSnapshot = void 0;

var Core = require("./core");

var _serialization = require("@effectful/serialization");

const journal = Core.journal;
const domObserverSymbol = Symbol("@effectful/debugger/dom");
let observing = new Set();

function* nodeListIter(nl) {
  for (let i = 0, len = nl.length; i < len; ++i) yield nl[i];
}

class DomSnapshot {
  constructor(changes) {
    this.changes = changes;
  }

  call() {
    const {
      changes
    } = this;

    for (let i = changes.length - 1; i >= 0; --i) {
      const rec = changes[i];

      switch (rec.type) {
        case "childList":
          for (const node of nodeListIter(rec.addedNodes)) {
            const parent = node.parentNode;
            if (parent) parent.removeChild(node);
          }

          for (const node of nodeListIter(rec.removedNodes)) rec.target.insertBefore(node, rec.nextSibling);

          break;

        case "attributes":
          rec.target.setAttribute(rec.attributeName, rec.oldValue);
          break;

        case "characterData":
          rec.target.data = rec.oldValue;
          break;
      }
    }
  }

}

exports.DomSnapshot = DomSnapshot;
(0, _serialization.regConstructor)(DomSnapshot);

function record(changes) {
  if (!changes.length) return;
  Core.record(new DomSnapshot(changes));
}

function flushData(data) {
  if (data.observer) {
    const changes = data.observer.takeRecords();
    if (changes.length && journal.now) record(changes);
  }
}

function flush() {
  for (const root of observing) {
    const data = root[domObserverSymbol];
    if (data) flushData(data);
  }
}
/**
 * This enables tracking DOM using MutationObserver.
 * Pass `null` to disable tracking.
 */


function track(rootEl) {
  const root = rootEl;
  let data = root[domObserverSymbol];

  if (!root) {
    if (data && data.observer) {
      flush();
      data.observer.disconnect();
      data.observer = void 0;
    }

    observing.delete(root);
    return;
  }

  observing.add(root);
  if (!data) data = root[domObserverSymbol] = {
    root
  };

  if (!data.observer) {
    const observer = data.observer = new MutationObserver(changes => {
      journal.now && changes.length && record(changes);
    });
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