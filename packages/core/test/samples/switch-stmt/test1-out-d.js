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
    a: [1, "1:9-1:10"],
    c: [2, "13:9-13:10"]
  }, null, 0],
  $s$2 = [{}, $s$1, 1],
  $s$3 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-28:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = $m$1($);
        $l[2] = $m$2($);
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
  }, null, null, 0, [[0, "1:0-11:1", $s$1], [16, "28:0-28:0", $s$1], [16, "28:0-28:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-11:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.call = eff)();
        $.state = 2;
      case 2:
        $l[1] = $p;
        $.goto = 3;
        $p = ($x.call = effC)(1);
        $.state = 3;
      case 3:
        if ($l[1] === $p) {
          $.state = 4;
        } else {
          $.goto = 8;
          continue;
        }
      case 4:
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $.goto = 6;
        ($x.call = effR)(1);
        $.state = 6;
      case 6:
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        $.goto = 15;
        $brk();
        continue;
      case 8:
        $.goto = 9;
        $p = ($x.call = effC)(2);
        $.state = 9;
      case 9:
        if ($l[1] === $p) {
          $.state = 10;
        } else {
          $.goto = 12;
          continue;
        }
      case 10:
        $.goto = 11;
        $brk();
        $.state = 11;
      case 11:
        $.goto = 12;
        ($x.call = effR)(2);
        $.state = 12;
      case 12:
        $.goto = 13;
        $brk();
        $.state = 13;
      case 13:
        $.goto = 7;
        ($x.call = effR)("default");
        continue;
      case 14:
        $.goto = 15;
        return $unhandled($.error);
      case 15:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "2:2-10:3", $s$2], [2, "2:10-2:15", $s$2], [2, "3:9-3:16", $s$2], [0, null, $s$2], [4, "4:6-4:14", $s$2], [2, "4:6-4:13", $s$2], [4, "5:6-5:12", $s$2], [36, "11:1-11:1", $s$2], [2, "6:9-6:16", $s$2], [0, null, $s$2], [4, "7:6-7:14", $s$2], [2, "7:6-7:13", $s$2], [4, "9:6-9:22", $s$2], [2, "9:6-9:21", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]),
  $m$2 = $M.fun("m$2", "c", null, $m$0, [], 0, 2, "13:0-27:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.call = eff)(1);
        $.state = 2;
      case 2:
        $l[1] = $p;
        $.goto = 3;
        $p = ($x.call = eff)(2);
        $.state = 3;
      case 3:
        if ($l[1] === $p) {
          $.state = 4;
        } else {
          $.goto = 10;
          continue;
        }
      case 4:
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $.goto = 6;
        ($x.call = eff)(3);
        $.state = 6;
      case 6:
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        $.goto = 8;
        ($x.call = eff)(5);
        $.state = 8;
      case 8:
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        $.goto = 21;
        $brk();
        continue;
      case 10:
        $.goto = 11;
        $p = ($x.call = eff)(4);
        $.state = 11;
      case 11:
        if ($l[1] === $p) {
          $.goto = 6;
          continue;
        } else {
          $.state = 12;
        }
      case 12:
        if ($l[1] === 6) {
          $.state = 13;
        } else {
          $.goto = 19;
          continue;
        }
      case 13:
        $.goto = 14;
        $brk();
        $.state = 14;
      case 14:
        $.goto = 15;
        ($x.call = eff)(7);
        $.state = 15;
      case 15:
        $.goto = 16;
        $brk();
        $.state = 16;
      case 16:
        $.goto = 17;
        $mcall("log", console, 9);
        $.state = 17;
      case 17:
        $.goto = 18;
        $brk();
        $.state = 18;
      case 18:
        $.goto = 9;
        ($x.call = eff)(10);
        continue;
      case 19:
        if ($l[1] === 8) {
          $.goto = 15;
          continue;
        } else {
          $.goto = 17;
          continue;
        }
      case 20:
        $.goto = 21;
        return $unhandled($.error);
      case 21:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "14:2-26:3", $s$3], [2, "14:10-14:16", $s$3], [2, "15:9-15:15", $s$3], [0, null, $s$3], [4, "16:6-16:13", $s$3], [2, "16:6-16:12", $s$3], [4, "18:6-18:13", $s$3], [2, "18:6-18:12", $s$3], [4, "19:6-19:12", $s$3], [36, "27:1-27:1", $s$3], [2, "17:9-17:15", $s$3], [0, null, $s$3], [0, null, $s$3], [4, "21:6-21:13", $s$3], [2, "21:6-21:12", $s$3], [4, "23:6-23:21", $s$3], [2, "23:6-23:20", $s$3], [4, "25:6-25:14", $s$3], [2, "25:6-25:13", $s$3], [0, null, $s$3], [16, "27:1-27:1", $s$3], [16, "27:1-27:1", $s$3]]);
$M.moduleExports();