var $M = require("@effectful/debugger/api"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-9:0", 160, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-8:1", $s$1], [16, "9:0-9:0", $s$1], [16, "9:0-9:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-8:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)("in body");
      $.state = 2;

    case 2:
      if ($p) {
        $l[1] = 8;
        $.goto = 4;
        continue;
      } else {
        $.state = 3;
      }

    case 3:
      $l[1] = 6;
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = eff)("in `finally`");
      $.state = 5;

    case 5:
      $.error = $l[2];
      $.goto = $l[1];
      continue;

    case 6:
      $.goto = 8;
      ($context.call = eff)("after `finally`");
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
    case 1:
      $l[2] = $.error;
      $l[1] = 7;
      $.goto = 4;
      break;

    default:
      $.goto = 7;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
    case 1:
      $l[1] = 8;
      $.goto = 4;
      break;

    default:
      $.goto = 8;
      break;
  }
}, 1, [[0, null, $s$2], [3, "3:8-3:22", $s$2], [1, null, $s$2], [1, null, $s$2], [2, "5:4-5:23", $s$2], [0, null, $s$2], [2, "7:2-7:24", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);

$M.moduleExports();