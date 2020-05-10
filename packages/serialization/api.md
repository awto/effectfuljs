<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [@effectful/serialization](#effectfulserialization)
  - [Index](#index)
    - [Modules](#modules)
- [Class: ReadContext](#class-readcontext)
  - [Hierarchy](#hierarchy)
  - [Index](#index-1)
    - [Constructors](#constructors)
    - [Properties](#properties)
    - [Methods](#methods)
  - [Constructors](#constructors-1)
    - [constructor](#constructor)
  - [Properties](#properties-1)
    - [knownSyms](#knownsyms)
    - [opts](#opts)
    - [sharedDescriptors](#shareddescriptors)
    - [sharedJsons](#sharedjsons)
    - [sharedVals](#sharedvals)
    - [`Optional` symsByName](#optional-symsbyname)
  - [Methods](#methods-1)
    - [step](#step)
- [Class: WriteContext](#class-writecontext)
  - [Hierarchy](#hierarchy-1)
  - [Index](#index-2)
    - [Constructors](#constructors-2)
    - [Properties](#properties-2)
    - [Methods](#methods-2)
  - [Constructors](#constructors-3)
    - [constructor](#constructor-1)
  - [Properties](#properties-3)
    - [`Optional` jobs](#optional-jobs)
    - [`Optional` knownSyms](#optional-knownsyms)
    - [opts](#opts-1)
    - [sharedRefs](#sharedrefs)
    - [sharedRefsMap](#sharedrefsmap)
    - [`Optional` symsByName](#optional-symsbyname-1)
  - [Methods](#methods-3)
    - [step](#step-1)
- [Enumeration: Inheritance](#enumeration-inheritance)
  - [Index](#index-3)
    - [Enumeration members](#enumeration-members)
  - [Enumeration members](#enumeration-members-1)
    - [Constructor](#constructor)
    - [Full](#full)
    - [Never](#never)
- [Interface: EventListenerOnceHandler](#interface-eventlisteneroncehandler)
  - [Hierarchy](#hierarchy-2)
  - [Index](#index-4)
    - [Properties](#properties-4)
    - [Methods](#methods-4)
  - [Properties](#properties-5)
    - [capture](#capture)
    - [inner](#inner)
    - [type](#type)
  - [Methods](#methods-5)
    - [handleEvent](#handleevent)
- [Interface: DescriptorOpts <**T**>](#interface-descriptoropts-t)
  - [Type parameters](#type-parameters)
  - [Hierarchy](#hierarchy-3)
  - [Index](#index-5)
    - [Properties](#properties-6)
  - [Properties](#properties-7)
    - [`Optional` default$](#optional-default)
    - [`Optional` defaultPrototype](#optional-defaultprototype)
    - [`Optional` globalName](#optional-globalname)
    - [`Optional` inheritance](#optional-inheritance)
    - [`Optional` name](#optional-name)
    - [`Optional` overrideProps](#optional-overrideprops)
    - [`Optional` props](#optional-props)
    - [`Optional` propsDescrMask](#optional-propsdescrmask)
    - [`Optional` propsSnapshot](#optional-propssnapshot)
    - [`Optional` refAware](#optional-refaware)
    - [`Optional` snapshot](#optional-snapshot)
    - [`Optional` strictName](#optional-strictname)
    - [`Optional` typeofHint](#optional-typeofhint)
    - [`Optional` typeofTag](#optional-typeoftag)
    - [`Optional` value](#optional-value)
    - [`Optional` valueConstructor](#optional-valueconstructor)
    - [`Optional` valuePrototype](#optional-valueprototype)
- [Interface: IncompleteState](#interface-incompletestate)
  - [Hierarchy](#hierarchy-4)
  - [Index](#index-6)
    - [Properties](#properties-8)
  - [Properties](#properties-9)
    - [`Optional` byName](#optional-byname)
    - [`Optional` byObject](#optional-byobject)
    - [`Optional` byTypeOfProp](#optional-bytypeofprop)
    - [`Optional` byValue](#optional-byvalue)
    - [`Optional` symbol](#optional-symbol)
- [Interface: JSONArray](#interface-jsonarray)
  - [Hierarchy](#hierarchy-5)
  - [Indexable](#indexable)
  - [Index](#index-7)
    - [Properties](#properties-10)
    - [Methods](#methods-6)
  - [Properties](#properties-11)
    - [Array](#array)
    - [length](#length)
  - [Methods](#methods-7)
    - [[Symbol.iterator]](#symboliterator)
    - [[Symbol.unscopables]](#symbolunscopables)
    - [concat](#concat)
    - [copyWithin](#copywithin)
    - [entries](#entries)
    - [every](#every)
    - [fill](#fill)
    - [filter](#filter)
    - [find](#find)
    - [findIndex](#findindex)
    - [flat](#flat)
    - [flatMap](#flatmap)
    - [forEach](#foreach)
    - [includes](#includes)
    - [indexOf](#indexof)
    - [join](#join)
    - [keys](#keys)
    - [lastIndexOf](#lastindexof)
    - [map](#map)
    - [pop](#pop)
    - [push](#push)
    - [reduce](#reduce)
    - [reduceRight](#reduceright)
    - [reverse](#reverse)
    - [shift](#shift)
    - [slice](#slice)
    - [some](#some)
    - [sort](#sort)
    - [splice](#splice)
    - [toLocaleString](#tolocalestring)
    - [toString](#tostring)
    - [unshift](#unshift)
    - [values](#values)
- [Interface: JSONObject](#interface-jsonobject)
  - [Hierarchy](#hierarchy-6)
  - [Indexable](#indexable-1)
- [Interface: ReadDescriptor <**T**>](#interface-readdescriptor-t)
  - [Type parameters](#type-parameters-1)
  - [Hierarchy](#hierarchy-7)
  - [Index](#index-8)
    - [Properties](#properties-12)
  - [Properties](#properties-13)
    - [create](#create)
    - [read](#read)
    - [readContent](#readcontent)
    - [reset](#reset)
- [Interface: ReadOptions](#interface-readoptions)
  - [Hierarchy](#hierarchy-8)
  - [Index](#index-9)
    - [Properties](#properties-14)
  - [Properties](#properties-15)
    - [`Optional` ignore](#optional-ignore)
    - [`Optional` knownSyms](#optional-knownsyms-1)
    - [`Optional` refs](#optional-refs)
    - [`Optional` symsByName](#optional-symsbyname-2)
    - [`Optional` warnIgnored](#optional-warnignored)
- [Interface: SharedRefInfo](#interface-sharedrefinfo)
  - [Hierarchy](#hierarchy-9)
  - [Index](#index-10)
    - [Properties](#properties-16)
  - [Properties](#properties-17)
    - [data](#data)
    - [`Optional` descriptor](#optional-descriptor)
    - [`Optional` index](#optional-index)
    - [`Optional` nextJob](#optional-nextjob)
    - [`Optional` parent](#optional-parent)
    - [ref](#ref)
    - [`Optional` started](#optional-started)
    - [`Optional` value](#optional-value-1)
- [Interface: State](#interface-state)
  - [Hierarchy](#hierarchy-10)
  - [Index](#index-11)
    - [Properties](#properties-18)
  - [Properties](#properties-19)
    - [byName](#byname)
    - [byObject](#byobject)
    - [byValue](#byvalue)
    - [symbol](#symbol)
- [Interface: SymbolDescr](#interface-symboldescr)
  - [Hierarchy](#hierarchy-11)
  - [Index](#index-12)
    - [Properties](#properties-20)
  - [Properties](#properties-21)
    - [id](#id)
    - [name](#name)
    - [value](#value)
- [Interface: ValueConstructor <**T**>](#interface-valueconstructor-t)
  - [Type parameters](#type-parameters-2)
  - [Hierarchy](#hierarchy-12)
  - [Index](#index-13)
    - [Constructors](#constructors-4)
    - [Properties](#properties-22)
  - [Constructors](#constructors-5)
    - [constructor](#constructor-2)
  - [Properties](#properties-23)
    - [`Optional` name](#optional-name-1)
- [Interface: WithTypeofTag](#interface-withtypeoftag)
  - [Hierarchy](#hierarchy-13)
  - [Index](#index-14)
    - [Properties](#properties-24)
  - [Properties](#properties-25)
    - [`Optional` $$typeof](#optional-typeof)
- [Interface: WriteDescriptor <**T**>](#interface-writedescriptor-t)
  - [Type parameters](#type-parameters-3)
  - [Hierarchy](#hierarchy-14)
  - [Index](#index-15)
    - [Properties](#properties-26)
  - [Properties](#properties-27)
    - [write](#write)
- [Interface: WriteOptions](#interface-writeoptions)
  - [Hierarchy](#hierarchy-15)
  - [Index](#index-16)
    - [Properties](#properties-28)
  - [Properties](#properties-29)
    - [`Optional` alwaysByRef](#optional-alwaysbyref)
    - [`Optional` ignore](#optional-ignore-1)
    - [`Optional` knownSyms](#optional-knownsyms-2)
    - [`Optional` refs](#optional-refs-1)
    - [`Optional` sharedRefs](#optional-sharedrefs)
    - [`Optional` sharedRefsMap](#optional-sharedrefsmap)
    - [`Optional` symsByName](#optional-symsbyname-3)
    - [`Optional` verbose](#optional-verbose)
    - [`Optional` warnIgnored](#optional-warnignored-1)
- [Module: "dom"](#module-dom)
  - [Index](#index-17)
    - [Namespaces](#namespaces)
    - [Interfaces](#interfaces)
    - [Type aliases](#type-aliases)
    - [Variables](#variables)
    - [Functions](#functions)
    - [Object literals](#object-literals)
  - [Namespaces](#namespaces-1)
    - [__global](#__global)
    - [EventListenerOptions](#eventlisteneroptions)
    - [`Optional` once](#optional-once)
    - [EventTarget](#eventtarget)
    - [[eventsSym]](#eventssym)
  - [Type aliases](#type-aliases-1)
    - [EventMap](#eventmap)
  - [Variables](#variables-1)
    - [`Const` ETp](#const-etp)
    - [`Const` InputDeviceCapabilities](#const-inputdevicecapabilities)
    - [`Const` LocMap](#const-locmap)
    - [`Const` LocWeakMap](#const-locweakmap)
    - [`Const` defineProperty](#const-defineproperty)
    - [`Const` eventsSym](#const-eventssym)
    - [`Const` onceHandlers](#const-oncehandlers)
    - [`Const` savedAddEventListener](#const-savedaddeventlistener)
    - [`Const` savedRemoveEventListener](#const-savedremoveeventlistener)
  - [Functions](#functions-1)
    - [addEventListener](#addeventlistener)
    - [cleanupEvents](#cleanupevents)
    - [nodeListIter](#nodelistiter)
    - [removeEventListener](#removeeventlistener)
    - [restoreEvents](#restoreevents)
    - [track](#track)
    - [trackEvents](#trackevents)
    - [trackGlobalDocument](#trackglobaldocument)
    - [wrapOnceHandleEvent](#wraponcehandleevent)
  - [Object literals](#object-literals-1)
    - [`Const` overrideProps](#const-overrideprops)
    - [▪ **overrideProps**: *object*](#%E2%96%AA-overrideprops-object)
    - [[S.descriptorSymbol]](#sdescriptorsymbol)
- [Module: "main"](#module-main)
  - [Index](#index-18)
    - [Enumerations](#enumerations)
    - [Classes](#classes)
    - [Interfaces](#interfaces-1)
    - [Type aliases](#type-aliases-2)
    - [Variables](#variables-2)
    - [Functions](#functions-2)
    - [Object literals](#object-literals-2)
  - [Type aliases](#type-aliases-3)
    - [Descriptor](#descriptor)
    - [IncompleteDescriptor](#incompletedescriptor)
    - [JSONValue](#jsonvalue)
  - [Variables](#variables-3)
    - [`Const` ArrayDescriptor](#const-arraydescriptor)
    - [`Const` BigIntDescriptor](#const-bigintdescriptor)
    - [`Const` BindDescriptor](#const-binddescriptor)
    - [`Const` LocMap](#const-locmap-1)
    - [`Const` LocSet](#const-locset)
    - [`Const` LocWeakMap](#const-locweakmap-1)
    - [`Const` NaNDescriptor](#const-nandescriptor)
    - [`Const` NotSerializableDescriptor](#const-notserializabledescriptor)
    - [`Const` NotSerializablePlaceholderDescriptor](#const-notserializableplaceholderdescriptor)
    - [`Let` ObjectConstr](#let-objectconstr)
    - [`Const` PojsoDescriptor](#const-pojsodescriptor)
    - [`Const` PrimDescriptor](#const-primdescriptor)
    - [`Const` PropertyDescriptorDescriptor](#const-propertydescriptordescriptor)
    - [`Const` RefDescriptor](#const-refdescriptor)
    - [`Const` SymbolDescriptor](#const-symboldescriptor)
    - [`Const` UndefDescriptor](#const-undefdescriptor)
    - [`Const` WeakMapWorkaround](#const-weakmapworkaround)
    - [`Const` WeakSetWorkaround](#const-weaksetworkaround)
    - [`Let` __effectfulSerializationState](#let-__effectfulserializationstate)
    - [`Const` boundArgsSymbol](#const-boundargssymbol)
    - [`Const` boundFunSymbol](#const-boundfunsymbol)
    - [`Const` boundThisSymbol](#const-boundthissymbol)
    - [`Let` descriptorByName](#let-descriptorbyname)
    - [`Let` descriptorByObject](#let-descriptorbyobject)
    - [`Let` descriptorByTypeOfProp](#let-descriptorbytypeofprop)
    - [`Let` descriptorByValue](#let-descriptorbyvalue)
    - [`Let` descriptorSymbol](#let-descriptorsymbol)
    - [`Const` emptyArr](#const-emptyarr)
    - [`Const` hasPropDefault](#const-haspropdefault)
    - [`Const` notSerializablePlaceholder](#const-notserializableplaceholder)
    - [`Const` notSerializableTraps](#const-notserializabletraps)
    - [`Let` state](#let-state)
    - [`Const` undefinedSymbol](#const-undefinedsymbol)
  - [Functions](#functions-3)
    - [bind](#bind)
    - [defaultCreate](#defaultcreate)
    - [defaultRead](#defaultread)
    - [defaultReset](#defaultreset)
    - [defaultWrite](#defaultwrite)
    - [descrFlags](#descrflags)
    - [getFirst](#getfirst)
    - [getJsonDescriptor](#getjsondescriptor)
    - [`Let` getObjectDescriptor](#let-getobjectdescriptor)
    - [getState](#getstate)
    - [`Let` getValueDescriptor](#let-getvaluedescriptor)
    - [guessDescriptorName](#guessdescriptorname)
    - [guessObjectName](#guessobjectname)
    - [hasProp](#hasprop)
    - [initializeState](#initializestate)
    - [iterableDescriptor](#iterabledescriptor)
    - [makeBind](#makebind)
    - [notSerializableRead](#notserializableread)
    - [parse](#parse)
    - [propFlags](#propflags)
    - [propsDescriptor](#propsdescriptor)
    - [read](#read-1)
    - [readPropDescriptor](#readpropdescriptor)
    - [readPropName](#readpropname)
    - [readProps](#readprops)
    - [readSym](#readsym)
    - [rebindGlobal](#rebindglobal)
    - [refAwareDescriptor](#refawaredescriptor)
    - [regAutoOpaqueConstr](#regautoopaqueconstr)
    - [regConstructor](#regconstructor)
    - [regDescriptor](#regdescriptor)
    - [regGlobal](#regglobal)
    - [regNewConstructor](#regnewconstructor)
    - [regObjectDescriptorGetter](#regobjectdescriptorgetter)
    - [regOpaqueObject](#regopaqueobject)
    - [regOpaquePrim](#regopaqueprim)
    - [regOpaqueRec](#regopaquerec)
    - [regPrim](#regprim)
    - [regPropertyDescriptor](#regpropertydescriptor)
    - [regValueDescriptorGetter](#regvaluedescriptorgetter)
    - [resetState](#resetstate)
    - [showStack](#showstack)
    - [specValueDescriptor](#specvaluedescriptor)
    - [stringify](#stringify)
    - [updateInitialSnapshot](#updateinitialsnapshot)
    - [write](#write-1)
    - [writeProp](#writeprop)
    - [writeProps](#writeprops)
    - [writeSym](#writesym)
  - [Object literals](#object-literals-3)
    - [`Const` NotSerializableToken](#const-notserializabletoken)
    - [▪ **NotSerializableToken**: *object*](#%E2%96%AA-notserializabletoken-object)
    - [_notSerializable](#_notserializable)
    - [`Const` ObjectPropertiesDescriptor](#const-objectpropertiesdescriptor)
    - [▪ **ObjectPropertiesDescriptor**: *object*](#%E2%96%AA-objectpropertiesdescriptor-object)
    - [create](#create-1)
    - [readContent](#readcontent-1)
    - [write](#write-2)
    - [`Const` OpaqueDescriptor](#const-opaquedescriptor)
    - [▪ **OpaqueDescriptor**: *object*](#%E2%96%AA-opaquedescriptor-object)
    - [default$](#default)
    - [create](#create-2)
    - [write](#write-3)
    - [`Const` OpaquePrimDescriptor](#const-opaqueprimdescriptor)
    - [▪ **OpaquePrimDescriptor**: *object*](#%E2%96%AA-opaqueprimdescriptor-object)
    - [props](#props)
    - [`Const` defaultOverrideProps](#const-defaultoverrideprops)
    - [▪ **defaultOverrideProps**: *object*](#%E2%96%AA-defaultoverrideprops-object)
    - [[descriptorSymbol]](#descriptorsymbol)
    - [`Const` descriptorTemplate](#const-descriptortemplate)
    - [▪ **descriptorTemplate**: *object*](#%E2%96%AA-descriptortemplate-object)
    - [create](#create-3)
    - [read](#read-2)
    - [reset](#reset-1)
    - [write](#write-4)
    - [readContent](#readcontent-2)
    - [`Const` funcOverrideProps](#const-funcoverrideprops)
    - [▪ **funcOverrideProps**: *object*](#%E2%96%AA-funcoverrideprops-object)
    - [arguments](#arguments)
    - [caller](#caller)
    - [length](#length-1)
    - [name](#name-1)
    - [`Const` options](#const-options)
    - [▪ **options**: *object*](#%E2%96%AA-options-object)
    - [descriptorSymForOpaque](#descriptorsymforopaque)
    - [`Const` savedConsol](#const-savedconsol)
    - [▪ **savedConsol**: *object*](#%E2%96%AA-savedconsol-object)
    - [log](#log)
    - [warn](#warn)
    - [`Const` savedObject](#const-savedobject)
    - [▪ **savedObject**: *object*](#%E2%96%AA-savedobject-object)
- [Serialization library for @effectful toolchain](#serialization-library-for-effectful-toolchain)
    - [assign](#assign)
    - [create](#create-4)
    - [defineProperty](#defineproperty)
    - [getOwnPropertyDescriptor](#getownpropertydescriptor)
    - [getOwnPropertyDescriptors](#getownpropertydescriptors)
    - [getOwnPropertyNames](#getownpropertynames)
    - [getOwnPropertySymbols](#getownpropertysymbols)
    - [getPrototypeOf](#getprototypeof)
    - [setPrototypeOf](#setprototypeof)
    - [`Const` undef](#const-undef)
    - [▪ **undef**: *object*](#%E2%96%AA-undef-object)
    - [_undef](#_undef)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


<a name="readmemd"></a>

[@effectful/serialization](#readmemd)

# @effectful/serialization

## Index

### Modules

* ["dom"](#modules_dom_md)
* ["main"](#modules_main_md)


<a name="classes_main_readcontextmd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [ReadContext](#classes_main_readcontextmd)

# Class: ReadContext

An object passed to Descriptor's `read` method to support recursive invocation
for nested values

## Hierarchy

* **ReadContext**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [knownSyms](#knownsyms)
* [opts](#opts)
* [sharedDescriptors](#shareddescriptors)
* [sharedJsons](#sharedjsons)
* [sharedVals](#sharedvals)
* [symsByName](#optional-symsbyname)

### Methods

* [step](#step)

## Constructors

###  constructor

\+ **new ReadContext**(`opts`: [ReadOptions](#interfaces_main_readoptionsmd), `sharedJsons`: [JSONValue](#jsonvalue)[]): *[ReadContext](#classes_main_readcontextmd)*

Defined in src/main.ts:607

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ReadOptions](#interfaces_main_readoptionsmd) |
`sharedJsons` | [JSONValue](#jsonvalue)[] |

**Returns:** *[ReadContext](#classes_main_readcontextmd)*

## Properties

###  knownSyms

• **knownSyms**: *Map‹symbol, [SymbolDescr](#interfaces_main_symboldescrmd)›*

Defined in src/main.ts:603

___

###  opts

• **opts**: *[ReadOptions](#interfaces_main_readoptionsmd)*

Defined in src/main.ts:607

___

###  sharedDescriptors

• **sharedDescriptors**: *[Descriptor](#descriptor)[]*

Defined in src/main.ts:606

___

###  sharedJsons

• **sharedJsons**: *[JSONValue](#jsonvalue)[]*

Defined in src/main.ts:604

___

###  sharedVals

• **sharedVals**: *any[]*

Defined in src/main.ts:605

___

### `Optional` symsByName

• **symsByName**? : *Map‹string, [SymbolDescr](#interfaces_main_symboldescrmd)[]›*

Defined in src/main.ts:602

## Methods

###  step

▸ **step**(`json`: [JSONValue](#jsonvalue)): *any*

Defined in src/main.ts:621

Invokes read recursively for nested values

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`json` | [JSONValue](#jsonvalue) | value to read  |

**Returns:** *any*


<a name="classes_main_writecontextmd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [WriteContext](#classes_main_writecontextmd)

# Class: WriteContext

An object passed to Descriptor's `write` method to support recursive
invocation for nested values

## Hierarchy

* **WriteContext**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [jobs](#optional-jobs)
* [knownSyms](#optional-knownsyms)
* [opts](#opts)
* [sharedRefs](#sharedrefs)
* [sharedRefsMap](#sharedrefsmap)
* [symsByName](#optional-symsbyname)

### Methods

* [step](#step)

## Constructors

###  constructor

\+ **new WriteContext**(`opts`: [WriteOptions](#interfaces_main_writeoptionsmd)): *[WriteContext](#classes_main_writecontextmd)*

Defined in src/main.ts:533

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [WriteOptions](#interfaces_main_writeoptionsmd) |

**Returns:** *[WriteContext](#classes_main_writecontextmd)*

## Properties

### `Optional` jobs

• **jobs**? : *[SharedRefInfo](#interfaces_main_sharedrefinfomd)*

Defined in src/main.ts:533

___

### `Optional` knownSyms

• **knownSyms**? : *Map‹symbol, [SymbolDescr](#interfaces_main_symboldescrmd)›*

Defined in src/main.ts:532

___

###  opts

• **opts**: *[WriteOptions](#interfaces_main_writeoptionsmd)*

Defined in src/main.ts:530

___

###  sharedRefs

• **sharedRefs**: *[SharedRefInfo](#interfaces_main_sharedrefinfomd)[]*

Defined in src/main.ts:529

___

###  sharedRefsMap

• **sharedRefsMap**: *Map‹any, [SharedRefInfo](#interfaces_main_sharedrefinfomd)›*

Defined in src/main.ts:528

___

### `Optional` symsByName

• **symsByName**? : *Map‹string, [SymbolDescr](#interfaces_main_symboldescrmd)[]›*

Defined in src/main.ts:531

## Methods

###  step

▸ **step**(`value`: any, `parent`: [JSONArray](#interfaces_main_jsonarraymd) | [JSONObject](#interfaces_main_jsonobjectmd), `key`: number | string): *[JSONValue](#jsonvalue)*

Defined in src/main.ts:551

Invokes write recursively for nested values

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | any | value to write |
`parent` | [JSONArray](#interfaces_main_jsonarraymd) &#124; [JSONObject](#interfaces_main_jsonobjectmd) | container for the value output |
`key` | number &#124; string | either name of a field if parent is an object               or number index if it is an array  |

**Returns:** *[JSONValue](#jsonvalue)*


<a name="enums_main_inheritancemd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [Inheritance](#enums_main_inheritancemd)

# Enumeration: Inheritance

## Index

### Enumeration members

* [Constructor](#constructor)
* [Full](#full)
* [Never](#never)

## Enumeration members

###  Constructor

• **Constructor**:

Defined in src/main.ts:26

___

###  Full

• **Full**:

Defined in src/main.ts:22

___

###  Never

• **Never**:

Defined in src/main.ts:24


<a name="interfaces_dom_eventlisteneroncehandlermd"></a>

[@effectful/serialization](#readmemd) › ["dom"](#modules_dom_md) › [EventListenerOnceHandler](#interfaces_dom_eventlisteneroncehandlermd)

# Interface: EventListenerOnceHandler

## Hierarchy

* EventListenerObject

  ↳ **EventListenerOnceHandler**

## Index

### Properties

* [capture](#capture)
* [inner](#inner)
* [type](#type)

### Methods

* [handleEvent](#handleevent)

## Properties

###  capture

• **capture**: *boolean*

Defined in src/dom.ts:76

___

###  inner

• **inner**: *EventListenerOrEventListenerObject*

Defined in src/dom.ts:74

___

###  type

• **type**: *string*

Defined in src/dom.ts:75

## Methods

###  handleEvent

▸ **handleEvent**(`evt`: Event): *void*

*Inherited from [EventListenerOnceHandler](#interfaces_dom_eventlisteneroncehandlermd).[handleEvent](#handleevent)*

Defined in node_modules/typescript/lib/lib.dom.d.ts:5514

**Parameters:**

Name | Type |
------ | ------ |
`evt` | Event |

**Returns:** *void*


<a name="interfaces_main_descriptoroptsmd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [DescriptorOpts](#interfaces_main_descriptoroptsmd)

# Interface: DescriptorOpts <**T**>

## Type parameters

▪ **T**

## Hierarchy

* **DescriptorOpts**

## Index

### Properties

* [default$](#optional-default)
* [defaultPrototype](#optional-defaultprototype)
* [globalName](#optional-globalname)
* [inheritance](#optional-inheritance)
* [name](#optional-name)
* [overrideProps](#optional-overrideprops)
* [props](#optional-props)
* [propsDescrMask](#optional-propsdescrmask)
* [propsSnapshot](#optional-propssnapshot)
* [refAware](#optional-refaware)
* [snapshot](#optional-snapshot)
* [strictName](#optional-strictname)
* [typeofHint](#optional-typeofhint)
* [typeofTag](#optional-typeoftag)
* [value](#optional-value)
* [valueConstructor](#optional-valueconstructor)
* [valuePrototype](#optional-valueprototype)

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

• **inheritance**? : *[Inheritance](#enums_main_inheritancemd)*

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

• **valueConstructor**? : *[ValueConstructor](#interfaces_main_valueconstructormd)‹T›*

Defined in src/main.ts:295

Serialized value's constructor

___

### `Optional` valuePrototype

• **valuePrototype**? : *object | null | false*

Defined in src/main.ts:292

a prototype to be assigned with `Object.setPrototype` in reads


<a name="interfaces_main_incompletestatemd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [IncompleteState](#interfaces_main_incompletestatemd)

# Interface: IncompleteState

## Hierarchy

* **IncompleteState**

## Index

### Properties

* [byName](#optional-byname)
* [byObject](#optional-byobject)
* [byTypeOfProp](#optional-bytypeofprop)
* [byValue](#optional-byvalue)
* [symbol](#optional-symbol)

## Properties

### `Optional` byName

• **byName**? : *Map‹string, [Descriptor](#descriptor)›*

Defined in src/main.ts:74

___

### `Optional` byObject

• **byObject**? : *WeakMap‹any, [Descriptor](#descriptor)›*

Defined in src/main.ts:76

___

### `Optional` byTypeOfProp

• **byTypeOfProp**? : *Map‹symbol, [Descriptor](#descriptor)›*

Defined in src/main.ts:77

___

### `Optional` byValue

• **byValue**? : *Map‹any, [Descriptor](#descriptor)›*

Defined in src/main.ts:75

___

### `Optional` symbol

• **symbol**? : *undefined | symbol*

Defined in src/main.ts:73


<a name="interfaces_main_jsonarraymd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [JSONArray](#interfaces_main_jsonarraymd)

# Interface: JSONArray

`JSON.stringify` serializable Array

## Hierarchy

* [Array](#array)‹[JSONValue](#jsonvalue)›

  ↳ **JSONArray**

## Indexable

* \[ **n**: *number*\]: [JSONValue](#jsonvalue)

`JSON.stringify` serializable Array

## Index

### Properties

* [Array](#array)
* [length](#length)

### Methods

* [[Symbol.iterator]](_main_.jsonarray.md#[symbol.iterator])
* [[Symbol.unscopables]](_main_.jsonarray.md#[symbol.unscopables])
* [concat](#concat)
* [copyWithin](#copywithin)
* [entries](#entries)
* [every](#every)
* [fill](#fill)
* [filter](#filter)
* [find](#find)
* [findIndex](#findindex)
* [flat](#flat)
* [flatMap](#flatmap)
* [forEach](#foreach)
* [includes](#includes)
* [indexOf](#indexof)
* [join](#join)
* [keys](#keys)
* [lastIndexOf](#lastindexof)
* [map](#map)
* [pop](#pop)
* [push](#push)
* [reduce](#reduce)
* [reduceRight](#reduceright)
* [reverse](#reverse)
* [shift](#shift)
* [slice](#slice)
* [some](#some)
* [sort](#sort)
* [splice](#splice)
* [toLocaleString](#tolocalestring)
* [toString](#tostring)
* [unshift](#unshift)
* [values](#values)

## Properties

###  Array

• **Array**: *ArrayConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1385

___

###  length

• **length**: *number*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[length](#length)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1215

Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.

## Methods

###  [Symbol.iterator]

▸ **[Symbol.iterator]**(): *IterableIterator‹[JSONValue](#jsonvalue)›*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[[Symbol.iterator]](_main_.jsonarray.md#[symbol.iterator])*

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:60

Iterator

**Returns:** *IterableIterator‹[JSONValue](#jsonvalue)›*

___

###  [Symbol.unscopables]

▸ **[Symbol.unscopables]**(): *object*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[[Symbol.unscopables]](_main_.jsonarray.md#[symbol.unscopables])*

Defined in node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:94

Returns an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

**Returns:** *object*

* **copyWithin**: *boolean*

* **entries**: *boolean*

* **fill**: *boolean*

* **find**: *boolean*

* **findIndex**: *boolean*

* **keys**: *boolean*

* **values**: *boolean*

___

###  concat

▸ **concat**(...`items`: ConcatArray‹[JSONValue](#jsonvalue)›[]): *[JSONValue](#jsonvalue)[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[concat](#concat)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1237

Combines two or more arrays.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | ConcatArray‹[JSONValue](#jsonvalue)›[] | Additional items to add to the end of array1.  |

**Returns:** *[JSONValue](#jsonvalue)[]*

▸ **concat**(...`items`: T | ConcatArray‹T›[]): *[JSONValue](#jsonvalue)[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[concat](#concat)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1242

Combines two or more arrays.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | T &#124; ConcatArray‹T›[] | Additional items to add to the end of array1.  |

**Returns:** *[JSONValue](#jsonvalue)[]*

___

###  copyWithin

▸ **copyWithin**(`target`: number, `start`: number, `end?`: undefined | number): *this*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[copyWithin](#copywithin)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:64

Returns the this object after copying a section of the array identified by start and end
to the same array starting at position target

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | number | If target is negative, it is treated as length+target where length is the length of the array. |
`start` | number | If start is negative, it is treated as length+start. If end is negative, it is treated as length+end. |
`end?` | undefined &#124; number | If not specified, length of the this object is used as its default value.  |

**Returns:** *this*

___

###  entries

▸ **entries**(): *IterableIterator‹[number, [JSONValue](#jsonvalue)]›*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[entries](#entries)*

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:65

Returns an iterable of key, value pairs for every entry in the array

**Returns:** *IterableIterator‹[number, [JSONValue](#jsonvalue)]›*

___

###  every

▸ **every**(`callbackfn`: function, `thisArg?`: any): *boolean*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[every](#every)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1310

Determines whether all the members of an array satisfy the specified test.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The every method calls
the callbackfn function for each element in the array until the callbackfn returns a value
which is coercible to the Boolean value false, or until the end of the array.

▸ (`value`: [JSONValue](#jsonvalue), `index`: number, `array`: [JSONValue](#jsonvalue)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](#jsonvalue) |
`index` | number |
`array` | [JSONValue](#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function.
If thisArg is omitted, undefined is used as the this value.

**Returns:** *boolean*

___

###  fill

▸ **fill**(`value`: [JSONValue](#jsonvalue), `start?`: undefined | number, `end?`: undefined | number): *this*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[fill](#fill)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:53

Returns the this object after filling the section identified by start and end with value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [JSONValue](#jsonvalue) | value to fill array section with |
`start?` | undefined &#124; number | index to start filling the array at. If start is negative, it is treated as length+start where length is the length of the array. |
`end?` | undefined &#124; number | index to stop filling the array at. If end is negative, it is treated as length+end.  |

**Returns:** *this*

___

###  filter

▸ **filter**<**S**>(`callbackfn`: function, `thisArg?`: any): *S[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[filter](#filter)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1337

Returns the elements of an array that meet the condition specified in a callback function.

**Type parameters:**

▪ **S**: *[JSONValue](#jsonvalue)*

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.

▸ (`value`: [JSONValue](#jsonvalue), `index`: number, `array`: [JSONValue](#jsonvalue)[]): *value is S*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](#jsonvalue) |
`index` | number |
`array` | [JSONValue](#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *S[]*

▸ **filter**(`callbackfn`: function, `thisArg?`: any): *[JSONValue](#jsonvalue)[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[filter](#filter)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1343

Returns the elements of an array that meet the condition specified in a callback function.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.

▸ (`value`: [JSONValue](#jsonvalue), `index`: number, `array`: [JSONValue](#jsonvalue)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](#jsonvalue) |
`index` | number |
`array` | [JSONValue](#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *[JSONValue](#jsonvalue)[]*

___

###  find

▸ **find**<**S**>(`predicate`: function, `thisArg?`: any): *S | undefined*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[find](#find)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:31

Returns the value of the first element in the array where predicate is true, and undefined
otherwise.

**Type parameters:**

▪ **S**: *[JSONValue](#jsonvalue)*

**Parameters:**

▪ **predicate**: *function*

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found, find
immediately returns that element value. Otherwise, find returns undefined.

▸ (`this`: void, `value`: [JSONValue](#jsonvalue), `index`: number, `obj`: [JSONValue](#jsonvalue)[]): *value is S*

**Parameters:**

Name | Type |
------ | ------ |
`this` | void |
`value` | [JSONValue](#jsonvalue) |
`index` | number |
`obj` | [JSONValue](#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

**Returns:** *S | undefined*

▸ **find**(`predicate`: function, `thisArg?`: any): *[JSONValue](#jsonvalue) | undefined*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[find](#find)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:32

**Parameters:**

▪ **predicate**: *function*

▸ (`value`: [JSONValue](#jsonvalue), `index`: number, `obj`: [JSONValue](#jsonvalue)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](#jsonvalue) |
`index` | number |
`obj` | [JSONValue](#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

**Returns:** *[JSONValue](#jsonvalue) | undefined*

___

###  findIndex

▸ **findIndex**(`predicate`: function, `thisArg?`: any): *number*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[findIndex](#findindex)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:43

Returns the index of the first element in the array where predicate is true, and -1
otherwise.

**Parameters:**

▪ **predicate**: *function*

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found,
findIndex immediately returns that element index. Otherwise, findIndex returns -1.

▸ (`value`: [JSONValue](#jsonvalue), `index`: number, `obj`: [JSONValue](#jsonvalue)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](#jsonvalue) |
`index` | number |
`obj` | [JSONValue](#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

**Returns:** *number*

___

###  flat

▸ **flat**<**U**>(`this`: U[][][][][][][][], `depth`: 7): *U[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[flat](#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:158

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][][][][][][][] | - |
`depth` | 7 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[][][][][][][], `depth`: 6): *U[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[flat](#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:166

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][][][][][][] | - |
`depth` | 6 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[][][][][][], `depth`: 5): *U[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[flat](#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:174

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][][][][][] | - |
`depth` | 5 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[][][][][], `depth`: 4): *U[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[flat](#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:182

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][][][][] | - |
`depth` | 4 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[][][][], `depth`: 3): *U[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[flat](#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:190

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][][][] | - |
`depth` | 3 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[][][], `depth`: 2): *U[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[flat](#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:198

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][][] | - |
`depth` | 2 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[][], `depth?`: undefined | 1): *U[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[flat](#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:206

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][] | - |
`depth?` | undefined &#124; 1 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[], `depth`: 0): *U[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[flat](#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:214

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[] | - |
`depth` | 0 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`depth?`: undefined | number): *any[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[flat](#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:222

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth. If no depth is provided, flat method defaults to the depth of 1.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`depth?` | undefined &#124; number | The maximum recursion depth  |

**Returns:** *any[]*

___

###  flatMap

▸ **flatMap**<**U**, **This**>(`callback`: function, `thisArg?`: This): *U[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[flatMap](#flatmap)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:147

Calls a defined callback function on each element of an array. Then, flattens the result into
a new array.
This is identical to a map followed by flat with depth 1.

**Type parameters:**

▪ **U**

▪ **This**

**Parameters:**

▪ **callback**: *function*

A function that accepts up to three arguments. The flatMap method calls the
callback function one time for each element in the array.

▸ (`this`: This, `value`: [JSONValue](#jsonvalue), `index`: number, `array`: [JSONValue](#jsonvalue)[]): *U | ReadonlyArray‹U›*

**Parameters:**

Name | Type |
------ | ------ |
`this` | This |
`value` | [JSONValue](#jsonvalue) |
`index` | number |
`array` | [JSONValue](#jsonvalue)[] |

▪`Optional`  **thisArg**: *This*

An object to which the this keyword can refer in the callback function. If
thisArg is omitted, undefined is used as the this value.

**Returns:** *U[]*

___

###  forEach

▸ **forEach**(`callbackfn`: function, `thisArg?`: any): *void*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[forEach](#foreach)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1325

Performs the specified action for each element in an array.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.

▸ (`value`: [JSONValue](#jsonvalue), `index`: number, `array`: [JSONValue](#jsonvalue)[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](#jsonvalue) |
`index` | number |
`array` | [JSONValue](#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *void*

___

###  includes

▸ **includes**(`searchElement`: [JSONValue](#jsonvalue), `fromIndex?`: undefined | number): *boolean*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[includes](#includes)*

Defined in node_modules/typescript/lib/lib.es2016.array.include.d.ts:27

Determines whether an array includes a certain element, returning true or false as appropriate.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`searchElement` | [JSONValue](#jsonvalue) | The element to search for. |
`fromIndex?` | undefined &#124; number | The position in this array at which to begin searching for searchElement.  |

**Returns:** *boolean*

___

###  indexOf

▸ **indexOf**(`searchElement`: [JSONValue](#jsonvalue), `fromIndex?`: undefined | number): *number*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[indexOf](#indexof)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1295

Returns the index of the first occurrence of a value in an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`searchElement` | [JSONValue](#jsonvalue) | The value to locate in the array. |
`fromIndex?` | undefined &#124; number | The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.  |

**Returns:** *number*

___

###  join

▸ **join**(`separator?`: undefined | string): *string*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[join](#join)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1247

Adds all the elements of an array separated by the specified separator string.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`separator?` | undefined &#124; string | A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.  |

**Returns:** *string*

___

###  keys

▸ **keys**(): *IterableIterator‹number›*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[keys](#keys)*

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:70

Returns an iterable of keys in the array

**Returns:** *IterableIterator‹number›*

___

###  lastIndexOf

▸ **lastIndexOf**(`searchElement`: [JSONValue](#jsonvalue), `fromIndex?`: undefined | number): *number*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[lastIndexOf](#lastindexof)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1301

Returns the index of the last occurrence of a specified value in an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`searchElement` | [JSONValue](#jsonvalue) | The value to locate in the array. |
`fromIndex?` | undefined &#124; number | The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.  |

**Returns:** *number*

___

###  map

▸ **map**<**U**>(`callbackfn`: function, `thisArg?`: any): *U[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[map](#map)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1331

Calls a defined callback function on each element of an array, and returns an array that contains the results.

**Type parameters:**

▪ **U**

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.

▸ (`value`: [JSONValue](#jsonvalue), `index`: number, `array`: [JSONValue](#jsonvalue)[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](#jsonvalue) |
`index` | number |
`array` | [JSONValue](#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *U[]*

___

###  pop

▸ **pop**(): *[JSONValue](#jsonvalue) | undefined*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[pop](#pop)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1227

Removes the last element from an array and returns it.

**Returns:** *[JSONValue](#jsonvalue) | undefined*

___

###  push

▸ **push**(...`items`: [JSONValue](#jsonvalue)[]): *number*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[push](#push)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1232

Appends new elements to an array, and returns the new length of the array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | [JSONValue](#jsonvalue)[] | New elements of the Array.  |

**Returns:** *number*

___

###  reduce

▸ **reduce**(`callbackfn`: function): *[JSONValue](#jsonvalue)*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[reduce](#reduce)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1349

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: [JSONValue](#jsonvalue), `currentValue`: [JSONValue](#jsonvalue), `currentIndex`: number, `array`: [JSONValue](#jsonvalue)[]): *[JSONValue](#jsonvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | [JSONValue](#jsonvalue) |
`currentValue` | [JSONValue](#jsonvalue) |
`currentIndex` | number |
`array` | [JSONValue](#jsonvalue)[] |

**Returns:** *[JSONValue](#jsonvalue)*

▸ **reduce**(`callbackfn`: function, `initialValue`: [JSONValue](#jsonvalue)): *[JSONValue](#jsonvalue)*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[reduce](#reduce)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1350

**Parameters:**

▪ **callbackfn**: *function*

▸ (`previousValue`: [JSONValue](#jsonvalue), `currentValue`: [JSONValue](#jsonvalue), `currentIndex`: number, `array`: [JSONValue](#jsonvalue)[]): *[JSONValue](#jsonvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | [JSONValue](#jsonvalue) |
`currentValue` | [JSONValue](#jsonvalue) |
`currentIndex` | number |
`array` | [JSONValue](#jsonvalue)[] |

▪ **initialValue**: *[JSONValue](#jsonvalue)*

**Returns:** *[JSONValue](#jsonvalue)*

▸ **reduce**<**U**>(`callbackfn`: function, `initialValue`: U): *U*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[reduce](#reduce)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1356

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Type parameters:**

▪ **U**

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: U, `currentValue`: [JSONValue](#jsonvalue), `currentIndex`: number, `array`: [JSONValue](#jsonvalue)[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | U |
`currentValue` | [JSONValue](#jsonvalue) |
`currentIndex` | number |
`array` | [JSONValue](#jsonvalue)[] |

▪ **initialValue**: *U*

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

**Returns:** *U*

___

###  reduceRight

▸ **reduceRight**(`callbackfn`: function): *[JSONValue](#jsonvalue)*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[reduceRight](#reduceright)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1362

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: [JSONValue](#jsonvalue), `currentValue`: [JSONValue](#jsonvalue), `currentIndex`: number, `array`: [JSONValue](#jsonvalue)[]): *[JSONValue](#jsonvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | [JSONValue](#jsonvalue) |
`currentValue` | [JSONValue](#jsonvalue) |
`currentIndex` | number |
`array` | [JSONValue](#jsonvalue)[] |

**Returns:** *[JSONValue](#jsonvalue)*

▸ **reduceRight**(`callbackfn`: function, `initialValue`: [JSONValue](#jsonvalue)): *[JSONValue](#jsonvalue)*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[reduceRight](#reduceright)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1363

**Parameters:**

▪ **callbackfn**: *function*

▸ (`previousValue`: [JSONValue](#jsonvalue), `currentValue`: [JSONValue](#jsonvalue), `currentIndex`: number, `array`: [JSONValue](#jsonvalue)[]): *[JSONValue](#jsonvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | [JSONValue](#jsonvalue) |
`currentValue` | [JSONValue](#jsonvalue) |
`currentIndex` | number |
`array` | [JSONValue](#jsonvalue)[] |

▪ **initialValue**: *[JSONValue](#jsonvalue)*

**Returns:** *[JSONValue](#jsonvalue)*

▸ **reduceRight**<**U**>(`callbackfn`: function, `initialValue`: U): *U*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[reduceRight](#reduceright)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1369

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Type parameters:**

▪ **U**

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: U, `currentValue`: [JSONValue](#jsonvalue), `currentIndex`: number, `array`: [JSONValue](#jsonvalue)[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | U |
`currentValue` | [JSONValue](#jsonvalue) |
`currentIndex` | number |
`array` | [JSONValue](#jsonvalue)[] |

▪ **initialValue**: *U*

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

**Returns:** *U*

___

###  reverse

▸ **reverse**(): *[JSONValue](#jsonvalue)[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[reverse](#reverse)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1251

Reverses the elements in an Array.

**Returns:** *[JSONValue](#jsonvalue)[]*

___

###  shift

▸ **shift**(): *[JSONValue](#jsonvalue) | undefined*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[shift](#shift)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1255

Removes the first element from an array and returns it.

**Returns:** *[JSONValue](#jsonvalue) | undefined*

___

###  slice

▸ **slice**(`start?`: undefined | number, `end?`: undefined | number): *[JSONValue](#jsonvalue)[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[slice](#slice)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1261

Returns a section of an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start?` | undefined &#124; number | The beginning of the specified portion of the array. |
`end?` | undefined &#124; number | The end of the specified portion of the array. This is exclusive of the element at the index 'end'.  |

**Returns:** *[JSONValue](#jsonvalue)[]*

___

###  some

▸ **some**(`callbackfn`: function, `thisArg?`: any): *boolean*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[some](#some)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1319

Determines whether the specified callback function returns true for any element of an array.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The some method calls
the callbackfn function for each element in the array until the callbackfn returns a value
which is coercible to the Boolean value true, or until the end of the array.

▸ (`value`: [JSONValue](#jsonvalue), `index`: number, `array`: [JSONValue](#jsonvalue)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](#jsonvalue) |
`index` | number |
`array` | [JSONValue](#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function.
If thisArg is omitted, undefined is used as the this value.

**Returns:** *boolean*

___

###  sort

▸ **sort**(`compareFn?`: undefined | function): *this*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[sort](#sort)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1271

Sorts an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`compareFn?` | undefined &#124; function | Function used to determine the order of the elements. It is expected to return a negative value if first argument is less than second argument, zero if they're equal and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order. ```ts [11,2,22,1].sort((a, b) => a - b) ```  |

**Returns:** *this*

___

###  splice

▸ **splice**(`start`: number, `deleteCount?`: undefined | number): *[JSONValue](#jsonvalue)[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[splice](#splice)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1277

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start` | number | The zero-based location in the array from which to start removing elements. |
`deleteCount?` | undefined &#124; number | The number of elements to remove.  |

**Returns:** *[JSONValue](#jsonvalue)[]*

▸ **splice**(`start`: number, `deleteCount`: number, ...`items`: [JSONValue](#jsonvalue)[]): *[JSONValue](#jsonvalue)[]*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[splice](#splice)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1284

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start` | number | The zero-based location in the array from which to start removing elements. |
`deleteCount` | number | The number of elements to remove. |
`...items` | [JSONValue](#jsonvalue)[] | Elements to insert into the array in place of the deleted elements.  |

**Returns:** *[JSONValue](#jsonvalue)[]*

___

###  toLocaleString

▸ **toLocaleString**(): *string*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[toLocaleString](#tolocalestring)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1223

Returns a string representation of an array. The elements are converted to string using their toLocalString methods.

**Returns:** *string*

___

###  toString

▸ **toString**(): *string*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[toString](#tostring)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1219

Returns a string representation of an array.

**Returns:** *string*

___

###  unshift

▸ **unshift**(...`items`: [JSONValue](#jsonvalue)[]): *number*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[unshift](#unshift)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1289

Inserts new elements at the start of an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | [JSONValue](#jsonvalue)[] | Elements to insert at the start of the Array.  |

**Returns:** *number*

___

###  values

▸ **values**(): *IterableIterator‹[JSONValue](#jsonvalue)›*

*Inherited from [JSONArray](#interfaces_main_jsonarraymd).[values](#values)*

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:75

Returns an iterable of values in the array

**Returns:** *IterableIterator‹[JSONValue](#jsonvalue)›*


<a name="interfaces_main_jsonobjectmd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [JSONObject](#interfaces_main_jsonobjectmd)

# Interface: JSONObject

`JSON.stringify` serializable Object

## Hierarchy

* **JSONObject**

## Indexable

* \[ **name**: *string*\]: [JSONValue](#jsonvalue)

`JSON.stringify` serializable Object


<a name="interfaces_main_readdescriptormd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [ReadDescriptor](#interfaces_main_readdescriptormd)

# Interface: ReadDescriptor <**T**>

Describes how to read values of a type

## Type parameters

▪ **T**

## Hierarchy

* **ReadDescriptor**

## Index

### Properties

* [create](#create)
* [read](#read)
* [readContent](#readcontent)
* [reset](#reset)

## Properties

###  create

• **create**: *function*

Defined in src/main.ts:229

The first part of `read`, just creates a corresponding value without traversing into children.
This is needed to avoid infinite loops on recursive values.

**`param`** recursive reads handling for sub-values

**`param`** input JSON

**`returns`** - resulting JS value

#### Type declaration:

▸ (`ctx`: [ReadContext](#classes_main_readcontextmd), `json`: [JSONValue](#jsonvalue)): *T*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`json` | [JSONValue](#jsonvalue) |

___

###  read

• **read**: *function*

Defined in src/main.ts:221

Reads value from `json` value

**`param`** recursive reads handling for sub-values

**`param`** input JSON

**`returns`** - resulting JS value

#### Type declaration:

▸ (`ctx`: [ReadContext](#classes_main_readcontextmd), `json`: [JSONValue](#jsonvalue)): *T*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`json` | [JSONValue](#jsonvalue) |

___

###  readContent

• **readContent**: *function*

Defined in src/main.ts:244

The second part of `read`, creates children and sets them into `value`.
This is needed to avoid infinite loops on recursive values.

**`param`** recursive reads handling for sub-values

**`param`** input JSON

**`param`** resulting JS value

#### Type declaration:

▸ (`ctx`: [ReadContext](#classes_main_readcontextmd), `json`: [JSONValue](#jsonvalue), `value`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`json` | [JSONValue](#jsonvalue) |
`value` | T |

___

###  reset

• **reset**: *function*

Defined in src/main.ts:236

Like `create` but for values which are already built, and only must be reset to some initial sate

**`param`** recursive reads handling for sub-values

**`param`** input JSON

**`param`** resulting JS value

#### Type declaration:

▸ (`ctx`: [ReadContext](#classes_main_readcontextmd), `value`: T, `json`: [JSONValue](#jsonvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`value` | T |
`json` | [JSONValue](#jsonvalue) |


<a name="interfaces_main_readoptionsmd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [ReadOptions](#interfaces_main_readoptionsmd)

# Interface: ReadOptions

Options to amend `write` behavior

## Hierarchy

* **ReadOptions**

## Index

### Properties

* [ignore](#optional-ignore)
* [knownSyms](#optional-knownsyms)
* [refs](#optional-refs)
* [symsByName](#optional-symsbyname)
* [warnIgnored](#optional-warnignored)

## Properties

### `Optional` ignore

• **ignore**? : *boolean | "placeholder"*

Defined in src/main.ts:170

don't throw exception if there is any reading error

___

### `Optional` knownSyms

• **knownSyms**? : *Map‹symbol, [SymbolDescr](#interfaces_main_symboldescrmd)›*

Defined in src/main.ts:179

holds information about seen local Symbols, it can be copied between runs

___

### `Optional` refs

• **refs**? : *any[]*

Defined in src/main.ts:181

references to shared object values

___

### `Optional` symsByName

• **symsByName**? : *Map‹string, [SymbolDescr](#interfaces_main_symboldescrmd)[]›*

Defined in src/main.ts:175

holds information about seen local Symbols, it can be copied between runs

___

### `Optional` warnIgnored

• **warnIgnored**? : *undefined | false | true*

Defined in src/main.ts:171


<a name="interfaces_main_sharedrefinfomd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [SharedRefInfo](#interfaces_main_sharedrefinfomd)

# Interface: SharedRefInfo

## Hierarchy

* **SharedRefInfo**

## Index

### Properties

* [data](#data)
* [descriptor](#optional-descriptor)
* [index](#optional-index)
* [nextJob](#optional-nextjob)
* [parent](#optional-parent)
* [ref](#ref)
* [started](#optional-started)
* [value](#optional-value)

## Properties

###  data

• **data**: *[JSONObject](#interfaces_main_jsonobjectmd) | null*

Defined in src/main.ts:514

___

### `Optional` descriptor

• **descriptor**? : *[Descriptor](#descriptor)‹any›*

Defined in src/main.ts:518

___

### `Optional` index

• **index**? : *string | number*

Defined in src/main.ts:516

___

### `Optional` nextJob

• **nextJob**? : *[SharedRefInfo](#interfaces_main_sharedrefinfomd)*

Defined in src/main.ts:519

___

### `Optional` parent

• **parent**? : *[JSONObject](#interfaces_main_jsonobjectmd) | [JSONArray](#interfaces_main_jsonarraymd)*

Defined in src/main.ts:515

___

###  ref

• **ref**: *[JSONObject](#interfaces_main_jsonobjectmd) | null*

Defined in src/main.ts:513

___

### `Optional` started

• **started**? : *undefined | false | true*

Defined in src/main.ts:520

___

### `Optional` value

• **value**? : *any*

Defined in src/main.ts:517


<a name="interfaces_main_statemd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [State](#interfaces_main_statemd)

# Interface: State

## Hierarchy

* **State**

## Index

### Properties

* [byName](#byname)
* [byObject](#byobject)
* [byValue](#byvalue)
* [symbol](#symbol)

## Properties

###  byName

• **byName**: *Map‹string, [Descriptor](#descriptor)›*

Defined in src/main.ts:56

descriptors registered by type's name

___

###  byObject

• **byObject**: *WeakMap‹any, [Descriptor](#descriptor)›*

Defined in src/main.ts:60

descriptors registered by some value

___

###  byValue

• **byValue**: *Map‹any, [Descriptor](#descriptor)›*

Defined in src/main.ts:58

descriptors registered by some primitive value

___

###  symbol

• **symbol**: *symbol*

Defined in src/main.ts:54

name for a property storing descriptor


<a name="interfaces_main_symboldescrmd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [SymbolDescr](#interfaces_main_symboldescrmd)

# Interface: SymbolDescr

## Hierarchy

* **SymbolDescr**

## Index

### Properties

* [id](#id)
* [name](#name)
* [value](#value)

## Properties

###  id

• **id**: *number*

Defined in src/main.ts:1397

___

###  name

• **name**: *string*

Defined in src/main.ts:1396

___

###  value

• **value**: *symbol*

Defined in src/main.ts:1398


<a name="interfaces_main_valueconstructormd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [ValueConstructor](#interfaces_main_valueconstructormd)

# Interface: ValueConstructor <**T**>

## Type parameters

▪ **T**

## Hierarchy

* **ValueConstructor**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [name](#optional-name)

## Constructors

###  constructor

\+ **new ValueConstructor**(...`args`: any[]): *T*

Defined in src/main.ts:322

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *T*

## Properties

### `Optional` name

• **name**? : *undefined | string*

Defined in src/main.ts:322


<a name="interfaces_main_withtypeoftagmd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [WithTypeofTag](#interfaces_main_withtypeoftagmd)

# Interface: WithTypeofTag

## Hierarchy

* **WithTypeofTag**

## Index

### Properties

* [$typeof](#optional-typeof)

## Properties

### `Optional` $$typeof

• **$$typeof**? : *undefined | symbol*

Defined in src/main.ts:248


<a name="interfaces_main_writedescriptormd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [WriteDescriptor](#interfaces_main_writedescriptormd)

# Interface: WriteDescriptor <**T**>

Describes how write values of a type

## Type parameters

▪ **T**

## Hierarchy

* **WriteDescriptor**

## Index

### Properties

* [write](#write)

## Properties

###  write

• **write**: *function*

Defined in src/main.ts:335

Sets `value` into `parent` on `index` position

**`param`** recursive writes for sub-values

**`param`** container for the value output

**`param`** either name of a field if parent is an object
                or number index if it is an array

#### Type declaration:

▸ (`ctx`: [WriteContext](#classes_main_writecontextmd), `value`: T, `parent`: [JSONObject](#interfaces_main_jsonobjectmd) | [JSONArray](#interfaces_main_jsonarraymd), `index`: number | string): *[JSONValue](#jsonvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](#classes_main_writecontextmd) |
`value` | T |
`parent` | [JSONObject](#interfaces_main_jsonobjectmd) &#124; [JSONArray](#interfaces_main_jsonarraymd) |
`index` | number &#124; string |


<a name="interfaces_main_writeoptionsmd"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md) › [WriteOptions](#interfaces_main_writeoptionsmd)

# Interface: WriteOptions

Options to amend `write` behavior

## Hierarchy

* **WriteOptions**

## Index

### Properties

* [alwaysByRef](#optional-alwaysbyref)
* [ignore](#optional-ignore)
* [knownSyms](#optional-knownsyms)
* [refs](#optional-refs)
* [sharedRefs](#optional-sharedrefs)
* [sharedRefsMap](#optional-sharedrefsmap)
* [symsByName](#optional-symsbyname)
* [verbose](#optional-verbose)
* [warnIgnored](#optional-warnignored)

## Properties

### `Optional` alwaysByRef

• **alwaysByRef**? : *undefined | false | true*

Defined in src/main.ts:161

by default the serializer uses references only if the object is referred more than once
this may still lead to stack overflow in `JSON.stringify` esp. if the data has some
structures like linked lists, this option will always generate a reference

___

### `Optional` ignore

• **ignore**? : *boolean | "opaque" | "placeholder"*

Defined in src/main.ts:136

don't throw exception if there is any writting error

___

### `Optional` knownSyms

• **knownSyms**? : *Map‹symbol, [SymbolDescr](#interfaces_main_symboldescrmd)›*

Defined in src/main.ts:155

holds information about seen local Symbols, it can be copied between runs

___

### `Optional` refs

• **refs**? : *any[]*

Defined in src/main.ts:164

if this array is initialized it will be filled with the shared object's values

___

### `Optional` sharedRefs

• **sharedRefs**? : *[SharedRefInfo](#interfaces_main_sharedrefinfomd)[]*

Defined in src/main.ts:147

___

### `Optional` sharedRefsMap

• **sharedRefsMap**? : *Map‹any, [SharedRefInfo](#interfaces_main_sharedrefinfomd)›*

Defined in src/main.ts:145

current reference's id assignment state,
this can be copied between writes to keep same refs ids

___

### `Optional` symsByName

• **symsByName**? : *Map‹string, [SymbolDescr](#interfaces_main_symboldescrmd)[]›*

Defined in src/main.ts:151

holds information about seen local Symbols, it can be copied between runs

___

### `Optional` verbose

• **verbose**? : *undefined | false | true*

Defined in src/main.ts:162

___

### `Optional` warnIgnored

• **warnIgnored**? : *undefined | false | true*

Defined in src/main.ts:140

execute `console.warn` for each ignored value (if `ignore` isn't falsy)


<a name="modules_dom_md"></a>

[@effectful/serialization](#readmemd) › ["dom"](#modules_dom_md)

# Module: "dom"

## Index

### Namespaces

* [__global](#__global)

### Interfaces

* [EventListenerOnceHandler](#interfaces_dom_eventlisteneroncehandlermd)

### Type aliases

* [EventMap](#eventmap)

### Variables

* [ETp](#const-etp)
* [InputDeviceCapabilities](#const-inputdevicecapabilities)
* [LocMap](#const-locmap)
* [LocWeakMap](#const-locweakmap)
* [defineProperty](#const-defineproperty)
* [eventsSym](#const-eventssym)
* [onceHandlers](#const-oncehandlers)
* [savedAddEventListener](#const-savedaddeventlistener)
* [savedRemoveEventListener](#const-savedremoveeventlistener)

### Functions

* [addEventListener](#addeventlistener)
* [cleanupEvents](#cleanupevents)
* [nodeListIter](#nodelistiter)
* [removeEventListener](#removeeventlistener)
* [restoreEvents](#restoreevents)
* [track](#track)
* [trackEvents](#trackevents)
* [trackGlobalDocument](#trackglobaldocument)
* [wrapOnceHandleEvent](#wraponcehandleevent)

### Object literals

* [overrideProps](#const-overrideprops)

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

• **[eventsSym]**: *[EventMap](#eventmap)*

Defined in src/dom.ts:41

## Type aliases

###  EventMap

Ƭ **EventMap**: *Map‹string, Map‹EventListenerOrEventListenerObject, undefined | AddEventListenerOptions[][]››*

Defined in src/dom.ts:31

## Variables

### `Const` ETp

• **ETp**: *false | [EventTarget](#eventtarget)* = typeof EventTarget !== "undefined" && EventTarget.prototype

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

• **onceHandlers**: *WeakMap‹EventListener | EventListenerObject, [EventListenerOnceHandler](#interfaces_dom_eventlisteneroncehandlermd)›* = new LocWeakMap<
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

▸ **addEventListener**(`this`: [EventTarget](#eventtarget), `type`: string, `listener`: EventListenerOrEventListenerObject, `options?`: boolean | AddEventListenerOptions): *void*

Defined in src/dom.ts:103

`EventTarget#addEventListener` wrapper which keeps the listener's reference

**Parameters:**

Name | Type |
------ | ------ |
`this` | [EventTarget](#eventtarget) |
`type` | string |
`listener` | EventListenerOrEventListenerObject |
`options?` | boolean &#124; AddEventListenerOptions |

**Returns:** *void*

___

###  cleanupEvents

▸ **cleanupEvents**(`et`: [EventTarget](#eventtarget)): *void*

Defined in src/dom.ts:58

**Parameters:**

Name | Type |
------ | ------ |
`et` | [EventTarget](#eventtarget) |

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

▸ **removeEventListener**(`this`: [EventTarget](#eventtarget), `type`: string, `listener`: EventListenerOrEventListenerObject, `options?`: boolean | [EventListenerOptions](#eventlisteneroptions)): *void*

Defined in src/dom.ts:151

`EventTarget#removeEventListener` wrapper which keeps the listener's reference

**Parameters:**

Name | Type |
------ | ------ |
`this` | [EventTarget](#eventtarget) |
`type` | string |
`listener` | EventListenerOrEventListenerObject |
`options?` | boolean &#124; [EventListenerOptions](#eventlisteneroptions) |

**Returns:** *void*

___

###  restoreEvents

▸ **restoreEvents**(`et`: [EventTarget](#eventtarget), `map`: [EventMap](#eventmap)): *void*

Defined in src/dom.ts:47

**Parameters:**

Name | Type |
------ | ------ |
`et` | [EventTarget](#eventtarget) |
`map` | [EventMap](#eventmap) |

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

▸ **trackEvents**(`ev`: [EventTarget](#eventtarget)): *void*

Defined in src/dom.ts:180

monkey patching `addEventListener`/`removeEventListener`
to keep reference to event listeners

**Parameters:**

Name | Type |
------ | ------ |
`ev` | [EventTarget](#eventtarget) |

**Returns:** *void*

___

###  trackGlobalDocument

▸ **trackGlobalDocument**(): *void*

Defined in src/dom.ts:186

monkey patching global `document` to make it serializable

**Returns:** *void*

___

###  wrapOnceHandleEvent

▸ **wrapOnceHandleEvent**(`this`: [EventListenerOnceHandler](#interfaces_dom_eventlisteneroncehandlermd), `event`: Event): *void*

Defined in src/dom.ts:86

**Parameters:**

Name | Type |
------ | ------ |
`this` | [EventListenerOnceHandler](#interfaces_dom_eventlisteneroncehandlermd) |
`event` | Event |

**Returns:** *void*

## Object literals

### `Const` overrideProps

### ▪ **overrideProps**: *object*

Defined in src/dom.ts:45

###  [S.descriptorSymbol]

• **[S.descriptorSymbol]**: *boolean* = false

Defined in src/dom.ts:45


<a name="modules_main_md"></a>

[@effectful/serialization](#readmemd) › ["main"](#modules_main_md)

# Module: "main"

## Index

### Enumerations

* [Inheritance](#enums_main_inheritancemd)

### Classes

* [ReadContext](#classes_main_readcontextmd)
* [WriteContext](#classes_main_writecontextmd)

### Interfaces

* [DescriptorOpts](#interfaces_main_descriptoroptsmd)
* [IncompleteState](#interfaces_main_incompletestatemd)
* [JSONArray](#interfaces_main_jsonarraymd)
* [JSONObject](#interfaces_main_jsonobjectmd)
* [ReadDescriptor](#interfaces_main_readdescriptormd)
* [ReadOptions](#interfaces_main_readoptionsmd)
* [SharedRefInfo](#interfaces_main_sharedrefinfomd)
* [State](#interfaces_main_statemd)
* [SymbolDescr](#interfaces_main_symboldescrmd)
* [ValueConstructor](#interfaces_main_valueconstructormd)
* [WithTypeofTag](#interfaces_main_withtypeoftagmd)
* [WriteDescriptor](#interfaces_main_writedescriptormd)
* [WriteOptions](#interfaces_main_writeoptionsmd)

### Type aliases

* [Descriptor](#descriptor)
* [IncompleteDescriptor](#incompletedescriptor)
* [JSONValue](#jsonvalue)

### Variables

* [ArrayDescriptor](#const-arraydescriptor)
* [BigIntDescriptor](#const-bigintdescriptor)
* [BindDescriptor](#const-binddescriptor)
* [LocMap](#const-locmap)
* [LocSet](#const-locset)
* [LocWeakMap](#const-locweakmap)
* [NaNDescriptor](#const-nandescriptor)
* [NotSerializableDescriptor](#const-notserializabledescriptor)
* [NotSerializablePlaceholderDescriptor](#const-notserializableplaceholderdescriptor)
* [ObjectConstr](#let-objectconstr)
* [PojsoDescriptor](#const-pojsodescriptor)
* [PrimDescriptor](#const-primdescriptor)
* [PropertyDescriptorDescriptor](#const-propertydescriptordescriptor)
* [RefDescriptor](#const-refdescriptor)
* [SymbolDescriptor](#const-symboldescriptor)
* [UndefDescriptor](#const-undefdescriptor)
* [WeakMapWorkaround](#const-weakmapworkaround)
* [WeakSetWorkaround](#const-weaksetworkaround)
* [__effectfulSerializationState](#let-__effectfulserializationstate)
* [boundArgsSymbol](#const-boundargssymbol)
* [boundFunSymbol](#const-boundfunsymbol)
* [boundThisSymbol](#const-boundthissymbol)
* [descriptorByName](#let-descriptorbyname)
* [descriptorByObject](#let-descriptorbyobject)
* [descriptorByTypeOfProp](#let-descriptorbytypeofprop)
* [descriptorByValue](#let-descriptorbyvalue)
* [descriptorSymbol](#let-descriptorsymbol)
* [emptyArr](#const-emptyarr)
* [hasPropDefault](#const-haspropdefault)
* [notSerializablePlaceholder](#const-notserializableplaceholder)
* [notSerializableTraps](#const-notserializabletraps)
* [state](#let-state)
* [undefinedSymbol](#const-undefinedsymbol)

### Functions

* [bind](#bind)
* [defaultCreate](#defaultcreate)
* [defaultRead](#defaultread)
* [defaultReset](#defaultreset)
* [defaultWrite](#defaultwrite)
* [descrFlags](#descrflags)
* [getFirst](#getfirst)
* [getJsonDescriptor](#getjsondescriptor)
* [getObjectDescriptor](#let-getobjectdescriptor)
* [getState](#getstate)
* [getValueDescriptor](#let-getvaluedescriptor)
* [guessDescriptorName](#guessdescriptorname)
* [guessObjectName](#guessobjectname)
* [hasProp](#hasprop)
* [initializeState](#initializestate)
* [iterableDescriptor](#iterabledescriptor)
* [makeBind](#makebind)
* [notSerializableRead](#notserializableread)
* [parse](#parse)
* [propFlags](#propflags)
* [propsDescriptor](#propsdescriptor)
* [read](#read)
* [readPropDescriptor](#readpropdescriptor)
* [readPropName](#readpropname)
* [readProps](#readprops)
* [readSym](#readsym)
* [rebindGlobal](#rebindglobal)
* [refAwareDescriptor](#refawaredescriptor)
* [regAutoOpaqueConstr](#regautoopaqueconstr)
* [regConstructor](#regconstructor)
* [regDescriptor](#regdescriptor)
* [regGlobal](#regglobal)
* [regNewConstructor](#regnewconstructor)
* [regObjectDescriptorGetter](#regobjectdescriptorgetter)
* [regOpaqueObject](#regopaqueobject)
* [regOpaquePrim](#regopaqueprim)
* [regOpaqueRec](#regopaquerec)
* [regPrim](#regprim)
* [regPropertyDescriptor](#regpropertydescriptor)
* [regValueDescriptorGetter](#regvaluedescriptorgetter)
* [resetState](#resetstate)
* [showStack](#showstack)
* [specValueDescriptor](#specvaluedescriptor)
* [stringify](#stringify)
* [updateInitialSnapshot](#updateinitialsnapshot)
* [write](#write)
* [writeProp](#writeprop)
* [writeProps](#writeprops)
* [writeSym](#writesym)

### Object literals

* [NotSerializableToken](#const-notserializabletoken)
* [ObjectPropertiesDescriptor](#const-objectpropertiesdescriptor)
* [OpaqueDescriptor](#const-opaquedescriptor)
* [OpaquePrimDescriptor](#const-opaqueprimdescriptor)
* [defaultOverrideProps](#const-defaultoverrideprops)
* [descriptorTemplate](#const-descriptortemplate)
* [funcOverrideProps](#const-funcoverrideprops)
* [options](#const-options)
* [savedConsol](#const-savedconsol)
* [savedObject](#const-savedobject)
* [undef](#const-undef)

## Type aliases

###  Descriptor

Ƭ **Descriptor**: *[WriteDescriptor](#interfaces_main_writedescriptormd)‹T› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹T› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹T›*

Defined in src/main.ts:343

___

###  IncompleteDescriptor

Ƭ **IncompleteDescriptor**: *[DescriptorOpts](#interfaces_main_descriptoroptsmd)‹T› & object*

Defined in src/main.ts:350

simplified version of a descriptor where missed properties can be calculated

___

###  JSONValue

Ƭ **JSONValue**: *boolean | number | string | [JSONObject](#interfaces_main_jsonobjectmd) | [JSONArray](#interfaces_main_jsonarraymd) | null*

Defined in src/main.ts:185

`JSON.stringify` serializable value

## Variables

### `Const` ArrayDescriptor

• **ArrayDescriptor**: *[WriteDescriptor](#interfaces_main_writedescriptormd)‹any› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹any› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹any›* = regNewConstructor(Array, {
  ...descriptorTemplate,
  write(ctx: WriteContext, value: unknown[]): JSONArray {
    const json: JSONArray = [];
    for (const i of value) json.push(ctx.step(i, json, json.length));
    return json;
  },
  readContent(ctx: ReadContext, json: JSONValue, value: unknown[]) {
    for (const i of <JSONArray>json) value.push(ctx.step(i));
  },
  reset(_ctx, value) {
    value.length = 0;
  },
  props: false,
  default$: false,
  globalName: "Array"
})

Defined in src/main.ts:1579

___

### `Const` BigIntDescriptor

• **BigIntDescriptor**: *[WriteDescriptor](#interfaces_main_writedescriptormd)‹number› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹number› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹number› | [WriteDescriptor](#interfaces_main_writedescriptormd)‹BigInt› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹BigInt› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹BigInt›* = typeof BigInt === "function"
    ? regDescriptor({
        read(_: ReadContext, json: JSONValue): BigInt {
          return BigInt((<JSONObject>json).int);
        },
        write(_: WriteContext, value: BigInt) {
          return { int: value.toString() };
        },
        name: "Int",
        refAware: false,
        props: false
      })
    : regDescriptor({
        name: "Int",
        read(_: ReadContext, json: JSONValue): number {
          return <number>(<JSONObject>json).int;
        },
        write(_: WriteContext, value: number): JSONValue {
          return { int: String(value) };
        },
        refAware: false,
        props: false
      })

Defined in src/main.ts:1453

___

### `Const` BindDescriptor

• **BindDescriptor**: *[WriteDescriptor](#interfaces_main_writedescriptormd)‹function› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹function› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹function›* = regDescriptor({
  name: "Bind",
  create() {
    return makeBind();
  },
  write() {
    return {};
  },
  overrideProps: { ...funcOverrideProps, prototype: false },
  inheritance: Inheritance.Never
})

Defined in src/main.ts:480

___

### `Const` LocMap

• **LocMap**: *MapConstructor* = Map

Defined in src/main.ts:42

___

### `Const` LocSet

• **LocSet**: *SetConstructor* = Set

Defined in src/main.ts:44

___

### `Const` LocWeakMap

• **LocWeakMap**: *WeakMapConstructor* = WeakMap

Defined in src/main.ts:43

___

### `Const` NaNDescriptor

• **NaNDescriptor**: *[WriteDescriptor](#interfaces_main_writedescriptormd)‹number› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹number› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹number›* = specValueDescriptor("NaN", NaN)

Defined in src/main.ts:1442

___

### `Const` NotSerializableDescriptor

• **NotSerializableDescriptor**: *[WriteDescriptor](#interfaces_main_writedescriptormd)‹void› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹void› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹void›* = regDescriptor({
  name: "NotSerializableToken",
  read() {
    throw new TypeError("Trying to use not serializable value");
  },
  create() {},
  readContent() {},
  write(): JSONValue {
    return NotSerializableToken;
  },
  props: false,
  refAware: false,
  default$: false
})

Defined in src/main.ts:1020

___

### `Const` NotSerializablePlaceholderDescriptor

• **NotSerializablePlaceholderDescriptor**: *[WriteDescriptor](#interfaces_main_writedescriptormd)‹any› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹any› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹any›* = regDescriptor({
  name: "NotSerializable",
  read: notSerializableRead,
  create: notSerializableRead,
  readContent() {},
  write(): JSONValue {
    return {};
  },
  props: false,
  refAware: false
})

Defined in src/main.ts:1035

___

### `Let` ObjectConstr

• **ObjectConstr**: *ObjectConstructor* = Object

Defined in src/main.ts:97

___

### `Const` PojsoDescriptor

• **PojsoDescriptor**: *[WriteDescriptor](#interfaces_main_writedescriptormd)‹any› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹any› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹any›* = regDescriptor({
  ...descriptorTemplate,
  name: "Object"
})

Defined in src/main.ts:1069

___

### `Const` PrimDescriptor

• **PrimDescriptor**: *[Descriptor](#descriptor)* = regDescriptor({
  name: "Prim",
  read(_: ReadContext, json: JSONValue): any {
    return json;
  },
  create(_: ReadContext, json: JSONValue): any {
    return json;
  },
  write(_: WriteContext, value: any): JSONValue {
    return value;
  },
  refAware: false,
  props: false,
  default$: false
})

Defined in src/main.ts:1074

___

### `Const` PropertyDescriptorDescriptor

• **PropertyDescriptorDescriptor**: *[WriteDescriptor](#interfaces_main_writedescriptormd)‹PropertyDescriptor› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹PropertyDescriptor› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹PropertyDescriptor›* = regDescriptor({
  read(_ctx: ReadContext, _json: JSONValue): PropertyDescriptor {
    return {};
  },
  readContent(ctx: ReadContext, json: JSONValue, value: PropertyDescriptor) {
    readPropDescriptor(
      ctx,
      (<any>json).v,
      (<any>json).f || 0,
      (<any>json).s,
      (<any>json).g,
      value
    );
  },
  write(ctx: WriteContext, value: PropertyDescriptor) {
    const res = writeProp(ctx, [], value, descrFlags(value));
    if (!res) return {};
    return <any>{ v: res[0], f: res[1], s: res[2], g: res[3] };
  },
  name: "PD",
  props: false
})

Defined in src/main.ts:1960

shorter format for properties descriptors

___

### `Const` RefDescriptor

• **RefDescriptor**: *[Descriptor](#descriptor)* = regDescriptor({
  name: "Ref",
  read(ctx: ReadContext, json: JSONValue): any {
    return ctx.sharedVals[<number>(<JSONObject>json).r];
  }
})

Defined in src/main.ts:1090

___

### `Const` SymbolDescriptor

• **SymbolDescriptor**: *[WriteDescriptor](#interfaces_main_writedescriptormd)‹symbol› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹symbol› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹symbol›* = regDescriptor<symbol>({
  write: writeSym,
  read: readSym,
  name: "Symbol",
  refAware: false,
  props: false
})

Defined in src/main.ts:1445

___

### `Const` UndefDescriptor

• **UndefDescriptor**: *[WriteDescriptor](#interfaces_main_writedescriptormd)‹undefined› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹undefined› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹undefined›* = specValueDescriptor("undefined", void 0)

Defined in src/main.ts:1443

___

### `Const` WeakMapWorkaround

• **WeakMapWorkaround**: *WeakMap* = class WeakMap {
  prop: symbol;
  constructor() {
    this.prop = Symbol("@effectful/weakmap");
  }
  set(key: any, value: any) {
    switch (typeof key) {
      case "function":
      case "object":
        Object.defineProperty(key, this.prop, {
          configurable: true,
          writable: true,
          value
        });
        break;
      default:
        throw TypeError("Invalid value used in weak map");
    }
    return this;
  }
  get(key: any) {
    return key[this.prop];
  }
  delete(key: any) {
    if (!key[this.prop]) return false;
    delete key[this.prop];
    return true;
  }
  has(value: any) {
    return Object.prototype.hasOwnProperty.call(value, this.prop);
  }
}

Defined in src/main.ts:1648

___

### `Const` WeakSetWorkaround

• **WeakSetWorkaround**: *WeakSet* = class WeakSet {
  prop: symbol;
  constructor() {
    this.prop = Symbol("@effectful/weakset");
  }
  add(value: any) {
    switch (typeof value) {
      case "function":
      case "object":
        Object.defineProperty(value, this.prop, {
          configurable: true,
          writable: true,
          value: true
        });
        break;
      default:
        throw TypeError("Invalid value used in weak set");
    }
    return this;
  }
  delete(value: any) {
    if (!value[this.prop]) return false;
    delete value[this.prop];
    return true;
  }
  has(value: any) {
    return !!value[this.prop];
  }
}

Defined in src/main.ts:1618

___

### `Let` __effectfulSerializationState

• **__effectfulSerializationState**: *[IncompleteState](#interfaces_main_incompletestatemd)*

Defined in src/main.ts:81

symbol for storing global state

___

### `Const` boundArgsSymbol

• **boundArgsSymbol**: *unique symbol* = Symbol("@effectful/bind/args")

Defined in src/main.ts:466

___

### `Const` boundFunSymbol

• **boundFunSymbol**: *unique symbol* = Symbol("@effectful/bind/fun")

Defined in src/main.ts:467

___

### `Const` boundThisSymbol

• **boundThisSymbol**: *unique symbol* = Symbol("@effectful/bind/this")

Defined in src/main.ts:465

___

### `Let` descriptorByName

• **descriptorByName**: *Map‹string, [Descriptor](#descriptor)›* = state.byName

Defined in src/main.ts:102

___

### `Let` descriptorByObject

• **descriptorByObject**: *WeakMap‹any, [Descriptor](#descriptor)›* = state.byObject

Defined in src/main.ts:104

___

### `Let` descriptorByTypeOfProp

• **descriptorByTypeOfProp**: *Map‹symbol, [Descriptor](#descriptor)›* = state.byTypeOfProp

Defined in src/main.ts:105

___

### `Let` descriptorByValue

• **descriptorByValue**: *Map‹any, [Descriptor](#descriptor)›* = state.byValue

Defined in src/main.ts:103

___

### `Let` descriptorSymbol

• **descriptorSymbol**: *symbol* = state.symbol

Defined in src/main.ts:100

name of a property to specify `Descriptor` for JS value

___

### `Const` emptyArr

• **emptyArr**: *any[]* = []

Defined in src/main.ts:422

Converts JSON Object returned by [write](#write) back to JS Object

**`param`** object to read

___

### `Const` hasPropDefault

• **hasPropDefault**: *hasOwnProperty* = Object.prototype.hasOwnProperty

Defined in src/main.ts:46

___

### `Const` notSerializablePlaceholder

• **notSerializablePlaceholder**: *any* = new Proxy(function () {},
notSerializableTraps)

Defined in src/main.ts:1956

an object which is replaces all not serializable values after read

___

### `Const` notSerializableTraps

• **notSerializableTraps**: *any*

Defined in src/main.ts:1920

___

### `Let` state

• **state**: *[State](#interfaces_main_statemd)* = initializeState(__effectfulSerializationState)

Defined in src/main.ts:95

___

### `Const` undefinedSymbol

• **undefinedSymbol**: *unique symbol* = Symbol("@effectful/serialization/undefined")

Defined in src/main.ts:1393

## Functions

###  bind

▸ **bind**(`func`: function, `self`: any, ...`args`: any[]): *function*

Defined in src/main.ts:500

like `Function.prototype.bind` but returs serializable object if all
arguments are serializable

**Parameters:**

▪ **func**: *function*

▸ (...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

▪ **self**: *any*

bound `this`

▪... **args**: *any[]*

bound arguments

**Returns:** *function*

▸ (...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

___

###  defaultCreate

▸ **defaultCreate**<**T**>(`this`: [Descriptor](#descriptor)‹T›, `ctx`: [ReadContext](#classes_main_readcontextmd), `json`: [JSONValue](#jsonvalue)): *T*

Defined in src/main.ts:641

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Descriptor](#descriptor)‹T› |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`json` | [JSONValue](#jsonvalue) |

**Returns:** *T*

___

###  defaultRead

▸ **defaultRead**<**T**>(`this`: [ReadDescriptor](#interfaces_main_readdescriptormd)‹T›, `ctx`: [ReadContext](#classes_main_readcontextmd), `json`: [JSONValue](#jsonvalue)): *T*

Defined in src/main.ts:1330

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`this` | [ReadDescriptor](#interfaces_main_readdescriptormd)‹T› |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`json` | [JSONValue](#jsonvalue) |

**Returns:** *T*

___

###  defaultReset

▸ **defaultReset**(): *void*

Defined in src/main.ts:666

**Returns:** *void*

___

###  defaultWrite

▸ **defaultWrite**<**T**>(`this`: [Descriptor](#descriptor)‹T›, `ctx`: [WriteContext](#classes_main_writecontextmd), `value`: T): *[JSONValue](#jsonvalue)*

Defined in src/main.ts:626

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Descriptor](#descriptor)‹T› |
`ctx` | [WriteContext](#classes_main_writecontextmd) |
`value` | T |

**Returns:** *[JSONValue](#jsonvalue)*

___

###  descrFlags

▸ **descrFlags**(`descr`: PropertyDescriptor): *number*

Defined in src/main.ts:1118

**Parameters:**

Name | Type |
------ | ------ |
`descr` | PropertyDescriptor |

**Returns:** *number*

___

###  getFirst

▸ **getFirst**<**T**>(`v`: [T]): *T*

Defined in src/main.ts:1326

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`v` | [T] |

**Returns:** *T*

___

###  getJsonDescriptor

▸ **getJsonDescriptor**(`ctx`: [ReadContext](#classes_main_readcontextmd), `json`: [JSONValue](#jsonvalue)): *[Descriptor](#descriptor)*

Defined in src/main.ts:1547

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`json` | [JSONValue](#jsonvalue) |

**Returns:** *[Descriptor](#descriptor)*

___

### `Let` getObjectDescriptor

▸ **getObjectDescriptor**<**T**>(`value`: T): *[Descriptor](#descriptor)‹T› | undefined*

Defined in src/main.ts:1480

**Type parameters:**

▪ **T**: *[WithTypeofTag](#interfaces_main_withtypeoftagmd)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *[Descriptor](#descriptor)‹T› | undefined*

___

###  getState

▸ **getState**(): *[State](#interfaces_main_statemd)*

Defined in src/main.ts:121

**Returns:** *[State](#interfaces_main_statemd)*

___

### `Let` getValueDescriptor

▸ **getValueDescriptor**(`value`: any): *[Descriptor](#descriptor) | undefined*

Defined in src/main.ts:1512

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *[Descriptor](#descriptor) | undefined*

___

###  guessDescriptorName

▸ **guessDescriptorName**(`descriptor`: [DescriptorOpts](#interfaces_main_descriptoroptsmd)): *string*

Defined in src/main.ts:891

Tries to derive name for the `descriptor`.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`descriptor` | [DescriptorOpts](#interfaces_main_descriptoroptsmd) |   |

**Returns:** *string*

___

###  guessObjectName

▸ **guessObjectName**(`value`: any): *string*

Defined in src/main.ts:880

Tries to derive name for the `value`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | any |   |

**Returns:** *string*

___

###  hasProp

▸ **hasProp**(`obj`: any, `name`: symbol): *boolean*

Defined in src/main.ts:48

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`name` | symbol |

**Returns:** *boolean*

___

###  initializeState

▸ **initializeState**(`init`: [IncompleteState](#interfaces_main_incompletestatemd)): *[State](#interfaces_main_statemd)*

Defined in src/main.ts:83

**Parameters:**

Name | Type |
------ | ------ |
`init` | [IncompleteState](#interfaces_main_incompletestatemd) |

**Returns:** *[State](#interfaces_main_statemd)*

___

###  iterableDescriptor

▸ **iterableDescriptor**<**T**>(`descriptor`: [IncompleteDescriptor](#incompletedescriptor)‹T›): *[IncompleteDescriptor](#incompletedescriptor)‹T›*

Defined in src/main.ts:1597

**Type parameters:**

▪ **T**: *Iterable‹unknown›*

**Parameters:**

Name | Type |
------ | ------ |
`descriptor` | [IncompleteDescriptor](#incompletedescriptor)‹T› |

**Returns:** *[IncompleteDescriptor](#incompletedescriptor)‹T›*

___

###  makeBind

▸ **makeBind**(): *function*

Defined in src/main.ts:469

**Returns:** *function*

▸ (...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

___

###  notSerializableRead

▸ **notSerializableRead**(`this`: [Descriptor](#descriptor)): *any*

Defined in src/main.ts:1047

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Descriptor](#descriptor) |

**Returns:** *any*

___

###  parse

▸ **parse**(`json`: string): *any*

Defined in src/main.ts:461

`JSON.parse` followed by `read`

**Parameters:**

Name | Type |
------ | ------ |
`json` | string |

**Returns:** *any*

___

###  propFlags

▸ **propFlags**(`snapshot`: object | undefined, `pred`: object, `name`: string, `descr`: PropertyDescriptor, `mask`: number): *number | undefined*

Defined in src/main.ts:1129

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | object &#124; undefined |
`pred` | object |
`name` | string |
`descr` | PropertyDescriptor |
`mask` | number |

**Returns:** *number | undefined*

___

###  propsDescriptor

▸ **propsDescriptor**<**T**>(`descriptor`: [Descriptor](#descriptor)‹T›): *[Descriptor](#descriptor)‹T›*

Defined in src/main.ts:1270

wraps descriptor by adding its own property into the saved dictionary

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`descriptor` | [Descriptor](#descriptor)‹T› |

**Returns:** *[Descriptor](#descriptor)‹T›*

___

###  read

▸ **read**(`json`: [JSONObject](#interfaces_main_jsonobjectmd), `opts`: [ReadOptions](#interfaces_main_readoptionsmd)): *any*

Defined in src/main.ts:424

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`json` | [JSONObject](#interfaces_main_jsonobjectmd) | - |
`opts` | [ReadOptions](#interfaces_main_readoptionsmd) | {} |

**Returns:** *any*

___

###  readPropDescriptor

▸ **readPropDescriptor**(`ctx`: [ReadContext](#classes_main_readcontextmd), `pjson`: [JSONValue](#jsonvalue), `flags`: number, `get`: [JSONValue](#jsonvalue), `set`: [JSONValue](#jsonvalue), `pdescr`: PropertyDescriptor): *PropertyDescriptor*

Defined in src/main.ts:1205

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`pjson` | [JSONValue](#jsonvalue) |
`flags` | number |
`get` | [JSONValue](#jsonvalue) |
`set` | [JSONValue](#jsonvalue) |
`pdescr` | PropertyDescriptor |

**Returns:** *PropertyDescriptor*

___

###  readPropName

▸ **readPropName**(`ctx`: [ReadContext](#classes_main_readcontextmd), `key`: any): *any*

Defined in src/main.ts:1193

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`key` | any |

**Returns:** *any*

___

###  readProps

▸ **readProps**<**T**>(`ctx`: [ReadContext](#classes_main_readcontextmd), `props`: any[], `value`: T): *void*

Defined in src/main.ts:1228

Reading serialized `Object.defineProperty` descriptors from JSON

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`props` | any[] |
`value` | T |

**Returns:** *void*

___

###  readSym

▸ **readSym**(`ctx`: [ReadContext](#classes_main_readcontextmd), `json`: [JSONValue](#jsonvalue)): *symbol*

Defined in src/main.ts:1401

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`json` | [JSONValue](#jsonvalue) |

**Returns:** *symbol*

___

###  rebindGlobal

▸ **rebindGlobal**(): *void*

Defined in src/main.ts:1847

**Returns:** *void*

___

###  refAwareDescriptor

▸ **refAwareDescriptor**<**T**>(`descriptor`: [Descriptor](#descriptor)‹T›): *[Descriptor](#descriptor)‹T›*

Defined in src/main.ts:688

Enhances descriptor by adding reference handling. It some value is referenced
in more than one sub-value it will have a unique value id instead of the
value in the output.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`descriptor` | [Descriptor](#descriptor)‹T› |

**Returns:** *[Descriptor](#descriptor)‹T›*

___

###  regAutoOpaqueConstr

▸ **regAutoOpaqueConstr**(`constr`: any, `silent?`: undefined | false | true): *object*

Defined in src/main.ts:1825

Opaque object will be added automatically if not known object built with
`constr` is encountered when writing.

**Parameters:**

Name | Type |
------ | ------ |
`constr` | any |
`silent?` | undefined &#124; false &#124; true |

**Returns:** *object*

* **write**(`ctx`: [WriteContext](#classes_main_writecontextmd), `value`: any, `parent`: any, `index`: string | number): *[JSONValue](#jsonvalue)*

___

###  regConstructor

▸ **regConstructor**<**T**>(`constr`: [ValueConstructor](#interfaces_main_valueconstructormd)‹T›, `descriptor`: [IncompleteDescriptor](#incompletedescriptor)‹T›): *[Descriptor](#descriptor)‹T›*

Defined in src/main.ts:997

Registers `prototype` of `constructor` as opaque value and use it
as the value's type in output. It also adds resulting `descriptorSymbol`
into a prototype.

**`see`** regOpaqueObject

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`constr` | [ValueConstructor](#interfaces_main_valueconstructormd)‹T› | - | - |
`descriptor` | [IncompleteDescriptor](#incompletedescriptor)‹T› | {} |   |

**Returns:** *[Descriptor](#descriptor)‹T›*

___

###  regDescriptor

▸ **regDescriptor**<**T**>(`descriptor`: [IncompleteDescriptor](#incompletedescriptor)‹T›): *[Descriptor](#descriptor)‹T›*

Defined in src/main.ts:762

Adds a descriptor to an internal global registry for creating value instances
by type names on reading.

The name will be changed to a unique value if some other descriptor with the
same name is already registered.

Adds missed functionality into the descriptor. This includes:
 - This includes reference awareness (if `descriptor.refAware !== false`)
 - Saving object's properties (if `descriptor.props !== false`)
 - Default methods (`read` from `create` and `readContent`)
 - Adding "$" property (if `descriptor.default$ !== false`)

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`descriptor` | [IncompleteDescriptor](#incompletedescriptor)‹T› |

**Returns:** *[Descriptor](#descriptor)‹T›*

___

###  regGlobal

▸ **regGlobal**(): *void*

Defined in src/main.ts:1878

Monkey patching platform objects to make them serializable,
run it as soon as possible if a global serialization is needed

**Returns:** *void*

___

###  regNewConstructor

▸ **regNewConstructor**<**T**>(`constr`: [ValueConstructor](#interfaces_main_valueconstructormd)‹T›, `descriptor`: [IncompleteDescriptor](#incompletedescriptor)‹T›): *[Descriptor](#descriptor)*

Defined in src/main.ts:1055

same as `regConstructor` but it also uses `constr` with new to build the object

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`constr` | [ValueConstructor](#interfaces_main_valueconstructormd)‹T› | - |
`descriptor` | [IncompleteDescriptor](#incompletedescriptor)‹T› | {} |

**Returns:** *[Descriptor](#descriptor)*

___

###  regObjectDescriptorGetter

▸ **regObjectDescriptorGetter**(`impl`: function): *void*

Defined in src/main.ts:1504

**Parameters:**

▪ **impl**: *function*

▸ (`value`: any): *[Descriptor](#descriptor) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *void*

___

###  regOpaqueObject

▸ **regOpaqueObject**(`value`: any, `name`: string, `descriptor`: [IncompleteDescriptor](#incompletedescriptor)‹any›): *[Descriptor](#descriptor)*

Defined in src/main.ts:916

This function registers `value` as opaque. The library outputs names instead
of stored data for them. The values should be registered with the same name
on writing and reading sides. Adds `[descriptorSymbol]` property to the
value.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`value` | any | - |
`name` | string | guessObjectName(value) |
`descriptor` | [IncompleteDescriptor](#incompletedescriptor)‹any› | { props: true, propsSnapshot: true } |

**Returns:** *[Descriptor](#descriptor)*

___

###  regOpaquePrim

▸ **regOpaquePrim**<**T**>(`value`: T, `name`: string): *[Descriptor](#descriptor)‹T›*

Defined in src/main.ts:959

Same as `regOpaqueObject` but doesn't add `[descriptorSymbol]` property and
stores value->descriptor mapping in an internal global registry instead.

**`see`** regOpaqObject

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`value` | T | - |
`name` | string | String(value) |

**Returns:** *[Descriptor](#descriptor)‹T›*

___

###  regOpaqueRec

▸ **regOpaqueRec**(`value`: any, `prefix`: string, `opts`: object): *void*

Defined in src/main.ts:1780

registers an object as opaque along with all other
values accessible from this object

**Parameters:**

▪ **value**: *any*

▪`Default value`  **prefix**: *string*= value.constructor.name

▪`Default value`  **opts**: *object*= {}

Name | Type |
------ | ------ |
`deep?` | undefined &#124; false &#124; true |
`descriptor?` | [IncompleteDescriptor](#incompletedescriptor)‹any› |

**Returns:** *void*

___

###  regPrim

▸ **regPrim**<**T**>(`descriptor`: [Descriptor](#descriptor)‹T›, `value`: any, `name`: string): *[WriteDescriptor](#interfaces_main_writedescriptormd)‹T› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹T› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹T›*

Defined in src/main.ts:976

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`descriptor` | [Descriptor](#descriptor)‹T› | - |
`value` | any | - |
`name` | string | String(value) |

**Returns:** *[WriteDescriptor](#interfaces_main_writedescriptormd)‹T› & [ReadDescriptor](#interfaces_main_readdescriptormd)‹T› & [DescriptorOpts](#interfaces_main_descriptoroptsmd)‹T›*

___

###  regPropertyDescriptor

▸ **regPropertyDescriptor**(`p`: PropertyDescriptor): *void*

Defined in src/main.ts:1983

**Parameters:**

Name | Type |
------ | ------ |
`p` | PropertyDescriptor |

**Returns:** *void*

___

###  regValueDescriptorGetter

▸ **regValueDescriptorGetter**(`impl`: function): *void*

Defined in src/main.ts:1541

**Parameters:**

▪ **impl**: *function*

▸ (`value`: any): *[Descriptor](#descriptor) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *void*

___

###  resetState

▸ **resetState**(`init`: [IncompleteState](#interfaces_main_incompletestatemd)): *void*

Defined in src/main.ts:112

Sets new state value

After setting this each instance of this module will have own state

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`init` | [IncompleteState](#interfaces_main_incompletestatemd) | {} |

**Returns:** *void*

___

###  showStack

▸ **showStack**(`ctx`: [WriteContext](#classes_main_writecontextmd), `key`: string | number, `value`: any): *void*

Defined in src/main.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](#classes_main_writecontextmd) |
`key` | string &#124; number |
`value` | any |

**Returns:** *void*

___

###  specValueDescriptor

▸ **specValueDescriptor**<**T**>(`name`: string, `value`: T): *[Descriptor](#descriptor)‹T›*

Defined in src/main.ts:1427

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`value` | T |

**Returns:** *[Descriptor](#descriptor)‹T›*

___

###  stringify

▸ **stringify**(`value`: any, `replacer?`: undefined | function, `spaces?`: string | number): *string*

Defined in src/main.ts:452

`write` followed by `JSON.stringify`,
with same parameters as for `JSON.stringify`

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |
`replacer?` | undefined &#124; function |
`spaces?` | string &#124; number |

**Returns:** *string*

___

###  updateInitialSnapshot

▸ **updateInitialSnapshot**(`value`: any): *void*

Defined in src/main.ts:864

updates `snapshot` with the current values of its properties

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | any | an object registered by `regOpaqueObject` before  |

**Returns:** *void*

___

###  write

▸ **write**(`value`: object, `opts`: [WriteOptions](#interfaces_main_writeoptionsmd)): *[JSONObject](#interfaces_main_jsonobjectmd)*

Defined in src/main.ts:378

Converts JS Plain Object into JSON Object

It supports only plain objects as root value. To serialize anything else
just wrap it, e.g. `write({arr:[1]})`

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`value` | object | - | original object |
`opts` | [WriteOptions](#interfaces_main_writeoptionsmd) | {} | options  |

**Returns:** *[JSONObject](#interfaces_main_jsonobjectmd)*

___

###  writeProp

▸ **writeProp**(`ctx`: [WriteContext](#classes_main_writecontextmd), `info`: [JSONArray](#interfaces_main_jsonarraymd), `descr`: PropertyDescriptor, `flags`: number): *[JSONArray](#interfaces_main_jsonarraymd) | undefined*

Defined in src/main.ts:1099

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](#classes_main_writecontextmd) |
`info` | [JSONArray](#interfaces_main_jsonarraymd) |
`descr` | PropertyDescriptor |
`flags` | number |

**Returns:** *[JSONArray](#interfaces_main_jsonarraymd) | undefined*

___

###  writeProps

▸ **writeProps**(`ctx`: [WriteContext](#classes_main_writecontextmd), `descrs`: object, `pred`: object, `mask`: number, `snapshot?`: undefined | object): *[JSONArray](#interfaces_main_jsonarraymd)‹›[]*

Defined in src/main.ts:1152

Writing serialized `Object.defineProperty` descriptors to JSON

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](#classes_main_writecontextmd) |
`descrs` | object |
`pred` | object |
`mask` | number |
`snapshot?` | undefined &#124; object |

**Returns:** *[JSONArray](#interfaces_main_jsonarraymd)‹›[]*

___

###  writeSym

▸ **writeSym**(`ctx`: [WriteContext](#classes_main_writecontextmd), `sym`: symbol, `parent`: [JSONArray](#interfaces_main_jsonarraymd) | [JSONObject](#interfaces_main_jsonobjectmd), `index`: number | string, `ignore?`: undefined | false | true): *[JSONValue](#jsonvalue)*

Defined in src/main.ts:1357

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](#classes_main_writecontextmd) |
`sym` | symbol |
`parent` | [JSONArray](#interfaces_main_jsonarraymd) &#124; [JSONObject](#interfaces_main_jsonobjectmd) |
`index` | number &#124; string |
`ignore?` | undefined &#124; false &#124; true |

**Returns:** *[JSONValue](#jsonvalue)*

## Object literals

### `Const` NotSerializableToken

### ▪ **NotSerializableToken**: *object*

Defined in src/main.ts:1097

###  _notSerializable

• **_notSerializable**: *boolean* = true

Defined in src/main.ts:1097

___

### `Const` ObjectPropertiesDescriptor

### ▪ **ObjectPropertiesDescriptor**: *object*

Defined in src/main.ts:1246

A descriptor for `Object.getOwnPropertyDescriptors` object

###  create

▸ **create**(): *object*

Defined in src/main.ts:1252

**Returns:** *object*

###  readContent

▸ **readContent**(`ctx`: [ReadContext](#classes_main_readcontextmd), `json`: [JSONValue](#jsonvalue), `value`: any): *void*

Defined in src/main.ts:1255

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`json` | [JSONValue](#jsonvalue) |
`value` | any |

**Returns:** *void*

###  write

▸ **write**(`ctx`: [WriteContext](#classes_main_writecontextmd), `value`: any): *[JSONValue](#jsonvalue)*

Defined in src/main.ts:1247

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](#classes_main_writecontextmd) |
`value` | any |

**Returns:** *[JSONValue](#jsonvalue)*

___

### `Const` OpaqueDescriptor

### ▪ **OpaqueDescriptor**: *object*

Defined in src/main.ts:1340

###  default$

• **default$**: *false* = false

Defined in src/main.ts:1349

###  create

▸ **create**(): *any*

Defined in src/main.ts:1346

**Returns:** *any*

###  write

▸ **write**(`ctx`: [WriteContext](#classes_main_writecontextmd)‹›, `value`: any): *[JSONValue](#jsonvalue)*

Defined in src/main.ts:1341

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](#classes_main_writecontextmd)‹› |
`value` | any |

**Returns:** *[JSONValue](#jsonvalue)*

___

### `Const` OpaquePrimDescriptor

### ▪ **OpaquePrimDescriptor**: *object*

Defined in src/main.ts:1352

###  props

• **props**: *false* = false

Defined in src/main.ts:1354

___

### `Const` defaultOverrideProps

### ▪ **defaultOverrideProps**: *object*

Defined in src/main.ts:202

###  [descriptorSymbol]

• **[descriptorSymbol]**: *boolean* = false

Defined in src/main.ts:203

___

### `Const` descriptorTemplate

### ▪ **descriptorTemplate**: *object*

Defined in src/main.ts:671

default implementaiton of [Descriptor](#descriptor)

###  create

• **create**: *[defaultCreate](#defaultcreate)* = defaultCreate

Defined in src/main.ts:674

###  read

• **read**: *[defaultRead](#defaultread)* = defaultRead

Defined in src/main.ts:672

###  reset

• **reset**: *[defaultReset](#defaultreset)* = defaultReset

Defined in src/main.ts:675

###  write

• **write**: *[defaultWrite](#defaultwrite)* = defaultWrite

Defined in src/main.ts:673

###  readContent

▸ **readContent**(`ctx`: [ReadContext](#classes_main_readcontextmd), `json`: [JSONValue](#jsonvalue), `value`: any): *void*

Defined in src/main.ts:676

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](#classes_main_readcontextmd) |
`json` | [JSONValue](#jsonvalue) |
`value` | any |

**Returns:** *void*

___

### `Const` funcOverrideProps

### ▪ **funcOverrideProps**: *object*

Defined in src/main.ts:206

###  arguments

• **arguments**: *false* = false

Defined in src/main.ts:207

###  caller

• **caller**: *false* = false

Defined in src/main.ts:208

###  length

• **length**: *false* = false

Defined in src/main.ts:209

###  name

• **name**: *false* = false

Defined in src/main.ts:210

___

### `Const` options

### ▪ **options**: *object*

Defined in src/main.ts:68

###  descriptorSymForOpaque

• **descriptorSymForOpaque**: *boolean* = true

Defined in src/main.ts:69

___

### `Const` savedConsol

### ▪ **savedConsol**: *object*

Defined in src/main.ts:18

###  log

• **log**: *log* = console.log

Defined in src/main.ts:18

###  warn

• **warn**: *warn* = console.warn

Defined in src/main.ts:18

___

### `Const` savedObject

### ▪ **savedObject**: *object*

Defined in src/main.ts:5

# Serialization library for @effectful toolchain

###  assign

• **assign**: *assign* = Object.assign

Defined in src/main.ts:8

###  create

• **create**: *create* = Object.create

Defined in src/main.ts:9

###  defineProperty

• **defineProperty**: *defineProperty* = Object.defineProperty

Defined in src/main.ts:6

###  getOwnPropertyDescriptor

• **getOwnPropertyDescriptor**: *getOwnPropertyDescriptor* = Object.getOwnPropertyDescriptor

Defined in src/main.ts:14

###  getOwnPropertyDescriptors

• **getOwnPropertyDescriptors**: *getOwnPropertyDescriptors* = Object.getOwnPropertyDescriptors

Defined in src/main.ts:7

###  getOwnPropertyNames

• **getOwnPropertyNames**: *getOwnPropertyNames* = Object.getOwnPropertyNames

Defined in src/main.ts:13

###  getOwnPropertySymbols

• **getOwnPropertySymbols**: *getOwnPropertySymbols* = Object.getOwnPropertySymbols

Defined in src/main.ts:12

###  getPrototypeOf

• **getPrototypeOf**: *getPrototypeOf* = Object.getPrototypeOf

Defined in src/main.ts:11

###  setPrototypeOf

• **setPrototypeOf**: *setPrototypeOf* = Object.setPrototypeOf

Defined in src/main.ts:10

___

### `Const` undef

### ▪ **undef**: *object*

Defined in src/main.ts:595

###  _undef

• **_undef**: *boolean* = true

Defined in src/main.ts:595
