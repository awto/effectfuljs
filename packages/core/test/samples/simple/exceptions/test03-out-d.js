var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"],
  b: [2, "13:9-13:10"]
}, null, 0],
    $s$2 = [{
  e: [1, "2:6-2:7"],
  error: [2, "2:9-2:14"]
}, $s$1, 1],
    $s$3 = [{
  error: [3, "6:11-6:16"]
}, $s$2, 1],
    $s$4 = [{
  e: [1, "14:6-14:7"],
  error: [2, "14:9-14:14"]
}, $s$1, 1],
    $s$5 = [{
  error: [3, "18:11-18:16"]
}, $s$4, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-25:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
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
}, null, null, 0, [[0, "1:0-11:1", $s$1], [16, "25:0-25:0", $s$1], [16, "25:0-25:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 4, "1:0-11:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("log", console, "1");
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = eff)(1);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff)($l[1]);
      $.state = 9;

    case 9:
      $.goto = 15;
      $brk();
      continue;

    case 10:
      $l[3] = $.error;
      $.error = void 0;
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $l[1] = $l[3];
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      $mcall("log", console, "2");
      $.state = 13;

    case 13:
      $.goto = 7;
      $brk();
      continue;

    case 14:
      $.goto = 15;
      return $unhandled($.error);

    case 15:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
      $.goto = 10;
      break;

    default:
      $.goto = 14;
  }
}, null, 1, [[4, "2:2-2:15", $s$2], [4, "3:2-9:3", $s$2], [5, "4:4-4:21", $s$2], [3, "4:4-4:20", $s$2], [5, "5:4-5:11", $s$2], [3, "5:4-5:10", $s$2], [37, "6:3-6:3", $s$2], [4, "10:2-10:9", $s$2], [2, "10:2-10:8", $s$2], [36, "11:1-11:1", $s$2], [4, "7:4-7:14", $s$3], [4, "8:4-8:21", $s$3], [2, "8:4-8:20", $s$3], [36, "9:3-9:3", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 4, "13:0-24:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("log", console, "1");
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = eff)(1);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff)($l[1]);
      $.state = 9;

    case 9:
      $.goto = 16;
      $brk();
      continue;

    case 10:
      $l[3] = $.error;
      $.error = void 0;
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $l[1] = $l[3];
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      $mcall("log", console, "2");
      $.state = 13;

    case 13:
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $l[3] = null;
      $.goto = 7;
      $brk();
      continue;

    case 15:
      $.goto = 16;
      return $unhandled($.error);

    case 16:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
      $.goto = 10;
      break;

    default:
      $.goto = 15;
  }
}, null, 1, [[4, "14:2-14:15", $s$4], [4, "15:2-22:3", $s$4], [5, "16:4-16:21", $s$4], [3, "16:4-16:20", $s$4], [5, "17:4-17:11", $s$4], [3, "17:4-17:10", $s$4], [37, "18:3-18:3", $s$4], [4, "23:2-23:9", $s$4], [2, "23:2-23:8", $s$4], [36, "24:1-24:1", $s$4], [4, "19:4-19:14", $s$5], [4, "20:4-20:21", $s$5], [2, "20:4-20:20", $s$5], [4, "21:4-21:17", $s$5], [36, "22:3-22:3", $s$4], [16, "24:1-24:1", $s$4], [16, "24:1-24:1", $s$4]]);

$M.moduleExports();