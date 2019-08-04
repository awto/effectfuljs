export interface Record {
    operations?: Operation;
    prev: Record | null;
}
/** operations trace - callbacks to be executed on reverting state */
export interface Operation {
    prev?: Operation;
    (): void;
}
/** extension point for tracing customization */
export declare const traceMetaSymbol: unique symbol;
/** trace related information stored in the object */
export declare const traceDataSymbol: unique symbol;
export interface MaybeTarget<T = unknown> {
    [traceMetaSymbol]?: TraceMeta<T>;
    [traceDataSymbol]?: TraceData<T>;
}
export interface Target<T = unknown> {
    [traceMetaSymbol]: TraceMeta<T>;
    [traceDataSymbol]: TraceData<T>;
}
export interface TraceMeta<T = unknown> {
    wrap(target: T): T;
    proto?: object | null;
}
export declare const notTraceable: TraceMeta<any>;
/** Class for representing trace data steps */
export declare class TraceData<T> {
    meta: TraceMeta<T>;
    proxy: T | null;
    target: T;
    lastUpdate: Record | null;
    prototypeChanged: boolean;
    proto?: any;
    constructor(meta: TraceMeta<T>, proxy: any, target: any);
}
export interface Journal {
    /** current checkpoint */
    now: Record | null;
    /** a list of changes to undo */
    past: Record | null;
    /** a list of changes to redo */
    future: Record | null;
}
export declare const journal: Journal;
export declare function reset(): void;
/**
 * Returns an object which can be passed
 * to `undo` to restored the current state
 */
export declare function checkpoint(): Record;
/**
 * Registers a function(`f`) to be executed on replay in backward order
 */
export declare const record: (f: Operation) => void;
/** runs all actions stored in the cocord */
export declare function replay(rec: Record): void;
/** Returns own property names and symbols */
export declare function allProps(obj: any): Iterable<string | symbol>;
export declare function captureSnapshot<T>(data: TraceData<T>): void;
export declare const defaultTraps: ProxyHandler<any>;
export declare const defaultTrapsWithGetter: ProxyHandler<any>;
export declare function defaultWrap<T extends MaybeTarget<T>>(meta: TraceMeta<T>, target: T, traps?: ProxyHandler<T>): T;
export declare const defaultTraceMeta: TraceMeta<any>;
export declare function wrapImpl<T extends MaybeTarget<T>>(target: T): T;
/**
 * if `target` is a proxy returns its enclosing value
 * or returns `target` otherwise
 */
export declare function unwrapTarget<T extends MaybeTarget<T>>(target: T): T;
/**
 * for values tracked by some proxy returns the proxy,
 * or returns `target` if it is already the proxy
 */
export declare function getWrapper<T extends MaybeTarget<T>>(maybeProxy: T): T;
