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
    tuza: [1, "1:9-1:13"]
  }, null, 0],
  $s$2 = [{
    av: [1, "2:6-2:8"],
    tuzb: [2, "4:11-4:15"]
  }, $s$1, 1],
  $s$3 = [{
    b: [1, "5:8-5:9"],
    mv: [2, "6:6-6:8"],
    v: [3, "12:10-12:11"]
  }, $s$2, 2],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-24:0", 160, function ($, $l, $p) {
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
  }, null, null, 0, [[0, "1:0-23:1", $s$1], [16, "24:0-24:0", $s$1], [16, "24:0-24:0", $s$1]]),
  $m$1 = $M.fun("m$1", "tuza", null, $m$0, [], 0, 3, "1:0-23:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2] = $m$2($);
        $l[1] = 1;
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
  }, null, null, 1, [[0, "4:2-22:3", $s$2], [16, "23:1-23:1", $s$2], [16, "23:1-23:1", $s$2]]),
  $m$2 = $M.fun("m$2", "tuzb", null, $m$1, [], 3, 6, "4:2-22:3", 128, function ($, $l, $p) {
    var $3, $2, $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = 2;
        $l[2] = 3;
        $.goto = 1;
        $p = ($x.call = $l[1])();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = che)($l[0][1] = $p);
        $.state = 2;
      case 2:
        $.goto = 3;
        ($x.call = me)();
        $.state = 3;
      case 3:
        $1 = c.b;
        $2 = $1.a;
        $1.a = $2 + 1;
        $1 = $l[1].a.d;
        $l[3] = $1[$2] = $1[$2] - 1;
        c = $l[3];
        $.goto = 4;
        ($x.call = be)();
        $.state = 4;
      case 4:
        if (process === 1000) {
          $.goto = 9;
          $p = ($x.call = c_fun)("a");
          continue;
        } else {
          $l[4] = 2;
          $.state = 5;
        }
      case 5:
        c = $l[4];
        $2 = $l[0][1].m;
        $1 = $l[1].a;
        $3 = $1[$2];
        $1[$2] = $3 + 1;
        if ($3) {
          delete $l[1][$l[0][1]];
          $.state = 6;
        } else {
          $.state = 6;
        }
      case 6:
        $.goto = 7;
        $p = ($x.call = $l[1])();
        $.state = 7;
      case 7:
        $l[4] = $p;
        $.goto = 8;
        $p = ($x.call = $l[0][1])();
        $.state = 8;
      case 8:
        delete $l[4][$p + delete $l[0][1].z[2 + 2]];
        $.goto = 16;
        continue;
      case 9:
        $.goto = 10;
        $p = $mcall($p, process, "b");
        $.state = 10;
      case 10:
        $l[4] = $p;
        $.goto = 11;
        $p = ($x.call = d_fun)("c");
        $.state = 11;
      case 11:
        $l[5] = $p;
        $.goto = 12;
        $p = new ($x.call = process.D)("e");
        $.state = 12;
      case 12:
        $.goto = 13;
        $p = ($x.call = $l[4])($l[5], "d", $p);
        $.state = 13;
      case 13:
        $.goto = 14;
        $p = ($x.call = a_fun)($p);
        $.state = 14;
      case 14:
        $l[4] = $p;
        $.goto = 5;
        continue;
      case 15:
        $.goto = 16;
        return $unhandled($.error);
      case 16:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[2, "7:14-7:17", $s$3], [2, "7:4-7:19", $s$3], [2, "11:4-11:8", $s$3], [2, "14:4-14:8", $s$3], [2, "17:24-17:34", $s$3], [0, "15:4-18:11", $s$3], [2, "21:11-21:14", $s$3], [2, "21:15-21:19", $s$3], [0, "21:4-21:41", $s$3], [2, "17:16-17:40", $s$3], [2, "17:41-17:51", $s$3], [2, "17:58-17:76", $s$3], [2, "17:16-17:77", $s$3], [2, "17:10-17:78", $s$3], [0, null, $s$3], [16, "22:3-22:3", $s$3], [16, "22:3-22:3", $s$3]]);
$M.moduleExports();