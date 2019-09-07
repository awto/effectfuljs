/**
 * Not transpiled high-order functions won't work, because when it calls its callback
 * it returns an effectful value and not immediately starts its execution
 *
 * This file contains quick and dirty patches for the runtime's higher order functions
 *
 * TODO: transpile core-js instead
 */

import * as Engine from "../engine";
import * as Persist from "../persist";
import * as State from "../state";
import { call } from "../engine";

type Callback<This, T, R> = (
  this: This | undefined,
  elem: T,
  index: number,
  arr: T[]
) => R;

export function map<T, U, This = undefined>(
  this: T[],
  callback: Callback<This, T, U>,
  self?: This
): U[] {
  const res = new Array<U>(this.length);
  let x = 0;
  for (const i of this) res[x++] = callback.call(self, i, x, this);
  return res;
}

export function filter<T, This = undefined>(
  this: T[],
  callback: Callback<This, T, boolean>,
  self?: This
): T[] {
  const res: T[] = [];
  let x = 0;
  for (const i of this) if (callback.call(self, i, x++, this)) res.push(i);
  return res;
}

export function find<T, This = undefined>(
  this: T[],
  callback: Callback<This, T, boolean>,
  self?: This
): T | undefined {
  let x = 0;
  for (const i of this) if (callback.call(self, i, x++, this)) return i;
}

export function findIndex<T, This = undefined>(
  this: T[],
  callback: Callback<This, T, boolean>,
  self?: This
): number {
  let x = 0;
  for (const i of this) if (callback.call(self, i, x++, this)) return x;
  return -1;
}

export function flatMap<T, U, This = undefined>(
  this: T[],
  callback: Callback<This, T, U | ReadonlyArray<U>>,
  self?: This
): U[] {
  return (<any>map).call(this, callback, self).flat();
}

export function forEach<T, This = undefined>(
  this: T[],
  callback: Callback<This, T, void>,
  self?: This
): void {
  let x = 0;
  for (const i of this) callback.call(self, i, x++, this);
}

export function reduce<T>(
  this: T[],
  callback: (prev: T, cur: T, index: number, arr: T[]) => T,
  initial?: T
) {
  let x = 0;
  let acc = <T>initial;
  const len = this.length;
  if (arguments.length !== 2) {
    if (len === 0)
      throw new TypeError("Reduce of empty array with no initial value");
    x = 1;
    acc = this[0];
  }
  for (; x < len; ++x) acc = callback(acc, this[x], x, this);
  return acc;
}

export function reduceRight<T>(
  this: T[],
  callback: (prev: T, cur: T, index: number, arr: T[]) => T,
  initial?: T
) {
  let acc = <T>initial;
  const len = this.length;
  let x = len - 1;
  if (arguments.length !== 2) {
    if (len === 0)
      throw new TypeError("Reduce of empty array with no initial value");
    acc = this[x--];
  }
  for (; x >= 0; --x) acc = callback(acc, this[x], x, this);
  return acc;
}

export function some<T, This>(
  this: T[],
  callback: Callback<This, T, boolean>,
  self?: This
): boolean {
  let x = 0;
  for (const i of this) if (callback.call(self, i, x++, this)) return true;
  return false;
}

export function every<T, This>(
  this: T[],
  callback: Callback<This, T, boolean>,
  self?: This
): boolean {
  let x = 0;
  for (const i of this) if (!callback.call(self, i, x++, this)) return false;
  return true;
}

export function setForEach<T, This>(
  this: Set<T>,
  callback: (this: This | undefined, k: T, v: T, cont: Set<T>) => void,
  self?: This
): void {
  for (const i of this) callback.call(self, i, i, this);
}

export function mapForEach<K, V, This>(
  this: Map<K, V>,
  callback: (this: This | undefined, k: K, v: V, cont: Map<K, V>) => void,
  self?: This
): void {
  for (const [k, v] of this) callback.call(self, k, v, this);
}

/**
 * wraps a top module's export, returns a function which on each call
 * returns `exports` object, but the value is memoized on its first call
 */
export function wrapExport(top: any, descr: any): any {
  "nodebug";
  let mod: any;
  const res: any = function exportsThunk() {
    if (!mod) {
      mod = {};
      top(mod, (mod.exports = {}));
    }
    return mod.exports;
  };
  res[State.thunkSymbol] = true;
  res[State.moduleSymbol] = descr;
  return res;
}

export function unwrapImport(value: any, name: string): any {
  if (!value) return value;
  if (value[State.thunkSymbol]) {
    value = value();
    if (!value) return value;
  }
  Persist.regModule(value, name);
  return value;
}

function reify<T>(v: T): T {
  return v;
}

export function chainM<A, B>(arg: A, func: (a: A) => B): B {
  return func(reify(arg));
}

export type Item = { value: any; done: boolean };

export type SubGenerator = Iterator<any> & {
  throw?: (value: any) => Item;
  return?: (value: any) => Item;
};

export interface GeneratorFrame extends State.Frame {
  delegatee: SubGenerator | null;
  running: boolean;
}

export function generatorNext(frame: GeneratorFrame, value: any): Item {
  if (frame.delegatee) {
    try {
      const item = <Item>frame.delegatee.next(value);
      if (!item.done) return item;
      frame.delegatee = null;
      value = item.value;
    } catch (e) {
      frame.delegatee = null;
      frame.goto = frame.meta.errHandler(frame.state);
      value = e;
    }
  }
  return call(frame, value);
}

export function generatorThrow(frame: GeneratorFrame, value: any): Item {
  const delegatee = frame.delegatee;
  if (delegatee) {
    let item: any;
    try {
      if (delegatee.throw) {
        item = delegatee.throw(value);
        if (!item.done) return item;
      } else {
        if (delegatee.return) delegatee.return(value);
        throw new TypeError("The iterator does not provide a 'throw' method.");
      }
      frame.delegatee = null;
    } catch (e) {
      frame.delegatee = null;
      value = e;
    }
    if (item) return call(frame, item.value);
  }
  frame.goto = frame.meta.errHandler(frame.state);
  return call(frame, value);
}

export function generatorReturn(frame: GeneratorFrame, value: any): Item {
  const delegatee = frame.delegatee;
  if (delegatee) {
    if (delegatee.return) {
      try {
        const item = <Item>delegatee.return(value);
        if (!item.done) return item;
      } catch (e) {
        frame.delegatee = null;
        frame.goto = frame.meta.errHandler(frame.state);
        return call(frame, e);
      }
    }
    frame.delegatee = null;
  }
  frame.goto = frame.meta.finHandler(frame.state);
  return call(frame, value);
}

export function generatorMethod(
  handler: (frame: GeneratorFrame, value: any) => Item
): (this: { $frame: GeneratorFrame }, value: any) => Item {
  return function(value) {
    const frame = this.$frame;
    try {
      if (frame.running) throw new TypeError("Generator is already running");
      frame.running = true;
      return handler(frame, value);
    } finally {
      frame.running = false;
    }
  };
}

export function yldStarImpl(
  dest: GeneratorFrame,
  value: any,
  goto: number
): any {
  const delegatee = (dest.delegatee = value[Symbol.iterator]());
  dest.goto = goto;
  try {
    const item = delegatee.next();
    if (!item.done) return item;
    value = item.value;
  } catch (e) {
    dest.goto = dest.meta.errHandler(dest.state);
    value = e;
  }
  dest.delegatee = null;
  return call(dest, value);
}

export type AsyncSubGenerator = AsyncIterator<any> & {
  throw?: (value: any) => Promise<Item>;
  return?: (value: any) => Promise<Item>;
};

export interface AsyncGeneratorFrame extends State.Frame {
  delegatee: AsyncSubGenerator | null;
  goto: number;
  running: boolean;
  queue: (() => void)[];
  cleanup(): void;
  onResolve: (value: any) => void;
  onReject: (reason: any) => void;
  promise: Promise<Item>;
}

export type AsyncStep = (
  state: AsyncGeneratorFrame,
  value: any
) => Promise<Item>;

export async function yldStarAGImpl(
  dest: AsyncGeneratorFrame,
  value: any,
  goto: number
) {
  dest.goto = goto;
  const delegatee = (dest.delegatee = Engine.iteratorM(value));
  try {
    const item = await delegatee.next();
    value = await item.value;
    if (!item.done) return { value, done: false };
  } catch (e) {
    dest.goto = dest.meta.errHandler(dest.state);
    value = e;
  }
  dest.delegatee = null;
  return call(dest, value);
}

export function runQueue(
  this: AsyncGeneratorFrame,
  impl: (
    frame: AsyncGeneratorFrame,
    step: AsyncStep,
    value: any
  ) => Promise<Item>,
  step: (frame: AsyncGeneratorFrame, value: any) => Promise<Item>,
  value: any,
  rs: (value: any) => any,
  rj: (reason: any) => any
) {
  impl(this, step, value).then(rs, rj);
}

export function enqueue(
  this: AsyncGeneratorFrame,
  impl: (
    frame: AsyncGeneratorFrame,
    step: AsyncStep,
    value: any
  ) => Promise<Item>,
  step: (frame: AsyncGeneratorFrame, value: any) => Promise<Item>,
  value: any,
  rs: (value: any) => any,
  rj: (reason: any) => any
) {
  this.queue.push(runQueue.bind(this, impl, step, value, rs, rj));
}

export function asyncGeneratorMethod(
  impl: (
    frame: AsyncGeneratorFrame,
    step: AsyncStep,
    value: any
  ) => Promise<Item>,
  step: (frame: AsyncGeneratorFrame, value: any) => Promise<Item>
): (value: any) => Promise<Item> {
  return function(this: { $frame: AsyncGeneratorFrame }, value: any) {
    const frame = this.$frame;
    if (frame.running)
      return new Promise<Item>(enqueue.bind(frame, impl, step, value));
    frame.running = true;
    return impl(frame, step, value);
  };
}

export async function asyncNextImpl(
  state: AsyncGeneratorFrame,
  step: AsyncStep,
  value: any
): Promise<Item> {
  try {
    if (state.delegatee) {
      try {
        const item = await state.delegatee.next(value);
        value = await item.value;
        if (!item.done) return { value, done: false };
        state.delegatee = null;
      } catch (e) {
        value = e;
        state.goto = state.meta.errHandler(state.state);
      }
    }
    return await step(state, value);
  } finally {
    state.cleanup();
  }
}

export async function asyncThrowImpl(
  state: AsyncGeneratorFrame,
  step: AsyncStep,
  value: any
): Promise<Item> {
  let done: boolean, result: any;
  try {
    const delegatee = state.delegatee;
    if (delegatee) {
      try {
        if (delegatee.throw) {
          const item = await delegatee.throw(value);
          value = await item.value;
          if (!item.done) return { value, done: false };
        } else {
          if (delegatee.return) await delegatee.return(value);
          throw new TypeError(
            "The iterator does not provide a 'throw' method."
          );
        }
      } catch (e) {
        value = e;
        state.goto = state.meta.errHandler(state.state);
      }
      state.delegatee = null;
    }
    ({ done, value: result } = await step(state, value));
  } finally {
    state.cleanup();
  }
  return { done, value: await result };
}

export async function asyncReturnImpl(
  state: AsyncGeneratorFrame,
  step: AsyncStep,
  value: any
): Promise<Item> {
  let done: boolean, result: any;
  try {
    const delegatee = state.delegatee;
    if (delegatee) {
      try {
        if (delegatee.return) {
          const item = await delegatee.return(value);
          value = await item.value;
          if (!item.done) return { value, done: false };
        }
      } catch (e) {
        value = e;
        state.goto = state.meta.errHandler(state.state);
      }
      state.delegatee = null;
    }
    ({ done, value: result } = await step(state, value));
  } finally {
    state.cleanup();
  }
  return { done, value: await result };
}
