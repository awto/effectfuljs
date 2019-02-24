# @effectful/es-rt

Runtime for [@effectful/es](https://github.com/awto/effectfuljs/tree/master/packages/es)
implementing ECMAScript standard generator, async and async generator function.

## Usage

The module is automatically injected into @effectful/js output. If you are not new
effects libraries implementer you don't need the next documentation.

## Build

There are a few options to build it, and a few builds are published to npm.

To configure own builds use environment variables (with statically eliminated
false `if` branches) and rollup (import only required modules).

For most applications, pre-built runtimes are enough. Next information is only for
building own runtime. The environment variable options are:

 * `EJS_INLINE` - do not include abstract interface implementation
 * `EJS_LEAN_METHOD_ITERATORS` - include iterator constructions method
 * `EJS_NO_ES_OBJECT_MODEL` - assume ECMAScript object model requirement is not needed
 * `EJS_NO_ES_ITERATORS` - do not add ES iterators interface implementation
 (by default the package uses own iterators)
 * `EJS_NO_ES_CHECK_GENERATOR_RUNNING` - do not add check if generator is running
 on calling its method
 * `EJS_NO_UNWRAP_ASYNC_ITERATOR` - do not add standard required unwrapping
 for generator's output
 * `EJS_NO_ASYNC_ITERATOR_QUEUE` - do not add a queue to method calls
 * `EJS_LOCAL_SYMBOLS` - use local Symbol's for iterator names, if there are
 a few builds loaded, and some uses different implementation for interfaces
 * `EJS_DEFUNCT` - support for `defunct` option 
 * `EJS_NO_TRAMPOLINE` - don't use trampoline for tail calls, for example, if target
 JavaScript engine already supports tail calls

## Abstract interface

TODO: SOON

## LICENSE

Distributed under the terms of The MIT License (MIT).

