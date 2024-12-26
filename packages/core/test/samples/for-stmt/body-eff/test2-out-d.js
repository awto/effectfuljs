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
  $s$2 = [{
    i: [1, "2:6-2:7"],
    j: [2, "2:9-2:10"],
    d: [3, "2:12-2:13"],
    len: [4, "2:15-2:18"],
    ref: [5, "2:20-2:23"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-13:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[4, "1:0-12:3", $s$1], [0, null, $s$1], [16, "13:0-13:0", $s$1], [16, "13:0-13:0", $s$1]]),
  $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 6, "1:1-12:1", 0, function ($, $l, $p) {
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
        $l[5] = [1, 2, 3];
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $l[1] = 0;
        $l[4] = $l[5].lenght;
        $.state = 5;
      case 5:
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        if ($l[1] < $l[4]) {
          $.state = 7;
        } else {
          $.goto = 23;
          continue;
        }
      case 7:
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        $l[2] = 0;
        $l[4] = $l[5].length;
        $.state = 10;
      case 10:
        $.goto = 11;
        $brk();
        $.state = 11;
      case 11:
        if ($l[2] < $l[4]) {
          $.state = 12;
        } else {
          $.goto = 18;
          continue;
        }
      case 12:
        $.goto = 13;
        $brk();
        $.state = 13;
      case 13:
        $l[3] = $l[5][$l[2]];
        $.goto = 14;
        $brk();
        $.state = 14;
      case 14:
        $.goto = 15;
        ($x.call = eff)($l[1]);
        $.state = 15;
      case 15:
        $.goto = 16;
        $brk();
        $.state = 16;
      case 16:
        $.goto = 17;
        $brk();
        $.state = 17;
      case 17:
        $l[2] = $l[2] + 1;
        $.goto = 10;
        continue;
      case 18:
        $.goto = 19;
        $brk();
        $.state = 19;
      case 19:
        $.goto = 20;
        ($x.call = eff)(2);
        $.state = 20;
      case 20:
        $.goto = 21;
        $brk();
        $.state = 21;
      case 21:
        $.goto = 22;
        $brk();
        $.state = 22;
      case 22:
        $l[1] = $l[1] + 1;
        $.goto = 5;
        continue;
      case 23:
        $.goto = 24;
        $brk();
        $.state = 24;
      case 24:
        $.goto = 25;
        ($x.call = eff)(3);
        $.state = 25;
      case 25:
        $.goto = 27;
        $brk();
        continue;
      case 26:
        $.goto = 27;
        return $unhandled($.error);
      case 27:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "2:2-2:24", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-10:3", $s$2], [4, "4:7-4:30", $s$2], [0, "4:7-4:12", $s$2], [4, "4:32-4:39", $s$2], [0, null, $s$2], [4, "5:4-8:5", $s$2], [4, "5:9-5:32", $s$2], [0, "5:9-5:14", $s$2], [4, "5:34-5:41", $s$2], [0, null, $s$2], [4, "6:6-6:17", $s$2], [4, "7:6-7:13", $s$2], [2, "7:6-7:12", $s$2], [36, "8:5-8:5", $s$2], [4, "5:43-5:46", $s$2], [0, "5:43-5:46", $s$2], [4, "9:4-9:11", $s$2], [2, "9:4-9:10", $s$2], [36, "10:3-10:3", $s$2], [4, "4:41-4:44", $s$2], [0, "4:41-4:44", $s$2], [4, "11:2-11:9", $s$2], [2, "11:2-11:8", $s$2], [36, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);
$M.moduleExports();