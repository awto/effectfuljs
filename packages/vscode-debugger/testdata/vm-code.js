const vm = require("vm");
const util = require("util");

const sandbox = {
  animal: "cat",
  count: 2
};

const savedCompile = vm.compileFunction;

vm.compileFunction = function(args, params, opts) {
  console.log("COMPILE", args, params, opts);
  return savedCompile.call(vm, args, params, opts);
};

const savedCreateScript = vm.createScript;

vm.savedCreateScript = function(args, params, opts) {
  console.log("Script", args, params, opts);
  return savedCreateScript.call(vm, args, params, opts);
};

vm.runInNewContext('count += 1; name = "kitty"', sandbox);
console.log(util.inspect(sandbox));

vm.runInNewContext('console.log("HI")', { console });
