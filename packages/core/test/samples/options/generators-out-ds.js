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
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $get = $M.get,
    $set = $M.set,
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
    $s$5 = [{}, $s$4, 2],
    $s$6 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 5, "1:0-7:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 2,
      /*_getRequireWildcardCache*/
      $m$1($));
      $lset($l, 3,
      /*_interopRequireWildcard*/
      $m$3($));
      $lset($l, 4,
      /*c*/
      $m$4($));
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
      $lset($l, 1,
      /*G*/
      $p);
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
      $lset($l, 1,
      /*cache*/
      $p);
      $lset($l[0], 2,
      /*_getRequireWildcardCache*/
      $m$2($));
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
    $m$3 = $M.fun("m$3", "_interopRequireWildcard", null, $m$0, ["obj"], 1, 11, null, 0, function _interopRequireWildcard($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[8] = $l[1];

      if ($l[8]) {
        $.state = 1;
      } else {
        $.goto = 3;
        continue;
      }

    case 1:
      $.goto = 2;
      $p = $get($l[1], "__esModule");
      $.state = 2;

    case 2:
      $l[8] = $p;
      $.state = 3;

    case 3:
      if ($l[8]) {
        $.state = 4;
      } else {
        $.goto = 5;
        continue;
      }

    case 4:
      $.result = $l[1];
      $.goto = 55;
      continue;

    case 5:
      $1 = $l[1] === null;

      if ($1) {
        $.state = 6;
      } else {
        $.goto = 51;
        continue;
      }

    case 6:
      if ($1) {
        $.state = 7;
      } else {
        $.goto = 8;
        continue;
      }

    case 7:
      $.result = {
        default: $l[1]
      };
      $.goto = 55;
      continue;

    case 8:
      $.goto = 9;
      $p = ($context.call = $l[0][2])();
      $.state = 9;

    case 9:
      $lset($l, 2,
      /*cache*/
      $p);
      $l[9] = $l[2];

      if ($l[9]) {
        $.state = 10;
      } else {
        $.goto = 12;
        continue;
      }

    case 10:
      $.goto = 11;
      $p = $mcall("has", $l[2], $l[1]);
      $.state = 11;

    case 11:
      $l[9] = $p;
      $.state = 12;

    case 12:
      if ($l[9]) {
        $.state = 13;
      } else {
        $.goto = 15;
        continue;
      }

    case 13:
      $.goto = 14;
      $p = $mcall("get", $l[2], $l[1]);
      $.state = 14;

    case 14:
      $.result = $p;
      $.goto = 55;
      continue;

    case 15:
      $lset($l, 3,
      /*newObj*/
      {});
      $.goto = 16;
      $p = $get(Object, "defineProperty");
      $.state = 16;

    case 16:
      $l[10] = $p;

      if ($l[10]) {
        $.state = 17;
      } else {
        $.goto = 19;
        continue;
      }

    case 17:
      $.goto = 18;
      $p = $get(Object, "getOwnPropertyDescriptor");
      $.state = 18;

    case 18:
      $l[10] = $p;
      $.state = 19;

    case 19:
      $lset($l, 4,
      /*hasPropertyDescriptor*/
      $l[10]);
      $.state = 20;

    case 20:
      $l = $.$ = [$l, void 0, void 0, void 0];
      $.goto = 21;
      $p = $forInIterator($l[0][1]);
      $.state = 21;

    case 21:
      $l[1] = $p;
      $.state = 22;

    case 22:
      $l = $.$ = $l.slice();
      $.state = 23;

    case 23:
      $context.call = $l[1].next;
      $.goto = 24;
      $p = $l[1].next();
      $.state = 24;

    case 24:
      if ($p.done) {
        $.state = 25;
      } else {
        $.goto = 26;
        continue;
      }

    case 25:
      $l[0][7] = 47;
      $.goto = 46;
      continue;

    case 26:
      $lset($l[0], 5,
      /*key*/
      $p.value);
      $.goto = 27;
      $p = $get(Object, "prototype");
      $.state = 27;

    case 27:
      $.goto = 28;
      $p = $get($p, "hasOwnProperty");
      $.state = 28;

    case 28:
      $.goto = 29;
      $p = $mcall("call", $p, $l[0][1], $l[0][5]);
      $.state = 29;

    case 29:
      if ($p) {
        $.state = 30;
      } else {
        $.goto = 45;
        continue;
      }

    case 30:
      if ($l[0][4]) {
        $.state = 31;
      } else {
        $.goto = 44;
        continue;
      }

    case 31:
      $.goto = 32;
      $p = $mcall("getOwnPropertyDescriptor", Object, $l[0][1], $l[0][5]);
      $.state = 32;

    case 32:
      $l[2] = $p;
      $.state = 33;

    case 33:
      $lset($l[0], 6,
      /*desc*/
      $l[2]);
      $l[3] = $l[0][6];

      if ($l[3]) {
        $.state = 34;
      } else {
        $.goto = 39;
        continue;
      }

    case 34:
      $.goto = 35;
      $p = $get($l[0][6], "get");
      $.state = 35;

    case 35:
      $l[3] = $p;

      if ($l[3]) {
        $.state = 36;
      } else {
        $.goto = 37;
        continue;
      }

    case 36:
      $.goto = 39;
      continue;

    case 37:
      $.goto = 38;
      $p = $get($l[0][6], "set");
      $.state = 38;

    case 38:
      $l[3] = $p;
      $.goto = 36;
      continue;

    case 39:
      if ($l[3]) {
        $.state = 40;
      } else {
        $.goto = 42;
        continue;
      }

    case 40:
      $.goto = 41;
      $mcall("defineProperty", Object, $l[0][3], $l[0][5], $l[0][6]);
      $.state = 41;

    case 41:
      $.goto = 45;
      continue;

    case 42:
      $.goto = 43;
      $p = $get($l[0][1], $l[0][5]);
      $.state = 43;

    case 43:
      $.goto = 41;
      $set($l[0][3], $l[0][5], $p);
      continue;

    case 44:
      $l[2] = null;
      $.goto = 33;
      continue;

    case 45:
      $l = $.$ = $l.slice();
      $.goto = 23;
      continue;

    case 46:
      $l = $.$ = $l[0];
      $.goto = $l[7];
      continue;

    case 47:
      $.goto = 48;
      $set($l[3], "default", $l[1]);
      $.state = 48;

    case 48:
      if ($l[2]) {
        $.state = 49;
      } else {
        $.goto = 50;
        continue;
      }

    case 49:
      $.goto = 50;
      $mcall("set", $l[2], $l[1], $l[3]);
      $.state = 50;

    case 50:
      $.result = $l[3];
      $.goto = 55;
      continue;

    case 51:
      $1 = typeof $l[1] !== "object";

      if ($1) {
        $.state = 52;
      } else {
        $.goto = 53;
        continue;
      }

    case 52:
      $1 = typeof $l[1] !== "function";
      $.state = 53;

    case 53:
      $.goto = 6;
      continue;

    case 54:
      $.goto = 55;
      return $unhandled($.error);

    case 55:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 45:
    case 44:
    case 43:
    case 42:
    case 41:
    case 40:
    case 39:
    case 38:
    case 37:
    case 36:
    case 35:
    case 34:
    case 33:
    case 32:
    case 31:
    case 30:
    case 29:
    case 28:
    case 27:
    case 26:
    case 25:
    case 24:
    case 23:
    case 22:
      $l[0][7] = 54;
      $.goto = 46;
      break;

    default:
      $.goto = 54;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 45:
    case 44:
    case 43:
    case 42:
    case 41:
    case 40:
    case 39:
    case 38:
    case 37:
    case 36:
    case 35:
    case 34:
    case 33:
    case 32:
    case 31:
    case 30:
    case 29:
    case 28:
    case 27:
    case 26:
    case 25:
    case 24:
    case 23:
    case 22:
      $l[0][7] = 55;
      $.goto = 46;
      break;

    default:
      $.goto = 55;
      break;
  }
}, 1, [[0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [2, null, $s$5], [2, null, $s$5], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [0, null, $s$4], [0, null, $s$5], [2, null, $s$5], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [0, null, $s$4], [2, null, $s$5], [2, null, $s$5], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
    $m$4 = $M.fun("m$4", "c", null, $m$0, [], 0, 5, "4:0-6:1", 2, function c($, $l, $p) {
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
      $p = $iterNext($l[2], $l[4]);
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
      $.goto = 19;
      $brk();
      continue;

    case 7:
      $.goto = 8;
      return $yld($l[3].value);

    case 8:
      $l[4] = $p;
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
      $l[1] = 18;
      $.state = 13;

    case 13:
      $.goto = 14;
      $p = $iterFin($l[2], $.result);
      $.state = 14;

    case 14:
      if ($p.done) {
        $.state = 15;
      } else {
        $.goto = 16;
        continue;
      }

    case 15:
      $.goto = $l[1];
      continue;

    case 16:
      $.goto = 17;
      return $yld($p.value);

    case 17:
      $l[4] = $p;
      $.goto = 3;
      continue;

    case 18:
      $.goto = 19;
      return $unhandledG($.error);

    case 19:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 8:
    case 7:
    case 5:
      $.goto = 9;
      break;

    case 12:
    case 9:
    case 4:
    case 3:
      $l[1] = 18;
      $.goto = 13;
      break;

    default:
      $.goto = 18;
      break;
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
      $l[1] = 19;
      $.goto = 13;
      break;

    default:
      $.goto = 19;
      break;
  }
}, 1, [[4, "5:2-5:11", $s$6], [2, "5:2-5:10", $s$6], [0, null, $s$6], [2, "5:2-5:10", $s$6], [0, null, $s$6], [0, null, $s$6], [36, "6:1-6:1", $s$6], [2, "5:2-5:10", $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [2, "5:2-5:10", $s$6], [0, null, $s$6], [16, "6:1-6:1", $s$6], [16, "6:1-6:1", $s$6]]);

$M.moduleExports();