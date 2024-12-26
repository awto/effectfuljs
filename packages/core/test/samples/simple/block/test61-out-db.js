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
    i: [1, "2:6-2:7"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-14:0", 160, function ($, $l, $p) {
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
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 2, "1:0-13:1", 128, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = 0;
        $.goto = 1;
        ($x.call = eff1)($l[1]);
        $.state = 1;
      case 1:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 2;
        ($x.call = eff2)($1);
        $.state = 2;
      case 2:
        if ($l[1]) {
          $l[1] = $l[1] + 1;
          $.goto = 4;
          continue;
        } else {
          $.state = 3;
        }
      case 3:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 4;
        ($x.call = eff3)($1);
        $.state = 4;
      case 4:
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 6;
        ($x.call = eff4)($1);
        continue;
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "3:2-3:9", $s$2], [2, "5:4-5:13", $s$2], [0, null, $s$2], [2, "10:4-10:13", $s$2], [2, "12:2-12:11", $s$2], [16, "13:1-13:1", $s$2], [16, "13:1-13:1", $s$2]]);
$M.moduleExports();