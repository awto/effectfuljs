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
  j: [1, "2:6-2:7"],
  i: [2, "4:11-4:12"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-10:0", 160, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-9:1", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 3, "1:0-9:1", 128, function a($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
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
        $.goto = 4;
        ($context.call = eff3)($l[2], $l[1]);
        $.state = 4;
      } else {
        $.goto = 7;
        ($context.call = eff7)($l[2]);
        continue;
      }

    case 4:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 5;
      ($context.call = eff4)($1);
      $.state = 5;

    case 5:
      $l[2] = $l[2] + 1;
      $.goto = 3;
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "3:2-3:8", $s$2], [2, "4:15-4:21", $s$2], [0, "4:11-4:21", $s$2], [2, "5:4-5:14", $s$2], [2, "6:4-6:13", $s$2], [0, "4:31-4:34", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();