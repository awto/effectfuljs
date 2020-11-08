var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  i: [1, "1:4-1:5"],
  yh: [2, "3:9-3:11"],
  yh2: [3, "16:9-16:12"]
}, null, 0],
    $s$2 = [{
  a: [1, "3:12-3:13"],
  j: [2, "4:6-4:7"]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $s$4 = [{
  a: [1, "16:13-16:14"],
  j: [2, "17:6-17:7"]
}, $s$1, 1],
    $s$5 = [{}, $s$4, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 4, "1:0-23:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $m$1($);
      $l[3] = $m$3($);
      $.goto = 1;
      ($x.call = eff_top)();
      $.state = 1;

    case 1:
      $.goto = 3;
      $mcall("option", M, {
        varStorageField: "$",
        closureStorageField: "$$"
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
}, null, null, 0, [[2, "2:0-2:9", $s$1], [2, "11:0-14:2", $s$1], [16, "23:0-23:0", $s$1], [16, "23:0-23:0", $s$1]]),
    $m$1 = $M.fun("m$1", "yh", null, $m$0, ["a"], 0, 3, "3:0-9:1", 128, function yh($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $l[0][1] = $l[0][1] + $l[1];
      $.goto = 1;
      ($x.call = eff)();
      $.state = 1;

    case 1:
      $.result = $m$2($);
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
}, null, null, 1, [[2, "5:2-5:7", $s$2], [0, null, $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]),
    $m$2 = $M.fun("m$2", "eh", null, $m$1, [], 0, 1, "6:9-8:3", 128, function eh($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      ($x.call = eff)($l[0][0][1] = $l[0][0][1] + $l[0][2]);
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "7:4-7:17", $s$3], [16, "8:3-8:3", $s$3], [16, "8:3-8:3", $s$3]]),
    $m$3 = $M.fun("m$3", "yh2", null, $m$0, ["a"], 0, 3, "16:0-22:1", 128, function yh2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $l[0][1] = $l[0][1] + $l[1];
      $.goto = 1;
      ($x.call = eff)();
      $.state = 1;

    case 1:
      $.result = $m$4($);
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
}, null, null, 1, [[2, "18:2-18:7", $s$4], [0, null, $s$4], [16, "22:1-22:1", $s$4], [16, "22:1-22:1", $s$4]]),
    $m$4 = $M.fun("m$4", "eh", null, $m$3, [], 0, 1, "19:9-21:3", 128, function eh($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      ($x.call = eff)($l[0][0][1] = $l[0][0][1] + $l[0][2]);
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "20:4-20:17", $s$5], [16, "21:3-21:3", $s$5], [16, "21:3-21:3", $s$5]]);

$M.moduleExports();