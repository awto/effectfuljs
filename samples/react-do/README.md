# @effectful/react-do

This is a demo project showing how to make a transpiler for custom effects.


## Usage

Install it with:

```
$ npm install --save-dev @effectful/core
$ npm install --save @effectful/react-do
```

### As a babel-plugin

Use "@effectful/react-do/transform" as a babel plugin.

For example using command line:

```
$ babel --plugins @effectful/react-do/transform index.js
```

Or in `.babelrc`:

```
{
  "plugins": [@effectful/react-do/transform]
}
```

### As a macro

Zero-configuration using
[babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros),
or any other tool where it is enabled by default (for example 
[Create Reat App](https://github.com/facebook/create-react-app)).

```javascript

import "@effectful/cc/async-do.macro"

```

