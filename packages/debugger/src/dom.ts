import * as State from "./state";
import { dispatchEventImpl } from "./instr/dom";
import { getEventsMap } from "@effectful/serialization/dom";
const { context, CLOSURE_META } = State;

export function register() {
  if (typeof HTMLUnknownElement !== "undefined") {
    const ElProto = <any>HTMLUnknownElement.prototype;
    // a very rough approximation for React dev
    const nativeDispatchEvent = ElProto.dispatchEvent;
    const dispatchEventClos = State.closures.get(dispatchEventImpl);
    if (dispatchEventClos)
      dispatchEventClos[CLOSURE_META].flags |= State.Flag.EXCEPTION_BOUNDARY;
    ElProto.dispatchEvent = function dispatchEvent(ev: Event) {
      if (context.enabled && context.call === dispatchEvent) {
        const map = getEventsMap(this);
        if (map) {
          const handlers = map.get(ev.type.toLocaleLowerCase());
          if (handlers) {
            context.call = dispatchEventImpl;
            return dispatchEventImpl(ev, handlers.keys());
          }
        }
      }
      return nativeDispatchEvent.apply(this, arguments);
    };
  }
}

register();
