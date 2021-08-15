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
  i: [1, "2:11-2:12"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-10:0", 160, function ($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-9:1", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-9:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($x.call = init)();
      $.state = 1;

    case 1:
      $l[1] = $p;
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($x.call = check)();
      $.state = 3;

    case 3:
      if ($p === true) {
        $.goto = 4;
        ($x.call = b1)();
        $.state = 4;
      } else {
        $.goto = 7;
        continue;
      }

    case 4:
      if (v) {
        $.goto = 5;
        ($x.call = e)();
        $.state = 5;
      } else {
        $.state = 5;
      }

    case 5:
      $.goto = 2;
      ($x.call = upd)();
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "2:15-2:21", $s$2], [0, "2:11-2:21", $s$2], [2, "2:23-2:30", $s$2], [2, "3:4-3:8", $s$2], [2, "5:6-5:9", $s$2], [2, "2:41-2:46", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();