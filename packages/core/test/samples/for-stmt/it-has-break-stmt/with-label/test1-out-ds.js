"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $raise = $M.raise,
  $brk = $M.brk,
  $get = $M.get,
  $lset = $M.lset,
  $gset = $M.gset,
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
  $s$3 = [{}, $s$2, 2],
  $s$4 = [{}, $s$3, 3],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-17:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $m$1($);
        $.goto = 3;
        continue;
      case 2:
        $.goto = 3;
        return $unhandled($.error);
      case 3:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 0, [[4, "1:0-16:3", $s$1], [0, null, $s$1], [16, "17:0-17:0", $s$1], [16, "17:0-17:0", $s$1]]),
  $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 6, "1:1-16:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $brk();
        $.state = 2;
      case 2:
        $lset($l, 4, [1, 2, 3]);
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $l = $.$ = [$l, void 0];
        $.state = 5;
      case 5:
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        $lset($l[0], 1, 0);
        $.state = 7;
      case 7:
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        if ($l[0][1] < 3) {
          $.state = 9;
        } else {
          $.goto = 41;
          continue;
        }
      case 9:
        $.goto = 10;
        $brk();
        $.state = 10;
      case 10:
        $.goto = 11;
        ($x.call = eff)($l[0][1]);
        $.state = 11;
      case 11:
        $.goto = 12;
        $brk();
        $.state = 12;
      case 12:
        $l = $.$ = [$l];
        $.state = 13;
      case 13:
        $.goto = 14;
        $brk();
        $.state = 14;
      case 14:
        $lset($l[0][0], 2, 0);
        $.goto = 15;
        $p = ($x.call = $get, $l[0][0][4].length);
        $.state = 15;
      case 15:
        $lset($l[0][0], 3, $p);
        $.state = 16;
      case 16:
        $.goto = 17;
        $brk();
        $.state = 17;
      case 17:
        if ($l[0][0][2] < $l[0][0][3]) {
          $.state = 18;
        } else {
          $.goto = 31;
          continue;
        }
      case 18:
        $.goto = 19;
        $brk();
        $.state = 19;
      case 19:
        $.goto = 20;
        $p = ($x.call = $get, $l[0][0][4][$l[0][0][2]]);
        $.state = 20;
      case 20:
        $gset(global, "d", $p);
        $.goto = 21;
        $brk();
        $.state = 21;
      case 21:
        $.goto = 22;
        $p = ($x.call = eff)(d);
        $.state = 22;
      case 22:
        if ($p) {
          $.state = 23;
        } else {
          $.goto = 24;
          continue;
        }
      case 23:
        $.goto = 31;
        $brk();
        continue;
      case 24:
        $.goto = 25;
        $brk();
        $.state = 25;
      case 25:
        $.goto = 26;
        $p = ($x.call = eff)(2);
        $.state = 26;
      case 26:
        if ($p) {
          $.state = 27;
        } else {
          $.goto = 28;
          continue;
        }
      case 27:
        $l[0][1] = 43;
        $l[0][0][5] = 44;
        $.goto = 33;
        $brk();
        continue;
      case 28:
        $.goto = 29;
        $brk();
        $.state = 29;
      case 29:
        $l = $.$ = [$l[0]];
        $.goto = 30;
        $brk();
        $.state = 30;
      case 30:
        $lset($l[0][0], 2, $l[0][0][2] + 1);
        $.goto = 16;
        continue;
      case 31:
        $l[0][1] = 34;
        $.goto = 33;
        continue;
      case 32:
        return $raise($.error);
      case 33:
        $l = $.$ = $l[0];
        $.goto = $l[1];
        continue;
      case 34:
        $.goto = 35;
        $brk();
        $.state = 35;
      case 35:
        $.goto = 36;
        ($x.call = eff)(3);
        $.state = 36;
      case 36:
        $.goto = 37;
        $brk();
        $.state = 37;
      case 37:
        $.goto = 38;
        ($x.call = eff)(4);
        $.state = 38;
      case 38:
        $.goto = 39;
        $brk();
        $.state = 39;
      case 39:
        $l = $.$ = [$l[0], void 0];
        $.goto = 40;
        $brk();
        $.state = 40;
      case 40:
        $lset($l[0], 1, $l[0][1] + 1);
        $.goto = 7;
        continue;
      case 41:
        $l[0][5] = 44;
        $.goto = 43;
        continue;
      case 42:
        return $raise($.error);
      case 43:
        $l = $.$ = $l[0];
        $.goto = $l[5];
        continue;
      case 44:
        $.goto = 45;
        $brk();
        $.state = 45;
      case 45:
        $.goto = 46;
        ($x.call = eff)(5);
        $.state = 46;
      case 46:
        $.goto = 47;
        $brk();
        $.state = 47;
      case 47:
        $.goto = 48;
        ($x.call = eff)(6);
        $.state = 48;
      case 48:
        $.goto = 50;
        $brk();
        continue;
      case 49:
        $.goto = 50;
        return $unhandled($.error);
      case 50:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, function ($, $l) {
    switch ($.state) {
      case 41:
      case 40:
      case 39:
      case 38:
      case 37:
      case 36:
      case 35:
      case 34:
      case 33:
      case 32:
      case 12:
      case 11:
      case 10:
      case 9:
      case 8:
      case 7:
      case 6:
      case 5:
        $.goto = 43;
        $l[0][5] = 42;
        break;
      case 31:
      case 30:
      case 29:
      case 28:
      case 27:
      case 26:
      case 25:
      case 24:
      case 23:
      case 22:
      case 21:
      case 20:
      case 19:
      case 18:
      case 17:
      case 16:
      case 15:
      case 14:
      case 13:
        $.goto = 33;
        $l[0][1] = 32;
        break;
      default:
        $.goto = 49;
    }
  }, function ($, $l) {
    switch ($.state) {
      case 41:
      case 40:
      case 39:
      case 38:
      case 37:
      case 36:
      case 35:
      case 34:
      case 33:
      case 32:
      case 12:
      case 11:
      case 10:
      case 9:
      case 8:
      case 7:
      case 6:
      case 5:
        $l[0][5] = 50;
        $.goto = 43;
        break;
      case 31:
      case 30:
      case 29:
      case 28:
      case 27:
      case 26:
      case 25:
      case 24:
      case 23:
      case 22:
      case 21:
      case 20:
      case 19:
      case 18:
      case 17:
      case 16:
      case 15:
      case 14:
      case 13:
        $l[0][1] = 43;
        $l[0][0][5] = 50;
        $.goto = 33;
        break;
      default:
        $.goto = 50;
        break;
    }
  }, 1, [[4, "2:2-2:21", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-13:3", $s$2], [4, "4:7-13:3", $s$2], [0, null, $s$2], [4, "4:12-4:17", $s$3], [0, "4:12-4:17", $s$3], [4, "4:19-4:24", $s$3], [0, null, $s$3], [4, "5:4-5:11", $s$3], [2, "5:4-5:10", $s$3], [4, "6:4-10:5", $s$3], [0, null, $s$3], [4, "6:9-6:32", $s$4], [2, "6:22-6:32", $s$4], [0, "6:16-6:32", $s$4], [4, "6:34-6:41", $s$4], [0, null, $s$4], [4, "7:6-7:17", $s$4], [2, "7:10-7:16", $s$4], [4, "8:6-8:24", $s$4], [2, "8:10-8:16", $s$4], [0, null, $s$4], [4, "8:18-8:24", $s$4], [4, "9:6-9:28", $s$4], [2, "9:10-9:16", $s$4], [0, null, $s$4], [4, "9:18-9:28", $s$4], [36, "10:5-10:5", $s$4], [4, "6:43-6:46", $s$4], [0, "6:43-6:46", $s$4], [0, null, $s$4], [0, null, $s$3], [0, null, $s$3], [4, "11:4-11:11", $s$3], [2, "11:4-11:10", $s$3], [4, "12:4-12:11", $s$3], [2, "12:4-12:10", $s$3], [36, "13:3-13:3", $s$3], [4, "4:26-4:29", $s$3], [0, "4:26-4:29", $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [4, "14:2-14:9", $s$2], [2, "14:2-14:8", $s$2], [4, "15:2-15:9", $s$2], [2, "15:2-15:8", $s$2], [36, "16:1-16:1", $s$2], [16, "16:1-16:1", $s$2], [16, "16:1-16:1", $s$2]]);
$M.moduleExports();