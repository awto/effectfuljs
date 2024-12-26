"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "1:9-1:10"]
  }, null, 0],
  $s$2 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-11:0", 160, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-10:1", $s$1], [16, "11:0-11:0", $s$1], [16, "11:0-11:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-10:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($x.call = eff1)();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = eff2)();
        $.state = 2;
      case 2:
        $.goto = 3;
        ($x.call = eff3)();
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = ($x.call = eff)(4);
        $.state = 4;
      case 4:
        if ($p) {
          $.state = 5;
        } else {
          $.goto = 7;
          continue;
        }
      case 5:
        $.goto = 7;
        ($x.call = eff)(5);
        continue;
      case 6:
        $.goto = 7;
        return $unhandled($.error);
      case 7:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "2:2-2:8", $s$2], [2, "3:2-3:8", $s$2], [2, "5:4-5:10", $s$2], [2, "6:8-6:14", $s$2], [0, null, $s$2], [2, "9:2-9:8", $s$2], [16, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2]]);
$M.moduleExports();