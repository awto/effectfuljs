var $M = require("@effectful/debugger"),
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"],
  b: [2, "7:9-7:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-16:0", 160, function ($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-5:1", $s$1], [16, "16:0-16:0", $s$1], [16, "16:0-16:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-5:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if (true) {
        2;
        $.state = 1;
      } else {
        3;
        $.state = 1;
      }

    case 1:
      $.result = 1;
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, null, $s$2], [0, "4:9-4:10", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 1, "7:0-15:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if (true) {
        $.goto = 3;
        $mcall("log", console, "a");
        continue;
      } else {
        $.goto = 1;
        $mcall("log", console, "c");
        $.state = 1;
      }

    case 1:
      $.goto = 2;
      $mcall("log", console, "d");
      $.state = 2;

    case 2:
      $.goto = 5;
      continue;

    case 3:
      $.goto = 2;
      $mcall("log", console, "b");
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "9:4-9:20", $s$3], [2, "13:4-13:20", $s$3], [0, null, $s$3], [2, "10:4-10:20", $s$3], [16, "15:1-15:1", $s$3], [16, "15:1-15:1", $s$3]]);

$M.moduleExports();