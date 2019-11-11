const cp = require("child_process");

cp.exec(
  `node ${__dirname}/child_process1`,
  { argv0: "child_process1" },
  function(res, stdout) {
    console.log("EXIT MAIN", res, JSON.stringify(stdout));
    cp.fork(`${__dirname}/child_process2`);
  }
);
