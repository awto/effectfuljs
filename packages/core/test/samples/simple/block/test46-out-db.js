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
    $s$2 = [{
  i: [1, "2:6-2:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-25:0", 160, function ($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-24:1", $s$1], [16, "25:0-25:0", $s$1], [16, "25:0-25:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 2, "1:0-24:1", 128, function ($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($x.call = eff2)($l[1] = 0);
      $.state = 1;

    case 1:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 2;
      ($x.call = eff1)($p, $1);
      $.state = 2;

    case 2:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 3;
      ($x.call = eff3)($1);
      $.state = 3;

    case 3:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 4;
      ($x.call = eff4)($1);
      $.state = 4;

    case 4:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 5;
      ($x.call = eff5)($1);
      $.state = 5;

    case 5:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 6;
      $p = ($x.call = eff6)($1);
      $.state = 6;

    case 6:
      if ($p) {
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 9;
        ($x.call = eff7)($1);
        continue;
      } else {
        $.goto = 7;
        $p = ($x.call = eff7)($l[1]);
        $.state = 7;
      }

    case 7:
      if ($p) {
        $l[1] = $l[1] + 1;
        $.state = 8;
      } else {
        $.result = 10;
        $.goto = 12;
        continue;
      }

    case 8:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 9;
      ($x.call = eff8)($1);
      $.state = 9;

    case 9:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 10;
      ($x.call = eff9)($1);
      $.state = 10;

    case 10:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 12;
      ($x.call = eff10)($1);
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "3:7-3:20", $s$2], [2, "3:2-3:26", $s$2], [2, "5:4-5:13", $s$2], [2, "6:4-6:13", $s$2], [2, "8:6-8:15", $s$2], [2, "9:10-9:19", $s$2], [2, "10:8-10:17", $s$2], [0, null, $s$2], [2, "20:4-20:13", $s$2], [2, "22:2-22:11", $s$2], [2, "23:2-23:12", $s$2], [16, "24:1-24:1", $s$2], [16, "24:1-24:1", $s$2]]);

$M.moduleExports();