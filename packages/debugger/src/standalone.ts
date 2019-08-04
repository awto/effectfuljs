/** runs program and outputs some information about each step */
import * as Debugger from "./main";
import config from "./config";

export function traced() {
  const output: any[] = ((<any>global).debugger_output = []);
  function log(...args: any) {
    output.push(args);
    if (config.verbose) console.log(...args);
  }
  let num = 0;
  (function step() {
    let threadCnt = 0;
    let threadId = threadCnt++;
    let f: Debugger.Frame | undefined;
    log(`Starting thread ${threadId}`);
    while ((f = Debugger.step()) === Debugger.token) {
      const x = Debugger.context;
      log(`#${threadId}: Step #${num++}@${x.brk}:`, x.value);
        log(`#${threadId}:   Stack:`);
        for (let j = x.top; j; j = j.next)
          log(
            `#${threadId}:     ${j.constructor.name}@${j.meta.module.name}:${
              j.brk ? j.brk.location : "?"
            }`,
            j
          );
        if (x.top && x.top.brk) {
          log(`#${threadId}:   Variables:`);
          for (const j in x.top.brk.scope) {
            const [name, decl] = x.top.brk.scope[j];
            log(`#${threadId}:    ${name}@${decl}`, x.top.$[j]);
          }
        }
    }
    log(`Exiting thread ${threadId} with`, f);
    Debugger.threads.next().then(step);
  })();
}

export const silent = function step() {
  while (Debugger.step() === Debugger.token) {}
  Debugger.threads.next().then(step);
};
