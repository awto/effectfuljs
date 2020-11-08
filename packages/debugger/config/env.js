/** assigning config parameters back to env variables, so they are propagated to children */
const path = require("path");

exports.fromArgv = function fromArgv(argv) {
  const env = {};
  if (argv.timeTravel) env.EFFECTFUL_DEBUGGER_TIME_TRAVEL = 1;
  if (argv.timeTravelDisabled) env.EFFECTFUL_DEBUGGER_TIME_TRAVEL_DISABLED = 1;
  if (argv.runtime) env.EFFECTFUL_DEBUGGER_RUNTIME = argv.runtime;
  if (argv.cache) env.EFFECTFUL_DEBUGGER_CACHE = 1;
  if (argv.open) env.EFFECTFUL_DEBUGGER_OPEN = 1;
  if (argv.url) env.EFFECTFUL_DEBUGGER_URL = argv.url;
  if (argv.srcRoot) env.EFFECTFUL_DEBUGGER_SRC_ROOT = argv.srcRoot;
  if (argv.port) env.EFFECTFUL_DEBUGGER_PORT = argv.port;
  if (argv.verbose) env.EFFECTFUL_DEBUGGER_VERBOSE = 1;
  if (argv.indexJs) env.EFFECTFUL_DEBUGGER_INDEX_JS = argv.indexJs;
  if (argv.instrument != null)
    env.EFFECTFUL_DEBUGGER_INSTRUMENT = argv.instrument;
  if (argv.instrumentDeps != null)
    env.EFFECTFUL_DEBUGGER_INSTRUMENT_DEPS = argv.instrumentDeps;
  if (argv.runtimePackages) {
    env.EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES = argv.runtimePackages;
    if (!argv.defaultNodePath)
      env.NODE_PATH = process.env.NODE_PATH
        ? `${argv.runtimePackages}${path.delimiter}${process.env.NODE_PATH}`
        : argv.runtimePackages;
  }
  env.EFFECTFUL_DEBUGGER_ZERO_CONFIG = argv.zeroConfig ? 1 : 0;
  if (argv.htmlTemplate)
    env.EFFECTFUL_DEBUGGER_HTML_TEMPLATE = argv.htmlTemplate;
  if (argv.include) env.EFFECTFUL_DEBUGGER_INCLUDE = argv.include;
  env.EFFECTFUL_DEBUGGER_BLACKBOX = argv.blackbox;
  if (argv.exclude) env.EFFECTFUL_DEBUGGER_EXCLUDE = argv.exclude;
  env.EFFECTFUL_DEBUGGER_PATCH_VM = !!argv.patchVm;
  env.EFFECTFUL_DEBUGGER = 1;
  env.NODE_ENV = process.env.NODE_ENV || "development";
  return env;
};
