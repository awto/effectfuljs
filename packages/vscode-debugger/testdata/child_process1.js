require("child_process").spawn("node", [`${__dirname}/child_process2`], {
  stdio: "inherit"
});
console.log("IN CP1");
