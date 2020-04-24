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
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-6:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-5:1", $s$1], [16, "6:0-6:0", $s$1], [16, "6:0-6:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-5:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:9");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff1)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("3:2-3:24");
      $.state = 3;

    case 3:
      if ($l[0][1]) {
        $.state = 4;
      } else {
        $.goto = 7;
        continue;
      }

    case 4:
      $.goto = 5;
      $brk("3:9-3:24");
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($context.call = eff5)(5);
      $.state = 6;

    case 6:
      $.result = $p;
      $.goto = 10;
      continue;

    case 7:
      $.goto = 8;
      $brk("4:2-4:9");
      $.state = 8;

    case 8:
      $.goto = 10;
      ($context.call = eff6)();
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:9", $s$2], [2, "2:2-2:8", $s$2], [4, "3:2-3:24", $s$2], [0, null, $s$2], [4, "3:9-3:24", $s$2], [2, "3:16-3:23", $s$2], [0, null, $s$2], [4, "4:2-4:9", $s$2], [2, "4:2-4:8", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]);

$M.moduleExports();