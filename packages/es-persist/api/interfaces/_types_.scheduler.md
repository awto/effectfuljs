[@effectful/es-persist](../README.md) › ["types"](../modules/_types_.md) › [Scheduler](_types_.scheduler.md)

# Interface: Scheduler

Scheduling some task work for execution, mostly to avoid stack overflows

## Hierarchy

* **Scheduler**

## Index

### Methods

* [enqueue](_types_.scheduler.md#enqueue)
* [onIdle](_types_.scheduler.md#onidle)

## Methods

###  enqueue

▸ **enqueue**(`job`: [Job](_types_.job.md)): *any*

Defined in types.ts:150

Pushes task in the end of the queue

**Parameters:**

Name | Type |
------ | ------ |
`job` | [Job](_types_.job.md) |

**Returns:** *any*

___

###  onIdle

▸ **onIdle**(`job`: [Job](_types_.job.md)): *any*

Defined in types.ts:157

Same as `enqueue` but the `job` will be executed only if there are
no other jobs scheduled.

**`see`** idle

**Parameters:**

Name | Type |
------ | ------ |
`job` | [Job](_types_.job.md) |

**Returns:** *any*
