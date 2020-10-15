var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 8, "1:0-79:0", 160, function file_js($, $l, $p) {
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-8:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $l[1] = 5;
      $.goto = 3;
      ($context.call = eff)("in body");
      continue;

    case 2:
      return $raise($l[2]);

    case 3:
      $.goto = 4;
      ($context.call = eff)("in `finally`");
      $.state = 4;

    case 4:
      $.goto = $l[1];
      continue;

    case 5:
      $.goto = 7;
      ($context.call = eff)("after `finally`");
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 1:
      $.goto = 3;
      $l[1] = 2;
      $l[2] = $.error;
      break;

    default:
      $.goto = 6;
  }
}, function ($, $l) {
  switch ($.state) {
    case 1:
      $l[1] = 7;
      $.goto = 3;
      break;

    default:
      $.goto = 7;
      break;
  }
}, 1, [[0, null, $s$2], [2, "3:4-3:18", $s$2], [0, null, $s$2], [2, "5:4-5:23", $s$2], [0, null, $s$2], [2, "7:2-7:24", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 4, "10:0-19:1", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $l[2] = 6;
      $.goto = 4;
      ($context.call = eff)("in body");
      continue;

    case 2:
      $l[1] = $.error;
      $.error = void 0;
      $l[2] = 6;
      $.goto = 4;
      ($context.call = eff)("in `catch`", $l[1]);
      continue;

    case 3:
      return $raise($l[3]);

    case 4:
      $.goto = 5;
      ($context.call = eff)("in `finally`");
      $.state = 5;

    case 5:
      $.goto = $l[2];
      continue;

    case 6:
      $.goto = 8;
      ($context.call = eff)("after `finally`");
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 2:
      $.goto = 4;
      $l[2] = 3;
      $l[3] = $.error;
      break;

    case 1:
      $.goto = 2;
      break;

    default:
      $.goto = 7;
  }
}, function ($, $l) {
  switch ($.state) {
    case 2:
    case 1:
      $l[2] = 8;
      $.goto = 4;
      break;

    default:
      $.goto = 8;
      break;
  }
}, 1, [[0, null, $s$3], [3, "12:4-12:18", $s$3], [2, "14:4-14:24", $s$4], [0, null, $s$3], [2, "16:4-16:23", $s$3], [0, null, $s$3], [2, "18:2-18:24", $s$3], [16, "19:1-19:1", $s$3], [16, "19:1-19:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 3, "21:0-28:1", 128, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $l[1] = 5;
      $.goto = 3;
      ($context.call = eff)("in body");
      continue;

    case 2:
      return $raise($l[2]);

    case 3:
      $.goto = 4;
      $mcall("log", console, "in `finally`");
      $.state = 4;

    case 4:
      $.goto = $l[1];
      continue;

    case 5:
      $.goto = 7;
      ($context.call = eff)("after `finally`");
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 1:
      $.goto = 3;
      $l[1] = 2;
      $l[2] = $.error;
      break;

    default:
      $.goto = 6;
  }
}, function ($, $l) {
  switch ($.state) {
    case 1:
      $l[1] = 7;
      $.goto = 3;
      break;

    default:
      $.goto = 7;
      break;
  }
}, 1, [[0, null, $s$5], [2, "23:4-23:18", $s$5], [0, null, $s$5], [2, "25:4-25:31", $s$5], [0, null, $s$5], [2, "27:2-27:24", $s$5], [16, "28:1-28:1", $s$5], [16, "28:1-28:1", $s$5]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 3, "30:0-37:1", 128, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $l[1] = 5;
      $.goto = 3;
      $mcall("log", console, "in body");
      continue;

    case 2:
      return $raise($l[2]);

    case 3:
      $.goto = 4;
      ($context.call = eff)("in `finally`");
      $.state = 4;

    case 4:
      $.goto = $l[1];
      continue;

    case 5:
      $.goto = 7;
      ($context.call = eff)("after `finally`");
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 1:
      $.goto = 3;
      $l[1] = 2;
      $l[2] = $.error;
      break;

    default:
      $.goto = 6;
  }
}, function ($, $l) {
  switch ($.state) {
    case 1:
      $l[1] = 7;
      $.goto = 3;
      break;

    default:
      $.goto = 7;
      break;
  }
}, 1, [[0, null, $s$6], [2, "32:4-32:26", $s$6], [0, null, $s$6], [2, "34:4-34:23", $s$6], [0, null, $s$6], [2, "36:2-36:24", $s$6], [16, "37:1-37:1", $s$6], [16, "37:1-37:1", $s$6]]),
    $m$5 = $M.fun("m$5", "e", null, $m$0, [], 0, 4, "39:0-56:1", 128, function e($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $mcall("log", console, "before");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)("before");
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("log", console, "in body");
      $.state = 3;

    case 3:
      $l[2] = 12;
      $.goto = 8;
      ($context.call = eff)("in body");
      continue;

    case 4:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 5;
      $mcall("log", console, "catch", $l[1]);
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = eff)("catch", $l[1]);
      $.state = 6;

    case 6:
      $l[2] = 12;
      $.goto = 8;
      $mcall("log", console, "catch", $l[1]);
      continue;

    case 7:
      return $raise($l[3]);

    case 8:
      $.goto = 9;
      $mcall("log", console, "in finally");
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = eff)("in `finally`");
      $.state = 10;

    case 10:
      $.goto = 11;
      $mcall("log", console, "in finally 2");
      $.state = 11;

    case 11:
      $.goto = $l[2];
      continue;

    case 12:
      $.goto = 13;
      $mcall("log", console, "after `finally`");
      $.state = 13;

    case 13:
      $.goto = 15;
      ($context.call = eff)("after `finally`");
      continue;

    case 14:
      $.goto = 15;
      return $unhandled($.error);

    case 15:
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
      $.goto = 4;
      break;

    default:
      $.goto = 14;
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
      $l[2] = 15;
      $.goto = 8;
      break;

    default:
      $.goto = 15;
      break;
  }
}, 1, [[2, "40:2-40:23", $s$7], [2, "41:2-41:15", $s$7], [3, "43:4-43:26", $s$7], [3, "44:4-44:18", $s$7], [2, "46:4-46:27", $s$8], [2, "47:4-47:19", $s$8], [2, "48:4-48:27", $s$8], [0, null, $s$7], [2, "50:4-50:29", $s$7], [2, "51:4-51:23", $s$7], [2, "52:4-52:31", $s$7], [0, null, $s$7], [2, "54:2-54:32", $s$7], [2, "55:2-55:24", $s$7], [16, "56:1-56:1", $s$7], [16, "56:1-56:1", $s$7]]),
    $m$6 = $M.fun("m$6", "f", null, $m$0, [], 0, 4, "58:0-67:1", 128, function f($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $l[2] = 6;
      $.goto = 4;
      ($context.call = eff)("in body");
      continue;

    case 2:
      $l[1] = $.error;
      $.error = void 0;
      $l[2] = 6;
      $.goto = 4;
      ($context.call = eff)("in `catch`");
      continue;

    case 3:
      return $raise($l[3]);

    case 4:
      $.goto = 5;
      $mcall("log", console, "in `finally`");
      $.state = 5;

    case 5:
      $.goto = $l[2];
      continue;

    case 6:
      $.goto = 8;
      ($context.call = eff)("after `finally`");
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 2:
      $.goto = 4;
      $l[2] = 3;
      $l[3] = $.error;
      break;

    case 1:
      $.goto = 2;
      break;

    default:
      $.goto = 7;
  }
}, function ($, $l) {
  switch ($.state) {
    case 2:
    case 1:
      $l[2] = 8;
      $.goto = 4;
      break;

    default:
      $.goto = 8;
      break;
  }
}, 1, [[0, null, $s$9], [3, "60:4-60:18", $s$9], [2, "62:4-62:21", $s$10], [0, null, $s$9], [2, "64:4-64:31", $s$9], [0, null, $s$9], [2, "66:2-66:24", $s$9], [16, "67:1-67:1", $s$9], [16, "67:1-67:1", $s$9]]),
    $m$7 = $M.fun("m$7", "g", null, $m$0, [], 0, 4, "69:0-78:1", 128, function g($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $l[2] = 6;
      $.goto = 4;
      ($context.call = eff)("in body");
      continue;

    case 2:
      $l[1] = $.error;
      $.error = void 0;
      $l[2] = 6;
      $.goto = 4;
      $mcall("log", console, "in `catch`");
      continue;

    case 3:
      return $raise($l[3]);

    case 4:
      $.goto = 5;
      $mcall("log", console, "in `finally`");
      $.state = 5;

    case 5:
      $.goto = $l[2];
      continue;

    case 6:
      $.goto = 8;
      ($context.call = eff)("after `finally`");
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 2:
      $.goto = 4;
      $l[2] = 3;
      $l[3] = $.error;
      break;

    case 1:
      $.goto = 2;
      break;

    default:
      $.goto = 7;
  }
}, function ($, $l) {
  switch ($.state) {
    case 2:
    case 1:
      $l[2] = 8;
      $.goto = 4;
      break;

    default:
      $.goto = 8;
      break;
  }
}, 1, [[0, null, $s$11], [3, "71:4-71:18", $s$11], [2, "73:4-73:29", $s$12], [0, null, $s$11], [2, "75:4-75:31", $s$11], [0, null, $s$11], [2, "77:2-77:24", $s$11], [16, "78:1-78:1", $s$11], [16, "78:1-78:1", $s$11]]);

$M.moduleExports();