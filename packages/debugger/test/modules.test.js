require("./setup");
const trace = require("./run");
trace.silent = true;
const D = require("../main");

test("modules tracing", function() {
  global.console = { log: jest.fn() };
  D.context.debug = true;
  trace(D.evalThunk(require("./__fixtures__/mod")));
  expect(console.log.mock.calls).toMatchSnapshot();
});
