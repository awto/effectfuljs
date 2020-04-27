var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a1: [1, "8:9-8:11"],
  a2: [2, "15:9-15:11"],
  a3: [3, "22:9-22:11"],
  a4: [4, "29:9-29:11"],
  a5: [5, "36:9-36:11"]
}, null, 0],
    $s$2 = [{
  a: [1, "8:12-8:13"],
  b: [2, "8:15-8:16"],
  c: [3, "8:18-8:19"],
  d: [4, "8:21-8:22"]
}, $s$1, 1],
    $s$3 = [{
  a: [1, "15:12-15:13"],
  b: [2, "15:15-15:16"],
  c: [3, "15:18-15:19"],
  d: [4, "15:21-15:22"]
}, $s$1, 1],
    $s$4 = [{
  a: [1, "22:12-22:13"],
  b: [2, "22:15-22:16"],
  c: [3, "22:18-22:19"],
  d: [4, "22:21-22:22"]
}, $s$1, 1],
    $s$5 = [{
  a: [1, "29:12-29:13"],
  b: [2, "29:15-29:16"],
  c: [3, "29:18-29:19"],
  d: [4, "29:21-29:22"]
}, $s$1, 1],
    $s$6 = [{
  a: [1, "36:12-36:13"],
  b: [2, "36:15-36:16"],
  c: [3, "36:18-36:19"],
  d: [4, "36:21-36:22"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 6, "1:0-40:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a1*/
      $m$1($));
      $lset($l, 2,
      /*a2*/
      $m$2($));
      $lset($l, 3,
      /*a3*/
      $m$3($));
      $lset($l, 4,
      /*a4*/
      $m$4($));
      $lset($l, 5,
      /*a5*/
      $m$5($));
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("option", M, {
        defunct: true,
        contextState: true,
        storeCont: true,
        inlinePureJumps: "tail"
      });
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("option", M, {
        inlineTailCoerce: "check"
      });
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("option", M, {
        inlineTailCoerce: true
      });
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      $mcall("option", M, {
        inlineTailCoerce: {
          singelton: "token"
        }
      });
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 11;
      $mcall("option", M, {
        inlineTailCoerce: {
          singelton: null,
          symbol: "sym"
        }
      });
      continue;

    case 10:
      $.goto = 11;
      return $unhandled($.error);

    case 11:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "1:0-6:3", $s$1], [2, "1:0-6:2", $s$1], [4, "13:0-13:40", $s$1], [2, "13:0-13:39", $s$1], [4, "20:0-20:37", $s$1], [2, "20:0-20:36", $s$1], [4, "27:0-27:55", $s$1], [2, "27:0-27:54", $s$1], [4, "34:0-34:67", $s$1], [2, "34:0-34:66", $s$1], [16, "40:0-40:0", $s$1], [16, "40:0-40:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a1", null, $m$0, ["a", "b", "c", "d"], 0, 5, "8:0-11:1", 0, function a1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = bb)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = cc)();
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
}, null, null, 1, [[4, "9:2-9:7", $s$2], [2, "9:2-9:6", $s$2], [4, "10:2-10:7", $s$2], [2, "10:2-10:6", $s$2], [36, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]),
    $m$2 = $M.fun("m$2", "a2", null, $m$0, ["a", "b", "c", "d"], 0, 5, "15:0-18:1", 0, function a2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = bb)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = cc)();
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
}, null, null, 1, [[4, "16:2-16:7", $s$3], [2, "16:2-16:6", $s$3], [4, "17:2-17:7", $s$3], [2, "17:2-17:6", $s$3], [36, "18:1-18:1", $s$3], [16, "18:1-18:1", $s$3], [16, "18:1-18:1", $s$3]]),
    $m$3 = $M.fun("m$3", "a3", null, $m$0, ["a", "b", "c", "d"], 0, 5, "22:0-25:1", 0, function a3($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = bb)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = cc)();
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
}, null, null, 1, [[4, "23:2-23:7", $s$4], [2, "23:2-23:6", $s$4], [4, "24:2-24:7", $s$4], [2, "24:2-24:6", $s$4], [36, "25:1-25:1", $s$4], [16, "25:1-25:1", $s$4], [16, "25:1-25:1", $s$4]]),
    $m$4 = $M.fun("m$4", "a4", null, $m$0, ["a", "b", "c", "d"], 0, 5, "29:0-32:1", 0, function a4($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = bb)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = cc)();
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
}, null, null, 1, [[4, "30:2-30:7", $s$5], [2, "30:2-30:6", $s$5], [4, "31:2-31:7", $s$5], [2, "31:2-31:6", $s$5], [36, "32:1-32:1", $s$5], [16, "32:1-32:1", $s$5], [16, "32:1-32:1", $s$5]]),
    $m$5 = $M.fun("m$5", "a5", null, $m$0, ["a", "b", "c", "d"], 0, 5, "36:0-39:1", 0, function a5($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = bb)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = cc)();
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
}, null, null, 1, [[4, "37:2-37:7", $s$6], [2, "37:2-37:6", $s$6], [4, "38:2-38:7", $s$6], [2, "38:2-38:6", $s$6], [36, "39:1-39:1", $s$6], [16, "39:1-39:1", $s$6], [16, "39:1-39:1", $s$6]]);

$M.moduleExports();