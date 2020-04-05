var $M = require("@effectful/debugger/api"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "30:9-30:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $s$4 = [{}, $s$1, 1],
    $s$5 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-35:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$4($);
      $m$1($);
      $m$2($);
      $m$3($);
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
}, null, null, 0, [[0, "30:0-34:1", $s$1], [16, "35:0-35:0", $s$1], [16, "35:0-35:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 1, "1:1-9:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = eff)(1);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)(2);
      $.state = 2;

    case 2:
      if ($p) {
        $.state = 3;
      } else {
        $.goto = 3;
        ($context.call = eff)(3);
        $.state = 3;
      }

    case 3:
      $.goto = 4;
      ($context.call = eff)(4);
      $.state = 4;

    case 4:
      $.goto = 6;
      ($context.call = eff)(5);
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "2:2-2:8", $s$2], [2, "4:8-4:14", $s$2], [2, "5:9-5:15", $s$2], [2, "7:2-7:8", $s$2], [2, "8:2-8:8", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]),
    $m$2 = $M.fun("m$2", null, null, $m$0, [], 0, 1, "10:1-20:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = eff)(1);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)(2);
      $.state = 2;

    case 2:
      if ($p) {
        $.goto = 3;
        ($context.call = eff)("a");
        $.state = 3;
      } else {
        $.goto = 3;
        ($context.call = eff)(3);
        $.state = 3;
      }

    case 3:
      $.goto = 4;
      ($context.call = eff)(4);
      $.state = 4;

    case 4:
      $.goto = 6;
      ($context.call = eff)(5);
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "11:2-11:8", $s$3], [2, "13:8-13:14", $s$3], [2, "14:6-14:14", $s$3], [2, "18:2-18:8", $s$3], [2, "19:2-19:8", $s$3], [16, "20:1-20:1", $s$3], [16, "20:1-20:1", $s$3]]),
    $m$3 = $M.fun("m$3", null, null, $m$0, [], 0, 1, "21:1-29:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = eff)(1);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)(2);
      $.state = 2;

    case 2:
      if ($p) {
        $.goto = 5;
        ($context.call = eff)("a");
        continue;
      } else {
        $.state = 3;
      }

    case 3:
      $.goto = 4;
      ($context.call = eff)(4);
      $.state = 4;

    case 4:
      $.goto = 8;
      ($context.call = eff)(5);
      continue;

    case 5:
      $.goto = 6;
      $p = ($context.call = eff)("b");
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
}, null, null, 1, [[2, "22:2-22:8", $s$4], [2, "23:6-23:12", $s$4], [2, "24:4-24:12", $s$4], [2, "27:2-27:8", $s$4], [2, "28:2-28:8", $s$4], [2, "25:11-25:19", $s$4], [0, null, $s$4], [16, "29:1-29:1", $s$4], [16, "29:1-29:1", $s$4]]),
    $m$4 = $M.fun("m$4", "a", null, $m$0, [], 0, 1, "30:0-34:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if (e) {
        $.goto = 2;
        $p = ($context.call = eff)("b");
        continue;
      } else {
        $.state = 1;
      }

    case 1:
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
}, null, null, 1, [[2, "32:11-32:19", $s$5], [0, null, $s$5], [0, null, $s$5], [16, "34:1-34:1", $s$5], [16, "34:1-34:1", $s$5]]);

$M.moduleExports();