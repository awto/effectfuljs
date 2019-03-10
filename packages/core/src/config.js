import core from "./libs/core";
import es from "./libs/es";

export default {
  // adds runtime checks in runtime if values to bind is effectful, and makes
  // it effectful if not
  coerce: false,

  // default profile name
  profile: null,

  // "es" | "commonjs"
  modules: "es",

  // default namespace name for directives
  ns: null,

  // Monad bind operation name
  bindName: "chain",

  // pure jump to another frame operation name
  pureBindName: "jump",

  // uses number representation for effectful frames, and emit dispatching
  // switch statements
  defunct: false,

  // throw exception on invalid state (for debugging purposes)
  defunctGuardInvalidState: true,

  // defunct `switch` statement discriminant source
  // "arg" - handler's function argument
  defunctStateDiscriminant: false,

  // creates a context object for each effectul function's call
  scopeContext: false,

  // pass context to operations (as their first argument)
  threadContext: false,

  // adds extra first frame, e.g. to make the effectful result object suspended
  // after effectful function call
  scopePrefix: false,

  // adds extra last frame, e.g. to extract some effectful data from context
  scopePostfix: false,

  // name of a function to construct context object
  scopeConstructor: "context",
  // name of a function to construct an object with closure captured variables
  pureScopeConstructor: false,

  // calls operations from either namespace or context object, otherwise
  // from current effectful object, this applies only for operations with
  // effectful argument, otherwise they are all static
  static: false,

  // combines Monadic bind and effectful operation into one function's call
  combineOps: false,

  // using pure lean iterator for for-of statement
  pureForOf: true,

  // translates pure `for-of` into lean iterators traversal
  // activated only with `loose:true`
  leanForOf: true,

  // use ECMAScript iteration protocol for for-ofs
  esForOf: false,
  esForAwaitOf: false,

  // name of a function to call for each effectful function
  // it may change something in object's protocol for that function
  wrapFunction: null,

  // how context is passed, the value is either:
  // * this - context is bound to this argument in each frame
  // * parameter - context is a first argument
  // * reference - as a closure captured variable - incompatible with topLevel
  // * closure - context is the function closure, no other object is created
  //           - works only with `inline***: "promise"`
  contextBy: "parameter",

  // handles JavaScript exceptions, by adding corresponding try-catch
  // statements otherwise will replace `throw` with `M.raise` in effectful
  // functions and ignores anything thrown from JS
  jsExceptions: true,

  // stores all local variables in context objects
  contextState: false,

  // variable names prefix/postfix for context store
  closVarPrefix: "_",
  closVarPostfix: "",

  // takes static operation from context object rather than namespace object
  contextMethodOps: false,

  // override `contextMethodOps` for specific operations
  // now overrides only `true`, otherwise not checked
  contextMethodOpsSpec: {},

  // marks operation binding some value with "B" character
  // otherwise every operation is marked
  markBindValue: false,

  // marks number of additional arguments threaded to op's call
  // if more than `unpackMax` it is "N" character
  markArgNum: false,

  // marks pure jumps back from inside loop block
  // to insert some trampoline if needed
  markRepeat: false,

  // marks operations containing error handling continuation with "H" character
  markErrorCont: false,

  // marks operation containing result continuation with "F" character
  markResultCont: false,

  // does some optimization specific conversion in pure code
  loose: false,

  // calls `exit` for `for-of` iterators if control exits
  // them before the iterator is done
  finalizeForOf: true,

  // moves frames out of function's body to the module top level
  topLevel: false,

  // detects import matching the pattern to apply compile-time options
  // true - means only pre-defined embedded libs are checked
  presetsImportPattern: true,

  // injects runtime from provided module
  importRT: null,

  // transpiles only modules containing the runtime import
  detectRT: null,

  // runtime function to be inlined in the module
  inlineRT: null,

  // name of global variable used as default control namespaces
  importGlobal: null,

  // stores control flow continuation in the field's name of context object
  storeCont: null,

  // stores currently applied continuation
  storeRunningCont: null,

  // stores result continuation in the field's name of context object
  storeResultCont: null,

  // stores error continuation in the field's name of context object
  storeErrorCont: null,

  // name of a handler function for defunct: true
  storeHandler: "$run",

  // keep single defunctHandler in a prototype
  defunctHandlerInProto: false,

  // some named templates for some operations (mostly for ES compatibility):
  inlineChainOp: null, // "promise" | null
  inlineScopeOp: null, // "unwrap" | "call" | "context" | null
  inlineYieldOp: null, // "iterator" | "iteratorResult" | "iteratorResultPromise" | null
  inlineYieldStarOp: null, // "iterator" | null
  inlinePureOp: null, // "asis" | "iterator" | "promise" | null
  inlineRaiseOp: null, // "throw" | "promise" | null

  // compose `chain` operator at its left(first) argument
  // by default they are composed on its right(second)
  // e.g. `f(g(k))` is converted to equivalent of `chain(k,x => chain(f(x), k))`
  // with `leftChain: true` it will be like `chain(chain(k,g),f)`
  // both options should be equivalent if monadic laws hold, but
  // some may have better performance
  // now the option is implemented only for `inlineChainOp:"promise"`
  leftChain: false,

  // inlines try-catch statements with redirect to handle continuation
  inlineJsExceptions: false,

  // convert `throw` statements into a error continuation calls
  inlineThrow: false,

  // inlines pure jumps between frames
  // possible values are:
  // * 'call' - replaces with simple function call
  // * 'tail' - optimized for defunct:true (requires inlineContAssign)
  // * 'promise' - wraps with promise resolve
  // * 'exit' - same tail calls but managed on generator (requires inlineContAssign)
  inlinePureJumps: null,

  // unsets variables if their values are not used after in control flow,
  // to avoid possible leaks if effectful computation is suspended for long
  cleanupFrameVars: false,

  // tries to minimize number of generated temporal variables
  reuseTempVars: true,

  // always calls `pure` operation at return
  keepLastPure: false,

  // always calls `raise` operation at function's exit by exception
  keepLastRaise: false,

  // inline assigning of error and result continuations into context
  // specifies name of a context's field to assign it to
  inlineResultContAssign: false,
  inlineErrorContAssign: false,
  // assign contination to context field before any jumps
  inlineContAssign: false,

  // resets normal continuation to type error to conform ES
  inlineReentryCheck: null,

  // wrap `value` field of async iterator with additional implicit await
  // the option applies only for inlining transform
  wrapAsyncIteratorValue: true,

  // if false it drops requirement `g[@@iterator]() === g` for generators
  // but avoids allocating single object per generator
  wrapGeneratorResult: true,

  // default libraries
  // the defaults here are only for testing purposes
  libs: {
    "@effectful/core": core,
    "@effectful/core-ct": core,
    "@effectful/js": core,
    "@effectful/js-ct": core,
    "@effectful/es": es,
    "@effectful/es-ct": es,
    "@effectful/generators": es,
    "@effectful/generators-ct": es
  },

  // profile definitions (dictionary of same opts object)
  profiles: {},

  // babylon options (not used if executed using babel tools)
  parser: {},

  // babel-generator options (not used if executed using babel tools)
  printer: {},

  // effectful operations to be called as method of its first argument object
  // this is applied only for `static: false`
  methodOps: {
    chain: true,
    map: true
  },

  // inline effectful value coercing if coerce: true
  inlineCoerce: false,

  // when inlining coerce check corresponding operation method is a function
  inlineCoerceCheckIsFunc: false,

  // if `false` it will avoid injecting anything for handling block scoping
  // that emit more optimized code but should be used only if you are sure
  // your don't use it, like the `@effectful/js`, all higher order functions
  // immediately execute their argument functions (like Array::map, filter) etc
  // so no needs to handle block scoping
  loopBlockScoping: true,

  // replaces `let`/`const` with `var`
  blockScoping: false,

  // rewrites module's import
  moduleAliases: null,

  // removes calls to `assert` functions
  removeAsserts: false,

  // using in-code directives to change translator settings
  // (`M.option`, `M.profile`)
  directives: true,

  // converts JS block directives into options assignment
  // string value or true for keys means profile assignment (same name if `true`)
  blockDirectives: {
    par: { parRegion: true },
    seq: { parRegion: false }
  },
  // defines call expressions to treat as effectful
  // {
  //    byNs: {[name:string]:boolen},   // ns names i.e. console
  //    libNs: {[name:string]:boolean}, // functions from the effectful library
  //    all: boolean,                   // default to all calls
  //    ns: boolean                     // effectful library ns
  // }
  // may be null to avoid perform the check
  bindCalls: {},

  // marks function nodes where transform is to be applied
  transform: false,

  // target JS engine has tail calls
  jsTailCalls: false,

  // Enbles storing variables in context fields sub objects.
  // By default stored directly in context if not defined.
  // Requres `contextState:true`
  // By default, say, variable `x` will be stored in `context._x` field
  // Then this option is enabled it will be `context.${stateStorageField}._x`
  enableSubFields: false,

  // Name of a context's field to store continuations and compuation values.
  // By default stored directly in context if not defined.
  // Requires `contextState:true`
  stateStorageField: null,

  // Name of a context's field to store captured closures.
  // By default stored directly in context or `stateStorageField`
  // Requires `contextState:true`
  // NOT IMPLEMENTED
  closureStorageField: null,

  // name of a context's field to store local variables
  // stored directly in context if not defined
  // handled only with `contextState:true`
  // NOT IMPLEMENTED
  varStorageField: null,

  // don't use function name in frame's name (ignored in with topLevel)
  shortFrameNames: true,

  // dictionary of hooks to apply before named stage in transforms pipline
  // the hook is a token stream transducer function
  before: null,

  // dictionary of hooks to apply after named stage in transforms pipline
  after: null,

  // applies normalization steps even for pure code
  // this may be needed for some extension
  normPureDoWhile: false,
  normPureWhile: false,
  normPureForIn: false,
  normPureBlocks: false,

  // * null  - leave everything sequential
  // * false - sequential by default, but will check for another options
  //           within the function
  // * true  - tries to parallelize effects frames if possible
  // it is a function's level option, if it is set to `true` it isn't going
  // to be parallelized immediately, only parts with `parActive:true` will
  // be considered, use `"par"` or `"seq"` block directives to amend
  // the variable

  par: false,
  // for functions with `par` specifies which parts of code should
  // be parallel or sequential (usually changed with "par", "seq" block directives)
  parRegion: false,

  // where to store thread's local variables
  // "closure" | "context"
  parThreadState: "closure",

  /** inject `share` operations for shared effectful values */
  parShare: true,

  // context's field name for storing thread local variables
  // for `parThreadState:"context"
  threadStorageField: "tls",

  // same as `scopeConstructor` but for function with implicit threads
  // default to the value of `scopeConstructor`
  parScopeConstructor: null,
  // same as `wrapFunction` but for functions with implicit threads
  // default to the value of `wrapFunction`
  parWrapFunction: null,
  // wrap each JSX element with coerce expression
  jsxCoerce: false,
  // name of a function to replace block-level directives
  blockDirsFunc: false
};
