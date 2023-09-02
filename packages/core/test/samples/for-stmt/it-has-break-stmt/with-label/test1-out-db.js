var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{}, null, 0],
  $s$2 = [{
    i: [1, "2:6-2:7"],
    j: [2, "2:9-2:10"],
    len: [3, "2:12-2:15"],
    ref: [4, "2:17-2:20"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-17:0", 160, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $m$1($);
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
  }, null, null, 0, [[0, null, $s$1], [16, "17:0-17:0", $s$1], [16, "17:0-17:0", $s$1]]),
  $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 5, "1:1-16:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[4] = [1, 2, 3];
        $l[1] = 0;
        $.state = 1;
      case 1:
        if ($l[1] < 3) {
          $.goto = 4;
          ($x.call = eff)($l[1]);
          continue;
        } else {
          $.state = 2;
        }
      case 2:
        $.goto = 3;
        ($x.call = eff)(5);
        $.state = 3;
      case 3:
        $.goto = 14;
        ($x.call = eff)(6);
        continue;
      case 4:
        $l[2] = 0;
        $l[3] = $l[4].length;
        $.state = 5;
      case 5:
        if ($l[2] < $l[3]) {
          d = $l[4][$l[2]];
          $.goto = 9;
          $p = ($x.call = eff)(d);
          continue;
        } else {
          $.state = 6;
        }
      case 6:
        $.goto = 7;
        ($x.call = eff)(3);
        $.state = 7;
      case 7:
        $.goto = 8;
        ($x.call = eff)(4);
        $.state = 8;
      case 8:
        $l[1] = $l[1] + 1;
        $.goto = 1;
        continue;
      case 9:
        if ($p) {
          $.goto = 6;
          continue;
        } else {
          $.state = 10;
        }
      case 10:
        $.goto = 11;
        $p = ($x.call = eff)(2);
        $.state = 11;
      case 11:
        if ($p) {
          $.goto = 2;
          continue;
        } else {
          $.state = 12;
        }
      case 12:
        $l[2] = $l[2] + 1;
        $.goto = 5;
        continue;
      case 13:
        $.goto = 14;
        return $unhandled($.error);
      case 14:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[0, "3:2-3:17", $s$2], [2, "5:4-5:10", $s$2], [2, "14:2-14:8", $s$2], [2, "15:2-15:8", $s$2], [0, "6:9-6:14", $s$2], [2, "8:10-8:16", $s$2], [2, "11:4-11:10", $s$2], [2, "12:4-12:10", $s$2], [0, "4:26-4:29", $s$2], [0, null, $s$2], [2, "9:10-9:16", $s$2], [0, null, $s$2], [0, "6:43-6:46", $s$2], [16, "16:1-16:1", $s$2], [16, "16:1-16:1", $s$2]]);
$M.moduleExports();