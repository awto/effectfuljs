import * as S from "@effectful/serialization";
import * as Persist from "./persist";
import * as Engine from "./engine";
import * as State from "./state";
import * as RT from "./rt";
import * as Trace from "./trace/main";
import * as TraceCore from "./trace/core";
import * as TraceDom from "./trace/dom";
import * as TraceES from "./trace/es";
(<any>TraceCore.TraceData.prototype)[S.descriptorSymbol] =
  S.NotSerializableDescriptor;
Persist.regModule(Engine, "@effectful/debugger/engine");
Persist.regModule(State, "@effectful/debugger/state");
Persist.regModule(Persist, "@effectful/debugger/persist");
Persist.regModule(Trace, "@effectful/debugger/trace/main");
Persist.regModule(TraceCore, "@effectful/debugger/trace/core");
Persist.regModule(TraceDom, "@effectful/debugger/trace/dom");
Persist.regModule(TraceES, "@effectful/debugger/trace/es");

for (const i of Object.values(RT)) {
  const meta = i && (<any>i)[State.metaDataSymbol];
  if (meta) meta.canSkip = true;
}
export { S as Serialization };
S.regOpaquePrim(State.metaDataSymbol, "@effectful/debugger/metaData");
S.regOpaquePrim(State.thunkSymbol, "@effectful/debugger/thunk");
S.regOpaqueObject(Symbol.for, "Symbol.for");
S.regOpaqueObject(Symbol.keyFor, "Symbol.keyFor");
S.regOpaquePrim(Symbol.iterator, "SymbolStatic.iterator");
S.regOpaquePrim(Symbol.asyncIterator, "SymbolStatic.asyncIterator");
S.regOpaquePrim(Symbol.toStringTag, "SymbolStatic.asyncIterator");

export { wrapExport, unwrapImport } from "./instr/rt";
export { step, region, runSync, threads, wrap } from "./engine";
export * from "./state";

export { Trace, Persist, Engine, RT };
