import { TraceMeta, TraceData, Target, Record } from "./core";
declare global {
    interface Map<K, V> extends Target<Map<K, V>> {
    }
    interface Set<T> extends Target<Set<T>> {
    }
    interface Promise<T> extends Target<Promise<T>> {
    }
    interface MessageChannel extends Target<MessageChannel> {
    }
}
declare module "./core" {
    interface TraceData<T> {
        lastContUpdate: Record | null;
    }
}
export declare const mapMeta: TraceMeta<Map<any, any>>;
export declare class MapSnapshot<K, V> {
    changes: [K, V][];
    data: TraceData<Map<K, V>>;
    at: Record | null;
    constructor(data: TraceData<Map<K, V>>);
    call(): void;
}
export declare const setMeta: TraceMeta<Set<any>>;
export declare class SetSnapshot<T> {
    data: TraceData<Set<T>>;
    at: Record | null;
    changes: T[];
    constructor(data: TraceData<Set<T>>);
    call(): void;
}
