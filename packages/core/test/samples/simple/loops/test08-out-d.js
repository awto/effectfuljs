"no-ctrl";

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
    i: [1, "2:11-2:12"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-10:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-9:1", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-9:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.call = init)();
        $.state = 2;
      case 2:
        $l[1] = $p;
        $.state = 3;
      case 3:
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $.goto = 5;
        $p = ($x.call = check)();
        $.state = 5;
      case 5:
        if ($p === true) {
          $.state = 6;
        } else {
          $.goto = 16;
          continue;
        }
      case 6:
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        $.goto = 8;
        ($x.call = b1)();
        $.state = 8;
      case 8:
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        if (v) {
          $.state = 10;
        } else {
          $.goto = 15;
          continue;
        }
      case 10:
        $.goto = 11;
        $brk();
        $.state = 11;
      case 11:
        $.goto = 12;
        ($x.call = e)();
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
        $.goto = 3;
        ($x.call = upd)();
        continue;
      case 15:
        $.goto = 13;
        $brk();
        continue;
      case 16:
        $.goto = 18;
        $brk();
        continue;
      case 17:
        $.goto = 18;
        return $unhandled($.error);
      case 18:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "2:2-8:3", $s$2], [2, "2:15-2:21", $s$2], [0, "2:11-2:21", $s$2], [4, "2:23-2:39", $s$2], [2, "2:23-2:30", $s$2], [0, null, $s$2], [4, "3:4-3:9", $s$2], [2, "3:4-3:8", $s$2], [4, "4:4-7:5", $s$2], [0, null, $s$2], [4, "5:6-5:10", $s$2], [2, "5:6-5:9", $s$2], [4, "6:6-6:15", $s$2], [4, "2:41-2:46", $s$2], [2, "2:41-2:46", $s$2], [36, "8:3-8:3", $s$2], [36, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);
$M.moduleExports();