import * as assert from "assert";
import * as path from "path";
import { DebugClient } from "./kit/browser/client";
import * as puppeteer from "puppeteer";

const MODULE_DIR = path.resolve(__dirname, "..", "..", "..");
const PROJECT_DIR = path.resolve(MODULE_DIR, "..", "..");
const EXAMPLES_DIR = path.join(PROJECT_DIR, "samples");

const toBrowserPath: (p: string) => string =
  path.sep === "\\"
    ? function toBrowserPath(path: string) {
        return path.replace(/\\/g, "/");
      }
    : function toBrowserPath(path: string) {
        return path;
      };
process.env.EFFECTFUL_DEBUGGER_INSTRUMENT_DEPS = "0";
if (process.env.EFFECTFUL_DEBUG_CHROME)
  process.env.EFFECTFUL_DEBUGGER_VERBOSE = "2";
process.env.EFFECTFUL_DEBUGGER_EXCLUDE =
  "**/packages/{debugger,serialization,core,transducers}/**";
process.env.EFFECTFUL_DEBUGGER_DEPS = path.join(MODULE_DIR, "node_modules");

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
      dc.compileAndOpen(),
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
      dc.compileAndOpen(),
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
      dc.compileAndOpen(),
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
    assert.strictEqual(await getCur(), "0");
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
  test("should run NextJS applications", async function () {
    const PACKAGE = path.join(EXAMPLES_DIR, "nextjs-debugger-test");
    dc.defaultTimeout = 1000000;
    let url: string | undefined;
    await Promise.all([
      dc
        .compile(/^webpack: ready - started server on (.+)\n*$/m)
        
        .then(function (u) {
          url = u;
          return new Promise(i => setTimeout(function() {
            dc.page && url && dc.page.goto(url, { timeout: 0, waitUntil:"load" });
            i();
          }, 500));
        }),
      dc.configurationSequence(),
      dc.launch({
        preset: "next",
        cwd: PACKAGE,
        timeTravel: true,
        stopOnEntry: true,
        env: {
          EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES: path.join(
            PROJECT_DIR,
            "packages"
          ),
          EFFECTFUL_DEBUGGER_INSTRUMENT_DEPS: "1"
        }
      }),
      dc.assertStoppedLocation("entry", {
        path: path.join(PACKAGE, "pages", "index.js"),
        line: 1
      })
    ]);
    const serverThread = <number>dc.lastThreadId;
    await ensureStop(serverThread, "components/Header.js:3");
    await ensureStop(serverThread, "pages/index.js:5");
    await ensureStopAll(serverThread, [
      "components/hello1.js:1",
      "components/hello2.js:1",
      "components/hello4.js:1",
      "components/hello5.js:1"
    ]);
    await ensureStop(serverThread, "pages/index.js:26");
    await ensureStop(serverThread, "components/Header.js:5");
    await ensureStop(serverThread, "components/hello1.js:3");
    await ensureStop(serverThread, "components/hello2.js:3");
    await Promise.all([
      dc.continueRequest({ threadId: serverThread }),
      dc.assertStoppedLocation("entry", {
        path: norm(path.join(PACKAGE, "pages", "index.js")),
        line: 1
      })
    ]);
    const clientThread = <number>dc.lastThreadId;
    await ensureStop(clientThread, "components/Header.js:3");
    await ensureStop(clientThread, "pages/index.js:5");
    await ensureStopAll(clientThread, [
      "components/hello1.js:1",
      "components/hello2.js:1"
    ]);
    await ensureStop(clientThread, "pages/index.js:26");
    await ensureStop(clientThread, "components/Header.js:5");
    await ensureStop(clientThread, "components/hello1.js:3");
    await ensureStop(clientThread, "components/hello2.js:3");
    await ensureStop(clientThread, "components/hello3.js:1");
    await ensureStop(clientThread, "components/hello3.js:3");
    await dc.continueRequest({ threadId: clientThread });
    const page = <puppeteer.Page>dc.page;
    await Promise.all([
      page.click("button.toggle"),
      dc.assertStoppedLocation("debugger_statement", {
        path: norm(path.join(PACKAGE, "pages", "index.js")),
        line: 46
      })
    ]);
    await ensureStop(clientThread, "pages/index.js:26");
    await ensureStop(clientThread, "components/Header.js:5");
    await ensureStop(clientThread, "components/hello1.js:3");
    await ensureStop(clientThread, "components/hello2.js:3");
    await ensureStop(clientThread, "components/hello3.js:3");
    await ensureStop(clientThread, "components/hello5.js:1");
    await ensureStop(clientThread, "components/hello5.js:3");
    page.click("a.about"); //TODO: check why this hangs
    await Promise.all([ensureStop(serverThread, "components/Header.js:5")]);
    await Promise.all([
      dc.continueRequest({ threadId: serverThread }),
      dc.assertStoppedLocation("entry", {
        path: norm(path.join(PACKAGE, "pages", "about.js")),
        line: 1
      })
    ]);
    const aboutThread = <number>dc.lastThreadId;
    await ensureStop(aboutThread, "components/Header.js:3");
    await ensureStop(aboutThread, "components/Header.js:5");
    function norm(p: string) {
      return p.replace(/\\/g, "/");
    }
    async function ensureStop(
      threadId: number,
      location?: string
    ): Promise<string> {
      const [stack] = await Promise.all([
        dc.tillStopped("debugger_statement"),
        dc.continueRequest({ threadId })
      ]);
      const frame = <any>stack.body.stackFrames[0];
      const stopLocation = `${path.relative(PACKAGE, frame.source.path)}:${
        frame.line
      }`;
      if (location) assert.strictEqual(stopLocation, path.normalize(location));
      return stopLocation;
    }
    async function ensureStopAll(threadId: number, locations: string[]) {
      const notSeen = new Set(locations.map(path.normalize));
      while (notSeen.size) {
        const stop = await ensureStop(threadId);
        if (!notSeen.delete(stop))
          assert.fail(`not expected stop location ${stop}`);
      }
    }
  });
});
