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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-11:0", 32, function ($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-10:1", $s$1], [16, "11:0-11:0", $s$1], [16, "11:0-11:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-10:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($x.call = eff1)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($x.call = eff2)();
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

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
      $p = ($x.call = eff)(4);
      $.state = 9;

    case 9:
      if ($p) {
        $.state = 10;
      } else {
        $.goto = 14;
        continue;
      }

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      ($x.call = eff)(5);
      $.state = 13;

    case 13:
      $.goto = 16;
      $brk();
      continue;

    case 14:
      $.goto = 16;
      $brk();
      continue;

    case 15:
      $.goto = 16;
      return $unhandled($.error);

    case 16:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:9", $s$2], [2, "2:2-2:8", $s$2], [4, "3:2-3:9", $s$2], [2, "3:2-3:8", $s$2], [4, "4:2-8:3", $s$2], [4, "5:4-5:11", $s$2], [2, "5:4-5:10", $s$2], [4, "6:4-7:16", $s$2], [2, "6:8-6:14", $s$2], [0, null, $s$2], [4, "6:16-6:27", $s$2], [4, "9:2-9:9", $s$2], [2, "9:2-9:8", $s$2], [36, "10:1-10:1", $s$2], [4, "7:9-7:16", $s$2], [16, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2]]);

$M.moduleExports();