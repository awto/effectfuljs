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
    $s$3 = [{
  i: [1, "2:11-2:12"]
}, $s$2, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-6:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-5:1", $s$1], [16, "6:0-6:0", $s$1], [16, "6:0-6:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-5:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0];
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = init)();
      $.state = 3;

    case 3:
      $lset($l, 1,
      /*i*/
      $p);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($context.call = check)();
      $.state = 6;

    case 6:
      if ($p === true) {
        $.state = 7;
      } else {
        $.goto = 15;
        continue;
      }

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      if ($l[0][0][1]) {
        $.state = 9;
      } else {
        $.goto = 14;
        continue;
      }

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      ($context.call = eff)(1);
      $.state = 11;

    case 11:
      $l = $.$ = [$l[0], $l[1], void 0];
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $.goto = 4;
      ($context.call = upd)();
      continue;

    case 14:
      $.goto = 12;
      $brk();
      continue;

    case 15:
      $l[0][1] = 18;
      $.goto = 17;
      continue;

    case 16:
      return $raise($.error);

    case 17:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 18:
      $.goto = 20;
      $brk();
      continue;

    case 19:
      $.goto = 20;
      return $unhandled($.error);

    case 20:
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
      $.goto = 17;
      $l[0][1] = 16;
      break;

    default:
      $.goto = 19;
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
      $l[0][1] = 20;
      $.goto = 17;
      break;

    default:
      $.goto = 20;
      break;
  }
}, 1, [[4, "2:2-4:18", $s$2], [0, null, $s$2], [2, "2:15-2:21", $s$3], [0, "2:11-2:21", $s$3], [4, "2:23-2:39", $s$3], [2, "2:23-2:30", $s$3], [0, null, $s$3], [4, "3:4-4:18", $s$3], [0, null, $s$3], [4, "3:11-3:18", $s$3], [2, "3:11-3:17", $s$3], [0, null, $s$3], [4, "2:41-2:46", $s$3], [2, "2:41-2:46", $s$3], [4, "4:9-4:18", $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [36, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]);

$M.moduleExports();