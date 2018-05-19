# @effectful/es-persist-serialization

The library uses [@effectful/es-persist](https://github.com/awto/effectfuljs/tree/master/packages/serialization)
to store async function state for
[@effectful/es-persist](https://github.com/awto/effectfuljs/tree/master/packages/es-persist).

It re-exports `@effectful/es-persist`.

## Usage

```
$ npm install --save-dev @effectful/es
$ npm install --save @effectful/es-persist-serialization
```

In .babelrc:

```json
{
  "presets": ["@effectful/es-persist-serialization/preset"]
}

```

If there are other babel presets, add `"passPerPreset":true`.

## License

Copyright © 2018 Vitaliy Akimov

Distributed under the terms of the [The MIT License (MIT)](LICENSE). 

