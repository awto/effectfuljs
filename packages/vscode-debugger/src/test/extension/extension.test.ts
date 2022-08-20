import * as assert from "assert";
import * as vscode from "vscode";
import * as path from "path";

const WORKSPACE = path.resolve(__dirname, "..", "..", "..", "testdata");

declare const document: any;

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function() {
  this.timeout(0);
  test("should be activated", async function() {
    this.timeout(0);
    const ext = vscode.extensions.getExtension("effectful.debugger");
    assert.ok(ext);
    await ext!.activate();
  });
  test.skip("should register all commands", async function() {
    const _commands = await vscode.commands.getCommands(true);
    //TODO
  });
  // this test randomly hangs on CI only, maybe because of timeouts
  test("should start a debug session", async function() {
    const file = path.resolve(WORKSPACE, "extensionTest.js");
    const doc = await vscode.workspace.openTextDocument(
      file.replace(/\\/g, "/")
    );
    await vscode.window.showTextDocument(doc, { preview: false });
    assert.ok(
      await vscode.debug.startDebugging(void 0, {
        type: "effectful",
        request: "launch",
        name: "Launch Node application",
        preset: "node",
        stopOnEntry: false,
        timeTravel: false,
        cwd: WORKSPACE,
        command: 'node',
        args: [file],
        console: "integratedTerminal",
        env: {
          EFFECTFUL_DEBUGGER_INSTRUMENT_DEPS:0,
          EFFECTFUL_DEBUGGER_EXCLUDE:"**/packages/{debugger,serialization,core,transducers}/**"
        }
      })
    );
    // TODO: for now we are happy if nothing throws,
    // but more checks should be added here
  });
});
