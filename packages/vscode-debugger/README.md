# EffectfulJS Debugger

VSCode debugger for JavaScript/TypeScript. Besides the typical debugger's features it offers:

- Time-traveling
- Persistent state
- Platform independence
- Programmable API
- Hot mocking of functions or even parts of a function
- Hot code swapping
- Data breakpoints

This works by instrumenting JavaScript/TypeScript code and injecting necessary debugging API calls into it. It is implemented using [EffectfulJS](https://github.com/awto/effectfuljs).

![](https://media.giphy.com/media/gjTckBLm4Pt1kG6Ydr/giphy.gif)

There are more demos in [Slides](https://docs.google.com/presentation/d/e/2PACX-1vQJwvPd1R4bPD_626ScR2rIUGmaXdmSp58VSfqm-7zYPVxH1UytUotF-YOSmgkZ1SOXnD7UwWovtWpF/pub?start=true&loop=true&delayms=30000).

## Caveats

The debugger requires runtime monkey patching and it isn't fully and properly done yet. So in big projects, it is quite unlikely everything works effortlessly (this, however, reduces debugging efforts).

Performance is obviously worse comparing to not instrumented code, especially when time-traveling is enabled.

Some libraries may depend on functions sources, this won't work here, it tries to keep at least parameters names though.

## Usage

Install through VS Code Marketplace.

[Marketplace: Effectful Debugger](https://marketplace.visualstudio.com/items?itemName=effectful.debugger)

Or start VS Code Quick Open (Ctrl-P/Command-P), and enter:

```
ext install effectful.debugger
```

Next create `.vscode/launch.json`, if it doesn't exist yet. For this open Debugger view (Ctrl(Command)-Shift-D) and press `create a launch.json file` link, and choose "Debug with EffectfulJS".

By default it adds NodeJS debugging configuration, to add browser's debugger, press "Add Configuration..." button in the left bottom corner of `launch.json` editor and choose "Effectful: Node".

Here is an example from `launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "effectful",
      "request": "launch",
      "name": "Node application",
      "preset": "node",
      "cwd": "${workspaceRoot}",
      "command": "node",
      "args": [
          "${file}"
      ],
      "console": "integratedTerminal",
      "timeTravel": true,
      "env": {}
    }
  ]
}
```

After configured, start debugging (F5). The first run takes more time because it needs to install its runtime.

The common parameters in the configurations:

- "stopOnEntry" - stop immediately after launching
- "stopOnExit" - stop just before program's exit (this is needed for time-traveling where the debugger can step backward)
- "timeTravel" - run with time-traveling
- "timeTravelDisable" - start debugging with time-traveling but don't enable trace's collection by default, this should be enabled after with API
- "preset" - zero-config preset name
- "skipRuntimeInstall" - skip runtime installation


The debugger requires all the sources (including third parties from node_modules) to be transpiled. The configuration may be tricky but there are a few zero-config options available.

## NodeJS

For debugging NodeJS applications written in JavaScript or TypeScript. To enable this specify field `"preset": "node"` in `launch.json`, or press "Add Configuration..." in "launch.json" editor and choose "Effectful: Node".

Other specific parameters:

- "cwd" - a working directory
- "command" - the command to run (usually this should be "node")
- "args" - arguments for the command
- "console" - which terminal kind to use
- "env" - a dictionary for environment variables
- "shell" - use shell to run the command

This runs `babel` transforms for all loaded modules, and applies many common plugins (including TypeScript and Flow), but it ignores your babel config and ".babelrc" files. If you need to add something custom specify `env:{"EFFECTFUL_DEBUGGER_ZERO_CONFIG": false}`. This also means the debugger plugins should be added manually into the babel configs in the correct order, e.g. using `BABEL_ENV`.

## Browser and NextJS

Unfortunately, I had to remove zero-config for nextjs and browser. Simply I don't have time to cope with all the breaking changes in webpack 5 and related libraries. Maybe I'll return it in some future.

I'd appreciate any help with this.

Meanwhile you still can use the debugger with nextjs and browser but with adding simple configuration like described in the next version.

## Custom configuration

If Zero config options aren't enough it is possible to configure everything manually.

For example, Jest carefully prevents `require.register` hacks, so the transpiler should be added to its transforms explicitly (until this project doesn't have a Zero config for Jest).

Custom configuration can be used to improve modules loading performance. When NodeJS zero-config is used it transpile modules only when they are loaded, this may be annoying, so instead, we can have babel in a watch mode running separately, and loading already transpiled modules.

The code should be transpiled with babel's plugin is "@effectful/debugger/transform".

The plugin's order is a bit tricky, it doesn't support many modern JavaScript features so it should be run after other plugins implementing these features. It also needs some modern features to be kept because otherwise some necessary information will be lost:

- generators/async/async generators functions
- let/const
- arrow functions

Other modern JS features should be trasnpiled. For example, for now, it supports only CommonJS modules, and it doesn't support rest/spread for objects and arrays. There are a few preset with a few such plugins, along with the debugger's plugin, already applied:

- @effectful/config/babel/preset - for general ES6+
- @effectful/config/babel/preset-react - ES6+,JSX
- @effectful/config/babel/preset-zero-config - ES6+, JSX, TypeScript

Another tricky thing is to make it work properly not only your sources should be transpile but all the dependencies (from node_modules), for the dependencies compilation pass `{"blackbox": true}` to the presets or the plugin arguments.

If it isn't possible to transpile, because, say, it is a native module, it is still possible to use the debugger, but this requires more hacking with its API.

If `preset` field isn't specified in "launch.json" ("Add configuration..." in "launch.json" and choose "Effectful: Listener") on start debugger just listens to WebSocket's port 20011 and by default, the transpiled code connects to it before running anything else.

The port number along with a few other options can be changed in [require("@effectful/debugger/config")](../debugger/src/config.ts). It should be loaded and the options should be changed before the runtime is loaded, for example using some specific not-transpiled module.

To pause long-running scripts it uses `SharedArrayBuffer`. In Chrome (after v92) and Firefox (after v76), this works only with [cross-origin isolation](https://web.dev/coop-coep/). You'll likely need to add the corresponding headers into your webpack DevServer config, otherwise, the debugger won't be able to stop long-running scripts.

Using `"listener"` preset the debugger just listens a WebSocket port for connections either from web browsers or from NodeJS. There is a [@effectful/debugger/register](../debugger/src/register.js) module which can be used, for example, with `NODE_OPTIONS="--require=@effectful/debugger/register"`.

There is also a webpack loader [@effectful/debugger/loader](../debugger/loader.js) which can be used to load the debugger's runtime into browsers. You may want to have a separate index file just for debugging. It's enough to have the prefix only in the first import, the rest of the imports will be processed by the loader.

### Runtime

The transpiled code calls debugger API functions. This API is installed separately from the plugin into the plugins directory. This may be inconvenient, but you can install it manually as dev dependency into your project.

```
$ npm install --save-dev @effectful/debugger
```

## API

The debugger's API can be accessed by `EDBG` global variables.

The whole application state is stored in `EDBG.context` object. It stores the current stack, variables, async events queue, etc. It can be changed just in place without any setters/getters. Check interface [State](../debugger/api/interfaces/_state_.state.md) for more details.

The state can be accessed via "Debug Console" in VSCode, or from some dev scripts. This way may be used to mock functions or even a part of the functions or run some custom debugging scenarios.

## Persistent state

We can capture and restore the whole application state.

Not everything is serializable by default, but everything can be made serializable by providing special handlers. Among the not serializable by default values, there are sockets, sessions auth tokens, native modules states. If there are no serialization handlers provided, they are serialized into values that are ignored in the restoring state. This is fine if we don't mean to resurrect the program and only want to replay the time-traveling trace.

By default it uses [@effectful/serialization](../serialization) library, but any other can be used instead because all we need to store is `EDBG.context`, `EDBG.journal` and a few global objects (depending on the application).

But any program still can be resurrected with additional efforts. We need to provide handlers which are either reconnect the socket, re-authenticate, restore the native modules states, etc. This way, we can even restore the whole state of multitier applications.

This can be done by specifying [@effectful/serialization](../serialization) descriptor, either in code:

```javascript
if (global.EDBG) {
  EDBG.Serialization(myObject, "#myObj");
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
      "name": "Launch NodeJS application",
      "preset": "node",
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

There is an optional parameter to set serialization options from [@effectful/serialization](../serialization). For `EDBG.capture` it is its first argument which has type [WriteOptions](../serialization/api/interfaces/writeoptions.md), and for `EDBG.restore` it is its second parameter and it has type [ReadOptions](../serialization/api/interfaces/readoptions.md).

Each `EDBG.restore` starts execution right after corresponding `EDBG.capture`. But instead of the actual the state it returns `null` to signal it is a forked run.

## Time traveling

If `"timeTravel:true"` in `.vscode/launch.json` it will start collecting traces that can be used to step and run backward in VSCode debugger. The traces are serializable if the state is serializable.

If the custom configuration is used the `"timeTravel:true"` must be also passed to the babel's plugin. The property values should be the same in both babel options and `launch.config`.

The time-traveling trace is stored in `EDBG.journal` object, and it can be changed and analyzed without any getter/setter. Its type is described in [interface Journal](../debugger/api/interfaces/_state_.journal.md).

For example, to disable traveling through the trace and just make the program to run from the current point, run `EDBG.journal.future = null` in "Debug Console" tab or in some of your scripts.

There are a lot of more advanced usages, for example, comparing different runs of the same code, for example, failed test run with some last successful run.

The journal object is stored and restored by `EDBG.capture`/`EDBG.restore` functions. If the goal is only post-mortem debugging we can safely ignore all the warnings about non-serializable values. But if we want to resurrect it from some point all of them must be fixed. If you pass `{warnIgnored:false}` to `EDBG.capture` it won't output any warnings.

By default, it tracks only local variables, properties, and DOM changes. If something is changed in something external (e.g. DB, file, native module, etc) it won't be tracked and changed, though, we'll still be able to travel through the program except resetting won't work for DBs.

External states may be still tracked using special handlers. For example, when we change DB we just call `EDBG.TimeTravel.record(f)` where `f` is a callback which resets the DB into the former state. This callback should in turn `record` the reset change so time forwarding works. This way time-traveling can be enabled even for multi-tier applications.

## Hot-swapping/Fast restarting

The debugger will load new sources when their file is saved. but will try to keep the old application state.

For now, the state merging isn't very efficient - variables are saved by their positions and the current execution position may be shifted into a wrong location. This should be improved in some future version. Anyway, for small changes, this is works well enough.

There is also an option to restart the process from some point after some heavy loading. This is especially useful when debugging node. We can skip long-running operations of process restart and modules loading.

To specify the way the debugger handles file changes set `"onChange"` option in `launch.json`. Now it can have two values - `"restart"` or `"merge"`, to make it restart the program or keep the current execution position respectively.

To make it restart faster set `launch.json` option `"fastRestart"` to `"entry"` or `true`. If it is `"entry"` the debugger's runtime stores the state before running any user code. In Node, this is the way to avoid process restarts and modules reloading.

To restart from some later location (for example, after some heavy initialization), we can run something like this snippet in code (or even in a conditional breakpoint).

```
if (typeof EDBG !== "undefined") {
  const state = EDBG.capture({ warnIgnored: false });
  if (state) {
    EDBG.config.onHotSwapping = EDBG.config.onRestart = () =>
      EDBG.restore(state);
  }
  EDBG.journal.enabled = true;
}
```

This snippet calls `restore` on restart (`onRestart` callback) and after some project file is changed and loaded file (`onHotSwapping` callback).

Add `"timeTravelDisabled": true` so the initialization won't collect time-traveling traces, and only enable it when it is interesting. In the snippet above it is `EDBG.journal.enabled = true;` line.

## Data breakpoints

Data breakpoints require time traveling to work. It can be disabled if not needed with `"timeTravelDisabled": true` option. However, they are especially useful with time traveling. If you need to know what set some value, add a data breakpoint to it and run the execution backward.

## Interoperating with runtime/native modules

The debugger requires all third party libraries to be transpiled. This is possible only for JavaScript, so it isn't possible for runtime and native node modules or WebAssembly.

The compilation isn't always required, it is needed if not instrumented modules call JS functions and we want to trace through them. Even if the native third party still calls functions synchronously and we cannot polyfill its type-traveling trace will still be collected. So we'll be able to walk through it after.

DOM event handler is one of the examples of calling JS code from a native part (a browser). They are roughly monkey patched now in this library, but still, when we stop on breakpoint there, it will release the main JS thread, so DOM runtime thinks the event execution is finished and proceed with event propagation even if after the breakpoint there is `Event.stopPropagation` call. This may be solved in future versions using either thread blockings or polyfilling the propagation using something like jsdom (which won't solve default actions though).

Calling JS asynchronously works fine and doesn't need a wrapper. Only synchronous code may not work because it needs thread blocking. For example, it cannot stop inside the event handler called by `dispatchEvent` doesn't work, and it is why development version React doesn't work well, so in the demos, I use production React version which doesn't rely on `dispatchEvent`.

Even now, even if our program's logic heavily depends on the propagation of events *it's still possible to use time-traveling*, and debug after the event handling is finished. Just set `stopOnExit:true`, finish the whole run, and run the program backward.

Many native modules have alternative pure JavaScript implementation. Typically, they are used to run NodeJS modules in a web browser using tools such as webpack or browserify. They can be used for debugging purposes. By default, the debugger replaces NodeJs `events` module with the one from browserify. However, this can be done for other modules too.

A `moduleAliases` configuration parameter offers to replace the module with an alternative only during debugging. The object's key is the original module name, and the key is what it's replaced with.

### Debugging NodeJS streams

As described before, the debugger cannot stop inside a callback called by native or not transpiled modules. Fortunately, pure JavaScript alternatives are offering at least part of it. Here's an example for NodeJS streams. There is their pure implementation in [readable-stream](https://github.com/nodejs/readable-stream). So, to make applications extensively using NodeJS streams, install the module (save for development only), and add the following option into the `launch.json`:

```json
   "moduleAliases": {
        "node:stream": "readable-stream",
        "stream": "readable-stream"   
   }
``` 

## Firefox

For preventing Spectre attack Firefox disabled `SharedArrayBuffer`. But it is used by the debugger to pause running code (when, for example, it is frozen due to some error/. To enable shared memory in Firefox, navigate to `about:config` -> `I accept the risk!` -> set `javascript.options.shared_memory` to true.

## Implicit calls

Stepping into JavaScript Proxies/setters and getters are supported only in code compiled with time-traveling enabled. If time-traveling isn't needed it can be disabled with following in "launch.json": `{"timeTravel":true, "timeTravelDisabled":true}`

Stepping into casts and other functions called implicitly by runtime synchronously isn't supported yet.

## Eval

Function constructors, eval expression, and "vm" node module are supported. However `eval` cannot yet add variables into calling scope yet. But it still can change the calling scope variables if they are declared there.

## Not _yet_ done

- stepping into casts, runtime called callbacks, dynamic imports
- `with` statements
- `eval` which adds new variables into its calling scope (changing variables from parent scopes works)
- function breakpoints
- better runtime polyfills (using corejs and jsdom), now it implements an incomplete and likely incompatible set of runtime functions
- original function's source code
- dynamic imports
- data URLs for WebWorkers
- PnP
- Jest Zero-config
- Better code merging on hot swapping
- docs
- performance improvements
- DOM events are serializable/traceable only if added through `addEventListener`, attributes and setters don't work
- the list of not _yet_ done

## LICENSE

Distributed under the terms of The MIT License (MIT).
