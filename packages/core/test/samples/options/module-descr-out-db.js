var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $retA = $M.retA,
    $retG = $M.retG,
    $unhandled = $M.unhandled,
    $unhandledA = $M.unhandledA,
    $unhandledG = $M.unhandledG,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 8, "1:0-39:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[5] = $m$3($);
      $.goto = 1;
      $p = ($context.moduleId = require.resolve("mod"), $M.force(require("mod")));
      $.state = 1;

    case 1:
      $l[3] = $p;
      $l[4] = $l[3].mod;
      $.goto = 2;
      $p = /*#__PURE__*/($context.call = $m$4($))();
      $.state = 2;

    case 2:
      $l[6] = $p;
      $l[7] = {
        objFn: $m$11($)
      };
      module.exports.fn2 = $m$12($);
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
}, null, null, 0, [[2, "1:16-1:30", $s$1], [2, null, $s$1], [0, null, $s$1], [16, "39:0-39:0", $s$1], [16, "39:0-39:0", $s$1]]),
    $m$1 = $M.fun("m$1", "_defineProperties", null, $m$0, ["target", "props"], 1, 5, null, 128, function _defineProperties($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[3] = 0;
      $.state = 1;

    case 1:
      if ($l[3] < $l[2].length) {
        $l[4] = $l[2][$l[3]];
        $1 = $l[4].enumerable;

        if ($1) {
          $.state = 2;
        } else {
          $1 = false;
          $.state = 2;
        }
      } else {
        $.goto = 6;
        continue;
      }

    case 2:
      $l[4].enumerable = $1;
      $l[4].configurable = true;

      if ("value" in $l[4]) {
        $l[4].writable = true;
        $.state = 3;
      } else {
        $.state = 3;
      }

    case 3:
      $.goto = 4;
      $mcall("defineProperty", Object, $l[1], $l[4].key, $l[4]);
      $.state = 4;

    case 4:
      $l[3] = $l[3] + 1;
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
}, null, null, 1, [[0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [2, null, $s$2], [0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
    $m$2 = $M.fun("m$2", "_createClass", null, $m$0, ["Constructor", "protoProps", "staticProps"], 0, 4, null, 128, function _createClass($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if ($l[2]) {
        $.goto = 1;
        ($context.call = $l[0][1])($l[1].prototype, $l[2]);
        $.state = 1;
      } else {
        $.state = 1;
      }

    case 1:
      if ($l[3]) {
        $.goto = 2;
        ($context.call = $l[0][1])($l[1], $l[3]);
        $.state = 2;
      } else {
        $.state = 2;
      }

    case 2:
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
}, null, null, 1, [[2, null, $s$3], [2, null, $s$3], [0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
    $m$3 = $M.fun("m$3", "C", null, $m$0, ["a"], 0, 3, "3:0-10:1", 128, function C($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $mcall("fn1", $l[0][4], $l[1]);
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("proc1", $l[0][4], $p);
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("proc2", $l[0][4]);
      $.state = 4;

    case 4:
      $.goto = 7;
      continue;

    case 5:
      $l[2] = $.error;
      $.error = void 0;
      $.goto = 4;
      $mcall("proc3", $l[0][4], $l[2]);
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 3:
    case 2:
    case 1:
      $.goto = 5;
      break;

    default:
      $.goto = 6;
  }
}, null, 1, [[0, null, $s$4], [3, "5:14-5:24", $s$4], [3, "5:4-5:25", $s$4], [3, "6:4-6:15", $s$4], [0, null, $s$4], [2, "8:4-8:16", $s$5], [16, "10:1-10:1", $s$4], [16, "10:1-10:1", $s$4]]),
    $m$4 = $M.fun("m$4", null, null, $m$0, [], 0, 3, "13:2-27:12", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$5($);
      $l[2] = $l[1].prototype;
      $l[2].func = $m$6($);
      $l[2].func = $m$7($);
      $.goto = 1;
      ($context.call = $l[0][2])($l[1], [{
        key: "prop1",
        get: $m$9($),
        set: $m$10($)
      }]);
      $.state = 1;

    case 1:
      $.result = $l[1];
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, null, $s$6], [0, null, $s$6], [16, "27:12-27:12", $s$6], [16, "27:12-27:12", $s$6]]),
    $m$5 = $M.fun("m$5", "Cl", null, $m$4, [], 0, 1, "13:2-15:3", 128, function Cl($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      ($context.call = not_traced)();
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "14:4-14:16", $s$7], [16, "15:3-15:3", $s$7], [16, "15:3-15:3", $s$7]]),
    $m$6 = $M.fun("m$6", "func", null, $m$4, [], 0, 1, "22:2-24:3", 129, function func($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      ($context.call = not_traced)();
      continue;

    case 1:
      $.goto = 2;
      return $unhandledA($.error);

    case 2:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "23:4-23:16", $s$8], [16, "24:3-24:3", $s$8], [16, "24:3-24:3", $s$8]]),
    $m$7 = $M.fun("m$7", "func", null, $m$4, [], 0, 1, "25:2-27:3", 130, function func($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      ($context.call = not_traced)($m$8($));
      continue;

    case 1:
      $.goto = 2;
      return $unhandledG($.error);

    case 2:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "26:4-26:43", $s$9], [16, "27:3-27:3", $s$9], [16, "27:3-27:3", $s$9]]),
    $m$8 = $M.fun("m$8", null, null, $m$7, [], 0, 2, "26:15-26:42", 132, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = traced)(1);
      $.state = 1;

    case 1:
      $l[1] = $p;
      $.goto = 2;
      $p = ($context.call = traced)(2);
      $.state = 2;

    case 2:
      $.result = $l[1] + $p;
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
}, null, null, 3, [[2, "26:21-26:30", $s$10], [2, "26:33-26:42", $s$10], [0, "26:21-26:42", $s$10], [16, "26:42-26:42", $s$10], [16, "26:42-26:42", $s$10]]),
    $m$9 = $M.fun("m$9", null, null, $m$4, [], 0, 1, "16:14-18:3", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      ($context.call = not_traced)();
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "17:4-17:16", $s$11], [16, "18:3-18:3", $s$11], [16, "18:3-18:3", $s$11]]),
    $m$10 = $M.fun("m$10", null, null, $m$4, ["value"], 0, 2, "19:12-21:17", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      ($context.call = not_traced)();
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "20:4-20:16", $s$12], [16, "21:17-21:17", $s$12], [16, "21:17-21:17", $s$12]]),
    $m$11 = $M.fun("m$11", null, null, $m$0, ["a"], 0, 2, "31:8-33:9", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = new ($context.call = $l[0][6])();
      $.state = 1;

    case 1:
      $.goto = 3;
      $mcall("fn", $p, $l[1]);
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "32:4-32:12", $s$13], [2, "32:4-32:18", $s$13], [16, "33:9-33:9", $s$13], [16, "33:9-33:9", $s$13]]),
    $m$12 = $M.fun("m$12", "fn1", null, $m$0, [], 0, 2, "36:14-38:1", 128, function fn1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $mcall("f2", $l[0][4]);
      $.state = 1;

    case 1:
      $l[1] = $p;
      $.goto = 2;
      $p = new ($context.call = $l[0][5])();
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = $mcall("some", $l[0][4], {
        a: $l[1],
        b: [$p]
      });
      $.state = 3;

    case 3:
      $.result = $p;
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
}, null, null, 1, [[2, "37:23-37:31", $s$14], [2, "37:37-37:44", $s$14], [2, "37:9-37:48", $s$14], [0, null, $s$14], [16, "38:1-38:1", $s$14], [16, "38:1-38:1", $s$14]]);

$M.moduleExports();