/** Monkey-patching JS runtime */

import config from "./config";
import * as Instr from "./instr/rt";
import { wrap } from "./engine";

const Ap = Array.prototype;
const Tp = Object.getPrototypeOf(Int8Array.prototype);
const Sp = Set.prototype;
const Mp = Map.prototype;

export const wrapResult: (
  fun: (...args: any[]) => any
) => (...args: any[]) => any = config.wrapRTResults
  ? function(fun) {
      return function(this: any) {
        return wrap(fun.apply(this, <any>arguments));
      };
    }
  : function(fun) {
      return fun;
    };

if (config.patchRT) {
  Tp.map = Ap.map = wrapResult(Instr.map);
  Tp.filter = Ap.filter = wrapResult(Instr.filter);
  Tp.find = Ap.find = Instr.find;
  Tp.findIndex = Ap.findIndex = Instr.findIndex;
  Tp.flatMap = Ap.flatMap = wrapResult(Instr.flatMap);
  Tp.forEach = Ap.forEach = Instr.forEach;
  Sp.forEach = Instr.setForEach;
  Mp.forEach = Instr.mapForEach;
  Tp.reduce = Ap.reduce = Instr.reduce;
  Tp.reduceRight = Ap.reduceRight = Instr.reduceRight;
  Ap.sort = Instr.arraySort;
  Tp.sort = Instr.typedArraySort;
  Tp.some = Ap.some = Instr.some;
  Tp.every = Ap.every = Instr.every;
  Array.of = wrapResult(Array.of);
  Array.from = wrapResult(Array.from);
  Ap.flat = wrapResult(Ap.flat);
  Ap.reverse = wrapResult(Ap.reverse);
  Ap.splice = wrapResult(Ap.splice);
  Ap.slice = wrapResult(Ap.slice);
  Int8Array.of = wrapResult(Int8Array.of);
  Int8Array.from = wrapResult(Int8Array.from);
  Uint8Array.of = wrapResult(Uint8Array.of);
  Uint8Array.from = wrapResult(Uint8Array.from);
  Int16Array.of = wrapResult(Int16Array.of);
  Int16Array.from = wrapResult(Int16Array.from);
  Uint16Array.of = wrapResult(Uint16Array.of);
  Uint16Array.from = wrapResult(Uint16Array.from);
  Int32Array.of = wrapResult(Int32Array.of);
  Int32Array.from = wrapResult(Int32Array.from);
  Uint32Array.of = wrapResult(Uint32Array.of);
  Uint32Array.from = wrapResult(Uint32Array.from);
  Float32Array.of = wrapResult(Float32Array.of);
  Float32Array.from = wrapResult(Float32Array.from);
  Float64Array.of = wrapResult(Float64Array.of);
  Float64Array.from = wrapResult(Float64Array.from);
  BigInt64Array.of = wrapResult(BigInt64Array.of);
  BigInt64Array.from = wrapResult(BigInt64Array.from);
  BigUint64Array.of = wrapResult(BigUint64Array.of);
  BigUint64Array.from = wrapResult(BigUint64Array.from);
  Tp.flat = wrapResult(Tp.flat);
  Tp.reverse = wrapResult(Tp.reverse);
  Tp.splice = wrapResult(Tp.splice);
  Tp.slice = wrapResult(Tp.slice);
}
