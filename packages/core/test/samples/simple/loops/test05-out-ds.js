var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
    $brk = $M.brk,
    $lset = $M.lset,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-9:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a*/
      $m$1($));
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
}, null, null, 0, [[0, "1:0-8:1", $s$1], [16, "9:0-9:0", $s$1], [16, "9:0-9:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-8:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff1)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $l = $.$ = [$l];
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = eff2)();
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      $p = ($context.call = eff)(3);
      $.state = 8;

    case 8:
      if ($p) {
        $.state = 9;
      } else {
        $.goto = 16;
        continue;
      }

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      ($context.call = eff5)();
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      ($context.call = eff6)();
      $.state = 13;

    case 13:
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $l = $.$ = [$l[0]];
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $.goto = 6;
      ($context.call = eff4)();
      continue;

    case 16:
      $l[0][1] = 19;
      $.goto = 18;
      continue;

    case 17:
      return $raise($.error);

    case 18:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 19:
      $.goto = 20;
      $brk();
      $.state = 20;

    case 20:
      $.goto = 21;
      ($context.call = eff7)();
      $.state = 21;

    case 21:
      $.goto = 23;
      $brk();
      continue;

    case 22:
      $.goto = 23;
      return $unhandled($.error);

    case 23:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $.goto = 18;
      $l[0][1] = 17;
      break;

    default:
      $.goto = 22;
  }
}, function ($, $l) {
  switch ($.state) {
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][1] = 23;
      $.goto = 18;
      break;

    default:
      $.goto = 23;
      break;
  }
}, 1, [[4, "2:2-2:9", $s$2], [2, "2:2-2:8", $s$2], [4, "3:2-6:3", $s$2], [0, null, $s$2], [4, "3:7-3:13", $s$3], [2, "3:7-3:13", $s$3], [4, "3:15-3:21", $s$3], [2, "3:15-3:21", $s$3], [0, null, $s$3], [4, "4:4-4:11", $s$3], [2, "4:4-4:10", $s$3], [4, "5:4-5:11", $s$3], [2, "5:4-5:10", $s$3], [36, "6:3-6:3", $s$3], [4, "3:23-3:29", $s$3], [2, "3:23-3:29", $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [4, "7:2-7:9", $s$2], [2, "7:2-7:8", $s$2], [36, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);

$M.moduleExports();