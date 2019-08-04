import { TraceMeta, Target } from "./core";
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
export declare const setMeta: TraceMeta<Set<any>>;
