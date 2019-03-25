// otherwise jest won't work
require("./kit").config.replaceRT = false;
const Debugger = require("./main");

function trace() {
  let num = 0;
  Debugger.context.stack = Debugger.context.threads.pop();
  let f;
  while ((f = Debugger.step()) === Debugger.token) {
    const x = Debugger.context;
    console.log(`Step #${num++}@${x.brk}`, x.value);
    for (const j of x.stack) {
      console.log(
        `  ${j.constructor.name}@${j.$meta.module.name}:${j.location}`
      );
    }
  }
  return f;
}

global.console = { log: jest.fn() };

test("modules tracing", function() {
  Debugger.unwrap(require("./__fixtures__/mod1"));
  const mod = trace();
  console.log("> M:", mod);
  Debugger.unwrap(require("./__fixtures__/mod1"));
  const mod1 = trace();
  console.log("> M1:", mod1);
  Debugger.unwrap(require("./__fixtures__/mod2"));
  const mod2 = trace();
  console.log("> M2:", mod2);

  mod.mapTest([1, 2, 3]);
  console.log("> map:Array", trace());
  mod.mapTest(new Int8Array([1, 2, 3]));
  console.log("> map:TypedArray", trace());

  mod.filterTest([1, 2, 3]);
  console.log("> filter:Array", trace());
  mod.filterTest(new Int8Array([1, 2, 3]));
  console.log("> filter:TypedArray", trace());

  mod.findIndexTest([1, 2, 3]);
  console.log("> findIndex:Array", trace());
  mod.findIndexTest(new Int8Array([1, 2, 3]));
  console.log("> findIndex:TypedArray", trace());

  mod.flatMapTest([1, 2, 3]);
  console.log("> flatMap:Array", trace());
  mod.flatMapTest(new Int8Array([1, 2, 3]));
  console.log("> flatMap:TypedArray", trace());

  mod.forEachTest([1, 2, 3]);
  console.log("> forEach:Array", trace());
  mod.forEachTest(new Int8Array([1, 2, 3]));
  console.log("> forEach:TypedArray", trace());
  mod.forEachTest(new Set([1, 2, 3]));
  console.log("> forEach:Set", trace());
  mod.forEachTest(new Map([[1, "a"], [2, "b"], [3, "c"]]));
  console.log("> forEach:Map", trace());

  mod.reduceTest(["a", "b", "c"]);
  console.log("> reduce:Array", trace());
  mod.reduceTest(new Int8Array([1, 2, 3]));
  console.log("> reduce:TypedArray", trace());

  mod.reduceRightTest(["a", "b", "c"]);
  console.log("> reduceRight:Array", trace());
  mod.reduceRightTest(new Int8Array([1, 2, 3]));
  console.log("> reduceRight:TypedArray", trace());

  mod.arraySortTest([2, 3, 1], ["b", "c", "a"]);
  console.log("> sort:Array", trace());
  mod.typedArraySortTest(new Int8Array([2, 3, 1]), new Int8Array([3, 2, 1]));
  console.log("> sort:TypedArray", trace());

  mod.someTest([1, 2, 3]);
  console.log("> some:Array", trace());
  mod.someTest(new Int8Array([1, 2, 3]));
  console.log("> some:TypedArray", trace());

  mod.everyTest([1, 2, 3]);
  console.log("> every:Array", trace());
  mod.everyTest(new Int8Array([1, 2, 3]));
  console.log("> every:TypedArray", trace());

  expect(console.log.mock.calls).toMatchSnapshot();
});
