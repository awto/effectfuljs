var $M = require("@effectful/debugger/api"),
    $iterator = $M.iterator,
    $yld = $M.yld,
    $iterErr = $M.iterErr,
    $iterFin = $M.iterFin,
    $iterNext = $M.iterNext,
    $ret = $M.ret,
    $retG = $M.retG,
    $unhandled = $M.unhandled,
    $unhandledG = $M.unhandledG,
    $brk = $M.brk,
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
      $l[1] = $m$1($);
      $.goto = 1;
      $brk("1:0-1:24");
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
    $m$1 = $M.fun("m$1", "fSent", null, $m$0, [], 0, 5, "3:0-9:1", 514, function fSent($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("4:2-4:30");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld($.sent);

    case 2:
      $l[1] = $p;
      $.goto = 3;
      $brk("5:2-5:34");
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
      $p = $iterNext($l[3], $l[4]);
      $.state = 6;

    case 6:
      $l[4] = $p;
      $.state = 7;

    case 7:
      if ($l[4].done) {
        $.state = 8;
      } else {
        $.goto = 16;
        return $yld($l[4].value);
      }

    case 8:
      $.goto = 9;
      $brk("6:2-6:32");
      $.state = 9;

    case 9:
      $.goto = 10;
      $mcall("log", console, $l[1], $.sent);
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk("7:2-7:21");
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
      $brk("8:2-8:21");
      $.state = 14;

    case 14:
      $.goto = 15;
      return $yld(undefined);

    case 15:
      $.goto = 24;
      $mcall("log", console, $p);
      continue;

    case 16:
      $l[4] = $p;
      $.goto = 5;
      continue;

    case 17:
      if ($l[3].throw) {
        $.state = 18;
      } else {
        $.error = $M.iterErrUndef();
        $l[2] = 23;
        $.goto = 20;
        continue;
      }

    case 18:
      $.goto = 19;
      $p = $iterErr($l[3], $.error);
      $.state = 19;

    case 19:
      $l[4] = $p;
      $.goto = 7;
      continue;

    case 20:
      $.goto = 21;
      $p = $iterFin($l[3], $.result);
      $.state = 21;

    case 21:
      if ($p.done) {
        $.goto = $l[2];
        continue;
      } else {
        $.goto = 22;
        return $yld($p.value);
      }

    case 22:
      $l[4] = $p;
      $.goto = 5;
      continue;

    case 23:
      $.goto = 24;
      return $unhandledG($.error);

    case 24:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 16:
    case 7:
      $.goto = 17;
      break;

    case 17:
    case 6:
    case 5:
      $l[2] = 23;
      $.goto = 20;
      break;

    default:
      $.goto = 23;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 17:
    case 16:
    case 7:
    case 6:
    case 5:
      $l[2] = 24;
      $.goto = 20;
      break;

    default:
      $.goto = 24;
      break;
  }
}, 1, [[4, "4:2-4:30", $s$2], [2, "4:10-4:29", $s$2], [4, "5:2-5:34", $s$2], [2, "5:2-5:33", $s$2], [0, null, $s$2], [1, "5:2-5:33", $s$2], [1, null, $s$2], [1, null, $s$2], [4, "6:2-6:32", $s$2], [2, "6:2-6:31", $s$2], [4, "7:2-7:21", $s$2], [2, "7:14-7:19", $s$2], [2, "7:2-7:20", $s$2], [4, "8:2-8:21", $s$2], [2, "8:14-8:19", $s$2], [2, "8:2-8:20", $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();