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
    $s$3 = [{}, $s$2, 2],
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
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 2, "1:1-8:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-6:19");
      $.state = 1;

    case 1:
      $l = $.$ = [$l];
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("3:4-3:25");
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($context.call = eff)(1);
      $.state = 4;

    case 4:
      if ($p) {
        $.goto = 12;
        $brk("3:16-3:25");
        continue;
      } else {
        $.state = 5;
      }

    case 5:
      $.goto = 6;
      $brk("4:4-4:22");
      $.state = 6;

    case 6:
      $.goto = 7;
      $p = ($context.call = eff)(2);
      $.state = 7;

    case 7:
      if ($p) {
        $.goto = 11;
        $brk("4:16-4:22");
        continue;
      } else {
        $.state = 8;
      }

    case 8:
      $.goto = 9;
      $brk("5:4-5:11");
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = eff)(3);
      $.state = 10;

    case 10:
      $l = $.$ = $l.slice();
      $.goto = 12;
      continue;

    case 11:
      $l[0][1] = 15;
      $.goto = 14;
      continue;

    case 12:
      $.goto = 13;
      $p = ($context.call = eff)(4);
      $.state = 13;

    case 13:
      if ($p) {
        $.goto = 2;
        continue;
      } else {
        $.goto = 11;
        continue;
      }

    case 14:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 15:
      $.goto = 16;
      $brk("7:2-7:9");
      $.state = 16;

    case 16:
      $.goto = 18;
      ($context.call = eff)(5);
      continue;

    case 17:
      $.goto = 18;
      return $unhandled($.error);

    case 18:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
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
      $l[0][1] = 17;
      $.goto = 14;
      break;

    default:
      $.goto = 17;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
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
      $l[0][1] = 18;
      $.goto = 14;
      break;

    default:
      $.goto = 18;
      break;
  }
}, 1, [[4, "2:2-6:19", $s$2], [0, null, $s$2], [5, "3:4-3:25", $s$3], [3, "3:8-3:14", $s$3], [5, "3:16-3:25", $s$3], [5, "4:4-4:22", $s$3], [3, "4:8-4:14", $s$3], [5, "4:16-4:22", $s$3], [5, "5:4-5:11", $s$3], [3, "5:4-5:10", $s$3], [1, null, $s$2], [1, null, $s$2], [3, "6:11-6:17", $s$3], [1, null, $s$2], [0, null, $s$2], [4, "7:2-7:9", $s$2], [2, "7:2-7:8", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);

$M.moduleExports();