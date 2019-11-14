import { DebugProtocol } from "vscode-debugprotocol";

export { DebugProtocol };

declare module "vscode-debugprotocol" {
  namespace DebugProtocol {
    export interface ChildLaunch extends Request {
      // command: "childLaunch",
      arguments: {
        threadId: number;
        stopOnEntry?: boolean;
        dirSep: string;
        breakpoints: SetBreakpointsArguments[];
        exceptions: SetExceptionBreakpointsArguments;
      };
    }

    interface ChildSetBreakpoints extends Request {
      // command: "childSetBreakpoints"
    }

    type BreakpointInfo = DebugProtocol.SourceBreakpoint &
      DebugProtocol.Breakpoint;

    interface ChildSetBreakpointsResponse {
      body: {
        path: string;
        breakpoints: BreakpointInfo[];
      };
    }

    interface LaunchRequestArguments {
      stopOnEntry?: boolean;
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
    }
  }
}
