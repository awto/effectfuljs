var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
    $brk = $M.brk,
    $lset = $M.lset,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{
  i: [1, "2:6-2:7"],
  j: [2, "3:4-3:5"],
  k: [3, "4:4-4:5"]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $s$4 = [{}, $s$3, 3],
    $s$5 = [{}, $s$4, 4],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-21:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-20:1", $s$1], [16, "21:0-21:0", $s$1], [16, "21:0-21:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 5, "1:0-20:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $lset($l, 1,
      /*i*/
      0);
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $lset($l, 2,
      /*j*/
      0);
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $lset($l, 3,
      /*k*/
      0);
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = eff)($l[1], $l[2], $l[3]);
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $l = $.$ = [$l, void 0, void 0];
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff1)($l[0][1]);
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $l = $.$ = [$l, void 0, void 0, void 0, void 0];
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $lset($l[0][0], 3,
      /*k*/
      10);
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $.goto = 14;
      ($context.call = eff2)();
      $.state = 14;

    case 14:
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $l = $.$ = [$l];
      $.state = 16;

    case 16:
      $.goto = 17;
      $brk();
      $.state = 17;

    case 17:
      $.goto = 18;
      ($context.call = eff4)($l[0][0][0][3], $l[0][0][0][2]);
      $.state = 18;

    case 18:
      $.goto = 19;
      $brk();
      $.state = 19;

    case 19:
      $l = $.$ = [$l[0]];
      $.goto = 16;
      continue;

    case 20:
      return $raise($.error);

    case 21:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 22:
      return $raise($.error);

    case 23:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 24:
      return $raise($.error);

    case 25:
      $l = $.$ = $l[0];
      $.goto = $l[4];
      continue;

    case 26:
      $.goto = 27;
      return $unhandled($.error);

    case 27:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 23:
    case 22:
    case 10:
    case 9:
    case 8:
    case 7:
      $.goto = 25;
      $l[0][4] = 24;
      break;

    case 21:
    case 20:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
      $.goto = 23;
      $l[0][1] = 22;
      break;

    case 19:
    case 18:
    case 17:
    case 16:
      $.goto = 21;
      $l[0][1] = 20;
      break;

    default:
      $.goto = 26;
  }
}, function ($, $l) {
  switch ($.state) {
    case 23:
    case 22:
    case 10:
    case 9:
    case 8:
    case 7:
      $l[0][4] = 27;
      $.goto = 25;
      break;

    case 21:
    case 20:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
      $l[0][1] = 25;
      $l[0][0][4] = 27;
      $.goto = 23;
      break;

    case 19:
    case 18:
    case 17:
    case 16:
      $l[0][1] = 23;
      $l[0][0][1] = 25;
      $l[0][0][0][4] = 27;
      $.goto = 21;
      break;

    default:
      $.goto = 27;
      break;
  }
}, 1, [[4, "2:2-4:10", $s$2], [4, "3:4-3:9", $s$2], [4, "4:4-4:9", $s$2], [4, "5:2-5:15", $s$2], [2, "5:2-5:14", $s$2], [4, "6:2-19:3", $s$2], [0, null, $s$2], [4, "7:4-7:12", $s$3], [2, "7:4-7:11", $s$3], [4, "8:4-18:5", $s$3], [0, null, $s$3], [4, "9:6-9:13", $s$4], [4, "10:6-10:13", $s$4], [2, "10:6-10:12", $s$4], [4, "11:6-13:7", $s$4], [0, null, $s$4], [4, "12:8-12:19", $s$5], [2, "12:8-12:18", $s$5], [36, "13:7-13:7", $s$5], [0, null, $s$5], [0, null, $s$4], [0, null, $s$4], [0, null, $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [16, "20:1-20:1", $s$2], [16, "20:1-20:1", $s$2]]);

$M.moduleExports();