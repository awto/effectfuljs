"no-ctrl";

var $M = require("@effectful/debugger"),
  $forInIterator = $M.forInIterator,
  $yld = $M.yld,
  $x = $M.context,
  $ret = $M.ret,
  $retG = $M.retG,
  $unhandled = $M.unhandled,
  $unhandledG = $M.unhandledG,
  $brk = $M.brk,
  $force = $M.force,
  $mcall = $M.mcall,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    Z: [1, null],
    _interopRequireWildcard: [2, null],
    a: [3, "3:10-3:11"]
  }, null, 0],
  $s$2 = [{
    e: [1, null],
    t: [2, null],
    r: [3, null],
    n: [4, null]
  }, $s$1, 1],
  $s$3 = [{
    e: [1, null],
    t: [2, null],
    o: [3, null],
    i: [4, null],
    f: [5, null]
  }, $s$2, 2],
  $s$4 = [{
    t: [6, null]
  }, $s$3, 2],
  $s$5 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 5, "1:0-7:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2] = $m$1($);
        $l[3] = $m$3($);
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $l[4] = $l[2];
        $.goto = 2;
        $p = ($x.moduleId = require.resolve("@effectful/generators"), $force(require("@effectful/generators")));
        $.state = 2;
      case 2:
        $.goto = 3;
        $p = ($x.call = $l[4])($p);
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
  }, null, null, 0, [[4, "1:0-1:43", $s$1], [2, null, $s$1], [2, null, $s$1], [0, null, $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]),
  $m$1 = $M.fun("m$1", "_interopRequireWildcard", null, $m$0, ["e", "t"], 0, 5, null, 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        if ("function" == typeof WeakMap) {
          $.state = 1;
        } else {
          $.goto = 4;
          continue;
        }
      case 1:
        $.goto = 2;
        $p = new ($x.call = WeakMap)();
        $.state = 2;
      case 2:
        $l[3] = $p;
        $.goto = 3;
        $p = new ($x.call = WeakMap)();
        $.state = 3;
      case 3:
        $l[4] = $p;
        $.state = 4;
      case 4:
        $.goto = 5;
        $p = ($x.call = $l[0][2] = $m$2($))($l[1], $l[2]);
        $.state = 5;
      case 5:
        $.result = $p;
        $.goto = 7;
        continue;
      case 6:
        $.goto = 7;
        return $unhandled($.error);
      case 7:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[0, null, $s$2], [2, null, $s$2], [2, null, $s$2], [0, null, $s$2], [2, null, $s$2], [0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
  $m$2 = $M.fun("m$2", null, null, $m$1, ["e", "t"], 1, 9, null, 0, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $1 = !$l[2];
        if ($1) {
          $.state = 1;
        } else {
          $.goto = 2;
          continue;
        }
      case 1:
        $1 = $l[1];
        $.state = 2;
      case 2:
        if ($1) {
          $.state = 3;
        } else {
          $.goto = 4;
          continue;
        }
      case 3:
        $1 = $l[1].__esModule;
        $.state = 4;
      case 4:
        if ($1) {
          $.state = 5;
        } else {
          $.goto = 6;
          continue;
        }
      case 5:
        $.result = $l[1];
        $.goto = 43;
        continue;
      case 6:
        $l[5] = {
          __proto__: null,
          default: $l[1]
        };
        $1 = null === $l[1];
        if ($1) {
          $.state = 7;
        } else {
          $.goto = 39;
          continue;
        }
      case 7:
        if ($1) {
          $.state = 8;
        } else {
          $.goto = 9;
          continue;
        }
      case 8:
        $.result = $l[5];
        $.goto = 43;
        continue;
      case 9:
        if ($l[2]) {
          $.state = 10;
        } else {
          $.goto = 38;
          continue;
        }
      case 10:
        $1 = $l[0][4];
        $.state = 11;
      case 11:
        if ($l[3] = $1) {
          $.state = 12;
        } else {
          $.goto = 17;
          continue;
        }
      case 12:
        $.goto = 13;
        $p = $mcall("has", $l[3], $l[1]);
        $.state = 13;
      case 13:
        if ($p) {
          $.state = 14;
        } else {
          $.goto = 16;
          continue;
        }
      case 14:
        $.goto = 15;
        $p = $mcall("get", $l[3], $l[1]);
        $.state = 15;
      case 15:
        $.result = $p;
        $.goto = 43;
        continue;
      case 16:
        $.goto = 17;
        $mcall("set", $l[3], $l[1], $l[5]);
        $.state = 17;
      case 17:
        $.goto = 18;
        $p = $forInIterator($l[1]);
        $.state = 18;
      case 18:
        $l[7] = $p;
        $.state = 19;
      case 19:
        $x.call = $l[7].next;
        $.goto = 20;
        $p = $l[7].next();
        $.state = 20;
      case 20:
        if ($p.done) {
          $.state = 21;
        } else {
          $.goto = 22;
          continue;
        }
      case 21:
        $.result = $l[5];
        $.goto = 43;
        continue;
      case 22:
        $l[6] = $p.value;
        $l[8] = "default" !== $l[6];
        if ($l[8]) {
          $.state = 23;
        } else {
          $.goto = 25;
          continue;
        }
      case 23:
        $.goto = 24;
        $p = $mcall("call", {}.hasOwnProperty, $l[1], $l[6]);
        $.state = 24;
      case 24:
        $l[8] = $p;
        $.state = 25;
      case 25:
        if ($l[8]) {
          $.state = 26;
        } else {
          $.goto = 37;
          continue;
        }
      case 26:
        $l[8] = $l[3] = Object.defineProperty;
        if ($l[8]) {
          $.state = 27;
        } else {
          $.goto = 29;
          continue;
        }
      case 27:
        $.goto = 28;
        $p = $mcall("getOwnPropertyDescriptor", Object, $l[1], $l[6]);
        $.state = 28;
      case 28:
        $l[8] = $p;
        $.state = 29;
      case 29:
        $1 = $l[4] = $l[8];
        if ($1) {
          $.state = 30;
        } else {
          $.goto = 33;
          continue;
        }
      case 30:
        $1 = $l[4].get;
        if ($1) {
          $.state = 31;
        } else {
          $.goto = 32;
          continue;
        }
      case 31:
        $.goto = 33;
        continue;
      case 32:
        $1 = $l[4].set;
        $.goto = 31;
        continue;
      case 33:
        if ($1) {
          $.state = 34;
        } else {
          $.goto = 36;
          continue;
        }
      case 34:
        $.goto = 35;
        ($x.call = $l[3])($l[5], $l[6], $l[4]);
        $.state = 35;
      case 35:
        $.goto = 37;
        continue;
      case 36:
        $l[5][$l[6]] = $l[1][$l[6]];
        $.goto = 35;
        continue;
      case 37:
        $.goto = 19;
        continue;
      case 38:
        $1 = $l[0][3];
        $.goto = 11;
        continue;
      case 39:
        $1 = "object" != typeof $l[1];
        if ($1) {
          $.state = 40;
        } else {
          $.goto = 41;
          continue;
        }
      case 40:
        $1 = "function" != typeof $l[1];
        $.state = 41;
      case 41:
        $.goto = 7;
        continue;
      case 42:
        $.goto = 43;
        return $unhandled($.error);
      case 43:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [2, null, $s$3], [0, null, $s$3], [2, null, $s$3], [0, null, $s$3], [2, null, $s$3], [2, null, $s$4], [0, null, $s$3], [2, null, $s$4], [0, null, $s$3], [0, null, $s$3], [0, null, $s$4], [2, null, $s$4], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [2, null, $s$4], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [2, null, $s$4], [0, null, $s$3], [0, null, $s$4], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
  $m$3 = $M.fun("m$3", "a", null, $m$0, [], 0, 1, "3:0-6:1", 2, function ($, $l, $p) {
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
  }, null, null, 1, [[4, "4:2-4:10", $s$5], [2, "4:2-4:9", $s$5], [4, "5:2-5:10", $s$5], [2, "5:2-5:9", $s$5], [36, "6:1-6:1", $s$5], [16, "6:1-6:1", $s$5], [16, "6:1-6:1", $s$5]]);
$M.moduleExports();