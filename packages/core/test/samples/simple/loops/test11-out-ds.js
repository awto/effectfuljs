var $M = require("@effectful/debugger"),
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
      $lset($l[0], 3,
      /*len*/
      $l[0][4].length);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      if ($l[0][2] < $l[0][3]) {
        $.state = 8;
      } else {
        $.goto = 14;
        continue;
      }

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $lset($l[0], 1,
      /*i*/
      $l[0][4][$l[0][2]]);
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      $mcall("log", console, $l[0][1]);
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $l = $.$ = $l.slice();
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $lset($l[0], 2,
      /*j*/
      $l[0][2] + 1);
      $.goto = 6;
      continue;

    case 14:
      $l[0][5] = 16;
      $.state = 15;

    case 15:
      $l = $.$ = $l[0];
      $.goto = $l[5];
      continue;

    case 16:
      $.goto = 18;
      $brk();
      continue;

    case 17:
      $.goto = 18;
      return $unhandled($.error);

    case 18:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
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
      $l[0][5] = 17;
      $.goto = 15;
      break;

    default:
      $.goto = 17;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
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
      $l[0][5] = 18;
      $.goto = 15;
      break;

    default:
      $.goto = 18;
      break;
  }
}, 1, [[4, "2:2-2:22", $s$2], [4, "3:2-3:19", $s$2], [4, "4:2-7:3", $s$2], [0, null, $s$2], [4, "4:7-4:31", $s$3], [0, "4:7-4:12", $s$3], [4, "4:33-4:40", $s$3], [0, null, $s$2], [4, "5:4-5:16", $s$3], [4, "6:4-6:19", $s$3], [2, "6:4-6:18", $s$3], [36, "7:3-7:3", $s$2], [4, "4:42-4:45", $s$3], [0, "4:42-4:45", $s$3], [0, null, $s$2], [0, null, $s$2], [36, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);

$M.moduleExports();