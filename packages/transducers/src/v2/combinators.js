import opts from "./config";

/**
 * similar to Ramda.curryN, likely less efficient,
 * but Ramda dependency can be dropped
 */
export function curryN(num, fun) {
  function step(args) {
    return function curryStep() {
      const next = args.concat(Array.from(arguments));
      return next.length >= num ? fun.apply(undefined, next) : step(next);
    };
  }
  return step([]);
}

/**
 * similar to Ramda.curry, likely less efficient,
 * but Ramda dependency can be dropped
 */
export function curry(fun, trace) {
  return curryN(fun.length, fun, trace);
}

export const filter = curry(function* filter(pred, s) {
  for (const i of s) if (pred(i)) yield i;
});

export const flatMap = curry(function* flatMap(act, s) {
  for (const i of s) yield* act(i);
});

export const map = curry(function* map(fun, s) {
  for (const i of s) yield fun(i);
});

export const forEach = curry(function forEach(act, s) {
  for (const i of s) act(i);
});

/**
 * reverse array iterator
 */
export function reverse(arr) {
  arr = Array.isArray(arr) ? arr : Array.from(arr);
  let i = arr.length;
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return i === 0
            ? { value: null, done: true }
            : { value: arr[--i], done: false };
        }
      };
    }
  };
}

/**
 * adds value `v` to an Array in a map `m` value by `k`
 * creates the Array if needed
 */
export function mapPush(m, k, v) {
  let l = m.get(k);
  if (l == null) m.set(k, (l = []));
  l.push(v);
}

/**
 * Returns Map's `m` value by `k` if it doesn't exist inserts an empty array,
 * and returns it.
 */
export function mapArr(m, k) {
  let l = m.get(k);
  if (l == null) m.set(k, (l = []));
  return l;
}

/**
 * adds value `v` to a Set in a map `m` value by `k`
 * creates the Set if needed
 */
export function mapAdd(m, k, v) {
  let l = m.get(k);
  if (l == null) m.set(k, (l = new Set()));
  l.add(v);
}

export function groupWith /*::<K,V,W>*/(
  i /*:Iterable<[K,V]>*/,
  accum /*:(w:W,v:V,k?:K) => W*/,
  init /*::?: (k?:K) => W*/
) {
  /*: Map<K,W>*/ const ret /*:Map<K,W>*/ = new Map();
  if (init == null) init = () => null;
  for (const [k, v] of i) {
    const l = ret.get(k);
    ret.set(k, l == null ? accum(init(k), v, k) : accum(l, v, k));
  }
  return ret;
}

export function group /*::<K,V>*/(i /*:Iterable<[K,V]>*/) /*: Map<K,V[]>*/ {
  const ret /*:Map<K,V[]>*/ = new Map();
  for (const [k, v] of i) mapPush(ret, k, v);
  return ret;
  // return groupWith<K,V,V[]>(i,(w:V[],v:V) => (w.push(v),w), () => [])
}

export function groupUniq /*::<K,V>*/(
  i /*:Iterable<[K,V]>*/
) /*: Map<K,Set<V>>*/ {
  const ret /*:Map<K,V[]>*/ = new Map();
  for (const [k, v] of i) mapAdd(ret, k, v);
  return ret;
  // return groupWith<K,V,V[]>(i,(v:V,w:V[]) => (w.add(v),w), () => new Set())
}

/**
 * similar to Ramda.pipe, likely less efficient,
 * but Ramda dependency can be dropped
 */
export function pipe() {
  var args = arguments;
  if (opts.debug && ![...args].every(Boolean))
    throw new Error(`pipe with an empty function`);
  return function pipeImpl(cur) {
    for (let i = 0, len = args.length; i < len; ++i) cur = args[i](cur);
    return cur;
  };
}

export function* cons(a, s) {
  yield a;
  yield* s;
}
