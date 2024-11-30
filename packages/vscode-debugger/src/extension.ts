import * as vscode from "vscode";
import { DebugSession } from "./session";
import * as Net from "net";

const EMBED_DEBUG_ADAPTER = true;

function progress(title: string): () => void {
  let cb = (_t?: any) => {};
  vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Window,
      title
    },
    () => new Promise(i => (cb = i))
  );
  return () => cb();
}

function errMessage(msg: string) {
  return vscode.window.showErrorMessage(msg);
}

export function activate(context: vscode.ExtensionContext) {
  if (EMBED_DEBUG_ADAPTER) {
    const factory = new DebugAdapterDescriptorFactory();
    context.subscriptions.push(
      vscode.debug.registerDebugAdapterDescriptorFactory("effectful", factory)
    );
    context.subscriptions.push(factory);
  }
}

export function deactivate() {}

class DebugAdapterDescriptorFactory
  implements vscode.DebugAdapterDescriptorFactory
{
  private server?: Net.Server;

  createDebugAdapterDescriptor(
    _session: vscode.DebugSession,
    _executable: vscode.DebugAdapterExecutable | undefined
  ): vscode.ProviderResult<vscode.DebugAdapterDescriptor> {
    if (!this.server) {
      this.server = Net.createServer(socket => {
        const session = new DebugSession();
        session.progressHandler = progress;
        session.showError = errMessage;
        session.setRunAsServer(true);
        session.start(<NodeJS.ReadableStream>socket, socket);
      }).listen(0);
    }

    return new vscode.DebugAdapterServer(
      (<Net.AddressInfo>this.server.address()).port
    );
  }

  dispose() {
    if (this.server) {
      this.server.close();
    }
  }
}
