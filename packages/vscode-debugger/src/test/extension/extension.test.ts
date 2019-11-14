//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
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
  test("should start a debug session", async function() {
    const doc = await vscode.workspace.openTextDocument(
      path.resolve(WORKSPACE, "extensionTest.js").replace(/\\/g, "/")
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
        cwd: "${workspaceRoot}",
        command: 'node',
        args: ["${file}"],
        console: "integratedTerminal",
        env: {}
      })
    );
    // TODO: for now we are happy if nothing throws,
    // but more checks should be added here
  });
});
