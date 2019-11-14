export default {
  /** replace standard runtime functions with their instrumented equivalents */
  patchRT: true,
  /** enables traces collections */
  timeTravel: false,
  /** don't start collecting traces immediately but await an API call */
  timeTravelDisabled: false,
  /** tries to make everything serializable */
  persistState: true,
  /** Track DOM changes using MutationObserver */
  mutationObserver: true,
  /** Output debugging information to console (for some backends) */
  verbose: 0,
  /** URL to connect back to debugger adapter */
  url: "ws://localhost:20011",
  /** will try to use native Promise if `false` */
  patchedPromise: true,
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
  globalNS: "EDBG"
};
