"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
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
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-8:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-7:1", $s$1], [16, "8:0-8:0", $s$1], [16, "8:0-8:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-7:1", 0, function ($, $l, $p) {
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
        ($x.call = eff)(1);
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
        $l[1] = $.error;
        $.error = void 0;
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        $.goto = 7;
        $mcall("log", console, $l[1]);
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
  }, null, 1, [[4, "2:2-6:3", $s$2], [5, "3:4-3:11", $s$2], [3, "3:4-3:10", $s$2], [37, "4:3-4:3", $s$2], [36, "7:1-7:1", $s$2], [4, "5:4-5:19", $s$3], [2, "5:4-5:18", $s$3], [36, "6:3-6:3", $s$2], [16, "7:1-7:1", $s$2], [16, "7:1-7:1", $s$2]]);
$M.moduleExports();