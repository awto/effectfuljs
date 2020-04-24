var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $s$4 = [{}, $s$3, 3],
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
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 2, "1:1-27:1", 0, function ($, $l, $p) {
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
      $l = $.$ = [$l, void 0, void 0];
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("4:4-4:11");
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff)(1);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("5:4-23:21");
      $.state = 8;

    case 8:
      $l = $.$ = [$l];
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk("6:6-6:13");
      $.state = 10;

    case 10:
      $.goto = 11;
      ($context.call = eff)(2);
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk("7:6-10:7");
      $.state = 12;

    case 12:
      $.goto = 13;
      $p = ($context.call = eff)(3);
      $.state = 13;

    case 13:
      if ($p) {
        $.state = 14;
      } else {
        $.goto = 18;
        continue;
      }

    case 14:
      $.goto = 15;
      $brk("8:8-8:15");
      $.state = 15;

    case 15:
      $.goto = 16;
      ($context.call = eff)(4);
      $.state = 16;

    case 16:
      $.goto = 17;
      $brk("9:8-9:14");
      $.state = 17;

    case 17:
      $l[0][1] = 40;
      $.goto = 39;
      continue;

    case 18:
      $.goto = 19;
      $brk("11:6-14:7");
      $.state = 19;

    case 19:
      $.goto = 20;
      $p = ($context.call = eff)(3);
      $.state = 20;

    case 20:
      if ($p) {
        $.state = 21;
      } else {
        $.goto = 26;
        continue;
      }

    case 21:
      $.goto = 22;
      $brk("12:8-12:15");
      $.state = 22;

    case 22:
      $.goto = 23;
      ($context.call = eff)(4);
      $.state = 23;

    case 23:
      $.goto = 24;
      $brk("13:8-13:17");
      $.state = 24;

    case 24:
      $.goto = 25;
      $p = ($context.call = eff)(9);
      $.state = 25;

    case 25:
      if ($p) {
        $.goto = 9;
        continue;
      } else {
        $.goto = 17;
        continue;
      }

    case 26:
      $.goto = 27;
      $brk("15:6-18:7");
      $.state = 27;

    case 27:
      $.goto = 28;
      $p = ($context.call = eff)(5);
      $.state = 28;

    case 28:
      if ($p) {
        $.state = 29;
      } else {
        $.goto = 32;
        continue;
      }

    case 29:
      $.goto = 30;
      $brk("16:8-16:15");
      $.state = 30;

    case 30:
      $.goto = 31;
      ($context.call = eff)(6);
      $.state = 31;

    case 31:
      $l[0][1] = 43;
      $.goto = 39;
      $brk("17:8-17:21");
      continue;

    case 32:
      $.goto = 33;
      $brk("19:6-22:7");
      $.state = 33;

    case 33:
      $.goto = 34;
      $p = ($context.call = eff)(7);
      $.state = 34;

    case 34:
      if ($p) {
        $.state = 35;
      } else {
        $.goto = 38;
        continue;
      }

    case 35:
      $.goto = 36;
      $brk("20:8-20:15");
      $.state = 36;

    case 36:
      $.goto = 37;
      ($context.call = eff)(8);
      $.state = 37;

    case 37:
      $l[0][1] = 45;
      $l[0][0][1] = 46;
      $.goto = 39;
      $brk("21:8-21:18");
      continue;

    case 38:
      $l = $.$ = $l.slice();
      $.goto = 24;
      continue;

    case 39:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 40:
      $.goto = 41;
      $brk("24:4-24:12");
      $.state = 41;

    case 41:
      $.goto = 42;
      ($context.call = eff)(10);
      $.state = 42;

    case 42:
      $l = $.$ = $l.slice();
      $.state = 43;

    case 43:
      if (true) {
        $.goto = 5;
        continue;
      } else {
        $.state = 44;
      }

    case 44:
      $l[0][1] = 46;
      $.state = 45;

    case 45:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 46:
      $.goto = 47;
      $brk("26:2-26:10");
      $.state = 47;

    case 47:
      $.goto = 49;
      ($context.call = eff)(11);
      continue;

    case 48:
      $.goto = 49;
      return $unhandled($.error);

    case 49:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 44:
    case 43:
    case 42:
    case 41:
    case 40:
    case 39:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][1] = 48;
      $.goto = 45;
      break;

    case 38:
    case 37:
    case 36:
    case 35:
    case 34:
    case 33:
    case 32:
    case 31:
    case 30:
    case 29:
    case 28:
    case 27:
    case 26:
    case 25:
    case 24:
    case 23:
    case 22:
    case 21:
    case 20:
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
      $l[0][1] = 45;
      $l[0][0][1] = 48;
      $.goto = 39;
      break;

    default:
      $.goto = 48;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 44:
    case 43:
    case 42:
    case 41:
    case 40:
    case 39:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][1] = 49;
      $.goto = 45;
      break;

    case 38:
    case 37:
    case 36:
    case 35:
    case 34:
    case 33:
    case 32:
    case 31:
    case 30:
    case 29:
    case 28:
    case 27:
    case 26:
    case 25:
    case 24:
    case 23:
    case 22:
    case 21:
    case 20:
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
      $l[0][1] = 45;
      $l[0][0][1] = 49;
      $.goto = 39;
      break;

    default:
      $.goto = 49;
      break;
  }
}, 1, [[4, "2:2-2:9", $s$2], [2, "2:2-2:8", $s$2], [4, "3:2-25:17", $s$2], [4, "3:7-25:17", $s$2], [0, null, $s$2], [5, "4:4-4:11", $s$3], [3, "4:4-4:10", $s$3], [5, "5:4-23:21", $s$3], [1, null, $s$2], [5, "6:6-6:13", $s$4], [3, "6:6-6:12", $s$4], [5, "7:6-10:7", $s$4], [3, "7:10-7:16", $s$4], [1, null, $s$2], [5, "8:8-8:15", $s$4], [3, "8:8-8:14", $s$4], [5, "9:8-9:14", $s$4], [1, null, $s$2], [5, "11:6-14:7", $s$4], [3, "11:10-11:16", $s$4], [1, null, $s$2], [5, "12:8-12:15", $s$4], [3, "12:8-12:14", $s$4], [5, "13:8-13:17", $s$4], [3, "23:13-23:19", $s$4], [1, null, $s$2], [5, "15:6-18:7", $s$4], [3, "15:10-15:16", $s$4], [1, null, $s$2], [5, "16:8-16:15", $s$4], [3, "16:8-16:14", $s$4], [5, "17:8-17:21", $s$4], [5, "19:6-22:7", $s$4], [3, "19:10-19:16", $s$4], [1, null, $s$2], [5, "20:8-20:15", $s$4], [3, "20:8-20:14", $s$4], [5, "21:8-21:18", $s$4], [1, null, $s$2], [1, null, $s$2], [5, "24:4-24:12", $s$3], [3, "24:4-24:11", $s$3], [1, null, $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [4, "26:2-26:10", $s$2], [2, "26:2-26:9", $s$2], [16, "27:1-27:1", $s$2], [16, "27:1-27:1", $s$2]]);

$M.moduleExports();