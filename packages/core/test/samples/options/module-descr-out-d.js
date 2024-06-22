var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $retA = $M.retA,
  $retG = $M.retG,
  $unhandled = $M.unhandled,
  $unhandledA = $M.unhandledA,
  $unhandledG = $M.unhandledG,
  $raise = $M.raise,
  $brk = $M.brk,
  $force = $M.force,
  $mcall = $M.mcall,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    _defineProperties: [1, null],
    _createClass: [2, null],
    _toPropertyKey: [3, null],
    _toPrimitive: [4, null],
    _require: [5, null],
    mod: [6, "1:8-1:11"],
    C: [7, "3:9-3:10"],
    Cl: [8, "12:6-12:8"],
    obj1: [9, "30:6-30:10"]
  }, null, 0],
  $s$2 = [{
    e: [1, null],
    r: [2, null],
    t: [3, null],
    o: [4, null]
  }, $s$1, 1],
  $s$3 = [{
    e: [1, null],
    r: [2, null],
    t: [3, null]
  }, $s$1, 1],
  $s$4 = [{
    t: [1, null],
    i: [2, null]
  }, $s$1, 1],
  $s$5 = [{
    t: [1, null],
    r: [2, null],
    e: [3, null],
    i: [4, null]
  }, $s$1, 1],
  $s$6 = [{
    a: [1, "3:11-3:12"]
  }, $s$1, 1],
  $s$7 = [{
    e: [2, "7:11-7:12"]
  }, $s$6, 1],
  $s$8 = [{
    Cl: [1, null],
    _proto: [2, null]
  }, $s$1, 1],
  $s$9 = [{}, $s$8, 2],
  $s$10 = [{}, $s$8, 2],
  $s$11 = [{}, $s$8, 2],
  $s$12 = [{}, $s$11, 3],
  $s$13 = [{}, $s$8, 2],
  $s$14 = [{
    value: [1, "19:12-19:17"]
  }, $s$8, 2],
  $s$15 = [{
    a: [1, "31:8-31:9"]
  }, $s$1, 1],
  $s$16 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 10, "1:0-39:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = $m$1($);
        $l[2] = $m$2($);
        $l[3] = $m$3($);
        $l[4] = $m$4($);
        $l[7] = $m$5($);
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.moduleId = require.resolve("mod"), $force(require("mod")));
        $.state = 2;
      case 2:
        $l[5] = $p;
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $l[6] = $l[5].mod;
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $.goto = 5;
        $p = /*#__PURE__*/($x.call = $m$6($))();
        $.state = 5;
      case 5:
        $l[8] = $p;
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        $l[9] = {
          objFn: $m$13($)
        };
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        module.exports.fn2 = $m$14($);
        $.goto = 9;
        continue;
      case 8:
        $.goto = 9;
        return $unhandled($.error);
      case 9:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 0, [[4, "1:0-1:31", $s$1], [2, "1:16-1:30", $s$1], [4, "1:8-1:11", $s$1], [4, "12:6-27:12", $s$1], [2, null, $s$1], [4, "30:0-34:2", $s$1], [4, "36:0-38:2", $s$1], [0, "36:0-38:1", $s$1], [16, "39:0-39:0", $s$1], [16, "39:0-39:0", $s$1]]),
  $m$1 = $M.fun("m$1", "_defineProperties", null, $m$0, ["e", "r"], 1, 5, null, 0, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[3] = 0;
        $.state = 1;
      case 1:
        if ($l[3] < $l[2].length) {
          $.state = 2;
        } else {
          $.goto = 9;
          continue;
        }
      case 2:
        $l[4] = $l[2][$l[3]];
        $1 = $l[4].enumerable;
        if ($1) {
          $.state = 3;
        } else {
          $.goto = 8;
          continue;
        }
      case 3:
        $l[4].enumerable = $1;
        $l[4].configurable = !0;
        if ("value" in $l[4]) {
          $.state = 4;
        } else {
          $.goto = 5;
          continue;
        }
      case 4:
        $l[4].writable = !0;
        $.state = 5;
      case 5:
        $.goto = 6;
        $p = ($x.call = $l[0][3])($l[4].key);
        $.state = 6;
      case 6:
        $.goto = 7;
        $mcall("defineProperty", Object, $l[1], $p, $l[4]);
        $.state = 7;
      case 7:
        $l[3] = $l[3] + 1;
        $.goto = 1;
        continue;
      case 8:
        $1 = !1;
        $.goto = 3;
        continue;
      case 9:
        $.goto = 11;
        continue;
      case 10:
        $.goto = 11;
        return $unhandled($.error);
      case 11:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [2, null, $s$2], [2, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
  $m$2 = $M.fun("m$2", "_createClass", null, $m$0, ["e", "r", "t"], 0, 4, null, 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        if ($l[2]) {
          $.state = 1;
        } else {
          $.goto = 2;
          continue;
        }
      case 1:
        $.goto = 2;
        ($x.call = $l[0][1])($l[1].prototype, $l[2]);
        $.state = 2;
      case 2:
        if ($l[3]) {
          $.state = 3;
        } else {
          $.goto = 4;
          continue;
        }
      case 3:
        $.goto = 4;
        ($x.call = $l[0][1])($l[1], $l[3]);
        $.state = 4;
      case 4:
        $.goto = 5;
        $mcall("defineProperty", Object, $l[1], "prototype", {
          writable: !1
        });
        $.state = 5;
      case 5:
        $.result = $l[1];
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
  }, null, null, 1, [[0, null, $s$3], [2, null, $s$3], [0, null, $s$3], [2, null, $s$3], [2, null, $s$3], [0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
  $m$3 = $M.fun("m$3", "_toPropertyKey", null, $m$0, ["t"], 0, 3, null, 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($x.call = $l[0][4])($l[1], "string");
        $.state = 1;
      case 1:
        $l[2] = $p;
        if ("symbol" == typeof $l[2]) {
          $.state = 2;
        } else {
          $.goto = 4;
          continue;
        }
      case 2:
        $.result = $l[2];
        $.state = 3;
      case 3:
        $.goto = 6;
        continue;
      case 4:
        $.result = $l[2] + "";
        $.goto = 3;
        continue;
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
  $m$4 = $M.fun("m$4", "_toPrimitive", null, $m$0, ["t", "r"], 1, 5, null, 0, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $1 = "object" != typeof $l[1];
        if ($1) {
          $.state = 1;
        } else {
          $.goto = 16;
          continue;
        }
      case 1:
        if ($1) {
          $.state = 2;
        } else {
          $.goto = 3;
          continue;
        }
      case 2:
        $.result = $l[1];
        $.goto = 18;
        continue;
      case 3:
        $l[3] = $l[1][Symbol.toPrimitive];
        if (void 0 !== $l[3]) {
          $.state = 4;
        } else {
          $.goto = 11;
          continue;
        }
      case 4:
        $1 = $l[2];
        if ($1) {
          $.state = 5;
        } else {
          $.goto = 10;
          continue;
        }
      case 5:
        $.goto = 6;
        $p = $mcall("call", $l[3], $l[1], $1);
        $.state = 6;
      case 6:
        $l[4] = $p;
        if ("object" != typeof $l[4]) {
          $.state = 7;
        } else {
          $.goto = 8;
          continue;
        }
      case 7:
        $.result = $l[4];
        $.goto = 18;
        continue;
      case 8:
        $.goto = 9;
        $p = new ($x.call = TypeError)("@@toPrimitive must return a primitive value.");
        $.state = 9;
      case 9:
        $.goto = 11;
        return $raise($p);
      case 10:
        $1 = "default";
        $.goto = 5;
        continue;
      case 11:
        if ("string" === $l[2]) {
          $.state = 12;
        } else {
          $.goto = 15;
          continue;
        }
      case 12:
        $1 = String;
        $.state = 13;
      case 13:
        $.goto = 14;
        $p = ($x.call = $1)($l[1]);
        $.state = 14;
      case 14:
        $.result = $p;
        $.goto = 18;
        continue;
      case 15:
        $1 = Number;
        $.goto = 13;
        continue;
      case 16:
        $1 = !$l[1];
        $.goto = 1;
        continue;
      case 17:
        $.goto = 18;
        return $unhandled($.error);
      case 18:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [16, null, $s$5], [16, null, $s$5]]),
  $m$5 = $M.fun("m$5", "C", null, $m$0, ["a"], 0, 3, "3:0-10:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $brk();
        $.state = 2;
      case 2:
        $.goto = 3;
        $p = $mcall("fn1", $l[0][6], $l[1]);
        $.state = 3;
      case 3:
        $.goto = 4;
        $mcall("proc1", $l[0][6], $p);
        $.state = 4;
      case 4:
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $.goto = 6;
        $mcall("proc2", $l[0][6]);
        $.state = 6;
      case 6:
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        $.goto = 12;
        $brk();
        continue;
      case 8:
        $l[2] = $.error;
        $.error = void 0;
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        $.goto = 10;
        $mcall("proc3", $l[0][6], $l[2]);
        $.state = 10;
      case 10:
        $.goto = 7;
        $brk();
        continue;
      case 11:
        $.goto = 12;
        return $unhandled($.error);
      case 12:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, function ($, $l) {
    switch ($.state) {
      case 6:
      case 5:
      case 4:
      case 3:
      case 2:
      case 1:
        $.goto = 8;
        break;
      default:
        $.goto = 11;
    }
  }, null, 1, [[4, "4:2-9:3", $s$6], [5, "5:4-5:26", $s$6], [3, "5:14-5:24", $s$6], [3, "5:4-5:25", $s$6], [5, "6:4-6:16", $s$6], [3, "6:4-6:15", $s$6], [37, "7:3-7:3", $s$6], [36, "10:1-10:1", $s$6], [4, "8:4-8:17", $s$7], [2, "8:4-8:16", $s$7], [36, "9:3-9:3", $s$6], [16, "10:1-10:1", $s$6], [16, "10:1-10:1", $s$6]]),
  $m$6 = $M.fun("m$6", null, null, $m$0, [], 0, 3, "13:2-27:12", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = $m$7($);
        $l[2] = $l[1].prototype;
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $l[2].func = $m$8($);
        $.goto = 2;
        $brk();
        $.state = 2;
      case 2:
        $l[2].func = $m$9($);
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = ($x.call = $l[0][2])($l[1], [{
          key: "prop1",
          get: $m$11($),
          set: $m$12($)
        }]);
        $.state = 4;
      case 4:
        $.result = $p;
        $.goto = 6;
        continue;
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "22:2-24:12", $s$8], [4, "25:2-27:7", $s$8], [4, "16:2-21:3", $s$8], [2, null, $s$8], [0, null, $s$8], [16, "27:12-27:12", $s$8], [16, "27:12-27:12", $s$8]]),
  $m$7 = $M.fun("m$7", "Cl", null, $m$6, [], 0, 1, "13:2-15:3", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = not_traced)();
        $.state = 2;
      case 2:
        $.goto = 4;
        $brk();
        continue;
      case 3:
        $.goto = 4;
        return $unhandled($.error);
      case 4:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[4, "14:4-14:17", $s$9], [2, "14:4-14:16", $s$9], [36, "15:3-15:3", $s$9], [16, "15:3-15:3", $s$9], [16, "15:3-15:3", $s$9]]),
  $m$8 = $M.fun("m$8", "func", null, $m$6, [], 0, 1, "22:2-24:3", 1, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = not_traced)();
        $.state = 2;
      case 2:
        $.goto = 4;
        $brk();
        continue;
      case 3:
        $.goto = 4;
        return $unhandledA($.error);
      case 4:
        return $retA($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[4, "23:4-23:17", $s$10], [2, "23:4-23:16", $s$10], [36, "24:3-24:3", $s$10], [16, "24:3-24:3", $s$10], [16, "24:3-24:3", $s$10]]),
  $m$9 = $M.fun("m$9", "func", null, $m$6, [], 0, 1, "25:2-27:3", 2, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = not_traced)($m$10($));
        $.state = 2;
      case 2:
        $.goto = 4;
        $brk();
        continue;
      case 3:
        $.goto = 4;
        return $unhandledG($.error);
      case 4:
        return $retG($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[4, "26:4-26:44", $s$11], [2, "26:4-26:43", $s$11], [36, "27:3-27:3", $s$11], [16, "27:3-27:3", $s$11], [16, "27:3-27:3", $s$11]]),
  $m$10 = $M.fun("m$10", null, null, $m$9, [], 0, 2, "26:15-26:42", 4, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.call = traced)(1);
        $.state = 2;
      case 2:
        $l[1] = $p;
        $.goto = 3;
        $p = ($x.call = traced)(2);
        $.state = 3;
      case 3:
        $.result = $l[1] + $p;
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
  }, null, null, 3, [[4, "26:21-26:42", $s$12], [2, "26:21-26:30", $s$12], [2, "26:33-26:42", $s$12], [0, "26:21-26:42", $s$12], [16, "26:42-26:42", $s$12], [16, "26:42-26:42", $s$12]]),
  $m$11 = $M.fun("m$11", null, null, $m$6, [], 0, 1, "16:2-18:3", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = not_traced)();
        $.state = 2;
      case 2:
        $.goto = 4;
        $brk();
        continue;
      case 3:
        $.goto = 4;
        return $unhandled($.error);
      case 4:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[4, "17:4-17:17", $s$13], [2, "17:4-17:16", $s$13], [36, "18:3-18:3", $s$13], [16, "18:3-18:3", $s$13], [16, "18:3-18:3", $s$13]]),
  $m$12 = $M.fun("m$12", null, null, $m$6, ["value"], 0, 2, "19:2-21:3", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = not_traced)();
        $.state = 2;
      case 2:
        $.goto = 4;
        $brk();
        continue;
      case 3:
        $.goto = 4;
        return $unhandled($.error);
      case 4:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[4, "20:4-20:17", $s$14], [2, "20:4-20:16", $s$14], [36, "21:3-21:3", $s$14], [16, "21:3-21:3", $s$14], [16, "21:3-21:3", $s$14]]),
  $m$13 = $M.fun("m$13", null, null, $m$0, ["a"], 0, 2, "31:8-33:9", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = new ($x.call = $l[0][8])();
        $.state = 2;
      case 2:
        $.goto = 3;
        $mcall("fn", $p, $l[1]);
        $.state = 3;
      case 3:
        $.goto = 5;
        $brk();
        continue;
      case 4:
        $.goto = 5;
        return $unhandled($.error);
      case 5:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "32:4-32:19", $s$15], [2, "32:4-32:12", $s$15], [2, "32:4-32:18", $s$15], [36, "33:3-33:3", $s$15], [16, "33:9-33:9", $s$15], [16, "33:9-33:9", $s$15]]),
  $m$14 = $M.fun("m$14", "fn1", null, $m$0, [], 0, 2, "36:14-38:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = $mcall("f2", $l[0][6]);
        $.state = 2;
      case 2:
        $l[1] = $p;
        $.goto = 3;
        $p = new ($x.call = $l[0][7])();
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = $mcall("some", $l[0][6], {
          a: $l[1],
          b: [$p]
        });
        $.state = 4;
      case 4:
        $.result = $p;
        $.goto = 6;
        continue;
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "37:2-37:49", $s$16], [2, "37:23-37:31", $s$16], [2, "37:37-37:44", $s$16], [2, "37:9-37:48", $s$16], [0, null, $s$16], [16, "38:1-38:1", $s$16], [16, "38:1-38:1", $s$16]]);
$M.moduleExports();