"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $mcall = $M.mcall,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    e: [1, "1:9-1:10"]
  }, null, 0],
  $s$2 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-6:0", 160, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-5:1", $s$1], [16, "6:0-6:0", $s$1], [16, "6:0-6:0", $s$1]]),
  $m$1 = $M.fun("m$1", "e", null, $m$0, [], 0, 1, "1:0-5:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $mcall("option", M, {
          coerce: true
        });
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = eff1)();
        $.state = 2;
      case 2:
        $.goto = 4;
        ($x.call = eff2)();
        continue;
      case 3:
        $.goto = 4;
        return $unhandled($.error);
      case 4:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "2:2-2:28", $s$2], [2, "3:2-3:8", $s$2], [2, "4:2-4:8", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]);
$M.moduleExports();