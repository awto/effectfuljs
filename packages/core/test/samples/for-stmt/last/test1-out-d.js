var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-9:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("1:0-8:3");
      $.state = 1;

    case 1:
      $m$1($);
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "1:0-8:3", $s$1], [0, null, $s$1], [16, "9:0-9:0", $s$1], [16, "9:0-9:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 5, "1:1-8:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:21");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:2-3:18");
      $.state = 2;

    case 2:
      $l[4] = [1, 2, 3];
      $.goto = 3;
      $brk("4:2-7:3");
      $.state = 3;

    case 3:
      $l[2] = 0;
      $l[3] = $l[4].length;
      $.state = 4;

    case 4:
      if ($l[2] < $l[3]) {
        $.state = 5;
      } else {
        $.goto = 11;
        continue;
      }

    case 5:
      $.goto = 6;
      $brk("5:4-5:15");
      $.state = 6;

    case 6:
      $l[1] = $l[4][$l[2]];
      $.goto = 7;
      $brk("6:4-6:22");
      $.state = 7;

    case 7:
      $.goto = 8;
      $p = ($context.call = eff)($l[1]);
      $.state = 8;

    case 8:
      if ($p) {
        $.state = 9;
      } else {
        $.goto = 10;
        continue;
      }

    case 9:
      $.goto = 11;
      $brk("6:16-6:22");
      continue;

    case 10:
      $l[2] = $l[2] + 1;
      $.goto = 4;
      continue;

    case 11:
      $.goto = 13;
      continue;

    case 12:
      $.goto = 13;
      return $unhandled($.error);

    case 13:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:21", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-7:3", $s$2], [0, "4:7-4:12", $s$2], [0, null, $s$2], [4, "5:4-5:15", $s$2], [4, "6:4-6:22", $s$2], [2, "6:8-6:14", $s$2], [0, null, $s$2], [4, "6:16-6:22", $s$2], [0, "4:41-4:44", $s$2], [0, null, $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);

$M.moduleExports();