require("./setup-time-travel-fwd");
const D = require("../main");
const S = require("@effectful/serialization");

describe("forward time traveling", function() {
  test("Object tracing", function() {
    D.TimeTravel.reset();
    const s = Symbol("S");
    S.regOpaquePrim(s);
    const v = D.wrap({ a: "A", b: "B", c: "C", [s]: "S" });
    const protoUnwrapped = {};
    const proto = D.wrap(protoUnwrapped);
    const orig = { ...v };
    Object.setPrototypeOf(v, proto);
    expect(Object.getPrototypeOf(v)).toBe(proto);
    D.TimeTravel.checkpoint();
    delete v.a;
    v.a = "a";
    delete v.b;
    v[s] = "s";
    Object.setPrototypeOf(v, null);
    const changed = {
      a: "a",
      c: "C",
      [s]: "s",
      [D.TimeTravel.traceDataSymbol]: v[D.TimeTravel.traceDataSymbol]
    };
    expect({ ...v }).toStrictEqual(changed);
    expect(Object.getPrototypeOf(v)).toBe(null);
    D.TimeTravel.undo();
    expect({ ...v }).toStrictEqual(orig);
    expect(Object.getPrototypeOf(v)).toBe(proto);
    D.TimeTravel.redo();
    expect({ ...v }).toStrictEqual(changed);
    expect(Object.getPrototypeOf(v)).toBe(null);
    const j = D.TimeTravel.journal;
    const data = S.write({
      now: j.now,
      future: j.future,
      past: j.past,
      data: v
    });
    expect(JSON.stringify(data)).toMatchSnapshot();

    D.TimeTravel.reset();
    const restored = S.read(data);
    const v2 = restored.data;
    const orig2 = {
      ...orig,
      [D.TimeTravel.traceDataSymbol]: v2[D.TimeTravel.traceDataSymbol]
    };
    const changed2 = {
      ...changed,
      [D.TimeTravel.traceDataSymbol]: v2[D.TimeTravel.traceDataSymbol]
    };
    Object.assign(D.TimeTravel.journal, restored);
    expect({ ...v2 }).toStrictEqual(changed);
    expect(Object.getPrototypeOf(v2)).toBe(null);
    expect({ ...v }).toStrictEqual(changed2);
    expect(Object.getPrototypeOf(v)).toBe(null);
    D.TimeTravel.undo();
    expect({ ...v }).toStrictEqual(changed);
    expect(Object.getPrototypeOf(v)).toBe(null);
    expect({ ...v2 }).toStrictEqual(orig2);
    expect(Object.getPrototypeOf(v2)).not.toBe(proto);
    D.TimeTravel.redo();
    expect({ ...v2 }).toStrictEqual(changed2);
    expect(Object.getPrototypeOf(v2)).toBe(null);
    expect({ ...v }).toStrictEqual(changed);
    expect(Object.getPrototypeOf(v)).toBe(null);
  });
  test("Array tracing", function() {
    D.TimeTravel.reset();
    const arr = D.wrap([1, 2, 3, 4, 5]);
    const orig = [...arr];
    D.TimeTravel.checkpoint();
    arr.splice(2, 2, "A", "B", "C");
    const arr1 = [...arr];
    D.TimeTravel.checkpoint();
    arr.push("Z");
    arr.unshift("A");
    const arr2 = [...arr];
    D.TimeTravel.checkpoint();
    arr[0] = "a";
    arr[arr.length - 1] = "z";
    const arr3 = [...arr];
    D.TimeTravel.undo();
    expect([...arr]).toEqual(arr2);
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr3);
    D.TimeTravel.undo();
    expect([...arr]).toEqual(arr2);
    D.TimeTravel.undo();
    expect([...arr]).toEqual(arr1);
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr2);
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr3);
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr3);
    D.TimeTravel.undo();
    expect([...arr]).toEqual(arr2);
    D.TimeTravel.undo();
    expect([...arr]).toEqual(arr1);
    D.TimeTravel.undo();
    expect([...arr]).toEqual(orig);
    D.TimeTravel.undo();
    expect([...arr]).toEqual(orig);
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr1);
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr2);
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr3);
    D.TimeTravel.redo();
    expect([...arr]).toEqual(arr3);
    const j = D.TimeTravel.journal;
    const data = S.write({
      now: j.now,
      future: j.future,
      past: j.past,
      data: arr
    });
    expect(JSON.stringify(data)).toMatchSnapshot();
    D.TimeTravel.reset();
    const restored = S.read(data);
    const rarr = restored.data;
    Object.assign(D.TimeTravel.journal, restored);
    expect([...rarr]).toEqual(arr3);
    expect([...arr]).toEqual(arr3);
    D.TimeTravel.undo();
    expect([...rarr]).toEqual(arr2);
    expect([...arr]).toEqual(arr3);
    D.TimeTravel.undo();
    expect([...rarr]).toEqual(arr1);
    expect([...arr]).toEqual(arr3);
    D.TimeTravel.undo();
    expect([...rarr]).toEqual(orig);
    expect([...arr]).toEqual(arr3);
    D.TimeTravel.undo();
    expect([...rarr]).toEqual(orig);
    expect([...arr]).toEqual(arr3);
    D.TimeTravel.redo();
    expect([...rarr]).toEqual(arr1);
    expect([...arr]).toEqual(arr3);
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
    const map1 = [...map];
    D.TimeTravel.checkpoint();
    map.clear();
    const map2 = [...map];
    D.TimeTravel.checkpoint();
    map.set(2, "E");
    map.set(1, "F");
    const map3 = [...map];
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
    const data = S.write({
      now: j.now,
      future: j.future,
      past: j.past,
      data: map
    });
    expect(JSON.stringify(data)).toMatchSnapshot();
    D.TimeTravel.reset();
    const restored = S.read(data);
    const rmap = restored.data;
    Object.assign(D.TimeTravel.journal, restored);
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
    const set1 = [...set];
    D.TimeTravel.checkpoint();
    set.clear();
    const set2 = [...set];
    D.TimeTravel.checkpoint();
    set.clear();
    set.add(8);
    const set3 = [...set];
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
    const data = S.write({
      now: j.now,
      future: j.future,
      past: j.past,
      data: set
    });
    expect(JSON.stringify(data)).toMatchSnapshot();
    D.TimeTravel.reset();
    const restored = S.read(data);
    const rset = restored.data;
    Object.assign(D.TimeTravel.journal, restored);
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
  });
});
