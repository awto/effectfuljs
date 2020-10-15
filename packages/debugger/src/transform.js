const config = require("@effectful/core/v2/config").default;
const transform = require("@effectful/core/v2/presets/debugger").default;
const path = require("path");

let VERBOSE =
  process.env.EFFECTFUL_DEBUGGER_VERBOSE || process.env.EFFECTFUL_VERBOSE;

if (VERBOSE) {
  VERBOSE = VERBOSE[0].toLowerCase() === "t" || (!isNaN(VERBOSE) && +VERBOSE);
} else VERBOSE = false;

const progressPrefix = process.env.EFFECTFUL_PROGRESS_ID;
let progressUpdate = function() {};
if (progressPrefix) {
  progressUpdate = function fn() {
    if (config.filename)
      console.log(
        `${progressPrefix}:${config.blackbox ? "% " : ""}${path.relative(
          config.srcRoot,
          config.filename
        )}`
      );
  };
}

const plugin = require("@effectful/core/v2/compiler").babelPlugin(function(
  ast
) {
  if (typeof config.exclude === "function" && config.exclude(config.filename))
    return;
  if (config.preInstrumentedLibs) {
    const root =
      config.preInstrumentedLibs && config.preInstrumentedLibs.substr
        ? config.preInstrumentedLibs
        : `@effectful/debugger/deps${config.timeTravel ? "-t" : "-n"}`;
    const moduleAliases = {};
    for (const [src, dst] of Object.entries(require("./deps-aliases.json")))
      moduleAliases[src] = path.join(root, dst);
    config.moduleAliases = Object.assign(moduleAliases, config.moduleAliases);
  }
  if (typeof config.blackbox === "function")
    config.blackbox = config.blackbox(config.filename);
  if (VERBOSE) {
    console.log(
      `Instrumenting ${config.filename} ${
        config.blackbox ? "BLACKBOX" : ""
      }...${config.deb_src} ${config.caller}`
    );
    console.time(`Instrumented ${config.filename}`);
  }
  progressUpdate();
  try {
    transform(ast);
  } catch (e) {
    console.log("ERR", e);
    throw e;
  }
  if (VERBOSE) {
    console.timeEnd(`Instrumented ${config.filename}`);
  }
});

module.exports = plugin;
