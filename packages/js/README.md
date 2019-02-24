# @effectful/js

A babel plugin implementing single level computational effects syntax.

## Usage

Install the plugin:

```
$ npm install --save-dev @effectful/js
```

Instal some custom computational effects runtime library, say "my-rt".

Specify the plugin `plugins` field of ".babelrc", or using any other
way babel supports.

For example:

```json
{
  "plugins": [["@effectful/js",{"importRT":"my-rt"}],"env"]
}
```

## LICENSE

Distributed under the terms of The MIT License (MIT).

