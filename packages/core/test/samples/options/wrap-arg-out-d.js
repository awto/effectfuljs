var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  z2: [1, "3:9-3:11"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-7:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $.goto = 1;
      $brk("1:0-1:36");
      $.state = 1;

    case 1:
      $.goto = 3;
      $mcall("option", M, {
        wrapArguments: "args"
      });
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "1:0-1:36", $s$1], [2, "1:0-1:35", $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]),
    $m$1 = $M.fun("m$1", "z2", null, $m$0, [], 0, 1, "3:0-6:1", 16, function z2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("4:2-4:9");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)(1);
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("5:2-5:17");
      $.state = 3;

    case 3:
      $.goto = 5;
      ($context.call = aff)($.args);
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "4:2-4:9", $s$2], [2, "4:2-4:8", $s$2], [4, "5:2-5:17", $s$2], [2, "5:2-5:16", $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]);

$M.moduleExports();