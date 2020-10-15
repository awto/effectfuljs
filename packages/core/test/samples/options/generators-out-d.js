var $M = require("@effectful/debugger"),
    $forInIterator = $M.forInIterator,
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
    $brk = $M.brk,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  G: [1, null],
  _getRequireWildcardCache: [2, null],
  _interopRequireWildcard: [3, null],
  c: [4, "4:10-4:11"]
}, null, 0],
    $s$2 = [{
  cache: [1, null]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $s$4 = [{
  obj: [1, null],
  cache: [2, null],
  newObj: [3, null],
  hasPropertyDescriptor: [4, null],
  key: [5, null],
  desc: [6, null]
}, $s$1, 1],
    $s$5 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 5, "1:0-7:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $m$1($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.moduleId = require.resolve("@effectful/es"), $M.force(require("@effectful/es")));
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = $l[3])($p);
      $.state = 3;

    case 3:
      $l[1] = $p;
      $.goto = 5;
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "2:0-2:35", $s$1], [2, null, $s$1], [2, null, $s$1], [0, null, $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]),
    $m$1 = $M.fun("m$1", "_getRequireWildcardCache", null, $m$0, [], 0, 2, null, 0, function _getRequireWildcardCache($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if (typeof WeakMap !== "function") {
        $.state = 1;
      } else {
        $.goto = 2;
        continue;
      }

    case 1:
      $.result = null;
      $.goto = 5;
      continue;

    case 2:
      $.goto = 3;
      $p = new ($context.call = WeakMap)();
      $.state = 3;

    case 3:
      $l[1] = $p;
      $l[0][2] = $m$2($);
      $.result = $l[1];
      $.goto = 5;
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, null, $s$2], [0, null, $s$2], [2, null, $s$2], [0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
    $m$2 = $M.fun("m$2", null, null, $m$1, [], 0, 1, null, 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.result = $l[0][1];
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
}, null, null, 2, [[0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
    $m$3 = $M.fun("m$3", "_interopRequireWildcard", null, $m$0, ["obj"], 1, 9, null, 0, function _interopRequireWildcard($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $1 = $l[1];

      if ($1) {
        $.state = 1;
      } else {
        $.goto = 2;
        continue;
      }

    case 1:
      $1 = $l[1].__esModule;
      $.state = 2;

    case 2:
      if ($1) {
        $.state = 3;
      } else {
        $.goto = 4;
        continue;
      }

    case 3:
      $.result = $l[1];
      $.goto = 42;
      continue;

    case 4:
      $1 = $l[1] === null;

      if ($1) {
        $.state = 5;
      } else {
        $.goto = 38;
        continue;
      }

    case 5:
      if ($1) {
        $.state = 6;
      } else {
        $.goto = 7;
        continue;
      }

    case 6:
      $.result = {
        default: $l[1]
      };
      $.goto = 42;
      continue;

    case 7:
      $.goto = 8;
      $p = ($context.call = $l[0][2])();
      $.state = 8;

    case 8:
      $l[2] = $p;
      $l[7] = $l[2];

      if ($l[7]) {
        $.state = 9;
      } else {
        $.goto = 11;
        continue;
      }

    case 9:
      $.goto = 10;
      $p = $mcall("has", $l[2], $l[1]);
      $.state = 10;

    case 10:
      $l[7] = $p;
      $.state = 11;

    case 11:
      if ($l[7]) {
        $.state = 12;
      } else {
        $.goto = 14;
        continue;
      }

    case 12:
      $.goto = 13;
      $p = $mcall("get", $l[2], $l[1]);
      $.state = 13;

    case 13:
      $.result = $p;
      $.goto = 42;
      continue;

    case 14:
      $l[3] = {};
      $1 = Object.defineProperty;

      if ($1) {
        $.state = 15;
      } else {
        $.goto = 16;
        continue;
      }

    case 15:
      $1 = Object.getOwnPropertyDescriptor;
      $.state = 16;

    case 16:
      $l[4] = $1;
      $.goto = 17;
      $p = $forInIterator($l[1]);
      $.state = 17;

    case 17:
      $l[7] = $p;
      $.state = 18;

    case 18:
      $context.call = $l[7].next;
      $.goto = 19;
      $p = $l[7].next();
      $.state = 19;

    case 19:
      if ($p.done) {
        $.state = 20;
      } else {
        $.goto = 23;
        continue;
      }

    case 20:
      $l[3].default = $l[1];

      if ($l[2]) {
        $.state = 21;
      } else {
        $.goto = 22;
        continue;
      }

    case 21:
      $.goto = 22;
      $mcall("set", $l[2], $l[1], $l[3]);
      $.state = 22;

    case 22:
      $.result = $l[3];
      $.goto = 42;
      continue;

    case 23:
      $l[5] = $p.value;
      $.goto = 24;
      $p = $mcall("call", Object.prototype.hasOwnProperty, $l[1], $l[5]);
      $.state = 24;

    case 24:
      if ($p) {
        $.state = 25;
      } else {
        $.goto = 37;
        continue;
      }

    case 25:
      if ($l[4]) {
        $.state = 26;
      } else {
        $.goto = 36;
        continue;
      }

    case 26:
      $.goto = 27;
      $p = $mcall("getOwnPropertyDescriptor", Object, $l[1], $l[5]);
      $.state = 27;

    case 27:
      $l[8] = $p;
      $.state = 28;

    case 28:
      $l[6] = $l[8];
      $1 = $l[6];

      if ($1) {
        $.state = 29;
      } else {
        $.goto = 32;
        continue;
      }

    case 29:
      $1 = $l[6].get;

      if ($1) {
        $.state = 30;
      } else {
        $.goto = 31;
        continue;
      }

    case 30:
      $.goto = 32;
      continue;

    case 31:
      $1 = $l[6].set;
      $.goto = 30;
      continue;

    case 32:
      if ($1) {
        $.state = 33;
      } else {
        $.goto = 35;
        continue;
      }

    case 33:
      $.goto = 34;
      $mcall("defineProperty", Object, $l[3], $l[5], $l[6]);
      $.state = 34;

    case 34:
      $.goto = 37;
      continue;

    case 35:
      $l[3][$l[5]] = $l[1][$l[5]];
      $.goto = 34;
      continue;

    case 36:
      $l[8] = null;
      $.goto = 28;
      continue;

    case 37:
      $.goto = 18;
      continue;

    case 38:
      $1 = typeof $l[1] !== "object";

      if ($1) {
        $.state = 39;
      } else {
        $.goto = 40;
        continue;
      }

    case 39:
      $1 = typeof $l[1] !== "function";
      $.state = 40;

    case 40:
      $.goto = 5;
      continue;

    case 41:
      $.goto = 42;
      return $unhandled($.error);

    case 42:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
    $m$4 = $M.fun("m$4", "c", null, $m$0, [], 0, 4, "4:0-6:1", 2, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $iterator(z);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = $iterNext($l[2], $l[3]);
      $.state = 4;

    case 4:
      $l[3] = $p;
      $.state = 5;

    case 5:
      if ($l[3].done) {
        $.state = 6;
      } else {
        $.goto = 7;
        continue;
      }

    case 6:
      $.goto = 20;
      $brk();
      continue;

    case 7:
      $.goto = 8;
      return $yld($l[3].value);

    case 8:
      $l[3] = $p;
      $.goto = 3;
      continue;

    case 9:
      if ($l[2].throw) {
        $.state = 10;
      } else {
        $.goto = 12;
        continue;
      }

    case 10:
      $.goto = 11;
      $p = $iterErr($l[2], $.error);
      $.state = 11;

    case 11:
      $l[3] = $p;
      $.goto = 5;
      continue;

    case 12:
      $.error = $M.iterErrUndef();
      $l[1] = 19;
      $.goto = 14;
      continue;

    case 13:
      return $raise($.error);

    case 14:
      $.goto = 15;
      $p = $iterFin($l[2], $.result);
      $.state = 15;

    case 15:
      if ($p.done) {
        $.state = 16;
      } else {
        $.goto = 17;
        continue;
      }

    case 16:
      $.goto = $l[1];
      continue;

    case 17:
      $.goto = 18;
      return $yld($p.value);

    case 18:
      $l[3] = $p;
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
    case 9:
    case 4:
    case 3:
      $.goto = 14;
      $l[1] = 13;
      break;

    case 8:
    case 7:
    case 5:
      $.goto = 9;
      break;

    default:
      $.goto = 19;
  }
}, function ($, $l) {
  switch ($.state) {
    case 12:
    case 9:
    case 8:
    case 7:
    case 5:
    case 4:
    case 3:
      $l[1] = 20;
      $.goto = 14;
      break;

    default:
      $.goto = 20;
      break;
  }
}, 1, [[4, "5:2-5:11", $s$5], [2, "5:2-5:10", $s$5], [0, null, $s$5], [2, "5:2-5:10", $s$5], [0, null, $s$5], [0, null, $s$5], [36, "6:1-6:1", $s$5], [2, "5:2-5:10", $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, "5:2-5:10", $s$5], [0, null, $s$5], [16, "6:1-6:1", $s$5], [16, "6:1-6:1", $s$5]]);

$M.moduleExports();