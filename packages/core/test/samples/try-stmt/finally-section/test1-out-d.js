var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-9:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-8:1", $s$1], [16, "9:0-9:0", $s$1], [16, "9:0-9:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-8:1", 0, function a($, $l, $p) {
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
      $p = ($context.call = eff)("in body");
      $.state = 3;

    case 3:
      if ($p) {
        $.state = 4;
      } else {
        $.goto = 5;
        continue;
      }

    case 4:
      $l[1] = 14;
      $.goto = 6;
      $brk();
      continue;

    case 5:
      $l[1] = 10;
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      ($context.call = eff)("in `finally`");
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.error = $l[2];
      $.goto = $l[1];
      continue;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      ($context.call = eff)("after `finally`");
      $.state = 12;

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
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
      $l[2] = $.error;
      $l[1] = 13;
      $.goto = 6;
      break;

    default:
      $.goto = 13;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
      $l[1] = 14;
      $.goto = 6;
      break;

    default:
      $.goto = 14;
      break;
  }
}, 1, [[4, "2:2-6:3", $s$2], [4, "3:4-3:31", $s$2], [2, "3:8-3:22", $s$2], [0, null, $s$2], [4, "3:24-3:31", $s$2], [36, "4:3-4:3", $s$2], [4, "5:4-5:24", $s$2], [2, "5:4-5:23", $s$2], [36, "6:3-6:3", $s$2], [0, null, $s$2], [4, "7:2-7:25", $s$2], [2, "7:2-7:24", $s$2], [36, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);

$M.moduleExports();