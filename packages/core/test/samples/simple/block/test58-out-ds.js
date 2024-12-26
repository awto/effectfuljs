"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
  $lset = $M.lset,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "1:9-1:10"]
  }, null, 0],
  $s$2 = [{
    i: [1, "2:6-2:7"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-12:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $lset($l, 1, $m$1($));
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
  }, null, null, 0, [[0, "1:0-11:1", $s$1], [16, "12:0-12:0", $s$1], [16, "12:0-12:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 5, "1:0-11:1", 0, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $lset($l, 1, 0);
        $.goto = 2;
        $brk();
        $.state = 2;
      case 2:
        $.goto = 3;
        ($x.call = eff0)();
        $.state = 3;
      case 3:
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $lset($l, 1, $l[1] + 2);
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $.goto = 6;
        ($x.call = effM)();
        $.state = 6;
      case 6:
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        $.goto = 8;
        ($x.call = effN)();
        $.state = 8;
      case 8:
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        $.goto = 10;
        $p = ($x.call = effI1)($lset($l, 1, $l[1] + 1));
        $.state = 10;
      case 10:
        $.goto = 11;
        $p = ($x.call = eff2)($p);
        $.state = 11;
      case 11:
        $l[2] = $p;
        $1 = $l[1];
        $lset($l, 1, $1 + 1);
        $l[3] = $1;
        $.goto = 12;
        $p = ($x.call = eff3)($l[1]);
        $.state = 12;
      case 12:
        $.goto = 13;
        ($x.call = eff1)($l[2], $l[3], $p);
        $.state = 13;
      case 13:
        $.goto = 14;
        $brk();
        $.state = 14;
      case 14:
        $.goto = 15;
        $p = ($x.call = effN)();
        $.state = 15;
      case 15:
        $.goto = 16;
        $p = ($x.call = effI)($p);
        $.state = 16;
      case 16:
        $.goto = 17;
        ($x.call = effM)($p);
        $.state = 17;
      case 17:
        $.goto = 18;
        $brk();
        $.state = 18;
      case 18:
        $.goto = 19;
        $p = ($x.call = effI)();
        $.state = 19;
      case 19:
        $l[4] = $p;
        $.goto = 20;
        $p = ($x.call = effJ)();
        $.state = 20;
      case 20:
        $.goto = 21;
        ($x.call = eff4)($l[4], $p);
        $.state = 21;
      case 21:
        $.goto = 22;
        $brk();
        $.state = 22;
      case 22:
        $.goto = 23;
        ($x.call = eff5)();
        $.state = 23;
      case 23:
        $.goto = 25;
        $brk();
        continue;
      case 24:
        $.goto = 25;
        return $unhandled($.error);
      case 25:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "2:2-2:12", $s$2], [4, "3:2-3:9", $s$2], [2, "3:2-3:8", $s$2], [4, "4:2-4:9", $s$2], [4, "5:2-5:9", $s$2], [2, "5:2-5:8", $s$2], [4, "6:2-6:9", $s$2], [2, "6:2-6:8", $s$2], [4, "7:2-7:39", $s$2], [2, "7:12-7:22", $s$2], [2, "7:7-7:23", $s$2], [2, "7:30-7:37", $s$2], [2, "7:2-7:38", $s$2], [4, "8:2-8:21", $s$2], [2, "8:12-8:18", $s$2], [2, "8:7-8:19", $s$2], [2, "8:2-8:20", $s$2], [4, "9:2-9:23", $s$2], [2, "9:7-9:13", $s$2], [2, "9:15-9:21", $s$2], [2, "9:2-9:22", $s$2], [4, "10:2-10:9", $s$2], [2, "10:2-10:8", $s$2], [36, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]);
$M.moduleExports();