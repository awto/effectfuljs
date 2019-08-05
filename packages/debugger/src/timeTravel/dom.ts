import * as Core from "./core";
import { regConstructor } from "@effectful/serialization";

const journal = Core.journal;

const domObserverSymbol = Symbol("@effectful/debugger/dom");

let observing = new Set<ElementExt>();

interface ObserverData {
  root: Element;
  observer?: MutationObserver;
}

interface ElementExt extends Element {
  [domObserverSymbol]?: ObserverData;
}

function* nodeListIter(nl: NodeList): Iterable<Node> {
  for (let i = 0, len = nl.length; i < len; ++i) yield nl[i];
}

export class DomSnapshot {
  changes: MutationRecord[];
  constructor(changes: MutationRecord[]) {
    this.changes = changes;
  }
  call() {
    const { changes } = this;
    for (let i = changes.length - 1; i >= 0; --i) {
      const rec = changes[i];
      switch (rec.type) {
        case "childList":
          for (const node of nodeListIter(rec.addedNodes)) {
            const parent = node.parentNode;
            if (parent) parent.removeChild(node);
          }
          for (const node of nodeListIter(rec.removedNodes))
            rec.target.insertBefore(node, rec.nextSibling);
          break;
        case "attributes":
          (<Element>rec.target).setAttribute(
            <string>rec.attributeName,
            <string>rec.oldValue
          );
          break;
        case "characterData":
          (<CharacterData>rec.target).data = <string>rec.oldValue;
          break;
      }
    }
  }
}
regConstructor(DomSnapshot);

function record(changes: MutationRecord[]) {
  if (!changes.length) return;
  Core.record(new DomSnapshot(changes));
}

function flushData(data: ObserverData) {
  if (data.observer) {
    const changes = data.observer.takeRecords();
    if (changes.length && journal.now) record(changes);
  }
}

export function flush() {
  for (const root of observing) {
    const data = root[domObserverSymbol];
    if (data) flushData(data);
  }
}

/**
 * This enables tracking DOM using MutationObserver.
 * Pass `null` to disable tracking.
 */
export function track(rootEl: Element) {
  const root = <ElementExt>rootEl;
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
  if (!data) data = root[domObserverSymbol] = { root };
  if (!data.observer) {
    const observer = (data.observer = new MutationObserver(changes => {
      journal.now && changes.length && record(changes);
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
