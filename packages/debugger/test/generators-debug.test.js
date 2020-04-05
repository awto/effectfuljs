require("./setup");
const trace = require("./run");
trace.silent = true;
const D = require("../main");

test("generator functions tracing", function() {
  D.context.debug = true;
  global.console = { log: jest.fn(), error: console.error };
  const mod = trace(D.force(require("./__fixtures__/generators")));
  console.log("> M:", mod);
  trace(mod());
  expect(console.log.mock.calls).toMatchSnapshot();
});

test("async functions tracing", async function() {
  D.context.debug = true;
  global.console = { log: jest.fn(), error: console.error };
  const mod = trace(D.force(require("./__fixtures__/async")));
  console.log("> M:", mod);
  console.log("R", await trace.async(mod()));
  expect(console.log.mock.calls).toMatchSnapshot();
});

test("async generator functions tracing", async function() {
  D.context.debug = true;
  global.console = { log: jest.fn(), error: console.error };
  const mod = trace(D.force(require("./__fixtures__/asyncGenerators")));
  console.log("> M:", mod);
  console.log("R", await trace.async(mod()));
  expect(console.log.mock.calls).toMatchSnapshot();
});
