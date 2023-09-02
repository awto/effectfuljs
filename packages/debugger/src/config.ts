export default {
  /** replace standard runtime functions with their instrumented equivalents */
  patchRT: true,
  /** enables traces collections */
  timeTravel: false,
  /** don't start collecting traces immediately (awaits `EDBG.journal.enabled = true`) */
  timeTravelDisabled: false,
  /** tries to make everything serializable */
  persistState: true,
  /** Track DOM changes using MutationObserver */
  mutationObserver: true,
  /** Output debugging information to console (for some runtimes) */
  verbose: 0,
  /** URL to connect back to debugger adapter */
  url: "ws://localhost:20011",
  /** the debuggee package root */
  root: ".",
  /** the debuggee package sources location folder */
  srcRoot: ".",
  /** module's hot swapping is enabled */
  hot: <boolean | "exports">true,
  /** webpack-dev-server listening port */
  port: 12345,
  /** redirect `console` methods into the debug stream  */
  redirConsole: true,
  /** if `redirConsole` is specified output messages to a local console too */
  localConsole: true,
  expFunctionConstr: true,
  debuggerDebug: false,
  /** global variable NS for the debugger library */
  globalNS: "EDBG",
  keepObjectKeysOrder: true,
  keepContainersOrder: true,
  expInlineNext: false,
  stopOnEntry: false,
  /** for timeTravel debugging don't exit node process on program termination */
  stopOnExit: false,
  /** communcations are in a separate thread */
  expUseWorker: true,
  /** storing snapshot till the first breakpoint, and using it on reloading */
  fastRestart: <null | string | true>null,
  onChange: <null | string>null,
  /** executed when the program is restarted */
  onRestart: <(() => void) | null>null,
  /** executed after new version of the module's sources loaded  */
  onHotSwapping: <((module: any /* S.Module */) => void) | null>null,
  /** executed before/after executing async job (event handler, setTimeout etc) */
  onBeforeExec: <(() => void) | null>null,
  /** stepping into implicit calls support */
  implicitCalls: true,
  /** replacing module imports for loading debug version of dependencies */
  moduleAliases: <{[name:string]:string}>{}
};
