const Lib = require("../src/main");
const assert = require("assert");

describe("plain object output", function() {
  context("for `JSON.stringify` serializable objects", function() {
    it("should be a deep clone", function() {
      const obj1 = { a: 1, b: "b", c: true };
      const res = Lib.write(obj1);
      assert.notStrictEqual(res, obj1);
      assert.deepStrictEqual(res, { d: obj1 });
      assert.equal(Lib.stringify(obj1), JSON.stringify({ d: obj1 }));
      const obj2 = { obj1 };
      assert.deepStrictEqual(Lib.write(obj2), { d: { obj1: { d: obj1 } } });
      assert.equal(
        Lib.stringify(obj2),
        JSON.stringify({ d: { obj1: { d: obj1 } } })
      );
    });
  });
  it("should have correct format for shared values", function() {
    const root = { val: "hi" };
    root.rec1 = { obj1: root, obj2: root, obj3: { obj: root } };
    root.rec2 = root;
    assert.deepStrictEqual(Lib.write(root), {
      r: 0,
      x: {
        0: {
          d: {
            val: "hi",
            rec1: {
              d: {
                obj1: { r: 0 },
                obj2: { r: 0 },
                obj3: { d: { obj: { r: 0 } } }
              }
            },
            rec2: { r: 0 }
          }
        }
      }
    });
  });
});

describe("reading plain object", function() {
  it("should correctly assign shared values", function() {
    const obj = Lib.read({
      r: 0,
      x: {
        0: {
          d: {
            val: "hi",
            rec1: {
              d: {
                obj1: { r: 0 },
                obj2: { r: 0 },
                obj3: { d: { obj: { r: 0 } } }
              }
            },
            rec2: { r: 0 }
          }
        }
      }
    });
    assert.strictEqual(
      Object.keys(obj)
        .sort()
        .join(),
      "rec1,rec2,val"
    );
    assert.strictEqual(obj.val, "hi");
    assert.strictEqual(
      Object.keys(obj.rec1)
        .sort()
        .join(),
      "obj1,obj2,obj3"
    );
    assert.strictEqual(
      Object.keys(obj.rec1.obj3)
        .sort()
        .join(),
      "obj"
    );
    assert.strictEqual(obj.rec2, obj);
    assert.strictEqual(obj.rec1.obj1, obj);
    assert.strictEqual(obj.rec1.obj2, obj);
    assert.strictEqual(obj.rec1.obj3.obj, obj);
  });
});

describe("object with parent", function() {
  function MyObj() {
    this.a = 1;
    this.b = "b";
    this.c = true;
  }
  Lib.regConstructor(MyObj);
  it("should output `t` attribute", function() {
    const obj1 = new MyObj();
    assert.deepEqual(Lib.write(obj1), {
      $: "MyObj",
      d: {
        a: 1,
        b: "b",
        c: true
      }
    });
    function Object() {
      this.a = obj1;
    }
    Lib.regConstructor(Object);
    assert.deepEqual(Lib.write(new Object()), {
      $: "Object_1",
      d: {
        a: { $: "MyObj", d: { a: 1, b: "b", c: true } }
      }
    });
  });
  it("should use `t` attribute to resolve prototype on read", function() {
    const obj1 = Lib.read({ $: "MyObj", d: { a: 1, b: "b", c: true } });
    assert.strictEqual(obj1.constructor, MyObj);
    assert.equal(
      Object.keys(obj1)
        .sort()
        .join(),
      "a,b,c"
    );
    assert.strictEqual(obj1.a, 1);
    assert.strictEqual(obj1.b, "b");
    assert.strictEqual(obj1.c, true);
  });
  context("for shared values", function() {
    function Obj2() {}
    Lib.regConstructor(Obj2);
    it("should write shared values in `shared` map", function() {
      const root = new Obj2();
      root.l1 = new Obj2();
      root.l1.back = root.l1;
      assert.deepStrictEqual(Lib.write(root), {
        $: "Obj2",
        d: {
          l1: { r: 0 }
        },
        x: {
          0: {
            $: "Obj2",
            d: {
              back: { r: 0 }
            }
          }
        }
      });
    });
    it("should use `#shared` keys to resolve prototypes on read", function() {
      const obj1 = Lib.read({
        $: "Obj2",
        d: { l1: { r: 0 } },
        x: {
          0: {
            $: "Obj2",
            d: { back: { r: 0 } }
          }
        }
      });
      assert.strictEqual(obj1.constructor, Obj2);
      assert.deepEqual(Object.keys(obj1), ["l1"]);
      assert.deepEqual(Object.keys(obj1.l1), ["back"]);
      assert.strictEqual(obj1.l1.constructor, Obj2);
      assert.strictEqual(obj1.l1.back, obj1.l1);
    });
  });
});

describe("arrays serialization", function() {
  context("without shared references", function() {
    it("should be similar to `JSON.stringify`/`JSON.parse`", function() {
      const obj = { arr: [1, "a", [true, [false, null]], undefined] };
      const res = Lib.write(obj);
      assert.notStrictEqual(res.d, obj);
      assert.deepStrictEqual(res, { d: obj });
      const back = Lib.read(res);
      assert.notStrictEqual(res.d, back);
      assert.deepStrictEqual(obj, back);
    });
    it("doesn't support Array as root", function() {
      assert.throws(() => Lib.write([1, 2]), TypeError);
    });
  });
  it("should handle shared references", function() {
    const obj = { arr: [1, "a", [true, [false, null]], undefined] };
    obj.arr.push(obj.arr);
    const res = Lib.write(obj);
    assert.notStrictEqual(res, obj);
    assert.deepStrictEqual(res, {
      d: { arr: { r: 0 } },
      x: {
        0: [1, "a", [true, [false, null]], undefined, { r: 0 }]
      }
    });
    const back = Lib.read(res);
    assert.notStrictEqual(res, back);
    assert.deepStrictEqual(obj, back);
  });
});

describe("`Set` serialization", function() {
  context("without shared references", function() {
    it("should output `JSON.stringify` serializable object", function() {
      const arr = [1, "a", [true, [false, null]], undefined];
      const obj = { set: new Set(arr) };
      obj.set.someNum = 100;
      obj.set.self = obj.set;
      const res = Lib.write(obj);
      assert.deepStrictEqual(res, {
        d: { set: { r: 0 } },
        x: {
          "0": {
            $: "Set",
            l: [1, "a", [true, [false, null]], undefined],
            d: {
              someNum: 100,
              self: { r: 0 }
            }
          }
        }
      });
      const back = Lib.read(res);
      assert.deepStrictEqual(obj, back);
    });
  });
  it("should handle shared references", function() {
    const obj = new Set([1, "a", [true, [false, null]], undefined]);
    obj.add(obj);
    const res = Lib.write(obj);
    assert.notStrictEqual(res, obj);
    assert.deepStrictEqual(res, {
      r: 0,
      x: {
        0: {
          $: "Set",
          l: [1, "a", [true, [false, null]], undefined, { r: 0 }]
        }
      }
    });
    const back = Lib.read(res);
    assert.notStrictEqual(res, back);
    assert.deepStrictEqual(obj, back);
  });
});

describe("`Map` serialization", function() {
  context("without shared references", function() {
    it("should output `JSON.stringify` serializable object", function() {
      const arr = [[1, "a"], [true, [false, null]], [undefined]];
      const obj = { map: new Map(arr) };
      const res = Lib.write(obj);
      assert.deepStrictEqual(res, {
        d: {
          map: {
            $: "Map",
            k: [1, true, undefined],
            v: ["a", [false, null], undefined]
          }
        }
      });
      const back = Lib.read(res);
      assert.deepStrictEqual(obj, back);
    });
  });
  it("should handle shared references", function() {
    const obj = new Map([[1, "a"], [true, [false, null]], [undefined]]);
    obj.set(obj, obj);
    const res = Lib.write(obj);
    assert.notStrictEqual(res, obj);
    assert.deepStrictEqual(res, {
      r: 0,
      x: {
        0: {
          $: "Map",
          k: [1, true, undefined, { r: 0 }],
          v: ["a", [false, null], undefined, { r: 0 }]
        }
      }
    });
    const back = Lib.read(res);
    assert.notStrictEqual(res, back);
    assert.deepStrictEqual(obj, back);
  });
});

describe("opaque objects serialization", function() {
  it("should throw for not registered objects", function() {
    function a() {}
    assert.throws(() => Lib.write({ a }), TypeError);
  });
  it("should not throw if `ignore:true`", function() {
    function a() {}
    assert.deepStrictEqual(Lib.write({ a }, { ignore: true }), {
      d: { a: undefined }
    });
  });
  it("should output object's name if registered", function() {
    function a() {}
    Lib.regOpaqueObject(a);
    assert.deepStrictEqual(Lib.write({ a }), { d: { a: { i: "a" } } });
    Lib.regOpaqueObject(a);
    assert.deepStrictEqual(Lib.read({ d: { a: { i: "a" } } }), { a });
    (function() {
      function a() {}
      Lib.regOpaqueObject(a);
      assert.deepStrictEqual(Lib.write({ a }), { d: { a: { i: "a_1" } } });
      assert.deepStrictEqual(Lib.read({ d: { a: { i: "a_1" } } }), { a });
    })();
  });
});

describe("opaque primitive value serialization", function() {
  it("should output object's name if registered", function() {
    const a = Symbol("a");
    Lib.regOpaquePrim(a, "sa");
    assert.ok(!a[Lib.descriptorSymbol]);
    assert.deepStrictEqual(Lib.write({ a }), { d: { a: { i: "sa" } } });
    Lib.regOpaquePrim(a, "sb");
    assert.deepStrictEqual(Lib.read({ d: { a: { i: "sa" } } }), { a });
    (function() {
      const a = Symbol("a");
      Lib.regOpaquePrim(a, "sa");
      assert.deepStrictEqual(Lib.write({ a }), { d: { a: { i: "sa_1" } } });
      assert.deepStrictEqual(Lib.read({ d: { a: { i: "sa_1" } } }), { a });
    })();
  });
});

describe("type with `$$typeof` attribute", function() {
  Lib.regDescriptor({
    name: "hundred",
    typeofTag: 100,
    read(ctx, json) {
      return { $$typeof: 100 };
    },
    write(ctx, value) {
      return { $: "hundred" };
    },
    keys: false
  });
  it("should use overriden methods", function() {
    assert.deepStrictEqual(Lib.write({ $$typeof: 100 }), {
      $: "hundred"
    });
    assert.deepStrictEqual(Lib.read({ $: "hundred" }), { $$typeof: 100 });
  });
});

describe("bind function arguments", function() {
  it("should be serializable", function() {
    const obj = {};
    function f1(a1, a2, a3) {
      return [this, a1, a2, a3];
    }
    const a1 = {},
      a2 = {},
      a3 = {};
    Lib.regOpaqueObject(obj, "obj");
    Lib.regOpaqueObject(f1);
    Lib.regOpaqueObject(a1, "arg");
    Lib.regOpaqueObject(a2, "arg");
    const bind = Lib.bind(f1, obj, a1, a2);
    bind.someNum = 100;
    bind.self = bind;
    const fjson = Lib.write({ f: bind });
    assert.deepStrictEqual(fjson, {
      d: { f: { r: 0 } },
      x: {
        "0": {
          $: "Bind",
          func: { i: "f1" },
          self: { i: "obj" },
          args: [{ i: "arg" }, { i: "arg_1" }],
          d: {
            someNum: 100,
            self: { r: 0 }
          }
        }
      }
    });
    const f2 = Lib.read(fjson).f;
    assert.notStrictEqual(f1, f2);
    const res = f2(a3);
    assert.strictEqual(res.length, 4);
    const [robj, ra1, ra2, ra3] = res;
    assert.strictEqual(obj, robj);
    assert.strictEqual(a1, ra1);
    assert.strictEqual(a2, ra2);
    assert.strictEqual(a3, ra3);
  });
});

describe("BigInt", function() {
  it("should be serializable", function() {
    const num = 2n ** 10000n;
    const doc = Lib.write({ num });
    assert.ok(doc.d.num.int.substr);
    assert.equal(doc.d.num["int"].length, 3011);
    assert.strictEqual(Lib.read(doc).num, num);
  });
});
