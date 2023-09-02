var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "30:9-30:10"]
  }, null, 0],
  $s$2 = [{}, $s$1, 1],
  $s$3 = [{}, $s$1, 1],
  $s$4 = [{}, $s$1, 1],
  $s$5 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-35:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = $m$4($);
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $m$1($);
        $.goto = 2;
        $brk();
        $.state = 2;
      case 2:
        $m$2($);
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $m$3($);
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
  }, null, null, 0, [[4, "1:0-9:3", $s$1], [4, "10:0-20:3", $s$1], [4, "21:0-29:3", $s$1], [0, null, $s$1], [16, "35:0-35:0", $s$1], [16, "35:0-35:0", $s$1]]),
  $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 1, "1:1-9:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = eff)(1);
        $.state = 2;
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $.goto = 5;
        $p = ($x.call = eff)(2);
        $.state = 5;
      case 5:
        if ($p) {
          $.state = 6;
        } else {
          $.goto = 12;
          continue;
        }
      case 6:
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        $.goto = 9;
        ($x.call = eff)(4);
        $.state = 9;
      case 9:
        $.goto = 10;
        $brk();
        $.state = 10;
      case 10:
        $.goto = 11;
        ($x.call = eff)(5);
        $.state = 11;
      case 11:
        $.goto = 16;
        $brk();
        continue;
      case 12:
        $.goto = 13;
        $brk();
        $.state = 13;
      case 13:
        $.goto = 14;
        ($x.call = eff)(3);
        $.state = 14;
      case 14:
        $.goto = 7;
        $brk();
        continue;
      case 15:
        $.goto = 16;
        return $unhandled($.error);
      case 16:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "2:2-2:9", $s$2], [2, "2:2-2:8", $s$2], [4, "3:2-6:3", $s$2], [4, "4:4-5:16", $s$2], [2, "4:8-4:14", $s$2], [0, null, $s$2], [4, "4:16-4:26", $s$2], [4, "7:2-7:9", $s$2], [2, "7:2-7:8", $s$2], [4, "8:2-8:9", $s$2], [2, "8:2-8:8", $s$2], [36, "9:1-9:1", $s$2], [4, "5:9-5:16", $s$2], [2, "5:9-5:15", $s$2], [36, "6:3-6:3", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]),
  $m$2 = $M.fun("m$2", null, null, $m$0, [], 0, 1, "10:1-20:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = eff)(1);
        $.state = 2;
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $.goto = 5;
        $p = ($x.call = eff)(2);
        $.state = 5;
      case 5:
        if ($p) {
          $.state = 6;
        } else {
          $.goto = 14;
          continue;
        }
      case 6:
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        $.goto = 8;
        ($x.call = eff)("a");
        $.state = 8;
      case 8:
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        $.goto = 10;
        $brk();
        $.state = 10;
      case 10:
        $.goto = 11;
        ($x.call = eff)(4);
        $.state = 11;
      case 11:
        $.goto = 12;
        $brk();
        $.state = 12;
      case 12:
        $.goto = 13;
        ($x.call = eff)(5);
        $.state = 13;
      case 13:
        $.goto = 18;
        $brk();
        continue;
      case 14:
        $.goto = 15;
        $brk();
        $.state = 15;
      case 15:
        $.goto = 16;
        ($x.call = eff)(3);
        $.state = 16;
      case 16:
        $.goto = 9;
        $brk();
        continue;
      case 17:
        $.goto = 18;
        return $unhandled($.error);
      case 18:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "11:2-11:9", $s$3], [2, "11:2-11:8", $s$3], [4, "12:2-17:3", $s$3], [4, "13:4-16:18", $s$3], [2, "13:8-13:14", $s$3], [0, null, $s$3], [4, "14:6-14:15", $s$3], [2, "14:6-14:14", $s$3], [4, "15:6-15:16", $s$3], [4, "18:2-18:9", $s$3], [2, "18:2-18:8", $s$3], [4, "19:2-19:9", $s$3], [2, "19:2-19:8", $s$3], [36, "20:1-20:1", $s$3], [4, "16:11-16:18", $s$3], [2, "16:11-16:17", $s$3], [36, "17:3-17:3", $s$3], [16, "20:1-20:1", $s$3], [16, "20:1-20:1", $s$3]]),
  $m$3 = $M.fun("m$3", null, null, $m$0, [], 0, 1, "21:1-29:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = eff)(1);
        $.state = 2;
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = ($x.call = eff)(2);
        $.state = 4;
      case 4:
        if ($p) {
          $.state = 5;
        } else {
          $.goto = 10;
          continue;
        }
      case 5:
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        $.goto = 7;
        ($x.call = eff)("a");
        $.state = 7;
      case 7:
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        $.goto = 9;
        $p = ($x.call = eff)("b");
        $.state = 9;
      case 9:
        $.result = $p;
        $.goto = 16;
        continue;
      case 10:
        $.goto = 11;
        $brk();
        $.state = 11;
      case 11:
        $.goto = 12;
        ($x.call = eff)(4);
        $.state = 12;
      case 12:
        $.goto = 13;
        $brk();
        $.state = 13;
      case 13:
        $.goto = 14;
        ($x.call = eff)(5);
        $.state = 14;
      case 14:
        $.goto = 16;
        $brk();
        continue;
      case 15:
        $.goto = 16;
        return $unhandled($.error);
      case 16:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "22:2-22:9", $s$4], [2, "22:2-22:8", $s$4], [4, "23:2-26:3", $s$4], [2, "23:6-23:12", $s$4], [0, null, $s$4], [4, "24:4-24:13", $s$4], [2, "24:4-24:12", $s$4], [4, "25:4-25:20", $s$4], [2, "25:11-25:19", $s$4], [0, null, $s$4], [4, "27:2-27:9", $s$4], [2, "27:2-27:8", $s$4], [4, "28:2-28:9", $s$4], [2, "28:2-28:8", $s$4], [36, "29:1-29:1", $s$4], [16, "29:1-29:1", $s$4], [16, "29:1-29:1", $s$4]]),
  $m$4 = $M.fun("m$4", "a", null, $m$0, [], 0, 1, "30:0-34:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        if (e) {
          $.state = 2;
        } else {
          $.goto = 5;
          continue;
        }
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = ($x.call = eff)("b");
        $.state = 4;
      case 4:
        $.result = $p;
        $.goto = 7;
        continue;
      case 5:
        $.goto = 7;
        $brk();
        continue;
      case 6:
        $.goto = 7;
        return $unhandled($.error);
      case 7:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "31:2-33:3", $s$5], [0, null, $s$5], [4, "32:4-32:20", $s$5], [2, "32:11-32:19", $s$5], [0, null, $s$5], [36, "34:1-34:1", $s$5], [16, "34:1-34:1", $s$5], [16, "34:1-34:1", $s$5]]);
$M.moduleExports();