var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a2: [1, "1:9-1:11"]
}, null, 0],
    $s$2 = [{
  i: [1, "2:6-2:7"],
  c: [2, "3:11-3:12"]
}, $s$1, 1],
    $s$3 = [{
  m: [1, "4:8-4:9"],
  b: [2, "5:13-5:14"]
}, $s$2, 2],
    $s$4 = [{
  j: [1, "5:15-5:16"],
  k: [2, "6:10-6:11"]
}, $s$3, 3],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-14:0", 160, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-13:1", $s$1], [16, "14:0-14:0", $s$1], [16, "14:0-14:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a2", null, $m$0, [], 0, 3, "1:0-13:1", 128, function a2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $m$2($);
      $l[1] = 0;
      $.goto = 1;
      $p = ($context.call = eff_2)();
      $.state = 1;

    case 1:
      $.result = $p;
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
}, null, null, 1, [[2, "12:9-12:16", $s$2], [0, null, $s$2], [16, "13:1-13:1", $s$2], [16, "13:1-13:1", $s$2]]),
    $m$2 = $M.fun("m$2", "c", null, $m$1, [], 0, 3, "3:2-11:3", 128, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $m$3($);
      $l[1] = 0;
      $l[0][1] = $l[0][1] + 1;
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
}, null, null, 2, [[0, "5:4-9:5", $s$3], [16, "11:3-11:3", $s$3], [16, "11:3-11:3", $s$3]]),
    $m$3 = $M.fun("m$3", "b", null, $m$2, ["j"], 0, 3, "5:4-9:5", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $l[1] + $l[0][0][1];
      $l[0][0][1] = $l[0][0][1] + $l[0][1];
      $.goto = 1;
      $p = ($context.call = eff_1)();
      $.state = 1;

    case 1:
      $.result = $p;
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
}, null, null, 3, [[2, "8:13-8:20", $s$4], [0, null, $s$4], [16, "9:5-9:5", $s$4], [16, "9:5-9:5", $s$4]]);

$M.moduleExports();