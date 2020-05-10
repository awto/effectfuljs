[@effectful/debugger](../README.md) › ["vscode/comms"](_vscode_comms_.md)

# Module: "vscode/comms"

## Index

### Enumerations

* [WorkerType](../enums/_vscode_comms_.workertype.md)

### Variables

* [Worker](_vscode_comms_.md#let-worker)
* [cb](_vscode_comms_.md#let-cb)
* [closed](_vscode_comms_.md#let-closed)
* [code](_vscode_comms_.md#let-code)
* [connected](_vscode_comms_.md#let-connected)
* [post](_vscode_comms_.md#let-post)
* [sysConsole](_vscode_comms_.md#const-sysconsole)
* [workerType](_vscode_comms_.md#let-workertype)

### Functions

* [close](_vscode_comms_.md#close)
* [interpret](_vscode_comms_.md#interpret)
* [nop](_vscode_comms_.md#nop)
* [send](_vscode_comms_.md#send)

### Object literals

* [impl](_vscode_comms_.md#const-impl)

## Variables

### `Let` Worker

• **Worker**: *any*

Defined in debugger/src/vscode/comms.ts:16

___

### `Let` cb

• **cb**: *function*

Defined in debugger/src/vscode/comms.ts:4

#### Type declaration:

▸ (): *void*

___

### `Let` closed

• **closed**: *boolean* = false

Defined in debugger/src/vscode/comms.ts:6

___

### `Let` code

• **code**: *string* = `
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
     ++status[0];
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
   };`

Defined in debugger/src/vscode/comms.ts:32

___

### `Let` connected

• **connected**: *Promise‹undefined› | null* = new Promise(i => (cb = i))

Defined in debugger/src/vscode/comms.ts:5

___

### `Let` post

• **post**: *any*

Defined in debugger/src/vscode/comms.ts:106

___

### `Const` sysConsole

• **sysConsole**: *Console* = console

Defined in debugger/src/vscode/comms.ts:165

___

### `Let` workerType

• **workerType**: *[WorkerType](../enums/_vscode_comms_.workertype.md)* = WorkerType.None

Defined in debugger/src/vscode/comms.ts:14

## Functions

###  close

▸ **close**(): *void*

Defined in debugger/src/vscode/comms.ts:161

**Returns:** *void*

___

###  interpret

▸ **interpret**(`data`: any): *void*

Defined in debugger/src/vscode/comms.ts:167

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  nop

▸ **nop**(): *boolean*

Defined in debugger/src/vscode/comms.ts:102

**Returns:** *boolean*

___

###  send

▸ **send**(`data`: any, `optional?`: undefined | false | true): *Promise‹void›*

Defined in debugger/src/vscode/comms.ts:190

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`optional?` | undefined &#124; false &#124; true |

**Returns:** *Promise‹void›*

## Object literals

### `Const` impl

### ▪ **impl**: *object*

Defined in debugger/src/vscode/comms.ts:93

###  close

• **close**: *[close](_vscode_comms_.md#close)*

Defined in debugger/src/vscode/comms.ts:100

###  hasMessage

• **hasMessage**: *[nop](_persist_.md#nop)* = nop

Defined in debugger/src/vscode/comms.ts:100

###  ref

• **ref**: *[nop](_persist_.md#nop)* = nop

Defined in debugger/src/vscode/comms.ts:100

###  send

• **send**: *[send](_vscode_comms_.md#send)*

Defined in debugger/src/vscode/comms.ts:100

###  unref

• **unref**: *[nop](_persist_.md#nop)* = nop

Defined in debugger/src/vscode/comms.ts:100
