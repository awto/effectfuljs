var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 7, "1:0-37:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a*/
      $m$1($));
      $lset($l, 2,
      /*b*/
      $m$2($));
      $lset($l, 3,
      /*c*/
      $m$3($));
      $lset($l, 4,
      /*d*/
      $m$4($));
      $lset($l, 5,
      /*e*/
      $m$5($));
      $lset($l, 6,
      /*f*/
      $m$6($));
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "2:0-5:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("3:2-4:21");
      $.state = 1;

    case 1:
      if (true) {
        $.goto = 4;
        $brk("3:12-3:26");
        continue;
      } else {
        $.goto = 2;
        $brk("4:7-4:21");
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      $p = ($context.call = eff)(2);
      $.state = 3;

    case 3:
      $.result = $p;
      $.goto = 7;
      continue;

    case 4:
      $.goto = 5;
      $p = ($context.call = eff)(1);
      $.state = 5;

    case 5:
      $.result = $p;
      $.goto = 7;
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "3:2-4:21", $s$2], [4, "3:12-3:26", $s$2], [2, "4:14-4:20", $s$2], [0, null, $s$2], [2, "3:19-3:25", $s$2], [0, null, $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 1, "6:0-11:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("7:2-8:21");
      $.state = 1;

    case 1:
      if (true) {
        $.goto = 4;
        $brk("7:12-7:26");
        continue;
      } else {
        $.goto = 2;
        $brk("8:7-8:21");
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      $p = ($context.call = eff)(2);
      $.state = 3;

    case 3:
      $.result = $p;
      $.goto = 7;
      continue;

    case 4:
      $.goto = 5;
      $p = ($context.call = eff)(1);
      $.state = 5;

    case 5:
      $.result = $p;
      $.goto = 7;
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "7:2-8:21", $s$3], [4, "7:12-7:26", $s$3], [2, "8:14-8:20", $s$3], [0, null, $s$3], [2, "7:19-7:25", $s$3], [0, null, $s$3], [16, "11:1-11:1", $s$3], [16, "11:1-11:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 1, "12:0-17:1", 0, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("13:2-14:14");
      $.state = 1;

    case 1:
      if (true) {
        $.goto = 7;
        $brk("13:12-13:19");
        continue;
      } else {
        $.goto = 2;
        $brk("14:7-14:14");
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      ($context.call = eff)(2);
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("15:2-15:9");
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = eff)(3);
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("16:2-16:9");
      $.state = 6;

    case 6:
      $.goto = 9;
      ($context.call = eff)(4);
      continue;

    case 7:
      $.goto = 3;
      ($context.call = eff)(1);
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "13:2-14:14", $s$4], [4, "13:12-13:19", $s$4], [2, "14:7-14:13", $s$4], [4, "15:2-15:9", $s$4], [2, "15:2-15:8", $s$4], [4, "16:2-16:9", $s$4], [2, "16:2-16:8", $s$4], [2, "13:12-13:18", $s$4], [16, "17:1-17:1", $s$4], [16, "17:1-17:1", $s$4]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 1, "19:0-25:1", 0, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("20:2-20:11");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)("a");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("21:2-22:14");
      $.state = 3;

    case 3:
      if (true) {
        $.goto = 9;
        $brk("21:12-21:19");
        continue;
      } else {
        $.goto = 4;
        $brk("22:7-22:14");
        $.state = 4;
      }

    case 4:
      $.goto = 5;
      ($context.call = eff)(2);
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("23:2-23:9");
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff)(3);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("24:2-24:9");
      $.state = 8;

    case 8:
      $.goto = 11;
      ($context.call = eff)(4);
      continue;

    case 9:
      $.goto = 5;
      ($context.call = eff)(1);
      continue;

    case 10:
      $.goto = 11;
      return $unhandled($.error);

    case 11:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "20:2-20:11", $s$5], [2, "20:2-20:10", $s$5], [4, "21:2-22:14", $s$5], [4, "21:12-21:19", $s$5], [2, "22:7-22:13", $s$5], [4, "23:2-23:9", $s$5], [2, "23:2-23:8", $s$5], [4, "24:2-24:9", $s$5], [2, "24:2-24:8", $s$5], [2, "21:12-21:18", $s$5], [16, "25:1-25:1", $s$5], [16, "25:1-25:1", $s$5]]),
    $m$5 = $M.fun("m$5", "e", null, $m$0, [], 0, 1, "27:0-31:1", 0, function e($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("28:2-29:16");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)(1);
      $.state = 2;

    case 2:
      if ($p) {
        $.goto = 4;
        $brk("28:14-28:23");
        continue;
      } else {
        $.goto = 3;
        $brk("29:7-29:16");
        $.state = 3;
      }

    case 3:
      $.result = 2;
      $.goto = 6;
      continue;

    case 4:
      $.result = 1;
      $.goto = 6;
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "28:2-29:16", $s$6], [2, "28:6-28:12", $s$6], [4, "28:14-28:23", $s$6], [0, "29:14-29:15", $s$6], [0, "28:21-28:22", $s$6], [16, "31:1-31:1", $s$6], [16, "31:1-31:1", $s$6]]),
    $m$6 = $M.fun("m$6", "f", null, $m$0, [], 0, 1, "33:0-36:1", 0, function f($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("34:2-35:16");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)(1);
      $.state = 2;

    case 2:
      if ($p) {
        $.goto = 4;
        $brk("34:14-34:23");
        continue;
      } else {
        $.goto = 3;
        $brk("35:7-35:16");
        $.state = 3;
      }

    case 3:
      $.result = 2;
      $.goto = 6;
      continue;

    case 4:
      $.result = 1;
      $.goto = 6;
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "34:2-35:16", $s$7], [2, "34:6-34:12", $s$7], [4, "34:14-34:23", $s$7], [0, "35:14-35:15", $s$7], [0, "34:21-34:22", $s$7], [16, "36:1-36:1", $s$7], [16, "36:1-36:1", $s$7]]);

$M.moduleExports();