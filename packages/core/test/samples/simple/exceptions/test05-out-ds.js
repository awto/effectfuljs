var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
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
    $s$3 = [{
  e: [1, "4:11-4:12"]
}, $s$2, 1],
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 4, "1:0-9:1", 0, function a($, $l, $p) {
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
      ($context.call = eff)(1);
      $.state = 3;

    case 3:
      $l[2] = 12;
      $.goto = 8;
      $brk();
      continue;

    case 4:
      $lset($l, 1,
      /*e*/
      $.error);
      $.error = void 0;
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("log", console, $l[1]);
      $.state = 6;

    case 6:
      $l[2] = 12;
      $.goto = 8;
      $brk();
      continue;

    case 7:
      return $raise($l[3]);

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      $mcall("log", console, "fin");
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = $l[2];
      continue;

    case 12:
      $.goto = 14;
      $brk();
      continue;

    case 13:
      $.goto = 14;
      return $unhandled($.error);

    case 14:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
      $.goto = 8;
      $l[2] = 7;
      $l[3] = $.error;
      break;

    case 3:
    case 2:
    case 1:
      $.goto = 4;
      break;

    default:
      $.goto = 13;
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
      $l[2] = 14;
      $.goto = 8;
      break;

    default:
      $.goto = 14;
      break;
  }
}, 1, [[4, "2:2-8:3", $s$2], [5, "3:4-3:11", $s$2], [3, "3:4-3:10", $s$2], [37, "4:3-4:3", $s$2], [4, "5:4-5:19", $s$3], [2, "5:4-5:18", $s$3], [36, "6:3-6:3", $s$2], [0, null, $s$2], [4, "7:4-7:23", $s$2], [2, "7:4-7:22", $s$2], [36, "8:3-8:3", $s$2], [0, null, $s$2], [36, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();