var $M = require("@effectful/debugger/api"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-28:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("1:0-27:3");
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
}, null, null, 0, [[4, "1:0-27:3", $s$1], [0, null, $s$1], [16, "28:0-28:0", $s$1], [16, "28:0-28:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 1, "1:1-27:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:9");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)(0);
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("3:2-25:17");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("3:7-25:17");
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("4:4-4:11");
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = eff)(1);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk("5:4-23:21");
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("6:6-6:13");
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff)(2);
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk("7:6-10:7");
      $.state = 10;

    case 10:
      $.goto = 11;
      $p = ($context.call = eff)(3);
      $.state = 11;

    case 11:
      if ($p) {
        $.goto = 34;
        $brk("8:8-8:15");
        continue;
      } else {
        $.state = 12;
      }

    case 12:
      $.goto = 13;
      $brk("11:6-14:7");
      $.state = 13;

    case 13:
      $.goto = 14;
      $p = ($context.call = eff)(3);
      $.state = 14;

    case 14:
      if ($p) {
        $.goto = 32;
        $brk("12:8-12:15");
        continue;
      } else {
        $.state = 15;
      }

    case 15:
      $.goto = 16;
      $brk("15:6-18:7");
      $.state = 16;

    case 16:
      $.goto = 17;
      $p = ($context.call = eff)(5);
      $.state = 17;

    case 17:
      if ($p) {
        $.goto = 30;
        $brk("16:8-16:15");
        continue;
      } else {
        $.state = 18;
      }

    case 18:
      $.goto = 19;
      $brk("19:6-22:7");
      $.state = 19;

    case 19:
      $.goto = 20;
      $p = ($context.call = eff)(7);
      $.state = 20;

    case 20:
      if ($p) {
        $.goto = 28;
        $brk("20:8-20:15");
        continue;
      } else {
        $.state = 21;
      }

    case 21:
      $.goto = 22;
      $p = ($context.call = eff)(9);
      $.state = 22;

    case 22:
      if ($p) {
        $.goto = 7;
        continue;
      } else {
        $.state = 23;
      }

    case 23:
      $.goto = 24;
      $brk("24:4-24:12");
      $.state = 24;

    case 24:
      $.goto = 25;
      ($context.call = eff)(10);
      $.state = 25;

    case 25:
      if (true) {
        $.goto = 4;
        continue;
      } else {
        $.state = 26;
      }

    case 26:
      $.goto = 27;
      $brk("26:2-26:10");
      $.state = 27;

    case 27:
      $.goto = 37;
      ($context.call = eff)(11);
      continue;

    case 28:
      $.goto = 29;
      ($context.call = eff)(8);
      $.state = 29;

    case 29:
      $.goto = 26;
      $brk("21:8-21:18");
      continue;

    case 30:
      $.goto = 31;
      ($context.call = eff)(6);
      $.state = 31;

    case 31:
      $.goto = 25;
      $brk("17:8-17:21");
      continue;

    case 32:
      $.goto = 33;
      ($context.call = eff)(4);
      $.state = 33;

    case 33:
      $.goto = 21;
      $brk("13:8-13:17");
      continue;

    case 34:
      $.goto = 35;
      ($context.call = eff)(4);
      $.state = 35;

    case 35:
      $.goto = 23;
      $brk("9:8-9:14");
      continue;

    case 36:
      $.goto = 37;
      return $unhandled($.error);

    case 37:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:9", $s$2], [2, "2:2-2:8", $s$2], [4, "3:2-25:17", $s$2], [4, "3:7-25:17", $s$2], [4, "4:4-4:11", $s$2], [2, "4:4-4:10", $s$2], [4, "5:4-23:21", $s$2], [4, "6:6-6:13", $s$2], [2, "6:6-6:12", $s$2], [4, "7:6-10:7", $s$2], [2, "7:10-7:16", $s$2], [4, "8:8-8:15", $s$2], [4, "11:6-14:7", $s$2], [2, "11:10-11:16", $s$2], [4, "12:8-12:15", $s$2], [4, "15:6-18:7", $s$2], [2, "15:10-15:16", $s$2], [4, "16:8-16:15", $s$2], [4, "19:6-22:7", $s$2], [2, "19:10-19:16", $s$2], [4, "20:8-20:15", $s$2], [2, "23:13-23:19", $s$2], [0, null, $s$2], [4, "24:4-24:12", $s$2], [2, "24:4-24:11", $s$2], [0, null, $s$2], [4, "26:2-26:10", $s$2], [2, "26:2-26:9", $s$2], [2, "20:8-20:14", $s$2], [4, "21:8-21:18", $s$2], [2, "16:8-16:14", $s$2], [4, "17:8-17:21", $s$2], [2, "12:8-12:14", $s$2], [4, "13:8-13:17", $s$2], [2, "8:8-8:14", $s$2], [4, "9:8-9:14", $s$2], [16, "27:1-27:1", $s$2], [16, "27:1-27:1", $s$2]]);

$M.moduleExports();