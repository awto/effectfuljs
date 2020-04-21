var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
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
      $brk("3:2-3:9");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff1)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("4:2-7:3");
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
      if ($l[0][1] < 10) {
        $.goto = 7;
        $brk("5:4-5:20");
        $.state = 7;
      } else {
        $l[0][3] = 12;
        $.goto = 11;
        continue;
      }

    case 7:
      $.goto = 8;
      $p = ($context.call = eff3)($l[0][1]);
      $.state = 8;

    case 8:
      $lset($l[0], 2,
      /*j*/
      $p);
      $.goto = 9;
      $brk("6:4-6:14");
      $.state = 9;

    case 9:
      $1 = $l[0][2];
      $lset($l[0], 2,
      /*j*/
      $1 + 1);
      $.goto = 10;
      ($context.call = eff4)($1);
      $.state = 10;

    case 10:
      $l = $.$ = $l.slice();
      $lset($l[0], 1,
      /*i*/
      $l[0][1] + 1);
      $.goto = 6;
      continue;

    case 11:
      $l = $.$ = $l[0];
      $.goto = $l[3];
      continue;

    case 12:
      $.goto = 13;
      $brk("8:2-8:23");
      $.state = 13;

    case 13:
      $.goto = 14;
      $p = ($context.call = eff7)($l[1]);
      $.state = 14;

    case 14:
      $.goto = 16;
      $mcall("log", console, $p);
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
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][3] = 15;
      $.goto = 11;
      break;

    default:
      $.goto = 15;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][3] = 16;
      $.goto = 11;
      break;

    default:
      $.goto = 16;
      break;
  }
}, 1, [[4, "3:2-3:9", $s$2], [2, "3:2-3:8", $s$2], [4, "4:2-7:3", $s$2], [0, null, $s$2], [3, "4:15-4:21", $s$3], [1, "4:11-4:21", $s$3], [5, "5:4-5:20", $s$3], [3, "5:12-5:19", $s$3], [5, "6:4-6:14", $s$3], [3, "6:4-6:13", $s$3], [1, null, $s$2], [0, null, $s$2], [4, "8:2-8:23", $s$2], [2, "8:14-8:21", $s$2], [2, "8:2-8:22", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();