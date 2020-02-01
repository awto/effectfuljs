import { context } from "./state";
import * as S from "@effectful/serialization";
import config from "./config";

let extra = new Set();

function nop() {}

export const regOpaqueRec = config.persistState ? S.regOpaqueRec : nop;
export const regAutoOpaqueConstr = config.persistState
  ? S.regAutoOpaqueConstr
  : nop;

const noProps = { props: false, propsSnapshot: false };

export const regOpaqueObject = config.persistState
  ? function(obj: any, name: string) {
      S.regOpaqueObject(obj, name, noProps);
    }
  : nop;
export const regDescriptor = config.persistState ? S.regDescriptor : nop;
export const regConstructor = config.persistState ? S.regConstructor : nop;

/**
 * Returns `JSON.stringify` serializable object with the whole
 * current execution state
 */
export function capture(): S.JSONObject {
  return S.write({
    top: context.top,
    syncStack: context.syncStack,
    queue: context.queue,
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
    queue: context.queue,
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

if (typeof MessagePort !== "undefined") {
  S.regAutoOpaqueConstr(MessagePort);
  S.regAutoOpaqueConstr(MessageChannel);
}

export const descriptorSymbol = S.descriptorSymbol;
