var $M = require("@effectful/debugger"),
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $get = $M.get,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{
  i: [1, "2:6-2:7"],
  j: [2, "2:9-2:10"],
  len: [3, "2:12-2:15"],
  ref1: [4, "2:17-2:21"]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-9:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a*/
      $m$1($));
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
}, null, null, 0, [[0, "1:0-8:1", $s$1], [16, "9:0-9:0", $s$1], [16, "9:0-9:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 6, "1:0-8:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $lset($l, 4,
      /*ref1*/
      [1, 2, 3]);
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $l = $.$ = [$l];
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $lset($l[0], 2,
      /*j*/
      0);
      $.goto = 6;
      $p = $get($l[0][4], "length");
      $.state = 6;

    case 6:
      $lset($l[0], 3,
      /*len*/
      $p);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      if ($l[0][2] < $l[0][3]) {
        $.state = 9;
      } else {
        $.goto = 16;
        continue;
      }

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      $p = $get($l[0][4], $l[0][2]);
      $.state = 11;

    case 11:
      $lset($l[0], 1,
      /*i*/
      $p);
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      $mcall("log", console, $l[0][1]);
      $.state = 13;

    case 13:
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $l = $.$ = [$l[0]];
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $lset($l[0], 2,
      /*j*/
      $l[0][2] + 1);
      $.goto = 7;
      continue;

    case 16:
      $l[0][5] = 19;
      $.goto = 18;
      continue;

    case 17:
      return $raise($.error);

    case 18:
      $l = $.$ = $l[0];
      $.goto = $l[5];
      continue;

    case 19:
      $.goto = 21;
      $brk();
      continue;

    case 20:
      $.goto = 21;
      return $unhandled($.error);

    case 21:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $.goto = 18;
      $l[0][5] = 17;
      break;

    default:
      $.goto = 20;
  }
}, function ($, $l) {
  switch ($.state) {
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][5] = 21;
      $.goto = 18;
      break;

    default:
      $.goto = 21;
      break;
  }
}, 1, [[4, "2:2-2:22", $s$2], [4, "3:2-3:19", $s$2], [4, "4:2-7:3", $s$2], [0, null, $s$2], [4, "4:7-4:31", $s$3], [2, "4:20-4:31", $s$3], [0, "4:14-4:31", $s$3], [4, "4:33-4:40", $s$3], [0, null, $s$3], [4, "5:4-5:16", $s$3], [2, "5:8-5:15", $s$3], [4, "6:4-6:19", $s$3], [2, "6:4-6:18", $s$3], [36, "7:3-7:3", $s$3], [4, "4:42-4:45", $s$3], [0, "4:42-4:45", $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [36, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);

$M.moduleExports();