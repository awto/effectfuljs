var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 6, "1:0-40:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $l[5] = $m$5($);
      $.goto = 1;
      $mcall("option", M, {
        defunct: true,
        contextState: true,
        storeCont: true,
        inlinePureJumps: "tail"
      });
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("option", M, {
        inlineTailCoerce: "check"
      });
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("option", M, {
        inlineTailCoerce: true
      });
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("option", M, {
        inlineTailCoerce: {
          singelton: "token"
        }
      });
      $.state = 4;

    case 4:
      $.goto = 6;
      $mcall("option", M, {
        inlineTailCoerce: {
          singelton: null,
          symbol: "sym"
        }
      });
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[2, "1:0-6:2", $s$1], [2, "13:0-13:39", $s$1], [2, "20:0-20:36", $s$1], [2, "27:0-27:54", $s$1], [2, "34:0-34:66", $s$1], [16, "40:0-40:0", $s$1], [16, "40:0-40:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a1", null, $m$0, ["a", "b", "c", "d"], 0, 5, "8:0-11:1", 128, function a1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = bb)();
      $.state = 1;

    case 1:
      $.goto = 3;
      ($context.call = cc)();
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "9:2-9:6", $s$2], [2, "10:2-10:6", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]),
    $m$2 = $M.fun("m$2", "a2", null, $m$0, ["a", "b", "c", "d"], 0, 5, "15:0-18:1", 128, function a2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = bb)();
      $.state = 1;

    case 1:
      $.goto = 3;
      ($context.call = cc)();
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "16:2-16:6", $s$3], [2, "17:2-17:6", $s$3], [16, "18:1-18:1", $s$3], [16, "18:1-18:1", $s$3]]),
    $m$3 = $M.fun("m$3", "a3", null, $m$0, ["a", "b", "c", "d"], 0, 5, "22:0-25:1", 128, function a3($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = bb)();
      $.state = 1;

    case 1:
      $.goto = 3;
      ($context.call = cc)();
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "23:2-23:6", $s$4], [2, "24:2-24:6", $s$4], [16, "25:1-25:1", $s$4], [16, "25:1-25:1", $s$4]]),
    $m$4 = $M.fun("m$4", "a4", null, $m$0, ["a", "b", "c", "d"], 0, 5, "29:0-32:1", 128, function a4($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = bb)();
      $.state = 1;

    case 1:
      $.goto = 3;
      ($context.call = cc)();
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "30:2-30:6", $s$5], [2, "31:2-31:6", $s$5], [16, "32:1-32:1", $s$5], [16, "32:1-32:1", $s$5]]),
    $m$5 = $M.fun("m$5", "a5", null, $m$0, ["a", "b", "c", "d"], 0, 5, "36:0-39:1", 128, function a5($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = bb)();
      $.state = 1;

    case 1:
      $.goto = 3;
      ($context.call = cc)();
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "37:2-37:6", $s$6], [2, "38:2-38:6", $s$6], [16, "39:1-39:1", $s$6], [16, "39:1-39:1", $s$6]]);

$M.moduleExports();