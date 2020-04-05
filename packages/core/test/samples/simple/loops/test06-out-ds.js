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
      $lset($l[0], 1,
      /*i*/
      $p);
      $.state = 7;

    case 7:
      $.goto = 8;
      $p = ($context.call = eff)(3);
      $.state = 8;

    case 8:
      if ($l[0][1] !== $p) {
        $.goto = 9;
        $brk("5:4-5:12");
        $.state = 9;
      } else {
        $l[0][2] = 15;
        $.goto = 14;
        continue;
      }

    case 9:
      $.goto = 10;
      ($context.call = eff5)($l[0][1]);
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk("6:4-6:12");
      $.state = 11;

    case 11:
      $.goto = 12;
      ($context.call = eff6)($l[0][1]);
      $.state = 12;

    case 12:
      $l = $.$ = $l.slice();
      $.goto = 13;
      $p = ($context.call = eff4)($l[0][1]);
      $.state = 13;

    case 13:
      $lset($l[0], 1,
      /*i*/
      $p);
      $.goto = 7;
      continue;

    case 14:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 15:
      $.goto = 16;
      $brk("8:2-8:10");
      $.state = 16;

    case 16:
      $.goto = 18;
      ($context.call = eff7)($l[1]);
      continue;

    case 17:
      $.goto = 18;
      return $unhandled($.error);

    case 18:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][2] = 17;
      $.goto = 14;
      break;

    default:
      $.goto = 17;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][2] = 18;
      $.goto = 14;
      break;

    default:
      $.goto = 18;
      break;
  }
}, 1, [[4, "2:2-2:8", $s$2], [4, "3:2-3:9", $s$2], [2, "3:2-3:8", $s$2], [4, "4:2-7:3", $s$2], [0, null, $s$2], [3, "4:11-4:17", $s$3], [1, "4:7-4:17", $s$3], [3, "4:25-4:31", $s$3], [5, "5:4-5:12", $s$3], [3, "5:4-5:11", $s$3], [5, "6:4-6:12", $s$3], [3, "6:4-6:11", $s$3], [3, "4:37-4:44", $s$3], [1, "4:33-4:44", $s$3], [0, null, $s$2], [4, "8:2-8:10", $s$2], [2, "8:2-8:9", $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();