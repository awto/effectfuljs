import * as Debugger from "./main";

function trace() {
  let num = 0;
  for (let f; (f = Debugger.step()) === Debugger.effectToken; ) {
    const x = Debugger.context;
    console.log(`Step #${num++}@${x.brk}`, x.value);
    for (const j of x.stack) {
      console.log(`  ${j.constructor.name}@${j.$module.name}:${j.location}`);
    }
  }
}

global.console = { log: jest.fn() };

test("tracing", function() {
  require("./__fixtures__/mod1");
  trace();
  expect(console.log.mock.calls).toMatchSnapshot();
});
