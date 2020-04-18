# EffectfulJS Debugger

VSCode debugger for JavaScript/TypeScript. Besides the typical debugger's features it offers:

* Time-traveling
* Persistent state
* Platform independence
* Programmable API
* Hot mocking of functions or even parts of a function
* Hot code swapping

This works by instrumenting JavaScript/TypeScript code and injecting necessary debugging API calls into it. It is implemented using [EffectfulJS](https://github.com/awto/effectfuljs).

![](https://media.giphy.com/media/gjTckBLm4Pt1kG6Ydr/giphy.gif)

## Caveats

The project is at its early stage. It requires runtime monkey patching and it isn't fully and properly done yet. So in big projects, it is quite unlikely everything works effortlessly (this, however, reduces debugging efforts).

Performance is obviously worse comparing to not instrumented code, especially when time-traveling is enabled.

## Usage

Install through VS Code Marketplace.

[Marketplace: Effectful Debugger](https://marketplace.visualstudio.com/items?itemName=effectful.debugger)

Or start VS Code Quick Open (Ctrl-P/Command-P), and enter:

```
ext install effectful.debugger
```

Next create ` .vscode/launch.json`, if it doesn't exist yet. For this open Debugger view (Ctrl(Command)-Shift-D) and press `create a launch.json file` link, and choose "Debug with EffectfulJS".

By default it adds NodeJS debugging configuration, to add browser's debugger, press "Add Configuration..." button in the left bottom corner of `launch.json` editor and choose "Effectful: Browser". By default, it doesn't require any other configs and expects a project with structure from [create-react-app](https://github.com/facebook/create-react-app).

Here is an example from `launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "effectful",
      "request": "launch",
      "name": "Launch Browser application",
      "preset": "browser",
      "timeTravel": true
    }
  ]
}
```

After configured, start debugging (F5). The first run takes more time because it needs to install its runtime.

The common parameters in the configurations:

* "stopOnEntry" - stop immediately after launching
* "stopOnExit" - stop just before program's exit (this is needed for time-traveling where the debugger can step backward)
* "timeTravel" - run with time-traveling
* "timeTravelDisable" - start debugging with time-traveling but don't enable trace's collection by default, this should be enabled after with API
* "preset" - zero-config preset name

The debugger requires all the sources (including third parties from node_modules) to be transpiled. The configuration may be tricky but there are a few zero-config options available.

## NodeJS

For debugging NodeJS applications written in JavaScript or TypeScript. To enable this specify field `"preset": "node"` in `launch.json`, or press "Add Configuration..." in "launch.json" editor and choose "Effectful: Node".

Other specific parameters:

* "cwd" - a working directory
* "command" - the command to run (usually this should be "node")
* "args" - arguments for the command
* "console" - which terminal kind to use
* "env" - a dictionary for environment variables 

This runs `babel` transforms for all loaded modules, and applies many common plugins (including TypeScript and Flow), but it ignores your babel config and ".babelrc" files. If you need to add something custom specify `env:{"EFFECTFUL_DEBUGGER_ZERO_CONFIG": false}`. This also means the debugger plugins should be added manually into the babel configs in the correct order, e.g. using `BABEL_ENV`.

## Browser

This on start runs [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) with configuration mostly taken from [create-react-app](https://github.com/facebook/create-react-app).

To enable specify `"preset": "node"` in "launch.json", or press "Add Configuration..." in "launch.json" editor and choose "Effectful: Browser".

Other specific parameters:

* "htmlTemplate" - a template passed to [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
* "indexJs" - the main JS/TS file 

## Custom configuration

If Zero config options aren't enough it is possible to configure everything manually.

For example, Jest carefully prevents `require.register` hacks, so the transpiler should be added to its transforms explicitly (until this project doesn't have a Zero config for Jest).
 
Custom configuration can be used to improve modules loading performance. When NodeJS zero-config is used it transpile modules only when they are loaded, this may be annoying, so instead, we can have babel in a watch mode running separately, and loading already transpiled modules.

The code should be transpiled with babel's plugin is "@effectful/debugger/transform".

The plugin's order is a bit tricky, it doesn't support many modern JavaScript features so it should be run after other plugins implementing these features. It also needs some modern features to be kept because otherwise some necessary information will be lost:
 
* generators/async/async generators functions
* let/const
* arrow functions

Other modern JS features should be trasnpiled. For example, for now, it supports only CommonJS modules, and it doesn't support rest/spread for objects and arrays. There are a few preset with a few such plugins, along with the debugger's plugin, already applied:

* @effectful/config/babel/preset - for general ES6+
* @effectful/config/babel/preset-react - ES6+,JSX
* @effectful/config/babel/preset-zero-config - ES6+, JSX, TypeScript

Another tricky thing is to make it work properly not only your sources should be transpile but all the dependencies (from node_modules), for the dependencies compilation pass `{"blackbox": true}` to the presets or the plugin arguments.

If it isn't possible to transpile, because, say, it is a native module, it is still possible to use the debugger, but this requires more hacking with its API. 

If `preset` field isn't specified in "launch.json" ("Add configuration..." in "launch.json" and choose "Effectful: Listener") on start debugger just listens to WebSocket's port 20011 and by default, the transpiled code connects to it before running anything else.

The port number along with a few other options can be changed in [require("@effectful/debugger/config")](../debugger/src/config.ts). It should be loaded and the options should be changed before the runtime is loaded, for example using some specific not-transpiled module.

### Runtime

The transpiled code calls debugger API functions. This API is installed separately from the plugin into the plugins directory. This may be inconvenient, but you can install it manually. However, the API dependencies should be hoisted in `node_modules`. There are a few ways to do this. 

Here are some of them:

1. Install "@effectful/debugger" into a separate folder and add it into NODE_PATH, or put it into some parent folder of your project.

2. Install "@effectful/debugger" globally and add link it into the project.

```
$ npm install --global @effectful/debugger
$ npm link @effectful/debugger
```

3. Use `--global-style` option for `npm install` (this doesn't work for yarn)

```
$ npm install --global-style --no-package-lock --no-save @effectful/debugger
```

The runtime package can be changed by specifying `runtime: "module"` in `launch.json`.

If we need some own runtime which adjusts some things we can make a package which just
re-exports modules from "@effectful/debugger" changing anything we need.

## API

The debugger's API can be accessed by `EDBG` global variables. 

The whole application state is stored in `EDBG.context` object. It stores the current stack, variables, async events queue, etc.  It can be changed just in place without any setters/getters. Check `interface State` in [state.ts](../debugger/src/state.ts) for more details.

The state can be accessed via "Debug Console" in VSCode, or from some dev scripts. This way may be used to mock functions or even a part of the functions or run some custom debugging scenarios.

## Persistent state

We can capture and restore the whole application state.

Not everything is serializable by default, but everything can be made serializable by providing special handlers. Among the not serializable by default values, there are sockets, sessions auth tokens, native modules states. If there are no serialization handlers provided, they are serialized into values that are ignored in the restoring state. This is fine if we don't mean to resurrect the program and only want to replay the time-traveling trace.

By default it uses [@effectful/serialization](../serialization) library, but any other can be used instead because all we need to store is `EDBG.context`, `EDBG.journal` and a few global objects (depending on the application).

But any program still can be resurrected with additional efforts. We need to provide handlers which are either reconnect the socket, re-authenticate, restore the native modules states, etc. This way, we can even restore the whole state of multitier applications.

This can be done by specifying [@effectful/serialization](../serialization) descriptor, either in code:

```javascript
if (global.EDBG) {
   EDBG.Serialization(myObject, "#myObj")
} 
```

Or externally because it is easy to hot-mock functions and state, lie it for example done in "react" special import for storing `MessageChannel/MessagePort` which aren't serializable [@effectful/debugger/react](../debugger/src/react.ts).

So to make react state to be fully serializable just add "runtime" in `launch.json`, for example:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "effectful",
      "request": "launch",
      "name": "Launch Browser application",
      "preset": "browser",
      "runtime": "@effectful/debugger/react"
    }
  ]
}
```

Check [@effectful/serialization](../serialization) for more details.

The state's saving is done by calling `EDBG.capture()` function. It returns a `JSON.stringify` a serializable value that we can save to file or localStorage or send to some server.

For example for storing stage in localStorage:
```
require("fs").writeFileSync("state.json", JSON.stringify(EDBG.capture()))
```

This can be run from VSCode debug console or some script.   

The reverse is done by `EDBG.restore` function, so to restore the previous state:

```
EDBG.restore(JSON.parse(require("fs").readFileSync("state.json","utf-8")))
```

DOM is also serializable, for now, only events added with `addEventListener` (and not by setters or HTML attribute) will be serialized.

## Time traveling

If `"timeTravel:true"` in ` .vscode/launch.json` it will start collecting traces that can be used to step and run backward in VSCode debugger. The traces are serializable if the state is serializable.

If the custom configuration is used the `"timeTravel:true"` must be also passed to the babel's plugin. The property values should be the same in both babel options and `launch.config`.

The time-traveling trace is stored in `EDBG.journal` object, and it can be changed and analyzed without any getter/setter. Its type is described in `interface Journal` in [state.ts](../debugger/src/state.ts).

For example, to disable traveling through the trace and just make the program to run from the current point, run `EDBG.journal.future = null` in "Debug Console" tab or in some of your scripts.

By default, it tracks only local variables, properties, and DOM changes. If something is changed in something external (e.g. DB, file, native module etc) it won't be tracked and changed, though, we'll still be able to travel through the program except resetting won't work for DBs. 

External states may be still tracked using special handlers. For example, when we change DB we just call `EDBG.TimeTravel.record(f)` where `f` is a callback which resets the DB into the former state. This callback should in turn `record` the reset change so time forwarding works. This way time-traveling can be enabled even for multi-tier applications.

## Interoperating with runtime/native modules

The debugger requires all third party libraries to be transpiled. This is possible only for JavaScript, so it isn't possible for runtime and native node modules or WebAssembly.

The compilation isn't always required, it is needed if not instrumented modules call JS functions and we want to trace through them. Even if the native third party still calls functions synchronously and we cannot polyfill its type-traveling trace will still be collected. So we'll be able to walk through it after.

DOM event handler is one of the examples of calling JS code from a native part (a browser).  They are roughly monkey patched now in this library, but still, when we stop on breakpoint there, it will release the main JS thread, so DOM runtime thinks the event execution is finished and proceed with event propagation even if after the breakpoint there is `Event.stopPropagation` call. This may be solved in future versions using either thread blockings or polyfilling the propagation using something like jsdom (which won't solve default actions though). 

Calling JS asynchronously works fine and doesn't need a wrapper. Only synchronous code may not work because it needs thread blocking. For example, it cannot stop inside the event handler called by `dispatchEvent` doesn't work, and it is why development version React doesn't work well, so in the demos, I use production React version which doesn't rely on `dispatchEvent`.

Even now, even if our program's logic heavily depends on the propagation of events we can still use time-traveling, and debug after the event handling is finished.

## Not *yet* done

 * stepping into setters, getters, proxy traps, casts,
   runtime called callbacks, dynamic imports
 * `with` statements
 * `eval` which adds new variables into its calling scope (changing variables from parent scopes works)
 * function breakpoints
 * better runtime polyfills (using corejs and jsdom), now it implements an incomplete and likely incompatible set of runtime functions
 * original function's source code
 * dynamic imports
 * data URLs for WebWorkers
 * PnP 
 * Jest Zero-config
 * Better code merging on hot swapping
 * docs
 * performance improvements
 * DOM events are serializable/traceable only if added through `addEventListener`, attributes and setters don't work
 * the list of not *yet* done

 ## LICENSE

Distributed under the terms of The MIT License (MIT).
