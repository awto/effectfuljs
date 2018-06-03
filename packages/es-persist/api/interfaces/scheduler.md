[@effectful/es-persist](../README.md) > [Scheduler](../interfaces/scheduler.md)

# Interface: Scheduler

Scheduling some task work for execution, mostly to avoid stack overflows

## Hierarchy

**Scheduler**

## Index

### Methods

* [enqueue](scheduler.md#enqueue)
* [onIdle](scheduler.md#onidle)

---

## Methods

<a id="enqueue"></a>

###  enqueue

▸ **enqueue**(job: *[Job](job.md)*): `any`

*Defined in types.ts:130*

Pushes task in the end of the queue

**Parameters:**

| Param | Type |
| ------ | ------ |
| job | [Job](job.md) |

**Returns:** `any`

___
<a id="onidle"></a>

###  onIdle

▸ **onIdle**(job: *[Job](job.md)*): `any`

*Defined in types.ts:137*

Same as `enqueue` but the `job` will be executed only if there is no other jobs scheduled.
*__see__*: idle

**Parameters:**

| Param | Type |
| ------ | ------ |
| job | [Job](job.md) |

**Returns:** `any`

___

