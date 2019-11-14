export default {
  debug:
    (typeof window !== "undefined" && window.chrome) ||
    process.env.EFFECTFUL_DEBUG,
  color: typeof window !== "undefined" && window.chrome
};
