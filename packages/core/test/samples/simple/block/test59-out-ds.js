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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-7:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-6:1", $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-6:1", 0, function a($, $l, $p) {
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
      $brk("3:2-3:14");
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = read1)();
      $.state = 3;

    case 3:
      $lset($l, 1,
      /*i*/
      $p);
      $.goto = 4;
      $brk("4:2-4:9");
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = eff)($l[1]);
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("5:2-5:11");
      $.state = 6;

    case 6:
      $.goto = 8;
      ($context.call = write)($l[1]);
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:12", $s$2], [4, "3:2-3:14", $s$2], [2, "3:6-3:13", $s$2], [4, "4:2-4:9", $s$2], [2, "4:2-4:8", $s$2], [4, "5:2-5:11", $s$2], [2, "5:2-5:10", $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]);

$M.moduleExports();