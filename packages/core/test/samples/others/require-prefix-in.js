const a = require("module-A");
const b = require(`${a}module-B`);
const c = require("node:url");
const d = import("module-D");
const f = import(`module-${d.name}`);
module.exports = b;
