var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "2:9-2:10"],
  b: [2, "6:9-6:10"],
  c: [3, "12:9-12:10"],
  d: [4, "19:9-19:10"],
  e: [5, "27:9-27:10"],
  f: [6, "33:9-33:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $s$4 = [{}, $s$1, 1],
    $s$5 = [{}, $s$1, 1],
    $s$6 = [{}, $s$1, 1],
    $s$7 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 7, "1:0-37:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $l[5] = $m$5($);
      $l[6] = $m$6($);
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
}, null, null, 0, [[0, "2:0-5:1", $s$1], [16, "37:0-37:0", $s$1], [16, "37:0-37:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "2:0-5:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      if (true) {
        $.state = 2;
      } else {
        $.goto = 5;
        continue;
      }

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($x.call = eff)(1);
      $.state = 4;

    case 4:
      $.result = $p;
      $.goto = 9;
      continue;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      $p = ($x.call = eff)(2);
      $.state = 7;

    case 7:
      $.result = $p;
      $.goto = 9;
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "3:2-4:21", $s$2], [0, null, $s$2], [4, "3:12-3:26", $s$2], [2, "3:19-3:25", $s$2], [0, null, $s$2], [4, "4:7-4:21", $s$2], [2, "4:14-4:20", $s$2], [0, null, $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 1, "6:0-11:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      if (true) {
        $.state = 2;
      } else {
        $.goto = 5;
        continue;
      }

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($x.call = eff)(1);
      $.state = 4;

    case 4:
      $.result = $p;
      $.goto = 9;
      continue;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      $p = ($x.call = eff)(2);
      $.state = 7;

    case 7:
      $.result = $p;
      $.goto = 9;
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "7:2-8:21", $s$3], [0, null, $s$3], [4, "7:12-7:26", $s$3], [2, "7:19-7:25", $s$3], [0, null, $s$3], [4, "8:7-8:21", $s$3], [2, "8:14-8:20", $s$3], [0, null, $s$3], [16, "11:1-11:1", $s$3], [16, "11:1-11:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 1, "12:0-17:1", 0, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      if (true) {
        $.state = 2;
      } else {
        $.goto = 9;
        continue;
      }

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($x.call = eff)(1);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      ($x.call = eff)(3);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      ($x.call = eff)(4);
      $.state = 8;

    case 8:
      $.goto = 12;
      $brk();
      continue;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 4;
      ($x.call = eff)(2);
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "13:2-14:14", $s$4], [0, null, $s$4], [4, "13:12-13:19", $s$4], [2, "13:12-13:18", $s$4], [4, "15:2-15:9", $s$4], [2, "15:2-15:8", $s$4], [4, "16:2-16:9", $s$4], [2, "16:2-16:8", $s$4], [36, "17:1-17:1", $s$4], [4, "14:7-14:14", $s$4], [2, "14:7-14:13", $s$4], [16, "17:1-17:1", $s$4], [16, "17:1-17:1", $s$4]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 1, "19:0-25:1", 0, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($x.call = eff)("a");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      if (true) {
        $.state = 4;
      } else {
        $.goto = 11;
        continue;
      }

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      ($x.call = eff)(1);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      ($x.call = eff)(3);
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      ($x.call = eff)(4);
      $.state = 10;

    case 10:
      $.goto = 14;
      $brk();
      continue;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 6;
      ($x.call = eff)(2);
      continue;

    case 13:
      $.goto = 14;
      return $unhandled($.error);

    case 14:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "20:2-20:11", $s$5], [2, "20:2-20:10", $s$5], [4, "21:2-22:14", $s$5], [0, null, $s$5], [4, "21:12-21:19", $s$5], [2, "21:12-21:18", $s$5], [4, "23:2-23:9", $s$5], [2, "23:2-23:8", $s$5], [4, "24:2-24:9", $s$5], [2, "24:2-24:8", $s$5], [36, "25:1-25:1", $s$5], [4, "22:7-22:14", $s$5], [2, "22:7-22:13", $s$5], [16, "25:1-25:1", $s$5], [16, "25:1-25:1", $s$5]]),
    $m$5 = $M.fun("m$5", "e", null, $m$0, [], 0, 1, "27:0-31:1", 0, function e($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff)(1);
      $.state = 2;

    case 2:
      if ($p) {
        $.state = 3;
      } else {
        $.goto = 5;
        continue;
      }

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.result = 1;
      $.goto = 8;
      continue;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.result = 2;
      $.goto = 8;
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "28:2-29:16", $s$6], [2, "28:6-28:12", $s$6], [0, null, $s$6], [4, "28:14-28:23", $s$6], [0, "28:21-28:22", $s$6], [4, "29:7-29:16", $s$6], [0, "29:14-29:15", $s$6], [16, "31:1-31:1", $s$6], [16, "31:1-31:1", $s$6]]),
    $m$6 = $M.fun("m$6", "f", null, $m$0, [], 0, 1, "33:0-36:1", 0, function f($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff)(1);
      $.state = 2;

    case 2:
      if ($p) {
        $.state = 3;
      } else {
        $.goto = 5;
        continue;
      }

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.result = 1;
      $.goto = 8;
      continue;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.result = 2;
      $.goto = 8;
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "34:2-35:16", $s$7], [2, "34:6-34:12", $s$7], [0, null, $s$7], [4, "34:14-34:23", $s$7], [0, "34:21-34:22", $s$7], [4, "35:7-35:16", $s$7], [0, "35:14-35:15", $s$7], [16, "36:1-36:1", $s$7], [16, "36:1-36:1", $s$7]]);

$M.moduleExports();