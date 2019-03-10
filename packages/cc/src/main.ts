/**
 * # Monadic framework for delimited continuations

 import * as CC from "@effectful/cc"

 CC.run(function() {
 // .....
 });

*/

let promptId = 0;

export class Prompt<A> {
  constructor(name: string) {
    this.name = name;
    this.id = promptId++;
  }
  name: string;
  id: number;
  ___promt_tag_?: A;
}

export const stepSymbol = Symbol("Effectful.ccStep");

/** effectful value */
export interface CC<A> {
  [stepSymbol](k: Seq<A, any>): CCV<any>;
}

export type CCV<A> = CC<A> | A;

export type Step<A, B> = (x: Context, a: A) => CCV<B>;

/** EffectfulJS abstract interface implementation */
export class Context {
  chain<A, B>(v: CCV<A>, f: Step<A, B>): CC<B> {
    return new Chain(v, f, this);
  }
  jump<A, B>(v: A, f: Step<A, B>): CCV<B> {
    return f(this, v);
  }
  jumpR<A, B>(v: A, f: Step<A, B>): CC<B> {
    return new Chain(v, f, this);
  }
  pure<A>(v: A): CC<A> {
    return new Pure<A>(v);
  }
  scope<A>(f: (t: Context) => CC<A>): CC<A> {
    return f(this);
  }
}

export function context() {
  return new Context();
}

export type Seq<A, B> = Frame<any>[];

export type Frame<A> = {
  prompt?: Prompt<A>;
  seg?: Step<A, any>;
  ctx?: Context;
};

function splitAt(seq: Seq<any, any>, p: Prompt<any>): Seq<any, any> {
  const res: Seq<any, any> = [];
  for (let i; (i = seq.pop()) != null; ) {
    if (i.prompt === p) return res;
    res.unshift(i);
  }
  throw new TypeError(`prompt ${p.name}@${p.id} wasn't found`);
}

class PushPrompt<A> implements CC<A> {
  constructor(p: Prompt<A>, c: CCV<A>) {
    this.prompt = p;
    this.cont = c;
  }
  [stepSymbol](k: Seq<A, any>): CCV<any> {
    k.push({ prompt: this.prompt, seg: undefined, ctx: undefined });
    return this.cont;
  }
  private prompt: Prompt<A>;
  private cont: CCV<A>;
}

class Chain<A, B> implements CC<B> {
  constructor(a: CCV<A>, f: Step<A, B>, x?: Context) {
    this.arg = a;
    this.fun = f;
    this.ctx = x;
  }
  [stepSymbol](k: Seq<B, any>): CCV<any> {
    k.push({ prompt: undefined, seg: this.fun, ctx: this.ctx });
    // TODO: stepCoerce (no tail)
    return this.arg;
  }
  private arg: CCV<A>;
  private fun: Step<A, B>;
  private ctx?: Context;
}

export type SubCont<A, B> = Frame<any>[];

class WithSubCont<A, B> implements CC<A> {
  constructor(p: Prompt<B>, k: (sc: SubCont<A, B>) => CCV<B>) {
    this.prompt = p;
    this.handler = k;
  }
  [stepSymbol](k: Seq<A, any>): CCV<any> {
    return this.handler(splitAt(k, this.prompt));
  }
  private prompt: Prompt<B>;
  private handler: (sc: SubCont<A, B>) => CCV<B>;
}

class PushSubCont<A, B> implements CC<B> {
  constructor(sc: SubCont<A, B>, c: CCV<A>) {
    this.subCont = sc;
    this.cont = c;
  }
  [stepSymbol](k: Seq<B, any>): CCV<any> {
    k.push.apply(k, this.subCont);
    return this.cont;
  }
  private subCont: SubCont<A, B>;
  private cont: CCV<A>;
}

class Pure<A> implements CC<A> {
  constructor(value: A) {
    this.value = value;
  }
  [stepSymbol](k: Seq<A, any>): CCV<any> {
    return this.value;
  }
  value: A;
}

/**
 * Captures a portion of the current continuation back to
 * but not including the activation of pushPrompt with prompt `p`, aborts the
 * current continuation back to and including the activation of `pushPrompt`, and
 * invokes `f`, passing it an abstract value representing the captured subcontinuation.
 * If more than one activation of pushPrompt with prompt p is still active,
 * the most recent enclosing activation, i.e., the one that delimits the smallest
 * subcontinuation, is selected.
 */
export function withSubCont<A, B>(
  p: Prompt<B>,
  f: (sc: SubCont<A, B>) => CCV<B>
): CC<A> {
  return new WithSubCont<A, B>(p, f);
}

/** returns effectful value returning `v` */
export function pure<A>(v: A): CC<A> {
  return new Pure<A>(v);
}

/**
 * Creates a new prompt, distinct from all existing prompts
 */
export function newPrompt<A>(name: string = "p"): Prompt<A> {
  return new Prompt<A>(name);
}

/**
 * uses prompt in its first operand to delimit the current continuation during
 * the evaluation of its second operand.
 */
export function pushPrompt<A>(p: Prompt<A>, cont: CCV<A>): CC<A> {
  return new PushPrompt<A>(p, cont);
}

/**
 * composes sub-continuation `subk` with current continuation and evaluates
 * its second argument
 */
export function pushSubCont<A, B>(subk: SubCont<A, B>, cont: CCV<A>): CC<B> {
  return new PushSubCont<A, B>(subk, cont);
}

/**
 * for single-level mode, can be used for converting pure value into effectful
 */
export function reify<A>(f: () => CCV<A>): CC<CCV<A>> {
  // if wrapped with pure - doesn't require
  return pure(f());
}

/**
 * for single-level mode, can be used for converting effectful value
 * into pure value
 */
export function reflect<A>(v: CCV<A>): CCV<A> {
  return v;
}

/**
 * evaluate all frames till resulting value
 */
export function run<A>(c: CCV<A>): A {
  const k: Seq<any, any> = [];
  let cur: any = c;
  for (;;) {
    if (cur && cur[stepSymbol]) {
      cur = cur[stepSymbol](k);
    } else {
      if (!k.length) return cur;
      const n: Frame<any> = k.pop() as any;
      if (n.seg != null) cur = n.seg(n.ctx as any, cur);
    }
  }
}

/**
 * caputes and aborts the current continuation until prompt `p` and calls `f`
 * passing captured continuation as a function to its argument,
 * delimits captured and resulting continuations
 */
export function shift<A, B>(
  p: Prompt<B>,
  f: (k: (v: A) => CCV<B>) => CCV<B>
): CCV<A> {
  return withSubCont<A, B>(p, sk =>
    pushPrompt(p, f(a => pushPrompt(p, pushSubCont(sk, a))))
  );
}

/**
 * caputes and aborts the current continuation until prompt `p` and calls `f`
 * passing captured continuation as a function to its argument,
 * deoesn't delimit captured, delimits resultinging continuation
 */
export function control<A, B>(
  p: Prompt<B>,
  f: (k: (v: A) => CCV<B>) => CCV<B>
): CCV<A> {
  return withSubCont<A, B>(p, sk => pushPrompt(p, f(a => pushSubCont(sk, a))));
}

/**
 * caputes and aborts the current continuation until prompt `p` and calls `f`
 * passing captured continuation as a function to its argument,
 * delimits captured, doesn't delimit resultinging continuation
 */
export function shift0<A, B>(
  p: Prompt<B>,
  f: (k: (v: A) => CCV<B>) => CCV<B>
): CCV<A> {
  return withSubCont<A, B>(p, sk => f(a => pushPrompt(p, pushSubCont(sk, a))));
}

/**
 * caputes and aborts the current continuation until prompt `p` and calls `f`
 * passing captured continuation as a function to its argument,
 * doesn't delimit captured and resulting continuations
 */
export function control0<A, B>(
  p: Prompt<B>,
  f: (k: (v: A) => CCV<B>) => CCV<B>
): CCV<A> {
  return withSubCont<A, B>(p, sk => f(a => pushSubCont(sk, a)));
}

/**
 * creates new prompt, and calls `e` passing this new prompt,
 * delimiting resulting continuation with it
 */
export function reset<A>(e: (p: Prompt<A>) => CCV<A>): CC<A> {
  let p = newPrompt<A>();
  return pushPrompt(p, e(p));
}

/** aborts current continution up to the prompt `p` */
export function abort<A, B>(p: Prompt<B>, e: CCV<B>): CC<A> {
  return withSubCont<A, B>(p, sk => e);
}

/**
 * returns `v` if is instance of `CC` or `pure(v)` otherwise
 */
export function coerce<A>(v: CCV<A>): CC<A> {
  if ((v as any)[stepSymbol]) return v as any;
  return pure<A>(v as any);
}

function CC<A>(f: () => A) {
  return f();
}

export default Object.assign(CC, {
  newPrompt,
  withSubCont,
  pushPrompt,
  pushSubCont,
  reify,
  reflect,
  pure,
  context,
  reset,
  control0,
  shift0,
  control,
  shift,
  run,
  abort,
  coerce
});
