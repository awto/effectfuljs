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
    $s$2 = [{
  i: [1, "2:6-2:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-15:0", 32, function ($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-14:1", $s$1], [16, "15:0-15:0", $s$1], [16, "15:0-15:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-14:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $l[1] = 0;
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $l[1] = $l[1] + 1;
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($x.call = eff1)($l[1]);
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
      ($x.call = eff)($l[1]);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $l[1] = $l[1] + 1;
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      ($x.call = eff2)($l[1]);
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 14;
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
}, null, null, 1, [[4, "2:2-2:12", $s$2], [4, "4:4-4:8", $s$2], [4, "5:4-5:12", $s$2], [2, "5:4-5:11", $s$2], [36, "6:3-6:3", $s$2], [4, "7:2-7:9", $s$2], [2, "7:2-7:8", $s$2], [4, "9:4-9:8", $s$2], [36, "10:3-10:3", $s$2], [4, "12:4-12:12", $s$2], [2, "12:4-12:11", $s$2], [36, "13:3-13:3", $s$2], [36, "14:1-14:1", $s$2], [16, "14:1-14:1", $s$2], [16, "14:1-14:1", $s$2]]);

$M.moduleExports();