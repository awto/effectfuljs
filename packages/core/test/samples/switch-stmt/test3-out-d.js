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
      $brk("2:2-11:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("2:7-11:3");
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = eff)(1);
      $.state = 3;

    case 3:
      switch ($p) {
        case 1:
          $.goto = 10;
          $brk("4:6-4:14");
          continue;

        case 2:
          $.state = 4;
          break;

        default:
          $.goto = 8;
          continue;
      }

    case 4:
      $.goto = 5;
      $brk("7:6-7:14");
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = effB)(2);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk("8:6-8:16");
      $.state = 7;

    case 7:
      $.goto = 13;
      continue;

    case 8:
      $.goto = 9;
      $brk("10:6-10:14");
      $.state = 9;

    case 9:
      $.goto = 7;
      ($context.call = effB)(3);
      continue;

    case 10:
      $.goto = 11;
      ($context.call = effB)(1);
      $.state = 11;

    case 11:
      $.goto = 7;
      $brk("5:6-5:12");
      continue;

    case 12:
      $.goto = 13;
      return $unhandled($.error);

    case 13:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-11:3", $s$2], [4, "2:7-11:3", $s$2], [2, "2:15-2:21", $s$2], [4, "4:6-4:14", $s$2], [4, "7:6-7:14", $s$2], [2, "7:6-7:13", $s$2], [4, "8:6-8:16", $s$2], [0, null, $s$2], [4, "10:6-10:14", $s$2], [2, "10:6-10:13", $s$2], [2, "4:6-4:13", $s$2], [4, "5:6-5:12", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();