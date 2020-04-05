var $M = require("@effectful/debugger/api"),
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-12:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-11:1", $s$1], [16, "12:0-12:0", $s$1], [16, "12:0-12:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-11:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-10:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)(1);
      $.state = 2;

    case 2:
      switch ($p) {
        case 1:
          $.goto = 9;
          $brk("4:6-4:14");
          continue;

        case 2:
          $.state = 3;
          break;

        default:
          $.goto = 7;
          continue;
      }

    case 3:
      $.goto = 4;
      $brk("6:6-6:14");
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = effB)(2);
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("7:6-7:12");
      $.state = 6;

    case 6:
      $.goto = 11;
      continue;

    case 7:
      $.goto = 8;
      $brk("9:6-9:14");
      $.state = 8;

    case 8:
      $.goto = 6;
      ($context.call = effB)(3);
      continue;

    case 9:
      $.goto = 3;
      ($context.call = effB)(1);
      continue;

    case 10:
      $.goto = 11;
      return $unhandled($.error);

    case 11:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-10:3", $s$2], [2, "2:10-2:16", $s$2], [4, "4:6-4:14", $s$2], [4, "6:6-6:14", $s$2], [2, "6:6-6:13", $s$2], [4, "7:6-7:12", $s$2], [0, null, $s$2], [4, "9:6-9:14", $s$2], [2, "9:6-9:13", $s$2], [2, "4:6-4:13", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]);

$M.moduleExports();