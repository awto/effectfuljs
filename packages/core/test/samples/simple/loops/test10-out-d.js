var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{
  i: [1, "2:16-2:17"]
}, $s$2, 1],
    $s$4 = [{
  j: [2, "3:13-3:14"]
}, $s$3, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-7:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-6:1", 0, function a($, $l, $p) {
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
      $p = ($x.call = init)();
      $.state = 3;

    case 3:
      $l[1] = $p;
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($x.call = check)();
      $.state = 6;

    case 6:
      if ($p === true) {
        $.state = 7;
      } else {
        $.goto = 21;
        continue;
      }

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      $p = ($x.call = initJ)();
      $.state = 9;

    case 9:
      $l[2] = $p;
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      $p = ($x.call = checkJ)();
      $.state = 12;

    case 12:
      if ($p === true) {
        $.state = 13;
      } else {
        $.goto = 19;
        continue;
      }

    case 13:
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      if ($l[1] === $l[2]) {
        $.state = 15;
      } else {
        $.goto = 18;
        continue;
      }

    case 15:
      $.goto = 16;
      $brk();
      $.state = 16;

    case 16:
      $.goto = 17;
      $brk();
      $.state = 17;

    case 17:
      $.goto = 10;
      ($x.call = updJ)();
      continue;

    case 18:
      $.goto = 19;
      $brk();
      $.state = 19;

    case 19:
      $.goto = 20;
      $brk();
      $.state = 20;

    case 20:
      $.goto = 4;
      ($x.call = upd)();
      continue;

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
}, null, null, 1, [[4, "2:2-5:24", $s$2], [4, "2:7-5:24", $s$2], [2, "2:20-2:26", $s$3], [0, "2:16-2:26", $s$3], [4, "2:28-2:44", $s$3], [2, "2:28-2:35", $s$3], [0, null, $s$2], [4, "3:4-5:24", $s$3], [2, "3:17-3:24", $s$4], [0, "3:13-3:24", $s$4], [4, "3:26-3:43", $s$4], [2, "3:26-3:34", $s$4], [0, null, $s$2], [4, "4:6-5:24", $s$4], [0, null, $s$2], [4, "4:19-4:28", $s$4], [4, "3:45-3:51", $s$4], [2, "3:45-3:51", $s$4], [4, "5:11-5:24", $s$4], [4, "2:46-2:51", $s$3], [2, "2:46-2:51", $s$3], [36, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]);

$M.moduleExports();