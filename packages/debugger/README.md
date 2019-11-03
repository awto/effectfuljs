# @effectful/debugger (WIP)

This library provides userspace debugging tools.

Programs are harder to debug if they are transpiled with
EffectfulJS. We can use source maps to see original sources in
debuggers but it won't work on stepping, breakpoints and watching
variables values. However, there are new diagnostics utilities are
possible or we can debug not-transpiled code, it is possible since it
is plain valid JavaScript.

Even if programs don't use EffectfulJS they can get time-traveling and
hot-reloading with restoring closure captured variables, restoring
program's state from some savepoints and other diagnostics tools.

## Not yet implemented

 * stepping into setters, getters, proxy traps, casts,
   runtime called callbacks, dynamic imports
 * `with` statements

## LICENSE

Distributed under the terms of The MIT License (MIT).
