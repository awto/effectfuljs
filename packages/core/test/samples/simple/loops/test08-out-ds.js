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
  i: [1, "2:11-2:12"]
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
      $brk("2:2-8:3");
      $.state = 1;

    case 1:
      $l = $.$ = [$l];
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = init)();
      $.state = 3;

    case 3:
      $lset($l[0], 1,
      /*i*/
      $p);
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($context.call = check)();
      $.state = 5;

    case 5:
      if ($p === true) {
        $.state = 6;
      } else {
        $.goto = 15;
        continue;
      }

    case 6:
      $.goto = 7;
      $brk("3:4-3:9");
      $.state = 7;

    case 7:
      $.goto = 8;
      ($context.call = b1)();
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk("4:4-7:5");
      $.state = 9;

    case 9:
      if (v) {
        $.state = 10;
      } else {
        $.goto = 14;
        continue;
      }

    case 10:
      $.goto = 11;
      $brk("5:6-5:10");
      $.state = 11;

    case 11:
      $.goto = 12;
      ($context.call = e)();
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk("6:6-6:15");
      $.state = 13;

    case 13:
      $.goto = 4;
      ($context.call = upd)();
      continue;

    case 14:
      $l = $.$ = $l.slice();
      $.goto = 13;
      continue;

    case 15:
      $l[0][2] = 17;
      $.state = 16;

    case 16:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 17:
      $.goto = 19;
      continue;

    case 18:
      $.goto = 19;
      return $unhandled($.error);

    case 19:
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
    case 3:
    case 2:
      $l[0][2] = 18;
      $.goto = 16;
      break;

    default:
      $.goto = 18;
      break;
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
    case 3:
    case 2:
      $l[0][2] = 19;
      $.goto = 16;
      break;

    default:
      $.goto = 19;
      break;
  }
}, 1, [[4, "2:2-8:3", $s$2], [0, null, $s$2], [3, "2:15-2:21", $s$3], [1, "2:11-2:21", $s$3], [3, "2:23-2:30", $s$3], [1, null, $s$2], [5, "3:4-3:9", $s$3], [3, "3:4-3:8", $s$3], [5, "4:4-7:5", $s$3], [1, null, $s$2], [5, "5:6-5:10", $s$3], [3, "5:6-5:9", $s$3], [5, "6:6-6:15", $s$3], [3, "2:41-2:46", $s$3], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [0, null, $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();