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
      {
        blackbox: true,
        preInstrumentedLibs: "..",
        importRT: "../api",
        expInject: 0,
        expInline: false
      }
    ]
  ],
  compact: false
};

const libs = require("./deps.json");

if (!fs.existsSync("./deps")) fs.mkdirSync("./deps");

for (const [l, p] of Object.entries(libs)) {
  fs.writeFileSync(
    path.join("./deps", `${l.replace("/", "-")}.js`),
    babel.transformFileSync(path.join("./node_modules", p), opts).code
  );
}
