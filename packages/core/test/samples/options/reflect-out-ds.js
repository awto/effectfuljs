var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $get = $M.get,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-35:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a*/
      $m$1($));
      $lset($l, 2,
      /*b*/
      $m$3($));
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 3;
      $mcall("profile", M, "defaultMinimal");
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "14:0-14:28", $s$1], [2, "14:0-14:27", $s$1], [16, "35:0-35:0", $s$1], [16, "35:0-35:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-12:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)("a");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("reflect", M, monadish);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($context.call = eff)(1);
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = M)($p);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      $mcall("reflect", M, monadish + 2);
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      $p = $mcall("reify", M, $m$2($));
      $.state = 11;

    case 11:
      $.goto = 12;
      $mcall("log", console, $p);
      $.state = 12;

    case 12:
      $.goto = 14;
      $brk();
      continue;

    case 13:
      $.goto = 14;
      return $unhandled($.error);

    case 14:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:11", $s$2], [2, "2:2-2:10", $s$2], [4, "3:2-3:22", $s$2], [2, "3:2-3:21", $s$2], [4, "4:2-4:12", $s$2], [2, "4:4-4:10", $s$2], [2, "4:2-4:11", $s$2], [4, "5:2-5:26", $s$2], [2, "5:2-5:25", $s$2], [4, "6:2-11:4", $s$2], [2, "7:4-10:6", $s$2], [2, "6:2-11:3", $s$2], [36, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]),
    $m$2 = $M.fun("m$2", null, null, $m$1, [], 0, 1, "7:12-10:5", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)(1);
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = eff)(2);
      $.state = 4;

    case 4:
      $.goto = 6;
      $brk();
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "8:6-8:13", $s$3], [2, "8:6-8:12", $s$3], [4, "9:6-9:13", $s$3], [2, "9:6-9:12", $s$3], [36, "10:5-10:5", $s$3], [16, "10:5-10:5", $s$3], [16, "10:5-10:5", $s$3]]),
    $m$3 = $M.fun("m$3", "b", null, $m$0, [], 0, 2, "16:0-34:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*addLater*/
      $m$5($));
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $mcall("reify", M, $m$4($));
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("done", $p);
      $.state = 3;

    case 3:
      $.goto = 5;
      $brk();
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "17:2-25:12", $s$4], [2, "17:2-25:4", $s$4], [2, "17:2-25:11", $s$4], [36, "34:1-34:1", $s$4], [16, "34:1-34:1", $s$4], [16, "34:1-34:1", $s$4]]),
    $m$4 = $M.fun("m$4", null, null, $m$3, [], 0, 3, "17:10-25:3", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = $l[0][1])(1, 2);
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = M)($p);
      $.state = 3;

    case 3:
      $lset($l, 1,
      /*result*/
      $p);
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($context.call = expect)($l[1]);
      $.state = 6;

    case 6:
      $.goto = 7;
      $p = $get($p, "to");
      $.state = 7;

    case 7:
      $.goto = 8;
      $mcall("equal", $p, 3);
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = done)();
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 16;
      $brk();
      continue;

    case 12:
      $lset($l, 2,
      /*err*/
      $.error);
      $.error = void 0;
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $.goto = 14;
      ($context.call = done)($l[2]);
      $.state = 14;

    case 14:
      $.goto = 11;
      $brk();
      continue;

    case 15:
      $.goto = 16;
      return $unhandled($.error);

    case 16:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $.goto = 12;
      break;

    default:
      $.goto = 15;
  }
}, null, 2, [[4, "18:4-18:35", $s$5], [2, "18:19-18:33", $s$5], [2, "18:17-18:34", $s$5], [4, "19:4-24:5", $s$5], [5, "20:6-20:33", $s$5], [3, "20:6-20:20", $s$5], [3, "20:6-20:23", $s$5], [3, "20:6-20:32", $s$5], [5, "21:6-21:13", $s$5], [3, "21:6-21:12", $s$5], [37, "22:5-22:5", $s$5], [36, "25:3-25:3", $s$5], [4, "23:6-23:16", $s$6], [2, "23:6-23:15", $s$6], [36, "24:5-24:5", $s$5], [16, "25:3-25:3", $s$5], [16, "25:3-25:3", $s$5]]),
    $m$5 = $M.fun("m$5", "addLater", null, $m$3, ["a", "b"], 0, 4, "27:2-33:3", 0, function addLater($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $mcall("defer", Q);
      $.state = 2;

    case 2:
      $lset($l, 3,
      /*deferred*/
      $p);
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("nextTick", process, $m$6($));
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = $get($l[3], "promise");
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
}, null, null, 2, [[4, "28:4-28:29", $s$7], [2, "28:19-28:28", $s$7], [4, "29:4-31:7", $s$7], [2, "29:4-31:6", $s$7], [4, "32:4-32:28", $s$7], [2, "32:11-32:27", $s$7], [0, null, $s$7], [16, "33:3-33:3", $s$7], [16, "33:3-33:3", $s$7]]),
    $m$6 = $M.fun("m$6", null, null, $m$5, [], 0, 1, "29:21-31:5", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("resolve", $l[0][3], $l[0][1] + $l[0][2]);
      $.state = 2;

    case 2:
      $.goto = 4;
      $brk();
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[4, "30:6-30:30", $s$8], [2, "30:6-30:29", $s$8], [36, "31:5-31:5", $s$8], [16, "31:5-31:5", $s$8], [16, "31:5-31:5", $s$8]]);

$M.moduleExports();