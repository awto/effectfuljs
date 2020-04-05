var $M = require("@effectful/debugger/api"),
    $forInIterator = $M.forInIterator,
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
  _core: [1, null],
  _getRequireWildcardCache: [2, null],
  _interopRequireWildcard: [3, null],
  a: [4, "21:15-21:16"],
  b: [5, "30:15-30:16"],
  c: [6, "39:15-39:16"],
  d: [7, "48:15-48:16"]
}, null, 0],
    $s$2 = [{
  cache: [1, null]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $s$4 = [{
  obj: [1, null],
  cache: [2, null],
  newObj: [3, null],
  hasPropertyDescriptor: [4, null],
  key: [5, null],
  desc: [6, null]
}, $s$1, 1],
    $s$5 = [{}, $s$1, 1],
    $s$6 = [{}, $s$1, 1],
    $s$7 = [{}, $s$1, 1],
    $s$8 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 8, "1:0-56:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $m$1($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $l[5] = $m$5($);
      $l[6] = $m$6($);
      $l[7] = $m$7($);
      $.goto = 1;
      $p = ($context.moduleId = require.resolve("@effectful/core"), $M.force(require("@effectful/core")));
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = $l[3])($p);
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
    $m$1 = $M.fun("m$1", "_getRequireWildcardCache", null, $m$0, [], 0, 2, null, 128, function _getRequireWildcardCache($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if (typeof WeakMap !== "function") {
        $.result = null;
        $.goto = 4;
        continue;
      } else {
        $.state = 1;
      }

    case 1:
      $.goto = 2;
      $p = new ($context.call = WeakMap)();
      $.state = 2;

    case 2:
      $l[1] = $p;
      $l[0][2] = $m$2($);
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
}, null, null, 1, [[0, null, $s$2], [2, null, $s$2], [0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
    $m$2 = $M.fun("m$2", null, null, $m$1, [], 0, 1, null, 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.result = $l[0][1];
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
}, null, null, 2, [[0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
    $m$3 = $M.fun("m$3", "_interopRequireWildcard", null, $m$0, ["obj"], 1, 9, null, 128, function _interopRequireWildcard($, $l, $p) {
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
        $.goto = 24;
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $1 = $l[1] === null;

      if ($1) {
        $.state = 3;
      } else {
        $1 = typeof $l[1] !== "object";

        if ($1) {
          $1 = typeof $l[1] !== "function";
          $.goto = 22;
          continue;
        } else {
          $.goto = 22;
          continue;
        }
      }

    case 3:
      if ($1) {
        $.result = {
          default: $l[1]
        };
        $.goto = 24;
        continue;
      } else {
        $.state = 4;
      }

    case 4:
      $.goto = 5;
      $p = ($context.call = $l[0][2])();
      $.state = 5;

    case 5:
      $l[2] = $p;
      $l[7] = $l[2];

      if ($l[7]) {
        $.goto = 21;
        $p = $mcall("has", $l[2], $l[1]);
        continue;
      } else {
        $.state = 6;
      }

    case 6:
      if ($l[7]) {
        $.goto = 20;
        $p = $mcall("get", $l[2], $l[1]);
        continue;
      } else {
        $.state = 7;
      }

    case 7:
      $l[3] = {};
      $1 = Object.defineProperty;

      if ($1) {
        $1 = Object.getOwnPropertyDescriptor;
        $.state = 8;
      } else {
        $.state = 8;
      }

    case 8:
      $l[4] = $1;
      $.goto = 9;
      $p = $forInIterator($l[1]);
      $.state = 9;

    case 9:
      $l[7] = $p;
      $.state = 10;

    case 10:
      $context.call = $l[7].next;
      $.goto = 11;
      $p = $l[7].next();
      $.state = 11;

    case 11:
      if ($p.done) {
        $l[3].default = $l[1];

        if ($l[2]) {
          $.goto = 19;
          $mcall("set", $l[2], $l[1], $l[3]);
          continue;
        } else {
          $.goto = 19;
          continue;
        }
      } else {
        $l[5] = $p.value;
        $.goto = 12;
        $p = $mcall("call", Object.prototype.hasOwnProperty, $l[1], $l[5]);
        $.state = 12;
      }

    case 12:
      if ($p) {
        if ($l[4]) {
          $.goto = 18;
          $p = $mcall("getOwnPropertyDescriptor", Object, $l[1], $l[5]);
          continue;
        } else {
          $l[8] = null;
          $.goto = 14;
          continue;
        }
      } else {
        $.state = 13;
      }

    case 13:
      $.goto = 10;
      continue;

    case 14:
      $l[6] = $l[8];
      $1 = $l[6];

      if ($1) {
        $1 = $l[6].get;

        if ($1) {
          $.goto = 17;
          continue;
        } else {
          $1 = $l[6].set;
          $.goto = 17;
          continue;
        }
      } else {
        $.state = 15;
      }

    case 15:
      if ($1) {
        $.goto = 16;
        $mcall("defineProperty", Object, $l[3], $l[5], $l[6]);
        $.state = 16;
      } else {
        $l[3][$l[5]] = $l[1][$l[5]];
        $.state = 16;
      }

    case 16:
      $.goto = 13;
      continue;

    case 17:
      $.goto = 15;
      continue;

    case 18:
      $l[8] = $p;
      $.goto = 14;
      continue;

    case 19:
      $.result = $l[3];
      $.goto = 24;
      continue;

    case 20:
      $.result = $p;
      $.goto = 24;
      continue;

    case 21:
      $l[7] = $p;
      $.goto = 6;
      continue;

    case 22:
      $.goto = 3;
      continue;

    case 23:
      $.goto = 24;
      return $unhandled($.error);

    case 24:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [2, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
    $m$4 = $M.fun("m$4", "a", null, $m$0, [], 0, 1, "21:0-28:1", 129, function a($, $l, $p) {
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
    $m$5 = $M.fun("m$5", "b", null, $m$0, [], 0, 1, "30:0-37:1", 129, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $awt(s_1);

    case 1:
      0;
      $.goto = 2;
      ($context.call = $l[0][1].block)("par");
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
    $m$6 = $M.fun("m$6", "c", null, $m$0, [], 0, 1, "39:0-46:1", 129, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $awt(s_1);

    case 1:
      0;
      $.goto = 2;
      ($context.call = $l[0][1].block)("par");
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
    $m$7 = $M.fun("m$7", "d", null, $m$0, [], 0, 1, "48:0-55:1", 129, function d($, $l, $p) {
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