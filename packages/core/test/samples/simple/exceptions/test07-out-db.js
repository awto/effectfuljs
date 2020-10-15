var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-10:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
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
}, null, null, 0, [[0, "1:0-9:1", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-9:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $l[1] = 7;
      $.goto = 3;
      ($context.call = eff)(1);
      continue;

    case 2:
      return $raise($l[2]);

    case 3:
      $.goto = 4;
      $mcall("log", console, 1);
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = eff)(2);
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("log", console, 2);
      $.state = 6;

    case 6:
      $.goto = $l[1];
      continue;

    case 7:
      $.goto = 9;
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
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
      $.goto = 8;
  }
}, function ($, $l) {
  switch ($.state) {
    case 1:
      $l[1] = 9;
      $.goto = 3;
      break;

    default:
      $.goto = 9;
      break;
  }
}, 1, [[0, null, $s$2], [2, "3:4-3:10", $s$2], [0, null, $s$2], [2, "5:4-5:18", $s$2], [2, "6:4-6:10", $s$2], [2, "7:4-7:18", $s$2], [0, null, $s$2], [0, null, $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();