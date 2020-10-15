var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-25:0", 160, function file_js($, $l, $p) {
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 4, "1:0-11:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("log", console, "1");
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff)(1);
      $.state = 3;

    case 3:
      $.goto = 6;
      ($context.call = eff)($l[1]);
      continue;

    case 4:
      $l[3] = $.error;
      $.error = void 0;
      $l[1] = $l[3];
      $.goto = 3;
      $mcall("log", console, "2");
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 2:
    case 1:
      $.goto = 4;
      break;

    default:
      $.goto = 5;
  }
}, null, 1, [[0, null, $s$2], [3, "4:4-4:20", $s$2], [3, "5:4-5:10", $s$2], [2, "10:2-10:8", $s$2], [2, "8:4-8:20", $s$3], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 4, "13:0-24:1", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("log", console, "1");
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff)(1);
      $.state = 3;

    case 3:
      $.goto = 7;
      ($context.call = eff)($l[1]);
      continue;

    case 4:
      $l[3] = $.error;
      $.error = void 0;
      $l[1] = $l[3];
      $.goto = 5;
      $mcall("log", console, "2");
      $.state = 5;

    case 5:
      $l[3] = null;
      $.goto = 3;
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
    case 2:
    case 1:
      $.goto = 4;
      break;

    default:
      $.goto = 6;
  }
}, null, 1, [[0, null, $s$4], [3, "16:4-16:20", $s$4], [3, "17:4-17:10", $s$4], [2, "23:2-23:8", $s$4], [2, "20:4-20:20", $s$5], [0, "21:4-21:16", $s$5], [16, "24:1-24:1", $s$4], [16, "24:1-24:1", $s$4]]);

$M.moduleExports();