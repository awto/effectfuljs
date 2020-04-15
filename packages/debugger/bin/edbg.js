#!/usr/bin/env node

const yargs = require("yargs")
require("yargs")
  .scriptName("edbg")
  .env("EFFECTFUL_DEBUGGER")
  .demandCommand()
  .option("cache", {
    describe: "Babel cache",
    default: true,
    type: "boolean"
  })
  .option("url", {
    describe: "a URL of a listening VSCode debugger",
    alias: "u",
    type: "string"
  })
  .option("runtime", {
    alias: "r",
    type: "string",
    default: "vscode"
  })
  .option("time-travel", {
    describe: "Compile with traveling trace",
    alias: ["t"],
    default: false,
    type: "boolean"
  })
  .option("time-travel-disabled", {
    describe: "Do not collect time traveling trace",
    default: false,
    type: "boolean"
  })
  .option("verbose", {
    describe: "Outputs additional debug information",
    default: false,
    type: "boolean"
  })
  .option("src-root", {
    type: "string",
    describe: "sources root folder location"
  })
  .option("runtime-packages", {
    type: "string",
    describe: "debugger's own packages root (for NODE_PATH)"
  })
  .option("zero-config", {
    alias: ["z", "zero_config"],
    describe: "Default babel plugins set for .ts/.js",
    default: true,
    type: "boolean"
  })
  .option("instrument", {
    describe: "Instrument sources before loading",
    default: true,
    type: "boolean"
  })
  .option("instrument-deps", {
    describe: "Instrument third-party sources in node_modules",
    default: true,
    type: "boolean"
  })
  .command(require("../config/node/command"))
  .command(require("../config/browser/command"))
  .help("help").argv;
