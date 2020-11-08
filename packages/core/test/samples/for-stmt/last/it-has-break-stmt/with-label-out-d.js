var $M = require("@effectful/debugger"),
    $x = $M.context,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-13:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
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
}, null, null, 0, [[4, "1:0-12:3", $s$1], [0, null, $s$1], [16, "13:0-13:0", $s$1], [16, "13:0-13:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 5, "1:1-12:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $l[4] = [1, 2, 3];
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $l[1] = 0;
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      if ($l[1] < 3) {
        $.state = 8;
      } else {
        $.goto = 30;
        continue;
      }

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      ($x.call = eff)($l[1]);
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $l[2] = 0;
      $l[3] = $l[4].length;
      $.state = 13;

    case 13:
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      if ($l[2] < $l[3]) {
        $.state = 15;
      } else {
        $.goto = 27;
        continue;
      }

    case 15:
      $.goto = 16;
      $brk();
      $.state = 16;

    case 16:
      d = $l[4][$l[2]];
      $.goto = 17;
      $brk();
      $.state = 17;

    case 17:
      $.goto = 18;
      $p = ($x.call = eff)(d);
      $.state = 18;

    case 18:
      if ($p) {
        $.state = 19;
      } else {
        $.goto = 20;
        continue;
      }

    case 19:
      $.goto = 27;
      $brk();
      continue;

    case 20:
      $.goto = 21;
      $brk();
      $.state = 21;

    case 21:
      $.goto = 22;
      $p = ($x.call = eff)(2);
      $.state = 22;

    case 22:
      if ($p) {
        $.state = 23;
      } else {
        $.goto = 24;
        continue;
      }

    case 23:
      $.goto = 30;
      $brk();
      continue;

    case 24:
      $.goto = 25;
      $brk();
      $.state = 25;

    case 25:
      $.goto = 26;
      $brk();
      $.state = 26;

    case 26:
      $l[2] = $l[2] + 1;
      $.goto = 13;
      continue;

    case 27:
      $.goto = 28;
      $brk();
      $.state = 28;

    case 28:
      $.goto = 29;
      $brk();
      $.state = 29;

    case 29:
      $l[1] = $l[1] + 1;
      $.goto = 6;
      continue;

    case 30:
      $.goto = 32;
      $brk();
      continue;

    case 31:
      $.goto = 32;
      return $unhandled($.error);

    case 32:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:21", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-11:3", $s$2], [4, "4:7-11:3", $s$2], [4, "4:12-4:17", $s$2], [0, "4:12-4:17", $s$2], [4, "4:19-4:24", $s$2], [0, null, $s$2], [4, "5:4-5:11", $s$2], [2, "5:4-5:10", $s$2], [4, "6:4-10:5", $s$2], [4, "6:9-6:32", $s$2], [0, "6:9-6:14", $s$2], [4, "6:34-6:41", $s$2], [0, null, $s$2], [4, "7:6-7:17", $s$2], [4, "8:6-8:24", $s$2], [2, "8:10-8:16", $s$2], [0, null, $s$2], [4, "8:18-8:24", $s$2], [4, "9:6-9:28", $s$2], [2, "9:10-9:16", $s$2], [0, null, $s$2], [4, "9:18-9:28", $s$2], [36, "10:5-10:5", $s$2], [4, "6:43-6:46", $s$2], [0, "6:43-6:46", $s$2], [36, "11:3-11:3", $s$2], [4, "4:26-4:29", $s$2], [0, "4:26-4:29", $s$2], [36, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();