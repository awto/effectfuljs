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
    describe: "Compile with traveling trace",
    alias: ["t"],
    default: false,
    type: "boolean"
  })
  .option("time-travel-disabled", {
    describe: "Do not collect time traveling trace, await an API call",
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
  .command(require("../config/node/command"))
  .command(require("../config/react/command"))
  .help("help").argv;
