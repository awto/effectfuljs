require("./setup");
const trace = require("./run");
trace.silent = true;
const D = require("../main");

describe("ECMAScript containers stepping", function() {
  const mod = trace(D.evalThunk(require("./__fixtures__/es")));
  test("Array#map", function() {
    global.console = { log: jest.fn() };
    console.log("> map:Array", trace(mod.mapTest([1, 2, 3])));
    console.log(
      "> map:TypedArray",
      trace(mod.mapTest(new Int8Array([1, 2, 3])))
    );
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#filter", function() {
    global.console = { log: jest.fn() };
    console.log("> filter:Array", trace(mod.filterTest([1, 2, 3])));
    console.log(
      "> filter:TypedArray",
      trace(mod.filterTest(new Int8Array([1, 2, 3])))
    );
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#forEach", function() {
    global.console = { log: jest.fn() };
    console.log("> forEach:Array", trace(mod.forEachTest([1, 2, 3])));
    console.log(
      "> forEach:TypedArray",
      trace(mod.forEachTest(new Int8Array([1, 2, 3])))
    );
    console.log("> forEach:Set", trace(mod.forEachTest(new Set([1, 2, 3]))));
    console.log(
      "> forEach:Map",
      trace(mod.forEachTest(new Map([[1, "a"], [2, "b"], [3, "c"]])))
    );
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Set#forEach", function() {
    global.console = { log: jest.fn() };
    console.log("> forEach:Set", trace(mod.forEachTest(new Set([1, 2, 3]))));
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Map#forEach", function() {
    global.console = { log: jest.fn() };
    console.log(
      "> forEach:Map",
      trace(mod.forEachTest(new Map([[1, "a"], [2, "b"], [3, "c"]])))
    );
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#reduce", function() {
    global.console = { log: jest.fn() };
    console.log("> reduce:Array", trace(mod.reduceTest(["a", "b", "c"])));
    console.log(
      "> reduce:TypedArray",
      trace(mod.reduceTest(new Int8Array([1, 2, 3])))
    );
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#reduceRight", function() {
    global.console = { log: jest.fn() };
    console.log(
      "> reduceRight:Array",
      trace(mod.reduceRightTest(["a", "b", "c"]))
    );
    console.log(
      "> reduceRight:TypedArray",
      trace(mod.reduceRightTest(new Int8Array([1, 2, 3])))
    );
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#sort", function() {
    global.console = { log: jest.fn() };
    console.log(
      "> sort:Array",
      trace(mod.arraySortTest([2, 3, 1], ["b", "c", "a"]))
    );
    console.log(
      "> sort:TypedArray",
      trace(
        mod.typedArraySortTest(
          new Int8Array([2, 3, 1]),
          new Int8Array([3, 2, 1])
        )
      )
    );
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#some", function() {
    global.console = { log: jest.fn() };
    console.log("> some:Array", trace(mod.someTest([1, 2, 3])));
    console.log(
      "> some:TypedArray",
      trace(mod.someTest(new Int8Array([1, 2, 3])))
    );
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#every", function() {
    global.console = { log: jest.fn() };
    console.log("> every:Array", trace(mod.everyTest([1, 2, 3])));
    console.log(
      "> every:TypedArray",
      trace(mod.everyTest(new Int8Array([1, 2, 3])))
    );
    expect(console.log.mock.calls).toMatchSnapshot();
  });
});
