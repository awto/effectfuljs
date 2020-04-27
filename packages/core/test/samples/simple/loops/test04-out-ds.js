var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 4, "1:0-9:1", 0, function a($, $l, $p) {
  var $1;

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
      $p = ($context.call = eff2)();
      $.state = 6;

    case 6:
      $lset($l[0], 2,
      /*i*/
      $p);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      if ($l[0][2] < 10) {
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
      ($context.call = eff3)($l[0][2], $l[0][1]);
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $1 = $l[0][1];
      $lset($l[0], 1,
      /*j*/
      $1 + 1);
      $.goto = 13;
      ($context.call = eff4)($1);
      $.state = 13;

    case 13:
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $l = $.$ = $l.slice();
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $lset($l[0], 2,
      /*i*/
      $l[0][2] + 1);
      $.goto = 7;
      continue;

    case 16:
      $l[0][3] = 18;
      $.state = 17;

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
      ($context.call = eff7)($l[2]);
      $.state = 20;

    case 20:
      $.goto = 22;
      $brk();
      continue;

    case 21:
      $.goto = 22;
      return $unhandled($.error);

    case 22:
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
      $l[0][3] = 21;
      $.goto = 17;
      break;

    default:
      $.goto = 21;
      break;
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
      $l[0][3] = 22;
      $.goto = 17;
      break;

    default:
      $.goto = 22;
      break;
  }
}, 1, [[4, "2:2-2:8", $s$2], [4, "3:2-3:9", $s$2], [2, "3:2-3:8", $s$2], [4, "4:2-7:3", $s$2], [0, null, $s$2], [2, "4:15-4:21", $s$3], [0, "4:11-4:21", $s$3], [4, "4:23-4:29", $s$3], [0, null, $s$2], [4, "5:4-5:15", $s$3], [2, "5:4-5:14", $s$3], [4, "6:4-6:14", $s$3], [2, "6:4-6:13", $s$3], [36, "7:3-7:3", $s$2], [4, "4:31-4:34", $s$3], [0, "4:31-4:34", $s$3], [0, null, $s$2], [0, null, $s$2], [4, "8:2-8:10", $s$2], [2, "8:2-8:9", $s$2], [36, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();