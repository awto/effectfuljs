"no-ctrl";

var $M = require("@effectful/debugger"),
  $awt = $M.awt,
  $x = $M.context,
  $ret = $M.ret,
  $retA = $M.retA,
  $unhandled = $M.unhandled,
  $unhandledA = $M.unhandledA,
  $raise = $M.raise,
  $force = $M.force,
  $mcall = $M.mcall,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    _some: [1, null],
    _interopRequireDefault: [2, null],
    _slicedToArray: [3, null],
    _nonIterableRest: [4, null],
    _unsupportedIterableToArray: [5, null],
    _arrayLikeToArray: [6, null],
    _iterableToArrayLimit: [7, null],
    _arrayWithHoles: [8, null],
    _b: [9, null],
    a: [10, "3:14-3:15"],
    a1: [11, "4:9-4:11"]
  }, null, 0],
  $s$2 = [{
    Some: [12, "6:8-6:12"],
    b: [13, "11:6-11:7"],
    _Some: [14, null],
    other: [15, "12:11-12:16"],
    b2: [16, "12:18-12:20"],
    somethingElse: [17, "13:17-13:30"]
  }, $s$1, 0],
  $s$3 = [{
    e: [1, null]
  }, $s$1, 1],
  $s$4 = [{
    r: [1, null],
    e: [2, null]
  }, $s$1, 1],
  $s$5 = [{}, $s$1, 1],
  $s$6 = [{
    r: [1, null],
    a: [2, null],
    t: [3, null]
  }, $s$1, 1],
  $s$7 = [{
    r: [1, null],
    a: [2, null],
    e: [3, null],
    n: [4, null]
  }, $s$1, 1],
  $s$8 = [{
    r: [1, null],
    l: [2, null],
    t: [3, null],
    e: [4, null],
    n: [5, null],
    i: [6, null],
    u: [7, null],
    a: [8, null],
    f: [9, null],
    o: [10, null]
  }, $s$1, 1],
  $s$9 = [{
    r: [11, null]
  }, $s$8, 1],
  $s$10 = [{
    r: [1, null]
  }, $s$1, 1],
  $s$11 = [{}, $s$1, 1],
  $s$12 = [{
    Some: [1, null],
    _proto: [2, null]
  }, $s$2, 1],
  $s$13 = [{}, $s$12, 2],
  $s$14 = [{}, $s$12, 2],
  $s$15 = [{}, $s$2, 1],
  $s$16 = [{}, $s$15, 2],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 18, "1:0-20:0", 160, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[2] = $m$1($);
        $l[3] = $m$2($);
        $l[4] = $m$3($);
        $l[5] = $m$4($);
        $l[6] = $m$5($);
        $l[7] = $m$6($);
        $l[8] = $m$7($);
        $l[11] = $m$8($);
        module.exports.__esModule = true;
        module.exports.a = void 0;
        $.goto = 1;
        $p = ($x.moduleId = require.resolve("some"), $force(require("some")));
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.call = $l[2])($p);
        $.state = 2;
      case 2:
        $l[1] = $p;
        $.goto = 3;
        $mcall("profile", M, "es");
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = ($x.call = $l[3])($l[1].default, 2);
        $.state = 4;
      case 4:
        $l[9] = $p;
        $l[10] = module.exports.a = $l[9][1];
        $l[17] = $m$12($);
        $.goto = 5;
        $p = /*#__PURE__*/($x.call = $m$9($))();
        $.state = 5;
      case 5:
        $l[12] = $p;
        $l[13] = $l[10];
        $.goto = 6;
        $p = ($x.call = $l[3])($l[12], 3);
        $.state = 6;
      case 6:
        $l[14] = $p;
        $l[15] = $l[14][1];
        $l[16] = $l[14][2];
        $.goto = 8;
        continue;
      case 7:
        $.goto = 8;
        return $unhandled($.error);
      case 8:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 0, [[2, null, $s$1], [2, null, $s$1], [2, "1:0-1:15", $s$1], [2, null, $s$1], [2, null, $s$2], [2, null, $s$2], [0, null, $s$2], [16, "20:0-20:0", $s$1], [16, "20:0-20:0", $s$1]]),
  $m$1 = $M.fun("m$1", "_interopRequireDefault", null, $m$0, ["e"], 1, 2, null, 128, function ($, $l, $p) {
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
          $.state = 2;
        } else {
          $.result = {
            default: $l[1]
          };
          $.state = 2;
        }
      case 2:
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
  }, null, null, 1, [[0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
  $m$2 = $M.fun("m$2", "_slicedToArray", null, $m$0, ["r", "e"], 0, 3, null, 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($x.call = $l[0][8])($l[1]);
        $.state = 1;
      case 1:
        $.result = $p;
        if ($.result) {
          $.state = 2;
        } else {
          $.goto = 7;
          $p = ($x.call = $l[0][7])($l[1], $l[2]);
          continue;
        }
      case 2:
        if ($.result) {
          $.state = 3;
        } else {
          $.goto = 6;
          $p = ($x.call = $l[0][5])($l[1], $l[2]);
          continue;
        }
      case 3:
        if ($.result) {
          $.state = 4;
        } else {
          $.goto = 5;
          $p = ($x.call = $l[0][4])();
          continue;
        }
      case 4:
        $.goto = 9;
        continue;
      case 5:
        $.result = $p;
        $.goto = 4;
        continue;
      case 6:
        $.result = $p;
        $.goto = 3;
        continue;
      case 7:
        $.result = $p;
        $.goto = 2;
        continue;
      case 8:
        $.goto = 9;
        return $unhandled($.error);
      case 9:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, null, $s$4], [2, null, $s$4], [2, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
  $m$3 = $M.fun("m$3", "_nonIterableRest", null, $m$0, [], 0, 1, null, 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = new ($x.call = TypeError)("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        $.state = 1;
      case 1:
        $.goto = 3;
        return $raise($p);
      case 2:
        $.goto = 3;
        return $unhandled($.error);
      case 3:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, null, $s$5], [0, null, $s$5], [16, null, $s$5], [16, null, $s$5]]),
  $m$4 = $M.fun("m$4", "_unsupportedIterableToArray", null, $m$0, ["r", "a"], 1, 5, null, 128, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        if ($l[1]) {
          if ("string" == typeof $l[1]) {
            $.goto = 13;
            $p = ($x.call = $l[0][6])($l[1], $l[2]);
            continue;
          } else {
            $.goto = 2;
            continue;
          }
        } else {
          $.state = 1;
        }
      case 1:
        $.goto = 15;
        continue;
      case 2:
        $.goto = 3;
        $p = $mcall("call", {}.toString, $l[1]);
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = $mcall("slice", $p, 8, -1);
        $.state = 4;
      case 4:
        $l[3] = $p;
        $1 = "Object" === $l[3];
        if ($1) {
          $1 = $l[1].constructor;
          $.state = 5;
        } else {
          $.state = 5;
        }
      case 5:
        if ($1) {
          $l[3] = $l[1].constructor.name;
          $.state = 6;
        } else {
          $.state = 6;
        }
      case 6:
        $1 = "Map" === $l[3];
        if ($1) {
          $.state = 7;
        } else {
          $1 = "Set" === $l[3];
          $.state = 7;
        }
      case 7:
        if ($1) {
          $.goto = 12;
          $p = $mcall("from", Array, $l[1]);
          continue;
        } else {
          $l[4] = "Arguments" === $l[3];
          if ($l[4]) {
            $.state = 8;
          } else {
            $.goto = 11;
            $p = $mcall("test", /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/, $l[3]);
            continue;
          }
        }
      case 8:
        if ($l[4]) {
          $.goto = 10;
          $p = ($x.call = $l[0][6])($l[1], $l[2]);
          continue;
        } else {
          $.result = void 0;
          $.state = 9;
        }
      case 9:
        $.goto = 15;
        continue;
      case 10:
        $.result = $p;
        $.goto = 9;
        continue;
      case 11:
        $l[4] = $p;
        $.goto = 8;
        continue;
      case 12:
        $.result = $p;
        $.goto = 9;
        continue;
      case 13:
        $.result = $p;
        $.goto = 15;
        continue;
      case 14:
        $.goto = 15;
        return $unhandled($.error);
      case 15:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, null, $s$6], [0, null, $s$6], [2, null, $s$6], [2, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [2, null, $s$6], [2, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [16, null, $s$6], [16, null, $s$6]]),
  $m$5 = $M.fun("m$5", "_arrayLikeToArray", null, $m$0, ["r", "a"], 1, 5, null, 128, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        $1 = null == $l[2];
        if ($1) {
          $.state = 1;
        } else {
          $1 = $l[2] > $l[1].length;
          $.state = 1;
        }
      case 1:
        if ($1) {
          $l[2] = $l[1].length;
          $.state = 2;
        } else {
          $.state = 2;
        }
      case 2:
        $l[3] = 0;
        $.goto = 3;
        $p = ($x.call = Array)($l[2]);
        $.state = 3;
      case 3:
        $l[4] = $p;
        $.state = 4;
      case 4:
        if ($l[3] < $l[2]) {
          $l[4][$l[3]] = $l[1][$l[3]];
          $l[3] = $l[3] + 1;
          $.goto = 4;
          continue;
        } else {
          $.result = $l[4];
          $.goto = 6;
          continue;
        }
      case 5:
        $.goto = 6;
        return $unhandled($.error);
      case 6:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[0, null, $s$7], [0, null, $s$7], [2, null, $s$7], [0, null, $s$7], [0, null, $s$7], [16, null, $s$7], [16, null, $s$7]]),
  $m$6 = $M.fun("m$6", "_iterableToArrayLimit", null, $m$0, ["r", "l"], 1, 17, null, 128, function ($, $l, $p) {
    var $1;
    for (;;) switch ($.state = $.goto) {
      case 0:
        if (null == $l[1]) {
          $1 = null;
          $.goto = 2;
          continue;
        } else {
          $1 = "undefined" != typeof Symbol;
          if ($1) {
            $1 = $l[1][Symbol.iterator];
            $.state = 1;
          } else {
            $.state = 1;
          }
        }
      case 1:
        if ($1) {
          $.state = 2;
        } else {
          $1 = $l[1]["@@iterator"];
          $.state = 2;
        }
      case 2:
        $l[3] = $1;
        if (null != $l[3]) {
          $l[8] = [];
          $l[9] = !0;
          $l[10] = !1;
          $.goto = 4;
          continue;
        } else {
          $.state = 3;
        }
      case 3:
        $.goto = 28;
        continue;
      case 4:
        $.goto = 5;
        $p = $mcall("call", $l[3], $l[1]);
        $.state = 5;
      case 5:
        $l[6] = ($l[3] = $p).next;
        if (0 === $l[2]) {
          $.goto = 11;
          $p = ($x.call = Object)($l[3]);
          continue;
        } else {
          $.state = 6;
        }
      case 6:
        $.goto = 7;
        $p = $mcall("call", $l[6], $l[3]);
        $.state = 7;
      case 7:
        $l[16] = !($l[9] = ($l[4] = $p).done);
        if ($l[16]) {
          $.goto = 10;
          $mcall("push", $l[8], $l[4].value);
          continue;
        } else {
          $.state = 8;
        }
      case 8:
        if ($l[16]) {
          $l[9] = !0;
          $.goto = 6;
          continue;
        } else {
          $.state = 9;
        }
      case 9:
        $l[12] = 26;
        $.goto = 15;
        continue;
      case 10:
        $l[16] = $l[8].length !== $l[2];
        $.goto = 8;
        continue;
      case 11:
        if ($p !== $l[3]) {
          $l[12] = 28;
          $.goto = 15;
          continue;
        } else {
          $.state = 12;
        }
      case 12:
        $l[9] = !1;
        $.goto = 9;
        continue;
      case 13:
        $l[11] = $.error;
        $.error = void 0;
        $l[10] = !0;
        $l[5] = $l[11];
        $l[12] = 26;
        $.goto = 15;
        continue;
      case 14:
        return $raise($l[13]);
      case 15:
        $.state = 16;
      case 16:
        $l[16] = !$l[9];
        if ($l[16]) {
          $l[16] = null != $l[3].return;
          $.state = 17;
        } else {
          $.state = 17;
        }
      case 17:
        if ($l[16]) {
          $.goto = 20;
          $p = $mcall("return", $l[3]);
          continue;
        } else {
          $.state = 18;
        }
      case 18:
        if ($l[16]) {
          $l[14] = 28;
          $.goto = 23;
          continue;
        } else {
          $.state = 19;
        }
      case 19:
        $l[14] = 25;
        $.goto = 23;
        continue;
      case 20:
        $l[7] = $p;
        $.goto = 21;
        $p = ($x.call = Object)($l[7]);
        $.state = 21;
      case 21:
        $l[16] = $p !== $l[7];
        $.goto = 18;
        continue;
      case 22:
        return $raise($l[15]);
      case 23:
        if ($l[10]) {
          $.goto = 24;
          return $raise($l[5]);
        } else {
          $.state = 24;
        }
      case 24:
        $.goto = $l[14];
        continue;
      case 25:
        $.goto = $l[12];
        continue;
      case 26:
        $.result = $l[8];
        $.goto = 28;
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
      case 21:
      case 20:
      case 19:
      case 18:
      case 17:
      case 16:
        $.goto = 23;
        $l[14] = 22;
        $l[15] = $.error;
        break;
      case 13:
        $.goto = 15;
        $l[12] = 14;
        $l[13] = $.error;
        break;
      case 12:
      case 11:
      case 10:
      case 9:
      case 8:
      case 7:
      case 6:
      case 5:
      case 4:
        $.goto = 13;
        break;
      default:
        $.goto = 27;
    }
  }, function ($, $l) {
    switch ($.state) {
      case 13:
      case 12:
      case 11:
      case 10:
      case 9:
      case 8:
      case 7:
      case 6:
      case 5:
      case 4:
        $l[12] = 28;
        $.goto = 15;
        break;
      case 21:
      case 20:
      case 19:
      case 18:
      case 17:
      case 16:
        $l[14] = 28;
        $.goto = 23;
        break;
      default:
        $.goto = 28;
        break;
    }
  }, 1, [[0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [3, null, $s$8], [3, null, $s$8], [3, null, $s$8], [3, null, $s$8], [1, null, $s$8], [1, null, $s$8], [1, null, $s$8], [1, null, $s$8], [1, null, $s$8], [0, null, $s$9], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [2, null, $s$8], [0, null, $s$8], [0, null, $s$8], [2, null, $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [0, null, $s$8], [16, null, $s$8], [16, null, $s$8]]),
  $m$7 = $M.fun("m$7", "_arrayWithHoles", null, $m$0, ["r"], 0, 2, null, 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $mcall("isArray", Array, $l[1]);
        $.state = 1;
      case 1:
        if ($p) {
          $.result = $l[1];
          $.goto = 4;
          continue;
        } else {
          $.state = 2;
        }
      case 2:
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
  }, null, null, 1, [[2, null, $s$10], [0, null, $s$10], [0, null, $s$10], [16, null, $s$10], [16, null, $s$10]]),
  $m$8 = $M.fun("m$8", "a1", null, $m$0, [], 0, 1, "4:0-4:16", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
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
  }, null, null, 1, [[0, null, $s$11], [16, "4:16-4:16", $s$11], [16, "4:16-4:16", $s$11]]),
  $m$9 = $M.fun("m$9", null, null, $m$0, [], 0, 3, "7:4-9:11", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = $m$10($);
        $l[2] = $l[1].prototype;
        $l[2].a = $m$11($);
        $.result = $l[1];
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
  }, null, null, 1, [[0, null, $s$12], [16, "9:11-9:11", $s$12], [16, "9:11-9:11", $s$12]]),
  $m$10 = $M.fun("m$10", "Some", null, $m$9, [], 0, 1, null, 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
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
  }, null, null, 2, [[0, null, $s$13], [16, null, $s$13], [16, null, $s$13]]),
  $m$11 = $M.fun("m$11", "a", null, $m$9, [], 0, 1, "7:4-9:5", 129, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        return $awt(b_1);
      case 1:
        $.goto = 2;
        return $unhandledA($.error);
      case 2:
        return $retA($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[2, "8:6-8:15", $s$14], [16, "9:5-9:5", $s$14], [16, "9:5-9:5", $s$14]]),
  $m$12 = $M.fun("m$12", "somethingElse", null, $m$0, [], 0, 1, "13:2-18:3", 129, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.result = $m$13($);
        $.goto = 2;
        continue;
      case 1:
        $.goto = 2;
        return $unhandledA($.error);
      case 2:
        return $retA($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[0, null, $s$15], [16, "18:3-18:3", $s$15], [16, "18:3-18:3", $s$15]]),
  $m$13 = $M.fun("m$13", "zz", null, $m$12, [], 0, 1, "14:11-17:5", 129, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = new ($x.call = $l[0][0][12])();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.call = eff_1)($p);
        $.state = 2;
      case 2:
        $.goto = 3;
        return $awt($p);
      case 3:
        $.goto = 4;
        $p = ($x.call = eff_2)($l[0][0][10], $l[0][0][13]);
        $.state = 4;
      case 4:
        $.goto = 6;
        return $awt($p);
      case 5:
        $.goto = 6;
        return $unhandledA($.error);
      case 6:
        return $retA($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 2, [[2, "15:18-15:28", $s$16], [2, "15:12-15:29", $s$16], [2, "15:6-15:29", $s$16], [2, "16:12-16:23", $s$16], [2, "16:6-16:23", $s$16], [16, "17:5-17:5", $s$16], [16, "17:5-17:5", $s$16]]);
$M.moduleExports();