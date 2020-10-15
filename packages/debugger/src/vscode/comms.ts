import config from "../config";
import { context, normalizePath, statusBuf } from "../state";

let connectionQueue: any[] | null = [];
let closed = false;

enum WorkerType {
  None,
  Node,
  Web,
  Ext
}

let workerType = WorkerType.None;

// for simplified embedding
const extWorker = (<any>global)[`${config.globalNS}#comms`];
let Worker: any;

if (extWorker) {
  workerType = WorkerType.Ext;
} else if (statusBuf && config.expUseWorker) {
  try {
    const Node = require("worker_threads");
    if (Node && Node.Worker) {
      workerType = WorkerType.Node;
      Worker = Node.Worker;
    }
  } catch (e) {}

  if (!Worker && (<any>global).Worker) {
    Worker = (<any>global).Worker;
    workerType = WorkerType.Web;
  }
}

let code = "";

if (workerType !== WorkerType.Ext)
  code = `
   ${
     workerType === WorkerType.Node
       ? `
   var impl = require("worker_threads"),
       port = impl.parentPort,
       status = new Int32Array(impl.workerData),
       WebSocket = require(require.resolve("ws",{paths:["${normalizePath(
         __dirname
       )}/../node_modules"]}));
   `
       : ""
   }
   ${
     workerType === WorkerType.None
       ? ""
       : `
   function post(msg) {
     Atomics.add(status, 0, 1);
     ${workerType === WorkerType.Node ? "port." : ""}postMessage(msg);
   }
   `
   }
   const socket = new WebSocket("${config.url}");
   socket.onopen = function () { post({type:"connected"}); }
   socket.onerror = function(event) { post({type:"error",msg:event.message}); }
   socket.onmessage = function(event) { post({type:"message",msg:event.data}); }
   socket.onclose = function() { post({type:"close"}); };
   ${
     workerType === WorkerType.Node
       ? "port.on('message', "
       : workerType === WorkerType.None
       ? "return [socket,"
       : "onmessage = "
   }function(data) {
    ${workerType === WorkerType.Web ? "data = data.data;" : ""}
     switch(data.type) {
       case "close":
         socket.close();
         break;
       case "send":
         socket.send(data.msg);
         break;
     }
   }${
     workerType === WorkerType.Node
       ? ")"
       : workerType === WorkerType.None
       ? "]"
       : ""
   };`;

if (workerType === WorkerType.Web) {
  code = `
      onmessage = function(initMsg) {
        var status = new Int32Array(initMsg.data);
        ${code}
      }
    `;
}

const impl: {
  send: (data: any, optional?: boolean) => void;
  onmessage?: (data: any) => void;
  close: () => void;
  ref: () => void;
  unref: () => void;
  hasMessage: () => boolean;
} = { close: nop, ref: nop, unref: nop, send, hasMessage: nop };

function nop() {
  return false;
}

let post: any;
let close: any;

if (workerType === WorkerType.None) {
  let WebSocketImpl = (<any>config).WebSocket || (<any>global).WebSocket;
  if (!WebSocketImpl) {
    try {
      WebSocketImpl = require("ws");
    } catch (e) {}
  }
  const [socket, redir] = new Function("WebSocket", "post", code)(
    WebSocketImpl,
    interpret
  );
  post = function(msg: any) {
    redir({ type: "send", msg });
  };
  close = function() {
    redir({ type: "close" });
  };
  impl.ref = function() {
    if (socket._socket && socket._socket.ref) socket._socket.ref();
  };
  impl.unref = function() {
    if (socket._socket && socket._socket.unref) socket._socket.unref();
  };
} else if (workerType === WorkerType.Ext) {
  extWorker(statusBuf);
  impl.ref = (<any>global)[`${config.globalNS}#comms#ref`] || function() {};
  impl.unref = (<any>global)[`${config.globalNS}#comms#unref`] || function() {};
  post = (<any>global)[`${config.globalNS}#comms#post`];
  close = (<any>global)[`${config.globalNS}#comms#close`];
  (<any>global)[`${config.globalNS}#comms#interpret`] = interpret;
} else {
  const status = new Int32Array(statusBuf);
  impl.hasMessage = function() {
    return status[0] > 0;
  };
  let worker: Worker;
  if (workerType === WorkerType.Node) {
    worker = new Worker(code, { eval: true, workerData: statusBuf });
    (<any>worker).on("message", function(data: any) {
      Atomics.add(status, 0, -1);
      interpret(data);
    });
    impl.ref = function ref() {
      (<any>worker).ref();
    };
    impl.unref = function unref() {
      (<any>worker).unref();
    };
  } else {
    worker = new Worker(
      URL.createObjectURL(new Blob([code], { type: "text/javascript" }))
    );
    (<Worker>worker).postMessage(statusBuf);
    worker.onmessage = function(msg: any) {
      --status[0];
      const { data } = msg;
      interpret(data);
    };
  }
  post = function(msg: any) {
    worker.postMessage({ type: "send", msg });
  };
  close = function() {
    worker.postMessage({ type: "close" });
  };
}

const sysConsole = console;

function interpret(data: any) {
  switch (data.type) {
    case "connected":
      const queue = connectionQueue;
      connectionQueue = null;
      if (config.verbose) sysConsole.log("DEBUGGER: connected");
      if (queue) for (const i of queue) post(i);
      break;
    case "message":
      if (config.verbose)
        sysConsole.log(`DEBUGGER: RECV ${data.msg} to ${context.threadId}`);
      if (impl.onmessage) impl.onmessage(JSON.parse(data.msg));
      break;
    case "error":
      sysConsole.error("DEBUGGER: network error", data.msg);
      context.enabled = false;
      break;
    case "close":
      context.enabled = false;
      closed = true;
      close();
      break;
  }
}

function send(data: any, optional?: boolean) {
  const msg = JSON.stringify(data);
  if (config.verbose && data.event !== "output")
    sysConsole.log(`DEBUGGER: SEND ${msg} from ${context.threadId}`);
  if (closed) {
    if (config.verbose)
      sysConsole.log("DEBUGGER: sending into a closed socket");
    return;
  }
  if (connectionQueue) {
    if (optional) return;
    connectionQueue.push(msg);
  } else post(msg);
}

impl.close = close;

export default impl;
