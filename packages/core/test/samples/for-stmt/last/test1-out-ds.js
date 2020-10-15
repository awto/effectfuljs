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
  len: [3, "2:12-2:15"],
  ref: [4, "2:17-2:20"]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-9:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[4, "1:0-8:3", $s$1], [0, null, $s$1], [16, "9:0-9:0", $s$1], [16, "9:0-9:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 6, "1:1-8:1", 0, function ($, $l, $p) {
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
        $.goto = 18;
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
      $p = ($context.call = eff)($l[0][1]);
      $.state = 13;

    case 13:
      if ($p) {
        $.state = 14;
      } else {
        $.goto = 15;
        continue;
      }

    case 14:
      $.goto = 18;
      $brk();
      continue;

    case 15:
      $.goto = 16;
      $brk();
      $.state = 16;

    case 16:
      $l = $.$ = [$l[0]];
      $.goto = 17;
      $brk();
      $.state = 17;

    case 17:
      $lset($l[0], 2,
      /*j*/
      $l[0][2] + 1);
      $.goto = 7;
      continue;

    case 18:
      $l[0][5] = 21;
      $.goto = 20;
      continue;

    case 19:
      return $raise($.error);

    case 20:
      $l = $.$ = $l[0];
      $.goto = $l[5];
      continue;

    case 21:
      $.goto = 23;
      $brk();
      continue;

    case 22:
      $.goto = 23;
      return $unhandled($.error);

    case 23:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 18:
    case 17:
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
      $.goto = 20;
      $l[0][5] = 19;
      break;

    default:
      $.goto = 22;
  }
}, function ($, $l) {
  switch ($.state) {
    case 18:
    case 17:
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
      $.goto = 20;
      break;

    default:
      $.goto = 23;
      break;
  }
}, 1, [[4, "2:2-2:21", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-7:3", $s$2], [0, null, $s$2], [4, "4:7-4:30", $s$3], [2, "4:20-4:30", $s$3], [0, "4:14-4:30", $s$3], [4, "4:32-4:39", $s$3], [0, null, $s$3], [4, "5:4-5:15", $s$3], [2, "5:8-5:14", $s$3], [4, "6:4-6:22", $s$3], [2, "6:8-6:14", $s$3], [0, null, $s$3], [4, "6:16-6:22", $s$3], [36, "7:3-7:3", $s$3], [4, "4:41-4:44", $s$3], [0, "4:41-4:44", $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [36, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);

$M.moduleExports();