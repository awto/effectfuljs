const cp = require("child_process");
const path = require("path");
const fs = require("fs");
exports.command = "node";

exports.describe =
  "runs a command line with all `node` invocations are intercepted by the debugger";

exports.builder = function(yargs) {
  yargs.option("command", {
    alias: ["c", "_"],
    describe: "Command string to execute"
  });
};

exports.handler = function(argv) {
  const command = argv.command ? [argv.command] : argv._.slice(1);
  if (command.length) {
    const ext = path.extname(command[0]);
    if (ext === ".js" || ext === ".ts") command.unshift("node");
  }
  const sw = require("spawn-wrap");
  const wrapper = require.resolve("./wrap");
  const config = require("../defaults");
  const foreground = require("foreground-child");
  config.timeTravel = argv.timeTravel;
  config.zeroConfig = argv.zeroConfig;
  config.backend = argv.backend;
  config.cache = argv.cache;
  config.verbose = argv.verbose;
  if (argv.url) config.url = argv.url;
  const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    EFFECTFUL_DEBUGGER_URL: config.url,
    EFFECTFUL_DEBUGGER_TIME_TRAVEL: config.timeTravel,
    EFFECTFUL_DEBUGGER_TIME_TRAVEL_DISABLED: config.timeTravelDisabled,
    EFFECTFUL_DEBUGGER_SRC_ROOT: config.srcRoot,
    EFFECTFUL_DEBUGGER_BACKEND: config.backend,
    EFFECTFUL_DEBUGGER_CACHE: config.cache,
    EFFECTFUL_DEBUGGER: 1,
    EFFECTFUL_DEBUGGER_NODE: 1,
    EFFECTFUL_DEBUGGER_VERBOSE: config.verbose,
    EFFECTFUL_ZERO_CONFIG: config.zeroConfig,
    EFFECTFUL_ZERO_INSTRUMENT: config.instrument
  };
  const extraPath = path.join(".", "node_modules", ".bin");
  if (fs.existsSync(extraPath))
    process.env.PATH = process.env.PATH + path.delimiter + extraPath;
  sw([wrapper], env);
  process.exitCode = 0;
  foreground(command[0], command.slice(1));
};
