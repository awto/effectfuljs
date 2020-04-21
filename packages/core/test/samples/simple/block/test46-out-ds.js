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
  i: [1, "2:6-2:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-25:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-24:1", $s$1], [16, "25:0-25:0", $s$1], [16, "25:0-25:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 1, 2, "1:0-24:1", 0, function a($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:8");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:2-3:27");
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = eff2)($lset($l, 1,
      /*i*/
      0));
      $.state = 3;

    case 3:
      $1 = $l[1];
      $lset($l, 1,
      /*i*/
      $1 + 1);
      $.goto = 4;
      ($context.call = eff1)($p, $1);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("4:2-21:3");
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("5:4-5:14");
      $.state = 6;

    case 6:
      $1 = $l[1];
      $lset($l, 1,
      /*i*/
      $1 + 1);
      $.goto = 7;
      ($context.call = eff3)($1);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("6:4-6:14");
      $.state = 8;

    case 8:
      $1 = $l[1];
      $lset($l, 1,
      /*i*/
      $1 + 1);
      $.goto = 9;
      ($context.call = eff4)($1);
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk("7:4-19:5");
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk("8:6-8:16");
      $.state = 11;

    case 11:
      $1 = $l[1];
      $lset($l, 1,
      /*i*/
      $1 + 1);
      $.goto = 12;
      ($context.call = eff5)($1);
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk("9:6-17:7");
      $.state = 13;

    case 13:
      $1 = $l[1];
      $lset($l, 1,
      /*i*/
      $1 + 1);
      $.goto = 14;
      $p = ($context.call = eff6)($1);
      $.state = 14;

    case 14:
      if ($p) {
        $.goto = 25;
        $brk("10:8-10:18");
        continue;
      } else {
        $.goto = 15;
        $brk("12:13-17:7");
        $.state = 15;
      }

    case 15:
      $.goto = 16;
      $p = ($context.call = eff7)($l[1]);
      $.state = 16;

    case 16:
      if ($p) {
        $.goto = 18;
        $brk("13:8-13:12");
        continue;
      } else {
        $.goto = 17;
        $brk("16:8-16:18");
        $.state = 17;
      }

    case 17:
      $.result = 10;
      $.goto = 28;
      continue;

    case 18:
      $lset($l, 1,
      /*i*/
      $l[1] + 1);
      $.goto = 19;
      $brk("14:8-14:19");
      $.state = 19;

    case 19:
      $.goto = 20;
      $brk("20:4-20:14");
      $.state = 20;

    case 20:
      $1 = $l[1];
      $lset($l, 1,
      /*i*/
      $1 + 1);
      $.goto = 21;
      ($context.call = eff8)($1);
      $.state = 21;

    case 21:
      $.goto = 22;
      $brk("22:2-22:12");
      $.state = 22;

    case 22:
      $1 = $l[1];
      $lset($l, 1,
      /*i*/
      $1 + 1);
      $.goto = 23;
      ($context.call = eff9)($1);
      $.state = 23;

    case 23:
      $.goto = 24;
      $brk("23:2-23:13");
      $.state = 24;

    case 24:
      $1 = $l[1];
      $lset($l, 1,
      /*i*/
      $1 + 1);
      $.goto = 28;
      ($context.call = eff10)($1);
      continue;

    case 25:
      $1 = $l[1];
      $lset($l, 1,
      /*i*/
      $1 + 1);
      $.goto = 26;
      ($context.call = eff7)($1);
      $.state = 26;

    case 26:
      $.goto = 21;
      $brk("11:8-11:19");
      continue;

    case 27:
      $.goto = 28;
      return $unhandled($.error);

    case 28:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:8", $s$2], [4, "3:2-3:27", $s$2], [2, "3:7-3:20", $s$2], [2, "3:2-3:26", $s$2], [4, "4:2-21:3", $s$2], [4, "5:4-5:14", $s$2], [2, "5:4-5:13", $s$2], [4, "6:4-6:14", $s$2], [2, "6:4-6:13", $s$2], [4, "7:4-19:5", $s$2], [4, "8:6-8:16", $s$2], [2, "8:6-8:15", $s$2], [4, "9:6-17:7", $s$2], [2, "9:10-9:19", $s$2], [4, "10:8-10:18", $s$2], [2, "12:17-12:24", $s$2], [4, "13:8-13:12", $s$2], [0, "16:15-16:17", $s$2], [4, "14:8-14:19", $s$2], [4, "20:4-20:14", $s$2], [2, "20:4-20:13", $s$2], [4, "22:2-22:12", $s$2], [2, "22:2-22:11", $s$2], [4, "23:2-23:13", $s$2], [2, "23:2-23:12", $s$2], [2, "10:8-10:17", $s$2], [4, "11:8-11:19", $s$2], [16, "24:1-24:1", $s$2], [16, "24:1-24:1", $s$2]]);

$M.moduleExports();