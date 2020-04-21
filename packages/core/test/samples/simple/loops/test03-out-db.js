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
  k: [1, "2:6-2:7"],
  i: [2, "4:11-4:12"],
  j: [3, "6:8-6:9"],
  l: [4, "7:6-7:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-13:0", 160, function file_js($, $l, $p) {
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 5, "1:0-12:1", 128, function a($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = 0;
      $.goto = 1;
      ($context.call = eff1)();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff2)();
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      if ($l[2] < 10) {
        $l[1] = $l[1] + 1;
        $.goto = 4;
        $p = ($context.call = eff3)($l[2]);
        $.state = 4;
      } else {
        $.goto = 8;
        ($context.call = eff6)($l[2], $l[3], $l[1]);
        continue;
      }

    case 4:
      $l[3] = $p;
      $.goto = 5;
      $p = ($context.call = eff4)($l[2]);
      $.state = 5;

    case 5:
      $l[4] = $p;
      $l[4] = $l[4] + 1;
      $1 = $l[3];
      $l[3] = $1 + 1;
      $.goto = 6;
      ($context.call = eff5)($1, $l[1], $l[4]);
      $.state = 6;

    case 6:
      $l[2] = $l[2] + 1;
      $.goto = 3;
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "3:2-3:8", $s$2], [2, "4:15-4:21", $s$2], [0, "4:11-4:21", $s$2], [2, "6:12-6:19", $s$2], [2, "7:10-7:17", $s$2], [2, "9:4-9:19", $s$2], [0, "4:31-4:34", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();