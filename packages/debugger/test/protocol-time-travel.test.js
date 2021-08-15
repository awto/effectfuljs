const config = require("../config").default;
config.timeTravel = true;
const path = require("path");
const DEBUG = false;
config.debuggerDebug = DEBUG;
config.verbose = DEBUG;
config.redirConsole = !DEBUG;
config.localConsole = DEBUG;
config.srcRoot = path.resolve(path.join(__dirname, ".."));
config.localConsole = false;
const Kit = require("./protocol");

if (typeof jest !== "undefined") jest.setTimeout(30000);

describe("VSCode protocol handlers with time traveling", function() {
  afterEach(Kit.teardown);
  test("step back calls", function(done) {
    Kit.traverseBack(
      require("./__fixtures__/tt/stepBackPlain"),
      {},
      "stepBack",
      "stepIn",
      done
    );
  });
  test("step back in async function", function(done) {
    Kit.traverseBack(
      require("./__fixtures__/tt/stepBackAsync"),
      {},
      "stepBack",
      "stepIn",
      done
    );
  });
  test("step back in CJS require", function(done) {
    Kit.traverseBack(
      require("./__fixtures__/tt/stepBackCJS"),
      {},
      "stepBack",
      "stepIn",
      done
    );
  });
  test("step back in ESM imports", function(done) {
    Kit.traverseBack(
      require("./__fixtures__/tt/stepBackESM"),
      {},
      "stepBack",
      "stepIn",
      done
    );
  });
  test("reverse continue", function(done) {
    Kit.traverseBack(
      require("./__fixtures__/tt/reverseContinuePlain"),
      {},
      "reverseContinue",
      "continue",
      done
    );
  });
  test("reverse continue in async function", function(done) {
    Kit.traverseBack(
      require("./__fixtures__/tt/reverseContinueAsync"),
      {},
      "reverseContinue",
      "continue",
      done
    );
  });
  test("reverse continue in CJS require", function(done) {
    Kit.traverseBack(
      require("./__fixtures__/tt/reverseContinueCJS"),
      {},
      "reverseContinue",
      "continue",
      done
    );
  });
  test("reverse continue in ESM imports", function(done) {
    Kit.traverseBack(
      require("./__fixtures__/tt/reverseContinueESM"),
      {},
      "reverseContinue",
      "continue",
      done
    );
  });
  test("`step in` into Proxies/setters/getters", function(done) {
    Kit.traverse(
      require("./__fixtures__/tt/proxies"),
      { stopOnEntry: true },
      "stepIn",
      done
    );
  });
  test("data breakpoints", function(done) {
    let state = "start";
    let topRef, ar1Ref, ar2Ref, objRef;
    let setRefs;
    let breakpoints = [];
    let passNum = 0;
    const lines = [];
    walk();
    function walk(args) {
      try {
        for (;;)
          switch (state) {
            case "start":
              state = "init";
              Kit.launch(
                require("./__fixtures__/tt/databreakpoints"),
                {},
                walk
              );
              return;
            case "init":
              state = "stack";
              Kit.command("stackTrace", {}, walk);
              return;
            case "stack":
              state = "scope";
              Kit.command("scopes", { threadId: 0, frameId: 0 }, walk);
              return;
            case "scope":
              topRef = args.scopes[0].variablesReference;
              state = "varRefs";
              Kit.command("variables", { variablesReference: topRef }, walk);
              return;
            case "varRefs":
              ar1Ref = varRefByName(args, "ar1");
              ar2Ref = varRefByName(args, "ar2");
              objRef = varRefByName(args, "obj");
              setRefs = [
                [topRef, "loc"],
                [ar1Ref, "length"],
                [ar2Ref, "2"],
                [objRef, "p1"],
                [objRef, "__proto__"],
                [-1, "doesn't exist"]
              ];
            case "brkInfo0":
              if (!setRefs.length) {
                state = "continue";
                expect(breakpoints.length).toBe(5);
                Kit.command("setDataBreakpoints", { breakpoints }, walk);
              } else {
                const [variablesReference, name] = setRefs[0];
                state = "brkInfo1";
                Kit.command(
                  "dataBreakpointInfo",
                  { variablesReference, name },
                  walk
                );
              }
              return;
            case "brkInfo1":
              if (setRefs[0][0] === -1) expect(args.dataId).toBe(null);
              else
                breakpoints.push({ dataId: args.dataId, accessType: "write" });
              state = "brkInfo0";
              setRefs.shift();
              break;
            case "stopped":
              lines.push(args.stackFrames[0].line);
            case "continue":
              state = "running";
              Kit.command(
                passNum === 1 ? "reverseContinue" : "continue",
                { breakpoints },
                walk
              );
              return;
            case "running":
              state = "traverse";
              Kit.awaitEvent("stopped", walk);
              return;
            case "traverse":
              if (args.reason === "debugger_statement") {
                pos = lines.length;
                lines.push(`> pass(${passNum})`);
                if (passNum++ === 2) {
                  expect(lines).toMatchSnapshot();
                  return done();
                }
                state = "continue";
                break;
              }
              state = "stopped";
              expect(args.reason).toBe("data breakpoint");
              Kit.command("stackTrace", { breakpoints }, walk);
              return;
          }
      } catch (e) {
        done(e);
      }
    }
  });
  function varRefByName(args, name) {
    return args.variables.find(i => i.name === name).variablesReference;
  }
});
