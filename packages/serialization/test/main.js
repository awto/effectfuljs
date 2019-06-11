const Lib = require("../src/main");
const assert = require("assert");

describe("plain object output", function() {
  context("for `JSON.stringify` serializable objects", function() {
    it("should have resembling structure", function() {
      const obj1 = { a: 1, b: "b", c: true };
      const res = Lib.write(obj1);
      const exp1 = { f: [["a", 1], ["b", "b"], ["c", true]] };
      assert.deepStrictEqual(res, exp1);
      assert.equal(Lib.stringify(obj1), JSON.stringify(res));
      const obj2 = { obj1 };
      const exp2 = { f: [["obj1", exp1]] };
      assert.deepStrictEqual(Lib.write(obj2), exp2);
      assert.equal(Lib.stringify(obj2), JSON.stringify(exp2));
    });
  });
  it("should have correct format for shared values", function() {
    const root = { val: "hi" };
    root.rec1 = { obj1: root, obj2: root, obj3: { obj: root } };
    root.rec2 = root;
    assert.deepStrictEqual(Lib.write(root), {
      r: 0,
      x: [
        {
          f: [
            ["val", "hi"],
            [
              "rec1",
              {
                f: [
                  ["obj1", { r: 0 }],
                  ["obj2", { r: 0 }],
                  ["obj3", { f: [["obj", { r: 0 }]] }]
                ]
              }
            ],
            ["rec2", { r: 0 }]
          ]
        }
      ]
    });
  });
});

describe("special values", function() {
  it("should correctly restore them", function() {
    const root = { undef: undefined, nul: null, nan: NaN };
    const res = Lib.write(root);
    assert.deepStrictEqual(res, {
      f: [["undef", { $: "undefined" }], ["nul", null], ["nan", { $: "NaN" }]]
    });
    const { undef, nul, nan } = Lib.read(res);
    assert.strictEqual(undef, undefined);
    assert.strictEqual(nul, null);
    assert.ok(typeof nan === "number" && Number.isNaN(nan));
  });
});

describe("reading plain object", function() {
  it("should correctly assign shared values", function() {
    const obj = Lib.read({
      r: 0,
      x: [
        {
          f: [
            ["val", "hi"],
            [
              "rec1",
              {
                f: [
                  ["obj1", { r: 0 }],
                  ["obj2", { r: 0 }],
                  ["obj3", { f: [["obj", { r: 0 }]] }]
                ]
              }
            ],
            ["rec2", { r: 0 }]
          ]
        }
      ]
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
  it("should output `$` attribute", function() {
    const obj1 = new MyObj();
    assert.deepEqual(Lib.write(obj1), {
      $: "MyObj",
      f: [["a", 1], ["b", "b"], ["c", true]]
    });
    function Object() {
      this.a = obj1;
    }
    Lib.regConstructor(Object);
    assert.deepEqual(Lib.write(new Object()), {
      $: "Object_1",
      f: [["a", { f: [["a", 1], ["b", "b"], ["c", true]], $: "MyObj" }]]
    });
  });
  it("should use `$` attribute to resolve a type on read", function() {
    const obj1 = Lib.read({
      $: "MyObj",
      f: [["a", 1], ["b", "b"], ["c", true]]
    });
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
        f: [["l1", { r: 0 }]],
        $: "Obj2",
        x: [{ f: [["back", { r: 0 }]], $: "Obj2" }]
      });
    });
    it("should use `#shared` keys to resolve prototypes on read", function() {
      const obj1 = Lib.read({
        f: [["l1", { r: 0 }]],
        $: "Obj2",
        x: [{ f: [["back", { r: 0 }]], $: "Obj2" }]
      });
      assert.strictEqual(obj1.constructor, Obj2);
      assert.deepEqual(Object.keys(obj1), ["l1"]);
      assert.deepEqual(Object.keys(obj1.l1), ["back"]);
      assert.strictEqual(obj1.l1.constructor, Obj2);
      assert.strictEqual(obj1.l1.back, obj1.l1);
    });
  });
});

describe("prototypes chain", function() {
  it("should correctly store and recover all references", function() {
    class C1 {
      constructor(p) {
        this.p1 = p;
      }
    }
    class C2 extends C1 {
      constructor() {
        super("A");
        this.c1 = new C1(this);
      }
    }
    Lib.regOpaqueObject(C1, "C1", true);
    Lib.regOpaqueObject(C2, "C2", true);
    const obj = new C2();
    const res = Lib.write(obj);
    assert.deepEqual(res, {
      r: 2,
      x: [
        {
          f: [["constructor", { $: "C1", f: [["prototype", { r: 0 }, 3]] }, 2]]
        },
        {
          p: { r: 0 },
          f: [["constructor", { $: "C2", f: [["prototype", { r: 1 }, 3]] }, 2]]
        },
        {
          p: { r: 1 },
          f: [["p1", "A"], ["c1", { p: { r: 0 }, f: [["p1", { r: 2 }]] }]]
        }
      ]
    });
    const r2 = Lib.read(res);
    assert.ok(r2 instanceof C1);
    assert.ok(r2 instanceof C2);
    assert.strictEqual(r2.constructor, C2);
    assert.strictEqual(Object.getPrototypeOf(r2).constructor, C2);
    assert.strictEqual(r2.c1.constructor, C1);
    assert.strictEqual(r2.c1.p1, r2);
    assert.equal(r2.p1, "A");

    class C3 {
      constructor(val) {
        this.a = val;
      }
    }
    Lib.regOpaqueObject(C3.prototype);
    class C4 extends C3 {
      constructor() {
        super("A");
        this.b = "B";
      }
    }
    Lib.regOpaqueObject(C4, "C4", true);
    const obj2 = new C4();
    const res2 = Lib.write(obj2);
    assert.deepEqual(res2, {
      p: { r: 0 },
      f: [["a", "A"], ["b", "B"]],
      x: [
        {
          p: { $: "C3" },
          f: [["constructor", { $: "C4", f: [["prototype", { r: 0 }, 3]] }, 2]]
        }
      ]
    });
    const obj3 = Lib.read(res2);
    assert.ok(obj3 instanceof C3);
    assert.ok(obj3 instanceof C4);
    assert.equal(obj3.a, "A");
    assert.equal(obj3.b, "B");
    assert.equal(
      Object.getPrototypeOf(Object.getPrototypeOf(obj3)),
      Object.getPrototypeOf(Object.getPrototypeOf(obj2))
    );
  });
});

describe("property's descriptor", function() {
  it("should correctly store and recover all settings", function() {
    const a = {};
    let setCalled = 0;
    let getCalled = 0;
    let back;
    let val;
    const descr = {
      set(value) {
        assert.strictEqual(this, back);
        setCalled++;
        val = value;
      },
      get() {
        assert.strictEqual(this, back);
        getCalled++;
        return a;
      }
    };
    Object.defineProperty(a, "prop", descr);
    const psym1 = Symbol("prop");
    const psym2 = Symbol("prop");
    Object.defineProperty(a, psym1, {
      value: "B",
      enumerable: true
    });
    Object.defineProperty(a, psym2, {
      value: "C",
      configurable: true
    });
    Object.defineProperty(a, Symbol.for("prop"), {
      value: "D",
      writable: true
    });
    Lib.regOpaqueObject(descr.set, "dset");
    Lib.regOpaqueObject(descr.get, "dget");
    const opts = {};
    const res = Lib.write(a, opts);
    assert.deepEqual(res, {
      f: [
        ["prop", null, 15, { $: "dget" }, { $: "dset" }],
        [{ name: "prop" }, "B", 5],
        [{ name: "prop", id: 1 }, "C", 6],
        [{ key: "prop" }, "D", 3]
      ]
    });
    back = Lib.read(res, opts);
    assert.deepEqual(Object.getOwnPropertySymbols(back), [
      psym1,
      psym2,
      Symbol.for("prop")
    ]);
    assert.strictEqual(setCalled, 0);
    assert.strictEqual(getCalled, 0);
    back.prop = "A";
    assert.strictEqual(setCalled, 1);
    assert.strictEqual(getCalled, 0);
    assert.strictEqual(val, "A");
    assert.strictEqual(back.prop, a);
    assert.strictEqual(
      Object.getOwnPropertyDescriptor(back, Symbol("prop")),
      void 0
    );
    assert.deepEqual(Object.getOwnPropertyDescriptor(back, "prop"), {
      enumerable: false,
      configurable: false,
      ...descr
    });
    assert.deepEqual(Object.getOwnPropertyDescriptor(back, psym1), {
      value: "B",
      writable: false,
      enumerable: true,
      configurable: false
    });
    assert.deepEqual(Object.getOwnPropertyDescriptor(back, psym2), {
      value: "C",
      writable: false,
      enumerable: false,
      configurable: true
    });
    assert.deepEqual(
      Object.getOwnPropertyDescriptor(back, Symbol.for("prop")),
      {
        value: "D",
        writable: true,
        enumerable: false,
        configurable: false
      }
    );
  });
});

describe("arrays serialization", function() {
  context("without shared references", function() {
    it("should be similar to `JSON.stringify`/`JSON.parse`", function() {
      const obj = { arr: [1, "a", [true, [false, null]], undefined] };
      const res = Lib.write(obj);
      assert.deepStrictEqual(res, {
        f: [["arr", [1, "a", [true, [false, null]], { $: "undefined" }]]]
      });
      const back = Lib.read(res);
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
      f: [["arr", { r: 0 }]],
      x: [[1, "a", [true, [false, null]], { $: "undefined" }, { r: 0 }]]
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
        f: [["set", { r: 0 }]],
        x: [
          {
            $: "Set",
            l: [1, "a", [true, [false, null]], { $: "undefined" }],
            f: [["someNum", 100], ["self", { r: 0 }]]
          }
        ]
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
      x: [
        {
          $: "Set",
          l: [1, "a", [true, [false, null]], { $: "undefined" }, { r: 0 }]
        }
      ]
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
        f: [
          [
            "map",
            {
              $: "Map",
              k: [1, true, { $: "undefined" }],
              v: ["a", [false, null], { $: "undefined" }]
            }
          ]
        ]
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
      x: [
        {
          $: "Map",
          k: [1, true, { $: "undefined" }, { r: 0 }],
          v: ["a", [false, null], { $: "undefined" }, { r: 0 }]
        }
      ]
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
    assert.deepStrictEqual(Lib.write({ a }, { ignore: true }), {});
  });
  it("should output object's name if registered", function() {
    function a() {}
    Lib.regOpaqueObject(a);
    assert.deepStrictEqual(Lib.write({ a }), { f: [["a", { $: "a" }]] });
    Lib.regOpaqueObject(a);
    assert.deepStrictEqual(Lib.read({ f: [["a", { $: "a" }]] }), { a });
    (function() {
      function a() {}
      Lib.regOpaqueObject(a);
      assert.deepStrictEqual(Lib.write({ a }), { f: [["a", { $: "a_1" }]] });
      assert.deepStrictEqual(Lib.read({ f: [["a", { $: "a_1" }]] }), { a });
    })();
  });
});

describe("opaque primitive value serialization", function() {
  it("should output object's name if registered", function() {
    const a = Symbol("a");
    Lib.regOpaquePrim(a, "sa");
    assert.ok(!a[Lib.descriptorSymbol]);
    assert.deepStrictEqual(Lib.write({ a }), {
      f: [["a", { $: "sa" }]]
    });
    Lib.regOpaquePrim(a, "sb");
    assert.deepStrictEqual(Lib.read({ f: [["a", { $: "sa" }]] }), {
      a
    });
    (function() {
      const a = Symbol("a");
      Lib.regOpaquePrim(a, "sa");
      assert.deepStrictEqual(Lib.write({ a }), {
        f: [["a", { $: "sa_1" }]]
      });
      assert.deepStrictEqual(Lib.read({ f: [["a", { $: "sa_1" }]] }), { a });
    })();
  });
});

describe("Symbols serialization", function() {
  it("should keep values", function() {
    const a1 = Symbol("a");
    const a2 = Symbol("a");
    const b = Symbol("b");
    const g = Symbol.for("g");
    const opts = {};
    const res = Lib.write({ a1, a2, b1: b, b2: b, g }, opts);
    assert.deepStrictEqual(res, {
      f: [
        ["a1", { name: "a", $: "Symbol" }],
        ["a2", { name: "a", id: 1, $: "Symbol" }],
        ["b1", { name: "b", $: "Symbol" }],
        ["b2", { name: "b", $: "Symbol" }],
        ["g", { key: "g", $: "Symbol" }]
      ]
    });
    const { a1: ra1, a2: ra2, b1: rb1, b2: rb2, g: rg } = Lib.read(res, opts);
    assert.strictEqual(a1, ra1);
    assert.strictEqual(a2, ra2);
    assert.strictEqual(b, rb1);
    assert.strictEqual(b, rb2);
    assert.strictEqual(rg, g);
    const { a1: la1, a2: la2, b1: lb1, b2: lb2, g: lg } = Lib.read(res, {
      ignore: true
    });
    assert.notStrictEqual(a1, la1);
    assert.notStrictEqual(a2, la2);
    assert.notStrictEqual(lb1, b);
    assert.notStrictEqual(lb2, b);
    assert.strictEqual(lg, g);
    assert.strictEqual(lb1, lb2);
    assert.equal(String(la1), "Symbol(a)");
    assert.equal(String(la2), "Symbol(a)");
    assert.equal(String(lb1), "Symbol(b)");
    assert.equal(String(lb2), "Symbol(b)");
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
    props: false
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
    bind.rec = bind;
    const fjson = Lib.write({ f: bind });
    assert.deepStrictEqual(fjson, {
      f: [["f", { r: 0 }]],
      x: [
        {
          $: "Bind",
          func: { $: "f1" },
          self: { $: "obj" },
          args: [{ $: "arg" }, { $: "arg_1" }],
          f: [
            ["prototype", { f: [["constructor", { r: 0 }, 2]] }, 3],
            ["someNum", 100],
            ["rec", { r: 0 }]
          ]
        }
      ]
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

describe("RegExp", function() {
  it("should be serializable", function() {
    const re1 = /\w+/;
    const re2 = /ho/g;
    const s1 = "uho-ho-ho";
    re2.test(s1);
    const res = Lib.write({ re1, re2 });
    assert.deepEqual(res, {
      f: [
        ["re1", { src: "\\w+", flags: "", $: "RegExp" }],
        ["re2", { src: "ho", flags: "g", last: 3, $: "RegExp" }]
      ]
    });
    const { re1: bre1, re2: bre2 } = Lib.read(res);
    assert.equal(re1.src, bre1.src);
    assert.equal(re1.flags, bre1.flags);
    assert.equal(re1.lastIndex, bre1.lastIndex);
    assert.equal(re2.src, bre2.src);
    assert.equal(re2.flags, bre2.flags);
    assert.equal(re2.lastIndex, bre2.lastIndex);
  });
});

describe("BigInt", function() {
  it("should be serializable", function() {
    const num = 2n ** 10000n;
    const doc = Lib.write({ num });
    assert.equal(doc.f[0][0], "num");
    assert.ok(doc.f[0][1].int.substr);
    assert.equal(doc.f[0][1].int.length, 3011);
    assert.strictEqual(Lib.read(doc).num, num);
  });
});
