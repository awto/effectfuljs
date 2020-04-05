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
// const D = require("../backends/vscode");

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
});
