import config from "../config";
import { context } from "../state";

let socket: WebSocket;
let cb: () => void;
let connected: Promise<undefined> | null = new Promise(i => (cb = i));
let closed = false;
const sysConsole = console;

const WS = (<any>config).WebSocket || WebSocket;
reconnect();

function reconnect() {
  if (socket) socket.close();
  socket = new WS(config.url);
  socket.onopen = function() {
    connected = null;
    if (config.verbose) sysConsole.log("DEBUGGER: connected");
    cb();
  };
  socket.onerror = function(event) {
    sysConsole.error("DEBUGGER: network error", (<any>event).message);
    context.debug = false;
  };
  socket.onclose = function() {
    if (config.verbose) sysConsole.log("DEBUGGER: connection is closed");
    context.debug = false;
    closed = true;
  };
  socket.onmessage = function(ev: MessageEvent) {
    if (config.verbose)
      sysConsole.log(`DEBUGGER: RECV ${ev.data} to ${context.threadId}`);
    if (impl.onmessage) impl.onmessage(JSON.parse(ev.data));
  };
}

const impl: {
  send: (data: any, optional?: boolean) => void;
  onmessage?: (data: any) => void;
  close: () => void;
  ref: () => void;
  unref: () => void;
} = { send, close, ref, unref };

export default impl;

function close() {
  socket.close();
}

function ref() {
  if ((<any>socket)._socket && (<any>socket)._socket.ref)
    (<any>socket)._socket.ref();
}

function unref() {
  if ((<any>socket)._socket && (<any>socket)._socket.unref)
    (<any>socket)._socket.unref();
}

async function send(data: any, optional?: boolean) {
  const msg = JSON.stringify(data);
  if (config.verbose && data.event !== "output")
    sysConsole.log(`DEBUGGER: SEND ${msg} from ${context.threadId}`);
  if (closed) {
    if (config.verbose)
      sysConsole.log("DEBUGGER: sending into a closed socket");
    return;
  }
  if (connected) {
    if (optional) return;
    await connected;
  }
  socket.send(msg);
}
