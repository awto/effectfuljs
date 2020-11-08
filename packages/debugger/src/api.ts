import config from "./config";

if (config.globalNS && (<any>global)[config.globalNS]) {
  module.exports = (<any>global)[config.globalNS];
} else {
  const {
    native: {
      Object: { assign }
    }
  } = require("./state");
  const ApiMin = require("./apiMin");
  const Generator = require("./generator");
  const AsyncGenerator = require("./asyncGenerator");
  const { moduleExports } = require("./modules");
  const { forInIterator } = require("./timeTravel/main");
  const { dynImport } = require("./instr/rt");
  const {
    del,
    set,
    has,
    get,
    gset,
    gdel,
    lset,
    ldel,
    mcall
  } = require("./timeTravel/objects");
  assign(module.exports, ApiMin, Generator, AsyncGenerator, {
    moduleExports,
    forInIterator,
    del,
    set,
    has,
    get,
    gset,
    gdel,
    lset,
    ldel,
    mcall,
    dynImport
  });
  if (config.globalNS) (<any>global)[config.globalNS] = module.exports;
}
