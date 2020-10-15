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
    $s$2 = [{
  i: [1, "2:6-2:7"]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-10:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-9:1", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-9:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff1)();
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $l = $.$ = [$l];
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      $p = ($context.call = eff2)();
      $.state = 7;

    case 7:
      $lset($l[0], 1,
      /*i*/
      $p);
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      $p = ($context.call = eff)(3);
      $.state = 10;

    case 10:
      if ($l[0][1] !== $p) {
        $.state = 11;
      } else {
        $.goto = 19;
        continue;
      }

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      ($context.call = eff5)($l[0][1]);
      $.state = 13;

    case 13:
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $.goto = 15;
      ($context.call = eff6)($l[0][1]);
      $.state = 15;

    case 15:
      $.goto = 16;
      $brk();
      $.state = 16;

    case 16:
      $l = $.$ = [$l[0]];
      $.goto = 17;
      $brk();
      $.state = 17;

    case 17:
      $.goto = 18;
      $p = ($context.call = eff4)($l[0][1]);
      $.state = 18;

    case 18:
      $lset($l[0], 1,
      /*i*/
      $p);
      $.goto = 8;
      continue;

    case 19:
      $l[0][2] = 22;
      $.goto = 21;
      continue;

    case 20:
      return $raise($.error);

    case 21:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 22:
      $.goto = 23;
      $brk();
      $.state = 23;

    case 23:
      $.goto = 24;
      ($context.call = eff7)($l[1]);
      $.state = 24;

    case 24:
      $.goto = 26;
      $brk();
      continue;

    case 25:
      $.goto = 26;
      return $unhandled($.error);

    case 26:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 19:
    case 18:
    case 17:
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
      $.goto = 21;
      $l[0][2] = 20;
      break;

    default:
      $.goto = 25;
  }
}, function ($, $l) {
  switch ($.state) {
    case 19:
    case 18:
    case 17:
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
      $l[0][2] = 26;
      $.goto = 21;
      break;

    default:
      $.goto = 26;
      break;
  }
}, 1, [[4, "2:2-2:8", $s$2], [4, "3:2-3:9", $s$2], [2, "3:2-3:8", $s$2], [4, "4:2-7:3", $s$2], [0, null, $s$2], [4, "4:7-4:17", $s$3], [2, "4:11-4:17", $s$3], [0, "4:7-4:17", $s$3], [4, "4:19-4:31", $s$3], [2, "4:25-4:31", $s$3], [0, null, $s$3], [4, "5:4-5:12", $s$3], [2, "5:4-5:11", $s$3], [4, "6:4-6:12", $s$3], [2, "6:4-6:11", $s$3], [36, "7:3-7:3", $s$3], [4, "4:33-4:44", $s$3], [2, "4:37-4:44", $s$3], [0, "4:33-4:44", $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [4, "8:2-8:10", $s$2], [2, "8:2-8:9", $s$2], [36, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();