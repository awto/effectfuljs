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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 8, "1:0-64:0", 160, function file_js($, $l, $p) {
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
      $mcall("profile", M, "disabled");
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("profile", M, "generators");
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("option", M, {
        defunct: true,
        state: false,
        contextState: true,
        markRepeat: false,
        inlineContAssign: true,
        storeCont: "$cont"
      });
      $.state = 3;

    case 3:
      $.goto = 5;
      $mcall("option", M, {
        tailCalls: false
      });
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[2, "1:0-1:21", $s$1], [2, "2:0-2:23", $s$1], [2, "3:0-10:2", $s$1], [2, "49:0-49:30", $s$1], [16, "64:0-64:0", $s$1], [16, "64:0-64:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "12:0-15:1", 130, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld(1);

    case 1:
      $.goto = 3;
      return $yld(2);

    case 2:
      $.goto = 3;
      return $unhandledG($.error);

    case 3:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "13:2-13:9", $s$2], [2, "14:2-14:9", $s$2], [16, "15:1-15:1", $s$2], [16, "15:1-15:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 2, "17:0-24:1", 130, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld(1);

    case 1:
      $.goto = 2;
      return $yld(2);

    case 2:
      $.goto = 5;
      continue;

    case 3:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 2;
      return $yld($l[1]);

    case 4:
      $.goto = 5;
      return $unhandledG($.error);

    case 5:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 1:
      $.goto = 3;
      break;

    default:
      $.goto = 4;
  }
}, null, 1, [[2, "18:2-18:9", $s$3], [3, "20:4-20:11", $s$3], [0, null, $s$3], [2, "22:4-22:11", $s$4], [16, "24:1-24:1", $s$3], [16, "24:1-24:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 4, "26:0-35:1", 130, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld(1);

    case 1:
      $l[2] = 6;
      $.goto = 4;
      return $yld(2);

    case 2:
      $l[1] = $.error;
      $.error = void 0;
      $l[2] = 6;
      $.goto = 4;
      return $yld($l[1]);

    case 3:
      return $raise($l[3]);

    case 4:
      $.goto = 5;
      return $yld("F");

    case 5:
      $.goto = $l[2];
      continue;

    case 6:
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
}, 1, [[2, "27:2-27:9", $s$5], [3, "29:4-29:11", $s$5], [2, "31:4-31:11", $s$6], [0, null, $s$5], [2, "33:4-33:13", $s$5], [0, null, $s$5], [0, null, $s$5], [16, "35:1-35:1", $s$5], [16, "35:1-35:1", $s$5]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 7, "37:0-42:1", 130, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $iterator(s);
      $.state = 1;

    case 1:
      $l[4] = $p;
      $.state = 2;

    case 2:
      $context.call = $l[4].next;
      $.goto = 3;
      $p = $l[4].next();
      $.state = 3;

    case 3:
      if ($p.done) {
        $.state = 4;
      } else {
        $l[1] = $p.value;
        $.goto = 5;
        $p = $iterator([$l[1]]);
        continue;
      }

    case 4:
      $.goto = 22;
      continue;

    case 5:
      $l[5] = $p;
      $.state = 6;

    case 6:
      $.goto = 7;
      $p = $iterNext($l[5], $l[6]);
      $.state = 7;

    case 7:
      $l[6] = $p;
      $.state = 8;

    case 8:
      if ($l[6].done) {
        $.state = 9;
      } else {
        $.goto = 10;
        return $yld($l[6].value);
      }

    case 9:
      $.goto = 2;
      return $yld($l[1]);

    case 10:
      $l[6] = $p;
      $.goto = 6;
      continue;

    case 11:
      if ($l[5].throw) {
        $.state = 12;
      } else {
        $.error = $M.iterErrUndef();
        $l[3] = 19;
        $l[2] = 21;
        $.goto = 15;
        continue;
      }

    case 12:
      $.goto = 13;
      $p = $iterErr($l[5], $.error);
      $.state = 13;

    case 13:
      $l[6] = $p;
      $.goto = 8;
      continue;

    case 14:
      return $raise($.error);

    case 15:
      $.goto = 16;
      $p = $iterFin($l[5], $.result);
      $.state = 16;

    case 16:
      if ($p.done) {
        $.goto = $l[3];
        continue;
      } else {
        $.goto = 17;
        return $yld($p.value);
      }

    case 17:
      $l[6] = $p;
      $.goto = 6;
      continue;

    case 18:
      return $raise($.error);

    case 19:
      $.goto = 20;
      $iterFin($l[4]);
      $.state = 20;

    case 20:
      $.goto = $l[2];
      continue;

    case 21:
      $.goto = 22;
      return $unhandledG($.error);

    case 22:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 9:
    case 5:
    case 3:
    case 2:
      $.goto = 19;
      $l[2] = 18;
      break;

    case 11:
    case 7:
    case 6:
      $.goto = 15;
      $l[3] = 14;
      break;

    case 10:
    case 8:
      $.goto = 11;
      break;

    default:
      $.goto = 21;
  }
}, function ($, $l) {
  switch ($.state) {
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 9:
    case 5:
    case 3:
    case 2:
      $l[2] = 22;
      $.goto = 19;
      break;

    case 11:
    case 10:
    case 8:
    case 7:
    case 6:
      $l[3] = 19;
      $l[2] = 22;
      $.goto = 15;
      break;

    default:
      $.goto = 22;
      break;
  }
}, 1, [[2, "38:18-38:19", $s$8], [0, null, $s$7], [2, "38:18-38:19", $s$8], [2, "39:4-39:14", $s$8], [0, null, $s$7], [0, null, $s$7], [2, "39:4-39:14", $s$8], [0, null, $s$7], [2, "39:4-39:14", $s$8], [2, "40:4-40:11", $s$8], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [2, "39:4-39:14", $s$8], [0, null, $s$7], [0, null, $s$7], [2, "38:18-38:19", $s$8], [0, null, $s$7], [16, "42:1-42:1", $s$7], [16, "42:1-42:1", $s$7]]),
    $m$5 = $M.fun("m$5", "af1", null, $m$0, [], 0, 1, "44:0-47:1", 129, function af1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $awt($l[0][1]);

    case 1:
      if ($p) {
        $.goto = 2;
        return $awt($l[0][2]);
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      return $awt($l[0][3]);

    case 3:
      $.result = $p;
      $.goto = 5;
      continue;

    case 4:
      $.goto = 5;
      return $unhandledA($.error);

    case 5:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "45:6-45:13", $s$9], [2, "45:15-45:22", $s$9], [2, "46:9-46:16", $s$9], [0, null, $s$9], [16, "47:1-47:1", $s$9], [16, "47:1-47:1", $s$9]]),
    $m$6 = $M.fun("m$6", "b2", null, $m$0, [], 0, 2, "51:0-58:1", 130, function b2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld(1);

    case 1:
      $.goto = 2;
      return $yld(2);

    case 2:
      $.goto = 5;
      continue;

    case 3:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 2;
      return $yld($l[1]);

    case 4:
      $.goto = 5;
      return $unhandledG($.error);

    case 5:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 1:
      $.goto = 3;
      break;

    default:
      $.goto = 4;
  }
}, null, 1, [[2, "52:2-52:9", $s$10], [3, "54:4-54:11", $s$10], [0, null, $s$10], [2, "56:4-56:11", $s$11], [16, "58:1-58:1", $s$10], [16, "58:1-58:1", $s$10]]),
    $m$7 = $M.fun("m$7", "af2", null, $m$0, [], 0, 1, "60:0-63:1", 129, function af2($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $awt($l[0][1]);

    case 1:
      if ($p) {
        $.goto = 2;
        return $awt($l[0][2]);
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      return $awt($l[0][3]);

    case 3:
      $.result = $p;
      $.goto = 5;
      continue;

    case 4:
      $.goto = 5;
      return $unhandledA($.error);

    case 5:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "61:6-61:13", $s$12], [2, "61:15-61:22", $s$12], [2, "62:9-62:16", $s$12], [0, null, $s$12], [16, "63:1-63:1", $s$12], [16, "63:1-63:1", $s$12]]);

$M.moduleExports();