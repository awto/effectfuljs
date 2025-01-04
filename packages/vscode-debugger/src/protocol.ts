/* eslint-disable @typescript-eslint/no-namespace */
import { DebugProtocol } from "@vscode/debugprotocol";

export { DebugProtocol };

declare module "@vscode/debugprotocol" {
  namespace DebugProtocol {
    type BreakpointInfo = DebugProtocol.SourceBreakpoint &
      DebugProtocol.Breakpoint;

    interface LaunchRequestArguments {
      stopOnEntry?: boolean;
      stopOnExit?: boolean;
      verbose?: boolean;
      command?: string;
      preset?: string;
      reuse?: boolean;
      cwd?: string;
      env?: { [name: string]: string | undefined };
      argv0?: string;
      args?: string[];
      shell?: boolean | string;
      skipRuntimeInstall?: boolean;
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
      include?: string;
      exclude?: string;
      blackbox?: string;
      moduleAliases?: { [name: string]: string };
    }
  }
}
