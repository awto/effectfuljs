import * as assert from "assert";
import * as Support from "vscode-debugadapter-testsupport";
import { DebugProtocol } from "vscode-debugprotocol";
import {
  IPartialLocation,
  ILocation
} from "vscode-debugadapter-testsupport/lib/debugClient";

export class DebugClient extends Support.DebugClient {
  constructor(executable: string) {
    super("node", executable, "effectful", {}, true);
    this.defaultTimeout = 1000000;
  }

  private assertPartialLocationsEqualCopy(
    locA: IPartialLocation,
    locB: IPartialLocation
  ): void {
    if (locA.path) {
      this.assertPath(
        locA.path,
        <string>locB.path,
        "breakpoint verification mismatch: path"
      );
    }
    if (typeof locA.line === "number") {
      assert.equal(
        locA.line,
        locB.line,
        "breakpoint verification mismatch: line"
      );
    }
    if (typeof locB.column === "number" && typeof locA.column === "number") {
      assert.equal(
        locA.column,
        locB.column,
        "breakpoint verification mismatch: column"
      );
    }
  }
  public async assertStoppedInEvalLocation(
    reason: string,
    line: number,
    loaded?: DebugProtocol.LoadedSourceEvent
  ) {
    if (!loaded)
      loaded = <DebugProtocol.LoadedSourceEvent>(
        await this.waitForEvent("loadedSources")
      );
    const stop = await this.assertStoppedLocation(reason, { line });
    const frame = stop.body.stackFrames[0];
    assert.equal(
      frame.source && frame.source.sourceReference,
      loaded.body.source.sourceReference,
      "same reference"
    );
  }
  public async scopeDescr(
    threadId: number = 0
  ): Promise<{ [name: string]: any }[][]> {
    const res: { [name: string]: any }[][] = [];
    const stack = await this.stackTraceRequest({ threadId });
    const known = new Map<number, any>();
    const varValue = async (variablesReference: number) => {
      let res = known.get(variablesReference);
      if (res) return res;
      res = {};
      known.set(variablesReference, res);
      const ref = await this.variablesRequest({ variablesReference });
      for (const i of ref.body.variables)
        res[i.name] = i.variablesReference
          ? await varValue(i.variablesReference)
          : i.value;
      return res;
    };
    for (const i of stack.body.stackFrames) {
      const frame: { [name: string]: any }[] = [];
      res.push(frame);
      const { scopes } = (await this.scopesRequest({ frameId: i.id })).body;
      for (const j of scopes.slice(0, scopes.length - 1)) {
        const scope = await varValue(j.variablesReference);
        frame.push(scope);
        scope["[name]"] = j.name;
      }
    }
    return res;
  }
  public hitBreakpoint(
    launchArgs: any,
    location: ILocation,
    expectedStopLocation?: IPartialLocation,
    expectedBPLocation?: IPartialLocation
  ): Promise<any> {
    return Promise.all([
      this.waitForEvent("initialized").then(async event => {
        const response = await this.setBreakpointsRequest({
          lines: [location.line],
          breakpoints: [{ line: location.line, column: location.column }],
          source: { path: location.path }
        });
        let bp = response.body.breakpoints[0];
        const verified =
          typeof location.verified === "boolean" ? location.verified : true;
        if (verified) {
          while (!bp.verified) {
            const event = await this.waitForEvent("breakpoint");
            bp = event.body.breakpoint;
          }
        }
        assert.equal(
          bp.verified,
          verified,
          "breakpoint verification mismatch: verified"
        );
        const actualLocation: ILocation = {
          column: bp.column,
          line: <number>bp.line,
          path: <string>(bp.source && bp.source.path)
        };
        this.assertPartialLocationsEqualCopy(
          actualLocation,
          expectedBPLocation || location
        );
        return this.configurationDoneRequest();
      }),
      this.launch(launchArgs),
      this.assertStoppedLocation("breakpoint", expectedStopLocation || location)
    ]);
  }
}
