import { context } from "./state";
import * as S from "@effectful/serialization";

let extra = new Set();
/**
 * Returns `JSON.stringify` serializable object with the whole
 * current execution state
 */
export function capture(): S.JSONObject {
  return S.write({
    top: context.top,
    syncStack: context.syncStack,
    asyncQueue: context.asyncQueue,
    debug: context.debug,
    brk: context.brk,
    extra
  });
}

/**
 * Restores execution state from an object previously returned by
 * `capture` the current state is discarded
 */
export function restore(json: S.JSONObject) {
  ({
    top: context.top,
    syncStack: context.syncStack,
    asyncQueue: context.asyncQueue,
    debug: context.debug,
    brk: context.brk,
    extra
  } = S.read(json));
}

/** any required additional values to store (e.g. DOM nodes) */
export function extraState() {
  return extra;
}

/** `Serialization.regOpaqueDeep` for module exports */
export function regModule(exp: any, name: string) {
  S.regOpaqueRec(exp, `${name || "?"}#exports`);
}

S.regAutoOpaqueConstr(Function);

if (typeof MessagePort !== "undefined") {
  S.regAutoOpaqueConstr(MessagePort);
  S.regAutoOpaqueConstr(MessageChannel);
}
