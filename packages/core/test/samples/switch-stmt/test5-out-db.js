var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  b: [1, "2:9-2:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-16:0", 160, function ($, $l, $p) {
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
}, null, null, 0, [[0, "2:0-15:1", $s$1], [16, "16:0-16:0", $s$1], [16, "16:0-16:0", $s$1]]),
    $m$1 = $M.fun("m$1", "b", null, $m$0, [], 0, 1, "2:0-15:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($x.call = eff)(1);
      $.state = 1;

    case 1:
      switch ($p) {
        case 1:
          $.goto = 7;
          $p = ($x.call = effB)(1);
          continue;

        case 2:
          $.state = 2;
          break;

        default:
          $.goto = 6;
          continue;
      }

    case 2:
      $.goto = 3;
      $p = ($x.call = effB)(2);
      $.state = 3;

    case 3:
      if ($p) {
        $.goto = 5;
        continue;
      } else {
        $.state = 4;
      }

    case 4:
      $.goto = 5;
      ($x.call = effB)(3);
      $.state = 5;

    case 5:
      $.goto = 10;
      continue;

    case 6:
      $.goto = 5;
      ($x.call = eff)(4);
      continue;

    case 7:
      if ($p) {
        $.goto = 5;
        continue;
      } else {
        $.state = 8;
      }

    case 8:
      $.goto = 2;
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "3:10-3:16", $s$2], [2, "5:10-5:17", $s$2], [2, "7:10-7:17", $s$2], [0, null, $s$2], [2, "10:6-10:13", $s$2], [0, null, $s$2], [2, "13:6-13:12", $s$2], [0, null, $s$2], [0, null, $s$2], [16, "15:1-15:1", $s$2], [16, "15:1-15:1", $s$2]]);

$M.moduleExports();