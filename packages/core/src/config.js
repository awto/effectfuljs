import core from "./libs/core"
import es from "./libs/es"

export default {
  // adds runtime checks in runtime if values to bind is effectful, and makes
  // it effectful if not
  coerce: false,

  // default preset name
  preset: null,

  // "es" | "commonjs"
  modules: "es",

  // default namespace name for directives
  ns: null,

  // Monad bind operation name
  bindName: "chain",

  // pure jump to another frame operation name
  pureBindName: "jump",

  // max number of arguments threaded from op's arguments to callbacks
  // if more they are packed into array
  // this applies only for state: true, contextState: false
  unpackMax: 5,

  // uses number representation for effectful frames, and emit dispatching
  // switch statements
  defunct: false,

  // throws exception on invalid state, for debugging purposes
  defunctGuardInvalidState: false,

  // creates a context object for each effectul function's call
  scopeContext: false,

  // adds extra first frame, e.g. to make the effectful result object suspended
  // after effectful function call
  scopePrefix: false,

  // adds extra last frame, e.g. to extract some effectful data from context
  scopePostfix: false,

  // name of a function to construct context object
  scopeConstructor: "context",

  // calls operations from either namespace or context object, otherwise
  // from current effectful object, this applies only for operations with
  // effectful argument, otherwise they are all static
  static: false,

  // combines Monadic bind and effectful operation into one function's call
  combineOps: false,

  // using pure lead iterator for for-of statement
  pureForOf: true,

  // translates pure `for-of` into lean iterators traversal
  // activated only with `loose:true`
  leanForOf: true,

  // name of a function to call for each effectful function
  // it may change something in object's protocol for that function
  wrapFunction: null,

  // how context is passed, the value is either:
  // * this - context is bound to this argument in each frame
  // * parameter - context is a first argument
  // * reference - as a closure captured variable - incompatible with topLevel
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
  markBindValue: true,

  // marks number of additional arguments threaded to op's call
  // if more than `unpackMax` it is "N" character
  markArgNum: false,

  // marks pure jumps back from inside loop block
  // to insert some trampoline if needed
  markRepeat: true,

  // marks operations containing error handling continuation with "H" character
  markErrorCont: true,

  // marks operation containing result continuation with "F" character
  markResultCont: true,

  // does some optimization specific conversion in pure code
  loose: false,

  // calls `exit` for `for-of` iterators if control exits
  // them before the iterator is done
  finalizeForOf:true,

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

  // stores result continuation in the field's name of context object
  storeResultCont: null,

  // stores error continuation in the field's name of context object
  storeErrorCont: null,

  // some named templates for some operations (mostly for ES compatibility):
  inlineChainOp: null, // "promise" | null
  inlineScopeOp: null, // "unwrap" | "call" | "context" | null
  inlineYieldOp: null, // "iterator" | null
  inlineYieldStarOp: null, // "iterator" | null
  inlinePureOp:null,   // "noop" | "iterator" | "promise" | null
  inlineRaiseOp:null,  // "throw" | "promise" | null

  // creates a copy of context with each variable copied on each suspendable op
  // TODO: not yet implemented
  inlineContextClone: false,

  // inlines try-catch statements with redirect to handle continuation
  inlineJsExceptions: false,

  // convert `throw` statements into a error continuation calls
  inlineThrow: false,

  // inlines pure jumps between frames
  // possible values are:
  // * 'call' - replaces with simple function call
  // * 'tail' - optimized for defunct:true (requires inlineContAssign)
  // * 'exit' - same tail calls but managed on generator (requires inlineContAssign)
  inlinePureJumps: null,

  // unsets variables if their values are not used after in control flow,
  // to avoid possible leaks if effectful computation is suspended for long
  cleanupFrameVars: false,

  // how to pack threaded args if they don't fit `unpackMax`
  // possible values are "array" | "apply" | "object"
  packArgs: "array",

  // tries to minimize number of generated temporal variables
  reuseTempVars: true,

  // always calls `pure` operation at return
  keepLastPure: true,

  // always calls `raise` operation at function's exit by exception
  keepLastRaise: true,
  
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
    "@effectful/es": es,
    "@effectful/generators": es
  },

  // profile definitions (dictionary of same opts object)
  profiles: {},

  // babylon options (not used if executed using babel tools)
  parser: {},

  // babel-generator options (not used if executed using babel tools)
  printer: {},

  // effectful operations to be called as method of
  // first argument effectful object, this is applied only of static: false
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

  // Handles local variables as threaded arguments, passed to operations
  // and further back to next continuation, this makes their values isolated
  // between different continuations
  // WARNING: it doesn't handle closure captured vars,
  // they are treated as references
  // It is ignored if contextState: true
  state: false,

  // rewrites module's import
  moduleAliases: null,

  // removes calls to `assert` functions
  removeAsserts: false,

  // using in-code directives to change translator settings
  directives: true,

  // check if there is an import already for `importRT` and use it
  reuseImports: true,

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

  // encode effectful `for-of` loops using CPS
  invertForOf: false,

  // name of a context's field to store continuations and compuation values
  // stored directly in context if not defined
  stateStorageField: null,

  // name of a context's field to store captured closures
  // stored directly in context if not defined
  // handled only with `contextState:true`
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
  normPureBlocks: false

}
