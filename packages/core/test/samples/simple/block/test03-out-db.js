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
    i: [1, "3:6-3:7"]
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
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-11:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($x.call = eff0)();
        $.state = 1;
      case 1:
        $l[1] = 0;
        $l[1] = $l[1] + 1;
        $.goto = 2;
        ($x.call = eff1)($l[1]);
        $.state = 2;
      case 2:
        if (t) {
          $.goto = 3;
          ($x.call = eff2)($l[1]);
          $.state = 3;
        } else {
          $.goto = 3;
          ($x.call = eff3)($l[1]);
          $.state = 3;
        }
      case 3:
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
  }, null, null, 1, [[2, "2:2-2:8", $s$2], [2, "5:2-5:9", $s$2], [2, "7:4-7:11", $s$2], [0, null, $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]);
$M.moduleExports();