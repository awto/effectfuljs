import * as S from "@effectful/serialization";
import * as Persist from "./persist";
import * as Engine from "./engine";
import * as Async from "./async";
import * as State from "./state";
import * as RT from "./rt";
import * as Instr from "./instr/rt";
import * as Modules from "./modules";
import * as Api from "./api";
import * as ApiMin from "./apiMin";

import * as TimeTravel from "./timeTravel/main";
import * as TimeTravelCore from "./timeTravel/core";
import * as TimeTravelDom from "./timeTravel/dom";

// Persist.regModule(S, "@effectful/serialization");
Persist.regModule(RT, "@effectful/debugger/rt");
Persist.regModule(Instr, "@effectful/debugger/instr/rt");
Persist.regModule(Engine, "@effectful/debugger/engine");
Persist.regModule(Modules, "@effectful/debugger/modules");
Persist.regModule(State, "@effectful/debugger/state");
Persist.regModule(Persist, "@effectful/debugger/persist");
Persist.regModule(Async, "@effectful/debugger/async");
Persist.regModule(TimeTravel, "@effectful/debugger/trace/main");
Persist.regModule(TimeTravelCore, "@effectful/debugger/timeTravel/core");
Persist.regModule(TimeTravelDom, "@effectful/debugger/timeTravel/dom");
Persist.regModule(Api, "@effectful/debugger/api");
Persist.regModule(ApiMin, "@effectful/debugger/apiMin");
for (const i of Object.values(RT)) {
  const meta = i && (<any>i)[State.dataSymbol];
  if (meta) meta.canSkip = true;
}
export { S as Serialization };
S.regOpaquePrim(State.dataSymbol, "@effectful/debugger/data");
S.regOpaquePrim(State.thunkSymbol, "@effectful/debugger/thunk");
S.regOpaqueObject(Symbol.for, "Symbol.for");
S.regOpaqueObject(Symbol.keyFor, "Symbol.keyFor");
S.regOpaquePrim(Symbol.iterator, "SymbolStatic.iterator");
S.regOpaquePrim(Symbol.asyncIterator, "SymbolStatic.asyncIterator");
S.regOpaquePrim(Symbol.toStringTag, "SymbolStatic.asyncIterator");
S.regOpaqueObject(
  State.context.needsBreak,
  "@effectful/debugger/default$needsBreak"
);

S.regOpaqueObject(Object);

export { step, liftSync, set, del } from "./engine";
export * from "./state";
export * from "./modules";

export { TimeTravel, Persist, Engine, RT };
