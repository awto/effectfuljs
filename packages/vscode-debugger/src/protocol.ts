import { DebugProtocol } from "vscode-debugprotocol";

export { DebugProtocol };

declare module "vscode-debugprotocol" {
  namespace DebugProtocol {
    type BreakpointInfo = DebugProtocol.SourceBreakpoint &
      DebugProtocol.Breakpoint;

    interface LaunchRequestArguments {
      stopOnEntry?: boolean;
      stopOnExit?: boolean;
      verbose?: boolean;
      command?: string | boolean;
      preset?: string | boolean;
      reuse?: boolean;
      cwd?: string;
      env?: { [name: string]: string | undefined };
      argv0?: string;
      args?: string[];
      timeTravel?: boolean;
      timeTravelDisabled?: boolean;
      keepRunning?: boolean;
      open?: boolean | string;
      console?:
        | boolean
        | "internalConsole"
        | "integratedTerminal"
        | "externalTerminal";
      indexJs?: string | null;
      htmlTemplate?: string | null;
      reconnectTimeout?: number;
      debuggerHost?: string;
      debuggerPort?: number;
      runtime?: string;
      srcRoot?: string;
      fastRestart?: string;
      onChange?: string;
    }
  }
}
