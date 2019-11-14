require("./setup");
const trace = require("./run");
trace.silent = true;
const D = require("../main");
const S = require("@effectful/serialization");
require("../persist");

test("persistent state", function() {
  global.console = { log: jest.fn() };
  const extra = { value: "H" };
  D.Persist.extraState().add(extra);
  const mod = trace(D.evalThunk(require("./__fixtures__/counters")));
  S.regOpaqueObject(mod, "countersMod");
  const [counter1, s1] = trace(mod.runCounters(true));
  console.log(counter1, s1);
  D.Persist.restore(s1);
  const [extraAfter] = D.Persist.extraState();
  expect(extra).not.toBe(extraAfter);
  expect(extra).toEqual(extraAfter);
  const ps2 = { s2: true };
  const [counter2, s2] = trace.cont(ps2);
  console.log(counter2, s2);
  expect(s2).toBe(ps2);
  // expect(console.log.mock.calls).toMatchSnapshot();
});
