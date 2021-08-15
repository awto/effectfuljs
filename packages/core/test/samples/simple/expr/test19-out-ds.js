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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-5:0", 32, function ($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-4:1", $s$1], [16, "5:0-5:0", $s$1], [16, "5:0-5:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-4:1", 0, function ($, $l, $p) {
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
      $l[1] = $p;
      $.goto = 3;
      $p = ($x.call = eff)(2);
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("log", console, $l[1], $p, 3);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = $mcall("log", console, "4");
      $.state = 6;

    case 6:
      $.result = $p;
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
}, null, null, 1, [[4, "2:2-2:35", $s$2], [2, "2:14-2:22", $s$2], [2, "2:24-2:30", $s$2], [2, "2:2-2:34", $s$2], [4, "3:2-3:26", $s$2], [2, "3:9-3:25", $s$2], [0, null, $s$2], [16, "4:1-4:1", $s$2], [16, "4:1-4:1", $s$2]]);

$M.moduleExports();