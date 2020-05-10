[@effectful/debugger](../README.md) › ["modules"](_modules_.md)

# Module: "modules"

## Index

### Variables

* [context](_modules_.md#context)
* [defineProperty](_modules_.md#defineproperty)
* [saved](_modules_.md#saved)
* [thunkSymbol](_modules_.md#thunksymbol)
* [token](_modules_.md#token)

### Functions

* [moduleExports](_modules_.md#moduleexports)
* [runTopLevel](_modules_.md#runtoplevel)

## Variables

###  context

• **context**: *[State](../interfaces/_state_.state.md)*

Defined in debugger/src/modules.ts:6

___

###  defineProperty

• **defineProperty**: *defineProperty*

Defined in debugger/src/modules.ts:8

___

###  saved

• **saved**: *object*

Defined in debugger/src/modules.ts:6

#### Type declaration:

* **Function**: *FunctionConstructor*

* **Map**: *MapConstructor*

* **Promise**: *PromiseConstructor*

* **Proxy**: *ProxyConstructor*

* **Set**: *SetConstructor*

* **console**: *Console*

* **eval**: *eval* = eval

* ### **Array**: *object*

  * **pop**: *pop* = Array.prototype.pop

  * **push**: *push* = Array.prototype.push

  * **reverse**: *reverse* = Array.prototype.reverse

  * **shift**: *shift* = Array.prototype.shift

  * **sort**: *sort* = Array.prototype.sort

  * **splice**: *splice* = Array.prototype.splice

  * **unshift**: *unshift* = Array.prototype.unshift

* ### **FunctionMethods**: *object*

  * **apply**: *apply* = Function.prototype.apply

  * **bind**: *bind* = Function.prototype.bind

  * **call**: *call* = Function.prototype.call

* ### **Object**: *object*

  * **assign**: *assign* = Object.assign

  * **defineProperty**: *defineProperty* = Object.defineProperty

* ### **Reflect**: *object*

  * **construct**: *construct* = Reflect.construct

* ### **promiseMethods**: *object*

  * **catch**: *catch* = Promise.prototype.catch

  * **finally**: *finally* = Promise.prototype.finally

  * **then**: *then* = Promise.prototype.then

___

###  thunkSymbol

• **thunkSymbol**: *symbol*

Defined in debugger/src/modules.ts:6

___

###  token

• **token**: *object*

Defined in debugger/src/modules.ts:6

#### Type declaration:

* **_effectToken**: *boolean* = true

## Functions

###  moduleExports

▸ **moduleExports**(): *void*

Defined in debugger/src/modules.ts:22

**Returns:** *void*

___

###  runTopLevel

▸ **runTopLevel**(`mod`: [Module](../interfaces/_state_.module.md)): *any*

Defined in debugger/src/modules.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`mod` | [Module](../interfaces/_state_.module.md) |

**Returns:** *any*
