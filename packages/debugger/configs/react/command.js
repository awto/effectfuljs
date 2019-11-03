const defaults = require("../../config");

exports.command = "react";

exports.describe = "starts a configured webpack-dev-server";

exports.builder = function(yargs) {
  yargs
    .strict()
    .option("port", {
      describe: "dev-server listening port",
      alias: "p",
      default: defaults.port,
      type: "number"
    })
    .option("index-js", {
      alias: ["j"],
      type: "string",
      describe: "index.js file"
    })
    .option("html-template", {
      type: "string",
      describe: "webpack HTML template file"
    })
    .option("open", {
      describe: "open the URL",
      default: false,
      boolean: true
    });
};

exports.handler = function(argv) {
  const env = {};
  if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
  if (argv.timeTravel) process.env.EFFECTFUL_DEBUGGER_TIME_TRAVEL = 1;
  if (argv.backend) process.env.EFFECTFUL_DEBUGGER_BACKEND = argv.backend;
  if (argv.cache) process.env.EFFECTFUL_DEBUGGER_CACHE = 1;
  if (argv.open) process.env.EFFECTFUL_DEBUGGER_OPEN = 1;
  if (argv.url) process.env.EFFECTFUL_DEBUGGER_URL = argv.url;
  if (argv.srcRoot) process.env.EFFECTFUL_DEBUGGER_SRC_ROOT = argv.srcRoot;
  if (argv.port) process.env.EFFECTFUL_DEBUGGER_PORT = argv.port;
  if (argv.verbose) process.env.EFFECTFUL_DEBUGGER_VERBOSE = 1;
  if (argv.indexJs) process.env.EFFECTFUL_INDEX_JS = argv.indexJs;
  if (argv.htmlTemplate)
    process.env.EFFECTFUL_HTML_TEMPLATE = argv.htmlTemplate;
  process.env.EFFECTFUL_DEBUGGER_WEBPACK = 1;
  process.env.EFFECTFUL_DEBUGGER = 1;
  require("./server");
};
