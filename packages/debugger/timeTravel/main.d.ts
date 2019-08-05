import * as Core from "./core";
import * as DOM from "./dom";
export declare const journal: Core.Journal;
export declare const reset: typeof Core.reset;
declare module "../state" {
    interface Frame extends Core.MaybeTarget<Frame> {
    }
}
/**
 * This rollbacks all changed objects and runs functions registered by `record`,
 * (assumes an empty last checkpoint).
 */
export declare const undo: () => Core.Record | null;
export declare const redo: () => Core.Record | null;
/**
 * Returns an object which can be passed
 * to `undo` to restored the current state
 */
export declare const checkpoint: () => Core.Record | null;
/** Values wrapper injected by the compiler */
export declare const wrap: <T extends Core.MaybeTarget<T>>(target: T) => T;
/** Registers an operation to be called on `undo` in reverse direction */
export declare const record: (f: Core.Operation) => void;
/**
 * when constructing new objects replacing its prototype to unwrapped one,
 * otherwise it will catch all setters of not yet wrapped target
 */
export declare const unwrapPrototype: (target: Core.Target<unknown>) => void;
export { Operation, Record, traceDataSymbol, traceMetaSymbol } from "./core";
export { Core, DOM };
/**
 * defines setter a getter in `value` to support time travel
 * TODO: delete handler
 */
export declare function propHack(value: any, propName: string): void;
