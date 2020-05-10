require("./setup");
const trace = require("./run");
trace.silent = true;
const D = require("../main");
const S = require("@effectful/serialization");
require("../persist");
S.regGlobal();

test("persistent state", function() {
  global.console = { log: jest.fn(), error: console.error, warn: console.warn };
  S.regOpaqueObject(global.console, "mock-console-persist");
  const mod = trace(D.force(require("./__fixtures__/counters")));
  S.regOpaqueObject(mod, "countersMod");
  const [counter1, s1] = trace(mod.runCounters(true));
  console.log(counter1, s1);
  D.context.top = S.read(s1).top;
  const ps2 = { s2: true };
  const [counter2, s2] = trace.cont(ps2);
  console.log(counter2, s2);
  expect(s2).toBe(ps2);
  // TODO: windows paths
  // expect(console.log.mock.calls).toMatchSnapshot();
});
