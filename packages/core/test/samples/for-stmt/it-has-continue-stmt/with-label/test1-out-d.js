var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  f1: [1, "1:9-1:11"],
  f2: [2, "14:9-14:11"],
  f3: [3, "26:9-26:11"],
  f4: [4, "40:9-40:11"],
  f5: [5, "51:9-51:11"]
}, null, 0],
    $s$2 = [{
  i: [1, "2:6-2:7"],
  j: [2, "2:9-2:10"],
  len: [3, "2:12-2:15"],
  ref: [4, "2:17-2:20"]
}, $s$1, 1],
    $s$3 = [{
  i: [1, "15:6-15:7"],
  j: [2, "15:9-15:10"],
  len: [3, "15:12-15:15"],
  ref: [4, "15:17-15:20"]
}, $s$1, 1],
    $s$4 = [{
  i: [1, "27:6-27:7"],
  j: [2, "27:9-27:10"],
  len: [3, "27:12-27:15"],
  ref: [4, "27:17-27:20"]
}, $s$1, 1],
    $s$5 = [{
  i: [1, "41:6-41:7"],
  j: [2, "41:9-41:10"],
  len: [3, "41:12-41:15"],
  ref: [4, "41:17-41:20"]
}, $s$1, 1],
    $s$6 = [{
  j: [1, "52:6-52:7"],
  len: [2, "52:9-52:12"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 6, "1:0-60:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $l[5] = $m$5($);
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
}, null, null, 0, [[0, "1:0-12:1", $s$1], [16, "60:0-60:0", $s$1], [16, "60:0-60:0", $s$1]]),
    $m$1 = $M.fun("m$1", "f1", null, $m$0, [], 0, 5, "1:0-12:1", 0, function f1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:21");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:2-3:18");
      $.state = 2;

    case 2:
      $l[4] = [1, 2, 3];
      $.goto = 3;
      $brk("4:2-11:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("4:7-11:3");
      $.state = 4;

    case 4:
      $l[1] = 0;
      $.state = 5;

    case 5:
      if ($l[1] < 3) {
        $.goto = 6;
        $brk("5:4-5:11");
        $.state = 6;
      } else {
        $.goto = 18;
        continue;
      }

    case 6:
      $.goto = 7;
      ($context.call = eff)($l[1]);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("6:4-10:5");
      $.state = 8;

    case 8:
      $l[2] = 0;
      $l[3] = $l[4].length;
      $.state = 9;

    case 9:
      if ($l[2] < $l[3]) {
        $.goto = 11;
        $brk("7:6-7:17");
        continue;
      } else {
        $.state = 10;
      }

    case 10:
      $l[1] = $l[1] + 1;
      $.goto = 5;
      continue;

    case 11:
      d = $l[4][$l[2]];
      $.goto = 12;
      $brk("8:6-8:27");
      $.state = 12;

    case 12:
      $.goto = 13;
      $p = ($context.call = eff)(d);
      $.state = 13;

    case 13:
      if ($p) {
        $.goto = 16;
        $brk("8:18-8:27");
        continue;
      } else {
        $.state = 14;
      }

    case 14:
      $.goto = 15;
      $brk("9:6-9:27");
      $.state = 15;

    case 15:
      if (t1) {
        $.goto = 10;
        $brk("9:14-9:27");
        continue;
      } else {
        $.state = 16;
      }

    case 16:
      $l[2] = $l[2] + 1;
      $.goto = 9;
      continue;

    case 17:
      $.goto = 18;
      return $unhandled($.error);

    case 18:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:21", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-11:3", $s$2], [4, "4:7-11:3", $s$2], [0, "4:12-4:17", $s$2], [4, "5:4-5:11", $s$2], [2, "5:4-5:10", $s$2], [4, "6:4-10:5", $s$2], [0, "6:9-6:14", $s$2], [4, "7:6-7:17", $s$2], [0, "4:26-4:29", $s$2], [4, "8:6-8:27", $s$2], [2, "8:10-8:16", $s$2], [4, "8:18-8:27", $s$2], [4, "9:6-9:27", $s$2], [4, "9:14-9:27", $s$2], [0, "6:43-6:46", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]),
    $m$2 = $M.fun("m$2", "f2", null, $m$0, [], 0, 5, "14:0-25:1", 0, function f2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("15:2-15:21");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("16:2-16:18");
      $.state = 2;

    case 2:
      $l[4] = [1, 2, 3];
      $.goto = 3;
      $brk("17:2-24:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("17:7-24:3");
      $.state = 4;

    case 4:
      $l[1] = 0;
      $.state = 5;

    case 5:
      if ($l[1] < 3) {
        $.goto = 6;
        $brk("18:4-18:11");
        $.state = 6;
      } else {
        $.goto = 19;
        continue;
      }

    case 6:
      $.goto = 7;
      ($context.call = eff)($l[1]);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("19:4-23:5");
      $.state = 8;

    case 8:
      $l[2] = 0;
      $l[3] = $l[4].length;
      $.state = 9;

    case 9:
      if ($l[2] < $l[3]) {
        $.goto = 11;
        $brk("20:6-20:17");
        continue;
      } else {
        $.state = 10;
      }

    case 10:
      $l[1] = $l[1] + 1;
      $.goto = 5;
      continue;

    case 11:
      d = $l[4][$l[2]];
      $.goto = 12;
      $brk("21:6-21:27");
      $.state = 12;

    case 12:
      $.goto = 13;
      $p = ($context.call = eff)(d);
      $.state = 13;

    case 13:
      if ($p) {
        $.goto = 17;
        $brk("21:18-21:27");
        continue;
      } else {
        $.state = 14;
      }

    case 14:
      $.goto = 15;
      $brk("22:6-22:31");
      $.state = 15;

    case 15:
      $.goto = 16;
      $p = ($context.call = eff)(2);
      $.state = 16;

    case 16:
      if ($p) {
        $.goto = 10;
        $brk("22:18-22:31");
        continue;
      } else {
        $.state = 17;
      }

    case 17:
      $l[2] = $l[2] + 1;
      $.goto = 9;
      continue;

    case 18:
      $.goto = 19;
      return $unhandled($.error);

    case 19:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "15:2-15:21", $s$3], [4, "16:2-16:18", $s$3], [4, "17:2-24:3", $s$3], [4, "17:7-24:3", $s$3], [0, "17:12-17:17", $s$3], [4, "18:4-18:11", $s$3], [2, "18:4-18:10", $s$3], [4, "19:4-23:5", $s$3], [0, "19:9-19:14", $s$3], [4, "20:6-20:17", $s$3], [0, "17:26-17:29", $s$3], [4, "21:6-21:27", $s$3], [2, "21:10-21:16", $s$3], [4, "21:18-21:27", $s$3], [4, "22:6-22:31", $s$3], [2, "22:10-22:16", $s$3], [4, "22:18-22:31", $s$3], [0, "19:43-19:46", $s$3], [16, "25:1-25:1", $s$3], [16, "25:1-25:1", $s$3]]),
    $m$3 = $M.fun("m$3", "f3", null, $m$0, [], 0, 5, "26:0-39:1", 0, function f3($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("27:2-27:21");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("28:2-28:18");
      $.state = 2;

    case 2:
      $l[4] = [1, 2, 3];
      $.goto = 3;
      $brk("29:2-37:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("29:7-37:3");
      $.state = 4;

    case 4:
      $l[1] = 0;
      $.state = 5;

    case 5:
      if ($l[1] < 3) {
        $.goto = 7;
        $brk("30:4-30:11");
        continue;
      } else {
        $.goto = 6;
        $brk("38:2-38:9");
        $.state = 6;
      }

    case 6:
      $.goto = 19;
      ($context.call = eff)($l[2]);
      continue;

    case 7:
      $.goto = 8;
      ($context.call = eff)($l[1]);
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk("31:4-36:5");
      $.state = 9;

    case 9:
      $l[2] = 0;
      $l[3] = $l[4].length;
      $.state = 10;

    case 10:
      if ($l[2] < $l[3]) {
        $.goto = 12;
        $brk("32:6-32:17");
        continue;
      } else {
        $.state = 11;
      }

    case 11:
      $l[1] = $l[1] + 1;
      $.goto = 5;
      continue;

    case 12:
      d = $l[4][$l[2]];
      $.goto = 13;
      $brk("33:6-33:13");
      $.state = 13;

    case 13:
      $.goto = 14;
      ($context.call = eff)(d);
      $.state = 14;

    case 14:
      $.goto = 15;
      $brk("34:6-34:10");
      $.state = 15;

    case 15:
      $l[2] = $l[2] + 1;
      $.goto = 16;
      $brk("35:6-35:27");
      $.state = 16;

    case 16:
      if (t2) {
        $.goto = 11;
        $brk("35:14-35:27");
        continue;
      } else {
        $.state = 17;
      }

    case 17:
      $l[2] = $l[2] + 1;
      $.goto = 10;
      continue;

    case 18:
      $.goto = 19;
      return $unhandled($.error);

    case 19:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "27:2-27:21", $s$4], [4, "28:2-28:18", $s$4], [4, "29:2-37:3", $s$4], [4, "29:7-37:3", $s$4], [0, "29:12-29:17", $s$4], [4, "30:4-30:11", $s$4], [2, "38:2-38:8", $s$4], [2, "30:4-30:10", $s$4], [4, "31:4-36:5", $s$4], [0, "31:9-31:14", $s$4], [4, "32:6-32:17", $s$4], [0, "29:26-29:29", $s$4], [4, "33:6-33:13", $s$4], [2, "33:6-33:12", $s$4], [4, "34:6-34:10", $s$4], [4, "35:6-35:27", $s$4], [4, "35:14-35:27", $s$4], [0, "31:43-31:46", $s$4], [16, "39:1-39:1", $s$4], [16, "39:1-39:1", $s$4]]),
    $m$4 = $M.fun("m$4", "f4", null, $m$0, [], 0, 5, "40:0-49:1", 0, function f4($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("41:2-41:21");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("42:2-42:18");
      $.state = 2;

    case 2:
      $l[4] = [1, 2, 3];
      $.goto = 3;
      $brk("43:2-48:3");
      $.state = 3;

    case 3:
      $l[2] = 0;
      $l[3] = $l[4].length;
      $.state = 4;

    case 4:
      if ($l[2] < $l[3]) {
        $.goto = 5;
        $brk("44:4-44:15");
        $.state = 5;
      } else {
        $.goto = 12;
        continue;
      }

    case 5:
      d = $l[4][$l[2]];
      $.goto = 6;
      $brk("45:4-45:11");
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff)(d);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("46:4-46:8");
      $.state = 8;

    case 8:
      $l[1] = $l[1] + 1;
      $.goto = 9;
      $brk("47:4-47:21");
      $.state = 9;

    case 9:
      if (t2) {
        $.goto = 10;
        $brk("47:12-47:21");
        $.state = 10;
      } else {
        $.state = 10;
      }

    case 10:
      $l[2] = $l[2] + 1;
      $.goto = 4;
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "41:2-41:21", $s$5], [4, "42:2-42:18", $s$5], [4, "43:2-48:3", $s$5], [0, "43:7-43:12", $s$5], [4, "44:4-44:15", $s$5], [4, "45:4-45:11", $s$5], [2, "45:4-45:10", $s$5], [4, "46:4-46:8", $s$5], [4, "47:4-47:21", $s$5], [4, "47:12-47:21", $s$5], [0, "43:41-43:44", $s$5], [16, "49:1-49:1", $s$5], [16, "49:1-49:1", $s$5]]),
    $m$5 = $M.fun("m$5", "f5", null, $m$0, [], 0, 3, "51:0-59:1", 0, function f5($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("52:2-52:13");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("53:2-57:3");
      $.state = 2;

    case 2:
      $l[1] = 0;
      $.state = 3;

    case 3:
      if (true) {
        $.goto = 6;
        $brk("54:4-54:11");
        continue;
      } else {
        $.state = 4;
      }

    case 4:
      $.goto = 5;
      $brk("58:2-58:9");
      $.state = 5;

    case 5:
      $.goto = 12;
      ($context.call = eff)($l[1]);
      continue;

    case 6:
      $.goto = 7;
      ($context.call = eff)($l[1]);
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("55:4-55:8");
      $.state = 8;

    case 8:
      $l[1] = $l[1] + 1;
      $.goto = 9;
      $brk("56:4-56:18");
      $.state = 9;

    case 9:
      if (t2) {
        $.goto = 4;
        $brk("56:12-56:18");
        continue;
      } else {
        $.state = 10;
      }

    case 10:
      $l[1] = $l[1] - 1;
      $.goto = 3;
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "52:2-52:13", $s$6], [4, "53:2-57:3", $s$6], [0, "53:7-53:12", $s$6], [4, "54:4-54:11", $s$6], [4, "58:2-58:9", $s$6], [2, "58:2-58:8", $s$6], [2, "54:4-54:10", $s$6], [4, "55:4-55:8", $s$6], [4, "56:4-56:18", $s$6], [4, "56:12-56:18", $s$6], [0, "53:20-53:23", $s$6], [16, "59:1-59:1", $s$6], [16, "59:1-59:1", $s$6]]);

$M.moduleExports();