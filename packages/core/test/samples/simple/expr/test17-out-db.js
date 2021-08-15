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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-4:0", 160, function ($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-3:1", $s$1], [16, "4:0-4:0", $s$1], [16, "4:0-4:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-3:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($x.call = effc)(3);
      $.state = 1;

    case 1:
      $l[1] = $p;
      $.goto = 2;
      $p = ($x.call = effb)(2);
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($x.call = eff)($p + 4);
      $.state = 3;

    case 3:
      5 + $l[1] + $p;
      $.goto = 5;
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "2:6-2:13", $s$2], [2, "2:20-2:27", $s$2], [2, "2:16-2:32", $s$2], [0, "2:2-2:32", $s$2], [16, "3:1-3:1", $s$2], [16, "3:1-3:1", $s$2]]);

$M.moduleExports();