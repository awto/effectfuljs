"no-ctrl";

var $M = require("@effectful/debugger"),
  $forInIterator = $M.forInIterator,
  $awt = $M.awt,
  $x = $M.context,
  $ret = $M.ret,
  $retA = $M.retA,
  $unhandled = $M.unhandled,
  $unhandledA = $M.unhandledA,
  $force = $M.force,
  $mcall = $M.mcall,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    _core: [1, null],
    _interopRequireWildcard: [2, null],
    a: [3, "21:15-21:16"],
    b: [4, "30:15-30:16"],
    c: [5, "39:15-39:16"],
    d: [6, "48:15-48:16"]
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
  $s$6 = [{}, $s$1, 1],
  $s$7 = [{}, $s$1, 1],
  $s$8 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 8, "1:0-56:0", 160, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2] = $m$1($);
        $l[3] = $m$3($);
        $l[4] = $m$4($);
        $l[5] = $m$5($);
        $l[6] = $m$6($);
        $l[7] = $l[2];
        $.goto = 1;
        $p = ($x.moduleId = require.resolve("@effectful/core"), $force(require("@effectful/core")));
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.call = $l[7])($p);
        $.state = 2;
      case 2:
        $l[1] = $p;
        $.goto = 4;
        $mcall("option", $l[1].default, {
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
      case 3:
        $.goto = 4;
        return $unhandled($.error);
      case 4:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 0, [[2, null, $s$1], [2, null, $s$1], [2, "4:0-19:2", $s$1], [16, "56:0-56:0", $s$1], [16, "56:0-56:0", $s$1]]),
  $m$1 = $M.fun("m$1", "_interopRequireWildcard", null, $m$0, ["e", "t"], 0, 5, null, 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        if ("function" == typeof WeakMap) {
          $.goto = 3;
          $p = new ($x.call = WeakMap)();
          continue;
        } else {
          $.state = 1;
        }
      case 1:
        $.goto = 2;
        $p = ($x.call = $l[0][2] = $m$2($))($l[1], $l[2]);
        $.state = 2;
      case 2:
        $.result = $p;
        $.goto = 6;
        continue;
      case 3:
        $l[3] = $p;
        $.goto = 4;
        $p = new ($x.call = WeakMap)();
        $.state = 4;
      case 4:
        $l[4] = $p;
        $.goto = 1;
        continue;
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, null, $s$2], [2, null, $s$2], [0, null, $s$2], [2, null, $s$2], [0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
  $m$2 = $M.fun("m$2", null, null, $m$1, ["e", "t"], 1, 9, null, 128, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $1 = !$l[2];
        if ($1) {
          $1 = $l[1];
          $.state = 1;
        } else {
          $.state = 1;
        }
      case 1:
        if ($1) {
          $1 = $l[1].__esModule;
          $.state = 2;
        } else {
          $.state = 2;
        }
      case 2:
        if ($1) {
          $.result = $l[1];
          $.goto = 24;
          continue;
        } else {
          $.state = 3;
        }
      case 3:
        $l[5] = {
          __proto__: null,
          default: $l[1]
        };
        $1 = null === $l[1];
        if ($1) {
          $.state = 4;
        } else {
          $1 = "object" != typeof $l[1];
          if ($1) {
            $1 = "function" != typeof $l[1];
            $.goto = 22;
            continue;
          } else {
            $.goto = 22;
            continue;
          }
        }
      case 4:
        if ($1) {
          $.result = $l[5];
          $.goto = 24;
          continue;
        } else {
          $.state = 5;
        }
      case 5:
        if ($l[2]) {
          $1 = $l[0][4];
          $.state = 6;
        } else {
          $1 = $l[0][3];
          $.state = 6;
        }
      case 6:
        if ($l[3] = $1) {
          $.goto = 19;
          $p = $mcall("has", $l[3], $l[1]);
          continue;
        } else {
          $.state = 7;
        }
      case 7:
        $.goto = 8;
        $p = $forInIterator($l[1]);
        $.state = 8;
      case 8:
        $l[7] = $p;
        $.state = 9;
      case 9:
        $x.call = $l[7].next;
        $.goto = 10;
        $p = $l[7].next();
        $.state = 10;
      case 10:
        if ($p.done) {
          $.result = $l[5];
          $.goto = 24;
          continue;
        } else {
          $l[6] = $p.value;
          $l[8] = "default" !== $l[6];
          if ($l[8]) {
            $.goto = 18;
            $p = $mcall("call", {}.hasOwnProperty, $l[1], $l[6]);
            continue;
          } else {
            $.state = 11;
          }
        }
      case 11:
        if ($l[8]) {
          $l[8] = $l[3] = Object.defineProperty;
          if ($l[8]) {
            $.goto = 17;
            $p = $mcall("getOwnPropertyDescriptor", Object, $l[1], $l[6]);
            continue;
          } else {
            $.goto = 13;
            continue;
          }
        } else {
          $.state = 12;
        }
      case 12:
        $.goto = 9;
        continue;
      case 13:
        $1 = $l[4] = $l[8];
        if ($1) {
          $1 = $l[4].get;
          if ($1) {
            $.goto = 16;
            continue;
          } else {
            $1 = $l[4].set;
            $.goto = 16;
            continue;
          }
        } else {
          $.state = 14;
        }
      case 14:
        if ($1) {
          $.goto = 15;
          ($x.call = $l[3])($l[5], $l[6], $l[4]);
          $.state = 15;
        } else {
          $l[5][$l[6]] = $l[1][$l[6]];
          $.state = 15;
        }
      case 15:
        $.goto = 12;
        continue;
      case 16:
        $.goto = 14;
        continue;
      case 17:
        $l[8] = $p;
        $.goto = 13;
        continue;
      case 18:
        $l[8] = $p;
        $.goto = 11;
        continue;
      case 19:
        if ($p) {
          $.goto = 21;
          $p = $mcall("get", $l[3], $l[1]);
          continue;
        } else {
          $.state = 20;
        }
      case 20:
        $.goto = 7;
        $mcall("set", $l[3], $l[1], $l[5]);
        continue;
      case 21:
        $.result = $p;
        $.goto = 24;
        continue;
      case 22:
        $.goto = 4;
        continue;
      case 23:
        $.goto = 24;
        return $unhandled($.error);
      case 24:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [2, null, $s$3], [2, null, $s$4], [0, null, $s$3], [2, null, $s$4], [2, null, $s$4], [2, null, $s$4], [0, null, $s$3], [0, null, $s$3], [2, null, $s$4], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [2, null, $s$3], [2, null, $s$3], [0, null, $s$3], [0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
  $m$3 = $M.fun("m$3", "a", null, $m$0, [], 0, 1, "21:0-28:1", 129, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        return $awt(s_1);
      case 1:
        $.goto = 2;
        $mcall("block", $l[0][1].default, "par");
        $.state = 2;
      case 2:
        $.goto = 3;
        return $awt(p_1);
      case 3:
        $.goto = 5;
        return $awt(p_2);
      case 4:
        $.goto = 5;
        return $unhandledA($.error);
      case 5:
        return $retA($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "22:2-22:11", $s$5], [2, "24:4-24:18", $s$5], [2, "25:4-25:13", $s$5], [2, "26:4-26:13", $s$5], [16, "28:1-28:1", $s$5], [16, "28:1-28:1", $s$5]]),
  $m$4 = $M.fun("m$4", "b", null, $m$0, [], 0, 1, "30:0-37:1", 129, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        return $awt(s_1);
      case 1:
        0;
        $.goto = 2;
        ($x.call = $l[0][1].block)("par");
        $.state = 2;
      case 2:
        $.goto = 3;
        return $awt(p_1);
      case 3:
        $.goto = 5;
        return $awt(p_2);
      case 4:
        $.goto = 5;
        return $unhandledA($.error);
      case 5:
        return $retA($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "31:2-31:11", $s$6], [2, "33:4-33:15", $s$6], [2, "34:4-34:13", $s$6], [2, "35:4-35:13", $s$6], [16, "37:1-37:1", $s$6], [16, "37:1-37:1", $s$6]]),
  $m$5 = $M.fun("m$5", "c", null, $m$0, [], 0, 1, "39:0-46:1", 129, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        return $awt(s_1);
      case 1:
        0;
        $.goto = 2;
        ($x.call = $l[0][1].block)("par");
        $.state = 2;
      case 2:
        $.goto = 3;
        return $awt(p_1);
      case 3:
        $.goto = 5;
        return $awt(p_2);
      case 4:
        $.goto = 5;
        return $unhandledA($.error);
      case 5:
        return $retA($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "40:2-40:11", $s$7], [2, "42:4-42:16", $s$7], [2, "43:4-43:13", $s$7], [2, "44:4-44:13", $s$7], [16, "46:1-46:1", $s$7], [16, "46:1-46:1", $s$7]]),
  $m$6 = $M.fun("m$6", "d", null, $m$0, [], 0, 1, "48:0-55:1", 129, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        return $awt(s_1);
      case 1:
        "par";
        $.goto = 2;
        return $awt(p_1);
      case 2:
        $.goto = 4;
        return $awt(p_2);
      case 3:
        $.goto = 4;
        return $unhandledA($.error);
      case 4:
        return $retA($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "49:2-49:11", $s$8], [2, "52:4-52:13", $s$8], [2, "53:4-53:13", $s$8], [16, "55:1-55:1", $s$8], [16, "55:1-55:1", $s$8]]);
$M.moduleExports();