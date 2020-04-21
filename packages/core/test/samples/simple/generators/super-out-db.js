var $M = require("@effectful/debugger"),
    $awt = $M.awt,
    $context = $M.context,
    $ret = $M.ret,
    $retA = $M.retA,
    $unhandled = $M.unhandled,
    $unhandledA = $M.unhandledA,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  _inheritsLoose: [1, null],
  aa: [2, "3:15-3:17"]
}, null, 0],
    $s$2 = [{
  subClass: [1, null],
  superClass: [2, null]
}, $s$1, 1],
    $s$3 = [{
  A: [1, "4:8-4:9"],
  B: [2, "13:8-13:9"]
}, $s$1, 1],
    $s$4 = [{
  A: [1, null],
  _proto: [2, null]
}, $s$3, 2],
    $s$5 = [{}, $s$4, 3],
    $s$6 = [{}, $s$4, 3],
    $s$7 = [{}, $s$4, 3],
    $s$8 = [{
  _A: [1, null],
  B: [2, null],
  _proto2: [3, null]
}, $s$3, 2],
    $s$9 = [{}, $s$8, 3],
    $s$10 = [{}, $s$8, 3],
    $s$11 = [{}, $s$8, 3],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-22:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $.goto = 2;
      $mcall("profile", M, "es");
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[2, "1:0-1:15", $s$1], [16, "22:0-22:0", $s$1], [16, "22:0-22:0", $s$1]]),
    $m$1 = $M.fun("m$1", "_inheritsLoose", null, $m$0, ["subClass", "superClass"], 0, 3, null, 128, function _inheritsLoose($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $mcall("create", Object, $l[2].prototype);
      $.state = 1;

    case 1:
      $l[1].prototype = $p;
      $l[1].prototype.constructor = $l[1];
      $l[1].__proto__ = $l[2];
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
}, null, null, 1, [[2, null, $s$2], [0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
    $m$2 = $M.fun("m$2", "aa", null, $m$0, [], 0, 3, "3:0-21:1", 129, function aa($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = /*#__PURE__*/($context.call = $m$3($))();
      $.state = 1;

    case 1:
      $l[1] = $p;
      $.goto = 2;
      $p = /*#__PURE__*/($context.call = $m$7($))($l[1]);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.goto = 4;
      continue;

    case 3:
      $.goto = 4;
      return $unhandledA($.error);

    case 4:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, null, $s$3], [2, null, $s$3], [0, null, $s$3], [16, "21:1-21:1", $s$3], [16, "21:1-21:1", $s$3]]),
    $m$3 = $M.fun("m$3", null, null, $m$2, [], 0, 3, null, 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$4($);
      $l[2] = $l[1].prototype;
      $l[2].method = $m$5($);
      $l[1].smethod = $m$6($);
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
}, null, null, 2, [[0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
    $m$4 = $M.fun("m$4", "A", null, $m$3, [], 0, 1, null, 128, function A($, $l, $p) {
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
}, null, null, 3, [[0, null, $s$5], [16, null, $s$5], [16, null, $s$5]]),
    $m$5 = $M.fun("m$5", "method", null, $m$3, [], 0, 1, "5:4-7:5", 129, function method($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.result = "from A";
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
}, null, null, 3, [[0, "6:13-6:21", $s$6], [16, "7:5-7:5", $s$6], [16, "7:5-7:5", $s$6]]),
    $m$6 = $M.fun("m$6", "smethod", null, $m$3, [], 0, 1, "8:4-10:5", 129, function smethod($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.result = "static from A";
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
}, null, null, 3, [[0, "9:13-9:28", $s$7], [16, "10:5-10:5", $s$7], [16, "10:5-10:5", $s$7]]),
    $m$7 = $M.fun("m$7", null, null, $m$2, ["_A"], 0, 4, null, 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $m$8($);
      $.goto = 1;
      ($context.call = $l[0][0][1])($l[2], $l[1]);
      $.state = 1;

    case 1:
      $l[3] = $l[2].prototype;
      $l[3].method = $m$9($);
      $l[2].smethod = $m$10($);
      $.result = $l[2];
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
}, null, null, 2, [[2, null, $s$8], [0, null, $s$8], [16, null, $s$8], [16, null, $s$8]]),
    $m$8 = $M.fun("m$8", "B", null, $m$7, [], 0, 1, null, 152, function B($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $mcall("apply", $l[0][1], $.self, $.args);
      $.state = 1;

    case 1:
      $.result = $p;

      if ($.result) {
        $.state = 2;
      } else {
        $.result = $.self;
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
}, null, null, 3, [[2, null, $s$9], [0, null, $s$9], [0, null, $s$9], [16, null, $s$9], [16, null, $s$9]]),
    $m$9 = $M.fun("m$9", "method", null, $m$7, [], 0, 1, "14:4-16:5", 137, function method($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $mcall("call", $l[0][1].prototype.method, $.self);
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt($p);

    case 2:
      $.result = "from B " + $p;
      $.goto = 4;
      continue;

    case 3:
      $.goto = 4;
      return $unhandledA($.error);

    case 4:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[2, null, $s$10], [2, "15:26-15:46", $s$10], [0, "15:13-15:47", $s$10], [16, "16:5-16:5", $s$10], [16, "16:5-16:5", $s$10]]),
    $m$10 = $M.fun("m$10", "smethod", null, $m$7, [], 0, 1, "17:4-19:5", 137, function smethod($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $mcall("call", $l[0][1].method, $.self);
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt($p);

    case 2:
      $.result = "static from B " + $p;
      $.goto = 4;
      continue;

    case 3:
      $.goto = 4;
      return $unhandledA($.error);

    case 4:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[2, null, $s$11], [2, "18:33-18:53", $s$11], [0, "18:13-18:54", $s$11], [16, "19:5-19:5", $s$11], [16, "19:5-19:5", $s$11]]);

$M.moduleExports();