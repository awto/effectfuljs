var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $retA = $M.retA,
    $retG = $M.retG,
    $unhandled = $M.unhandled,
    $unhandledA = $M.unhandledA,
    $unhandledG = $M.unhandledG,
    $brk = $M.brk,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  _defineProperties: [1, null],
  _createClass: [2, null],
  _require: [3, null],
  mod: [4, "1:8-1:11"],
  C: [5, "3:9-3:10"],
  Cl: [6, "12:6-12:8"],
  obj1: [7, "30:6-30:10"]
}, null, 0],
    $s$2 = [{
  target: [1, null],
  props: [2, null],
  i: [3, null],
  descriptor: [4, null]
}, $s$1, 1],
    $s$3 = [{
  Constructor: [1, null],
  protoProps: [2, null],
  staticProps: [3, null]
}, $s$1, 1],
    $s$4 = [{
  a: [1, "3:11-3:12"]
}, $s$1, 1],
    $s$5 = [{
  e: [2, "7:11-7:12"]
}, $s$4, 1],
    $s$6 = [{
  Cl: [1, null],
  _proto: [2, null]
}, $s$1, 1],
    $s$7 = [{}, $s$6, 2],
    $s$8 = [{}, $s$6, 2],
    $s$9 = [{}, $s$6, 2],
    $s$10 = [{}, $s$9, 3],
    $s$11 = [{}, $s$6, 2],
    $s$12 = [{
  value: [1, "19:12-19:17"]
}, $s$6, 2],
    $s$13 = [{
  a: [1, "31:8-31:9"]
}, $s$1, 1],
    $s$14 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 8, "1:0-39:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[5] = $m$3($);
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.moduleId = require.resolve("mod"), $M.force(require("mod")));
      $.state = 2;

    case 2:
      $l[3] = $p;
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $l[4] = $l[3].mod;
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = /*#__PURE__*/($context.call = $m$4($))();
      $.state = 5;

    case 5:
      $l[6] = $p;
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $l[7] = {
        objFn: $m$11($)
      };
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      module.exports.fn2 = $m$12($);
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
}, null, null, 0, [[4, "1:8-1:30", $s$1], [2, "1:16-1:30", $s$1], [4, "1:8-1:11", $s$1], [4, "12:6-27:12", $s$1], [2, null, $s$1], [4, "30:0-34:2", $s$1], [4, "36:0-38:2", $s$1], [0, "36:0-38:1", $s$1], [16, "39:0-39:0", $s$1], [16, "39:0-39:0", $s$1]]),
    $m$1 = $M.fun("m$1", "_defineProperties", null, $m$0, ["target", "props"], 1, 5, null, 0, function _defineProperties($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[3] = 0;
      $.state = 1;

    case 1:
      if ($l[3] < $l[2].length) {
        $.state = 2;
      } else {
        $.goto = 8;
        continue;
      }

    case 2:
      $l[4] = $l[2][$l[3]];
      $1 = $l[4].enumerable;

      if ($1) {
        $.state = 3;
      } else {
        $.goto = 7;
        continue;
      }

    case 3:
      $l[4].enumerable = $1;
      $l[4].configurable = true;

      if ("value" in $l[4]) {
        $.state = 4;
      } else {
        $.goto = 5;
        continue;
      }

    case 4:
      $l[4].writable = true;
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("defineProperty", Object, $l[1], $l[4].key, $l[4]);
      $.state = 6;

    case 6:
      $l[3] = $l[3] + 1;
      $.goto = 1;
      continue;

    case 7:
      $1 = false;
      $.goto = 3;
      continue;

    case 8:
      $.goto = 10;
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [2, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
    $m$2 = $M.fun("m$2", "_createClass", null, $m$0, ["Constructor", "protoProps", "staticProps"], 0, 4, null, 0, function _createClass($, $l, $p) {
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
      ($context.call = $l[0][1])($l[1].prototype, $l[2]);
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
      ($context.call = $l[0][1])($l[1], $l[3]);
      $.state = 4;

    case 4:
      $.result = $l[1];
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
}, null, null, 1, [[0, null, $s$3], [2, null, $s$3], [0, null, $s$3], [2, null, $s$3], [0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
    $m$3 = $M.fun("m$3", "C", null, $m$0, ["a"], 0, 3, "3:0-10:1", 0, function C($, $l, $p) {
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
      $p = $mcall("fn1", $l[0][4], $l[1]);
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("proc1", $l[0][4], $p);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("proc2", $l[0][4]);
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
      $mcall("proc3", $l[0][4], $l[2]);
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
}, null, 1, [[4, "4:2-9:3", $s$4], [5, "5:4-5:26", $s$4], [3, "5:14-5:24", $s$4], [3, "5:4-5:25", $s$4], [5, "6:4-6:16", $s$4], [3, "6:4-6:15", $s$4], [37, "7:3-7:3", $s$4], [36, "10:1-10:1", $s$4], [4, "8:4-8:17", $s$5], [2, "8:4-8:16", $s$5], [36, "9:3-9:3", $s$4], [16, "10:1-10:1", $s$4], [16, "10:1-10:1", $s$4]]),
    $m$4 = $M.fun("m$4", null, null, $m$0, [], 0, 3, "13:2-27:12", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$5($);
      $l[2] = $l[1].prototype;
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $l[2].func = $m$6($);
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $l[2].func = $m$7($);
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = $l[0][2])($l[1], [{
        key: "prop1",
        get: $m$9($),
        set: $m$10($)
      }]);
      $.state = 4;

    case 4:
      $.result = $l[1];
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
}, null, null, 1, [[4, "22:2-24:12", $s$6], [4, "25:2-27:7", $s$6], [4, "16:14-21:17", $s$6], [2, null, $s$6], [0, null, $s$6], [16, "27:12-27:12", $s$6], [16, "27:12-27:12", $s$6]]),
    $m$5 = $M.fun("m$5", "Cl", null, $m$4, [], 0, 1, "13:2-15:3", 0, function Cl($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = not_traced)();
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
}, null, null, 2, [[4, "14:4-14:17", $s$7], [2, "14:4-14:16", $s$7], [36, "15:3-15:3", $s$7], [16, "15:3-15:3", $s$7], [16, "15:3-15:3", $s$7]]),
    $m$6 = $M.fun("m$6", "func", null, $m$4, [], 0, 1, "22:2-24:3", 1, function func($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = not_traced)();
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
}, null, null, 2, [[4, "23:4-23:17", $s$8], [2, "23:4-23:16", $s$8], [36, "24:3-24:3", $s$8], [16, "24:3-24:3", $s$8], [16, "24:3-24:3", $s$8]]),
    $m$7 = $M.fun("m$7", "func", null, $m$4, [], 0, 1, "25:2-27:3", 2, function func($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = not_traced)($m$8($));
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
}, null, null, 2, [[4, "26:4-26:44", $s$9], [2, "26:4-26:43", $s$9], [36, "27:3-27:3", $s$9], [16, "27:3-27:3", $s$9], [16, "27:3-27:3", $s$9]]),
    $m$8 = $M.fun("m$8", null, null, $m$7, [], 0, 2, "26:15-26:42", 4, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = traced)(1);
      $.state = 2;

    case 2:
      $l[1] = $p;
      $.goto = 3;
      $p = ($context.call = traced)(2);
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
}, null, null, 3, [[4, "26:21-26:42", $s$10], [2, "26:21-26:30", $s$10], [2, "26:33-26:42", $s$10], [0, "26:21-26:42", $s$10], [16, "26:42-26:42", $s$10], [16, "26:42-26:42", $s$10]]),
    $m$9 = $M.fun("m$9", null, null, $m$4, [], 0, 1, "16:14-18:3", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = not_traced)();
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
}, null, null, 2, [[4, "17:4-17:17", $s$11], [2, "17:4-17:16", $s$11], [36, "18:3-18:3", $s$11], [16, "18:3-18:3", $s$11], [16, "18:3-18:3", $s$11]]),
    $m$10 = $M.fun("m$10", null, null, $m$4, ["value"], 0, 2, "19:12-21:17", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = not_traced)();
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
}, null, null, 2, [[4, "20:4-20:17", $s$12], [2, "20:4-20:16", $s$12], [36, "21:3-21:3", $s$12], [16, "21:17-21:17", $s$12], [16, "21:17-21:17", $s$12]]),
    $m$11 = $M.fun("m$11", null, null, $m$0, ["a"], 0, 2, "31:8-33:9", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = new ($context.call = $l[0][6])();
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
}, null, null, 1, [[4, "32:4-32:19", $s$13], [2, "32:4-32:12", $s$13], [2, "32:4-32:18", $s$13], [36, "33:3-33:3", $s$13], [16, "33:9-33:9", $s$13], [16, "33:9-33:9", $s$13]]),
    $m$12 = $M.fun("m$12", "fn1", null, $m$0, [], 0, 2, "36:14-38:1", 0, function fn1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $mcall("f2", $l[0][4]);
      $.state = 2;

    case 2:
      $l[1] = $p;
      $.goto = 3;
      $p = new ($context.call = $l[0][5])();
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = $mcall("some", $l[0][4], {
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
}, null, null, 1, [[4, "37:2-37:49", $s$14], [2, "37:23-37:31", $s$14], [2, "37:37-37:44", $s$14], [2, "37:9-37:48", $s$14], [0, null, $s$14], [16, "38:1-38:1", $s$14], [16, "38:1-38:1", $s$14]]);

$M.moduleExports();