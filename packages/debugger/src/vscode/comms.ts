import config from "../config";
import { context } from "../state";

let cb: () => void;
let connected: Promise<undefined> | null = new Promise((i) => (cb = i));
let closed = false;

enum WorkerType { None, Node, Web }

let workerType = WorkerType.None;

let Worker: any;
if (config.expUseWorker) {
  try {
    const Node = require("worker_threads");
    if (Node && Node.Worker) {
      workerType = WorkerType.Node;
      Worker = Node.Worker
    }
  } catch (e) { }

  if (!Worker && (<any>global).Worker) {
    Worker = (<any>global).Worker;
    workerType = WorkerType.Web;
  }
}

let code = `
   ${workerType === WorkerType.Node ? `
   var impl = require("worker_threads"),
       port = impl.parentPort,
       status = new Int32Array(impl.workerData),
       WebSocket = require("ws");
   ` : ""}
   ${workerType === WorkerType.None ? "" : `
   function post(msg) {
     ++status[0];
     ${workerType === WorkerType.Node ? "port." : ""}postMessage(msg);
   }
   `}
   const socket = new WebSocket("${config.url}");
   socket.onopen = function () { post({type:"connected"}); }
   socket.onerror = function(event) { post({type:"error",msg:event.message}); }
   socket.onmessage = function(event) { post({type:"message",msg:event.data}); }
   socket.onclose = function() { post({type:"close"}); };
   ${workerType === WorkerType.Node
    ? "port.on('message', "
    : workerType === WorkerType.None ? "return [socket," : "onmessage = "}function(data) {
    ${workerType === WorkerType.Web ? "data = data.data;" : ""}
     switch(data.type) {
       case "close":
         socket.close();
         break;
       case "send":
         socket.send(data.msg);
         break;
     }
   }${workerType === WorkerType.Node ? ")" : workerType === WorkerType.None ? "]" : ""};`
  ;

if (workerType === WorkerType.Web) {
  code = `
      onmessage = function(initMsg) {
        var status = new Int32Array(initMsg.data);
        ${code}
      }
    `
}

const impl: {
  send: (data: any, optional?: boolean) => void;
  onmessage?: (data: any) => void;
  close: () => void;
  ref: () => void;
  unref: () => void;
  hasMessage: () => boolean;
} = { close, ref: nop, unref: nop, send, hasMessage: nop };

function nop() { return false }

let post: any;

if (workerType === WorkerType.None) {
  let WebSocketImpl = (<any>config).WebSocket || (<any>global).WebSocket;
  if (!WebSocketImpl) {
    try {
      WebSocketImpl = require("ws");
    } catch (e) { }
  }
  let socket: any;
  [socket, post] = new Function("WebSocket", "post", code)(WebSocketImpl, interpret);
  impl.ref = function () {
    if (socket._socket && socket._socket.ref)
      socket._socket.ref();
  }
  impl.unref = function () {
    if (socket._socket && socket._socket.unref)
      socket._socket.unref();
  }
} else {
  const buf = new SharedArrayBuffer(4);
  const status = new Int32Array(buf);
  impl.hasMessage = function () { return status[0] > 0; }
  let worker: Worker;
  if (workerType === WorkerType.Node) {
    worker = new Worker(code, { eval: true, workerData: buf });
    (<any>worker).on("message", function (data: any) {
      --status[0];
      interpret(data);
    });
    impl.ref = function ref() {
      (<any>worker).ref();
    }
    impl.unref = function unref() {
      (<any>worker).unref();
    }
  } else {
    worker = new Worker(
      URL.createObjectURL(
        new Blob([code], { type: "text/javascript" })
      )
    );
    (<Worker>worker).postMessage(buf);
    worker.onmessage = function (msg: any) {
      --status[0];
      const { data } = msg;
      interpret(data);
    };
  }
  post = function (msg: any) {
    worker.postMessage(msg);
  }
}

function close() {
  post({ type: "close" });
}

const sysConsole = console;

function interpret(data: any) {
  switch (data.type) {
    case "connected":
      connected = null;
      if (config.verbose) sysConsole.log("DEBUGGER: connected");
      cb();
      break;
    case "message":
      if (config.verbose)
        sysConsole.log(`DEBUGGER: RECV ${data.message} to ${context.threadId}`);
      if (impl.onmessage) impl.onmessage(JSON.parse(data.msg));
      break;
    case "error":
      sysConsole.error("DEBUGGER: network error", data.msg);
      context.debug = false;
      break;
    case "close":
      context.debug = false;
      closed = true;
      break;
  }
};

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
  post({ type: "send", msg });
}

export default impl;
