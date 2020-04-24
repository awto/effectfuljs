var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{
  e: [1, "9:13-9:14"]
}, $s$2, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-16:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("1:0-15:3");
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
}, null, null, 0, [[4, "1:0-15:3", $s$1], [0, null, $s$1], [16, "16:0-16:0", $s$1], [16, "16:0-16:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 2, "1:1-15:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-13:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:4-11:5");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("4:6-7:7");
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
      $brk("5:8-5:28");
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff)("before break");
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("6:8-6:18");
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk("14:2-14:9");
      $.state = 9;

    case 9:
      $.goto = 17;
      ($context.call = eff)(5);
      continue;

    case 10:
      $.goto = 11;
      $brk("8:6-8:13");
      $.state = 11;

    case 11:
      $.goto = 12;
      ($context.call = eff)(2);
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk("12:4-12:11");
      $.state = 13;

    case 13:
      $.goto = 8;
      ($context.call = eff)(4);
      continue;

    case 14:
      $lset($l, 1,
      /*e*/
      $.error);
      $.error = void 0;
      $.goto = 15;
      $brk("10:6-10:13");
      $.state = 15;

    case 15:
      $.goto = 12;
      ($context.call = eff)(3);
      continue;

    case 16:
      $.goto = 17;
      return $unhandled($.error);

    case 17:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 11:
    case 10:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
      $.goto = 14;
      break;

    default:
      $.goto = 16;
      break;
  }
}, null, 1, [[4, "2:2-13:3", $s$2], [4, "3:4-11:5", $s$2], [5, "4:6-7:7", $s$2], [3, "4:10-4:16", $s$2], [1, null, $s$2], [5, "5:8-5:28", $s$2], [3, "5:8-5:27", $s$2], [5, "6:8-6:18", $s$2], [4, "14:2-14:9", $s$2], [2, "14:2-14:8", $s$2], [5, "8:6-8:13", $s$2], [3, "8:6-8:12", $s$2], [4, "12:4-12:11", $s$2], [2, "12:4-12:10", $s$2], [4, "10:6-10:13", $s$3], [2, "10:6-10:12", $s$3], [16, "15:1-15:1", $s$2], [16, "15:1-15:1", $s$2]]);

$M.moduleExports();