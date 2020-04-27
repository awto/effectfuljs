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
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{
  i: [1, "2:16-2:17"]
}, $s$2, 2],
    $s$4 = [{
  j: [1, "3:13-3:14"]
}, $s$3, 3],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-7:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-6:1", $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-6:1", 0, function a($, $l, $p) {
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
      $l = $.$ = [$l, void 0, void 0, void 0, void 0];
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($context.call = init)();
      $.state = 4;

    case 4:
      $lset($l, 1,
      /*i*/
      $p);
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      $p = ($context.call = check)();
      $.state = 7;

    case 7:
      if ($p === true) {
        $.state = 8;
      } else {
        $.goto = 26;
        continue;
      }

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $l = $.$ = [$l, void 0, void 0];
      $.state = 10;

    case 10:
      $.goto = 11;
      $p = ($context.call = initJ)();
      $.state = 11;

    case 11:
      $lset($l, 1,
      /*j*/
      $p);
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $.goto = 14;
      $p = ($context.call = checkJ)();
      $.state = 14;

    case 14:
      if ($p === true) {
        $.state = 15;
      } else {
        $.goto = 21;
        continue;
      }

    case 15:
      $.goto = 16;
      $brk();
      $.state = 16;

    case 16:
      if ($l[0][1] === $l[1]) {
        $.state = 17;
      } else {
        $.goto = 20;
        continue;
      }

    case 17:
      $.goto = 18;
      $brk();
      $.state = 18;

    case 18:
      $.goto = 19;
      $brk();
      $.state = 19;

    case 19:
      $.goto = 12;
      ($context.call = updJ)();
      continue;

    case 20:
      $l[0][2] = 24;
      $.goto = 22;
      $brk();
      continue;

    case 21:
      $l[0][2] = 23;
      $.state = 22;

    case 22:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 23:
      $l = $.$ = $l.slice();
      $.state = 24;

    case 24:
      $.goto = 25;
      $brk();
      $.state = 25;

    case 25:
      $.goto = 5;
      ($context.call = upd)();
      continue;

    case 26:
      $l[0][1] = 28;
      $.state = 27;

    case 27:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 28:
      $.goto = 30;
      $brk();
      continue;

    case 29:
      $.goto = 30;
      return $unhandled($.error);

    case 30:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 26:
    case 25:
    case 24:
    case 23:
    case 22:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
      $l[0][1] = 29;
      $.goto = 27;
      break;

    case 21:
    case 20:
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
      $l[0][2] = 27;
      $l[0][0][1] = 29;
      $.goto = 22;
      break;

    default:
      $.goto = 29;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 26:
    case 25:
    case 24:
    case 23:
    case 22:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
      $l[0][1] = 30;
      $.goto = 27;
      break;

    case 21:
    case 20:
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
      $l[0][2] = 27;
      $l[0][0][1] = 30;
      $.goto = 22;
      break;

    default:
      $.goto = 30;
      break;
  }
}, 1, [[4, "2:2-5:24", $s$2], [4, "2:7-5:24", $s$2], [0, null, $s$2], [2, "2:20-2:26", $s$3], [0, "2:16-2:26", $s$3], [4, "2:28-2:44", $s$3], [2, "2:28-2:35", $s$3], [0, null, $s$2], [4, "3:4-5:24", $s$3], [0, null, $s$2], [2, "3:17-3:24", $s$4], [0, "3:13-3:24", $s$4], [4, "3:26-3:43", $s$4], [2, "3:26-3:34", $s$4], [0, null, $s$2], [4, "4:6-5:24", $s$4], [0, null, $s$2], [4, "4:19-4:28", $s$4], [4, "3:45-3:51", $s$4], [2, "3:45-3:51", $s$4], [4, "5:11-5:24", $s$4], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [4, "2:46-2:51", $s$3], [2, "2:46-2:51", $s$3], [0, null, $s$2], [0, null, $s$2], [36, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]);

$M.moduleExports();