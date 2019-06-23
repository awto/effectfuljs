require("./setup");
const trace = require("./run");
const D = require("../main");

test("modules tracing", function() {
  global.console = { log: jest.fn() };
  D.evalThunk(require("./__fixtures__/mod1"));
  const mod = trace();
  console.log("> M:", mod);
  D.evalThunk(require("./__fixtures__/mod1"));
  const mod1 = trace();
  console.log("> M1:", mod1);
  D.evalThunk(require("./__fixtures__/mod2"));
  const mod2 = trace();
  console.log("> M2:", mod2);
  mod.run();
  expect(console.log.mock.calls).toMatchSnapshot();
});
