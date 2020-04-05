var $M = require("@effectful/debugger/api"),
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
  i: [1, "2:6-2:7"],
  j: [2, "3:4-3:5"]
}, $s$1, 1],
    $s$3 = [{
  i: [1, "6:14-6:15"],
  k: [2, "6:17-6:18"],
  z: [3, "7:8-7:9"]
}, $s$2, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-17:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-16:1", $s$1], [16, "17:0-17:0", $s$1], [16, "17:0-17:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-16:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-3:10");
      $.state = 1;

    case 1:
      $lset($l, 1,
      /*i*/
      0);
      $lset($l, 2,
      /*j*/
      0);
      $.goto = 2;
      $brk("4:2-4:13");
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff1)($l[1], $l[2]);
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("5:2-5:11");
      $.state = 4;

    case 4:
      $lset($l, 1,
      /*i*/
      $l[1] + 1);
      $lset($l, 2,
      /*j*/
      $l[2] + 1);
      $.goto = 5;
      $brk("6:2-12:11");
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = $m$2($))($l[1], $l[2]);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk("13:2-13:11");
      $.state = 7;

    case 7:
      $lset($l, 1,
      /*i*/
      $l[1] + 1);
      $lset($l, 2,
      /*j*/
      $l[2] + 1);
      $.goto = 8;
      $brk("14:2-14:13");
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff5)($l[1], $l[2]);
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk("15:2-15:13");
      $.state = 10;

    case 10:
      $.goto = 12;
      ($context.call = eff6)($l[1], $l[2]);
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-3:10", $s$2], [4, "4:2-4:13", $s$2], [2, "4:2-4:12", $s$2], [4, "5:2-5:11", $s$2], [4, "6:2-12:11", $s$2], [2, "6:2-12:10", $s$2], [4, "13:2-13:11", $s$2], [4, "14:2-14:13", $s$2], [2, "14:2-14:12", $s$2], [4, "15:2-15:13", $s$2], [2, "15:2-15:12", $s$2], [16, "16:1-16:1", $s$2], [16, "16:1-16:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$1, ["i", "k"], 0, 4, "6:3-12:3", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("7:4-7:14");
      $.state = 1;

    case 1:
      $lset($l, 3,
      /*z*/
      0);
      $.goto = 2;
      $brk("8:4-8:21");
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff2)($l[1], $l[0][2], $l[2], $l[3]);
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("9:4-9:23");
      $.state = 4;

    case 4:
      $lset($l, 1,
      /*i*/
      $l[1] + 1);
      $lset($l[0], 2,
      /*j*/
      $l[0][2] + 1);
      $lset($l, 2,
      /*k*/
      $l[2] + 1);
      $lset($l, 3,
      /*z*/
      $l[3] + 1);
      $.goto = 5;
      $brk("10:4-10:21");
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = eff3)($l[1], $l[0][2], $l[2], $l[3]);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk("11:4-11:21");
      $.state = 7;

    case 7:
      $.goto = 9;
      ($context.call = eff4)($l[1], $l[0][2], $l[2], $l[3]);
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "7:4-7:14", $s$3], [4, "8:4-8:21", $s$3], [2, "8:4-8:20", $s$3], [4, "9:4-9:23", $s$3], [4, "10:4-10:21", $s$3], [2, "10:4-10:20", $s$3], [4, "11:4-11:21", $s$3], [2, "11:4-11:20", $s$3], [16, "12:3-12:3", $s$3], [16, "12:3-12:3", $s$3]]);

$M.moduleExports();