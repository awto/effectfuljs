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
      $brk("2:2-5:24");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("2:7-5:24");
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
      $p = ($context.call = check)();
      $.state = 6;

    case 6:
      if ($p === true) {
        $.goto = 7;
        $brk("3:4-5:24");
        $.state = 7;
      } else {
        $l[0][1] = 18;
        $.goto = 17;
        continue;
      }

    case 7:
      $l = $.$ = [$l, void 0, void 0];
      $.state = 8;

    case 8:
      $.goto = 9;
      $p = ($context.call = initJ)();
      $.state = 9;

    case 9:
      $lset($l, 1,
      /*j*/
      $p);
      $.state = 10;

    case 10:
      $.goto = 11;
      $p = ($context.call = checkJ)();
      $.state = 11;

    case 11:
      if ($p === true) {
        $.goto = 12;
        $brk("4:6-5:24");
        $.state = 12;
      } else {
        $l[0][2] = 15;
        $.goto = 14;
        continue;
      }

    case 12:
      if ($l[0][1] === $l[1]) {
        $.goto = 13;
        $brk("4:19-4:28");
        $.state = 13;
      } else {
        $l[0][2] = 16;
        $.goto = 14;
        $brk("5:11-5:24");
        continue;
      }

    case 13:
      $.goto = 10;
      ($context.call = updJ)();
      continue;

    case 14:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 15:
      $l = $.$ = $l.slice();
      $.state = 16;

    case 16:
      $.goto = 5;
      ($context.call = upd)();
      continue;

    case 17:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 18:
      $.goto = 20;
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
    case 16:
    case 15:
    case 14:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
      $l[0][1] = 19;
      $.goto = 17;
      break;

    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
      $l[0][2] = 17;
      $l[0][0][1] = 19;
      $.goto = 14;
      break;

    default:
      $.goto = 19;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 16:
    case 15:
    case 14:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
      $l[0][1] = 20;
      $.goto = 17;
      break;

    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
      $l[0][2] = 17;
      $l[0][0][1] = 20;
      $.goto = 14;
      break;

    default:
      $.goto = 20;
      break;
  }
}, 1, [[4, "2:2-5:24", $s$2], [4, "2:7-5:24", $s$2], [0, null, $s$2], [3, "2:20-2:26", $s$3], [1, "2:16-2:26", $s$3], [3, "2:28-2:35", $s$3], [5, "3:4-5:24", $s$3], [1, null, $s$2], [3, "3:17-3:24", $s$4], [1, "3:13-3:24", $s$4], [3, "3:26-3:34", $s$4], [5, "4:6-5:24", $s$4], [5, "4:19-4:28", $s$4], [3, "3:45-3:51", $s$4], [1, null, $s$2], [1, null, $s$2], [3, "2:46-2:51", $s$3], [0, null, $s$2], [0, null, $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]);

$M.moduleExports();