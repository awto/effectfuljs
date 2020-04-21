#!/usr/bin/env node

const yargs = require("yargs");
require("yargs")
  .scriptName("edbg")
  .env("EFFECTFUL_DEBUGGER")
  .demandCommand()
  .option("cache", {
    describe: "babel cache",
    default: true,
    type: "boolean",
  })
  .option("url", {
    describe: "a URL of a listening VSCode debugger",
    alias: "u",
    type: "string",
  })
  .option("runtime", {
    alias: "r",
    type: "string",
  })
  .option("time-travel", {
    describe: "compile with traveling trace",
    alias: ["t"],
    default: false,
    type: "boolean",
  })
  .option("time-travel-disabled", {
    describe: "do not collect time traveling trace",
    default: false,
    type: "boolean",
  })
  .option("verbose", {
    describe: "outputs additional debug information",
    default: 0,
    type: "number",
  })
  .option("src-root", {
    type: "string",
    describe: "sources root folder location",
  })
  .option("runtime-packages", {
    type: "string",
    describe: "debugger's own packages root (for NODE_PATH)",
  })
  .option("zero-config", {
    alias: ["z", "zero_config"],
    describe: "default babel plugins set for .ts/.js",
    default: true,
    type: "boolean",
  })
  .option("include", {
    describe: "glob for files to instrument",
    type: "string",
    default: "**/*.[jte]s?(x)"
  })
  .option("blackbox", {
    describe: "glob for files to instrument as a blackbox",
    type: "string",
    default: "**/node_modules/**/*.?(m)js"
  })
  .option("exclude", {
    describe: "glob for files to not instrument at all",
    type: "string"
  })
  .option("instrument", {
    describe: "instrument sources before loading",
    default: true,
    type: "boolean",
  })
  .option("instrument-deps", {
    describe: "instrument third-party sources in node_modules",
    default: true,
    type: "boolean",
  })
  .command(require("../config/node/command"))
  .command(require("../config/browser/command"))
  .help("help").argv;
