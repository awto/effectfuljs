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
    i: [1, "2:6-2:7"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-25:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-24:1", $s$1], [16, "25:0-25:0", $s$1], [16, "25:0-25:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 2, "1:0-24:1", 0, function ($, $l, $p) {
    var $1;
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
        $p = ($x.call = eff2)($l[1] = 0);
        $.state = 3;
      case 3:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 4;
        ($x.call = eff1)($p, $1);
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
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 7;
        ($x.call = eff3)($1);
        $.state = 7;
      case 7:
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 9;
        ($x.call = eff4)($1);
        $.state = 9;
      case 9:
        $.goto = 10;
        $brk();
        $.state = 10;
      case 10:
        $.goto = 11;
        $brk();
        $.state = 11;
      case 11:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 12;
        ($x.call = eff5)($1);
        $.state = 12;
      case 12:
        $.goto = 13;
        $brk();
        $.state = 13;
      case 13:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 14;
        $p = ($x.call = eff6)($1);
        $.state = 14;
      case 14:
        if ($p) {
          $.state = 15;
        } else {
          $.goto = 23;
          continue;
        }
      case 15:
        $.goto = 16;
        $brk();
        $.state = 16;
      case 16:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 17;
        ($x.call = eff7)($1);
        $.state = 17;
      case 17:
        $.goto = 18;
        $brk();
        $.state = 18;
      case 18:
        $.goto = 19;
        $brk();
        $.state = 19;
      case 19:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 20;
        ($x.call = eff9)($1);
        $.state = 20;
      case 20:
        $.goto = 21;
        $brk();
        $.state = 21;
      case 21:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 22;
        ($x.call = eff10)($1);
        $.state = 22;
      case 22:
        $.goto = 34;
        $brk();
        continue;
      case 23:
        $.goto = 24;
        $brk();
        $.state = 24;
      case 24:
        $.goto = 25;
        $p = ($x.call = eff7)($l[1]);
        $.state = 25;
      case 25:
        if ($p) {
          $.state = 26;
        } else {
          $.goto = 31;
          continue;
        }
      case 26:
        $.goto = 27;
        $brk();
        $.state = 27;
      case 27:
        $l[1] = $l[1] + 1;
        $.goto = 28;
        $brk();
        $.state = 28;
      case 28:
        $.goto = 29;
        $brk();
        $.state = 29;
      case 29:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 30;
        ($x.call = eff8)($1);
        $.state = 30;
      case 30:
        $.goto = 18;
        $brk();
        continue;
      case 31:
        $.goto = 32;
        $brk();
        $.state = 32;
      case 32:
        $.result = 10;
        $.goto = 34;
        continue;
      case 33:
        $.goto = 34;
        return $unhandled($.error);
      case 34:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "2:2-2:8", $s$2], [4, "3:2-3:27", $s$2], [2, "3:7-3:20", $s$2], [2, "3:2-3:26", $s$2], [4, "4:2-21:3", $s$2], [4, "5:4-5:14", $s$2], [2, "5:4-5:13", $s$2], [4, "6:4-6:14", $s$2], [2, "6:4-6:13", $s$2], [4, "7:4-19:5", $s$2], [4, "8:6-8:16", $s$2], [2, "8:6-8:15", $s$2], [4, "9:6-17:7", $s$2], [2, "9:10-9:19", $s$2], [0, null, $s$2], [4, "10:8-10:18", $s$2], [2, "10:8-10:17", $s$2], [4, "11:8-11:19", $s$2], [4, "22:2-22:12", $s$2], [2, "22:2-22:11", $s$2], [4, "23:2-23:13", $s$2], [2, "23:2-23:12", $s$2], [36, "24:1-24:1", $s$2], [4, "12:13-17:7", $s$2], [2, "12:17-12:24", $s$2], [0, null, $s$2], [4, "13:8-13:12", $s$2], [4, "14:8-14:19", $s$2], [4, "20:4-20:14", $s$2], [2, "20:4-20:13", $s$2], [36, "21:3-21:3", $s$2], [4, "16:8-16:18", $s$2], [0, "16:15-16:17", $s$2], [16, "24:1-24:1", $s$2], [16, "24:1-24:1", $s$2]]);
$M.moduleExports();