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
    $s$2 = [{
  i: [1, "2:6-2:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-7:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-6:1", $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 2, "1:0-6:1", 0, function a($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:12");
      $.state = 1;

    case 1:
      $l[1] = 0;
      $.goto = 2;
      $brk("3:2-3:12");
      $.state = 2;

    case 2:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 3;
      ($context.call = eff5)($1);
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("4:2-4:20");
      $.state = 4;

    case 4:
      if (ee) {
        $.goto = 7;
        $brk("4:10-4:20");
        continue;
      } else {
        $.state = 5;
      }

    case 5:
      $.goto = 6;
      $brk("5:2-5:10");
      $.state = 6;

    case 6:
      $.goto = 9;
      ($context.call = eff8)($l[1]);
      continue;

    case 7:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 5;
      ($context.call = eff7)($1);
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:12", $s$2], [4, "3:2-3:12", $s$2], [2, "3:2-3:11", $s$2], [4, "4:2-4:20", $s$2], [4, "4:10-4:20", $s$2], [4, "5:2-5:10", $s$2], [2, "5:2-5:9", $s$2], [2, "4:10-4:19", $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]);

$M.moduleExports();