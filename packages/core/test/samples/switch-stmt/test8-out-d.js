var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-17:0", 32, function ($, $l, $p) {
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "2:0-16:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $l[1] = 0;
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $.goto = 3;
      ($x.call = eff)();
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($x.call = eff)($l[1] = $l[1] + 1);
      $.state = 5;

    case 5:
      $l[2] = $p;
      $.goto = 6;
      $p = ($x.call = check)($l[1] = $l[1] + 2);
      $.state = 6;

    case 6:
      if ($l[2] === $p) {
        $.state = 7;
      } else {
        $.goto = 13;
        continue;
      }

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      ($x.call = effB)($l[1] = $l[1] + 3);
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      ($x.call = eff)($l[1]);
      $.state = 12;

    case 12:
      $.goto = 23;
      $brk();
      continue;

    case 13:
      $.goto = 14;
      $p = ($x.call = check)($l[1] = $l[1] + 4);
      $.state = 14;

    case 14:
      if ($l[2] === $p) {
        $.state = 15;
      } else {
        $.goto = 18;
        continue;
      }

    case 15:
      $.goto = 16;
      $brk();
      $.state = 16;

    case 16:
      $.goto = 17;
      ($x.call = effB)($l[1] = $l[1] + 5);
      $.state = 17;

    case 17:
      $.goto = 10;
      $brk();
      continue;

    case 18:
      $.goto = 19;
      $p = ($x.call = check)($l[1] = $l[1] + 6);
      $.state = 19;

    case 19:
      if ($l[2] === $p) {
        $.state = 20;
      } else {
        $.goto = 10;
        continue;
      }

    case 20:
      $.goto = 21;
      $brk();
      $.state = 21;

    case 21:
      $.goto = 10;
      $mcall("log", console, "hi", $l[1]);
      continue;

    case 22:
      $.goto = 23;
      return $unhandled($.error);

    case 23:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "3:2-3:12", $s$2], [4, "4:2-4:8", $s$2], [2, "4:2-4:7", $s$2], [4, "5:2-14:3", $s$2], [2, "5:10-5:23", $s$2], [2, "6:9-6:24", $s$2], [0, null, $s$2], [4, "7:6-7:21", $s$2], [2, "7:6-7:20", $s$2], [4, "8:6-8:12", $s$2], [4, "15:2-15:9", $s$2], [2, "15:2-15:8", $s$2], [36, "16:1-16:1", $s$2], [2, "9:9-9:24", $s$2], [0, null, $s$2], [4, "10:6-10:21", $s$2], [2, "10:6-10:20", $s$2], [4, "11:6-11:12", $s$2], [2, "12:9-12:24", $s$2], [0, null, $s$2], [4, "13:6-13:27", $s$2], [2, "13:6-13:26", $s$2], [16, "16:1-16:1", $s$2], [16, "16:1-16:1", $s$2]]);

$M.moduleExports();