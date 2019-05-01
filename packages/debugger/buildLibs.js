/**
 * pre-instrumenting third party libraries
 */

const path = require("path");
const fs = require("fs");
const babel = require("@babel/core");

const opts = {
  plugins: [
    [
      "./transform",
      { blackbox: true, preInstrumentedLibs: "..", importRT: "../main" }
    ]
  ],
  compact: false
};

const libs = require("./libs.json");

if (!fs.existsSync("./libs")) fs.mkdirSync("./libs");

for (const [l, p] of Object.entries(libs)) {
  fs.writeFileSync(
    path.join("./libs", `${l.replace("/", "-")}.js`),
    babel.transformFileSync(path.join("./node_modules", p), opts).code
  );
}
