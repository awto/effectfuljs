import { DebugProtocol } from "vscode-debugprotocol";

export { DebugProtocol };

declare module "vscode-debugprotocol" {
  namespace DebugProtocol {
    export interface ChildLaunch extends Request {
      // command: "childLaunch",
      arguments: {
        threadId: number;
        stopOnEntry?: boolean;
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
      trace?: boolean;
    }
  }
}
