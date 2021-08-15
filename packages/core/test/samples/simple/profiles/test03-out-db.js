var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-7:0", 160, function ($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-6:1", $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-6:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($x.call = p1)();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($x.call = p2)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($x.call = e1)();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($x.call = M)($p);
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($x.call = e)(2);
      $.state = 5;

    case 5:
      $.goto = 7;
      ($x.call = M)($p);
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "2:2-2:6", $s$2], [2, "3:2-3:6", $s$2], [2, "4:4-4:8", $s$2], [2, "4:2-4:9", $s$2], [2, "5:4-5:8", $s$2], [2, "5:2-5:9", $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]);

$M.moduleExports();