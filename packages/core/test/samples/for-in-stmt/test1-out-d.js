var $M = require("@effectful/debugger/api"),
    $forInIterator = $M.forInIterator,
    $context = $M.context,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 9, "1:0-68:0", 32, function file_js($, $l, $p) {
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-5:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = eff)(2);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $forInIterator($p);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $context.call = $l[2].next;
      $.goto = 4;
      $p = $l[2].next();
      $.state = 4;

    case 4:
      if ($p.done) {
        $.goto = 7;
        continue;
      } else {
        $l[1] = $p.value;
        $.goto = 5;
        $brk("3:4-3:11");
        $.state = 5;
      }

    case 5:
      $.goto = 3;
      ($context.call = eff)($l[1]);
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "2:16-2:22", $s$2], [0, null, $s$2], [0, null, $s$2], [0, "2:11-2:12", $s$2], [4, "3:4-3:11", $s$2], [2, "3:4-3:10", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 3, "7:0-12:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("8:2-8:8");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)(2);
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = $forInIterator($p);
      $.state = 3;

    case 3:
      $l[2] = $p;
      $.state = 4;

    case 4:
      $context.call = $l[2].next;
      $.goto = 5;
      $p = $l[2].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.goto = 8;
        continue;
      } else {
        $l[1] = $p.value;
        $.goto = 6;
        $brk("10:4-10:11");
        $.state = 6;
      }

    case 6:
      $.goto = 4;
      ($context.call = eff)($l[1]);
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "8:2-8:8", $s$3], [2, "9:12-9:18", $s$3], [0, null, $s$3], [0, null, $s$3], [0, "9:7-9:8", $s$3], [4, "10:4-10:11", $s$3], [2, "10:4-10:10", $s$3], [16, "12:1-12:1", $s$3], [16, "12:1-12:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 3, "14:0-19:1", 0, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = eff)(2);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $forInIterator($p);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $context.call = $l[2].next;
      $.goto = 4;
      $p = $l[2].next();
      $.state = 4;

    case 4:
      if ($p.done) {
        $.goto = 7;
        continue;
      } else {
        $l[1] = $p.value;
        $.goto = 5;
        $brk("17:4-17:11");
        $.state = 5;
      }

    case 5:
      $.goto = 3;
      ($context.call = eff)($l[1]);
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "16:16-16:22", $s$4], [0, null, $s$4], [0, null, $s$4], [0, "16:11-16:12", $s$4], [4, "17:4-17:11", $s$4], [2, "17:4-17:10", $s$4], [16, "19:1-19:1", $s$4], [16, "19:1-19:1", $s$4]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 3, "21:0-25:1", 0, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = eff)(2);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $forInIterator($p);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $context.call = $l[2].next;
      $.goto = 4;
      $p = $l[2].next();
      $.state = 4;

    case 4:
      if ($p.done) {
        $.goto = 7;
        continue;
      } else {
        $l[1] = $p.value;
        $.goto = 5;
        $brk("23:4-23:19");
        $.state = 5;
      }

    case 5:
      $.goto = 3;
      $mcall("log", console, $l[1]);
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "22:16-22:22", $s$5], [0, null, $s$5], [0, null, $s$5], [0, "22:11-22:12", $s$5], [4, "23:4-23:19", $s$5], [2, "23:4-23:18", $s$5], [16, "25:1-25:1", $s$5], [16, "25:1-25:1", $s$5]]),
    $m$5 = $M.fun("m$5", "e", null, $m$0, [], 0, 3, "27:0-31:1", 0, function e($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $forInIterator(obj);
      $.state = 1;

    case 1:
      $l[2] = $p;
      $.state = 2;

    case 2:
      $context.call = $l[2].next;
      $.goto = 3;
      $p = $l[2].next();
      $.state = 3;

    case 3:
      if ($p.done) {
        $.goto = 6;
        continue;
      } else {
        $l[1] = $p.value;
        $.goto = 4;
        $brk("29:4-29:11");
        $.state = 4;
      }

    case 4:
      $.goto = 2;
      ($context.call = eff)($l[1]);
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, null, $s$6], [0, null, $s$6], [0, "28:11-28:12", $s$6], [4, "29:4-29:11", $s$6], [2, "29:4-29:10", $s$6], [16, "31:1-31:1", $s$6], [16, "31:1-31:1", $s$6]]),
    $m$6 = $M.fun("m$6", "f", null, $m$0, [], 0, 3, "33:0-37:1", 0, function f($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $forInIterator(obj);
      $.state = 1;

    case 1:
      $l[2] = $p;
      $.state = 2;

    case 2:
      $context.call = $l[2].next;
      $.goto = 3;
      $p = $l[2].next();
      $.state = 3;

    case 3:
      if ($p.done) {
        $.goto = 6;
        continue;
      } else {
        $l[1] = $p.value;
        $.goto = 4;
        $brk("35:4-35:19");
        $.state = 4;
      }

    case 4:
      $.goto = 2;
      $mcall("log", console, $l[1]);
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, null, $s$7], [0, null, $s$7], [0, "34:11-34:12", $s$7], [4, "35:4-35:19", $s$7], [2, "35:4-35:18", $s$7], [16, "37:1-37:1", $s$7], [16, "37:1-37:1", $s$7]]),
    $m$7 = $M.fun("m$7", "g", null, $m$0, [], 0, 3, "39:0-47:1", 0, function g($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("40:2-40:11");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)("a");
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = eff)(2);
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = $forInIterator($p);
      $.state = 4;

    case 4:
      $l[2] = $p;
      $.state = 5;

    case 5:
      $context.call = $l[2].next;
      $.goto = 6;
      $p = $l[2].next();
      $.state = 6;

    case 6:
      if ($p.done) {
        $.state = 7;
      } else {
        $l[1] = $p.value;
        $.goto = 9;
        $brk("42:4-42:25");
        continue;
      }

    case 7:
      $.goto = 8;
      $brk("46:2-46:11");
      $.state = 8;

    case 8:
      $.goto = 17;
      ($context.call = eff)("z");
      continue;

    case 9:
      $.goto = 10;
      $p = ($context.call = eff)($l[1]);
      $.state = 10;

    case 10:
      if ($p) {
        $.goto = 5;
        $brk("42:16-42:25");
        continue;
      } else {
        $.state = 11;
      }

    case 11:
      $.goto = 12;
      $brk("43:4-43:23");
      $.state = 12;

    case 12:
      $.goto = 13;
      $p = ($context.call = effB)($l[1]);
      $.state = 13;

    case 13:
      if ($p) {
        $.goto = 7;
        $brk("43:17-43:23");
        continue;
      } else {
        $.state = 14;
      }

    case 14:
      $.goto = 15;
      $brk("44:4-44:13");
      $.state = 15;

    case 15:
      $.goto = 5;
      ($context.call = eff)("c");
      continue;

    case 16:
      $.goto = 17;
      return $unhandled($.error);

    case 17:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "40:2-40:11", $s$8], [2, "40:2-40:10", $s$8], [2, "41:16-41:22", $s$8], [0, null, $s$8], [0, null, $s$8], [0, "41:11-41:12", $s$8], [4, "42:4-42:25", $s$8], [4, "46:2-46:11", $s$8], [2, "46:2-46:10", $s$8], [2, "42:8-42:14", $s$8], [4, "42:16-42:25", $s$8], [4, "43:4-43:23", $s$8], [2, "43:8-43:15", $s$8], [4, "43:17-43:23", $s$8], [4, "44:4-44:13", $s$8], [2, "44:4-44:12", $s$8], [16, "47:1-47:1", $s$8], [16, "47:1-47:1", $s$8]]),
    $m$8 = $M.fun("m$8", "h", null, $m$0, [], 0, 5, "49:0-67:1", 0, function h($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("50:2-50:11");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)("a");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("51:2-51:8");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("52:2-65:3");
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = $forInIterator(obj);
      $.state = 5;

    case 5:
      $l[3] = $p;
      $.state = 6;

    case 6:
      $context.call = $l[3].next;
      $.goto = 7;
      $p = $l[3].next();
      $.state = 7;

    case 7:
      if ($p.done) {
        $.state = 8;
      } else {
        $l[1] = $p.value;
        $.goto = 10;
        $brk("53:4-53:21");
        continue;
      }

    case 8:
      $.goto = 9;
      $brk("66:2-66:11");
      $.state = 9;

    case 9:
      $.goto = 38;
      ($context.call = eff)("z");
      continue;

    case 10:
      $.goto = 11;
      $mcall("log", console, "j");
      $.state = 11;

    case 11:
      $.goto = 12;
      $brk("54:4-54:12");
      $.state = 12;

    case 12:
      $.goto = 13;
      ($context.call = effA)($l[1]);
      $.state = 13;

    case 13:
      $.goto = 14;
      $p = ($context.call = eff)($l[1]);
      $.state = 14;

    case 14:
      $.goto = 15;
      $p = $forInIterator($p);
      $.state = 15;

    case 15:
      $l[4] = $p;
      $.state = 16;

    case 16:
      $context.call = $l[4].next;
      $.goto = 17;
      $p = $l[4].next();
      $.state = 17;

    case 17:
      if ($p.done) {
        $.state = 18;
      } else {
        $l[2] = $p.value;
        $.goto = 20;
        $brk("56:6-56:23");
        continue;
      }

    case 18:
      $.goto = 19;
      $brk("64:4-64:12");
      $.state = 19;

    case 19:
      $.goto = 6;
      ($context.call = effB)($l[1]);
      continue;

    case 20:
      $.goto = 21;
      $mcall("log", console, "b");
      $.state = 21;

    case 21:
      $.goto = 22;
      $brk("57:6-57:15");
      $.state = 22;

    case 22:
      $.goto = 23;
      ($context.call = eff)("b");
      $.state = 23;

    case 23:
      $.goto = 24;
      $brk("58:6-58:35");
      $.state = 24;

    case 24:
      $.goto = 25;
      $p = ($context.call = eff)($l[2] + $l[1]);
      $.state = 25;

    case 25:
      if ($p) {
        $.goto = 6;
        $brk("58:22-58:35");
        continue;
      } else {
        $.state = 26;
      }

    case 26:
      $.goto = 27;
      $brk("59:6-59:33");
      $.state = 27;

    case 27:
      $.goto = 28;
      $p = ($context.call = effB)($l[2] + $l[1]);
      $.state = 28;

    case 28:
      if ($p) {
        $.goto = 8;
        $brk("59:23-59:33");
        continue;
      } else {
        $.state = 29;
      }

    case 29:
      $.goto = 30;
      $brk("60:6-60:27");
      $.state = 30;

    case 30:
      $.goto = 31;
      $p = ($context.call = eff)($l[2]);
      $.state = 31;

    case 31:
      if ($p) {
        $.goto = 16;
        $brk("60:18-60:27");
        continue;
      } else {
        $.state = 32;
      }

    case 32:
      $.goto = 33;
      $brk("61:6-61:25");
      $.state = 33;

    case 33:
      $.goto = 34;
      $p = ($context.call = effB)($l[2]);
      $.state = 34;

    case 34:
      if ($p) {
        $.goto = 18;
        $brk("61:19-61:25");
        continue;
      } else {
        $.state = 35;
      }

    case 35:
      $.goto = 36;
      $brk("62:6-62:15");
      $.state = 36;

    case 36:
      $.goto = 16;
      ($context.call = eff)("c");
      continue;

    case 37:
      $.goto = 38;
      return $unhandled($.error);

    case 38:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "50:2-50:11", $s$9], [2, "50:2-50:10", $s$9], [4, "51:2-51:8", $s$9], [4, "52:2-65:3", $s$9], [0, null, $s$9], [0, null, $s$9], [0, "52:12-52:13", $s$9], [4, "53:4-53:21", $s$9], [4, "66:2-66:11", $s$9], [2, "66:2-66:10", $s$9], [2, "53:4-53:20", $s$9], [4, "54:4-54:12", $s$9], [2, "54:4-54:11", $s$9], [2, "55:18-55:24", $s$9], [0, null, $s$9], [0, null, $s$9], [0, "55:13-55:14", $s$9], [4, "56:6-56:23", $s$9], [4, "64:4-64:12", $s$9], [2, "64:4-64:11", $s$9], [2, "56:6-56:22", $s$9], [4, "57:6-57:15", $s$9], [2, "57:6-57:14", $s$9], [4, "58:6-58:35", $s$9], [2, "58:10-58:20", $s$9], [4, "58:22-58:35", $s$9], [4, "59:6-59:33", $s$9], [2, "59:10-59:21", $s$9], [4, "59:23-59:33", $s$9], [4, "60:6-60:27", $s$9], [2, "60:10-60:16", $s$9], [4, "60:18-60:27", $s$9], [4, "61:6-61:25", $s$9], [2, "61:10-61:17", $s$9], [4, "61:19-61:25", $s$9], [4, "62:6-62:15", $s$9], [2, "62:6-62:14", $s$9], [16, "67:1-67:1", $s$9], [16, "67:1-67:1", $s$9]]);

$M.moduleExports();