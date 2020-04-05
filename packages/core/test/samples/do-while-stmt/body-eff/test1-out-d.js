var $M = require("@effectful/debugger/api"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-7:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("1:0-6:3");
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
}, null, null, 0, [[4, "1:0-6:3", $s$1], [0, null, $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 1, "1:1-6:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-5:19");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:4-3:25");
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = eff)(2);
      $.state = 3;

    case 3:
      if ($p) {
        $.goto = 6;
        $brk("3:16-3:25");
        continue;
      } else {
        $.state = 4;
      }

    case 4:
      $.goto = 5;
      $brk("4:4-4:11");
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = eff)(3);
      $.state = 6;

    case 6:
      $.goto = 7;
      $p = ($context.call = eff)(1);
      $.state = 7;

    case 7:
      if ($p) {
        $.goto = 1;
        continue;
      } else {
        $.goto = 9;
        continue;
      }

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-5:19", $s$2], [4, "3:4-3:25", $s$2], [2, "3:8-3:14", $s$2], [4, "3:16-3:25", $s$2], [4, "4:4-4:11", $s$2], [2, "4:4-4:10", $s$2], [2, "5:11-5:17", $s$2], [0, null, $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]);

$M.moduleExports();