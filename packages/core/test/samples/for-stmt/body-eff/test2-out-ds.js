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
  d: [3, "2:12-2:13"],
  len: [4, "2:15-2:18"],
  ref: [5, "2:20-2:23"]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $s$4 = [{}, $s$3, 3],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-13:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[4, "1:0-12:3", $s$1], [0, null, $s$1], [16, "13:0-13:0", $s$1], [16, "13:0-13:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 7, "1:1-12:1", 0, function ($, $l, $p) {
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
      $lset($l, 5,
      /*ref*/
      [1, 2, 3]);
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $l = $.$ = [$l, void 0, void 0];
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $lset($l[0], 1,
      /*i*/
      0);
      $lset($l[0], 4,
      /*len*/
      $l[0][5].lenght);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      if ($l[0][1] < $l[0][4]) {
        $.state = 8;
      } else {
        $.goto = 27;
        continue;
      }

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $l = $.$ = [$l];
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $lset($l[0][0], 2,
      /*j*/
      0);
      $lset($l[0][0], 4,
      /*len*/
      $l[0][0][5].length);
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      if ($l[0][0][2] < $l[0][0][4]) {
        $.state = 14;
      } else {
        $.goto = 20;
        continue;
      }

    case 14:
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $lset($l[0][0], 3,
      /*d*/
      $l[0][0][5][$l[0][0][2]]);
      $.goto = 16;
      $brk();
      $.state = 16;

    case 16:
      $.goto = 17;
      ($context.call = eff)($l[0][0][1]);
      $.state = 17;

    case 17:
      $.goto = 18;
      $brk();
      $.state = 18;

    case 18:
      $l = $.$ = $l.slice();
      $.goto = 19;
      $brk();
      $.state = 19;

    case 19:
      $lset($l[0][0], 2,
      /*j*/
      $l[0][0][2] + 1);
      $.goto = 12;
      continue;

    case 20:
      $l[0][1] = 22;
      $.state = 21;

    case 21:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 22:
      $.goto = 23;
      $brk();
      $.state = 23;

    case 23:
      $.goto = 24;
      ($context.call = eff)(2);
      $.state = 24;

    case 24:
      $.goto = 25;
      $brk();
      $.state = 25;

    case 25:
      $l = $.$ = $l.slice();
      $.goto = 26;
      $brk();
      $.state = 26;

    case 26:
      $lset($l[0], 1,
      /*i*/
      $l[0][1] + 1);
      $.goto = 6;
      continue;

    case 27:
      $l[0][6] = 29;
      $.state = 28;

    case 28:
      $l = $.$ = $l[0];
      $.goto = $l[6];
      continue;

    case 29:
      $.goto = 30;
      $brk();
      $.state = 30;

    case 30:
      $.goto = 31;
      ($context.call = eff)(3);
      $.state = 31;

    case 31:
      $.goto = 33;
      $brk();
      continue;

    case 32:
      $.goto = 33;
      return $unhandled($.error);

    case 33:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 27:
    case 26:
    case 25:
    case 24:
    case 23:
    case 22:
    case 21:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][6] = 32;
      $.goto = 28;
      break;

    case 20:
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
      $l[0][1] = 28;
      $l[0][0][6] = 32;
      $.goto = 21;
      break;

    default:
      $.goto = 32;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 27:
    case 26:
    case 25:
    case 24:
    case 23:
    case 22:
    case 21:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][6] = 33;
      $.goto = 28;
      break;

    case 20:
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
      $l[0][1] = 28;
      $l[0][0][6] = 33;
      $.goto = 21;
      break;

    default:
      $.goto = 33;
      break;
  }
}, 1, [[4, "2:2-2:24", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-10:3", $s$2], [0, null, $s$2], [4, "4:7-4:30", $s$3], [0, "4:7-4:12", $s$3], [4, "4:32-4:39", $s$3], [0, null, $s$2], [4, "5:4-8:5", $s$3], [0, null, $s$2], [4, "5:9-5:32", $s$4], [0, "5:9-5:14", $s$4], [4, "5:34-5:41", $s$4], [0, null, $s$2], [4, "6:6-6:17", $s$4], [4, "7:6-7:13", $s$4], [2, "7:6-7:12", $s$4], [36, "8:5-8:5", $s$2], [4, "5:43-5:46", $s$4], [0, "5:43-5:46", $s$4], [0, null, $s$2], [0, null, $s$2], [4, "9:4-9:11", $s$3], [2, "9:4-9:10", $s$3], [36, "10:3-10:3", $s$2], [4, "4:41-4:44", $s$3], [0, "4:41-4:44", $s$3], [0, null, $s$2], [0, null, $s$2], [4, "11:2-11:9", $s$2], [2, "11:2-11:8", $s$2], [36, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();