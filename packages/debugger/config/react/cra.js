const { normalizeDrive, isWindows } = require("../../state");

const path = require("path");
const fs = require("fs");
const defaults = require("../defaults");
let paths;
let modules;
let getClientEnvironment;

try {
  paths = require("react-scripts/config/paths");
  modules = require("react-scripts/config/modules");
  getClientEnvironment = require("react-scripts/config/env");
} catch (e) {
  // we cannot use react-scripts here, no problems
  paths = {
    appPath: fs.realpathSync(process.cwd())
  };
  modules = {};
  getClientEnvironment = function() {
    return {
      raw: {},
      stringified: {}
    };
  };
}

if (process.env.EFFECTFUL_DEBUGGER_HTML_TEMPLATE)
  paths.appHtml = path.resolve(
    paths.appPath,
    process.env.EFFECTFUL_DEBUGGER_HTML_TEMPLATE
  );

if (process.env.EFFECTFUL_DEBUGGER_INDEX_JS)
  paths.appIndexJs = path.resolve(
    paths.appPath,
    process.env.EFFECTFUL_DEBUGGER_INDEX_JS
  );

if (process.env.EFFECTFUL_DEBUGGER_ADDITIONAL_MODULES)
  (modules.additionalModulePaths || (modules.additionalModulePaths = [])).push(
    process.env.EFFECTFUL_DEBUGGER_ADDITIONAL_MODULES
  );

if (!paths.appIndexJs)
  paths.appIndexJs = path.resolve(paths.appPath, "index.js");

if (!paths.appNodeModules)
  paths.appNodeModules = path.resolve(paths.appPath, "node_modules");

if (!paths.moduleFileExtensions)
  paths.moduleFileExtensions = [
    "web.mjs",
    "mjs",
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx"
  ];

if (!paths.appSrc || !!fs.existsSync(paths.appSrc))
  paths.appSrc = defaults.srcRoot;

if (!path.appPublic) path.appPublic = process.cwd();

if (isWindows) {
  paths.appSrc = normalizeDrive(paths.appSrc);
  paths.appPath = normalizeDrive(paths.appPath);
  paths.appIndexJs = normalizeDrive(paths.appIndexJs);
  paths.appPublic = normalizeDrive(paths.appPublic);
}

if (!fs.existsSync(paths.appHtml)) paths.appHtml = null;

module.exports = { paths, modules, getClientEnvironment };
