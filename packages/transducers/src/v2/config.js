export default {
  browserDebug: typeof window !== "undefined" && window.chrome,
  debug: typeof window !== "undefined" || process.env.EFFECTFUL_DEBUG,
  color: typeof window !== "undefined" && window.chrome,
  verbose: false
};
