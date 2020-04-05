var $M = require("@effectful/debugger/api"),
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
    $s$2 = [{
  i: [1, "2:6-2:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-8:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-7:1", $s$1], [16, "8:0-8:0", $s$1], [16, "8:0-8:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 2, "1:0-7:1", 0, function a($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:8");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:2-3:16");
      $.state = 2;

    case 2:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 3;
      $p = ($context.call = eff1)($1);
      $.state = 3;

    case 3:
      $l[1] = $p;
      $.goto = 4;
      $brk("4:2-4:10");
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = eff2)($l[1]);
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("5:2-5:16");
      $.state = 6;

    case 6:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 7;
      $p = ($context.call = eff3)($1);
      $.state = 7;

    case 7:
      $l[1] = $p;
      $.goto = 8;
      $brk("6:2-6:10");
      $.state = 8;

    case 8:
      $.goto = 10;
      ($context.call = eff4)($l[1]);
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:8", $s$2], [4, "3:2-3:16", $s$2], [2, "3:6-3:15", $s$2], [4, "4:2-4:10", $s$2], [2, "4:2-4:9", $s$2], [4, "5:2-5:16", $s$2], [2, "5:6-5:15", $s$2], [4, "6:2-6:10", $s$2], [2, "6:2-6:9", $s$2], [16, "7:1-7:1", $s$2], [16, "7:1-7:1", $s$2]]);

$M.moduleExports();