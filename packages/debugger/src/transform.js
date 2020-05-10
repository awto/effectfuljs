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
  if (config.preInstrumentedLibs) {
    const root = config.preInstrumentedLibs.substr
      ? config.preInstrumentedLibs
      : "@effectful/debugger";
    const moduleAliases = {};
    for (const i in require("./deps.json")) {
      const suffix = config.timeTravel ? "-t" : "";
      const path = `${root}/deps/${i.replace(/\//g, "-")}${suffix}`;
      moduleAliases[i] = path;
      if (i.includes("/")) moduleAliases[`${i}.js`] = path;
    }
    config.moduleAliases = Object.assign(moduleAliases, config.moduleAliases);
  }
  if (VERBOSE)
    console.log(
      `TRANSFORMING:${config.filename} ${config.blackbox ? "BLACKBOX" : ""}`
    );
  progressUpdate();
  transform(ast);
});

module.exports = plugin;
