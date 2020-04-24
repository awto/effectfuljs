var $M = require("@effectful/debugger"),
    $context = $M.context,
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
      $brk("2:2-5:24");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("2:7-5:24");
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = init)();
      $.state = 3;

    case 3:
      $l[1] = $p;
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($context.call = check)();
      $.state = 5;

    case 5:
      if ($p === true) {
        $.state = 6;
      } else {
        $.goto = 17;
        continue;
      }

    case 6:
      $.goto = 7;
      $brk("3:4-5:24");
      $.state = 7;

    case 7:
      $.goto = 8;
      $p = ($context.call = initJ)();
      $.state = 8;

    case 8:
      $l[2] = $p;
      $.state = 9;

    case 9:
      $.goto = 10;
      $p = ($context.call = checkJ)();
      $.state = 10;

    case 10:
      if ($p === true) {
        $.state = 11;
      } else {
        $.goto = 16;
        continue;
      }

    case 11:
      $.goto = 12;
      $brk("4:6-5:24");
      $.state = 12;

    case 12:
      if ($l[1] === $l[2]) {
        $.state = 13;
      } else {
        $.goto = 15;
        continue;
      }

    case 13:
      $.goto = 14;
      $brk("4:19-4:28");
      $.state = 14;

    case 14:
      $.goto = 9;
      ($context.call = updJ)();
      continue;

    case 15:
      $.goto = 16;
      $brk("5:11-5:24");
      $.state = 16;

    case 16:
      $.goto = 4;
      ($context.call = upd)();
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
}, null, null, 1, [[4, "2:2-5:24", $s$2], [4, "2:7-5:24", $s$2], [2, "2:20-2:26", $s$3], [0, "2:16-2:26", $s$3], [2, "2:28-2:35", $s$3], [0, null, $s$2], [4, "3:4-5:24", $s$3], [2, "3:17-3:24", $s$4], [0, "3:13-3:24", $s$4], [2, "3:26-3:34", $s$4], [0, null, $s$2], [4, "4:6-5:24", $s$4], [0, null, $s$2], [4, "4:19-4:28", $s$4], [2, "3:45-3:51", $s$4], [4, "5:11-5:24", $s$4], [2, "2:46-2:51", $s$3], [0, null, $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]);

$M.moduleExports();