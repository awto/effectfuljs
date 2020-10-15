/**
 * a kit for in-process protocol testing, unfortunately no ways to use
 * async functions and promises, as the whole system stops on some breakpoint
 */
const config = require("../config").default;
const path = require("path");
const { context, native, journal } = require("../state");

let socket;

let outputBuf = [];
let stopped = false;
let eventsCbs = {};
let responsesCbs = {};
let reverseRequestsCbs = {};
let terminated = false;
const nativeSetImmediate = setImmediate;
const nativeClearImmediate = clearImmediate;
let loaded = false;

const nativeConsole = native.console;
const trace = config.debuggerDebug
  ? (...args) => nativeConsole.log.apply(nativeConsole, args)
  : () => {};

class WS {
  constructor(url) {
    this.url = url;
    if (!socket) socket = this;
    return socket;
  }
  send(msg) {
    nativeSetImmediate(recv, msg);
  }
  close() {}
}

config.WebSocket = WS;
config.expUseWorker = false;

const { resetLoad } = require("../vscode/handlers");

function recv(msg) {
  const data = JSON.parse(msg);
  let cbs;
  switch (data.type) {
    case "request":
      if ((cbs = reverseRequestsCbs[data.event]))
        while (cbs.length) native.Array.pop.call(cbs, data.body);
      break;
    case "response":
      if ((cbs = responsesCbs[data.request_seq])) {
        cbs(data.body);
        delete responsesCbs[data.request_seq];
      }
      break;
    case "event":
      let eventName = data.event;
      if ((cbs = eventsCbs[eventName])) {
        while (cbs.length) {
          const f = native.Array.pop.call(cbs, data.body);
          setImmediate(function() {
            f(data.body);
          });
        }
      }
      switch (data.event) {
        case "output":
          native.Array.push(outputBuf, data.body);
          break;
        case "terminated":
          terminated = true;
          break;
        case "stopped":
          stopped = data.body.reason;
          break;
      }
  }
}

require("../vscode");

function teardown() {
  outputBuf.length = 0;
  loaded = false;
  stopped = false;
  eventsCbs = {};
  responsesCbs = {};
  reverseRequestsCbs = {};
  terminated = false;
  resetLoad();
}

function awaitEvent(type, cb) {
  (eventsCbs[type] || (eventsCbs[type] = [])).push(cb);
}

function awaitRequest(type, cb) {
  (reverseRequestsCbs[type] || (eventsCbs[type] = [])).push(cb);
}

let curSeq = 1;

function send(data) {
  socket.onmessage({ data: JSON.stringify(data) });
}

function request(req, cb) {
  const seq = (req.seq = ++curSeq);
  trace("request:", req);
  nativeSetImmediate(send, req);
  responsesCbs[seq] = cb;
}

function command(name, args, cb) {
  return request({ command: name, arguments: args }, cb);
}

function output(category) {
  const newBuf = [];
  const res = [];
  for (const i of outputBuf) {
    if (i.category === category) res.push(i.output);
    else newBuf.push(i);
  }
  outputBuf = newBuf;
  return res.join("\n");
}

function setBreakpoint(loc, cb) {
  command(
    "childSetBreakpoints",
    {
      breakpoints: [{ line: loc.line, column: loc.column }],
      source: loc.path ? { path: loc.path } : { sourceReference: loc.id }
    },
    function(res) {
      let bp = res.breakpoints[0];
      const verified = typeof loc.verified === "boolean" ? loc.verified : true;
      if (verified) checkVerified(bp);
      else checkLine(bp);
    }
  );
  function checkLine(bp) {
    expect(bp.line).toBe(loc.expLine || loc.line);
    cb(bp);
  }
  function checkVerified(bp) {
    if (!bp.verified) {
      awaitEvent("breakpoint", function(event) {
        if (bp.id === event.breakpoint.id) checkVerified(event.body.breakpoint);
      });
    } else checkLine(bp);
  }
}

function launch(_mod, opts, cb) {
  socket.onopen();
  return stopAfterCommand(
    "childLaunch",
    {
      threadId: 0,
      dirSep: "/",
      stopOnEntry: opts.stopOnEntry,
      breakpoints: opts.breakpoints,
      exceptions: opts.exceptions
    },
    cb
  );
}

function varValue(variablesReference, level, cb) {
  command("variables", { variablesReference }, function(ref) {
    const res = {};
    let varNums = 0;
    for (const i of ref.variables) {
      if (i.variablesReference && level > 0) {
        varNums++;
        varValue(i.variablesReference, level - 1, function(sub) {
          varNums--;
          res[i.name] = sub;
          if (varNums === 0) cb(res);
        });
      } else if (i.value) res[i.name] = i.value;
    }
    if (varNums === 0) cb(res);
  });
}

function stackSnapshot(cb) {
  _stackSnapshot();
  function _stackSnapshot() {
    if (terminated) cb(false);
    else
      command("stackTrace", { threadId: 0 }, function({ stackFrames }) {
        const res = [];
        let frameNum = 0;
        (function traverseFrames() {
          if (frameNum >= stackFrames.length) {
            cb({ stack: res, reason: stopped });
            return;
          }
          const frame = stackFrames[frameNum++];
          const scopes = [];
          command(
            "scopes",
            {
              threadId: 0,
              frameId: frame.id
            },
            function({ scopes: scopeResp }) {
              let scopeNum = 0;
              const scopeArr = scopeResp.slice(0, scopeResp.length - 1);
              (function traverseScopes() {
                if (scopeNum >= scopeArr.length) {
                  res.push({
                    name: frame.name,
                    file: frame.source.path
                      ? path.basename(frame.source.path)
                      : frame.source.sourceReference,
                    line: frame.line,
                    column: frame.column,
                    scopes
                  });
                  traverseFrames();
                  return;
                }
                const j = scopeArr[scopeNum++];
                const scope = varValue(j.variablesReference, 2, function(
                  scope
                ) {
                  scopes.push(scope);
                  scope["[name]"] = j.name;
                  traverseScopes();
                });
              })();
            }
          );
        })();
      });
  }
}

const immediateHandlers = new Set();

global.setImmediate = function(fun, ...params) {
  const h = nativeSetImmediate(function() {
    immediateHandlers.delete(h);
    return fun(...params);
  });
  immediateHandlers.add(h);
  return h;
};

global.clearImmediate = function(h) {
  immediateHandlers.delete(h);
  return nativeClearImmediate(h);
};

const savedOnThread = context.onThread;

context.onThread = function() {
  if (
    loaded &&
    context.pausedTop === null &&
    context.queue.length === 0 &&
    immediateHandlers.size === 0 &&
    context.suspended.size === 0
  ) {
    if (socket) {
      terminated = true;
      socket.send(
        JSON.stringify({ type: "event", event: "stopped", body: {} })
      );
    }
  }
  savedOnThread();
};

const savedNeedsBreak = context.needsBreak;

context.needsBreak = function() {
  loaded = true;
  return savedNeedsBreak.apply(context, arguments);
};

function stopAfterCommand(request, body, cb) {
  stopped = false;
  let reqReceived;
  let eventReceived;
  let called = false;
  command(request, body, function req(value) {
    reqReceived = value || true;
    call();
  });
  awaitEvent("stopped", function req(value) {
    eventReceived = value || true;
    call();
  });
  function call() {
    if (!called && reqReceived && eventReceived) {
      called = true;
      cb(reqReceived, eventReceived);
    }
  }
}

function cont(request, onStop, onDone) {
  const res = [];
  _cont();
  return res;
  function _req() {
    if (terminated) onDone();
    else stopAfterCommand(request, {}, _cont);
  }
  function _cont() {
    try {
      if (terminated) return onDone();
      if (onStop.length < 2) return onStop(_req);
      return stackSnapshot(snapshot =>
        snapshot ? onStop(_req, snapshot) : onDone()
      );
    } catch (e) {
      return onDone(e);
    }
  }
}

function shutdown(res, cb) {
  terminated = true;
  let cbs = eventsCbs["stopped"];
  if (cbs)
    while (cbs.length) native.Array.pop.call(cbs, { reason: "terminated" });
  expect({
    stdout: output("stdout"),
    stderr: output("stderr"),
    trace: res
  }).toMatchSnapshot();
  cb();
}

function call(cb) {
  return cb();
}

function snapshotOnStop(res, onStop) {
  return function(cb, snapshot) {
    onStop(function() {
      res.push(snapshot);
      cb();
    }, snapshot.stack[0]);
  };
}

function snapshotOnDone(res, onDone) {
  return function() {
    shutdown(res, onDone);
  };
}

function traverse(mod, opts, request, cb) {
  const res = [];
  launch(mod, opts, () =>
    cont(
      request,
      snapshotOnStop(res, opts.onStop || call),
      snapshotOnDone(res, cb)
    )
  );
}

function traverseBack(mod, opts, requestBack, requestFwd, cb) {
  const res = [];
  const onStop = snapshotOnStop(res, opts.onStop || call);
  launch(mod, opts, () => cont("continue", call, _back));
  function _back() {
    terminated = false;
    stopAfterCommand("pause", {}, () => {
      cont(
        requestBack,
        function(cb, snapshot) {
          if (!journal.now) {
            terminated = true;
            cb();
          } else onStop(cb, snapshot);
        },
        _fwd
      );
    });
  }
  function _fwd() {
    terminated = false;
    const onDone = snapshotOnDone(res, cb);
    cont(
      requestFwd,
      function(cb, snapshot) {
        onStop(cb, snapshot);
        if (!journal.future) terminated = true;
      },
      onDone
    );
  }
}

exports.launch = launch;
exports.teardown = teardown;
exports.output = output;
exports.request = request;
exports.awaitEvent = awaitEvent;
exports.awaitRequest = awaitRequest;
exports.command = command;
exports.setBreakpoint = setBreakpoint;
exports.traverse = traverse;
exports.traverseBack = traverseBack;
exports.varValue = varValue;
