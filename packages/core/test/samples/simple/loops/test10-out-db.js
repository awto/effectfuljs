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
  $s$2 = [{}, $s$1, 1],
  $s$3 = [{
    i: [1, "2:16-2:17"]
  }, $s$2, 1],
  $s$4 = [{
    j: [2, "3:13-3:14"]
  }, $s$3, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-7:0", 160, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-6:1", $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-6:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($x.call = init)();
        $.state = 1;
      case 1:
        $l[1] = $p;
        $.state = 2;
      case 2:
        $.goto = 3;
        $p = ($x.call = check)();
        $.state = 3;
      case 3:
        if ($p === true) {
          $.goto = 4;
          $p = ($x.call = initJ)();
          $.state = 4;
        } else {
          $.goto = 10;
          continue;
        }
      case 4:
        $l[2] = $p;
        $.state = 5;
      case 5:
        $.goto = 6;
        $p = ($x.call = checkJ)();
        $.state = 6;
      case 6:
        if ($p === true) {
          if ($l[1] === $l[2]) {
            $.goto = 8;
            continue;
          } else {
            $.state = 7;
          }
        } else {
          $.state = 7;
        }
      case 7:
        $.goto = 2;
        ($x.call = upd)();
        continue;
      case 8:
        $.goto = 5;
        ($x.call = updJ)();
        continue;
      case 9:
        $.goto = 10;
        return $unhandled($.error);
      case 10:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "2:20-2:26", $s$3], [0, "2:16-2:26", $s$3], [2, "2:28-2:35", $s$3], [2, "3:17-3:24", $s$4], [0, "3:13-3:24", $s$4], [2, "3:26-3:34", $s$4], [0, null, $s$2], [2, "2:46-2:51", $s$3], [2, "3:45-3:51", $s$4], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]);
$M.moduleExports();