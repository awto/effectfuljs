var $M = require("@effectful/debugger"),
    $forInIterator = $M.forInIterator,
    $yld = $M.yld,
    $context = $M.context,
    $ret = $M.ret,
    $retG = $M.retG,
    $unhandled = $M.unhandled,
    $unhandledG = $M.unhandledG,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $set = $M.set,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  Z: [1, null],
  _getRequireWildcardCache: [2, null],
  _interopRequireWildcard: [3, null],
  a: [4, "3:10-3:11"]
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
      /*a*/
      $m$4($));
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.moduleId = require.resolve("@effectful/generators"), $M.force(require("@effectful/generators")));
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = $l[3])($p);
      $.state = 3;

    case 3:
      $lset($l, 1,
      /*Z*/
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
}, null, null, 0, [[4, "1:0-1:43", $s$1], [2, null, $s$1], [2, null, $s$1], [0, null, $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]),
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
      $.goto = 46;
      continue;

    case 4:
      $1 = $l[1] === null;

      if ($1) {
        $.state = 5;
      } else {
        $.goto = 42;
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
      $.goto = 46;
      continue;

    case 7:
      $.goto = 8;
      $p = ($context.call = $l[0][2])();
      $.state = 8;

    case 8:
      $lset($l, 2,
      /*cache*/
      $p);
      $l[8] = $l[2];

      if ($l[8]) {
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
      $l[8] = $p;
      $.state = 11;

    case 11:
      if ($l[8]) {
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
      $.goto = 46;
      continue;

    case 14:
      $lset($l, 3,
      /*newObj*/
      {});
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
      $lset($l, 4,
      /*hasPropertyDescriptor*/
      $1);
      $.state = 17;

    case 17:
      $l = $.$ = [$l, void 0, void 0];
      $.goto = 18;
      $p = $forInIterator($l[0][1]);
      $.state = 18;

    case 18:
      $l[1] = $p;
      $.state = 19;

    case 19:
      $l = $.$ = $l.slice();
      $.state = 20;

    case 20:
      $context.call = $l[1].next;
      $.goto = 21;
      $p = $l[1].next();
      $.state = 21;

    case 21:
      if ($p.done) {
        $.state = 22;
      } else {
        $.goto = 23;
        continue;
      }

    case 22:
      $l[0][7] = 39;
      $.goto = 38;
      continue;

    case 23:
      $lset($l[0], 5,
      /*key*/
      $p.value);
      $.goto = 24;
      $p = $mcall("call", Object.prototype.hasOwnProperty, $l[0][1], $l[0][5]);
      $.state = 24;

    case 24:
      if ($p) {
        $.state = 25;
      } else {
        $.goto = 37;
        continue;
      }

    case 25:
      if ($l[0][4]) {
        $.state = 26;
      } else {
        $.goto = 36;
        continue;
      }

    case 26:
      $.goto = 27;
      $p = $mcall("getOwnPropertyDescriptor", Object, $l[0][1], $l[0][5]);
      $.state = 27;

    case 27:
      $l[2] = $p;
      $.state = 28;

    case 28:
      $lset($l[0], 6,
      /*desc*/
      $l[2]);
      $1 = $l[0][6];

      if ($1) {
        $.state = 29;
      } else {
        $.goto = 32;
        continue;
      }

    case 29:
      $1 = $l[0][6].get;

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
      $1 = $l[0][6].set;
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
      $mcall("defineProperty", Object, $l[0][3], $l[0][5], $l[0][6]);
      $.state = 34;

    case 34:
      $.goto = 37;
      continue;

    case 35:
      $set($l[0][3], $l[0][5], $l[0][1][$l[0][5]]);
      $.goto = 34;
      continue;

    case 36:
      $l[2] = null;
      $.goto = 28;
      continue;

    case 37:
      $l = $.$ = $l.slice();
      $.goto = 20;
      continue;

    case 38:
      $l = $.$ = $l[0];
      $.goto = $l[7];
      continue;

    case 39:
      $set($l[3], "default", $l[1]);

      if ($l[2]) {
        $.state = 40;
      } else {
        $.goto = 41;
        continue;
      }

    case 40:
      $.goto = 41;
      $mcall("set", $l[2], $l[1], $l[3]);
      $.state = 41;

    case 41:
      $.result = $l[3];
      $.goto = 46;
      continue;

    case 42:
      $1 = typeof $l[1] !== "object";

      if ($1) {
        $.state = 43;
      } else {
        $.goto = 44;
        continue;
      }

    case 43:
      $1 = typeof $l[1] !== "function";
      $.state = 44;

    case 44:
      $.goto = 5;
      continue;

    case 45:
      $.goto = 46;
      return $unhandled($.error);

    case 46:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
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
    case 21:
    case 20:
    case 19:
      $l[0][7] = 45;
      $.goto = 38;
      break;

    default:
      $.goto = 45;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
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
    case 21:
    case 20:
    case 19:
      $l[0][7] = 46;
      $.goto = 38;
      break;

    default:
      $.goto = 46;
      break;
  }
}, 1, [[0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [0, null, $s$4], [0, null, $s$5], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [0, null, $s$4], [0, null, $s$5], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
    $m$4 = $M.fun("m$4", "a", null, $m$0, [], 0, 1, "3:0-6:1", 2, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld(1);

    case 2:
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      return $yld(2);

    case 4:
      $.goto = 6;
      $brk();
      continue;

    case 5:
      $.goto = 6;
      return $unhandledG($.error);

    case 6:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "4:2-4:10", $s$6], [2, "4:2-4:9", $s$6], [4, "5:2-5:10", $s$6], [2, "5:2-5:9", $s$6], [36, "6:1-6:1", $s$6], [16, "6:1-6:1", $s$6], [16, "6:1-6:1", $s$6]]);

$M.moduleExports();