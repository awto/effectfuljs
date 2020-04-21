var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{}, null, 0],
    $s$2 = [{
  i: [1, "2:6-2:7"],
  j: [2, "2:9-2:10"],
  len: [3, "2:12-2:15"],
  ref: [4, "2:17-2:20"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-13:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $m$1($);
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
}, null, null, 0, [[0, null, $s$1], [16, "13:0-13:0", $s$1], [16, "13:0-13:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 5, "1:1-12:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[4] = [1, 2, 3];
      $l[1] = 0;
      $.state = 1;

    case 1:
      if ($l[1] < 3) {
        $.goto = 2;
        ($context.call = eff)($l[1]);
        $.state = 2;
      } else {
        $.goto = 10;
        continue;
      }

    case 2:
      $l[2] = 0;
      $l[3] = $l[4].length;
      $.state = 3;

    case 3:
      if ($l[2] < $l[3]) {
        d = $l[4][$l[2]];
        $.goto = 5;
        $p = ($context.call = eff)(d);
        continue;
      } else {
        $.state = 4;
      }

    case 4:
      $l[1] = $l[1] + 1;
      $.goto = 1;
      continue;

    case 5:
      if ($p) {
        $.goto = 8;
        continue;
      } else {
        $.state = 6;
      }

    case 6:
      $.goto = 7;
      $p = ($context.call = eff)(2);
      $.state = 7;

    case 7:
      if ($p) {
        $.goto = 4;
        continue;
      } else {
        $.state = 8;
      }

    case 8:
      $l[2] = $l[2] + 1;
      $.goto = 3;
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, "3:2-3:17", $s$2], [2, "5:4-5:10", $s$2], [0, "6:9-6:14", $s$2], [2, "8:10-8:16", $s$2], [0, "4:26-4:29", $s$2], [0, null, $s$2], [2, "9:10-9:16", $s$2], [0, null, $s$2], [0, "6:43-6:46", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();