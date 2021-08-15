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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-13:0", 160, function ($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-12:1", $s$1], [16, "13:0-13:0", $s$1], [16, "13:0-13:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-12:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($x.call = eff)(1);
      $.state = 1;

    case 1:
      $l[1] = $p;
      $.goto = 2;
      $p = ($x.call = check)(1);
      $.state = 2;

    case 2:
      if ($l[1] === $p) {
        $.goto = 6;
        ($x.call = effB)(1);
        continue;
      } else {
        $.goto = 3;
        $p = ($x.call = check)(2);
        $.state = 3;
      }

    case 3:
      if ($l[1] === $p) {
        $.state = 4;
      } else {
        $.goto = 5;
        continue;
      }

    case 4:
      $.goto = 6;
      ($x.call = effB)(2);
      continue;

    case 5:
      $.goto = 6;
      ($x.call = effB)(3);
      $.state = 6;

    case 6:
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
}, null, null, 1, [[2, "2:10-2:16", $s$2], [2, "3:9-3:17", $s$2], [2, "4:6-4:13", $s$2], [0, null, $s$2], [2, "7:6-7:13", $s$2], [2, "10:6-10:13", $s$2], [0, null, $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();