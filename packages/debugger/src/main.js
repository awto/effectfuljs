import * as S from "@effectful/serialization";
import * as Kit from "./kit.js";
Kit.regModule(Kit, "@effectful/debugger/kit");
S.regOpaqueObject(
  Kit.context.startThread,
  "@effectful/debugger/defaultStartThread"
);
export * from "./kit.js";
import * as RT from "./instr/rt.js";
Kit.regModule(RT, "@effectful/debugger/rt");
export const exports = RT.exports;
export const imports = RT.imports;
export const chainM = RT.chainM;
export const Serialization = S;
S.regOpaquePrim(Kit.metaDataSymbol, "@effectful/debugger/metaData");
S.regOpaquePrim(Kit.thunkSymbol, "@effectful/debugger/thunk");
S.regOpaqueObject(Symbol.for, "Symbol.for");
S.regOpaqueObject(Symbol.keyFor, "Symbol.keyFor");
S.regOpaquePrim(Symbol.iterator, "SymbolStatic.iterator");
S.regOpaquePrim(Symbol.asyncIterator, "SymbolStatic.asyncIterator");
S.regOpaquePrim(Symbol.toStringTag, "SymbolStatic.asyncIterator");
