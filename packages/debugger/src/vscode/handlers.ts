import config from "../config";
import * as State from "../state";
import * as Engine from "../engine";
import { runTopLevel } from "../modules";
import * as TT from "../timeTravel/main";
import * as path from "path";
import { DebugProtocol as P } from "./protocol";
import * as S from "@effectful/serialization";
import Comms from "./comms";
import { stateDescr } from "../standalone";
import * as util from "util";
import { map, filter } from "../kit";
import * as Persist from "../persist";

const { assign, defineProperty } = State.saved.Object;
const weakMapSet = State.saved.WeakMap.set;
const Set = State.saved.Set;
const Map = State.saved.Map;

declare module "../state" {
  interface Module {
    debuggerSource?: P.Source;
    breakpoints?: Brk[];
    functionsSorted?: NonBlackboxFunctionDescr[];
  }
}

declare module "../timeTravel/core" {
  interface Snapshot {
    context?: State.Job;
  }
}

declare module "./protocol" {
  namespace DebugProtocol {
    interface Response {
      sent?: boolean;
    }
  }
}

Comms.onmessage = dispatch;
const { context, journal } = State;
const sysConsole = console;
const localConsole = config.localConsole
  ? console
  : {
      log() {},
      error() {},
      warn() {},
      dir() {},
      group() {},
      groupCollapsed() {},
      groupEnd() {}
    };

context.debug = true;

let brkNext: State.Frame | null = null;
let brkOut: State.Frame | null = null;
let stepIn = false;
let pauseNext = false;
let backward = false;
const isBrowser = typeof window !== "undefined";

function trace(...args: [any, ...any[]]) {
  sysConsole.log.apply(sysConsole, args);
}

/**
 * saving break frame for async functions which may
 * be removed from the stack already
 * TODO: implement this in the engine
 */
let brkFrame: State.Frame | null = null;

let normalizeDir = (v: string) =>
  State.normalizeDrive(path.resolve(config.srcRoot, v));
let curDirSep: string = path.sep;
const knownBreakpoints = new Map<
  string,
  Map<number, P.SetBreakpointsArguments>
>();

function setDirSep(sep: string | undefined) {
  if (!sep || sep === curDirSep || sep === "/") return;
  normalizeDir = dir => State.normalizeDrive(dir.replace(/\\/g, "/"));
}

interface Location {
  source?: P.Source;
  line?: number;
  column?: number;
  endLine?: number;
  endColumn?: number;
}

interface VarValue {
  name: string;
  value: string;
  type: string;
  variablesReference: number;
  namedVariables?: number;
  indexedVariables?: number;
}

let reason: string | undefined;
let runningTrace: boolean = false;

function defaultNeedsBreak(brk: State.Brk, top: State.Frame) {
  reason = checkPause(brk, top);
  brkFrame = reason ? top : null;
  return reason != null;
}

const saveFlags =
  State.BrkFlag.STMT | State.BrkFlag.DEBUGGER_STMT | State.BrkFlag.EXIT;

context.needsBreak = config.timeTravel
  ? function(brk: State.Brk, top: State.Frame) {
      if (brk.flags & saveFlags) TT.checkpoint();
      return defaultNeedsBreak(brk, top);
    }
  : defaultNeedsBreak;

S.regOpaqueObject(context.needsBreak, "@effectful/debugger/vscode$brk");

function output(category: string, args: any[], value?: any, group?: string) {
  const descr = value !== undefined ? varValue("console", value) : undefined;
  event(
    "output",
    assign(
      {},
      {
        category,
        output: (<any>util.format).apply(util.format, <any>args) + "\n",
        group,
        value: descr && descr.value,
        variablesReference: descr && descr.variablesReference
      },
      getLocation()
    )
  );
}

const patchedConsole: any = assign({}, console, {
  log(...args: any[]) {
    localConsole.log.apply(localConsole, <any>args);
    output("stdout", args);
  },
  error(...args: any) {
    localConsole.error.apply(localConsole, <any>args);
    output("stderr", args);
  },
  warn(...args: any) {
    localConsole.warn.apply(localConsole, <any>args);
    output("stderr", args);
  },
  info(...args: any[]) {
    localConsole.log.apply(localConsole, <any>args);
    output("stdout", args);
  },
  dir(arg: any) {
    localConsole.dir(arg);
    output("console", [], arg);
  },
  group(name: string) {
    if (localConsole.group) localConsole.group(name);
    output("stdout", [name], void 0, "start");
  },
  groupEnd() {
    if (localConsole.groupEnd) localConsole.groupEnd();
    output("stdout", [], void 0, "end");
  },
  groupCollapsed(name: string) {
    if (localConsole.groupCollapsed) localConsole.groupCollapsed(name);
    output("stdout", [name], void 0, "startCollapsed");
  }
});

for (const name of Object.keys(patchedConsole))
  Persist.regOpaqueObject(patchedConsole[name], `#patcheConsole#{name}`);

if (config.redirConsole) global.console = patchedConsole;

function nextFrame(frame: State.Frame): State.Frame | null {
  let res: State.Frame | null = frame;
  do res = res.caller;
  while (res && res.meta.blackbox);
  return res;
}

function firstActiveFrame(frame: State.Frame | null): State.Frame | null {
  while (frame && frame.goto === frame.meta.finState) frame = frame.caller;
  return frame;
}

function response(request: P.Request, message?: string) {
  return {
    seq: 0,
    request_seq: request.seq,
    type: "response",
    command: request.command,
    success: !message,
    message
  };
}

function send(v: P.Response) {
  if (!v.sent) {
    Comms.send(v);
    v.sent = true;
  }
}

export function event(name: string, body: any) {
  Comms.send({ seq: 0, type: "event", event: name, body });
}

const handlers: {
  [name: string]: (args: any, response: P.Response) => void;
} = {};

function dispatch(req: P.Request) {
  const res = response(req);
  const handler = handlers[req.command];
  if (handler) handler(req.arguments, res);
  send(res);
}

let restartTimeout: any = 0;

const RESTART_ON_CHANGE_TIMEOUT = isBrowser ? 500 : 0;

context.onLoad = function(module: State.Module, hot: boolean) {
  const source = getSource(module);
  if (config.verbose) trace(`DEBUGGER: loading ${JSON.stringify(source)}`);
  if (module.fullPath) {
    const bps = knownBreakpoints.get(module.fullPath);
    if (hot || bps) {
      event("loadedSources", {
        reason: "changed",
        source,
        breakpoints: bps && setBreakpoints(bps).breakpoints
      });
    }
    if (hot) {
      if (config.onModuleHotSwapping)
        Engine.liftSync(config.onModuleHotSwapping)(module);
      // console.log("LOADING", module.fullPath, hot, !!config.onHotSwapping);
      if (config.onHotSwapping) {
        clearTimeout(restartTimeout);
        setTimeout(
          Engine.liftSync(config.onHotSwapping),
          RESTART_ON_CHANGE_TIMEOUT
        );
      }
    }
  }
};

let launchCb: ((stop: boolean) => void) | undefined;
let launchPromise: Promise<boolean> = new Promise<boolean>(i => (launchCb = i));

context.onThread = async function() {
  if (context.top || context.activeTop) return;
  if (!context.queue.length) {
    if (!context.top && !context.activeTop) {
      if (!config.stopOnExit) {
        setTimeout(function() {
          if (!context.queue.length && !context.top && !context.activeTop)
            Comms.unref();
        }, 0);
      }
    }
    return;
  }
  if (!config.stopOnExit) Comms.ref();
  const job = <State.Job>context.queue.shift();
  if (config.verbose) trace("DEBUGGER: new thread");
  const top = <State.Frame>(context.top = job.top);
  context.debug = job.debug;
  context.brk = job.brk;
  context.value = job.value;
  if (context.brk) {
    let stop = false;
    if (launchCb) {
      stop = await launchPromise;
      launchCb = undefined;
      if (stop) reason = "entry";
    }
    if (
      job.stopOnEntry &&
      !stop &&
      (reason = checkPause(context.brk, top)) &&
      reason !== "interrupt"
    )
      stop = true;
    TT.checkpoint();
    if (stop) {
      context.activeTop = context.top;
      context.top = null;
      signalStopped();
      onEntry();
    } else {
      onEntry();
      step();
      if (!context.activeTop) event("continued", {});
    }
  }
};

let entrySnapshot: any;

function onEntry() {
  if (config.fastRestart === "entry")
    entrySnapshot = capture({ warnIgnored: true });
}

export function restart() {
  if (config.onRestart) {
    const savedDebug = context.debug;
    try {
      context.debug = false;
      config.onRestart();
    } finally {
      context.debug = savedDebug;
    }
    return;
  }
  if (entrySnapshot) {
    restore(entrySnapshot);
    return;
  }
}

handlers.childRestart = function(res) {
  if (config.fastRestart) {
    restart();
    return;
  }
  if (typeof window !== "undefined") window.location.reload();
  else if (res) {
    res.success = false;
    res.message = "restart isn't supported";
  }
};

let linStartAt1 = true;
let colStartAt1 = true;

function adjLine(num: number): number {
  return linStartAt1 ? num : num - 1;
}

function adjCol(num: number): number {
  return colStartAt1 ? num + 1 : num;
}

function getSource(module: State.Module) {
  let source = module.debuggerSource;
  if (!source) {
    const file = module.fullPath;
    if (file) {
      source = {
        name: path.basename(file),
        path: file
      };
    } else if (typeof module.id === "number") {
      source = {
        name: module.name,
        sourceReference: module.id,
        presentationHint: "emphasize"
      };
    }
    module.debuggerSource = source;
  }
  return source;
}

function getFrame(frameId = 0): State.Frame | null {
  let cur = context.activeTop || context.top;
  for (let i = toLocal(frameId); cur; cur = cur /*.next*/.caller) {
    if (!cur.brk || cur.meta.blackbox) continue;
    if (i === 0) break;
    --i;
  }
  return cur;
}

function getLocation(frameId = 0): Location {
  const frame = getFrame(frameId);
  if (!frame) return {};
  const res: Location = { source: getSource(frame.meta.module) };
  const { brk } = frame;
  if (brk) {
    res.line = brk.line;
    res.column = brk.column;
    res.endLine = brk.endLine;
    res.endColumn = brk.endColumn;
  }
  return res;
}

handlers.stackTrace = function(args, response) {
  const startFrame =
    typeof args.startFrame === "number" ? toLocal(args.startFrame) : 0;
  const maxLevels = typeof args.levels === "number" ? args.levels : 1000;
  const endFrame = startFrame + maxLevels;
  const visibleFrames = [];
  const top = brkFrame || context.activeTop;
  for (let i = top; i; i = i /*.next*/.caller) {
    if (i.brk == null || i.meta.blackbox) continue;
    visibleFrames.push(i);
  }
  const stackFrames = [];
  for (let i = startFrame; i < Math.min(endFrame, visibleFrames.length); i++) {
    const f = visibleFrames[i];
    const meta = f.meta;
    const { brk } = f;
    const name = meta.origName;
    const sf = {
      id: State.toGlobal(i),
      name,
      source: getSource(meta.module),
      adapterData: "effectful-adapter-data",
      line: brk && adjLine(brk.line),
      column: brk && adjCol(brk.column),
      endLine: brk && adjLine(brk.endLine),
      endColumn: brk && adjCol(brk.endColumn)
    };
    stackFrames.push(sf);
  }
  if (config.verbose) trace(`DEBUGGER: stack ${JSON.stringify(stackFrames)}`);
  response.body = {
    stackFrames,
    totalFrames: stackFrames.length // context.stack.length
  };
};

const curValById = new Map();
const curIdByVal = new Map();
let varCount = 100;

// const toGlobal = (v: number) => v;
const toLocal = State.toLocal;

const globalScope = {
  name: "Global",
  variablesReference: State.toGlobal(1),
  expensive: true
};

function newVarRef(): number {
  return State.toGlobal(varCount++);
}

function resetScopes() {
  curValById.clear();
  curIdByVal.clear();
  globalScope.variablesReference = State.toGlobal(1);
  curValById.set(globalScope.variablesReference, global);
  curIdByVal.set(global, globalScope.variablesReference);
}

const variablesSym = Symbol("@effectful/debugger/variables");

handlers.scopes = function(args, response) {
  const frameReference = args.frameId;
  const root = getFrame(frameReference);
  const scopes = [];
  if (root) walk(root, true);
  scopes.push(globalScope);
  response.body = { scopes };
  function walk(frame: State.Frame, top: boolean) {
    const meta = frame.meta;
    const { brk } = frame;
    const scopeDepth = meta.scopeDepth;
    if (brk && brk.scope) {
      const ref = newVarRef();
      const names = Object.keys(brk.scope);
      const scopeDescr = {
        [variablesSym](variables: VarValue[]) {
          if (top && context.error)
            variables.push(varValue("@error", context.value));
          const { scope } = brk;
          if (frame.self && frame.self !== global)
            variables.push(varValue("this", frame.self));
          const store = frame.$;
          const curScope = brk.scopeDepth;
          // tslint:disable-next-line:forin
          for (const i in scope) {
            const [field, depth, loc] = scope[i];
            if (!loc || depth < scopeDepth) continue;
            let cur: any = store;
            for (let j = curScope; j > depth; --j) cur = cur[0];
            variables.push(varValue(i, cur[field]));
          }
        },
        ref,
        response: {
          name: meta.origName,
          variablesReference: ref,
          namedVariables: names.length,
          expensive: false,
          source: meta.module.debuggerSource
        }
      };
      // TODO: range position
      scopes.push(scopeDescr.response);
      curValById.set(scopeDescr.ref, scopeDescr);
      curIdByVal.set(scopeDescr, scopeDescr.ref);
    }
    if (frame.parent) walk(frame.parent, false);
  }
};

handlers.variables = function(args, response) {
  let variables: VarValue[] = [];
  const val = curValById.get(args.variablesReference);
  if (val != null) {
    if (val[variablesSym] != null) {
      val[variablesSym](variables);
    } else if (Array.isArray(val)) {
      for (
        let i = args.start || 0, len = args.count ? i + args.count : val.length;
        i < len;
        ++i
      )
        variables.push(varValue(i, val[i]));
      variables.push(varValue("length", val.length));
    } else {
      const descrs = Object.getOwnPropertyDescriptors(val);
      const arr = [];
      // tslint:disable-next-line:forin
      for (const i in descrs) {
        const descr = descrs[i];
        if ("value" in descr) arr.push([i, descr.value]);
      }
      const proto = Object.getPrototypeOf(val);
      if (proto !== null && proto !== Object.prototype)
        variables.push(varValue("__proto__", proto));
      for (
        let i = args.start || 0, len = args.count ? args.count - 1 : arr.length;
        i < len;
        ++i
      ) {
        const [n, v] = arr[i];
        variables.push(varValue(n, v));
      }
    }
  }
  response.body = { variables };
};

function varValue(name: string, value: any): VarValue {
  let valRepr = value;
  switch (typeof value) {
    case "function":
      const descr = State.closures.get(value);
      if (descr) {
        const meta = descr.meta;
        if (meta) {
          valRepr = `${meta.origName}@${
            meta.module ? path.basename(meta.module.name) : "*"
          }:${meta.location}`;
        }
      }
    case "object":
      if (value !== null) {
        let ref = curIdByVal.get(value);
        if (!ref) {
          ref = newVarRef();
          curIdByVal.set(value, ref);
          curValById.set(ref, value);
        }
        const res: VarValue = {
          name: String(name),
          value: str(valRepr),
          type: value.constructor && value.constructor.name,
          variablesReference: ref
        };
        if (Array.isArray(value)) {
          res.indexedVariables = value.length;
        } else {
          res.namedVariables = filter(
            Object.values(Object.getOwnPropertyDescriptors(value)),
            i => "value" in i
          ).length;
          const proto = Object.getPrototypeOf(value);
          if (proto !== null && proto !== Object.prototype)
            res.namedVariables++;
        }
        return res;
      }
    default:
      return {
        name: String(name),
        value: str(value),
        type: typeof value,
        variablesReference: 0
      };
  }
  function str(value: any): any {
    try {
      return String(value);
    } catch (e) {}
  }
}

function reset() {
  brkFrame = brkOut = brkNext = null;
  stepIn = false;
  pauseNext = false;
  backward = false;
  resetScopes();
}

handlers.childLaunch = function(args, res) {
  setDirSep(args.dirSep);
  config.timeTravelDisabled = !!args.timeTravelDisabled;
  if (config.timeTravel) {
    TT.reset(!config.timeTravelDisabled);
    if (config.mutationObserver && TT.DOM && typeof window !== "undefined")
      TT.DOM.track(document.documentElement);
  } else if (args.timeTravel) {
    // tslint:disable-next-line:no-console
    console.warn(
      "Time traveling is enabled in the launch.json, but the sources aren't compiled to support it"
    );
  }
  res.body = {
    breakpoints:
      args.breakpoints && map(args.breakpoints, (v: any) => setBreakpoints(v))
  };
  if (args.exceptions) setExceptionBreakpoints(args.exceptions);
  else {
    context.brkOnUncaughtException = false;
    context.brkOnAnyException = false;
  }
  send(res);
  context.threadId = args.threadId;
  config.stopOnExit = args.stopOnExit;
  config.fastRestart = args.fastRestart;
  if (args.onChange === "restart") config.onHotSwapping = restart;
  if (launchCb) launchCb(args.stopOnEntry);
  if (config.verbose) trace(`DEBUGGER: launch ${JSON.stringify(args)}`);
};

function checkPause(
  brk: State.Brk,
  top: State.Frame
):
  | undefined
  | "pause"
  | "step"
  | "next"
  | "breakpoint"
  | "stepOut"
  | "debugger_statement"
  | "entry"
  | "interrupt" {
  if (!context.debug) return undefined;
  if (launchCb != null) {
    return "entry";
  }
  if (pauseNext) {
    pauseNext = false;
    return "pause";
  }
  const { breakpoint: bp } = brk;
  if (
    bp &&
    (!bp.condition || bp.condition(top)) &&
    (!bp.hitCondition || bp.hitCondition(top) === bp.hits++)
  )
    return "breakpoint";
  if (brk.flags & State.BrkFlag.EMPTY) return void 0;
  if (brk.flags & State.BrkFlag.STMT) {
    if (stepIn) return "step";
    if ((brkNext = firstActiveFrame(brkNext)) && brkNext === top) return "next";
    if (brk.flags & State.BrkFlag.DEBUGGER_STMT) return "debugger_statement";
  } else if (brk.flags & State.BrkFlag.EXIT) {
    if (brkOut && brkOut === top) return "stepOut";
  }
  if (Comms.hasMessage()) return "interrupt";
  return void 0;
}

let stepCount = 0;

function run() {
  context.top = context.activeTop;
  context.brk = context.activeTop && context.activeTop.brk;
  if (config.verbose)
    trace(`DEBUGGER: run ${stateDescr(stepCount++, context.threadId, true)}`);
  context.activeTop = null;
  try {
    step();
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
  }
  if (!context.activeTop) event("continued", {});
}

const step: () => void = config.timeTravel
  ? function step() {
      if (backward || journal.future) {
        runningTrace = true;
        const iter = backward ? TT.undo : TT.redo;
        let lastBrk = context.brk;
        while (iter()) {
          const { top } = context;
          if (
            context.error &&
            Engine.checkErrBrk(<State.Frame>top, context.value)
          ) {
            reason = "exception";
            context.onStop();
            return;
          }
          const { brk } = context;
          if (brk === lastBrk) continue;
          lastBrk = brk;
          if (brk && top && (reason = checkPause(brk, top)) != null) {
            context.onStop();
            return;
          }
        }
      }
      runningTrace = false;
      if (context.top) {
        if (backward) {
          reason = "entry";
          context.onStop();
        } else Engine.step();
      } else {
        event("continued", {});
        Engine.signalThread();
      }
    }
  : Engine.step;

function signalStopped() {
  resetScopes();
  event(
    "stopped",
    context.error
      ? {
          reason: "exception",
          description: "Paused on exception",
          text: String(context.value)
        }
      : {
          reason,
          description: runningTrace ? `${reason} from trace` : undefined
        }
  );
}

context.onStop = function(_description?: string) {
  if (config.verbose) trace("DEBUGGER: stop signal");
  if (!context.top) return;
  if (reason === "interrupt") {
    reason = void 0;
    setTimeout(interruptibleStep, 0);
    return;
  }

  context.activeTop = context.top;
  context.top = null;
  signalStopped();
};

function interruptibleStep() {
  if (Comms.hasMessage()) setTimeout(interruptibleStep, 0);
  else Engine.step();
}

function pause() {
  pauseNext = true;
  if (config.timeTravel && !context.top) {
    backward = true;
    run();
  }
}

handlers.pause = function(_, res) {
  send(res);
  pause();
};

function checkTimeTravelEnabled(res: P.Response) {
  if (!config.timeTravel) {
    res.success = false;
    res.message = "time traveling isn't enabled in the runtime";
    res.body = {
      error: {
        message: 10001,
        format: res.message
      }
    };
    send(res);
    output("stderr", [`ERROR: ${res.message}`]);
    signalStopped();
    return true;
  }
  return false;
}

handlers.stepIn = function(_, res) {
  send(res);
  reset();
  stepIn = true;
  run();
};

handlers.reverseContinue = function(_, res) {
  if (checkTimeTravelEnabled(res)) return;
  send(res);
  reset();
  backward = true;
  run();
};

handlers.stepBack = function(_, res) {
  if (checkTimeTravelEnabled(res)) return;
  send(res);
  reset();
  stepIn = true;
  backward = true;
  run();
};

export function cont() {
  reset();
  run();
}

handlers.continue = function(_, res) {
  send(res);
  cont();
};

handlers.next = function(_, res) {
  send(res);
  const top = brkFrame || context.activeTop;
  reset();
  brkNext = top;
  if (brkNext && brkNext.brk && brkNext.brk.flags & State.BrkFlag.EXIT)
    brkNext = nextFrame(brkNext);
  run();
};

handlers.stepOut = function(_, res) {
  send(res);
  const top = brkFrame || context.activeTop;
  reset();
  brkOut = top;
  if (brkOut && brkOut.brk && brkOut.brk.flags & State.BrkFlag.EXIT)
    brkOut = nextFrame(brkOut);
  run();
};

handlers.childTerminate = function() {
  Comms.close();
  if (
    typeof process !== "undefined" &&
    process &&
    typeof process.exit === "function"
  )
    process.exit(-1000);
};

function setBreakpoints(args: any, sourceUpdate?: boolean) {
  const source = args.source;
  if (source.path) source.path = normalizeDir(source.path);
  const id = source.path || source.sourceReference;
  const module = context.modules[id];
  const diffs: P.Breakpoint[] = [];
  const body: any = { breakpoints: diffs };
  knownBreakpoints.set(id, args);
  if (config.verbose)
    // tslint:disable-next-line:no-console
    console.log(
      "DEBUGGER: setBreakpoints",
      id,
      JSON.stringify(args),
      module ? "<module loaded>" : "<module not loaded>",
      JSON.stringify(Object.keys(context.modules))
    );
  if (sourceUpdate || !module) {
    for (const i of args.breakpoints) diffs.push({ id: i.id, verified: false });
    return body;
  }
  const modBreakpoints = module.breakpoints || (module.breakpoints = []);
  for (const i of modBreakpoints) i.breakpoint = null;
  modBreakpoints.length = 0;
  const lines = module.lines || [];
  for (const i of args.breakpoints) {
    const diff: P.Breakpoint = { id: i.id, line: i.line, verified: false };
    diffs.push(diff);
    const line = lines[linStartAt1 ? i.line : i.line + 1];
    if (!line) continue;
    diff.verified = true;
    let info: State.Brk | undefined;
    const { column } = i;
    if (column == null) {
      [info] = line;
    } else {
      for (const brk of line) {
        const brkCol = adjCol(brk.column);
        if (column === brkCol) {
          info = brk;
          break;
        }
        if (column > brkCol && column <= adjCol(brk.endColumn)) info = brk;
      }
    }
    if (!info) continue;
    diff.line = adjLine(info.line);
    diff.column = adjCol(info.column);
    diff.endLine = adjLine(info.endLine);
    diff.endColumn = adjCol(info.endColumn);
    modBreakpoints.push(info);
    const func = info.meta;
    let conditionExpr: string | undefined;
    if (i.logMessage) conditionExpr = logMessageToExpression(i.logMessage);
    if (i.condition)
      conditionExpr = conditionExpr
        ? `(${i.condition}) && ${conditionExpr}`
        : `(${i.condition})`;
    const condition = conditionExpr
      ? <any>compileEval(conditionExpr, func, info)
      : null;
    info.breakpoint = {
      condition,
      hitCondition: i.hitCondition && compileEval(i.hitCondition, func, info),
      hits: 0,
      signal() {
        event("breakpoint", { reason: "changed", breakpoint: diff });
      }
    };
  }
  return body;
}

handlers.breakpointLocations = function(args, res) {
  const source = args.source;
  if (source.path) source.path = normalizeDir(source.path);
  const id = source.path || source.sourceReference;
  const breakpoints: P.BreakpointLocation[] = [];
  res.body = { breakpoints };
  const module = context.modules[id];
  if (!module) return;
  const lines = module.lines;
  if (!lines) return;
  let { line, endLine, column, endColumn } = args;
  if (!endLine) endLine = line;
  for (let i = line; i <= endLine; ++i) {
    const brks = lines[linStartAt1 ? i : i + 1];
    if (brks[0].line !== i) continue;
    for (const brk of brks) {
      if (!(brk.flags & State.BrkFlag.STMT) || brk.flags & State.BrkFlag.EMPTY)
        continue;
      const cur = brk.line;
      const brkCol = adjCol(brk.column);
      if (
        (column && cur === line && adjCol(brkCol) < column) ||
        (endColumn && cur === endLine && adjCol(brkCol) > endColumn)
      )
        continue;
      breakpoints.push({
        line: adjLine(brk.line),
        column: brkCol,
        endLine: adjLine(brk.endLine),
        endColumn: adjCol(brk.endColumn)
      });
    }
  }
};

handlers.childSetBreakpoints = function(args, res) {
  res.body = setBreakpoints(args, args.sourceModified);
};

function setExceptionBreakpoints(args: P.SetExceptionBreakpointsArguments) {
  context.brkOnAnyException = false;
  context.brkOnUncaughtException = false;
  if (args.filters) {
    for (const i of args.filters) {
      if (i === "uncaught") context.brkOnUncaughtException = true;
      else context.brkOnAnyException = true;
    }
  }
}

handlers.childSetExceptionBreakpoints = function(args) {
  setExceptionBreakpoints(args);
};

handlers.evaluate = function(args, res) {
  let val;
  const expr = args.expression.trim();
  if (expr.length) {
    try {
      if (args.frameId == null) {
        val = State.saved.eval(expr);
      } else {
        const frame = getFrame(args.frameId);
        if (!frame || !frame.brk) val = "`eval` isn't available";
        else {
          let savedDebug = context.debug;
          try {
            context.debug = false;
            val = compileEval(expr, frame.meta, frame.brk)(frame);
          } finally {
            context.debug = savedDebug;
          }
        }
      }
    } catch (e) {
      val = String(e);
    }
  } else val = "";
  const descr = varValue("eval", val);
  res.body = {
    result: descr.value,
    type: descr.type,
    variablesReference: descr.variablesReference,
    namedVariables: descr.namedVariables,
    indexedVariables: descr.indexedVariables
  };
};

function compileEval(
  code: string,
  parentMeta: State.FunctionDescr,
  brk: State.Brk
): (f: State.Frame) => any {
  const meta = Engine.compileEval(
    code,
    parentMeta.module,
    brk.scope,
    brk.scopeDepth + 1,
    true,
    null
  );
  return function(frame: State.Frame) {
    const savedDebug = context.debug;
    context.debug = false;
    const func = meta.func(frame);
    try {
      return func();
    } finally {
      context.debug = savedDebug;
    }
  };
}

handlers.setExpression = function(args, res) {
  this.evaluate(
    assign({}, args, { expression: `${args.expression} = ${args.value}` }),
    res
  );
};

const sources = new Map<number, string>();

handlers.source = function(args, res) {
  const content = sources.get(args.sourceReference);
  res.body = { content };
};

context.onNewSource = function(id: number, code: string) {
  sources.set(id, code);
  event("loadedSources", {
    reason: "new",
    source: {
      name: `#eval_${id}.js`,
      sourceReference: id,
      origin: "eval"
    }
  });
};

// copied from https://github.com/microsoft/vscode-node-debug/blob/master/src/node/nodeDebug.ts
const LOGMESSAGE_VARIABLE_REGEXP = /{(.*?)}/g;

function logMessageToExpression(msg: string) {
  msg = msg.replace(/%/g, "%%");
  let args: string[] = [];
  let format = msg.replace(LOGMESSAGE_VARIABLE_REGEXP, function(_match, group) {
    const a = group.trim();
    if (a) {
      args.push(`(${a})`);
      return "%s";
    } else {
      return "";
    }
  });
  format = format.replace(/'/g, "\\'");
  return args.length > 0
    ? `console.log('${format}', ${args.join(", ")})`
    : `console.log('${format}')`;
}

/** the function is needed only for testing in same process */
export function resetLoad() {
  launchPromise = new Promise<boolean>(i => (launchCb = i));
  varCount = 100;
  resetScopes();
  sources.clear();
  stepCount = 0;
  Engine.reset();
}

/**
 * Returns `JSON.stringify` serializable object with the whole
 * current execution state
 */
export function capture(opts: S.WriteOptions = {}): S.JSONObject {
  const modules: any[] = [];
  const savedEnabled = journal.enabled;
  const modulesExports: any[] = [];
  try {
    journal.enabled = false;
    // tslint:disable-next-line:forin
    for (const id in context.modules) {
      const module = context.modules[id];
      const descr: any = { id };
      modules.push(descr);
      if (module.params) {
        descr.params = module.params;
      } else if (module.cjs) {
        const parents: string[] = [];
        if (module.cjs.parent) parents.push(module.cjs.parent.id);
        else if (module.cjs.parents) parents.push(...module.cjs.parents);
        descr.parents = parents;
        descr.cjs = module.cjs.id;
      }
      modulesExports.push(module);
    }
    const res = S.write(
      {
        activeTop: context.activeTop,
        top: context.top,
        syncStack: context.syncStack,
        queue: context.queue,
        brk: context.brk,
        brkFrame,
        journal: { ...journal },
        global,
        document: (<any>global).document,
        extra: Persist.extra,
        modules: modulesExports,
        closures: State.closures,
        functions: State.functions,
        thunks: State.thunks,
        binds: State.binds
      },
      assign(
        {
          ignore: "opaque",
          alwaysByRef: true,
          verbose: config.debuggerDebug
        },
        opts
      )
    );
    res.modules = modules;
    return res;
  } finally {
    journal.enabled = savedEnabled;
  }
}

/**
 * Restores execution state from an object previously returned by
 * `capture` the current state is discarded
 */
export function restore(json: S.JSONObject, opts: S.ReadOptions = {}) {
  // TODO: properly pause it if it runs
  const savedEnabled = journal.enabled;
  try {
    journal.enabled = false;
    const state = S.read(
      json,
      assign(
        {
          ignore: "placeholder",
          warnIgnored: true
        },
        opts
      )
    );
    if (state.extra) for (const i of state.extra) Persist.extra.add(i);
    context.value = null;
    // reloading somehow breaks WebSockets
    setTimeout(
      function() {
        if (typeof document !== "undefined") {
          if (config.mutationObserver && TT.DOM) {
            TT.DOM.observing.clear();
            TT.DOM.track(document.documentElement);
          }
        }
        journal.enabled = false;
        const loadedModules = new Set<string>();
        for (const i of (<any>json).modules) {
          let module = context.modules[i.id];
          loadedModules.add(i.id);
          const { params } = i;
          if (params) {
            const parent = params.parent && context.modules[params.parent];
            Engine.compileEval(
              params.code,
              parent,
              params.evalContext,
              params.scopeDepth,
              params.blackbox,
              params.params,
              params.id
            );
            continue;
          }
          if (!i.cjs) continue;
          if (!module || !module.cjs) {
            for (const parent of i.parents) {
              // this assumes parent modules are loaded first
              const parentModule = context.modulesById[parent];
              if (parentModule && parentModule.cjs) {
                parentModule.cjs.__effectful_js_require(i.cjs);
                break;
              }
            }
          }
          module = Engine.getCurModule();
          if (!module || !module.cjs) continue;
        }
        let modulesExports: any;
        ({
          activeTop: context.activeTop,
          top: context.top,
          syncStack: context.syncStack,
          queue: context.queue,
          brk: context.brk,
          brkFrame,
          journal: {
            now: journal.now,
            past: journal.past,
            future: journal.future,
            enabled: journal.enabled
          },
          modules: modulesExports
        } = state);
        if (modulesExports)
          for (const m of modulesExports) {
            m.cjs.exports = m.exports;
          }
        // tslint:disable-next-line:forin
        for (const id in context.modules) {
          const module = context.modules[id];
          if (loadedModules.has(id)) {
            if (module.cjs) module.exports = module.cjs.exports;
            continue;
          }
          if (!module.cjs) continue;
          weakMapSet.call(
            State.thunks,
            (module.exports = module.cjs.exports = {}),
            {
              value: runTopLevel.bind(null, module),
              configurable: true
            }
          );
        }
        if (context.activeTop) signalStopped();
        else {
          context.activeTop = context.top;
          reset();
          run();
        }
      },
      isBrowser ? 1000 : 0
    );
  } finally {
    journal.enabled = savedEnabled;
  }
}
