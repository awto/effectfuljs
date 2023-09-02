var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $mcall = $M.mcall,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "1:9-1:10"]
  }, null, 0],
  $s$2 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-13:0", 160, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-12:1", $s$1], [16, "13:0-13:0", $s$1], [16, "13:0-13:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-12:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $mcall("log", console, "hi");
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = e1)();
        $.state = 2;
      case 2:
        $.goto = 3;
        ($x.call = e2)();
        $.state = 3;
      case 3:
        $.goto = 4;
        $mcall("profile", M, "minimal");
        $.state = 4;
      case 4:
        $.goto = 5;
        ($x.call = p1)();
        $.state = 5;
      case 5:
        $.goto = 6;
        $mcall("profile", console, "minimal");
        $.state = 6;
      case 6:
        $.goto = 7;
        ($x.call = p2)();
        $.state = 7;
      case 7:
        $.goto = 8;
        $mcall("profileEnd", console);
        $.state = 8;
      case 8:
        $.goto = 9;
        $p = ($x.call = e1)();
        $.state = 9;
      case 9:
        $.goto = 10;
        ($x.call = M)($p);
        $.state = 10;
      case 10:
        $.goto = 11;
        $p = ($x.call = e)(2);
        $.state = 11;
      case 11:
        $.goto = 13;
        ($x.call = M)($p);
        continue;
      case 12:
        $.goto = 13;
        return $unhandled($.error);
      case 13:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "2:2-2:19", $s$2], [2, "3:2-3:6", $s$2], [2, "4:2-4:6", $s$2], [2, "5:2-5:22", $s$2], [2, "6:2-6:6", $s$2], [2, "7:2-7:28", $s$2], [2, "8:2-8:6", $s$2], [2, "9:2-9:22", $s$2], [2, "10:4-10:8", $s$2], [2, "10:2-10:9", $s$2], [2, "11:4-11:8", $s$2], [2, "11:2-11:9", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);
$M.moduleExports();