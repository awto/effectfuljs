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
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-24:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "2:0-23:1", $s$1], [16, "24:0-24:0", $s$1], [16, "24:0-24:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "2:0-23:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("3:2-22:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)();
      $.state = 2;

    case 2:
      $l[1] = $p;
      $.goto = 3;
      $p = ($context.call = check)(1);
      $.state = 3;

    case 3:
      if ($l[1] === $p) {
        $.goto = 25;
        $brk("5:6-5:14");
        continue;
      } else {
        $.goto = 4;
        $p = ($context.call = check)(2);
        $.state = 4;
      }

    case 4:
      if ($l[1] === $p) {
        $.state = 5;
      } else {
        $.goto = 11;
        $p = ($context.call = check)(3);
        continue;
      }

    case 5:
      $.goto = 6;
      $brk("7:6-7:21");
      $.state = 6;

    case 6:
      $.goto = 7;
      $mcall("log", console, 2);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("9:6-9:14");
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = effB)(2);
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk("10:6-10:12");
      $.state = 10;

    case 10:
      $.goto = 27;
      continue;

    case 11:
      if ($l[1] === $p) {
        $.goto = 7;
        continue;
      } else {
        $.goto = 12;
        $p = ($context.call = check)(4);
        $.state = 12;
      }

    case 12:
      if ($l[1] === $p) {
        $.state = 13;
      } else {
        if ($l[1] === 5) {
          $.goto = 16;
          continue;
        } else {
          if ($l[1] === 6) {
            $.goto = 18;
            continue;
          } else {
            $.goto = 21;
            $p = ($context.call = check)(8);
            continue;
          }
        }
      }

    case 13:
      $.goto = 14;
      $brk("12:6-12:21");
      $.state = 14;

    case 14:
      $.goto = 15;
      $mcall("log", console, 5);
      $.state = 15;

    case 15:
      $.goto = 10;
      $brk("13:6-13:12");
      continue;

    case 16:
      $.goto = 17;
      $brk("15:6-15:21");
      $.state = 17;

    case 17:
      $.goto = 18;
      $mcall("log", console, 6);
      $.state = 18;

    case 18:
      $.goto = 19;
      $brk("17:6-17:21");
      $.state = 19;

    case 19:
      $.goto = 20;
      $mcall("log", console, 7);
      $.state = 20;

    case 20:
      $.goto = 10;
      $brk("18:6-18:12");
      continue;

    case 21:
      if ($l[1] === $p) {
        $.state = 22;
      } else {
        $.goto = 10;
        continue;
      }

    case 22:
      $.goto = 23;
      $brk("20:6-20:14");
      $.state = 23;

    case 23:
      $.goto = 24;
      ($context.call = effB)(3);
      $.state = 24;

    case 24:
      $.goto = 10;
      $brk("21:6-21:12");
      continue;

    case 25:
      $.goto = 5;
      ($context.call = effB)(1);
      continue;

    case 26:
      $.goto = 27;
      return $unhandled($.error);

    case 27:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "3:2-22:3", $s$2], [2, "3:10-3:15", $s$2], [2, "4:9-4:17", $s$2], [4, "5:6-5:14", $s$2], [2, "8:9-8:17", $s$2], [4, "7:6-7:21", $s$2], [2, "7:6-7:20", $s$2], [4, "9:6-9:14", $s$2], [2, "9:6-9:13", $s$2], [4, "10:6-10:12", $s$2], [0, null, $s$2], [2, "11:9-11:17", $s$2], [2, "19:9-19:17", $s$2], [4, "12:6-12:21", $s$2], [2, "12:6-12:20", $s$2], [4, "13:6-13:12", $s$2], [4, "15:6-15:21", $s$2], [2, "15:6-15:20", $s$2], [4, "17:6-17:21", $s$2], [2, "17:6-17:20", $s$2], [4, "18:6-18:12", $s$2], [0, null, $s$2], [4, "20:6-20:14", $s$2], [2, "20:6-20:13", $s$2], [4, "21:6-21:12", $s$2], [2, "5:6-5:13", $s$2], [16, "23:1-23:1", $s$2], [16, "23:1-23:1", $s$2]]);

$M.moduleExports();