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
  /** Output debugging information to console (for some backends) */
  verbose: 0,
  /** URL to connect back to debugger adapter */
  url: "ws://localhost:20011",
  srcRoot: ".",
  /** module's hot swapping is enabled */
  hot: true,
  /** webpack-dev-server listening port */
  port: 10010,
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
  expNoCallWraps: true,
  expNoAccessOverloading: true,
  /**
   * evaluate modules exports eagerly in debug mode
   * if this is `false` each top level module must be specified
   * in `context.moduleId` to be able to be stopped on breakpoint
   */
  expEagerModuleExport: true
};
