require("./setupTrace");
const trace = require("./run").bind(null, true);
const D = require("../main");

describe("time traveling", function() {
  test("Object tracing", function() {
    const s = Symbol("S");
    const v = D.wrap({ a: "A", b: "B", c: "C", [s]: "S" });
    const protoUnwrapped = {};
    const proto = D.wrap(protoUnwrapped);
    const orig = Object.setPrototypeOf({ ...v }, proto);
    Object.setPrototypeOf(v, proto);
    expect(Object.getPrototypeOf(v)).toBe(proto);
    let save = D.Trace.checkpoint();
    delete v.a;
    v.a = "a";
    delete v.b;
    v[s] = "s";
    Object.setPrototypeOf(v, null);
    expect(v).toStrictEqual(
      Object.assign(Object.create(null), {
        a: "a",
        c: "C",
        [s]: "s",
        [D.Trace.traceDataSymbol]: v[D.Trace.traceDataSymbol]
      })
    );
    D.Trace.undo(save);
    save = D.Trace.checkpoint();
    expect(v).toStrictEqual(orig);
  });
  test("Array tracing", function() {
    const arr = D.wrap([1, 2, 3, 4, 5]);
    const orig = [...arr];
    let save = D.Trace.checkpoint();
    arr.splice(2, 2, "A", "B", "C");
    expect([...arr]).toStrictEqual([1, 2, "A", "B", "C", 5]);
    D.Trace.undo(save);
    save = D.Trace.checkpoint();
    expect([...arr]).toStrictEqual(orig);
    arr.push("Z");
    arr.unshift("A");
    expect([...arr]).toStrictEqual(["A", 1, 2, 3, 4, 5, "Z"]);
    D.Trace.undo(save);
    save = D.Trace.checkpoint();
    expect([...arr]).toEqual(orig);
    arr[0] = "A";
    arr[4] = "Z";
    expect([...arr]).toEqual(["A", 2, 3, 4, "Z"]);
    D.Trace.undo(save);
    expect([...arr]).toEqual(orig);
  });
  test("Map tracing", function() {
    const map = D.wrap(new Map([[1, "A"], [2, "B"], [3, "C"]]));
    map.deb_hi = "there";
    const orig = [...map];
    let save = D.Trace.checkpoint();
    map.deb_hi = "THERE";
    map.set(1, "D").delete(2);
    map.delete(3);
    map.set(3, "E").set(4, "F");
    D.Trace.undo(save);
    expect(map.has(4)).toBe(false);
    expect(map.deb_hi).toBe("there");
    expect(map.get(3)).toBe("C");
    save = D.Trace.checkpoint();
    expect([...map]).toEqual(orig);
    map.clear();
    D.Trace.undo(save);
    save = D.Trace.checkpoint();
    expect([...map]).toEqual(orig);
    map.clear();
    map.set(2, "E");
    map.set(1, "F");
    D.Trace.undo(save);
    save = D.Trace.checkpoint();
    expect([...map]).toEqual(orig);
  });
  test("Set tracing", function() {
    const set = D.wrap(new Set([1, 2, 3]));
    const orig = [...set];
    set.deb_hi = "there";
    let save = D.Trace.checkpoint();
    set.deb_hi = "THERE";
    set.delete(1);
    set.delete(3);
    set.add(4);
    set.add(2);
    set.add(1);
    D.Trace.undo(save);
    save = D.Trace.checkpoint();
    expect(set.has(4)).toBe(false);
    expect(set.deb_hi).toBe("there");
    expect(set.has(3)).toBe(true);
    expect([...set]).toEqual(orig);
    set.clear();
    D.Trace.undo(save);
    save = D.Trace.checkpoint();
    expect([...set]).toEqual(orig);
    set.clear();
    set.add(8);
    D.Trace.undo(save);
    save = D.Trace.checkpoint();
    expect([...set]).toEqual(orig);
  });
  test("captured state", function() {
    global.console = { log: jest.fn() };
    D.evalThunk(require("./__fixtures__/counters"));
    const mod = trace();
    mod.getCounter();
    const [counter, tr, dir, set] = trace(true);
    console.log("INIT", tr, dir, set);
    let stepNum = 0;
    function counterStep() {
      counter();
      console.log(
        "STEP",
        stepNum++,
        trace(true),
        JSON.stringify({ tr, dir: [...dir], set: [...set] })
      );
    }
    counterStep();
    counterStep();
    counterStep();
    console.log("SAVE", tr, dir, set);
    const save = D.Trace.checkpoint();
    counterStep();
    counterStep();
    counterStep();
    counterStep();
    console.log("UNDO");
    D.Trace.undo(save);
    const save1 = D.Trace.checkpoint();
    counterStep();
    counterStep();
    console.log("SAVE2");
    const save2 = D.Trace.checkpoint();
    counterStep();
    counterStep();
    console.log("UNDO SAVE2");
    D.Trace.undo(save2);
    counterStep();
    counterStep();
    console.log("UNDO SAVE");
    try {
      D.Trace.undo(save);
    } catch (e) {
      console.log(e);
    }
    counter();
    console.log(trace(true));
    console.log("UNDO SAVE1");
    D.Trace.undo(save1);
    counter();
    console.log(trace());
    expect(console.log.mock.calls).toMatchSnapshot();
  });
});
