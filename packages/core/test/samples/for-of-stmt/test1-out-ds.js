var $M = require("@effectful/debugger"),
    $iterator = $M.iterator,
    $iterFin = $M.iterFin,
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
  b: [2, "7:9-7:10"],
  c: [3, "14:9-14:10"],
  d: [4, "23:9-23:10"],
  p: [5, "30:9-30:10"]
}, null, 0],
    $s$2 = [{
  i: [1, "2:11-2:12"]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $s$4 = [{
  i: [1, "8:11-8:12"]
}, $s$1, 1],
    $s$5 = [{}, $s$4, 2],
    $s$6 = [{
  i: [1, "15:11-15:12"],
  j: [2, "16:13-16:14"]
}, $s$1, 1],
    $s$7 = [{}, $s$6, 2],
    $s$8 = [{}, $s$7, 3],
    $s$9 = [{
  i: [1, "24:11-24:12"]
}, $s$1, 1],
    $s$10 = [{}, $s$9, 2],
    $s$11 = [{
  i: [1, "31:11-31:12"]
}, $s$1, 1],
    $s$12 = [{}, $s$11, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 6, "1:0-36:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a*/
      $m$1($));
      $lset($l, 2,
      /*b*/
      $m$2($));
      $lset($l, 3,
      /*c*/
      $m$3($));
      $lset($l, 4,
      /*d*/
      $m$4($));
      $lset($l, 5,
      /*p*/
      $m$5($));
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-6:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-4:3");
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0, void 0];
      $.goto = 2;
      $p = $iterator(some);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $l = $.$ = $l.slice();
      $.state = 4;

    case 4:
      $context.call = $l[2].next;
      $.goto = 5;
      $p = $l[2].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.state = 6;
      } else {
        $.goto = 8;
        continue;
      }

    case 6:
      $.state = 7;

    case 7:
      $l[0][2] = 14;
      $.goto = 13;
      continue;

    case 8:
      $lset($l[0], 1,
      /*i*/
      $p.value);
      $.goto = 9;
      $brk("3:4-3:11");
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = eff)(1);
      $.state = 10;

    case 10:
      $l = $.$ = $l.slice();
      $.goto = 4;
      continue;

    case 11:
      $.goto = 12;
      $iterFin($l[2]);
      $.state = 12;

    case 12:
      $.goto = $l[1];
      continue;

    case 13:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 14:
      $.goto = 15;
      $brk("5:2-5:9");
      $.state = 15;

    case 15:
      $.goto = 17;
      ($context.call = eff)(2);
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
    case 7:
    case 3:
      $l[0][2] = 16;
      $.goto = 13;
      break;

    case 10:
    case 9:
    case 8:
    case 6:
    case 5:
    case 4:
      $l[1] = 13;
      $l[0][2] = 16;
      $.goto = 11;
      break;

    default:
      $.goto = 16;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 12:
    case 11:
    case 7:
    case 3:
      $l[0][2] = 17;
      $.goto = 13;
      break;

    case 10:
    case 9:
    case 8:
    case 6:
    case 5:
    case 4:
      $l[1] = 13;
      $l[0][2] = 17;
      $.goto = 11;
      break;

    default:
      $.goto = 17;
      break;
  }
}, 1, [[4, "2:2-4:3", $s$2], [0, null, $s$2], [0, null, $s$2], [1, null, $s$2], [1, "2:11-2:12", $s$2], [1, null, $s$2], [1, null, $s$2], [1, null, $s$2], [5, "3:4-3:11", $s$3], [3, "3:4-3:10", $s$3], [1, null, $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [4, "5:2-5:9", $s$2], [2, "5:2-5:8", $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 3, "7:0-12:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("8:2-10:3");
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0, void 0];
      $.goto = 2;
      $p = ($context.call = eff)("d");
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = $iterator($p);
      $.state = 3;

    case 3:
      $l[2] = $p;
      $.state = 4;

    case 4:
      $l = $.$ = $l.slice();
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
        $.goto = 9;
        continue;
      }

    case 7:
      $.state = 8;

    case 8:
      $l[0][2] = 15;
      $.goto = 14;
      continue;

    case 9:
      $lset($l[0], 1,
      /*i*/
      $p.value);
      $.goto = 10;
      $brk("9:4-9:11");
      $.state = 10;

    case 10:
      $.goto = 11;
      ($context.call = eff)($l[0][1]);
      $.state = 11;

    case 11:
      $l = $.$ = $l.slice();
      $.goto = 5;
      continue;

    case 12:
      $.goto = 13;
      $iterFin($l[2]);
      $.state = 13;

    case 13:
      $.goto = $l[1];
      continue;

    case 14:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 15:
      $.goto = 16;
      $brk("11:2-11:9");
      $.state = 16;

    case 16:
      $.goto = 18;
      ($context.call = eff)($l[1]);
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
    case 8:
    case 4:
      $l[0][2] = 17;
      $.goto = 14;
      break;

    case 11:
    case 10:
    case 9:
    case 7:
    case 6:
    case 5:
      $l[1] = 14;
      $l[0][2] = 17;
      $.goto = 12;
      break;

    default:
      $.goto = 17;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 13:
    case 12:
    case 8:
    case 4:
      $l[0][2] = 18;
      $.goto = 14;
      break;

    case 11:
    case 10:
    case 9:
    case 7:
    case 6:
    case 5:
      $l[1] = 14;
      $l[0][2] = 18;
      $.goto = 12;
      break;

    default:
      $.goto = 18;
      break;
  }
}, 1, [[4, "8:2-10:3", $s$4], [2, "8:16-8:24", $s$5], [0, null, $s$4], [0, null, $s$4], [1, null, $s$4], [1, "8:11-8:12", $s$4], [1, null, $s$4], [1, null, $s$4], [1, null, $s$4], [5, "9:4-9:11", $s$5], [3, "9:4-9:10", $s$5], [1, null, $s$4], [1, null, $s$4], [1, null, $s$4], [0, null, $s$4], [4, "11:2-11:9", $s$4], [2, "11:2-11:8", $s$4], [16, "12:1-12:1", $s$4], [16, "12:1-12:1", $s$4]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 4, "14:0-21:1", 0, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("15:2-19:3");
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0, void 0, void 0, void 0];
      $.goto = 2;
      $p = $iterator(some);
      $.state = 2;

    case 2:
      $l[3] = $p;
      $.state = 3;

    case 3:
      $l = $.$ = $l.slice();
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
        $.goto = 8;
        continue;
      }

    case 6:
      $.state = 7;

    case 7:
      $l[0][3] = 26;
      $.goto = 25;
      continue;

    case 8:
      $lset($l[0], 1,
      /*i*/
      $p.value);
      $.goto = 9;
      $brk("16:4-18:5");
      $.state = 9;

    case 9:
      $l = $.$ = [$l, void 0, void 0, void 0];
      $.goto = 10;
      $p = $iterator(other);
      $.state = 10;

    case 10:
      $l[2] = $p;
      $.state = 11;

    case 11:
      $l = $.$ = $l.slice();
      $.state = 12;

    case 12:
      $context.call = $l[2].next;
      $.goto = 13;
      $p = $l[2].next();
      $.state = 13;

    case 13:
      if ($p.done) {
        $.state = 14;
      } else {
        $.goto = 16;
        continue;
      }

    case 14:
      $.state = 15;

    case 15:
      $l[0][2] = 22;
      $.goto = 21;
      continue;

    case 16:
      $lset($l[0][0], 2,
      /*j*/
      $p.value);
      $.goto = 17;
      $brk("17:6-17:16");
      $.state = 17;

    case 17:
      $.goto = 18;
      ($context.call = eff)($l[0][0][1], $l[0][0][2]);
      $.state = 18;

    case 18:
      $l = $.$ = $l.slice();
      $.goto = 12;
      continue;

    case 19:
      $.goto = 20;
      $iterFin($l[2]);
      $.state = 20;

    case 20:
      $.goto = $l[1];
      continue;

    case 21:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 22:
      $l = $.$ = $l.slice();
      $.goto = 4;
      continue;

    case 23:
      $.goto = 24;
      $iterFin($l[3]);
      $.state = 24;

    case 24:
      $.goto = $l[1];
      continue;

    case 25:
      $l = $.$ = $l[0];
      $.goto = $l[3];
      continue;

    case 26:
      $.goto = 27;
      $brk("20:2-20:12");
      $.state = 27;

    case 27:
      $.goto = 29;
      ($context.call = eff)($l[1], $l[2]);
      continue;

    case 28:
      $.goto = 29;
      return $unhandled($.error);

    case 29:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 24:
    case 23:
    case 7:
    case 3:
      $l[0][3] = 28;
      $.goto = 25;
      break;

    case 22:
    case 21:
    case 8:
    case 6:
    case 5:
    case 4:
      $l[1] = 25;
      $l[0][3] = 28;
      $.goto = 23;
      break;

    case 20:
    case 19:
    case 15:
    case 11:
      $l[0][2] = 23;
      $l[0][1] = 25;
      $l[0][0][3] = 28;
      $.goto = 21;
      break;

    case 18:
    case 17:
    case 16:
    case 14:
    case 13:
    case 12:
      $l[1] = 21;
      $l[0][2] = 23;
      $l[0][1] = 25;
      $l[0][0][3] = 28;
      $.goto = 19;
      break;

    case 10:
    case 9:
      $l[0][1] = 25;
      $l[0][0][3] = 28;
      $.goto = 23;
      break;

    default:
      $.goto = 28;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 24:
    case 23:
    case 7:
    case 3:
      $l[0][3] = 29;
      $.goto = 25;
      break;

    case 22:
    case 21:
    case 10:
    case 9:
    case 8:
    case 6:
    case 5:
    case 4:
      $l[1] = 25;
      $l[0][3] = 29;
      $.goto = 23;
      break;

    case 20:
    case 19:
    case 15:
    case 11:
      $l[0][2] = 23;
      $l[0][1] = 25;
      $l[0][0][3] = 29;
      $.goto = 21;
      break;

    case 18:
    case 17:
    case 16:
    case 14:
    case 13:
    case 12:
      $l[1] = 21;
      $l[0][2] = 23;
      $l[0][1] = 25;
      $l[0][0][3] = 29;
      $.goto = 19;
      break;

    default:
      $.goto = 29;
      break;
  }
}, 1, [[4, "15:2-19:3", $s$6], [0, null, $s$6], [0, null, $s$6], [1, null, $s$6], [1, "15:11-15:12", $s$6], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [5, "16:4-18:5", $s$7], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [1, "16:13-16:14", $s$6], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [5, "17:6-17:16", $s$8], [3, "17:6-17:15", $s$8], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [0, null, $s$6], [4, "20:2-20:12", $s$6], [2, "20:2-20:11", $s$6], [16, "21:1-21:1", $s$6], [16, "21:1-21:1", $s$6]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 3, "23:0-28:1", 0, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("24:2-26:3");
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0, void 0];
      $.goto = 2;
      $p = $iterator(some);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $l = $.$ = $l.slice();
      $.state = 4;

    case 4:
      $context.call = $l[2].next;
      $.goto = 5;
      $p = $l[2].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.state = 6;
      } else {
        $.goto = 8;
        continue;
      }

    case 6:
      $.state = 7;

    case 7:
      $l[0][2] = 14;
      $.goto = 13;
      continue;

    case 8:
      $lset($l[0], 1,
      /*i*/
      $p.value);
      $.goto = 9;
      $brk("25:4-25:11");
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = eff)(1);
      $.state = 10;

    case 10:
      $l = $.$ = $l.slice();
      $.goto = 4;
      continue;

    case 11:
      $.goto = 12;
      $iterFin($l[2]);
      $.state = 12;

    case 12:
      $.goto = $l[1];
      continue;

    case 13:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 14:
      $.goto = 15;
      $brk("27:2-27:9");
      $.state = 15;

    case 15:
      $.goto = 17;
      ($context.call = eff)(2);
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
    case 7:
    case 3:
      $l[0][2] = 16;
      $.goto = 13;
      break;

    case 10:
    case 9:
    case 8:
    case 6:
    case 5:
    case 4:
      $l[1] = 13;
      $l[0][2] = 16;
      $.goto = 11;
      break;

    default:
      $.goto = 16;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 12:
    case 11:
    case 7:
    case 3:
      $l[0][2] = 17;
      $.goto = 13;
      break;

    case 10:
    case 9:
    case 8:
    case 6:
    case 5:
    case 4:
      $l[1] = 13;
      $l[0][2] = 17;
      $.goto = 11;
      break;

    default:
      $.goto = 17;
      break;
  }
}, 1, [[4, "24:2-26:3", $s$9], [0, null, $s$9], [0, null, $s$9], [1, null, $s$9], [1, "24:11-24:12", $s$9], [1, null, $s$9], [1, null, $s$9], [1, null, $s$9], [5, "25:4-25:11", $s$10], [3, "25:4-25:10", $s$10], [1, null, $s$9], [1, null, $s$9], [1, null, $s$9], [0, null, $s$9], [4, "27:2-27:9", $s$9], [2, "27:2-27:8", $s$9], [16, "28:1-28:1", $s$9], [16, "28:1-28:1", $s$9]]),
    $m$5 = $M.fun("m$5", "p", null, $m$0, [], 0, 3, "30:0-35:1", 0, function p($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("31:2-33:3");
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0, void 0];
      $.goto = 2;
      $p = $iterator(some);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $l = $.$ = $l.slice();
      $.state = 4;

    case 4:
      $context.call = $l[2].next;
      $.goto = 5;
      $p = $l[2].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.state = 6;
      } else {
        $.goto = 8;
        continue;
      }

    case 6:
      $.state = 7;

    case 7:
      $l[0][2] = 14;
      $.goto = 13;
      continue;

    case 8:
      $lset($l[0], 1,
      /*i*/
      $p.value);
      $.goto = 9;
      $brk("32:4-32:19");
      $.state = 9;

    case 9:
      $.goto = 10;
      $mcall("log", console, 1);
      $.state = 10;

    case 10:
      $l = $.$ = $l.slice();
      $.goto = 4;
      continue;

    case 11:
      $.goto = 12;
      $iterFin($l[2]);
      $.state = 12;

    case 12:
      $.goto = $l[1];
      continue;

    case 13:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 14:
      $.goto = 15;
      $brk("34:2-34:17");
      $.state = 15;

    case 15:
      $.goto = 17;
      $mcall("log", console, 2);
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
    case 7:
    case 3:
      $l[0][2] = 16;
      $.goto = 13;
      break;

    case 10:
    case 9:
    case 8:
    case 6:
    case 5:
    case 4:
      $l[1] = 13;
      $l[0][2] = 16;
      $.goto = 11;
      break;

    default:
      $.goto = 16;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 12:
    case 11:
    case 7:
    case 3:
      $l[0][2] = 17;
      $.goto = 13;
      break;

    case 10:
    case 9:
    case 8:
    case 6:
    case 5:
    case 4:
      $l[1] = 13;
      $l[0][2] = 17;
      $.goto = 11;
      break;

    default:
      $.goto = 17;
      break;
  }
}, 1, [[4, "31:2-33:3", $s$11], [0, null, $s$11], [0, null, $s$11], [1, null, $s$11], [1, "31:11-31:12", $s$11], [1, null, $s$11], [1, null, $s$11], [1, null, $s$11], [5, "32:4-32:19", $s$12], [3, "32:4-32:18", $s$12], [1, null, $s$11], [1, null, $s$11], [1, null, $s$11], [0, null, $s$11], [4, "34:2-34:17", $s$11], [2, "34:2-34:16", $s$11], [16, "35:1-35:1", $s$11], [16, "35:1-35:1", $s$11]]);

$M.moduleExports();