const config = require("../config").default;
const path = require("path");
const DEBUG = false;
config.debuggerDebug = DEBUG;
config.verbose = DEBUG;
config.redirConsole = !DEBUG;
config.localConsole = DEBUG;
config.srcRoot = path.resolve(path.join(__dirname, ".."));
config.localConsole = false;
const Kit = require("./protocol");
const D = require("../backends/vscode");
const { context } = require("../state");

describe("VSCode protocol handlers", function() {
  afterEach(Kit.teardown);
  test("step in", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepInPlain"),
      { stopOnEntry: true },
      "stepIn",
      done
    );
  });
  test("`step in` for CommonJS require", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepInCJS"),
      { stopOnEntry: true },
      "stepIn",
      done
    );
  });
  test("`step in` for ESM imports", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepInESM"),
      { stopOnEntry: true },
      "stepIn",
      done
    );
  });
  test("`step in` in async functions", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepInAsync"),
      { stopOnEntry: true },
      "stepIn",
      done
    );
  });
  test("`step in` in generators", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepInGenerator"),
      { stopOnEntry: true },
      "stepIn",
      done
    );
  });
  test("`step in` in async generators", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepInAsyncGenerator"),
      { stopOnEntry: true },
      "stepIn",
      done
    );
  });
  test("`step over` in plain functions", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepOverPlain"),
      { stopOnEntry: true },
      "next",
      done
    );
  });
  test("`step over` for CommonJS require", function(done) {
    Kit.traverse(require("./__fixtures__/stepOverCJS"), {}, "next", done);
  });
  test("`step over` for ESM imports", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepOverESM"),
      { stopOnEntry: true },
      "next",
      done
    );
  });
  test("`step over` in async functions", function(done) {
    Kit.traverse(require("./__fixtures__/stepOverAsync"), {}, "next", done);
  });
  test("`step over` in generator functions", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepOverGenerator"),
      { stopOnEntry: true },
      "next",
      done
    );
  });
  test("`step over` in async generator functions", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepOverAsyncGenerator"),
      {},
      "next",
      done
    );
  });
  test("`step out` in plain functions", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepOutPlain"),
      { stopOnEntry: true },
      "stepOut",
      done
    );
  });
  test("`step out` for CommonJS require", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepOutCJS"),
      { stopOnEntry: true },
      "stepOut",
      done
    );
  });
  test("`step out` for ESM imports", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepOutESM"),
      { stopOnEntry: true },
      "stepOut",
      done
    );
  });
  test("`step out` in async functions", function(done) {
    Kit.traverse(require("./__fixtures__/stepOutAsync"), {}, "stepOut", done);
  });
  test("`step out` in generator functions", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepOutGenerator"),
      {},
      "stepOut",
      done
    );
  });
  test("`step out` in async generator functions", function(done) {
    Kit.traverse(
      require("./__fixtures__/stepOutAsyncGenerator"),
      {},
      "stepOut",
      done
    );
  });
  test("breakpoints", function(done) {
    const PROGRAM = path.resolve(
      config.srcRoot,
      require.resolve("./__fixtures__/breakpoints")
    );
    const SUB_MODULE = path.resolve(
      config.srcRoot,
      require.resolve("./__fixtures__/breakpointSubMod")
    );
    const bps = [
      { line: 5 },
      { line: 8, expLine: 11 },
      { line: 12 },
      { line: 4, expLine: 15 }
    ];
    Kit.awaitEvent("breakpoint", function(event) {
      const bp = bps.find(i => i.id === event.brekpoint.id);
      if (bp) {
        expect(bp.verified).toBe(true);
        expect(bp.line).toBe(bp.expLine || bp.line);
        bp.verified = true;
      }
      return false;
    });
    Kit.traverse(
      /* requied with `expEagerModuleExport: false`:
          (context.moduleId = require.resolve("./__fixtures__/breakpoints")),*/
      require("./__fixtures__/breakpoints"),
      {
        breakpoints: [
          {
            source: {
              path: PROGRAM
            },
            breakpoints: [
              {
                line: 3
              }
            ]
          },
          {
            source: {
              path: SUB_MODULE
            },
            breakpoints: [
              {
                line: 2
              }
            ]
          }
        ],
        onStop(cb, frame) {
          if (frame.line === 3) {
            Kit.command(
              "childSetBreakpoints",
              {
                breakpoints: bps.map(i => ({ line: i.line })),
                source: { path: PROGRAM }
              },
              function(res) {
                res.breakpoints.forEach(function(i, x) {
                  const bp = bps[x];
                  bp.id = x.id;
                  bp.verified = true;
                  if ((bp.verified = i.verified)) {
                    expect(bp.expLine || bp.line).toBe(i.line);
                  }
                });
                cb();
              }
            );
          } else cb();
        }
      },
      "continue",
      function() {
        expect(bps.every(i => i.verified)).toBe(true);
        done();
      }
    );
  });
  test("conditional breakpoints", function(done) {
    const PROGRAM = path.resolve(
      config.srcRoot,
      require.resolve("./__fixtures__/conditionalBreakpoints")
    );
    Kit.traverse(
      require("./__fixtures__/conditionalBreakpoints"),
      {
        breakpoints: [
          {
            source: {
              path: PROGRAM
            },
            breakpoints: [
              {
                line: 3,
                condition: "i === 3"
              }
            ]
          }
        ]
      },
      "continue",
      done
    );
  });
  test("watch expression", function(done) {
    const vals = [];
    Kit.traverse(
      require("./__fixtures__/watchExpr"),
      {
        stopOnEntry: true,
        onStop(cb) {
          Kit.command(
            "evaluate",
            {
              context: "watch",
              expression: "`i:${i},j:${j}`",
              frameId: 0
            },
            function(resp) {
              vals.push(resp.result);
              Kit.command(
                "evaluate",
                {
                  context: "watch",
                  expression: "{i:i,j:j}",
                  frameId: 0
                },
                function(resp) {
                  if (resp.variablesReference)
                    Kit.varValue(resp.variablesReference, 2, function(value) {
                      vals.push(value);
                      cb();
                    });
                  else {
                    vals.push(resp.result);
                    cb();
                  }
                }
              );
            }
          );
        }
      },
      "stepIn",
      function() {
        try {
          expect(vals).toMatchSnapshot();
          done();
        } catch (e) {
          done(e);
        }
      }
    );
  });
  test("logpoint", function(done) {
    const vals = [];
    Kit.traverse(
      require("./__fixtures__/logPoints"),
      {
        breakpoints: [
          {
            source: {
              path: path.resolve(
                config.srcRoot,
                require.resolve("./__fixtures__/logPoints")
              )
            },
            breakpoints: [
              {
                line: 3,
                logMessage: "i:{i}, j:{j}"
              }
            ]
          }
        ]
      },
      "continue",
      done
    );
  });
  test("hit conditions", function(done) {
    const vals = [];
    Kit.traverse(
      require("./__fixtures__/hitCond"),
      {
        breakpoints: [
          {
            source: {
              path: path.resolve(
                config.srcRoot,
                require.resolve("./__fixtures__/hitCond")
              )
            },
            breakpoints: [
              {
                line: 3,
                hitCondition: "HIT_AT-2"
              }
            ]
          }
        ]
      },
      "continue",
      done
    );
  });
  // different paths on server TODO:
  test.skip("all exception breakpoints", function(done) {
    Kit.traverse(
      require("./__fixtures__/exceptionBreakpoints"),
      {
        exceptions: {
          filters: ["all"]
        }
      },
      "continue",
      done
    );
  });
  // different paths on server TODO:
  test.skip("uncaught exception breakpoints", function(done) {
    Kit.traverse(
      require("./__fixtures__/exceptionBreakpointsUncaught"),
      {
        stopOnEntry: true,
        onStop(cb, frame) {
          if (frame.line === 1)
            Kit.command(
              "childSetExceptionBreakpoints",
              { filters: ["uncaught"] },
              cb
            );
          else cb();
        }
      },
      "continue",
      done
    );
  });
  test("stepping in `eval`", function(done) {
    let num = 0;
    Kit.traverse(
      require("./__fixtures__/evalDir"),
      {
        onStop(cb, frame) {
          num++;
          if (num === 1) {
            Kit.command(
              "childSetBreakpoints",
              {
                breakpoints: [
                  {
                    line: 4,
                    condition: "i === 3"
                  }
                ],
                source: { sourceReference: frame.file }
              },
              function(res) {
                const {
                  breakpoints: [bp]
                } = res;
                expect(bp.line).toBe(4);
                expect(bp.verified).toBe(true);
                cb();
              }
            );
          } else if (num === 2) {
            Kit.command(
              "evaluate",
              {
                context: "watch",
                expression: "`i:${i},j:${j}`",
                frameId: 0
              },
              function(resp) {
                expect(resp.result).toBe("i:3,j:1");
                cb();
              }
            );
          } else cb();
        }
      },
      "continue",
      done
    );
  });
  test("stepping in indirect `eval`", function(done) {
    let num = 0;
    Kit.traverse(
      require("./__fixtures__/evalIndir"),
      {
        onStop(cb, frame) {
          num++;
          if (num === 1) {
            Kit.command(
              "childSetBreakpoints",
              {
                breakpoints: [
                  {
                    line: 4,
                    condition: "i === 3"
                  }
                ],
                source: { sourceReference: frame.file }
              },
              function(res) {
                const {
                  breakpoints: [bp]
                } = res;
                expect(bp.line).toBe(4);
                expect(bp.verified).toBe(true);
                cb();
              }
            );
          } else if (num === 2) {
            expect(frame.line).toBe(4);
            Kit.command(
              "evaluate",
              {
                context: "watch",
                expression: "`i:${i},j:${j}`",
                frameId: 0
              },
              function(resp) {
                expect(resp.result).toBe("i:3,j:2");
                cb();
              }
            );
          } else cb();
        }
      },
      "continue",
      done
    );
  });
  test("stepping in Function constructor", function(done) {
    Kit.traverse(require("./__fixtures__/funconstr"), {}, "stepOut", done);
  });
  // this breaks Promises (leaves them in inconsistent state)
  // so works only if run last (TODO: adapt test)
  test.skip("pause", function(done) {
    let pauseDone = false;
    Kit.launch(require("./__fixtures__/pause"), {}, function() {
      Kit.awaitEvent("stopped", function(args) {
        expect(args.reason).toBe("step");
        Kit.command("stackTrace", {}, function(stack) {
          try {
            const frame = stack.stackFrames[0];
            expect(pauseDone).toBe(true);
            expect(frame.name).toBe("main");
            expect(frame.line).toBe(3);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      setTimeout(function() {
        Kit.command("pause", {}, function() {
          pauseDone = true;
        });
      }, 100);
    });
  });
});
