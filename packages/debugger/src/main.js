import * as S from "@effectful/serialization";
import * as Kit from "./kit.js";
Kit.regModule(Kit, "@effectful/debugger/kit");
export * from "./kit.js";
export * from "./trace.js";
import * as RT from "./instr/rt.js";
import * as Trace from "./trace.js";
Trace.TraceData.prototype[S.descriptorSymbol] = S.NotSerializableDescriptor;
Kit.regModule(RT, "@effectful/debugger/rt");
Kit.regModule(Trace, "@effectful/debugger/trace");
for (const i of Object.values(RT)) {
  const meta = i && i[Kit.metaDataSymbol];
  if (meta) meta.canSkip = true;
}
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
