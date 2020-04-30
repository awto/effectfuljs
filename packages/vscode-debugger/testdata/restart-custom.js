console.log("BEFORE");
if (typeof EDBG !== "undefined") {
  let state;
  EDBG.config.onRestart = () => EDBG.restore(state);
  state = EDBG.capture(true);
}
console.log("AFTER");
