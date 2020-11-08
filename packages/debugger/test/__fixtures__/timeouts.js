const { delayTermination, signalTerminated } = require("../protocol");
delayTermination();
setTimeout(function to1() {
  const timeoutHandler = setTimeout(function to2() {
    debugger;
  });
  debugger;
  clearTimeout(timeoutHandler);
  let intervalCount = 0;
  const intervalHandler = setInterval(function to3() {
    debugger;
    if (++intervalCount === 2) {
      clearInterval(intervalHandler);
      setTimeout(function waitSome() {
        debugger;
        signalTerminated();
      }, 500);
    }
  });
}, 0);
