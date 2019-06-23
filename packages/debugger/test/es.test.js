require("./setup");
const trace = require("./run").bind(null, true);
const D = require("../main");

describe("ECMAScript containers stepping", function() {
  D.evalThunk(require("./__fixtures__/es"));
  const mod = trace(true);
  test("Array#map", function() {
    global.console = { log: jest.fn() };
    mod.mapTest([1, 2, 3]);
    console.log("> map:Array", trace());
    mod.mapTest(new Int8Array([1, 2, 3]));
    console.log("> map:TypedArray", trace());
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#filter", function() {
    global.console = { log: jest.fn() };
    mod.filterTest([1, 2, 3]);
    console.log("> filter:Array", trace());
    mod.filterTest(new Int8Array([1, 2, 3]));
    console.log("> filter:TypedArray", trace());
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#forEach", function() {
    global.console = { log: jest.fn() };
    mod.forEachTest([1, 2, 3]);
    console.log("> forEach:Array", trace());
    mod.forEachTest(new Int8Array([1, 2, 3]));
    console.log("> forEach:TypedArray", trace());
    mod.forEachTest(new Set([1, 2, 3]));
    console.log("> forEach:Set", trace());
    mod.forEachTest(new Map([[1, "a"], [2, "b"], [3, "c"]]));
    console.log("> forEach:Map", trace());
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Set#forEach", function() {
    global.console = { log: jest.fn() };
    mod.forEachTest(new Set([1, 2, 3]));
    console.log("> forEach:Set", trace());
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Map#forEach", function() {
    global.console = { log: jest.fn() };
    mod.forEachTest(new Map([[1, "a"], [2, "b"], [3, "c"]]));
    console.log("> forEach:Map", trace());
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#reduce", function() {
    global.console = { log: jest.fn() };
    mod.reduceTest(["a", "b", "c"]);
    console.log("> reduce:Array", trace());
    mod.reduceTest(new Int8Array([1, 2, 3]));
    console.log("> reduce:TypedArray", trace());
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#reduceRight", function() {
    global.console = { log: jest.fn() };
    mod.reduceRightTest(["a", "b", "c"]);
    console.log("> reduceRight:Array", trace());
    mod.reduceRightTest(new Int8Array([1, 2, 3]));
    console.log("> reduceRight:TypedArray", trace());
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#sort", function() {
    global.console = { log: jest.fn() };
    mod.arraySortTest([2, 3, 1], ["b", "c", "a"]);
    console.log("> sort:Array", trace());
    mod.typedArraySortTest(new Int8Array([2, 3, 1]), new Int8Array([3, 2, 1]));
    console.log("> sort:TypedArray", trace());
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#some", function() {
    global.console = { log: jest.fn() };
    mod.someTest([1, 2, 3]);
    console.log("> some:Array", trace());
    mod.someTest(new Int8Array([1, 2, 3]));
    console.log("> some:TypedArray", trace());
    expect(console.log.mock.calls).toMatchSnapshot();
  });
  test("Array#every", function() {
    global.console = { log: jest.fn() };
    mod.everyTest([1, 2, 3]);
    console.log("> every:Array", trace());
    mod.everyTest(new Int8Array([1, 2, 3]));
    console.log("> every:TypedArray", trace());
    expect(console.log.mock.calls).toMatchSnapshot();
  });
});
