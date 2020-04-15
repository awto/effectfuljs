const config = require("../config").default;
const fs = require("fs");
const path = require("path");
if (process.env.EFFECTFUL_DEBUGGER_URL)
  config.url = process.env.EFFECTFUL_DEBUGGER_URL;
config.timeTravel = isTrue(process.env.EFFECTFUL_DEBUGGER_TIME_TRAVEL);
config.timeTravelDisabled = isTrue(
  process.env.EFFECTFUL_DEBUGGER_TIME_TRAVEL_DISABLED
);

const { normalizeDrive } = require("../state");

config.srcRoot = normalizeDrive(
  fs.realpathSync(process.env.EFFECTFUL_DEBUGGER_SRC_ROOT || ".")
);

config.runtimePackages = normalizeDrive(
  fs.realpathSync(
    process.env.EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES ||
      path.join(__dirname, "..", "..")
  )
);

config.runtime = process.env.EFFECTFUL_DEBUGGER_RUNTIME || "vscode";
config.cache =
  isTrue(process.env.EFFECTFUL_DEBUGGER_CACHE) ||
  !isTrue(process.BABEL_DISABLE_CACHE);
config.zeroConfig = isTrue(process.env.EFFECTFUL_DEBUGGER_ZERO_CONFIG, true);
config.verbose = isNaN(process.env.EFFECTFUL_DEBUGGER_VERBOSE)
  ? isTrue(process.env.EFFECTFUL_DEBUGGER_VERBOSE)
    ? 1
    : 0
  : +process.env.EFFECTFUL_DEBUGGER_VERBOSE;

if (
  process.env.EFFECTFUL_DEBUGGER_PORT &&
  !isNaN(process.env.EFFECTFUL_DEBUGGER_PORT)
)
  config.port = +process.env.EFFECTFUL_DEBUGGER_PORT;
else if (process.env.PORT && !isNaN(process.env.PORT)) {
  process.env.EFFECTFUL_DEBUGGER_PORT = process.env.PORT;
  config.port = +process.env.PORT;
}
if (process.env.EFFECTFUL_DEBUGGER_HOST)
  config.host = process.env.EFFECTFUL_DEBUGGER_HOST;
else if (process.env.HOST) {
  process.env.EFFECTFUL_DEBUGGER_HOST = process.env.HOST;
  config.host = process.env.HOST;
} else config.host = "0.0.0.0";

if (config.verbose) console.log(`DEBUGGER: config  ${JSON.stringify(config)}`);

config.open = isTrue(process.env.EFFECTFUL_DEBUGGER_OPEN);

config.instrument = isTrue(process.env.EFFECTFUL_DEBUGGER_INSTRUMENT, true);

config.instrumentDeps = isTrue(
  process.env.EFFECTFUL_DEBUGGER_INSTRUMENT_DEPS,
  true
);

if (isTrue(process.env.EFFECTFUL_DEBUG_DEBUGGER)) config.debuggerDebug = true;

config.expEagerModuleExport = false;

module.exports = config;

function isTrue(str, defaultValue = false) {
  if (!str) return defaultValue;
  switch (str.toLowerCase()) {
    case "yes":
    case "y":
    case "1":
    case "t":
    case "true":
      return true;
    case "undefined":
    case "null":
    case "no":
    case "n":
    case "0":
    case "f":
    case "false":
      return false;
    default:
      throw new Error(`incorrect format for boolean: "${str}"`);
  }
}
