var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "2:9-2:10"]
  }, null, 0],
  $s$2 = [{
    k: [1, "6:8-6:9"],
    i: [2, "5:11-5:12"],
    j: [3, "5:23-5:24"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-11:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "2:0-10:1", $s$1], [16, "11:0-11:0", $s$1], [16, "11:0-11:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 4, "2:0-10:1", 0, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = eff1)();
        $.state = 2;
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $.goto = 5;
        $p = ($x.call = eff2)();
        $.state = 5;
      case 5:
        $l[2] = $p;
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        $.goto = 7;
        $p = ($x.call = eff3)();
        $.state = 7;
      case 7:
        $l[3] = $p;
        $.state = 8;
      case 8:
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        $1 = $l[2] < 10;
        if ($1) {
          $.state = 10;
        } else {
          $.goto = 11;
          continue;
        }
      case 10:
        $1 = $l[3] > -10;
        $.state = 11;
      case 11:
        if ($1) {
          $.state = 12;
        } else {
          $.goto = 19;
          continue;
        }
      case 12:
        $.goto = 13;
        $brk();
        $.state = 13;
      case 13:
        $.goto = 14;
        $p = ($x.call = eff3)($l[2]);
        $.state = 14;
      case 14:
        $l[1] = $p;
        $.goto = 15;
        $brk();
        $.state = 15;
      case 15:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 16;
        ($x.call = eff4)($1);
        $.state = 16;
      case 16:
        $.goto = 17;
        $brk();
        $.state = 17;
      case 17:
        $.goto = 18;
        $brk();
        $.state = 18;
      case 18:
        $l[2] = $l[2] + 1;
        $l[3] = $l[3] - 1;
        $.goto = 8;
        continue;
      case 19:
        $.goto = 20;
        $brk();
        $.state = 20;
      case 20:
        $.goto = 21;
        ($x.call = eff5)($l[2], $l[3]);
        $.state = 21;
      case 21:
        $.goto = 23;
        $brk();
        continue;
      case 22:
        $.goto = 23;
        return $unhandled($.error);
      case 23:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "3:2-3:9", $s$2], [2, "3:2-3:8", $s$2], [4, "4:2-4:8", $s$2], [4, "5:2-8:3", $s$2], [2, "5:15-5:21", $s$2], [4, "5:23-5:33", $s$2], [2, "5:27-5:33", $s$2], [0, "5:23-5:33", $s$2], [4, "5:35-5:52", $s$2], [0, "5:35-5:41", $s$2], [0, "5:45-5:52", $s$2], [0, null, $s$2], [4, "6:4-6:20", $s$2], [2, "6:12-6:19", $s$2], [4, "7:4-7:14", $s$2], [2, "7:4-7:13", $s$2], [36, "8:3-8:3", $s$2], [4, "5:54-5:62", $s$2], [0, "5:54-5:57", $s$2], [4, "9:2-9:13", $s$2], [2, "9:2-9:12", $s$2], [36, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2]]);
$M.moduleExports();