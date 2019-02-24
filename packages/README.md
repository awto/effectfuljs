
* [core](core) - code transformation routines
* [transducers](transducers) - utility library for code transformation with Visitors replaced by async generators
* [core-loose](core-loose) - [core](core) library built with [es-inline](es-inline) plugin
* [transducers-loose](transducers-loose) - [trasnducers](transducers) library built with [es-inline](es-inline) plugin
* [es](es) - babel plugin for ECMAScript compatible async, generator and async generator functions with abstract runtime
* [js](js) - the most abstract babel plugin for single/double-levels effects syntax
* [cc](cc) - runtime for multiprompt delimited continuations (mother of all monads)
* [es-inline](es-inline) - babel plugin for ECMAScript async, generator and async generator functions with concrete runtime
* [es-rt](es-rt) - runtimes for [es](es) and [es-inline](es-inline)
* [es-persist](es-persist) - [es](es) runtime (almost compatible with ECMAScript) with persistent state support
* [serialization](serialization) - reference and prototype inheritance aware serialization library, for using with [es-persist](es-persist)  
* [es-persist-serialization](es-persist-serialization) - [es-persist](es-persist) with [serialization](serialization) short cut
* [serialization-react](serialization-react) - adding support of ReactJS elements into [serialization](serialization) library
