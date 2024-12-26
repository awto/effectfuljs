"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{}, null, 0],
  $s$2 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-28:0", 160, function ($, $l, $p) {
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
  }, null, null, 0, [[0, null, $s$1], [16, "28:0-28:0", $s$1], [16, "28:0-28:0", $s$1]]),
  $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 1, "1:1-27:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($x.call = eff)(0);
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = eff)(1);
        $.state = 2;
      case 2:
        $.goto = 3;
        ($x.call = eff)(2);
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = ($x.call = eff)(3);
        $.state = 4;
      case 4:
        if ($p) {
          $.goto = 15;
          ($x.call = eff)(4);
          continue;
        } else {
          $.state = 5;
        }
      case 5:
        $.goto = 6;
        $p = ($x.call = eff)(3);
        $.state = 6;
      case 6:
        if ($p) {
          $.goto = 13;
          ($x.call = eff)(4);
          continue;
        } else {
          $.state = 7;
        }
      case 7:
        $.goto = 8;
        $p = ($x.call = eff)(5);
        $.state = 8;
      case 8:
        if ($p) {
          $.goto = 12;
          ($x.call = eff)(6);
          continue;
        } else {
          $.state = 9;
        }
      case 9:
        $.goto = 10;
        $p = ($x.call = eff)(7);
        $.state = 10;
      case 10:
        if ($p) {
          $.goto = 11;
          ($x.call = eff)(8);
          $.state = 11;
        } else {
          $.goto = 13;
          continue;
        }
      case 11:
        $.goto = 17;
        ($x.call = eff)(11);
        continue;
      case 12:
        if (true) {
          $.goto = 1;
          continue;
        } else {
          $.goto = 11;
          continue;
        }
      case 13:
        $.goto = 14;
        $p = ($x.call = eff)(9);
        $.state = 14;
      case 14:
        if ($p) {
          $.goto = 2;
          continue;
        } else {
          $.state = 15;
        }
      case 15:
        $.goto = 12;
        ($x.call = eff)(10);
        continue;
      case 16:
        $.goto = 17;
        return $unhandled($.error);
      case 17:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "2:2-2:8", $s$2], [2, "4:4-4:10", $s$2], [2, "6:6-6:12", $s$2], [2, "7:10-7:16", $s$2], [2, "8:8-8:14", $s$2], [2, "11:10-11:16", $s$2], [2, "12:8-12:14", $s$2], [2, "15:10-15:16", $s$2], [2, "16:8-16:14", $s$2], [2, "19:10-19:16", $s$2], [2, "20:8-20:14", $s$2], [2, "26:2-26:9", $s$2], [0, null, $s$2], [2, "23:13-23:19", $s$2], [0, null, $s$2], [2, "24:4-24:11", $s$2], [16, "27:1-27:1", $s$2], [16, "27:1-27:1", $s$2]]);
$M.moduleExports();