import config from "../config";

const sysConsole = console;
let socket: WebSocket;
let cb: () => void;
let connected: Promise<undefined> | null = new Promise(i => (cb = i));
reconnect();

function reconnect() {
  if (socket) socket.close();
  socket = new WebSocket(config.url);
  socket.onopen = function() {
    connected = null;
    cb();
  };
  socket.onerror = function(event) {
    // TODO:
    sysConsole.error(event);
  };

  socket.onclose = function() {
    // TODO:
    sysConsole.log("CLOSED");
  };
  socket.onmessage = function(ev: MessageEvent) {
    if (impl.onmessage) impl.onmessage(JSON.parse(ev.data));
  };
}

const impl: {
  send: (data: any, optional?: boolean) => void;
  onmessage?: (data: any) => void;
} = { send };

export default impl;

async function send(data: any, optional?: boolean) {
  sysConsole.log("SEND", data);
  if (connected) {
    if (optional) return;
    await connected;
  }
  socket.send(JSON.stringify(data));
}
