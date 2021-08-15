var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-29:0", 160, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
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
}, null, null, 0, [[0, "1:0-28:1", $s$1], [16, "29:0-29:0", $s$1], [16, "29:0-29:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-28:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($x.call = eff1)();
      $.state = 1;

    case 1:
      if (a1) {
        $.goto = 2;
        ($x.call = eff2)();
        $.state = 2;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      $mcall("option", M, {
        coerce: false
      });
      $.state = 3;

    case 3:
      $.goto = 4;
      ($x.call = eff3)();
      $.state = 4;

    case 4:
      if (a2) {
        $.goto = 5;
        ($x.call = eff4)();
        $.state = 5;
      } else {
        $.state = 5;
      }

    case 5:
      $.goto = 6;
      $mcall("option", M, {
        coerce: true
      });
      $.state = 6;

    case 6:
      $.goto = 7;
      ($x.call = eff5)();
      $.state = 7;

    case 7:
      if (a3) {
        $.goto = 8;
        ($x.call = eff6)();
        $.state = 8;
      } else {
        $.state = 8;
      }

    case 8:
      $.goto = 9;
      ($x.call = eff7)();
      $.state = 9;

    case 9:
      if (a4) {
        $.goto = 10;
        ($x.call = eff8)();
        $.state = 10;
      } else {
        $.state = 10;
      }

    case 10:
      $.goto = 12;
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "3:4-3:10", $s$2], [2, "5:6-5:12", $s$2], [2, "8:2-8:29", $s$2], [2, "10:4-10:10", $s$2], [2, "12:6-12:12", $s$2], [2, "16:4-16:30", $s$2], [2, "17:4-17:10", $s$2], [2, "19:6-19:12", $s$2], [2, "23:4-23:10", $s$2], [2, "25:6-25:12", $s$2], [0, null, $s$2], [16, "28:1-28:1", $s$2], [16, "28:1-28:1", $s$2]]);

$M.moduleExports();