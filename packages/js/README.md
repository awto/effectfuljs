# @effectful/js

A babel preset implementing single level computational effects syntax.

## Usage

Install the preset:

```
$ npm install --save-dev @effectful/js
```

Instal some custom effects runtime library, say "my-rt".

Specify the preset `presets` field of ".babelrc", or using any other
way babel supports.

The preset doesn't use babel's transformation framework, so it requires
`passPerPreset` argument, if there are other presets.

For example:

```json
{
  "passPerPreset": true,
  "presets": [["@effectful/js",{"importRT":"my-rt"}],"env"]
}
```

Compile original sources with any tool supporting `babel`. E.g.

```
$ babel index.js
```



