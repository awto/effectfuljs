var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "2:9-2:10"]
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
}, null, null, 0, [[0, "2:0-11:1", $s$1], [16, "12:0-12:0", $s$1], [16, "12:0-12:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "2:0-11:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("3:2-10:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)(1);
      $.state = 2;

    case 2:
      switch ($p) {
        case 1:
          $.goto = 7;
          $brk("5:6-5:14");
          continue;

        case 2:
          $.state = 3;
          break;

        default:
          $.goto = 6;
          continue;
      }

    case 3:
      $.goto = 4;
      $brk("8:6-8:14");
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = effB)(2);
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("9:6-9:12");
      $.state = 6;

    case 6:
      $.goto = 10;
      continue;

    case 7:
      $.goto = 8;
      ($context.call = effB)(1);
      $.state = 8;

    case 8:
      $.goto = 6;
      $brk("6:6-6:12");
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "3:2-10:3", $s$2], [2, "3:10-3:16", $s$2], [4, "5:6-5:14", $s$2], [4, "8:6-8:14", $s$2], [2, "8:6-8:13", $s$2], [4, "9:6-9:12", $s$2], [0, null, $s$2], [2, "5:6-5:13", $s$2], [4, "6:6-6:12", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]);

$M.moduleExports();