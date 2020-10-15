import * as S from "./main";

declare const InputDeviceCapabilities: any;

const LocMap = Map;
const LocWeakMap = WeakMap;

const defineProperty = Object.defineProperty;

export function nodeListIter<T>(nl: {
  length: number;
  [index: number]: T;
}): Iterable<T> {
  return {
    [Symbol.iterator]() {
      let i = 0;
      return {
        next(): { value: T; done: boolean } {
          return i < nl.length
            ? { done: false, value: nl[i++] }
            : { done: true, value: <any>undefined };
        }
      };
    }
  };
}

/** stores event handlers in EventTarget */
export const eventsSym = Symbol.for("@effectful/debugger/events");

export type EventsMap = Map<
  string,
  Map<
    EventListenerOrEventListenerObject,
    (AddEventListenerOptions[] | undefined)[]
  >
>;

declare global {
  interface EventTarget {
    [eventsSym]: EventsMap;
  }
}

export function getEventsMap(target: EventTarget) {
  return target[eventsSym];
}

const overrideProps: any = { [S.descriptorSymbol]: false };

function restoreEvents(et: EventTarget, map: EventsMap) {
  cleanupEvents(et);
  for (const [type, byType] of map)
    for (const [listener, byListener] of byType)
      for (const byCapture of byListener)
        if (byCapture)
          for (const options of byCapture)
            et.addEventListener(type, listener, options);
  et[eventsSym] = map;
}

export function cleanupEvents(et: EventTarget) {
  const map = et[eventsSym];
  if (!map) return;
  for (const [type, byType] of et[eventsSym])
    for (const [listener, byListener] of byType)
      for (const byCapture of byListener)
        if (byCapture)
          for (const options of byCapture)
            et.removeEventListener(type, listener, options);
}

const ETp = typeof EventTarget !== "undefined" && EventTarget.prototype;
const savedAddEventListener = ETp && ETp.addEventListener;
const savedRemoveEventListener = ETp && ETp.removeEventListener;

interface EventListenerOnceHandler extends EventListenerObject {
  inner: EventListenerOrEventListenerObject;
  type: string;
  capture: boolean;
}

declare global {
  interface EventListenerOptions {
    // extending options - removing only listeners with `once` set
    once?: boolean;
  }
}

function wrapOnceHandleEvent(this: EventListenerOnceHandler, event: Event) {
  if (event.currentTarget)
    event.currentTarget.removeEventListener(
      this.type,
      this.inner,
      this.capture
    );
}

S.regOpaqueObject(wrapOnceHandleEvent, "S#wrapOnceHandleEvent");

const onceHandlers = new LocWeakMap<
  EventListenerOrEventListenerObject,
  EventListenerOnceHandler
>();

/** `EventTarget#addEventListener` wrapper which keeps the listener's reference */
export function addEventListener(
  this: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  if (typeof options === "boolean") {
    options = { capture: options };
  } else if (!options) options = {};
  const once = options.once;
  if (savedAddEventListener) {
    savedAddEventListener.call(this, type, listener, {
      capture: options.capture,
      passive: options.passive
    });
    if (once || type === "load") {
      let onceHandler = onceHandlers.get(listener);
      if (!onceHandler) {
        onceHandlers.set(
          listener,
          (onceHandler = {
            type,
            inner: listener,
            capture: options.capture || false,
            handleEvent: wrapOnceHandleEvent
          })
        );
      }
      savedAddEventListener.call(this, type, onceHandler, {
        once: true,
        capture: options.capture
      });
    }
  }
  const byType = this[eventsSym] || (this[eventsSym] = new LocMap());
  let byListener = byType.get(type);
  if (!byListener) byType.set(type, (byListener = new LocMap()));
  let byCapture = byListener.get(listener);
  if (!byCapture) {
    byCapture = [void 0, void 0];
    byListener.set(listener, byCapture);
  }
  const captIndex = Number(options.capture || false);
  const list = byCapture[captIndex] || (byCapture[captIndex] = []);
  list.push(options);
}

/** `EventTarget#removeEventListener` wrapper which keeps the listener's reference */
export function removeEventListener(
  this: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions
) {
  if (typeof options === "boolean") {
    options = { capture: options };
  } else if (!options) options = {};
  if (savedRemoveEventListener)
    savedRemoveEventListener.call(this, type, listener, options);
  const byType = this[eventsSym];
  if (!byType) return;
  const byListener = byType.get(type);
  if (!byListener) return;
  const byCapture = byListener.get(listener);
  if (!byCapture) return;
  const index = Number(options.capture || false);
  const list = byCapture[index];
  if (!list) return;
  if (options.once && list.some(i => !i.once)) return;
  byCapture[index] = void 0;
  if (!byCapture.some(Boolean)) byListener.delete(listener);
}

/**
 * monkey patching `addEventListener`/`removeEventListener`
 * to keep reference to event listeners
 */
export function trackEvents(ev: EventTarget) {
  ev.addEventListener = addEventListener;
  ev.removeEventListener = removeEventListener;
}

/** monkey patching global `document` to make it serializable */
export function trackGlobalDocument() {
  if (typeof document === "undefined") return;
  // ignoring jsdom props (not needed if jsdom is transpiled too)
  const el = document.createElement("div");
  el.addEventListener("test-event", function () {});
  el.innerHTML = `<div id="root"><p>hello, world!</p></div>`;
  const _children = el.children;
  const _attrs = el.attributes;
  for (const i of Object.getOwnPropertySymbols(el)) overrideProps[i] = false;
  for (const i of Object.getOwnPropertySymbols(document))
    overrideProps[i] = false;
  S.getState().byObject.set(
    document,
    S.regDescriptor({
      name: "global#document",
      write(ctx, value: Document) {
        const json: S.JSONObject = {};
        json.el = ctx.step(document.documentElement, json, "el");
        const events = value[eventsSym];
        if (events) json.ev = ctx.step(events, json, "ev");
        return json;
      },
      create() {
        return document;
      },
      readContent(ctx, json, value) {
        value.replaceChild(ctx.step((<any>json).el), value.documentElement);
        if ((<any>json).ev) restoreEvents(value, ctx.step((<any>json).ev));
      },
      overrideProps: { ...overrideProps, location: false, [eventsSym]: false }
    })
  );
  if (typeof NodeList !== "undefined") {
    S.regConstructor(NodeList, { name: "dom#NodeList", overrideProps });
  }
  if (typeof EventTarget !== "undefined") {
    S.regConstructor(NodeList, { name: "dom#EventTarget", overrideProps });
  }
  if (typeof Element !== "undefined") {
    S.regConstructor(
      Element,
      {
        name: "dom#Element",
        write(ctx, value: Element, par, key) {
          const json: S.JSONObject = { tag: value.tagName };
          const nodes: S.JSONArray = (json.c = []);
          for (const i of nodeListIter(value.childNodes))
            nodes.push(ctx.step(i, nodes, nodes.length));
          const attrs: S.JSONObject = (json.a = {});
          for (const i of nodeListIter(value.attributes))
            attrs[i.name] = i.value;
          const events = value[eventsSym];
          if (events) json.ev = ctx.step(events, json, "ev");
          return json;
        },
        create(_, json) {
          return document.createElement((<any>json).tag);
        },
        readContent(ctx, json, value) {
          const obj = <any>json;
          for (const i of obj.c) value.appendChild(ctx.step(i));
          for (const n in obj.a) value.setAttribute(n, obj.a[n]);
          if (obj.ev) restoreEvents(value, ctx.step(obj.ev));
        },
        overrideProps: { ...overrideProps, [eventsSym]: false }
      },
      true
    );
  }
  if (typeof Event !== "undefined")
    defineProperty(Event.prototype, S.descriptorSymbol, {
      value: S.regDescriptor({
        name: "dom#Event",
        create(ctx: S.ReadContext, json: any): Event {
          const EventConstructor = ctx.step((<any>json).c);
          const jsonInit: any = (<any>json).init;
          const init: any = {};
          for (const i of Object.keys(jsonInit)) {
            const prop = jsonInit[i];
            if (prop && typeof prop === "object") init[i] = ctx.step(prop);
            else init[i] = prop;
          }
          return new EventConstructor(init.type, init);
        },
        write(ctx: S.WriteContext, value: Event) {
          const res: S.JSONObject = {};
          res.c = ctx.step(value.constructor, res, "c");
          const descrs: any = {};
          for (
            let i = value;
            i && i !== Object.prototype;
            i = Object.getPrototypeOf(i)
          )
            Object.assign(descrs, Object.getOwnPropertyDescriptors(i), descrs);
          const init: S.JSONObject = (res.init = {});
          for (const name in descrs) {
            if (!descrs[name].get) continue;
            const prop = (<any>value)[name];
            if (prop) init[name] = ctx.step(prop, init, name);
          }
          return res;
        },
        readContent() {},
        props: false
      }),
      configurable: true
    });
  if (typeof Text !== "undefined")
    S.regConstructor(Text, {
      name: "dom#Text",
      write(_, value) {
        return { text: value.data };
      },
      create(_, json) {
        return document.createTextNode((<any>json).text);
      },
      overrideProps
    });

  if (typeof ProcessingInstruction !== "undefined")
    S.regConstructor(ProcessingInstruction, {
      name: "dom#PI",
      write(_, value) {
        return { target: value.target, data: value.data };
      },
      create(_, json) {
        return document.createProcessingInstruction(
          (<any>json).target,
          (<any>json).data
        );
      },
      overrideProps
    });

  if (typeof Comment !== "undefined")
    S.regConstructor(Comment, {
      name: "dom#Comment",

      write(_, value) {
        return { text: value.data };
      },
      create(_, json) {
        return document.createTextNode((<any>json).text);
      },
      overrideProps
    });

  if (typeof CSSStyleDeclaration !== "undefined")
    S.regConstructor(CSSStyleDeclaration, {
      name: "dom#CSSStyleDeclaration",
      write(_, value) {
        return { text: value.cssText };
      },
      create(_, json) {
        const dummy = document.createElement("div");
        dummy.style.cssText = (<any>json).text;
        return dummy.style;
      },
      overrideProps
    });

  if ((<any>global).CSS2Properties)
    S.regConstructor((<any>global).CSS2Properties, {
      name: "dom#CSS2Properties",
      write(_, value) {
        return { text: (<any>value).cssText };
      },
      create(_, json) {
        const dummy = document.createElement("div");
        dummy.style.cssText = (<any>json).text;
        return dummy.style;
      },
      overrideProps
    });

  if (typeof Document !== "undefined")
    S.regConstructor(
      Document,
      {
        name: "dom#Document",
        write(_, value) {
          const s = new XMLSerializer();
          return {
            text: s.serializeToString(value),
            type: value.contentType
          };
        },
        create(_, json: S.JSONValue): Document {
          return new DOMParser().parseFromString(
            (<any>json).text,
            (<any>json).type
          );
        },
        readContent(ctx, json, value) {
          value.replaceChild(ctx.step((<any>json).el), value.documentElement);
        },
        overrideProps
      },
      true
    );

  if (typeof InputDeviceCapabilities !== "undefined") {
    S.regConstructor(InputDeviceCapabilities, {
      name: "dom#InputDeviceCapabilities",
      write(_ctx, value) {
        return { fireTouchEvents: (<any>value).fireTouchEvents };
      },
      create(_ctx, json) {
        // TODO: don't care about object model for now
        return new InputDeviceCapabilities({
          fireTouchEvents: (<any>json).fireTouchEvents
        });
      },
      props: false
    });
  }

  if (typeof MutationRecord !== "undefined")
    S.regConstructor(MutationRecord, {
      name: "dom#MutationRecord",
      write(ctx, value) {
        const res = <any>{};
        res.ty = ctx.step(value.type, res, "ty");
        res.el = ctx.step(value.target, res, "el");
        if (value.addedNodes)
          res.an = ctx.step([...nodeListIter(value.addedNodes)], res, "an");
        if (value.removedNodes)
          res.rn = ctx.step([...nodeListIter(value.removedNodes)], res, "rn");
        if (value.previousSibling)
          res.ps = ctx.step(value.previousSibling, res, "ps");
        if (value.nextSibling) res.ns = ctx.step(value.nextSibling, res, "ns");
        if (value.attributeName)
          res.tn = ctx.step(value.attributeName, res, "tn");
        if (value.attributeNamespace)
          res.ts = ctx.step(value.attributeNamespace, res, "ts");
        if (value.oldValue) res.ov = ctx.step(value.oldValue, res, "ov");
        return res;
      },
      create() {
        // TODO: don't care about object model for now
        return <any>{};
      },
      readContent(ctx, json: S.JSONValue, value: MutationRecord) {
        const j = <any>json;
        const v = <any>value;
        v.type = ctx.step(j.ty);
        v.target = ctx.step(j.el);
        v.addedNodes = ctx.step(j.an);
        v.removedNodes = ctx.step(j.rn);
        v.previousSibling = ctx.step(j.ps);
        v.nextSibling = ctx.step(j.ns);
        v.attributeName = ctx.step(j.tn);
        v.attributeNamespace = ctx.step(j.ts);
        v.oldValue = ctx.step(j.ov);
      },
      props: false
    });
  if (typeof MutationObserver !== "undefined")
    S.regConstructor(MutationObserver, {
      name: "dom#MutationObserver",
      overrideProps
    });
}

/**
 * Monkey patching platform objects to make them serializable,
 * run it as soon as possible if a global serialization is needed
 */
export function track() {
  if (typeof EventTarget !== "undefined") trackEvents(EventTarget.prototype);
  trackGlobalDocument();
  S.regGlobal();
}
