var $M = require("@effectful/debugger/api"),
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
      $brk("2:2-2:8");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:2-3:9");
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff1)();
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("4:2-7:3");
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
      if ($l[0][2] < 10) {
        $.goto = 8;
        $brk("5:4-5:15");
        $.state = 8;
      } else {
        $l[0][3] = 13;
        $.goto = 12;
        continue;
      }

    case 8:
      $.goto = 9;
      ($context.call = eff3)($l[0][2], $l[0][1]);
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk("6:4-6:14");
      $.state = 10;

    case 10:
      $1 = $l[0][1];
      $lset($l[0], 1,
      /*j*/
      $1 + 1);
      $.goto = 11;
      ($context.call = eff4)($1);
      $.state = 11;

    case 11:
      $l = $.$ = $l.slice();
      $lset($l[0], 2,
      /*i*/
      $l[0][2] + 1);
      $.goto = 7;
      continue;

    case 12:
      $l = $.$ = $l[0];
      $.goto = $l[3];
      continue;

    case 13:
      $.goto = 14;
      $brk("8:2-8:10");
      $.state = 14;

    case 14:
      $.goto = 16;
      ($context.call = eff7)($l[2]);
      continue;

    case 15:
      $.goto = 16;
      return $unhandled($.error);

    case 16:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][3] = 15;
      $.goto = 12;
      break;

    default:
      $.goto = 15;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][3] = 16;
      $.goto = 12;
      break;

    default:
      $.goto = 16;
      break;
  }
}, 1, [[4, "2:2-2:8", $s$2], [4, "3:2-3:9", $s$2], [2, "3:2-3:8", $s$2], [4, "4:2-7:3", $s$2], [0, null, $s$2], [3, "4:15-4:21", $s$3], [1, "4:11-4:21", $s$3], [5, "5:4-5:15", $s$3], [3, "5:4-5:14", $s$3], [5, "6:4-6:14", $s$3], [3, "6:4-6:13", $s$3], [1, null, $s$2], [0, null, $s$2], [4, "8:2-8:10", $s$2], [2, "8:2-8:9", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();