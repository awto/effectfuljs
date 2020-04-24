var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-9:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("1:0-8:3");
      $.state = 1;

    case 1:
      $m$1($);
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
}, null, null, 0, [[4, "1:0-8:3", $s$1], [0, null, $s$1], [16, "9:0-9:0", $s$1], [16, "9:0-9:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 1, "1:1-8:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-6:19");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:4-3:25");
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = eff)(1);
      $.state = 3;

    case 3:
      if ($p) {
        $.state = 4;
      } else {
        $.goto = 9;
        continue;
      }

    case 4:
      $.goto = 5;
      $brk("3:16-3:25");
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($context.call = eff)(4);
      $.state = 6;

    case 6:
      if ($p) {
        $.goto = 1;
        continue;
      } else {
        $.state = 7;
      }

    case 7:
      $.goto = 8;
      $brk("7:2-7:9");
      $.state = 8;

    case 8:
      $.goto = 16;
      ($context.call = eff)(5);
      continue;

    case 9:
      $.goto = 10;
      $brk("4:4-4:22");
      $.state = 10;

    case 10:
      $.goto = 11;
      $p = ($context.call = eff)(2);
      $.state = 11;

    case 11:
      if ($p) {
        $.state = 12;
      } else {
        $.goto = 13;
        continue;
      }

    case 12:
      $.goto = 7;
      $brk("4:16-4:22");
      continue;

    case 13:
      $.goto = 14;
      $brk("5:4-5:11");
      $.state = 14;

    case 14:
      $.goto = 5;
      ($context.call = eff)(3);
      continue;

    case 15:
      $.goto = 16;
      return $unhandled($.error);

    case 16:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-6:19", $s$2], [4, "3:4-3:25", $s$2], [2, "3:8-3:14", $s$2], [0, null, $s$2], [4, "3:16-3:25", $s$2], [2, "6:11-6:17", $s$2], [0, null, $s$2], [4, "7:2-7:9", $s$2], [2, "7:2-7:8", $s$2], [4, "4:4-4:22", $s$2], [2, "4:8-4:14", $s$2], [0, null, $s$2], [4, "4:16-4:22", $s$2], [4, "5:4-5:11", $s$2], [2, "5:4-5:10", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);

$M.moduleExports();