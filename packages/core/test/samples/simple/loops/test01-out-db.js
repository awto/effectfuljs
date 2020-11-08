var $M = require("@effectful/debugger"),
    $x = $M.context,
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
  i: [1, "4:11-4:12"],
  j: [2, "5:8-5:9"]
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
}, null, null, 0, [[0, "2:0-9:1", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 3, "2:0-9:1", 128, function a($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($x.call = eff1)();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff2)();
      $.state = 2;

    case 2:
      $l[1] = $p;
      $.state = 3;

    case 3:
      if ($l[1] < 10) {
        $.goto = 5;
        $p = ($x.call = eff3)($l[1]);
        continue;
      } else {
        $.goto = 4;
        $p = ($x.call = eff7)($l[1]);
        $.state = 4;
      }

    case 4:
      $.goto = 8;
      $mcall("log", console, $p);
      continue;

    case 5:
      $l[2] = $p;
      $1 = $l[2];
      $l[2] = $1 + 1;
      $.goto = 6;
      ($x.call = eff4)($1);
      $.state = 6;

    case 6:
      $l[1] = $l[1] + 1;
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
}, null, null, 1, [[2, "3:2-3:8", $s$2], [2, "4:15-4:21", $s$2], [0, "4:11-4:21", $s$2], [2, "5:12-5:19", $s$2], [2, "8:2-8:22", $s$2], [2, "6:4-6:13", $s$2], [0, "4:31-4:34", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();