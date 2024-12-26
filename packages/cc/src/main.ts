import _ctrl from "@effectful/js/macro";

import {
  Prompt,
  SubCont,
  newPrompt,
  context,
  copyFrame,
  Frame,
  push,
  pop
} from "./types";

export { newPrompt, SubCont as SubCont, Prompt };

const state = context;

/**
 * uses prompt in its first operand to delimit the current continuation during
 * the evaluation of its second operand.
 */
export function pushPrompt<A>(_prompt: Prompt<A>, body: () => A): A {
    return body();
}

/**
 * composes sub-continuation `subk` with current continuation and evaluates
 * its second argument `body`
 */
export function pushSubCont<A, B>(subk: SubCont<A, B>, body: () => A): B {
  const cfrom = copyFrame(subk.from);
  const ctill = subk.till;
  let prev: Frame = cfrom;
  const top = state.top;
  if (top == null) throw new Error("`pushSubCont` isn't instrumeted");
  for (let i = cfrom.caller; i && i != ctill; i = i.caller)
    prev = prev.next = prev.caller = copyFrame(i);
  prev.next = prev.caller = top;
  context.top = cfrom;
  return push(top, body) as any;
}

/**
 * Captures a portion of the current continuation back to
 * but not including the activation of pushPrompt with prompt `prompt`, aborts the
 * current continuation back to and including the activation of `pushPrompt`, and
 * invokes `body`, passing it an abstract value representing the captured subcontinuation.
 * If more than one activation of pushPrompt with prompt `prompt` is still active,
 * the most recent enclosing activation, i.e., the one that delimits the smallest
 * subcontinuation, is selected.
 */
export function withSubCont<A, B>(
  prompt: Prompt<B>,
  body: (seg: SubCont<A, B>) => B
): A {
  const top = context.top;
  if (!top) throw new Error("`withSubCont` isn't instrumented");
  const caller = top.next;
  if (!caller)
    throw new Error("`withSubCont` is called from not instrumented code");
  for (let i: Frame<B> | null = caller; i != null; i = i.next) {
    if (i.func === pushPrompt && i.$[1] === prompt) {
      const till = i.next;
      if (till === null) throw new TypeError("`pushPrompt` was called from not instrumented code");
      return pop(till, function popBody() {
        top.next = top.caller = till;
        return body(new SubCont<A, B>(caller, i));
      }) as any;
    }
  }
  throw new Error(`prompt "${prompt.name}" wasn't found`);
}

/**
 * caputes and aborts the current continuation until prompt `p` and calls `f`
 * passing captured continuation as a function to its argument,
 * delimits captured and resulting continuations
 */
export function shift<A, B>(prompt: Prompt<B>, body: (k: (v: () => A) => B) => B): A {
  return withSubCont<A, B>(prompt, (sk) =>
    pushPrompt(prompt, () => body((a) => pushPrompt(prompt, () => pushSubCont(sk, a))))
  );
}

/**
 * caputes and aborts the current continuation until prompt `p` and calls `f`
 * passing captured continuation as a function to its argument,
 * deoesn't delimit captured, delimits resultinging continuation
 */
export function control<A, B>(prompt: Prompt<B>, body: (k: (v: () => A) => B) => B): A {
  return withSubCont<A, B>(prompt, (sk) =>
    pushPrompt(prompt, () => body((a) => pushSubCont(sk, a)))
  );
}

/**
 * caputes and aborts the current continuation until prompt `prompt` and calls `body`
 * passing captured continuation as a function to its argument,
 * delimits captured, doesn't delimit resultinging continuation
 */
export function shift0<A, B>(prompt: Prompt<B>, body: (k: (v: () => A) => B) => B): A {
  return withSubCont<A, B>(prompt, (sk) =>
    body((a) => pushPrompt(prompt, () => pushSubCont(sk, a)))
  );
}

/**
 * caputes and aborts the current continuation until prompt `prompt` and calls `body`
 * passing captured continuation as a function to its argument,
 * doesn't delimit captured and resulting continuations
 */
export function control0<A, B>(prompt: Prompt<B>, body: (k: (v: () => A) => B) => B): A {
  return withSubCont<A, B>(prompt, (sk) => body((a) => pushSubCont(sk, a)));
}

/**
 * Creates a new prompt and calls the `body` function, passing this new prompt as an argument.
 * The resulting continuation is delimited by the new prompt.
 */
export function reset<A>(body: (prompt: Prompt<A>) => A): A {
  const prompt = newPrompt<A>();
  return pushPrompt(prompt, () => body(prompt));
}

/** 
 * Aborts the current continuation up to the specified prompt `prompt`.
 * 
 * @param prompt - The prompt up to which the continuation is aborted.
 * @param result - The value to return after aborting the continuation.
 * @returns This should never exit
 */
export function abort<B, A = any>(prompt: Prompt<B>, result: B): A {
  return withSubCont<A, B>(prompt, (_sk) => result);
}

/**
 * Composes a series of functions into a single function.
 * 
 * @param funs - A list of functions to compose.
 * @returns A function that applies the composed functions to a value.
 */
export function pipe(...funs: ((a: any) => any)[]): (arg: any) => any {
  return function (val: any) {
    for (const i of funs) val = val(i);
    return val;
  };
}

/**
 * Applies a series of functions to a value in sequence.
 * 
 * @param val - The initial value.
 * @param funs - A list of functions to apply to the value.
 * @returns The final value.
 */
export function chain(val: any, ...funs: ((a: any) => any)[]): any {
  for (const i of funs) val = val(i);
  return val;
}
