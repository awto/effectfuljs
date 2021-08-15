var $M = require("@effectful/debugger"),
    $forInIterator = $M.forInIterator,
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"],
  b: [2, "7:9-7:10"],
  c: [3, "14:9-14:10"],
  d: [4, "21:9-21:10"],
  e: [5, "27:9-27:10"],
  f: [6, "33:9-33:10"],
  g: [7, "39:9-39:10"],
  h: [8, "49:9-49:10"]
}, null, 0],
    $s$2 = [{
  i: [1, "2:11-2:12"]
}, $s$1, 1],
    $s$3 = [{
  i: [1, "8:6-8:7"]
}, $s$1, 1],
    $s$4 = [{
  i: [1, "16:11-16:12"]
}, $s$1, 1],
    $s$5 = [{
  i: [1, "22:11-22:12"]
}, $s$1, 1],
    $s$6 = [{
  i: [1, "28:11-28:12"]
}, $s$1, 1],
    $s$7 = [{
  i: [1, "34:11-34:12"]
}, $s$1, 1],
    $s$8 = [{
  i: [1, "41:11-41:12"]
}, $s$1, 1],
    $s$9 = [{
  j: [1, "51:6-51:7"],
  i: [2, "55:13-55:14"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 9, "1:0-68:0", 32, function ($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-5:1", $s$1], [16, "68:0-68:0", $s$1], [16, "68:0-68:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-5:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($x.call = eff)(2);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $forInIterator($p);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $x.call = $l[2].next;
      $.goto = 4;
      $p = $l[2].next();
      $.state = 4;

    case 4:
      if ($p.done) {
        $.state = 5;
      } else {
        $.goto = 6;
        continue;
      }

    case 5:
      $.goto = 10;
      $brk();
      continue;

    case 6:
      $l[1] = $p.value;
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      ($x.call = eff)($l[1]);
      $.state = 8;

    case 8:
      $.goto = 3;
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
}, null, null, 1, [[2, "2:16-2:22", $s$2], [2, "2:16-2:22", $s$2], [0, null, $s$2], [2, "2:16-2:22", $s$2], [0, null, $s$2], [36, "5:1-5:1", $s$2], [4, "3:4-3:11", $s$2], [2, "3:4-3:10", $s$2], [36, "4:3-4:3", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 3, "7:0-12:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff)(2);
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = $forInIterator($p);
      $.state = 3;

    case 3:
      $l[2] = $p;
      $.state = 4;

    case 4:
      $x.call = $l[2].next;
      $.goto = 5;
      $p = $l[2].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.state = 6;
      } else {
        $.goto = 7;
        continue;
      }

    case 6:
      $.goto = 11;
      $brk();
      continue;

    case 7:
      $l[1] = $p.value;
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      ($x.call = eff)($l[1]);
      $.state = 9;

    case 9:
      $.goto = 4;
      $brk();
      continue;

    case 10:
      $.goto = 11;
      return $unhandled($.error);

    case 11:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "8:2-8:8", $s$3], [2, "9:12-9:18", $s$3], [2, "9:12-9:18", $s$3], [0, null, $s$3], [2, "9:12-9:18", $s$3], [0, null, $s$3], [36, "12:1-12:1", $s$3], [4, "10:4-10:11", $s$3], [2, "10:4-10:10", $s$3], [36, "11:3-11:3", $s$3], [16, "12:1-12:1", $s$3], [16, "12:1-12:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 3, "14:0-19:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($x.call = eff)(2);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $forInIterator($p);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $x.call = $l[2].next;
      $.goto = 4;
      $p = $l[2].next();
      $.state = 4;

    case 4:
      if ($p.done) {
        $.state = 5;
      } else {
        $.goto = 6;
        continue;
      }

    case 5:
      $.goto = 10;
      $brk();
      continue;

    case 6:
      $l[1] = $p.value;
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      ($x.call = eff)($l[1]);
      $.state = 8;

    case 8:
      $.goto = 3;
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
}, null, null, 1, [[2, "16:16-16:22", $s$4], [2, "16:16-16:22", $s$4], [0, null, $s$4], [2, "16:16-16:22", $s$4], [0, null, $s$4], [36, "19:1-19:1", $s$4], [4, "17:4-17:11", $s$4], [2, "17:4-17:10", $s$4], [36, "18:3-18:3", $s$4], [16, "19:1-19:1", $s$4], [16, "19:1-19:1", $s$4]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 3, "21:0-25:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($x.call = eff)(2);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $forInIterator($p);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $x.call = $l[2].next;
      $.goto = 4;
      $p = $l[2].next();
      $.state = 4;

    case 4:
      if ($p.done) {
        $.state = 5;
      } else {
        $.goto = 6;
        continue;
      }

    case 5:
      $.goto = 10;
      $brk();
      continue;

    case 6:
      $l[1] = $p.value;
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      $mcall("log", console, $l[1]);
      $.state = 8;

    case 8:
      $.goto = 3;
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
}, null, null, 1, [[2, "22:16-22:22", $s$5], [2, "22:16-22:22", $s$5], [0, null, $s$5], [2, "22:16-22:22", $s$5], [0, null, $s$5], [36, "25:1-25:1", $s$5], [4, "23:4-23:19", $s$5], [2, "23:4-23:18", $s$5], [36, "24:3-24:3", $s$5], [16, "25:1-25:1", $s$5], [16, "25:1-25:1", $s$5]]),
    $m$5 = $M.fun("m$5", "e", null, $m$0, [], 0, 3, "27:0-31:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $forInIterator(obj);
      $.state = 1;

    case 1:
      $l[2] = $p;
      $.state = 2;

    case 2:
      $x.call = $l[2].next;
      $.goto = 3;
      $p = $l[2].next();
      $.state = 3;

    case 3:
      if ($p.done) {
        $.state = 4;
      } else {
        $.goto = 5;
        continue;
      }

    case 4:
      $.goto = 9;
      $brk();
      continue;

    case 5:
      $l[1] = $p.value;
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      ($x.call = eff)($l[1]);
      $.state = 7;

    case 7:
      $.goto = 2;
      $brk();
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "28:16-28:19", $s$6], [0, null, $s$6], [2, "28:16-28:19", $s$6], [0, null, $s$6], [36, "31:1-31:1", $s$6], [4, "29:4-29:11", $s$6], [2, "29:4-29:10", $s$6], [36, "30:3-30:3", $s$6], [16, "31:1-31:1", $s$6], [16, "31:1-31:1", $s$6]]),
    $m$6 = $M.fun("m$6", "f", null, $m$0, [], 0, 3, "33:0-37:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $forInIterator(obj);
      $.state = 1;

    case 1:
      $l[2] = $p;
      $.state = 2;

    case 2:
      $x.call = $l[2].next;
      $.goto = 3;
      $p = $l[2].next();
      $.state = 3;

    case 3:
      if ($p.done) {
        $.state = 4;
      } else {
        $.goto = 5;
        continue;
      }

    case 4:
      $.goto = 9;
      $brk();
      continue;

    case 5:
      $l[1] = $p.value;
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      $mcall("log", console, $l[1]);
      $.state = 7;

    case 7:
      $.goto = 2;
      $brk();
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "34:16-34:19", $s$7], [0, null, $s$7], [2, "34:16-34:19", $s$7], [0, null, $s$7], [36, "37:1-37:1", $s$7], [4, "35:4-35:19", $s$7], [2, "35:4-35:18", $s$7], [36, "36:3-36:3", $s$7], [16, "37:1-37:1", $s$7], [16, "37:1-37:1", $s$7]]),
    $m$7 = $M.fun("m$7", "g", null, $m$0, [], 0, 3, "39:0-47:1", 0, function ($, $l, $p) {
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
      $p = ($x.call = eff)(2);
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = $forInIterator($p);
      $.state = 4;

    case 4:
      $l[2] = $p;
      $.state = 5;

    case 5:
      $x.call = $l[2].next;
      $.goto = 6;
      $p = $l[2].next();
      $.state = 6;

    case 6:
      if ($p.done) {
        $.state = 7;
      } else {
        $.goto = 11;
        continue;
      }

    case 7:
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      ($x.call = eff)("z");
      $.state = 10;

    case 10:
      $.goto = 23;
      $brk();
      continue;

    case 11:
      $l[1] = $p.value;
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      $p = ($x.call = eff)($l[1]);
      $.state = 13;

    case 13:
      if ($p) {
        $.state = 14;
      } else {
        $.goto = 15;
        continue;
      }

    case 14:
      $.goto = 5;
      $brk();
      continue;

    case 15:
      $.goto = 16;
      $brk();
      $.state = 16;

    case 16:
      $.goto = 17;
      $p = ($x.call = effB)($l[1]);
      $.state = 17;

    case 17:
      if ($p) {
        $.state = 18;
      } else {
        $.goto = 19;
        continue;
      }

    case 18:
      $.goto = 8;
      $brk();
      continue;

    case 19:
      $.goto = 20;
      $brk();
      $.state = 20;

    case 20:
      $.goto = 21;
      ($x.call = eff)("c");
      $.state = 21;

    case 21:
      $.goto = 5;
      $brk();
      continue;

    case 22:
      $.goto = 23;
      return $unhandled($.error);

    case 23:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "40:2-40:11", $s$8], [2, "40:2-40:10", $s$8], [2, "41:16-41:22", $s$8], [2, "41:16-41:22", $s$8], [0, null, $s$8], [2, "41:16-41:22", $s$8], [0, null, $s$8], [0, null, $s$8], [4, "46:2-46:11", $s$8], [2, "46:2-46:10", $s$8], [36, "47:1-47:1", $s$8], [4, "42:4-42:25", $s$8], [2, "42:8-42:14", $s$8], [0, null, $s$8], [4, "42:16-42:25", $s$8], [4, "43:4-43:23", $s$8], [2, "43:8-43:15", $s$8], [0, null, $s$8], [4, "43:17-43:23", $s$8], [4, "44:4-44:13", $s$8], [2, "44:4-44:12", $s$8], [36, "45:3-45:3", $s$8], [16, "47:1-47:1", $s$8], [16, "47:1-47:1", $s$8]]),
    $m$8 = $M.fun("m$8", "h", null, $m$0, [], 0, 5, "49:0-67:1", 0, function ($, $l, $p) {
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
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = $forInIterator(obj);
      $.state = 5;

    case 5:
      $l[3] = $p;
      $.state = 6;

    case 6:
      $x.call = $l[3].next;
      $.goto = 7;
      $p = $l[3].next();
      $.state = 7;

    case 7:
      if ($p.done) {
        $.state = 8;
      } else {
        $.goto = 12;
        continue;
      }

    case 8:
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      ($x.call = eff)("z");
      $.state = 11;

    case 11:
      $.goto = 49;
      $brk();
      continue;

    case 12:
      $l[1] = $p.value;
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $.goto = 14;
      $mcall("log", console, "j");
      $.state = 14;

    case 14:
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $.goto = 16;
      ($x.call = effA)($l[1]);
      $.state = 16;

    case 16:
      $.goto = 17;
      $p = ($x.call = eff)($l[1]);
      $.state = 17;

    case 17:
      $.goto = 18;
      $p = $forInIterator($p);
      $.state = 18;

    case 18:
      $l[4] = $p;
      $.state = 19;

    case 19:
      $x.call = $l[4].next;
      $.goto = 20;
      $p = $l[4].next();
      $.state = 20;

    case 20:
      if ($p.done) {
        $.state = 21;
      } else {
        $.goto = 25;
        continue;
      }

    case 21:
      $.state = 22;

    case 22:
      $.goto = 23;
      $brk();
      $.state = 23;

    case 23:
      $.goto = 24;
      ($x.call = effB)($l[1]);
      $.state = 24;

    case 24:
      $.goto = 6;
      $brk();
      continue;

    case 25:
      $l[2] = $p.value;
      $.goto = 26;
      $brk();
      $.state = 26;

    case 26:
      $.goto = 27;
      $mcall("log", console, "b");
      $.state = 27;

    case 27:
      $.goto = 28;
      $brk();
      $.state = 28;

    case 28:
      $.goto = 29;
      ($x.call = eff)("b");
      $.state = 29;

    case 29:
      $.goto = 30;
      $brk();
      $.state = 30;

    case 30:
      $.goto = 31;
      $p = ($x.call = eff)($l[2] + $l[1]);
      $.state = 31;

    case 31:
      if ($p) {
        $.state = 32;
      } else {
        $.goto = 33;
        continue;
      }

    case 32:
      $.goto = 6;
      $brk();
      continue;

    case 33:
      $.goto = 34;
      $brk();
      $.state = 34;

    case 34:
      $.goto = 35;
      $p = ($x.call = effB)($l[2] + $l[1]);
      $.state = 35;

    case 35:
      if ($p) {
        $.state = 36;
      } else {
        $.goto = 37;
        continue;
      }

    case 36:
      $.goto = 9;
      $brk();
      continue;

    case 37:
      $.goto = 38;
      $brk();
      $.state = 38;

    case 38:
      $.goto = 39;
      $p = ($x.call = eff)($l[2]);
      $.state = 39;

    case 39:
      if ($p) {
        $.state = 40;
      } else {
        $.goto = 41;
        continue;
      }

    case 40:
      $.goto = 19;
      $brk();
      continue;

    case 41:
      $.goto = 42;
      $brk();
      $.state = 42;

    case 42:
      $.goto = 43;
      $p = ($x.call = effB)($l[2]);
      $.state = 43;

    case 43:
      if ($p) {
        $.state = 44;
      } else {
        $.goto = 45;
        continue;
      }

    case 44:
      $.goto = 22;
      $brk();
      continue;

    case 45:
      $.goto = 46;
      $brk();
      $.state = 46;

    case 46:
      $.goto = 47;
      ($x.call = eff)("c");
      $.state = 47;

    case 47:
      $.goto = 19;
      $brk();
      continue;

    case 48:
      $.goto = 49;
      return $unhandled($.error);

    case 49:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "50:2-50:11", $s$9], [2, "50:2-50:10", $s$9], [4, "51:2-51:8", $s$9], [4, "52:2-65:3", $s$9], [2, "52:17-52:20", $s$9], [0, null, $s$9], [2, "52:17-52:20", $s$9], [0, null, $s$9], [0, null, $s$9], [4, "66:2-66:11", $s$9], [2, "66:2-66:10", $s$9], [36, "67:1-67:1", $s$9], [4, "53:4-53:21", $s$9], [2, "53:4-53:20", $s$9], [4, "54:4-54:12", $s$9], [2, "54:4-54:11", $s$9], [2, "55:18-55:24", $s$9], [2, "55:18-55:24", $s$9], [0, null, $s$9], [2, "55:18-55:24", $s$9], [0, null, $s$9], [0, null, $s$9], [4, "64:4-64:12", $s$9], [2, "64:4-64:11", $s$9], [36, "65:3-65:3", $s$9], [4, "56:6-56:23", $s$9], [2, "56:6-56:22", $s$9], [4, "57:6-57:15", $s$9], [2, "57:6-57:14", $s$9], [4, "58:6-58:35", $s$9], [2, "58:10-58:20", $s$9], [0, null, $s$9], [4, "58:22-58:35", $s$9], [4, "59:6-59:33", $s$9], [2, "59:10-59:21", $s$9], [0, null, $s$9], [4, "59:23-59:33", $s$9], [4, "60:6-60:27", $s$9], [2, "60:10-60:16", $s$9], [0, null, $s$9], [4, "60:18-60:27", $s$9], [4, "61:6-61:25", $s$9], [2, "61:10-61:17", $s$9], [0, null, $s$9], [4, "61:19-61:25", $s$9], [4, "62:6-62:15", $s$9], [2, "62:6-62:14", $s$9], [36, "63:5-63:5", $s$9], [16, "67:1-67:1", $s$9], [16, "67:1-67:1", $s$9]]);

$M.moduleExports();