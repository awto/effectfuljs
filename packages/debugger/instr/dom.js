"no-ctrl";

var $M = require("../apiMin"),
  $iterator = $M.iterator,
  $iterFin = $M.iterFin,
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $raise = $M.raise,
  $mcall = $M.mcall,
  $m = $M.module("src/instr/dom.ts", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    callbacks: [1, "1:13-3:1"],
    dispatchEventImpl: [2, "5:16-5:33"]
  }, null, 0],
  $s$2 = [{
    ev: [1, "6:2-6:11"],
    map: [2, "7:2-7:51"]
  }, $s$1, 1],
  $s$3 = [{
    handler: [3, "9:13-9:20"]
  }, $s$2, 1],
  $s$4 = [{
    error: [4, "16:13-16:18"]
  }, $s$3, 1],
  $s$5 = [{
    _e: [5, "20:15-20:17"]
  }, $s$4, 1],
  $m$0 = $M.fun("m$0", "dom.ts", null, null, [], 0, 3, "1:0-27:0", 160, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2 /*dispatchEventImpl*/] = $m$1($);
        module.exports.__esModule = true;
        module.exports.callbacks = void 0;
        module.exports.dispatchEventImpl = $l[2 /*dispatchEventImpl*/];
        $l[1 /*callbacks*/] = module.exports.callbacks = {};
        $.goto = 2;
        continue;
      case 1:
        $.goto = 2;
        return $unhandled($.error);
      case 2:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 0, [[0, "5:7-26:1", $s$1], [16, "27:0-27:0", $s$1], [16, "27:0-27:0", $s$1]]),
  $m$1 = $M.fun("m$1", "dispatchEventImpl", null, $m$0, ["ev", "map"], 1, 8, "5:7-26:1", 128, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $iterator($l[2 /*map*/]);
        $.state = 1;
      case 1:
        $l[7] = $p;
        $.state = 2;
      case 2:
        $x.call = $l[7].next;
        $.goto = 3;
        $p = $l[7].next();
        $.state = 3;
      case 3:
        if ($p.done) {
          $.goto = 14;
          continue;
        } else {
          $l[3 /*handler*/] = $p.value;
          $.state = 4;
        }
      case 4:
        if (typeof $l[3 /*handler*/] === "function") {
          $.goto = 5;
          ($x.call = $l[3 /*handler*/])($l[1 /*ev*/]);
          $.state = 5;
        } else {
          $.goto = 5;
          $mcall("handleEvent", $l[3 /*handler*/], $l[1 /*ev*/]);
          $.state = 5;
        }
      case 5:
        $.state = 6;
      case 6:
        $.goto = 2;
        continue;
      case 7:
        $l[4 /*error*/] = $.error;
        $.error = void 0;
        $.state = 8;
      case 8:
        $1 = typeof window !== "undefined";
        if ($1) {
          $1 = window.dispatchEvent;
          $.state = 9;
        } else {
          $.state = 9;
        }
      case 9:
        if ($1) {
          $.goto = 12;
          $p = new ($x.call = ErrorEvent)("error", {
            error: $l[4 /*error*/]
          });
          continue;
        } else {
          $.state = 10;
        }
      case 10:
        $.state = 11;
      case 11:
        $.goto = 6;
        continue;
      case 12:
        $.goto = 10;
        $mcall("dispatchEvent", window, $p);
        continue;
      case 13:
        $l[5 /*_e*/] = $.error;
        $.error = void 0;
        $.goto = 11;
        return $raise($l[4 /*error*/]);
      case 14:
        $.result = $l[1 /*ev*/].defaultPrevented;
        $.goto = 19;
        continue;
      case 15:
        return $raise($.error);
      case 16:
        $.goto = 17;
        $iterFin($l[7]);
        $.state = 17;
      case 17:
        $.goto = $l[6];
        continue;
      case 18:
        $.goto = 19;
        return $unhandled($.error);
      case 19:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, function ($, $l) {
    switch ($.state) {
      case 13:
      case 11:
      case 7:
      case 6:
      case 3:
      case 2:
        $.goto = 16;
        $l[6] = 15;
        break;
      case 12:
      case 10:
      case 9:
      case 8:
        $.goto = 13;
        break;
      case 5:
      case 4:
        $.goto = 7;
        break;
      default:
        $.goto = 18;
    }
  }, function ($, $l) {
    switch ($.state) {
      case 13:
      case 12:
      case 11:
      case 10:
      case 9:
      case 8:
      case 7:
      case 6:
      case 5:
      case 4:
      case 3:
      case 2:
        $l[6] = 19;
        $.goto = 16;
        break;
      default:
        $.goto = 19;
        break;
    }
  }, 1, [[2, "9:24-9:27", $s$3], [0, null, $s$2], [2, "9:24-9:27", $s$3], [0, null, $s$2], [3, "12:8-12:19", $s$3], [1, null, $s$2], [0, null, $s$2], [0, "16:13-16:18", $s$4], [1, "18:12-18:41", $s$2], [3, "19:31-19:65", $s$4], [1, null, $s$2], [0, null, $s$2], [3, "19:10-19:66", $s$4], [0, "21:8-21:20", $s$5], [0, "25:9-25:28", $s$2], [0, null, $s$2], [2, "9:24-9:27", $s$3], [0, null, $s$2], [16, "26:1-26:1", $s$2], [16, "26:1-26:1", $s$2]]);
$M.moduleExports();