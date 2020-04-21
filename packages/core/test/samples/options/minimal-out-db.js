var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "3:9-3:10"],
  b: [2, "9:9-9:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-16:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $.goto = 2;
      $mcall("profile", M, "defaultMinimal");
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[2, "1:0-1:27", $s$1], [16, "16:0-16:0", $s$1], [16, "16:0-16:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "3:0-7:1", 128, function a($, $l, $p) {
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
      $p = ($context.call = eff)(3);
      $.state = 3;

    case 3:
      $.result = $p;
      $.goto = 5;
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "4:2-4:8", $s$2], [2, "5:2-5:8", $s$2], [2, "6:9-6:15", $s$2], [0, null, $s$2], [16, "7:1-7:1", $s$2], [16, "7:1-7:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 1, "9:0-15:1", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = eff)(1);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)(2);
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = M)($p);
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = eff)(3);
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($context.call = eff)(4);
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = M)($p);
      $.state = 6;

    case 6:
      $.result = 5;
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
}, null, null, 1, [[2, "10:2-10:8", $s$3], [2, "11:4-11:10", $s$3], [2, "11:2-11:11", $s$3], [2, "12:2-12:8", $s$3], [2, "13:4-13:10", $s$3], [2, "13:2-13:11", $s$3], [0, "14:9-14:10", $s$3], [16, "15:1-15:1", $s$3], [16, "15:1-15:1", $s$3]]);

$M.moduleExports();