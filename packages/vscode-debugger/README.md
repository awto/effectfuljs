# EffectfulJS Debugger (Work In Progress)

VSCode debugger for JavaScript/TypeScript. Among the typical debugger's features it offers:

- Time-traveling
- Persistent state
- Platform independence
- Programmable API
- Hot mocking of functions or even parts of a function
- Hot code swapping

It works by transpiling your JavaScript/TypeScript code and injecting necessary debugging API calls into it.

## Usage

Install it via marketplace - TODO

Add a new debug configuration.

## Configurations

To start debugger chose a debugger configuration you need through Debugging View in VSCode.

The common parameters in the configurations:

- "stopOnEntry" - stop after launch
- "stopOnExit" - stop just before program's exit (this is needed for time-traveling where the debugger can step backward)
- "timeTravel" - enable the time-traveling
- "timeTravelDisable" - starts debugger with time-traveling but don't enable trace's collection by default, this should be enabled after with API
- "verbose" - output various the debugger's debug information
- "preset" - zero-config presets

### Zero config

The configuration may be tricky but there are a few Zero-config options available.

#### NodeJS

For debugging NodeJS applications written in JavaScript or TypeScript. No need to transpile away TypeScript. To enable this specify field `"preset": "node"` in "launch.json", or press "Add Configuration..." button and choose "Effectful: Node".

Other specific parameters:

- "cwd" - a working directory
- "command" - the command to run (usually this should be "node")
- "args" - arguments for the command
- "console" - which terminal to use
- "env" - a dictionary for environment variables

#### Browser

This on start runs [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) with configuration mostly taken from [create-react-app](https://github.com/facebook/create-react-app).

To enable specify `"preset": "node"` in "launch.json", or press "Add Configuration..." button and choose "Effectful: Browser".

Other specific parameters:

- "htmlTemplate" - a template passed to [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
- "indexJs" - the main JS/TS file

### Custom configuration

If Zero config options aren't enough it is possible to configure everything manually.

For example, Jest prevents `require.register` hacks, so the transpiler should be added to its transforms explicitly (until this project doesn't have a Zero config for Jest).

Custom configuration can be used to improve modules loading performance. When NodeJS zero-config is used it transpile modules only when they are loaded, this may be annoying, so instead, we can have `babel watch` running separately, and loading already transpiled modules.

The babel's plugin is "@effectful/debugger/transform".

The plugin's order is a bit tricky, it doesn't support many modern JavaScript features so it should be run after other plugins implementing these features. But it also needs some modern features to be kept because otherwise some necessary information will be lost:

- generators/async/async generators functions
- let/const

But it is better to transpile the rest, for example, for now, it supports only CommonJS modules, and it doesn't support rest/spread for objects and arrays. There are a few preset with a few such plugins, along with the debugger's plugin, already applied:

- @effectful/config/babel/preset - for general ES6+
- @effectful/config/babel/preset-react - ES6+,JSX
- @effectful/config/babel/preset-zero-config - ES6+, JSX, TypeScript

Another tricky thing is to make it work properly not only your sources should be transpile but all the dependencies (from node_modules), for the dependencies compilation pass `{"blackbox": true}` to the presets or the plugin arguments.

If it isn't possible to transpile, because, say, it is a native module, it is still possible to use the debugger, but this requires more hacking with its API.

If `preset` field isn't specified in "launch.json" on start debugger just listens to WebSocket's port 20011 and by default, the transpiled code connects to it before running anything else.

The port number along with a few other options can be changed in [require("@effectful/debugger/config")](../debugger/src/config.ts). It should be loaded and the options should be changed before the runtime is loaded, for example using some specific not-transpiled module.

## API

The debugger's API can be accessed by `EDBG` global variables.

TODO: docs

## Persistent state

Not everything is serializable by default. There are sockets, sessions auth tokens, native modules states. By default, these are serialized into values that are ignored in the restoring state. This is fine if we don't mean to resurrect the program and only want to replay the time-traveling trace.

But the program still can be resurrected with additional efforts. We need to provide handlers which are either reconnect the socket, re-authenticate, restore the native modules states, etc.

This can be done by specifying [@effectful/serialization](../serialization) descriptor, either in code:

```javascript
if (global.EDBG) {
  EDBG.Serialization(myObject, "#myObj");
}
```

Or externally because it is easy to hot-mock functions and state, lie it for example done in "react" backend for storing `MessageChannel/MessagePort` which aren't serializable [backend/react](../debugger/src/backends/react.ts).

The state's saving is done by calling `EDBG.capture()` function. It returns a JSON.stringify serializable function which we can save to file or localStorage or send to some server.

For example for storing stage in localStorage:

```
localStorage.setItem("state",JSON.stringify(EDBG.capture()))
```

This can be run from VSCode debug console.

The reverse is done by `EDBG.restore` function, so to restore the previously state run:

```
EDBG.capture(JSON.parse(localStorage.getItem("state")))
```

## Time traveling

If `"timeTravel:true"` in "launch.json" it will start collecting traces which can be used to step and run backward in VSCode debugger. The traces are serializable if the state is serializable.

If the custom configuration is used the "timeTravel:true" must be also passed to the babel's plugin. The property values should be the same in both babel options and "launch.config".

## Interoperating with runtime/native modules

The debugger requires all third party libraries to be transpiled. This is possible only for JavaScript, so it isn't possible for runtime and native node modules or WebAssembly.

However, the compilation isn't always required, it is needed if the native modules call JavaScript functions if we want to trace through them. Even if the native third party still calls functions and we cannot polyfill its type-traveling trace will still be collected. So we'll be able to walk through it after.

DOM event handler is one of the examples of calling JS code from the native part. They are monkey patched now, but still, when we stop on breakpoint there it will release the JS thread, so runtime thinks the event execution is finished and proceed with event propagation even if after the breakpoint there is `Event.stopPropagation` call. This will be solved in future versions using either thread blockings or polyfilling the propagation using something jsdom (which won't solve default actions though).

## Not _yet_ finished

- stepping into setters, getters, proxy traps, casts,
  runtime called callbacks, dynamic imports
- `with` statements
- `eval` which adds variables into its calling scope
- function breakpoints
- better runtime polyfills (using corejs and jsdom), now it implements an incomplete and likely incompatible set of runtime functions
- original function's source code
- dynamic imports
- data URLs for WebWorkers
- PnP
- Jest Zero-config
- Better code merging on hot swapping
- the list of not _yet_ finished things

## LICENSE

Distributed under the terms of The MIT License (MIT).
