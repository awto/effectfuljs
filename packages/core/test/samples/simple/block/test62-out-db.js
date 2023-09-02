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
    i: [1, "1:11-1:12"],
    j: [2, "2:6-2:7"],
    k: [3, "3:4-3:5"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-12:0", 160, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-11:1", $s$1], [16, "12:0-12:0", $s$1], [16, "12:0-12:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, ["i"], 2, 4, "1:0-11:1", 128, function ($, $l, $p) {
    var $2, $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[3] = 0;
        $.goto = 1;
        ($x.call = eff)($l[1]);
        $.state = 1;
      case 1:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 2;
        ($x.call = eff)($1, $l[2] = 1);
        $.state = 2;
      case 2:
        $1 = $l[2];
        $l[2] = $1 + 1;
        $2 = $l[3];
        $l[3] = $2 + 1;
        $.goto = 3;
        ($x.call = eff)($1, $2);
        $.state = 3;
      case 3:
        $.goto = 4;
        ($x.call = eff)($l[1]);
        $.state = 4;
      case 4:
        $.goto = 5;
        ($x.call = eff)($l[2] = 3);
        $.state = 5;
      case 5:
        $.goto = 6;
        ($x.call = eff)($l[2]);
        $.state = 6;
      case 6:
        $.goto = 8;
        ($x.call = eff)($l[1]);
        continue;
      case 7:
        $.goto = 8;
        return $unhandled($.error);
      case 8:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "4:2-4:8", $s$2], [2, "5:2-5:19", $s$2], [2, "6:2-6:15", $s$2], [2, "7:2-7:8", $s$2], [2, "8:2-8:14", $s$2], [2, "9:2-9:8", $s$2], [2, "10:2-10:8", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]);
$M.moduleExports();