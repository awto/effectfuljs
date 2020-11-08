var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "2:9-2:10"],
  b: [2, "6:9-6:10"],
  c: [3, "12:9-12:10"],
  d: [4, "21:9-21:10"],
  e: [5, "30:9-30:10"],
  f: [6, "34:9-34:10"],
  g: [7, "38:9-38:10"],
  h: [8, "42:9-42:10"],
  i: [9, "47:9-47:10"],
  j: [10, "52:9-52:10"],
  a1: [11, "59:9-59:11"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $s$4 = [{}, $s$1, 1],
    $s$5 = [{}, $s$1, 1],
    $s$6 = [{}, $s$1, 1],
    $s$7 = [{}, $s$1, 1],
    $s$8 = [{}, $s$1, 1],
    $s$9 = [{}, $s$1, 1],
    $s$10 = [{}, $s$1, 1],
    $s$11 = [{}, $s$1, 1],
    $s$12 = [{
  a: [1, "59:12-59:13"],
  b: [2, "59:15-59:16"],
  c: [3, "59:18-59:19"],
  d: [4, "59:21-59:22"],
  e: [5, "60:6-60:7"],
  f: [6, "61:6-61:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 12, "1:0-84:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $l[5] = $m$5($);
      $l[6] = $m$6($);
      $l[7] = $m$7($);
      $l[8] = $m$8($);
      $l[9] = $m$9($);
      $l[10] = $m$10($);
      $l[11] = $m$11($);
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
}, null, null, 0, [[0, "2:0-5:1", $s$1], [16, "84:0-84:0", $s$1], [16, "84:0-84:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "2:0-5:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      if (true) {
        $.state = 2;
      } else {
        $.goto = 5;
        continue;
      }

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($x.call = eff)(1);
      $.state = 4;

    case 4:
      $.result = $p;
      $.goto = 8;
      continue;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.result = 3;
      $.goto = 8;
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "3:2-4:16", $s$2], [0, null, $s$2], [4, "3:12-3:26", $s$2], [2, "3:19-3:25", $s$2], [0, null, $s$2], [4, "4:7-4:16", $s$2], [0, "4:14-4:15", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 1, "6:0-11:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      if (true) {
        $.state = 2;
      } else {
        $.goto = 9;
        continue;
      }

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($x.call = eff)(1);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      ($x.call = eff)(3);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      ($x.call = eff)(4);
      $.state = 8;

    case 8:
      $.goto = 12;
      $brk();
      continue;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 4;
      $mcall("log", console, 3);
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "7:2-8:22", $s$3], [0, null, $s$3], [4, "7:12-7:19", $s$3], [2, "7:12-7:18", $s$3], [4, "9:2-9:9", $s$3], [2, "9:2-9:8", $s$3], [4, "10:2-10:9", $s$3], [2, "10:2-10:8", $s$3], [36, "11:1-11:1", $s$3], [4, "8:7-8:22", $s$3], [2, "8:7-8:21", $s$3], [16, "11:1-11:1", $s$3], [16, "11:1-11:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 1, "12:0-20:1", 0, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      if (true) {
        $.state = 2;
      } else {
        $.goto = 9;
        continue;
      }

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($x.call = eff)(1);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      ($x.call = eff)(3);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      ($x.call = eff)(4);
      $.state = 8;

    case 8:
      $.goto = 14;
      $brk();
      continue;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      $mcall("log", console, 3);
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.result = 3;
      $.goto = 14;
      continue;

    case 13:
      $.goto = 14;
      return $unhandled($.error);

    case 14:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "13:2-17:3", $s$4], [0, null, $s$4], [4, "13:12-13:19", $s$4], [2, "13:12-13:18", $s$4], [4, "18:2-18:9", $s$4], [2, "18:2-18:8", $s$4], [4, "19:2-19:9", $s$4], [2, "19:2-19:8", $s$4], [36, "20:1-20:1", $s$4], [4, "15:4-15:19", $s$4], [2, "15:4-15:18", $s$4], [4, "16:4-16:13", $s$4], [0, "16:11-16:12", $s$4], [16, "20:1-20:1", $s$4], [16, "20:1-20:1", $s$4]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 1, "21:0-29:1", 0, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($x.call = eff)("a");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      if (true) {
        $.state = 4;
      } else {
        $.goto = 11;
        continue;
      }

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      ($x.call = eff)(1);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      ($x.call = eff)(3);
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      ($x.call = eff)(4);
      $.state = 10;

    case 10:
      $.goto = 15;
      $brk();
      continue;

    case 11:
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      $mcall("log", console, 3);
      $.state = 13;

    case 13:
      $.goto = 6;
      $brk();
      continue;

    case 14:
      $.goto = 15;
      return $unhandled($.error);

    case 15:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "22:2-22:11", $s$5], [2, "22:2-22:10", $s$5], [4, "23:2-26:3", $s$5], [0, null, $s$5], [4, "23:12-23:19", $s$5], [2, "23:12-23:18", $s$5], [4, "27:2-27:9", $s$5], [2, "27:2-27:8", $s$5], [4, "28:2-28:9", $s$5], [2, "28:2-28:8", $s$5], [36, "29:1-29:1", $s$5], [4, "25:4-25:19", $s$5], [2, "25:4-25:18", $s$5], [36, "26:3-26:3", $s$5], [16, "29:1-29:1", $s$5], [16, "29:1-29:1", $s$5]]),
    $m$5 = $M.fun("m$5", "e", null, $m$0, [], 0, 1, "30:0-33:1", 0, function e($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff)("1");
      $.state = 2;

    case 2:
      if ($p) {
        $.state = 3;
      } else {
        $.goto = 4;
        continue;
      }

    case 3:
      $.goto = 8;
      $brk();
      continue;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      ($x.call = eff)("2");
      $.state = 6;

    case 6:
      $.goto = 8;
      $brk();
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "31:2-31:23", $s$6], [2, "31:6-31:14", $s$6], [0, null, $s$6], [4, "31:16-31:23", $s$6], [4, "32:2-32:11", $s$6], [2, "32:2-32:10", $s$6], [36, "33:1-33:1", $s$6], [16, "33:1-33:1", $s$6], [16, "33:1-33:1", $s$6]]),
    $m$6 = $M.fun("m$6", "f", null, $m$0, [], 0, 1, "34:0-37:1", 0, function f($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff)("1");
      $.state = 2;

    case 2:
      if ($p) {
        $.state = 3;
      } else {
        $.goto = 6;
        continue;
      }

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($x.call = eff)("i");
      $.state = 5;

    case 5:
      $.result = $p;
      $.goto = 10;
      continue;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      ($x.call = eff)("2");
      $.state = 8;

    case 8:
      $.goto = 10;
      $brk();
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "35:2-35:32", $s$7], [2, "35:6-35:14", $s$7], [0, null, $s$7], [4, "35:16-35:32", $s$7], [2, "35:23-35:31", $s$7], [0, null, $s$7], [4, "36:2-36:11", $s$7], [2, "36:2-36:10", $s$7], [36, "37:1-37:1", $s$7], [16, "37:1-37:1", $s$7], [16, "37:1-37:1", $s$7]]),
    $m$7 = $M.fun("m$7", "g", null, $m$0, [], 0, 1, "38:0-41:1", 0, function g($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff)("1");
      $.state = 2;

    case 2:
      if ($p) {
        $.state = 3;
      } else {
        $.goto = 4;
        continue;
      }

    case 3:
      $.goto = 8;
      $brk();
      continue;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("log", console, "2");
      $.state = 6;

    case 6:
      $.goto = 8;
      $brk();
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "39:2-39:23", $s$8], [2, "39:6-39:14", $s$8], [0, null, $s$8], [4, "39:16-39:23", $s$8], [4, "40:2-40:19", $s$8], [2, "40:2-40:18", $s$8], [36, "41:1-41:1", $s$8], [16, "41:1-41:1", $s$8], [16, "41:1-41:1", $s$8]]),
    $m$8 = $M.fun("m$8", "h", null, $m$0, [], 0, 1, "42:0-46:1", 0, function h($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff)("1");
      $.state = 2;

    case 2:
      if ($p) {
        $.state = 3;
      } else {
        $.goto = 4;
        continue;
      }

    case 3:
      $.goto = 10;
      $brk();
      continue;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("log", console, "2");
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      ($x.call = eff)("2");
      $.state = 8;

    case 8:
      $.goto = 10;
      $brk();
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "43:2-43:23", $s$9], [2, "43:6-43:14", $s$9], [0, null, $s$9], [4, "43:16-43:23", $s$9], [4, "44:2-44:19", $s$9], [2, "44:2-44:18", $s$9], [4, "45:2-45:11", $s$9], [2, "45:2-45:10", $s$9], [36, "46:1-46:1", $s$9], [16, "46:1-46:1", $s$9], [16, "46:1-46:1", $s$9]]),
    $m$9 = $M.fun("m$9", "i", null, $m$0, [], 0, 1, "47:0-51:1", 0, function i($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff)("1");
      $.state = 2;

    case 2:
      if ($p) {
        $.state = 3;
      } else {
        $.goto = 4;
        continue;
      }

    case 3:
      $.goto = 10;
      $brk();
      continue;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("log", console, "2");
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      ($x.call = eff)(2);
      $.state = 8;

    case 8:
      $.goto = 10;
      $brk();
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "48:2-48:23", $s$10], [2, "48:6-48:14", $s$10], [0, null, $s$10], [4, "48:16-48:23", $s$10], [4, "49:2-49:19", $s$10], [2, "49:2-49:18", $s$10], [4, "50:2-50:9", $s$10], [2, "50:2-50:8", $s$10], [36, "51:1-51:1", $s$10], [16, "51:1-51:1", $s$10], [16, "51:1-51:1", $s$10]]),
    $m$10 = $M.fun("m$10", "j", null, $m$0, [], 0, 1, "52:0-57:1", 0, function j($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff)("1");
      $.state = 2;

    case 2:
      if ($p) {
        $.state = 3;
      } else {
        $.goto = 4;
        continue;
      }

    case 3:
      $.goto = 12;
      $brk();
      continue;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("log", console, "2");
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      ($x.call = eff)(2);
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      $mcall("log", console, "3");
      $.state = 10;

    case 10:
      $.goto = 12;
      $brk();
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "53:2-53:23", $s$11], [2, "53:6-53:14", $s$11], [0, null, $s$11], [4, "53:16-53:23", $s$11], [4, "54:2-54:19", $s$11], [2, "54:2-54:18", $s$11], [4, "55:2-55:9", $s$11], [2, "55:2-55:8", $s$11], [4, "56:2-56:19", $s$11], [2, "56:2-56:18", $s$11], [36, "57:1-57:1", $s$11], [16, "57:1-57:1", $s$11], [16, "57:1-57:1", $s$11]]),
    $m$11 = $M.fun("m$11", "a1", null, $m$0, ["a", "b", "c", "d"], 1, 7, "59:0-83:1", 0, function a1($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $l[5] = void 0;
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $l[6] = void 0;
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      if (nb) {
        $.state = 4;
      } else {
        $.goto = 23;
        continue;
      }

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      switch ($l[1]) {
        case "compositionstart":
          $.state = 7;
          break;

        case "compositionend":
          $.goto = 17;
          continue;

        case "compositionupdate":
          $.goto = 19;
          continue;

        default:
          $.goto = 21;
          continue;
      }

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $l[5] = sb.compositionStart;
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      if (null === $l[6]) {
        $.state = 12;
      } else {
        $.goto = 14;
        continue;
      }

    case 12:
      $.result = $l[2];
      $.state = 13;

    case 13:
      $.goto = 35;
      continue;

    case 14:
      if (null === $l[2]) {
        $.state = 15;
      } else {
        $.goto = 16;
        continue;
      }

    case 15:
      $.result = $l[6];
      $.goto = 13;
      continue;

    case 16:
      $.result = [$l[6], $l[2]];
      $.goto = 13;
      continue;

    case 17:
      $.goto = 18;
      $brk();
      $.state = 18;

    case 18:
      $l[5] = sb.compositionEnd;
      $.goto = 9;
      $brk();
      continue;

    case 19:
      $.goto = 20;
      $brk();
      $.state = 20;

    case 20:
      $l[5] = sb.compositionUpdate;
      $.goto = 9;
      $brk();
      continue;

    case 21:
      $.goto = 22;
      $brk();
      $.state = 22;

    case 22:
      $l[5] = void 0;
      $.goto = 9;
      $brk();
      continue;

    case 23:
      $.goto = 24;
      $brk();
      $.state = 24;

    case 24:
      if (wb) {
        $.state = 25;
      } else {
        $.goto = 30;
        continue;
      }

    case 25:
      $.goto = 26;
      $p = ($x.call = ub)($l[1], $l[3]);
      $.state = 26;

    case 26:
      if ($p) {
        $.state = 27;
      } else {
        $.goto = 28;
        continue;
      }

    case 27:
      $l[5] = sb.compositionEnd;
      $.state = 28;

    case 28:
      $.state = 29;

    case 29:
      $.goto = 10;
      $brk();
      continue;

    case 30:
      $1 = "keydown" === $l[1];

      if ($1) {
        $.state = 31;
      } else {
        $.goto = 32;
        continue;
      }

    case 31:
      $1 = 229 === $l[3].keyCode;
      $.state = 32;

    case 32:
      if ($1) {
        $.state = 33;
      } else {
        $.goto = 29;
        continue;
      }

    case 33:
      $l[5] = sb.compositionStart;
      $.goto = 29;
      continue;

    case 34:
      $.goto = 35;
      return $unhandled($.error);

    case 35:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "60:2-60:17", $s$12], [4, "61:2-61:17", $s$12], [4, "62:2-81:3", $s$12], [0, null, $s$12], [4, "63:4-76:5", $s$12], [4, "64:6-74:7", $s$12], [0, null, $s$12], [4, "66:10-66:34", $s$12], [4, "67:10-67:18", $s$12], [0, null, $s$12], [4, "82:2-82:50", $s$12], [0, null, $s$12], [0, null, $s$12], [0, null, $s$12], [0, null, $s$12], [0, null, $s$12], [0, "82:43-82:49", $s$12], [4, "69:10-69:32", $s$12], [4, "70:10-70:18", $s$12], [4, "72:10-72:35", $s$12], [4, "73:10-73:18", $s$12], [4, "75:6-75:17", $s$12], [36, "76:5-76:5", $s$12], [4, "78:4-80:74", $s$12], [0, null, $s$12], [2, "79:8-79:16", $s$12], [0, null, $s$12], [0, "79:21-79:42", $s$12], [0, null, $s$12], [36, "81:3-81:3", $s$12], [0, "80:8-80:23", $s$12], [0, "80:27-80:44", $s$12], [0, null, $s$12], [0, "80:49-80:72", $s$12], [16, "83:1-83:1", $s$12], [16, "83:1-83:1", $s$12]]);

$M.moduleExports();