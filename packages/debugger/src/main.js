import * as S from "@effectful/serialization";
import * as Kit from "./kit.js";
for (const i in Kit) {
  const v = Kit[i];
  if (typeof v === "object" || typeof v === "function")
    S.regOpaqueObject(v, `@effectful/debugger/kit/${i}`);
}
S.regOpaqueObject(
  Kit.context.startThread,
  "@effectful/debugger/defaultStartThread"
);
export * from "./kit.js";
import * as RT from "./instr/rt.js";
for (const i in RT) {
  const v = RT[i];
  if (typeof v === "object" || typeof v === "function")
    S.regOpaqueObject(v, `@effectful/debugger/rt/${i}`);
}
export const exports = RT.exports;

S.regOpaquePrim(Kit.metaDataSymbol, "@effectful/debugger/metaData");
S.regOpaquePrim(Kit.thunkSymbol, "@effectful/debugger/thunk");
