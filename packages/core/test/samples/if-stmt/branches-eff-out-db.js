"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "2:9-2:10"],
    b: [2, "6:9-6:10"],
    c: [3, "12:9-12:10"],
    d: [4, "19:9-19:10"],
    e: [5, "27:9-27:10"],
    f: [6, "33:9-33:10"]
  }, null, 0],
  $s$2 = [{}, $s$1, 1],
  $s$3 = [{}, $s$1, 1],
  $s$4 = [{}, $s$1, 1],
  $s$5 = [{}, $s$1, 1],
  $s$6 = [{}, $s$1, 1],
  $s$7 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 7, "1:0-37:0", 160, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = $m$1($);
        $l[2] = $m$2($);
        $l[3] = $m$3($);
        $l[4] = $m$4($);
        $l[5] = $m$5($);
        $l[6] = $m$6($);
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
  }, null, null, 0, [[0, "2:0-5:1", $s$1], [16, "37:0-37:0", $s$1], [16, "37:0-37:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "2:0-5:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        if (true) {
          $.goto = 2;
          $p = ($x.call = eff)(1);
          continue;
        } else {
          $.goto = 1;
          $p = ($x.call = eff)(2);
          $.state = 1;
        }
      case 1:
        $.result = $p;
        $.goto = 4;
        continue;
      case 2:
        $.result = $p;
        $.goto = 4;
        continue;
      case 3:
        $.goto = 4;
        return $unhandled($.error);
      case 4:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "3:19-3:25", $s$2], [0, null, $s$2], [0, null, $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]),
  $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 1, "6:0-11:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        if (true) {
          $.goto = 2;
          $p = ($x.call = eff)(1);
          continue;
        } else {
          $.goto = 1;
          $p = ($x.call = eff)(2);
          $.state = 1;
        }
      case 1:
        $.result = $p;
        $.goto = 4;
        continue;
      case 2:
        $.result = $p;
        $.goto = 4;
        continue;
      case 3:
        $.goto = 4;
        return $unhandled($.error);
      case 4:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "7:19-7:25", $s$3], [0, null, $s$3], [0, null, $s$3], [16, "11:1-11:1", $s$3], [16, "11:1-11:1", $s$3]]),
  $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 1, "12:0-17:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        if (true) {
          $.goto = 1;
          ($x.call = eff)(1);
          $.state = 1;
        } else {
          $.goto = 1;
          ($x.call = eff)(2);
          $.state = 1;
        }
      case 1:
        $.goto = 2;
        ($x.call = eff)(3);
        $.state = 2;
      case 2:
        $.goto = 4;
        ($x.call = eff)(4);
        continue;
      case 3:
        $.goto = 4;
        return $unhandled($.error);
      case 4:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "13:12-13:18", $s$4], [2, "15:2-15:8", $s$4], [2, "16:2-16:8", $s$4], [16, "17:1-17:1", $s$4], [16, "17:1-17:1", $s$4]]),
  $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 1, "19:0-25:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($x.call = eff)("a");
        $.state = 1;
      case 1:
        if (true) {
          $.goto = 2;
          ($x.call = eff)(1);
          $.state = 2;
        } else {
          $.goto = 2;
          ($x.call = eff)(2);
          $.state = 2;
        }
      case 2:
        $.goto = 3;
        ($x.call = eff)(3);
        $.state = 3;
      case 3:
        $.goto = 5;
        ($x.call = eff)(4);
        continue;
      case 4:
        $.goto = 5;
        return $unhandled($.error);
      case 5:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "20:2-20:10", $s$5], [2, "21:12-21:18", $s$5], [2, "23:2-23:8", $s$5], [2, "24:2-24:8", $s$5], [16, "25:1-25:1", $s$5], [16, "25:1-25:1", $s$5]]),
  $m$5 = $M.fun("m$5", "e", null, $m$0, [], 0, 1, "27:0-31:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($x.call = eff)(1);
        $.state = 1;
      case 1:
        if ($p) {
          $.result = 1;
          $.goto = 3;
          continue;
        } else {
          $.result = 2;
          $.goto = 3;
          continue;
        }
      case 2:
        $.goto = 3;
        return $unhandled($.error);
      case 3:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "28:6-28:12", $s$6], [0, null, $s$6], [16, "31:1-31:1", $s$6], [16, "31:1-31:1", $s$6]]),
  $m$6 = $M.fun("m$6", "f", null, $m$0, [], 0, 1, "33:0-36:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($x.call = eff)(1);
        $.state = 1;
      case 1:
        if ($p) {
          $.result = 1;
          $.goto = 3;
          continue;
        } else {
          $.result = 2;
          $.goto = 3;
          continue;
        }
      case 2:
        $.goto = 3;
        return $unhandled($.error);
      case 3:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "34:6-34:12", $s$7], [0, null, $s$7], [16, "36:1-36:1", $s$7], [16, "36:1-36:1", $s$7]]);
$M.moduleExports();