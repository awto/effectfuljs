var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-6:0", 32, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1, $m$1($));
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
}, null, null, 0, [[0, "1:0-5:1", $s$1], [16, "6:0-6:0", $s$1], [16, "6:0-6:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-5:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff)("1");
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("log", console, $p, 3);
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("log", console, "2");
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      $p = $mcall("log", console, "3");
      $.state = 7;

    case 7:
      $.result = $p;
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
}, null, null, 1, [[4, "2:2-2:27", $s$2], [2, "2:14-2:22", $s$2], [2, "2:2-2:26", $s$2], [4, "3:2-3:19", $s$2], [2, "3:2-3:18", $s$2], [4, "4:2-4:26", $s$2], [2, "4:9-4:25", $s$2], [0, null, $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]);

$M.moduleExports();