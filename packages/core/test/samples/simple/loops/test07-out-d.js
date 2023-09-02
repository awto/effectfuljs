var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "1:9-1:10"]
  }, null, 0],
  $s$2 = [{
    i: [1, "2:6-2:7"],
    j: [2, "3:4-3:5"],
    k: [3, "4:4-4:5"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-21:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-20:1", $s$1], [16, "21:0-21:0", $s$1], [16, "21:0-21:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 4, "1:0-20:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $l[1] = 0;
        $.goto = 2;
        $brk();
        $.state = 2;
      case 2:
        $l[2] = 0;
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $l[3] = 0;
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $.goto = 5;
        ($x.call = eff)($l[1], $l[2], $l[3]);
        $.state = 5;
      case 5:
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        $.goto = 8;
        ($x.call = eff1)($l[1]);
        $.state = 8;
      case 8:
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        $.goto = 10;
        $brk();
        $.state = 10;
      case 10:
        $l[3] = 10;
        $.goto = 11;
        $brk();
        $.state = 11;
      case 11:
        $.goto = 12;
        ($x.call = eff2)();
        $.state = 12;
      case 12:
        $.goto = 13;
        $brk();
        $.state = 13;
      case 13:
        $.goto = 14;
        $brk();
        $.state = 14;
      case 14:
        $.goto = 15;
        ($x.call = eff4)($l[3], $l[2]);
        $.state = 15;
      case 15:
        $.goto = 13;
        $brk();
        continue;
      case 16:
        $.goto = 17;
        return $unhandled($.error);
      case 17:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "2:2-4:10", $s$2], [4, "3:4-3:9", $s$2], [4, "4:4-4:9", $s$2], [4, "5:2-5:15", $s$2], [2, "5:2-5:14", $s$2], [4, "6:2-19:3", $s$2], [4, "7:4-7:12", $s$2], [2, "7:4-7:11", $s$2], [4, "8:4-18:5", $s$2], [4, "9:6-9:13", $s$2], [4, "10:6-10:13", $s$2], [2, "10:6-10:12", $s$2], [4, "11:6-13:7", $s$2], [4, "12:8-12:19", $s$2], [2, "12:8-12:18", $s$2], [36, "13:7-13:7", $s$2], [16, "20:1-20:1", $s$2], [16, "20:1-20:1", $s$2]]);
$M.moduleExports();