const config = require("@effectful/core/v2/config").default;
const transform = require("@effectful/core/v2/presets/debugger").default;
const path = require("path");
const debuggerConfig = require("./config").default;

let VERBOSE =
  process.env.EFFECTFUL_DEBUGGER_VERBOSE || process.env.EFFECTFUL_VERBOSE;

if (VERBOSE) {
  VERBOSE = VERBOSE[0].toLowerCase() === "t" || (!isNaN(VERBOSE) && +VERBOSE);
} else VERBOSE = false;

const enableProgress = process.env.EFFECTFUL_ENABLE_PROGRESS

const progressPrefix = process.env.EFFECTFUL_PROGRESS_ID;
let progressUpdate = function() {};
let progressClear = function() {};
if (enableProgress && progressPrefix) {
  progressUpdate = function fn() {
    if (config.filename)
      console.log(
        `${progressPrefix}|${config.blackbox ? "% " : ""}${path.relative(
          config.srcRoot,
          config.filename
        )}`
      );
  };
  progressClear = function fn() {
    if (config.filename)
      console.log(progressPrefix)
  }
}

const plugin = require("@effectful/core/v2/compiler").babelPlugin(function(
  ast
) {
  if (typeof config.exclude === "function" && config.exclude(config.filename))
    return;
  if (/@effectful[/\\]debugger|[/\\]effectful-dev[/\\]/.test(config.filename))
    return;
  if (config.preInstrumentedLibs) {
    const root =
      config.preInstrumentedLibs && config.preInstrumentedLibs.substr
        ? config.preInstrumentedLibs
        : `${config.rt || "@effectful/debugger"}/deps${config.timeTravel ? "-t" : "-n"}`;
    const moduleAliases = {};
    for (const [src, dst] of Object.entries(require("./deps-aliases.json")))
      moduleAliases[src] = path.join(root, dst);
    config.moduleAliases = Object.assign(moduleAliases, config.moduleAliases);
  }
  if (typeof config.blackbox === "function")
    config.blackbox = config.blackbox(config.filename);
  if (VERBOSE) {
    console.log(
      `Instrumenting ${config.filename} ${config.blackbox ? "BLACKBOX" : ""}...`
    );
    console.time(`Instrumented ${config.filename}`);
  }
  progressUpdate();
  try {
    config.inDebugger = true;
    if (!config.loaderPrefix) config.loaderPrefix = debuggerConfig.loaderPrefix;
    if (!config.loaderPostfix) config.loaderPostfix = debuggerConfig.loaderPostfix;
    transform(ast);
  } finally {
    config.inDebugger = false;
    progressClear();
  }
  if (VERBOSE) {
    console.timeEnd(`Instrumented ${config.filename}`);
  }
});

module.exports = plugin;
