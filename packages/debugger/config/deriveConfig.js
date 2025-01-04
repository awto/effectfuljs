const config = require("../config").default;
const fs = require("fs");
const path = require("path");
const { minimatch: mm } = require("minimatch");
if (process.env.EFFECTFUL_DEBUGGER_URL)
  config.url = process.env.EFFECTFUL_DEBUGGER_URL;
config.timeTravel = isTrue(process.env.EFFECTFUL_DEBUGGER_TIME_TRAVEL, true);
config.timeTravelDisabled = isTrue(
  process.env.EFFECTFUL_DEBUGGER_TIME_TRAVEL_DISABLED,
);

const moduleAliases = process.env.EFFECTFUL_MODULE_ALIASES;

if (moduleAliases != null) {
  try {
    config.moduleAliases = JSON.parse(moduleAliases);
  } catch (e) {
    console.error(`couldn't parse module aliases, ignoring them (${e})`);
  }
}

const { normalizePath } = require("../state");

config.srcRoot = fs.realpathSync(
  process.env.EFFECTFUL_DEBUGGER_SRC_ROOT || ".",
);

function findup(name, dir) {
  const dirs = path.resolve(dir).split(path.sep);
  while (dirs.length) {
    const fp = [...dirs, name].join(path.sep);
    try {
      fs.accessSync(fp);
      return fp;
    } catch (e) {}
    dirs.pop();
  }
  return null;
}

let packageJSON = findup("package.json", config.srcRoot);
if (packageJSON) packageJSON = fs.realpathSync(packageJSON);

config.packageRoot = packageJSON ? path.dirname(packageJSON) : config.srcRoot;

config.runtimePackages =
  process.env.EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES &&
  process.env.EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES.length &&
  normalizePath(
    fs.realpathSync(process.env.EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES),
  );

config.runtime =
  process.env.EFFECTFUL_DEBUGGER_RUNTIME || "@effectful/debugger";
config.cache =
  isTrue(process.env.EFFECTFUL_DEBUGGER_CACHE, true) &&
  !isTrue(process.env.BABEL_DISABLE_CACHE);
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
  true,
);

//TODO: retor back to mm.matchRe after(if) it is fixed
const BLACKBOX =
  process.env.EFFECTFUL_DEBUGGER_BLACKBOX || "**/node_modules/**/*.?(m)js";

config.blackbox = {
  test(filename) {
    return mm(filename, BLACKBOX, { dot: true });
  },
};

const EXCLUDE = process.env.EFFECTFUL_DEBUGGER_EXCLUDE;
config.exclude = process.env.EFFECTFUL_DEBUGGER_EXCLUDE
  ? {
      test(filename) {
        return mm(filename, EXCLUDE, { dot: true });
      },
    }
  : null;

const INCLUDE = process.env.EFFECTFUL_DEBUGGER_INCLUDE || "**/*.?([mc])[jte]s?(x)";

config.include = {
  test(filename) {
    return mm(filename, INCLUDE, { dot: true });
  },
};

if (isTrue(process.env.EFFECTFUL_DEBUG_DEBUGGER)) {
  config.debuggerDebug = true;
  Error.stackTraceLimit = Infinity;
}

config.expEagerModuleExport = false;

config.patchVM = isTrue(process.env.EFFECTFUL_DEBUGGER_PATCH_VM, true);

config.reactFastRefresh = isTrue(
  process.env.EFFECTFUL_DEBUGGER_REACT_FAST_REFRESH,
  true,
);

config.loaderPrefix = process.env.EFFECTFUL_DEBUGGER_LOADER_PREFIX || null;

if (isTrue(config.loaderPrefix, false, true))
  config.loaderPrefix = "@effectful/debugger/loader!";

config.loaderPostfix = process.env.EFFECTFUL_DEBUGGER_LOADER_POSTFIX || null;

if (isTrue(config.loaderPostfix, false, true)) config.loaderPostfix = ".edbg";

module.exports = config;

function isTrue(str, defaultValue = false, optional = false) {
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
      if (optional) return defaultValue;
      throw new Error(`incorrect format for boolean: "${str}"`);
  }
}
