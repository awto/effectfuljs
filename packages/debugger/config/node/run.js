const path = require("path");
const fs = require("fs");
const sw = require("spawn-wrap");
const foreground = require("foreground-child");

const config = require("../deriveConfig");
const wrapper = require.resolve("./wrap");

const command = process.argv.slice(2);

if (!command.length) {
  console.error("nothing to run");
  process.exit(-1);
}

const extraPath = path.join(config.packageRoot, "node_modules", ".bin");

if (fs.existsSync(extraPath))
  process.env.PATH = process.env.PATH + path.delimiter + extraPath;

sw([wrapper] /*, process.env*/);
process.exitCode = 0;

if (/\.[jte]sx?$/.test(command[0])) command.unshift("node");

foreground(command[0], command.slice(1));
