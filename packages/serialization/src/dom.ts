import * as S from "./main";

/** stores event handlers in EventTarget */
export const eventsSym = Symbol.for("@effectful/debugger/events");

if (typeof Event !== "undefined")
  S.regDescriptor(
    {
      name: "Event",
      create(ctx, json): Event {
        const EventConstructor = ctx.step((<any>json).c);
        const init: any = (<any>json).init;
        for (const i of Object.keys(init)) {
          const prop = init[i];
          if (prop && typeof prop === "object") init[i] = ctx.step(prop);
        }
        return new EventConstructor(init.type, init);
      },
      write(ctx, value: Event) {
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
    },
    Event.prototype
  );

type EventMap = Map<
  string,
  Map<
    EventListenerOrEventListenerObject,
    (AddEventListenerOptions[] | undefined)[]
  >
>;

declare global {
  interface EventTarget {
    [eventsSym]: EventMap;
  }
}

const overrideProps: any = { [S.descriptorSymbol]: false };
/*
const el = document.createElement("div");
for (const i of Object.getOwnPropertySymbols(el)) {
  switch (String(i)) {
    case "Symbol(impl)":
    case "Symbol(SameObject caches)":
      overrideProps[i] = false;
  }
}
*/

if (typeof Element !== "undefined") {
  S.regConstructor(Element, {
    write(ctx, value: Element) {
      const json: S.JSONObject = { tag: value.tagName };
      const nodes: S.JSONArray = (json.c = []);
      for (const i of [...value.childNodes])
        nodes.push(ctx.step(i, nodes, nodes.length));
      const attrs: S.JSONObject = (json.a = {});
      for (const i of [...value.attributes]) attrs[i.name] = i.value;
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
    overrideProps
  });
}
function restoreEvents(et: EventTarget, map: EventMap) {
  for (const [type, byType] of map)
    for (const [listener, byListener] of byType)
      for (const byCapture of byListener)
        if (byCapture)
          for (const options of byCapture)
            et.addEventListener(type, listener, options);
}

export function cleanupEvents(et: EventTarget) {
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

const onceHandlers = new WeakMap<
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
    if (once) {
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
  const byType = this[eventsSym] || (this[eventsSym] = new Map());
  let byListener = byType.get(type);
  if (!byListener) byType.set(type, (byListener = new Map()));
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
  (<any>document)[S.descriptorSymbol] = S.regDescriptor({
    name: "global#document",
    write(ctx, value: Document) {
      const json: S.JSONObject = {};
      const events = value[eventsSym];
      if (events) json.ev = ctx.step(events, json, "ev");
      return json;
    },
    create() {
      return document;
    },
    readContent(ctx, json, value) {
      const obj = <S.JSONObject>json;
      if (obj.ev) restoreEvents(value, ctx.step(obj.ev));
    }
  });
}

/**
 * Monkey patching platform objects to make them serializable,
 * run it as soon as possible if a global serialization is needed
 */
export function track() {
  if (typeof EventTarget !== "undefined") trackEvents(EventTarget.prototype);
  trackGlobalDocument();
  S.regOpaqueRec(global, "global");
}

if (typeof Text !== "undefined")
  S.regConstructor(Text, {
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

if (typeof Document !== "undefined")
  S.regConstructor(Document, {
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
  });
