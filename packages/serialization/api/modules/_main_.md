[@effectful/serialization](../README.md) › ["main"](_main_.md)

# Module: "main"

## Index

### Enumerations

* [Inheritance](../enums/_main_.inheritance.md)

### Classes

* [ReadContext](../classes/_main_.readcontext.md)
* [WriteContext](../classes/_main_.writecontext.md)

### Interfaces

* [DescriptorOpts](../interfaces/_main_.descriptoropts.md)
* [IncompleteState](../interfaces/_main_.incompletestate.md)
* [JSONArray](../interfaces/_main_.jsonarray.md)
* [JSONObject](../interfaces/_main_.jsonobject.md)
* [ReadDescriptor](../interfaces/_main_.readdescriptor.md)
* [ReadOptions](../interfaces/_main_.readoptions.md)
* [SharedRefInfo](../interfaces/_main_.sharedrefinfo.md)
* [State](../interfaces/_main_.state.md)
* [SymbolDescr](../interfaces/_main_.symboldescr.md)
* [ValueConstructor](../interfaces/_main_.valueconstructor.md)
* [WithTypeofTag](../interfaces/_main_.withtypeoftag.md)
* [WriteDescriptor](../interfaces/_main_.writedescriptor.md)
* [WriteOptions](../interfaces/_main_.writeoptions.md)

### Type aliases

* [Descriptor](_main_.md#descriptor)
* [IncompleteDescriptor](_main_.md#incompletedescriptor)
* [JSONValue](_main_.md#jsonvalue)

### Variables

* [ArrayDescriptor](_main_.md#const-arraydescriptor)
* [BigIntDescriptor](_main_.md#const-bigintdescriptor)
* [BindDescriptor](_main_.md#const-binddescriptor)
* [LocMap](_main_.md#const-locmap)
* [LocSet](_main_.md#const-locset)
* [LocWeakMap](_main_.md#const-locweakmap)
* [NaNDescriptor](_main_.md#const-nandescriptor)
* [NotSerializableDescriptor](_main_.md#const-notserializabledescriptor)
* [NotSerializablePlaceholderDescriptor](_main_.md#const-notserializableplaceholderdescriptor)
* [ObjectConstr](_main_.md#let-objectconstr)
* [PojsoDescriptor](_main_.md#const-pojsodescriptor)
* [PrimDescriptor](_main_.md#const-primdescriptor)
* [PropertyDescriptorDescriptor](_main_.md#const-propertydescriptordescriptor)
* [RefDescriptor](_main_.md#const-refdescriptor)
* [SymbolDescriptor](_main_.md#const-symboldescriptor)
* [UndefDescriptor](_main_.md#const-undefdescriptor)
* [WeakMapWorkaround](_main_.md#const-weakmapworkaround)
* [WeakSetWorkaround](_main_.md#const-weaksetworkaround)
* [__effectfulSerializationState](_main_.md#let-__effectfulserializationstate)
* [boundArgsSymbol](_main_.md#const-boundargssymbol)
* [boundFunSymbol](_main_.md#const-boundfunsymbol)
* [boundThisSymbol](_main_.md#const-boundthissymbol)
* [descriptorByName](_main_.md#let-descriptorbyname)
* [descriptorByObject](_main_.md#let-descriptorbyobject)
* [descriptorByTypeOfProp](_main_.md#let-descriptorbytypeofprop)
* [descriptorByValue](_main_.md#let-descriptorbyvalue)
* [descriptorSymbol](_main_.md#let-descriptorsymbol)
* [emptyArr](_main_.md#const-emptyarr)
* [hasPropDefault](_main_.md#const-haspropdefault)
* [notSerializablePlaceholder](_main_.md#const-notserializableplaceholder)
* [notSerializableTraps](_main_.md#const-notserializabletraps)
* [state](_main_.md#let-state)
* [undefinedSymbol](_main_.md#const-undefinedsymbol)

### Functions

* [bind](_main_.md#bind)
* [defaultCreate](_main_.md#defaultcreate)
* [defaultRead](_main_.md#defaultread)
* [defaultReset](_main_.md#defaultreset)
* [defaultWrite](_main_.md#defaultwrite)
* [descrFlags](_main_.md#descrflags)
* [getFirst](_main_.md#getfirst)
* [getJsonDescriptor](_main_.md#getjsondescriptor)
* [getObjectDescriptor](_main_.md#let-getobjectdescriptor)
* [getState](_main_.md#getstate)
* [getValueDescriptor](_main_.md#let-getvaluedescriptor)
* [guessDescriptorName](_main_.md#guessdescriptorname)
* [guessObjectName](_main_.md#guessobjectname)
* [hasProp](_main_.md#hasprop)
* [initializeState](_main_.md#initializestate)
* [iterableDescriptor](_main_.md#iterabledescriptor)
* [makeBind](_main_.md#makebind)
* [notSerializableRead](_main_.md#notserializableread)
* [parse](_main_.md#parse)
* [propFlags](_main_.md#propflags)
* [propsDescriptor](_main_.md#propsdescriptor)
* [read](_main_.md#read)
* [readPropDescriptor](_main_.md#readpropdescriptor)
* [readPropName](_main_.md#readpropname)
* [readProps](_main_.md#readprops)
* [readSym](_main_.md#readsym)
* [rebindGlobal](_main_.md#rebindglobal)
* [refAwareDescriptor](_main_.md#refawaredescriptor)
* [regAutoOpaqueConstr](_main_.md#regautoopaqueconstr)
* [regConstructor](_main_.md#regconstructor)
* [regDescriptor](_main_.md#regdescriptor)
* [regGlobal](_main_.md#regglobal)
* [regNewConstructor](_main_.md#regnewconstructor)
* [regObjectDescriptorGetter](_main_.md#regobjectdescriptorgetter)
* [regOpaqueObject](_main_.md#regopaqueobject)
* [regOpaquePrim](_main_.md#regopaqueprim)
* [regOpaqueRec](_main_.md#regopaquerec)
* [regPrim](_main_.md#regprim)
* [regPropertyDescriptor](_main_.md#regpropertydescriptor)
* [regValueDescriptorGetter](_main_.md#regvaluedescriptorgetter)
* [resetState](_main_.md#resetstate)
* [showStack](_main_.md#showstack)
* [specValueDescriptor](_main_.md#specvaluedescriptor)
* [stringify](_main_.md#stringify)
* [updateInitialSnapshot](_main_.md#updateinitialsnapshot)
* [write](_main_.md#write)
* [writeProp](_main_.md#writeprop)
* [writeProps](_main_.md#writeprops)
* [writeSym](_main_.md#writesym)

### Object literals

* [NotSerializableToken](_main_.md#const-notserializabletoken)
* [ObjectPropertiesDescriptor](_main_.md#const-objectpropertiesdescriptor)
* [OpaqueDescriptor](_main_.md#const-opaquedescriptor)
* [OpaquePrimDescriptor](_main_.md#const-opaqueprimdescriptor)
* [defaultOverrideProps](_main_.md#const-defaultoverrideprops)
* [descriptorTemplate](_main_.md#const-descriptortemplate)
* [funcOverrideProps](_main_.md#const-funcoverrideprops)
* [options](_main_.md#const-options)
* [savedConsol](_main_.md#const-savedconsol)
* [savedObject](_main_.md#const-savedobject)
* [undef](_main_.md#const-undef)

## Type aliases

###  Descriptor

Ƭ **Descriptor**: *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹T› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹T› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹T›*

Defined in src/main.ts:343

___

###  IncompleteDescriptor

Ƭ **IncompleteDescriptor**: *[DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹T› & object*

Defined in src/main.ts:350

simplified version of a descriptor where missed properties can be calculated

___

###  JSONValue

Ƭ **JSONValue**: *boolean | number | string | [JSONObject](../interfaces/_main_.jsonobject.md) | [JSONArray](../interfaces/_main_.jsonarray.md) | null*

Defined in src/main.ts:185

`JSON.stringify` serializable value

## Variables

### `Const` ArrayDescriptor

• **ArrayDescriptor**: *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹any› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹any› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹any›* = regNewConstructor(Array, {
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

• **BigIntDescriptor**: *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹number› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹number› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹number› | [WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹BigInt› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹BigInt› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹BigInt›* = typeof BigInt === "function"
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

• **BindDescriptor**: *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹function› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹function› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹function›* = regDescriptor({
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

• **NaNDescriptor**: *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹number› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹number› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹number›* = specValueDescriptor("NaN", NaN)

Defined in src/main.ts:1442

___

### `Const` NotSerializableDescriptor

• **NotSerializableDescriptor**: *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹void› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹void› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹void›* = regDescriptor({
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

• **NotSerializablePlaceholderDescriptor**: *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹any› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹any› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹any›* = regDescriptor({
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

• **PojsoDescriptor**: *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹any› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹any› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹any›* = regDescriptor({
  ...descriptorTemplate,
  name: "Object"
})

Defined in src/main.ts:1069

___

### `Const` PrimDescriptor

• **PrimDescriptor**: *[Descriptor](_main_.md#descriptor)* = regDescriptor({
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

• **PropertyDescriptorDescriptor**: *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹PropertyDescriptor› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹PropertyDescriptor› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹PropertyDescriptor›* = regDescriptor({
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

• **RefDescriptor**: *[Descriptor](_main_.md#descriptor)* = regDescriptor({
  name: "Ref",
  read(ctx: ReadContext, json: JSONValue): any {
    return ctx.sharedVals[<number>(<JSONObject>json).r];
  }
})

Defined in src/main.ts:1090

___

### `Const` SymbolDescriptor

• **SymbolDescriptor**: *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹symbol› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹symbol› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹symbol›* = regDescriptor<symbol>({
  write: writeSym,
  read: readSym,
  name: "Symbol",
  refAware: false,
  props: false
})

Defined in src/main.ts:1445

___

### `Const` UndefDescriptor

• **UndefDescriptor**: *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹undefined› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹undefined› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹undefined›* = specValueDescriptor("undefined", void 0)

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

• **__effectfulSerializationState**: *[IncompleteState](../interfaces/_main_.incompletestate.md)*

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

• **descriptorByName**: *Map‹string, [Descriptor](_main_.md#descriptor)›* = state.byName

Defined in src/main.ts:102

___

### `Let` descriptorByObject

• **descriptorByObject**: *WeakMap‹any, [Descriptor](_main_.md#descriptor)›* = state.byObject

Defined in src/main.ts:104

___

### `Let` descriptorByTypeOfProp

• **descriptorByTypeOfProp**: *Map‹symbol, [Descriptor](_main_.md#descriptor)›* = state.byTypeOfProp

Defined in src/main.ts:105

___

### `Let` descriptorByValue

• **descriptorByValue**: *Map‹any, [Descriptor](_main_.md#descriptor)›* = state.byValue

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

Converts JSON Object returned by [write](_main_.md#write) back to JS Object

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

• **state**: *[State](../interfaces/_main_.state.md)* = initializeState(__effectfulSerializationState)

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

▸ **defaultCreate**<**T**>(`this`: [Descriptor](_main_.md#descriptor)‹T›, `ctx`: [ReadContext](../classes/_main_.readcontext.md), `json`: [JSONValue](_main_.md#jsonvalue)): *T*

Defined in src/main.ts:641

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Descriptor](_main_.md#descriptor)‹T› |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`json` | [JSONValue](_main_.md#jsonvalue) |

**Returns:** *T*

___

###  defaultRead

▸ **defaultRead**<**T**>(`this`: [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹T›, `ctx`: [ReadContext](../classes/_main_.readcontext.md), `json`: [JSONValue](_main_.md#jsonvalue)): *T*

Defined in src/main.ts:1330

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`this` | [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹T› |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`json` | [JSONValue](_main_.md#jsonvalue) |

**Returns:** *T*

___

###  defaultReset

▸ **defaultReset**(): *void*

Defined in src/main.ts:666

**Returns:** *void*

___

###  defaultWrite

▸ **defaultWrite**<**T**>(`this`: [Descriptor](_main_.md#descriptor)‹T›, `ctx`: [WriteContext](../classes/_main_.writecontext.md), `value`: T): *[JSONValue](_main_.md#jsonvalue)*

Defined in src/main.ts:626

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Descriptor](_main_.md#descriptor)‹T› |
`ctx` | [WriteContext](../classes/_main_.writecontext.md) |
`value` | T |

**Returns:** *[JSONValue](_main_.md#jsonvalue)*

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

▸ **getJsonDescriptor**(`ctx`: [ReadContext](../classes/_main_.readcontext.md), `json`: [JSONValue](_main_.md#jsonvalue)): *[Descriptor](_main_.md#descriptor)*

Defined in src/main.ts:1547

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`json` | [JSONValue](_main_.md#jsonvalue) |

**Returns:** *[Descriptor](_main_.md#descriptor)*

___

### `Let` getObjectDescriptor

▸ **getObjectDescriptor**<**T**>(`value`: T): *[Descriptor](_main_.md#descriptor)‹T› | undefined*

Defined in src/main.ts:1480

**Type parameters:**

▪ **T**: *[WithTypeofTag](../interfaces/_main_.withtypeoftag.md)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *[Descriptor](_main_.md#descriptor)‹T› | undefined*

___

###  getState

▸ **getState**(): *[State](../interfaces/_main_.state.md)*

Defined in src/main.ts:121

**Returns:** *[State](../interfaces/_main_.state.md)*

___

### `Let` getValueDescriptor

▸ **getValueDescriptor**(`value`: any): *[Descriptor](_main_.md#descriptor) | undefined*

Defined in src/main.ts:1512

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *[Descriptor](_main_.md#descriptor) | undefined*

___

###  guessDescriptorName

▸ **guessDescriptorName**(`descriptor`: [DescriptorOpts](../interfaces/_main_.descriptoropts.md)): *string*

Defined in src/main.ts:891

Tries to derive name for the `descriptor`.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`descriptor` | [DescriptorOpts](../interfaces/_main_.descriptoropts.md) |   |

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

▸ **initializeState**(`init`: [IncompleteState](../interfaces/_main_.incompletestate.md)): *[State](../interfaces/_main_.state.md)*

Defined in src/main.ts:83

**Parameters:**

Name | Type |
------ | ------ |
`init` | [IncompleteState](../interfaces/_main_.incompletestate.md) |

**Returns:** *[State](../interfaces/_main_.state.md)*

___

###  iterableDescriptor

▸ **iterableDescriptor**<**T**>(`descriptor`: [IncompleteDescriptor](_main_.md#incompletedescriptor)‹T›): *[IncompleteDescriptor](_main_.md#incompletedescriptor)‹T›*

Defined in src/main.ts:1597

**Type parameters:**

▪ **T**: *Iterable‹unknown›*

**Parameters:**

Name | Type |
------ | ------ |
`descriptor` | [IncompleteDescriptor](_main_.md#incompletedescriptor)‹T› |

**Returns:** *[IncompleteDescriptor](_main_.md#incompletedescriptor)‹T›*

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

▸ **notSerializableRead**(`this`: [Descriptor](_main_.md#descriptor)): *any*

Defined in src/main.ts:1047

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Descriptor](_main_.md#descriptor) |

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

▸ **propsDescriptor**<**T**>(`descriptor`: [Descriptor](_main_.md#descriptor)‹T›): *[Descriptor](_main_.md#descriptor)‹T›*

Defined in src/main.ts:1270

wraps descriptor by adding its own property into the saved dictionary

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`descriptor` | [Descriptor](_main_.md#descriptor)‹T› |

**Returns:** *[Descriptor](_main_.md#descriptor)‹T›*

___

###  read

▸ **read**(`json`: [JSONObject](../interfaces/_main_.jsonobject.md), `opts`: [ReadOptions](../interfaces/_main_.readoptions.md)): *any*

Defined in src/main.ts:424

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`json` | [JSONObject](../interfaces/_main_.jsonobject.md) | - |
`opts` | [ReadOptions](../interfaces/_main_.readoptions.md) | {} |

**Returns:** *any*

___

###  readPropDescriptor

▸ **readPropDescriptor**(`ctx`: [ReadContext](../classes/_main_.readcontext.md), `pjson`: [JSONValue](_main_.md#jsonvalue), `flags`: number, `get`: [JSONValue](_main_.md#jsonvalue), `set`: [JSONValue](_main_.md#jsonvalue), `pdescr`: PropertyDescriptor): *PropertyDescriptor*

Defined in src/main.ts:1205

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`pjson` | [JSONValue](_main_.md#jsonvalue) |
`flags` | number |
`get` | [JSONValue](_main_.md#jsonvalue) |
`set` | [JSONValue](_main_.md#jsonvalue) |
`pdescr` | PropertyDescriptor |

**Returns:** *PropertyDescriptor*

___

###  readPropName

▸ **readPropName**(`ctx`: [ReadContext](../classes/_main_.readcontext.md), `key`: any): *any*

Defined in src/main.ts:1193

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`key` | any |

**Returns:** *any*

___

###  readProps

▸ **readProps**<**T**>(`ctx`: [ReadContext](../classes/_main_.readcontext.md), `props`: any[], `value`: T): *void*

Defined in src/main.ts:1228

Reading serialized `Object.defineProperty` descriptors from JSON

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`props` | any[] |
`value` | T |

**Returns:** *void*

___

###  readSym

▸ **readSym**(`ctx`: [ReadContext](../classes/_main_.readcontext.md), `json`: [JSONValue](_main_.md#jsonvalue)): *symbol*

Defined in src/main.ts:1401

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`json` | [JSONValue](_main_.md#jsonvalue) |

**Returns:** *symbol*

___

###  rebindGlobal

▸ **rebindGlobal**(): *void*

Defined in src/main.ts:1847

**Returns:** *void*

___

###  refAwareDescriptor

▸ **refAwareDescriptor**<**T**>(`descriptor`: [Descriptor](_main_.md#descriptor)‹T›): *[Descriptor](_main_.md#descriptor)‹T›*

Defined in src/main.ts:688

Enhances descriptor by adding reference handling. It some value is referenced
in more than one sub-value it will have a unique value id instead of the
value in the output.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`descriptor` | [Descriptor](_main_.md#descriptor)‹T› |

**Returns:** *[Descriptor](_main_.md#descriptor)‹T›*

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

* **write**(`ctx`: [WriteContext](../classes/_main_.writecontext.md), `value`: any, `parent`: any, `index`: string | number): *[JSONValue](_main_.md#jsonvalue)*

___

###  regConstructor

▸ **regConstructor**<**T**>(`constr`: [ValueConstructor](../interfaces/_main_.valueconstructor.md)‹T›, `descriptor`: [IncompleteDescriptor](_main_.md#incompletedescriptor)‹T›): *[Descriptor](_main_.md#descriptor)‹T›*

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
`constr` | [ValueConstructor](../interfaces/_main_.valueconstructor.md)‹T› | - | - |
`descriptor` | [IncompleteDescriptor](_main_.md#incompletedescriptor)‹T› | {} |   |

**Returns:** *[Descriptor](_main_.md#descriptor)‹T›*

___

###  regDescriptor

▸ **regDescriptor**<**T**>(`descriptor`: [IncompleteDescriptor](_main_.md#incompletedescriptor)‹T›): *[Descriptor](_main_.md#descriptor)‹T›*

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
`descriptor` | [IncompleteDescriptor](_main_.md#incompletedescriptor)‹T› |

**Returns:** *[Descriptor](_main_.md#descriptor)‹T›*

___

###  regGlobal

▸ **regGlobal**(): *void*

Defined in src/main.ts:1878

Monkey patching platform objects to make them serializable,
run it as soon as possible if a global serialization is needed

**Returns:** *void*

___

###  regNewConstructor

▸ **regNewConstructor**<**T**>(`constr`: [ValueConstructor](../interfaces/_main_.valueconstructor.md)‹T›, `descriptor`: [IncompleteDescriptor](_main_.md#incompletedescriptor)‹T›): *[Descriptor](_main_.md#descriptor)*

Defined in src/main.ts:1055

same as `regConstructor` but it also uses `constr` with new to build the object

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`constr` | [ValueConstructor](../interfaces/_main_.valueconstructor.md)‹T› | - |
`descriptor` | [IncompleteDescriptor](_main_.md#incompletedescriptor)‹T› | {} |

**Returns:** *[Descriptor](_main_.md#descriptor)*

___

###  regObjectDescriptorGetter

▸ **regObjectDescriptorGetter**(`impl`: function): *void*

Defined in src/main.ts:1504

**Parameters:**

▪ **impl**: *function*

▸ (`value`: any): *[Descriptor](_main_.md#descriptor) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *void*

___

###  regOpaqueObject

▸ **regOpaqueObject**(`value`: any, `name`: string, `descriptor`: [IncompleteDescriptor](_main_.md#incompletedescriptor)‹any›): *[Descriptor](_main_.md#descriptor)*

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
`descriptor` | [IncompleteDescriptor](_main_.md#incompletedescriptor)‹any› | { props: true, propsSnapshot: true } |

**Returns:** *[Descriptor](_main_.md#descriptor)*

___

###  regOpaquePrim

▸ **regOpaquePrim**<**T**>(`value`: T, `name`: string): *[Descriptor](_main_.md#descriptor)‹T›*

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

**Returns:** *[Descriptor](_main_.md#descriptor)‹T›*

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
`descriptor?` | [IncompleteDescriptor](_main_.md#incompletedescriptor)‹any› |

**Returns:** *void*

___

###  regPrim

▸ **regPrim**<**T**>(`descriptor`: [Descriptor](_main_.md#descriptor)‹T›, `value`: any, `name`: string): *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹T› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹T› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹T›*

Defined in src/main.ts:976

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`descriptor` | [Descriptor](_main_.md#descriptor)‹T› | - |
`value` | any | - |
`name` | string | String(value) |

**Returns:** *[WriteDescriptor](../interfaces/_main_.writedescriptor.md)‹T› & [ReadDescriptor](../interfaces/_main_.readdescriptor.md)‹T› & [DescriptorOpts](../interfaces/_main_.descriptoropts.md)‹T›*

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

▸ (`value`: any): *[Descriptor](_main_.md#descriptor) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *void*

___

###  resetState

▸ **resetState**(`init`: [IncompleteState](../interfaces/_main_.incompletestate.md)): *void*

Defined in src/main.ts:112

Sets new state value

After setting this each instance of this module will have own state

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`init` | [IncompleteState](../interfaces/_main_.incompletestate.md) | {} |

**Returns:** *void*

___

###  showStack

▸ **showStack**(`ctx`: [WriteContext](../classes/_main_.writecontext.md), `key`: string | number, `value`: any): *void*

Defined in src/main.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](../classes/_main_.writecontext.md) |
`key` | string &#124; number |
`value` | any |

**Returns:** *void*

___

###  specValueDescriptor

▸ **specValueDescriptor**<**T**>(`name`: string, `value`: T): *[Descriptor](_main_.md#descriptor)‹T›*

Defined in src/main.ts:1427

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`value` | T |

**Returns:** *[Descriptor](_main_.md#descriptor)‹T›*

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

▸ **write**(`value`: object, `opts`: [WriteOptions](../interfaces/_main_.writeoptions.md)): *[JSONObject](../interfaces/_main_.jsonobject.md)*

Defined in src/main.ts:378

Converts JS Plain Object into JSON Object

It supports only plain objects as root value. To serialize anything else
just wrap it, e.g. `write({arr:[1]})`

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`value` | object | - | original object |
`opts` | [WriteOptions](../interfaces/_main_.writeoptions.md) | {} | options  |

**Returns:** *[JSONObject](../interfaces/_main_.jsonobject.md)*

___

###  writeProp

▸ **writeProp**(`ctx`: [WriteContext](../classes/_main_.writecontext.md), `info`: [JSONArray](../interfaces/_main_.jsonarray.md), `descr`: PropertyDescriptor, `flags`: number): *[JSONArray](../interfaces/_main_.jsonarray.md) | undefined*

Defined in src/main.ts:1099

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](../classes/_main_.writecontext.md) |
`info` | [JSONArray](../interfaces/_main_.jsonarray.md) |
`descr` | PropertyDescriptor |
`flags` | number |

**Returns:** *[JSONArray](../interfaces/_main_.jsonarray.md) | undefined*

___

###  writeProps

▸ **writeProps**(`ctx`: [WriteContext](../classes/_main_.writecontext.md), `descrs`: object, `pred`: object, `mask`: number, `snapshot?`: undefined | object): *[JSONArray](../interfaces/_main_.jsonarray.md)‹›[]*

Defined in src/main.ts:1152

Writing serialized `Object.defineProperty` descriptors to JSON

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](../classes/_main_.writecontext.md) |
`descrs` | object |
`pred` | object |
`mask` | number |
`snapshot?` | undefined &#124; object |

**Returns:** *[JSONArray](../interfaces/_main_.jsonarray.md)‹›[]*

___

###  writeSym

▸ **writeSym**(`ctx`: [WriteContext](../classes/_main_.writecontext.md), `sym`: symbol, `parent`: [JSONArray](../interfaces/_main_.jsonarray.md) | [JSONObject](../interfaces/_main_.jsonobject.md), `index`: number | string, `ignore?`: undefined | false | true): *[JSONValue](_main_.md#jsonvalue)*

Defined in src/main.ts:1357

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](../classes/_main_.writecontext.md) |
`sym` | symbol |
`parent` | [JSONArray](../interfaces/_main_.jsonarray.md) &#124; [JSONObject](../interfaces/_main_.jsonobject.md) |
`index` | number &#124; string |
`ignore?` | undefined &#124; false &#124; true |

**Returns:** *[JSONValue](_main_.md#jsonvalue)*

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

▸ **readContent**(`ctx`: [ReadContext](../classes/_main_.readcontext.md), `json`: [JSONValue](_main_.md#jsonvalue), `value`: any): *void*

Defined in src/main.ts:1255

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`json` | [JSONValue](_main_.md#jsonvalue) |
`value` | any |

**Returns:** *void*

###  write

▸ **write**(`ctx`: [WriteContext](../classes/_main_.writecontext.md), `value`: any): *[JSONValue](_main_.md#jsonvalue)*

Defined in src/main.ts:1247

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](../classes/_main_.writecontext.md) |
`value` | any |

**Returns:** *[JSONValue](_main_.md#jsonvalue)*

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

▸ **write**(`ctx`: [WriteContext](../classes/_main_.writecontext.md)‹›, `value`: any): *[JSONValue](_main_.md#jsonvalue)*

Defined in src/main.ts:1341

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](../classes/_main_.writecontext.md)‹› |
`value` | any |

**Returns:** *[JSONValue](_main_.md#jsonvalue)*

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

default implementaiton of [Descriptor](_main_.md#descriptor)

###  create

• **create**: *[defaultCreate](_main_.md#defaultcreate)* = defaultCreate

Defined in src/main.ts:674

###  read

• **read**: *[defaultRead](_main_.md#defaultread)* = defaultRead

Defined in src/main.ts:672

###  reset

• **reset**: *[defaultReset](_main_.md#defaultreset)* = defaultReset

Defined in src/main.ts:675

###  write

• **write**: *[defaultWrite](_main_.md#defaultwrite)* = defaultWrite

Defined in src/main.ts:673

###  readContent

▸ **readContent**(`ctx`: [ReadContext](../classes/_main_.readcontext.md), `json`: [JSONValue](_main_.md#jsonvalue), `value`: any): *void*

Defined in src/main.ts:676

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`json` | [JSONValue](_main_.md#jsonvalue) |
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
