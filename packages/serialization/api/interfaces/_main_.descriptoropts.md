[@effectful/serialization](../README.md) › ["main"](../modules/_main_.md) › [DescriptorOpts](_main_.descriptoropts.md)

# Interface: DescriptorOpts <**T**>

## Type parameters

▪ **T**

## Hierarchy

* **DescriptorOpts**

## Index

### Properties

* [default$](_main_.descriptoropts.md#optional-default)
* [defaultPrototype](_main_.descriptoropts.md#optional-defaultprototype)
* [globalName](_main_.descriptoropts.md#optional-globalname)
* [inheritance](_main_.descriptoropts.md#optional-inheritance)
* [name](_main_.descriptoropts.md#optional-name)
* [overrideProps](_main_.descriptoropts.md#optional-overrideprops)
* [props](_main_.descriptoropts.md#optional-props)
* [propsDescrMask](_main_.descriptoropts.md#optional-propsdescrmask)
* [propsSnapshot](_main_.descriptoropts.md#optional-propssnapshot)
* [refAware](_main_.descriptoropts.md#optional-refaware)
* [snapshot](_main_.descriptoropts.md#optional-snapshot)
* [strictName](_main_.descriptoropts.md#optional-strictname)
* [typeofHint](_main_.descriptoropts.md#optional-typeofhint)
* [typeofTag](_main_.descriptoropts.md#optional-typeoftag)
* [value](_main_.descriptoropts.md#optional-value)
* [valueConstructor](_main_.descriptoropts.md#optional-valueconstructor)
* [valuePrototype](_main_.descriptoropts.md#optional-valueprototype)

## Properties

### `Optional` default$

• **default$**? : *undefined | false | true*

Defined in src/main.ts:278

If !== false the descriptor will add property `$` equal to `name` by default

___

### `Optional` defaultPrototype

• **defaultPrototype**? : *any*

Defined in src/main.ts:306

if an object has this prototype it won't be recorded

___

### `Optional` globalName

• **globalName**? : *undefined | string*

Defined in src/main.ts:315

if it is a value in a global scope this will store its name

___

### `Optional` inheritance

• **inheritance**? : *[Inheritance](../enums/_main_.inheritance.md)*

Defined in src/main.ts:318

can this descriptor be inherited

___

### `Optional` name

• **name**? : *undefined | string*

Defined in src/main.ts:253

Unique type name

___

### `Optional` overrideProps

• **overrideProps**? : *undefined | object*

Defined in src/main.ts:286

if `props !== false` this is a predicate to specify which properties should be output.

___

### `Optional` props

• **props**? : *undefined | false | true*

Defined in src/main.ts:267

If !== false the descriptor will traverse own properties too

___

### `Optional` propsDescrMask

• **propsDescrMask**? : *undefined | number*

Defined in src/main.ts:301

mask for property descriptor flags (configurable:1,enumerable:2,writable:4,no value = 8)

___

### `Optional` propsSnapshot

• **propsSnapshot**? : *undefined | false | true*

Defined in src/main.ts:273

Make a snapshot of its original property values and won't write
them if they aren't changed

___

### `Optional` refAware

• **refAware**? : *undefined | false | true*

Defined in src/main.ts:262

If !== false, the descriptor recognizes shared objects and uses only references for them.
The default is `true`.

___

### `Optional` snapshot

• **snapshot**? : *undefined | object*

Defined in src/main.ts:312

for descriptors traversing properties with stores
original values which shouldn't be output

___

### `Optional` strictName

• **strictName**? : *undefined | false | true*

Defined in src/main.ts:289

don't change the `name` to make it unique

___

### `Optional` typeofHint

• **typeofHint**? : *undefined | string*

Defined in src/main.ts:283

`typeof value` for the values this serializes

___

### `Optional` typeofTag

• **typeofTag**? : *undefined | symbol*

Defined in src/main.ts:256

dispatching descriptor by value of `$$typeof` property

___

### `Optional` value

• **value**? : *T*

Defined in src/main.ts:298

constant value

___

### `Optional` valueConstructor

• **valueConstructor**? : *[ValueConstructor](_main_.valueconstructor.md)‹T›*

Defined in src/main.ts:295

Serialized value's constructor

___

### `Optional` valuePrototype

• **valuePrototype**? : *object | null | false*

Defined in src/main.ts:292

a prototype to be assigned with `Object.setPrototype` in reads
