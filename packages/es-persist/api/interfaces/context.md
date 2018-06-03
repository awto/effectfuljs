[@effectful/es-persist](../README.md) > [Context](../interfaces/context.md)

# Interface: Context

Stores currently running async and async generator functions, along with scheduled jobs.

## Hierarchy

**Context**

## Index

### Properties

* [scheduler](context.md#scheduler)
* [threads](context.md#threads)

---

## Properties

<a id="scheduler"></a>

###  scheduler

**● scheduler**: *[Scheduler](scheduler.md)*

*Defined in types.ts:37*

all the jobs from `threads` to be scheduled using this scheduler

___
<a id="threads"></a>

###  threads

**● threads**: *`Set`< [Async](async.md) &#124; [AsyncGenerator](asyncgenerator.md)>*

*Defined in types.ts:35*

currently running async generator and async functions

___

