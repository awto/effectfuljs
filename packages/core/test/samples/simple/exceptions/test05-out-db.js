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
    $s$3 = [{
  e: [1, "4:11-4:12"]
}, $s$2, 1],
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 4, "1:0-9:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $l[2] = 6;
      $.goto = 4;
      ($context.call = eff)(1);
      continue;

    case 2:
      $l[1] = $.error;
      $.error = void 0;
      $l[2] = 6;
      $.goto = 4;
      $mcall("log", console, $l[1]);
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
}, 1, [[0, null, $s$2], [3, "3:4-3:10", $s$2], [2, "5:4-5:18", $s$3], [0, null, $s$2], [2, "7:4-7:22", $s$2], [0, null, $s$2], [0, null, $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();