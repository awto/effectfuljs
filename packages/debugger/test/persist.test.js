require("./setup");
const trace = require("./run").bind(null, true);
const D = require("../main");
const S = require("@effectful/serialization");

test("persistent state", function() {
  global.console = { log: jest.fn() };
  D.evalThunk(require("./__fixtures__/counters"));
  const extra = { value: "H" };
  D.Persist.extraState().add(extra);
  const mod = trace();
  S.regOpaqueObject(mod, "countersMod");
  mod.runCounters(true);
  const [counter1, s1] = trace();
  console.log(counter1, s1);
  D.Persist.restore(s1);
  const [extraAfter] = D.Persist.extraState();
  expect(extra).not.toBe(extraAfter);
  expect(extra).toEqual(extraAfter);
  const [counter2, s2] = trace();
  console.log(counter2, s2);
  // expect(s2).toEqual(s1);
  expect(console.log.mock.calls).toMatchSnapshot();
});
