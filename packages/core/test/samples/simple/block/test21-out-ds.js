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
    i: [1, "2:6-2:7"],
    j: [2, "3:4-3:5"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-11:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-10:1", $s$1], [16, "11:0-11:0", $s$1], [16, "11:0-11:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 2, 3, "1:0-10:1", 0, function ($, $l, $p) {
    var $2, $1;
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
        $lset($l, 2, 0);
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $1 = $l[1];
        $lset($l, 1, $1 + 1);
        $2 = $l[2];
        $lset($l, 2, $2 + 1);
        $.goto = 4;
        ($x.call = eff0)($1, $2);
        $.state = 4;
      case 4:
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $.goto = 6;
        ($x.call = eff1)($l[1]);
        $.state = 6;
      case 6:
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        $lset($l, 1, $l[1] + 1);
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        $.goto = 9;
        ($x.call = eff2)(2, $l[2]);
        $.state = 9;
      case 9:
        $.goto = 10;
        $brk();
        $.state = 10;
      case 10:
        $.goto = 11;
        ($x.call = eff3)($lset($l, 1, $l[1] + 2), $l[2]);
        $.state = 11;
      case 11:
        $.goto = 12;
        $brk();
        $.state = 12;
      case 12:
        $.goto = 13;
        ($x.call = eff4)($l[2]);
        $.state = 13;
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
  }, null, null, 1, [[4, "2:2-3:10", $s$2], [4, "3:4-3:9", $s$2], [4, "4:2-4:17", $s$2], [2, "4:2-4:16", $s$2], [4, "5:2-5:10", $s$2], [2, "5:2-5:9", $s$2], [4, "6:2-6:9", $s$2], [4, "7:2-7:13", $s$2], [2, "7:2-7:12", $s$2], [4, "8:2-8:20", $s$2], [2, "8:2-8:19", $s$2], [4, "9:2-9:10", $s$2], [2, "9:2-9:9", $s$2], [36, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2]]);
$M.moduleExports();