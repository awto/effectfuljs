const defaults = require("../../config");

exports.command = "browser";

exports.describe = "starts a configured webpack-dev-server";

exports.builder = function (yargs) {
  yargs
    .strict()
    .option("port", {
      describe: "dev-server listening port",
      alias: "p",
      default: defaults.port,
      type: "number",
    })
    .option("index-js", {
      type: "string",
      describe: "index.js file",
    })
    .option("html-template", {
      type: "string",
      describe: "webpack HTML template file",
    })
    .option("open", {
      describe: "open the URL",
      default: false,
      boolean: true,
    });
};

exports.handler = function (argv) {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
  if (argv.timeTravel) process.env.EFFECTFUL_DEBUGGER_TIME_TRAVEL = 1;
  if (argv.timeTravelDisabled)
    process.env.EFFECTFUL_DEBUGGER_TIME_TRAVEL_DISABLED = 1;
  if (argv.runtime) process.env.EFFECTFUL_DEBUGGER_RUNTIME = argv.runtime;
  if (argv.cache) process.env.EFFECTFUL_DEBUGGER_CACHE = 1;
  if (argv.open) process.env.EFFECTFUL_DEBUGGER_OPEN = 1;
  if (argv.url) process.env.EFFECTFUL_DEBUGGER_URL = argv.url;
  if (argv.srcRoot) process.env.EFFECTFUL_DEBUGGER_SRC_ROOT = argv.srcRoot;
  if (argv.port) process.env.EFFECTFUL_DEBUGGER_PORT = argv.port;
  if (argv.verbose) process.env.EFFECTFUL_DEBUGGER_VERBOSE = 1;
  if (argv.indexJs) process.env.EFFECTFUL_DEBUGGER_INDEX_JS = argv.indexJs;
  process.env.EFFECTFUL_DEBUGGER_INSTRUMENT = argv.instrument;
  process.env.EFFECTFUL_DEBUGGER_INSTRUMENT_DEPS = argv.instrumentDeps;
  if (argv.runtimePackages)
    process.env.EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES = argv.runtimePackages;
  process.env.EFFECTFUL_DEBUGGER_ZERO_CONFIG = argv.zeroConfig ? 1 : 0;
  if (argv.htmlTemplate)
    process.env.EFFECTFUL_DEBUGGER_HTML_TEMPLATE = argv.htmlTemplate;
  process.env.EFFECTFUL_DEBUGGER_INCLUDE = argv.include;
  process.env.EFFECTFUL_DEBUGGER_BLACKBOX = argv.blackbox;
  if (argv.exclude)
    process.env.EFFECTFUL_DEBUGGER_EXCLUDE = argv.exclude;
  process.env.EFFECTFUL_DEBUGGER_WEBPACK = 1;
  process.env.EFFECTFUL_DEBUGGER = 1;
  require("./server");
};
