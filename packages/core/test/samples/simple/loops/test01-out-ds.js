var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
    $brk = $M.brk,
    $lset = $M.lset,
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
}, null, null, 0, [[0, "2:0-9:1", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 4, "2:0-9:1", 0, function a($, $l, $p) {
  var $1;

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
      $p = ($context.call = eff2)();
      $.state = 5;

    case 5:
      $lset($l[0], 1,
      /*i*/
      $p);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      if ($l[0][1] < 10) {
        $.state = 8;
      } else {
        $.goto = 15;
        continue;
      }

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      $p = ($context.call = eff3)($l[0][1]);
      $.state = 10;

    case 10:
      $lset($l[0], 2,
      /*j*/
      $p);
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $1 = $l[0][2];
      $lset($l[0], 2,
      /*j*/
      $1 + 1);
      $.goto = 12;
      ($context.call = eff4)($1);
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $l = $.$ = [$l[0]];
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $lset($l[0], 1,
      /*i*/
      $l[0][1] + 1);
      $.goto = 6;
      continue;

    case 15:
      $l[0][3] = 18;
      $.goto = 17;
      continue;

    case 16:
      return $raise($.error);

    case 17:
      $l = $.$ = $l[0];
      $.goto = $l[3];
      continue;

    case 18:
      $.goto = 19;
      $brk();
      $.state = 19;

    case 19:
      $.goto = 20;
      $p = ($context.call = eff7)($l[1]);
      $.state = 20;

    case 20:
      $.goto = 21;
      $mcall("log", console, $p);
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
      $.goto = 17;
      $l[0][3] = 16;
      break;

    default:
      $.goto = 22;
  }
}, function ($, $l) {
  switch ($.state) {
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
      $l[0][3] = 23;
      $.goto = 17;
      break;

    default:
      $.goto = 23;
      break;
  }
}, 1, [[4, "3:2-3:9", $s$2], [2, "3:2-3:8", $s$2], [4, "4:2-7:3", $s$2], [0, null, $s$2], [2, "4:15-4:21", $s$3], [0, "4:11-4:21", $s$3], [4, "4:23-4:29", $s$3], [0, null, $s$3], [4, "5:4-5:20", $s$3], [2, "5:12-5:19", $s$3], [4, "6:4-6:14", $s$3], [2, "6:4-6:13", $s$3], [36, "7:3-7:3", $s$3], [4, "4:31-4:34", $s$3], [0, "4:31-4:34", $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [4, "8:2-8:23", $s$2], [2, "8:14-8:21", $s$2], [2, "8:2-8:22", $s$2], [36, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();