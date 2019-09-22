require("./setup-time-travel");
const trace = require("./run");
const D = require("../main");
const S = require("@effectful/serialization");

trace.silent = true;
describe("time traveling", function() {
  test("Object tracing", function() {
    const s = Symbol("S");
    S.regOpaquePrim(s);
    const v = { a: "A", b: "B", c: "C", [s]: "S" };
    const proto = {};
    const orig = { ...v };
    Object.setPrototypeOf(v, proto);
    expect(Object.getPrototypeOf(v)).toBe(proto);
    function get() {
      return "z";
    }
    S.regOpaqueObject(get, "GET");
    D.TimeTravel.reset();
    D.TimeTravel.checkpoint();
    D.del(v, "a");
    D.set(v, "a", "a");
    D.del(v, "b");
    D.set(v, s, "s");
    Object.setPrototypeOf(v, null);
    Object.defineProperty(v, "z", {
      enumerable: true,
      get
    });
    const changed = {
      a: "a",
      c: "C",
      [s]: "s",
      z: "z"
    };
    expect(v).toEqual(changed);
    D.TimeTravel.checkpoint();
    Object.assign(v, { a: "_a", [s]: "_s", d: "D" });
    Object.defineProperties(v, {
      z: {
        enumerable: true,
        value: "Z"
      }
    });
    const changed2 = {
      a: "_a",
      c: "C",
      d: "D",
      z: "Z",
      [s]: "_s"
    };
    expect(v).toEqual(changed2);
    expect(Object.getPrototypeOf(v)).toBe(null);
    D.TimeTravel.undo();
    expect(v).toEqual(changed);
    expect(Object.getPrototypeOf(v)).toBe(null);
    D.TimeTravel.undo();
    expect(v).toEqual(orig);
    expect(Object.getPrototypeOf(v)).toBe(proto);
    D.TimeTravel.redo();
    expect(v).toEqual(changed);
    expect(Object.getPrototypeOf(v)).toBe(null);
    D.TimeTravel.redo();
    expect(v).toEqual(changed2);
    expect(Object.getPrototypeOf(v)).toBe(null);
    const j = D.TimeTravel.journal;
    j.enabled = false;
    const data = S.write({
      now: j.now,
      future: j.future,
      past: j.past,
      data: v
    });
    expect(JSON.stringify(data)).toMatchSnapshot();
    const restored = S.read(data);
    const v2 = restored.data;
    Object.assign(D.TimeTravel.journal, restored);
    j.enabled = true;
    expect(v).toEqual(changed2);
    expect(Object.getPrototypeOf(v)).toBe(null);
    expect(v2).toEqual(changed2);
    expect(Object.getPrototypeOf(v2)).toBe(null);
    D.TimeTravel.undo();
    expect(v).toEqual(changed2);
    expect(Object.getPrototypeOf(v)).toBe(null);
    expect(v2).toEqual(changed);
    expect(Object.getPrototypeOf(v)).toBe(null);
    D.TimeTravel.undo();
    expect(v).toEqual(changed2);
    expect(Object.getPrototypeOf(v)).toBe(null);
    expect(v2).toEqual(orig);
    expect(Object.getPrototypeOf(v2)).not.toBe(proto);
    D.TimeTravel.redo();
    expect(v2).toEqual(changed);
    expect(Object.getPrototypeOf(v2)).toBe(null);
    expect(v).toEqual(changed2);
    expect(Object.getPrototypeOf(v)).toBe(null);
    j.enabled = false;
  });
  test("Array tracing", function() {
    const arr = [1, 2, 3, 4, 5];
    const orig = [...arr];
    D.TimeTravel.reset();
    D.TimeTravel.checkpoint();
    arr.splice(2, 2, "A", "B", "C");
    const arr1 = [1, 2, "A", "B", "C", 5];
    expect([...arr]).toEqual(arr1);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.checkpoint();
    D.set(arr, "deb_hi", "there");
    arr.push("Z");
    arr.unshift("A");
    const arr2 = ["A", 1, 2, "A", "B", "C", 5, "Z"];
    expect([...arr]).toEqual(arr2);
    expect(arr.deb_hi).toBe("there");
    D.TimeTravel.checkpoint();
    D.set(arr, "deb_hi", "THERE");
    const l = arr.pop();
    const f = arr.shift();
    D.set(arr, 0, "a");
    D.set(arr, arr.length - 1, "z");
    const arr3 = ["a", 2, "A", "B", "C", "z"];
    expect([...arr]).toEqual(arr3);
    expect(arr.deb_hi).toBe("THERE");
    D.TimeTravel.checkpoint();
    arr.sort();
    D.del(arr, "deb_hi");
    const arr4 = [2, "A", "B", "C", "a", "z"];
    expect([...arr]).toEqual(arr4);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.undo();
    expect([...arr]).toEqual(arr3);
    expect(arr.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr4);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.undo();
    expect([...arr]).toEqual(arr3);
    expect(arr.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr4);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr4);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.undo();
    expect([...arr]).toEqual(arr3);
    expect(arr.deb_hi).toBe("THERE");
    D.TimeTravel.undo();
    expect([...arr]).toEqual(arr2);
    expect(arr.deb_hi).toBe("there");
    D.TimeTravel.undo();
    expect([...arr]).toEqual(arr1);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.undo();
    expect([...arr]).toEqual(orig);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.undo();
    expect([...arr]).toEqual(orig);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr1);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr2);
    expect(arr.deb_hi).toBe("there");
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr3);
    expect(arr.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr4);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr4);
    expect(arr).not.toHaveProperty("deb_hi");
    const j = D.TimeTravel.journal;
    j.enabled = false;
    const data = S.write({
      now: j.now,
      future: j.future,
      past: j.past,
      data: arr
    });
    expect(JSON.stringify(data)).toMatchSnapshot();
    const restored = S.read(data);
    const rarr = restored.data;
    Object.assign(D.TimeTravel.journal, restored);
    j.enabled = true;
    expect([...rarr]).toEqual(arr4);
    expect(rarr).not.toHaveProperty("deb_hi");
    expect([...arr]).toEqual(arr4);
    D.TimeTravel.undo();
    expect([...rarr]).toEqual(arr3);
    expect(rarr.deb_hi).toBe("THERE");
    expect([...arr]).toEqual(arr4);
    D.TimeTravel.undo();
    expect([...rarr]).toEqual(arr2);
    expect(rarr.deb_hi).toBe("there");
    expect([...arr]).toEqual(arr4);
    D.TimeTravel.undo();
    expect([...rarr]).toEqual(arr1);
    expect(rarr).not.toHaveProperty("deb_hi");
    expect([...arr]).toEqual(arr4);
    D.TimeTravel.undo();
    expect([...rarr]).toEqual(orig);
    expect(rarr).not.toHaveProperty("deb_hi");
    expect([...arr]).toEqual(arr4);
    D.TimeTravel.undo();
    expect([...rarr]).toEqual(orig);
    expect(rarr).not.toHaveProperty("deb_hi");
    expect([...arr]).toEqual(arr4);
    D.TimeTravel.redo();
    expect([...rarr]).toEqual(arr1);
    expect(rarr).not.toHaveProperty("deb_hi");
    expect([...arr]).toEqual(arr4);
    j.enabled = false;
  });
  test("Map tracing", function() {
    const map = new Map([[1, "A"], [2, "B"], [3, "C"]]);
    D.set(map, "deb_hi", "there");
    const orig = [...map];
    D.TimeTravel.reset();
    D.TimeTravel.checkpoint();
    D.set(map, "deb_hi", "THERE");
    map.set(1, "D").delete(2);
    map.delete(3);
    map.set(3, "E").set(4, "F");
    const map1 = [[1, "D"], [3, "E"], [4, "F"]];
    expect([...map]).toEqual(map1);
    D.TimeTravel.checkpoint();
    map.clear();
    const map2 = [];
    expect([...map]).toEqual(map2);
    D.TimeTravel.checkpoint();
    map.set(2, "E");
    map.set(1, "F");
    const map3 = [[2, "E"], [1, "F"]];
    expect([...map]).toEqual(map3);
    D.TimeTravel.undo();
    expect([...map]).toEqual(map2);
    expect(map.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...map]).toEqual(map3);
    expect(map.deb_hi).toBe("THERE");
    D.TimeTravel.undo();
    expect([...map]).toEqual(map2);
    expect(map.deb_hi).toBe("THERE");
    D.TimeTravel.undo();
    expect([...map]).toEqual(map1);
    expect(map.deb_hi).toBe("THERE");
    D.TimeTravel.undo();
    expect([...map]).toEqual(orig);
    expect(map.deb_hi).toBe("there");
    D.TimeTravel.undo();
    expect([...map]).toEqual(orig);
    expect(map.deb_hi).toBe("there");
    D.TimeTravel.redo();
    expect([...map]).toEqual(map1);
    expect(map.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...map]).toEqual(map2);
    expect(map.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...map]).toEqual(map3);
    expect(map.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...map]).toEqual(map3);
    expect(map.deb_hi).toBe("THERE");
    const j = D.TimeTravel.journal;
    j.enabled = false;
    const data = S.write({
      now: j.now,
      future: j.future,
      past: j.past,
      data: map
    });
    expect(JSON.stringify(data)).toMatchSnapshot();
    const restored = S.read(data);
    const rmap = restored.data;
    Object.assign(D.TimeTravel.journal, restored);
    j.enabled = true;
    expect([...rmap]).toEqual(map3);
    expect(rmap.deb_hi).toBe("THERE");
    expect([...map]).toEqual(map3);
    expect(map.deb_hi).toBe("THERE");
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    expect([...rmap]).toEqual(orig);
    expect(rmap.deb_hi).toBe("there");
    expect([...map]).toEqual(map3);
    expect(map.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...rmap]).toEqual(map1);
    expect(rmap.deb_hi).toBe("THERE");
    expect([...map]).toEqual(map3);
    expect(map.deb_hi).toBe("THERE");
    j.enabled = false;
  });
  test("Set tracing", function() {
    const set = new Set([1, 2, 3]);
    const orig = [...set];
    D.set(set, "deb_hi", "there");
    D.TimeTravel.reset();
    D.TimeTravel.checkpoint();
    D.set(set, "deb_hi", "THERE");
    set.delete(1);
    set.delete(3);
    set.add(4);
    set.add(2);
    set.add(1);
    const set1 = [2, 4, 1];
    expect([...set]).toEqual(set1);
    D.TimeTravel.checkpoint();
    set.clear();
    const set2 = [];
    expect([...set]).toEqual(set2);
    D.TimeTravel.checkpoint();
    set.add(8);
    const set3 = [8];
    expect([...set]).toEqual(set3);
    D.TimeTravel.redo();
    expect([...set]).toEqual(set3);
    expect(set.deb_hi).toBe("THERE");
    D.TimeTravel.undo();
    expect([...set]).toEqual(set2);
    expect(set.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...set]).toEqual(set3);
    expect(set.deb_hi).toBe("THERE");
    D.TimeTravel.undo();
    expect([...set]).toEqual(set2);
    expect(set.deb_hi).toBe("THERE");
    D.TimeTravel.undo();
    expect([...set]).toEqual(set1);
    expect(set.deb_hi).toBe("THERE");
    D.TimeTravel.undo();
    expect([...set]).toEqual(orig);
    expect(set.deb_hi).toBe("there");
    D.TimeTravel.undo();
    expect([...set]).toEqual(orig);
    expect(set.deb_hi).toBe("there");
    D.TimeTravel.redo();
    expect([...set]).toEqual(set1);
    expect(set.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...set]).toEqual(set2);
    expect(set.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...set]).toEqual(set3);
    expect(set.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...set]).toEqual(set3);
    expect(set.deb_hi).toBe("THERE");
    const j = D.TimeTravel.journal;
    j.enabled = false;
    const data = S.write({
      now: j.now,
      future: j.future,
      past: j.past,
      data: set
    });
    expect(JSON.stringify(data)).toMatchSnapshot();
    const restored = S.read(data);
    const rset = restored.data;
    Object.assign(D.TimeTravel.journal, restored);
    j.enabled = true;
    expect([...rset]).toEqual(set3);
    expect(rset.deb_hi).toBe("THERE");
    expect([...set]).toEqual(set3);
    expect(set.deb_hi).toBe("THERE");
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    expect([...rset]).toEqual(orig);
    expect(rset.deb_hi).toBe("there");
    expect([...set]).toEqual(set3);
    expect(set.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...rset]).toEqual(set1);
    expect(rset.deb_hi).toBe("THERE");
    expect([...set]).toEqual(set3);
    expect(set.deb_hi).toBe("THERE");
    j.enabled = false;
  });
  test("Closures tracing", function() {
    const savedConsole = global.console;
    try {
      const logs = [];
      global.console = {
        log(...args) {
          D.TimeTravel.Core.arraySaved.push.call(logs, args);
        }
      };
      const mod = trace(D.evalThunk(require("./__fixtures__/counters")));
      const [counter, tr, dir, set] = trace(mod.getCounter());
      console.log("INIT", tr, dir, set);
      let stepNum = 0;
      function counterStep() {
        console.log(
          "STEP",
          stepNum++,
          trace(counter()),
          JSON.stringify({ tr, dir: [...dir], set: [...set] })
        );
      }
      D.TimeTravel.reset();
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
      D.TimeTravel.undo();
      D.TimeTravel.checkpoint();
      counterStep();
      counterStep();
      console.log("SAVE2");
      D.TimeTravel.checkpoint();
      counterStep();
      counterStep();
      console.log("UNDO SAVE2");
      D.TimeTravel.undo();
      D.TimeTravel.undo();
      counterStep();
      counterStep();
      console.log("UNDO SAVE");
      console.log(trace(counter()));
      console.log("UNDO SAVE1");
      D.TimeTravel.undo();
      console.log(trace(counter()));
      expect(logs).toMatchSnapshot();
    } finally {
      global.console = savedConsole;
      D.TimeTravel.reset(false);
    }
  });
});
