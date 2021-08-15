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
  i: [1, "2:6-2:7"],
  j: [2, "3:4-3:5"],
  b: [3, "4:11-4:12"]
}, $s$1, 1],
    $s$3 = [{
  i: [1, "4:13-4:14"]
}, $s$2, 2],
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 4, "1:0-14:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[3] = $m$2($);
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $l[1] = 0;
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $l[2] = 0;
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($x.call = eff3)($l[1], $l[2]);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $l[1] = $l[1] + 1;
      $l[2] = $l[2] - 1;
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      ($x.call = $l[3])($l[1]);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $l[1] = $l[1] - 1;
      $l[2] = $l[2] + 1;
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      ($x.call = eff4)($l[1], $l[2]);
      $.state = 10;

    case 10:
      $.goto = 12;
      $brk();
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-3:10", $s$2], [4, "3:4-3:9", $s$2], [4, "9:2-9:13", $s$2], [2, "9:2-9:12", $s$2], [4, "10:2-10:11", $s$2], [4, "11:2-11:7", $s$2], [2, "11:2-11:6", $s$2], [4, "12:2-12:11", $s$2], [4, "13:2-13:13", $s$2], [2, "13:2-13:12", $s$2], [36, "14:1-14:1", $s$2], [16, "14:1-14:1", $s$2], [16, "14:1-14:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$1, ["i"], 0, 2, "4:2-8:3", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($x.call = eff1)($l[1], $l[0][2]);
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $l[1] = $l[1] + 1;
      $l[0][2] = $l[0][2] + 1;
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      ($x.call = eff2)($l[1], $l[0][2]);
      $.state = 5;

    case 5:
      $.goto = 7;
      $brk();
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "5:4-5:15", $s$3], [2, "5:4-5:14", $s$3], [4, "6:4-6:13", $s$3], [4, "7:4-7:15", $s$3], [2, "7:4-7:14", $s$3], [36, "8:3-8:3", $s$3], [16, "8:3-8:3", $s$3], [16, "8:3-8:3", $s$3]]);

$M.moduleExports();