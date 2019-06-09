export default {
  /** replace standard runtime functions with their instrumented equivalents */
  replaceRT: true,
  /** enables traces collections */
  timeTravel: false,
  /** do whole object snapshot on each checkpoint  */
  objectSnapshots: true,
  /** do whole Map/Set snapshot on each checkpoint  */
  iterableSnapshots: false,
  /** experimental (soon to be removed) options for signaling effect with an exception */
  expTCExceptions: false
};
