var $M = require("@effectful/debugger"),
    $iterator = $M.iterator,
    $iterFin = $M.iterFin,
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 6, "1:0-36:0", 160, function file_js($, $l, $p) {
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 4, "1:0-6:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $iterator(some);
      $.state = 1;

    case 1:
      $l[3] = $p;
      $.state = 2;

    case 2:
      $context.call = $l[3].next;
      $.goto = 3;
      $p = $l[3].next();
      $.state = 3;

    case 3:
      if ($p.done) {
        $.state = 4;
      } else {
        $l[1] = $p.value;
        $.goto = 2;
        ($context.call = eff)(1);
        continue;
      }

    case 4:
      $.goto = 8;
      ($context.call = eff)(2);
      continue;

    case 5:
      $.goto = 6;
      $iterFin($l[3]);
      $.state = 6;

    case 6:
      $.goto = $l[2];
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
    case 3:
    case 2:
      $l[2] = 7;
      $.goto = 5;
      break;

    default:
      $.goto = 7;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
      $l[2] = 8;
      $.goto = 5;
      break;

    default:
      $.goto = 8;
      break;
  }
}, 1, [[0, null, $s$2], [0, null, $s$2], [1, "2:11-2:12", $s$2], [3, "3:4-3:10", $s$2], [2, "5:2-5:8", $s$2], [0, null, $s$2], [0, null, $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 4, "7:0-12:1", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = eff)("d");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $iterator($p);
      $.state = 2;

    case 2:
      $l[3] = $p;
      $.state = 3;

    case 3:
      $context.call = $l[3].next;
      $.goto = 4;
      $p = $l[3].next();
      $.state = 4;

    case 4:
      if ($p.done) {
        $.state = 5;
      } else {
        $l[1] = $p.value;
        $.goto = 3;
        ($context.call = eff)($l[1]);
        continue;
      }

    case 5:
      $.goto = 9;
      ($context.call = eff)($l[1]);
      continue;

    case 6:
      $.goto = 7;
      $iterFin($l[3]);
      $.state = 7;

    case 7:
      $.goto = $l[2];
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 4:
    case 3:
      $l[2] = 8;
      $.goto = 6;
      break;

    default:
      $.goto = 8;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 4:
    case 3:
      $l[2] = 9;
      $.goto = 6;
      break;

    default:
      $.goto = 9;
      break;
  }
}, 1, [[2, "8:16-8:24", $s$3], [0, null, $s$3], [0, null, $s$3], [1, "8:11-8:12", $s$3], [3, "9:4-9:10", $s$3], [2, "11:2-11:8", $s$3], [0, null, $s$3], [0, null, $s$3], [16, "12:1-12:1", $s$3], [16, "12:1-12:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 7, "14:0-21:1", 128, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $iterator(some);
      $.state = 1;

    case 1:
      $l[5] = $p;
      $.state = 2;

    case 2:
      $context.call = $l[5].next;
      $.goto = 3;
      $p = $l[5].next();
      $.state = 3;

    case 3:
      if ($p.done) {
        $.state = 4;
      } else {
        $l[1] = $p.value;
        $.goto = 5;
        $p = $iterator(other);
        continue;
      }

    case 4:
      $.goto = 14;
      ($context.call = eff)($l[1], $l[2]);
      continue;

    case 5:
      $l[6] = $p;
      $.state = 6;

    case 6:
      $context.call = $l[6].next;
      $.goto = 7;
      $p = $l[6].next();
      $.state = 7;

    case 7:
      if ($p.done) {
        $.state = 8;
      } else {
        $l[2] = $p.value;
        $.goto = 6;
        ($context.call = eff)($l[1], $l[2]);
        continue;
      }

    case 8:
      $.goto = 2;
      continue;

    case 9:
      $.goto = 10;
      $iterFin($l[6]);
      $.state = 10;

    case 10:
      $.goto = $l[4];
      continue;

    case 11:
      $.goto = 12;
      $iterFin($l[5]);
      $.state = 12;

    case 12:
      $.goto = $l[3];
      continue;

    case 13:
      $.goto = 14;
      return $unhandled($.error);

    case 14:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 10:
    case 9:
    case 8:
    case 5:
    case 3:
    case 2:
      $l[3] = 13;
      $.goto = 11;
      break;

    case 7:
    case 6:
      $l[4] = 11;
      $l[3] = 13;
      $.goto = 9;
      break;

    default:
      $.goto = 13;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 10:
    case 9:
    case 8:
    case 5:
    case 3:
    case 2:
      $l[3] = 14;
      $.goto = 11;
      break;

    case 7:
    case 6:
      $l[4] = 11;
      $l[3] = 14;
      $.goto = 9;
      break;

    default:
      $.goto = 14;
      break;
  }
}, 1, [[0, null, $s$4], [0, null, $s$4], [1, "15:11-15:12", $s$4], [1, null, $s$4], [2, "20:2-20:11", $s$4], [1, null, $s$4], [1, "16:13-16:14", $s$4], [3, "17:6-17:15", $s$4], [1, null, $s$4], [1, null, $s$4], [1, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, "21:1-21:1", $s$4], [16, "21:1-21:1", $s$4]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 4, "23:0-28:1", 128, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $iterator(some);
      $.state = 1;

    case 1:
      $l[3] = $p;
      $.state = 2;

    case 2:
      $context.call = $l[3].next;
      $.goto = 3;
      $p = $l[3].next();
      $.state = 3;

    case 3:
      if ($p.done) {
        $.state = 4;
      } else {
        $l[1] = $p.value;
        $.goto = 2;
        ($context.call = eff)(1);
        continue;
      }

    case 4:
      $.goto = 8;
      ($context.call = eff)(2);
      continue;

    case 5:
      $.goto = 6;
      $iterFin($l[3]);
      $.state = 6;

    case 6:
      $.goto = $l[2];
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
    case 3:
    case 2:
      $l[2] = 7;
      $.goto = 5;
      break;

    default:
      $.goto = 7;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
      $l[2] = 8;
      $.goto = 5;
      break;

    default:
      $.goto = 8;
      break;
  }
}, 1, [[0, null, $s$5], [0, null, $s$5], [1, "24:11-24:12", $s$5], [3, "25:4-25:10", $s$5], [2, "27:2-27:8", $s$5], [0, null, $s$5], [0, null, $s$5], [16, "28:1-28:1", $s$5], [16, "28:1-28:1", $s$5]]),
    $m$5 = $M.fun("m$5", "p", null, $m$0, [], 0, 4, "30:0-35:1", 128, function p($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $iterator(some);
      $.state = 1;

    case 1:
      $l[3] = $p;
      $.state = 2;

    case 2:
      $context.call = $l[3].next;
      $.goto = 3;
      $p = $l[3].next();
      $.state = 3;

    case 3:
      if ($p.done) {
        $.state = 4;
      } else {
        $l[1] = $p.value;
        $.goto = 2;
        $mcall("log", console, 1);
        continue;
      }

    case 4:
      $.goto = 8;
      $mcall("log", console, 2);
      continue;

    case 5:
      $.goto = 6;
      $iterFin($l[3]);
      $.state = 6;

    case 6:
      $.goto = $l[2];
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
    case 3:
    case 2:
      $l[2] = 7;
      $.goto = 5;
      break;

    default:
      $.goto = 7;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
      $l[2] = 8;
      $.goto = 5;
      break;

    default:
      $.goto = 8;
      break;
  }
}, 1, [[0, null, $s$6], [0, null, $s$6], [1, "31:11-31:12", $s$6], [3, "32:4-32:18", $s$6], [2, "34:2-34:16", $s$6], [0, null, $s$6], [0, null, $s$6], [16, "35:1-35:1", $s$6], [16, "35:1-35:1", $s$6]]);

$M.moduleExports();