[@effectful/debugger](../README.md) › ["vscode/handlers"](_vscode_handlers_.md)

# Module: "vscode/handlers"

## Index

### Namespaces

* ["../state"](_vscode_handlers_.md#../state)
* ["../timeTravel/core"](_vscode_handlers_.md#../timetravel/core)
* ["./protocol"](_vscode_handlers_.md#./protocol)

### Interfaces

* [Location](../interfaces/_vscode_handlers_.location.md)
* [VarValue](../interfaces/_vscode_handlers_.varvalue.md)

### Variables

* [LOGMESSAGE_VARIABLE_REGEXP](_vscode_handlers_.md#const-logmessage_variable_regexp)
* [Map](_vscode_handlers_.md#const-map)
* [RESTART_ON_CHANGE_TIMEOUT](_vscode_handlers_.md#const-restart_on_change_timeout)
* [Set](_vscode_handlers_.md#const-set)
* [assign](_vscode_handlers_.md#assign)
* [backward](_vscode_handlers_.md#let-backward)
* [brkFrame](_vscode_handlers_.md#let-brkframe)
* [brkNext](_vscode_handlers_.md#let-brknext)
* [brkOut](_vscode_handlers_.md#let-brkout)
* [colStartAt1](_vscode_handlers_.md#let-colstartat1)
* [context](_vscode_handlers_.md#context)
* [curDirSep](_vscode_handlers_.md#let-curdirsep)
* [curIdByVal](_vscode_handlers_.md#const-curidbyval)
* [curValById](_vscode_handlers_.md#const-curvalbyid)
* [defineProperty](_vscode_handlers_.md#defineproperty)
* [entrySnapshot](_vscode_handlers_.md#let-entrysnapshot)
* [handlers](_vscode_handlers_.md#const-handlers)
* [isBrowser](_vscode_handlers_.md#const-isbrowser)
* [journal](_vscode_handlers_.md#journal)
* [knownBreakpoints](_vscode_handlers_.md#const-knownbreakpoints)
* [launchCb](_vscode_handlers_.md#let-launchcb)
* [launchPromise](_vscode_handlers_.md#let-launchpromise)
* [linStartAt1](_vscode_handlers_.md#let-linstartat1)
* [localConsole](_vscode_handlers_.md#const-localconsole)
* [patchedConsole](_vscode_handlers_.md#const-patchedconsole)
* [pauseNext](_vscode_handlers_.md#let-pausenext)
* [reason](_vscode_handlers_.md#let-reason)
* [restartTimeout](_vscode_handlers_.md#let-restarttimeout)
* [runningTrace](_vscode_handlers_.md#let-runningtrace)
* [saveFlags](_vscode_handlers_.md#const-saveflags)
* [sources](_vscode_handlers_.md#const-sources)
* [step](_vscode_handlers_.md#const-step)
* [stepCount](_vscode_handlers_.md#let-stepcount)
* [stepIn](_vscode_handlers_.md#let-stepin)
* [sysConsole](_vscode_handlers_.md#const-sysconsole)
* [toLocal](_vscode_handlers_.md#const-tolocal)
* [varCount](_vscode_handlers_.md#let-varcount)
* [variablesSym](_vscode_handlers_.md#const-variablessym)

### Functions

* [adjCol](_vscode_handlers_.md#adjcol)
* [adjLine](_vscode_handlers_.md#adjline)
* [capture](_vscode_handlers_.md#capture)
* [checkPause](_vscode_handlers_.md#checkpause)
* [checkTimeTravelEnabled](_vscode_handlers_.md#checktimetravelenabled)
* [compileEval](_vscode_handlers_.md#compileeval)
* [cont](_vscode_handlers_.md#cont)
* [defaultNeedsBreak](_vscode_handlers_.md#defaultneedsbreak)
* [dispatch](_vscode_handlers_.md#dispatch)
* [event](_vscode_handlers_.md#event)
* [firstActiveFrame](_vscode_handlers_.md#firstactiveframe)
* [getFrame](_vscode_handlers_.md#getframe)
* [getLocation](_vscode_handlers_.md#getlocation)
* [getSource](_vscode_handlers_.md#getsource)
* [interruptibleStep](_vscode_handlers_.md#interruptiblestep)
* [logMessageToExpression](_vscode_handlers_.md#logmessagetoexpression)
* [newVarRef](_vscode_handlers_.md#newvarref)
* [nextFrame](_vscode_handlers_.md#nextframe)
* [normalizeDir](_vscode_handlers_.md#let-normalizedir)
* [onEntry](_vscode_handlers_.md#onentry)
* [output](_vscode_handlers_.md#output)
* [pause](_vscode_handlers_.md#pause)
* [reset](_vscode_handlers_.md#reset)
* [resetLoad](_vscode_handlers_.md#resetload)
* [resetScopes](_vscode_handlers_.md#resetscopes)
* [response](_vscode_handlers_.md#response)
* [restart](_vscode_handlers_.md#restart)
* [restore](_vscode_handlers_.md#restore)
* [run](_vscode_handlers_.md#run)
* [send](_vscode_handlers_.md#send)
* [setBreakpoints](_vscode_handlers_.md#setbreakpoints)
* [setDirSep](_vscode_handlers_.md#setdirsep)
* [setExceptionBreakpoints](_vscode_handlers_.md#setexceptionbreakpoints)
* [signalStopped](_vscode_handlers_.md#signalstopped)
* [trace](_vscode_handlers_.md#trace)
* [varValue](_vscode_handlers_.md#varvalue)

### Object literals

* [globalScope](_vscode_handlers_.md#const-globalscope)

## Namespaces

###  "../state"

• **"../state"**:

Defined in debugger/src/vscode/handlers.ts:20

###  Module

• **Module**:

Defined in debugger/src/vscode/handlers.ts:21

### `Optional` breakpoints

• **breakpoints**? : *[Brk](../interfaces/_state_.brk.md)[]*

Defined in debugger/src/vscode/handlers.ts:23

### `Optional` debuggerSource

• **debuggerSource**? : *P.Source*

Defined in debugger/src/vscode/handlers.ts:22

### `Optional` functionsSorted

• **functionsSorted**? : *[NonBlackboxFunctionDescr](_state_.md#nonblackboxfunctiondescr)[]*

Defined in debugger/src/vscode/handlers.ts:24

___

###  "../timeTravel/core"

• **"../timeTravel/core"**:

Defined in debugger/src/vscode/handlers.ts:28

###  Snapshot

• **Snapshot**:

Defined in debugger/src/vscode/handlers.ts:29

### `Optional` context

• **context**? : *State.Job*

Defined in debugger/src/vscode/handlers.ts:30

___

###  "./protocol"

• **"./protocol"**:

Defined in debugger/src/vscode/handlers.ts:34

###  DebugProtocol

• **DebugProtocol**:

Defined in debugger/src/vscode/handlers.ts:35

###  Response

• **Response**:

Defined in debugger/src/vscode/handlers.ts:36

### `Optional` sent

• **sent**? : *undefined | false | true*

Defined in debugger/src/vscode/handlers.ts:37

## Variables

### `Const` LOGMESSAGE_VARIABLE_REGEXP

• **LOGMESSAGE_VARIABLE_REGEXP**: *RegExp‹›* = /{(.*?)}/g

Defined in debugger/src/vscode/handlers.ts:1089

___

### `Const` Map

• **Map**: *MapConstructor* = State.saved.Map

Defined in debugger/src/vscode/handlers.ts:18

___

### `Const` RESTART_ON_CHANGE_TIMEOUT

• **RESTART_ON_CHANGE_TIMEOUT**: *0 | 500* = isBrowser ? 500 : 0

Defined in debugger/src/vscode/handlers.ts:233

___

### `Const` Set

• **Set**: *SetConstructor* = State.saved.Set

Defined in debugger/src/vscode/handlers.ts:17

___

###  assign

• **assign**: *assign*

Defined in debugger/src/vscode/handlers.ts:15

___

### `Let` backward

• **backward**: *boolean* = false

Defined in debugger/src/vscode/handlers.ts:63

___

### `Let` brkFrame

• **brkFrame**: *[Frame](../interfaces/_state_.frame.md) | null* = null

Defined in debugger/src/vscode/handlers.ts:75

saving break frame for async functions which may
be removed from the stack already
TODO: implement this in the engine

___

### `Let` brkNext

• **brkNext**: *[Frame](../interfaces/_state_.frame.md) | null* = null

Defined in debugger/src/vscode/handlers.ts:59

___

### `Let` brkOut

• **brkOut**: *[Frame](../interfaces/_state_.frame.md) | null* = null

Defined in debugger/src/vscode/handlers.ts:60

___

### `Let` colStartAt1

• **colStartAt1**: *boolean* = true

Defined in debugger/src/vscode/handlers.ts:350

___

###  context

• **context**: *[State](../interfaces/_state_.state.md)*

Defined in debugger/src/vscode/handlers.ts:43

___

### `Let` curDirSep

• **curDirSep**: *string* = path.sep

Defined in debugger/src/vscode/handlers.ts:79

___

### `Const` curIdByVal

• **curIdByVal**: *[Map](_engine_.md#const-map)‹any, any›* = new Map()

Defined in debugger/src/vscode/handlers.ts:442

___

### `Const` curValById

• **curValById**: *[Map](_engine_.md#const-map)‹any, any›* = new Map()

Defined in debugger/src/vscode/handlers.ts:441

___

###  defineProperty

• **defineProperty**: *defineProperty*

Defined in debugger/src/vscode/handlers.ts:15

___

### `Let` entrySnapshot

• **entrySnapshot**: *any*

Defined in debugger/src/vscode/handlers.ts:313

___

### `Const` handlers

• **handlers**: *object*

Defined in debugger/src/vscode/handlers.ts:220

#### Type declaration:

* \[ **name**: *string*\]: function

▸ (`args`: any, `response`: P.Response): *void*

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |
`response` | P.Response |

___

### `Const` isBrowser

• **isBrowser**: *boolean* = typeof window !== "undefined"

Defined in debugger/src/vscode/handlers.ts:64

___

###  journal

• **journal**: *[Journal](../interfaces/_state_.journal.md)*

Defined in debugger/src/vscode/handlers.ts:43

___

### `Const` knownBreakpoints

• **knownBreakpoints**: *[Map](_engine_.md#const-map)‹string, [Map](_engine_.md#const-map)‹number, SetBreakpointsArguments››* = new Map<
  string,
  Map<number, P.SetBreakpointsArguments>
>()

Defined in debugger/src/vscode/handlers.ts:80

___

### `Let` launchCb

• **launchCb**: *function | undefined*

Defined in debugger/src/vscode/handlers.ts:262

___

### `Let` launchPromise

• **launchPromise**: *Promise‹boolean›* = new Promise<boolean>(i => (launchCb = i))

Defined in debugger/src/vscode/handlers.ts:263

___

### `Let` linStartAt1

• **linStartAt1**: *boolean* = true

Defined in debugger/src/vscode/handlers.ts:349

___

### `Const` localConsole

• **localConsole**: *Console | object* = config.localConsole
  ? console
  : {
      log() {},
      error() {},
      warn() {},
      dir() {},
      group() {},
      groupCollapsed() {},
      groupEnd() {}
    }

Defined in debugger/src/vscode/handlers.ts:45

___

### `Const` patchedConsole

• **patchedConsole**: *any* = assign({}, console, {
  log(...args: any[]) {
    localConsole.log.apply(localConsole, <any>args);
    output("stdout", args);
  },
  error(...args: any) {
    localConsole.error.apply(localConsole, <any>args);
    output("stderr", args);
  },
  warn(...args: any) {
    localConsole.warn.apply(localConsole, <any>args);
    output("stderr", args);
  },
  info(...args: any[]) {
    localConsole.log.apply(localConsole, <any>args);
    output("stdout", args);
  },
  dir(arg: any) {
    localConsole.dir(arg);
    output("console", [], arg);
  },
  group(name: string) {
    if (localConsole.group) localConsole.group(name);
    output("stdout", [name], void 0, "start");
  },
  groupEnd() {
    if (localConsole.groupEnd) localConsole.groupEnd();
    output("stdout", [], void 0, "end");
  },
  groupCollapsed(name: string) {
    if (localConsole.groupCollapsed) localConsole.groupCollapsed(name);
    output("stdout", [name], void 0, "startCollapsed");
  }
})

Defined in debugger/src/vscode/handlers.ts:146

___

### `Let` pauseNext

• **pauseNext**: *boolean* = false

Defined in debugger/src/vscode/handlers.ts:62

___

### `Let` reason

• **reason**: *string | undefined*

Defined in debugger/src/vscode/handlers.ts:107

___

### `Let` restartTimeout

• **restartTimeout**: *any* = 0

Defined in debugger/src/vscode/handlers.ts:231

___

### `Let` runningTrace

• **runningTrace**: *boolean* = false

Defined in debugger/src/vscode/handlers.ts:108

___

### `Const` saveFlags

• **saveFlags**: *number* = State.BrkFlag.STMT | State.BrkFlag.DEBUGGER_STMT | State.BrkFlag.EXIT

Defined in debugger/src/vscode/handlers.ts:116

___

### `Const` sources

• **sources**: *[Map](_engine_.md#const-map)‹number, string›* = new Map<number, string>()

Defined in debugger/src/vscode/handlers.ts:1069

___

### `Const` step

• **step**: *function* = config.timeTravel
  ? function step() {
      if (backward || journal.future) {
        runningTrace = true;
        const iter = backward ? TT.undo : TT.redo;
        let lastBrk = context.brk;
        while (iter()) {
          const { top } = context;
          if (
            context.error &&
            Engine.checkErrBrk(<State.Frame>top, context.value)
          ) {
            reason = "exception";
            context.onStop();
            return;
          }
          const { brk } = context;
          if (brk === lastBrk) continue;
          lastBrk = brk;
          if (brk && top && (reason = checkPause(brk, top)) != null) {
            context.onStop();
            return;
          }
        }
      }
      runningTrace = false;
      if (context.top) {
        if (backward) {
          reason = "entry";
          context.onStop();
        } else Engine.step();
      } else {
        event("continued", {});
        Engine.signalThread();
      }
    }
  : Engine.step

Defined in debugger/src/vscode/handlers.ts:707

#### Type declaration:

▸ (): *void*

___

### `Let` stepCount

• **stepCount**: *number* = 0

Defined in debugger/src/vscode/handlers.ts:690

___

### `Let` stepIn

• **stepIn**: *boolean* = false

Defined in debugger/src/vscode/handlers.ts:61

___

### `Const` sysConsole

• **sysConsole**: *Console* = console

Defined in debugger/src/vscode/handlers.ts:44

___

### `Const` toLocal

• **toLocal**: *[toLocal](_state_.md#tolocal)* = State.toLocal

Defined in debugger/src/vscode/handlers.ts:446

___

### `Let` varCount

• **varCount**: *number* = 100

Defined in debugger/src/vscode/handlers.ts:443

___

### `Const` variablesSym

• **variablesSym**: *unique symbol* = Symbol("@effectful/debugger/variables")

Defined in debugger/src/vscode/handlers.ts:466

## Functions

###  adjCol

▸ **adjCol**(`num`: number): *number*

Defined in debugger/src/vscode/handlers.ts:356

**Parameters:**

Name | Type |
------ | ------ |
`num` | number |

**Returns:** *number*

___

###  adjLine

▸ **adjLine**(`num`: number): *number*

Defined in debugger/src/vscode/handlers.ts:352

**Parameters:**

Name | Type |
------ | ------ |
`num` | number |

**Returns:** *number*

___

###  capture

▸ **capture**(`opts`: WriteOptions): *JSONObject*

Defined in debugger/src/vscode/handlers.ts:1123

Returns `JSON.stringify` serializable object with the whole
current execution state

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`opts` | WriteOptions | {} |

**Returns:** *JSONObject*

___

###  checkPause

▸ **checkPause**(`brk`: [Brk](../interfaces/_state_.brk.md), `top`: [Frame](../interfaces/_state_.frame.md)): *undefined | "pause" | "step" | "next" | "breakpoint" | "stepOut" | "debugger_statement" | "entry" | "interrupt"*

Defined in debugger/src/vscode/handlers.ts:650

**Parameters:**

Name | Type |
------ | ------ |
`brk` | [Brk](../interfaces/_state_.brk.md) |
`top` | [Frame](../interfaces/_state_.frame.md) |

**Returns:** *undefined | "pause" | "step" | "next" | "breakpoint" | "stepOut" | "debugger_statement" | "entry" | "interrupt"*

___

###  checkTimeTravelEnabled

▸ **checkTimeTravelEnabled**(`res`: P.Response): *boolean*

Defined in debugger/src/vscode/handlers.ts:794

**Parameters:**

Name | Type |
------ | ------ |
`res` | P.Response |

**Returns:** *boolean*

___

###  compileEval

▸ **compileEval**(`code`: string, `parentMeta`: State.FunctionDescr, `brk`: [Brk](../interfaces/_state_.brk.md)): *function*

Defined in debugger/src/vscode/handlers.ts:1037

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |
`parentMeta` | State.FunctionDescr |
`brk` | [Brk](../interfaces/_state_.brk.md) |

**Returns:** *function*

▸ (`f`: [Frame](../interfaces/_state_.frame.md)): *any*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [Frame](../interfaces/_state_.frame.md) |

___

###  cont

▸ **cont**(): *void*

Defined in debugger/src/vscode/handlers.ts:836

**Returns:** *void*

___

###  defaultNeedsBreak

▸ **defaultNeedsBreak**(`brk`: [Brk](../interfaces/_state_.brk.md), `top`: [Frame](../interfaces/_state_.frame.md)): *boolean*

Defined in debugger/src/vscode/handlers.ts:110

**Parameters:**

Name | Type |
------ | ------ |
`brk` | [Brk](../interfaces/_state_.brk.md) |
`top` | [Frame](../interfaces/_state_.frame.md) |

**Returns:** *boolean*

___

###  dispatch

▸ **dispatch**(`req`: P.Request): *void*

Defined in debugger/src/vscode/handlers.ts:224

**Parameters:**

Name | Type |
------ | ------ |
`req` | P.Request |

**Returns:** *void*

___

###  event

▸ **event**(`name`: string, `body`: any): *void*

Defined in debugger/src/vscode/handlers.ts:216

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`body` | any |

**Returns:** *void*

___

###  firstActiveFrame

▸ **firstActiveFrame**(`frame`: [Frame](../interfaces/_state_.frame.md) | null): *[Frame](../interfaces/_state_.frame.md) | null*

Defined in debugger/src/vscode/handlers.ts:193

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [Frame](../interfaces/_state_.frame.md) &#124; null |

**Returns:** *[Frame](../interfaces/_state_.frame.md) | null*

___

###  getFrame

▸ **getFrame**(`frameId`: number): *[Frame](../interfaces/_state_.frame.md) | null*

Defined in debugger/src/vscode/handlers.ts:381

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`frameId` | number | 0 |

**Returns:** *[Frame](../interfaces/_state_.frame.md) | null*

___

###  getLocation

▸ **getLocation**(`frameId`: number): *[Location](../interfaces/_vscode_handlers_.location.md)*

Defined in debugger/src/vscode/handlers.ts:391

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`frameId` | number | 0 |

**Returns:** *[Location](../interfaces/_vscode_handlers_.location.md)*

___

###  getSource

▸ **getSource**(`module`: [Module](../interfaces/_state_.module.md)): *undefined | Source*

Defined in debugger/src/vscode/handlers.ts:360

**Parameters:**

Name | Type |
------ | ------ |
`module` | [Module](../interfaces/_state_.module.md) |

**Returns:** *undefined | Source*

___

###  interruptibleStep

▸ **interruptibleStep**(): *void*

Defined in debugger/src/vscode/handlers.ts:776

**Returns:** *void*

___

###  logMessageToExpression

▸ **logMessageToExpression**(`msg`: string): *string*

Defined in debugger/src/vscode/handlers.ts:1091

**Parameters:**

Name | Type |
------ | ------ |
`msg` | string |

**Returns:** *string*

___

###  newVarRef

▸ **newVarRef**(): *number*

Defined in debugger/src/vscode/handlers.ts:454

**Returns:** *number*

___

###  nextFrame

▸ **nextFrame**(`frame`: [Frame](../interfaces/_state_.frame.md)): *[Frame](../interfaces/_state_.frame.md) | null*

Defined in debugger/src/vscode/handlers.ts:186

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [Frame](../interfaces/_state_.frame.md) |

**Returns:** *[Frame](../interfaces/_state_.frame.md) | null*

___

### `Let` normalizeDir

▸ **normalizeDir**(`v`: string): *string*

Defined in debugger/src/vscode/handlers.ts:77

**Parameters:**

Name | Type |
------ | ------ |
`v` | string |

**Returns:** *string*

___

###  onEntry

▸ **onEntry**(): *void*

Defined in debugger/src/vscode/handlers.ts:315

**Returns:** *void*

___

###  output

▸ **output**(`category`: string, `args`: any[], `value?`: any, `group?`: undefined | string): *void*

Defined in debugger/src/vscode/handlers.ts:128

**Parameters:**

Name | Type |
------ | ------ |
`category` | string |
`args` | any[] |
`value?` | any |
`group?` | undefined &#124; string |

**Returns:** *void*

___

###  pause

▸ **pause**(): *void*

Defined in debugger/src/vscode/handlers.ts:781

**Returns:** *void*

___

###  reset

▸ **reset**(): *void*

Defined in debugger/src/vscode/handlers.ts:611

**Returns:** *void*

___

###  resetLoad

▸ **resetLoad**(): *void*

Defined in debugger/src/vscode/handlers.ts:1110

the function is needed only for testing in same process

**Returns:** *void*

___

###  resetScopes

▸ **resetScopes**(): *void*

Defined in debugger/src/vscode/handlers.ts:458

**Returns:** *void*

___

###  response

▸ **response**(`request`: P.Request, `message?`: undefined | string): *object*

Defined in debugger/src/vscode/handlers.ts:198

**Parameters:**

Name | Type |
------ | ------ |
`request` | P.Request |
`message?` | undefined &#124; string |

**Returns:** *object*

* **command**: *string* = request.command

* **message**: *undefined | string*

* **request_seq**: *number* = request.seq

* **seq**: *number* = 0

* **success**: *boolean* = !message

* **type**: *string* = "response"

___

###  restart

▸ **restart**(): *void*

Defined in debugger/src/vscode/handlers.ts:320

**Returns:** *void*

___

###  restore

▸ **restore**(`json`: JSONObject, `opts`: ReadOptions): *void*

Defined in debugger/src/vscode/handlers.ts:1180

Restores execution state from an object previously returned by
`capture` the current state is discarded

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`json` | JSONObject | - |
`opts` | ReadOptions | {} |

**Returns:** *void*

___

###  run

▸ **run**(): *void*

Defined in debugger/src/vscode/handlers.ts:692

**Returns:** *void*

___

###  send

▸ **send**(`v`: P.Response): *void*

Defined in debugger/src/vscode/handlers.ts:209

**Parameters:**

Name | Type |
------ | ------ |
`v` | P.Response |

**Returns:** *void*

___

###  setBreakpoints

▸ **setBreakpoints**(`args`: any, `sourceUpdate?`: undefined | false | true): *any*

Defined in debugger/src/vscode/handlers.ts:876

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |
`sourceUpdate?` | undefined &#124; false &#124; true |

**Returns:** *any*

___

###  setDirSep

▸ **setDirSep**(`sep`: string | undefined): *void*

Defined in debugger/src/vscode/handlers.ts:85

**Parameters:**

Name | Type |
------ | ------ |
`sep` | string &#124; undefined |

**Returns:** *void*

___

###  setExceptionBreakpoints

▸ **setExceptionBreakpoints**(`args`: P.SetExceptionBreakpointsArguments): *void*

Defined in debugger/src/vscode/handlers.ts:988

**Parameters:**

Name | Type |
------ | ------ |
`args` | P.SetExceptionBreakpointsArguments |

**Returns:** *void*

___

###  signalStopped

▸ **signalStopped**(): *void*

Defined in debugger/src/vscode/handlers.ts:745

**Returns:** *void*

___

###  trace

▸ **trace**(...`args`: [any, any]): *void*

Defined in debugger/src/vscode/handlers.ts:66

**Parameters:**

Name | Type |
------ | ------ |
`...args` | [any, any] |

**Returns:** *void*

___

###  varValue

▸ **varValue**(`name`: string, `value`: any): *[VarValue](../interfaces/_vscode_handlers_.varvalue.md)*

Defined in debugger/src/vscode/handlers.ts:556

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`value` | any |

**Returns:** *[VarValue](../interfaces/_vscode_handlers_.varvalue.md)*

## Object literals

### `Const` globalScope

### ▪ **globalScope**: *object*

Defined in debugger/src/vscode/handlers.ts:448

###  expensive

• **expensive**: *boolean* = true

Defined in debugger/src/vscode/handlers.ts:451

###  name

• **name**: *string* = "Global"

Defined in debugger/src/vscode/handlers.ts:449

###  variablesReference

• **variablesReference**: *number* = State.toGlobal(1)

Defined in debugger/src/vscode/handlers.ts:450
