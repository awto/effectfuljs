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
    a: [1, "1:9-1:10"]
  }, null, 0],
  $s$2 = [{
    i: [1, "2:6-2:7"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-17:0", 160, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-16:1", $s$1], [16, "17:0-17:0", $s$1], [16, "17:0-17:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-16:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = 0;
        $.goto = 1;
        ($x.call = eff)();
        $.state = 1;
      case 1:
        $l[1] = $l[1] + 1;
        switch ($l[1] = $l[1] + 2) {
          case 1:
            $.goto = 4;
            ($x.call = effB)($l[1] = $l[1] + 3);
            continue;
          case 2:
            $.state = 2;
            break;
          case 3:
            $.goto = 3;
            continue;
          default:
            $.goto = 4;
            continue;
        }
      case 2:
        $.goto = 4;
        ($x.call = effB)($l[1]);
        continue;
      case 3:
        $.goto = 4;
        $mcall("log", console, "hi", $l[1]);
        $.state = 4;
      case 4:
        $.goto = 6;
        ($x.call = eff)($l[1]);
        continue;
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "3:2-3:7", $s$2], [2, "7:6-7:20", $s$2], [2, "10:6-10:13", $s$2], [2, "13:6-13:26", $s$2], [2, "15:2-15:8", $s$2], [16, "16:1-16:1", $s$2], [16, "16:1-16:1", $s$2]]);
$M.moduleExports();