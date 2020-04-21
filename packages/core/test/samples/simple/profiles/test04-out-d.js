var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-13:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-12:1", $s$1], [16, "13:0-13:0", $s$1], [16, "13:0-13:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-12:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:20");
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("log", console, "hi");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("3:2-3:7");
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = e1)();
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("4:2-4:7");
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = e2)();
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk("5:2-5:23");
      $.state = 7;

    case 7:
      $.goto = 8;
      $mcall("profile", M, "minimal");
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk("6:2-6:7");
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = p1)();
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk("7:2-7:29");
      $.state = 11;

    case 11:
      $.goto = 12;
      $mcall("profile", console, "minimal");
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk("8:2-8:7");
      $.state = 13;

    case 13:
      $.goto = 14;
      ($context.call = p2)();
      $.state = 14;

    case 14:
      $.goto = 15;
      $brk("9:2-9:23");
      $.state = 15;

    case 15:
      $.goto = 16;
      $mcall("profileEnd", console);
      $.state = 16;

    case 16:
      $.goto = 17;
      $brk("10:2-10:10");
      $.state = 17;

    case 17:
      $.goto = 18;
      $p = ($context.call = e1)();
      $.state = 18;

    case 18:
      $.goto = 19;
      ($context.call = M)($p);
      $.state = 19;

    case 19:
      $.goto = 20;
      $brk("11:2-11:10");
      $.state = 20;

    case 20:
      $.goto = 21;
      $p = ($context.call = e)(2);
      $.state = 21;

    case 21:
      $.goto = 23;
      ($context.call = M)($p);
      continue;

    case 22:
      $.goto = 23;
      return $unhandled($.error);

    case 23:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:20", $s$2], [2, "2:2-2:19", $s$2], [4, "3:2-3:7", $s$2], [2, "3:2-3:6", $s$2], [4, "4:2-4:7", $s$2], [2, "4:2-4:6", $s$2], [4, "5:2-5:23", $s$2], [2, "5:2-5:22", $s$2], [4, "6:2-6:7", $s$2], [2, "6:2-6:6", $s$2], [4, "7:2-7:29", $s$2], [2, "7:2-7:28", $s$2], [4, "8:2-8:7", $s$2], [2, "8:2-8:6", $s$2], [4, "9:2-9:23", $s$2], [2, "9:2-9:22", $s$2], [4, "10:2-10:10", $s$2], [2, "10:4-10:8", $s$2], [2, "10:2-10:9", $s$2], [4, "11:2-11:10", $s$2], [2, "11:4-11:8", $s$2], [2, "11:2-11:9", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();