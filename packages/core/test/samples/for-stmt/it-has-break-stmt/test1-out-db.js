var $M = require("@effectful/debugger"),
    $x = $M.context,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-11:0", 160, function ($, $l, $p) {
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
}, null, null, 0, [[0, null, $s$1], [16, "11:0-11:0", $s$1], [16, "11:0-11:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 5, "1:1-10:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[4] = [1, 2, 3];
      $l[2] = 0;
      $l[3] = $l[4].length;
      $.state = 1;

    case 1:
      if ($l[2] < $l[3]) {
        $l[1] = $l[4][$l[2]];
        $.goto = 4;
        $p = ($x.call = eff)($l[1]);
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      ($x.call = eff)(2);
      $.state = 3;

    case 3:
      $.goto = 7;
      ($x.call = eff)(3);
      continue;

    case 4:
      if ($p) {
        $.goto = 2;
        continue;
      } else {
        $.state = 5;
      }

    case 5:
      $l[2] = $l[2] + 1;
      $.goto = 1;
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, "3:2-3:17", $s$2], [2, "6:8-6:14", $s$2], [2, "8:2-8:8", $s$2], [2, "9:2-9:8", $s$2], [0, null, $s$2], [0, "4:41-4:44", $s$2], [16, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2]]);

$M.moduleExports();