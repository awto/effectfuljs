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
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  d: [1, "3:10-3:11"],
  a4: [2, "14:10-14:12"],
  a5: [3, "29:10-29:12"],
  cfb1: [4, "33:10-33:14"],
  c: [5, "50:10-50:11"],
  v: [6, "54:6-54:7"],
  obj: [7, "56:6-56:9"],
  A: [8, "68:6-68:7"]
}, null, 0],
    $s$2 = [{
  i: [1, "3:12-3:13"],
  j: [2, "4:6-4:7"]
}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $s$4 = [{
  e: [1, "19:11-19:12"]
}, $s$3, 1],
    $s$5 = [{}, $s$1, 1],
    $s$6 = [{
  i: [1, "30:13-30:14"]
}, $s$5, 1],
    $s$7 = [{}, $s$1, 1],
    $s$8 = [{
  i: [1, "34:11-34:12"]
}, $s$7, 1],
    $s$9 = [{
  e: [2, "43:13-43:14"]
}, $s$8, 1],
    $s$10 = [{}, $s$1, 1],
    $s$11 = [{
  v: [1, "54:16-54:17"]
}, $s$1, 1],
    $s$12 = [{}, $s$1, 1],
    $s$13 = [{
  a: [1, "60:21-60:22"]
}, $s$1, 1],
    $s$14 = [{
  a: [1, "63:11-63:12"],
  b: [2, "63:14-63:15"]
}, $s$1, 1],
    $s$15 = [{
  A: [1, null],
  _proto: [2, null]
}, $s$1, 1],
    $s$16 = [{}, $s$15, 2],
    $s$17 = [{
  b: [1, "69:17-69:18"]
}, $s$15, 2],
    $s$18 = [{
  a: [1, "72:10-72:11"]
}, $s$15, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 9, "1:0-76:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $l[5] = $m$5($);
      $.goto = 1;
      $mcall("profile", M, "es");
      $.state = 1;

    case 1:
      $l[6] = $m$6($);
      $l[7] = {
        a1: $m$7($),
        a2: $m$8($),
        a3: $m$9($)
      };
      $.goto = 2;
      $p = /*#__PURE__*/($context.call = $m$10($))();
      $.state = 2;

    case 2:
      $l[8] = $p;
      $.goto = 4;
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[2, "1:0-1:15", $s$1], [2, null, $s$1], [0, null, $s$1], [16, "76:0-76:0", $s$1], [16, "76:0-76:0", $s$1]]),
    $m$1 = $M.fun("m$1", "d", null, $m$0, ["i"], 1, 8, "3:0-12:1", 130, function d($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = 0;
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 1;
      return $yld($1);

    case 1:
      $1 = $l[2];
      $l[2] = $1 + 1;
      $.goto = 2;
      return $yld($1);

    case 2:
      $.goto = 3;
      $p = ($context.call = some)($l[1] = $l[1] + 2, $l[2]);
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = $iterator($p + $l[2]);
      $.state = 4;

    case 4:
      $l[5] = $p;
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = $iterNext($l[5], $l[6]);
      $.state = 6;

    case 6:
      $l[6] = $p;
      $.state = 7;

    case 7:
      if ($l[6].done) {
        $.state = 8;
      } else {
        $.goto = 24;
        return $yld($l[6].value);
      }

    case 8:
      $l[7] = $l[6].value;
      $.goto = 9;
      return $yld($l[7]);

    case 9:
      if ($p) {
        $.goto = 11;
        $p = $iterator($l[1] = $l[1] + 3);
        continue;
      } else {
        if ($l[2]) {
          $.result = $l[1];
          $.goto = 33;
          continue;
        } else {
          $.state = 10;
        }
      }

    case 10:
      $.goto = 33;
      return $yld(2);

    case 11:
      $l[5] = $p;
      $.state = 12;

    case 12:
      $.goto = 13;
      $p = $iterNext($l[5], $l[7]);
      $.state = 13;

    case 13:
      $l[7] = $p;
      $.state = 14;

    case 14:
      if ($l[7].done) {
        $.state = 15;
      } else {
        $.goto = 16;
        return $yld($l[7].value);
      }

    case 15:
      $.result = $l[7].value;
      $.goto = 33;
      continue;

    case 16:
      $l[7] = $p;
      $.goto = 12;
      continue;

    case 17:
      if ($l[5].throw) {
        $.state = 18;
      } else {
        $.error = $M.iterErrUndef();
        $l[4] = 32;
        $.goto = 21;
        continue;
      }

    case 18:
      $.goto = 19;
      $p = $iterErr($l[5], $.error);
      $.state = 19;

    case 19:
      $l[7] = $p;
      $.goto = 14;
      continue;

    case 20:
      return $raise($.error);

    case 21:
      $.goto = 22;
      $p = $iterFin($l[5], $.result);
      $.state = 22;

    case 22:
      if ($p.done) {
        $.goto = $l[4];
        continue;
      } else {
        $.goto = 23;
        return $yld($p.value);
      }

    case 23:
      $l[7] = $p;
      $.goto = 12;
      continue;

    case 24:
      $l[6] = $p;
      $.goto = 5;
      continue;

    case 25:
      if ($l[5].throw) {
        $.state = 26;
      } else {
        $.error = $M.iterErrUndef();
        $l[3] = 32;
        $.goto = 29;
        continue;
      }

    case 26:
      $.goto = 27;
      $p = $iterErr($l[5], $.error);
      $.state = 27;

    case 27:
      $l[6] = $p;
      $.goto = 7;
      continue;

    case 28:
      return $raise($.error);

    case 29:
      $.goto = 30;
      $p = $iterFin($l[5], $.result);
      $.state = 30;

    case 30:
      if ($p.done) {
        $.goto = $l[3];
        continue;
      } else {
        $.goto = 31;
        return $yld($p.value);
      }

    case 31:
      $l[6] = $p;
      $.goto = 5;
      continue;

    case 32:
      $.goto = 33;
      return $unhandledG($.error);

    case 33:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 25:
    case 6:
    case 5:
      $.goto = 29;
      $l[3] = 28;
      break;

    case 17:
    case 13:
    case 12:
      $.goto = 21;
      $l[4] = 20;
      break;

    case 24:
    case 7:
      $.goto = 25;
      break;

    case 16:
    case 14:
      $.goto = 17;
      break;

    default:
      $.goto = 32;
  }
}, function ($, $l) {
  switch ($.state) {
    case 25:
    case 24:
    case 7:
    case 6:
    case 5:
      $l[3] = 33;
      $.goto = 29;
      break;

    case 17:
    case 16:
    case 14:
    case 13:
    case 12:
      $l[4] = 33;
      $.goto = 21;
      break;

    default:
      $.goto = 33;
      break;
  }
}, 1, [[2, "5:9-5:18", $s$2], [2, "5:2-5:24", $s$2], [2, "6:19-6:36", $s$2], [2, "6:12-6:40", $s$2], [0, null, $s$2], [2, "6:12-6:40", $s$2], [0, null, $s$2], [2, "6:12-6:40", $s$2], [2, "6:6-6:40", $s$2], [2, "7:11-7:26", $s$2], [2, "11:2-11:9", $s$2], [0, null, $s$2], [2, "7:11-7:26", $s$2], [0, null, $s$2], [2, "7:11-7:26", $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [2, "7:11-7:26", $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [2, "6:12-6:40", $s$2], [0, null, $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]),
    $m$2 = $M.fun("m$2", "a4", null, $m$0, [], 0, 8, "14:0-27:1", 130, function a4($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld(1);

    case 1:
      $.goto = 2;
      return $yld(2);

    case 2:
      $l[2] = 9;
      $.goto = 6;
      return $yld(3);

    case 3:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 4;
      return $yld("excep");

    case 4:
      $l[2] = 9;
      $.goto = 6;
      return $yld($l[1]);

    case 5:
      return $raise($l[3]);

    case 6:
      $.goto = 7;
      return $yld("f");

    case 7:
      $.goto = 8;
      return $yld("e");

    case 8:
      $.goto = $l[2];
      continue;

    case 9:
      $.goto = 10;
      $p = ($context.call = a2)();
      $.state = 10;

    case 10:
      $.goto = 11;
      $p = $iterator($p);
      $.state = 11;

    case 11:
      $l[5] = $p;
      $.state = 12;

    case 12:
      $.goto = 13;
      $p = $iterNext($l[5], $l[6]);
      $.state = 13;

    case 13:
      $l[6] = $p;
      $.state = 14;

    case 14:
      if ($l[6].done) {
        $.state = 15;
      } else {
        $.goto = 16;
        return $yld($l[6].value);
      }

    case 15:
      $l[7] = $l[6].value;
      $.goto = 25;
      return $yld($l[7]);

    case 16:
      $l[6] = $p;
      $.goto = 12;
      continue;

    case 17:
      if ($l[5].throw) {
        $.state = 18;
      } else {
        $.error = $M.iterErrUndef();
        $l[4] = 24;
        $.goto = 21;
        continue;
      }

    case 18:
      $.goto = 19;
      $p = $iterErr($l[5], $.error);
      $.state = 19;

    case 19:
      $l[6] = $p;
      $.goto = 14;
      continue;

    case 20:
      return $raise($.error);

    case 21:
      $.goto = 22;
      $p = $iterFin($l[5], $.result);
      $.state = 22;

    case 22:
      if ($p.done) {
        $.goto = $l[4];
        continue;
      } else {
        $.goto = 23;
        return $yld($p.value);
      }

    case 23:
      $l[6] = $p;
      $.goto = 12;
      continue;

    case 24:
      $.goto = 25;
      return $unhandledG($.error);

    case 25:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 17:
    case 13:
    case 12:
      $.goto = 21;
      $l[4] = 20;
      break;

    case 4:
    case 3:
      $.goto = 6;
      $l[2] = 5;
      $l[3] = $.error;
      break;

    case 16:
    case 14:
      $.goto = 17;
      break;

    case 2:
    case 1:
      $.goto = 3;
      break;

    default:
      $.goto = 24;
  }
}, function ($, $l) {
  switch ($.state) {
    case 4:
    case 3:
    case 2:
    case 1:
      $l[2] = 25;
      $.goto = 6;
      break;

    case 17:
    case 16:
    case 14:
    case 13:
    case 12:
      $l[4] = 25;
      $.goto = 21;
      break;

    default:
      $.goto = 25;
      break;
  }
}, 1, [[2, "15:2-15:9", $s$3], [3, "17:4-17:11", $s$3], [3, "18:4-18:11", $s$3], [2, "20:4-20:17", $s$4], [2, "21:4-21:11", $s$4], [0, null, $s$3], [2, "23:4-23:13", $s$3], [2, "24:4-24:13", $s$3], [0, null, $s$3], [2, "26:15-26:19", $s$3], [2, "26:8-26:19", $s$3], [0, null, $s$3], [2, "26:8-26:19", $s$3], [0, null, $s$3], [2, "26:8-26:19", $s$3], [2, "26:2-26:19", $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [2, "26:8-26:19", $s$3], [0, null, $s$3], [16, "27:1-27:1", $s$3], [16, "27:1-27:1", $s$3]]),
    $m$3 = $M.fun("m$3", "a5", null, $m$0, [], 0, 4, "29:0-31:1", 130, function a5($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = $l[0][2])();
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
        return $yld($l[1]);
      }

    case 5:
      $.goto = 10;
      continue;

    case 6:
      return $raise($.error);

    case 7:
      $.goto = 8;
      $iterFin($l[3]);
      $.state = 8;

    case 8:
      $.goto = $l[2];
      continue;

    case 9:
      $.goto = 10;
      return $unhandledG($.error);

    case 10:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 4:
    case 3:
      $.goto = 7;
      $l[2] = 6;
      break;

    default:
      $.goto = 9;
  }
}, function ($, $l) {
  switch ($.state) {
    case 4:
    case 3:
      $l[2] = 10;
      $.goto = 7;
      break;

    default:
      $.goto = 10;
      break;
  }
}, 1, [[2, "30:18-30:22", $s$6], [2, "30:18-30:22", $s$6], [0, null, $s$5], [2, "30:18-30:22", $s$6], [2, "30:24-30:31", $s$6], [0, null, $s$5], [0, null, $s$5], [2, "30:18-30:22", $s$6], [0, null, $s$5], [16, "31:1-31:1", $s$5], [16, "31:1-31:1", $s$5]]),
    $m$4 = $M.fun("m$4", "cfb1", null, $m$0, [], 1, 5, "33:0-49:1", 130, function cfb1($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = 0;
      $.state = 1;

    case 1:
      $.state = 2;

    case 2:
      $.state = 3;

    case 3:
      $.goto = 4;
      return $yld($l[1] === 3);

    case 4:
      if ($p) {
        $1 = $l[1];
        $l[1] = $1 + 1;
        $.goto = 6;
        $p = new ($context.call = Error)(`AAAAAAAAA${$1}`);
        continue;
      } else {
        $.state = 5;
      }

    case 5:
      $l[3] = 10;
      $.goto = 8;
      return $yld(`a${$l[1]}`);

    case 6:
      $.goto = 5;
      return $raise($p);

    case 7:
      return $raise($l[4]);

    case 8:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 9;
      return $yld(`f1${$1}`);

    case 9:
      $.goto = $l[3];
      continue;

    case 10:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 11;
      return $yld(`b${$1}`);

    case 11:
      $l[1] = $l[1] + 1;
      $.goto = 1;
      continue;

    case 12:
      $l[2] = $.error;
      $.error = void 0;
      $.goto = 13;
      return $yld(`e${$l[1]}`);

    case 13:
      $.goto = 14;
      return $yld($l[2]);

    case 14:
      $.result = $l[1];
      $.goto = 16;
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
    case 6:
    case 5:
    case 4:
    case 3:
      $.goto = 8;
      $l[3] = 7;
      $l[4] = $.error;
      break;

    case 10:
    case 9:
    case 8:
    case 7:
    case 2:
      $.goto = 12;
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
      $l[3] = 16;
      $.goto = 8;
      break;

    default:
      $.goto = 16;
      break;
  }
}, 1, [[0, "34:11-34:16", $s$8], [0, null, $s$7], [1, null, $s$7], [3, "37:12-37:25", $s$8], [3, "37:33-37:61", $s$8], [3, "38:8-38:21", $s$8], [1, "37:27-37:62", $s$8], [1, null, $s$7], [3, "40:8-40:24", $s$8], [1, null, $s$7], [3, "42:6-42:21", $s$8], [0, "34:20-34:23", $s$8], [2, "44:6-44:19", $s$9], [2, "45:6-45:13", $s$9], [0, null, $s$7], [16, "49:1-49:1", $s$7], [16, "49:1-49:1", $s$7]]),
    $m$5 = $M.fun("m$5", "c", null, $m$0, [], 0, 1, "50:0-52:1", 130, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      return $yld(1);

    case 1:
      $.goto = 2;
      return $unhandledG($.error);

    case 2:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "51:2-51:9", $s$10], [16, "52:1-52:1", $s$10], [16, "52:1-52:1", $s$10]]),
    $m$6 = $M.fun("m$6", null, null, $m$0, ["v"], 0, 2, "54:10-54:28", 133, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $awt($l[1]);

    case 1:
      $.result = $p;
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandledA($.error);

    case 3:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "54:21-54:28", $s$11], [0, null, $s$11], [16, "54:28-54:28", $s$11], [16, "54:28-54:28", $s$11]]),
    $m$7 = $M.fun("m$7", null, null, $m$0, [], 0, 1, "57:6-59:3", 130, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      return $yld(1);

    case 1:
      $.goto = 2;
      return $unhandledG($.error);

    case 2:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "58:4-58:11", $s$12], [16, "59:3-59:3", $s$12], [16, "59:3-59:3", $s$12]]),
    $m$8 = $M.fun("m$8", null, null, $m$0, ["a"], 0, 2, "60:6-62:3", 129, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      return $awt($l[1]);

    case 1:
      $.goto = 2;
      return $unhandledA($.error);

    case 2:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "61:4-61:11", $s$13], [16, "62:3-62:3", $s$13], [16, "62:3-62:3", $s$13]]),
    $m$9 = $M.fun("m$9", null, null, $m$0, ["a", "b"], 0, 3, "63:11-65:15", 129, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      return $awt($l[1]);

    case 1:
      $.goto = 2;
      return $unhandledA($.error);

    case 2:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "64:4-64:11", $s$14], [16, "65:15-65:15", $s$14], [16, "65:15-65:15", $s$14]]),
    $m$10 = $M.fun("m$10", null, null, $m$0, [], 0, 3, "69:2-74:16", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$11($);
      $l[1].a = $m$12($);
      $l[2] = $l[1].prototype;
      $l[2].b = $m$13($);
      $.result = $l[1];
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
}, null, null, 1, [[0, null, $s$15], [16, "74:16-74:16", $s$15], [16, "74:16-74:16", $s$15]]),
    $m$11 = $M.fun("m$11", "A", null, $m$10, [], 0, 1, null, 128, function A($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
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
}, null, null, 2, [[0, null, $s$16], [16, null, $s$16], [16, null, $s$16]]),
    $m$12 = $M.fun("m$12", "a", null, $m$10, ["b"], 0, 2, "69:2-71:3", 129, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      return $awt($l[1]);

    case 1:
      $.goto = 2;
      return $unhandledA($.error);

    case 2:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "70:4-70:11", $s$17], [16, "71:3-71:3", $s$17], [16, "71:3-71:3", $s$17]]),
    $m$13 = $M.fun("m$13", "b", null, $m$10, ["a"], 0, 2, "72:2-74:3", 129, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      return $awt($l[1]);

    case 1:
      $.goto = 2;
      return $unhandledA($.error);

    case 2:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "73:4-73:11", $s$18], [16, "74:3-74:3", $s$18], [16, "74:3-74:3", $s$18]]);

$M.moduleExports();