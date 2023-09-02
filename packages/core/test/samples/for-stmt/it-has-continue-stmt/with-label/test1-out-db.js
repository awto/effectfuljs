var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    f1: [1, "1:9-1:11"],
    f2: [2, "14:9-14:11"],
    f3: [3, "26:9-26:11"],
    f4: [4, "40:9-40:11"],
    f5: [5, "51:9-51:11"]
  }, null, 0],
  $s$2 = [{
    i: [1, "2:6-2:7"],
    j: [2, "2:9-2:10"],
    len: [3, "2:12-2:15"],
    ref: [4, "2:17-2:20"]
  }, $s$1, 1],
  $s$3 = [{
    i: [1, "15:6-15:7"],
    j: [2, "15:9-15:10"],
    len: [3, "15:12-15:15"],
    ref: [4, "15:17-15:20"]
  }, $s$1, 1],
  $s$4 = [{
    i: [1, "27:6-27:7"],
    j: [2, "27:9-27:10"],
    len: [3, "27:12-27:15"],
    ref: [4, "27:17-27:20"]
  }, $s$1, 1],
  $s$5 = [{
    i: [1, "41:6-41:7"],
    j: [2, "41:9-41:10"],
    len: [3, "41:12-41:15"],
    ref: [4, "41:17-41:20"]
  }, $s$1, 1],
  $s$6 = [{
    j: [1, "52:6-52:7"],
    len: [2, "52:9-52:12"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 6, "1:0-60:0", 160, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = $m$1($);
        $l[2] = $m$2($);
        $l[3] = $m$3($);
        $l[4] = $m$4($);
        $l[5] = $m$5($);
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
  }, null, null, 0, [[0, "1:0-12:1", $s$1], [16, "60:0-60:0", $s$1], [16, "60:0-60:0", $s$1]]),
  $m$1 = $M.fun("m$1", "f1", null, $m$0, [], 0, 5, "1:0-12:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[4] = [1, 2, 3];
        $l[1] = 0;
        $.state = 1;
      case 1:
        if ($l[1] < 3) {
          $.goto = 2;
          ($x.call = eff)($l[1]);
          $.state = 2;
        } else {
          $.goto = 9;
          continue;
        }
      case 2:
        $l[2] = 0;
        $l[3] = $l[4].length;
        $.state = 3;
      case 3:
        if ($l[2] < $l[3]) {
          d = $l[4][$l[2]];
          $.goto = 5;
          $p = ($x.call = eff)(d);
          continue;
        } else {
          $.state = 4;
        }
      case 4:
        $l[1] = $l[1] + 1;
        $.goto = 1;
        continue;
      case 5:
        if ($p) {
          $.goto = 7;
          continue;
        } else {
          $.state = 6;
        }
      case 6:
        if (t1) {
          $.goto = 4;
          continue;
        } else {
          $.state = 7;
        }
      case 7:
        $l[2] = $l[2] + 1;
        $.goto = 3;
        continue;
      case 8:
        $.goto = 9;
        return $unhandled($.error);
      case 9:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[0, "3:2-3:17", $s$2], [2, "5:4-5:10", $s$2], [0, "6:9-6:14", $s$2], [2, "8:10-8:16", $s$2], [0, "4:26-4:29", $s$2], [0, null, $s$2], [0, null, $s$2], [0, "6:43-6:46", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]),
  $m$2 = $M.fun("m$2", "f2", null, $m$0, [], 0, 5, "14:0-25:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[4] = [1, 2, 3];
        $l[1] = 0;
        $.state = 1;
      case 1:
        if ($l[1] < 3) {
          $.goto = 2;
          ($x.call = eff)($l[1]);
          $.state = 2;
        } else {
          $.goto = 10;
          continue;
        }
      case 2:
        $l[2] = 0;
        $l[3] = $l[4].length;
        $.state = 3;
      case 3:
        if ($l[2] < $l[3]) {
          d = $l[4][$l[2]];
          $.goto = 5;
          $p = ($x.call = eff)(d);
          continue;
        } else {
          $.state = 4;
        }
      case 4:
        $l[1] = $l[1] + 1;
        $.goto = 1;
        continue;
      case 5:
        if ($p) {
          $.goto = 8;
          continue;
        } else {
          $.state = 6;
        }
      case 6:
        $.goto = 7;
        $p = ($x.call = eff)(2);
        $.state = 7;
      case 7:
        if ($p) {
          $.goto = 4;
          continue;
        } else {
          $.state = 8;
        }
      case 8:
        $l[2] = $l[2] + 1;
        $.goto = 3;
        continue;
      case 9:
        $.goto = 10;
        return $unhandled($.error);
      case 10:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[0, "16:2-16:17", $s$3], [2, "18:4-18:10", $s$3], [0, "19:9-19:14", $s$3], [2, "21:10-21:16", $s$3], [0, "17:26-17:29", $s$3], [0, null, $s$3], [2, "22:10-22:16", $s$3], [0, null, $s$3], [0, "19:43-19:46", $s$3], [16, "25:1-25:1", $s$3], [16, "25:1-25:1", $s$3]]),
  $m$3 = $M.fun("m$3", "f3", null, $m$0, [], 0, 5, "26:0-39:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[4] = [1, 2, 3];
        $l[1] = 0;
        $.state = 1;
      case 1:
        if ($l[1] < 3) {
          $.goto = 2;
          ($x.call = eff)($l[1]);
          $.state = 2;
        } else {
          $.goto = 8;
          ($x.call = eff)($l[2]);
          continue;
        }
      case 2:
        $l[2] = 0;
        $l[3] = $l[4].length;
        $.state = 3;
      case 3:
        if ($l[2] < $l[3]) {
          d = $l[4][$l[2]];
          $.goto = 5;
          ($x.call = eff)(d);
          continue;
        } else {
          $.state = 4;
        }
      case 4:
        $l[1] = $l[1] + 1;
        $.goto = 1;
        continue;
      case 5:
        $l[2] = $l[2] + 1;
        if (t2) {
          $.goto = 4;
          continue;
        } else {
          $.state = 6;
        }
      case 6:
        $l[2] = $l[2] + 1;
        $.goto = 3;
        continue;
      case 7:
        $.goto = 8;
        return $unhandled($.error);
      case 8:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[0, "28:2-28:17", $s$4], [2, "30:4-30:10", $s$4], [0, "31:9-31:14", $s$4], [2, "33:6-33:12", $s$4], [0, "29:26-29:29", $s$4], [0, "34:6-34:9", $s$4], [0, "31:43-31:46", $s$4], [16, "39:1-39:1", $s$4], [16, "39:1-39:1", $s$4]]),
  $m$4 = $M.fun("m$4", "f4", null, $m$0, [], 0, 5, "40:0-49:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[4] = [1, 2, 3];
        $l[2] = 0;
        $l[3] = $l[4].length;
        $.state = 1;
      case 1:
        if ($l[2] < $l[3]) {
          d = $l[4][$l[2]];
          $.goto = 2;
          ($x.call = eff)(d);
          $.state = 2;
        } else {
          $.goto = 5;
          continue;
        }
      case 2:
        $l[1] = $l[1] + 1;
        if (t2) {
          $.state = 3;
        } else {
          $.state = 3;
        }
      case 3:
        $l[2] = $l[2] + 1;
        $.goto = 1;
        continue;
      case 4:
        $.goto = 5;
        return $unhandled($.error);
      case 5:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[0, "42:2-42:17", $s$5], [2, "45:4-45:10", $s$5], [0, "46:4-46:7", $s$5], [0, "43:41-43:44", $s$5], [16, "49:1-49:1", $s$5], [16, "49:1-49:1", $s$5]]),
  $m$5 = $M.fun("m$5", "f5", null, $m$0, [], 0, 3, "51:0-59:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = 0;
        $.state = 1;
      case 1:
        if (true) {
          $.goto = 3;
          ($x.call = eff)($l[1]);
          continue;
        } else {
          $.state = 2;
        }
      case 2:
        $.goto = 6;
        ($x.call = eff)($l[1]);
        continue;
      case 3:
        $l[1] = $l[1] + 1;
        if (t2) {
          $.goto = 2;
          continue;
        } else {
          $.state = 4;
        }
      case 4:
        $l[1] = $l[1] - 1;
        $.goto = 1;
        continue;
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[0, "53:7-53:12", $s$6], [2, "54:4-54:10", $s$6], [2, "58:2-58:8", $s$6], [0, "55:4-55:7", $s$6], [0, "53:20-53:23", $s$6], [16, "59:1-59:1", $s$6], [16, "59:1-59:1", $s$6]]);
$M.moduleExports();