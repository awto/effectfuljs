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
    $s$3 = [{
  e: [1, "8:13-8:14"]
}, $s$2, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-15:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("1:0-14:3");
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
}, null, null, 0, [[4, "1:0-14:3", $s$1], [0, null, $s$1], [16, "15:0-15:0", $s$1], [16, "15:0-15:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 2, "1:1-14:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-12:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:4-10:5");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("4:6-4:13");
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = eff)(2);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("5:6-6:36");
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($context.call = eff)(3);
      $.state = 6;

    case 6:
      if ($p) {
        $.goto = 13;
        $brk("5:18-5:28");
        continue;
      } else {
        $.goto = 7;
        $brk("6:11-6:36");
        $.state = 7;
      }

    case 7:
      $.goto = 8;
      $p = new ($context.call = Error)("error");
      $.state = 8;

    case 8:
      $.goto = 9;
      return $raise($p);

    case 9:
      $.goto = 10;
      $brk("7:6-7:13");
      $.state = 10;

    case 10:
      $.goto = 11;
      ($context.call = eff)(4);
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk("11:4-11:11");
      $.state = 12;

    case 12:
      $.goto = 13;
      ($context.call = eff)(6);
      $.state = 13;

    case 13:
      $.goto = 14;
      $brk("13:2-13:9");
      $.state = 14;

    case 14:
      $.goto = 18;
      ($context.call = eff)(7);
      continue;

    case 15:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 16;
      $brk("9:6-9:13");
      $.state = 16;

    case 16:
      $.goto = 11;
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
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
      $.goto = 15;
      break;

    default:
      $.goto = 17;
      break;
  }
}, null, 1, [[4, "2:2-12:3", $s$2], [4, "3:4-10:5", $s$2], [5, "4:6-4:13", $s$2], [3, "4:6-4:12", $s$2], [5, "5:6-6:36", $s$2], [3, "5:10-5:16", $s$2], [5, "5:18-5:28", $s$2], [3, "6:17-6:35", $s$2], [1, null, $s$2], [5, "7:6-7:13", $s$2], [3, "7:6-7:12", $s$2], [4, "11:4-11:11", $s$2], [2, "11:4-11:10", $s$2], [4, "13:2-13:9", $s$2], [2, "13:2-13:8", $s$2], [4, "9:6-9:13", $s$3], [2, "9:6-9:12", $s$3], [16, "14:1-14:1", $s$2], [16, "14:1-14:1", $s$2]]);

$M.moduleExports();