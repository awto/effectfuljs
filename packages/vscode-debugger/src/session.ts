import {
  logger,
  Logger,
  InitializedEvent,
  Response,
  Event,
  TerminatedEvent,
  BreakpointEvent,
  Thread,
  ThreadEvent,
  CapabilitiesEvent,
  OutputEvent,
  DebugSession as SessionImpl,
  ProgressStartEvent,
  ProgressEndEvent
} from "vscode-debugadapter";

import { DebugProtocol as P } from "./protocol";
import { toThread, Handler as CommsHandler } from "./comms";
import { Message } from "vscode-debugadapter/lib/messages";
import { spawn, ChildProcess } from "child_process";
import * as path from "path";
import subscribe from "./wscomms";
import { totalmem } from "os";

const MAX_OLD_SPACE = Math.floor(totalmem() /  (2 * 1024 * 1024));

interface Handler extends CommsHandler {
  dataBreakpoints?: Set<P.Breakpoint>;
}

const normalizeDrive =
  typeof process !== "undefined" && process.platform === "win32"
    ? function normalizeDrive(path: string) {
        return path && path.length > 2 && path[1] === ":"
          ? path.charAt(0).toUpperCase() + path.slice(1)
          : path;
      }
    : function (path: string) {
        return path;
      };

function packageBase(name: string) {
  const f = name[0];
  if (f === "@") return name.split("/").slice(0, 2).join("/");
  if (f === "." || f === "/" || f === "~" || name[1] === ":") return f;
  return name.split("/")[0];
}

const runningCommands: Map<string, ChildProcess> = new Map();

const RUNINTERMINAL_TIMEOUT = 5000;
const CONFIGURATION_DONE_REQUEST_TIMEOUT = 1000;

interface BreakpointInfo {
  id: number;
  source: P.Source;
  remotes: Map<number, P.Breakpoint>;
  request: P.SourceBreakpoint;
  response: P.Breakpoint;
}

let progressCnt = 0;

const INSTAL_INSTRUCTION = `
Please, install "@effectful/debugger" manually:

 $ npm install -g @effectful/debugger

And link it to your project:
 
 $ npm link @effectful/debugger

WARNING: Installing it as your project local dependency won't work.
The runtime and the project dependencies shouldn't be deduped together.
`;

export class DebugSession extends SessionImpl {
  private remotes: Map<number, Handler> = new Map();
  private connectCb?: (h?: Handler) => void;
  public progressHandler?: (n: string) => () => void;
  public showError?: (n: string) => void;
  private childProcess: ChildProcess | undefined;
  private stopped: boolean = false;
  private supportsRunInTerminalRequest = false;
  private awaitReconnect: number | undefined;
  private stopComms?: () => void;
  private launchArgs: P.LaunchRequestArguments | undefined;
  private launched = false;
  private exceptionArgs: P.SetExceptionBreakpointsArguments | undefined;
  private exitCode: number | undefined;

  private breakpointsSrcs: Map<string | number, BreakpointInfo[]> = new Map();
  private breakpointsIds: Map<number, BreakpointInfo> = new Map();
  private breakpointsResponseRemotes?: Set<number>;
  private breakpointsCount = 0;
  private breakpointsResponse?: P.SetBreakpointsResponse;
  private lastThread = 0;
  private supportsProgress = false;
  private knownThreadNames: { [name: string]: number } = {};

  /**
   * Creates a new debug adapter that is used for one debug session.
   * We configure the default implementation of a debug adapter here.
   */
  public constructor() {
    super(true);
    // super("effectful-debug.log");
    // this.obsolete_logFilePath = obsolete_logFilePath;
    this.on("error", event => {
      logger.error(event.body);
    });
    this.setDebuggerLinesStartAt1(false);
    this.setDebuggerColumnsStartAt1(false);
  }

  start(inStream: NodeJS.ReadableStream, outStream: NodeJS.WritableStream) {
    super.start(inStream, outStream);
    logger.init(
      e => {
        this.sendEvent(e);
      },
      "effectful-debug.log",
      this._isServer
    );
  }

  sendEvent(event: P.Event): void {
    if (event.event !== "output")
      logger.verbose(`sendEvent: ${JSON.stringify(event)}`);
    super.sendEvent(event);
  }

  sendRequest(
    command: string,
    args: any,
    timeout: number,
    cb: (response: P.Response) => void
  ) {
    logger.verbose(
      `sendRequest: ${JSON.stringify(command)}(${JSON.stringify(
        args
      )}), timeout: ${timeout}`
    );
    super.sendRequest(command, args, timeout, cb);
  }

  sendResponse(response: P.Response) {
    logger.verbose(`sendResponse: ${JSON.stringify(response)}`);
    super.sendResponse(response);
  }

  private async closeRemote(remoteId: number) {
    const remote = this.remotes.get(remoteId);
    this.remotes.delete(remoteId);
    for (const i of this.breakpointsIds.values()) {
      i.remotes.delete(remoteId);
      if (!i.remotes.size) {
        i.response.verified = false;
        this.sendEvent(new BreakpointEvent("changed", i.response));
      }
    }
    if (remote) {
      if (remote.dataBreakpoints) {
        for (const i of remote.dataBreakpoints) {
          i.verified = false;
          this.sendEvent(
            new Event("breakpoint", {
              reason: "changed",
              breakpoint: { id: i.id, verified: false }
            })
          );
        }
      }
      this.sendEvent(new ThreadEvent("exited", remoteId));
    }
    if (!this.remotes.size) {
      const reconnect = this.awaitReconnect || 0;
      if (reconnect < 0) return;
      await new Promise(i => setTimeout(i, reconnect));
      if (this.remotes.size) return;
      this.terminate(
        this.exitCode
          ? `the main command exited with exit code ${this.exitCode}`
          : "all threads are finished"
      );
    }
  }

  /**
   * The 'initialize' request is the first request called by the frontend
   * to interrogate the features the debug adapter provides.
   */
  protected initializeRequest(
    response: P.InitializeResponse,
    args: P.InitializeRequestArguments
  ): void {
    this.supportsRunInTerminalRequest = !!args.supportsRunInTerminalRequest;
    this.supportsProgress = !!args.supportsProgressReporting;
    response.body = response.body || {};
    response.body.supportsConfigurationDoneRequest = true;
    response.body.supportsStepBack = true;
    response.body.supportsSetVariable = false;
    response.body.supportsSetExpression = true;
    response.body.supportsTerminateRequest = true;
    response.body.supportTerminateDebuggee = true;
    response.body.supportsLogPoints = true;
    response.body.supportsHitConditionalBreakpoints = true;
    response.body.supportsConditionalBreakpoints = true;
    response.body.supportsFunctionBreakpoints = false;
    response.body.supportsEvaluateForHovers = false;
    response.body.supportsCompletionsRequest = false;
    response.body.supportsRestartRequest = false;
    response.body.supportsRestartFrame = false;
    response.body.supportsExceptionOptions = true;
    response.body.supportsExceptionInfoRequest = false;
    response.body.supportsValueFormattingOptions = false;
    response.body.supportsTerminateThreadsRequest = true;
    response.body.supportsDataBreakpoints = false;
    response.body.supportsReadMemoryRequest = false;
    response.body.supportsDisassembleRequest = false;
    response.body.supportsCancelRequest = false;
    response.body.supportsBreakpointLocationsRequest = true;
    response.body.supportsStepInTargetsRequest = false;
    response.body.exceptionBreakpointFilters = [
      { filter: "all", label: "All Exceptions", default: false },
      { filter: "uncaught", label: "Uncaught Exceptions", default: true }
    ];
    this.sendResponse(response);
    this.sendEvent(new InitializedEvent());
  }
  private async sendAll(request: P.Request) {
    if (!this.stopped) {
      for (const remote of this.remotes.values()) {
        remote.send(request);
      }
    }
  }
  protected sendToThread(threadId: number, msg: P.Request) {
    const thread = this.remotes.get(threadId);
    if (!thread) {
      logger.verbose(`no remote ${threadId}`);
      this.closeRemote(threadId);
      return false;
    }
    this.lastThread = threadId;
    thread.send(msg);
    return true;
  }
  protected async dispatchRequest(request: P.Request) {
    logger.verbose(`dispatchRequest: ${JSON.stringify(request)}`);
    if (this.stopped) return;
    switch (request.command) {
      case "restart":
        this.sendAll({ ...request, command: "childRestart" });
        this.sendResponse(new Response(request));
        return;
      case "setExceptionBreakpoints":
        this.sendResponse(new Response(request));
        this.exceptionArgs = request.arguments;
        this.sendAll({ ...request, command: "childSetExceptionBreakpoints" });
        return;
      case "breakpointLocations":
        this.doBreakpointsLocations(<P.BreakpointLocationsRequest>request);
        return;
      case "setBreakpoints":
        this.doSetBreakpoints(<P.SetBreakpointsRequest>request);
        return;
      case "terminateThreads":
        const threadIds = request.arguments.threadIds;
        if (threadIds)
          for (const i of threadIds)
            this.sendToThread(i, { ...request, command: "childTerminate" });
        this.sendResponse(new Response(request));
        break;
      case "source":
        {
          const args: any = request.arguments;
          if (
            args.sourceReference != null &&
            this.sendToThread(toThread(args.sourceReference), request)
          )
            return;
        }
        break;
      case "setDataBreakpoints":
        {
          const args: any = request.arguments;
          const byThread = new Map<number, P.DataBreakpoint[]>();
          const responseBreakpoints: P.Breakpoint[] = [];
          for (const i of args.breakpoints) {
            if (i.enabled === false) continue;
            const threadId: number = +(i.dataId?.match(/^(\d+)/) || [])[1];
            if (isNaN(threadId)) continue;
            const remote = this.remotes.get(threadId);
            if (!remote) {
              responseBreakpoints.push({ id: i.id, verified: false });
              this.sendEvent(
                new Event("breakpoint", {
                  reason: "removed",
                  breakpoint: { id: i.id }
                })
              );
              continue;
            }
            let bps = byThread.get(threadId);
            if (!bps) {
              bps = [];
              byThread.set(threadId, bps);
            }
            bps.push(i);
            (
              remote.dataBreakpoints || (remote.dataBreakpoints = new Set())
            ).add(i);
            responseBreakpoints.push({ id: i.id, verified: true });
          }
          for (const threadId of this.remotes.keys()) {
            args.breakpoints = byThread.get(threadId) || [];
            this.sendToThread(threadId, request);
          }
          const response = <P.SetDataBreakpointsResponse>new Response(request);
          response.body = { breakpoints: responseBreakpoints };
          this.sendResponse(response);
        }
        break;
      case "continue":
      case "next":
      case "stackTrace":
      case "stepIn":
      case "stepOut":
      case "stepBack":
      case "goto":
      case "pause":
      case "exceptionInfo":
      case "stackTrace":
      case "scopes":
      case "variables":
      case "evaluate":
      case "setExpression":
      case "reverseContinue":
      case "dataBreakpointInfo":
        const args: any = request.arguments;
        if (args.threadId != null) {
          if (this.sendToThread(args.threadId, request)) return;
          break;
        }
        if (args.frameId != null) {
          if (this.sendToThread(toThread(args.frameId), request)) return;
          break;
        }
        if (args.variablesReference) {
          if (this.sendToThread(toThread(args.variablesReference), request))
            return;
          break;
        }
        if (request.command === "evaluate") {
          this.sendToThread(this.lastThread, request);
          return;
        }
        logger.error("no thread's destination");
        break;
      case "terminate":
        this.sendAll({ ...request, command: "childTerminate" });
        this.sendResponse(new Response(request));
        this.terminate();
        return;
      case "disconnect":
        this.shutdown();
        this.sendResponse(new Response(request));
        return;
      default:
        super.dispatchRequest(request);
    }
  }

  private terminate(reason?: string) {
    if (reason) logger.verbose(`termination request: ${reason}`);
    if (!this.stopped) this.sendEvent(new TerminatedEvent());
  }

  private dispatchResponse(thread: Handler, data: Message) {
    if ((<any>data).event !== "output")
      logger.verbose(`response: ${JSON.stringify(data)}`);
    if (data.type === "event") {
      let ev = <Event>data;
      switch (ev.event) {
        case "loadedSources":
          const lsev = <any>ev;
          if (lsev.body.breakpoints)
            this.mergeResponseBreakpoints(lsev.body.breakpoints, thread.id);
          delete lsev.body.breakpoints;
          break;
        case "continued":
        case "stopped":
        case "thread":
          (<any>ev).body.threadId = thread.id;
          this.lastThread = thread.id;
          (<any>ev).body.allThreadsContinued = false;
      }
      this.sendEvent(ev);
    } else if (data.type === "response") {
      const response = <P.Response>data;
      switch (response.command) {
        case "continue":
          (response.body || (response.body = {})).allThreadsContinued = false;
          break;
        case "breakpointLocations":
          const cb = this.breakpointLocationsCb?.get(response.request_seq);
          if (cb) cb([thread.id, <P.BreakpointLocationsResponse>response]);
          return;
        case "childSetExceptionBreakpoints":
        case "childTerminate":
        case "childRestart":
        case "setDataBreakpoints":
          return;
        case "childLaunch":
          if (response.body) {
            if (!thread.name) {
              let threadName = response.body.name || "Thread";
              const count = this.knownThreadNames[threadName] || 0;
              this.knownThreadNames[threadName] = count + 1;
              if (count !== 0) threadName += `[${count}]`;
              thread.name = threadName;
            }
            for (const i of response.body.breakpoints)
              this.mergeResponseBreakpoints(i.breakpoints, thread.id);
          }
          this.sendEvent(new ThreadEvent("started", thread.id));
          return;
        case "childSetBreakpoints":
          if (!this.breakpointsResponseRemotes) return;
          this.breakpointsResponseRemotes.delete(thread.id);
          if (response.body && response.body.breakpoints)
            this.mergeResponseBreakpoints(
              response.body.breakpoints,
              thread.id,
              true
            );
          if (this.breakpointsResponseRemotes.size !== 0) return;
          if (
            this.breakpointsResponseRemotes.size === 0 &&
            this.breakpointsResponse
          ) {
            this.sendResponse(this.breakpointsResponse);
            this.breakpointsResponse = void 0;
          }
          return;
      }
      this.sendResponse(response);
    }
  }

  public shutdown() {
    if (this.stopped) return;
    this.stopped = true;
    if (this.connectCb) this.connectCb();
    for (const i of this.remotes.values()) i.close();
    if (this.stopComms) this.stopComms();
    if (this.childProcess) this.childProcess.kill();
    super.shutdown();
  }

  private configurationCb?: () => void;
  private configurationDone = false;
  protected sendErrorResponse(
    response: P.Response,
    code: number,
    msg: string
  ): void {
    super.sendErrorResponse(response, code, msg);
    // TODO: check why VS doesn't show this itself
    // if (this.showError && msg) this.showError(msg);
  }

  /**
   * Called at the end of the configuration sequence.
   * Indicates that all breakpoints etc. have been sent to the DA and that the 'launch' can start.
   */
  protected configurationDoneRequest(
    response: P.ConfigurationDoneResponse,
    args: P.ConfigurationDoneArguments
  ): void {
    super.configurationDoneRequest(response, args);
    if (this.configurationCb) this.configurationCb();
    this.configurationDone = true;
  }

  protected async launchRequest(
    response: P.LaunchResponse,
    args: P.LaunchRequestArguments
  ) {
    logger.setup(
      args.verbose
        ? Logger.LogLevel.Verbose
        : args.verbose === false
        ? Logger.LogLevel.Stop
        : Logger.LogLevel.Log,
      false
    );
    let cwd = args.cwd;
    let progressId = this.supportsProgress && `LAUNCH$${progressCnt++}`;
    const preset = args.preset || "node";
    const isWebpack = preset === "browser" || preset === "next";
    const isNode = preset === "node" || preset === "next";
    const needsLaunch = preset !== "listener";
    if (!cwd) {
      if (isWebpack) {
        this.sendErrorResponse(
          response,
          1001,
          `"${preset}" preset needs "cwd" parameter,` +
            'please add it to launch.json (for example `..,"cwd":"${workspaceFolder}"...`)'
        );
        return;
      }
      cwd = args.cwd = process.cwd();
    }
    const runtime =
      args.runtime ||
      (preset === "next" && "@effectful/debugger/react") ||
      "@effectful/debugger";
    const runtimeBase = packageBase(runtime);
    let debuggerImpl: string;
    const resolvePaths: string[] = require.resolve.paths && [
      ...new Set(
        [cwd].concat(
          <any>require.resolve.paths(cwd),
          <any>require.resolve.paths(__dirname)
        )
      )
    ];
    logger.log(`Searching ${runtimeBase} in ${resolvePaths}`);
    try {
      debuggerImpl = resolvePaths
        ? require.resolve(runtimeBase, { paths: resolvePaths })
        : require.resolve(runtimeBase);
    } catch (e) {
      if (e.code !== "MODULE_NOT_FOUND") {
        this.sendErrorResponse(
          response,
          1002,
          `Couldn't resolve the debuggers runtime - ${e}`
        );
        return;
      }
      logger.log(
        `couldn't find "${runtimeBase}" runtime, installing it....(please wait, this may take a few minutes)`
      );
      let cb: (b: boolean) => void;
      if (progressId)
        this.sendEvent(
          new ProgressStartEvent(
            `i$${progressId}`,
            "Installing runtime (please wait, this may take a few minutes)"
          )
        );
      const env = { ...process.env };
      const execDir = path.dirname(process.execPath);
      if (env.PATH) env.PATH = `${env.PATH}${path.delimiter}${execDir}`;
      else env.PATH = execDir;
      const child = spawn(
        "npm",
        [
          "install",
          "--no-package-lock",
          "--no-save",
          "--global-style",
          "--no-audit",
          runtimeBase
        ],
        { shell: true, cwd: path.join(__dirname, ".."), env }
      );
      child.on("error", data => {
        this.sendErrorResponse(
          response,
          1003,
          `Cannot install ${runtimeBase} (${data.message}). ${INSTAL_INSTRUCTION}`
        );
        this.terminate("install error: " + data.message);
        cb(true);
      });
      child.stdout.on("data", data => {
        logger.log("install: " + String(data));
      });
      child.stderr.on("data", data => {
        logger.log("install: " + String(data));
      });
      child.on("exit", code => {
        if (progressId) this.sendEvent(new ProgressEndEvent(`i$${progressId}`));
        if (!code) return cb(false);
        this.sendErrorResponse(
          response,
          1003,
          `Cannot install ${runtimeBase} (Exit code: ${code}). ${INSTAL_INSTRUCTION}`
        );
        cb(true);
      });
      if (await new Promise(i => (cb = i))) return;
      try {
        debuggerImpl = require.resolve(runtimeBase);
      } catch (e) {
        this.sendErrorResponse(
          response,
          1002,
          `Couldn't resolve the debuggers runtime - ${e} ${INSTAL_INSTRUCTION}`
        );
        return;
      }
    }
    logger.log(`Using ${runtime} from ${debuggerImpl}`);
    debuggerImpl = path.dirname(normalizeDrive(debuggerImpl));
    const runJs = path.join(debuggerImpl, "config", preset, "run.js");
    const debuggerDeps =
      process.env["EFFECTFUL_DEBUGGER_DEPS"] ||
      (args.env && args.env["EFFECTFUL_DEBUGGER_DEPS"]) ||
      path.resolve(path.join(debuggerImpl, "..", ".."));
    this.stopComms = subscribe(
      (remote: Handler) => {
        logger.verbose(`new debuggee: ${remote.id}`);
        this.remotes.set(remote.id, remote);
        remote.onclose = () => this.closeRemote(remote.id);
        remote.onmessage = data => this.dispatchResponse(remote, <Message>data);
        remote.onerror = reason => logger.error(reason);
        if (this.launched) this.launchChild(remote);
        if (this.connectCb) this.connectCb();
      },
      args.debuggerHost || "localhost",
      args.debuggerPort || 20011
    );
    this.launchArgs = args;
    if (args.verbose) logger.verbose(`launch request ${JSON.stringify(args)}`);
    this.sendEvent(
      new CapabilitiesEvent({
        supportsStepBack: !!args.timeTravel,
        supportsRestartFrame: false,
        supportsRestartRequest: !!args.fastRestart || args.preset !== "node",
        supportsEvaluateForHovers: !!args.timeTravel,
        supportsDataBreakpoints: !!args.timeTravel
      })
    );
    let errMessage: string | undefined;
    if (args.reconnectTimeout)
      this.awaitReconnect = args.reconnectTimeout * 1000;
    let webpackProgress: string | null = null;
    if (needsLaunch) {
      const env: { [name: string]: string | null } = <any>{};
      const host =
        !args.debuggerHost ||
        args.debuggerHost === "::" ||
        args.debuggerHost === "0.0.0.0"
          ? "localhost"
          : args.debuggerHost;
      if (process.env["EFFECTFUL_DEBUGGER_VERBOSE"] == null)
        env["EFFECTFUL_DEBUGGER_VERBOSE"] = args.verbose
          ? String(args.verbose)
          : "0";
      if (process.env["EFFECTFUL_DEBUGGER_URL"] == null)
        env["EFFECTFUL_DEBUGGER_URL"] = `ws://${host}:${
          args.debuggerPort || 20011
        }`;
      if (runtime) env["EFFECTFUL_DEBUGGER_RUNTIME"] = runtime;
      env["EFFECTFUL_DEBUGGER_OPEN"] = args.open ? String(args.open) : "0";
      env["EFFECTFUL_DEBUGGER_TIME_TRAVEL"] = args.timeTravel
        ? String(!!args.timeTravel)
        : "0";
      if (args.srcRoot) env["EFFECTFUL_DEBUGGER_SRC_ROOT"] = args.srcRoot;
      if (args.env) Object.assign(env, args.env);
      let term = this.supportsRunInTerminalRequest
        ? args.console
        : "internalConsole";
      if (term === true) term = "externalTerminal";
      else if (!term) term = "internalConsole";
      const reuse = args.reuse && term === "internalConsole";
      if (
        !(
          "EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES" in env ||
          "EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES" in process.env
        )
      )
        env["EFFECTFUL_DEBUGGER_RUNTIME_PACKAGES"] = debuggerDeps;
      if (args.include) env["EFFECTFUL_DEBUGGER_INCLUDE"] = args.include;
      if (args.blackbox) env["EFFECTFUL_DEBUGGER_BLACKBOX"] = args.blackbox;
      if (args.exclude) env["EFFECTFUL_DEBUGGER_EXCLUDE"] = args.exclude;
      if (isNode) {
        const node_path = [debuggerDeps];
        if (env.NODE_PATH) node_path.push(env.NODE_PATH);
        if (preset === "next") node_path.push(path.join(cwd, "node_modules"));
        env.NODE_PATH = node_path.join(path.delimiter);
      } else if (args.preset === "browser") {
        if (args.indexJs) env.EFFECTFUL_DEBUGGER_INDEX_JS = args.indexJs;
        if (args.htmlTemplate)
          env.EFFECTFUL_DEBUGGER_HTML_TEMPLATE = args.htmlTemplate;
      }
      const launchArgs = [`--max-old-space-size=${MAX_OLD_SPACE}`, runJs];
      if (args.command) launchArgs.push(args.command);
      if (args.args) launchArgs.push(...args.args);
      if (term === "externalTerminal" || term === "integratedTerminal") {
        const termArgs: P.RunInTerminalRequestArguments = {
          kind: term === "integratedTerminal" ? "integrated" : "external",
          title: "Effectful Debug Console",
          cwd,
          args: ["node", ...launchArgs],
          env
        };
        this.runInTerminalRequest(
          termArgs,
          RUNINTERMINAL_TIMEOUT,
          runResponse => {
            if (!runResponse.success) {
              this.sendErrorResponse(
                response,
                1001,
                `Cannot launch debug target in terminal (${runResponse.message}).`
              );
              this.terminate("terminal error: " + runResponse.message);
            }
          }
        );
      } else {
        let child: ChildProcess | undefined;
        const cmdline = launchArgs.slice(1).join(" ");
        let key = cmdline;
        const timeTravel = !!args.timeTravel;
        if (reuse) {
          key = `${cmdline}@${cwd}/${timeTravel}/${JSON.stringify(env)}`;
          child = runningCommands.get(key);
        }
        let startBuf: string[] = [];
        let progressPrefix: string | null = null;
        if (progressId && isWebpack)
          progressPrefix = env[
            "EFFECTFUL_PROGRESS_ID"
          ] = `@progress@${progressId}:`;
        if (!child) {
          const spawnArgs: any = {
            cwd,
            env: { ...process.env, ...env },
            shell: !isWebpack
          };
          if (args.argv0) spawnArgs.argv0 = args.argv0;
          child = spawn("node", launchArgs, spawnArgs);
          let lastPercentage = 0;
          let message = "";
          logger.verbose(
            `SPAWN: node ${cmdline} ${JSON.stringify({
              ...spawnArgs,
              env
            })}`
          );
          child.on("error", data => {
            this.sendErrorResponse(
              response,
              1001,
              `Cannot launch debug target in terminal (${data.message}).`
            );
            if (webpackProgress)
              this.sendEvent(new ProgressEndEvent(webpackProgress, message));
            this.terminate("spawn error: " + data.message);
          });
          child.stdout.on("data", data => {
            const txt = String(data);
            if (isWebpack) {
              if (progressPrefix && txt.startsWith(progressPrefix)) {
                const m = txt
                  .substring(progressPrefix.length)
                  .match(/^(\d*)\:(.*)/);
                if (m) {
                  const percentage = m[1].length ? +m[1] : lastPercentage;
                  message = m[2].length ? m[2] : message;
                  if (percentage === 100 && webpackProgress) {
                    this.sendEvent(
                      new ProgressEndEvent(webpackProgress, message)
                    );
                    webpackProgress = null;
                    lastPercentage = 0;
                  } else if (webpackProgress) {
                    this.sendEvent(<P.Event>{
                      type: "event",
                      event: "progressUpdate",
                      body: {
                        progressId: webpackProgress,
                        message,
                        percentage: (lastPercentage = Math.max(
                          lastPercentage,
                          percentage
                        ))
                      }
                    });
                  } else {
                    webpackProgress = `b$${progressId}`;
                    this.sendEvent(<P.Event>{
                      type: "event",
                      event: "progressStart",
                      body: {
                        progressId: webpackProgress,
                        title: "Building",
                        percentage
                      }
                    });
                  }
                }
                return;
              }
              logger.log(`webpack: ${txt}`);
            } else if (args.verbose) logger.verbose(txt);
            if (!this.launched) startBuf.push(txt);
          });
          child.stderr.on("data", data => {
            const txt = String(data);
            if (isWebpack) {
              this.sendEvent(new OutputEvent(`webpack: ${txt}`, "stderr"));
            } else if (args.verbose) logger.error(txt);
            if (!this.launched) startBuf.push(txt);
          });
          child.on("exit", code => {
            if (!this.launched && startBuf.length) {
              errMessage = startBuf.join("");
            }
            if (webpackProgress)
              this.sendEvent(new ProgressEndEvent(webpackProgress));
            logger.verbose(`command "${cmdline}" exited with ${code}`);
            if (args.reuse && key) runningCommands.delete(key);
            this.closeRemote(0);
          });
          if (reuse && key) runningCommands.set(key, child);
          else this.childProcess = child;
        }
      }
    }
    if (!this.remotes.size) {
      logger.log("Awaiting a debuggee to connect back");
      if (progressId)
        this.sendEvent(
          new ProgressStartEvent(`s$${progressId}`, "Awating a debuggee")
        );
      await new Promise<Handler | undefined>(i => (this.connectCb = i));
      logger.verbose("first connection");
      this.connectCb = undefined;
    }
    if (this.remotes.size && !this.stopped) {
      // wait until configuration has finished (and configurationDoneRequest has been called)
      if (!this.configurationDone) {
        await Promise.race([
          new Promise(i => (this.configurationCb = i)),
          new Promise(i => setTimeout(i, CONFIGURATION_DONE_REQUEST_TIMEOUT))
        ]);
      }
      logger.verbose("config done");
      for (const remote of this.remotes.values()) this.launchChild(remote);
    }
    if (progressId) this.sendEvent(new ProgressEndEvent(`s$${progressId}`));
    if (webpackProgress) this.sendEvent(new ProgressEndEvent(webpackProgress));
    if (this.stopped) {
      response.success = false;
      this.sendErrorResponse(
        response,
        1002,
        errMessage || "The application has stopped"
      );
      return;
    }
    this.launched = true;
    this.sendResponse(response);
  }

  private launchChild(remote: Handler): void {
    const args = this.launchArgs || {};
    logger.verbose(`launching {remote.id}...`);
    remote.send({
      command: "childLaunch",
      arguments: {
        threadId: remote.id,
        noDebug: args.noDebug,
        restart: args.__restart,
        stopOnEntry: args.stopOnEntry,
        stopOnExit: args.stopOnExit,
        dirSep: path.sep,
        exceptions: this.exceptionArgs,
        fastRestart: args.fastRestart,
        timeTravelDisabled: args.timeTravelDisabled,
        onChange: args.onChange,
        breakpoints: [...this.breakpointsSrcs].map(
          ([srcPath, breakpoints]) => ({
            breakpoints: breakpoints.map(i => i.response),
            source:
              typeof srcPath === "number"
                ? { sourceReference: srcPath }
                : { path: normalizeDrive(srcPath) }
          })
        )
      }
    });
  }

  private breakpointLocationsCb: Map<
    number,
    (arg: [number, P.BreakpointLocationsResponse]) => void
  > = new Map();

  private async doBreakpointsLocations(req: P.BreakpointLocationsRequest) {
    const resp = <P.BreakpointLocationsResponse>new Response(req);
    resp.body = { breakpoints: [] };
    const awaiting: Set<number> = new Set(this.remotes.keys());
    const args = <P.SetBreakpointsArguments>req.arguments;
    if (args.source.path) args.source.path = normalizeDrive(args.source.path);
    this.sendAll(req);

    while (awaiting.size) {
      const [remote, clientResp] = await new Promise(i =>
        this.breakpointLocationsCb.set(req.seq, i)
      );
      awaiting.delete(remote);
      if (clientResp.body.breakpoints.length) {
        resp.body.breakpoints.push(...clientResp.body.breakpoints);
        break;
      }
    }
    this.breakpointLocationsCb.delete(req.seq);
    this.sendResponse(resp);
  }

  private doSetBreakpoints(req: P.SetBreakpointsRequest): void {
    const args = req.arguments;
    const srcPath: string | number =
      args.source.path || args.source.sourceReference || 0;
    if (args.source.path) args.source.path = normalizeDrive(args.source.path);
    // clear all breakpoints for this file
    const response = <P.SetBreakpointsResponse>new Response(req);
    const bps: BreakpointInfo[] = [];
    if (args.breakpoints) {
      for (const i of args.breakpoints) {
        const id = ++this.breakpointsCount;
        const response = {
          ...i,
          id,
          verified: false,
          source: args.source
        };
        const bpi: BreakpointInfo = {
          id,
          remotes: new Map(),
          source: args.source,
          request: i,
          response
        };
        bps.push(bpi);
        this.breakpointsIds.set(id, bpi);
      }
    }
    const old = this.breakpointsSrcs.get(srcPath);
    if (old) {
      for (const i of old) this.breakpointsIds.delete(i.id);
    }
    if (bps.length) {
      this.breakpointsSrcs.set(srcPath, bps);
    } else if (old) {
      this.breakpointsSrcs.delete(srcPath);
    }
    const breakpoints: P.Breakpoint[] = bps.map(i => i.response);
    response.body = { breakpoints };
    if (this.remotes.size) {
      this.breakpointsResponse = response;
      this.breakpointsResponseRemotes = new Set(this.remotes.keys());
      for (const remote of this.remotes.values()) {
        remote.send({
          command: "childSetBreakpoints",
          seq: req.seq,
          arguments: {
            breakpoints,
            source: args.source,
            sourceModified: args.sourceModified
          }
        });
      }
    } else {
      this.sendResponse(response);
    }
  }
  private mergeResponseBreakpoints(
    bodyBreakpoints: P.BreakpointInfo[],
    remoteId: number,
    isResponse?: boolean
  ) {
    for (const i of bodyBreakpoints) {
      const bpi = this.breakpointsIds.get(<any>i.id);
      if (!bpi) continue;
      const response = bpi.response;
      // NextJS removes some functions from the sources, so breakpoints move to some next line
      // we keep only the closest to the request breakpoints and ask the client to disable the
      // moved breakpoint
      if (i.verified) {
        const origLine = bpi.request.line;
        let diff = Infinity;
        let minResponse: P.Breakpoint = response;
        bpi.remotes.set(remoteId, i);
        for (const bp of bpi.remotes.values()) {
          if (!bp.line) continue;
          const curDiff = Math.abs(bp.line - origLine);
          if (curDiff > diff) continue;
          diff = curDiff;
          minResponse = bp;
        }
        for (const [remote, bp] of bpi.remotes) {
          if (bp.line !== minResponse.line)
            this.sendToThread(remote, {
              seq: 0,
              type: "request",
              command: "childDisableBreakpoint",
              arguments: { id: bp.id, source: bpi.source }
            });
        }
        if (i.line === minResponse.line) Object.assign(bpi.response, i);
      } else bpi.remotes.delete(remoteId);
      if (!bpi.remotes.size) response.verified = false;
      if (!isResponse) this.sendEvent(new BreakpointEvent("changed", response));
    }
  }

  protected threadsRequest(response: P.ThreadsResponse): void {
    // runtime supports now threads so just return a default thread.
    response.body = {
      threads: [...this.remotes].map(
        ([id, thread]) => new Thread(id, thread.name || `Thread ${id}`)
      )
    };

    this.sendResponse(response);
  }

  protected disconnectRequest(
    response: P.DisconnectResponse,
    args: P.DisconnectArguments
  ): void {
    logger.verbose("preparing disconnect");
    this.stopped = true;
    if (this.configurationCb) this.configurationCb();
    super.disconnectRequest(response, args);
  }
}
