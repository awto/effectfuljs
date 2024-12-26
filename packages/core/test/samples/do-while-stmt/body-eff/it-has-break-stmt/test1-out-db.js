"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{}, null, 0],
  $s$2 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-9:0", 160, function ($, $l, $p) {
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
  }, null, null, 0, [[0, null, $s$1], [16, "9:0-9:0", $s$1], [16, "9:0-9:0", $s$1]]),
  $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 1, "1:1-8:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($x.call = eff)(1);
        $.state = 1;
      case 1:
        if ($p) {
          $.goto = 6;
          continue;
        } else {
          $.state = 2;
        }
      case 2:
        $.goto = 3;
        $p = ($x.call = eff)(2);
        $.state = 3;
      case 3:
        if ($p) {
          $.goto = 5;
          continue;
        } else {
          $.state = 4;
        }
      case 4:
        $.goto = 6;
        ($x.call = eff)(3);
        continue;
      case 5:
        $.goto = 9;
        ($x.call = eff)(5);
        continue;
      case 6:
        $.goto = 7;
        $p = ($x.call = eff)(4);
        $.state = 7;
      case 7:
        if ($p) {
          $.goto = 0;
          continue;
        } else {
          $.goto = 5;
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
  }, null, null, 1, [[2, "3:8-3:14", $s$2], [0, null, $s$2], [2, "4:8-4:14", $s$2], [0, null, $s$2], [2, "5:4-5:10", $s$2], [2, "7:2-7:8", $s$2], [2, "6:11-6:17", $s$2], [0, null, $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);
$M.moduleExports();