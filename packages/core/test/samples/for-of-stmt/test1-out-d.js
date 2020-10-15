var $M = require("@effectful/debugger"),
    $iterator = $M.iterator,
    $iterFin = $M.iterFin,
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
  b: [2, "7:9-7:10"],
  c: [3, "14:9-14:10"],
  d: [4, "23:9-23:10"],
  p: [5, "30:9-30:10"]
}, null, 0],
    $s$2 = [{
  i: [1, "2:11-2:12"]
}, $s$1, 1],
    $s$3 = [{
  i: [1, "8:11-8:12"]
}, $s$1, 1],
    $s$4 = [{
  i: [1, "15:11-15:12"],
  j: [2, "16:13-16:14"]
}, $s$1, 1],
    $s$5 = [{
  i: [1, "24:11-24:12"]
}, $s$1, 1],
    $s$6 = [{
  i: [1, "31:11-31:12"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 6, "1:0-36:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-6:1", $s$1], [16, "36:0-36:0", $s$1], [16, "36:0-36:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 4, "1:0-6:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $iterator(some);
      $.state = 2;

    case 2:
      $l[3] = $p;
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $context.call = $l[3].next;
      $.goto = 5;
      $p = $l[3].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.state = 6;
      } else {
        $.goto = 10;
        continue;
      }

    case 6:
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff)(2);
      $.state = 9;

    case 9:
      $.goto = 17;
      $brk();
      continue;

    case 10:
      $l[1] = $p.value;
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      ($context.call = eff)(1);
      $.state = 12;

    case 12:
      $.goto = 3;
      $brk();
      continue;

    case 13:
      return $raise($.error);

    case 14:
      $.goto = 15;
      $iterFin($l[3]);
      $.state = 15;

    case 15:
      $.goto = $l[2];
      continue;

    case 16:
      $.goto = 17;
      return $unhandled($.error);

    case 17:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 12:
    case 11:
    case 10:
    case 6:
    case 5:
    case 4:
    case 3:
      $.goto = 14;
      $l[2] = 13;
      break;

    default:
      $.goto = 16;
  }
}, function ($, $l) {
  switch ($.state) {
    case 12:
    case 11:
    case 10:
    case 6:
    case 5:
    case 4:
    case 3:
      $l[2] = 17;
      $.goto = 14;
      break;

    default:
      $.goto = 17;
      break;
  }
}, 1, [[4, "2:2-4:3", $s$2], [2, "2:16-2:20", $s$2], [0, null, $s$2], [4, "2:11-2:12", $s$2], [2, "2:16-2:20", $s$2], [0, null, $s$2], [0, null, $s$2], [4, "5:2-5:9", $s$2], [2, "5:2-5:8", $s$2], [36, "6:1-6:1", $s$2], [4, "3:4-3:11", $s$2], [2, "3:4-3:10", $s$2], [36, "4:3-4:3", $s$2], [0, null, $s$2], [2, "2:16-2:20", $s$2], [0, null, $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 4, "7:0-12:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff)("d");
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = $iterator($p);
      $.state = 3;

    case 3:
      $l[3] = $p;
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $context.call = $l[3].next;
      $.goto = 6;
      $p = $l[3].next();
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
      ($context.call = eff)($l[1]);
      $.state = 10;

    case 10:
      $.goto = 18;
      $brk();
      continue;

    case 11:
      $l[1] = $p.value;
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      ($context.call = eff)($l[1]);
      $.state = 13;

    case 13:
      $.goto = 4;
      $brk();
      continue;

    case 14:
      return $raise($.error);

    case 15:
      $.goto = 16;
      $iterFin($l[3]);
      $.state = 16;

    case 16:
      $.goto = $l[2];
      continue;

    case 17:
      $.goto = 18;
      return $unhandled($.error);

    case 18:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 13:
    case 12:
    case 11:
    case 7:
    case 6:
    case 5:
    case 4:
      $.goto = 15;
      $l[2] = 14;
      break;

    default:
      $.goto = 17;
  }
}, function ($, $l) {
  switch ($.state) {
    case 13:
    case 12:
    case 11:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[2] = 18;
      $.goto = 15;
      break;

    default:
      $.goto = 18;
      break;
  }
}, 1, [[4, "8:2-10:3", $s$3], [2, "8:16-8:24", $s$3], [2, "8:16-8:24", $s$3], [0, null, $s$3], [4, "8:11-8:12", $s$3], [2, "8:16-8:24", $s$3], [0, null, $s$3], [0, null, $s$3], [4, "11:2-11:9", $s$3], [2, "11:2-11:8", $s$3], [36, "12:1-12:1", $s$3], [4, "9:4-9:11", $s$3], [2, "9:4-9:10", $s$3], [36, "10:3-10:3", $s$3], [0, null, $s$3], [2, "8:16-8:24", $s$3], [0, null, $s$3], [16, "12:1-12:1", $s$3], [16, "12:1-12:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 7, "14:0-21:1", 0, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $iterator(some);
      $.state = 2;

    case 2:
      $l[5] = $p;
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $context.call = $l[5].next;
      $.goto = 5;
      $p = $l[5].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.state = 6;
      } else {
        $.goto = 10;
        continue;
      }

    case 6:
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff)($l[1], $l[2]);
      $.state = 9;

    case 9:
      $.goto = 28;
      $brk();
      continue;

    case 10:
      $l[1] = $p.value;
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      $p = $iterator(other);
      $.state = 12;

    case 12:
      $l[6] = $p;
      $.state = 13;

    case 13:
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $context.call = $l[6].next;
      $.goto = 15;
      $p = $l[6].next();
      $.state = 15;

    case 15:
      if ($p.done) {
        $.state = 16;
      } else {
        $.goto = 18;
        continue;
      }

    case 16:
      $.state = 17;

    case 17:
      $.goto = 3;
      $brk();
      continue;

    case 18:
      $l[2] = $p.value;
      $.goto = 19;
      $brk();
      $.state = 19;

    case 19:
      $.goto = 20;
      ($context.call = eff)($l[1], $l[2]);
      $.state = 20;

    case 20:
      $.goto = 13;
      $brk();
      continue;

    case 21:
      return $raise($.error);

    case 22:
      $.goto = 23;
      $iterFin($l[6]);
      $.state = 23;

    case 23:
      $.goto = $l[4];
      continue;

    case 24:
      return $raise($.error);

    case 25:
      $.goto = 26;
      $iterFin($l[5]);
      $.state = 26;

    case 26:
      $.goto = $l[3];
      continue;

    case 27:
      $.goto = 28;
      return $unhandled($.error);

    case 28:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 23:
    case 22:
    case 21:
    case 17:
    case 12:
    case 11:
    case 10:
    case 6:
    case 5:
    case 4:
    case 3:
      $.goto = 25;
      $l[3] = 24;
      break;

    case 20:
    case 19:
    case 18:
    case 16:
    case 15:
    case 14:
    case 13:
      $.goto = 22;
      $l[4] = 21;
      break;

    default:
      $.goto = 27;
  }
}, function ($, $l) {
  switch ($.state) {
    case 23:
    case 22:
    case 21:
    case 17:
    case 12:
    case 11:
    case 10:
    case 6:
    case 5:
    case 4:
    case 3:
      $l[3] = 28;
      $.goto = 25;
      break;

    case 20:
    case 19:
    case 18:
    case 16:
    case 15:
    case 14:
    case 13:
      $l[4] = 25;
      $l[3] = 28;
      $.goto = 22;
      break;

    default:
      $.goto = 28;
      break;
  }
}, 1, [[4, "15:2-19:3", $s$4], [2, "15:16-15:20", $s$4], [0, null, $s$4], [4, "15:11-15:12", $s$4], [2, "15:16-15:20", $s$4], [0, null, $s$4], [0, null, $s$4], [4, "20:2-20:12", $s$4], [2, "20:2-20:11", $s$4], [36, "21:1-21:1", $s$4], [4, "16:4-18:5", $s$4], [2, "16:18-16:23", $s$4], [0, null, $s$4], [4, "16:13-16:14", $s$4], [2, "16:18-16:23", $s$4], [0, null, $s$4], [0, null, $s$4], [36, "19:3-19:3", $s$4], [4, "17:6-17:16", $s$4], [2, "17:6-17:15", $s$4], [36, "18:5-18:5", $s$4], [0, null, $s$4], [2, "16:18-16:23", $s$4], [0, null, $s$4], [0, null, $s$4], [2, "15:16-15:20", $s$4], [0, null, $s$4], [16, "21:1-21:1", $s$4], [16, "21:1-21:1", $s$4]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 4, "23:0-28:1", 0, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $iterator(some);
      $.state = 2;

    case 2:
      $l[3] = $p;
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $context.call = $l[3].next;
      $.goto = 5;
      $p = $l[3].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.state = 6;
      } else {
        $.goto = 10;
        continue;
      }

    case 6:
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff)(2);
      $.state = 9;

    case 9:
      $.goto = 17;
      $brk();
      continue;

    case 10:
      $l[1] = $p.value;
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      ($context.call = eff)(1);
      $.state = 12;

    case 12:
      $.goto = 3;
      $brk();
      continue;

    case 13:
      return $raise($.error);

    case 14:
      $.goto = 15;
      $iterFin($l[3]);
      $.state = 15;

    case 15:
      $.goto = $l[2];
      continue;

    case 16:
      $.goto = 17;
      return $unhandled($.error);

    case 17:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 12:
    case 11:
    case 10:
    case 6:
    case 5:
    case 4:
    case 3:
      $.goto = 14;
      $l[2] = 13;
      break;

    default:
      $.goto = 16;
  }
}, function ($, $l) {
  switch ($.state) {
    case 12:
    case 11:
    case 10:
    case 6:
    case 5:
    case 4:
    case 3:
      $l[2] = 17;
      $.goto = 14;
      break;

    default:
      $.goto = 17;
      break;
  }
}, 1, [[4, "24:2-26:3", $s$5], [2, "24:16-24:20", $s$5], [0, null, $s$5], [4, "24:11-24:12", $s$5], [2, "24:16-24:20", $s$5], [0, null, $s$5], [0, null, $s$5], [4, "27:2-27:9", $s$5], [2, "27:2-27:8", $s$5], [36, "28:1-28:1", $s$5], [4, "25:4-25:11", $s$5], [2, "25:4-25:10", $s$5], [36, "26:3-26:3", $s$5], [0, null, $s$5], [2, "24:16-24:20", $s$5], [0, null, $s$5], [16, "28:1-28:1", $s$5], [16, "28:1-28:1", $s$5]]),
    $m$5 = $M.fun("m$5", "p", null, $m$0, [], 0, 4, "30:0-35:1", 0, function p($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $iterator(some);
      $.state = 2;

    case 2:
      $l[3] = $p;
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $context.call = $l[3].next;
      $.goto = 5;
      $p = $l[3].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.state = 6;
      } else {
        $.goto = 10;
        continue;
      }

    case 6:
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      $mcall("log", console, 2);
      $.state = 9;

    case 9:
      $.goto = 17;
      $brk();
      continue;

    case 10:
      $l[1] = $p.value;
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      $mcall("log", console, 1);
      $.state = 12;

    case 12:
      $.goto = 3;
      $brk();
      continue;

    case 13:
      return $raise($.error);

    case 14:
      $.goto = 15;
      $iterFin($l[3]);
      $.state = 15;

    case 15:
      $.goto = $l[2];
      continue;

    case 16:
      $.goto = 17;
      return $unhandled($.error);

    case 17:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 12:
    case 11:
    case 10:
    case 6:
    case 5:
    case 4:
    case 3:
      $.goto = 14;
      $l[2] = 13;
      break;

    default:
      $.goto = 16;
  }
}, function ($, $l) {
  switch ($.state) {
    case 12:
    case 11:
    case 10:
    case 6:
    case 5:
    case 4:
    case 3:
      $l[2] = 17;
      $.goto = 14;
      break;

    default:
      $.goto = 17;
      break;
  }
}, 1, [[4, "31:2-33:3", $s$6], [2, "31:16-31:20", $s$6], [0, null, $s$6], [4, "31:11-31:12", $s$6], [2, "31:16-31:20", $s$6], [0, null, $s$6], [0, null, $s$6], [4, "34:2-34:17", $s$6], [2, "34:2-34:16", $s$6], [36, "35:1-35:1", $s$6], [4, "32:4-32:19", $s$6], [2, "32:4-32:18", $s$6], [36, "33:3-33:3", $s$6], [0, null, $s$6], [2, "31:16-31:20", $s$6], [0, null, $s$6], [16, "35:1-35:1", $s$6], [16, "35:1-35:1", $s$6]]);

$M.moduleExports();