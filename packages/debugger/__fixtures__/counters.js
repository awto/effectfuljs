import * as Kit from "../kit";

export function getCounter() {
  let i = 0;
  return function counter() {
    return i++;
  };
}

export function runCounters() {
  const c = getCounter();
  console.log("C1:", c());
  console.log("C2:", c());
  const state = Kit.capture();
  console.log("C3:", c());
  console.log("C4:", c());
  return [c(), state];
}
