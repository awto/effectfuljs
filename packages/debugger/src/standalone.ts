/** runs program and outputs some information about each step */
import * as Debugger from "./main";
import config from "./config";

const { context } = Debugger;

export function stateDescr(
  stepId: number,
  threadId: number,
  verbose?: boolean
): string {
  const x = Debugger.context;
  const res = [];
  res.push(
    `#${threadId}: Step #${stepId}@${x.brk ? "stopped" : "running"} = ${String(
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
    for (const j in x.top.brk.scope) {
      const [name, decl] = x.top.brk.scope[j];
      res.push(
        `#${threadId}:    ${name}@${decl}: ${String(x.top.$[j])} = ${String(
          x.top.$[j]
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
      console.log(args[0]);
  }
  let num = 0;
  (context.onThread = function step() {
    if (context.queue.length === 0) return;
    Object.assign(context, context.queue.shift());
    let threadCnt = 0;
    let threadId = threadCnt++;
    let f: Debugger.Frame | undefined;
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