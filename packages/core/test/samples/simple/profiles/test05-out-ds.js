var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
  $lset = $M.lset,
  $mcall = $M.mcall,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "1:9-1:10"]
  }, null, 0],
  $s$2 = [{
    a: [1, "5:11-5:12"],
    b: [2, "13:11-13:12"]
  }, $s$1, 1],
  $s$3 = [{}, $s$2, 2],
  $s$4 = [{}, $s$2, 2],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-20:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-19:1", $s$1], [16, "20:0-20:0", $s$1], [16, "20:0-20:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-19:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $lset($l, 1, $m$2($));
        $lset($l, 2, $m$3($));
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $mcall("profile", M, "defaultFull");
        $.state = 2;
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        ($x.call = p1)();
        $.state = 4;
      case 4:
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $.goto = 6;
        ($x.call = p2)();
        $.state = 6;
      case 6:
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        $.goto = 8;
        $mcall("profile", M, "defaultMinimal");
        $.state = 8;
      case 8:
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        $.goto = 10;
        ($x.call = p2)();
        $.state = 10;
      case 10:
        $.goto = 11;
        $brk();
        $.state = 11;
      case 11:
        $.goto = 12;
        ($x.call = p3)();
        $.state = 12;
      case 12:
        $.goto = 14;
        $brk();
        continue;
      case 13:
        $.goto = 14;
        return $unhandled($.error);
      case 14:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "2:2-2:27", $s$2], [2, "2:2-2:26", $s$2], [4, "3:2-3:7", $s$2], [2, "3:2-3:6", $s$2], [4, "4:2-4:7", $s$2], [2, "4:2-4:6", $s$2], [4, "10:2-10:30", $s$2], [2, "10:2-10:29", $s$2], [4, "11:2-11:7", $s$2], [2, "11:2-11:6", $s$2], [4, "12:2-12:7", $s$2], [2, "12:2-12:6", $s$2], [36, "19:1-19:1", $s$2], [16, "19:1-19:1", $s$2], [16, "19:1-19:1", $s$2]]),
  $m$2 = $M.fun("m$2", "a", null, $m$1, [], 0, 1, "5:2-9:3", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $mcall("log", console, "hi");
        $.state = 2;
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        ($x.call = e1)();
        $.state = 4;
      case 4:
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $.goto = 6;
        ($x.call = e2)();
        $.state = 6;
      case 6:
        $.goto = 8;
        $brk();
        continue;
      case 7:
        $.goto = 8;
        return $unhandled($.error);
      case 8:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[4, "6:4-6:22", $s$3], [2, "6:4-6:21", $s$3], [4, "7:4-7:9", $s$3], [2, "7:4-7:8", $s$3], [4, "8:4-8:9", $s$3], [2, "8:4-8:8", $s$3], [36, "9:3-9:3", $s$3], [16, "9:3-9:3", $s$3], [16, "9:3-9:3", $s$3]]),
  $m$3 = $M.fun("m$3", "b", null, $m$1, [], 0, 1, "13:2-18:3", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = p4)();
        $.state = 2;
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        ($x.call = p5)();
        $.state = 4;
      case 4:
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $.goto = 6;
        $p = ($x.call = e1)();
        $.state = 6;
      case 6:
        $.goto = 7;
        ($x.call = M)($p);
        $.state = 7;
      case 7:
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        $.goto = 9;
        $p = ($x.call = e)(2);
        $.state = 9;
      case 9:
        $.goto = 10;
        ($x.call = M)($p);
        $.state = 10;
      case 10:
        $.goto = 12;
        $brk();
        continue;
      case 11:
        $.goto = 12;
        return $unhandled($.error);
      case 12:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[4, "14:4-14:9", $s$4], [2, "14:4-14:8", $s$4], [4, "15:4-15:9", $s$4], [2, "15:4-15:8", $s$4], [4, "16:4-16:12", $s$4], [2, "16:6-16:10", $s$4], [2, "16:4-16:11", $s$4], [4, "17:4-17:12", $s$4], [2, "17:6-17:10", $s$4], [2, "17:4-17:11", $s$4], [36, "18:3-18:3", $s$4], [16, "18:3-18:3", $s$4], [16, "18:3-18:3", $s$4]]);
$M.moduleExports();