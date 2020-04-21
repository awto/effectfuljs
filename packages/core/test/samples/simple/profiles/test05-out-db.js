var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{
  a: [1, "5:11-5:12"],
  b: [2, "13:11-13:12"]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $s$4 = [{}, $s$2, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-20:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
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
}, null, null, 0, [[0, "1:0-19:1", $s$1], [16, "20:0-20:0", $s$1], [16, "20:0-20:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-19:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$2($);
      $l[2] = $m$3($);
      $.goto = 1;
      $mcall("profile", M, "defaultFull");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = p1)();
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = p2)();
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("profile", M, "defaultMinimal");
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = p2)();
      $.state = 5;

    case 5:
      $.goto = 7;
      ($context.call = p3)();
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "2:2-2:26", $s$2], [2, "3:2-3:6", $s$2], [2, "4:2-4:6", $s$2], [2, "10:2-10:29", $s$2], [2, "11:2-11:6", $s$2], [2, "12:2-12:6", $s$2], [16, "19:1-19:1", $s$2], [16, "19:1-19:1", $s$2]]),
    $m$2 = $M.fun("m$2", "a", null, $m$1, [], 0, 1, "5:2-9:3", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $mcall("log", console, "hi");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = e1)();
      $.state = 2;

    case 2:
      $.goto = 4;
      ($context.call = e2)();
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "6:4-6:21", $s$3], [2, "7:4-7:8", $s$3], [2, "8:4-8:8", $s$3], [16, "9:3-9:3", $s$3], [16, "9:3-9:3", $s$3]]),
    $m$3 = $M.fun("m$3", "b", null, $m$1, [], 0, 1, "13:2-18:3", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = p4)();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = p5)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = e1)();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = M)($p);
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($context.call = e)(2);
      $.state = 5;

    case 5:
      $.goto = 7;
      ($context.call = M)($p);
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "14:4-14:8", $s$4], [2, "15:4-15:8", $s$4], [2, "16:6-16:10", $s$4], [2, "16:4-16:11", $s$4], [2, "17:6-17:10", $s$4], [2, "17:4-17:11", $s$4], [16, "18:3-18:3", $s$4], [16, "18:3-18:3", $s$4]]);

$M.moduleExports();