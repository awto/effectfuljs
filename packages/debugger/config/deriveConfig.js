const config = require("../config").default;
const fs = require("fs");
const path = require("path");
const mm = require("minimatch");
if (process.env.EFFECTFUL_DEBUGGER_URL)
  config.url = process.env.EFFECTFUL_DEBUGGER_URL;
config.timeTravel = isTrue(process.env.EFFECTFUL_DEBUGGER_TIME_TRAVEL);
config.timeTravelDisabled = isTrue(
  process.env.EFFECTFUL_DEBUGGER_TIME_TRAVEL_DISABLED
);

const { normalizePath } = require("../state");

config.srcRoot = fs.realpathSync(
  process.env.EFFECTFUL_DEBUGGER_SRC_ROOT || "."
);

const packageJSON = fs.realpathSync(
  require("find-up").sync("package.json", { cwd: config.srcRoot })
);

config.packageRoot = packageJSON ? path.dirname(packageJSON) : config.srcRoot;

config.runtimePackages =
  process.env.EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES &&
  process.env.EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES.length &&
  normalizePath(
    fs.realpathSync(process.env.EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES)
  );

config.runtime =
  process.env.EFFECTFUL_DEBUGGER_RUNTIME || "@effectful/debugger";
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

config.blackbox = mm.makeRe(
  process.env.EFFECTFUL_DEBUGGER_BLACKBOX || "**/node_modules/**/*.?(m)js"
);
config.include = mm.makeRe(
  process.env.EFFECTFUL_DEBUGGER_INCLUDE || "**/*.[jte]s?(x)"
);
config.exclude = process.env.EFFECTFUL_DEBUGGER_EXCLUDE
  ? mm.makeRe(process.env.EFFECTFUL_DEBUGGER_EXCLUDE)
  : null;

if (isTrue(process.env.EFFECTFUL_DEBUG_DEBUGGER)) {
  config.debuggerDebug = true;
  Error.stackTraceLimit = Infinity;
}

config.expEagerModuleExport = false;

config.patchVM = isTrue(process.env.EFFECTFUL_DEBUGGER_PATCH_VM, true);

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
