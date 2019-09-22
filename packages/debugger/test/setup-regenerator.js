if (!global.it) global.it = global.test;
require("../../es/test/kit/skip")();
const trace = require("./run");
const D = require("../main");
const { context } = D;
const baseIt = global.it || global.test;
const baseDescribe = global.describe;
const assert = require("assert");
const RT = require("../rt");
const config = require("../config").default;

const isJest = typeof jest !== "undefined";

context.debug = false;

if (config.timeTravel) {
  const savedNeedsBreak = context.needsBreak;
  context.needsBreak = function() {
    D.TimeTravel.checkpoint();
    return savedNeedsBreak();
  };
}

const opts = {
  debug: false
};

global.it = function patchedIt(descr, fun) {
  return (
    fun &&
    baseIt(descr, async function() {
      let count = 0;
      const logCb = trace.logCb;
      if (config.timeTravel) {
        D.TimeTravel.reset();
        D.TimeTravel.checkpoint();
      }
      try {
        trace.silent = false;
        if (isJest) {
          trace.logCb = () => count++;
        } else console.log(`>> ${descr}`);
        context.debug = opts.debug;
        if (fun.length) {
          await trace.async(
            new Promise((rs, rj) =>
              fun.call(this, function(e) {
                if (arguments.length) {
                  rj(e);
                } else rs();
              })
            )
          );
        } else {
          const res = trace(fun.call(this));
          if (res && res.then && typeof res.then === "function")
            await trace.async(res);
        }
        assert.ok(trace.nothingToDo());
        context.suspended.clear();
      } finally {
        if (config.timeTravel) D.TimeTravel.reset(false);
        trace.silent = true;
        if (isJest) {
          trace.logCb = logCb;
          expect(count).toMatchSnapshot();
        } else {
          console.log(`<< ${descr}`);
        }
      }
    })
  );
};

global.describe = D.liftSync(baseDescribe);

global.skipTests = {
  // the loops are there but in another function
  "empty while loops": true
};

function run(descr) {
  return trace(D.evalThunk(descr));
}

module.exports = {
  describe: baseDescribe,
  it: baseIt,
  run,
  opts
};
