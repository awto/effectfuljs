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
  i: [1, "2:11-2:12"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-10:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-9:1", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-9:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-8:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = init)();
      $.state = 2;

    case 2:
      $l[1] = $p;
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($context.call = check)();
      $.state = 4;

    case 4:
      if ($p === true) {
        $.goto = 5;
        $brk("3:4-3:9");
        $.state = 5;
      } else {
        $.goto = 12;
        continue;
      }

    case 5:
      $.goto = 6;
      ($context.call = b1)();
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk("4:4-7:5");
      $.state = 7;

    case 7:
      if (v) {
        $.goto = 9;
        $brk("5:6-5:10");
        continue;
      } else {
        $.state = 8;
      }

    case 8:
      $.goto = 3;
      ($context.call = upd)();
      continue;

    case 9:
      $.goto = 10;
      ($context.call = e)();
      $.state = 10;

    case 10:
      $.goto = 8;
      $brk("6:6-6:15");
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-8:3", $s$2], [2, "2:15-2:21", $s$2], [0, "2:11-2:21", $s$2], [2, "2:23-2:30", $s$2], [4, "3:4-3:9", $s$2], [2, "3:4-3:8", $s$2], [4, "4:4-7:5", $s$2], [4, "5:6-5:10", $s$2], [2, "2:41-2:46", $s$2], [2, "5:6-5:9", $s$2], [4, "6:6-6:15", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();