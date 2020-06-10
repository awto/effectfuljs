const D = require("../main");
const Engine = require("../engine");
const S = require("@effectful/serialization");
const {native} = require("../state");

const Ctx = D.context;

function describe() {
  if (!trace.silent) {
    trace.logCb(`Step @${Ctx.brk.type}`, Ctx.value);
    for (let j = Ctx.top; j; j = j.next) {
      const brk = j.brk;
      const pos = brk
        ? `${brk.line}:${brk.column}-${brk.endLine}:${brk.endColumn}`
        : "?";
      trace.logCb(`  ${j.constructor.name}@${j.meta.module.name}-${pos}`);
      trace.logCb(` Vars: `, j.$);
    }
  }
}

function cont(value) {
  Ctx.value = value;
  return loop();
}

function loop() {
  if (!trace.silent) trace.logCb(`Run Job: ${Ctx.top.meta.fullName}`);
  let f;
  while ((f = D.step()) === D.token) describe();
  return f;
}

function call(fun) {
  return trace(fun.call(this));
}

function activeOnThread() {
  if (Ctx.queue.length === 0) return;
  native.Object.assign(Ctx, Ctx.queue.shift());
  loop();
}

async function traceAsync(resultPromise) {
  resultPromise = trace(resultPromise);
  const savedOnThread = Ctx.onThread;
  Ctx.onThread = activeOnThread;
  try {
    return await resultPromise;
  } finally {
    Ctx.onThread = savedOnThread;
  }
}

async function callAsync(fun) {
  return traceAsync(call.call(this, fun));
}

function trace(value) {
  if (value !== Engine.token) return value;
  native.Object.assign(Ctx, Ctx.queue.shift());
  return loop();
}

function teardown() {
  Ctx.top = null;
  Ctx.activeTop = null;
  Ctx.queue.length = 0;
  Ctx.suspended.clear();
}

function nothingToDo() {
  return !Ctx.top && Ctx.queue.length === 0 && Ctx.suspended.size === 0;
}

trace.callAsync = callAsync;
trace.async = traceAsync;
trace.call = call;
trace.logCb = function() {
  console.log.apply(console, arguments);
};
trace.cont = cont;
trace.nothingToDo = nothingToDo;
trace.teardown = teardown;

module.exports = trace;
