var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-7:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $m$1($);
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
}, null, null, 0, [[0, null, $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 1, "1:1-6:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = eff)(2);
      $.state = 1;

    case 1:
      if ($p) {
        $.goto = 3;
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      ($context.call = eff)(3);
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($context.call = eff)(1);
      $.state = 4;

    case 4:
      if ($p) {
        $.goto = 0;
        continue;
      } else {
        $.goto = 6;
        continue;
      }

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "3:8-3:14", $s$2], [0, null, $s$2], [2, "4:4-4:10", $s$2], [2, "5:11-5:17", $s$2], [0, null, $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]);

$M.moduleExports();