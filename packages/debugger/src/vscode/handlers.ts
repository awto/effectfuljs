import config from "../config";
import * as State from "../state";
import * as Engine from "../engine";
import * as TT from "../timeTravel/main";
import * as path from "path";
import { DebugProtocol as P } from "./protocol";
import * as S from "@effectful/serialization";
import Comms from "./comms";
import { stateDescr } from "../standalone";
import * as util from "util";
import { map, filter } from "../kit";
import * as Persist from "../persist";

const { assign } = State.saved.Object;

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
      time() {},
      timeEnd() {}
    };

context.debug = true;

function trace(...args: [any, ...any[]]) {
  sysConsole.log.apply(sysConsole, args);
}

let brkNext: State.Frame | null = null;
let brkOut: State.Frame | null = null;
let stepIn = false;
let pauseNext = false;
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
  ? function (brk: State.Brk, top: State.Frame) {
    if (brk.flags & saveFlags) TT.checkpoint();
    return defaultNeedsBreak(brk, top);
  }
  : defaultNeedsBreak;

S.regOpaqueObject(context.needsBreak, "@effectful/debugger/vscode$brk");

function output(category: string, args: any[], value?: any) {
  const descr = value !== undefined ? varValue("console", value) : undefined;
  // TODO: formatter
  const top = context.top;
  let source: P.Source | undefined;
  let line: number | undefined;
  let column: number | undefined;
  if (top && top.brk) {
    source = getSource(top.meta.module);
    line = top.brk.line;
    column = top.brk.column;
  }
  event(
    "output",
    assign(
      {},
      {
        category,
        output: (<any>util.format).apply(util.format, <any>args) + "\n",
        value: descr && descr.value,
        variablesReference: descr && descr.variablesReference,
        source,
        line,
        column
      },
      getLocation()
    )
  );
}

const patchedConsole: any = assign(
  {},
  {
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
    // tslint:disable-next-line:no-console
    time: console.time,
    // tslint:disable-next-line:no-console
    timeEnd: console.timeEnd
  }
);

for (const name of Object.keys(patchedConsole))
  Persist.regOpaqueObject(patchedConsole[name], `#patcheConsole#{name}`)

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

function event(name: string, body: any) {
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

context.onLoad = function (module: State.Module, hot: boolean) {
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
    if (hot && context.brk) {
      event("stopped", {
        reason: "step",
        description: "approximated"
      });
    }
  }
};

let launchCb: ((stop: boolean) => void) | undefined;
let launchPromise: Promise<boolean> = new Promise<boolean>(i => (launchCb = i));

context.onThread = async function () {
  if (context.top || context.activeTop) return;
  if (!context.queue.length) {
    if (!context.top && !context.activeTop) {
      if (config.stopOnExit) signalStopped();
      else Comms.unref();
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
    if (job.stopOnEntry && !stop && (reason = checkPause(context.brk, top)))
      stop = true;
    // journal.enabled = config.timeTravel;
    TT.checkpoint();
    if (stop) {
      context.activeTop = context.top;
      context.top = null;
      signalStopped();
    } else {
      step();
      cont();
    }
  }
};

handlers.childRestart = function (res) {
  if (typeof window !== "undefined") window.location.reload();
  else {
    res.success = false;
    res.message = "restart isn't supported";
  }
};

handlers.launch = function () { };

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
  let cur = context.activeTop;
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

handlers.stackTrace = function (args, response) {
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

handlers.scopes = function (args, response) {
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
          // tslint:disable-next-line:forin
          for (const i in scope) {
            const [field, depth, loc] = scope[i];
            if (!loc || depth < scopeDepth) continue;
            let cur: any = store;
            for (let j = depth; j > scopeDepth; --j) cur = cur[0];
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

handlers.variables = function (args, response) {
  let variables: VarValue[] = [];
  const val = curValById.get(args.variablesReference);
  if (val != null) {
    if (val[variablesSym] != null) {
      val[variablesSym](variables);
    } else if (Array.isArray(val)) {
      for (
        let i = args.start || 0, len = args.count || val.length;
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
      const descr = value[State.dataSymbol];
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
    } catch (e) { }
  }
}

function reset() {
  brkFrame = brkOut = brkNext = null;
  stepIn = false;
  pauseNext = false;
  resetScopes();
}

handlers.childLaunch = function (args, res) {
  setDirSep(args.dirSep);
  if (config.timeTravel) {
    TT.reset(!config.timeTravelDisabled);
    if (config.mutationObserver && TT.DOM && typeof window !== "undefined")
      TT.DOM.track(document.documentElement);
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
  if (launchCb != null) return "entry";
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
  if (brk.flags & State.BrkFlag.STMT) {
    if (stepIn) return "step";
    if ((brkNext = firstActiveFrame(brkNext)) && brkNext === top) return "next";
    if (brk.flags & State.BrkFlag.DEBUGGER_STMT) return "debugger_statement";
  } else if (brk.flags & State.BrkFlag.EXIT) {
    if (brkOut && brkOut === top) return "stepOut";
  }
  if (Comms.hasMessage())
    return "interrupt";
  return undefined;
}

let stepCount = 0;

function run(back?: boolean) {
  context.top = context.activeTop;
  context.brk = context.activeTop && context.activeTop.brk;
  if (config.verbose)
    trace(`DEBUGGER: run ${stateDescr(stepCount++, context.threadId, true)}`);
  context.activeTop = null;
  try {
    step(back);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
  }
  cont(back);
}

const step: (back?: boolean) => void = config.timeTravel
  ? function step(back?: boolean) {
    if (back || journal.future) {
      runningTrace = true;
      const iter = back ? TT.undo : TT.redo;
      let lastBrk = context.brk;
      while (iter()) {
        const { brk, top } = context;
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
      if (back) {
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

context.onStop = function (_description?: string) {
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
  if (Comms.hasMessage())
    setTimeout(interruptibleStep, 0)
  else
    Engine.step();
}

function cont(back?: boolean) {
  if (config.verbose)
    trace(`DEBUGGER: continue hasTop:${!!context.top}, back:${!!back}`);
  if (!context.activeTop) event("continued", {});
}

handlers.pause = function (_, res) {
  send(res);
  // pauseNext = true;
  stepIn = true;
  if (config.timeTravel) run(true);
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

handlers.stepIn = function (_, res) {
  send(res);
  reset();
  stepIn = true;
  run();
};

handlers.reverseContinue = function (_, res) {
  if (checkTimeTravelEnabled(res)) return;
  send(res);
  reset();
  run(true);
};

handlers.stepBack = function (_, res) {
  if (checkTimeTravelEnabled(res)) return;
  send(res);
  reset();
  stepIn = true;
  run(true);
};

handlers.continue = function (_, res) {
  send(res);
  reset();
  run();
};

handlers.next = function (_, res) {
  send(res);
  const top = brkFrame || context.activeTop;
  reset();
  brkNext = top;
  if (brkNext && brkNext.brk && brkNext.brk.flags & State.BrkFlag.EXIT)
    brkNext = nextFrame(brkNext);
  run();
};

handlers.stepOut = function (_, res) {
  send(res);
  const top = brkFrame || context.activeTop;
  reset();
  brkOut = top;
  if (brkOut && brkOut.brk && brkOut.brk.flags & State.BrkFlag.EXIT)
    brkOut = nextFrame(brkOut);
  run();
};

handlers.childTerminate = function () {
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
      args,
      [id],
      Object.keys(context.modules),
      module ? "FOUND" : "NOT FOUND"
    );
  if (sourceUpdate || !module) {
    for (const i of args.breakpoints) diffs.push({ id: i.id, verified: false });
    return body;
  }
  const modBreakpoints = module.breakpoints || (module.breakpoints = []);
  for (const i of modBreakpoints) i.breakpoint = null;
  modBreakpoints.length = 0;
  const functions = Object.values(module.functions);
  for (const i of args.breakpoints) {
    const diff: P.Breakpoint = { id: i.id, line: i.line, verified: false };
    diffs.push(diff);
    const { line } = i;
    const allHits: State.Brk[] = [];
    const exactHits: State.Brk[] = [];
    for (const i of functions) {
      if (
        i.line == null ||
        i.endLine == null ||
        i.line > line ||
        i.endLine < line
      )
        continue;
      const states = i.statesByLine;
      if (!states) continue;
      let info;
      let j;
      for (j of states) {
        if ((j.flags & State.BrkFlag.STMT) === 0) continue;
        if (j.line <= line && j.endLine >= line) {
          info = j;
        }
        if (j.line > line) break;
      }
      if (info) {
        if (info.line === line) exactHits.push(info);
      } else {
        info = j;
      }
      if (info) allHits.push(info);
    }
    if (!allHits.length) continue;
    let hits: State.Brk[] = exactHits;
    if (!hits.length) {
      if (allHits.length === 1) {
        hits = allHits;
      } else {
        // trying to figure out the most narrow context
        let minEndLine = 1 << 20;
        let minEndCol = 1 << 20;
        for (const i of allHits) {
          if (i.endLine < minEndLine) {
            minEndLine = i.endLine;
            minEndCol = i.endColumn;
          } else if (i.endLine === minEndLine) {
            if (i.endColumn < minEndCol) {
              minEndCol = i.endColumn;
            }
          }
        }
        hits = filter(
          allHits,
          i => i.endLine === minEndLine && i.endColumn === minEndCol
        );
        if (hits.length > 1) {
          let maxLine = 0;
          let maxCol = 0;
          for (const i of allHits) {
            if (i.line > maxLine) {
              maxLine = i.line;
              maxCol = i.column;
            } else if (i.line === maxLine) {
              maxCol = i.column;
            }
          }
          hits = filter(hits, i => i.line === maxLine && i.column === maxCol);
        }
      }
    }
    diff.line = adjLine(hits[0].line);
    diff.column = adjCol(hits[0].column);
    diff.verified = true;
    for (const info of hits) {
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
  }
  return body;
}

handlers.childSetBreakpoints = function (args, res) {
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

handlers.childSetExceptionBreakpoints = function (args) {
  setExceptionBreakpoints(args);
};

handlers.evaluate = function (args, res) {
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
  return function (frame: State.Frame) {
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

handlers.setExpression = function (args, res) {
  this.evaluate(
    assign({}, args, { expression: `${args.expression} = ${args.value}` }),
    res
  );
};

const sources = new Map<number, string>();

handlers.source = function (args, res) {
  const content = sources.get(args.sourceReference);
  res.body = { content };
};

context.onNewSource = function (id: number, code: string) {
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
  let format = msg.replace(LOGMESSAGE_VARIABLE_REGEXP, function (_match, group) {
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
export function capture(): S.JSONObject {
  const modules: any = [];
  const savedEnabled = journal.enabled;
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
        // descr.children = module.cjs.children;
      }
    }
    const res = S.write(
      {
        activeTop: context.activeTop || context.top,
        syncStack: context.syncStack,
        queue: context.queue,
        debug: context.debug,
        brk: context.brk,
        brkFrame,
        journal,
        global,
        document: (<any>global).document,
        extra: Persist.extra
      },
      { ignore: "opaque", warnIgnored: true, alwaysByRef: true, verbose: config.debuggerDebug }
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
export function restore(json: S.JSONObject) {
  if (context.top && !context.activeTop)
    throw new Error(
      "NOT IMPLEMENTED YET: restoring state when an application runs"
    ); // TODO: (pause it)
  const savedEnabled = journal.enabled;
  let extra: Set<any>;
  try {
    journal.enabled = false;
    for (const i of (<any>json).modules) {
      let module = context.modules[i.id];
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
    ({
      activeTop: context.activeTop,
      syncStack: context.syncStack,
      queue: context.queue,
      debug: context.debug,
      brk: context.brk,
      brkFrame,
      journal: {
        now: journal.now,
        past: journal.past,
        future: journal.future,
        enabled: journal.enabled
      },
      extra
    } = S.read(json, { ignore: "placeholder", warnIgnored: true }));
    for (const i of extra) Persist.extra.add(i);
    // reloading somehow breaks WebSockets 
    setTimeout(function () {
      if (typeof document !== "undefined") {
        if (config.mutationObserver && TT.DOM && typeof window !== "undefined") {
          TT.DOM.observing.clear();
          TT.DOM.track(document.documentElement);
        }
      }
      if (context.activeTop) signalStopped();
      else event("continued", {});
    }, 1000);
  } finally {
    journal.enabled = savedEnabled;
  }
}
