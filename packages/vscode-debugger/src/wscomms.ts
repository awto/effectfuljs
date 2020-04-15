import { Server } from "ws";
import { Handler, THREAD_BITS } from "./comms";

const MAX_THREAD_ID = 1 << THREAD_BITS;

// from @effectful/debugger/state (TODO: a common module)

export default function subscribe(
  onconnect: (h: Handler) => void,
  host?: string,
  port?: number
): () => void {
  let threadCount = 0;
  if (threadCount >= MAX_THREAD_ID)
    throw new Error("Reached max threads number");
  const handlers = new Set<(handler: Handler) => void>();
  const wss = new Server({ host, port });
  wss.on("connection", ws => {
    if (!wss) return;
    const id = threadCount++;
    const thread: Handler = {
      id,
      send(data: any) {
        ws.send(JSON.stringify(data));
      },
      close() {
        ws.close();
      }
    };
    onconnect(thread);
    ws.onerror = function(e) {
      console.error(e);
      if (thread.onerror) thread.onerror(e);
      ws.close();
    };
    ws.onclose = function() {
      thread.closed = true;
      if (thread.onclose) thread.onclose();
    };
    ws.onmessage = function(ev) {
      if (thread.onmessage) thread.onmessage(JSON.parse(String(ev.data)));
    };
  });
  return function() {
    handlers.delete(onconnect);
    if (wss && !handlers.size) wss.close();
  };
}
