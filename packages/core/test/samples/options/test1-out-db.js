var $M = require("@effectful/debugger/api"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"],
  b: [2, "9:9-9:10"],
  c: [3, "21:9-21:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $s$4 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 4, "1:0-33:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
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
}, null, null, 0, [[0, "1:0-7:1", $s$1], [16, "33:0-33:0", $s$1], [16, "33:0-33:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-7:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = eff)(1);
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)(2);
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("profile", M, "minimal");
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = eff)(3);
      $.state = 4;

    case 4:
      $.goto = 6;
      ($context.call = eff)(4);
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "2:2-2:8", $s$2], [2, "3:2-3:8", $s$2], [2, "4:2-4:22", $s$2], [2, "5:2-5:8", $s$2], [2, "6:2-6:8", $s$2], [16, "7:1-7:1", $s$2], [16, "7:1-7:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 1, "9:0-19:1", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = eff)(1);
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)(2);
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("profile", M, "minimal");
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = eff)(3);
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = eff)(4);
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("profile", M, "full");
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff)(5);
      $.state = 7;

    case 7:
      $.goto = 8;
      ($context.call = eff)(6);
      $.state = 8;

    case 8:
      $.goto = 10;
      $mcall("log", console, "7");
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "10:2-10:8", $s$3], [2, "11:2-11:8", $s$3], [2, "12:2-12:22", $s$3], [2, "13:2-13:8", $s$3], [2, "14:2-14:8", $s$3], [2, "15:2-15:19", $s$3], [2, "16:2-16:8", $s$3], [2, "17:2-17:8", $s$3], [2, "18:2-18:18", $s$3], [16, "19:1-19:1", $s$3], [16, "19:1-19:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 1, "21:0-32:1", 128, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = eff)(1);
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)(2);
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("profile", M, "minimal");
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = eff)(3);
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = eff)(4);
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = eff)(5);
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff)(6);
      $.state = 7;

    case 7:
      $.goto = 9;
      $mcall("log", console, "7");
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "22:2-22:8", $s$4], [2, "23:2-23:8", $s$4], [2, "25:4-25:24", $s$4], [2, "26:4-26:10", $s$4], [2, "27:4-27:10", $s$4], [2, "29:2-29:8", $s$4], [2, "30:2-30:8", $s$4], [2, "31:2-31:18", $s$4], [16, "32:1-32:1", $s$4], [16, "32:1-32:1", $s$4]]);

$M.moduleExports();