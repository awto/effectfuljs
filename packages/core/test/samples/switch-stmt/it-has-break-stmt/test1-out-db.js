var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"],
  a_1: [2, "11:9-11:12"],
  c: [3, "25:9-25:10"],
  d: [4, "44:9-44:10"]
}, null, 0],
    $s$2 = [{
  z: [1, "1:11-1:12"]
}, $s$1, 1],
    $s$3 = [{
  z: [1, "11:13-11:14"]
}, $s$1, 1],
    $s$4 = [{
  z: [1, "25:11-25:12"]
}, $s$1, 1],
    $s$5 = [{
  z: [1, "44:11-44:12"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 5, "1:0-67:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
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
}, null, null, 0, [[0, "1:0-10:1", $s$1], [16, "67:0-67:0", $s$1], [16, "67:0-67:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, ["z"], 0, 2, "1:0-10:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      switch ($l[1]) {
        case 1:
          $.goto = 2;
          ($x.call = eff)(1);
          continue;

        default:
          $.state = 1;
          break;
      }

    case 1:
      $.goto = 2;
      ($x.call = eff)(2);
      $.state = 2;

    case 2:
      $.goto = 4;
      ($x.call = eff)(3);
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "4:6-4:12", $s$2], [2, "7:6-7:12", $s$2], [2, "9:2-9:8", $s$2], [16, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2]]),
    $m$2 = $M.fun("m$2", "a_1", null, $m$0, ["z"], 0, 2, "11:0-23:1", 128, function a_1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      switch ($l[1]) {
        case 1:
          $.goto = 3;
          ($x.call = eff)(1);
          continue;

        case 2:
          $.state = 1;
          break;

        default:
          $.goto = 2;
          continue;
      }

    case 1:
      $.goto = 3;
      $mcall("log", console, "1");
      continue;

    case 2:
      $.goto = 3;
      $mcall("log", console, "2");
      $.state = 3;

    case 3:
      $.goto = 5;
      ($x.call = eff)(3);
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "14:6-14:12", $s$3], [2, "17:6-17:22", $s$3], [2, "20:6-20:22", $s$3], [2, "22:2-22:8", $s$3], [16, "23:1-23:1", $s$3], [16, "23:1-23:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, ["z"], 0, 2, "25:0-42:1", 128, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      switch ($l[1]) {
        case 1:
          $.goto = 5;
          ($x.call = eff)(1);
          continue;

        case 2:
          $.state = 1;
          break;

        case 3:
          $.goto = 3;
          continue;

        default:
          $.goto = 4;
          continue;
      }

    case 1:
      $.goto = 2;
      ($x.call = eff)(2);
      $.state = 2;

    case 2:
      $.goto = 7;
      ($x.call = eff)(5);
      continue;

    case 3:
      $.goto = 4;
      $mcall("log", console, "z");
      $.state = 4;

    case 4:
      $.goto = 5;
      ($x.call = eff)(3);
      $.state = 5;

    case 5:
      $.goto = 2;
      ($x.call = eff)(4);
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "29:8-29:14", $s$4], [2, "32:8-32:14", $s$4], [2, "41:2-41:8", $s$4], [2, "35:8-35:24", $s$4], [2, "37:8-37:14", $s$4], [2, "39:4-39:10", $s$4], [16, "42:1-42:1", $s$4], [16, "42:1-42:1", $s$4]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, ["z"], 0, 2, "44:0-66:1", 128, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      switch ($l[1]) {
        case 1:
          $.goto = 6;
          ($x.call = eff)(1);
          continue;

        case 2:
          $.state = 1;
          break;

        case 3:
          $.goto = 3;
          continue;

        default:
          $.goto = 5;
          continue;
      }

    case 1:
      $.goto = 2;
      ($x.call = eff)(2);
      $.state = 2;

    case 2:
      $.goto = 8;
      ($x.call = eff)(6);
      continue;

    case 3:
      $.goto = 4;
      $mcall("log", console, "z");
      $.state = 4;

    case 4:
      $.goto = 2;
      ($x.call = eff)(5);
      continue;

    case 5:
      $.goto = 6;
      ($x.call = eff)(3);
      $.state = 6;

    case 6:
      $.goto = 2;
      ($x.call = eff)(4);
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "49:10-49:16", $s$5], [2, "52:10-52:16", $s$5], [2, "65:2-65:8", $s$5], [2, "55:10-55:26", $s$5], [2, "63:4-63:10", $s$5], [2, "58:10-58:16", $s$5], [2, "60:6-60:12", $s$5], [16, "66:1-66:1", $s$5], [16, "66:1-66:1", $s$5]]);

$M.moduleExports();