/**
 * pre-instrumenting third party libraries
 */

const path = require("path");
const fs = require("fs");
const babel = require("@babel/core");
const config = require("./config").default;

const libs = require("./deps.json");

if (!fs.existsSync("./deps")) fs.mkdirSync("./deps");

const configs = { "": { timeTravel: false }, "-t": { timeTravel: true } };

for (const [l, p] of Object.entries(libs)) {
  const dirIndex = p.lastIndexOf("/");
  let moduleAliases;
  if (dirIndex > 0) moduleAliases = { ["."]: p.substr(0, dirIndex) };
  for (const [suffix, copts] of Object.entries(configs)) {
    const libOpts = {
      plugins: [
        [
          "./transform",
          {
            blackbox: true,
            preInstrumentedLibs: "..",
            rt: "../api",
            expInject: 1,
            moduleAliases,
            expNoCallWraps: config.expNoCallWraps,
            ...copts
          }
        ]
      ],
      compact: false
    };
    fs.writeFileSync(
      path.join("./deps", `${l.replace(/\//g, "-")}${suffix}.js`),
      babel.transformFileSync(path.join("./node_modules", p), libOpts).code
    );
  }
}
