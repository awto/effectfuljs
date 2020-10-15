import * as assert from "assert";
import * as path from "path";
import { DebugClient } from "./kit/browser/client";
import * as puppeteer from "puppeteer";

const toBrowserPath: (p: string) => string =
  path.sep === "\\"
    ? function toBrowserPath(path: string) {
        return path.replace(/\\/g, "/");
      }
    : function toBrowserPath(path: string) {
        return path;
      };
process.env.EFFECTFUL_DEBUGGER_INSTRUMENT_DEPS = "0";
// process.env.EFFECTFUL_DEBUGGER_VERBOSE = "2"
process.env.EFFECTFUL_DEBUGGER_EXCLUDE =
  "**/packages/{debugger,serialization,core,transducers}/**";

suite("Debugging on Chrome", function () {
  this.timeout(0);
  const PROJECT_ROOT = path.join(__dirname, "../../..");
  const DEBUG_ADAPTER = path.join(PROJECT_ROOT, "./out/debugAdapter.js");
  const DATA_ROOT = path.join(PROJECT_ROOT, "testdata/");
  const NODE_DATA_ROOT = path.join(DATA_ROOT, "vscode-node-debug/");

  let dc: DebugClient;

  setup(() => {
    dc = new DebugClient(DEBUG_ADAPTER);
    return dc.start();
  });

  teardown(() => dc.stop());

  test("`step in`", async function () {
    const PROGRAM = toBrowserPath(path.join(DATA_ROOT, "stepsModule.js"));
    const MOD2 = toBrowserPath(path.join(DATA_ROOT, "stepsModule2.js"));
    const MOD3 = toBrowserPath(path.join(DATA_ROOT, "stepsModule3.js"));
    const savedDefaultTimeout = dc.defaultTimeout;
    dc.defaultTimeout = 1000000;
    await Promise.all([
      dc.configurationSequence(),
      dc.awaitWebpack(),
      dc.launch({
        indexJs: PROGRAM,
        stopOnEntry: true,
        preset: "browser",
        cwd: DATA_ROOT
      }),
      dc.assertStoppedLocation("entry", {
        path: PROGRAM,
        line: 1
      })
    ]);
    dc.defaultTimeout = savedDefaultTimeout;
    await Promise.all([
      dc.stepInRequest({ threadId: 0 }),
      dc.assertStoppedLocation("step", {
        path: MOD2,
        line: 1
      })
    ]);
    await Promise.all([
      dc.stepInRequest({ threadId: 0 }),
      dc.assertStoppedLocation("step", {
        path: MOD3,
        line: 4
      })
    ]);
    await Promise.all([
      dc.stepInRequest({ threadId: 0 }),
      dc.assertStoppedLocation("step", {
        path: MOD3,
        line: 2
      })
    ]);
    await Promise.all([
      dc.stepInRequest({ threadId: 0 }),
      dc.assertStoppedLocation("step", {
        path: MOD2,
        line: 2
      })
    ]);
    await Promise.all([
      dc.stepInRequest({ threadId: 0 }),
      dc.assertStoppedLocation("step", {
        path: PROGRAM,
        line: 2
      })
    ]);
  });
  test("should stop on a breakpoint", function () {
    const PROGRAM = toBrowserPath(path.join(NODE_DATA_ROOT, "program.js"));
    const BREAKPOINT_LINE = 2;
    dc.defaultTimeout = 30000;
    return Promise.all([
      dc.awaitWebpack(),
      dc.hitBreakpoint(
        {
          indexJs: PROGRAM,
          preset: "browser",
          cwd: DATA_ROOT
        },
        { path: PROGRAM, line: BREAKPOINT_LINE }
      )
    ]);
  });
  test("should step through react application", async function () {
    const PACKAGE = path.join(DATA_ROOT, "react-counter");
    const COUNTER_TSX = toBrowserPath(path.join(PACKAGE, "src", "Counter.tsx"));
    dc.defaultTimeout = 60000;
    await Promise.all([
      dc.configurationSequence(),
      dc.awaitWebpack(),
      dc.launch({
        preset: "browser",
        cwd: PACKAGE,
        timeTravel: true
      })
    ]);
    dc.defaultTimeout = 10000;
    const page = <puppeteer.Page>dc.page;
    page.waitFor("button.counter");
    const getCur = async () =>
      await page.evaluate(
        () => (<any>document.querySelector("button.counter")).innerText
      );
    assert.equal(await getCur(), "0");
    await Promise.all([
      page.click("button.counter"),
      dc.assertStoppedLocation("debugger_statement", {
        path: COUNTER_TSX,
        line: 10
      })
    ]);
    const scope = await dc.scopeDescr();
    assert.deepEqual(
      JSON.parse(
        JSON.stringify(scope, (n, v) =>
          n === "setter" ? "<SETTER>" : n === "Counter" ? "<Counter>" : v
        )
      ),
      [
        [
          { "[name]": "(anonymous)" },
          { value: "0", setter: "<SETTER>", "[name]": "Counter" },
          { Counter: "<Counter>", "[name]": "Counter.tsx" }
        ]
      ]
    );
    await Promise.all([
      dc.continueRequest({ threadId: 0 }),
      page.click("button.counter"),
      dc.assertStoppedLocation("debugger_statement", {
        path: COUNTER_TSX,
        line: 10
      })
    ]);
    assert.equal(await getCur(), "1");
    assert.equal((await dc.scopeDescr())[0][1].value, 1);
    await Promise.all([
      dc.continueRequest({ threadId: 0 }),
      page.click("button.counter"),
      dc.assertStoppedLocation("debugger_statement", {
        path: COUNTER_TSX,
        line: 10
      })
    ]);
    assert.equal(await getCur(), "2");
    assert.equal((await dc.scopeDescr())[0][1].value, 2);
    await dc.continueRequest({ threadId: 0 });
    await new Promise(i => setTimeout(i, 500));
    await Promise.all([
      dc.pauseRequest({ threadId: 0 }),
      dc.assertStoppedLocation("pause", {
        path: COUNTER_TSX,
        line: 17
      })
    ]);
    assert.equal(await getCur(), "2");
    await Promise.all([
      dc.reverseContinueRequest({ threadId: 0 }),
      dc.assertStoppedLocation("debugger_statement", {
        path: COUNTER_TSX,
        line: 10
      })
    ]);
    assert.equal(await getCur(), "2");
    assert.equal((await dc.scopeDescr())[0][1].value, 2);
    await Promise.all([
      dc.reverseContinueRequest({ threadId: 0 }),
      dc.assertStoppedLocation("debugger_statement", {
        path: COUNTER_TSX,
        line: 10
      })
    ]);
    assert.equal(await getCur(), "1");
    assert.equal((await dc.scopeDescr())[0][1].value, 1);
    await Promise.all([
      dc.continueRequest({ threadId: 0 }),
      dc.assertStoppedLocation("debugger_statement", {
        path: COUNTER_TSX,
        line: 10
      })
    ]);
    assert.equal(await getCur(), "2");
    await Promise.all([
      dc.continueRequest({ threadId: 0 }),
      page.click("button.counter"),
      dc.assertStoppedLocation("debugger_statement", {
        path: COUNTER_TSX,
        line: 10
      })
    ]);
    assert.equal(await getCur(), "3");

    await new Promise(i => setTimeout(i, 4000));
    // const PROGRAM = toBrowserPath(path.join(NODE_DATA_ROOT, "program.js"));
  });
});
