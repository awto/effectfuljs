var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{
  i: [1, "3:6-3:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-15:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a*/
      $m$1($));
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
}, null, null, 0, [[0, "1:0-14:1", $s$1], [16, "15:0-15:0", $s$1], [16, "15:0-15:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-14:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff0)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $lset($l, 1,
      /*i*/
      0);
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $lset($l, 1,
      /*i*/
      $l[1] + 1);
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = eff1)($l[1]);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      if (t) {
        $.state = 8;
      } else {
        $.goto = 17;
        continue;
      }

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = eff2)($l[1]);
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $lset($l, 1,
      /*i*/
      $l[1] + 1);
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      ($context.call = eff4)($l[1]);
      $.state = 13;

    case 13:
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $.goto = 16;
      ($context.call = eff5)($l[1]);
      $.state = 16;

    case 16:
      $.goto = 21;
      $brk();
      continue;

    case 17:
      $.goto = 18;
      $brk();
      $.state = 18;

    case 18:
      $.goto = 19;
      ($context.call = eff3)($l[1]);
      $.state = 19;

    case 19:
      $.goto = 14;
      $brk();
      continue;

    case 20:
      $.goto = 21;
      return $unhandled($.error);

    case 21:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:9", $s$2], [2, "2:2-2:8", $s$2], [4, "3:2-3:12", $s$2], [4, "4:2-4:6", $s$2], [4, "5:2-5:10", $s$2], [2, "5:2-5:9", $s$2], [4, "6:2-12:3", $s$2], [0, null, $s$2], [4, "7:4-7:12", $s$2], [2, "7:4-7:11", $s$2], [4, "8:4-8:8", $s$2], [4, "9:4-9:12", $s$2], [2, "9:4-9:11", $s$2], [36, "10:3-10:3", $s$2], [4, "13:2-13:10", $s$2], [2, "13:2-13:9", $s$2], [36, "14:1-14:1", $s$2], [4, "11:4-11:12", $s$2], [2, "11:4-11:11", $s$2], [36, "12:3-12:3", $s$2], [16, "14:1-14:1", $s$2], [16, "14:1-14:1", $s$2]]);

$M.moduleExports();