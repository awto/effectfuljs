import { record } from "./core";

export function record0(call: () => void): void {
  record({ prev: null, call });
}

export function record1<T1>(call: (this: { a: T1 }) => void, a: T1): void {
  record({ prev: null, call, a });
}

export function record2<T1, T2>(
  call: (this: { a: T1; b: T2 }) => void,
  a: T1,
  b: T2
): void {
  record({ prev: null, call, a, b });
}

export function record3<T1, T2, T3>(
  call: (this: { a: T1; b: T2; c: T3 }) => void,
  a: T1,
  b: T2,
  c: T3
): void {
  record({ prev: null, call, a, b, c });
}

export function record4<T1, T2, T3, T4>(
  call: (this: { a: T1; b: T2; c: T3; d: T4 }) => void,
  a: T1,
  b: T2,
  c: T3,
  d: T4
): void {
  record({ prev: null, call, a, b, c, d });
}

export function record5<T1, T2, T3, T4, T5>(
  call: (this: { a: T1; b: T2; c: T3; d: T4; e: T5 }) => void,
  a: T1,
  b: T2,
  c: T3,
  d: T4,
  e: T5
): void {
  record({ prev: null, call, a, b, c, d, e });
}

export function record6<T1, T2, T3, T4, T5, T6>(
  call: (this: { a: T1; b: T2; c: T3; d: T4; e: T5; f: T6 }) => void,
  a: T1,
  b: T2,
  c: T3,
  d: T4,
  e: T5,
  f: T6
): void {
  record({ prev: null, call, a, b, c, d, e, f });
}

export function record7<T1, T2, T3, T4, T5, T6, T7>(
  call: (this: { a: T1; b: T2; c: T3; d: T4; e: T5; f: T6; g: T7 }) => void,
  a: T1,
  b: T2,
  c: T3,
  d: T4,
  e: T5,
  f: T6,
  g: T7
): void {
  record({ prev: null, call, a, b, c, d, e, f, g });
}

export function record8<T1, T2, T3, T4, T5, T6, T7, T8>(
  call: (this: {
    a: T1;
    b: T2;
    c: T3;
    d: T4;
    e: T5;
    f: T6;
    g: T7;
    h: T8;
  }) => void,
  a: T1,
  b: T2,
  c: T3,
  d: T4,
  e: T5,
  f: T6,
  g: T7,
  h: T8
): void {
  record({ prev: null, call, a, b, c, d, e, f, g, h });
}

export function record9<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  call: (this: {
    a: T1;
    b: T2;
    c: T3;
    d: T4;
    e: T5;
    f: T6;
    g: T7;
    h: T8;
    i: T9;
  }) => void,
  a: T1,
  b: T2,
  c: T3,
  d: T4,
  e: T5,
  f: T6,
  g: T7,
  h: T8,
  i: T9
): void {
  record({ prev: null, call, a, b, c, d, e, f, g, h, i });
}
