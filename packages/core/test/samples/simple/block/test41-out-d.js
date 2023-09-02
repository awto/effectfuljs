var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
  $mcall = $M.mcall,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "1:9-1:10"]
  }, null, 0],
  $s$2 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-29:0", 32, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-28:1", $s$1], [16, "29:0-29:0", $s$1], [16, "29:0-29:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-28:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = eff1)();
        $.state = 2;
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        if (a1) {
          $.state = 4;
        } else {
          $.goto = 7;
          continue;
        }
      case 4:
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $.goto = 6;
        ($x.call = eff2)();
        $.state = 6;
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
        $brk();
        $.state = 9;
      case 9:
        $.goto = 10;
        $mcall("option", M, {
          coerce: false
        });
        $.state = 10;
      case 10:
        $.goto = 11;
        $brk();
        $.state = 11;
      case 11:
        $.goto = 12;
        ($x.call = eff3)();
        $.state = 12;
      case 12:
        $.goto = 13;
        $brk();
        $.state = 13;
      case 13:
        if (a2) {
          $.state = 14;
        } else {
          $.goto = 17;
          continue;
        }
      case 14:
        $.goto = 15;
        $brk();
        $.state = 15;
      case 15:
        $.goto = 16;
        ($x.call = eff4)();
        $.state = 16;
      case 16:
        $.goto = 17;
        $brk();
        $.state = 17;
      case 17:
        $.goto = 18;
        $brk();
        $.state = 18;
      case 18:
        $.goto = 19;
        $brk();
        $.state = 19;
      case 19:
        $.goto = 20;
        $mcall("option", M, {
          coerce: true
        });
        $.state = 20;
      case 20:
        $.goto = 21;
        $brk();
        $.state = 21;
      case 21:
        $.goto = 22;
        ($x.call = eff5)();
        $.state = 22;
      case 22:
        $.goto = 23;
        $brk();
        $.state = 23;
      case 23:
        if (a3) {
          $.state = 24;
        } else {
          $.goto = 27;
          continue;
        }
      case 24:
        $.goto = 25;
        $brk();
        $.state = 25;
      case 25:
        $.goto = 26;
        ($x.call = eff6)();
        $.state = 26;
      case 26:
        $.goto = 27;
        $brk();
        $.state = 27;
      case 27:
        $.goto = 28;
        $brk();
        $.state = 28;
      case 28:
        $.goto = 29;
        $brk();
        $.state = 29;
      case 29:
        $.goto = 30;
        ($x.call = eff7)();
        $.state = 30;
      case 30:
        $.goto = 31;
        $brk();
        $.state = 31;
      case 31:
        if (a4) {
          $.state = 32;
        } else {
          $.goto = 35;
          continue;
        }
      case 32:
        $.goto = 33;
        $brk();
        $.state = 33;
      case 33:
        $.goto = 34;
        ($x.call = eff8)();
        $.state = 34;
      case 34:
        $.goto = 35;
        $brk();
        $.state = 35;
      case 35:
        $.goto = 36;
        $brk();
        $.state = 36;
      case 36:
        $.goto = 38;
        $brk();
        continue;
      case 37:
        $.goto = 38;
        return $unhandled($.error);
      case 38:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "3:4-3:11", $s$2], [2, "3:4-3:10", $s$2], [4, "4:4-6:5", $s$2], [0, null, $s$2], [4, "5:6-5:13", $s$2], [2, "5:6-5:12", $s$2], [36, "6:5-6:5", $s$2], [36, "7:3-7:3", $s$2], [4, "8:2-8:30", $s$2], [2, "8:2-8:29", $s$2], [4, "10:4-10:11", $s$2], [2, "10:4-10:10", $s$2], [4, "11:4-13:5", $s$2], [0, null, $s$2], [4, "12:6-12:13", $s$2], [2, "12:6-12:12", $s$2], [36, "13:5-13:5", $s$2], [36, "14:3-14:3", $s$2], [4, "16:4-16:31", $s$2], [2, "16:4-16:30", $s$2], [4, "17:4-17:11", $s$2], [2, "17:4-17:10", $s$2], [4, "18:4-20:5", $s$2], [0, null, $s$2], [4, "19:6-19:13", $s$2], [2, "19:6-19:12", $s$2], [36, "20:5-20:5", $s$2], [36, "21:3-21:3", $s$2], [4, "23:4-23:11", $s$2], [2, "23:4-23:10", $s$2], [4, "24:4-26:5", $s$2], [0, null, $s$2], [4, "25:6-25:13", $s$2], [2, "25:6-25:12", $s$2], [36, "26:5-26:5", $s$2], [36, "27:3-27:3", $s$2], [36, "28:1-28:1", $s$2], [16, "28:1-28:1", $s$2], [16, "28:1-28:1", $s$2]]);
$M.moduleExports();