var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-10:0", 32, function ($, $l, $p) {
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-9:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($x.call = eff)(1);
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($x.call = eff)(2);
      $.state = 4;

    case 4:
      if ($p) {
        $.state = 5;
      } else {
        $.goto = 11;
        continue;
      }

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      ($x.call = eff3)();
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      ($x.call = eff4)();
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 14;
      $brk();
      continue;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      b;
      $.goto = 10;
      $brk();
      continue;

    case 13:
      $.goto = 14;
      return $unhandled($.error);

    case 14:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:9", $s$2], [2, "2:2-2:8", $s$2], [4, "3:2-8:3", $s$2], [2, "3:6-3:12", $s$2], [0, null, $s$2], [4, "4:4-4:11", $s$2], [2, "4:4-4:10", $s$2], [4, "5:4-5:11", $s$2], [2, "5:4-5:10", $s$2], [36, "6:3-6:3", $s$2], [36, "9:1-9:1", $s$2], [4, "7:4-7:6", $s$2], [36, "8:3-8:3", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();