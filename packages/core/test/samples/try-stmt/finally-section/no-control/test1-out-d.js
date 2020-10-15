var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
    $brk = $M.brk,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"],
  b: [2, "10:9-10:10"],
  c: [3, "21:9-21:10"],
  d: [4, "30:9-30:10"],
  e: [5, "39:9-39:10"],
  f: [6, "58:9-58:10"],
  g: [7, "69:9-69:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $s$4 = [{
  e: [1, "13:11-13:12"]
}, $s$3, 1],
    $s$5 = [{}, $s$1, 1],
    $s$6 = [{}, $s$1, 1],
    $s$7 = [{}, $s$1, 1],
    $s$8 = [{
  e: [1, "45:11-45:12"]
}, $s$7, 1],
    $s$9 = [{}, $s$1, 1],
    $s$10 = [{
  e: [1, "61:11-61:12"]
}, $s$9, 1],
    $s$11 = [{}, $s$1, 1],
    $s$12 = [{
  e: [1, "72:11-72:12"]
}, $s$11, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 8, "1:0-79:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $l[5] = $m$5($);
      $l[6] = $m$6($);
      $l[7] = $m$7($);
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
}, null, null, 0, [[0, "1:0-8:1", $s$1], [16, "79:0-79:0", $s$1], [16, "79:0-79:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-8:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff)("in body");
      $.state = 3;

    case 3:
      $l[1] = 9;
      $.goto = 5;
      $brk();
      continue;

    case 4:
      return $raise($l[2]);

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff)("in `finally`");
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = $l[1];
      continue;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      ($context.call = eff)("after `finally`");
      $.state = 11;

    case 11:
      $.goto = 13;
      $brk();
      continue;

    case 12:
      $.goto = 13;
      return $unhandled($.error);

    case 13:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
    case 1:
      $.goto = 5;
      $l[1] = 4;
      $l[2] = $.error;
      break;

    default:
      $.goto = 12;
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
    case 1:
      $l[1] = 13;
      $.goto = 5;
      break;

    default:
      $.goto = 13;
      break;
  }
}, 1, [[4, "2:2-6:3", $s$2], [4, "3:4-3:19", $s$2], [2, "3:4-3:18", $s$2], [36, "4:3-4:3", $s$2], [0, null, $s$2], [4, "5:4-5:24", $s$2], [2, "5:4-5:23", $s$2], [36, "6:3-6:3", $s$2], [0, null, $s$2], [4, "7:2-7:25", $s$2], [2, "7:2-7:24", $s$2], [36, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 4, "10:0-19:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff)("in body");
      $.state = 3;

    case 3:
      $l[2] = 12;
      $.goto = 8;
      $brk();
      continue;

    case 4:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = eff)("in `catch`", $l[1]);
      $.state = 6;

    case 6:
      $l[2] = 12;
      $.goto = 8;
      $brk();
      continue;

    case 7:
      return $raise($l[3]);

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = eff)("in `finally`");
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = $l[2];
      continue;

    case 12:
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $.goto = 14;
      ($context.call = eff)("after `finally`");
      $.state = 14;

    case 14:
      $.goto = 16;
      $brk();
      continue;

    case 15:
      $.goto = 16;
      return $unhandled($.error);

    case 16:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
      $.goto = 8;
      $l[2] = 7;
      $l[3] = $.error;
      break;

    case 3:
    case 2:
    case 1:
      $.goto = 4;
      break;

    default:
      $.goto = 15;
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
      $l[2] = 16;
      $.goto = 8;
      break;

    default:
      $.goto = 16;
      break;
  }
}, 1, [[4, "11:2-17:3", $s$3], [5, "12:4-12:19", $s$3], [3, "12:4-12:18", $s$3], [37, "13:3-13:3", $s$3], [4, "14:4-14:25", $s$4], [2, "14:4-14:24", $s$4], [36, "15:3-15:3", $s$3], [0, null, $s$3], [4, "16:4-16:24", $s$3], [2, "16:4-16:23", $s$3], [36, "17:3-17:3", $s$3], [0, null, $s$3], [4, "18:2-18:25", $s$3], [2, "18:2-18:24", $s$3], [36, "19:1-19:1", $s$3], [16, "19:1-19:1", $s$3], [16, "19:1-19:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 3, "21:0-28:1", 0, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff)("in body");
      $.state = 3;

    case 3:
      $l[1] = 9;
      $.goto = 5;
      $brk();
      continue;

    case 4:
      return $raise($l[2]);

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      $mcall("log", console, "in `finally`");
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = $l[1];
      continue;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      ($context.call = eff)("after `finally`");
      $.state = 11;

    case 11:
      $.goto = 13;
      $brk();
      continue;

    case 12:
      $.goto = 13;
      return $unhandled($.error);

    case 13:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
    case 1:
      $.goto = 5;
      $l[1] = 4;
      $l[2] = $.error;
      break;

    default:
      $.goto = 12;
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
    case 1:
      $l[1] = 13;
      $.goto = 5;
      break;

    default:
      $.goto = 13;
      break;
  }
}, 1, [[4, "22:2-26:3", $s$5], [4, "23:4-23:19", $s$5], [2, "23:4-23:18", $s$5], [36, "24:3-24:3", $s$5], [0, null, $s$5], [4, "25:4-25:32", $s$5], [2, "25:4-25:31", $s$5], [36, "26:3-26:3", $s$5], [0, null, $s$5], [4, "27:2-27:25", $s$5], [2, "27:2-27:24", $s$5], [36, "28:1-28:1", $s$5], [16, "28:1-28:1", $s$5], [16, "28:1-28:1", $s$5]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 3, "30:0-37:1", 0, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("log", console, "in body");
      $.state = 3;

    case 3:
      $l[1] = 9;
      $.goto = 5;
      $brk();
      continue;

    case 4:
      return $raise($l[2]);

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = eff)("in `finally`");
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = $l[1];
      continue;

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      ($context.call = eff)("after `finally`");
      $.state = 11;

    case 11:
      $.goto = 13;
      $brk();
      continue;

    case 12:
      $.goto = 13;
      return $unhandled($.error);

    case 13:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
    case 1:
      $.goto = 5;
      $l[1] = 4;
      $l[2] = $.error;
      break;

    default:
      $.goto = 12;
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
    case 1:
      $l[1] = 13;
      $.goto = 5;
      break;

    default:
      $.goto = 13;
      break;
  }
}, 1, [[4, "31:2-35:3", $s$6], [4, "32:4-32:27", $s$6], [2, "32:4-32:26", $s$6], [36, "33:3-33:3", $s$6], [0, null, $s$6], [4, "34:4-34:24", $s$6], [2, "34:4-34:23", $s$6], [36, "35:3-35:3", $s$6], [0, null, $s$6], [4, "36:2-36:25", $s$6], [2, "36:2-36:24", $s$6], [36, "37:1-37:1", $s$6], [16, "37:1-37:1", $s$6], [16, "37:1-37:1", $s$6]]),
    $m$5 = $M.fun("m$5", "e", null, $m$0, [], 0, 4, "39:0-56:1", 0, function e($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("log", console, "before");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = eff)("before");
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      $mcall("log", console, "in body");
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff)("in body");
      $.state = 9;

    case 9:
      $l[2] = 26;
      $.goto = 18;
      $brk();
      continue;

    case 10:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      $mcall("log", console, "catch", $l[1]);
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $.goto = 14;
      ($context.call = eff)("catch", $l[1]);
      $.state = 14;

    case 14:
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $.goto = 16;
      $mcall("log", console, "catch", $l[1]);
      $.state = 16;

    case 16:
      $l[2] = 26;
      $.goto = 18;
      $brk();
      continue;

    case 17:
      return $raise($l[3]);

    case 18:
      $.goto = 19;
      $brk();
      $.state = 19;

    case 19:
      $.goto = 20;
      $mcall("log", console, "in finally");
      $.state = 20;

    case 20:
      $.goto = 21;
      $brk();
      $.state = 21;

    case 21:
      $.goto = 22;
      ($context.call = eff)("in `finally`");
      $.state = 22;

    case 22:
      $.goto = 23;
      $brk();
      $.state = 23;

    case 23:
      $.goto = 24;
      $mcall("log", console, "in finally 2");
      $.state = 24;

    case 24:
      $.goto = 25;
      $brk();
      $.state = 25;

    case 25:
      $.goto = $l[2];
      continue;

    case 26:
      $.goto = 27;
      $brk();
      $.state = 27;

    case 27:
      $.goto = 28;
      $mcall("log", console, "after `finally`");
      $.state = 28;

    case 28:
      $.goto = 29;
      $brk();
      $.state = 29;

    case 29:
      $.goto = 30;
      ($context.call = eff)("after `finally`");
      $.state = 30;

    case 30:
      $.goto = 32;
      $brk();
      continue;

    case 31:
      $.goto = 32;
      return $unhandled($.error);

    case 32:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
      $.goto = 18;
      $l[2] = 17;
      $l[3] = $.error;
      break;

    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      $.goto = 10;
      break;

    default:
      $.goto = 31;
  }
}, function ($, $l) {
  switch ($.state) {
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[2] = 32;
      $.goto = 18;
      break;

    default:
      $.goto = 32;
      break;
  }
}, 1, [[4, "40:2-40:24", $s$7], [2, "40:2-40:23", $s$7], [4, "41:2-41:16", $s$7], [2, "41:2-41:15", $s$7], [4, "42:2-53:3", $s$7], [5, "43:4-43:27", $s$7], [3, "43:4-43:26", $s$7], [5, "44:4-44:19", $s$7], [3, "44:4-44:18", $s$7], [37, "45:3-45:3", $s$7], [4, "46:4-46:28", $s$8], [2, "46:4-46:27", $s$8], [4, "47:4-47:20", $s$8], [2, "47:4-47:19", $s$8], [4, "48:4-48:28", $s$8], [2, "48:4-48:27", $s$8], [36, "49:3-49:3", $s$7], [0, null, $s$7], [4, "50:4-50:30", $s$7], [2, "50:4-50:29", $s$7], [4, "51:4-51:24", $s$7], [2, "51:4-51:23", $s$7], [4, "52:4-52:32", $s$7], [2, "52:4-52:31", $s$7], [36, "53:3-53:3", $s$7], [0, null, $s$7], [4, "54:2-54:33", $s$7], [2, "54:2-54:32", $s$7], [4, "55:2-55:25", $s$7], [2, "55:2-55:24", $s$7], [36, "56:1-56:1", $s$7], [16, "56:1-56:1", $s$7], [16, "56:1-56:1", $s$7]]),
    $m$6 = $M.fun("m$6", "f", null, $m$0, [], 0, 4, "58:0-67:1", 0, function f($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff)("in body");
      $.state = 3;

    case 3:
      $l[2] = 12;
      $.goto = 8;
      $brk();
      continue;

    case 4:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = eff)("in `catch`");
      $.state = 6;

    case 6:
      $l[2] = 12;
      $.goto = 8;
      $brk();
      continue;

    case 7:
      return $raise($l[3]);

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      $mcall("log", console, "in `finally`");
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = $l[2];
      continue;

    case 12:
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $.goto = 14;
      ($context.call = eff)("after `finally`");
      $.state = 14;

    case 14:
      $.goto = 16;
      $brk();
      continue;

    case 15:
      $.goto = 16;
      return $unhandled($.error);

    case 16:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
      $.goto = 8;
      $l[2] = 7;
      $l[3] = $.error;
      break;

    case 3:
    case 2:
    case 1:
      $.goto = 4;
      break;

    default:
      $.goto = 15;
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
      $l[2] = 16;
      $.goto = 8;
      break;

    default:
      $.goto = 16;
      break;
  }
}, 1, [[4, "59:2-65:3", $s$9], [5, "60:4-60:19", $s$9], [3, "60:4-60:18", $s$9], [37, "61:3-61:3", $s$9], [4, "62:4-62:22", $s$10], [2, "62:4-62:21", $s$10], [36, "63:3-63:3", $s$9], [0, null, $s$9], [4, "64:4-64:32", $s$9], [2, "64:4-64:31", $s$9], [36, "65:3-65:3", $s$9], [0, null, $s$9], [4, "66:2-66:25", $s$9], [2, "66:2-66:24", $s$9], [36, "67:1-67:1", $s$9], [16, "67:1-67:1", $s$9], [16, "67:1-67:1", $s$9]]),
    $m$7 = $M.fun("m$7", "g", null, $m$0, [], 0, 4, "69:0-78:1", 0, function g($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $.goto = 3;
      ($context.call = eff)("in body");
      $.state = 3;

    case 3:
      $l[2] = 12;
      $.goto = 8;
      $brk();
      continue;

    case 4:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("log", console, "in `catch`");
      $.state = 6;

    case 6:
      $l[2] = 12;
      $.goto = 8;
      $brk();
      continue;

    case 7:
      return $raise($l[3]);

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      $mcall("log", console, "in `finally`");
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = $l[2];
      continue;

    case 12:
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $.goto = 14;
      ($context.call = eff)("after `finally`");
      $.state = 14;

    case 14:
      $.goto = 16;
      $brk();
      continue;

    case 15:
      $.goto = 16;
      return $unhandled($.error);

    case 16:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
      $.goto = 8;
      $l[2] = 7;
      $l[3] = $.error;
      break;

    case 3:
    case 2:
    case 1:
      $.goto = 4;
      break;

    default:
      $.goto = 15;
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
      $l[2] = 16;
      $.goto = 8;
      break;

    default:
      $.goto = 16;
      break;
  }
}, 1, [[4, "70:2-76:3", $s$11], [5, "71:4-71:19", $s$11], [3, "71:4-71:18", $s$11], [37, "72:3-72:3", $s$11], [4, "73:4-73:30", $s$12], [2, "73:4-73:29", $s$12], [36, "74:3-74:3", $s$11], [0, null, $s$11], [4, "75:4-75:32", $s$11], [2, "75:4-75:31", $s$11], [36, "76:3-76:3", $s$11], [0, null, $s$11], [4, "77:2-77:25", $s$11], [2, "77:2-77:24", $s$11], [36, "78:1-78:1", $s$11], [16, "78:1-78:1", $s$11], [16, "78:1-78:1", $s$11]]);

$M.moduleExports();