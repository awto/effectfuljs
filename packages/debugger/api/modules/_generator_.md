[@effectful/debugger](../README.md) › ["generator"](_generator_.md)

# Module: "generator"

## Index

### Classes

* [Generator](../classes/_generator_.generator.md)
* [IterableThis](../classes/_generator_.iterablethis.md)

### Variables

* [Gp](_generator_.md#const-gp)
* [context](_generator_.md#context)
* [defineProperty](_generator_.md#defineproperty)
* [frameG](_generator_.md#const-frameg)
* [saved](_generator_.md#saved)

### Functions

* [GeneratorFunction](_generator_.md#generatorfunction)
* [GeneratorFunctionPrototype](_generator_.md#generatorfunctionprototype)
* [closG](_generator_.md#closg)
* [next](_generator_.md#next)
* [retG](_generator_.md#retg)
* [unhandledG](_generator_.md#unhandledg)
* [yld](_generator_.md#yld)

## Variables

### `Const` Gp

• **Gp**: *any* = <any>Generator.prototype

Defined in debugger/src/generator.ts:37

___

###  context

• **context**: *[State](../interfaces/_state_.state.md)*

Defined in debugger/src/generator.ts:15

___

###  defineProperty

• **defineProperty**: *defineProperty*

Defined in debugger/src/generator.ts:17

___

### `Const` frameG

• **frameG**: *function* = config.expInlineNext
  ? function frameG(closure: any, newTarget: any) {
      const frame = <GeneratorFrame>makeFrame(closure, newTarget);
      const iter = Object.create(closure.prototype);
      frame.iter = iter;
      iter.next = (<any>frame.meta).nextImpl;
      iter._frame = frame;
      return frame;
    }
  : function frameG(closure: any, newTarget: any) {
      const frame = <GeneratorFrame>makeFrame(closure, newTarget);
      const iter = Object.create(closure.prototype);
      frame.iter = iter;
      iter._frame = frame;
      return frame;
    }

Defined in debugger/src/generator.ts:111

#### Type declaration:

▸ (`closure`: any, `newTarget`: any): *[GeneratorFrame](../interfaces/_state_.generatorframe.md)*

**Parameters:**

Name | Type |
------ | ------ |
`closure` | any |
`newTarget` | any |

___

###  saved

• **saved**: *object*

Defined in debugger/src/generator.ts:15

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

## Functions

###  GeneratorFunction

▸ **GeneratorFunction**(): *void*

Defined in debugger/src/generator.ts:83

**Returns:** *void*

___

###  GeneratorFunctionPrototype

▸ **GeneratorFunctionPrototype**(): *void*

Defined in debugger/src/generator.ts:87

**Returns:** *void*

___

###  closG

▸ **closG**(`$$`: any, `meta`: [FunctionDescr](_state_.md#functiondescr), `closure`: any): *any*

Defined in debugger/src/generator.ts:98

**Parameters:**

Name | Type |
------ | ------ |
`$$` | any |
`meta` | [FunctionDescr](_state_.md#functiondescr) |
`closure` | any |

**Returns:** *any*

___

###  next

▸ **next**(`this`: any, `value`: any): *any*

Defined in debugger/src/generator.ts:51

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |
`value` | any |

**Returns:** *any*

___

###  retG

▸ **retG**(`value`: any): *any*

Defined in debugger/src/generator.ts:140

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *any*

___

###  unhandledG

▸ **unhandledG**(`e`: any): *void*

Defined in debugger/src/generator.ts:152

**Parameters:**

Name | Type |
------ | ------ |
`e` | any |

**Returns:** *void*

___

###  yld

▸ **yld**(`value`: any): *any*

Defined in debugger/src/generator.ts:131

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *any*
