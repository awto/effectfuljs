var $M = require("@effectful/debugger/api"),
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-17:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("1:0-16:3");
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
}, null, null, 0, [[4, "1:0-16:3", $s$1], [0, null, $s$1], [16, "17:0-17:0", $s$1], [16, "17:0-17:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 5, "1:1-16:1", 0, function ($, $l, $p) {
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
      $brk("4:2-13:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("4:7-13:3");
      $.state = 4;

    case 4:
      $l[1] = 0;
      $.state = 5;

    case 5:
      if ($l[1] < 3) {
        $.goto = 10;
        $brk("5:4-5:11");
        continue;
      } else {
        $.state = 6;
      }

    case 6:
      $.goto = 7;
      $brk("14:2-14:9");
      $.state = 7;

    case 7:
      $.goto = 8;
      ($context.call = eff)(5);
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk("15:2-15:9");
      $.state = 9;

    case 9:
      $.goto = 27;
      ($context.call = eff)(6);
      continue;

    case 10:
      $.goto = 11;
      ($context.call = eff)($l[1]);
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk("6:4-10:5");
      $.state = 12;

    case 12:
      $l[2] = 0;
      $l[3] = $l[4].length;
      $.state = 13;

    case 13:
      if ($l[2] < $l[3]) {
        $.goto = 19;
        $brk("7:6-7:17");
        continue;
      } else {
        $.state = 14;
      }

    case 14:
      $.goto = 15;
      $brk("11:4-11:11");
      $.state = 15;

    case 15:
      $.goto = 16;
      ($context.call = eff)(3);
      $.state = 16;

    case 16:
      $.goto = 17;
      $brk("12:4-12:11");
      $.state = 17;

    case 17:
      $.goto = 18;
      ($context.call = eff)(4);
      $.state = 18;

    case 18:
      $l[1] = $l[1] + 1;
      $.goto = 5;
      continue;

    case 19:
      d = $l[4][$l[2]];
      $.goto = 20;
      $brk("8:6-8:24");
      $.state = 20;

    case 20:
      $.goto = 21;
      $p = ($context.call = eff)(d);
      $.state = 21;

    case 21:
      if ($p) {
        $.goto = 14;
        $brk("8:18-8:24");
        continue;
      } else {
        $.state = 22;
      }

    case 22:
      $.goto = 23;
      $brk("9:6-9:28");
      $.state = 23;

    case 23:
      $.goto = 24;
      $p = ($context.call = eff)(2);
      $.state = 24;

    case 24:
      if ($p) {
        $.goto = 6;
        $brk("9:18-9:28");
        continue;
      } else {
        $.state = 25;
      }

    case 25:
      $l[2] = $l[2] + 1;
      $.goto = 13;
      continue;

    case 26:
      $.goto = 27;
      return $unhandled($.error);

    case 27:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:21", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-13:3", $s$2], [4, "4:7-13:3", $s$2], [0, "4:12-4:17", $s$2], [4, "5:4-5:11", $s$2], [4, "14:2-14:9", $s$2], [2, "14:2-14:8", $s$2], [4, "15:2-15:9", $s$2], [2, "15:2-15:8", $s$2], [2, "5:4-5:10", $s$2], [4, "6:4-10:5", $s$2], [0, "6:9-6:14", $s$2], [4, "7:6-7:17", $s$2], [4, "11:4-11:11", $s$2], [2, "11:4-11:10", $s$2], [4, "12:4-12:11", $s$2], [2, "12:4-12:10", $s$2], [0, "4:26-4:29", $s$2], [4, "8:6-8:24", $s$2], [2, "8:10-8:16", $s$2], [4, "8:18-8:24", $s$2], [4, "9:6-9:28", $s$2], [2, "9:10-9:16", $s$2], [4, "9:18-9:28", $s$2], [0, "6:43-6:46", $s$2], [16, "16:1-16:1", $s$2], [16, "16:1-16:1", $s$2]]);

$M.moduleExports();