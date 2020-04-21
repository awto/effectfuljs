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
  i: [1, "1:11-1:12"],
  j: [2, "2:6-2:7"],
  k: [3, "3:4-3:5"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-12:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-11:1", $s$1], [16, "12:0-12:0", $s$1], [16, "12:0-12:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, ["i"], 2, 4, "1:0-11:1", 0, function a($, $l, $p) {
  var $2, $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-3:10");
      $.state = 1;

    case 1:
      $l[3] = 0;
      $.goto = 2;
      $brk("4:2-4:9");
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff)($l[1]);
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("5:2-5:20");
      $.state = 4;

    case 4:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 5;
      ($context.call = eff)($1, $l[2] = 1);
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("6:2-6:16");
      $.state = 6;

    case 6:
      $1 = $l[2];
      $l[2] = $1 + 1;
      $2 = $l[3];
      $l[3] = $2 + 1;
      $.goto = 7;
      ($context.call = eff)($1, $2);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("7:2-7:9");
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff)($l[1]);
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk("8:2-8:15");
      $.state = 10;

    case 10:
      $.goto = 11;
      ($context.call = eff)($l[2] = 3);
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk("9:2-9:9");
      $.state = 12;

    case 12:
      $.goto = 13;
      ($context.call = eff)($l[2]);
      $.state = 13;

    case 13:
      $.goto = 14;
      $brk("10:2-10:9");
      $.state = 14;

    case 14:
      $.goto = 16;
      ($context.call = eff)($l[1]);
      continue;

    case 15:
      $.goto = 16;
      return $unhandled($.error);

    case 16:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-3:10", $s$2], [4, "4:2-4:9", $s$2], [2, "4:2-4:8", $s$2], [4, "5:2-5:20", $s$2], [2, "5:2-5:19", $s$2], [4, "6:2-6:16", $s$2], [2, "6:2-6:15", $s$2], [4, "7:2-7:9", $s$2], [2, "7:2-7:8", $s$2], [4, "8:2-8:15", $s$2], [2, "8:2-8:14", $s$2], [4, "9:2-9:9", $s$2], [2, "9:2-9:8", $s$2], [4, "10:2-10:9", $s$2], [2, "10:2-10:8", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]);

$M.moduleExports();