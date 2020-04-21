var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-28:0", 160, function file_js($, $l, $p) {
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 4, "1:0-13:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[3] = $m$2($);
      $l[1] = 0;
      $l[2] = 0;
      $.goto = 1;
      ($context.call = eff)(1, $l[1], $l[2]);
      $.state = 1;

    case 1:
      $l[2] = $l[2] + 1;
      $.goto = 2;
      ($context.call = eff)(4, $l[1], $l[2]);
      $.state = 2;

    case 2:
      $.goto = 4;
      ($context.call = eff)(5, $l[1], $l[2]);
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "4:2-4:14", $s$2], [2, "11:2-11:14", $s$2], [2, "12:2-12:14", $s$2], [16, "13:1-13:1", $s$2], [16, "13:1-13:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$1, [], 0, 2, "6:2-10:3", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $l[0][1];
      $.goto = 1;
      ($context.call = eff)(2, $l[1]);
      $.state = 1;

    case 1:
      $.goto = 3;
      ($context.call = eff)(3, $l[0][1]);
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "8:4-8:13", $s$3], [2, "9:4-9:13", $s$3], [16, "10:3-10:3", $s$3], [16, "10:3-10:3", $s$3]]),
    $m$3 = $M.fun("m$3", "zzz", null, $m$0, ["zz"], 0, 3, "15:0-27:1", 128, function zzz($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $m$4($);
      $l[2] = $m$5($);
      $.goto = 1;
      ($context.call = $l[2])();
      $.state = 1;

    case 1:
      $l[2] = $m$6($);
      $.goto = 3;
      ($context.call = $l[2])();
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "16:2-16:8", $s$4], [2, "26:2-26:8", $s$4], [16, "27:1-27:1", $s$4], [16, "27:1-27:1", $s$4]]),
    $m$4 = $M.fun("m$4", "aaaa", null, $m$3, [], 0, 1, "17:2-19:3", 128, function aaaa($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      ($context.call = eff1)();
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "18:4-18:10", $s$5], [16, "19:3-19:3", $s$5], [16, "19:3-19:3", $s$5]]),
    $m$5 = $M.fun("m$5", "aaaa", null, $m$3, [], 0, 1, "20:2-22:3", 128, function aaaa($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      ($context.call = eff2)();
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "21:4-21:10", $s$6], [16, "22:3-22:3", $s$6], [16, "22:3-22:3", $s$6]]),
    $m$6 = $M.fun("m$6", "bbbb", null, $m$3, [], 0, 1, "23:13-25:3", 128, function bbbb($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      ($context.call = eff3)();
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "24:4-24:10", $s$7], [16, "25:3-25:3", $s$7], [16, "25:3-25:3", $s$7]]);

$M.moduleExports();