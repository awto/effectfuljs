#!/usr/bin/env node

const yargs = require("yargs")
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
  .option("backend", {
    alias: "b",
    type: "string",
    default: "vscode",
    choices: ["vscode", "vscodeReact", "standalone", "standaloneTrace"]
  })
  .option("time-travel", {
    describe: "Enable time traveling trace",
    alias: ["t", "time_travel"],
    default: false,
    type: "boolean"
  })
  .option("verbose", {
    describe: "Outputs additional debug information",
    default: false,
    type: "boolean"
  })
  .option("src-root", {
    alias: ["r"],
    type: "string",
    describe: "sources root folder location"
  })
  .option("extension-root", {
    type: "string",
    describe: "VSCode extension's root folder"
  })
  .command(require("../configs/node/command"))
  .command(require("../configs/react/command"))
  .help("help").argv;
