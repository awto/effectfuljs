var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
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
    $s$3 = [{}, $s$2, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-13:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-12:1", $s$1], [16, "13:0-13:0", $s$1], [16, "13:0-13:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 6, "1:0-12:1", 0, function a($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:12");
      $.state = 1;

    case 1:
      $lset($l, 1,
      /*k*/
      0);
      $.goto = 2;
      $brk("3:2-3:9");
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff1)();
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("4:2-10:3");
      $.state = 4;

    case 4:
      $l = $.$ = [$l];
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($context.call = eff2)();
      $.state = 6;

    case 6:
      $lset($l[0], 2,
      /*i*/
      $p);
      $.state = 7;

    case 7:
      if ($l[0][2] < 10) {
        $.state = 8;
      } else {
        $.goto = 16;
        continue;
      }

    case 8:
      $.goto = 9;
      $brk("5:4-5:8");
      $.state = 9;

    case 9:
      $lset($l[0], 1,
      /*k*/
      $l[0][1] + 1);
      $.goto = 10;
      $brk("6:4-7:18");
      $.state = 10;

    case 10:
      $.goto = 11;
      $p = ($context.call = eff3)($l[0][2]);
      $.state = 11;

    case 11:
      $lset($l[0], 3,
      /*j*/
      $p);
      $.goto = 12;
      $p = ($context.call = eff4)($l[0][2]);
      $.state = 12;

    case 12:
      $lset($l[0], 4,
      /*l*/
      $p);
      $.goto = 13;
      $brk("8:4-8:8");
      $.state = 13;

    case 13:
      $lset($l[0], 4,
      /*l*/
      $l[0][4] + 1);
      $.goto = 14;
      $brk("9:4-9:20");
      $.state = 14;

    case 14:
      $1 = $l[0][3];
      $lset($l[0], 3,
      /*j*/
      $1 + 1);
      $.goto = 15;
      ($context.call = eff5)($1, $l[0][1], $l[0][4]);
      $.state = 15;

    case 15:
      $l = $.$ = $l.slice();
      $lset($l[0], 2,
      /*i*/
      $l[0][2] + 1);
      $.goto = 7;
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
      $brk("11:2-11:16");
      $.state = 19;

    case 19:
      $.goto = 21;
      ($context.call = eff6)($l[2], $l[3], $l[1]);
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
      $l[0][5] = 20;
      $.goto = 17;
      break;

    default:
      $.goto = 20;
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
      $l[0][5] = 21;
      $.goto = 17;
      break;

    default:
      $.goto = 21;
      break;
  }
}, 1, [[4, "2:2-2:12", $s$2], [4, "3:2-3:9", $s$2], [2, "3:2-3:8", $s$2], [4, "4:2-10:3", $s$2], [0, null, $s$2], [3, "4:15-4:21", $s$3], [1, "4:11-4:21", $s$3], [1, null, $s$2], [5, "5:4-5:8", $s$3], [5, "6:4-7:18", $s$3], [3, "6:12-6:19", $s$3], [3, "7:10-7:17", $s$3], [5, "8:4-8:8", $s$3], [5, "9:4-9:20", $s$3], [3, "9:4-9:19", $s$3], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [4, "11:2-11:16", $s$2], [2, "11:2-11:15", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();