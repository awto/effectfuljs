var $M = require("@effectful/debugger"),
    $iterator = $M.iterator,
    $yld = $M.yld,
    $iterErr = $M.iterErr,
    $iterFin = $M.iterFin,
    $iterNext = $M.iterNext,
    $ret = $M.ret,
    $retG = $M.retG,
    $unhandled = $M.unhandled,
    $unhandledG = $M.unhandledG,
    $raise = $M.raise,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  fSent: [1, "3:10-3:15"]
}, null, 0],
    $s$2 = [{
  s: [1, "4:6-4:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-10:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*fSent*/
      $m$1($));
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 3;
      $mcall("profile", M, "generators");
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "1:0-1:24", $s$1], [2, "1:0-1:23", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
    $m$1 = $M.fun("m$1", "fSent", null, $m$0, [], 0, 6, "3:0-9:1", 514, function fSent($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld($.sent);

    case 2:
      $lset($l, 1,
      /*s*/
      $p);
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = $iterator([1, 2, 3, $.sent]);
      $.state = 4;

    case 4:
      $l[3] = $p;
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = $iterNext($l[3], $l[5]);
      $.state = 6;

    case 6:
      $l[4] = $p;
      $.state = 7;

    case 7:
      if ($l[4].done) {
        $.state = 8;
      } else {
        $.goto = 17;
        continue;
      }

    case 8:
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      $mcall("log", console, $l[1], $.sent);
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $.goto = 12;
      return $yld(undefined);

    case 12:
      $.goto = 13;
      $mcall("log", console, $p);
      $.state = 13;

    case 13:
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $.goto = 15;
      return $yld(undefined);

    case 15:
      $.goto = 16;
      $mcall("log", console, $p);
      $.state = 16;

    case 16:
      $.goto = 30;
      $brk();
      continue;

    case 17:
      $.goto = 18;
      return $yld($l[4].value);

    case 18:
      $l[5] = $p;
      $.goto = 5;
      continue;

    case 19:
      if ($l[3].throw) {
        $.state = 20;
      } else {
        $.goto = 22;
        continue;
      }

    case 20:
      $.goto = 21;
      $p = $iterErr($l[3], $.error);
      $.state = 21;

    case 21:
      $l[4] = $p;
      $.goto = 7;
      continue;

    case 22:
      $.error = $M.iterErrUndef();
      $l[2] = 29;
      $.goto = 24;
      continue;

    case 23:
      return $raise($.error);

    case 24:
      $.goto = 25;
      $p = $iterFin($l[3], $.result);
      $.state = 25;

    case 25:
      if ($p.done) {
        $.state = 26;
      } else {
        $.goto = 27;
        continue;
      }

    case 26:
      $.goto = $l[2];
      continue;

    case 27:
      $.goto = 28;
      return $yld($p.value);

    case 28:
      $l[5] = $p;
      $.goto = 5;
      continue;

    case 29:
      $.goto = 30;
      return $unhandledG($.error);

    case 30:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 22:
    case 19:
    case 6:
    case 5:
      $.goto = 24;
      $l[2] = 23;
      break;

    case 18:
    case 17:
    case 7:
      $.goto = 19;
      break;

    default:
      $.goto = 29;
  }
}, function ($, $l) {
  switch ($.state) {
    case 22:
    case 19:
    case 18:
    case 17:
    case 7:
    case 6:
    case 5:
      $l[2] = 30;
      $.goto = 24;
      break;

    default:
      $.goto = 30;
      break;
  }
}, 1, [[4, "4:2-4:30", $s$2], [2, "4:10-4:29", $s$2], [4, "5:2-5:34", $s$2], [2, "5:2-5:33", $s$2], [0, null, $s$2], [2, "5:2-5:33", $s$2], [0, null, $s$2], [0, null, $s$2], [4, "6:2-6:32", $s$2], [2, "6:2-6:31", $s$2], [4, "7:2-7:21", $s$2], [2, "7:14-7:19", $s$2], [2, "7:2-7:20", $s$2], [4, "8:2-8:21", $s$2], [2, "8:14-8:19", $s$2], [2, "8:2-8:20", $s$2], [36, "9:1-9:1", $s$2], [2, "5:2-5:33", $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [2, "5:2-5:33", $s$2], [0, null, $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();