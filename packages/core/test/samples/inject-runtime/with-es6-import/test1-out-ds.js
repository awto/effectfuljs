"no-ctrl";

var $M = require("@effectful/debugger"),
  $forInIterator = $M.forInIterator,
  $yld = $M.yld,
  $x = $M.context,
  $ret = $M.ret,
  $retG = $M.retG,
  $unhandled = $M.unhandled,
  $unhandledG = $M.unhandledG,
  $raise = $M.raise,
  $brk = $M.brk,
  $force = $M.force,
  $get = $M.get,
  $lset = $M.lset,
  $mcall = $M.mcall,
  $set = $M.set,
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
    t: [1, null]
  }, $s$3, 3],
  $s$5 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 5, "1:0-7:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $lset($l, 2, $m$1($));
        $lset($l, 3, $m$3($));
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
        $lset($l, 1, $p);
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
        $lset($l, 3, $p);
        $.goto = 3;
        $p = new ($x.call = WeakMap)();
        $.state = 3;
      case 3:
        $lset($l, 4, $p);
        $.state = 4;
      case 4:
        $.goto = 5;
        $p = ($x.call = $lset($l[0], 2, $m$2($)))($l[1], $l[2]);
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
  $m$2 = $M.fun("m$2", null, null, $m$1, ["e", "t"], 1, 8, null, 0, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[7] = !$l[2];
        if ($l[7]) {
          $.state = 1;
        } else {
          $.goto = 2;
          continue;
        }
      case 1:
        $l[7] = $l[1];
        $.state = 2;
      case 2:
        if ($l[7]) {
          $.state = 3;
        } else {
          $.goto = 5;
          continue;
        }
      case 3:
        $.goto = 4;
        $p = ($x.call = $get, $l[1].__esModule);
        $.state = 4;
      case 4:
        $l[7] = $p;
        $.state = 5;
      case 5:
        if ($l[7]) {
          $.state = 6;
        } else {
          $.goto = 7;
          continue;
        }
      case 6:
        $.result = $l[1];
        $.goto = 53;
        continue;
      case 7:
        $lset($l, 5, {
          __proto__: null,
          default: $l[1]
        });
        $1 = null === $l[1];
        if ($1) {
          $.state = 8;
        } else {
          $.goto = 49;
          continue;
        }
      case 8:
        if ($1) {
          $.state = 9;
        } else {
          $.goto = 10;
          continue;
        }
      case 9:
        $.result = $l[5];
        $.goto = 53;
        continue;
      case 10:
        if ($l[2]) {
          $.state = 11;
        } else {
          $.goto = 48;
          continue;
        }
      case 11:
        $1 = $l[0][4];
        $.state = 12;
      case 12:
        if ($lset($l, 3, $1)) {
          $.state = 13;
        } else {
          $.goto = 18;
          continue;
        }
      case 13:
        $.goto = 14;
        $p = $mcall("has", $l[3], $l[1]);
        $.state = 14;
      case 14:
        if ($p) {
          $.state = 15;
        } else {
          $.goto = 17;
          continue;
        }
      case 15:
        $.goto = 16;
        $p = $mcall("get", $l[3], $l[1]);
        $.state = 16;
      case 16:
        $.result = $p;
        $.goto = 53;
        continue;
      case 17:
        $.goto = 18;
        $mcall("set", $l[3], $l[1], $l[5]);
        $.state = 18;
      case 18:
        $.state = 19;
      case 19:
        $l = $.$ = [$l, void 0, void 0, void 0, void 0, void 0];
        $.goto = 20;
        $p = $forInIterator($l[0][1]);
        $.state = 20;
      case 20:
        $l[2] = $p;
        $.state = 21;
      case 21:
        $x.call = $l[2].next;
        $.goto = 22;
        $p = $l[2].next();
        $.state = 22;
      case 22:
        if ($p.done) {
          $.state = 23;
        } else {
          $.goto = 24;
          continue;
        }
      case 23:
        $l[0][6] = 47;
        $.goto = 46;
        continue;
      case 24:
        $lset($l, 1, $p.value);
        $l[3] = "default" !== $l[1];
        if ($l[3]) {
          $.state = 25;
        } else {
          $.goto = 28;
          continue;
        }
      case 25:
        $.goto = 26;
        $p = ($x.call = $get, {}.hasOwnProperty);
        $.state = 26;
      case 26:
        $.goto = 27;
        $p = $mcall("call", $p, $l[0][1], $l[1]);
        $.state = 27;
      case 27:
        $l[3] = $p;
        $.state = 28;
      case 28:
        if ($l[3]) {
          $.state = 29;
        } else {
          $.goto = 44;
          continue;
        }
      case 29:
        $.goto = 30;
        $p = ($x.call = $get, Object.defineProperty);
        $.state = 30;
      case 30:
        $l[4] = $lset($l[0], 3, $p);
        if ($l[4]) {
          $.state = 31;
        } else {
          $.goto = 33;
          continue;
        }
      case 31:
        $.goto = 32;
        $p = $mcall("getOwnPropertyDescriptor", Object, $l[0][1], $l[1]);
        $.state = 32;
      case 32:
        $l[4] = $p;
        $.state = 33;
      case 33:
        $l[5] = $lset($l[0], 4, $l[4]);
        if ($l[5]) {
          $.state = 34;
        } else {
          $.goto = 39;
          continue;
        }
      case 34:
        $.goto = 35;
        $p = ($x.call = $get, $l[0][4].get);
        $.state = 35;
      case 35:
        $l[5] = $p;
        if ($l[5]) {
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
        $p = ($x.call = $get, $l[0][4].set);
        $.state = 38;
      case 38:
        $l[5] = $p;
        $.goto = 36;
        continue;
      case 39:
        if ($l[5]) {
          $.state = 40;
        } else {
          $.goto = 42;
          continue;
        }
      case 40:
        $.goto = 41;
        ($x.call = $l[0][3])($l[0][5], $l[1], $l[0][4]);
        $.state = 41;
      case 41:
        $.goto = 44;
        continue;
      case 42:
        $.goto = 43;
        $p = ($x.call = $get, $l[0][1][$l[1]]);
        $.state = 43;
      case 43:
        $.goto = 41;
        $set($l[0][5], $l[1], $p);
        continue;
      case 44:
        $l = $.$ = [$l[0], void 0, $l[2], void 0, void 0, void 0];
        $.goto = 21;
        continue;
      case 45:
        return $raise($.error);
      case 46:
        $l = $.$ = $l[0];
        $.goto = $l[6];
        continue;
      case 47:
        $.result = $l[5];
        $.goto = 53;
        continue;
      case 48:
        $1 = $l[0][3];
        $.goto = 12;
        continue;
      case 49:
        $1 = "object" != typeof $l[1];
        if ($1) {
          $.state = 50;
        } else {
          $.goto = 51;
          continue;
        }
      case 50:
        $1 = "function" != typeof $l[1];
        $.state = 51;
      case 51:
        $.goto = 8;
        continue;
      case 52:
        $.goto = 53;
        return $unhandled($.error);
      case 53:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, function ($, $l) {
    switch ($.state) {
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
      case 21:
        $.goto = 46;
        $l[0][6] = 45;
        break;
      default:
        $.goto = 52;
    }
  }, function ($, $l) {
    switch ($.state) {
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
      case 21:
        $l[0][6] = 53;
        $.goto = 46;
        break;
      default:
        $.goto = 53;
        break;
    }
  }, 2, [[0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [2, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [2, null, $s$3], [0, null, $s$3], [2, null, $s$3], [0, null, $s$3], [2, null, $s$3], [0, null, $s$3], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
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