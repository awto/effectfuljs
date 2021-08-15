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
  k: [1, "2:6-2:7"],
  i: [2, "4:11-4:12"],
  j: [3, "6:8-6:9"],
  l: [4, "7:6-7:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-13:0", 32, function ($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-12:1", $s$1], [16, "13:0-13:0", $s$1], [16, "13:0-13:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 5, "1:0-12:1", 0, function ($, $l, $p) {
  var $1;

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
      $.goto = 3;
      ($x.call = eff1)();
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($x.call = eff2)();
      $.state = 5;

    case 5:
      $l[2] = $p;
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      if ($l[2] < 10) {
        $.state = 8;
      } else {
        $.goto = 19;
        continue;
      }

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $l[1] = $l[1] + 1;
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      $p = ($x.call = eff3)($l[2]);
      $.state = 11;

    case 11:
      $l[3] = $p;
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      $p = ($x.call = eff4)($l[2]);
      $.state = 13;

    case 13:
      $l[4] = $p;
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $l[4] = $l[4] + 1;
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $1 = $l[3];
      $l[3] = $1 + 1;
      $.goto = 16;
      ($x.call = eff5)($1, $l[1], $l[4]);
      $.state = 16;

    case 16:
      $.goto = 17;
      $brk();
      $.state = 17;

    case 17:
      $.goto = 18;
      $brk();
      $.state = 18;

    case 18:
      $l[2] = $l[2] + 1;
      $.goto = 6;
      continue;

    case 19:
      $.goto = 20;
      $brk();
      $.state = 20;

    case 20:
      $.goto = 21;
      ($x.call = eff6)($l[2], $l[3], $l[1]);
      $.state = 21;

    case 21:
      $.goto = 23;
      $brk();
      continue;

    case 22:
      $.goto = 23;
      return $unhandled($.error);

    case 23:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:12", $s$2], [4, "3:2-3:9", $s$2], [2, "3:2-3:8", $s$2], [4, "4:2-10:3", $s$2], [2, "4:15-4:21", $s$2], [0, "4:11-4:21", $s$2], [4, "4:23-4:29", $s$2], [0, null, $s$2], [4, "5:4-5:8", $s$2], [4, "6:4-7:18", $s$2], [2, "6:12-6:19", $s$2], [4, "7:6-7:17", $s$2], [2, "7:10-7:17", $s$2], [4, "8:4-8:8", $s$2], [4, "9:4-9:20", $s$2], [2, "9:4-9:19", $s$2], [36, "10:3-10:3", $s$2], [4, "4:31-4:34", $s$2], [0, "4:31-4:34", $s$2], [4, "11:2-11:16", $s$2], [2, "11:2-11:15", $s$2], [36, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();