var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "2:9-2:10"]
  }, null, 0],
  $s$2 = [{
    k: [1, "6:8-6:9"],
    i: [2, "5:11-5:12"],
    j: [3, "5:23-5:24"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-11:0", 160, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "2:0-10:1", $s$1], [16, "11:0-11:0", $s$1], [16, "11:0-11:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 4, "2:0-10:1", 128, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($x.call = eff1)();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.call = eff2)();
        $.state = 2;
      case 2:
        $l[2] = $p;
        $.goto = 3;
        $p = ($x.call = eff3)();
        $.state = 3;
      case 3:
        $l[3] = $p;
        $.state = 4;
      case 4:
        $1 = $l[2] < 10;
        if ($1) {
          $1 = $l[3] > -10;
          $.state = 5;
        } else {
          $.state = 5;
        }
      case 5:
        if ($1) {
          $.goto = 6;
          $p = ($x.call = eff3)($l[2]);
          $.state = 6;
        } else {
          $.goto = 9;
          ($x.call = eff5)($l[2], $l[3]);
          continue;
        }
      case 6:
        $l[1] = $p;
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 7;
        ($x.call = eff4)($1);
        $.state = 7;
      case 7:
        $l[2] = $l[2] + 1;
        $l[3] = $l[3] - 1;
        $.goto = 4;
        continue;
      case 8:
        $.goto = 9;
        return $unhandled($.error);
      case 9:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "3:2-3:8", $s$2], [2, "5:15-5:21", $s$2], [2, "5:27-5:33", $s$2], [0, "5:23-5:33", $s$2], [0, "5:35-5:41", $s$2], [2, "6:12-6:19", $s$2], [2, "7:4-7:13", $s$2], [0, "5:54-5:57", $s$2], [16, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2]]);
$M.moduleExports();