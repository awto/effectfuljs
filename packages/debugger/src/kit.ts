/** pure versions of RT functions */

export function map<T, U>(arr: T[], f: (v: T) => U): U[] {
  const len = arr.length;
  const res = new Array(len);
  for (let i = 0; i < len; ++i) res[i] = f(arr[i]);
  return res;
}

export function filter<T>(arr: T[], pred: (v: T) => boolean): T[] {
  const res = [];
  for (const i of arr) if (pred(i)) res.push(i);
  return res;
}
