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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-9:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[4, "1:0-8:3", $s$1], [0, null, $s$1], [16, "9:0-9:0", $s$1], [16, "9:0-9:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 2, "1:1-8:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $l = $.$ = [$l];
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($context.call = eff)(1);
      $.state = 4;

    case 4:
      if ($p) {
        $.state = 5;
      } else {
        $.goto = 10;
        continue;
      }

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      $p = ($context.call = eff)(4);
      $.state = 8;

    case 8:
      if ($p) {
        $.goto = 2;
        continue;
      } else {
        $.state = 9;
      }

    case 9:
      $l[0][1] = 20;
      $.goto = 19;
      continue;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      $p = ($context.call = eff)(2);
      $.state = 12;

    case 12:
      if ($p) {
        $.state = 13;
      } else {
        $.goto = 14;
        continue;
      }

    case 13:
      $.goto = 9;
      $brk();
      continue;

    case 14:
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $.goto = 16;
      ($context.call = eff)(3);
      $.state = 16;

    case 16:
      $.goto = 17;
      $brk();
      $.state = 17;

    case 17:
      $l = $.$ = [$l[0]];
      $.goto = 6;
      continue;

    case 18:
      return $raise($.error);

    case 19:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 20:
      $.goto = 21;
      $brk();
      $.state = 21;

    case 21:
      $.goto = 22;
      ($context.call = eff)(5);
      $.state = 22;

    case 22:
      $.goto = 24;
      $brk();
      continue;

    case 23:
      $.goto = 24;
      return $unhandled($.error);

    case 24:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
      $.goto = 19;
      $l[0][1] = 18;
      break;

    default:
      $.goto = 23;
  }
}, function ($, $l) {
  switch ($.state) {
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
      $l[0][1] = 24;
      $.goto = 19;
      break;

    default:
      $.goto = 24;
      break;
  }
}, 1, [[4, "2:2-6:19", $s$2], [0, null, $s$2], [4, "3:4-3:25", $s$3], [2, "3:8-3:14", $s$3], [0, null, $s$3], [4, "3:16-3:25", $s$3], [4, "6:11-6:17", $s$3], [2, "6:11-6:17", $s$3], [0, null, $s$3], [0, null, $s$3], [4, "4:4-4:22", $s$3], [2, "4:8-4:14", $s$3], [0, null, $s$3], [4, "4:16-4:22", $s$3], [4, "5:4-5:11", $s$3], [2, "5:4-5:10", $s$3], [36, "6:3-6:3", $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [4, "7:2-7:9", $s$2], [2, "7:2-7:8", $s$2], [36, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);

$M.moduleExports();