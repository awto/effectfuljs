var $M = require("@effectful/debugger"),
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 4, "1:0-32:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-9:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $mcall("log", console, "in");
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("log", console, "inner");
      $.state = 2;

    case 2:
      $.goto = 5;
      $mcall("log", console, "out");
      continue;

    case 3:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 2;
      $mcall("log", console, "exception", $l[1]);
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 1:
      $.goto = 3;
      break;

    default:
      $.goto = 4;
  }
}, null, 1, [[2, "2:2-2:19", $s$2], [3, "4:4-4:24", $s$2], [2, "8:2-8:20", $s$2], [2, "6:4-6:31", $s$3], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 4, "11:0-21:1", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $mcall("log", console, "in");
      $.state = 1;

    case 1:
      $l[2] = 6;
      $.goto = 4;
      $mcall("log", console, "inner");
      continue;

    case 2:
      $l[1] = $.error;
      $.error = void 0;
      $l[2] = 6;
      $.goto = 4;
      $mcall("log", console, "exception", $l[1]);
      continue;

    case 3:
      return $raise($l[3]);

    case 4:
      $.goto = 5;
      $mcall("log", console, "fin");
      $.state = 5;

    case 5:
      $.goto = $l[2];
      continue;

    case 6:
      $.goto = 8;
      $mcall("log", console, "out");
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 2:
      $.goto = 4;
      $l[2] = 3;
      $l[3] = $.error;
      break;

    case 1:
      $.goto = 2;
      break;

    default:
      $.goto = 7;
  }
}, function ($, $l) {
  switch ($.state) {
    case 2:
    case 1:
      $l[2] = 8;
      $.goto = 4;
      break;

    default:
      $.goto = 8;
      break;
  }
}, 1, [[2, "12:2-12:19", $s$4], [3, "14:4-14:24", $s$4], [2, "16:4-16:31", $s$5], [0, null, $s$4], [2, "18:4-18:22", $s$4], [0, null, $s$4], [2, "20:2-20:20", $s$4], [16, "21:1-21:1", $s$4], [16, "21:1-21:1", $s$4]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 3, "23:0-31:1", 128, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $mcall("log", console, "in");
      $.state = 1;

    case 1:
      $l[1] = 5;
      $.goto = 3;
      $mcall("log", console, "inner");
      continue;

    case 2:
      return $raise($l[2]);

    case 3:
      $.goto = 4;
      $mcall("log", console, "fin");
      $.state = 4;

    case 4:
      $.goto = $l[1];
      continue;

    case 5:
      $.goto = 7;
      $mcall("log", console, "out");
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 1:
      $.goto = 3;
      $l[1] = 2;
      $l[2] = $.error;
      break;

    default:
      $.goto = 6;
  }
}, function ($, $l) {
  switch ($.state) {
    case 1:
      $l[1] = 7;
      $.goto = 3;
      break;

    default:
      $.goto = 7;
      break;
  }
}, 1, [[2, "24:2-24:19", $s$6], [2, "26:4-26:24", $s$6], [0, null, $s$6], [2, "28:4-28:22", $s$6], [0, null, $s$6], [2, "30:2-30:20", $s$6], [16, "31:1-31:1", $s$6], [16, "31:1-31:1", $s$6]]);

$M.moduleExports();