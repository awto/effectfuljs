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
  i: [1, "2:6-2:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-11:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-10:1", $s$1], [16, "11:0-11:0", $s$1], [16, "11:0-11:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-10:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:12");
      $.state = 1;

    case 1:
      $lset($l, 1,
      /*i*/
      0);
      $.goto = 2;
      $brk("3:2-7:3");
      $.state = 2;

    case 2:
      if (t) {
        $.state = 3;
      } else {
        $.goto = 9;
        continue;
      }

    case 3:
      $.goto = 4;
      $brk("4:4-4:12");
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = eff1)($l[1]);
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("8:2-8:10");
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff2)($l[1]);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("9:2-9:10");
      $.state = 8;

    case 8:
      $.goto = 12;
      ($context.call = eff3)($l[1]);
      continue;

    case 9:
      $.goto = 10;
      $brk("6:4-6:8");
      $.state = 10;

    case 10:
      $lset($l, 1,
      /*i*/
      $l[1] + 1);
      $.goto = 5;
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:12", $s$2], [4, "3:2-7:3", $s$2], [0, null, $s$2], [4, "4:4-4:12", $s$2], [2, "4:4-4:11", $s$2], [4, "8:2-8:10", $s$2], [2, "8:2-8:9", $s$2], [4, "9:2-9:10", $s$2], [2, "9:2-9:9", $s$2], [4, "6:4-6:8", $s$2], [0, "6:4-6:7", $s$2], [16, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2]]);

$M.moduleExports();