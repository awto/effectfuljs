var $M = require("@effectful/debugger"),
    $ret = $M.ret,
    $unhandled = $M.unhandled,
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
      $brk("2:2-2:20");
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("log", console, "in");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("3:2-7:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("4:4-4:25");
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("log", console, "inner");
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("8:2-8:21");
      $.state = 6;

    case 6:
      $.goto = 10;
      $mcall("log", console, "out");
      continue;

    case 7:
      $lset($l, 1,
      /*e*/
      $.error);
      $.error = void 0;
      $.goto = 8;
      $brk("6:4-6:32");
      $.state = 8;

    case 8:
      $.goto = 5;
      $mcall("log", console, "exception", $l[1]);
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 4:
    case 3:
      $.goto = 7;
      break;

    default:
      $.goto = 9;
      break;
  }
}, null, 1, [[4, "2:2-2:20", $s$2], [2, "2:2-2:19", $s$2], [4, "3:2-7:3", $s$2], [5, "4:4-4:25", $s$2], [3, "4:4-4:24", $s$2], [4, "8:2-8:21", $s$2], [2, "8:2-8:20", $s$2], [4, "6:4-6:32", $s$3], [2, "6:4-6:31", $s$3], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 4, "11:0-21:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("12:2-12:20");
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("log", console, "in");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("13:2-19:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("14:4-14:25");
      $.state = 4;

    case 4:
      $l[2] = 10;
      $.goto = 7;
      $mcall("log", console, "inner");
      continue;

    case 5:
      $lset($l, 1,
      /*e*/
      $.error);
      $.error = void 0;
      $.goto = 6;
      $brk("16:4-16:32");
      $.state = 6;

    case 6:
      $l[2] = 10;
      $.goto = 7;
      $mcall("log", console, "exception", $l[1]);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("18:4-18:23");
      $.state = 8;

    case 8:
      $.goto = 9;
      $mcall("log", console, "fin");
      $.state = 9;

    case 9:
      $.error = $l[3];
      $.goto = $l[2];
      continue;

    case 10:
      $.goto = 11;
      $brk("20:2-20:21");
      $.state = 11;

    case 11:
      $.goto = 13;
      $mcall("log", console, "out");
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
    case 4:
    case 3:
      $.goto = 5;
      break;

    case 6:
    case 5:
      $l[3] = $.error;
      $l[2] = 12;
      $.goto = 7;
      break;

    default:
      $.goto = 12;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
    case 3:
      $l[2] = 13;
      $.goto = 7;
      break;

    default:
      $.goto = 13;
      break;
  }
}, 1, [[4, "12:2-12:20", $s$4], [2, "12:2-12:19", $s$4], [4, "13:2-19:3", $s$4], [5, "14:4-14:25", $s$4], [3, "14:4-14:24", $s$4], [5, "16:4-16:32", $s$5], [3, "16:4-16:31", $s$5], [4, "18:4-18:23", $s$4], [2, "18:4-18:22", $s$4], [0, null, $s$4], [4, "20:2-20:21", $s$4], [2, "20:2-20:20", $s$4], [16, "21:1-21:1", $s$4], [16, "21:1-21:1", $s$4]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 3, "23:0-31:1", 0, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("24:2-24:20");
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("log", console, "in");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("25:2-29:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("26:4-26:25");
      $.state = 4;

    case 4:
      $l[1] = 8;
      $.goto = 5;
      $mcall("log", console, "inner");
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("28:4-28:23");
      $.state = 6;

    case 6:
      $.goto = 7;
      $mcall("log", console, "fin");
      $.state = 7;

    case 7:
      $.error = $l[2];
      $.goto = $l[1];
      continue;

    case 8:
      $.goto = 9;
      $brk("30:2-30:21");
      $.state = 9;

    case 9:
      $.goto = 11;
      $mcall("log", console, "out");
      continue;

    case 10:
      $.goto = 11;
      return $unhandled($.error);

    case 11:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 4:
    case 3:
      $l[2] = $.error;
      $l[1] = 10;
      $.goto = 5;
      break;

    default:
      $.goto = 10;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 4:
    case 3:
      $l[1] = 11;
      $.goto = 5;
      break;

    default:
      $.goto = 11;
      break;
  }
}, 1, [[4, "24:2-24:20", $s$6], [2, "24:2-24:19", $s$6], [4, "25:2-29:3", $s$6], [5, "26:4-26:25", $s$6], [3, "26:4-26:24", $s$6], [4, "28:4-28:23", $s$6], [2, "28:4-28:22", $s$6], [0, null, $s$6], [4, "30:2-30:21", $s$6], [2, "30:2-30:20", $s$6], [16, "31:1-31:1", $s$6], [16, "31:1-31:1", $s$6]]);

$M.moduleExports();