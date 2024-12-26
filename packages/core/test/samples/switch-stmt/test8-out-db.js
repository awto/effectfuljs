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
    a: [1, "2:9-2:10"]
  }, null, 0],
  $s$2 = [{
    i: [1, "3:6-3:7"]
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
  }, null, null, 0, [[0, "2:0-16:1", $s$1], [16, "17:0-17:0", $s$1], [16, "17:0-17:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "2:0-16:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = 0;
        $.goto = 1;
        ($x.call = eff)();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.call = eff)($l[1] = $l[1] + 1);
        $.state = 2;
      case 2:
        $l[2] = $p;
        $.goto = 3;
        $p = ($x.call = check)($l[1] = $l[1] + 2);
        $.state = 3;
      case 3:
        if ($l[2] === $p) {
          $.goto = 8;
          ($x.call = effB)($l[1] = $l[1] + 3);
          continue;
        } else {
          $.goto = 4;
          $p = ($x.call = check)($l[1] = $l[1] + 4);
          $.state = 4;
        }
      case 4:
        if ($l[2] === $p) {
          $.state = 5;
        } else {
          $.goto = 6;
          $p = ($x.call = check)($l[1] = $l[1] + 6);
          continue;
        }
      case 5:
        $.goto = 8;
        ($x.call = effB)($l[1] = $l[1] + 5);
        continue;
      case 6:
        if ($l[2] === $p) {
          $.state = 7;
        } else {
          $.goto = 8;
          continue;
        }
      case 7:
        $.goto = 8;
        $mcall("log", console, "hi", $l[1]);
        $.state = 8;
      case 8:
        $.goto = 10;
        ($x.call = eff)($l[1]);
        continue;
      case 9:
        $.goto = 10;
        return $unhandled($.error);
      case 10:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "4:2-4:7", $s$2], [2, "5:10-5:23", $s$2], [2, "6:9-6:24", $s$2], [2, "7:6-7:20", $s$2], [2, "12:9-12:24", $s$2], [2, "10:6-10:20", $s$2], [0, null, $s$2], [2, "13:6-13:26", $s$2], [2, "15:2-15:8", $s$2], [16, "16:1-16:1", $s$2], [16, "16:1-16:1", $s$2]]);
$M.moduleExports();