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
  $s$2 = [{}, $s$1, 1],
  $s$3 = [{
    i: [1, "2:11-2:12"]
  }, $s$2, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-6:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-5:1", $s$1], [16, "6:0-6:0", $s$1], [16, "6:0-6:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-5:1", 0, function ($, $l, $p) {
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
          $.goto = 14;
          continue;
        }
      case 6:
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        if ($l[0][1]) {
          $.state = 8;
        } else {
          $.goto = 13;
          continue;
        }
      case 8:
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        $.goto = 10;
        ($x.call = eff)(1);
        $.state = 10;
      case 10:
        $.state = 11;
      case 11:
        $.goto = 12;
        $brk();
        $.state = 12;
      case 12:
        $.goto = 3;
        ($x.call = upd)();
        continue;
      case 13:
        $.goto = 11;
        $brk();
        continue;
      case 14:
        $.goto = 16;
        $brk();
        continue;
      case 15:
        $.goto = 16;
        return $unhandled($.error);
      case 16:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "2:2-4:18", $s$2], [2, "2:15-2:21", $s$3], [0, "2:11-2:21", $s$3], [4, "2:23-2:39", $s$3], [2, "2:23-2:30", $s$3], [0, null, $s$2], [4, "3:4-4:18", $s$3], [0, null, $s$2], [4, "3:11-3:18", $s$3], [2, "3:11-3:17", $s$3], [0, null, $s$2], [4, "2:41-2:46", $s$3], [2, "2:41-2:46", $s$3], [4, "4:9-4:18", $s$3], [36, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]);
$M.moduleExports();