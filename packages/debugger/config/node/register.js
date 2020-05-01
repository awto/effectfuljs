const Function = global.Function;
const config = require("../defaults");
const path = require("path");
const fs = require("fs");
const Persist = require("../../persist");
// require("./vm");

const babel = require("@babel/core");

const compile = require("./compile");

const Module = module.constructor;

const Mp = Module.prototype;

const savedCompile = Mp._compile;

const builtIn = Module.builtinModules.filter(i => {
  switch (i) {
    case "sys":
      return false;
  }
  if (/^(?:v8|node-inspect)\//g.test(i)) return false;
  return true;
});

for (const i of builtIn) {
  Persist.regModule(require(i), `node#{i}`);
}

Mp._compile = function _compile(content, filename) {
  const code = compile(content, filename, this);
  if (!code) return savedCompile.call(this, content, filename);
  require("./vm");
  return savedCompile.call(this, code, filename);
};
