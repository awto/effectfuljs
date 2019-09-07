require("./setup");
const trace = require("./run");
trace.silent = true;
const D = require("../main");

test("modules tracing", function() {
  global.console = { log: jest.fn() };
  const mod = trace(D.evalThunk(require("./__fixtures__/mod1")));
  console.log("> M:", mod);
  const mod1 = trace(D.evalThunk(require("./__fixtures__/mod1")));
  console.log("> M1:", mod1);
  const mod2 = trace(D.evalThunk(require("./__fixtures__/mod2")));
  console.log("> M2:", mod2);
  trace(mod.run());
  expect(console.log.mock.calls).toMatchSnapshot();
});
