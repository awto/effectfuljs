import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import * as util from "util";
import { DebugProtocol } from "vscode-debugprotocol";
import { DebugClient } from "./kit/client";

suite("Debugging on NodeJS", function () {
  this.timeout(30000000);
  const PROJECT_ROOT = path.join(__dirname, "../../..");
  const DEBUG_ADAPTER = path.join(PROJECT_ROOT, "./out/debugAdapter.js");
  const DATA_ROOT = path.join(PROJECT_ROOT, "testdata/");
  const NODE_DATA_ROOT = path.join(DATA_ROOT, "vscode-node-debug/");

  let dc: DebugClient;
  // process.env.EFFECTFUL_DEBUG_DEBUGGER = "1";
  process.env.EFFECTFUL_DEBUGGER_EXCLUDE =
    "**/packages/{debugger,serialization,core,transducers}/**";
  process.env.EFFECTFUL_DEBUGGER_INSTRUMENT_DEPS = "0";
  process.env.EFFECTFUL_DEBUGGER_VERBOSE = process.env.EFFECTFUL_DEBUG_DEBUGGER
    ? "2"
    : "0";
  setup(function () {
    dc = new DebugClient(DEBUG_ADAPTER);
    return dc.start();
  });

  teardown(() => dc.stop());

  suite("basic", function () {
    test("unknown request should produce error", function (done) {
      dc.send("illegal_request")
        .then(function () {
          done(new Error("does not report error on unknown request"));
        })
        .catch(function () {
          done();
        });
    });
  });

  suite("initialize", function () {
    test("should return supported features", function () {
      return dc.initializeRequest().then(
        function (response) {
          response.body = response.body || {};
          assert.equal(response.body.supportsConfigurationDoneRequest, true);
        },
        function (e) {
          console.error(e);
        }
      );
    });
    test("should produce error for invalid 'pathFormat'", function (done) {
      dc.initializeRequest({
        adapterID: "mock",
        linesStartAt1: true,
        columnsStartAt1: true,
        pathFormat: "url"
      })
        .then(function (response) {
          done(
            new Error("does not report error on invalid 'pathFormat' attribute")
          );
        })
        .catch(function (err) {
          // error expected
          done();
        });
    });
  });
  suite("launch", function () {
    test("should run program to the end", function () {
      const PROGRAM = path.join(NODE_DATA_ROOT, "program.js");
      return Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: PROGRAM,
          preset: "node",
          verbose: false
        }),
        dc.waitForEvent("terminated")
      ]);
    });
    test("should stop on entry", function () {
      const PROGRAM = path.join(NODE_DATA_ROOT, "program.js");
      const ENTRY_LINE = 1;
      return Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true,
          verbose: false
        }),
        dc.assertStoppedLocation("entry", { path: PROGRAM, line: ENTRY_LINE })
      ]);
    });
    test("should stop on debugger statement", function () {
      const PROGRAM = path.join(NODE_DATA_ROOT, "programWithDebugger.js");
      const DEBUGGER_LINE = 6;

      return Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          verbose: 2
        }),
        dc.assertStoppedLocation("debugger_statement", {
          path: PROGRAM,
          line: DEBUGGER_LINE
        })
      ]);
    });
    test("should stop on debugger statement in first line", function () {
      const PROGRAM = path.join(NODE_DATA_ROOT, "programWithDebugger1.js");
      const DEBUGGER_LINE = 1;

      return Promise.all([
        dc.configurationSequence(),
        dc.launch({ command: `node ${PROGRAM}`, preset: "node" }),
        dc.assertStoppedLocation("debugger_statement", {
          path: PROGRAM,
          line: DEBUGGER_LINE
        })
      ]);
    });
  });
  suite("setBreakpoints", function () {
    test("should stop on a breakpoint", function () {
      const PROGRAM = path.join(NODE_DATA_ROOT, "program.js");
      const BREAKPOINT_LINE = 2;
      return dc.hitBreakpoint(
        {
          command: `node ${PROGRAM}`,
          preset: "node"
        },
        { path: PROGRAM, line: BREAKPOINT_LINE }
      );
    });

    for (const NAME of ["eval", "indirect eval", "function constructor"])
      test(`should stop on a breakpoint in ${NAME}`, async function () {
        const PROGRAM = path.join(DATA_ROOT, `${NAME}.js`);
        await Promise.all([
          dc.configurationSequence(),
          dc.launch({
            command: `node "${PROGRAM}"`,
            preset: "node",
            stopOnEntry: true
          }),
          dc.assertStoppedLocation("entry", { path: PROGRAM, line: 1 })
        ]);
        const [, req1] = await Promise.all([
          dc.stepInRequest({ threadId: 0 }),
          dc.assertStoppedLocation("step", { line: 1 })
        ]);
        const source = <any>req1.body.stackFrames[0].source;
        assert.ok(
          source && source.sourceReference != null,
          "dynamic source reference"
        );
        await dc.setBreakpointsRequest({
          lines: [3],
          breakpoints: [{ line: 3 }],
          source
        });
        const [, req2] = await Promise.all([
          dc.continueRequest({ threadId: 0 }),
          dc.assertStoppedLocation("breakpoint", { line: 3 })
        ]);
        const source2 = <any>req2.body.stackFrames[0].source;
        assert.ok(
          source2 && source.sourceReference === source2.sourceReference,
          "same dynamic source reference"
        );
        dc.continueRequest({ threadId: 0 });
        await dc.waitForEvent("terminated");
      });
    test(`should stop on a conditional breakpoint in eval`, async function () {
      const PROGRAM = path.join(DATA_ROOT, "evalCond.js");
      const [, , req1] = await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node "${PROGRAM}"`,
          preset: "node"
        }),
        dc.assertStoppedLocation("debugger_statement", {
          line: 2
        })
      ]);
      const source = <any>req1.body.stackFrames[0].source;
      assert.ok(
        source && source.sourceReference != null,
        "dynamic source reference"
      );
      const bpResponse = await dc.setBreakpointsRequest({
        breakpoints: [{ line: 4, condition: "i === 3" }],
        source
      });
      assert.ok(bpResponse.body.breakpoints[0].verified);
      const [, req2] = await Promise.all([
        dc.continueRequest({ threadId: 0 }),
        dc.assertStoppedLocation("breakpoint", { line: 4, column: 3 })
      ]);
      const frame = req2.body.stackFrames[0];
      const source2 = <any>frame.source;
      assert.ok(
        source2 && source.sourceReference === source2.sourceReference,
        "same dynamic source reference"
      );
    });
    test("should stop on a breakpoint in file with spaces in its name", function () {
      const PROGRAM = path.join(
        NODE_DATA_ROOT,
        "folder with spaces",
        "file with spaces.js"
      );
      const BREAKPOINT_LINE = 2;

      return dc.hitBreakpoint(
        {
          command: `node "${PROGRAM}"`,
          preset: "node"
        },
        { path: PROGRAM, line: BREAKPOINT_LINE }
      );
    });

    test("should stop on a breakpoint identical to the entrypoint", function () {
      const PROGRAM = path.join(NODE_DATA_ROOT, "program.js");
      const ENTRY_LINE = 1;

      return dc.hitBreakpoint(
        {
          command: `node ${PROGRAM}`,
          preset: "node"
        },
        { path: PROGRAM, line: ENTRY_LINE }
      );
    });

    test("should break on a specific column in a single line program", function () {
      const SINGLE_LINE_PROGRAM = path.join(
        NODE_DATA_ROOT,
        "programSingleLine.js"
      );
      const LINE = 1;
      const COLUMN = 55;

      return dc.hitBreakpoint(
        {
          command: SINGLE_LINE_PROGRAM,
          preset: "node"
        },
        { path: SINGLE_LINE_PROGRAM, line: LINE, column: COLUMN }
      );
    });

    test("should stop on a conditional breakpoint", function () {
      const PROGRAM = path.join(NODE_DATA_ROOT, "program.js");
      const COND_BREAKPOINT_LINE = 13;
      const COND_BREAKPOINT_COLUMN = 2;

      return Promise.all([
        dc.waitForEvent("initialized").then(async function (event) {
          const response = await dc.setBreakpointsRequest({
            breakpoints: [{ line: COND_BREAKPOINT_LINE, condition: "i === 3" }],
            source: { path: PROGRAM }
          });
          let bp = response.body.breakpoints[0];
          if (!bp.verified) {
            bp = (await dc.waitForEvent("breakpoint")).body.breakpoint;
          }
          assert.equal(
            bp.verified,
            true,
            "breakpoint verification mismatch: verified"
          );
          assert.equal(
            bp.line,
            COND_BREAKPOINT_LINE,
            "breakpoint verification mismatch: line"
          );
          assert.equal(
            bp.column,
            COND_BREAKPOINT_COLUMN,
            "breakpoint verification mismatch: column"
          );
          return dc.configurationDoneRequest();
        }),
        dc.launch({ command: `node ${PROGRAM}`, preset: "node" }),
        dc
          .assertStoppedLocation("breakpoint", {
            path: PROGRAM,
            line: COND_BREAKPOINT_LINE
          })
          .then(function (response) {
            const frame = response.body.stackFrames[0];
            return dc
              .evaluateRequest({
                context: "watch",
                frameId: frame.id,
                expression: "x"
              })
              .then(function (response) {
                assert.equal(response.body.result, 9, "x !== 9");
                return response;
              });
          })
      ]);
    });

    test.skip("should stop on <node_internals> module", function () {
      const PROGRAM = path.join(NODE_DATA_ROOT, "programWithInternal.js");

      return dc.hitBreakpoint(
        { command: `node ${PROGRAM}`, preset: "node" },
        { path: "<node_internals>/assert.js", line: 110 }
      );
    });

    test("should stop on debugger statement in eval", function () {
      const PROGRAM = path.join(NODE_DATA_ROOT, "programWithDebuggerEval.js");
      const DEBUGGER_LINE = 2;

      return Promise.all([
        dc.configurationSequence(),
        dc.launch({ command: `node ${PROGRAM}`, preset: "node" }),
        dc.assertStoppedInEvalLocation("debugger_statement", DEBUGGER_LINE)
      ]);
    });
  });

  suite("setBreakpoints in TypeScript", function () {
    test("should stop at entry point", function () {
      const PROGRAM = path.join(
        NODE_DATA_ROOT,
        "sourcemaps-entrypoint/index.ts"
      );
      const TS_LINE = 3;

      return Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true
        }),
        dc.assertStoppedLocation("entry", { path: PROGRAM, line: TS_LINE })
      ]);
    });
    test("should stop on a breakpoint in source (all files top level)", function () {
      const PROGRAM = path.join(NODE_DATA_ROOT, "sourcemaps-simple/classes.ts");
      const TS_LINE = 17;

      return dc.hitBreakpoint(
        {
          command: `node ${PROGRAM}`,
          preset: "node"
        },
        {
          path: PROGRAM,
          line: TS_LINE
        }
      );
    });

    test("should stop on a breakpoint in source with spaces in paths (outDir)", function () {
      const PROGRAM = path.join(
        NODE_DATA_ROOT,
        "sourcemaps with spaces",
        "the source/classes.ts"
      );
      const BREAKPOINT_LINE = 17;

      return dc.hitBreakpoint(
        {
          command: `node "${PROGRAM}"`,
          preset: "node"
        },
        {
          path: PROGRAM,
          line: BREAKPOINT_LINE
        }
      );
    });

    test("should stop on an explicit breakpoint at entry point", function () {
      const PROGRAM = path.join(
        NODE_DATA_ROOT,
        "sourcemaps-entrypoint/index.ts"
      );
      const TS_LINE = 3;

      return dc.hitBreakpoint(
        {
          command: `node "${PROGRAM}"`,
          preset: "node"
        },
        { path: PROGRAM, line: TS_LINE }
      );
    });
  });
  suite.skip("function setBreakpoints", function () {
    const PROGRAM = path.join(NODE_DATA_ROOT, "programWithFunction.js");
    const FUNCTION_NAME_1 = "foo";
    const FUNCTION_LINE_1 = 4;
    const FUNCTION_NAME_2 = "bar";
    const FUNCTION_LINE_2 = 8;
    const FUNCTION_NAME_3 = "xyz";

    test("should stop on a function breakpoint", function () {
      return Promise.all<DebugProtocol.ProtocolMessage>([
        dc.launch({ program: PROGRAM }),

        dc.configurationSequence(),

        // since we can only set a function breakpoint for *known* functions,
        // we use the program output as an indication that function 'foo' has been defined.
        dc.assertOutput("stdout", "foo defined").then(event => {
          return dc
            .setFunctionBreakpointsRequest({
              breakpoints: [{ name: FUNCTION_NAME_2 }]
            })
            .then(function () {
              return dc
                .setFunctionBreakpointsRequest({
                  breakpoints: [
                    { name: FUNCTION_NAME_1 },
                    { name: FUNCTION_NAME_2 },
                    { name: FUNCTION_NAME_3 }
                  ]
                })
                .then(response => {
                  const bp1 = response.body.breakpoints[0];
                  assert.equal(bp1.verified, true);
                  assert.equal(bp1.line, FUNCTION_LINE_1);

                  const bp2 = response.body.breakpoints[1];
                  assert.equal(bp2.verified, true);
                  assert.equal(bp2.line, FUNCTION_LINE_2);

                  const bp3 = response.body.breakpoints[2];
                  assert.equal(bp3.verified, false);
                  return response;
                });
            });
        }),
        dc.assertStoppedLocation("breakpoint", {
          path: PROGRAM,
          line: FUNCTION_LINE_1
        })
      ]);
    });
  });

  suite("setExceptionBreakpoints", function () {
    const PROGRAM = path.join(NODE_DATA_ROOT, "programWithException.js");

    test("should not stop on an exception", function () {
      return Promise.all<DebugProtocol.ProtocolMessage>([
        dc
          .waitForEvent("initialized")
          .then(event => {
            return dc.setExceptionBreakpointsRequest({
              filters: []
            });
          })
          .then(response => {
            return dc.configurationDoneRequest();
          }),
        dc.launch({ command: `node ${PROGRAM}`, preset: "node" }),
        dc.waitForEvent("terminated")
      ]);
    });

    test("should stop on a caught exception", function () {
      const EXCEPTION_LINE = 6;

      return Promise.all([
        dc
          .waitForEvent("initialized")
          .then(event => {
            return dc.setExceptionBreakpointsRequest({
              filters: ["all"]
            });
          })
          .then(response => {
            return dc.configurationDoneRequest();
          }),

        dc.launch({ command: `node ${PROGRAM}`, preset: "node" }),

        dc.assertStoppedLocation("exception", {
          path: PROGRAM,
          line: EXCEPTION_LINE
        })
      ]);
    });

    test("should stop on uncaught exception", function () {
      const UNCAUGHT_EXCEPTION_LINE = 12;

      return Promise.all([
        dc
          .waitForEvent("initialized")
          .then(event => {
            return dc.setExceptionBreakpointsRequest({
              filters: ["uncaught"]
            });
          })
          .then(response => {
            return dc.configurationDoneRequest();
          }),

        dc.launch({ command: `node ${PROGRAM}`, preset: "node" }),

        dc.assertStoppedLocation("exception", {
          path: PROGRAM,
          line: UNCAUGHT_EXCEPTION_LINE
        })
      ]);
    });
  });

  suite("setExceptionBreakpoints in eval", function () {
    const PROGRAM = path.join(DATA_ROOT, "evalWithException.js");

    test("should not stop on an exception in `eval`", function () {
      return Promise.all<DebugProtocol.ProtocolMessage>([
        dc
          .waitForEvent("initialized")
          .then(event => {
            return dc.setExceptionBreakpointsRequest({
              filters: []
            });
          })
          .then(response => {
            return dc.configurationDoneRequest();
          }),
        dc.launch({ command: `node ${PROGRAM}`, preset: "node" }),
        dc.waitForEvent("terminated")
      ]);
    });

    test("should stop on a caught exception in `eval`", async function () {
      await Promise.all([
        dc
          .waitForEvent("initialized")
          .then(event => {
            return dc.setExceptionBreakpointsRequest({
              filters: ["all"]
            });
          })
          .then(response => {
            return dc.configurationDoneRequest();
          }),
        dc.launch({ command: `node ${PROGRAM}`, preset: "node" }),
        dc.assertStoppedInEvalLocation("exception", 4)
      ]);
      await Promise.all([
        dc.continueRequest({ threadId: 0 }),
        dc.assertStoppedInEvalLocation("exception", 3)
      ]);
      await Promise.all([
        dc.continueRequest({ threadId: 0 }),
        dc.assertStoppedInEvalLocation("exception", 3)
      ]);
      await Promise.all([
        dc.continueRequest({ threadId: 0 }),
        dc.assertStoppedInEvalLocation("exception", 2)
      ]);
      dc.continueRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
  });

  suite("output events", function () {
    const PROGRAM = path.join(NODE_DATA_ROOT, "programWithOutput.js");

    test.skip("stdout and stderr events should be complete and in correct order", function () {
      return Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          verbose: false
        }),
        dc.assertOutput(
          "stdout",
          "Hello stdout 0\nHello stdout 1\nHello stdout 2\n"
        ),
        dc.assertOutput(
          "stderr",
          "Hello stderr 0\nHello stderr 1\nHello stderr 2\n"
        )
      ]);
    });
  });
  suite("stepping", function () {
    const PROGRAM = path.join(DATA_ROOT, "stepsTest.js");
    test("should enter all functions on `step in`", async function () {
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true,
          verbose: false
        }),
        dc.assertStoppedLocation("entry", {
          path: PROGRAM,
          line: 1
        })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", {
          path: PROGRAM,
          line: 9
        })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", {
          path: PROGRAM,
          line: 3
        })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", {
          path: PROGRAM,
          line: 4
        })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", {
          path: PROGRAM,
          line: 7
        })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", {
          path: PROGRAM,
          line: 10
        })
      ]);
      dc.stepInRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
    test("should exit function on `step out`", async function () {
      await dc.hitBreakpoint(
        {
          command: `node ${PROGRAM}`,
          preset: "node"
        },
        { path: PROGRAM, line: 7 }
      );
      await Promise.all([
        dc.stepOutRequest({ threadId: 0 }),
        dc.assertStoppedLocation("stepOut", {
          path: PROGRAM,
          line: 8
        })
      ]);
      await Promise.all([
        dc.stepOutRequest({ threadId: 0 }),
        dc.assertStoppedLocation("stepOut", {
          path: PROGRAM,
          line: 5
        })
      ]);
      await Promise.all([
        dc.stepOutRequest({ threadId: 0 }),
        dc.assertStoppedLocation("stepOut", {
          path: PROGRAM,
          line: 11
        })
      ]);
      dc.stepOutRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
    test("should exit function on `step over`", async function () {
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true
        }),
        dc.assertStoppedLocation("entry", {
          path: PROGRAM,
          line: 1
        })
      ]);
      await dc.setBreakpointsRequest({
        breakpoints: [{ line: 7 }],
        source: { path: PROGRAM }
      });
      await Promise.all([
        dc.nextRequest({ threadId: 0 }),
        dc.assertStoppedLocation("next", {
          path: PROGRAM,
          line: 9
        })
      ]);
      await Promise.all([
        dc.nextRequest({ threadId: 0 }),
        dc.assertStoppedLocation("breakpoint", {
          path: PROGRAM,
          line: 7
        })
      ]);
      await Promise.all([
        dc.nextRequest({ threadId: 0 }),
        dc.assertStoppedLocation("next", {
          path: PROGRAM,
          line: 10
        })
      ]);
      dc.nextRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
  });
  suite("`require` stepping", function () {
    const PROGRAM = path.join(DATA_ROOT, "stepsModule.js");
    const MOD2 = path.join(DATA_ROOT, "stepsModule2.js");
    const MOD3 = path.join(DATA_ROOT, "stepsModule3.js");
    test("should enter each module only once on `step in`", async function () {
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: PROGRAM,
          preset: "node",
          stopOnEntry: true
        }),
        dc.assertStoppedLocation("entry", {
          path: PROGRAM,
          line: 1
        })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", { path: MOD2, line: 1 })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", { path: MOD3, line: 4 })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", { path: MOD3, line: 2 })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", { path: MOD2, line: 2 })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", { path: PROGRAM, line: 2 })
      ]);
      dc.stepInRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
    test("should exit modules top level on `step out`", async function () {
      await dc.hitBreakpoint(
        {
          command: PROGRAM,
          preset: "node"
        },
        { path: MOD3, line: 2 }
      );
      await Promise.all([
        dc.stepOutRequest({ threadId: 0 }),
        dc.assertStoppedLocation("stepOut", { path: MOD3, line: 3 })
      ]);
      await Promise.all([
        dc.stepOutRequest({ threadId: 0 }),
        dc.assertStoppedLocation("stepOut", { path: MOD3, line: 4 })
      ]);
      await Promise.all([
        dc.stepOutRequest({ threadId: 0 }),
        dc.assertStoppedLocation("stepOut", { path: MOD2, line: 3 })
      ]);
      await Promise.all([
        dc.stepOutRequest({ threadId: 0 }),
        dc.assertStoppedLocation("stepOut", { path: PROGRAM, line: 3 })
      ]);
      dc.stepOutRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
    test("should exit function on `step over`", async function () {
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true
        }),
        dc.assertStoppedLocation("entry", {
          path: PROGRAM,
          line: 1
        })
      ]);
      await dc.setBreakpointsRequest({
        breakpoints: [{ line: 2 }],
        source: { path: MOD3 }
      });
      await Promise.all([
        dc.nextRequest({ threadId: 0 }),
        // dc.assertStoppedLocation("next", { path: PROGRAM, line: 2 })
        dc.assertStoppedLocation("breakpoint", { path: MOD3, line: 2 })
      ]);
      await Promise.all([
        dc.nextRequest({ threadId: 0 }),
        dc.assertStoppedLocation("next", { path: MOD2, line: 2 })
      ]);
      await Promise.all([
        dc.nextRequest({ threadId: 0 }),
        dc.assertStoppedLocation("next", { path: PROGRAM, line: 2 })
      ]);
      dc.nextRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
  });
  suite("async", function () {
    const PROGRAM = path.join(DATA_ROOT, "setTimeout.js");
    test("should await an async event", async function () {
      const out = dc.assertOutput("stdout", "BEFORE\nAFTER\nBEFORE\nAFTER\n");
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true,
          verbose: false
        }),
        dc.assertStoppedLocation("entry", {
          path: PROGRAM,
          line: 7
        })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", {
          path: PROGRAM,
          line: 8
        })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", { path: PROGRAM, line: 2 })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", { path: PROGRAM, line: 3 })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", { path: PROGRAM, line: 3 })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", { path: PROGRAM, line: 4 })
      ]);
      await Promise.all([
        dc.stepOutRequest({ threadId: 0 }),
        dc.assertStoppedLocation("stepOut", { path: PROGRAM, line: 5 })
      ]);
      await Promise.all([
        dc.stepInRequest({ threadId: 0 }),
        dc.assertStoppedLocation("step", { path: PROGRAM, line: 9 })
      ]);
      dc.nextRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
      await out;
    });
  });
  suite("fast restart", function () {
    test("should restart the program from the entry", async function () {
      const PROGRAM = path.join(DATA_ROOT, "restart-entry.js");
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: PROGRAM,
          preset: "node",
          stopOnExit: true,
          fastRestart: "entry",
          verbose: false
        }),
        dc.assertOutput("stdout", "BEFORE\nAFTER\n")
      ]);
      await Promise.all([
        dc.restartRequest({}),
        dc.assertOutput("stdout", "BEFORE\nAFTER\n")
      ]);
    });
    test("should restart the program from a custom snapshot", async function () {
      const PROGRAM = path.join(DATA_ROOT, "restart-custom.js");
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: PROGRAM,
          preset: "node",
          stopOnExit: true,
          fastRestart: true,
          verbose: false
        }),
        dc.assertOutput("stdout", "BEFORE\nAFTER\n")
      ]);
      await Promise.all([
        dc.restartRequest({}),
        dc.assertOutput("stdout", "AFTER\n")
      ]);
    });
  });
  suite("hot swapping", function () {
    async function copy(prog: string, fn: string) {
      await util.promisify(fs.writeFile)(
        prog,
        await util.promisify(fs.readFile)(path.join(DATA_ROOT, fn), "utf-8")
      );
    }
    test("should change the functions code", async function () {
      const out = dc.assertOutput("stdout", "M:1\nN:2\n");
      const PROGRAM = path.join(DATA_ROOT, "hot-swap-main.js");
      try {
        await copy(PROGRAM, "hot1.js");
        await dc.hitBreakpoint(
          {
            command: `node ${PROGRAM}`,
            preset: "node",
            verbose: false
          },
          { path: PROGRAM, line: 2 }
        );
        await Promise.all([
          dc.continueRequest({ threadId: 0 }),
          dc.assertStoppedLocation("breakpoint", { path: PROGRAM, line: 2 })
        ]);
        await new Promise(i => setTimeout(i, 100));
        await Promise.all([
          copy(PROGRAM, "hot2.js"),
          dc.waitForEvent("loadedSources")
        ]);
        dc.continueRequest({ threadId: 0 });
        await dc.waitForEvent("terminated");
        await out;
      } finally {
        await util.promisify(fs.unlink)(PROGRAM);
      }
    });
    test("should restart on file change if `onChange` is specified", async function () {
      const PROGRAM = path.join(DATA_ROOT, "hot-restart.js");
      await copy(PROGRAM, "restart-entry.js");
      try {
        await Promise.all([
          dc.configurationSequence(),
          dc.launch({
            command: PROGRAM,
            preset: "node",
            stopOnExit: true,
            fastRestart: "entry",
            verbose: false,
            onChange: "restart"
          }),
          dc.assertOutput("stdout", "BEFORE\nAFTER\n")
        ]);
        await copy(PROGRAM, "restart2.js");
        await dc.assertOutput("stdout", "NEW SOURCES\n");
      } finally {
        await util.promisify(fs.unlink)(PROGRAM);
      }
    });
  });
  suite("child processes", function () {
    const PROGRAM = path.join(DATA_ROOT, "spawn.js");
    const CP1 = path.join(DATA_ROOT, "child_process1.js");
    const CP2 = path.join(DATA_ROOT, "child_process2.js");
    test("should create threads on each child process", async function () {
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true
        }),
        dc.assertStoppedLocation("entry", {
          path: PROGRAM,
          line: 1
        })
      ]);
      await dc.continueRequest({ threadId: 0 });
      const [t1] = await Promise.all([
        dc.waitForEvent("thread"),
        dc.assertStoppedLocation("entry", {
          path: CP1,
          line: 1
        })
      ]);
      assert.equal(t1.body.reason, "started");
      await dc.continueRequest({ threadId: t1.body.threadId });
      const [t2] = await Promise.all([
        dc.waitForEvent("thread"),
        dc.assertStoppedLocation("entry", {
          path: CP2,
          line: 1
        })
      ]);
      assert.equal(t2.body.reason, "started");
      await dc.continueRequest({ threadId: t2.body.threadId });
      const stop2 = await dc.waitForEvent("thread");
      assert.equal(stop2.body.reason, "exited");
      assert.equal(stop2.body.threadId, t2.body.threadId);
      const stop1 = await dc.waitForEvent("thread");
      assert.equal(stop1.body.reason, "exited");
      assert.equal(stop1.body.threadId, t1.body.threadId);
      const [t3] = await Promise.all([
        dc.waitForEvent("thread"),
        dc.assertStoppedLocation("entry", {
          path: CP2,
          line: 1
        })
      ]);
      assert.equal(t3.body.reason, "started");
      await dc.continueRequest({ threadId: t3.body.threadId });
      const stop3 = await dc.waitForEvent("thread");
      assert.equal(stop3.body.reason, "exited");
      assert.equal(stop3.body.threadId, t3.body.threadId);
      await dc.waitForEvent("terminated");
    });
  });
  suite.skip("other terminals", function () {});
  suite("`eval` scopes", function () {
    const PROGRAM = path.join(DATA_ROOT, "scopes.js");
    test("should correctly refer variables", async function () {
      async function watch(res: string) {
        const stop = await dc.assertStoppedLocation("debugger_statement", {});
        assert.equal(
          (
            await dc.evaluateRequest({
              context: "watch",
              frameId: stop.body.stackFrames[0].id,
              expression: "`i:${i},j:${j},k:${k}`"
            })
          ).body.result,
          res
        );
      }
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node"
        })
      ]);
      await watch("i:I2,j:J2,k:K1+1");
      assert.deepEqual(await dc.scopeDescr(), [
        [
          { this: { obj: "OBJ" }, j: "J2", "[name]": "VM1024.js" },
          { this: { obj: "OBJ" }, i: "I2", j: "J1", "[name]": "(anonymous)" },
          { i: "I1", k: "K1+1", "[name]": "scopes.js" }
        ],
        [
          { this: { obj: "OBJ" }, i: "I2", j: "J1", "[name]": "(anonymous)" },
          { i: "I1", k: "K1+1", "[name]": "scopes.js" }
        ],
        [{ i: "I1", k: "K1+1", "[name]": "scopes.js" }]
      ]);
      await dc.continueRequest({ threadId: 0 });
      await watch("i:GI,j:J3,k:GK+2");
      assert.deepEqual(await dc.scopeDescr(), [
        [{ j: "J3", "[name]": "VM3072.js" }],
        [
          { this: { obj: "OBJ" }, j: "J1", "[name]": "(anonymous)" },
          { i: "I1", k: "K1+1-1", "[name]": "scopes.js" }
        ],
        [{ i: "I1", k: "K1+1-1", "[name]": "scopes.js" }]
      ]);
      await dc.continueRequest({ threadId: 0 });
      await watch("i:I3,j:JF,k:GK+2-2+3");
      assert.deepEqual(await dc.scopeDescr(), [
        [{ this: { obj: "OBJ" }, j: "JF", i: "I3", "[name]": "VM5120.js" }],
        [
          { this: { obj: "OBJ" }, j: "J1", "[name]": "(anonymous)" },
          { i: "I1", k: "K1+1-1", "[name]": "scopes.js" }
        ],
        [{ i: "I1", k: "K1+1-1", "[name]": "scopes.js" }]
      ]);
      await dc.continueRequest({ threadId: 0 });
      await watch("i:I1,j:J4,k:KL");
      assert.deepEqual(await dc.scopeDescr(), [
        [
          { this: { obj: "OBJ" }, j: "J4", "[name]": "VM7168.js" },
          { this: { obj: "OBJ" }, k: "KL", "[name]": "(anonymous)" },
          { this: { obj: "OBJ" }, j: "J1", "[name]": "(anonymous)" },
          { i: "I1", k: "K1+1-1", "[name]": "scopes.js" }
        ],
        [
          { this: { obj: "OBJ" }, k: "KL", "[name]": "(anonymous)" },
          { this: { obj: "OBJ" }, j: "J1", "[name]": "(anonymous)" },
          { i: "I1", k: "K1+1-1", "[name]": "scopes.js" }
        ],
        [
          { this: { obj: "OBJ" }, j: "J1", "[name]": "(anonymous)" },
          { i: "I1", k: "K1+1-1", "[name]": "scopes.js" }
        ],
        [{ i: "I1", k: "K1+1-1", "[name]": "scopes.js" }]
      ]);
      await dc.continueRequest({ threadId: 0 });
      await watch("i:GI,j:J5,k:GK+2-2+3-3");
      assert.deepEqual(await dc.scopeDescr(), [
        [{ j: "J5", "[name]": "VM9216.js" }],
        [
          { this: { obj: "OBJ" }, k: "KL", "[name]": "(anonymous)" },
          { this: { obj: "OBJ" }, j: "J1", "[name]": "(anonymous)" },
          { i: "I1", k: "K1+1-1", "[name]": "scopes.js" }
        ],
        [
          { this: { obj: "OBJ" }, j: "J1", "[name]": "(anonymous)" },
          { i: "I1", k: "K1+1-1", "[name]": "scopes.js" }
        ],
        [{ i: "I1", k: "K1+1-1", "[name]": "scopes.js" }]
      ]);
      dc.continueRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
  });
  suite("node vm", function () {
    const PROGRAM = path.join(DATA_ROOT, "vm-code.js");
    test("should enter each module only once on `step in`", async function () {
      const out = dc.assertOutput(
        "stdout",
        [
          "{ animal: 'cat', count: 3, name: 'kitty' }",
          "{ animal: 'cat', count: 4, name: 'another kitty' }",
          "{ animal: 'cat', count: 5, name: 'kitty2' }",
          "{ animal: 'cat', count: 7, name: 'c1' }"
        ].join("\n")
      );
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: PROGRAM,
          preset: "node",
          verbose: false
        }),
        dc.assertStoppedLocation("debugger_statement", { line: 3 })
      ]);
      await Promise.all([
        dc.continueRequest({ threadId: 0 }),
        dc.assertStoppedLocation("debugger_statement", { line: 3 })
      ]);
      await Promise.all([
        dc.continueRequest({ threadId: 0 }),
        dc.assertStoppedLocation("debugger_statement", { line: 3 })
      ]);
      await Promise.all([
        dc.continueRequest({ threadId: 0 }),
        dc.assertStoppedLocation("debugger_statement", { line: 3 })
      ]);
      dc.continueRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
      await out;
    });
  });
});
