/**
 * Not transpiled high-order functions won't work, because when it calls its callback
 * it returns an effectful value and not immediately starts its execution
 *
 * This file contains quick and dirty patches for the runtime's higher order functions
 *
 * TODO: transpile core-js instead
 */
type Callback<This, T, R> = (this: This | undefined, elem: T, index: number, arr: T[]) => R;
export declare function every<T, This>(this: T[], callback: Callback<This, T, boolean>, self?: This): boolean;
export declare function setForEach<T, This>(this: Set<T>, callback: (this: This | undefined, k: T, v: T, cont: Set<T>) => void, self?: This): void;
export declare function mapForEach<K, V, This>(this: Map<K, V>, callback: (this: This | undefined, v: V, k: K, cont: Map<K, V>) => void, self?: This): void;
export declare function chainM<A, B>(arg: A, func: (a: A) => B): B;
export declare function iterErr(iter: any, reason: any): any;
export declare function iterErrM(iter: any, reason: any): Promise<any>;
export declare function iterFin(iter: any, value: any): any;
export declare function wrapModule(mod: any, cjsModule: any): any;
export declare function objectDefineProperties(obj: any, descrs: {
    [name: string]: PropertyDescriptor;
}): any;
export declare function objectGetOwnPropertyDescriptors(obj: any): {
    [name: string]: PropertyDescriptor;
};
export declare function mcallCont(func: (args: any, prop: string, func: any) => any, prop: string, args: any): any;
export declare function useArrCopy(copy: (this: any[]) => any[], transform: (this: any[], ...args: any[]) => any, set: (target: any, prop: any, value: any) => any): (this: any[], ...args: any[]) => any;
export declare function getOwnPropertySymbols(obj: object): symbol[];
export declare function getOwnPropertyNames(obj: object): string[];
export declare function objectKeys(obj: object): string[];
export declare function objectGetOwnPropertyDescriptor(wrappers: WeakMap<any, any>, obj: object, name: string | symbol | number): PropertyDescriptor | undefined;
export declare function dynImport(promise: Promise<any>): Promise<any>;
export declare function runJobs<T>(jobs: Iterable<(job: T) => void>, arg: T): void;
export declare function setTimeoutCallback(callback: (...args: any[]) => any, id: any): void;
export {};
