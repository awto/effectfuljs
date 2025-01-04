"no-ctrl";
const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");
const status = new Int32Array(workerData);
parentPort.on("message", function(filename) {
  fs.watch(filename, { persistent: false, encoding: "utf-8" }, type => {
    ++status[0];
    parentPort.postMessage({ type, filename });
  });
});
