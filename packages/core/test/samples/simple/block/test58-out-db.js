var $M = require("@effectful/debugger/api"),
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-12:0", 160, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-11:1", $s$1], [16, "12:0-12:0", $s$1], [16, "12:0-12:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 4, "1:0-11:1", 128, function a($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = 0;
      $.goto = 1;
      ($context.call = eff0)();
      $.state = 1;

    case 1:
      $l[1] = $l[1] + 2;
      $.goto = 2;
      ($context.call = effM)();
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = effN)();
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($context.call = effI1)($l[1] = $l[1] + 1);
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($context.call = eff2)($p);
      $.state = 5;

    case 5:
      $l[2] = $p;
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 6;
      $p = ($context.call = eff3)($l[1]);
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff1)($l[2], $l[3], $p);
      $.state = 7;

    case 7:
      $.goto = 8;
      $p = ($context.call = effN)();
      $.state = 8;

    case 8:
      $.goto = 9;
      $p = ($context.call = effI)($p);
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = effM)($p);
      $.state = 10;

    case 10:
      $.goto = 11;
      $p = ($context.call = effI)();
      $.state = 11;

    case 11:
      $l[2] = $p;
      $.goto = 12;
      $p = ($context.call = effJ)();
      $.state = 12;

    case 12:
      $.goto = 13;
      ($context.call = eff4)($l[2], $p);
      $.state = 13;

    case 13:
      $.goto = 15;
      ($context.call = eff5)();
      continue;

    case 14:
      $.goto = 15;
      return $unhandled($.error);

    case 15:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "3:2-3:8", $s$2], [2, "5:2-5:8", $s$2], [2, "6:2-6:8", $s$2], [2, "7:12-7:22", $s$2], [2, "7:7-7:23", $s$2], [2, "7:30-7:37", $s$2], [2, "7:2-7:38", $s$2], [2, "8:12-8:18", $s$2], [2, "8:7-8:19", $s$2], [2, "8:2-8:20", $s$2], [2, "9:7-9:13", $s$2], [2, "9:15-9:21", $s$2], [2, "9:2-9:22", $s$2], [2, "10:2-10:8", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]);

$M.moduleExports();