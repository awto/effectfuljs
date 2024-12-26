"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "1:9-1:10"]
  }, null, 0],
  $s$2 = [{
    i: [1, "2:6-2:7"],
    j: [2, "3:4-3:5"],
    b: [3, "4:11-4:12"]
  }, $s$1, 1],
  $s$3 = [{
    i: [1, "4:13-4:14"]
  }, $s$2, 2],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-15:0", 160, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-14:1", $s$1], [16, "15:0-15:0", $s$1], [16, "15:0-15:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 4, "1:0-14:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[3] = $m$2($);
        $l[1] = 0;
        $l[2] = 0;
        $.goto = 1;
        ($x.call = eff3)($l[1], $l[2]);
        $.state = 1;
      case 1:
        $l[1] = $l[1] + 1;
        $l[2] = $l[2] - 1;
        $.goto = 2;
        ($x.call = $l[3])($l[1]);
        $.state = 2;
      case 2:
        $l[1] = $l[1] - 1;
        $l[2] = $l[2] + 1;
        $.goto = 4;
        ($x.call = eff4)($l[1], $l[2]);
        continue;
      case 3:
        $.goto = 4;
        return $unhandled($.error);
      case 4:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "9:2-9:12", $s$2], [2, "11:2-11:6", $s$2], [2, "13:2-13:12", $s$2], [16, "14:1-14:1", $s$2], [16, "14:1-14:1", $s$2]]),
  $m$2 = $M.fun("m$2", "b", null, $m$1, ["i"], 0, 2, "4:2-8:3", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($x.call = eff1)($l[1], $l[0][2]);
        $.state = 1;
      case 1:
        $l[1] = $l[1] + 1;
        $l[0][2] = $l[0][2] + 1;
        $.goto = 3;
        ($x.call = eff2)($l[1], $l[0][2]);
        continue;
      case 2:
        $.goto = 3;
        return $unhandled($.error);
      case 3:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[2, "5:4-5:14", $s$3], [2, "7:4-7:14", $s$3], [16, "8:3-8:3", $s$3], [16, "8:3-8:3", $s$3]]);
$M.moduleExports();