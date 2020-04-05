var $M = require("@effectful/debugger/api"),
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
    $set = $M.set,
    $brk = $M.brk,
    $lset = $M.lset,
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
      $brk("2:0-2:35");
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
        $.result = null;
        $.goto = 4;
        continue;
      } else {
        $.state = 1;
      }

    case 1:
      $.goto = 2;
      $p = new ($context.call = WeakMap)();
      $.state = 2;

    case 2:
      $lset($l, 1,
      /*cache*/
      $p);
      $lset($l[0], 2,
      /*_getRequireWildcardCache*/
      $m$2($));
      $.result = $l[1];
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
}, null, null, 1, [[0, null, $s$2], [2, null, $s$2], [0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
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
        $1 = $l[1].__esModule;
        $.state = 1;
      } else {
        $.state = 1;
      }

    case 1:
      if ($1) {
        $.result = $l[1];
        $.goto = 28;
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $1 = $l[1] === null;

      if ($1) {
        $.state = 3;
      } else {
        $1 = typeof $l[1] !== "object";

        if ($1) {
          $1 = typeof $l[1] !== "function";
          $.goto = 26;
          continue;
        } else {
          $.goto = 26;
          continue;
        }
      }

    case 3:
      if ($1) {
        $.result = {
          default: $l[1]
        };
        $.goto = 28;
        continue;
      } else {
        $.state = 4;
      }

    case 4:
      $.goto = 5;
      $p = ($context.call = $l[0][2])();
      $.state = 5;

    case 5:
      $lset($l, 2,
      /*cache*/
      $p);
      $l[8] = $l[2];

      if ($l[8]) {
        $.goto = 25;
        $p = $mcall("has", $l[2], $l[1]);
        continue;
      } else {
        $.state = 6;
      }

    case 6:
      if ($l[8]) {
        $.goto = 24;
        $p = $mcall("get", $l[2], $l[1]);
        continue;
      } else {
        $.state = 7;
      }

    case 7:
      $lset($l, 3,
      /*newObj*/
      {});
      $1 = Object.defineProperty;

      if ($1) {
        $1 = Object.getOwnPropertyDescriptor;
        $.state = 8;
      } else {
        $.state = 8;
      }

    case 8:
      $lset($l, 4,
      /*hasPropertyDescriptor*/
      $1);
      $.state = 9;

    case 9:
      $l = $.$ = [$l, void 0, void 0];
      $.goto = 10;
      $p = $forInIterator($l[0][1]);
      $.state = 10;

    case 10:
      $l[1] = $p;
      $.state = 11;

    case 11:
      $l = $.$ = $l.slice();
      $.state = 12;

    case 12:
      $context.call = $l[1].next;
      $.goto = 13;
      $p = $l[1].next();
      $.state = 13;

    case 13:
      if ($p.done) {
        $l[0][7] = 22;
        $.goto = 21;
        continue;
      } else {
        $lset($l[0], 5,
        /*key*/
        $p.value);
        $.goto = 14;
        $p = $mcall("call", Object.prototype.hasOwnProperty, $l[0][1], $l[0][5]);
        $.state = 14;
      }

    case 14:
      if ($p) {
        if ($l[0][4]) {
          $.goto = 20;
          $p = $mcall("getOwnPropertyDescriptor", Object, $l[0][1], $l[0][5]);
          continue;
        } else {
          $l[2] = null;
          $.goto = 16;
          continue;
        }
      } else {
        $.state = 15;
      }

    case 15:
      $l = $.$ = $l.slice();
      $.goto = 12;
      continue;

    case 16:
      $lset($l[0], 6,
      /*desc*/
      $l[2]);
      $1 = $l[0][6];

      if ($1) {
        $1 = $l[0][6].get;

        if ($1) {
          $.goto = 19;
          continue;
        } else {
          $1 = $l[0][6].set;
          $.goto = 19;
          continue;
        }
      } else {
        $.state = 17;
      }

    case 17:
      if ($1) {
        $.goto = 18;
        $mcall("defineProperty", Object, $l[0][3], $l[0][5], $l[0][6]);
        $.state = 18;
      } else {
        $set($l[0][3], $l[0][5], $l[0][1][$l[0][5]]);
        $.state = 18;
      }

    case 18:
      $.goto = 15;
      continue;

    case 19:
      $.goto = 17;
      continue;

    case 20:
      $l[2] = $p;
      $.goto = 16;
      continue;

    case 21:
      $l = $.$ = $l[0];
      $.goto = $l[7];
      continue;

    case 22:
      $set($l[3], "default", $l[1]);

      if ($l[2]) {
        $.goto = 23;
        $mcall("set", $l[2], $l[1], $l[3]);
        $.state = 23;
      } else {
        $.state = 23;
      }

    case 23:
      $.result = $l[3];
      $.goto = 28;
      continue;

    case 24:
      $.result = $p;
      $.goto = 28;
      continue;

    case 25:
      $l[8] = $p;
      $.goto = 6;
      continue;

    case 26:
      $.goto = 3;
      continue;

    case 27:
      $.goto = 28;
      return $unhandled($.error);

    case 28:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 20:
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
      $l[0][7] = 27;
      $.goto = 21;
      break;

    default:
      $.goto = 27;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 20:
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
      $l[0][7] = 28;
      $.goto = 21;
      break;

    default:
      $.goto = 28;
      break;
  }
}, 1, [[0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [2, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [1, null, $s$4], [1, null, $s$4], [3, null, $s$5], [3, null, $s$5], [1, null, $s$4], [1, null, $s$5], [3, null, $s$5], [1, null, $s$4], [1, null, $s$4], [1, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
    $m$4 = $M.fun("m$4", "c", null, $m$0, [], 0, 5, "4:0-6:1", 2, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("5:2-5:11");
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
        return $yld($l[3].value);
      }

    case 6:
      $.goto = 15;
      continue;

    case 7:
      $l[4] = $p;
      $.goto = 3;
      continue;

    case 8:
      if ($l[2].throw) {
        $.state = 9;
      } else {
        $.error = $M.iterErrUndef();
        $l[1] = 14;
        $.goto = 11;
        continue;
      }

    case 9:
      $.goto = 10;
      $p = $iterErr($l[2], $.error);
      $.state = 10;

    case 10:
      $l[3] = $p;
      $.goto = 5;
      continue;

    case 11:
      $.goto = 12;
      $p = $iterFin($l[2], $.result);
      $.state = 12;

    case 12:
      if ($p.done) {
        $.goto = $l[1];
        continue;
      } else {
        $.goto = 13;
        return $yld($p.value);
      }

    case 13:
      $l[4] = $p;
      $.goto = 3;
      continue;

    case 14:
      $.goto = 15;
      return $unhandledG($.error);

    case 15:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 7:
    case 5:
      $.goto = 8;
      break;

    case 8:
    case 4:
    case 3:
      $l[1] = 14;
      $.goto = 11;
      break;

    default:
      $.goto = 14;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 8:
    case 7:
    case 5:
    case 4:
    case 3:
      $l[1] = 15;
      $.goto = 11;
      break;

    default:
      $.goto = 15;
      break;
  }
}, 1, [[4, "5:2-5:11", $s$6], [2, "5:2-5:10", $s$6], [0, null, $s$6], [1, "5:2-5:10", $s$6], [1, null, $s$6], [1, null, $s$6], [0, null, $s$6], [1, null, $s$6], [1, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [16, "6:1-6:1", $s$6], [16, "6:1-6:1", $s$6]]);

$M.moduleExports();