"use strict";

exports.__esModule = true;
var _exportNames = {
  exports: true
};
exports.exports = void 0;

var S = require("@effectful/serialization");

var Kit = require("./kit.js");

Object.keys(Kit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = Kit[key];
});

var RT = require("./instr/rt.js");

for (const i in Kit) {
  const v = Kit[i];
  if (typeof v === "object" || typeof v === "function") S.regOpaqueObject(v, `@effectful/debugger/kit/${i}`);
}

S.regOpaqueObject(Kit.context.startThread, "@effectful/debugger/defaultStartThread");

for (const i in RT) {
  const v = RT[i];
  if (typeof v === "object" || typeof v === "function") S.regOpaqueObject(v, `@effectful/debugger/rt/${i}`);
}

const _exports = RT.exports;
exports.exports = _exports;
S.regOpaquePrim(Kit.metaDataSymbol, "@effectful/debugger/metaData");
S.regOpaquePrim(Kit.thunkSymbol, "@effectful/debugger/thunk");