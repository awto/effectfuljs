/** Monkey-patching JS runtime */

import config from "./config";
import * as Instr from "./instr/rt";
import { regOpaqueObject } from "@effectful/serialization";

const Ap = Array.prototype;
const Tp = Object.getPrototypeOf(Int8Array.prototype);
const Sp = Set.prototype;
const Mp = Map.prototype;

if (config.patchedPromise) {
  const Promise = (global.Promise = Instr.unwrapImport(
    config.timeTravel ? require("./deps/promise-t") : require("./deps/promise"),
    "promise"
  ));
  regOpaqueObject(Promise, "global#Promise");
  regOpaqueObject(Promise.prototype, "global#Promise#");
}

if (config.patchRT) {
  Tp.map = Ap.map = Instr.map;
  Tp.filter = Ap.filter = Instr.filter;
  Tp.find = Ap.find = Instr.find;
  Tp.findIndex = Ap.findIndex = Instr.findIndex;
  Tp.flatMap = Ap.flatMap = Instr.flatMap;
  Tp.forEach = Ap.forEach = Instr.forEach;
  Sp.forEach = Instr.setForEach;
  Mp.forEach = Instr.mapForEach;
  Tp.reduce = Ap.reduce = Instr.reduce;
  Tp.reduceRight = Ap.reduceRight = Instr.reduceRight;
  Tp.some = Ap.some = Instr.some;
  Tp.every = Ap.every = Instr.every;
}
