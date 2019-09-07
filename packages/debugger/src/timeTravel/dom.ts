import * as Core from "./core";
import { regConstructor } from "@effectful/serialization";
import { nodeListIter } from "@effectful/serialization/dom";

const journal = Core.journal;

const domObserverSymbol = Symbol("@effectful/debugger/dom");

/** currently observed elements */
let observing = new Set<ElementExt>();

interface ObserverData {
  root: Element;
  observer?: MutationObserver;
}

interface ElementExt extends Element {
  [domObserverSymbol]?: ObserverData;
}

export class DomSnapshot implements Core.Operation {
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

regConstructor(DomSnapshot, {
  // TODO: check how to make jsdom to run on same context, so this is not needed
  write(ctx, value) {
    const res = <any>{};
    res.i = ctx.step([...value.changes], res, "i");
    res.p = ctx.step((<any>value).prev, res, "p");
    return res;
  },
  create() {
    return new DomSnapshot([]);
  },
  readContent(ctx, json, value) {
    value.changes.push(...ctx.step((<any>json).i));
    (<any>value).prev = ctx.step((<any>json).p);
  },
  props: false
});

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
 */
export function track(rootEl: Element) {
  const root = <ElementExt>rootEl;
  let data = root[domObserverSymbol];
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

/**
 * This disables tracking DOM using MutationObserver.
 */
export function untrack(rootEl: Element) {
  const root = <ElementExt>rootEl;
  let data = root[domObserverSymbol];
  if (data && data.observer) {
    flush();
    data.observer.disconnect();
    data.observer = void 0;
  }
  observing.delete(root);
}
