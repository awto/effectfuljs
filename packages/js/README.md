# @effectful/js

A babel plugin implementing single level computational effects syntax. 

From v2 it's just a wrapper of [@effectful/debugger](../debugger) babel presets and plugins.

## Usage

Install the plugin:

```
$ npm install --save-dev @effectful/js
```

Instal some custom computational effects runtime library, say "my-rt".

Use as [babel-plugin-macro](https://github.com/kentcdodds/babel-plugin-macros) to transform the whole file:

```javascript
import { ctrl } from "@effectful/js/macro";
ctrl; // invoking the actual macro for the whole file
```

There is also a babel plugin `@effectful/js/babel-plugin-transform`.

Note, both the macro and the plugin must run in a separate pass in the preset, for example:

```json
{
  "passPerPreset": true,
  "presets": [
    "some-preset",
    {
      "plugins": ["@effectful/js/babel-plugin-transform"]
    }
  ]
}
```

Or, if `macro` is used:

```json
{
  "passPerPreset": true,
  "presets": [
    "some-preset",
    {
      "plugins": ["@babel-plugin-macros"]
    }
  ]
}
```

The transpiler doesn't support most of the modern JavaScript features, so they must be pre-transpiled even if your environment supports them natively.

There are a few babel presets for this:

* `@effectful/js/babel-preset` - for plain JavaScript with some modern features
* `@effectful/js/babel-ts-preset` - for TypeScript with some modern features
* `@effectful/js/babel-preset-zero-config` - automatically selects TypeScript or plain JS presets, and also adds JSX extensions

## LICENSE

Distributed under the terms of The MIT License (MIT).
