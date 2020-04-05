var $M = require("@effectful/debugger/api"),
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
    $brk = $M.brk,
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
}, $s$7, 1],
    $s$9 = [{}, $s$1, 1],
    $s$10 = [{}, $s$1, 1],
    $s$11 = [{
  e: [1, "55:11-55:12"]
}, $s$10, 1],
    $s$12 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 8, "1:0-64:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $l[5] = $m$5($);
      $l[6] = $m$6($);
      $l[7] = $m$7($);
      $.goto = 1;
      $brk("1:0-1:22");
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("profile", M, "disabled");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("2:0-2:24");
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("profile", M, "generators");
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("3:0-10:3");
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
      $brk("49:0-49:31");
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
      $brk("13:2-13:10");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld(1);

    case 2:
      $.goto = 3;
      $brk("14:2-14:10");
      $.state = 3;

    case 3:
      $.goto = 5;
      return $yld(2);

    case 4:
      $.goto = 5;
      return $unhandledG($.error);

    case 5:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "13:2-13:10", $s$2], [2, "13:2-13:9", $s$2], [4, "14:2-14:10", $s$2], [2, "14:2-14:9", $s$2], [16, "15:1-15:1", $s$2], [16, "15:1-15:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 2, "17:0-24:1", 2, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("18:2-18:10");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld(1);

    case 2:
      $.goto = 3;
      $brk("19:2-23:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("20:4-20:12");
      $.state = 4;

    case 4:
      $.goto = 5;
      return $yld(2);

    case 5:
      $.goto = 9;
      continue;

    case 6:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 7;
      $brk("22:4-22:12");
      $.state = 7;

    case 7:
      $.goto = 5;
      return $yld($l[1]);

    case 8:
      $.goto = 9;
      return $unhandledG($.error);

    case 9:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 4:
    case 3:
      $.goto = 6;
      break;

    default:
      $.goto = 8;
      break;
  }
}, null, 1, [[4, "18:2-18:10", $s$3], [2, "18:2-18:9", $s$3], [4, "19:2-23:3", $s$3], [5, "20:4-20:12", $s$3], [3, "20:4-20:11", $s$3], [0, null, $s$3], [4, "22:4-22:12", $s$4], [2, "22:4-22:11", $s$4], [16, "24:1-24:1", $s$3], [16, "24:1-24:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 4, "26:0-35:1", 2, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("27:2-27:10");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld(1);

    case 2:
      $.goto = 3;
      $brk("28:2-34:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("29:4-29:12");
      $.state = 4;

    case 4:
      $l[2] = 10;
      $.goto = 7;
      return $yld(2);

    case 5:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 6;
      $brk("31:4-31:12");
      $.state = 6;

    case 6:
      $l[2] = 10;
      $.goto = 7;
      return $yld($l[1]);

    case 7:
      $.goto = 8;
      $brk("33:4-33:14");
      $.state = 8;

    case 8:
      $.goto = 9;
      return $yld("F");

    case 9:
      $.error = $l[3];
      $.goto = $l[2];
      continue;

    case 10:
      $.goto = 12;
      continue;

    case 11:
      $.goto = 12;
      return $unhandledG($.error);

    case 12:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 4:
    case 3:
      $.goto = 5;
      break;

    case 6:
    case 5:
      $l[3] = $.error;
      $l[2] = 11;
      $.goto = 7;
      break;

    default:
      $.goto = 11;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
    case 3:
      $l[2] = 12;
      $.goto = 7;
      break;

    default:
      $.goto = 12;
      break;
  }
}, 1, [[4, "27:2-27:10", $s$5], [2, "27:2-27:9", $s$5], [4, "28:2-34:3", $s$5], [5, "29:4-29:12", $s$5], [3, "29:4-29:11", $s$5], [5, "31:4-31:12", $s$6], [3, "31:4-31:11", $s$6], [4, "33:4-33:14", $s$5], [2, "33:4-33:13", $s$5], [0, null, $s$5], [0, null, $s$5], [16, "35:1-35:1", $s$5], [16, "35:1-35:1", $s$5]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 7, "37:0-42:1", 2, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("38:2-41:3");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $iterator(s);
      $.state = 2;

    case 2:
      $l[4] = $p;
      $.state = 3;

    case 3:
      $context.call = $l[4].next;
      $.goto = 4;
      $p = $l[4].next();
      $.state = 4;

    case 4:
      if ($p.done) {
        $.state = 5;
      } else {
        $l[1] = $p.value;
        $.goto = 6;
        $brk("39:4-39:15");
        continue;
      }

    case 5:
      $.goto = 23;
      continue;

    case 6:
      $.goto = 7;
      $p = $iterator([$l[1]]);
      $.state = 7;

    case 7:
      $l[5] = $p;
      $.state = 8;

    case 8:
      $.goto = 9;
      $p = $iterNext($l[5], $l[6]);
      $.state = 9;

    case 9:
      $l[6] = $p;
      $.state = 10;

    case 10:
      if ($l[6].done) {
        $.state = 11;
      } else {
        $.goto = 13;
        return $yld($l[6].value);
      }

    case 11:
      $.goto = 12;
      $brk("40:4-40:12");
      $.state = 12;

    case 12:
      $.goto = 3;
      return $yld($l[1]);

    case 13:
      $l[6] = $p;
      $.goto = 8;
      continue;

    case 14:
      if ($l[5].throw) {
        $.state = 15;
      } else {
        $.error = $M.iterErrUndef();
        $l[3] = 20;
        $l[2] = 22;
        $.goto = 17;
        continue;
      }

    case 15:
      $.goto = 16;
      $p = $iterErr($l[5], $.error);
      $.state = 16;

    case 16:
      $l[6] = $p;
      $.goto = 10;
      continue;

    case 17:
      $.goto = 18;
      $p = $iterFin($l[5], $.result);
      $.state = 18;

    case 18:
      if ($p.done) {
        $.goto = $l[3];
        continue;
      } else {
        $.goto = 19;
        return $yld($p.value);
      }

    case 19:
      $l[6] = $p;
      $.goto = 8;
      continue;

    case 20:
      $.goto = 21;
      $iterFin($l[4]);
      $.state = 21;

    case 21:
      $.goto = $l[2];
      continue;

    case 22:
      $.goto = 23;
      return $unhandledG($.error);

    case 23:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 13:
    case 10:
      $.goto = 14;
      break;

    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
    case 12:
    case 11:
    case 7:
    case 6:
    case 4:
    case 3:
      $l[2] = 22;
      $.goto = 20;
      break;

    case 14:
    case 9:
    case 8:
      $l[3] = 20;
      $l[2] = 22;
      $.goto = 17;
      break;

    default:
      $.goto = 22;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
    case 12:
    case 11:
    case 7:
    case 6:
    case 4:
    case 3:
      $l[2] = 23;
      $.goto = 20;
      break;

    case 14:
    case 13:
    case 10:
    case 9:
    case 8:
      $l[3] = 20;
      $l[2] = 23;
      $.goto = 17;
      break;

    default:
      $.goto = 23;
      break;
  }
}, 1, [[4, "38:2-41:3", $s$7], [0, null, $s$7], [0, null, $s$7], [1, "38:13-38:14", $s$7], [5, "39:4-39:15", $s$8], [0, null, $s$7], [3, "39:4-39:14", $s$8], [1, null, $s$7], [1, "39:4-39:14", $s$7], [1, null, $s$7], [1, null, $s$7], [5, "40:4-40:12", $s$8], [3, "40:4-40:11", $s$8], [1, null, $s$7], [1, null, $s$7], [1, null, $s$7], [1, null, $s$7], [1, null, $s$7], [1, null, $s$7], [1, null, $s$7], [0, null, $s$7], [0, null, $s$7], [16, "42:1-42:1", $s$7], [16, "42:1-42:1", $s$7]]),
    $m$5 = $M.fun("m$5", "af1", null, $m$0, [], 0, 1, "44:0-47:1", 1, function af1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("45:2-45:23");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt($l[0][1]);

    case 2:
      if ($p) {
        $.goto = 6;
        $brk("45:15-45:23");
        continue;
      } else {
        $.state = 3;
      }

    case 3:
      $.goto = 4;
      $brk("46:2-46:17");
      $.state = 4;

    case 4:
      $.goto = 5;
      return $awt($l[0][3]);

    case 5:
      $.result = $p;
      $.goto = 8;
      continue;

    case 6:
      $.goto = 3;
      return $awt($l[0][2]);

    case 7:
      $.goto = 8;
      return $unhandledA($.error);

    case 8:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "45:2-45:23", $s$9], [2, "45:6-45:13", $s$9], [4, "45:15-45:23", $s$9], [4, "46:2-46:17", $s$9], [2, "46:9-46:16", $s$9], [0, null, $s$9], [2, "45:15-45:22", $s$9], [16, "47:1-47:1", $s$9], [16, "47:1-47:1", $s$9]]),
    $m$6 = $M.fun("m$6", "b2", null, $m$0, [], 0, 2, "51:0-58:1", 2, function b2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("52:2-52:10");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld(1);

    case 2:
      $.goto = 3;
      $brk("53:2-57:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("54:4-54:12");
      $.state = 4;

    case 4:
      $.goto = 5;
      return $yld(2);

    case 5:
      $.goto = 9;
      continue;

    case 6:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 7;
      $brk("56:4-56:12");
      $.state = 7;

    case 7:
      $.goto = 5;
      return $yld($l[1]);

    case 8:
      $.goto = 9;
      return $unhandledG($.error);

    case 9:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 4:
    case 3:
      $.goto = 6;
      break;

    default:
      $.goto = 8;
      break;
  }
}, null, 1, [[4, "52:2-52:10", $s$10], [2, "52:2-52:9", $s$10], [4, "53:2-57:3", $s$10], [5, "54:4-54:12", $s$10], [3, "54:4-54:11", $s$10], [0, null, $s$10], [4, "56:4-56:12", $s$11], [2, "56:4-56:11", $s$11], [16, "58:1-58:1", $s$10], [16, "58:1-58:1", $s$10]]),
    $m$7 = $M.fun("m$7", "af2", null, $m$0, [], 0, 1, "60:0-63:1", 1, function af2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("61:2-61:23");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt($l[0][1]);

    case 2:
      if ($p) {
        $.goto = 6;
        $brk("61:15-61:23");
        continue;
      } else {
        $.state = 3;
      }

    case 3:
      $.goto = 4;
      $brk("62:2-62:17");
      $.state = 4;

    case 4:
      $.goto = 5;
      return $awt($l[0][3]);

    case 5:
      $.result = $p;
      $.goto = 8;
      continue;

    case 6:
      $.goto = 3;
      return $awt($l[0][2]);

    case 7:
      $.goto = 8;
      return $unhandledA($.error);

    case 8:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "61:2-61:23", $s$12], [2, "61:6-61:13", $s$12], [4, "61:15-61:23", $s$12], [4, "62:2-62:17", $s$12], [2, "62:9-62:16", $s$12], [0, null, $s$12], [2, "61:15-61:22", $s$12], [16, "63:1-63:1", $s$12], [16, "63:1-63:1", $s$12]]);

$M.moduleExports();