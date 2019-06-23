import * as D from "../../main";

export function getCounter() {
  let i = 0;
  const trace = [];
  const dir = new Map();
  const set = new Set();
  return [
    function counter() {
      const info = { i };
      set.add(i);
      dir.set(info, i);
      trace.push(info);
      for (const j of trace) j.u = j.i * 10 + i;
      return i++;
    },
    trace,
    dir,
    set
  ];
}

export function runCounters(persist) {
  const [c, trace, dir, set] = getCounter();
  function invoke() {
    console.log(c(), [...trace], [...dir], [...set]);
  }
  invoke();
  invoke();
  const state = persist && D.Persist.capture();
  invoke();
  invoke();
  return [c(), state, trace, dir, set];
}
