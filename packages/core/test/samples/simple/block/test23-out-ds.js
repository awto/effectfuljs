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
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-6:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-5:1", $s$1], [16, "6:0-6:0", $s$1], [16, "6:0-6:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 5, "1:0-5:1", 0, function ($, $l, $p) {
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
        $lset($l, 2, 0);
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $1 = $l[1];
        $lset($l, 1, $1 + 1);
        $l[3] = $1;
        $.goto = 4;
        $p = ($x.call = eff4)($l[1], $l[2]);
        $.state = 4;
      case 4:
        $1 = $l[2];
        $lset($l, 2, $1 + 1);
        $.goto = 5;
        $p = ($x.call = eff3)($p, $1);
        $.state = 5;
      case 5:
        $l[4] = $p;
        $.goto = 6;
        $p = ($x.call = eff5)($l[1]);
        $.state = 6;
      case 6:
        $.goto = 7;
        $p = ($x.call = eff2)($l[3], $l[4], $p);
        $.state = 7;
      case 7:
        $1 = $l[1];
        $lset($l, 1, $1 + 1);
        $.goto = 8;
        $p = ($x.call = eff1)($p, $1);
        $.state = 8;
      case 8:
        $.goto = 9;
        ($x.call = eff0)($p, $l[1]);
        $.state = 9;
      case 9:
        $.goto = 11;
        $brk();
        continue;
      case 10:
        $.goto = 11;
        return $unhandled($.error);
      case 11:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "2:2-3:10", $s$2], [4, "3:4-3:9", $s$2], [4, "4:2-4:64", $s$2], [2, "4:27-4:37", $s$2], [2, "4:22-4:43", $s$2], [2, "4:45-4:52", $s$2], [2, "4:12-4:53", $s$2], [2, "4:7-4:59", $s$2], [2, "4:2-4:63", $s$2], [36, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]);
$M.moduleExports();