var $M = require("@effectful/debugger"),
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
  $s$2 = [{
    i: [1, "2:6-2:7"],
    j: [2, "2:9-2:10"],
    len: [3, "2:12-2:15"],
    ref1: [4, "2:17-2:21"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-9:0", 32, function ($, $l, $p) {
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
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 5, "1:0-8:1", 0, function ($, $l, $p) {
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
        $l[4] = [1, 2, 3];
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $l[2] = 0;
        $l[3] = $l[4].length;
        $.state = 5;
      case 5:
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        if ($l[2] < $l[3]) {
          $.state = 7;
        } else {
          $.goto = 13;
          continue;
        }
      case 7:
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        $l[1] = $l[4][$l[2]];
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        $.goto = 10;
        $mcall("log", console, $l[1]);
        $.state = 10;
      case 10:
        $.goto = 11;
        $brk();
        $.state = 11;
      case 11:
        $.goto = 12;
        $brk();
        $.state = 12;
      case 12:
        $l[2] = $l[2] + 1;
        $.goto = 5;
        continue;
      case 13:
        $.goto = 15;
        $brk();
        continue;
      case 14:
        $.goto = 15;
        return $unhandled($.error);
      case 15:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "2:2-2:22", $s$2], [4, "3:2-3:19", $s$2], [4, "4:2-7:3", $s$2], [4, "4:7-4:31", $s$2], [0, "4:7-4:12", $s$2], [4, "4:33-4:40", $s$2], [0, null, $s$2], [4, "5:4-5:16", $s$2], [4, "6:4-6:19", $s$2], [2, "6:4-6:18", $s$2], [36, "7:3-7:3", $s$2], [4, "4:42-4:45", $s$2], [0, "4:42-4:45", $s$2], [36, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);
$M.moduleExports();