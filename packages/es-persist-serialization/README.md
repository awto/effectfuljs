# @effectful/es-persist-serialization

The library uses [@effectful/es-persist](https://github.com/awto/effectfuljs/tree/master/packages/serialization)
to store async function state for
[@effectful/es-persist](https://github.com/awto/effectfuljs/tree/master/packages/es-persist).

It re-exports both of the libraries, and `@effectful/serialization` is
imported as peer dependency.

## Usage

Install from npm:

```
$ npm install --save-dev @effectful/es
$ npm install --save @effectful/es-persist-serialization @effectful/serialization
```

In .babelrc:

```json
{
  "presets": ["@effectful/es-persist-serialization/transform"]
}

```

If there are other babel presets, add `"passPerPreset":true`.

## License

Distributed under the terms of the [The MIT License (MIT)](LICENSE). 

