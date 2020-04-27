var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-12:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $.goto = 2;
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[0, "1:0-11:1", $s$1], [16, "12:0-12:0", $s$1], [16, "12:0-12:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-11:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff1)(1);
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $l[0][1];
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($context.call = test)(1);
      $.state = 5;

    case 5:
      if ($p) {
        $.state = 6;
      } else {
        $.goto = 16;
        continue;
      }

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      b;
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff)(3);
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      c;
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      ($context.call = eff)(4);
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $.goto = 15;
      ($context.call = eff)(6);
      $.state = 15;

    case 15:
      $.goto = 19;
      $brk();
      continue;

    case 16:
      $.goto = 17;
      $brk();
      $.state = 17;

    case 17:
      $.goto = 13;
      ($context.call = eff)(5);
      continue;

    case 18:
      $.goto = 19;
      return $unhandled($.error);

    case 19:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:10", $s$2], [2, "2:2-2:9", $s$2], [4, "3:2-3:4", $s$2], [4, "4:2-9:16", $s$2], [2, "4:6-4:13", $s$2], [0, null, $s$2], [4, "5:4-5:6", $s$2], [4, "6:4-6:11", $s$2], [2, "6:4-6:10", $s$2], [4, "7:4-7:6", $s$2], [4, "8:4-8:11", $s$2], [2, "8:4-8:10", $s$2], [36, "9:3-9:3", $s$2], [4, "10:2-10:9", $s$2], [2, "10:2-10:8", $s$2], [36, "11:1-11:1", $s$2], [4, "9:9-9:16", $s$2], [2, "9:9-9:15", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]);

$M.moduleExports();