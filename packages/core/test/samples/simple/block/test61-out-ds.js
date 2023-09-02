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
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-14:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-13:1", $s$1], [16, "14:0-14:0", $s$1], [16, "14:0-14:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 2, "1:0-13:1", 0, function ($, $l, $p) {
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
        ($x.call = eff1)($l[1]);
        $.state = 3;
      case 3:
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $1 = $l[1];
        $lset($l, 1, $1 + 1);
        $.goto = 6;
        ($x.call = eff2)($1);
        $.state = 6;
      case 6:
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        if ($l[1]) {
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
        $lset($l, 1, $l[1] + 1);
        $.goto = 10;
        $brk();
        $.state = 10;
      case 10:
        $.goto = 11;
        $brk();
        $.state = 11;
      case 11:
        $1 = $l[1];
        $lset($l, 1, $1 + 1);
        $.goto = 12;
        ($x.call = eff4)($1);
        $.state = 12;
      case 12:
        $.goto = 17;
        $brk();
        continue;
      case 13:
        $.goto = 14;
        $brk();
        $.state = 14;
      case 14:
        $1 = $l[1];
        $lset($l, 1, $1 + 1);
        $.goto = 15;
        ($x.call = eff3)($1);
        $.state = 15;
      case 15:
        $.goto = 10;
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
  }, null, null, 1, [[4, "2:2-2:12", $s$2], [4, "3:2-3:10", $s$2], [2, "3:2-3:9", $s$2], [4, "4:2-11:3", $s$2], [4, "5:4-5:14", $s$2], [2, "5:4-5:13", $s$2], [4, "6:4-9:5", $s$2], [0, null, $s$2], [4, "7:6-7:10", $s$2], [4, "8:6-8:16", $s$2], [4, "12:2-12:12", $s$2], [2, "12:2-12:11", $s$2], [36, "13:1-13:1", $s$2], [4, "10:4-10:14", $s$2], [2, "10:4-10:13", $s$2], [36, "11:3-11:3", $s$2], [16, "13:1-13:1", $s$2], [16, "13:1-13:1", $s$2]]);
$M.moduleExports();