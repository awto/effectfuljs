[@effectful/es-persist](../README.md) > [Chainable](../interfaces/chainable.md)

# Interface: Chainable

A replacement of Thenable.

It also extends Thenable for compatibility. So everywhere where `Chainable` is expected it may be replaced with `Thenable`. However this makes result not serialiable.

## Type parameters
#### T 

type of a `await` result

## Hierarchy

 [Thenable](thenable.md)<`T`>

**↳ Chainable**

## Index

### Methods

* [__computed](chainable.md#__computed)
* [then](chainable.md#then)

---

## Methods

<a id="__computed"></a>

###  __computed

▸ **__computed**(cont: *[Continuation](continuation.md)<`T`>*): `any`

*Defined in types.ts:26*

The same as `Promise#then` but takes an object with two methods except two callback. The methods may be defined in prototype, thus the object can be serializable.

**Parameters:**

| Param | Type |
| ------ | ------ |
| cont | [Continuation](continuation.md)<`T`> |

**Returns:** `any`

___
<a id="then"></a>

###  then

▸ **then**U(resolve?: *`function`*, reject?: *`function`*): [Thenable](thenable.md)<`U`>

*Inherited from [Thenable](thenable.md).[then](thenable.md#then)*

*Defined in types.ts:7*

**Type parameters:**

#### U 
**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` resolve | `function` |
| `Optional` reject | `function` |

**Returns:** [Thenable](thenable.md)<`U`>

___

