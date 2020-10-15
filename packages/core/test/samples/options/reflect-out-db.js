var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"],
  b: [2, "16:9-16:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $s$4 = [{
  addLater: [1, "27:11-27:19"]
}, $s$1, 1],
    $s$5 = [{
  result: [1, "18:8-18:14"]
}, $s$4, 2],
    $s$6 = [{
  err: [2, "22:13-22:16"]
}, $s$5, 2],
    $s$7 = [{
  a: [1, "27:20-27:21"],
  b: [2, "27:23-27:24"],
  deferred: [3, "28:8-28:16"]
}, $s$4, 2],
    $s$8 = [{}, $s$7, 3],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-35:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$3($);
      $.goto = 2;
      $mcall("profile", M, "defaultMinimal");
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[2, "14:0-14:27", $s$1], [16, "35:0-35:0", $s$1], [16, "35:0-35:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-12:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = eff)("a");
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("reflect", M, monadish);
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = eff)(1);
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = M)($p);
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("reflect", M, monadish + 2);
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = $mcall("reify", M, $m$2($));
      $.state = 6;

    case 6:
      $.goto = 8;
      $mcall("log", console, $p);
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "2:2-2:10", $s$2], [2, "3:2-3:21", $s$2], [2, "4:4-4:10", $s$2], [2, "4:2-4:11", $s$2], [2, "5:2-5:25", $s$2], [2, "7:4-10:6", $s$2], [2, "6:2-11:3", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]),
    $m$2 = $M.fun("m$2", null, null, $m$1, [], 0, 1, "7:12-10:5", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = eff)(1);
      $.state = 1;

    case 1:
      $.goto = 3;
      ($context.call = eff)(2);
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "8:6-8:12", $s$3], [2, "9:6-9:12", $s$3], [16, "10:5-10:5", $s$3], [16, "10:5-10:5", $s$3]]),
    $m$3 = $M.fun("m$3", "b", null, $m$0, [], 0, 2, "16:0-34:1", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$5($);
      $.goto = 1;
      $p = $mcall("reify", M, $m$4($));
      $.state = 1;

    case 1:
      $.goto = 3;
      $mcall("done", $p);
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "17:2-25:4", $s$4], [2, "17:2-25:11", $s$4], [16, "34:1-34:1", $s$4], [16, "34:1-34:1", $s$4]]),
    $m$4 = $M.fun("m$4", null, null, $m$3, [], 0, 3, "17:10-25:3", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = $l[0][1])(1, 2);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = M)($p);
      $.state = 2;

    case 2:
      $l[1] = $p;
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($context.call = expect)($l[1]);
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("equal", $p.to, 3);
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = done)();
      $.state = 6;

    case 6:
      $.goto = 9;
      continue;

    case 7:
      $l[2] = $.error;
      $.error = void 0;
      $.goto = 6;
      ($context.call = done)($l[2]);
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 5:
    case 4:
    case 3:
      $.goto = 7;
      break;

    default:
      $.goto = 8;
  }
}, null, 2, [[2, "18:19-18:33", $s$5], [2, "18:17-18:34", $s$5], [0, "18:8-18:34", $s$5], [3, "20:6-20:20", $s$5], [3, "20:6-20:32", $s$5], [3, "21:6-21:12", $s$5], [0, null, $s$5], [2, "23:6-23:15", $s$6], [16, "25:3-25:3", $s$5], [16, "25:3-25:3", $s$5]]),
    $m$5 = $M.fun("m$5", "addLater", null, $m$3, ["a", "b"], 0, 4, "27:2-33:3", 128, function addLater($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $mcall("defer", Q);
      $.state = 1;

    case 1:
      $l[3] = $p;
      $.goto = 2;
      $mcall("nextTick", process, $m$6($));
      $.state = 2;

    case 2:
      $.result = $l[3].promise;
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
}, null, null, 2, [[2, "28:19-28:28", $s$7], [2, "29:4-31:6", $s$7], [0, "32:11-32:27", $s$7], [16, "33:3-33:3", $s$7], [16, "33:3-33:3", $s$7]]),
    $m$6 = $M.fun("m$6", null, null, $m$5, [], 0, 1, "29:21-31:5", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      $mcall("resolve", $l[0][3], $l[0][1] + $l[0][2]);
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[2, "30:6-30:29", $s$8], [16, "31:5-31:5", $s$8], [16, "31:5-31:5", $s$8]]);

$M.moduleExports();