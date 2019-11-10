exports.command = "node";

exports.describe =
  "runs a command line with all `node` invocations are intercepted by the debugger";

exports.builder = function(yargs) {
  yargs
    .option("zero-config", {
      alias: ["z", "zero_config"],
      describe: "Default babel plugins set for .ts/.js",
      default: true,
      type: "boolean"
    })
    .option("command", {
      alias: ["c", "_"],
      describe: "Command string to execute"
    });
};

exports.handler = function(argv) {
  const command = argv.command ? [argv.command] : argv._.slice(1);
  const sw = require("spawn-wrap");
  const wrapper = require.resolve("./wrap");
  const config = require("../defaults");
  const foreground = require("foreground-child");

  config.timeTravel = argv.timeTravel;
  config.zeroConfig = argv.zeroConfig;
  config.backend = argv.backend;
  config.cache = argv.cache;
  if (argv.url) config.url = argv.url;
  const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    EFFECTFUL_DEBUGGER_URL: config.url,
    EFFECTFUL_DEBUGGER_TIME_TRAVEL: config.timeTravel,
    EFFECTFUL_DEBUGGER_SRC_ROOT: config.srcRoot,
    EFFECTFUL_DEBUGGER_BACKEND: config.backend,
    EFFECTFUL_DEBUGGER_CACHE: config.cache,
    EFFECTFUL_DEBUGGER: 1,
    EFFECTFUL_DEBUGGER_NODE: 1
  };
  sw([wrapper], env);
  process.exitCode = 0;
  foreground(command[0], command.slice(1));
};
