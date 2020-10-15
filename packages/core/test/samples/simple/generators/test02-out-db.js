var $M = require("@effectful/debugger"),
    $iterator = $M.iterator,
    $yld = $M.yld,
    $iterErr = $M.iterErr,
    $iterFin = $M.iterFin,
    $iterNext = $M.iterNext,
    $context = $M.context,
    $ret = $M.ret,
    $retG = $M.retG,
    $unhandled = $M.unhandled,
    $unhandledG = $M.unhandledG,
    $raise = $M.raise,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a1: [1, "1:4-1:6"],
  a2: [2, "2:4-2:6"],
  a4: [3, "3:4-3:6"],
  b3: [4, "5:9-5:11"],
  top: [5, "16:9-16:12"],
  b1: [6, "45:10-45:12"],
  b2: [7, "53:10-53:12"],
  b: [8, "61:10-61:11"]
}, null, 0],
    $s$2 = [{
  a3: [1, "5:12-5:14"],
  f1: [2, "6:6-6:8"],
  f2: [3, "9:6-9:8"]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $s$4 = [{}, $s$2, 2],
    $s$5 = [{
  a1: [1, "16:13-16:15"],
  a6: [2, "16:17-16:19"],
  a2: [3, "17:6-17:8"],
  a7: [4, "18:4-18:6"],
  a3: [5, "19:4-19:6"],
  a: [6, "20:12-20:13"],
  b: [7, "38:11-38:12"]
}, $s$1, 1],
    $s$6 = [{
  a8: [1, "20:14-20:16"],
  a3: [2, "22:8-22:10"],
  a5: [3, "23:8-23:10"],
  f1: [4, "24:8-24:10"],
  f2: [5, "29:14-29:16"],
  f3: [6, "32:13-32:15"]
}, $s$5, 2],
    $s$7 = [{}, $s$6, 3],
    $s$8 = [{}, $s$6, 3],
    $s$9 = [{}, $s$6, 3],
    $s$10 = [{
  a1: [1, "38:13-38:15"]
}, $s$5, 2],
    $s$11 = [{
  a3: [1, "46:6-46:8"],
  f1: [2, "47:6-47:8"]
}, $s$1, 1],
    $s$12 = [{}, $s$11, 2],
    $s$13 = [{
  a3: [1, "54:6-54:8"],
  f1: [2, "55:6-55:8"]
}, $s$1, 1],
    $s$14 = [{}, $s$13, 2],
    $s$15 = [{
  f: [1, "62:6-62:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 9, "1:0-67:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[4] = $m$1($);
      $l[5] = $m$4($);
      $l[6] = $m$10($);
      $l[7] = $m$12($);
      $l[8] = $m$14($);
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
}, null, null, 0, [[0, "5:0-14:1", $s$1], [16, "67:0-67:0", $s$1], [16, "67:0-67:0", $s$1]]),
    $m$1 = $M.fun("m$1", "b3", null, $m$0, ["a3"], 0, 4, "5:0-14:1", 128, function b3($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $.result = $l[2];
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
}, null, null, 1, [[0, "6:6-8:3", $s$2], [16, "14:1-14:1", $s$2], [16, "14:1-14:1", $s$2]]),
    $m$2 = $M.fun("m$2", "f1", null, $m$1, [], 0, 1, "6:11-8:3", 130, function f1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld($l[0][0][1]);

    case 1:
      $l[0][1] = $p;
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandledG($.error);

    case 3:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "7:9-7:17", $s$3], [0, "7:4-7:17", $s$3], [16, "8:3-8:3", $s$3], [16, "8:3-8:3", $s$3]]),
    $m$3 = $M.fun("m$3", "f2", null, $m$1, [], 0, 1, "9:11-12:3", 130, function f2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld($l[0][0][1]);

    case 1:
      $l[0][1] = $p;
      $.goto = 2;
      return $yld($l[0][0][1]);

    case 2:
      $l[0][1] = $p;
      $.goto = 4;
      continue;

    case 3:
      $.goto = 4;
      return $unhandledG($.error);

    case 4:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "10:9-10:17", $s$4], [2, "11:9-11:17", $s$4], [0, "11:4-11:17", $s$4], [16, "12:3-12:3", $s$4], [16, "12:3-12:3", $s$4]]),
    $m$4 = $M.fun("m$4", "top", null, $m$0, ["a1", "a6"], 0, 8, "16:0-43:1", 128, function top($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[6] = $m$5($);
      $l[7] = $m$9($);
      $l[3] = 10;
      $l[4] = 11;
      $l[5] = 12;
      $.result = [$l[6], $l[7]];
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
}, null, null, 1, [[0, "20:2-37:3", $s$5], [16, "43:1-43:1", $s$5], [16, "43:1-43:1", $s$5]]),
    $m$5 = $M.fun("m$5", "a", null, $m$4, ["a8"], 0, 8, "20:2-37:3", 130, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[5] = $m$7($);
      $l[6] = $m$8($);
      $l[0][1] = $l[0][1] + 2;
      $.goto = 1;
      return $yld($l[0][1]);

    case 1:
      $l[7] = $p;
      $.goto = 2;
      return $yld($l[0][3]);

    case 2:
      $.goto = 3;
      return $yld($l[7] + $p);

    case 3:
      $l[2] = $p;
      $.goto = 4;
      return $yld($l[2]);

    case 4:
      $l[7] = $p;
      $.goto = 5;
      return $yld($l[0][0][3]);

    case 5:
      $.goto = 6;
      return $yld($l[7] + $p);

    case 6:
      $l[3] = $p;
      $l[4] = $m$6($);
      $.result = [$l[4], $l[5], $l[6]];
      $.goto = 8;
      continue;

    case 7:
      $.goto = 8;
      return $unhandledG($.error);

    case 8:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "22:20-22:28", $s$6], [2, "22:33-22:41", $s$6], [2, "22:13-22:42", $s$6], [2, "23:20-23:28", $s$6], [2, "23:33-23:41", $s$6], [2, "23:13-23:42", $s$6], [0, "23:8-23:42", $s$6], [16, "37:3-37:3", $s$6], [16, "37:3-37:3", $s$6]]),
    $m$6 = $M.fun("m$6", "f1", null, $m$5, [], 0, 2, "24:13-28:5", 130, function f1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[0][0][4] = $l[0][0][4] + 2;
      $l[0][1] = $l[0][1] + 3;
      $.goto = 1;
      return $yld($l[0][0][1]);

    case 1:
      $l[1] = $p;
      $.goto = 2;
      return $yld($l[0][0][3]);

    case 2:
      $.goto = 3;
      return $yld($l[1] + $p);

    case 3:
      $.result = $l[0][2] = $p;
      $.goto = 5;
      continue;

    case 4:
      $.goto = 5;
      return $unhandledG($.error);

    case 5:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[2, "27:26-27:34", $s$7], [2, "27:39-27:47", $s$7], [2, "27:19-27:48", $s$7], [0, "27:14-27:48", $s$7], [16, "28:5-28:5", $s$7], [16, "28:5-28:5", $s$7]]),
    $m$7 = $M.fun("m$7", "f2", null, $m$5, [], 0, 2, "29:4-31:5", 130, function f2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld($l[0][3]);

    case 1:
      $l[1] = $p;
      $.goto = 2;
      return $yld($l[0][0][0][3]);

    case 2:
      $.goto = 3;
      return $yld($l[1] + $p);

    case 3:
      $l[0][2] = $p;
      $.goto = 5;
      continue;

    case 4:
      $.goto = 5;
      return $unhandledG($.error);

    case 5:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[2, "30:18-30:26", $s$8], [2, "30:31-30:39", $s$8], [2, "30:11-30:40", $s$8], [0, "30:6-30:40", $s$8], [16, "31:5-31:5", $s$8], [16, "31:5-31:5", $s$8]]),
    $m$8 = $M.fun("m$8", "f3", null, $m$5, [], 0, 1, "32:4-35:5", 128, function f3($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[0][2] = 11;
      $l[0][0][2] = $l[0][0][2] + 4;
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
}, null, null, 3, [[0, "33:6-33:13", $s$9], [16, "35:5-35:5", $s$9], [16, "35:5-35:5", $s$9]]),
    $m$9 = $M.fun("m$9", "b", null, $m$4, ["a1"], 0, 2, "38:2-41:3", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $l[1] + $l[0][3];
      $l[0][2] = $l[0][2] + $l[0][5];
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
}, null, null, 2, [[0, "39:4-39:12", $s$10], [16, "41:3-41:3", $s$10], [16, "41:3-41:3", $s$10]]),
    $m$10 = $M.fun("m$10", "b1", null, $m$0, [], 0, 3, "45:0-51:1", 130, function b1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld($l[0][1]);

    case 1:
      $l[1] = $p;
      $l[2] = $m$11($);
      $.result = $l[2];
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandledG($.error);

    case 3:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "46:11-46:19", $s$11], [0, "46:6-46:19", $s$11], [16, "51:1-51:1", $s$11], [16, "51:1-51:1", $s$11]]),
    $m$11 = $M.fun("m$11", "f1", null, $m$10, [], 0, 1, "47:11-49:3", 130, function f1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld($l[0][0][1]);

    case 1:
      $.result = $l[0][1] = $p;
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandledG($.error);

    case 3:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "48:17-48:25", $s$12], [0, "48:12-48:25", $s$12], [16, "49:3-49:3", $s$12], [16, "49:3-49:3", $s$12]]),
    $m$12 = $M.fun("m$12", "b2", null, $m$0, [], 0, 3, "53:0-59:1", 130, function b2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld($l[0][1]);

    case 1:
      $l[1] = $p;
      $l[2] = $m$13($);
      $.result = $l[2];
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandledG($.error);

    case 3:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "54:11-54:19", $s$13], [0, "54:6-54:19", $s$13], [16, "59:1-59:1", $s$13], [16, "59:1-59:1", $s$13]]),
    $m$13 = $M.fun("m$13", "f1", null, $m$12, [], 0, 1, "55:11-57:3", 128, function f1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[0][1] = $l[0][0][1];
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
}, null, null, 2, [[0, "56:4-56:11", $s$14], [16, "57:3-57:3", $s$14], [16, "57:3-57:3", $s$14]]),
    $m$14 = $M.fun("m$14", "b", null, $m$0, [], 0, 11, "61:0-66:1", 130, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = $l[0][5])();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = $p)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = $iterator($p);
      $.state = 3;

    case 3:
      $l[6] = $p;
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = $iterNext($l[6], $l[7]);
      $.state = 5;

    case 5:
      $l[7] = $p;
      $.state = 6;

    case 6:
      if ($l[7].done) {
        $.state = 7;
      } else {
        $.goto = 47;
        return $yld($l[7].value);
      }

    case 7:
      $l[8] = $l[7].value;
      $l[1] = $l[8];
      $.goto = 8;
      $p = $iterator($l[1][0]);
      $.state = 8;

    case 8:
      $l[6] = $p;
      $.state = 9;

    case 9:
      $.goto = 10;
      $p = $iterNext($l[6], $l[8]);
      $.state = 10;

    case 10:
      $l[8] = $p;
      $.state = 11;

    case 11:
      if ($l[8].done) {
        $.state = 12;
      } else {
        $.goto = 39;
        return $yld($l[8].value);
      }

    case 12:
      $.goto = 13;
      $p = $iterator($l[1][1]);
      $.state = 13;

    case 13:
      $l[6] = $p;
      $.state = 14;

    case 14:
      $.goto = 15;
      $p = $iterNext($l[6], $l[9]);
      $.state = 15;

    case 15:
      $l[9] = $p;
      $.state = 16;

    case 16:
      if ($l[9].done) {
        $.state = 17;
      } else {
        $.goto = 31;
        return $yld($l[9].value);
      }

    case 17:
      $.goto = 18;
      $p = $iterator($l[1][2]);
      $.state = 18;

    case 18:
      $l[6] = $p;
      $.state = 19;

    case 19:
      $.goto = 20;
      $p = $iterNext($l[6], $l[10]);
      $.state = 20;

    case 20:
      $l[10] = $p;
      $.state = 21;

    case 21:
      if ($l[10].done) {
        $.state = 22;
      } else {
        $.goto = 23;
        return $yld($l[10].value);
      }

    case 22:
      $.goto = 56;
      continue;

    case 23:
      $l[10] = $p;
      $.goto = 19;
      continue;

    case 24:
      if ($l[6].throw) {
        $.state = 25;
      } else {
        $.error = $M.iterErrUndef();
        $l[5] = 55;
        $.goto = 28;
        continue;
      }

    case 25:
      $.goto = 26;
      $p = $iterErr($l[6], $.error);
      $.state = 26;

    case 26:
      $l[10] = $p;
      $.goto = 21;
      continue;

    case 27:
      return $raise($.error);

    case 28:
      $.goto = 29;
      $p = $iterFin($l[6], $.result);
      $.state = 29;

    case 29:
      if ($p.done) {
        $.goto = $l[5];
        continue;
      } else {
        $.goto = 30;
        return $yld($p.value);
      }

    case 30:
      $l[10] = $p;
      $.goto = 19;
      continue;

    case 31:
      $l[9] = $p;
      $.goto = 14;
      continue;

    case 32:
      if ($l[6].throw) {
        $.state = 33;
      } else {
        $.error = $M.iterErrUndef();
        $l[4] = 55;
        $.goto = 36;
        continue;
      }

    case 33:
      $.goto = 34;
      $p = $iterErr($l[6], $.error);
      $.state = 34;

    case 34:
      $l[9] = $p;
      $.goto = 16;
      continue;

    case 35:
      return $raise($.error);

    case 36:
      $.goto = 37;
      $p = $iterFin($l[6], $.result);
      $.state = 37;

    case 37:
      if ($p.done) {
        $.goto = $l[4];
        continue;
      } else {
        $.goto = 38;
        return $yld($p.value);
      }

    case 38:
      $l[9] = $p;
      $.goto = 14;
      continue;

    case 39:
      $l[8] = $p;
      $.goto = 9;
      continue;

    case 40:
      if ($l[6].throw) {
        $.state = 41;
      } else {
        $.error = $M.iterErrUndef();
        $l[3] = 55;
        $.goto = 44;
        continue;
      }

    case 41:
      $.goto = 42;
      $p = $iterErr($l[6], $.error);
      $.state = 42;

    case 42:
      $l[8] = $p;
      $.goto = 11;
      continue;

    case 43:
      return $raise($.error);

    case 44:
      $.goto = 45;
      $p = $iterFin($l[6], $.result);
      $.state = 45;

    case 45:
      if ($p.done) {
        $.goto = $l[3];
        continue;
      } else {
        $.goto = 46;
        return $yld($p.value);
      }

    case 46:
      $l[8] = $p;
      $.goto = 9;
      continue;

    case 47:
      $l[7] = $p;
      $.goto = 4;
      continue;

    case 48:
      if ($l[6].throw) {
        $.state = 49;
      } else {
        $.error = $M.iterErrUndef();
        $l[2] = 55;
        $.goto = 52;
        continue;
      }

    case 49:
      $.goto = 50;
      $p = $iterErr($l[6], $.error);
      $.state = 50;

    case 50:
      $l[7] = $p;
      $.goto = 6;
      continue;

    case 51:
      return $raise($.error);

    case 52:
      $.goto = 53;
      $p = $iterFin($l[6], $.result);
      $.state = 53;

    case 53:
      if ($p.done) {
        $.goto = $l[2];
        continue;
      } else {
        $.goto = 54;
        return $yld($p.value);
      }

    case 54:
      $l[7] = $p;
      $.goto = 4;
      continue;

    case 55:
      $.goto = 56;
      return $unhandledG($.error);

    case 56:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 48:
    case 5:
    case 4:
      $.goto = 52;
      $l[2] = 51;
      break;

    case 40:
    case 10:
    case 9:
      $.goto = 44;
      $l[3] = 43;
      break;

    case 32:
    case 15:
    case 14:
      $.goto = 36;
      $l[4] = 35;
      break;

    case 24:
    case 20:
    case 19:
      $.goto = 28;
      $l[5] = 27;
      break;

    case 47:
    case 6:
      $.goto = 48;
      break;

    case 39:
    case 11:
      $.goto = 40;
      break;

    case 31:
    case 16:
      $.goto = 32;
      break;

    case 23:
    case 21:
      $.goto = 24;
      break;

    default:
      $.goto = 55;
  }
}, function ($, $l) {
  switch ($.state) {
    case 48:
    case 47:
    case 6:
    case 5:
    case 4:
      $l[2] = 56;
      $.goto = 52;
      break;

    case 40:
    case 39:
    case 11:
    case 10:
    case 9:
      $l[3] = 56;
      $.goto = 44;
      break;

    case 32:
    case 31:
    case 16:
    case 15:
    case 14:
      $l[4] = 56;
      $.goto = 36;
      break;

    case 24:
    case 23:
    case 21:
    case 20:
    case 19:
      $l[5] = 56;
      $.goto = 28;
      break;

    default:
      $.goto = 56;
      break;
  }
}, 1, [[2, "62:17-62:22", $s$15], [2, "62:17-62:24", $s$15], [2, "62:10-62:24", $s$15], [0, null, $s$15], [2, "62:10-62:24", $s$15], [0, null, $s$15], [2, "62:10-62:24", $s$15], [2, "63:2-63:13", $s$15], [0, null, $s$15], [2, "63:2-63:13", $s$15], [0, null, $s$15], [2, "63:2-63:13", $s$15], [2, "64:2-64:13", $s$15], [0, null, $s$15], [2, "64:2-64:13", $s$15], [0, null, $s$15], [2, "64:2-64:13", $s$15], [2, "65:2-65:13", $s$15], [0, null, $s$15], [2, "65:2-65:13", $s$15], [0, null, $s$15], [2, "65:2-65:13", $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [2, "65:2-65:13", $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [2, "64:2-64:13", $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [2, "63:2-63:13", $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [0, null, $s$15], [2, "62:10-62:24", $s$15], [0, null, $s$15], [16, "66:1-66:1", $s$15], [16, "66:1-66:1", $s$15]]);

$M.moduleExports();