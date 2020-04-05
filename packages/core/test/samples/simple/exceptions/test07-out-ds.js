var $M = require("@effectful/debugger/api"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-10:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-9:1", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-9:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-8:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:4-3:11");
      $.state = 2;

    case 2:
      $l[1] = 10;
      $.goto = 3;
      ($context.call = eff)(1);
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("5:4-5:19");
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("log", console, 1);
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("6:4-6:11");
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff)(2);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("7:4-7:19");
      $.state = 8;

    case 8:
      $.goto = 9;
      $mcall("log", console, 2);
      $.state = 9;

    case 9:
      $.error = $l[2];
      $.goto = $l[1];
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
    case 2:
    case 1:
      $l[2] = $.error;
      $l[1] = 11;
      $.goto = 3;
      break;

    default:
      $.goto = 11;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 2:
    case 1:
      $l[1] = 12;
      $.goto = 3;
      break;

    default:
      $.goto = 12;
      break;
  }
}, 1, [[4, "2:2-8:3", $s$2], [5, "3:4-3:11", $s$2], [3, "3:4-3:10", $s$2], [4, "5:4-5:19", $s$2], [2, "5:4-5:18", $s$2], [4, "6:4-6:11", $s$2], [2, "6:4-6:10", $s$2], [4, "7:4-7:19", $s$2], [2, "7:4-7:18", $s$2], [0, null, $s$2], [0, null, $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();