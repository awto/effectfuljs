export default {
  /** replace standard runtime functions with their instrumented equivalents */
  patchRT: true,
  /** enables traces collections */
  timeTravel: false,
  /** should it use the trace for forward time traveling */
  timeTravelForward: false,
  /** Track DOM changes using MutationObserver */
  mutationObserver: true,
  /** Output debugging information to console  (for some backends) */
  verbose: false,
  /** Wraps result of (some) runtime functions returning new values (requires  `patchRT`) */
  wrapRTResults: true,
  /** URL to connect back to debugger adapter */
  url: "ws://localhost:20011",
  /** root modules (pausing their imports execution), considers all modules as root if it is `null` */
  roots: null as null | string[]
};
