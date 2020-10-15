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
  config.runtime = argv.runtime;
  config.cache = argv.cache;
  config.verbose = argv.verbose;
  config.instrument = argv.instrument;
  config.instrumentDeps = argv.instrumentDeps;
  if (argv.url) config.url = argv.url;
  const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    EFFECTFUL_DEBUGGER_URL: config.url,
    EFFECTFUL_DEBUGGER_TIME_TRAVEL: config.timeTravel,
    EFFECTFUL_DEBUGGER_TIME_TRAVEL_DISABLED: config.timeTravelDisabled,
    EFFECTFUL_DEBUGGER_SRC_ROOT: config.srcRoot,
    EFFECTFUL_DEBUGGER_RUNTIME: config.runtime,
    EFFECTFUL_DEBUGGER_CACHE: config.cache,
    EFFECTFUL_DEBUGGER: 1,
    EFFECTFUL_DEBUGGER_NODE: 1,
    EFFECTFUL_DEBUGGER_VERBOSE: config.verbose,
    EFFECTFUL_DEBUGGER_ZERO_CONFIG: config.zeroConfig,
    EFFECTFUL_DEBUGGER_INCLUDE: argv.include,
    EFFECTFUL_DEBUGGER_BLACKBOX: argv.blackbox,
    EFFECTFUL_DEBUGGER_EXCLUDE: argv.exclude,
    EFFECTFUL_DEBUGGER_INSTRUMENT: argv.instrument,
    EFFECTFUL_DEBUGGER_INSTRUMENT_DEPS: argv.instrumentDeps,
    EFFECTFUL_DEBUGGER_PATCH_VM: argv.patchVm
  };
  if (config.runtimePackages)
    env.EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES = config.runtimePackages;
  const extraPath = path.join(".", "node_modules", ".bin");
  if (fs.existsSync(extraPath))
    process.env.PATH = process.env.PATH + path.delimiter + extraPath;
  sw([wrapper], env);
  process.exitCode = 0;
  foreground(command[0], command.slice(1));
};
