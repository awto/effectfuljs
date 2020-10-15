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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-10:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $.goto = 2;
      $mcall("profile", M, "generators");
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[2, "1:0-1:23", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
    $m$1 = $M.fun("m$1", "fSent", null, $m$0, [], 0, 5, "3:0-9:1", 642, function fSent($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld($.sent);

    case 1:
      $l[1] = $p;
      $.goto = 2;
      $p = $iterator([1, 2, 3, $.sent]);
      $.state = 2;

    case 2:
      $l[3] = $p;
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = $iterNext($l[3], $l[4]);
      $.state = 4;

    case 4:
      $l[4] = $p;
      $.state = 5;

    case 5:
      if ($l[4].done) {
        $.state = 6;
      } else {
        $.goto = 11;
        return $yld($l[4].value);
      }

    case 6:
      $.goto = 7;
      $mcall("log", console, $l[1], $.sent);
      $.state = 7;

    case 7:
      $.goto = 8;
      return $yld(undefined);

    case 8:
      $.goto = 9;
      $mcall("log", console, $p);
      $.state = 9;

    case 9:
      $.goto = 10;
      return $yld(undefined);

    case 10:
      $.goto = 20;
      $mcall("log", console, $p);
      continue;

    case 11:
      $l[4] = $p;
      $.goto = 3;
      continue;

    case 12:
      if ($l[3].throw) {
        $.state = 13;
      } else {
        $.error = $M.iterErrUndef();
        $l[2] = 19;
        $.goto = 16;
        continue;
      }

    case 13:
      $.goto = 14;
      $p = $iterErr($l[3], $.error);
      $.state = 14;

    case 14:
      $l[4] = $p;
      $.goto = 5;
      continue;

    case 15:
      return $raise($.error);

    case 16:
      $.goto = 17;
      $p = $iterFin($l[3], $.result);
      $.state = 17;

    case 17:
      if ($p.done) {
        $.goto = $l[2];
        continue;
      } else {
        $.goto = 18;
        return $yld($p.value);
      }

    case 18:
      $l[4] = $p;
      $.goto = 3;
      continue;

    case 19:
      $.goto = 20;
      return $unhandledG($.error);

    case 20:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 12:
    case 4:
    case 3:
      $.goto = 16;
      $l[2] = 15;
      break;

    case 11:
    case 5:
      $.goto = 12;
      break;

    default:
      $.goto = 19;
  }
}, function ($, $l) {
  switch ($.state) {
    case 12:
    case 11:
    case 5:
    case 4:
    case 3:
      $l[2] = 20;
      $.goto = 16;
      break;

    default:
      $.goto = 20;
      break;
  }
}, 1, [[2, "4:10-4:29", $s$2], [2, "5:2-5:33", $s$2], [0, null, $s$2], [2, "5:2-5:33", $s$2], [0, null, $s$2], [2, "5:2-5:33", $s$2], [2, "6:2-6:31", $s$2], [2, "7:14-7:19", $s$2], [2, "7:2-7:20", $s$2], [2, "8:14-8:19", $s$2], [2, "8:2-8:20", $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [2, "5:2-5:33", $s$2], [0, null, $s$2], [16, "9:1-9:1", $s$2], [16, "9:1-9:1", $s$2]]);

$M.moduleExports();