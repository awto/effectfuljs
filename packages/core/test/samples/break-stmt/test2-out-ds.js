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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-8:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:0-7:3");
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
}, null, null, 0, [[4, "2:0-7:3", $s$1], [0, null, $s$1], [16, "8:0-8:0", $s$1], [16, "8:0-8:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 1, "2:1-7:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("3:2-6:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("4:4-5:16");
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = eff)(2);
      $.state = 3;

    case 3:
      if ($p) {
        $.goto = 5;
        $brk("4:16-4:26");
        continue;
      } else {
        $.goto = 4;
        $brk("5:9-5:16");
        $.state = 4;
      }

    case 4:
      $.goto = 5;
      ($context.call = eff)(3);
      $.state = 5;

    case 5:
      $.goto = 7;
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "3:2-6:3", $s$2], [4, "4:4-5:16", $s$2], [2, "4:8-4:14", $s$2], [4, "4:16-4:26", $s$2], [2, "5:9-5:15", $s$2], [0, null, $s$2], [16, "7:1-7:1", $s$2], [16, "7:1-7:1", $s$2]]);

$M.moduleExports();