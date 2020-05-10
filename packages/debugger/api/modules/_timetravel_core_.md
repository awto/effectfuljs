[@effectful/debugger](../README.md) › ["timeTravel/core"](_timetravel_core_.md)

# Module: "timeTravel/core"

## Index

### Interfaces

* [Callable](../interfaces/_timetravel_core_.callable.md)
* [KeysDescr](../interfaces/_timetravel_core_.keysdescr.md)
* [KeysOrder](../interfaces/_timetravel_core_.keysorder.md)

### Variables

* [Ap](_timetravel_core_.md#const-ap)
* [DeleteSymbol](_timetravel_core_.md#const-deletesymbol)
* [KeysMapSymbol](_timetravel_core_.md#const-keysmapsymbol)
* [SavedSet](_timetravel_core_.md#const-savedset)
* [SetSymbol](_timetravel_core_.md#const-setsymbol)
* [TAp](_timetravel_core_.md#const-tap)
* [arraySaved](_timetravel_core_.md#const-arraysaved)
* [defaultGetOwnPropertyDescriptor](_timetravel_core_.md#const-defaultgetownpropertydescriptor)
* [del](_timetravel_core_.md#const-del)
* [frozen](_timetravel_core_.md#const-frozen)
* [gdel](_timetravel_core_.md#const-gdel)
* [gset](_timetravel_core_.md#const-gset)
* [ldel](_timetravel_core_.md#const-ldel)
* [lset](_timetravel_core_.md#const-lset)
* [notExtensible](_timetravel_core_.md#const-notextensible)
* [record](_timetravel_core_.md#const-record)
* [sealed](_timetravel_core_.md#const-sealed)
* [set](_timetravel_core_.md#const-set)
* [weakAdd](_timetravel_core_.md#const-weakadd)

### Functions

* [addKey](_timetravel_core_.md#addkey)
* [addKeyImpl](_timetravel_core_.md#addkeyimpl)
* [addNotIntKey](_timetravel_core_.md#addnotintkey)
* [arrayPop](_timetravel_core_.md#arraypop)
* [arrayPopOp](_timetravel_core_.md#arraypopop)
* [arrayPush](_timetravel_core_.md#arraypush)
* [arrayPush1Op](_timetravel_core_.md#arraypush1op)
* [arrayReverse](_timetravel_core_.md#arrayreverse)
* [arrayReverseOp](_timetravel_core_.md#arrayreverseop)
* [arraySet](_timetravel_core_.md#arrayset)
* [arraySetLength](_timetravel_core_.md#arraysetlength)
* [arrayShift](_timetravel_core_.md#arrayshift)
* [arrayShiftOp](_timetravel_core_.md#arrayshiftop)
* [arraySort](_timetravel_core_.md#arraysort)
* [arraySplice](_timetravel_core_.md#arraysplice)
* [arrayUnshift](_timetravel_core_.md#arrayunshift)
* [arrayUnshift1Op](_timetravel_core_.md#arrayunshift1op)
* [checkpoint](_timetravel_core_.md#checkpoint)
* [delKey](_timetravel_core_.md#delkey)
* [delKeyImpl](_timetravel_core_.md#delkeyimpl)
* [delKeyOp](_timetravel_core_.md#delkeyop)
* [delOp](_timetravel_core_.md#delop)
* [forInIterator](_timetravel_core_.md#foriniterator)
* [forceConfigurable](_timetravel_core_.md#forceconfigurable)
* [getObjKeys](_timetravel_core_.md#getobjkeys)
* [getOrCreateObjKeys](_timetravel_core_.md#getorcreateobjkeys)
* [insertKey](_timetravel_core_.md#insertkey)
* [insertKeyOp](_timetravel_core_.md#insertkeyop)
* [isInt](_timetravel_core_.md#isint)
* [noOrderDelete](_timetravel_core_.md#noorderdelete)
* [noOrderSet](_timetravel_core_.md#noorderset)
* [objectAssign](_timetravel_core_.md#objectassign)
* [objectCreate](_timetravel_core_.md#objectcreate)
* [objectDefineProperties](_timetravel_core_.md#objectdefineproperties)
* [objectDefineProperty](_timetravel_core_.md#objectdefineproperty)
* [objectDefinePropertyImpl](_timetravel_core_.md#objectdefinepropertyimpl)
* [objectDefinePropertyNoRec](_timetravel_core_.md#objectdefinepropertynorec)
* [objectDefinePropertyOp](_timetravel_core_.md#objectdefinepropertyop)
* [objectEntries](_timetravel_core_.md#objectentries)
* [objectFreeze](_timetravel_core_.md#objectfreeze)
* [objectGetOwnPropertyDescriptors](_timetravel_core_.md#objectgetownpropertydescriptors)
* [objectGetOwnPropertyNames](_timetravel_core_.md#objectgetownpropertynames)
* [objectGetOwnPropertySymbols](_timetravel_core_.md#objectgetownpropertysymbols)
* [objectIsExtensible](_timetravel_core_.md#objectisextensible)
* [objectIsFrozen](_timetravel_core_.md#objectisfrozen)
* [objectIsSealed](_timetravel_core_.md#objectissealed)
* [objectKeys](_timetravel_core_.md#objectkeys)
* [objectPreventExtensions](_timetravel_core_.md#objectpreventextensions)
* [objectSeal](_timetravel_core_.md#objectseal)
* [objectSetPrototypeOf](_timetravel_core_.md#objectsetprototypeof)
* [objectSetPrototypeOfOp](_timetravel_core_.md#objectsetprototypeofop)
* [propDelOp](_timetravel_core_.md#propdelop)
* [propSetOp](_timetravel_core_.md#propsetop)
* [recordProp](_timetravel_core_.md#recordprop)
* [recp](_timetravel_core_.md#recp)
* [reset](_timetravel_core_.md#reset)
* [simpleDel](_timetravel_core_.md#simpledel)
* [simpleSet](_timetravel_core_.md#simpleset)
* [simpleSetOp](_timetravel_core_.md#simplesetop)
* [spliceImpl](_timetravel_core_.md#spliceimpl)
* [spliceOp](_timetravel_core_.md#spliceop)
* [typedArrayFill](_timetravel_core_.md#typedarrayfill)
* [typedArrayPropSet](_timetravel_core_.md#typedarraypropset)
* [typedArrayReverse](_timetravel_core_.md#typedarrayreverse)
* [typedArraySet](_timetravel_core_.md#typedarrayset)
* [typedArraySetOp](_timetravel_core_.md#typedarraysetop)
* [typedArraySort](_timetravel_core_.md#typedarraysort)

### Object literals

* [objectSaved](_timetravel_core_.md#const-objectsaved)
* [typedArraySaved](_timetravel_core_.md#const-typedarraysaved)

## Variables

### `Const` Ap

• **Ap**: *any[]* = Array.prototype

Defined in debugger/src/timeTravel/core.ts:670

___

### `Const` DeleteSymbol

• **DeleteSymbol**: *unique symbol* = Symbol("@effectful/debugger/del")

Defined in debugger/src/timeTravel/core.ts:678

___

### `Const` KeysMapSymbol

• **KeysMapSymbol**: *unique symbol* = Symbol.for("@effectful/debugger/keys")

Defined in debugger/src/timeTravel/core.ts:81

___

### `Const` SavedSet

• **SavedSet**: *SetConstructor* = Set

Defined in debugger/src/timeTravel/core.ts:7

___

### `Const` SetSymbol

• **SetSymbol**: *unique symbol* = Symbol("@effectful/debugger/set")

Defined in debugger/src/timeTravel/core.ts:677

a field name for setter override - a function taking object, field name, and a new value
it should return the assigned value

___

### `Const` TAp

• **TAp**: *any* = Object.getPrototypeOf(Int8Array.prototype)

Defined in debugger/src/timeTravel/core.ts:671

___

### `Const` arraySaved

• **arraySaved**: *object* = saved.Array

Defined in debugger/src/timeTravel/core.ts:680

#### Type declaration:

* **pop**: *pop* = Array.prototype.pop

* **push**: *push* = Array.prototype.push

* **reverse**: *reverse* = Array.prototype.reverse

* **shift**: *shift* = Array.prototype.shift

* **sort**: *sort* = Array.prototype.sort

* **splice**: *splice* = Array.prototype.splice

* **unshift**: *unshift* = Array.prototype.unshift

___

### `Const` defaultGetOwnPropertyDescriptor

• **defaultGetOwnPropertyDescriptor**: *getOwnPropertyDescriptor* = objectSaved.getOwnPropertyDescriptor

Defined in debugger/src/timeTravel/core.ts:566

___

### `Const` del

• **del**: *function* = config.timeTravel
    ? config.expNoAccessOverloading
      ? function del(obj: any, name: string) {
        if (journal.enabled) {
          const cur = defaultGetOwnPropertyDescriptor(obj, name);
          if (cur) {
            delKey(obj, name, false);
            record3(objectDefinePropertyOp, obj, name, cur);
          }
        }
        return delete obj[name];
      }
      : function del(obj: any, name: string) {
        if (journal.enabled) {
          const deleter = obj[DeleteSymbol];
          if (deleter) return deleter(obj, name);
          const cur = defaultGetOwnPropertyDescriptor(obj, name);
          if (cur) {
            delKey(obj, name, false);
            record3(objectDefinePropertyOp, obj, name, cur);
          }
        }
        return delete obj[name];
      }
    : function del(obj: any, name: string) {
      return delete obj[name];
    }

Defined in debugger/src/timeTravel/core.ts:442

API call replacing `delete`

#### Type declaration:

▸ (`obj`: any, `name`: string): *any*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`name` | string |

___

### `Const` frozen

• **frozen**: *WeakSet‹object›* = new WeakSet()

Defined in debugger/src/timeTravel/core.ts:513

___

### `Const` gdel

• **gdel**: *[simpleDel](_timetravel_core_.md#simpledel)* = simpleDel

Defined in debugger/src/timeTravel/core.ts:983

___

### `Const` gset

• **gset**: *[simpleSet](_timetravel_core_.md#simpleset)* = simpleSet

Defined in debugger/src/timeTravel/core.ts:982

___

### `Const` ldel

• **ldel**: *[simpleDel](_timetravel_core_.md#simpledel)* = simpleDel

Defined in debugger/src/timeTravel/core.ts:985

___

### `Const` lset

• **lset**: *[simpleSet](_timetravel_core_.md#simpleset)* = simpleSet

Defined in debugger/src/timeTravel/core.ts:984

___

### `Const` notExtensible

• **notExtensible**: *WeakSet‹object›* = new WeakSet()

Defined in debugger/src/timeTravel/core.ts:515

___

### `Const` record

• **record**: *function* = config.timeTravel
  ? function record(f: any) {
    if (!f) return;
    const { now } = journal;
    if (!now) return;
    (<any>f).prev = now.operations || null;
    now.operations = f;
  }
  : function () { }

Defined in debugger/src/timeTravel/core.ts:36

Registers a function(`f`) to be executed on replay in backward order,
if time traveling is enabled

#### Type declaration:

▸ <**T**>(`f`: T): *void*

**Type parameters:**

▪ **T**: *[Callable](../interfaces/_timetravel_core_.callable.md)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | T |

___

### `Const` sealed

• **sealed**: *WeakSet‹object›* = new WeakSet()

Defined in debugger/src/timeTravel/core.ts:514

___

### `Const` set

• **set**: *function* = config.timeTravel
    ? config.expNoAccessOverloading
      ? function set(obj: any, name: string, value: any) {
        if (journal.enabled) {
          if (Array.isArray(obj)) return arraySet(obj, name, value);
          let descr: PropertyDescriptor | undefined = void 0;
          let descrObj: any;
          if (name in obj) {
            descrObj = obj;
            while (descrObj && descrObj !== Object.prototype) {
              descr = Object.getOwnPropertyDescriptor(descrObj, name);
              if (descr) break;
              descrObj = Object.getPrototypeOf(descrObj);
            }
            if (descr && (descr.set || !descr.writable))
              return (obj[name] = value);
          }
          const isIntIndex =
            typeof name !== "symbol" && isInt(String(<any>name));
          if (descrObj === obj) {
            record3(propSetOp, obj, name, obj[name]);
          } else {
            record2(propDelOp, obj, name);
            if (!isIntIndex) addNotIntKey(obj, name, true, false);
          }
        }
        return (obj[name] = value);
      }
      : function set(obj: any, name: string, value: any) {
        if (journal.enabled) {
          const setter = obj[SetSymbol];
          if (setter) return setter(obj, name, value);
          addKey(obj, name, true, false);
          const cur = defaultGetOwnPropertyDescriptor(obj, name);
          if (cur) record3(objectDefinePropertyOp, obj, name, cur);
          else record2(delOp, obj, name);
        }
        return (obj[name] = value);
      }
    : function set(obj: any, name: string, value: any) {
      return (obj[name] = value);
    }

Defined in debugger/src/timeTravel/core.ts:394

#### Type declaration:

▸ (`obj`: any, `name`: string, `value`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`name` | string |
`value` | any |

___

### `Const` weakAdd

• **weakAdd**: *add* = WeakSet.prototype.add

Defined in debugger/src/timeTravel/core.ts:517

## Functions

###  addKey

▸ **addKey**(`obj`: any, `name`: string, `enumerable`: boolean, `optional`: boolean): *boolean*

Defined in debugger/src/timeTravel/core.ts:227

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`name` | string |
`enumerable` | boolean |
`optional` | boolean |

**Returns:** *boolean*

___

###  addKeyImpl

▸ **addKeyImpl**(`name`: string, `map`: object, `list`: [KeysOrder](../interfaces/_timetravel_core_.keysorder.md), `value`: [KeysOrder](../interfaces/_timetravel_core_.keysorder.md)): *void*

Defined in debugger/src/timeTravel/core.ts:215

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`map` | object |
`list` | [KeysOrder](../interfaces/_timetravel_core_.keysorder.md) |
`value` | [KeysOrder](../interfaces/_timetravel_core_.keysorder.md) |

**Returns:** *void*

___

###  addNotIntKey

▸ **addNotIntKey**(`obj`: any, `name`: string, `enumerable`: boolean, `optional`: boolean): *boolean*

Defined in debugger/src/timeTravel/core.ts:257

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`name` | string |
`enumerable` | boolean |
`optional` | boolean |

**Returns:** *boolean*

___

###  arrayPop

▸ **arrayPop**(`this`: any[]): *any*

Defined in debugger/src/timeTravel/core.ts:792

**Parameters:**

Name | Type |
------ | ------ |
`this` | any[] |

**Returns:** *any*

___

###  arrayPopOp

▸ **arrayPopOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:784

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  arrayPush

▸ **arrayPush**(`this`: any[]): *number*

Defined in debugger/src/timeTravel/core.ts:814

**Parameters:**

Name | Type |
------ | ------ |
`this` | any[] |

**Returns:** *number*

___

###  arrayPush1Op

▸ **arrayPush1Op**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:804

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  arrayReverse

▸ **arrayReverse**(`this`: any[]): *any[]*

Defined in debugger/src/timeTravel/core.ts:873

**Parameters:**

Name | Type |
------ | ------ |
`this` | any[] |

**Returns:** *any[]*

___

###  arrayReverseOp

▸ **arrayReverseOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:868

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  arraySet

▸ **arraySet**(`arr`: any[], `name`: string, `value`: any): *any*

Defined in debugger/src/timeTravel/core.ts:727

**Parameters:**

Name | Type |
------ | ------ |
`arr` | any[] |
`name` | string |
`value` | any |

**Returns:** *any*

___

###  arraySetLength

▸ **arraySetLength**(`arr`: any[], `value`: number): *number*

Defined in debugger/src/timeTravel/core.ts:710

**Parameters:**

Name | Type |
------ | ------ |
`arr` | any[] |
`value` | number |

**Returns:** *number*

___

###  arrayShift

▸ **arrayShift**(`this`: any[]): *any*

Defined in debugger/src/timeTravel/core.ts:836

**Parameters:**

Name | Type |
------ | ------ |
`this` | any[] |

**Returns:** *any*

___

###  arrayShiftOp

▸ **arrayShiftOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:827

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  arraySort

▸ **arraySort**(`this`: any[], `pred`: any): *any[]*

Defined in debugger/src/timeTravel/core.ts:883

**Parameters:**

Name | Type |
------ | ------ |
`this` | any[] |
`pred` | any |

**Returns:** *any[]*

___

###  arraySplice

▸ **arraySplice**(`this`: any[], `from`: number, `del`: number, ...`ins`: any[]): *any[]*

Defined in debugger/src/timeTravel/core.ts:891

**Parameters:**

Name | Type |
------ | ------ |
`this` | any[] |
`from` | number |
`del` | number |
`...ins` | any[] |

**Returns:** *any[]*

___

###  arrayUnshift

▸ **arrayUnshift**(`this`: any[]): *number*

Defined in debugger/src/timeTravel/core.ts:858

**Parameters:**

Name | Type |
------ | ------ |
`this` | any[] |

**Returns:** *number*

___

###  arrayUnshift1Op

▸ **arrayUnshift1Op**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:848

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  checkpoint

▸ **checkpoint**(): *[Record](../interfaces/_state_.record.md)*

Defined in debugger/src/timeTravel/core.ts:18

Returns an object which can be passed
to `undo` to restored the current state

**Returns:** *[Record](../interfaces/_state_.record.md)*

___

###  delKey

▸ **delKey**(`obj`: any, `name`: string, `optional`: boolean): *void*

Defined in debugger/src/timeTravel/core.ts:167

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`name` | string |
`optional` | boolean |

**Returns:** *void*

___

###  delKeyImpl

▸ **delKeyImpl**(`name`: string, `map`: object, `value`: [KeysOrder](../interfaces/_timetravel_core_.keysorder.md)): *void*

Defined in debugger/src/timeTravel/core.ts:141

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`map` | object |
`value` | [KeysOrder](../interfaces/_timetravel_core_.keysorder.md) |

**Returns:** *void*

___

###  delKeyOp

▸ **delKeyOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:153

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  delOp

▸ **delOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:499

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  forInIterator

▸ **forInIterator**(`obj`: any): *Iterable‹string›*

Defined in debugger/src/timeTravel/core.ts:332

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *Iterable‹string›*

___

###  forceConfigurable

▸ **forceConfigurable**(`props`: object): *object*

Defined in debugger/src/timeTravel/core.ts:374

**Parameters:**

Name | Type |
------ | ------ |
`props` | object |

**Returns:** *object*

* \[ **name**: *string*\]: PropertyDescriptor

___

###  getObjKeys

▸ **getObjKeys**(`obj`: any): *[KeysDescr](../interfaces/_timetravel_core_.keysdescr.md) | undefined*

Defined in debugger/src/timeTravel/core.ts:87

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *[KeysDescr](../interfaces/_timetravel_core_.keysdescr.md) | undefined*

___

###  getOrCreateObjKeys

▸ **getOrCreateObjKeys**(`obj`: any, `optional`: boolean): *[KeysDescr](../interfaces/_timetravel_core_.keysdescr.md) | undefined*

Defined in debugger/src/timeTravel/core.ts:98

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`optional` | boolean |

**Returns:** *[KeysDescr](../interfaces/_timetravel_core_.keysdescr.md) | undefined*

___

###  insertKey

▸ **insertKey**(`name`: string, `map`: object, `pos`: [KeysOrder](../interfaces/_timetravel_core_.keysorder.md), `cur`: [KeysOrder](../interfaces/_timetravel_core_.keysorder.md)): *void*

Defined in debugger/src/timeTravel/core.ts:200

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`map` | object |
`pos` | [KeysOrder](../interfaces/_timetravel_core_.keysorder.md) |
`cur` | [KeysOrder](../interfaces/_timetravel_core_.keysorder.md) |

**Returns:** *void*

___

###  insertKeyOp

▸ **insertKeyOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:188

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  isInt

▸ **isInt**(`str`: string): *boolean*

Defined in debugger/src/timeTravel/core.ts:83

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *boolean*

___

###  noOrderDelete

▸ **noOrderDelete**(`obj`: any, `name`: any): *boolean*

Defined in debugger/src/timeTravel/core.ts:1004

a deleter implementation which doesn't respect insertion order

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`name` | any |

**Returns:** *boolean*

___

###  noOrderSet

▸ **noOrderSet**(`obj`: any, `name`: any, `value`: any): *any*

Defined in debugger/src/timeTravel/core.ts:996

a setter implementation which doesn't respect insertion order,
but doesn't take the whole object snapshot

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`name` | any |
`value` | any |

**Returns:** *any*

___

###  objectAssign

▸ **objectAssign**(`dest`: any, ...`args`: any[]): *any*

Defined in debugger/src/timeTravel/core.ts:650

**Parameters:**

Name | Type |
------ | ------ |
`dest` | any |
`...args` | any[] |

**Returns:** *any*

___

###  objectCreate

▸ **objectCreate**(`obj`: any, `props?`: undefined | object): *any*

Defined in debugger/src/timeTravel/core.ts:386

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`props?` | undefined &#124; object |

**Returns:** *any*

___

###  objectDefineProperties

▸ **objectDefineProperties**(`obj`: any, `descrs`: object): *any*

Defined in debugger/src/timeTravel/core.ts:635

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`descrs` | object |

**Returns:** *any*

___

###  objectDefineProperty

▸ **objectDefineProperty**(`obj`: any, `name`: string, `descr`: PropertyDescriptor): *any*

Defined in debugger/src/timeTravel/core.ts:608

`Object.defineProperty` wrapper

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`name` | string |
`descr` | PropertyDescriptor |

**Returns:** *any*

___

###  objectDefinePropertyImpl

▸ **objectDefinePropertyImpl**(`obj`: any, `name`: string, `descr`: PropertyDescriptor, `enabled`: boolean): *any*

Defined in debugger/src/timeTravel/core.ts:591

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`name` | string |
`descr` | PropertyDescriptor |
`enabled` | boolean |

**Returns:** *any*

___

###  objectDefinePropertyNoRec

▸ **objectDefinePropertyNoRec**(`obj`: any, `name`: string, `descr`: PropertyDescriptor, `cur`: PropertyDescriptor | undefined): *any*

Defined in debugger/src/timeTravel/core.ts:568

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`name` | string |
`descr` | PropertyDescriptor |
`cur` | PropertyDescriptor &#124; undefined |

**Returns:** *any*

___

###  objectDefinePropertyOp

▸ **objectDefinePropertyOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:620

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  objectEntries

▸ **objectEntries**(`obj`: any): *string[]*

Defined in debugger/src/timeTravel/core.ts:363

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *string[]*

___

###  objectFreeze

▸ **objectFreeze**(`obj`: any): *any*

Defined in debugger/src/timeTravel/core.ts:519

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *any*

___

###  objectGetOwnPropertyDescriptors

▸ **objectGetOwnPropertyDescriptors**(`obj`: any): *object*

Defined in debugger/src/timeTravel/core.ts:300

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *object*

* \[ **name**: *string*\]: PropertyDescriptor

___

###  objectGetOwnPropertyNames

▸ **objectGetOwnPropertyNames**(`obj`: any): *string[]*

Defined in debugger/src/timeTravel/core.ts:282

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *string[]*

___

###  objectGetOwnPropertySymbols

▸ **objectGetOwnPropertySymbols**(`obj`: any): *symbol[]*

Defined in debugger/src/timeTravel/core.ts:291

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *symbol[]*

___

###  objectIsExtensible

▸ **objectIsExtensible**(`obj`: any): *boolean*

Defined in debugger/src/timeTravel/core.ts:544

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

###  objectIsFrozen

▸ **objectIsFrozen**(`obj`: any): *boolean*

Defined in debugger/src/timeTravel/core.ts:524

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

###  objectIsSealed

▸ **objectIsSealed**(`obj`: any): *boolean*

Defined in debugger/src/timeTravel/core.ts:535

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

###  objectKeys

▸ **objectKeys**(`obj`: any): *string[]*

Defined in debugger/src/timeTravel/core.ts:319

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *string[]*

___

###  objectPreventExtensions

▸ **objectPreventExtensions**(`obj`: any): *any*

Defined in debugger/src/timeTravel/core.ts:539

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *any*

___

###  objectSeal

▸ **objectSeal**(`obj`: any): *any*

Defined in debugger/src/timeTravel/core.ts:530

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *any*

___

###  objectSetPrototypeOf

▸ **objectSetPrototypeOf**(`obj`: any, `prototype`: any): *any*

Defined in debugger/src/timeTravel/core.ts:557

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`prototype` | any |

**Returns:** *any*

___

###  objectSetPrototypeOfOp

▸ **objectSetPrototypeOfOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:548

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  propDelOp

▸ **propDelOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:487

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  propSetOp

▸ **propSetOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:473

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  recordProp

▸ **recordProp**(`target`: any, `name`: any): *void*

Defined in debugger/src/timeTravel/core.ts:951

records current property value but don't try to keep insertion order

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`name` | any |

**Returns:** *void*

___

###  recp

▸ **recp**(`target`: any, `name`: any, `value`: any): *void*

Defined in debugger/src/timeTravel/core.ts:988

records the property value in a trace

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`name` | any |
`value` | any |

**Returns:** *void*

___

###  reset

▸ **reset**(`enabled`: boolean): *void*

Defined in debugger/src/timeTravel/core.ts:9

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |

**Returns:** *void*

___

###  simpleDel

▸ **simpleDel**(`target`: any, `name`: any): *boolean*

Defined in debugger/src/timeTravel/core.ts:976

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`name` | any |

**Returns:** *boolean*

___

###  simpleSet

▸ **simpleSet**(`target`: any, `name`: any, `value`: any): *any*

Defined in debugger/src/timeTravel/core.ts:971

Same as `set` but simpler:
  - don't use property descriptors
  - don't delete

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`name` | any |
`value` | any |

**Returns:** *any*

___

###  simpleSetOp

▸ **simpleSetOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:957

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  spliceImpl

▸ **spliceImpl**(`arr`: any[], `start`: number, `del`: number, `ins`: any[]): *any[]*

Defined in debugger/src/timeTravel/core.ts:700

**Parameters:**

Name | Type |
------ | ------ |
`arr` | any[] |
`start` | number |
`del` | number |
`ins` | any[] |

**Returns:** *any[]*

___

###  spliceOp

▸ **spliceOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:689

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  typedArrayFill

▸ **typedArrayFill**(`this`: any, `value`: any, `offset`: number, `end`: number): *any*

Defined in debugger/src/timeTravel/core.ts:937

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`this` | any | - |
`value` | any | - |
`offset` | number | 0 |
`end` | number | this.length |

**Returns:** *any*

___

###  typedArrayPropSet

▸ **typedArrayPropSet**(`arr`: any[], `name`: string, `value`: any): *any*

Defined in debugger/src/timeTravel/core.ts:756

**Parameters:**

Name | Type |
------ | ------ |
`arr` | any[] |
`name` | string |
`value` | any |

**Returns:** *any*

___

###  typedArrayReverse

▸ **typedArrayReverse**(`this`: any[], `pred`: any): *any[]*

Defined in debugger/src/timeTravel/core.ts:916

**Parameters:**

Name | Type |
------ | ------ |
`this` | any[] |
`pred` | any |

**Returns:** *any[]*

___

###  typedArraySet

▸ **typedArraySet**(`this`: any, `value`: any, `offset`: number): *any*

Defined in debugger/src/timeTravel/core.ts:924

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`this` | any | - |
`value` | any | - |
`offset` | number | 0 |

**Returns:** *any*

___

###  typedArraySetOp

▸ **typedArraySetOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/core.ts:899

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  typedArraySort

▸ **typedArraySort**(`this`: any[], `pred`: any): *any[]*

Defined in debugger/src/timeTravel/core.ts:908

**Parameters:**

Name | Type |
------ | ------ |
`this` | any[] |
`pred` | any |

**Returns:** *any[]*

## Object literals

### `Const` objectSaved

### ▪ **objectSaved**: *object*

Defined in debugger/src/timeTravel/core.ts:46

###  assign

• **assign**: *assign* = Object.assign

Defined in debugger/src/timeTravel/core.ts:56

###  create

• **create**: *create* = Object.create

Defined in debugger/src/timeTravel/core.ts:64

###  defineProperties

• **defineProperties**: *defineProperties* = Object.defineProperties

Defined in debugger/src/timeTravel/core.ts:54

###  defineProperty

• **defineProperty**: *defineProperty* = Object.defineProperty

Defined in debugger/src/timeTravel/core.ts:55

###  entries

• **entries**: *entries* = Object.entries

Defined in debugger/src/timeTravel/core.ts:57

###  freeze

• **freeze**: *freeze* = Object.freeze

Defined in debugger/src/timeTravel/core.ts:47

###  getOwnPropertyDescriptor

• **getOwnPropertyDescriptor**: *getOwnPropertyDescriptor* = Object.getOwnPropertyDescriptor

Defined in debugger/src/timeTravel/core.ts:62

###  getOwnPropertyDescriptors

• **getOwnPropertyDescriptors**: *getOwnPropertyDescriptors* = Object.getOwnPropertyDescriptors

Defined in debugger/src/timeTravel/core.ts:61

###  getOwnPropertyNames

• **getOwnPropertyNames**: *getOwnPropertyNames* = Object.getOwnPropertyNames

Defined in debugger/src/timeTravel/core.ts:59

###  getOwnPropertySymbols

• **getOwnPropertySymbols**: *getOwnPropertySymbols* = Object.getOwnPropertySymbols

Defined in debugger/src/timeTravel/core.ts:60

###  getPrototypeOf

• **getPrototypeOf**: *getPrototypeOf* = Object.getPrototypeOf

Defined in debugger/src/timeTravel/core.ts:63

###  isExtensible

• **isExtensible**: *isExtensible* = Object.isExtensible

Defined in debugger/src/timeTravel/core.ts:52

###  isFrozen

• **isFrozen**: *isFrozen* = Object.isFrozen

Defined in debugger/src/timeTravel/core.ts:48

###  isSealed

• **isSealed**: *isSealed* = Object.isSealed

Defined in debugger/src/timeTravel/core.ts:50

###  keys

• **keys**: *keys* = Object.keys

Defined in debugger/src/timeTravel/core.ts:58

###  preventExtensions

• **preventExtensions**: *preventExtensions* = Object.preventExtensions

Defined in debugger/src/timeTravel/core.ts:51

###  seal

• **seal**: *seal* = Object.seal

Defined in debugger/src/timeTravel/core.ts:49

###  setPrototypeOf

• **setPrototypeOf**: *setPrototypeOf* = Object.setPrototypeOf

Defined in debugger/src/timeTravel/core.ts:53

___

### `Const` typedArraySaved

### ▪ **typedArraySaved**: *object*

Defined in debugger/src/timeTravel/core.ts:682

###  fill

• **fill**: *any* = TAp.fill

Defined in debugger/src/timeTravel/core.ts:685

###  reverse

• **reverse**: *any* = TAp.reverse

Defined in debugger/src/timeTravel/core.ts:686

###  set

• **set**: *any* = TAp.set

Defined in debugger/src/timeTravel/core.ts:684

###  sort

• **sort**: *any* = TAp.sort

Defined in debugger/src/timeTravel/core.ts:683
