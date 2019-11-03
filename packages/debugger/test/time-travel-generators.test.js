require("./setup-time-travel");
const trace = require("./run");
trace.silent = true;
const D = require("../main");
const S = require("@effectful/serialization");
const Ctx = D.context;
S.regGlobal();

test("generator functions time traveling", function() {
  const savedConsole = global.console;
  const calls = [];
  try {
    global.console = {
      log(...args) {
        D.TimeTravel.Core.arraySaved.push.call(calls, args);
      }
    };
    Ctx.debug = true;
    Ctx.needsBreak = brk => {
      if (brk.meta.name === "_testGen" && brk.id === 1) {
        console.log("CHECKPOINT");
        D.TimeTravel.checkpoint();
      }
      return false;
    };
    S.regOpaqueObject(Ctx.needsBreak, "needsBrk");
    const mod = trace(D.evalThunk(require("./__fixtures__/tt/generators")));
    D.TimeTravel.reset();
    console.log("DONE 1", trace(mod.testGen()));
    D.TimeTravel.undo();
    D.TimeTravel.checkpoint();
    console.log("DONE 2", trace.cont(Ctx.value));
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    D.TimeTravel.checkpoint();
    console.log("DONE 3", trace.cont(Ctx.value));
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    D.TimeTravel.redo();
    D.TimeTravel.redo();
    D.TimeTravel.checkpoint();
    console.log("DONE 4", trace.cont());
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    const j = D.TimeTravel.journal;
    j.enabled = false;
    const data = S.write({
      now: j.now,
      future: j.future,
      past: j.past,
      data: Ctx.top
    });
    D.TimeTravel.reset();
    const restored = S.read(data);
    Ctx.top = restored.data;
    Object.assign(D.TimeTravel.journal, restored);
    j.enabled = true;
    D.TimeTravel.undo();
    D.TimeTravel.redo();
    D.TimeTravel.redo();
    console.log("DONE 5", trace.cont());
  } finally {
    D.TimeTravel.reset(false);
    global.console = savedConsole;
    expect(calls).toMatchSnapshot();
  }
});

test("async function's time traveling", async function() {
  const savedConsole = global.console;
  const calls = [];
  try {
    global.console = {
      log(...args) {
        D.TimeTravel.Core.arraySaved.push.call(calls, args);
      }
    };
    Ctx.debug = true;
    Ctx.needsBreak = brk => {
      if (brk.meta.name === "_testAsync" && brk.id === 1) {
        console.log("CHECKPOINT");
        D.TimeTravel.checkpoint();
      }
      return false;
    };
    const mod = trace(D.evalThunk(require("./__fixtures__/tt/generators")));
    let r;
    function resetR(rs) {
      r.cont = rs;
    }
    const journal = D.TimeTravel.journal;
    S.regOpaqueObject(resetR);
    S.regOpaqueObject(mod, "mod");
    D.TimeTravel.reset();
    D.TimeTravel.checkpoint();
    const r1 = trace(mod.testAsync());
    r = r1;
    console.log("CHECKPOINT - 1");
    D.TimeTravel.checkpoint();
    trace(r1.rs(100));
    console.log("A:R1", await trace.async(new Promise(resetR)), r1.v);
    console.log("CHECKPOINT - 2");
    D.TimeTravel.checkpoint();
    trace(r1.rs(200));
    console.log("A:R2", await trace.async(new Promise(resetR)), r1.v);
    console.log("CHECKPOINT - 3");
    D.TimeTravel.checkpoint();
    trace(r1.rs(300));
    console.log("A:R3", await trace.async(new Promise(resetR)), r1.v);
    console.log("UNDO 1");
    D.TimeTravel.undo();
    console.log("CHECKPOINT - 3/2");
    D.TimeTravel.checkpoint();
    trace(r1.rs(301));
    console.log("A:R3/1", await trace.async(new Promise(resetR)), r1.v);
    console.log("UNDO 2");
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    console.log("CHECKPOINT/3");
    D.TimeTravel.checkpoint();
    console.log("CONT 2", trace.cont());
    console.log("CHECKPOINT - 3/3");
    D.TimeTravel.checkpoint();
    trace(r1.rs(302));
    console.log("A:R3/2", await trace.async(new Promise(resetR)), r1.v);
    console.log("UNDO3");
    for (let i = 0; i < 10; ++i) D.TimeTravel.undo();
    for (let i = 0; i < 6; ++i) D.TimeTravel.redo();
    console.log("CHECKPOINT - 3/3");
    D.TimeTravel.checkpoint();
    trace(r1.rs(303));
    console.log("A:R3/3", await trace.async(new Promise(resetR)), r1.v);
    console.log("UNDO4");
    for (let i = 0; i < 10; ++i) D.TimeTravel.undo();
    for (let i = 0; i < 10; ++i) D.TimeTravel.redo();
    D.TimeTravel.undo();
    console.log("CHECKPOINT - 3/4");
    D.TimeTravel.checkpoint();
    trace(r1.rs(304));
    console.log("A:R3/4", await trace.async(new Promise(resetR)), r1.v);
    console.log("UNDO5");
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    journal.enabled = false;
    console.log("WRITE");
    const data = JSON.stringify(
      S.write({ j: { ...journal }, data: r1 }, { ignore: "placeholder" })
    );
    journal.enabled = true;
    D.TimeTravel.redo();
    D.TimeTravel.redo();
    console.log("CHECKPOINT - 3/5");
    D.TimeTravel.checkpoint();
    trace(r1.rs(305));
    console.log("A:R3/5", await trace.async(new Promise(resetR)), r1.v);
    journal.enabled = false;
    console.log("UNDO 6");
    const restored = S.read(JSON.parse(data));
    const r2 = (r = restored.data);
    Object.assign(journal, restored.j);
    journal.enabled = true;
    D.TimeTravel.redo();
    D.TimeTravel.redo();
    console.log("CHECKPOINT - 3/6");
    D.TimeTravel.checkpoint();
    trace(r2.rs(306));
    console.log("A:R3/6", await trace.async(new Promise(resetR)), r2.v);
    console.log("UNDO 7");
    D.TimeTravel.undo();
    console.log("CHECKPOINT - 3/7");
    D.TimeTravel.checkpoint();
    trace(r2.rs(307));
    console.log("A:R3/7", await trace.async(new Promise(resetR)), r2.v);
  } finally {
    D.TimeTravel.reset(false);
    global.console = savedConsole;
    expect(calls).toMatchSnapshot();
  }
});

test("async generator functions time traveling", async function() {
  const savedConsole = global.console;
  const calls = [];
  try {
    global.console = {
      log(...args) {
        D.TimeTravel.Core.arraySaved.push.call(calls, args);
      }
    };
    Ctx.debug = true;
    Ctx.needsBreak = brk => {
      if (brk.meta.name === "_testAsyncGen" && brk.id === 1) {
        console.log("CHECKPOINT");
        D.TimeTravel.checkpoint();
      }
      return false;
    };
    const mod = trace(D.evalThunk(require("./__fixtures__/tt/generators")));
    let r;
    function resetR(rs) {
      r.cont = rs;
    }
    const journal = D.TimeTravel.journal;
    S.regOpaqueObject(resetR);
    S.regOpaqueObject(mod, "mod");
    D.TimeTravel.reset();
    D.TimeTravel.checkpoint();
    const r1 = trace(mod.testAsyncGen());
    r = r1;
    console.log("CHECKPOINT - 1");
    D.TimeTravel.checkpoint();
    trace(r1.rs(100));
    console.log("A:R1", await trace.async(new Promise(resetR)), r1.v);
    console.log("CHECKPOINT - 2");
    D.TimeTravel.checkpoint();
    trace(r1.rs(200));
    console.log("A:R2", await trace.async(new Promise(resetR)), r1.v);
    console.log("CHECKPOINT - 3");
    D.TimeTravel.checkpoint();
    trace(r1.rs(300));
    console.log("A:R3", await trace.async(new Promise(resetR)), r1.v);
    console.log("UNDO 1");
    D.TimeTravel.undo();
    console.log("CHECKPOINT - 3/2");
    D.TimeTravel.checkpoint();
    trace(r1.rs(301));
    console.log("A:R3/1", await trace.async(new Promise(resetR)), r1.v);
    console.log("UNDO 2");
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    console.log("CHECKPOINT/3");
    D.TimeTravel.checkpoint();
    console.log("CONT 2", trace.cont());
    console.log("CHECKPOINT - 3/3");
    D.TimeTravel.checkpoint();
    trace(r1.rs(302));
    console.log("A:R3/2", await trace.async(new Promise(resetR)), r1.v);
    console.log("UNDO3");
    for (let i = 0; i < 10; ++i) D.TimeTravel.undo();
    for (let i = 0; i < 6; ++i) D.TimeTravel.redo();
    console.log("CHECKPOINT - 3/3");
    D.TimeTravel.checkpoint();
    trace(r1.rs(303));
    console.log("A:R3/3", await trace.async(new Promise(resetR)), r1.v);
    console.log("UNDO4");
    for (let i = 0; i < 10; ++i) D.TimeTravel.undo();
    for (let i = 0; i < 10; ++i) D.TimeTravel.redo();
    D.TimeTravel.undo();
    console.log("CHECKPOINT - 3/4");
    D.TimeTravel.checkpoint();
    trace(r1.rs(304));
    console.log("A:R3/4", await trace.async(new Promise(resetR)), r1.v);
    console.log("UNDO5");
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    D.TimeTravel.undo();
    journal.enabled = false;
    console.log("WRITE");
    const data = JSON.stringify(
      S.write({ j: { ...journal }, data: r1 }, { ignore: "placeholder" })
    );
    journal.enabled = true;
    D.TimeTravel.redo();
    D.TimeTravel.redo();
    console.log("CHECKPOINT - 3/5");
    D.TimeTravel.checkpoint();
    trace(r1.rs(305));
    console.log("A:R3/5", await trace.async(new Promise(resetR)), r1.v);
    journal.enabled = false;
    console.log("UNDO 6");
    const restored = S.read(JSON.parse(data));
    const r2 = (r = restored.data);
    Object.assign(journal, restored.j);
    journal.enabled = true;
    D.TimeTravel.undo();
    D.TimeTravel.redo();
    D.TimeTravel.redo();
    D.TimeTravel.redo();
    console.log("CHECKPOINT - 3/6");
    D.TimeTravel.checkpoint();
    trace(r2.rs(306));
    console.log("A:R3/6", await trace.async(new Promise(resetR)), r2.v);
    console.log("UNDO 7");
    D.TimeTravel.undo();
    console.log("CHECKPOINT - 3/7");
    D.TimeTravel.checkpoint();
    trace(r2.rs(307));
    console.log("A:R3/7", await trace.async(new Promise(resetR)), r2.v);
  } finally {
    D.TimeTravel.reset(false);
    global.console = savedConsole;
    expect(calls).toMatchSnapshot();
  }
});
