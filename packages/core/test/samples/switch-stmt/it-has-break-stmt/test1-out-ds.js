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
  a: [1, "1:9-1:10"],
  a_1: [2, "11:9-11:12"],
  c: [3, "25:9-25:10"],
  d: [4, "44:9-44:10"]
}, null, 0],
    $s$2 = [{
  z: [1, "1:11-1:12"]
}, $s$1, 1],
    $s$3 = [{
  z: [1, "11:13-11:14"]
}, $s$1, 1],
    $s$4 = [{
  z: [1, "25:11-25:12"]
}, $s$1, 1],
    $s$5 = [{
  z: [1, "44:11-44:12"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 5, "1:0-67:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a*/
      $m$1($));
      $lset($l, 2,
      /*a_1*/
      $m$2($));
      $lset($l, 3,
      /*c*/
      $m$3($));
      $lset($l, 4,
      /*d*/
      $m$4($));
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
}, null, null, 0, [[0, "1:0-10:1", $s$1], [16, "67:0-67:0", $s$1], [16, "67:0-67:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, ["z"], 0, 2, "1:0-10:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-8:3");
      $.state = 1;

    case 1:
      switch ($l[1]) {
        case 1:
          $.goto = 6;
          $brk("4:6-4:13");
          continue;

        default:
          $.state = 2;
          break;
      }

    case 2:
      $.goto = 3;
      $brk("7:6-7:13");
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = eff)(2);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("9:2-9:9");
      $.state = 5;

    case 5:
      $.goto = 9;
      ($context.call = eff)(3);
      continue;

    case 6:
      $.goto = 7;
      ($context.call = eff)(1);
      $.state = 7;

    case 7:
      $.goto = 4;
      $brk("5:6-5:12");
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-8:3", $s$2], [4, "4:6-4:13", $s$2], [4, "7:6-7:13", $s$2], [2, "7:6-7:12", $s$2], [4, "9:2-9:9", $s$2], [2, "9:2-9:8", $s$2], [2, "4:6-4:12", $s$2], [4, "5:6-5:12", $s$2], [16, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2]]),
    $m$2 = $M.fun("m$2", "a_1", null, $m$0, ["z"], 0, 2, "11:0-23:1", 0, function a_1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("12:2-21:3");
      $.state = 1;

    case 1:
      switch ($l[1]) {
        case 1:
          $.goto = 9;
          $brk("14:6-14:13");
          continue;

        case 2:
          $.state = 2;
          break;

        default:
          $.goto = 7;
          continue;
      }

    case 2:
      $.goto = 3;
      $brk("17:6-17:23");
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("log", console, "1");
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("18:6-18:12");
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("22:2-22:9");
      $.state = 6;

    case 6:
      $.goto = 12;
      ($context.call = eff)(3);
      continue;

    case 7:
      $.goto = 8;
      $brk("20:6-20:23");
      $.state = 8;

    case 8:
      $.goto = 5;
      $mcall("log", console, "2");
      continue;

    case 9:
      $.goto = 10;
      ($context.call = eff)(1);
      $.state = 10;

    case 10:
      $.goto = 5;
      $brk("15:6-15:12");
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "12:2-21:3", $s$3], [4, "14:6-14:13", $s$3], [4, "17:6-17:23", $s$3], [2, "17:6-17:22", $s$3], [4, "18:6-18:12", $s$3], [4, "22:2-22:9", $s$3], [2, "22:2-22:8", $s$3], [4, "20:6-20:23", $s$3], [2, "20:6-20:22", $s$3], [2, "14:6-14:12", $s$3], [4, "15:6-15:12", $s$3], [16, "23:1-23:1", $s$3], [16, "23:1-23:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, ["z"], 0, 2, "25:0-42:1", 0, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("26:2-40:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("27:4-38:5");
      $.state = 2;

    case 2:
      switch ($l[1]) {
        case 1:
          $.goto = 14;
          $brk("29:8-29:15");
          continue;

        case 2:
          $.state = 3;
          break;

        case 3:
          $.goto = 8;
          continue;

        default:
          $.goto = 10;
          continue;
      }

    case 3:
      $.goto = 4;
      $brk("32:8-32:15");
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = eff)(2);
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk("33:8-33:18");
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk("41:2-41:9");
      $.state = 7;

    case 7:
      $.goto = 17;
      ($context.call = eff)(5);
      continue;

    case 8:
      $.goto = 9;
      $brk("35:8-35:25");
      $.state = 9;

    case 9:
      $.goto = 10;
      $mcall("log", console, "z");
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk("37:8-37:15");
      $.state = 11;

    case 11:
      $.goto = 12;
      ($context.call = eff)(3);
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk("39:4-39:11");
      $.state = 13;

    case 13:
      $.goto = 6;
      ($context.call = eff)(4);
      continue;

    case 14:
      $.goto = 15;
      ($context.call = eff)(1);
      $.state = 15;

    case 15:
      $.goto = 12;
      $brk("30:8-30:14");
      continue;

    case 16:
      $.goto = 17;
      return $unhandled($.error);

    case 17:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "26:2-40:3", $s$4], [4, "27:4-38:5", $s$4], [4, "29:8-29:15", $s$4], [4, "32:8-32:15", $s$4], [2, "32:8-32:14", $s$4], [4, "33:8-33:18", $s$4], [4, "41:2-41:9", $s$4], [2, "41:2-41:8", $s$4], [4, "35:8-35:25", $s$4], [2, "35:8-35:24", $s$4], [4, "37:8-37:15", $s$4], [2, "37:8-37:14", $s$4], [4, "39:4-39:11", $s$4], [2, "39:4-39:10", $s$4], [2, "29:8-29:14", $s$4], [4, "30:8-30:14", $s$4], [16, "42:1-42:1", $s$4], [16, "42:1-42:1", $s$4]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, ["z"], 0, 2, "44:0-66:1", 0, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("45:2-64:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("46:4-62:5");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("47:6-59:7");
      $.state = 3;

    case 3:
      switch ($l[1]) {
        case 1:
          $.goto = 19;
          $brk("49:10-49:17");
          continue;

        case 2:
          $.state = 4;
          break;

        case 3:
          $.goto = 9;
          continue;

        default:
          $.goto = 14;
          continue;
      }

    case 4:
      $.goto = 5;
      $brk("52:10-52:17");
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = eff)(2);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk("53:10-53:21");
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("65:2-65:9");
      $.state = 8;

    case 8:
      $.goto = 22;
      ($context.call = eff)(6);
      continue;

    case 9:
      $.goto = 10;
      $brk("55:10-55:27");
      $.state = 10;

    case 10:
      $.goto = 11;
      $mcall("log", console, "z");
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk("56:10-56:21");
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk("63:4-63:11");
      $.state = 13;

    case 13:
      $.goto = 7;
      ($context.call = eff)(5);
      continue;

    case 14:
      $.goto = 15;
      $brk("58:10-58:17");
      $.state = 15;

    case 15:
      $.goto = 16;
      ($context.call = eff)(3);
      $.state = 16;

    case 16:
      $.goto = 17;
      $brk("60:6-60:13");
      $.state = 17;

    case 17:
      $.goto = 18;
      ($context.call = eff)(4);
      $.state = 18;

    case 18:
      $.goto = 7;
      $brk("61:6-61:17");
      continue;

    case 19:
      $.goto = 20;
      ($context.call = eff)(1);
      $.state = 20;

    case 20:
      $.goto = 16;
      $brk("50:10-50:16");
      continue;

    case 21:
      $.goto = 22;
      return $unhandled($.error);

    case 22:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "45:2-64:3", $s$5], [4, "46:4-62:5", $s$5], [4, "47:6-59:7", $s$5], [4, "49:10-49:17", $s$5], [4, "52:10-52:17", $s$5], [2, "52:10-52:16", $s$5], [4, "53:10-53:21", $s$5], [4, "65:2-65:9", $s$5], [2, "65:2-65:8", $s$5], [4, "55:10-55:27", $s$5], [2, "55:10-55:26", $s$5], [4, "56:10-56:21", $s$5], [4, "63:4-63:11", $s$5], [2, "63:4-63:10", $s$5], [4, "58:10-58:17", $s$5], [2, "58:10-58:16", $s$5], [4, "60:6-60:13", $s$5], [2, "60:6-60:12", $s$5], [4, "61:6-61:17", $s$5], [2, "49:10-49:16", $s$5], [4, "50:10-50:16", $s$5], [16, "66:1-66:1", $s$5], [16, "66:1-66:1", $s$5]]);

$M.moduleExports();