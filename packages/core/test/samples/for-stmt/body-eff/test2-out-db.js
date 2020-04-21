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
  d: [3, "2:12-2:13"],
  len: [4, "2:15-2:18"],
  ref: [5, "2:20-2:23"]
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
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 6, "1:1-12:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[5] = [1, 2, 3];
      $l[1] = 0;
      $l[4] = $l[5].lenght;
      $.state = 1;

    case 1:
      if ($l[1] < $l[4]) {
        $l[2] = 0;
        $l[4] = $l[5].length;
        $.state = 2;
      } else {
        $.goto = 6;
        ($context.call = eff)(3);
        continue;
      }

    case 2:
      if ($l[2] < $l[4]) {
        $l[3] = $l[5][$l[2]];
        $.goto = 4;
        ($context.call = eff)($l[1]);
        continue;
      } else {
        $.goto = 3;
        ($context.call = eff)(2);
        $.state = 3;
      }

    case 3:
      $l[1] = $l[1] + 1;
      $.goto = 1;
      continue;

    case 4:
      $l[2] = $l[2] + 1;
      $.goto = 2;
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, "3:2-3:17", $s$2], [2, "11:2-11:8", $s$2], [2, "7:6-7:12", $s$2], [0, "4:41-4:44", $s$2], [0, "5:43-5:46", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();