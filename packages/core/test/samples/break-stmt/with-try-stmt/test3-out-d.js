"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{}, null, 0],
  $s$2 = [{}, $s$1, 1],
  $s$3 = [{
    e: [1, "6:13-6:14"]
  }, $s$2, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-12:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
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
  }, null, null, 0, [[4, "1:0-11:3", $s$1], [0, null, $s$1], [16, "12:0-12:0", $s$1], [16, "12:0-12:0", $s$1]]),
  $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 2, "1:1-11:1", 0, function ($, $l, $p) {
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
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        ($x.call = eff)(2);
        $.state = 4;
      case 4:
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        $.goto = 7;
        ($x.call = eff)(4);
        $.state = 7;
      case 7:
        $.goto = 13;
        $brk();
        continue;
      case 8:
        $l[1] = $.error;
        $.error = void 0;
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        $.goto = 10;
        ($x.call = eff)(3);
        $.state = 10;
      case 10:
        $.goto = 11;
        $brk();
        $.state = 11;
      case 11:
        $.goto = 5;
        $brk();
        continue;
      case 12:
        $.goto = 13;
        return $unhandled($.error);
      case 13:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, function ($, $l) {
    switch ($.state) {
      case 4:
      case 3:
      case 2:
        $.goto = 8;
        break;
      default:
        $.goto = 12;
    }
  }, null, 1, [[4, "2:2-9:3", $s$2], [4, "3:4-8:5", $s$2], [5, "4:6-4:13", $s$2], [3, "4:6-4:12", $s$2], [5, "5:6-5:16", $s$2], [4, "10:2-10:9", $s$2], [2, "10:2-10:8", $s$2], [36, "11:1-11:1", $s$2], [4, "7:6-7:13", $s$3], [2, "7:6-7:12", $s$3], [36, "8:5-8:5", $s$2], [36, "9:3-9:3", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]);
$M.moduleExports();