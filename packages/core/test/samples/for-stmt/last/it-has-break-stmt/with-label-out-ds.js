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
        $.goto = 7;
        $brk("5:4-5:11");
        $.state = 7;
      } else {
        $l[0][5] = 23;
        $.goto = 22;
        continue;
      }

    case 7:
      $.goto = 8;
      ($context.call = eff)($l[0][1]);
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk("6:4-10:5");
      $.state = 9;

    case 9:
      $l = $.$ = [$l];
      $.state = 10;

    case 10:
      $lset($l[0][0], 2,
      /*j*/
      0);
      $lset($l[0][0], 3,
      /*len*/
      $l[0][0][4].length);
      $.state = 11;

    case 11:
      if ($l[0][0][2] < $l[0][0][3]) {
        $.goto = 13;
        $brk("7:6-7:17");
        continue;
      } else {
        $.state = 12;
      }

    case 12:
      $l[0][1] = 21;
      $.goto = 20;
      continue;

    case 13:
      $gset(global, "d", $l[0][0][4][$l[0][0][2]]);
      $.goto = 14;
      $brk("8:6-8:24");
      $.state = 14;

    case 14:
      $.goto = 15;
      $p = ($context.call = eff)(d);
      $.state = 15;

    case 15:
      if ($p) {
        $.goto = 12;
        $brk("8:18-8:24");
        continue;
      } else {
        $.state = 16;
      }

    case 16:
      $.goto = 17;
      $brk("9:6-9:28");
      $.state = 17;

    case 17:
      $.goto = 18;
      $p = ($context.call = eff)(2);
      $.state = 18;

    case 18:
      if ($p) {
        $l[0][1] = 22;
        $l[0][0][5] = 23;
        $.goto = 20;
        $brk("9:18-9:28");
        continue;
      } else {
        $.state = 19;
      }

    case 19:
      $l = $.$ = $l.slice();
      $lset($l[0][0], 2,
      /*j*/
      $l[0][0][2] + 1);
      $.goto = 11;
      continue;

    case 20:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 21:
      $l = $.$ = $l.slice();
      $lset($l[0], 1,
      /*i*/
      $l[0][1] + 1);
      $.goto = 6;
      continue;

    case 22:
      $l = $.$ = $l[0];
      $.goto = $l[5];
      continue;

    case 23:
      $.goto = 25;
      continue;

    case 24:
      $.goto = 25;
      return $unhandled($.error);

    case 25:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 21:
    case 20:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][5] = 24;
      $.goto = 22;
      break;

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
      $l[0][1] = 22;
      $l[0][0][5] = 24;
      $.goto = 20;
      break;

    default:
      $.goto = 24;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 21:
    case 20:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][5] = 25;
      $.goto = 22;
      break;

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
      $l[0][1] = 22;
      $l[0][0][5] = 25;
      $.goto = 20;
      break;

    default:
      $.goto = 25;
      break;
  }
}, 1, [[4, "2:2-2:21", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-11:3", $s$2], [4, "4:7-11:3", $s$2], [0, null, $s$2], [1, "4:12-4:17", $s$3], [5, "5:4-5:11", $s$3], [3, "5:4-5:10", $s$3], [5, "6:4-10:5", $s$3], [1, null, $s$2], [1, "6:9-6:14", $s$4], [5, "7:6-7:17", $s$4], [1, null, $s$2], [5, "8:6-8:24", $s$4], [3, "8:10-8:16", $s$4], [5, "8:18-8:24", $s$4], [5, "9:6-9:28", $s$4], [3, "9:10-9:16", $s$4], [5, "9:18-9:28", $s$4], [1, null, $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [0, null, $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();