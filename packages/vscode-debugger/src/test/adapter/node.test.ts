import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import * as util from "util";
import { DebugProtocol } from "vscode-debugprotocol";
import { DebugClient } from "./kit/client";

suite("Debugging on NodeJS", function() {
  this.timeout(60000);
  const PROJECT_ROOT = path.join(__dirname, "../../..");
  const DEBUG_ADAPTER = path.join(PROJECT_ROOT, "./out/debugAdapter.js");
  const DATA_ROOT = path.join(PROJECT_ROOT, "testdata/");
  const NODE_DATA_ROOT = path.join(DATA_ROOT, "vscode-node-debug/");
  //  const CHROME_DATA_ROOT = path.join(DATA_ROOT, "vscode-chrome-debug/");

  let dc: DebugClient;

  setup(() => {
    dc = new DebugClient(DEBUG_ADAPTER);
    return dc.start();
  });

  teardown(() => dc.stop());

  suite("basic", () => {
    test("unknown request should produce error", done => {
      dc.send("illegal_request")
        .then(() => {
          done(new Error("does not report error on unknown request"));
        })
        .catch(() => {
          done();
        });
    });
  });

  suite("initialize", () => {
    test("should return supported features", () => {
      return dc.initializeRequest().then(
        response => {
          response.body = response.body || {};
          assert.equal(response.body.supportsConfigurationDoneRequest, true);
        },
        e => {
          console.error(e);
        }
      );
    });
    test("should produce error for invalid 'pathFormat'", done => {
      dc.initializeRequest({
        adapterID: "mock",
        linesStartAt1: true,
        columnsStartAt1: true,
        pathFormat: "url"
      })
        .then(response => {
          done(
            new Error("does not report error on invalid 'pathFormat' attribute")
          );
        })
        .catch(err => {
          // error expected
          done();
        });
    });
  });
  suite.only("launch", () => {
    test("should run program to the end", () => {
      const PROGRAM = path.join(NODE_DATA_ROOT, "program.js");
      return Promise.all([
        dc.configurationSequence(),
        dc.launch({ command: `node ${PROGRAM}`, preset: "node" }),
        dc.waitForEvent("terminated")
      ]);
    });
    test("should stop on entry", () => {
      const PROGRAM = path.join(NODE_DATA_ROOT, "program.js");
      const ENTRY_LINE = 1;
      return Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true
        }),
        dc.assertStoppedLocation("entry", { path: PROGRAM, line: ENTRY_LINE })
      ]);
    });
    test("should stop on debugger statement", () => {
      const PROGRAM = path.join(NODE_DATA_ROOT, "programWithDebugger.js");
      const DEBUGGER_LINE = 6;

      return Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node"
        }),
        dc.assertStoppedLocation("debugger_statement", {
          path: PROGRAM,
          line: DEBUGGER_LINE
        })
      ]);
    });
    test("should stop on debugger statement in first line", () => {
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
  suite("setBreakpoints", () => {
    test("should stop on a breakpoint", () => {
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
      test(`should stop on a breakpoint in ${NAME}`, async () => {
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
        await dc.stepInRequest({ threadId: 0 });
        const req1 = await dc.assertStoppedLocation("step", { line: 1 });
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
        await dc.continueRequest({ threadId: 0 });
        const req2 = await dc.assertStoppedLocation("breakpoint", { line: 3 });
        const source2 = <any>req2.body.stackFrames[0].source;
        assert.ok(
          source2 && source.sourceReference === source2.sourceReference,
          "same dynamic source reference"
        );
        await dc.continueRequest({ threadId: 0 });
        await dc.waitForEvent("terminated");
      });
    test(`should stop on a conditional breakpoint in eval`, async () => {
      const PROGRAM = path.join(DATA_ROOT, "evalCond.js");
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node "${PROGRAM}"`,
          preset: "node"
        })
      ]);
      const req1 = await dc.assertStoppedLocation("debugger_statement", {
        line: 2
      });
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
      await dc.continueRequest({ threadId: 0 });
      const req2 = await dc.assertStoppedLocation("breakpoint", { line: 4 });
      const frame = req2.body.stackFrames[0];
      const source2 = <any>frame.source;
      assert.ok(
        source2 && source.sourceReference === source2.sourceReference,
        "same dynamic source reference"
      );
    });
    test("should stop on a breakpoint in file with spaces in its name", () => {
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

    test("should stop on a breakpoint identical to the entrypoint", () => {
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

    test.skip("should break on a specific column in a single line program", () => {
      const SINGLE_LINE_PROGRAM = path.join(
        NODE_DATA_ROOT,
        "programSingleLine.js"
      );
      const LINE = 1;
      const COLUMN = 55;

      return dc.hitBreakpoint(
        {
          command: `node ${SINGLE_LINE_PROGRAM}`,
          preset: "node"
        },
        { path: SINGLE_LINE_PROGRAM, line: LINE, column: COLUMN }
      );
    });

    test("should stop on a conditional breakpoint", () => {
      const PROGRAM = path.join(NODE_DATA_ROOT, "program.js");
      const COND_BREAKPOINT_LINE = 13;
      const COND_BREAKPOINT_COLUMN = 2;

      return Promise.all([
        dc.waitForEvent("initialized").then(async event => {
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
          .then(response => {
            const frame = response.body.stackFrames[0];
            return dc
              .evaluateRequest({
                context: "watch",
                frameId: frame.id,
                expression: "x"
              })
              .then(response => {
                assert.equal(response.body.result, 9, "x !== 9");
                return response;
              });
          })
      ]);
    });

    test.skip("should stop on <node_internals> module", () => {
      const PROGRAM = path.join(NODE_DATA_ROOT, "programWithInternal.js");

      return dc.hitBreakpoint(
        { command: `node ${PROGRAM}`, preset: "node" },
        { path: "<node_internals>/assert.js", line: 110 }
      );
    });

    test("should stop on debugger statement in eval", () => {
      const PROGRAM = path.join(NODE_DATA_ROOT, "programWithDebuggerEval.js");
      const DEBUGGER_LINE = 2;

      return Promise.all([
        dc.configurationSequence(),
        dc.launch({ command: `node ${PROGRAM}`, preset: "node" }),
        dc.assertStoppedInEvalLocation("debugger_statement", DEBUGGER_LINE)
      ]);
    });
  });

  suite("setBreakpoints in TypeScript", () => {
    test("should stop at entry point", () => {
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
    test("should stop on a breakpoint in source (all files top level)", () => {
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

    test("should stop on a breakpoint in source with spaces in paths (outDir)", () => {
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

    test("should stop on an explicit breakpoint at entry point", () => {
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
  suite.skip("function setBreakpoints", () => {
    const PROGRAM = path.join(NODE_DATA_ROOT, "programWithFunction.js");
    const FUNCTION_NAME_1 = "foo";
    const FUNCTION_LINE_1 = 4;
    const FUNCTION_NAME_2 = "bar";
    const FUNCTION_LINE_2 = 8;
    const FUNCTION_NAME_3 = "xyz";

    test("should stop on a function breakpoint", () => {
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
            .then(() => {
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

  suite("setExceptionBreakpoints", () => {
    const PROGRAM = path.join(NODE_DATA_ROOT, "programWithException.js");

    test("should not stop on an exception", () => {
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

    test("should stop on a caught exception", () => {
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

    test("should stop on uncaught exception", () => {
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

  suite("setExceptionBreakpoints in eval", () => {
    const PROGRAM = path.join(DATA_ROOT, "evalWithException.js");

    test("should not stop on an exception in `eval`", () => {
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

    test("should stop on a caught exception in `eval`", async () => {
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

        dc.launch({ command: `node ${PROGRAM}`, preset: "node" })
      ]);
      await dc.assertStoppedInEvalLocation("exception", 4);
      await dc.continueRequest({ threadId: 0 });
      await dc.assertStoppedInEvalLocation("exception", 3);
      await dc.continueRequest({ threadId: 0 });
      await dc.assertStoppedInEvalLocation("exception", 3);
      await dc.continueRequest({ threadId: 0 });
      await dc.assertStoppedInEvalLocation("exception", 2);
      await dc.continueRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
  });

  suite("output events", () => {
    const PROGRAM = path.join(NODE_DATA_ROOT, "programWithOutput.js");

    test("stdout and stderr events should be complete and in correct order", () => {
      return Promise.all([
        dc.configurationSequence(),
        dc.launch({ command: `node ${PROGRAM}`, preset: "node" }),
        dc.assertOutput(
          "stdout",
          "Hello stdout 0\nHello stdout 1\nHello stdout 2\n"
        )
        //dc.assertOutput('stderr', 'Hello stderr 0\nHello stderr 1\nHello stderr 2\n')
      ]);
    });
  });
  suite("stepping", () => {
    const PROGRAM = path.join(DATA_ROOT, "stepsTest.js");
    test("should enter all functions on `step in`", async function() {
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true
        })
      ]);
      await dc.assertStoppedLocation("entry", {
        path: PROGRAM,
        line: 1
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: PROGRAM,
        line: 9
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: PROGRAM,
        line: 3
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: PROGRAM,
        line: 4
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: PROGRAM,
        line: 7
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: PROGRAM,
        line: 10
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
    test("should exit function on `step out`", async function() {
      await dc.hitBreakpoint(
        {
          command: `node ${PROGRAM}`,
          preset: "node"
        },
        { path: PROGRAM, line: 7 }
      );
      await dc.stepOutRequest({ threadId: 0 });
      await dc.assertStoppedLocation("stepOut", {
        path: PROGRAM,
        line: 8
      });
      await dc.stepOutRequest({ threadId: 0 });
      await dc.assertStoppedLocation("stepOut", {
        path: PROGRAM,
        line: 5
      });
      await dc.stepOutRequest({ threadId: 0 });
      await dc.assertStoppedLocation("stepOut", {
        path: PROGRAM,
        line: 11
      });
      await dc.stepOutRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
    test("should exit function on `step over`", async function() {
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true
        })
      ]);
      await dc.setBreakpointsRequest({
        lines: [7],
        breakpoints: [{ line: 7, column: 0 }],
        source: { path: PROGRAM }
      });
      await dc.nextRequest({ threadId: 0 });
      await dc.assertStoppedLocation("next", {
        path: PROGRAM,
        line: 9
      });
      await dc.nextRequest({ threadId: 0 });
      await dc.assertStoppedLocation("breakpoint", {
        path: PROGRAM,
        line: 7
      });
      await dc.nextRequest({ threadId: 0 });
      await dc.assertStoppedLocation("next", {
        path: PROGRAM,
        line: 10
      });
      await dc.nextRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
  });
  suite("`require` stepping", () => {
    const PROGRAM = path.join(DATA_ROOT, "stepsModule.js");
    const MOD2 = path.join(DATA_ROOT, "stepsModule2.js");
    const MOD3 = path.join(DATA_ROOT, "stepsModule3.js");
    test("should enter each module only once on `step in`", async function() {
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true
        })
      ]);
      await dc.assertStoppedLocation("entry", {
        path: PROGRAM,
        line: 1
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: MOD2,
        line: 1
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: MOD3,
        line: 4
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: MOD3,
        line: 2
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: MOD2,
        line: 2
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: PROGRAM,
        line: 2
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
    test("should exit modules top level on `step out`", async function() {
      await dc.hitBreakpoint(
        {
          command: `node ${PROGRAM}`,
          preset: "node"
        },
        { path: MOD3, line: 2 }
      );
      await dc.stepOutRequest({ threadId: 0 });
      await dc.assertStoppedLocation("stepOut", {
        path: MOD3,
        line: 3
      });
      await dc.stepOutRequest({ threadId: 0 });
      await dc.assertStoppedLocation("stepOut", {
        path: MOD3,
        line: 4
      });
      await dc.stepOutRequest({ threadId: 0 });
      await dc.assertStoppedLocation("stepOut", {
        path: MOD2,
        line: 3
      });
      await dc.stepOutRequest({ threadId: 0 });
      await dc.assertStoppedLocation("stepOut", {
        path: PROGRAM,
        line: 3
      });
      await dc.stepOutRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
    test("should exit function on `step over`", async function() {
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true
        })
      ]);
      await dc.setBreakpointsRequest({
        lines: [2],
        breakpoints: [{ line: 2, column: 0 }],
        source: { path: MOD3 }
      });
      await dc.nextRequest({ threadId: 0 });
      await dc.assertStoppedLocation("breakpoint", {
        path: MOD3,
        line: 2
      });
      await dc.nextRequest({ threadId: 0 });
      await dc.assertStoppedLocation("next", {
        path: MOD2,
        line: 2
      });
      await dc.nextRequest({ threadId: 0 });
      await dc.assertStoppedLocation("next", {
        path: PROGRAM,
        line: 2
      });
      await dc.nextRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
  });
  suite("async", () => {
    const PROGRAM = path.join(DATA_ROOT, "setTimeout.js");
    test("should await an async event", async function() {
      const out = dc.assertOutput("stdout", "BEFORE\nAFTER\nBEFORE\nAFTER\n");
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true
        })
      ]);
      await dc.assertStoppedLocation("entry", {
        path: PROGRAM,
        line: 7
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: PROGRAM,
        line: 8
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: PROGRAM,
        line: 2
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: PROGRAM,
        line: 3
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: PROGRAM,
        line: 4
      });
      await dc.stepOutRequest({ threadId: 0 });
      await dc.assertStoppedLocation("stepOut", {
        path: PROGRAM,
        line: 5
      });
      await dc.stepInRequest({ threadId: 0 });
      await dc.assertStoppedLocation("step", {
        path: PROGRAM,
        line: 9
      });
      await dc.nextRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
      await out;
    });
  });
  suite("hot swapping", () => {
    const PROGRAM = path.join(DATA_ROOT, "hot-swap-main.js");
    teardown(() => util.promisify(fs.unlink)(PROGRAM));
    const copy = util.promisify(fs.copyFile);
    test("should change the functions code", async () => {
      const out = dc.assertOutput("stdout", "M:1\nN:2\n");
      await copy(path.join(DATA_ROOT, "hot1.js"), PROGRAM);
      await dc.hitBreakpoint(
        {
          command: `node ${PROGRAM}`,
          preset: "node"
        },
        { path: PROGRAM, line: 2 }
      );
      await dc.continueRequest({ threadId: 0 });
      await dc.assertStoppedLocation("breakpoint", {
        path: PROGRAM,
        line: 2
      });
      await copy(path.join(DATA_ROOT, "hot2.js"), PROGRAM);
      await dc.waitForEvent("loadedSources");
      await dc.continueRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
      await out;
    });
  });
  suite("child processes", () => {
    const PROGRAM = path.join(DATA_ROOT, "spawn.js");
    const CP1 = path.join(DATA_ROOT, "child_process1.js");
    const CP2 = path.join(DATA_ROOT, "child_process2.js");
    test("should create threads on each child process", async () => {
      await Promise.all([
        dc.configurationSequence(),
        dc.launch({
          command: `node ${PROGRAM}`,
          preset: "node",
          stopOnEntry: true
        })
      ]);
      await dc.assertStoppedLocation("entry", {
        path: PROGRAM,
        line: 1
      });
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
  suite.skip("other terminals", () => {});
  suite("`eval` scopes", () => {
    const PROGRAM = path.join(DATA_ROOT, "scopes.js");
    test("should correctly refer variables", async () => {
      async function watch(res: string) {
        assert.equal(
          (await dc.evaluateRequest({
            context: "watch",
            frameId: (await dc.assertStoppedLocation("debugger_statement", {}))
              .body.stackFrames[0].id,
            expression: "`i:${i},j:${j},k:${k}`"
          })).body.result,
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
          { this: { obj: "OBJ" }, j: "J2", "[name]": "f" },
          { this: { obj: "OBJ" }, i: "I2", j: "J1", "[name]": "f" },
          { i: "I1", k: "K1+1", "[name]": "f" }
        ],
        [
          { this: { obj: "OBJ" }, i: "I2", j: "J1", "[name]": "f" },
          { i: "I1", k: "K1+1", "[name]": "f" }
        ],
        [{ i: "I1", k: "K1+1", "[name]": "f" }]
      ]);
      await dc.continueRequest({ threadId: 0 });
      await watch("i:GI,j:J3,k:GK+2");
      assert.deepEqual(await dc.scopeDescr(), [
        [{ j: "J3", "[name]": "f" }],
        [
          { this: { obj: "OBJ" }, j: "J1", "[name]": "f" },
          { i: "I1", k: "K1+1-1", "[name]": "f" }
        ],
        [{ i: "I1", k: "K1+1-1", "[name]": "f" }]
      ]);
      await dc.continueRequest({ threadId: 0 });
      await watch("i:I3,j:JF,k:GK+2-2+3");
      assert.deepEqual(await dc.scopeDescr(), [
        [{ this: { obj: "OBJ" }, j: "JF", i: "I3", "[name]": "f" }],
        [
          { this: { obj: "OBJ" }, j: "J1", "[name]": "f" },
          { i: "I1", k: "K1+1-1", "[name]": "f" }
        ],
        [{ i: "I1", k: "K1+1-1", "[name]": "f" }]
      ]);
      await dc.continueRequest({ threadId: 0 });
      await watch("i:I1,j:J4,k:KL");
      assert.deepEqual(await dc.scopeDescr(), [
        [
          { this: { obj: "OBJ" }, j: "J4", "[name]": "f" },
          { this: { obj: "OBJ" }, k: "KL", "[name]": "f" },
          { this: { obj: "OBJ" }, j: "J1", "[name]": "f" },
          { i: "I1", k: "K1+1-1", "[name]": "f" }
        ],
        [
          { this: { obj: "OBJ" }, k: "KL", "[name]": "f" },
          { this: { obj: "OBJ" }, j: "J1", "[name]": "f" },
          { i: "I1", k: "K1+1-1", "[name]": "f" }
        ],
        [
          { this: { obj: "OBJ" }, j: "J1", "[name]": "f" },
          { i: "I1", k: "K1+1-1", "[name]": "f" }
        ],
        [{ i: "I1", k: "K1+1-1", "[name]": "f" }]
      ]);
      await dc.continueRequest({ threadId: 0 });
      await watch("i:GI,j:J5,k:GK+2-2+3-3");
      assert.deepEqual(await dc.scopeDescr(), [
        [{ j: "J5", "[name]": "f" }],
        [
          { this: { obj: "OBJ" }, k: "KL", "[name]": "f" },
          { this: { obj: "OBJ" }, j: "J1", "[name]": "f" },
          { i: "I1", k: "K1+1-1", "[name]": "f" }
        ],
        [
          { this: { obj: "OBJ" }, j: "J1", "[name]": "f" },
          { i: "I1", k: "K1+1-1", "[name]": "f" }
        ],
        [{ i: "I1", k: "K1+1-1", "[name]": "f" }]
      ]);
      await dc.continueRequest({ threadId: 0 });
      await dc.waitForEvent("terminated");
    });
  });
});
