var $M = require("@effectful/debugger/api"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  b: [1, "2:9-2:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-16:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "2:0-15:1", $s$1], [16, "16:0-16:0", $s$1], [16, "16:0-16:0", $s$1]]),
    $m$1 = $M.fun("m$1", "b", null, $m$0, [], 0, 1, "2:0-15:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("3:2-14:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)(1);
      $.state = 2;

    case 2:
      switch ($p) {
        case 1:
          $.goto = 12;
          $brk("5:6-5:25");
          continue;

        case 2:
          $.state = 3;
          break;

        default:
          $.goto = 10;
          continue;
      }

    case 3:
      $.goto = 4;
      $brk("7:6-9:7");
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($context.call = effB)(2);
      $.state = 5;

    case 5:
      if ($p) {
        $.goto = 9;
        $brk("8:8-8:14");
        continue;
      } else {
        $.state = 6;
      }

    case 6:
      $.goto = 7;
      $brk("10:6-10:14");
      $.state = 7;

    case 7:
      $.goto = 8;
      ($context.call = effB)(3);
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk("11:6-11:12");
      $.state = 9;

    case 9:
      $.goto = 16;
      continue;

    case 10:
      $.goto = 11;
      $brk("13:6-13:13");
      $.state = 11;

    case 11:
      $.goto = 9;
      ($context.call = eff)(4);
      continue;

    case 12:
      $.goto = 13;
      $p = ($context.call = effB)(1);
      $.state = 13;

    case 13:
      if ($p) {
        $.goto = 9;
        $brk("5:19-5:25");
        continue;
      } else {
        $.state = 14;
      }

    case 14:
      $.goto = 3;
      continue;

    case 15:
      $.goto = 16;
      return $unhandled($.error);

    case 16:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "3:2-14:3", $s$2], [2, "3:10-3:16", $s$2], [4, "5:6-5:25", $s$2], [4, "7:6-9:7", $s$2], [2, "7:10-7:17", $s$2], [4, "8:8-8:14", $s$2], [4, "10:6-10:14", $s$2], [2, "10:6-10:13", $s$2], [4, "11:6-11:12", $s$2], [0, null, $s$2], [4, "13:6-13:13", $s$2], [2, "13:6-13:12", $s$2], [2, "5:10-5:17", $s$2], [4, "5:19-5:25", $s$2], [0, null, $s$2], [16, "15:1-15:1", $s$2], [16, "15:1-15:1", $s$2]]);

$M.moduleExports();