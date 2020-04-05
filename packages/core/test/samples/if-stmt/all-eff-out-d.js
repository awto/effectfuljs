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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-5:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-4:1", $s$1], [16, "5:0-5:0", $s$1], [16, "5:0-5:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-4:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-3:21");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)(1);
      $.state = 2;

    case 2:
      if ($p) {
        $.goto = 5;
        $brk("2:14-2:28");
        continue;
      } else {
        $.goto = 3;
        $brk("3:7-3:21");
        $.state = 3;
      }

    case 3:
      $.goto = 4;
      $p = ($context.call = eff)(3);
      $.state = 4;

    case 4:
      $.result = $p;
      $.goto = 8;
      continue;

    case 5:
      $.goto = 6;
      $p = ($context.call = eff)(2);
      $.state = 6;

    case 6:
      $.result = $p;
      $.goto = 8;
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-3:21", $s$2], [2, "2:6-2:12", $s$2], [4, "2:14-2:28", $s$2], [2, "3:14-3:20", $s$2], [0, null, $s$2], [2, "2:21-2:27", $s$2], [0, null, $s$2], [16, "4:1-4:1", $s$2], [16, "4:1-4:1", $s$2]]);

$M.moduleExports();