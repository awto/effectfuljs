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
    a1: [1, "3:9-3:11"],
    a2: [2, "20:9-20:11"],
    oii: [3, "31:9-31:12"]
  }, null, 0],
  $s$2 = [{
    i: [1, "4:6-4:7"],
    b: [2, "6:11-6:12"]
  }, $s$1, 1],
  $s$3 = [{
    j: [1, "6:13-6:14"],
    k: [2, "7:8-7:9"]
  }, $s$2, 2],
  $s$4 = [{
    i: [1, "21:6-21:7"],
    b: [2, "23:11-23:12"]
  }, $s$1, 1],
  $s$5 = [{
    j: [1, "23:13-23:14"],
    k: [2, "24:8-24:9"]
  }, $s$4, 2],
  $s$6 = [{
    ii: [1, "32:6-32:8"],
    oj: [2, "33:11-33:13"]
  }, $s$1, 1],
  $s$7 = [{
    j: [1, "34:8-34:9"],
    mapTest: [2, "35:13-35:20"]
  }, $s$6, 2],
  $s$8 = [{
    v: [1, "36:12-36:13"],
    self: [2, "37:12-37:16"]
  }, $s$7, 3],
  $s$9 = [{
    i: [1, "39:9-39:10"],
    x: [2, "39:12-39:13"],
    t: [3, "39:15-39:16"]
  }, $s$8, 4],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 4, "1:0-45:0", 160, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = $m$1($);
        $l[2] = $m$3($);
        $l[3] = $m$5($);
        $.goto = 1;
        $mcall("option", M, {
          varStorageField: "V",
          closVarPrefix: "",
          closVarPostfix: ""
        });
        $.state = 1;
      case 1:
        $.goto = 3;
        $mcall("option", M, {
          closureStorageField: "VV",
          closVarPrefix: "$",
          closVarPostfix: "$$"
        });
        continue;
      case 2:
        $.goto = 3;
        return $unhandled($.error);
      case 3:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 0, [[2, "1:0-1:73", $s$1], [2, "14:0-18:2", $s$1], [16, "45:0-45:0", $s$1], [16, "45:0-45:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a1", null, $m$0, [], 0, 3, "3:0-12:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2] = $m$2($);
        $l[1] = 0;
        $.goto = 1;
        $p = ($x.call = eff_2)();
        $.state = 1;
      case 1:
        $.result = $p;
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
  }, null, null, 1, [[2, "11:9-11:16", $s$2], [0, null, $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]),
  $m$2 = $M.fun("m$2", "b", null, $m$1, ["j"], 0, 3, "6:2-10:3", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2] = $l[1] + $l[0][1];
        $l[0][1] = $l[0][1] + 1;
        $.goto = 1;
        $p = ($x.call = eff_1)();
        $.state = 1;
      case 1:
        $.result = $p;
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
  }, null, null, 2, [[2, "9:11-9:18", $s$3], [0, null, $s$3], [16, "10:3-10:3", $s$3], [16, "10:3-10:3", $s$3]]),
  $m$3 = $M.fun("m$3", "a2", null, $m$0, [], 0, 3, "20:0-29:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2] = $m$4($);
        $l[1] = 0;
        $.goto = 1;
        $p = ($x.call = eff_2)();
        $.state = 1;
      case 1:
        $.result = $p;
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
  }, null, null, 1, [[2, "28:9-28:16", $s$4], [0, null, $s$4], [16, "29:1-29:1", $s$4], [16, "29:1-29:1", $s$4]]),
  $m$4 = $M.fun("m$4", "b", null, $m$3, ["j"], 0, 3, "23:2-27:3", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2] = $l[1] + $l[0][1];
        $l[0][1] = $l[0][1] + 1;
        $.goto = 1;
        $p = ($x.call = eff_1)();
        $.state = 1;
      case 1:
        $.result = $p;
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
  }, null, null, 2, [[2, "26:11-26:18", $s$5], [0, null, $s$5], [16, "27:3-27:3", $s$5], [16, "27:3-27:3", $s$5]]),
  $m$5 = $M.fun("m$5", "oii", null, $m$0, [], 0, 3, "31:0-44:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2] = $m$6($);
        $l[1] = 0;
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
  }, null, null, 1, [[0, "33:2-43:3", $s$6], [16, "44:1-44:1", $s$6], [16, "44:1-44:1", $s$6]]),
  $m$6 = $M.fun("m$6", "oj", null, $m$5, [], 0, 3, "33:2-43:3", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2] = $m$7($);
        $l[1] = 0;
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
  }, null, null, 2, [[0, "35:4-42:5", $s$7], [16, "43:3-43:3", $s$7], [16, "43:3-43:3", $s$7]]),
  $m$7 = $M.fun("m$7", "mapTest", null, $m$6, [], 0, 3, "35:4-42:5", 136, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = [1, 2, 3];
        $l[2] = {};
        $.goto = 1;
        $p = $mcall("map", $l[1], $m$8($), $l[2]);
        $.state = 1;
      case 1:
        $.result = $p;
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
  }, null, null, 3, [[2, "38:13-41:7", $s$8], [0, null, $s$8], [16, "42:5-42:5", $s$8], [16, "42:5-42:5", $s$8]]),
  $m$8 = $M.fun("m$8", null, null, $m$7, ["i", "x", "t"], 1, 4, "39:8-39:76", 140, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $mcall("concat", "", $l[1], "@");
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = $mcall("concat", $p, $l[2], "[");
        $.state = 2;
      case 2:
        $1 = $l[0][0][1];
        $l[0][0][1] = $1 + 1;
        $.goto = 3;
        $p = $mcall("concat", $p, $1, "/");
        $.state = 3;
      case 3:
        $1 = $l[0][0][0][1];
        $l[0][0][0][1] = $1 + 1;
        $.goto = 4;
        $p = $mcall("concat", $p, $1, "]:");
        $.state = 4;
      case 4:
        $.goto = 5;
        $p = $mcall("concat", $p, $l[3] === $l[0][1], "/");
        $.state = 5;
      case 5:
        $.goto = 6;
        $p = $mcall("concat", $p, $l[0][2] === $.self);
        $.state = 6;
      case 6:
        $.result = $p;
        $.goto = 8;
        continue;
      case 7:
        $.goto = 8;
        return $unhandled($.error);
      case 8:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 4, [[2, null, $s$9], [2, null, $s$9], [2, null, $s$9], [2, null, $s$9], [2, null, $s$9], [2, null, $s$9], [0, null, $s$9], [16, "39:76-39:76", $s$9], [16, "39:76-39:76", $s$9]]);
$M.moduleExports();