var $M = require("@effectful/debugger/api"),
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
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  d: [1, "4:10-4:11"],
  a4: [2, "15:10-15:12"],
  a5: [3, "30:10-30:12"]
}, null, 0],
    $s$2 = [{
  i: [1, "4:12-4:13"],
  j: [2, "5:6-5:7"]
}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $s$4 = [{
  e: [1, "20:11-20:12"]
}, $s$3, 1],
    $s$5 = [{}, $s$1, 1],
    $s$6 = [{
  i: [1, "31:13-31:14"]
}, $s$5, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 4, "1:0-33:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $.goto = 1;
      $mcall("profile", M, "generators");
      $.state = 1;

    case 1:
      $.goto = 3;
      $mcall("option", M, {
        combineOps: true,
        scopePrefix: false,
        scopeContext: false
      });
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[2, "1:0-1:23", $s$1], [2, "2:0-2:71", $s$1], [16, "33:0-33:0", $s$1], [16, "33:0-33:0", $s$1]]),
    $m$1 = $M.fun("m$1", "d", null, $m$0, ["i"], 1, 8, "4:0-13:1", 130, function d($, $l, $p) {
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
        $.goto = 22;
        return $yld($l[6].value);
      }

    case 8:
      $l[7] = $l[6].value;
      $.goto = 9;
      return $yld($l[7]);

    case 9:
      if ($p) {
        $.goto = 10;
        $p = $iterator($l[1] = $l[1] + 3);
        $.state = 10;
      } else {
        $.result = $l[1];
        $.goto = 30;
        continue;
      }

    case 10:
      $l[5] = $p;
      $.state = 11;

    case 11:
      $.goto = 12;
      $p = $iterNext($l[5], $l[7]);
      $.state = 12;

    case 12:
      $l[7] = $p;
      $.state = 13;

    case 13:
      if ($l[7].done) {
        $.state = 14;
      } else {
        $.goto = 15;
        return $yld($l[7].value);
      }

    case 14:
      $.result = $l[7].value;
      $.goto = 30;
      continue;

    case 15:
      $l[7] = $p;
      $.goto = 11;
      continue;

    case 16:
      if ($l[5].throw) {
        $.state = 17;
      } else {
        $.error = $M.iterErrUndef();
        $l[4] = 29;
        $.goto = 19;
        continue;
      }

    case 17:
      $.goto = 18;
      $p = $iterErr($l[5], $.error);
      $.state = 18;

    case 18:
      $l[7] = $p;
      $.goto = 13;
      continue;

    case 19:
      $.goto = 20;
      $p = $iterFin($l[5], $.result);
      $.state = 20;

    case 20:
      if ($p.done) {
        $.goto = $l[4];
        continue;
      } else {
        $.goto = 21;
        return $yld($p.value);
      }

    case 21:
      $l[7] = $p;
      $.goto = 11;
      continue;

    case 22:
      $l[6] = $p;
      $.goto = 5;
      continue;

    case 23:
      if ($l[5].throw) {
        $.state = 24;
      } else {
        $.error = $M.iterErrUndef();
        $l[3] = 29;
        $.goto = 26;
        continue;
      }

    case 24:
      $.goto = 25;
      $p = $iterErr($l[5], $.error);
      $.state = 25;

    case 25:
      $l[6] = $p;
      $.goto = 7;
      continue;

    case 26:
      $.goto = 27;
      $p = $iterFin($l[5], $.result);
      $.state = 27;

    case 27:
      if ($p.done) {
        $.goto = $l[3];
        continue;
      } else {
        $.goto = 28;
        return $yld($p.value);
      }

    case 28:
      $l[6] = $p;
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
    case 7:
      $.goto = 23;
      break;

    case 15:
    case 13:
      $.goto = 16;
      break;

    case 23:
    case 6:
    case 5:
      $l[3] = 29;
      $.goto = 26;
      break;

    case 16:
    case 12:
    case 11:
      $l[4] = 29;
      $.goto = 19;
      break;

    default:
      $.goto = 29;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 23:
    case 22:
    case 7:
    case 6:
    case 5:
      $l[3] = 30;
      $.goto = 26;
      break;

    case 16:
    case 15:
    case 13:
    case 12:
    case 11:
      $l[4] = 30;
      $.goto = 19;
      break;

    default:
      $.goto = 30;
      break;
  }
}, 1, [[2, "6:9-6:18", $s$2], [2, "6:2-6:24", $s$2], [2, "7:19-7:36", $s$2], [2, "7:12-7:40", $s$2], [0, null, $s$2], [1, "7:12-7:40", $s$2], [1, null, $s$2], [1, null, $s$2], [2, "7:6-7:40", $s$2], [2, "8:11-8:26", $s$2], [0, null, $s$2], [1, "8:11-8:26", $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [16, "13:1-13:1", $s$2], [16, "13:1-13:1", $s$2]]),
    $m$2 = $M.fun("m$2", "a4", null, $m$0, [], 0, 11, "15:0-28:1", 130, function a4($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld(1);

    case 1:
      $.goto = 2;
      return $yld(2);

    case 2:
      $l[2] = 8;
      $.goto = 5;
      return $yld(3);

    case 3:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 4;
      return $yld("excep");

    case 4:
      $l[2] = 8;
      $.goto = 5;
      return $yld($l[1]);

    case 5:
      $.goto = 6;
      return $yld("f");

    case 6:
      $.goto = 7;
      return $yld("e");

    case 7:
      $.error = $l[3];
      $.goto = $l[2];
      continue;

    case 8:
      $.goto = 9;
      $p = ($context.call = a2)();
      $.state = 9;

    case 9:
      $.goto = 10;
      $p = $iterator($p);
      $.state = 10;

    case 10:
      $l[6] = $p;
      $.state = 11;

    case 11:
      $.goto = 12;
      $p = $iterNext($l[6], $l[7]);
      $.state = 12;

    case 12:
      $l[7] = $p;
      $.state = 13;

    case 13:
      if ($l[7].done) {
        $.state = 14;
      } else {
        $.goto = 29;
        return $yld($l[7].value);
      }

    case 14:
      $l[8] = $l[7].value;
      $.goto = 15;
      $p = ($context.call = a3)();
      $.state = 15;

    case 15:
      $.goto = 16;
      $p = $iterator($p);
      $.state = 16;

    case 16:
      $l[6] = $p;
      $.state = 17;

    case 17:
      $.goto = 18;
      $p = $iterNext($l[6], $l[9]);
      $.state = 18;

    case 18:
      $l[9] = $p;
      $.state = 19;

    case 19:
      if ($l[9].done) {
        $.state = 20;
      } else {
        $.goto = 22;
        return $yld($l[9].value);
      }

    case 20:
      $l[10] = $l[9].value;
      $.goto = 21;
      $p = ($context.call = a1)($l[8], $l[10]);
      $.state = 21;

    case 21:
      $.goto = 37;
      return $yld($p);

    case 22:
      $l[9] = $p;
      $.goto = 17;
      continue;

    case 23:
      if ($l[6].throw) {
        $.state = 24;
      } else {
        $.error = $M.iterErrUndef();
        $l[5] = 36;
        $.goto = 26;
        continue;
      }

    case 24:
      $.goto = 25;
      $p = $iterErr($l[6], $.error);
      $.state = 25;

    case 25:
      $l[9] = $p;
      $.goto = 19;
      continue;

    case 26:
      $.goto = 27;
      $p = $iterFin($l[6], $.result);
      $.state = 27;

    case 27:
      if ($p.done) {
        $.goto = $l[5];
        continue;
      } else {
        $.goto = 28;
        return $yld($p.value);
      }

    case 28:
      $l[9] = $p;
      $.goto = 17;
      continue;

    case 29:
      $l[7] = $p;
      $.goto = 11;
      continue;

    case 30:
      if ($l[6].throw) {
        $.state = 31;
      } else {
        $.error = $M.iterErrUndef();
        $l[4] = 36;
        $.goto = 33;
        continue;
      }

    case 31:
      $.goto = 32;
      $p = $iterErr($l[6], $.error);
      $.state = 32;

    case 32:
      $l[7] = $p;
      $.goto = 13;
      continue;

    case 33:
      $.goto = 34;
      $p = $iterFin($l[6], $.result);
      $.state = 34;

    case 34:
      if ($p.done) {
        $.goto = $l[4];
        continue;
      } else {
        $.goto = 35;
        return $yld($p.value);
      }

    case 35:
      $l[7] = $p;
      $.goto = 11;
      continue;

    case 36:
      $.goto = 37;
      return $unhandledG($.error);

    case 37:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 2:
    case 1:
      $.goto = 3;
      break;

    case 29:
    case 13:
      $.goto = 30;
      break;

    case 22:
    case 19:
      $.goto = 23;
      break;

    case 30:
    case 12:
    case 11:
      $l[4] = 36;
      $.goto = 33;
      break;

    case 23:
    case 18:
    case 17:
      $l[5] = 36;
      $.goto = 26;
      break;

    case 4:
    case 3:
      $l[3] = $.error;
      $l[2] = 36;
      $.goto = 5;
      break;

    default:
      $.goto = 36;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 4:
    case 3:
    case 2:
    case 1:
      $l[2] = 37;
      $.goto = 5;
      break;

    case 30:
    case 29:
    case 13:
    case 12:
    case 11:
      $l[4] = 37;
      $.goto = 33;
      break;

    case 23:
    case 22:
    case 19:
    case 18:
    case 17:
      $l[5] = 37;
      $.goto = 26;
      break;

    default:
      $.goto = 37;
      break;
  }
}, 1, [[2, "16:2-16:9", $s$3], [3, "18:4-18:11", $s$3], [3, "19:4-19:11", $s$3], [3, "21:4-21:17", $s$4], [3, "22:4-22:11", $s$4], [2, "24:4-24:13", $s$3], [2, "25:4-25:13", $s$3], [0, null, $s$3], [2, "27:18-27:22", $s$3], [2, "27:11-27:22", $s$3], [0, null, $s$3], [1, "27:11-27:22", $s$3], [1, null, $s$3], [1, null, $s$3], [2, "27:31-27:35", $s$3], [2, "27:24-27:35", $s$3], [0, null, $s$3], [1, "27:24-27:35", $s$3], [1, null, $s$3], [1, null, $s$3], [2, "27:8-27:36", $s$3], [2, "27:2-27:36", $s$3], [1, null, $s$3], [1, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [1, null, $s$3], [1, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [16, "28:1-28:1", $s$3], [16, "28:1-28:1", $s$3]]),
    $m$3 = $M.fun("m$3", "a5", null, $m$0, [], 0, 4, "30:0-32:1", 130, function a5($, $l, $p) {
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
      $.goto = 9;
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
}, 1, [[2, "31:18-31:22", $s$6], [0, null, $s$5], [0, null, $s$5], [1, "31:13-31:14", $s$5], [3, "31:24-31:31", $s$6], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [16, "32:1-32:1", $s$5], [16, "32:1-32:1", $s$5]]);

$M.moduleExports();