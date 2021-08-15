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
    $s$2 = [{
  i: [1, "2:6-2:7"],
  j: [2, "3:4-3:5"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-6:0", 160, function ($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-5:1", $s$1], [16, "6:0-6:0", $s$1], [16, "6:0-6:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 5, "1:0-5:1", 128, function ($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = 0;
      $l[2] = 0;
      $1 = $l[1];
      $l[1] = $1 + 1;
      $l[3] = $1;
      $.goto = 1;
      $p = ($x.call = eff4)($l[1], $l[2]);
      $.state = 1;

    case 1:
      $1 = $l[2];
      $l[2] = $1 + 1;
      $.goto = 2;
      $p = ($x.call = eff3)($p, $1);
      $.state = 2;

    case 2:
      $l[4] = $p;
      $.goto = 3;
      $p = ($x.call = eff5)($l[1]);
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($x.call = eff2)($l[3], $l[4], $p);
      $.state = 4;

    case 4:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 5;
      $p = ($x.call = eff1)($p, $1);
      $.state = 5;

    case 5:
      $.goto = 7;
      ($x.call = eff0)($p, $l[1]);
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "4:27-4:37", $s$2], [2, "4:22-4:43", $s$2], [2, "4:45-4:52", $s$2], [2, "4:12-4:53", $s$2], [2, "4:7-4:59", $s$2], [2, "4:2-4:63", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]);

$M.moduleExports();