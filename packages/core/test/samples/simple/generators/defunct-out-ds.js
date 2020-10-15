var $M = require("@effectful/debugger"),
    $iterator = $M.iterator,
    $yld = $M.yld,
    $awt = $M.awt,
    $iterErr = $M.iterErr,
    $iterFin = $M.iterFin,
    $iterNext = $M.iterNext,
    $context = $M.context,
    $ret = $M.ret,
    $retA = $M.retA,
    $retG = $M.retG,
    $unhandled = $M.unhandled,
    $unhandledA = $M.unhandledA,
    $unhandledG = $M.unhandledG,
    $raise = $M.raise,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "12:10-12:11"],
  b: [2, "17:10-17:11"],
  c: [3, "26:10-26:11"],
  d: [4, "37:10-37:11"],
  af1: [5, "44:15-44:18"],
  b2: [6, "51:10-51:12"],
  af2: [7, "60:15-60:18"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $s$4 = [{
  e: [1, "21:11-21:12"]
}, $s$3, 1],
    $s$5 = [{}, $s$1, 1],
    $s$6 = [{
  e: [1, "30:11-30:12"]
}, $s$5, 1],
    $s$7 = [{}, $s$1, 1],
    $s$8 = [{
  i: [1, "38:13-38:14"]
}, $s$7, 2],
    $s$9 = [{}, $s$1, 1],
    $s$10 = [{}, $s$1, 1],
    $s$11 = [{
  e: [1, "55:11-55:12"]
}, $s$10, 1],
    $s$12 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 8, "1:0-64:0", 32, function file_js($, $l, $p) {
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
      /*af1*/
      $m$5($));
      $lset($l, 6,
      /*b2*/
      $m$6($));
      $lset($l, 7,
      /*af2*/
      $m$7($));
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("profile", M, "disabled");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("profile", M, "generators");
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("option", M, {
        defunct: true,
        state: false,
        contextState: true,
        markRepeat: false,
        inlineContAssign: true,
        storeCont: "$cont"
      });
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 9;
      $mcall("option", M, {
        tailCalls: false
      });
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "1:0-1:22", $s$1], [2, "1:0-1:21", $s$1], [4, "2:0-2:24", $s$1], [2, "2:0-2:23", $s$1], [4, "3:0-10:3", $s$1], [2, "3:0-10:2", $s$1], [4, "49:0-49:31", $s$1], [2, "49:0-49:30", $s$1], [16, "64:0-64:0", $s$1], [16, "64:0-64:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "12:0-15:1", 2, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld(1);

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      return $yld(2);

    case 4:
      $.goto = 6;
      $brk();
      continue;

    case 5:
      $.goto = 6;
      return $unhandledG($.error);

    case 6:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "13:2-13:10", $s$2], [2, "13:2-13:9", $s$2], [4, "14:2-14:10", $s$2], [2, "14:2-14:9", $s$2], [36, "15:1-15:1", $s$2], [16, "15:1-15:1", $s$2], [16, "15:1-15:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 2, "17:0-24:1", 2, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld(1);

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
      return $yld(2);

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 11;
      $brk();
      continue;

    case 7:
      $lset($l, 1,
      /*e*/
      $.error);
      $.error = void 0;
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      return $yld($l[1]);

    case 9:
      $.goto = 6;
      $brk();
      continue;

    case 10:
      $.goto = 11;
      return $unhandledG($.error);

    case 11:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 5:
    case 4:
    case 3:
      $.goto = 7;
      break;

    default:
      $.goto = 10;
  }
}, null, 1, [[4, "18:2-18:10", $s$3], [2, "18:2-18:9", $s$3], [4, "19:2-23:3", $s$3], [5, "20:4-20:12", $s$3], [3, "20:4-20:11", $s$3], [37, "21:3-21:3", $s$3], [36, "24:1-24:1", $s$3], [4, "22:4-22:12", $s$4], [2, "22:4-22:11", $s$4], [36, "23:3-23:3", $s$3], [16, "24:1-24:1", $s$3], [16, "24:1-24:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 4, "26:0-35:1", 2, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld(1);

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
      return $yld(2);

    case 5:
      $l[2] = 14;
      $.goto = 10;
      $brk();
      continue;

    case 6:
      $lset($l, 1,
      /*e*/
      $.error);
      $.error = void 0;
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      return $yld($l[1]);

    case 8:
      $l[2] = 14;
      $.goto = 10;
      $brk();
      continue;

    case 9:
      return $raise($l[3]);

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      return $yld("F");

    case 12:
      $.goto = 13;
      $brk();
      $.state = 13;

    case 13:
      $.goto = $l[2];
      continue;

    case 14:
      $.goto = 16;
      $brk();
      continue;

    case 15:
      $.goto = 16;
      return $unhandledG($.error);

    case 16:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 8:
    case 7:
    case 6:
      $.goto = 10;
      $l[2] = 9;
      $l[3] = $.error;
      break;

    case 5:
    case 4:
    case 3:
      $.goto = 6;
      break;

    default:
      $.goto = 15;
  }
}, function ($, $l) {
  switch ($.state) {
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
      $l[2] = 16;
      $.goto = 10;
      break;

    default:
      $.goto = 16;
      break;
  }
}, 1, [[4, "27:2-27:10", $s$5], [2, "27:2-27:9", $s$5], [4, "28:2-34:3", $s$5], [5, "29:4-29:12", $s$5], [3, "29:4-29:11", $s$5], [37, "30:3-30:3", $s$5], [4, "31:4-31:12", $s$6], [2, "31:4-31:11", $s$6], [36, "32:3-32:3", $s$5], [0, null, $s$5], [4, "33:4-33:14", $s$5], [2, "33:4-33:13", $s$5], [36, "34:3-34:3", $s$5], [0, null, $s$5], [36, "35:1-35:1", $s$5], [16, "35:1-35:1", $s$5], [16, "35:1-35:1", $s$5]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 2, "37:0-42:1", 2, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0];
      $.goto = 2;
      $p = $iterator(s);
      $.state = 2;

    case 2:
      $l[4] = $p;
      $.state = 3;

    case 3:
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $context.call = $l[4].next;
      $.goto = 6;
      $p = $l[4].next();
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
      $l[0][1] = 36;
      $.goto = 35;
      continue;

    case 9:
      $lset($l, 1,
      /*i*/
      $p.value);
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      $p = $iterator([$l[1]]);
      $.state = 11;

    case 11:
      $l[5] = $p;
      $.state = 12;

    case 12:
      $.goto = 13;
      $p = $iterNext($l[5], $l[7]);
      $.state = 13;

    case 13:
      $l[6] = $p;
      $.state = 14;

    case 14:
      if ($l[6].done) {
        $.state = 15;
      } else {
        $.goto = 19;
        continue;
      }

    case 15:
      $.goto = 16;
      $brk();
      $.state = 16;

    case 16:
      $.goto = 17;
      return $yld($l[1]);

    case 17:
      $.goto = 18;
      $brk();
      $.state = 18;

    case 18:
      $l = $.$ = [$l[0], void 0, void 0, void 0, $l[4], void 0, void 0, void 0, void 0, void 0, void 0];
      $.goto = 4;
      continue;

    case 19:
      $.goto = 20;
      return $yld($l[6].value);

    case 20:
      $l[7] = $p;
      $.goto = 12;
      continue;

    case 21:
      if ($l[5].throw) {
        $.state = 22;
      } else {
        $.goto = 24;
        continue;
      }

    case 22:
      $.goto = 23;
      $p = $iterErr($l[5], $.error);
      $.state = 23;

    case 23:
      $l[6] = $p;
      $.goto = 14;
      continue;

    case 24:
      $.error = $M.iterErrUndef();
      $l[3] = 32;
      $l[2] = 35;
      $l[0][1] = 37;
      $.goto = 26;
      continue;

    case 25:
      return $raise($.error);

    case 26:
      $.goto = 27;
      $p = $iterFin($l[5], $.result);
      $.state = 27;

    case 27:
      if ($p.done) {
        $.state = 28;
      } else {
        $.goto = 29;
        continue;
      }

    case 28:
      $.goto = $l[3];
      continue;

    case 29:
      $.goto = 30;
      return $yld($p.value);

    case 30:
      $l[7] = $p;
      $.goto = 12;
      continue;

    case 31:
      return $raise($.error);

    case 32:
      $.goto = 33;
      $iterFin($l[4]);
      $.state = 33;

    case 33:
      $.goto = $l[2];
      continue;

    case 34:
      return $raise($.error);

    case 35:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 36:
      $.goto = 38;
      $brk();
      continue;

    case 37:
      $.goto = 38;
      return $unhandledG($.error);

    case 38:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 33:
    case 32:
    case 31:
    case 8:
    case 3:
      $.goto = 35;
      $l[0][1] = 34;
      break;

    case 30:
    case 29:
    case 28:
    case 27:
    case 26:
    case 25:
    case 23:
    case 22:
    case 18:
    case 17:
    case 16:
    case 15:
    case 11:
    case 10:
    case 9:
    case 7:
    case 6:
    case 5:
    case 4:
      $.goto = 32;
      $l[2] = 31;
      break;

    case 24:
    case 21:
    case 13:
    case 12:
      $.goto = 26;
      $l[3] = 25;
      break;

    case 20:
    case 19:
    case 14:
      $.goto = 21;
      break;

    default:
      $.goto = 37;
  }
}, function ($, $l) {
  switch ($.state) {
    case 33:
    case 32:
    case 31:
    case 8:
    case 3:
      $l[0][1] = 38;
      $.goto = 35;
      break;

    case 30:
    case 29:
    case 28:
    case 27:
    case 26:
    case 25:
    case 23:
    case 22:
    case 18:
    case 17:
    case 16:
    case 15:
    case 11:
    case 10:
    case 9:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[2] = 35;
      $l[0][1] = 38;
      $.goto = 32;
      break;

    case 24:
    case 21:
    case 20:
    case 19:
    case 14:
    case 13:
    case 12:
      $l[3] = 32;
      $l[2] = 35;
      $l[0][1] = 38;
      $.goto = 26;
      break;

    default:
      $.goto = 38;
      break;
  }
}, 1, [[4, "38:2-41:3", $s$7], [2, "38:18-38:19", $s$8], [0, null, $s$8], [0, null, $s$8], [4, "38:13-38:14", $s$8], [2, "38:18-38:19", $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [4, "39:4-39:15", $s$8], [2, "39:4-39:14", $s$8], [0, null, $s$8], [2, "39:4-39:14", $s$8], [0, null, $s$8], [0, null, $s$8], [4, "40:4-40:12", $s$8], [2, "40:4-40:11", $s$8], [36, "41:3-41:3", $s$8], [0, null, $s$8], [2, "39:4-39:14", $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [2, "39:4-39:14", $s$8], [0, null, $s$8], [0, null, $s$8], [2, "38:18-38:19", $s$8], [0, null, $s$8], [0, null, $s$7], [0, null, $s$7], [36, "42:1-42:1", $s$7], [16, "42:1-42:1", $s$7], [16, "42:1-42:1", $s$7]]),
    $m$5 = $M.fun("m$5", "af1", null, $m$0, [], 0, 1, "44:0-47:1", 1, function af1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt($l[0][1]);

    case 2:
      if ($p) {
        $.state = 3;
      } else {
        $.goto = 5;
        continue;
      }

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      return $awt($l[0][2]);

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      return $awt($l[0][3]);

    case 7:
      $.result = $p;
      $.goto = 9;
      continue;

    case 8:
      $.goto = 9;
      return $unhandledA($.error);

    case 9:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "45:2-45:23", $s$9], [2, "45:6-45:13", $s$9], [0, null, $s$9], [4, "45:15-45:23", $s$9], [2, "45:15-45:22", $s$9], [4, "46:2-46:17", $s$9], [2, "46:9-46:16", $s$9], [0, null, $s$9], [16, "47:1-47:1", $s$9], [16, "47:1-47:1", $s$9]]),
    $m$6 = $M.fun("m$6", "b2", null, $m$0, [], 0, 2, "51:0-58:1", 2, function b2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld(1);

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
      return $yld(2);

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 11;
      $brk();
      continue;

    case 7:
      $lset($l, 1,
      /*e*/
      $.error);
      $.error = void 0;
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      return $yld($l[1]);

    case 9:
      $.goto = 6;
      $brk();
      continue;

    case 10:
      $.goto = 11;
      return $unhandledG($.error);

    case 11:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 5:
    case 4:
    case 3:
      $.goto = 7;
      break;

    default:
      $.goto = 10;
  }
}, null, 1, [[4, "52:2-52:10", $s$10], [2, "52:2-52:9", $s$10], [4, "53:2-57:3", $s$10], [5, "54:4-54:12", $s$10], [3, "54:4-54:11", $s$10], [37, "55:3-55:3", $s$10], [36, "58:1-58:1", $s$10], [4, "56:4-56:12", $s$11], [2, "56:4-56:11", $s$11], [36, "57:3-57:3", $s$10], [16, "58:1-58:1", $s$10], [16, "58:1-58:1", $s$10]]),
    $m$7 = $M.fun("m$7", "af2", null, $m$0, [], 0, 1, "60:0-63:1", 1, function af2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt($l[0][1]);

    case 2:
      if ($p) {
        $.state = 3;
      } else {
        $.goto = 5;
        continue;
      }

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      return $awt($l[0][2]);

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      return $awt($l[0][3]);

    case 7:
      $.result = $p;
      $.goto = 9;
      continue;

    case 8:
      $.goto = 9;
      return $unhandledA($.error);

    case 9:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "61:2-61:23", $s$12], [2, "61:6-61:13", $s$12], [0, null, $s$12], [4, "61:15-61:23", $s$12], [2, "61:15-61:22", $s$12], [4, "62:2-62:17", $s$12], [2, "62:9-62:16", $s$12], [0, null, $s$12], [16, "63:1-63:1", $s$12], [16, "63:1-63:1", $s$12]]);

$M.moduleExports();