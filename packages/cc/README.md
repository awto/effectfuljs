# @effectful/cc

Runtime library for multi-prompt delimited continuations with
[EffectfulJS](https://github.com/awto/effectfuljs).

The library implements interface from [A Monadic Framework for Delimited Continuations][2]
paper.

[API documentation](api/README.md)

## Usage

For single level syntax and activating by import:

```
$ npm install --save-dev @effectful/js
$ npm install --save @effectful/cc
```

In .babelrc:

For two-level syntax with `async/await` overloading:

```json
{
  "presets": [["@effectful/js,{"detectRT":"@effectful/cc",profile:"asyncDo"}]]"
}
```

NOTE: If you need another babel presets, add `"passPerPreset":true`, e.g.

```json
{
  "passPerPreset": true,
  "presets": [["@effectful/js,{"detectRT":"@effectful/cc",profile:"asyncDo"}], "env"]
}
```


In JS files to transpile:

```javascript
import * as CC from "@effectful/cc"
```

or

```javascript
var CC = require("@effectful/cc")

```

All async functions in files with the imports will be transpiled into delimited
continuations functions.

For single-level:

```json
{
  "presets": "@effectful/cc/transform"
}
```

After in files importing "@effectful/cc" use directives:

```javascript
import * as CC from "@effectful/cc"

// ... all functions here won't be modified

CC.profile("defaultFull")

// ... all functions here are transpiled treating any function call as effectful

CC.profile("disabled")

// ... all functions here aren't modified again

```

To get effectful value in single-level mode use `CC.reify` function.

## References

[1]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.43.8213
     "Representing Monads, Andrzej Filinski."
[2]: http://www.cs.indiana.edu/cgi-bin/techreports/TRNNN.cgi?trnum=TR615
     "A Monadic Framework for Delimited Continuations, R. Kent Dybvig, Simon Peyton Jones, Amr Sabry."

## License

Copyright © 2016-2018 Vitaliy Akimov

Distributed under the terms of the [The MIT License (MIT)](LICENSE). 

