"use strict";

exports.__esModule = true;
var _exportNames = {
  exports: true,
  imports: true,
  chainM: true,
  Serialization: true
};
exports.Serialization = exports.chainM = exports.imports = exports.exports = void 0;

var S = require("@effectful/serialization");

var Kit = require("./kit.js");

Object.keys(Kit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = Kit[key];
});

var RT = require("./instr/rt.js");

Kit.regModule(Kit, "@effectful/debugger/kit");
S.regOpaqueObject(Kit.context.startThread, "@effectful/debugger/defaultStartThread");
Kit.regModule(RT, "@effectful/debugger/rt");
const _exports = RT.exports;
exports.exports = _exports;
const imports = RT.imports;
exports.imports = imports;
const chainM = RT.chainM;
exports.chainM = chainM;
const Serialization = S;
exports.Serialization = Serialization;
S.regOpaquePrim(Kit.metaDataSymbol, "@effectful/debugger/metaData");
S.regOpaquePrim(Kit.thunkSymbol, "@effectful/debugger/thunk");
S.regOpaqueObject(Symbol.for, "Symbol.for");
S.regOpaqueObject(Symbol.keyFor, "Symbol.keyFor");
S.regOpaquePrim(Symbol.iterator, "SymbolStatic.iterator");
S.regOpaquePrim(Symbol.asyncIterator, "SymbolStatic.asyncIterator");
S.regOpaquePrim(Symbol.toStringTag, "SymbolStatic.asyncIterator");