var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"],
  zzz: [2, "15:9-15:12"]
}, null, 0],
    $s$2 = [{
  i: [1, "2:6-2:7"],
  k: [2, "3:4-3:5"],
  b: [3, "6:11-6:12"]
}, $s$1, 1],
    $s$3 = [{
  j: [1, "7:8-7:9"]
}, $s$2, 2],
    $s$4 = [{
  zz: [1, "15:13-15:15"],
  aaaa: [2, "23:6-23:10"]
}, $s$1, 1],
    $s$5 = [{}, $s$4, 2],
    $s$6 = [{}, $s$4, 2],
    $s$7 = [{}, $s$4, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-28:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$3($);
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
}, null, null, 0, [[0, "1:0-13:1", $s$1], [16, "28:0-28:0", $s$1], [16, "28:0-28:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 4, "1:0-13:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[3] = $m$2($);
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $l[1] = 0;
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $l[2] = 0;
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($x.call = eff)(1, $l[1], $l[2]);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $l[2] = $l[2] + 1;
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      ($x.call = eff)(4, $l[1], $l[2]);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      ($x.call = eff)(5, $l[1], $l[2]);
      $.state = 9;

    case 9:
      $.goto = 11;
      $brk();
      continue;

    case 10:
      $.goto = 11;
      return $unhandled($.error);

    case 11:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-3:10", $s$2], [4, "3:4-3:9", $s$2], [4, "4:2-4:15", $s$2], [2, "4:2-4:14", $s$2], [4, "5:2-5:6", $s$2], [4, "11:2-11:15", $s$2], [2, "11:2-11:14", $s$2], [4, "12:2-12:15", $s$2], [2, "12:2-12:14", $s$2], [36, "13:1-13:1", $s$2], [16, "13:1-13:1", $s$2], [16, "13:1-13:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$1, [], 0, 2, "6:2-10:3", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $l[1] = $l[0][1];
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $.goto = 3;
      ($x.call = eff)(2, $l[1]);
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      ($x.call = eff)(3, $l[0][1]);
      $.state = 5;

    case 5:
      $.goto = 7;
      $brk();
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "7:4-7:14", $s$3], [4, "8:4-8:14", $s$3], [2, "8:4-8:13", $s$3], [4, "9:4-9:14", $s$3], [2, "9:4-9:13", $s$3], [36, "10:3-10:3", $s$3], [16, "10:3-10:3", $s$3], [16, "10:3-10:3", $s$3]]),
    $m$3 = $M.fun("m$3", "zzz", null, $m$0, ["zz"], 0, 3, "15:0-27:1", 0, function zzz($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $m$4($);
      $l[2] = $m$5($);
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($x.call = $l[2])();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $l[2] = $m$6($);
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      ($x.call = $l[2])();
      $.state = 5;

    case 5:
      $.goto = 7;
      $brk();
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "16:2-16:9", $s$4], [2, "16:2-16:8", $s$4], [4, "23:2-25:4", $s$4], [4, "26:2-26:9", $s$4], [2, "26:2-26:8", $s$4], [36, "27:1-27:1", $s$4], [16, "27:1-27:1", $s$4], [16, "27:1-27:1", $s$4]]),
    $m$4 = $M.fun("m$4", "aaaa", null, $m$3, [], 0, 1, "17:2-19:3", 0, function aaaa($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($x.call = eff1)();
      $.state = 2;

    case 2:
      $.goto = 4;
      $brk();
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "18:4-18:11", $s$5], [2, "18:4-18:10", $s$5], [36, "19:3-19:3", $s$5], [16, "19:3-19:3", $s$5], [16, "19:3-19:3", $s$5]]),
    $m$5 = $M.fun("m$5", "aaaa", null, $m$3, [], 0, 1, "20:2-22:3", 0, function aaaa($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($x.call = eff2)();
      $.state = 2;

    case 2:
      $.goto = 4;
      $brk();
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "21:4-21:11", $s$6], [2, "21:4-21:10", $s$6], [36, "22:3-22:3", $s$6], [16, "22:3-22:3", $s$6], [16, "22:3-22:3", $s$6]]),
    $m$6 = $M.fun("m$6", "bbbb", null, $m$3, [], 0, 1, "23:13-25:3", 0, function bbbb($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($x.call = eff3)();
      $.state = 2;

    case 2:
      $.goto = 4;
      $brk();
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "24:4-24:11", $s$7], [2, "24:4-24:10", $s$7], [36, "25:3-25:3", $s$7], [16, "25:3-25:3", $s$7], [16, "25:3-25:3", $s$7]]);

$M.moduleExports();