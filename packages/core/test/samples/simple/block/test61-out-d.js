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
    $s$2 = [{
  i: [1, "2:6-2:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-14:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-13:1", $s$1], [16, "14:0-14:0", $s$1], [16, "14:0-14:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 2, "1:0-13:1", 0, function a($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:12");
      $.state = 1;

    case 1:
      $l[1] = 0;
      $.goto = 2;
      $brk("3:2-3:10");
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff1)($l[1]);
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("4:2-11:3");
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("5:4-5:14");
      $.state = 5;

    case 5:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 6;
      ($context.call = eff2)($1);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk("6:4-9:5");
      $.state = 7;

    case 7:
      if ($l[1]) {
        $.state = 8;
      } else {
        $.goto = 12;
        continue;
      }

    case 8:
      $.goto = 9;
      $brk("7:6-7:10");
      $.state = 9;

    case 9:
      $l[1] = $l[1] + 1;
      $.goto = 10;
      $brk("8:6-8:16");
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk("12:2-12:12");
      $.state = 11;

    case 11:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 15;
      ($context.call = eff4)($1);
      continue;

    case 12:
      $.goto = 13;
      $brk("10:4-10:14");
      $.state = 13;

    case 13:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 10;
      ($context.call = eff3)($1);
      continue;

    case 14:
      $.goto = 15;
      return $unhandled($.error);

    case 15:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:12", $s$2], [4, "3:2-3:10", $s$2], [2, "3:2-3:9", $s$2], [4, "4:2-11:3", $s$2], [4, "5:4-5:14", $s$2], [2, "5:4-5:13", $s$2], [4, "6:4-9:5", $s$2], [0, null, $s$2], [4, "7:6-7:10", $s$2], [4, "8:6-8:16", $s$2], [4, "12:2-12:12", $s$2], [2, "12:2-12:11", $s$2], [4, "10:4-10:14", $s$2], [2, "10:4-10:13", $s$2], [16, "13:1-13:1", $s$2], [16, "13:1-13:1", $s$2]]);

$M.moduleExports();