# @effectful/serialization

Extensible, references aware JavaScript values serialization.

## Usage 

Install from npm:

```
$ npm install --save @effectful/serialization
```

In code:

```javascript
import * as S from "@effectful/serialization"

const json = S.stringify(value)

// ....

const value = S.parse(str)

```

## Writing JavaScript values

Function `S.write` takes JS objects and returns it encoded as `JSON.stringify`
serializable value. It can deal with multiple references to same values,
including recursive references.

The root value must always be a plain object. Its properties values may have any
type if there is its format description registered.

The library contains descriptors for Array/Set/Map/Symbol types and can be
extended to support any other type if can be serialized.

Library's `S.stringify` function is a `write` followed by `JSON.stringify`.

## Reading functions

The reverse direction is done by `S.read` function. It takes a serializable object
returned by `write` and returns its original value.

Function `S.parse` is `JSON.parse` followed by `S.read`.

## Extension

There is a descriptor structure used to specify how to write and read values.

When writing, the descriptor is looked up in `[S.descriptorSymbol]` value's
property or in the library's internal map. The write routine is responsible to
output a string for type's name in `"#type"` property of output object.  It is
used to lookup corresponding descriptor for reading.

The descriptor is registered using `S.regDescriptor` function.

The library will generate unique names based on the name property in descriptor
if there are collisions. This means sending and receiving sides must call the
register function in the same order if there are names collisions chances.

More information in [API docs](api.md).

## Opaque values

Some values cannot be serialized, e.g. `Promise`, `Function`, `WeakMap` etc.
They may be registered as opaque values. This way if there is a reference to
such opaque value in serialized value the library outputs the reference name
rather than the value. This works if same (corresponding) objects registered
with the same name on sending and receiving sides. Typically they are module's
top-level variables with functions or classes declarations.

To register opaque values call `S.regOpaqueObject` or `S.regOpaquePrim`. With
their first argument is the value, and the second argument is its name. The name
may be omitted for `S.regOpaqueObject` the library will try to guess it. If it
is a function declaration, it will use its name, for example.

Calling `S.regOpaqueObject` will set `[S.descriptorSymbol]` property in the
object, while `S.regOpaquePrim` will store the value in library's internal map.

## Prototypes based inheritance

Use `S.regConstructor` to make objects with JS prototype inheritance
serializable.  It gets constructor function as its first argument and optional
name as the second.  The constructor function's name will be used if the name
argument isn't specified.

It will register the constructor's prototype as an opaque object. This way if
all the method are only referenced in prototype and all the data referenced in
the object is serializable the object is serializable.

## Functions serialization

The function's source code in JS is simple to write to a string (with `toString`
method) and simple to read (using `Function` constructor), however, there are two
significant issues.

De-serializing functions by calling `new Function(...)` is apparently very
dangerous.  Developers must be absolutely sure there is absolutely no data
received from outside. And it is quite difficult to guarantee.

Even if the security isn't a concern for the project, this way of
reading/writing function will lose all information about closure captured
variables. It is not even possible to serialize a result of
`Function.prototype.bind`. This way the function can only get state data either
from global variables (obviously not an option) or using `this` reference if the
function is some object's method.

If these limitations are too heavy, there is
a
[closure conversion transform](https://github.com/awto/effectfuljs/blob/master/packages/transducers/src/samples/closConvPass.js) pass. It
converts closures into objects with `call` method. This may solve all the
limitations. There are no needs to store function's text.  Some unique
identifier, say SHA1 is enough. And since there are no closures after
conversions object's translation will work well.

The transform is in Proof Of Concept state name, but will be moved into a
separate library SOON.

## TODO:

 * TS/Flow

## LICENSE

Copyright © 2016-2018 Vitaliy Akimov

Distributed under the terms of The MIT License (MIT).

