var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a1: [1, "1:9-1:11"],
  a2: [2, "9:9-9:11"]
}, null, 0],
    $s$2 = [{
  a: [1, "1:12-1:13"],
  b: [2, "1:15-1:16"]
}, $s$1, 1],
    $s$3 = [{
  a: [1, "9:12-9:13"],
  b: [2, "9:15-9:16"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-16:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a1*/
      $m$1($));
      $lset($l, 2,
      /*a2*/
      $m$2($));
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
}, null, null, 0, [[0, "1:0-7:1", $s$1], [16, "16:0-16:0", $s$1], [16, "16:0-16:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a1", null, $m$0, ["a", "b"], 0, 3, "1:0-7:1", 0, function a1($, $l, $p) {
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
      $.goto = 3;
      ($context.call = eff)($l[1]);
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 9;
      $brk();
      continue;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff)($l[2]);
      $.state = 7;

    case 7:
      $.goto = 4;
      $brk();
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
    case 1:
      $.goto = 5;
      break;

    default:
      $.goto = 8;
  }
}, null, 1, [[4, "2:2-6:3", $s$2], [5, "3:4-3:11", $s$2], [3, "3:4-3:10", $s$2], [37, "4:3-4:3", $s$2], [36, "7:1-7:1", $s$2], [4, "5:4-5:11", $s$2], [2, "5:4-5:10", $s$2], [36, "6:3-6:3", $s$2], [16, "7:1-7:1", $s$2], [16, "7:1-7:1", $s$2]]),
    $m$2 = $M.fun("m$2", "a2", null, $m$0, ["a", "b"], 0, 3, "9:0-15:1", 0, function a2($, $l, $p) {
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
      $.goto = 3;
      ($context.call = eff)($l[1]);
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 8;
      $brk();
      continue;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.result = $l[2];
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
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
    case 1:
      $.goto = 5;
      break;

    default:
      $.goto = 7;
  }
}, null, 1, [[4, "10:2-14:3", $s$3], [5, "11:4-11:11", $s$3], [3, "11:4-11:10", $s$3], [37, "12:3-12:3", $s$3], [36, "15:1-15:1", $s$3], [4, "13:4-13:13", $s$3], [0, null, $s$3], [16, "15:1-15:1", $s$3], [16, "15:1-15:1", $s$3]]);

$M.moduleExports();