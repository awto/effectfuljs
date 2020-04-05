var $M = require("@effectful/debugger/api"),
    $awt = $M.awt,
    $context = $M.context,
    $ret = $M.ret,
    $retA = $M.retA,
    $unhandled = $M.unhandled,
    $unhandledA = $M.unhandledA,
    $raise = $M.raise,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  _createSuper: [1, null],
  _possibleConstructorReturn: [2, null],
  _assertThisInitialized: [3, null],
  _isNativeReflectConstruct: [4, null],
  _getPrototypeOf: [5, null],
  _inheritsLoose: [6, null],
  aa: [7, "3:15-3:17"]
}, null, 0],
    $s$2 = [{
  Derived: [1, null]
}, $s$1, 1],
    $s$3 = [{
  Super: [1, null],
  result: [2, null],
  NewTarget: [3, null]
}, $s$2, 2],
    $s$4 = [{
  self: [1, null],
  call: [2, null]
}, $s$1, 1],
    $s$5 = [{
  self: [1, null]
}, $s$1, 1],
    $s$6 = [{}, $s$1, 1],
    $s$7 = [{
  e: [1, null]
}, $s$6, 1],
    $s$8 = [{}, $s$6, 2],
    $s$9 = [{
  o: [1, null]
}, $s$1, 1],
    $s$10 = [{
  o: [1, null]
}, $s$9, 2],
    $s$11 = [{
  subClass: [1, null],
  superClass: [2, null]
}, $s$1, 1],
    $s$12 = [{
  A: [1, "4:8-4:9"],
  B: [2, "13:8-13:9"]
}, $s$1, 1],
    $s$13 = [{
  A: [1, null],
  _proto: [2, null]
}, $s$12, 2],
    $s$14 = [{}, $s$13, 3],
    $s$15 = [{}, $s$13, 3],
    $s$16 = [{}, $s$13, 3],
    $s$17 = [{
  _A: [1, null],
  _super: [2, null],
  B: [3, null],
  _proto2: [4, null]
}, $s$12, 2],
    $s$18 = [{}, $s$17, 3],
    $s$19 = [{}, $s$17, 3],
    $s$20 = [{}, $s$17, 3],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 8, "1:0-22:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$3($);
      $l[3] = $m$4($);
      $l[4] = $m$5($);
      $l[5] = $m$7($);
      $l[6] = $m$9($);
      $l[7] = $m$10($);
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
    $m$1 = $M.fun("m$1", "_createSuper", null, $m$0, ["Derived"], 0, 2, null, 128, function _createSuper($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.result = $m$2($);
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
}, null, null, 1, [[0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
    $m$2 = $M.fun("m$2", null, null, $m$1, [], 0, 4, null, 152, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = $l[0][0][5])($l[0][1]);
      $.state = 1;

    case 1:
      $l[1] = $p;
      $.goto = 2;
      $p = ($context.call = $l[0][0][4])();
      $.state = 2;

    case 2:
      if ($p) {
        $.goto = 6;
        $p = ($context.call = $l[0][0][5])($.self);
        continue;
      } else {
        $.goto = 3;
        $p = $mcall("apply", $l[1], $.self, $.args);
        $.state = 3;
      }

    case 3:
      $l[2] = $p;
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($context.call = $l[0][0][2])($.self, $l[2]);
      $.state = 5;

    case 5:
      $.result = $p;
      $.goto = 9;
      continue;

    case 6:
      $l[3] = $p.constructor;
      $.goto = 7;
      $p = $mcall("construct", Reflect, $l[1], $.args, $l[3]);
      $.state = 7;

    case 7:
      $l[2] = $p;
      $.goto = 4;
      continue;

    case 8:
      $.goto = 9;
      return $unhandled($.error);

    case 9:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, null, $s$3], [2, null, $s$3], [2, null, $s$3], [0, null, $s$3], [2, null, $s$3], [0, null, $s$3], [2, null, $s$3], [0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
    $m$3 = $M.fun("m$3", "_possibleConstructorReturn", null, $m$0, ["self", "call"], 1, 3, null, 128, function _possibleConstructorReturn($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $1 = $l[2];

      if ($1) {
        $1 = typeof $l[2] === "object";

        if ($1) {
          $.goto = 4;
          continue;
        } else {
          $1 = typeof $l[2] === "function";
          $.goto = 4;
          continue;
        }
      } else {
        $.state = 1;
      }

    case 1:
      if ($1) {
        $.result = $l[2];
        $.goto = 6;
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      $p = ($context.call = $l[0][3])($l[1]);
      $.state = 3;

    case 3:
      $.result = $p;
      $.goto = 6;
      continue;

    case 4:
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
}, null, null, 1, [[0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
    $m$4 = $M.fun("m$4", "_assertThisInitialized", null, $m$0, ["self"], 0, 2, null, 128, function _assertThisInitialized($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if ($l[1] === void 0) {
        $.goto = 2;
        $p = new ($context.call = ReferenceError)("this hasn't been initialised - super() hasn't been called");
        continue;
      } else {
        $.state = 1;
      }

    case 1:
      $.result = $l[1];
      $.goto = 4;
      continue;

    case 2:
      $.goto = 1;
      return $raise($p);

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [16, null, $s$5], [16, null, $s$5]]),
    $m$5 = $M.fun("m$5", "_isNativeReflectConstruct", null, $m$0, [], 1, 3, null, 128, function _isNativeReflectConstruct($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $1 = typeof Reflect === "undefined";

      if ($1) {
        $.state = 1;
      } else {
        $1 = !Reflect.construct;
        $.state = 1;
      }

    case 1:
      if ($1) {
        $.result = false;
        $.goto = 10;
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      if (Reflect.construct.sham) {
        $.result = false;
        $.goto = 10;
        continue;
      } else {
        $.state = 3;
      }

    case 3:
      if (typeof Proxy === "function") {
        $.result = true;
        $.goto = 10;
        continue;
      } else {
        $.state = 4;
      }

    case 4:
      $.state = 5;

    case 5:
      $l[2] = Date.prototype.toString;
      $.goto = 6;
      $p = $mcall("construct", Reflect, Date, [], $m$6($));
      $.state = 6;

    case 6:
      $.goto = 7;
      $mcall("call", $l[2], $p);
      $.state = 7;

    case 7:
      $.result = true;
      $.goto = 10;
      continue;

    case 8:
      $l[1] = $.error;
      $.error = void 0;
      $.result = false;
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
}, function ($, $l) {
  switch ($.state) {
    case 7:
    case 6:
    case 5:
      $.goto = 8;
      break;

    default:
      $.goto = 9;
      break;
  }
}, null, 1, [[0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [3, null, $s$6], [3, null, $s$6], [1, null, $s$6], [0, null, $s$7], [16, null, $s$6], [16, null, $s$6]]),
    $m$6 = $M.fun("m$6", null, null, $m$5, [], 0, 1, null, 128, function ($, $l, $p) {
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
}, null, null, 2, [[0, null, $s$8], [16, null, $s$8], [16, null, $s$8]]),
    $m$7 = $M.fun("m$7", "_getPrototypeOf", null, $m$0, ["o"], 1, 2, null, 128, function _getPrototypeOf($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      if (Object.setPrototypeOf) {
        $1 = Object.getPrototypeOf;
        $.state = 1;
      } else {
        $1 = $m$8($);
        $.state = 1;
      }

    case 1:
      $l[0][5] = $1;
      $.goto = 2;
      $p = ($context.call = $l[0][5])($l[1]);
      $.state = 2;

    case 2:
      $.result = $p;
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
}, null, null, 1, [[0, null, $s$9], [2, null, $s$9], [0, null, $s$9], [16, null, $s$9], [16, null, $s$9]]),
    $m$8 = $M.fun("m$8", "_getPrototypeOf", null, $m$7, ["o"], 0, 2, null, 128, function _getPrototypeOf($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.result = $l[1].__proto__;

      if ($.result) {
        $.state = 1;
      } else {
        $.goto = 2;
        $p = $mcall("getPrototypeOf", Object, $l[1]);
        continue;
      }

    case 1:
      $.goto = 4;
      continue;

    case 2:
      $.result = $p;
      $.goto = 1;
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, null, $s$10], [0, null, $s$10], [0, null, $s$10], [16, null, $s$10], [16, null, $s$10]]),
    $m$9 = $M.fun("m$9", "_inheritsLoose", null, $m$0, ["subClass", "superClass"], 0, 3, null, 128, function _inheritsLoose($, $l, $p) {
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
}, null, null, 1, [[2, null, $s$11], [0, null, $s$11], [16, null, $s$11], [16, null, $s$11]]),
    $m$10 = $M.fun("m$10", "aa", null, $m$0, [], 0, 3, "3:0-21:1", 129, function aa($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = /*#__PURE__*/($context.call = $m$11($))();
      $.state = 1;

    case 1:
      $l[1] = $p;
      $.goto = 2;
      $p = /*#__PURE__*/($context.call = $m$15($))($l[1]);
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
}, null, null, 1, [[2, null, $s$12], [2, null, $s$12], [0, null, $s$12], [16, "21:1-21:1", $s$12], [16, "21:1-21:1", $s$12]]),
    $m$11 = $M.fun("m$11", null, null, $m$10, [], 0, 3, null, 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$12($);
      $l[2] = $l[1].prototype;
      $l[2].method = $m$13($);
      $l[1].smethod = $m$14($);
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
}, null, null, 2, [[0, null, $s$13], [16, null, $s$13], [16, null, $s$13]]),
    $m$12 = $M.fun("m$12", "A", null, $m$11, [], 0, 1, null, 128, function A($, $l, $p) {
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
}, null, null, 3, [[0, null, $s$14], [16, null, $s$14], [16, null, $s$14]]),
    $m$13 = $M.fun("m$13", "method", null, $m$11, [], 0, 1, "5:4-7:5", 129, function method($, $l, $p) {
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
}, null, null, 3, [[0, "6:13-6:21", $s$15], [16, "7:5-7:5", $s$15], [16, "7:5-7:5", $s$15]]),
    $m$14 = $M.fun("m$14", "smethod", null, $m$11, [], 0, 1, "8:4-10:5", 129, function smethod($, $l, $p) {
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
}, null, null, 3, [[0, "9:13-9:28", $s$16], [16, "10:5-10:5", $s$16], [16, "10:5-10:5", $s$16]]),
    $m$15 = $M.fun("m$15", null, null, $m$10, ["_A"], 0, 5, null, 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[3] = $m$16($);
      $.goto = 1;
      ($context.call = $l[0][0][6])($l[3], $l[1]);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = $l[0][0][1])($l[3]);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $l[4] = $l[3].prototype;
      $l[4].method = $m$17($);
      $l[3].smethod = $m$18($);
      $.result = $l[3];
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
}, null, null, 2, [[2, null, $s$17], [2, null, $s$17], [0, null, $s$17], [16, null, $s$17], [16, null, $s$17]]),
    $m$16 = $M.fun("m$16", "B", null, $m$15, [], 0, 1, null, 152, function B($, $l, $p) {
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
}, null, null, 3, [[2, null, $s$18], [0, null, $s$18], [0, null, $s$18], [16, null, $s$18], [16, null, $s$18]]),
    $m$17 = $M.fun("m$17", "method", null, $m$15, [], 0, 1, "14:4-16:5", 137, function method($, $l, $p) {
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
}, null, null, 3, [[2, null, $s$19], [2, "15:26-15:46", $s$19], [0, "15:13-15:47", $s$19], [16, "16:5-16:5", $s$19], [16, "16:5-16:5", $s$19]]),
    $m$18 = $M.fun("m$18", "smethod", null, $m$15, [], 0, 1, "17:4-19:5", 137, function smethod($, $l, $p) {
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
}, null, null, 3, [[2, null, $s$20], [2, "18:33-18:53", $s$20], [0, "18:13-18:54", $s$20], [16, "19:5-19:5", $s$20], [16, "19:5-19:5", $s$20]]);

$M.moduleExports();