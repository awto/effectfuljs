[@effectful/debugger](../README.md) › ["vscode/protocol"](_vscode_protocol_.md)

# Module: "vscode/protocol"

## Index

### Namespaces

* ["vscode-debugprotocol"](_vscode_protocol_.md#vscode-debugprotocol)

## Namespaces

###  "vscode-debugprotocol"

• **"vscode-debugprotocol"**:

Defined in debugger/src/vscode/protocol.ts:5

###  DebugProtocol

• **DebugProtocol**:

Defined in debugger/src/vscode/protocol.ts:6

###  ChildLaunch

• **ChildLaunch**:

Defined in debugger/src/vscode/protocol.ts:7

###  arguments

• **arguments**: *object*

*Overrides [ChildSetBreakpoints](_vscode_protocol_.md#childsetbreakpoints).[arguments](_vscode_protocol_.md#optional-arguments)*

Defined in debugger/src/vscode/protocol.ts:9

#### Type declaration:

* **breakpoints**: *SetBreakpointsArguments[]*

* **dirSep**: *string*

* **exceptions**: *SetExceptionBreakpointsArguments*

* **stopOnEntry**? : *undefined | false | true*

* **stopOnExit**? : *undefined | false | true*

* **threadId**: *number*

###  command

• **command**: *string*

*Inherited from [ChildLaunch](_vscode_protocol_.md#childlaunch).[command](_vscode_protocol_.md#command)*

Defined in debugger/node_modules/vscode-debugprotocol/lib/debugProtocol.d.ts:17

The command to execute.

###  seq

• **seq**: *number*

*Inherited from [ChildLaunch](_vscode_protocol_.md#childlaunch).[seq](_vscode_protocol_.md#seq)*

Defined in debugger/node_modules/vscode-debugprotocol/lib/debugProtocol.d.ts:8

Sequence number (also known as message ID). For protocol messages of type 'request' this ID can be used to cancel the request.

###  type

• **type**: *string*

*Inherited from [ChildLaunch](_vscode_protocol_.md#childlaunch).[type](_vscode_protocol_.md#type)*

Defined in debugger/node_modules/vscode-debugprotocol/lib/debugProtocol.d.ts:12

Message type.
Values: 'request', 'response', 'event', etc.

###  ChildSetBreakpoints

• **ChildSetBreakpoints**:

Defined in debugger/src/vscode/protocol.ts:19

### `Optional` arguments

• **arguments**? : *any*

*Inherited from [ChildSetBreakpoints](_vscode_protocol_.md#childsetbreakpoints).[arguments](_vscode_protocol_.md#optional-arguments)*

Defined in debugger/node_modules/vscode-debugprotocol/lib/debugProtocol.d.ts:19

Object containing arguments for the command.

###  command

• **command**: *string*

*Inherited from [ChildLaunch](_vscode_protocol_.md#childlaunch).[command](_vscode_protocol_.md#command)*

Defined in debugger/node_modules/vscode-debugprotocol/lib/debugProtocol.d.ts:17

The command to execute.

###  seq

• **seq**: *number*

*Inherited from [ChildLaunch](_vscode_protocol_.md#childlaunch).[seq](_vscode_protocol_.md#seq)*

Defined in debugger/node_modules/vscode-debugprotocol/lib/debugProtocol.d.ts:8

Sequence number (also known as message ID). For protocol messages of type 'request' this ID can be used to cancel the request.

###  type

• **type**: *string*

*Inherited from [ChildLaunch](_vscode_protocol_.md#childlaunch).[type](_vscode_protocol_.md#type)*

Defined in debugger/node_modules/vscode-debugprotocol/lib/debugProtocol.d.ts:12

Message type.
Values: 'request', 'response', 'event', etc.

###  ChildSetBreakpointsResponse

• **ChildSetBreakpointsResponse**:

Defined in debugger/src/vscode/protocol.ts:26

###  body

• **body**: *object*

Defined in debugger/src/vscode/protocol.ts:27

#### Type declaration:

* **breakpoints**: *[BreakpointInfo](_vscode_protocol_.md#breakpointinfo)[]*

* **path**: *string*

###  LaunchRequestArguments

• **LaunchRequestArguments**:

Defined in debugger/src/vscode/protocol.ts:33

### `Optional` args

• **args**? : *string[]*

Defined in debugger/src/vscode/protocol.ts:43

### `Optional` argv0

• **argv0**? : *undefined | string*

Defined in debugger/src/vscode/protocol.ts:42

### `Optional` command

• **command**? : *string | boolean*

Defined in debugger/src/vscode/protocol.ts:37

### `Optional` console

• **console**? : *boolean | "internalConsole" | "integratedTerminal" | "externalTerminal"*

Defined in debugger/src/vscode/protocol.ts:48

### `Optional` cwd

• **cwd**? : *undefined | string*

Defined in debugger/src/vscode/protocol.ts:40

### `Optional` debuggerHost

• **debuggerHost**? : *undefined | string*

Defined in debugger/src/vscode/protocol.ts:56

### `Optional` debuggerPort

• **debuggerPort**? : *undefined | number*

Defined in debugger/src/vscode/protocol.ts:57

### `Optional` env

• **env**? : *undefined | object*

Defined in debugger/src/vscode/protocol.ts:41

### `Optional` fastRestart

• **fastRestart**? : *undefined | string*

Defined in debugger/src/vscode/protocol.ts:59

### `Optional` htmlTemplate

• **htmlTemplate**? : *string | null*

Defined in debugger/src/vscode/protocol.ts:54

### `Optional` indexJs

• **indexJs**? : *string | null*

Defined in debugger/src/vscode/protocol.ts:53

### `Optional` keepRunning

• **keepRunning**? : *undefined | false | true*

Defined in debugger/src/vscode/protocol.ts:46

### `Optional` onChange

• **onChange**? : *undefined | string*

Defined in debugger/src/vscode/protocol.ts:60

### `Optional` open

• **open**? : *boolean | string*

Defined in debugger/src/vscode/protocol.ts:47

### `Optional` preset

• **preset**? : *string | boolean*

Defined in debugger/src/vscode/protocol.ts:38

### `Optional` reconnectTimeout

• **reconnectTimeout**? : *undefined | number*

Defined in debugger/src/vscode/protocol.ts:55

### `Optional` reuse

• **reuse**? : *undefined | false | true*

Defined in debugger/src/vscode/protocol.ts:39

### `Optional` runtime

• **runtime**? : *undefined | string*

Defined in debugger/src/vscode/protocol.ts:58

### `Optional` stopOnEntry

• **stopOnEntry**? : *undefined | false | true*

Defined in debugger/src/vscode/protocol.ts:34

### `Optional` stopOnExit

• **stopOnExit**? : *undefined | false | true*

Defined in debugger/src/vscode/protocol.ts:35

### `Optional` timeTravel

• **timeTravel**? : *undefined | false | true*

Defined in debugger/src/vscode/protocol.ts:44

### `Optional` timeTravelDisabled

• **timeTravelDisabled**? : *undefined | false | true*

Defined in debugger/src/vscode/protocol.ts:45

### `Optional` verbose

• **verbose**? : *undefined | false | true*

Defined in debugger/src/vscode/protocol.ts:36

###  BreakpointInfo

Ƭ **BreakpointInfo**: *SourceBreakpoint & Breakpoint*

Defined in debugger/src/vscode/protocol.ts:23
