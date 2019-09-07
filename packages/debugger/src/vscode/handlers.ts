import config from "../config";
import * as State from "../state";
import * as Engine from "../engine";
import * as Trace from "../timeTravel/main";
import * as path from "path";
import { DebugProtocol as P } from "./protocol";
import Comms from "./comms";

declare module "../state" {
  interface Brk {
    logPoint?: (frame: Frame) => void;
    breakpoint?: {
      condition: (frame: Frame) => boolean;
      hitCondition: (frame: Frame) => number;
      hits: number;
      signal: () => void;
    };
  }
  interface Module {
    debuggerSource?: P.Source;
    breakpoints?: Brk[];
    functionsSorted?: NonBlackboxFunctionDescr[];
  }
}

declare module "../timeTravel/core" {
  interface Record {
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
let threadId: number;
const Ctx = State.context;
const sysConsole = console;
let savedTop: State.Frame | null = null;
let contThread = false;
const { journal } = Trace;

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

let reason: string | null = null;

Ctx.needsBreak = config.timeTravel
  ? function(brk: State.Brk) {
      const checkpoint = Trace.checkpoint();
      if (checkpoint)
        checkpoint.context = {
          top: Ctx.top,
          debug: Ctx.debug,
          brk: Ctx.brk,
          value: Ctx.value
        };
      return (reason = checkPause(brk)) != null;
    }
  : function(brk: State.Brk) {
      return (reason = checkPause(brk)) != null;
    };

function output(category: string, args: any[]) {
  sysConsole.log(category, ...args);
  const descr = varValue("console", args.length === 1 ? args[0] : args);
  event("output", {
    category,
    value: descr.value,
    variablesReference: descr.variablesReference,
    ...getLocation()
  });
}

const patchedConsole: any = {
  log(...args: any[]) {
    output("console", args);
  },
  error(...args: any[]) {
    output("stderr", args);
  },
  warn(...args: any[]) {
    output("stderr", args);
  },
  dir(arg: any[]) {
    output("console", [arg]);
  }
};

// global.console = patchedConsole;

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
  sysConsole.log("DISP", req);
  if (handler) handler(req.arguments, res);
  send(res);
}

Ctx.onUpdate = function(module: State.Module) {
  console.log("LOADED", getSource(module));
  event("loadedSource", { reason: "changed", source: getSource(module) });
};

let launchCb: () => void;
const launchPromise = new Promise(i => (launchCb = i));

Ctx.onThread = function() {
  if (!Ctx.queue.length) return;
  const job = <State.Job>Ctx.queue.shift();
  sysConsole.log("NEW THREAD", Ctx.top);
  Ctx.top = job.top;
  Ctx.debug = job.debug;
  Ctx.brk = job.brk;
  Ctx.value = job.value;
  if (Ctx.brk && !savedTop) {
    savedTop = Ctx.top;
    Ctx.top = null;
    if (contThread && reason === "step") {
      contThread = false;
      reset();
      run();
    } else {
      event("stopped", { reason });
    }
  }
};

/*
(async function() {
  await launchPromise;
  for await (const job of Engine.threads) {
    sysConsole.log("NEW THREAD", Ctx.top);
    Ctx.top = job.top;
    Ctx.debug = job.debug;
    Ctx.brk = job.brk;
    Ctx.value = job.value;
    if (Ctx.brk && !savedTop) {
      savedTop = Ctx.top;
      Ctx.top = null;
      if (contThread && reason === "step") {
        contThread = false;
        reset();
        run();
      } else {
        event("stopped", { reason });
      }
    }
  }
  return State.token;
})();
*/

handlers.restart = function() {};

handlers.launch = function() {};

let linStartAt1 = true;
let colStartAt1 = true;

function line(num: number): number {
  return linStartAt1 ? num : num - 1;
}

function col(num: number): number {
  return colStartAt1 ? num + 1 : num;
}

function getSource(module: State.Module) {
  let source = module.debuggerSource;
  if (!source) {
    const file = module.name;
    source = module.debuggerSource = {
      name: path.basename(file),
      path: file
    };
  }
  return source;
}

function getFrame(frameId = 0): State.Frame | null {
  let cur = savedTop;
  for (let i = frameId; cur && i > 0; --i) cur = cur.next;
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
  sysConsole.log("STACK", savedTop, Ctx);
  const startFrame = typeof args.startFrame === "number" ? args.startFrame : 0;
  const maxLevels = typeof args.levels === "number" ? args.levels : 1000;
  const endFrame = startFrame + maxLevels;
  const visibleFrames = [];
  for (let i = savedTop; i; i = i.next) {
    if (i.brk == null || i.meta.blackbox) continue;
    visibleFrames.push(i);
  }
  const stackFrames = [];
  for (let i = startFrame; i < Math.min(endFrame, visibleFrames.length); i++) {
    const f = visibleFrames[i];
    const meta = f.meta;
    const { brk } = f;
    const name = meta.name;
    const sf = {
      id: i, // threadId << (FRAME_MASK + i),
      name, // `${name}(${i})`,
      source: getSource(meta.module),
      adapterData: "effectful-adapter-data",
      line: brk && line(brk.line),
      column: brk && col(brk.column),
      endLine: brk && line(brk.endLine),
      endColumn: brk && col(brk.endColumn)
    };
    stackFrames.push(sf);
  }
  response.body = {
    stackFrames,
    totalFrames: stackFrames.length //Ctx.stack.length
  };
};

const globalScope = {
  name: "Global",
  variablesReference: 1,
  expensive: true
};

const curValById = new Map();
const curIdByVal = new Map();
let varCount = 100;

function resetScopes() {
  curValById.clear();
  curIdByVal.clear();
  curValById.set(globalScope.variablesReference, global);
  curIdByVal.set(global, globalScope.variablesReference);
}

const variablesSym = Symbol("@effectful/debugger/variables");

handlers.scopes = function(args, response) {
  const frameReference = args.frameId;
  const root = getFrame(frameReference);
  const scopes = [];
  if (root) walk(root);
  scopes.push(globalScope);
  response.body = {
    scopes: scopes
  };
  function walk(frame: State.Frame) {
    const meta = frame.meta;
    const { brk } = frame;
    if (brk) {
      const ref = varCount++;
      const names = Object.keys(brk.scope);
      const scopeDescr = {
        [variablesSym](variables: VarValue[]) {
          const { scope } = brk;
          for (const i in scope) {
            const [field, depth] = scope[i];
            if (depth === 0) variables.push(varValue(i, frame.$[field]));
          }
        },
        ref,
        response: {
          name: meta.name,
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
    if (frame.$$) walk(frame.$$);
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
        let i = args.start || 0, len = args.count || val.length;
        i < len;
        ++i
      )
        variables.push(varValue(i, val[i]));
      variables.push(varValue("length", val.length));
    } else {
      const descrs = Object.getOwnPropertyDescriptors(val);
      const arr = [];
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
  response.body = {
    variables: variables
  };
};

function varValue(name: string, value: any): VarValue {
  let valRepr = value;
  switch (typeof value) {
    case "function":
      const descr = value[State.dataSymbol];
      if (descr) {
        const meta = descr.meta;
        valRepr = `${meta.name}@${path.basename(meta.module.name)}:${
          meta.location
        }`;
      }
    case "object":
      if (value !== null) {
        let ref = curIdByVal.get(value);
        if (!ref) {
          ref = varCount++;
          curIdByVal.set(value, ref);
          curValById.set(ref, value);
        }
        const res: VarValue = {
          name: String(name),
          value: String(valRepr),
          type: value.constructor && value.constructor.name,
          variablesReference: ref
        };
        if (Array.isArray(value)) {
          res.indexedVariables = value.length;
        } else {
          res.namedVariables = Object.values(
            Object.getOwnPropertyDescriptors(value)
          ).filter(i => "value" in i).length;
          const proto = Object.getPrototypeOf(value);
          if (proto !== null && proto !== Object.prototype)
            res.namedVariables++;
        }
        return res;
      }
    default:
      return {
        name: String(name),
        value: String(value),
        type: typeof value,
        variablesReference: 0
      };
  }
}

let brkNext: State.Frame | null = null;
let brkOut: State.Frame | null = null;
let stepIn = true;
function reset() {
  brkOut = brkNext = null;
  stepIn = false;
  resetScopes();
}

handlers.childLaunch = function(args, res) {
  send(res);
  threadId = args.threadId;
  launchCb();
  // stepIn = args.stopOnEntry;
  sysConsole.log("CHILD LAUNCH", Ctx);
  contThread = !args.stopOnEntry;
  // if (!args.stopOnEntry && reason === "step") Ctx.brk = null;
};

function checkPause(
  brk: State.Brk
): null | "pause" | "step" | "next" | "breakpoint" {
  const top = <State.Frame>Ctx.top;
  if (brk.logPoint) sysConsole.log(brk.logPoint(top));
  switch (brk.type) {
    case State.BrkType.location:
      if (stepIn) return "step";
      if (brkNext && brkNext === top) return "next";
      break;
    case State.BrkType.exit:
      if (brkNext && brkNext === top) brkNext = top.next;
      if (brkOut && brkOut === top) return "next";
      return null;
    case State.BrkType.debugger:
      return "breakpoint";
  }
  const { breakpoint: bp } = brk;
  if (!bp) return null;
  if (bp.condition && !bp.condition(top)) return null;
  if (bp.hitCondition && bp.hitCondition(top) !== bp.hits++) return null;
  return "breakpoint";
}

function run(back?: boolean) {
  Ctx.top = savedTop;
  Ctx.brk = savedTop && savedTop.brk;
  console.log("RE-RUN", savedTop);
  savedTop = null;
  step(back);
  cont(back);
}

const step: (back?: boolean) => void = config.timeTravel
  ? function step(back?: boolean) {
      const iter = back ? Trace.undo : Trace.redo;
      for (let now: Trace.Record | null; (now = iter()); ) {
        Object.assign(Ctx, now.context);
        const { brk } = Ctx;
        if (brk && (reason = checkPause(brk)) != null) return;
      }
      if (!back) Engine.step();
    }
  : Engine.step;

function cont(back?: boolean) {
  sysConsole.log(Ctx.brk, Ctx.value, back);
  if (!Ctx.top) {
    console.log("FROM CONT");
    event("continued", {});
  } else {
    console.log("STOPPING", savedTop);
    if (!savedTop) {
      savedTop = Ctx.top;
      event("stopped", { reason });
    }
    Ctx.top = null;
  }
}

handlers.pause = function(_, res) {
  send(res);
  stepIn = true;
  if (config.timeTravel) run(true);
};

handlers.stepIn = function(_, res) {
  send(res);
  reset();
  stepIn = true;
  run();
};

handlers.reverseContinue = function(_, res) {
  send(res);
  reset();
  run(true);
};

handlers.stepBack = function(_, res) {
  send(res);
  reset();
  stepIn = true;
  run(true);
};

handlers.evaluate = function() {};

handlers.continue = function(_, res) {
  send(res);
  reset();
  run();
};

handlers.next = function(_, res) {
  send(res);
  reset();
  brkNext = savedTop;
  if (brkNext && brkNext.brk && brkNext.brk.exit) brkNext = brkNext.next;
  run();
};

handlers.stepOut = function(_, res) {
  send(res);
  reset();
  brkOut = savedTop;
  if (brkOut && brkOut.brk && brkOut.brk.exit) brkOut = brkOut.next;
  run();
};

function funcByLine(funcs: State.NonBlackboxFunctionDescr[], line: number) {
  let res;
  for (const i of funcs) {
    if (i.line == null || i.endLine == null) continue;
    if (i.line > line) break;
    if (i.line === line) {
      res = i;
      break;
    }
    if (i.line < line && i.endLine >= line) res = i;
  }
  return res;
}

handlers.childSetBreakpoints = function(args, res) {
  const module = Ctx.modules[args.path];
  if (!module) {
    for (const i of args.breakpoints) i.verified = false;
    return;
  }
  const diffs: P.Breakpoint[] = [];
  res.body = { path: args.path, breakpoints: diffs };
  const modBreakpoints = module.breakpoints || (module.breakpoints = []);
  for (const i of modBreakpoints) i.breakpoint = i.logPoint = undefined;
  modBreakpoints.length = 0;
  const functionsSorted = (<State.NonBlackboxFunctionDescr[]>(
    Object.values(module.functions)
  )).sort((l, r) =>
    l.line === r.line ? l.column - r.column : l.line - r.line
  );
  for (const i of args.breakpoints) {
    const diff: P.Breakpoint = { id: i.id, line: i.line, verified: false };
    diffs.push(diff);
    const func = funcByLine(functionsSorted, i.line);
    if (!func) continue;
    const { states } = func;
    if (!states) continue;
    let info;
    for (const j of states) {
      if (
        (j.line <= i.line && j.endLine >= i.line) ||
        (j.line > i.line && !info)
      )
        info = j;
      if (j.line > i.line) break;
    }
    if (!info) continue;
    modBreakpoints.push(info);
    diff.line = info.line;
    diff.verified = true;
    if (i.logPoint)
      info.logPoint =
        i.logPoint && Engine.compileEval(i.logPoint, func, info, true);
    else
      info.breakpoint = {
        condition:
          i.condition && Engine.compileEval(i.condition, func, info, true),
        hitCondition:
          i.hitCondition &&
          Engine.compileEval(i.hitCondition, func, info, true),
        hits: 0,
        signal() {
          console.log("SIGNAL");
          event("breakpoint", { reason: "changed", breakpoint: diff });
        }
      };
  }
};

handlers.evaluate = function(args, res) {
  let val;
  try {
    if (args.frameId == null) {
      val = eval(args.expression);
    } else {
      const frame = getFrame(args.frameId);
      if (!frame || !frame.brk) val = "`eval` isn't available";
      else
        val = Engine.compileEval(args.expression, frame.meta, frame.brk, true)(
          frame
        );
    }
  } catch (e) {
    val = String(e);
  }
  const descr = varValue("eval", val);
  res.body = {
    result: descr.value,
    type: descr.type,
    variablesReference: descr.variablesReference,
    namedVariables: descr.namedVariables,
    indexedVariables: descr.indexedVariables
  };
};

handlers.setExpression = function(args, res) {
  this.evaluate(
    { ...args, expression: `${args.expression} = ${args.value}` },
    res
  );
};
