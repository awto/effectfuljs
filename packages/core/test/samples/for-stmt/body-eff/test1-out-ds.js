var $M = require("@effectful/debugger/api"),
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-9:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("1:0-8:3");
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
      $brk("4:2-7:3");
      $.state = 3;

    case 3:
      $l = $.$ = [$l];
      $.state = 4;

    case 4:
      $lset($l[0], 2,
      /*j*/
      0);
      $lset($l[0], 3,
      /*len*/
      $l[0][4].length);
      $.state = 5;

    case 5:
      if ($l[0][2] < $l[0][3]) {
        $.goto = 6;
        $brk("5:4-5:15");
        $.state = 6;
      } else {
        $l[0][5] = 10;
        $.goto = 9;
        continue;
      }

    case 6:
      $lset($l[0], 1,
      /*i*/
      $l[0][4][$l[0][2]]);
      $.goto = 7;
      $brk("6:4-6:11");
      $.state = 7;

    case 7:
      $.goto = 8;
      ($context.call = eff)($l[0][1]);
      $.state = 8;

    case 8:
      $l = $.$ = $l.slice();
      $lset($l[0], 2,
      /*j*/
      $l[0][2] + 1);
      $.goto = 5;
      continue;

    case 9:
      $l = $.$ = $l[0];
      $.goto = $l[5];
      continue;

    case 10:
      $.goto = 12;
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][5] = 11;
      $.goto = 9;
      break;

    default:
      $.goto = 11;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][5] = 12;
      $.goto = 9;
      break;

    default:
      $.goto = 12;
      break;
  }
}, 1, [[4, "2:2-2:21", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-7:3", $s$2], [0, null, $s$2], [1, "4:7-4:12", $s$3], [5, "5:4-5:15", $s$3], [5, "6:4-6:11", $s$3], [3, "6:4-6:10", $s$3], [1, null, $s$2], [0, null, $s$2], [0, null, $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);

$M.moduleExports();