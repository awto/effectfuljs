export default {
  /** replace standard runtime functions with their instrumented equivalents */
  patchRT: true,
  /** enables traces collections */
  timeTravel: false,
  /** experimental (soon to be removed) options for signaling effect with an exception */
  expTCExceptions: false,
  /** Track DOM changes using MutationObserver */
  mutationObserver: true,
  /** Output something to console */
  verbose: false,
  /** Wraps result of (some) runtime functions returning new values (requires  `patchRT`) */
  wrapRTResults: true
};
