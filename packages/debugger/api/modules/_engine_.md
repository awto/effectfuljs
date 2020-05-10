[@effectful/debugger](../README.md) › ["engine"](_engine_.md)

# Module: "engine"

## Index

### References

* [del](_engine_.md#del)
* [gdel](_engine_.md#gdel)
* [gset](_engine_.md#gset)
* [ldel](_engine_.md#ldel)
* [lset](_engine_.md#lset)
* [set](_engine_.md#set)

### Classes

* [ArgsTraps](../classes/_engine_.argstraps.md)

### Interfaces

* [CjsModule](../interfaces/_engine_.cjsmodule.md)

### Variables

* [Map](_engine_.md#const-map)
* [SavedFunction](_engine_.md#const-savedfunction)
* [asap](_engine_.md#const-asap)
* [clos](_engine_.md#const-clos)
* [context](_engine_.md#context)
* [curModule](_engine_.md#let-curmodule)
* [dataSymbol](_engine_.md#datasymbol)
* [defineProperty](_engine_.md#const-defineproperty)
* [evalCnt](_engine_.md#let-evalcnt)
* [forInIterator](_engine_.md#const-foriniterator)
* [frame](_engine_.md#const-frame)
* [functionConstrMemo](_engine_.md#const-functionconstrmemo)
* [globalNS](_engine_.md#const-globalns)
* [indirMemo](_engine_.md#const-indirmemo)
* [journal](_engine_.md#journal)
* [locationRE](_engine_.md#const-locationre)
* [metaCount](_engine_.md#let-metacount)
* [moduleChanged](_engine_.md#let-modulechanged)
* [objectValues](_engine_.md#const-objectvalues)
* [recordFrame](_engine_.md#const-recordframe)
* [savedApply](_engine_.md#const-savedapply)
* [savedCall](_engine_.md#const-savedcall)
* [savedEval](_engine_.md#const-savedeval)
* [savedToString](_engine_.md#const-savedtostring)
* [threadScheduled](_engine_.md#let-threadscheduled)
* [token](_engine_.md#token)
* [undefLoc](_engine_.md#const-undefloc)

### Functions

* [FunctionConstr](_engine_.md#const-functionconstr)
* [argsWrap](_engine_.md#argswrap)
* [brk](_engine_.md#brk)
* [buildScope](_engine_.md#buildscope)
* [byLine](_engine_.md#byline)
* [checkErrBrk](_engine_.md#checkerrbrk)
* [checkExitBrk](_engine_.md#checkexitbrk)
* [compileEval](_engine_.md#compileeval)
* [compileEvalToString](_engine_.md#compileevaltostring)
* [compileModule](_engine_.md#compilemodule)
* [copyScope](_engine_.md#copyscope)
* [defaultApply](_engine_.md#defaultapply)
* [defaultCall](_engine_.md#defaultcall)
* [evalAt](_engine_.md#evalat)
* [execModule](_engine_.md#execmodule)
* [force](_engine_.md#force)
* [fun](_engine_.md#fun)
* [getCurModule](_engine_.md#getcurmodule)
* [handle](_engine_.md#handle)
* [hasEH](_engine_.md#haseh)
* [hasLine](_engine_.md#hasline)
* [indirEval](_engine_.md#indireval)
* [isDelayedResult](_engine_.md#isdelayedresult)
* [iterErr](_engine_.md#itererr)
* [iterErrUndef](_engine_.md#itererrundef)
* [iterFin](_engine_.md#iterfin)
* [iterNext](_engine_.md#iternext)
* [iterator](_engine_.md#iterator)
* [iteratorM](_engine_.md#iteratorm)
* [liftSync](_engine_.md#liftsync)
* [location](_engine_.md#location)
* [loop](_engine_.md#loop)
* [makeFrame](_engine_.md#makeframe)
* [mcall](_engine_.md#mcall)
* [module](_engine_.md#module)
* [popFrame](_engine_.md#popframe)
* [popScope](_engine_.md#popscope)
* [pushFrame](_engine_.md#pushframe)
* [pushScope](_engine_.md#pushscope)
* [raise](_engine_.md#raise)
* [reset](_engine_.md#reset)
* [resume](_engine_.md#resume)
* [resumeLocal](_engine_.md#resumelocal)
* [ret](_engine_.md#ret)
* [retModule](_engine_.md#retmodule)
* [signalThread](_engine_.md#signalthread)
* [step](_engine_.md#step)
* [strLoc](_engine_.md#strloc)
* [then](_engine_.md#then)
* [unhandled](_engine_.md#unhandled)
* [wrapBuiltinFunc](_engine_.md#wrapbuiltinfunc)

### Object literals

* [parentTag](_engine_.md#const-parenttag)

## References

###  del

• **del**:

___

###  gdel

• **gdel**:

___

###  gset

• **gset**:

___

###  ldel

• **ldel**:

___

###  lset

• **lset**:

___

###  set

• **set**:

## Variables

### `Const` Map

• **Map**: *MapConstructor* = saved.Map

Defined in debugger/src/engine.ts:41

___

### `Const` SavedFunction

• **SavedFunction**: *FunctionConstructor* = State.saved.Function

Defined in debugger/src/engine.ts:46

___

### `Const` asap

• **asap**: *any* = require("asap")

Defined in debugger/src/engine.ts:39

___

### `Const` clos

• **clos**: *any* = config.persistState
  ? function clos(parent: Frame | null, meta: FunctionDescr, closure: any) {
      /*defineProperty(closure, "call", {
      configurable: true,
      value: defaultCall
    });
    defineProperty(closure, "apply", {
      configurable: true,
      value: defaultApply
    });
    defineProperty(closure, dataSymbol, {
      configurable: true,
      value: { meta, parent, $: parent && parent.$ }
    });
    defineProperty(closure, S.descriptorSymbol, {
      configurable: true,
      value: (<any>meta).descriptor
    });*/
      closure.call = defaultCall;
      closure.apply = defaultApply;
      closure[dataSymbol] = { meta, parent, $: parent && parent.$ };
      closure[S.descriptorSymbol] = (<any>meta).descriptor;
      return closure;
    }
  : function clos(parent: Frame | null, meta: FunctionDescr, closure: any) {
      closure.call = defaultCall;
      closure.apply = defaultApply;
      closure[dataSymbol] = { meta, parent, $: parent && parent.$ };
      return closure;
    }

Defined in debugger/src/engine.ts:427

___

###  context

• **context**: *[State](../interfaces/_state_.state.md)*

Defined in debugger/src/engine.ts:45

___

### `Let` curModule

• **curModule**: *[Module](../interfaces/_state_.module.md)* = undefined as any

Defined in debugger/src/engine.ts:52

___

###  dataSymbol

• **dataSymbol**: *symbol*

Defined in debugger/src/engine.ts:45

___

### `Const` defineProperty

• **defineProperty**: *defineProperty* = saved.Object.defineProperty

Defined in debugger/src/engine.ts:49

___

### `Let` evalCnt

• **evalCnt**: *number* = 0

Defined in debugger/src/engine.ts:713

___

### `Const` forInIterator

• **forInIterator**: *[forInIterator](_state_.md#foriniterator)* = config.timeTravel
  ? TTCore.forInIterator
  : State.forInIterator

Defined in debugger/src/engine.ts:1079

___

### `Const` frame

• **frame**: *function* = config.timeTravel
  ? function frame(closure: any, newTarget: any): any {
      const top = context.top;
      recordFrame(top);
      return pushFrame(makeFrame(closure, newTarget));
    }
  : function frame(closure: any, newTarget: any) {
      return pushFrame(makeFrame(closure, newTarget));
    }

Defined in debugger/src/engine.ts:979

#### Type declaration:

▸ (`closure`: any, `newTarget`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`closure` | any |
`newTarget` | any |

___

### `Const` functionConstrMemo

• **functionConstrMemo**: *[Map](_engine_.md#const-map)‹string, object›* = new saved.Map<string, FunctionDescr>()

Defined in debugger/src/engine.ts:787

___

### `Const` globalNS

• **globalNS**: *string* = config.globalNS

Defined in debugger/src/engine.ts:43

___

### `Const` indirMemo

• **indirMemo**: *[Map](_engine_.md#const-map)‹string, string›* = new saved.Map<string, string>()

Defined in debugger/src/engine.ts:715

___

###  journal

• **journal**: *[Journal](../interfaces/_state_.journal.md)*

Defined in debugger/src/engine.ts:45

___

### `Const` locationRE

• **locationRE**: *RegExp‹›* = /^(\d+):(\d+)-(\d+):(\d+)$/

Defined in debugger/src/engine.ts:699

___

### `Let` metaCount

• **metaCount**: *number* = 0

Defined in debugger/src/engine.ts:192

___

### `Let` moduleChanged

• **moduleChanged**: *boolean* = false

Defined in debugger/src/engine.ts:53

___

### `Const` objectValues

• **objectValues**: *values* = Object.values

Defined in debugger/src/engine.ts:84

___

### `Const` recordFrame

• **recordFrame**: *[recordFrame](_engine_.md#const-recordframe)* = config.timeTravel
  ? function recordFrame(top: Frame | null) {
      if (top && journal.enabled) TT.recordFrame(top);
    }
  : function recordFrame() {}

Defined in debugger/src/engine.ts:55

___

### `Const` savedApply

• **savedApply**: *apply* = State.saved.FunctionMethods.apply

Defined in debugger/src/engine.ts:47

___

### `Const` savedCall

• **savedCall**: *call* = State.saved.FunctionMethods.call

Defined in debugger/src/engine.ts:48

___

### `Const` savedEval

• **savedEval**: *eval* = eval

Defined in debugger/src/engine.ts:789

___

### `Const` savedToString

• **savedToString**: *toString* = Function.prototype.toString

Defined in debugger/src/engine.ts:50

___

### `Let` threadScheduled

• **threadScheduled**: *boolean* = false

Defined in debugger/src/engine.ts:458

___

###  token

• **token**: *object*

Defined in debugger/src/engine.ts:45

#### Type declaration:

* **_effectToken**: *boolean* = true

___

### `Const` undefLoc

• **undefLoc**: *number[]* = [0, 0, 0, 0]

Defined in debugger/src/engine.ts:701

## Functions

### `Const` FunctionConstr

▸ **FunctionConstr**(...`args`: any[]): *any*

Defined in debugger/src/engine.ts:791

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *any*

___

###  argsWrap

▸ **argsWrap**<**T**>(`frame`: [Frame](../interfaces/_state_.frame.md), `value`: Iterable‹T›): *T[]*

Defined in debugger/src/engine.ts:124

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [Frame](../interfaces/_state_.frame.md) |
`value` | Iterable‹T› |

**Returns:** *T[]*

___

###  brk

▸ **brk**(): *any*

Defined in debugger/src/engine.ts:1043

**Returns:** *any*

___

###  buildScope

▸ **buildScope**(`scope`: [Scope](_state_.md#scope), `parent`: object): *[ScopeInfo](../interfaces/_state_.scopeinfo.md)*

Defined in debugger/src/engine.ts:406

**Parameters:**

Name | Type |
------ | ------ |
`scope` | [Scope](_state_.md#scope) |
`parent` | object |

**Returns:** *[ScopeInfo](../interfaces/_state_.scopeinfo.md)*

___

###  byLine

▸ **byLine**(`a`: [Brk](../interfaces/_state_.brk.md), `b`: [Brk](../interfaces/_state_.brk.md)): *number*

Defined in debugger/src/engine.ts:391

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Brk](../interfaces/_state_.brk.md) |
`b` | [Brk](../interfaces/_state_.brk.md) |

**Returns:** *number*

___

###  checkErrBrk

▸ **checkErrBrk**(`frame`: [Frame](../interfaces/_state_.frame.md), `e`: any): *boolean*

Defined in debugger/src/engine.ts:613

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [Frame](../interfaces/_state_.frame.md) |
`e` | any |

**Returns:** *boolean*

___

###  checkExitBrk

▸ **checkExitBrk**(`top`: [Frame](../interfaces/_state_.frame.md), `value`: any): *void*

Defined in debugger/src/engine.ts:989

**Parameters:**

Name | Type |
------ | ------ |
`top` | [Frame](../interfaces/_state_.frame.md) |
`value` | any |

**Returns:** *void*

___

###  compileEval

▸ **compileEval**(`code`: string, `mod`: [Module](../interfaces/_state_.module.md) | null, `evalContext`: object | null, `scopeDepth`: number | null, `blackbox`: boolean, `params`: string[] | null, `id?`: undefined | number): *[FunctionDescr](_state_.md#functiondescr)*

Defined in debugger/src/engine.ts:849

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |
`mod` | [Module](../interfaces/_state_.module.md) &#124; null |
`evalContext` | object &#124; null |
`scopeDepth` | number &#124; null |
`blackbox` | boolean |
`params` | string[] &#124; null |
`id?` | undefined &#124; number |

**Returns:** *[FunctionDescr](_state_.md#functiondescr)*

___

###  compileEvalToString

▸ **compileEvalToString**(`code`: string, `params`: string[] | null): *string*

Defined in debugger/src/engine.ts:722

Like `compileEval` but returns a self-sufficient string, which can be
passed to, say, "vm". However, it doesn't memoize meta-data construction
(like `compileEval` does) though.

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |
`params` | string[] &#124; null |

**Returns:** *string*

___

###  compileModule

▸ **compileModule**(): *[Module](../interfaces/_state_.module.md) | null*

Defined in debugger/src/engine.ts:86

**Returns:** *[Module](../interfaces/_state_.module.md) | null*

___

###  copyScope

▸ **copyScope**(): *any[]*

Defined in debugger/src/engine.ts:494

**Returns:** *any[]*

___

###  defaultApply

▸ **defaultApply**(`this`: any): *any*

Defined in debugger/src/engine.ts:469

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *any*

___

###  defaultCall

▸ **defaultCall**(`this`: any): *any*

Defined in debugger/src/engine.ts:476

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *any*

___

###  evalAt

▸ **evalAt**(`src`: string): *any*

Defined in debugger/src/engine.ts:674

**Parameters:**

Name | Type |
------ | ------ |
`src` | string |

**Returns:** *any*

___

###  execModule

▸ **execModule**(): *any*

Defined in debugger/src/engine.ts:773

executes a top level function for a current module
this is an API required for `compileEvalToString`

**Returns:** *any*

___

###  force

▸ **force**(`value`: any): *any*

Defined in debugger/src/engine.ts:1148

if `value` is a lazy thunk it is executed and its result is returned
otherwise `value` is returned as is

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *any*

___

###  fun

▸ **fun**(`name`: string, `origName`: string | null, `calleeName`: number | null, `parentConstr`: function | null, `params`: string[], `localsNum`: number, `varsNum`: number, `loc`: string | null, `flags`: number, `handler`: function, `errHandler`: [StateMap](_state_.md#statemap), `finHandler`: [StateMap](_state_.md#statemap), `scopeDepth`: number, `states`: [States](_state_.md#states)): *function*

Defined in debugger/src/engine.ts:196

**Parameters:**

▪ **name**: *string*

▪ **origName**: *string | null*

▪ **calleeName**: *number | null*

▪ **parentConstr**: *function | null*

▪ **params**: *string[]*

▪ **localsNum**: *number*

▪ **varsNum**: *number*

▪ **loc**: *string | null*

▪ **flags**: *number*

▪ **handler**: *function*

▸ (`this`: any, `p`: any): *any | string*

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |
`p` | any |

▪ **errHandler**: *[StateMap](_state_.md#statemap)*

▪ **finHandler**: *[StateMap](_state_.md#statemap)*

▪ **scopeDepth**: *number*

▪ **states**: *[States](_state_.md#states)*

**Returns:** *function*

▸ (`this`: any, ...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |
`...args` | any[] |

___

###  getCurModule

▸ **getCurModule**(): *[Module](../interfaces/_state_.module.md)*

Defined in debugger/src/engine.ts:120

**Returns:** *[Module](../interfaces/_state_.module.md)*

___

###  handle

▸ **handle**(`frame`: [Frame](../interfaces/_state_.frame.md), `e`: any): *any*

Defined in debugger/src/engine.ts:646

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [Frame](../interfaces/_state_.frame.md) |
`e` | any |

**Returns:** *any*

___

###  hasEH

▸ **hasEH**(`frame`: [Frame](../interfaces/_state_.frame.md)): *boolean*

Defined in debugger/src/engine.ts:609

checks if the current frame's state has an exception handler

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [Frame](../interfaces/_state_.frame.md) |

**Returns:** *boolean*

___

###  hasLine

▸ **hasLine**(`b`: [Brk](../interfaces/_state_.brk.md)): *boolean*

Defined in debugger/src/engine.ts:387

**Parameters:**

Name | Type |
------ | ------ |
`b` | [Brk](../interfaces/_state_.brk.md) |

**Returns:** *boolean*

___

###  indirEval

▸ **indirEval**(`code`: string): *any*

Defined in debugger/src/engine.ts:833

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |

**Returns:** *any*

___

###  isDelayedResult

▸ **isDelayedResult**(`value`: any): *boolean*

Defined in debugger/src/engine.ts:922

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

___

###  iterErr

▸ **iterErr**(`iter`: any, `reason`: any): *any*

Defined in debugger/src/engine.ts:1126

**Parameters:**

Name | Type |
------ | ------ |
`iter` | any |
`reason` | any |

**Returns:** *any*

___

###  iterErrUndef

▸ **iterErrUndef**(): *TypeError*

Defined in debugger/src/engine.ts:1131

**Returns:** *TypeError*

___

###  iterFin

▸ **iterFin**(`iter`: any, `value`: any): *any*

Defined in debugger/src/engine.ts:1135

**Parameters:**

Name | Type |
------ | ------ |
`iter` | any |
`value` | any |

**Returns:** *any*

___

###  iterNext

▸ **iterNext**(`iter`: any, `value`: any): *any*

Defined in debugger/src/engine.ts:1140

**Parameters:**

Name | Type |
------ | ------ |
`iter` | any |
`value` | any |

**Returns:** *any*

___

###  iterator

▸ **iterator**<**T**>(`v`: Iterable‹T›): *Iterator‹T, any, undefined›*

Defined in debugger/src/engine.ts:1069

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`v` | Iterable‹T› |

**Returns:** *Iterator‹T, any, undefined›*

___

###  iteratorM

▸ **iteratorM**<**T**>(`v`: AsyncIterable‹T›): *any*

Defined in debugger/src/engine.ts:1073

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`v` | AsyncIterable‹T› |

**Returns:** *any*

___

###  liftSync

▸ **liftSync**(`fun`: function): *any*

Defined in debugger/src/engine.ts:1094

**Parameters:**

▪ **fun**: *function*

▸ (`this`: any, ...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |
`...args` | any[] |

**Returns:** *any*

___

###  location

▸ **location**(`str`: string): *number[]*

Defined in debugger/src/engine.ts:704

parses location string into a tuple with a line, a column, a last last and a last column

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *number[]*

___

###  loop

▸ **loop**(`value`: any): *any*

Defined in debugger/src/engine.ts:535

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *any*

___

###  makeFrame

▸ **makeFrame**(`closure`: any, `newTarget`: any): *[Frame](../interfaces/_state_.frame.md)*

Defined in debugger/src/engine.ts:926

**Parameters:**

Name | Type |
------ | ------ |
`closure` | any |
`newTarget` | any |

**Returns:** *[Frame](../interfaces/_state_.frame.md)*

___

###  mcall

▸ **mcall**(`prop`: string, ...`args`: [any, any]): *any*

Defined in debugger/src/engine.ts:504

**Parameters:**

Name | Type |
------ | ------ |
`prop` | string |
`...args` | [any, any] |

**Returns:** *any*

___

###  module

▸ **module**(`this`: any, `modName`: string | number, `evalContext`: object | undefined, `cjs`: [CjsModule](../interfaces/_engine_.cjsmodule.md) | undefined, `require`: any, `safePrefix`: string, `closSyms`: object, `params`: object | null): *[Module](../interfaces/_state_.module.md)*

Defined in debugger/src/engine.ts:142

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |
`modName` | string &#124; number |
`evalContext` | object &#124; undefined |
`cjs` | [CjsModule](../interfaces/_engine_.cjsmodule.md) &#124; undefined |
`require` | any |
`safePrefix` | string |
`closSyms` | object |
`params` | object &#124; null |

**Returns:** *[Module](../interfaces/_state_.module.md)*

___

###  popFrame

▸ **popFrame**(`top`: [Frame](../interfaces/_state_.frame.md)): *void*

Defined in debugger/src/engine.ts:973

**Parameters:**

Name | Type |
------ | ------ |
`top` | [Frame](../interfaces/_state_.frame.md) |

**Returns:** *void*

___

###  popScope

▸ **popScope**(): *any*

Defined in debugger/src/engine.ts:499

**Returns:** *any*

___

###  pushFrame

▸ **pushFrame**(`frame`: [Frame](../interfaces/_state_.frame.md)): *any*

Defined in debugger/src/engine.ts:959

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [Frame](../interfaces/_state_.frame.md) |

**Returns:** *any*

___

###  pushScope

▸ **pushScope**(`varsNum`: number): *any[]*

Defined in debugger/src/engine.ts:487

**Parameters:**

Name | Type |
------ | ------ |
`varsNum` | number |

**Returns:** *any[]*

___

###  raise

▸ **raise**(`e`: any): *void*

Defined in debugger/src/engine.ts:1106

**Parameters:**

Name | Type |
------ | ------ |
`e` | any |

**Returns:** *void*

___

###  reset

▸ **reset**(): *void*

Defined in debugger/src/engine.ts:1116

resets module's states (for tests)

**Returns:** *void*

___

###  resume

▸ **resume**(`frame`: [Frame](../interfaces/_state_.frame.md), `e`: any): *any*

Defined in debugger/src/engine.ts:585

resumes execution of the current stack

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [Frame](../interfaces/_state_.frame.md) |
`e` | any |

**Returns:** *any*

___

###  resumeLocal

▸ **resumeLocal**(`frame`: [Frame](../interfaces/_state_.frame.md), `e`: any): *any*

Defined in debugger/src/engine.ts:597

like `resume` but appends the frame to the current stack

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [Frame](../interfaces/_state_.frame.md) |
`e` | any |

**Returns:** *any*

___

###  ret

▸ **ret**(`value`: any): *any*

Defined in debugger/src/engine.ts:1012

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *any*

___

###  retModule

▸ **retModule**(): *any*

Defined in debugger/src/engine.ts:782

returns a top level function for a current module
this is an API required for `compileEvalToString`

**Returns:** *any*

___

###  signalThread

▸ **signalThread**(): *void*

Defined in debugger/src/engine.ts:459

**Returns:** *void*

___

###  step

▸ **step**(): *any*

Defined in debugger/src/engine.ts:516

runs a computation until it encounters some breakpoint (returns `token)
or finishes the whole computation (returns the resulting value or throws an exception)

**Returns:** *any*

___

###  strLoc

▸ **strLoc**(`line?`: undefined | number, `column?`: undefined | number, `endLine?`: undefined | number, `endColumn?`: undefined | number): *string*

Defined in debugger/src/engine.ts:395

**Parameters:**

Name | Type |
------ | ------ |
`line?` | undefined &#124; number |
`column?` | undefined &#124; number |
`endLine?` | undefined &#124; number |
`endColumn?` | undefined &#124; number |

**Returns:** *string*

___

###  then

▸ **then**(`p`: Promise‹any›, `onResolve`: function, `onReject?`: undefined | function): *any*

Defined in debugger/src/engine.ts:1083

**Parameters:**

▪ **p**: *Promise‹any›*

▪ **onResolve**: *function*

▸ (`value`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

▪`Optional`  **onReject**: *undefined | function*

**Returns:** *any*

___

###  unhandled

▸ **unhandled**(`e`: any): *void*

Defined in debugger/src/engine.ts:1029

**Parameters:**

Name | Type |
------ | ------ |
`e` | any |

**Returns:** *void*

___

###  wrapBuiltinFunc

▸ **wrapBuiltinFunc**(`func`: any): *any*

Defined in debugger/src/engine.ts:481

**Parameters:**

Name | Type |
------ | ------ |
`func` | any |

**Returns:** *any*

## Object literals

### `Const` parentTag

### ▪ **parentTag**: *object*

Defined in debugger/src/engine.ts:194

###  _parentTag

• **_parentTag**: *boolean* = true

Defined in debugger/src/engine.ts:194
