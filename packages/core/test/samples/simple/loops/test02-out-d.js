var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "2:9-2:10"]
}, null, 0],
    $s$2 = [{
  k: [1, "6:8-6:9"],
  i: [2, "5:11-5:12"],
  j: [3, "5:23-5:24"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-11:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "2:0-10:1", $s$1], [16, "11:0-11:0", $s$1], [16, "11:0-11:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 4, "2:0-10:1", 0, function a($, $l, $p) {
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
      $brk("4:2-4:8");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("5:2-8:3");
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($context.call = eff2)();
      $.state = 5;

    case 5:
      $l[2] = $p;
      $.goto = 6;
      $p = ($context.call = eff3)();
      $.state = 6;

    case 6:
      $l[3] = $p;
      $.state = 7;

    case 7:
      $1 = $l[2] < 10;

      if ($1) {
        $.state = 8;
      } else {
        $.goto = 9;
        continue;
      }

    case 8:
      $1 = $l[3] > -10;
      $.state = 9;

    case 9:
      if ($1) {
        $.state = 10;
      } else {
        $.goto = 15;
        continue;
      }

    case 10:
      $.goto = 11;
      $brk("6:4-6:20");
      $.state = 11;

    case 11:
      $.goto = 12;
      $p = ($context.call = eff3)($l[2]);
      $.state = 12;

    case 12:
      $l[1] = $p;
      $.goto = 13;
      $brk("7:4-7:14");
      $.state = 13;

    case 13:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 14;
      ($context.call = eff4)($1);
      $.state = 14;

    case 14:
      $l[2] = $l[2] + 1;
      $l[3] = $l[3] - 1;
      $.goto = 7;
      continue;

    case 15:
      $.goto = 16;
      $brk("9:2-9:13");
      $.state = 16;

    case 16:
      $.goto = 18;
      ($context.call = eff5)($l[2], $l[3]);
      continue;

    case 17:
      $.goto = 18;
      return $unhandled($.error);

    case 18:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "3:2-3:9", $s$2], [2, "3:2-3:8", $s$2], [4, "4:2-4:8", $s$2], [4, "5:2-8:3", $s$2], [2, "5:15-5:21", $s$2], [2, "5:27-5:33", $s$2], [0, "5:23-5:33", $s$2], [0, "5:35-5:41", $s$2], [0, "5:45-5:52", $s$2], [0, null, $s$2], [4, "6:4-6:20", $s$2], [2, "6:12-6:19", $s$2], [4, "7:4-7:14", $s$2], [2, "7:4-7:13", $s$2], [0, "5:54-5:57", $s$2], [4, "9:2-9:13", $s$2], [2, "9:2-9:12", $s$2], [16, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2]]);

$M.moduleExports();