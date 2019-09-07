require("./setup");
const trace = require("./run");
trace.silent = true;
const D = require("../main");

test("generator functions", function() {
  D.context.debug = false;
  global.console = { log: jest.fn() };
  const mod = trace(D.evalThunk(require("./__fixtures__/generators")));
  console.log("> M:", mod);
  trace(mod());
  expect(console.log.mock.calls).toMatchSnapshot();
});

test("async functions", async function() {
  D.context.debug = false;
  global.console = { log: jest.fn() };
  const mod = trace(D.evalThunk(require("./__fixtures__/async")));
  console.log("> M:", mod);
  console.log("R", await trace.async(mod()));
  expect(console.log.mock.calls).toMatchSnapshot();
});

test("async generators functions", async function() {
  D.context.debug = false;
  global.console = { log: jest.fn() };
  const mod = trace(D.evalThunk(require("./__fixtures__/asyncGenerators")));
  console.log("> M:", mod);
  console.log("R", await trace.async(mod()));
  expect(console.log.mock.calls).toMatchSnapshot();
});
