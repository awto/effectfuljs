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
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 7, "1:1-12:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:24");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:2-3:18");
      $.state = 2;

    case 2:
      $lset($l, 5,
      /*ref*/
      [1, 2, 3]);
      $.goto = 3;
      $brk("4:2-10:3");
      $.state = 3;

    case 3:
      $l = $.$ = [$l, void 0, void 0];
      $.state = 4;

    case 4:
      $lset($l[0], 1,
      /*i*/
      0);
      $lset($l[0], 4,
      /*len*/
      $l[0][5].lenght);
      $.state = 5;

    case 5:
      if ($l[0][1] < $l[0][4]) {
        $.state = 6;
      } else {
        $.goto = 19;
        continue;
      }

    case 6:
      $.goto = 7;
      $brk("5:4-8:5");
      $.state = 7;

    case 7:
      $l = $.$ = [$l];
      $.state = 8;

    case 8:
      $lset($l[0][0], 2,
      /*j*/
      0);
      $lset($l[0][0], 4,
      /*len*/
      $l[0][0][5].length);
      $.state = 9;

    case 9:
      if ($l[0][0][2] < $l[0][0][4]) {
        $.state = 10;
      } else {
        $.goto = 14;
        continue;
      }

    case 10:
      $.goto = 11;
      $brk("6:6-6:17");
      $.state = 11;

    case 11:
      $lset($l[0][0], 3,
      /*d*/
      $l[0][0][5][$l[0][0][2]]);
      $.goto = 12;
      $brk("7:6-7:13");
      $.state = 12;

    case 12:
      $.goto = 13;
      ($context.call = eff)($l[0][0][1]);
      $.state = 13;

    case 13:
      $l = $.$ = $l.slice();
      $lset($l[0][0], 2,
      /*j*/
      $l[0][0][2] + 1);
      $.goto = 9;
      continue;

    case 14:
      $l[0][1] = 16;
      $.state = 15;

    case 15:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 16:
      $.goto = 17;
      $brk("9:4-9:11");
      $.state = 17;

    case 17:
      $.goto = 18;
      ($context.call = eff)(2);
      $.state = 18;

    case 18:
      $l = $.$ = $l.slice();
      $lset($l[0], 1,
      /*i*/
      $l[0][1] + 1);
      $.goto = 5;
      continue;

    case 19:
      $l[0][6] = 21;
      $.state = 20;

    case 20:
      $l = $.$ = $l[0];
      $.goto = $l[6];
      continue;

    case 21:
      $.goto = 22;
      $brk("11:2-11:9");
      $.state = 22;

    case 22:
      $.goto = 24;
      ($context.call = eff)(3);
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
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][6] = 23;
      $.goto = 20;
      break;

    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
      $l[0][1] = 20;
      $l[0][0][6] = 23;
      $.goto = 15;
      break;

    default:
      $.goto = 23;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][6] = 24;
      $.goto = 20;
      break;

    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
      $l[0][1] = 20;
      $l[0][0][6] = 24;
      $.goto = 15;
      break;

    default:
      $.goto = 24;
      break;
  }
}, 1, [[4, "2:2-2:24", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-10:3", $s$2], [0, null, $s$2], [1, "4:7-4:12", $s$3], [1, null, $s$2], [5, "5:4-8:5", $s$3], [1, null, $s$2], [1, "5:9-5:14", $s$4], [1, null, $s$2], [5, "6:6-6:17", $s$4], [5, "7:6-7:13", $s$4], [3, "7:6-7:12", $s$4], [1, null, $s$2], [1, null, $s$2], [1, null, $s$2], [5, "9:4-9:11", $s$3], [3, "9:4-9:10", $s$3], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [4, "11:2-11:9", $s$2], [2, "11:2-11:8", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();