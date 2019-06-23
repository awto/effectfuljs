require("./setup");
const trace = require("./run").bind(null, true);
const D = require("../main");

test("eval tracing", function() {
  global.console = { log: jest.fn() };
  D.evalThunk(require("./__fixtures__/eval"));
  const mod = trace();
  mod.runEval();
  console.log("> eval", trace());
  expect(console.log.mock.calls).toMatchSnapshot();
});
