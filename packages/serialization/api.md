

<!-- Start src/main.js -->

# Serialization library for @effectful toolchain

## Top level API

Conversion between JSON values and JS values. JSON values set is a subset 
of JS values which can be converted to string using `JSON.stringify`
function and read back with `JSON.parse`.

## write(value, opts)

Converts JS Plain Object into JSON Object. 

It supports only plain objects as root value. To serialize anything else
just wrap it, e.g. `write({arr:[1]})`

### Params:

* **Object** *value* - original object
* **WriteOptions** *opts* - options

### Properties:

* **boolean** *ignore* - ignore errors

## read(json)

Converts JSON Object returned by {@link write} back to JS Object

### Params:

* **Object** *json* - object to read

## Shorcuts

## stringify()

{@link write} followed by `JSON.stringify`, 
with same parameters as for `JSON.stringify`

## parse()

`JSON.parse` followed by {@link read}

## bind(func, self, args)

like `Function.prototype.bind` but returs serializable object if all 
arguments are serializable

### Params:

* **function** *func* 
* **object** *self* - bound `this`
* **any** *args* - bound arguments

## Extension

## Descriptor

Describes how to read/write values of a type 

## Descriptor#write(ctx, parent, index)

Sets `value` into `parent` on `index` position

### Params:

* **WriteContext** *ctx* - recursive writes for sub-values
* **JSONArray|JSONObject** *parent* - container for the value output
* **number|string** *index* - either name of a field if parent is an object                                 or number index if it is an array

## Descriptor#read(ctx, json)

Reads value from `json` value

### Params:

* **ReadContext** *ctx* - recursive reads handling for sub-values
* **JSONValue** *json* - input JSON

### Return:

* - resulting JS value

## Descriptor#typeofTag

dispatching descriptor by value of `$$typeof` property

name of a property to specify `Descriptor` for JS value

## descriptorByTypeOfProp

react uses `$$typeof` property for its values, it is the mapping  

## WriteContext

An object passed to Descript's `write` method to support recursive
invocation for nested values

## step(value, -, parent, key)

Invokes write recursively for nested values

### Params:

* **any** *value* - value to write
* **JSONArray|JSONObject** *-* parent where to assign returning value
* **JSONArray|JSONObject** *parent* - container for the value output
* **number|string** *key* - either name of a field if parent is an object                               or number index if it is an array

## ReadContext

An object passed to Descript's `read` method to support recursive invocation 
for nested values

## step(json)

Invokes read recursively for nested values

### Params:

* **JSONValue** *json* - value to read

### Return:

* **any** - resulting JS sub value

## escape(name)

if property name starts with `#` char it will double it

### Params:

* **String** *name* 

### Return:

* **String** 

## unescape(name)

referce of `escape`

### Params:

* **String** *name* 

### Return:

* **String** 

## ObjectDescriptor

Helper for {@link Descriptor} implementation for Objects

## ObjectDescriptor#create(ctx, json)

Just creates an object with needed type without filling in it with content

### Params:

* **ReadContext** *ctx* 
* **JSONValue** *json* 

### Return:

* **any** 

## ObjectDescriptor#readContent(ctx, json, value)

Just creates an object with needed type without filling in it with content

### Params:

* **ReadContext** *ctx* 
* **JSONValue** *json* 
* **any** *value* - created in {@link ObjectDescriptor#create}

### Return:

* **any** 

## objectDescriptor

default implementaiton of {@link ObjectDescriptor} 

Enhances descriptor by adding reference handling. It some value is referenced 
in more than one sub-value it will have a unique value id instead of the value
in output.

### Params:

* **Descriptor** ** 

### Return:

* **Descriptor** 

## regDescriptor()

Adds a descriptor to internal global registry for creating value 
instances by type names on reading. 

The name will be changed to a unique value if some other descriptor with 
the same name is already registered.

### Params:

* **Descriptor** ** 

### Return:

* **Descriptor** 

## guessObjectName(value)

tries to derive name for the `value`

### Params:

* **any** *value* 

### Return:

* **String** 

## guessDescriptorName(descriptor)

tries to derive name for the `descriptor`

### Params:

* **Descriptor** *descriptor* 

### Return:

* **String** 

## regObjectDescriptor(descriptor)

Same as `regDescriptor` but ensures `descriptor` is references aware

### Params:

* **ObjectDescriptor** *descriptor* 

### Return:

* **Descriptor** 

## regOpaqueObject(value, name)

The function registers `value` as opaque. The library outputs names instead
of stored data for them. The values should be registered with the same name 
on writing and reading sides. Adds `[descriptorSymbol]` property to the 
value.

### Params:

* **any** *value* 
* **string** *name* 

### Return:

* **Descriptor** 

## regOpaquePrim(value, name)

Same as `regOpaqueObject` but doesn't add `[descriptorSymbol]` property and 
stores value->descriptor mapping in an internal global registry instead.

See: regOpaqObject

### Params:

* **any** *value* 
* **string** *name* 

### Return:

* **Descriptor** 

## regConstructor(constructor, descriptor)

Registers `prototype` of `constructor` as opaque value and use it 
as the value's type in output. It also adds resulting `descriptorSymbol`
into a prototype.

See: regOpaqObject

### Params:

* **Function** *constructor* - plain JS constructor function or class
* **Descriptor** *descriptor* 

### Return:

* **Descriptor** 

<!-- End src/main.js -->

