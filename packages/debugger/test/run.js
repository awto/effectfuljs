const D = require("../main");
const S = require("@effectful/serialization");

module.exports = function trace(silent) {
  let num = 0;
  let f;
  while ((f = D.step()) === D.token) {
    const x = D.context;
    if (!silent) {
      console.log(`Step #${num++}@${x.brk.kind}`, x.value);
      for (const j of x.stack) {
        const brk = j.brk;
        const pos = brk
          ? `${brk.line}:${brk.column}-${brk.endLine}:${brk.endColumn}`
          : "?";
        console.log(`  ${j.constructor.name}@${j.meta.module.name}-${pos}`);
        console.log(` Vars: `, j.$);
      }
    }
  }
  return f;
};
