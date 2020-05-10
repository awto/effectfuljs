[@effectful/serialization](../README.md) › ["dom"](_dom_.md)

# Module: "dom"

## Index

### Namespaces

* [__global](_dom_.md#__global)

### Interfaces

* [EventListenerOnceHandler](../interfaces/_dom_.eventlisteneroncehandler.md)

### Type aliases

* [EventMap](_dom_.md#eventmap)

### Variables

* [ETp](_dom_.md#const-etp)
* [InputDeviceCapabilities](_dom_.md#const-inputdevicecapabilities)
* [LocMap](_dom_.md#const-locmap)
* [LocWeakMap](_dom_.md#const-locweakmap)
* [defineProperty](_dom_.md#const-defineproperty)
* [eventsSym](_dom_.md#const-eventssym)
* [onceHandlers](_dom_.md#const-oncehandlers)
* [savedAddEventListener](_dom_.md#const-savedaddeventlistener)
* [savedRemoveEventListener](_dom_.md#const-savedremoveeventlistener)

### Functions

* [addEventListener](_dom_.md#addeventlistener)
* [cleanupEvents](_dom_.md#cleanupevents)
* [nodeListIter](_dom_.md#nodelistiter)
* [removeEventListener](_dom_.md#removeeventlistener)
* [restoreEvents](_dom_.md#restoreevents)
* [track](_dom_.md#track)
* [trackEvents](_dom_.md#trackevents)
* [trackGlobalDocument](_dom_.md#trackglobaldocument)
* [wrapOnceHandleEvent](_dom_.md#wraponcehandleevent)

### Object literals

* [overrideProps](_dom_.md#const-overrideprops)

## Namespaces

###  __global

• **__global**:

Defined in src/dom.ts:39

Defined in src/dom.ts:79

###  EventListenerOptions

• **EventListenerOptions**:

Defined in src/dom.ts:80

### `Optional` once

• **once**? : *undefined | false | true*

Defined in src/dom.ts:82

###  EventTarget

• **EventTarget**:

Defined in src/dom.ts:40

###  [eventsSym]

• **[eventsSym]**: *[EventMap](_dom_.md#eventmap)*

Defined in src/dom.ts:41

## Type aliases

###  EventMap

Ƭ **EventMap**: *Map‹string, Map‹EventListenerOrEventListenerObject, undefined | AddEventListenerOptions[][]››*

Defined in src/dom.ts:31

## Variables

### `Const` ETp

• **ETp**: *false | [EventTarget](_dom_.md#eventtarget)* = typeof EventTarget !== "undefined" && EventTarget.prototype

Defined in src/dom.ts:69

___

### `Const` InputDeviceCapabilities

• **InputDeviceCapabilities**: *any*

Defined in src/dom.ts:3

___

### `Const` LocMap

• **LocMap**: *MapConstructor* = Map

Defined in src/dom.ts:5

___

### `Const` LocWeakMap

• **LocWeakMap**: *WeakMapConstructor* = WeakMap

Defined in src/dom.ts:6

___

### `Const` defineProperty

• **defineProperty**: *defineProperty* = Object.defineProperty

Defined in src/dom.ts:8

___

### `Const` eventsSym

• **eventsSym**: *unique symbol* = Symbol.for("@effectful/debugger/events")

Defined in src/dom.ts:29

stores event handlers in EventTarget

___

### `Const` onceHandlers

• **onceHandlers**: *WeakMap‹EventListener | EventListenerObject, [EventListenerOnceHandler](../interfaces/_dom_.eventlisteneroncehandler.md)›* = new LocWeakMap<
  EventListenerOrEventListenerObject,
  EventListenerOnceHandler
>()

Defined in src/dom.ts:97

___

### `Const` savedAddEventListener

• **savedAddEventListener**: *false | addEventListener* = ETp && ETp.addEventListener

Defined in src/dom.ts:70

___

### `Const` savedRemoveEventListener

• **savedRemoveEventListener**: *false | removeEventListener* = ETp && ETp.removeEventListener

Defined in src/dom.ts:71

## Functions

###  addEventListener

▸ **addEventListener**(`this`: [EventTarget](_dom_.md#eventtarget), `type`: string, `listener`: EventListenerOrEventListenerObject, `options?`: boolean | AddEventListenerOptions): *void*

Defined in src/dom.ts:103

`EventTarget#addEventListener` wrapper which keeps the listener's reference

**Parameters:**

Name | Type |
------ | ------ |
`this` | [EventTarget](_dom_.md#eventtarget) |
`type` | string |
`listener` | EventListenerOrEventListenerObject |
`options?` | boolean &#124; AddEventListenerOptions |

**Returns:** *void*

___

###  cleanupEvents

▸ **cleanupEvents**(`et`: [EventTarget](_dom_.md#eventtarget)): *void*

Defined in src/dom.ts:58

**Parameters:**

Name | Type |
------ | ------ |
`et` | [EventTarget](_dom_.md#eventtarget) |

**Returns:** *void*

___

###  nodeListIter

▸ **nodeListIter**<**T**>(`nl`: object): *Iterable‹T›*

Defined in src/dom.ts:10

**Type parameters:**

▪ **T**

**Parameters:**

▪ **nl**: *object*

Name | Type |
------ | ------ |
`length` | number |

**Returns:** *Iterable‹T›*

___

###  removeEventListener

▸ **removeEventListener**(`this`: [EventTarget](_dom_.md#eventtarget), `type`: string, `listener`: EventListenerOrEventListenerObject, `options?`: boolean | [EventListenerOptions](_dom_.md#eventlisteneroptions)): *void*

Defined in src/dom.ts:151

`EventTarget#removeEventListener` wrapper which keeps the listener's reference

**Parameters:**

Name | Type |
------ | ------ |
`this` | [EventTarget](_dom_.md#eventtarget) |
`type` | string |
`listener` | EventListenerOrEventListenerObject |
`options?` | boolean &#124; [EventListenerOptions](_dom_.md#eventlisteneroptions) |

**Returns:** *void*

___

###  restoreEvents

▸ **restoreEvents**(`et`: [EventTarget](_dom_.md#eventtarget), `map`: [EventMap](_dom_.md#eventmap)): *void*

Defined in src/dom.ts:47

**Parameters:**

Name | Type |
------ | ------ |
`et` | [EventTarget](_dom_.md#eventtarget) |
`map` | [EventMap](_dom_.md#eventmap) |

**Returns:** *void*

___

###  track

▸ **track**(): *void*

Defined in src/dom.ts:431

Monkey patching platform objects to make them serializable,
run it as soon as possible if a global serialization is needed

**Returns:** *void*

___

###  trackEvents

▸ **trackEvents**(`ev`: [EventTarget](_dom_.md#eventtarget)): *void*

Defined in src/dom.ts:180

monkey patching `addEventListener`/`removeEventListener`
to keep reference to event listeners

**Parameters:**

Name | Type |
------ | ------ |
`ev` | [EventTarget](_dom_.md#eventtarget) |

**Returns:** *void*

___

###  trackGlobalDocument

▸ **trackGlobalDocument**(): *void*

Defined in src/dom.ts:186

monkey patching global `document` to make it serializable

**Returns:** *void*

___

###  wrapOnceHandleEvent

▸ **wrapOnceHandleEvent**(`this`: [EventListenerOnceHandler](../interfaces/_dom_.eventlisteneroncehandler.md), `event`: Event): *void*

Defined in src/dom.ts:86

**Parameters:**

Name | Type |
------ | ------ |
`this` | [EventListenerOnceHandler](../interfaces/_dom_.eventlisteneroncehandler.md) |
`event` | Event |

**Returns:** *void*

## Object literals

### `Const` overrideProps

### ▪ **overrideProps**: *object*

Defined in src/dom.ts:45

###  [S.descriptorSymbol]

• **[S.descriptorSymbol]**: *boolean* = false

Defined in src/dom.ts:45
