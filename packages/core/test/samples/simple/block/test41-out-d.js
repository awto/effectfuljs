var $M = require("@effectful/debugger/api"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-29:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-28:1", $s$1], [16, "29:0-29:0", $s$1], [16, "29:0-29:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-28:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("3:4-3:11");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff1)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("4:4-6:5");
      $.state = 3;

    case 3:
      if (a1) {
        $.goto = 24;
        $brk("5:6-5:13");
        continue;
      } else {
        $.state = 4;
      }

    case 4:
      $.goto = 5;
      $brk("8:2-8:30");
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("option", M, {
        coerce: false
      });
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk("10:4-10:11");
      $.state = 7;

    case 7:
      $.goto = 8;
      ($context.call = eff3)();
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk("11:4-13:5");
      $.state = 9;

    case 9:
      if (a2) {
        $.goto = 23;
        $brk("12:6-12:13");
        continue;
      } else {
        $.state = 10;
      }

    case 10:
      $.goto = 11;
      $brk("16:4-16:31");
      $.state = 11;

    case 11:
      $.goto = 12;
      $mcall("option", M, {
        coerce: true
      });
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk("17:4-17:11");
      $.state = 13;

    case 13:
      $.goto = 14;
      ($context.call = eff5)();
      $.state = 14;

    case 14:
      $.goto = 15;
      $brk("18:4-20:5");
      $.state = 15;

    case 15:
      if (a3) {
        $.goto = 22;
        $brk("19:6-19:13");
        continue;
      } else {
        $.state = 16;
      }

    case 16:
      $.goto = 17;
      $brk("23:4-23:11");
      $.state = 17;

    case 17:
      $.goto = 18;
      ($context.call = eff7)();
      $.state = 18;

    case 18:
      $.goto = 19;
      $brk("24:4-26:5");
      $.state = 19;

    case 19:
      if (a4) {
        $.goto = 21;
        $brk("25:6-25:13");
        continue;
      } else {
        $.state = 20;
      }

    case 20:
      $.goto = 26;
      continue;

    case 21:
      $.goto = 20;
      ($context.call = eff8)();
      continue;

    case 22:
      $.goto = 16;
      ($context.call = eff6)();
      continue;

    case 23:
      $.goto = 10;
      ($context.call = eff4)();
      continue;

    case 24:
      $.goto = 4;
      ($context.call = eff2)();
      continue;

    case 25:
      $.goto = 26;
      return $unhandled($.error);

    case 26:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "3:4-3:11", $s$2], [2, "3:4-3:10", $s$2], [4, "4:4-6:5", $s$2], [4, "5:6-5:13", $s$2], [4, "8:2-8:30", $s$2], [2, "8:2-8:29", $s$2], [4, "10:4-10:11", $s$2], [2, "10:4-10:10", $s$2], [4, "11:4-13:5", $s$2], [4, "12:6-12:13", $s$2], [4, "16:4-16:31", $s$2], [2, "16:4-16:30", $s$2], [4, "17:4-17:11", $s$2], [2, "17:4-17:10", $s$2], [4, "18:4-20:5", $s$2], [4, "19:6-19:13", $s$2], [4, "23:4-23:11", $s$2], [2, "23:4-23:10", $s$2], [4, "24:4-26:5", $s$2], [4, "25:6-25:13", $s$2], [0, null, $s$2], [2, "25:6-25:12", $s$2], [2, "19:6-19:12", $s$2], [2, "12:6-12:12", $s$2], [2, "5:6-5:12", $s$2], [16, "28:1-28:1", $s$2], [16, "28:1-28:1", $s$2]]);

$M.moduleExports();