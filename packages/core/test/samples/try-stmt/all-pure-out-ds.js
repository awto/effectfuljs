var $M = require("@effectful/debugger"),
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"],
  b: [2, "11:9-11:10"],
  c: [3, "23:9-23:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{
  e: [1, "5:11-5:12"]
}, $s$2, 1],
    $s$4 = [{}, $s$1, 1],
    $s$5 = [{
  e: [1, "15:11-15:12"]
}, $s$4, 1],
    $s$6 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 4, "1:0-32:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a*/
      $m$1($));
      $lset($l, 2,
      /*b*/
      $m$2($));
      $lset($l, 3,
      /*c*/
      $m$3($));
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
}, null, null, 0, [[0, "1:0-9:1", $s$1], [16, "32:0-32:0", $s$1], [16, "32:0-32:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-9:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("log", console, "in");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("log", console, "inner");
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      $mcall("log", console, "out");
      $.state = 8;

    case 8:
      $.goto = 13;
      $brk();
      continue;

    case 9:
      $lset($l, 1,
      /*e*/
      $.error);
      $.error = void 0;
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      $mcall("log", console, "exception", $l[1]);
      $.state = 11;

    case 11:
      $.goto = 6;
      $brk();
      continue;

    case 12:
      $.goto = 13;
      return $unhandled($.error);

    case 13:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 5:
    case 4:
    case 3:
      $.goto = 9;
      break;

    default:
      $.goto = 12;
  }
}, null, 1, [[4, "2:2-2:20", $s$2], [2, "2:2-2:19", $s$2], [4, "3:2-7:3", $s$2], [5, "4:4-4:25", $s$2], [3, "4:4-4:24", $s$2], [37, "5:3-5:3", $s$2], [4, "8:2-8:21", $s$2], [2, "8:2-8:20", $s$2], [36, "9:1-9:1", $s$2], [4, "6:4-6:32", $s$3], [2, "6:4-6:31", $s$3], [36, "7:3-7:3", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 4, "11:0-21:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("log", console, "in");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("log", console, "inner");
      $.state = 5;

    case 5:
      $l[2] = 14;
      $.goto = 10;
      $brk();
      continue;

    case 6:
      $lset($l, 1,
      /*e*/
      $.error);
      $.error = void 0;
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      $mcall("log", console, "exception", $l[1]);
      $.state = 8;

    case 8:
      $l[2] = 14;
      $.goto = 10;
      $brk();
      continue;

    case 9:
      return $raise($l[3]);

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      $mcall("log", console, "fin");
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $.goto = $l[2];
      continue;

    case 14:
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $.goto = 16;
      $mcall("log", console, "out");
      $.state = 16;

    case 16:
      $.goto = 18;
      $brk();
      continue;

    case 17:
      $.goto = 18;
      return $unhandled($.error);

    case 18:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 8:
    case 7:
    case 6:
      $.goto = 10;
      $l[2] = 9;
      $l[3] = $.error;
      break;

    case 5:
    case 4:
    case 3:
      $.goto = 6;
      break;

    default:
      $.goto = 17;
  }
}, function ($, $l) {
  switch ($.state) {
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
      $l[2] = 18;
      $.goto = 10;
      break;

    default:
      $.goto = 18;
      break;
  }
}, 1, [[4, "12:2-12:20", $s$4], [2, "12:2-12:19", $s$4], [4, "13:2-19:3", $s$4], [5, "14:4-14:25", $s$4], [3, "14:4-14:24", $s$4], [37, "15:3-15:3", $s$4], [4, "16:4-16:32", $s$5], [2, "16:4-16:31", $s$5], [36, "17:3-17:3", $s$4], [0, null, $s$4], [4, "18:4-18:23", $s$4], [2, "18:4-18:22", $s$4], [36, "19:3-19:3", $s$4], [0, null, $s$4], [4, "20:2-20:21", $s$4], [2, "20:2-20:20", $s$4], [36, "21:1-21:1", $s$4], [16, "21:1-21:1", $s$4], [16, "21:1-21:1", $s$4]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 3, "23:0-31:1", 0, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("log", console, "in");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("log", console, "inner");
      $.state = 5;

    case 5:
      $l[1] = 11;
      $.goto = 7;
      $brk();
      continue;

    case 6:
      return $raise($l[2]);

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      $mcall("log", console, "fin");
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = $l[1];
      continue;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      $mcall("log", console, "out");
      $.state = 13;

    case 13:
      $.goto = 15;
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
    case 5:
    case 4:
    case 3:
      $.goto = 7;
      $l[1] = 6;
      $l[2] = $.error;
      break;

    default:
      $.goto = 14;
  }
}, function ($, $l) {
  switch ($.state) {
    case 5:
    case 4:
    case 3:
      $l[1] = 15;
      $.goto = 7;
      break;

    default:
      $.goto = 15;
      break;
  }
}, 1, [[4, "24:2-24:20", $s$6], [2, "24:2-24:19", $s$6], [4, "25:2-29:3", $s$6], [4, "26:4-26:25", $s$6], [2, "26:4-26:24", $s$6], [36, "27:3-27:3", $s$6], [0, null, $s$6], [4, "28:4-28:23", $s$6], [2, "28:4-28:22", $s$6], [36, "29:3-29:3", $s$6], [0, null, $s$6], [4, "30:2-30:21", $s$6], [2, "30:2-30:20", $s$6], [36, "31:1-31:1", $s$6], [16, "31:1-31:1", $s$6], [16, "31:1-31:1", $s$6]]);

$M.moduleExports();