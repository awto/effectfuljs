[@effectful/es-persist](../README.md) > [Continuation](../interfaces/continuation.md)

# Interface: Continuation

Callbacks for specifying what to do next after async action is settled.

## Type parameters
#### T 
## Hierarchy

**Continuation**

↳  [Async](async.md)

## Index

### Methods

* [reject](continuation.md#reject)
* [resume](continuation.md#resume)

---

## Methods

<a id="reject"></a>

###  reject

▸ **reject**(reason: *`any`*): `any`

*Defined in types.ts:65*

Called if the async action has thrown an exception (rejected)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| reason | `any` |  the thrown exception object |

**Returns:** `any`

___
<a id="resume"></a>

###  resume

▸ **resume**(value: *`T`*): `any`

*Defined in types.ts:59*

Called if the async action has been successful

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `T` |  result of the async action |

**Returns:** `any`

___

