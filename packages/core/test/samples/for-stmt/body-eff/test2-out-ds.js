var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
    $brk = $M.brk,
    $lset = $M.lset,
    $get = $M.get,
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
      $.goto = 6;
      $p = $get($l[0][5], "lenght");
      $.state = 6;

    case 6:
      $lset($l[0], 4,
      /*len*/
      $p);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      if ($l[0][1] < $l[0][4]) {
        $.state = 9;
      } else {
        $.goto = 31;
        continue;
      }

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $l = $.$ = [$l];
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $lset($l[0][0], 2,
      /*j*/
      0);
      $.goto = 13;
      $p = $get($l[0][0][5], "length");
      $.state = 13;

    case 13:
      $lset($l[0][0], 4,
      /*len*/
      $p);
      $.state = 14;

    case 14:
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      if ($l[0][0][2] < $l[0][0][4]) {
        $.state = 16;
      } else {
        $.goto = 23;
        continue;
      }

    case 16:
      $.goto = 17;
      $brk();
      $.state = 17;

    case 17:
      $.goto = 18;
      $p = $get($l[0][0][5], $l[0][0][2]);
      $.state = 18;

    case 18:
      $lset($l[0][0], 3,
      /*d*/
      $p);
      $.goto = 19;
      $brk();
      $.state = 19;

    case 19:
      $.goto = 20;
      ($context.call = eff)($l[0][0][1]);
      $.state = 20;

    case 20:
      $.goto = 21;
      $brk();
      $.state = 21;

    case 21:
      $l = $.$ = [$l[0]];
      $.goto = 22;
      $brk();
      $.state = 22;

    case 22:
      $lset($l[0][0], 2,
      /*j*/
      $l[0][0][2] + 1);
      $.goto = 14;
      continue;

    case 23:
      $l[0][1] = 26;
      $.goto = 25;
      continue;

    case 24:
      return $raise($.error);

    case 25:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 26:
      $.goto = 27;
      $brk();
      $.state = 27;

    case 27:
      $.goto = 28;
      ($context.call = eff)(2);
      $.state = 28;

    case 28:
      $.goto = 29;
      $brk();
      $.state = 29;

    case 29:
      $l = $.$ = [$l[0], void 0, void 0];
      $.goto = 30;
      $brk();
      $.state = 30;

    case 30:
      $lset($l[0], 1,
      /*i*/
      $l[0][1] + 1);
      $.goto = 7;
      continue;

    case 31:
      $l[0][6] = 34;
      $.goto = 33;
      continue;

    case 32:
      return $raise($.error);

    case 33:
      $l = $.$ = $l[0];
      $.goto = $l[6];
      continue;

    case 34:
      $.goto = 35;
      $brk();
      $.state = 35;

    case 35:
      $.goto = 36;
      ($context.call = eff)(3);
      $.state = 36;

    case 36:
      $.goto = 38;
      $brk();
      continue;

    case 37:
      $.goto = 38;
      return $unhandled($.error);

    case 38:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 31:
    case 30:
    case 29:
    case 28:
    case 27:
    case 26:
    case 25:
    case 24:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $.goto = 33;
      $l[0][6] = 32;
      break;

    case 23:
    case 22:
    case 21:
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
      $.goto = 25;
      $l[0][1] = 24;
      break;

    default:
      $.goto = 37;
  }
}, function ($, $l) {
  switch ($.state) {
    case 31:
    case 30:
    case 29:
    case 28:
    case 27:
    case 26:
    case 25:
    case 24:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][6] = 38;
      $.goto = 33;
      break;

    case 23:
    case 22:
    case 21:
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
      $l[0][1] = 33;
      $l[0][0][6] = 38;
      $.goto = 25;
      break;

    default:
      $.goto = 38;
      break;
  }
}, 1, [[4, "2:2-2:24", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-10:3", $s$2], [0, null, $s$2], [4, "4:7-4:30", $s$3], [2, "4:20-4:30", $s$3], [0, "4:14-4:30", $s$3], [4, "4:32-4:39", $s$3], [0, null, $s$3], [4, "5:4-8:5", $s$3], [0, null, $s$3], [4, "5:9-5:32", $s$4], [2, "5:22-5:32", $s$4], [0, "5:16-5:32", $s$4], [4, "5:34-5:41", $s$4], [0, null, $s$4], [4, "6:6-6:17", $s$4], [2, "6:10-6:16", $s$4], [4, "7:6-7:13", $s$4], [2, "7:6-7:12", $s$4], [36, "8:5-8:5", $s$4], [4, "5:43-5:46", $s$4], [0, "5:43-5:46", $s$4], [0, null, $s$4], [0, null, $s$3], [0, null, $s$3], [4, "9:4-9:11", $s$3], [2, "9:4-9:10", $s$3], [36, "10:3-10:3", $s$3], [4, "4:41-4:44", $s$3], [0, "4:41-4:44", $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [4, "11:2-11:9", $s$2], [2, "11:2-11:8", $s$2], [36, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();