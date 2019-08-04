require("./setup-time-travel");
const trace = require("./run").bind(null, true);
const D = require("../main");

describe("time traveling", function() {
  test("Object tracing", function() {
    D.TimeTravel.reset();
    const s = Symbol("S");
    const v = D.wrap({ a: "A", b: "B", c: "C", [s]: "S" });
    const protoUnwrapped = {};
    const proto = D.wrap(protoUnwrapped);
    const orig = Object.setPrototypeOf({ ...v }, proto);
    Object.setPrototypeOf(v, proto);
    expect(Object.getPrototypeOf(v)).toBe(proto);
    D.TimeTravel.checkpoint();
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
        [D.TimeTravel.traceDataSymbol]: v[D.TimeTravel.traceDataSymbol]
      })
    );
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    expect(v).toStrictEqual(orig);
  });
  test("Array tracing", function() {
    D.TimeTravel.reset();
    const arr = D.wrap([1, 2, 3, 4, 5]);
    const orig = [...arr];
    D.TimeTravel.checkpoint();
    arr.splice(2, 2, "A", "B", "C");
    expect([...arr]).toStrictEqual([1, 2, "A", "B", "C", 5]);
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    expect([...arr]).toStrictEqual(orig);
    arr.push("Z");
    arr.unshift("A");
    expect([...arr]).toStrictEqual(["A", 1, 2, 3, 4, 5, "Z"]);
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    expect([...arr]).toEqual(orig);
    arr[0] = "A";
    arr[4] = "Z";
    expect([...arr]).toEqual(["A", 2, 3, 4, "Z"]);
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    expect([...arr]).toEqual(orig);
  });
  test("Map tracing", function() {
    D.TimeTravel.reset();
    const map = D.wrap(new Map([[1, "A"], [2, "B"], [3, "C"]]));
    map.deb_hi = "there";
    const orig = [...map];
    D.TimeTravel.checkpoint();
    map.deb_hi = "THERE";
    map.set(1, "D").delete(2);
    map.delete(3);
    map.set(3, "E").set(4, "F");
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    expect(map.has(4)).toBe(false);
    expect(map.deb_hi).toBe("there");
    expect(map.get(3)).toBe("C");
    D.TimeTravel.checkpoint();
    expect([...map]).toEqual(orig);
    map.clear();
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    expect([...map]).toEqual(orig);
    map.clear();
    map.set(2, "E");
    map.set(1, "F");
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    expect([...map]).toEqual(orig);
  });
  test("Set tracing", function() {
    D.TimeTravel.reset();
    const set = D.wrap(new Set([1, 2, 3]));
    const orig = [...set];
    set.deb_hi = "there";
    D.TimeTravel.checkpoint();
    set.deb_hi = "THERE";
    set.delete(1);
    set.delete(3);
    set.add(4);
    set.add(2);
    set.add(1);
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    expect(set.has(4)).toBe(false);
    expect(set.deb_hi).toBe("there");
    expect(set.has(3)).toBe(true);
    expect([...set]).toEqual(orig);
    set.clear();
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    expect([...set]).toEqual(orig);
    set.clear();
    set.add(8);
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    expect([...set]).toEqual(orig);
  });
  test("captured state", function() {
    D.TimeTravel.reset();
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
    D.TimeTravel.checkpoint();
    counterStep();
    counterStep();
    counterStep();
    counterStep();
    console.log("UNDO");
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    counterStep();
    counterStep();
    console.log("SAVE2");
    D.TimeTravel.checkpoint();
    counterStep();
    counterStep();
    console.log("UNDO SAVE2");
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    counterStep();
    counterStep();
    console.log("UNDO SAVE");
    counter();
    console.log(trace(true));
    console.log("UNDO SAVE1");
    D.TimeTravel.checkpoint();
    D.TimeTravel.undo();
    counter();
    console.log(trace());
    expect(console.log.mock.calls).toMatchSnapshot();
  });
});
