var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-4:0", 160, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-3:1", $s$1], [16, "4:0-4:0", $s$1], [16, "4:0-4:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-3:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($x.call = eff)(1);
      $.state = 1;

    case 1:
      $l[1] = $p;
      $.goto = 2;
      $p = ($x.call = eff)(2);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.goto = 3;
      $p = ($x.call = eff)(3);
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($x.call = $l[2])($p);
      $.state = 4;

    case 4:
      $.goto = 6;
      ($x.call = $l[1])($p);
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "2:2-2:8", $s$2], [2, "2:9-2:15", $s$2], [2, "2:16-2:22", $s$2], [2, "2:9-2:23", $s$2], [2, "2:2-2:24", $s$2], [16, "3:1-3:1", $s$2], [16, "3:1-3:1", $s$2]]);

$M.moduleExports();