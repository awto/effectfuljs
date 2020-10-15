export const callbacks: {
  dispatchErrorEvent?: (error: any) => void;
} = {};

export function dispatchEventImpl(
  ev: Event,
  map: Iterable<EventListenerOrEventListenerObject>
) {
  for (const handler of map) {
    try {
      if (typeof handler === "function") {
        handler(ev);
      } else {
        handler.handleEvent(ev);
      }
    } catch (error) {
      try {
        if (typeof window !== "undefined" && window.dispatchEvent)
          window.dispatchEvent(new ErrorEvent("error", { error }));
      } catch (e) {
        throw error;
      }
    }
  }
  return ev.defaultPrevented;
}
