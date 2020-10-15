var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{
  e: [1, "8:13-8:14"]
}, $s$2, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-15:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $m$1($);
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
}, null, null, 0, [[0, null, $s$1], [16, "15:0-15:0", $s$1], [16, "15:0-15:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 2, "1:1-14:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)(2);
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = eff)(3);
      $.state = 3;

    case 3:
      if ($p) {
        $.state = 4;
      } else {
        $.goto = 5;
        $p = new ($context.call = Error)("error");
        continue;
      }

    case 4:
      $.goto = 10;
      ($context.call = eff)(7);
      continue;

    case 5:
      $.goto = 6;
      return $raise($p);

    case 6:
      $.goto = 7;
      ($context.call = eff)(4);
      $.state = 7;

    case 7:
      $.goto = 4;
      ($context.call = eff)(6);
      continue;

    case 8:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 7;
      ($context.call = eff)(5);
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 3:
    case 2:
    case 1:
      $.goto = 8;
      break;

    default:
      $.goto = 9;
  }
}, null, 1, [[0, null, $s$2], [3, "4:6-4:12", $s$2], [3, "5:10-5:16", $s$2], [3, "6:17-6:35", $s$2], [2, "13:2-13:8", $s$2], [1, "6:11-6:36", $s$2], [3, "7:6-7:12", $s$2], [2, "11:4-11:10", $s$2], [2, "9:6-9:12", $s$3], [16, "14:1-14:1", $s$2], [16, "14:1-14:1", $s$2]]);

$M.moduleExports();