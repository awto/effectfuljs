/**
 * # @effectful/es-persist API
 */

/** Simplified Promise-like interface */
export interface Thenable<T = any> {
  then<U>(
    resolve?: (value: T) => U | Thenable<U>,
    reject?: (reason: any) => U | Thenable<U>
  ): Thenable<U>;
}

/**
 * Implemented by values to be used in `await` expressions arguments in
 * transpiled code.  Unlike Promise, it takes continuation objects with two
 * settlement methods instead of two callbacks. It also returns nothing to save
 * some allocations.
 *
 * It is also Thenable for compatibility with not-transpiled code.
 *
 * `Promise` is extended to support this interface as well. However, using them
 * makes the program not serializable in some states. *
 * @typeparam T - type of a `await` result
 */
export interface AsyncValue<T = any> extends Thenable<T> {
  [awaitSymbol](cont: Continuation<T>);
}

/**
 * Stores currently running async and async generator functions, along with
 * scheduled jobs.
 */
export interface Context {
  /** Called when either async function or async generators started */
  reg(thread: Async | AsyncGenerator);
  /** Called when either async function or async generators exited */
  unreg(thread: Async | AsyncGenerator);
  /**
   * Stores currently running an async generator and async functions. The
   * default implementation provides it, but it isn't necessary for overrides
   */
  runnint?: Set<Async | AsyncGenerator>;
  /** All the jobs from `threads` to be scheduled using this scheduler */
  scheduler: Scheduler;
}

/**
 * Name of a property to define context object.
 */
export declare const contextSymbol: unique symbol;

/**
 * Subscribes a `Continuation` to be resumed on `AsyncValue` is settled
 */
export declare const awaitSymbol: unique symbol;

/**
 * Callbacks for specifying what to do next after async action is settled.
 */
export interface Continuation<T = any> {
  /**
   * Called if the async action has been successful
   *
   * @param value - result of the async action
   */

  resume(value: T);
  /**
   * Called if the async action has thrown an exception (rejected)
   *
   * @param reason - the thrown exception object
   */
  reject(reason: any);
}

/**
 * Some task for `Scheduler` to run in the scheduler specific order.
 */
export interface Job {
  /** Called by the scheduler */
  run();
}

/**
 * Defines async function execution state
 *
 * @typeparam T - result type
 */
export interface Async<T = any> extends Job, Continuation, AsyncValue<T> {
  /**
   * Context object for this function
   */
  [contextSymbol]: Context;
  /** Local variables and current control position */
  [name: string]: any;
}

/** ECMAScript compatible AsyncIterator result */
export type Result<T = any, R = any> =
  | { done: false; value: AsyncValue<T> }
  | { done: true; value: AsyncValue<R> };

/** ECMAScript compatible AsyncIterator result */
export interface AsyncIterator<O = any, I = any, R = any> {
  /** ECMAScript compatible `next` method */
  next(value: I): Continuation<Result<O, R>>;
}

/**
 * Defines async generator function execution state
 *
 * @typeparam O - type of `yield` expressions argument
 * @typeparam I - type of `yield` expressions result
 * @typeparam R - type of `return` statement argument
 * @typeparam E - type of `throw` statement argument
 */
export interface AsyncGenerator<O = any, I = any, R = any, E = any>
  extends AsyncIterator<O, I, R>,
    Job {
  /** ECMAScript compatible `throw` method */
  throw(reason: E): Continuation<Result<O, R>>;
  /** ECMAScript compatible `return` method */
  return(result: R): Continuation<Result<O, R>>;
  /** Local variables and current control position */
  [name: string]: any;
}

export interface AsyncGenerator<O = any, I = any, R = any, E = any> {
  /** Context object for this thread */
  [contextSymbol]: Context;
}

/**
 * Sets current context if there is an argument, returns context before the
 * change.  It may be used to override default context object, and it will be
 * assigned to an async function's prototype when it is defined.
 *
 * Note, function declarations are hoisted in JS (can be used before declared).
 * So the function won't change context of a function declaration in the same
 * block (module top level) where it is called. Import another module with the
 * call instead.
 */
export declare function context(newContext?: Context): Context;

/**
 * Scheduling some task work for execution, mostly to avoid stack overflows
 */
export interface Scheduler {
  /** Pushes task in the end of the queue */
  enqueue(job: Job);
  /**
   * Same as `enqueue` but the `job` will be executed only if there are
   * no other jobs scheduled.
   *
   * @see idle
   */
  onIdle(job: Job);
}

/**
 * Implementation of `Schedule` interface where jobs are scheduled using
 * JS engine event loop.
 */
export declare const eventLoopScheduler: Scheduler;

/**
 * Current continuation, it can be cloned or serialized after.  The cloned
 * version may be resumed and control will go from the point where `current` was
 * invoked (e.g. `await R.current`).  When resumed result of the `await`
 * expression will be different. It will be an argument of `resume`.
 */
export declare const current: AsyncValue<Continuation>;

/**
 * Same as `current` but ensures current context scheduler doesn't have enqueued
 * jobs. This way programs are more deterministic and don't need to serialize
 * the jobs. The default scheduler doesn't even provide any means for this.
 */
export declare const idle: AsyncValue<Continuation>;

/**
 * Stops execution without returning any result. Used to cancel continuation if
 * it is cloned and is going to be resumed.
 */
export declare const abort: AsyncValue;

/**
 * Some async function can use the result of this function to block in `await`
 * expression, and some another async function may unblock it by calling
 * `resume` there. Can be used to implement chaining of async computations.
 */
export declare function lock(): AsyncValue & Continuation;

/**
 * Returns `true` if the code using this runtime is transpiled utilizing this
 * library preset, and thus this library continuation tools can be applied.
 */
export declare const managed: AsyncValue<boolean>;

/**
 * List of constructor functions in this library to register in some
 * serialization library
 */
export declare const constructors: Function[];

/**
 * Same as `Promise.all` but for `AsyncValue` objects. If all the objects are
 * serializable the result is serializable too
 */
export declare function all(iterable: Iterable<AsyncValue>): AsyncValue;

/**
 * Same as `Promise.race` but for `AsyncValue` objects. If all the objects are
 * serializable the result is serializable too
 */
export declare function any<T>(
  iterable: Iterable<AsyncValue<T>>
): AsyncValue<T>;

/** Async Iterator builder */
export interface Producer<T = any> extends AsyncIterator<T, T> {
  /**
   * Yields `{value, done false}` as a result of next/current Iterator
   * method (next/return/throw)
   */
  send(value: T);
  /** Yields `{value,done:true}` as a result of next/current Iterator method */
  stop(value: any);
}

/** Creates new Producer */
export declare function producer(): Producer;
