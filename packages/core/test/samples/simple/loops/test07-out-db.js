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
    k: [3, "4:4-4:5"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-21:0", 160, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-20:1", $s$1], [16, "21:0-21:0", $s$1], [16, "21:0-21:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 4, "1:0-20:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = 0;
        $l[2] = 0;
        $l[3] = 0;
        $.goto = 1;
        ($x.call = eff)($l[1], $l[2], $l[3]);
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = eff1)($l[1]);
        $.state = 2;
      case 2:
        $l[3] = 10;
        $.goto = 3;
        ($x.call = eff2)();
        $.state = 3;
      case 3:
        $.goto = 3;
        ($x.call = eff4)($l[3], $l[2]);
        continue;
      case 4:
        $.goto = 5;
        return $unhandled($.error);
      case 5:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "5:2-5:14", $s$2], [2, "7:4-7:11", $s$2], [2, "10:6-10:12", $s$2], [2, "12:8-12:18", $s$2], [16, "20:1-20:1", $s$2], [16, "20:1-20:1", $s$2]]);
$M.moduleExports();