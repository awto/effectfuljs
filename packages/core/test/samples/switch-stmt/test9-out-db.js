var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "2:9-2:10"]
}, null, 0],
    $s$2 = [{
  i: [1, "3:6-3:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-17:0", 160, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "2:0-16:1", $s$1], [16, "17:0-17:0", $s$1], [16, "17:0-17:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "2:0-16:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = 0;
      $.goto = 1;
      ($context.call = eff)();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)($l[1] = $l[1] + 1);
      $.state = 2;

    case 2:
      switch ($p) {
        case 1:
          $.goto = 5;
          ($context.call = effB)($l[1] = $l[1] + 3);
          continue;

        case 2:
          $.state = 3;
          break;

        case 3:
          $.goto = 4;
          continue;

        default:
          $.goto = 5;
          continue;
      }

    case 3:
      $.goto = 5;
      ($context.call = effB)($l[1] = $l[1] + 5);
      continue;

    case 4:
      $.goto = 5;
      $mcall("log", console, "hi", $l[1]);
      $.state = 5;

    case 5:
      $.goto = 7;
      ($context.call = eff)($l[1]);
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "4:2-4:7", $s$2], [2, "5:10-5:23", $s$2], [2, "7:6-7:20", $s$2], [2, "10:6-10:20", $s$2], [2, "13:6-13:26", $s$2], [2, "15:2-15:8", $s$2], [16, "16:1-16:1", $s$2], [16, "16:1-16:1", $s$2]]);

$M.moduleExports();