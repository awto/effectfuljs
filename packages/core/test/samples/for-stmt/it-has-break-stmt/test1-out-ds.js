var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{}, null, 0],
    $s$2 = [{
  i: [1, "2:6-2:7"],
  j: [2, "2:9-2:10"],
  len: [3, "2:12-2:15"],
  ref: [4, "2:17-2:20"]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-11:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $m$1($);
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
}, null, null, 0, [[4, "1:0-10:3", $s$1], [0, null, $s$1], [16, "11:0-11:0", $s$1], [16, "11:0-11:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 6, "1:1-10:1", 0, function ($, $l, $p) {
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
      /*ref*/
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
        $.goto = 16;
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
      $p = ($context.call = eff)($l[0][1]);
      $.state = 11;

    case 11:
      if ($p) {
        $.state = 12;
      } else {
        $.goto = 13;
        continue;
      }

    case 12:
      $.goto = 16;
      $brk();
      continue;

    case 13:
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $l = $.$ = $l.slice();
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $lset($l[0], 2,
      /*j*/
      $l[0][2] + 1);
      $.goto = 6;
      continue;

    case 16:
      $l[0][5] = 18;
      $.state = 17;

    case 17:
      $l = $.$ = $l[0];
      $.goto = $l[5];
      continue;

    case 18:
      $.goto = 19;
      $brk();
      $.state = 19;

    case 19:
      $.goto = 20;
      ($context.call = eff)(2);
      $.state = 20;

    case 20:
      $.goto = 21;
      $brk();
      $.state = 21;

    case 21:
      $.goto = 22;
      ($context.call = eff)(3);
      $.state = 22;

    case 22:
      $.goto = 24;
      $brk();
      continue;

    case 23:
      $.goto = 24;
      return $unhandled($.error);

    case 24:
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
      $l[0][5] = 23;
      $.goto = 17;
      break;

    default:
      $.goto = 23;
      break;
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
      $l[0][5] = 24;
      $.goto = 17;
      break;

    default:
      $.goto = 24;
      break;
  }
}, 1, [[4, "2:2-2:21", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-7:3", $s$2], [0, null, $s$2], [4, "4:7-4:30", $s$3], [0, "4:7-4:12", $s$3], [4, "4:32-4:39", $s$3], [0, null, $s$2], [4, "5:4-5:15", $s$3], [4, "6:4-6:22", $s$3], [2, "6:8-6:14", $s$3], [0, null, $s$2], [4, "6:16-6:22", $s$3], [36, "7:3-7:3", $s$2], [4, "4:41-4:44", $s$3], [0, "4:41-4:44", $s$3], [0, null, $s$2], [0, null, $s$2], [4, "8:2-8:9", $s$2], [2, "8:2-8:8", $s$2], [4, "9:2-9:9", $s$2], [2, "9:2-9:8", $s$2], [36, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2]]);

$M.moduleExports();