"no-ctrl";

var $M = require("@effectful/debugger"),
  $forInIterator = $M.forInIterator,
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $mcall = $M.mcall,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "1:9-1:10"],
    b: [2, "7:9-7:10"],
    c: [3, "14:9-14:10"],
    d: [4, "21:9-21:10"],
    e: [5, "27:9-27:10"],
    f: [6, "33:9-33:10"],
    g: [7, "39:9-39:10"],
    h: [8, "49:9-49:10"]
  }, null, 0],
  $s$2 = [{
    i: [1, "2:11-2:12"]
  }, $s$1, 1],
  $s$3 = [{
    i: [1, "8:6-8:7"]
  }, $s$1, 1],
  $s$4 = [{
    i: [1, "16:11-16:12"]
  }, $s$1, 1],
  $s$5 = [{
    i: [1, "22:11-22:12"]
  }, $s$1, 1],
  $s$6 = [{
    i: [1, "28:11-28:12"]
  }, $s$1, 1],
  $s$7 = [{
    i: [1, "34:11-34:12"]
  }, $s$1, 1],
  $s$8 = [{
    i: [1, "41:11-41:12"]
  }, $s$1, 1],
  $s$9 = [{
    j: [1, "51:6-51:7"],
    i: [2, "55:13-55:14"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 9, "1:0-68:0", 160, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = $m$1($);
        $l[2] = $m$2($);
        $l[3] = $m$3($);
        $l[4] = $m$4($);
        $l[5] = $m$5($);
        $l[6] = $m$6($);
        $l[7] = $m$7($);
        $l[8] = $m$8($);
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
  }, null, null, 0, [[0, "1:0-5:1", $s$1], [16, "68:0-68:0", $s$1], [16, "68:0-68:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-5:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($x.call = eff)(2);
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = $forInIterator($p);
        $.state = 2;
      case 2:
        $l[2] = $p;
        $.state = 3;
      case 3:
        $x.call = $l[2].next;
        $.goto = 4;
        $p = $l[2].next();
        $.state = 4;
      case 4:
        if ($p.done) {
          $.goto = 6;
          continue;
        } else {
          $l[1] = $p.value;
          $.goto = 3;
          ($x.call = eff)($l[1]);
          continue;
        }
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "2:16-2:22", $s$2], [2, "2:16-2:22", $s$2], [0, null, $s$2], [2, "2:16-2:22", $s$2], [2, "3:4-3:10", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]),
  $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 3, "7:0-12:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($x.call = eff)(2);
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = $forInIterator($p);
        $.state = 2;
      case 2:
        $l[2] = $p;
        $.state = 3;
      case 3:
        $x.call = $l[2].next;
        $.goto = 4;
        $p = $l[2].next();
        $.state = 4;
      case 4:
        if ($p.done) {
          $.goto = 6;
          continue;
        } else {
          $l[1] = $p.value;
          $.goto = 3;
          ($x.call = eff)($l[1]);
          continue;
        }
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "9:12-9:18", $s$3], [2, "9:12-9:18", $s$3], [0, null, $s$3], [2, "9:12-9:18", $s$3], [2, "10:4-10:10", $s$3], [16, "12:1-12:1", $s$3], [16, "12:1-12:1", $s$3]]),
  $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 3, "14:0-19:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($x.call = eff)(2);
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = $forInIterator($p);
        $.state = 2;
      case 2:
        $l[2] = $p;
        $.state = 3;
      case 3:
        $x.call = $l[2].next;
        $.goto = 4;
        $p = $l[2].next();
        $.state = 4;
      case 4:
        if ($p.done) {
          $.goto = 6;
          continue;
        } else {
          $l[1] = $p.value;
          $.goto = 3;
          ($x.call = eff)($l[1]);
          continue;
        }
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "16:16-16:22", $s$4], [2, "16:16-16:22", $s$4], [0, null, $s$4], [2, "16:16-16:22", $s$4], [2, "17:4-17:10", $s$4], [16, "19:1-19:1", $s$4], [16, "19:1-19:1", $s$4]]),
  $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 3, "21:0-25:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($x.call = eff)(2);
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = $forInIterator($p);
        $.state = 2;
      case 2:
        $l[2] = $p;
        $.state = 3;
      case 3:
        $x.call = $l[2].next;
        $.goto = 4;
        $p = $l[2].next();
        $.state = 4;
      case 4:
        if ($p.done) {
          $.goto = 6;
          continue;
        } else {
          $l[1] = $p.value;
          $.goto = 3;
          $mcall("log", console, $l[1]);
          continue;
        }
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "22:16-22:22", $s$5], [2, "22:16-22:22", $s$5], [0, null, $s$5], [2, "22:16-22:22", $s$5], [2, "23:4-23:18", $s$5], [16, "25:1-25:1", $s$5], [16, "25:1-25:1", $s$5]]),
  $m$5 = $M.fun("m$5", "e", null, $m$0, [], 0, 3, "27:0-31:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $forInIterator(obj);
        $.state = 1;
      case 1:
        $l[2] = $p;
        $.state = 2;
      case 2:
        $x.call = $l[2].next;
        $.goto = 3;
        $p = $l[2].next();
        $.state = 3;
      case 3:
        if ($p.done) {
          $.goto = 5;
          continue;
        } else {
          $l[1] = $p.value;
          $.goto = 2;
          ($x.call = eff)($l[1]);
          continue;
        }
      case 4:
        $.goto = 5;
        return $unhandled($.error);
      case 5:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "28:16-28:19", $s$6], [0, null, $s$6], [2, "28:16-28:19", $s$6], [2, "29:4-29:10", $s$6], [16, "31:1-31:1", $s$6], [16, "31:1-31:1", $s$6]]),
  $m$6 = $M.fun("m$6", "f", null, $m$0, [], 0, 3, "33:0-37:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $forInIterator(obj);
        $.state = 1;
      case 1:
        $l[2] = $p;
        $.state = 2;
      case 2:
        $x.call = $l[2].next;
        $.goto = 3;
        $p = $l[2].next();
        $.state = 3;
      case 3:
        if ($p.done) {
          $.goto = 5;
          continue;
        } else {
          $l[1] = $p.value;
          $.goto = 2;
          $mcall("log", console, $l[1]);
          continue;
        }
      case 4:
        $.goto = 5;
        return $unhandled($.error);
      case 5:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "34:16-34:19", $s$7], [0, null, $s$7], [2, "34:16-34:19", $s$7], [2, "35:4-35:18", $s$7], [16, "37:1-37:1", $s$7], [16, "37:1-37:1", $s$7]]),
  $m$7 = $M.fun("m$7", "g", null, $m$0, [], 0, 3, "39:0-47:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($x.call = eff)("a");
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.call = eff)(2);
        $.state = 2;
      case 2:
        $.goto = 3;
        $p = $forInIterator($p);
        $.state = 3;
      case 3:
        $l[2] = $p;
        $.state = 4;
      case 4:
        $x.call = $l[2].next;
        $.goto = 5;
        $p = $l[2].next();
        $.state = 5;
      case 5:
        if ($p.done) {
          $.state = 6;
        } else {
          $l[1] = $p.value;
          $.goto = 7;
          $p = ($x.call = eff)($l[1]);
          continue;
        }
      case 6:
        $.goto = 12;
        ($x.call = eff)("z");
        continue;
      case 7:
        if ($p) {
          $.goto = 4;
          continue;
        } else {
          $.state = 8;
        }
      case 8:
        $.goto = 9;
        $p = ($x.call = effB)($l[1]);
        $.state = 9;
      case 9:
        if ($p) {
          $.goto = 6;
          continue;
        } else {
          $.state = 10;
        }
      case 10:
        $.goto = 4;
        ($x.call = eff)("c");
        continue;
      case 11:
        $.goto = 12;
        return $unhandled($.error);
      case 12:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "40:2-40:10", $s$8], [2, "41:16-41:22", $s$8], [2, "41:16-41:22", $s$8], [0, null, $s$8], [2, "41:16-41:22", $s$8], [2, "42:8-42:14", $s$8], [2, "46:2-46:10", $s$8], [0, null, $s$8], [2, "43:8-43:15", $s$8], [0, null, $s$8], [2, "44:4-44:12", $s$8], [16, "47:1-47:1", $s$8], [16, "47:1-47:1", $s$8]]),
  $m$8 = $M.fun("m$8", "h", null, $m$0, [], 0, 5, "49:0-67:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($x.call = eff)("a");
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = $forInIterator(obj);
        $.state = 2;
      case 2:
        $l[3] = $p;
        $.state = 3;
      case 3:
        $x.call = $l[3].next;
        $.goto = 4;
        $p = $l[3].next();
        $.state = 4;
      case 4:
        if ($p.done) {
          $.state = 5;
        } else {
          $l[1] = $p.value;
          $.goto = 6;
          $mcall("log", console, "j");
          continue;
        }
      case 5:
        $.goto = 24;
        ($x.call = eff)("z");
        continue;
      case 6:
        $.goto = 7;
        ($x.call = effA)($l[1]);
        $.state = 7;
      case 7:
        $.goto = 8;
        $p = ($x.call = eff)($l[1]);
        $.state = 8;
      case 8:
        $.goto = 9;
        $p = $forInIterator($p);
        $.state = 9;
      case 9:
        $l[4] = $p;
        $.state = 10;
      case 10:
        $x.call = $l[4].next;
        $.goto = 11;
        $p = $l[4].next();
        $.state = 11;
      case 11:
        if ($p.done) {
          $.state = 12;
        } else {
          $l[2] = $p.value;
          $.goto = 13;
          $mcall("log", console, "b");
          continue;
        }
      case 12:
        $.goto = 3;
        ($x.call = effB)($l[1]);
        continue;
      case 13:
        $.goto = 14;
        ($x.call = eff)("b");
        $.state = 14;
      case 14:
        $.goto = 15;
        $p = ($x.call = eff)($l[2] + $l[1]);
        $.state = 15;
      case 15:
        if ($p) {
          $.goto = 3;
          continue;
        } else {
          $.state = 16;
        }
      case 16:
        $.goto = 17;
        $p = ($x.call = effB)($l[2] + $l[1]);
        $.state = 17;
      case 17:
        if ($p) {
          $.goto = 5;
          continue;
        } else {
          $.state = 18;
        }
      case 18:
        $.goto = 19;
        $p = ($x.call = eff)($l[2]);
        $.state = 19;
      case 19:
        if ($p) {
          $.goto = 10;
          continue;
        } else {
          $.state = 20;
        }
      case 20:
        $.goto = 21;
        $p = ($x.call = effB)($l[2]);
        $.state = 21;
      case 21:
        if ($p) {
          $.goto = 12;
          continue;
        } else {
          $.state = 22;
        }
      case 22:
        $.goto = 10;
        ($x.call = eff)("c");
        continue;
      case 23:
        $.goto = 24;
        return $unhandled($.error);
      case 24:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "50:2-50:10", $s$9], [2, "52:17-52:20", $s$9], [0, null, $s$9], [2, "52:17-52:20", $s$9], [2, "53:4-53:20", $s$9], [2, "66:2-66:10", $s$9], [2, "54:4-54:11", $s$9], [2, "55:18-55:24", $s$9], [2, "55:18-55:24", $s$9], [0, null, $s$9], [2, "55:18-55:24", $s$9], [2, "56:6-56:22", $s$9], [2, "64:4-64:11", $s$9], [2, "57:6-57:14", $s$9], [2, "58:10-58:20", $s$9], [0, null, $s$9], [2, "59:10-59:21", $s$9], [0, null, $s$9], [2, "60:10-60:16", $s$9], [0, null, $s$9], [2, "61:10-61:17", $s$9], [0, null, $s$9], [2, "62:6-62:14", $s$9], [16, "67:1-67:1", $s$9], [16, "67:1-67:1", $s$9]]);
$M.moduleExports();