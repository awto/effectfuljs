/** runs program and outputs some information about each step */
import * as Debugger from "./main";
import config from "./config";
import { Frame } from "./state";

const { context } = Debugger;

function str(value: any): string {
  try {
    return String(value);
  } catch (e) {
    return e.message;
  }
}

export function stateDescr(
  stepId: number,
  threadId: number,
  verbose?: boolean
): string {
  const x = Debugger.context;
  const res = [];
  res.push(
    `#${threadId}: Step #${stepId}@${x.brk ? "stopped" : "running"} = ${str(
      x.value
    )} ${x.error ? "ERROR" : ""}`
  );
  res.push(`#${threadId}:   Stack:`);
  for (let j = x.top || x.activeTop; j; j = j.next) {
    const verboseInfo = verbose ? ` [${j.state}=>${j.goto}]` : "";
    res.push(
      `#${threadId}:     ${j.constructor.name}@${j.meta.module.name}:${
        j.brk ? j.brk.location : "?"
      }${verboseInfo}`
    );
  }
  if (x.top && x.top.brk) {
    res.push(`#${threadId}:   Variables:`);
    // tslint:disable-next-line:forin
    for (const j in x.top.brk.scope) {
      const [name, decl] = x.top.brk.scope[j];
      res.push(
        `#${threadId}:    ${name}@${decl}: ${str(x.top.$[name])} = ${str(
          x.top.$[name]
        )}`
      );
    }
  }
  return res.join();
}

export function traced() {
  const output: any[] = ((<any>global).debugger_output = []);
  function log(...args: any) {
    output.push(args);
    if (config.verbose)
      // console.log(...args);
      // tslint:disable-next-line:no-console
      console.log(args[0]);
  }
  let num = 0;
  (context.onThread = function step() {
    if (context.queue.length === 0) return;
    Object.assign(context, context.queue.shift());
    let threadCnt = 0;
    let threadId = threadCnt++;
    let f: Frame | undefined;
    log(`Starting thread ${threadId}`);
    while ((f = Debugger.step()) === Debugger.token)
      log(stateDescr(num++, threadId));
    log(`Exiting thread ${threadId}`, f);
  })();
}

export const silent = function step() {
  context.onThread = step;
  if (context.queue.length === 0) return;
  Object.assign(context, context.queue.shift());
  while (Debugger.step() === Debugger.token) {}
};
