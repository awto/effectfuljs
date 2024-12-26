"no-ctrl";

var $M = require("@effectful/debugger"),
  $forInIterator = $M.forInIterator,
  $awt = $M.awt,
  $x = $M.context,
  $ret = $M.ret,
  $retA = $M.retA,
  $unhandled = $M.unhandled,
  $unhandledA = $M.unhandledA,
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
    _core: [1, null],
    _getRequireWildcardCache: [2, null],
    _interopRequireWildcard: [3, null],
    a: [4, "21:15-21:16"],
    b: [5, "30:15-30:16"],
    c: [6, "39:15-39:16"],
    d: [7, "48:15-48:16"]
  }, null, 0],
  $s$2 = [{
    e: [1, null],
    r: [2, null],
    t: [3, null]
  }, $s$1, 1],
  $s$3 = [{
    e: [1, null]
  }, $s$2, 2],
  $s$4 = [{
    e: [1, null],
    r: [2, null],
    t: [3, null],
    n: [4, null],
    a: [5, null],
    u: [6, null],
    i: [7, null]
  }, $s$1, 1],
  $s$5 = [{}, $s$4, 2],
  $s$6 = [{}, $s$1, 1],
  $s$7 = [{}, $s$1, 1],
  $s$8 = [{}, $s$1, 1],
  $s$9 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 8, "1:0-56:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $lset($l, 2, $m$1($));
        $lset($l, 3, $m$3($));
        $lset($l, 4, $m$4($));
        $lset($l, 5, $m$5($));
        $lset($l, 6, $m$6($));
        $lset($l, 7, $m$7($));
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.moduleId = require.resolve("@effectful/core"), $force(require("@effectful/core")));
        $.state = 2;
      case 2:
        $.goto = 3;
        $p = ($x.call = $l[3])($p);
        $.state = 3;
      case 3:
        $lset($l, 1, $p);
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $.goto = 5;
        $p = ($x.call = $get, $l[1].default);
        $.state = 5;
      case 5:
        $.goto = 7;
        $mcall("option", $p, {
          combineOps: true,
          scopeContext: true,
          scopePrefix: true,
          contextState: false,
          topLevel: false,
          contextMethodOps: true,
          cleanupFrameVars: false,
          par: true,
          keepLastPure: true,
          defunct: true,
          storeCont: "$state",
          storeHandler: "$run",
          reuseTempVars: true,
          blockDirsFunc: "block"
        });
        continue;
      case 6:
        $.goto = 7;
        return $unhandled($.error);
      case 7:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 0, [[4, "1:0-1:32", $s$1], [2, null, $s$1], [2, null, $s$1], [4, "4:0-19:3", $s$1], [2, "4:0-4:1", $s$1], [2, "4:0-19:2", $s$1], [16, "56:0-56:0", $s$1], [16, "56:0-56:0", $s$1]]),
  $m$1 = $M.fun("m$1", "_getRequireWildcardCache", null, $m$0, ["e"], 0, 4, null, 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        if ("function" != typeof WeakMap) {
          $.state = 1;
        } else {
          $.goto = 2;
          continue;
        }
      case 1:
        $.result = null;
        $.goto = 7;
        continue;
      case 2:
        $.goto = 3;
        $p = new ($x.call = WeakMap)();
        $.state = 3;
      case 3:
        $lset($l, 2, $p);
        $.goto = 4;
        $p = new ($x.call = WeakMap)();
        $.state = 4;
      case 4:
        $lset($l, 3, $p);
        $.goto = 5;
        $p = ($x.call = $lset($l[0], 2, $m$2($)))($l[1]);
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
  }, null, null, 1, [[0, null, $s$2], [0, null, $s$2], [2, null, $s$2], [2, null, $s$2], [2, null, $s$2], [0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
  $m$2 = $M.fun("m$2", null, null, $m$1, ["e"], 0, 2, null, 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        if ($l[1]) {
          $.state = 1;
        } else {
          $.goto = 3;
          continue;
        }
      case 1:
        $.result = $l[0][3];
        $.state = 2;
      case 2:
        $.goto = 5;
        continue;
      case 3:
        $.result = $l[0][2];
        $.goto = 2;
        continue;
      case 4:
        $.goto = 5;
        return $unhandled($.error);
      case 5:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
  $m$3 = $M.fun("m$3", "_interopRequireWildcard", null, $m$0, ["e", "r"], 1, 12, null, 0, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[9] = !$l[2];
        if ($l[9]) {
          $.state = 1;
        } else {
          $.goto = 2;
          continue;
        }
      case 1:
        $l[9] = $l[1];
        $.state = 2;
      case 2:
        if ($l[9]) {
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
        $l[9] = $p;
        $.state = 5;
      case 5:
        if ($l[9]) {
          $.state = 6;
        } else {
          $.goto = 7;
          continue;
        }
      case 6:
        $.result = $l[1];
        $.goto = 58;
        continue;
      case 7:
        $1 = null === $l[1];
        if ($1) {
          $.state = 8;
        } else {
          $.goto = 54;
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
        $.result = {
          default: $l[1]
        };
        $.goto = 58;
        continue;
      case 10:
        $.goto = 11;
        $p = ($x.call = $l[0][2])($l[2]);
        $.state = 11;
      case 11:
        $lset($l, 3, $p);
        $l[10] = $l[3];
        if ($l[10]) {
          $.state = 12;
        } else {
          $.goto = 14;
          continue;
        }
      case 12:
        $.goto = 13;
        $p = $mcall("has", $l[3], $l[1]);
        $.state = 13;
      case 13:
        $l[10] = $p;
        $.state = 14;
      case 14:
        if ($l[10]) {
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
        $.goto = 58;
        continue;
      case 17:
        $lset($l, 4, {
          __proto__: null
        });
        $.goto = 18;
        $p = ($x.call = $get, Object.defineProperty);
        $.state = 18;
      case 18:
        $l[11] = $p;
        if ($l[11]) {
          $.state = 19;
        } else {
          $.goto = 21;
          continue;
        }
      case 19:
        $.goto = 20;
        $p = ($x.call = $get, Object.getOwnPropertyDescriptor);
        $.state = 20;
      case 20:
        $l[11] = $p;
        $.state = 21;
      case 21:
        $lset($l, 5, $l[11]);
        $.state = 22;
      case 22:
        $l = $.$ = [$l, void 0, void 0, void 0, void 0];
        $.goto = 23;
        $p = $forInIterator($l[0][1]);
        $.state = 23;
      case 23:
        $l[1] = $p;
        $.state = 24;
      case 24:
        $x.call = $l[1].next;
        $.goto = 25;
        $p = $l[1].next();
        $.state = 25;
      case 25:
        if ($p.done) {
          $.state = 26;
        } else {
          $.goto = 27;
          continue;
        }
      case 26:
        $l[0][8] = 50;
        $.goto = 49;
        continue;
      case 27:
        $lset($l[0], 6, $p.value);
        $l[2] = "default" !== $l[0][6];
        if ($l[2]) {
          $.state = 28;
        } else {
          $.goto = 31;
          continue;
        }
      case 28:
        $.goto = 29;
        $p = ($x.call = $get, {}.hasOwnProperty);
        $.state = 29;
      case 29:
        $.goto = 30;
        $p = $mcall("call", $p, $l[0][1], $l[0][6]);
        $.state = 30;
      case 30:
        $l[2] = $p;
        $.state = 31;
      case 31:
        if ($l[2]) {
          $.state = 32;
        } else {
          $.goto = 47;
          continue;
        }
      case 32:
        if ($l[0][5]) {
          $.state = 33;
        } else {
          $.goto = 46;
          continue;
        }
      case 33:
        $.goto = 34;
        $p = $mcall("getOwnPropertyDescriptor", Object, $l[0][1], $l[0][6]);
        $.state = 34;
      case 34:
        $l[3] = $p;
        $.state = 35;
      case 35:
        $lset($l[0], 7, $l[3]);
        $l[4] = $l[0][7];
        if ($l[4]) {
          $.state = 36;
        } else {
          $.goto = 41;
          continue;
        }
      case 36:
        $.goto = 37;
        $p = ($x.call = $get, $l[0][7].get);
        $.state = 37;
      case 37:
        $l[4] = $p;
        if ($l[4]) {
          $.state = 38;
        } else {
          $.goto = 39;
          continue;
        }
      case 38:
        $.goto = 41;
        continue;
      case 39:
        $.goto = 40;
        $p = ($x.call = $get, $l[0][7].set);
        $.state = 40;
      case 40:
        $l[4] = $p;
        $.goto = 38;
        continue;
      case 41:
        if ($l[4]) {
          $.state = 42;
        } else {
          $.goto = 44;
          continue;
        }
      case 42:
        $.goto = 43;
        $mcall("defineProperty", Object, $l[0][4], $l[0][6], $l[0][7]);
        $.state = 43;
      case 43:
        $.goto = 47;
        continue;
      case 44:
        $.goto = 45;
        $p = ($x.call = $get, $l[0][1][$l[0][6]]);
        $.state = 45;
      case 45:
        $.goto = 43;
        $set($l[0][4], $l[0][6], $p);
        continue;
      case 46:
        $l[3] = null;
        $.goto = 35;
        continue;
      case 47:
        $l = $.$ = [$l[0], $l[1], void 0, void 0, void 0];
        $.goto = 24;
        continue;
      case 48:
        return $raise($.error);
      case 49:
        $l = $.$ = $l[0];
        $.goto = $l[8];
        continue;
      case 50:
        $.goto = 51;
        $set($l[4], "default", $l[1]);
        $.state = 51;
      case 51:
        if ($l[3]) {
          $.state = 52;
        } else {
          $.goto = 53;
          continue;
        }
      case 52:
        $.goto = 53;
        $mcall("set", $l[3], $l[1], $l[4]);
        $.state = 53;
      case 53:
        $.result = $l[4];
        $.goto = 58;
        continue;
      case 54:
        $1 = "object" != typeof $l[1];
        if ($1) {
          $.state = 55;
        } else {
          $.goto = 56;
          continue;
        }
      case 55:
        $1 = "function" != typeof $l[1];
        $.state = 56;
      case 56:
        $.goto = 8;
        continue;
      case 57:
        $.goto = 58;
        return $unhandled($.error);
      case 58:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, function ($, $l) {
    switch ($.state) {
      case 47:
      case 46:
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
        $.goto = 49;
        $l[0][8] = 48;
        break;
      default:
        $.goto = 57;
    }
  }, function ($, $l) {
    switch ($.state) {
      case 47:
      case 46:
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
        $l[0][8] = 58;
        $.goto = 49;
        break;
      default:
        $.goto = 58;
        break;
    }
  }, 1, [[0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [2, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
  $m$4 = $M.fun("m$4", "a", null, $m$0, [], 0, 1, "21:0-28:1", 1, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        return $awt(s_1);
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = ($x.call = $get, $l[0][1].default);
        $.state = 4;
      case 4:
        $.goto = 5;
        $mcall("block", $p, "par");
        $.state = 5;
      case 5:
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        $.goto = 7;
        return $awt(p_1);
      case 7:
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        $.goto = 9;
        return $awt(p_2);
      case 9:
        $.goto = 10;
        $brk();
        $.state = 10;
      case 10:
        $.goto = 12;
        $brk();
        continue;
      case 11:
        $.goto = 12;
        return $unhandledA($.error);
      case 12:
        return $retA($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "22:2-22:12", $s$6], [2, "22:2-22:11", $s$6], [4, "24:4-24:19", $s$6], [2, "24:4-24:5", $s$6], [2, "24:4-24:18", $s$6], [4, "25:4-25:14", $s$6], [2, "25:4-25:13", $s$6], [4, "26:4-26:14", $s$6], [2, "26:4-26:13", $s$6], [36, "27:3-27:3", $s$6], [36, "28:1-28:1", $s$6], [16, "28:1-28:1", $s$6], [16, "28:1-28:1", $s$6]]),
  $m$5 = $M.fun("m$5", "b", null, $m$0, [], 0, 1, "30:0-37:1", 1, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        return $awt(s_1);
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        0;
        $.goto = 4;
        $p = ($x.call = $get, $l[0][1].block);
        $.state = 4;
      case 4:
        $.goto = 5;
        ($x.call = $p)("par");
        $.state = 5;
      case 5:
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        $.goto = 7;
        return $awt(p_1);
      case 7:
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        $.goto = 9;
        return $awt(p_2);
      case 9:
        $.goto = 10;
        $brk();
        $.state = 10;
      case 10:
        $.goto = 12;
        $brk();
        continue;
      case 11:
        $.goto = 12;
        return $unhandledA($.error);
      case 12:
        return $retA($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "31:2-31:12", $s$7], [2, "31:2-31:11", $s$7], [4, "33:4-33:16", $s$7], [2, "33:4-33:8", $s$7], [2, "33:4-33:15", $s$7], [4, "34:4-34:14", $s$7], [2, "34:4-34:13", $s$7], [4, "35:4-35:14", $s$7], [2, "35:4-35:13", $s$7], [36, "36:3-36:3", $s$7], [36, "37:1-37:1", $s$7], [16, "37:1-37:1", $s$7], [16, "37:1-37:1", $s$7]]),
  $m$6 = $M.fun("m$6", "c", null, $m$0, [], 0, 1, "39:0-46:1", 1, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        return $awt(s_1);
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        0;
        $.goto = 4;
        $p = ($x.call = $get, $l[0][1].block);
        $.state = 4;
      case 4:
        $.goto = 5;
        ($x.call = $p)("par");
        $.state = 5;
      case 5:
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        $.goto = 7;
        return $awt(p_1);
      case 7:
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        $.goto = 9;
        return $awt(p_2);
      case 9:
        $.goto = 10;
        $brk();
        $.state = 10;
      case 10:
        $.goto = 12;
        $brk();
        continue;
      case 11:
        $.goto = 12;
        return $unhandledA($.error);
      case 12:
        return $retA($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "40:2-40:12", $s$8], [2, "40:2-40:11", $s$8], [4, "42:4-42:17", $s$8], [2, "42:4-42:9", $s$8], [2, "42:4-42:16", $s$8], [4, "43:4-43:14", $s$8], [2, "43:4-43:13", $s$8], [4, "44:4-44:14", $s$8], [2, "44:4-44:13", $s$8], [36, "45:3-45:3", $s$8], [36, "46:1-46:1", $s$8], [16, "46:1-46:1", $s$8], [16, "46:1-46:1", $s$8]]),
  $m$7 = $M.fun("m$7", "d", null, $m$0, [], 0, 1, "48:0-55:1", 1, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        return $awt(s_1);
      case 2:
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        "par";
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $.goto = 5;
        return $awt(p_1);
      case 5:
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        $.goto = 7;
        return $awt(p_2);
      case 7:
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        $.goto = 10;
        $brk();
        continue;
      case 9:
        $.goto = 10;
        return $unhandledA($.error);
      case 10:
        return $retA($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "49:2-49:12", $s$9], [2, "49:2-49:11", $s$9], [4, "51:4-51:12", $s$9], [4, "52:4-52:14", $s$9], [2, "52:4-52:13", $s$9], [4, "53:4-53:14", $s$9], [2, "53:4-53:13", $s$9], [36, "54:3-54:3", $s$9], [36, "55:1-55:1", $s$9], [16, "55:1-55:1", $s$9], [16, "55:1-55:1", $s$9]]);
$M.moduleExports();