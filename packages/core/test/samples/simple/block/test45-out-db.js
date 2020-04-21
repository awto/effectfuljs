var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{
  i: [1, "2:6-2:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-7:0", 160, function file_js($, $l, $p) {
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 2, "1:0-6:1", 128, function a($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = 0;
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 1;
      ($context.call = eff5)($1);
      $.state = 1;

    case 1:
      if (ee) {
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 2;
        ($context.call = eff7)($1);
        $.state = 2;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 4;
      ($context.call = eff8)($l[1]);
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "3:2-3:11", $s$2], [2, "4:10-4:19", $s$2], [2, "5:2-5:9", $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]);

$M.moduleExports();