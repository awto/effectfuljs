[@effectful/debugger](../README.md) › ["state"](_state_.md)

# Module: "state"

## Index

### Enumerations

* [BrkFlag](../enums/_state_.brkflag.md)
* [Flag](../enums/_state_.flag.md)

### Classes

* [ForInIterator](../classes/_state_.foriniterator.md)

### Interfaces

* [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md)
* [Brk](../interfaces/_state_.brk.md)
* [Env](../interfaces/_state_.env.md)
* [Frame](../interfaces/_state_.frame.md)
* [GeneratorFrame](../interfaces/_state_.generatorframe.md)
* [IdsStore](../interfaces/_state_.idsstore.md)
* [Job](../interfaces/_state_.job.md)
* [Journal](../interfaces/_state_.journal.md)
* [Module](../interfaces/_state_.module.md)
* [Operation](../interfaces/_state_.operation.md)
* [ProtoFrame](../interfaces/_state_.protoframe.md)
* [Record](../interfaces/_state_.record.md)
* [ScopeInfo](../interfaces/_state_.scopeinfo.md)
* [State](../interfaces/_state_.state.md)

### Type aliases

* [FunctionDescr](_state_.md#functiondescr)
* [Handler](_state_.md#handler)
* [Item](_state_.md#item)
* [NonBlackboxFunctionDescr](_state_.md#nonblackboxfunctiondescr)
* [Scope](_state_.md#scope)
* [StateMap](_state_.md#statemap)
* [States](_state_.md#states)
* [VarInfo](_state_.md#varinfo)

### Variables

* [MAX_ID](_state_.md#const-max_id)
* [THREAD_BITS](_state_.md#const-thread_bits)
* [THREAD_MASK](_state_.md#const-thread_mask)
* [dataSymbol](_state_.md#const-datasymbol)
* [isWindows](_state_.md#const-iswindows)
* [normalizeDrive](_state_.md#const-normalizedrive)
* [normalizePath](_state_.md#const-normalizepath)
* [thunkSymbol](_state_.md#const-thunksymbol)

### Functions

* [defaultErrHandler](_state_.md#defaulterrhandler)
* [defaultFinHandler](_state_.md#defaultfinhandler)
* [forInIterator](_state_.md#foriniterator)
* [idsStore](_state_.md#idsstore)
* [nop](_state_.md#nop)
* [patchNative](_state_.md#patchnative)
* [toGlobal](_state_.md#toglobal)
* [toLocal](_state_.md#tolocal)
* [toThread](_state_.md#tothread)

### Object literals

* [context](_state_.md#const-context)
* [journal](_state_.md#const-journal)
* [saved](_state_.md#const-saved)
* [token](_state_.md#const-token)
* [undef](_state_.md#const-undef)

## Type aliases

###  FunctionDescr

Ƭ **FunctionDescr**: *object*

Defined in debugger/src/state.ts:154

function's description

#### Type declaration:

* **blackbox**: *boolean*

* **calleeName**: *number | null*

* **canSkip**: *boolean*

* **code**: *string*

* **column**? : *undefined | number*

* **constr**(): *function*

  * (`$$`: object): *any*

* **deps**: *[FunctionDescr](_state_.md#functiondescr)[]*

* **endColumn**? : *undefined | number*

* **endLine**? : *undefined | number*

* **errHandler**(): *function*

  * (`f`: [Frame](../interfaces/_state_.frame.md), `locals`: object): *void*

* **errState**: *number*

* **evalMemo**? : *[Map](_state_.md#map)‹string, function›*

* **exitBreakpoint**: *[Brk](../interfaces/_state_.brk.md) | null*

* **finHandler**(): *function*

  * (`f`: [Frame](../interfaces/_state_.frame.md), `locals`: object): *void*

* **finState**: *number*

* **flags**: *number*

* **fullName**: *string*

* **func**(): *function*

  * (...`args`: any[]): *any*

* **handler**(): *function*

  * (`frame`: [Frame](../interfaces/_state_.frame.md), `locals`: object, `input`: any): *any*

* **id**: *number | null*

* **line**? : *undefined | number*

* **localsNum**: *number*

* **location**? : *undefined | string*

* **module**: *[Module](../interfaces/_state_.module.md)*

* **name**: *string*

* **origName**: *string | null*

* **params**: *string[]*

* **parent**: *[FunctionDescr](_state_.md#functiondescr) | null*

* **persistName**: *string*

* **scopeDepth**: *number*

* **shift**: *number*

* **states**: *[Brk](../interfaces/_state_.brk.md)[]*

* **statesByLine**: *[Brk](../interfaces/_state_.brk.md)[]*

* **uniqName**: *string*

* **varsNum**: *number*

___

###  Handler

Ƭ **Handler**: *function*

Defined in debugger/src/state.ts:421

handler function

#### Type declaration:

▸ (`f`: [Frame](../interfaces/_state_.frame.md), `pat`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [Frame](../interfaces/_state_.frame.md) |
`pat` | any |

___

###  Item

Ƭ **Item**: *object*

Defined in debugger/src/state.ts:498

#### Type declaration:

* **done**: *boolean*

* **value**: *any*

___

###  NonBlackboxFunctionDescr

Ƭ **NonBlackboxFunctionDescr**: *[FunctionDescr](_state_.md#functiondescr) & object*

Defined in debugger/src/state.ts:196

___

###  Scope

Ƭ **Scope**: *any[] & object | object*

Defined in debugger/src/state.ts:213

passed to this runtime by compiler

___

###  StateMap

Ƭ **StateMap**: *function | undefined*

Defined in debugger/src/state.ts:418

catch/finally handler state ids mapping

___

###  States

Ƭ **States**: *[number, string, [Scope](_state_.md#scope)][]*

Defined in debugger/src/state.ts:424

breakpoint positions

___

###  VarInfo

Ƭ **VarInfo**: *[number, number, string | null]*

Defined in debugger/src/state.ts:204

describse variable scope (decl depth, function depth, location)

## Variables

### `Const` MAX_ID

• **MAX_ID**: *number* = 1 << (32 - THREAD_BITS)

Defined in debugger/src/state.ts:430

___

### `Const` THREAD_BITS

• **THREAD_BITS**: *10* = 10

Defined in debugger/src/state.ts:426

___

### `Const` THREAD_MASK

• **THREAD_MASK**: *number* = ~(-1 << THREAD_BITS)

Defined in debugger/src/state.ts:428

___

### `Const` dataSymbol

• **dataSymbol**: *unique symbol* = Symbol("@effectful/debugger/data")

Defined in debugger/src/state.ts:383

function's meta-data property name

___

### `Const` isWindows

• **isWindows**: *boolean* = typeof process !== "undefined" && process.platform === "win32"

Defined in debugger/src/state.ts:445

___

### `Const` normalizeDrive

• **normalizeDrive**: *normalizeDrive* = isWindows
  ? function normalizeDrive(path: string) {
      return path && path.length > 2 && path[1] === ":"
        ? path.charAt(0).toUpperCase() + path.slice(1)
        : path;
    }
  : function(path: string) {
      return path;
    }

Defined in debugger/src/state.ts:448

___

### `Const` normalizePath

• **normalizePath**: *normalizePath* = isWindows
  ? function normalizePath(path: string) {
      return normalizeDrive(path.replace(/\\/g, "/"));
    }
  : function normalizePath(path: string) {
      return path;
    }

Defined in debugger/src/state.ts:458

___

### `Const` thunkSymbol

• **thunkSymbol**: *unique symbol* = Symbol("@effectful/debugger/thunk")

Defined in debugger/src/state.ts:378

marks functions represeting a lazy value, the value is result
of the function's call

## Functions

###  defaultErrHandler

▸ **defaultErrHandler**(`f`: [Frame](../interfaces/_state_.frame.md)): *void*

Defined in debugger/src/state.ts:523

**Parameters:**

Name | Type |
------ | ------ |
`f` | [Frame](../interfaces/_state_.frame.md) |

**Returns:** *void*

___

###  defaultFinHandler

▸ **defaultFinHandler**(`f`: [Frame](../interfaces/_state_.frame.md)): *void*

Defined in debugger/src/state.ts:527

**Parameters:**

Name | Type |
------ | ------ |
`f` | [Frame](../interfaces/_state_.frame.md) |

**Returns:** *void*

___

###  forInIterator

▸ **forInIterator**(`obj`: object): *Iterable‹string›*

Defined in debugger/src/state.ts:487

**Parameters:**

Name | Type |
------ | ------ |
`obj` | object |

**Returns:** *Iterable‹string›*

___

###  idsStore

▸ **idsStore**(`bits`: number): *[IdsStore](../interfaces/_state_.idsstore.md)*

Defined in debugger/src/state.ts:391

generates number from 0 till `1 << bits`, reuses numbers from `release` call

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bits` | number | 16 |

**Returns:** *[IdsStore](../interfaces/_state_.idsstore.md)*

___

###  nop

▸ **nop**(): *boolean*

Defined in debugger/src/state.ts:332

**Returns:** *boolean*

___

###  patchNative

▸ **patchNative**(`obj`: any, `name`: string | symbol, `value`: any): *void*

Defined in debugger/src/state.ts:531

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`name` | string &#124; symbol |
`value` | any |

**Returns:** *void*

___

###  toGlobal

▸ **toGlobal**(`local`: number): *number*

Defined in debugger/src/state.ts:432

**Parameters:**

Name | Type |
------ | ------ |
`local` | number |

**Returns:** *number*

___

###  toLocal

▸ **toLocal**(`local`: number): *number*

Defined in debugger/src/state.ts:437

**Parameters:**

Name | Type |
------ | ------ |
`local` | number |

**Returns:** *number*

___

###  toThread

▸ **toThread**(`local`: number): *number*

Defined in debugger/src/state.ts:441

**Parameters:**

Name | Type |
------ | ------ |
`local` | number |

**Returns:** *number*

## Object literals

### `Const` context

### ▪ **context**: *object*

Defined in debugger/src/state.ts:306

global storage for the whole state of the running program

###  activeTop

• **activeTop**: *null* = null

Defined in debugger/src/state.ts:327

###  brk

• **brk**: *null* = null

Defined in debugger/src/state.ts:310

###  brkOnAnyException

• **brkOnAnyException**: *false* = false

Defined in debugger/src/state.ts:322

###  brkOnUncaughtException

• **brkOnUncaughtException**: *false* = false

Defined in debugger/src/state.ts:323

###  call

• **call**: *null* = null

Defined in debugger/src/state.ts:317

###  debug

• **debug**: *false* = false

Defined in debugger/src/state.ts:307

###  error

• **error**: *false* = false

Defined in debugger/src/state.ts:315

###  exception

• **exception**: *object* = undef

Defined in debugger/src/state.ts:329

#### Type declaration:

* **_undef**: *boolean* = true

###  moduleId

• **moduleId**: *null* = null

Defined in debugger/src/state.ts:321

###  modules

• **modules**: *object*

Defined in debugger/src/state.ts:312

#### Type declaration:

###  modulesById

• **modulesById**: *object*

Defined in debugger/src/state.ts:313

#### Type declaration:

###  needsBreak

• **needsBreak**: *[nop](_state_.md#nop)* = nop

Defined in debugger/src/state.ts:318

###  onNewSource

• **onNewSource**: *[nop](_state_.md#nop)* = nop

Defined in debugger/src/state.ts:324

###  onStop

• **onStop**: *[nop](_state_.md#nop)* = nop

Defined in debugger/src/state.ts:326

###  onThread

• **onThread**: *[nop](_state_.md#nop)* = nop

Defined in debugger/src/state.ts:325

###  queue

• **queue**: *never[]* = []

Defined in debugger/src/state.ts:316

###  running

• **running**: *false* = false

Defined in debugger/src/state.ts:309

###  suspended

• **suspended**: *Set‹[Frame](../interfaces/_state_.frame.md)›* = new Set()

Defined in debugger/src/state.ts:320

###  syncStack

• **syncStack**: *never[]* = []

Defined in debugger/src/state.ts:314

###  terminated

• **terminated**: *false* = false

Defined in debugger/src/state.ts:308

###  threadId

• **threadId**: *number* = 0

Defined in debugger/src/state.ts:328

###  top

• **top**: *null* = null

Defined in debugger/src/state.ts:311

###  value

• **value**: *undefined* = void 0

Defined in debugger/src/state.ts:319

___

### `Const` journal

### ▪ **journal**: *object*

Defined in debugger/src/state.ts:90

###  enabled

• **enabled**: *false* = false

Defined in debugger/src/state.ts:94

###  future

• **future**: *null* = null

Defined in debugger/src/state.ts:93

###  now

• **now**: *null* = null

Defined in debugger/src/state.ts:91

###  past

• **past**: *null* = null

Defined in debugger/src/state.ts:92

___

### `Const` saved

### ▪ **saved**: *object*

Defined in debugger/src/state.ts:337

original global objects monkey-patched by this runtime

###  Function

• **Function**: *FunctionConstructor*

Defined in debugger/src/state.ts:343

###  Map

• **Map**: *MapConstructor*

Defined in debugger/src/state.ts:367

###  Promise

• **Promise**: *PromiseConstructor*

Defined in debugger/src/state.ts:340

###  Proxy

• **Proxy**: *ProxyConstructor*

Defined in debugger/src/state.ts:339

###  Set

• **Set**: *SetConstructor*

Defined in debugger/src/state.ts:368

###  console

• **console**: *Console*

Defined in debugger/src/state.ts:338

###  eval

• **eval**: *eval* = eval

Defined in debugger/src/state.ts:342

▪ **Array**: *object*

Defined in debugger/src/state.ts:358

* **pop**: *pop* = Array.prototype.pop

* **push**: *push* = Array.prototype.push

* **reverse**: *reverse* = Array.prototype.reverse

* **shift**: *shift* = Array.prototype.shift

* **sort**: *sort* = Array.prototype.sort

* **splice**: *splice* = Array.prototype.splice

* **unshift**: *unshift* = Array.prototype.unshift

▪ **FunctionMethods**: *object*

Defined in debugger/src/state.ts:344

* **apply**: *apply* = Function.prototype.apply

* **bind**: *bind* = Function.prototype.bind

* **call**: *call* = Function.prototype.call

▪ **Object**: *object*

Defined in debugger/src/state.ts:354

* **assign**: *assign* = Object.assign

* **defineProperty**: *defineProperty* = Object.defineProperty

▪ **Reflect**: *object*

Defined in debugger/src/state.ts:369

* **construct**: *construct* = Reflect.construct

▪ **promiseMethods**: *object*

Defined in debugger/src/state.ts:349

* **catch**: *catch* = Promise.prototype.catch

* **finally**: *finally* = Promise.prototype.finally

* **then**: *then* = Promise.prototype.then

___

### `Const` token

### ▪ **token**: *object*

Defined in debugger/src/state.ts:380

###  _effectToken

• **_effectToken**: *boolean* = true

Defined in debugger/src/state.ts:380

___

### `Const` undef

### ▪ **undef**: *object*

Defined in debugger/src/state.ts:303

###  _undef

• **_undef**: *boolean* = true

Defined in debugger/src/state.ts:303
