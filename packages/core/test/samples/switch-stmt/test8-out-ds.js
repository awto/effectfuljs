var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "2:9-2:10"]
}, null, 0],
    $s$2 = [{
  i: [1, "3:6-3:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-17:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "2:0-16:1", $s$1], [16, "17:0-17:0", $s$1], [16, "17:0-17:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "2:0-16:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("3:2-3:12");
      $.state = 1;

    case 1:
      $lset($l, 1,
      /*i*/
      0);
      $.goto = 2;
      $brk("4:2-4:8");
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff)();
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("5:2-14:3");
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($context.call = eff)($lset($l, 1,
      /*i*/
      $l[1] + 1));
      $.state = 5;

    case 5:
      $l[2] = $p;
      $.goto = 6;
      $p = ($context.call = check)($lset($l, 1,
      /*i*/
      $l[1] + 2));
      $.state = 6;

    case 6:
      if ($l[2] === $p) {
        $.goto = 16;
        $brk("7:6-7:21");
        continue;
      } else {
        $.goto = 7;
        $p = ($context.call = check)($lset($l, 1,
        /*i*/
        $l[1] + 4));
        $.state = 7;
      }

    case 7:
      if ($l[2] === $p) {
        $.state = 8;
      } else {
        $.goto = 13;
        $p = ($context.call = check)($lset($l, 1,
        /*i*/
        $l[1] + 6));
        continue;
      }

    case 8:
      $.goto = 9;
      $brk("10:6-10:21");
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = effB)($lset($l, 1,
      /*i*/
      $l[1] + 5));
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk("11:6-11:12");
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk("15:2-15:9");
      $.state = 12;

    case 12:
      $.goto = 19;
      ($context.call = eff)($l[1]);
      continue;

    case 13:
      if ($l[2] === $p) {
        $.state = 14;
      } else {
        $.goto = 11;
        continue;
      }

    case 14:
      $.goto = 15;
      $brk("13:6-13:27");
      $.state = 15;

    case 15:
      $.goto = 11;
      $mcall("log", console, "hi", $l[1]);
      continue;

    case 16:
      $.goto = 17;
      ($context.call = effB)($lset($l, 1,
      /*i*/
      $l[1] + 3));
      $.state = 17;

    case 17:
      $.goto = 11;
      $brk("8:6-8:12");
      continue;

    case 18:
      $.goto = 19;
      return $unhandled($.error);

    case 19:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "3:2-3:12", $s$2], [4, "4:2-4:8", $s$2], [2, "4:2-4:7", $s$2], [4, "5:2-14:3", $s$2], [2, "5:10-5:23", $s$2], [2, "6:9-6:24", $s$2], [4, "7:6-7:21", $s$2], [2, "12:9-12:24", $s$2], [4, "10:6-10:21", $s$2], [2, "10:6-10:20", $s$2], [4, "11:6-11:12", $s$2], [4, "15:2-15:9", $s$2], [2, "15:2-15:8", $s$2], [0, null, $s$2], [4, "13:6-13:27", $s$2], [2, "13:6-13:26", $s$2], [2, "7:6-7:20", $s$2], [4, "8:6-8:12", $s$2], [16, "16:1-16:1", $s$2], [16, "16:1-16:1", $s$2]]);

$M.moduleExports();