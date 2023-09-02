var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a2: [1, "1:9-1:11"]
  }, null, 0],
  $s$2 = [{
    i: [1, "2:6-2:7"],
    c: [2, "3:11-3:12"]
  }, $s$1, 1],
  $s$3 = [{
    m: [1, "4:8-4:9"],
    b: [2, "5:13-5:14"]
  }, $s$2, 2],
  $s$4 = [{
    j: [1, "5:15-5:16"],
    k: [2, "6:10-6:11"]
  }, $s$3, 3],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-14:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-13:1", $s$1], [16, "14:0-14:0", $s$1], [16, "14:0-14:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a2", null, $m$0, [], 0, 3, "1:0-13:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2] = $m$2($);
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $l[1] = 0;
        $.goto = 2;
        $brk();
        $.state = 2;
      case 2:
        $.goto = 3;
        $p = ($x.call = eff_2)();
        $.state = 3;
      case 3:
        $.result = $p;
        $.goto = 5;
        continue;
      case 4:
        $.goto = 5;
        return $unhandled($.error);
      case 5:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "2:2-2:12", $s$2], [4, "12:2-12:17", $s$2], [2, "12:9-12:16", $s$2], [0, null, $s$2], [16, "13:1-13:1", $s$2], [16, "13:1-13:1", $s$2]]),
  $m$2 = $M.fun("m$2", "c", null, $m$1, [], 0, 3, "3:2-11:3", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2] = $m$3($);
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $l[1] = 0;
        $.goto = 2;
        $brk();
        $.state = 2;
      case 2:
        $l[0][1] = $l[0][1] + 1;
        $.goto = 4;
        $brk();
        continue;
      case 3:
        $.goto = 4;
        return $unhandled($.error);
      case 4:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[4, "4:4-4:14", $s$3], [4, "10:4-10:8", $s$3], [36, "11:3-11:3", $s$3], [16, "11:3-11:3", $s$3], [16, "11:3-11:3", $s$3]]),
  $m$3 = $M.fun("m$3", "b", null, $m$2, ["j"], 0, 3, "5:4-9:5", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $l[2] = $l[1] + $l[0][0][1];
        $.goto = 2;
        $brk();
        $.state = 2;
      case 2:
        $l[0][0][1] = $l[0][0][1] + $l[0][1];
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = ($x.call = eff_1)();
        $.state = 4;
      case 4:
        $.result = $p;
        $.goto = 6;
        continue;
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 3, [[4, "6:6-6:20", $s$4], [4, "7:6-7:13", $s$4], [4, "8:6-8:21", $s$4], [2, "8:13-8:20", $s$4], [0, null, $s$4], [16, "9:5-9:5", $s$4], [16, "9:5-9:5", $s$4]]);
$M.moduleExports();