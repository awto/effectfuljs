require("./setup");
const trace = require("./run");
trace.silent = true;
const D = require("../main");

test("eval tracing", function() {
  global.console = { log: jest.fn() };
  D.context.debug = true;
  D.context.needsBreak = () => true;
  const mod = trace(D.force(require("./__fixtures__/eval")));
  console.log("> eval", trace(mod.runEval()));
  expect(console.log.mock.calls).toMatchSnapshot();
});
