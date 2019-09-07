export default {
  /** replace standard runtime functions with their instrumented equivalents */
  patchRT: true,
  /** enables traces collections */
  timeTravel: false,
  /** should it use the trace for forward time traveling */
  timeTravelForward: false,
  /** tries to make everything serializable */
  persistState: true,
  /** stores time travel trace when serializing the application's state */
  persistTimeTravel: false,
  /** Track DOM changes using MutationObserver */
  mutationObserver: true,
  /** Output debugging information to console  (for some backends) */
  verbose: false,
  /** Wraps result of (some) runtime functions returning new values (requires  `patchRT`) */
  wrapRTResults: true,
  /** URL to connect back to debugger adapter */
  url: "ws://localhost:20011",
  /** root modules (pausing their imports execution), considers all modules as root if it is `null` */
  roots: null as null | string[],
  /** will try to use native Promise if `false` */
  patchedPromise: true
};
