var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $gset = $M.gset,
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
    $s$4 = [{}, $s$3, 3],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-13:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("1:0-12:3");
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
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 6, "1:1-12:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:21");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:2-3:18");
      $.state = 2;

    case 2:
      $lset($l, 4,
      /*ref*/
      [1, 2, 3]);
      $.goto = 3;
      $brk("4:2-11:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("4:7-11:3");
      $.state = 4;

    case 4:
      $l = $.$ = [$l, void 0, void 0];
      $.state = 5;

    case 5:
      $lset($l[0], 1,
      /*i*/
      0);
      $.state = 6;

    case 6:
      if ($l[0][1] < 3) {
        $.state = 7;
      } else {
        $.goto = 26;
        continue;
      }

    case 7:
      $.goto = 8;
      $brk("5:4-5:11");
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff)($l[0][1]);
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk("6:4-10:5");
      $.state = 10;

    case 10:
      $l = $.$ = [$l];
      $.state = 11;

    case 11:
      $lset($l[0][0], 2,
      /*j*/
      0);
      $lset($l[0][0], 3,
      /*len*/
      $l[0][0][4].length);
      $.state = 12;

    case 12:
      if ($l[0][0][2] < $l[0][0][3]) {
        $.state = 13;
      } else {
        $.goto = 23;
        continue;
      }

    case 13:
      $.goto = 14;
      $brk("7:6-7:17");
      $.state = 14;

    case 14:
      $gset(global, "d", $l[0][0][4][$l[0][0][2]]);
      $.goto = 15;
      $brk("8:6-8:24");
      $.state = 15;

    case 15:
      $.goto = 16;
      $p = ($context.call = eff)(d);
      $.state = 16;

    case 16:
      if ($p) {
        $.state = 17;
      } else {
        $.goto = 18;
        continue;
      }

    case 17:
      $.goto = 23;
      $brk("8:18-8:24");
      continue;

    case 18:
      $.goto = 19;
      $brk("9:6-9:28");
      $.state = 19;

    case 19:
      $.goto = 20;
      $p = ($context.call = eff)(2);
      $.state = 20;

    case 20:
      if ($p) {
        $.state = 21;
      } else {
        $.goto = 22;
        continue;
      }

    case 21:
      $l[0][1] = 27;
      $l[0][0][5] = 28;
      $.goto = 24;
      $brk("9:18-9:28");
      continue;

    case 22:
      $l = $.$ = $l.slice();
      $lset($l[0][0], 2,
      /*j*/
      $l[0][0][2] + 1);
      $.goto = 12;
      continue;

    case 23:
      $l[0][1] = 25;
      $.state = 24;

    case 24:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 25:
      $l = $.$ = $l.slice();
      $lset($l[0], 1,
      /*i*/
      $l[0][1] + 1);
      $.goto = 6;
      continue;

    case 26:
      $l[0][5] = 28;
      $.state = 27;

    case 27:
      $l = $.$ = $l[0];
      $.goto = $l[5];
      continue;

    case 28:
      $.goto = 30;
      continue;

    case 29:
      $.goto = 30;
      return $unhandled($.error);

    case 30:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 26:
    case 25:
    case 24:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][5] = 29;
      $.goto = 27;
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
      $l[0][1] = 27;
      $l[0][0][5] = 29;
      $.goto = 24;
      break;

    default:
      $.goto = 29;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 26:
    case 25:
    case 24:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][5] = 30;
      $.goto = 27;
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
      $l[0][1] = 27;
      $l[0][0][5] = 30;
      $.goto = 24;
      break;

    default:
      $.goto = 30;
      break;
  }
}, 1, [[4, "2:2-2:21", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-11:3", $s$2], [4, "4:7-11:3", $s$2], [0, null, $s$2], [1, "4:12-4:17", $s$3], [1, null, $s$2], [5, "5:4-5:11", $s$3], [3, "5:4-5:10", $s$3], [5, "6:4-10:5", $s$3], [1, null, $s$2], [1, "6:9-6:14", $s$4], [1, null, $s$2], [5, "7:6-7:17", $s$4], [5, "8:6-8:24", $s$4], [3, "8:10-8:16", $s$4], [1, null, $s$2], [5, "8:18-8:24", $s$4], [5, "9:6-9:28", $s$4], [3, "9:10-9:16", $s$4], [1, null, $s$2], [5, "9:18-9:28", $s$4], [1, null, $s$2], [1, null, $s$2], [1, null, $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [0, null, $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();