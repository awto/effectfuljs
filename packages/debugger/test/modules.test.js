require("./setup");
const trace = require("./run");
trace.silent = true;
const D = require("../main");

test("modules tracing", function() {
  global.console = { log: jest.fn(), error: console.error };
  D.context.debug = true;
  debugger;
  trace(D.force(require("./__fixtures__/mod")));
  expect(console.log.mock.calls).toMatchSnapshot();
});
