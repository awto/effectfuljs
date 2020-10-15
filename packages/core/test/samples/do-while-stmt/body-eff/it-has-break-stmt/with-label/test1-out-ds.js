var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
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
}, null, null, 0, [[4, "1:0-27:3", $s$1], [0, null, $s$1], [16, "28:0-28:0", $s$1], [16, "28:0-28:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 2, "1:1-27:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)(0);
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $l = $.$ = [$l, void 0, void 0];
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff)(1);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $l = $.$ = [$l];
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      ($context.call = eff)(2);
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk();
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
      $brk();
      $.state = 15;

    case 15:
      $.goto = 16;
      ($context.call = eff)(4);
      $.state = 16;

    case 16:
      $.goto = 17;
      $brk();
      $.state = 17;

    case 17:
      $l[0][1] = 43;
      $.goto = 42;
      continue;

    case 18:
      $.goto = 19;
      $brk();
      $.state = 19;

    case 19:
      $.goto = 20;
      $p = ($context.call = eff)(3);
      $.state = 20;

    case 20:
      if ($p) {
        $.state = 21;
      } else {
        $.goto = 27;
        continue;
      }

    case 21:
      $.goto = 22;
      $brk();
      $.state = 22;

    case 22:
      $.goto = 23;
      ($context.call = eff)(4);
      $.state = 23;

    case 23:
      $.goto = 24;
      $brk();
      $.state = 24;

    case 24:
      $.goto = 25;
      $brk();
      $.state = 25;

    case 25:
      $.goto = 26;
      $p = ($context.call = eff)(9);
      $.state = 26;

    case 26:
      if ($p) {
        $.goto = 9;
        continue;
      } else {
        $.goto = 17;
        continue;
      }

    case 27:
      $.goto = 28;
      $brk();
      $.state = 28;

    case 28:
      $.goto = 29;
      $p = ($context.call = eff)(5);
      $.state = 29;

    case 29:
      if ($p) {
        $.state = 30;
      } else {
        $.goto = 33;
        continue;
      }

    case 30:
      $.goto = 31;
      $brk();
      $.state = 31;

    case 31:
      $.goto = 32;
      ($context.call = eff)(6);
      $.state = 32;

    case 32:
      $l[0][1] = 47;
      $.goto = 42;
      $brk();
      continue;

    case 33:
      $.goto = 34;
      $brk();
      $.state = 34;

    case 34:
      $.goto = 35;
      $p = ($context.call = eff)(7);
      $.state = 35;

    case 35:
      if ($p) {
        $.state = 36;
      } else {
        $.goto = 39;
        continue;
      }

    case 36:
      $.goto = 37;
      $brk();
      $.state = 37;

    case 37:
      $.goto = 38;
      ($context.call = eff)(8);
      $.state = 38;

    case 38:
      $l[0][1] = 51;
      $l[0][0][1] = 52;
      $.goto = 42;
      $brk();
      continue;

    case 39:
      $.goto = 40;
      $brk();
      $.state = 40;

    case 40:
      $l = $.$ = [$l[0]];
      $.goto = 24;
      continue;

    case 41:
      return $raise($.error);

    case 42:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 43:
      $.goto = 44;
      $brk();
      $.state = 44;

    case 44:
      $.goto = 45;
      ($context.call = eff)(10);
      $.state = 45;

    case 45:
      $.goto = 46;
      $brk();
      $.state = 46;

    case 46:
      $l = $.$ = [$l[0], void 0, void 0];
      $.state = 47;

    case 47:
      $.goto = 48;
      $brk();
      $.state = 48;

    case 48:
      if (true) {
        $.goto = 5;
        continue;
      } else {
        $.state = 49;
      }

    case 49:
      $l[0][1] = 52;
      $.goto = 51;
      continue;

    case 50:
      return $raise($.error);

    case 51:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 52:
      $.goto = 53;
      $brk();
      $.state = 53;

    case 53:
      $.goto = 54;
      ($context.call = eff)(11);
      $.state = 54;

    case 54:
      $.goto = 56;
      $brk();
      continue;

    case 55:
      $.goto = 56;
      return $unhandled($.error);

    case 56:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 49:
    case 48:
    case 47:
    case 46:
    case 45:
    case 44:
    case 43:
    case 42:
    case 41:
    case 8:
    case 7:
    case 6:
    case 5:
      $.goto = 51;
      $l[0][1] = 50;
      break;

    case 40:
    case 39:
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
      $.goto = 42;
      $l[0][1] = 41;
      break;

    default:
      $.goto = 55;
  }
}, function ($, $l) {
  switch ($.state) {
    case 49:
    case 48:
    case 47:
    case 46:
    case 45:
    case 44:
    case 43:
    case 42:
    case 41:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][1] = 56;
      $.goto = 51;
      break;

    case 40:
    case 39:
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
      $l[0][1] = 51;
      $l[0][0][1] = 56;
      $.goto = 42;
      break;

    default:
      $.goto = 56;
      break;
  }
}, 1, [[4, "2:2-2:9", $s$2], [2, "2:2-2:8", $s$2], [4, "3:2-25:17", $s$2], [4, "3:7-25:17", $s$2], [0, null, $s$2], [4, "4:4-4:11", $s$3], [2, "4:4-4:10", $s$3], [4, "5:4-23:21", $s$3], [0, null, $s$3], [4, "6:6-6:13", $s$4], [2, "6:6-6:12", $s$4], [4, "7:6-10:7", $s$4], [2, "7:10-7:16", $s$4], [0, null, $s$4], [4, "8:8-8:15", $s$4], [2, "8:8-8:14", $s$4], [4, "9:8-9:14", $s$4], [0, null, $s$4], [4, "11:6-14:7", $s$4], [2, "11:10-11:16", $s$4], [0, null, $s$4], [4, "12:8-12:15", $s$4], [2, "12:8-12:14", $s$4], [4, "13:8-13:17", $s$4], [4, "23:13-23:19", $s$4], [2, "23:13-23:19", $s$4], [0, null, $s$4], [4, "15:6-18:7", $s$4], [2, "15:10-15:16", $s$4], [0, null, $s$4], [4, "16:8-16:15", $s$4], [2, "16:8-16:14", $s$4], [4, "17:8-17:21", $s$4], [4, "19:6-22:7", $s$4], [2, "19:10-19:16", $s$4], [0, null, $s$4], [4, "20:8-20:15", $s$4], [2, "20:8-20:14", $s$4], [4, "21:8-21:18", $s$4], [36, "23:5-23:5", $s$4], [0, null, $s$4], [0, null, $s$3], [0, null, $s$3], [4, "24:4-24:12", $s$3], [2, "24:4-24:11", $s$3], [36, "25:3-25:3", $s$3], [0, null, $s$3], [4, "25:11-25:15", $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [4, "26:2-26:10", $s$2], [2, "26:2-26:9", $s$2], [36, "27:1-27:1", $s$2], [16, "27:1-27:1", $s$2], [16, "27:1-27:1", $s$2]]);

$M.moduleExports();