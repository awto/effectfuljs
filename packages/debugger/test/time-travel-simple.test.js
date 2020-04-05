require("./setup-time-travel");
const trace = require("./run");
const D = require("../main");
const S = require("@effectful/serialization");
const context = D.context;

trace.silent = true;

function compareObj(exp, res) {
  expect(Object.keys(exp)).toEqual(Object.keys(res));
  expect(Object.getOwnPropertyNames(exp)).toEqual(
    Object.getOwnPropertyNames(res)
  );
  expect(Object.getOwnPropertySymbols(exp)).toEqual(
    Object.getOwnPropertySymbols(res)
  );
  expect(Object.entries(exp)).toEqual(Object.entries(res));
  expect(Object.getOwnPropertyDescriptors(exp)).toEqual(
    Object.getOwnPropertyDescriptors(res)
  );
  expect([...D.forInIterator(exp)]).toEqual([...D.forInIterator(res)]);
  expect(Object.getPrototypeOf(exp)).toBe(Object.getPrototypeOf(res));
}

describe("time traveling", function() {
  test("Object tracing", function() {
    const s1 = Symbol("S1");
    const s2 = Symbol("S2");
    const s3 = Symbol("S3");
    S.regOpaquePrim(s1);
    S.regOpaquePrim(s2);
    S.regOpaquePrim(s3);
    const v = {};
    const proto = {};
    v.a = "A";
    proto.a = "PA";
    v.b = "B";
    proto.c = "CA";
    proto[45] = "PD1";
    proto[50] = "PD2";
    v[100] = "d1";
    v[50] = "d2";
    v[60] = "d3";
    v[10] = "d4";
    v.c = "C";
    v[s1] = "S1";
    v[s2] = "S2";
    v[s3] = "S3";
    S.regOpaqueObject(proto, "test#proto");
    const orig = { ...v };
    (context.call = Object.setPrototypeOf), Object.setPrototypeOf(v, proto);
    (context.call = null), Object.setPrototypeOf(orig, proto);
    compareObj(orig, v);
    function get() {
      return "z";
    }
    S.regOpaqueObject(get, "GET");
    D.TimeTravel.reset();
    D.TimeTravel.checkpoint();
    D.del(v, "a");
    D.set(v, "a", "a");
    D.set(v, 50, "D2");
    D.set(v, 55, "d5");
    D.del(v, 60);
    D.del(v, "b");
    D.del(v, s1);
    D.set(v, s2, "s2");
    (context.call = Object.setPrototypeOf), Object.setPrototypeOf(v, null);
    (context.call = Object.defineProperty),
      Object.defineProperty(v, "z", {
        enumerable: true,
        get
      });
    const changed = {
      "10": "d4",
      "50": "D2",
      "55": "d5",
      "100": "d1",
      c: "C",
      a: "a",
      [s2]: "s2",
      [s3]: "S3"
    };
    (context.call = null),
      Object.defineProperty(changed, "z", {
        enumerable: true,
        configurable: true,
        get
      });
    Object.setPrototypeOf(changed, null);
    compareObj(changed, v);
    D.TimeTravel.checkpoint();
    (context.call = Object.assign),
      Object.assign(v, { a: "_a", [s2]: "_s", d: "D", [60]: "D3", [s1]: "S1" });
    (context.call = Object.defineProperties),
      Object.defineProperties(v, {
        z: {
          enumerable: true,
          value: "Z"
        }
      });
    const changed2 = {
      "10": "d4",
      "50": "D2",
      "60": "D3",
      "55": "d5",
      "100": "d1",
      c: "C",
      a: "_a",
      [s2]: "_s",
      [s3]: "S3",
      [s1]: "S1"
    };
    (context.call = null),
      Object.defineProperty(changed2, "z", {
        enumerable: true,
        configurable: true,
        value: "Z"
      });
    changed2.d = "D";
    Object.setPrototypeOf(changed2, null);
    compareObj(changed2, v);
    D.TimeTravel.undo();
    compareObj(changed, v);
    D.TimeTravel.undo();
    compareObj(orig, v);
    D.TimeTravel.redo();
    compareObj(changed, v);
    D.TimeTravel.redo();
    compareObj(changed2, v);
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
    compareObj(changed2, v);
    compareObj(changed2, v2);
    D.TimeTravel.undo();
    compareObj(changed2, v);
    compareObj(changed, v2);
    D.TimeTravel.undo();
    compareObj(changed2, v);
    compareObj(orig, v2);
    D.TimeTravel.redo();
    compareObj(changed, v2);
    compareObj(changed2, v);
    j.enabled = false;
  });
  test("Array tracing", function() {
    const arr = [1, 2, 3, 4, 5];
    const orig = [...arr];
    D.TimeTravel.reset();
    D.TimeTravel.checkpoint();
    (context.call = arr.splice), arr.splice(2, 2, "A", "B", "C");
    const arr1 = [1, 2, "A", "B", "C", 5];
    expect([...arr]).toEqual(arr1);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.checkpoint();
    D.set(arr, "deb_hi", "there");
    (context.call = arr.push), arr.push("Z");
    (context.call = arr.push), arr.push("Z1", "Z2");
    (context.call = arr.unshift), arr.unshift("A");
    (context.call = arr.unshift), arr.unshift("A1", "A2");
    const arr2 = ["A1", "A2", "A", 1, 2, "A", "B", "C", 5, "Z", "Z1", "Z2"];
    expect([...arr]).toEqual(arr2);
    expect(arr.deb_hi).toBe("there");
    D.TimeTravel.checkpoint();
    D.set(arr, "deb_hi", "THERE");
    context.call = arr.pop;
    const l = arr.pop();
    context.call = arr.shift;
    const f = arr.shift();
    D.set(arr, 0, "a");
    D.set(arr, arr.length - 3, "z");
    D.set(arr, "length", arr.length - 2);
    const arr3 = ["a", "A", 1, 2, "A", "B", "C", "z"];
    expect([...arr]).toEqual(arr3);
    expect(arr.deb_hi).toBe("THERE");
    D.TimeTravel.checkpoint();
    (context.call = arr.sort), arr.sort();
    D.del(arr, "deb_hi");
    const arr4 = [1, 2, "A", "A", "B", "C", "a", "z"];
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
    const map = new Map([
      [1, "A"],
      [2, "B"],
      [3, "C"]
    ]);
    D.set(map, "deb_hi", "there");
    const orig = [...map];
    D.TimeTravel.reset();
    D.TimeTravel.checkpoint();
    D.set(map, "deb_hi", "THERE");
    (context.call = map.set), map.set(1, "D");
    (context.call = map.delete), map.delete(2);
    (context.call = map.delete), map.delete(3);
    (context.call = map.set), map.set(3, "E");
    (context.call = map.set), map.set(4, "F");
    const map1 = [
      [1, "D"],
      [3, "E"],
      [4, "F"]
    ];
    expect([...map]).toEqual(map1);
    D.TimeTravel.checkpoint();
    (context.call = map.clear), map.clear();
    const map2 = [];
    expect([...map]).toEqual(map2);
    D.TimeTravel.checkpoint();
    (context.call = map.set), map.set(2, "E");
    (context.call = map.set), map.set(1, "F");
    const map3 = [
      [2, "E"],
      [1, "F"]
    ];
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
    context.call = set.delete;
    set.delete(1);
    context.call = set.delete;
    set.delete(3);
    context.call = set.add;
    set.add(4);
    context.call = set.add;
    set.add(2);
    context.call = set.add;
    set.add(1);
    const set1 = [2, 4, 1];
    expect([...set]).toEqual(set1);
    D.TimeTravel.checkpoint();
    context.call = set.clear;
    set.clear();
    const set2 = [];
    expect([...set]).toEqual(set2);
    D.TimeTravel.checkpoint();
    context.call = set.add;
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
  test("WeakSet tracing", function() {
    let objs = Array.from(Array(3), (_, x) => ({ x }));
    let objs2 = Array.from(Array(2), (_, y) => ({ y }));
    function state0(set) {
      expect(set.has(objs2[0])).toBeFalsy();
      expect(set.has(objs2[1])).toBeFalsy();
      expect(set.has(objs[0])).toBeFalsy();
      expect(set.has(objs[1])).toBeFalsy();
      expect(set.has(objs[2])).toBeFalsy();
      expect(set).not.toHaveProperty("deb_hi");
    }
    function state1(set) {
      expect(set.has(objs2[0])).toBeFalsy();
      expect(set.has(objs2[1])).toBeFalsy();
      expect(set.has(objs[0])).toBeTruthy();
      expect(set.has(objs[1])).toBeTruthy();
      expect(set.has(objs[2])).toBeTruthy();
      expect(set.deb_hi).toBe("there");
    }
    function state2(set) {
      expect(set.has(objs2[0])).toBeTruthy();
      expect(set.has(objs2[1])).toBeTruthy();
      expect(set.has(objs[0])).toBeTruthy();
      expect(set.has(objs[1])).toBeFalsy();
      expect(set.has(objs[2])).toBeFalsy();
      expect(set.deb_hi).toBe("THERE");
    }
    const set = new WeakSet();
    state0(set);
    D.TimeTravel.reset();
    D.TimeTravel.checkpoint();
    D.set(set, "deb_hi", "there");
    for (const i of objs) {
      context.call = set.add;
      set.add(i);
    }
    state1(set);
    D.TimeTravel.checkpoint();
    D.set(set, "deb_hi", "THERE");
    context.call = set.delete;
    set.delete(objs[1]);
    context.call = set.delete;
    set.delete(objs[2]);
    context.call = set.add;
    set.add(objs2[0]);
    context.call = set.add;
    set.add(objs2[1]);
    state2(set);
    D.TimeTravel.redo();
    state2(set);
    D.TimeTravel.undo();
    state1(set);
    D.TimeTravel.undo();
    state0(set);
    D.TimeTravel.undo();
    state0(set);
    D.TimeTravel.redo();
    state1(set);
    D.TimeTravel.redo();
    state2(set);
    D.TimeTravel.redo();
    state2(set);
    D.TimeTravel.undo();
    state1(set);
    D.TimeTravel.undo();
    state0(set);
    const j = D.TimeTravel.journal;
    j.enabled = false;
    const data = S.write({
      now: j.now,
      future: j.future,
      past: j.past,
      data: set,
      objs,
      objs2
    });
    expect(JSON.stringify(data)).toMatchSnapshot();
    const restored = S.read(data);
    const rset = restored.data;
    objs = restored.objs;
    objs.forEach((o) => (o.retored = true));
    objs2 = restored.objs2;
    objs2.forEach((o) => (o.retored = true));
    Object.assign(D.TimeTravel.journal, restored);
    j.enabled = true;
    state0(rset);
    state0(set);
    D.TimeTravel.undo();
    state0(rset);
    state0(set);
    D.TimeTravel.redo();
    state1(rset);
    state0(set);
    D.TimeTravel.redo();
    state2(rset);
    state0(set);
    D.TimeTravel.redo();
    state2(rset);
    state0(set);
    D.TimeTravel.undo();
    state1(rset);
    state0(set);
    D.TimeTravel.undo();
    state0(rset);
    state0(set);
    D.TimeTravel.undo();
    state0(rset);
    state0(set);
    j.enabled = false;
  });
  test("WeakMap tracing", function() {
    let objs = Array.from(Array(3), (_, x) => ({ x }));
    let objs2 = Array.from(Array(2), (_, y) => ({ y }));
    function state0(map) {
      expect(map.get(objs2[0])).toBeFalsy();
      expect(map.get(objs2[1])).toBeFalsy();
      expect(map.get(objs[0])).toBeFalsy();
      expect(map.get(objs[1])).toBeFalsy();
      expect(map.get(objs[2])).toBeFalsy();
      expect(map).not.toHaveProperty("deb_hi");
    }
    function state1(map) {
      expect(map.get(objs2[0])).toBeFalsy();
      expect(map.get(objs2[1])).toBeFalsy();
      expect(map.get(objs[0])).toBe(objs[0]);
      expect(map.get(objs[1])).toBe(objs[1]);
      expect(map.get(objs[2])).toBe(objs[2]);
      expect(map.deb_hi).toBe("there");
    }
    function state2(map) {
      expect(map.get(objs2[0])).toBe(objs2[0]);
      expect(map.get(objs2[1])).toBe(objs2[1]);
      expect(map.get(objs[0])).toBe(objs[0]);
      expect(map.get(objs[1])).toBeFalsy();
      expect(map.get(objs[2])).toBeFalsy();
      expect(map.deb_hi).toBe("THERE");
    }
    const map = new WeakMap();
    state0(map);
    D.TimeTravel.reset();
    D.TimeTravel.checkpoint();
    D.set(map, "deb_hi", "there");
    for (const i of objs) {
      context.call = map.set;
      map.set(i, i);
    }
    state1(map);
    D.TimeTravel.checkpoint();
    D.set(map, "deb_hi", "THERE");
    context.call = map.delete;
    map.delete(objs[1]);
    context.call = map.delete;
    map.delete(objs[2]);
    context.call = map.set;
    map.set(objs2[0], objs2[0]);
    context.call = map.set;
    map.set(objs2[1], objs2[1]);
    state2(map);
    D.TimeTravel.redo();
    state2(map);
    D.TimeTravel.undo();
    state1(map);
    D.TimeTravel.undo();
    state0(map);
    D.TimeTravel.undo();
    state0(map);
    D.TimeTravel.redo();
    state1(map);
    D.TimeTravel.redo();
    state2(map);
    D.TimeTravel.redo();
    state2(map);
    D.TimeTravel.undo();
    state1(map);
    D.TimeTravel.undo();
    state0(map);
    const j = D.TimeTravel.journal;
    j.enabled = false;
    const data = S.write({
      now: j.now,
      future: j.future,
      past: j.past,
      data: map,
      objs,
      objs2
    });
    expect(JSON.stringify(data)).toMatchSnapshot();
    const restored = S.read(data);
    const rmap = restored.data;
    objs = restored.objs;
    objs.forEach((o) => (o.retored = true));
    objs2 = restored.objs2;
    objs2.forEach((o) => (o.retored = true));
    Object.assign(D.TimeTravel.journal, restored);
    j.enabled = true;
    state0(rmap);
    state0(map);
    D.TimeTravel.undo();
    state0(rmap);
    state0(map);
    D.TimeTravel.redo();
    state1(rmap);
    state0(map);
    D.TimeTravel.redo();
    state2(rmap);
    state0(map);
    D.TimeTravel.redo();
    state2(rmap);
    state0(map);
    D.TimeTravel.undo();
    state1(rmap);
    state0(map);
    D.TimeTravel.undo();
    state0(rmap);
    state0(map);
    D.TimeTravel.undo();
    state0(rmap);
    state0(map);
    j.enabled = false;
  });
  test("Typed arrays tracing", function() {
    const arr = new Int8Array([1, 2, 3]);
    const orig = [...arr];
    D.TimeTravel.reset();
    D.TimeTravel.checkpoint();
    D.set(arr, 0, 10);
    const arr1 = [10, 2, 3];
    expect([...arr]).toEqual(arr1);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.checkpoint();
    (context.call = arr.set), arr.set([30, 20], 1);
    const arr2 = [10, 30, 20];
    D.set(arr, "deb_hi", "there");
    expect([...arr]).toEqual(arr2);
    expect(arr.deb_hi).toBe("there");
    D.TimeTravel.checkpoint();
    (context.call = arr.reverse), arr.reverse();
    const arr3 = [20, 30, 10];
    D.set(arr, "deb_hi", "THERE");
    expect([...arr]).toEqual(arr3);
    expect(arr.deb_hi).toBe("THERE");
    D.TimeTravel.checkpoint();
    (context.call = arr.sort), arr.sort();
    const arr4 = [10, 20, 30];
    expect([...arr]).toEqual(arr4);
    expect(arr.deb_hi).toBe("THERE");
    D.TimeTravel.checkpoint();
    (context.call = arr.fill), arr.fill(100);
    const arr5 = [100, 100, 100];
    D.del(arr, "deb_hi");
    expect([...arr]).toEqual(arr5);
    expect(arr).not.toHaveProperty("deb_hi");
    const j = D.TimeTravel.journal;
    D.TimeTravel.undo();
    expect([...arr]).toEqual(arr4);
    expect(arr.deb_hi).toBe("THERE");
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
    expect(arr.deb_hi).toBe("THERE");
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr5);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr5);
    expect(arr).not.toHaveProperty("deb_hi");
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
    expect([...rarr]).toEqual(arr5);
    expect(rarr).not.toHaveProperty("deb_hi");
    expect([...arr]).toEqual(arr5);
    expect(arr).not.toHaveProperty("deb_hi");
    D.TimeTravel.undo();
    expect([...rarr]).toEqual(arr4);
    expect(rarr.deb_hi).toBe("THERE");
    expect([...arr]).toEqual(arr5);
    expect(arr).not.toHaveProperty("deb_hi");
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
      const mod = trace(D.force(require("./__fixtures__/counters")));
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
