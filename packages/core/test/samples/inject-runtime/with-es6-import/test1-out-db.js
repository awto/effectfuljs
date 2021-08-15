var $M = require("@effectful/debugger"),
    $forInIterator = $M.forInIterator,
    $yld = $M.yld,
    $x = $M.context,
    $ret = $M.ret,
    $retG = $M.retG,
    $unhandled = $M.unhandled,
    $unhandledG = $M.unhandledG,
    $force = $M.force,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  Z: [1, null],
  _getRequireWildcardCache: [2, null],
  _interopRequireWildcard: [3, null],
  a: [4, "3:10-3:11"]
}, null, 0],
    $s$2 = [{
  nodeInterop: [1, null],
  cacheBabelInterop: [2, null],
  cacheNodeInterop: [3, null]
}, $s$1, 1],
    $s$3 = [{
  nodeInterop: [1, null]
}, $s$2, 2],
    $s$4 = [{
  obj: [1, null],
  nodeInterop: [2, null],
  cache: [3, null],
  newObj: [4, null],
  hasPropertyDescriptor: [5, null],
  key: [6, null],
  desc: [7, null]
}, $s$1, 1],
    $s$5 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 5, "1:0-7:0", 160, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $m$1($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $.goto = 1;
      $p = ($x.moduleId = require.resolve("@effectful/generators"), $force(require("@effectful/generators")));
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = $l[3])($p);
      $.state = 2;

    case 2:
      $l[1] = $p;
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
}, null, null, 0, [[2, null, $s$1], [2, null, $s$1], [0, null, $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]),
    $m$1 = $M.fun("m$1", "_getRequireWildcardCache", null, $m$0, ["nodeInterop"], 0, 4, null, 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if (typeof WeakMap !== "function") {
        $.result = null;
        $.goto = 6;
        continue;
      } else {
        $.state = 1;
      }

    case 1:
      $.goto = 2;
      $p = new ($x.call = WeakMap)();
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.goto = 3;
      $p = new ($x.call = WeakMap)();
      $.state = 3;

    case 3:
      $l[3] = $p;
      $.goto = 4;
      $p = ($x.call = $l[0][2] = $m$2($))($l[1]);
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
}, null, null, 1, [[0, null, $s$2], [2, null, $s$2], [2, null, $s$2], [2, null, $s$2], [0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
    $m$2 = $M.fun("m$2", null, null, $m$1, ["nodeInterop"], 0, 2, null, 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if ($l[1]) {
        $.result = $l[0][3];
        $.state = 1;
      } else {
        $.result = $l[0][2];
        $.state = 1;
      }

    case 1:
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
}, null, null, 2, [[0, null, $s$3], [0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
    $m$3 = $M.fun("m$3", "_interopRequireWildcard", null, $m$0, ["obj", "nodeInterop"], 1, 10, null, 128, function ($, $l, $p) {
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
        $.goto = 26;
        continue;
      } else {
        $.state = 3;
      }

    case 3:
      $1 = $l[1] === null;

      if ($1) {
        $.state = 4;
      } else {
        $1 = typeof $l[1] !== "object";

        if ($1) {
          $1 = typeof $l[1] !== "function";
          $.goto = 24;
          continue;
        } else {
          $.goto = 24;
          continue;
        }
      }

    case 4:
      if ($1) {
        $.result = {
          default: $l[1]
        };
        $.goto = 26;
        continue;
      } else {
        $.state = 5;
      }

    case 5:
      $.goto = 6;
      $p = ($x.call = $l[0][2])($l[2]);
      $.state = 6;

    case 6:
      $l[3] = $p;
      $l[8] = $l[3];

      if ($l[8]) {
        $.goto = 23;
        $p = $mcall("has", $l[3], $l[1]);
        continue;
      } else {
        $.state = 7;
      }

    case 7:
      if ($l[8]) {
        $.goto = 22;
        $p = $mcall("get", $l[3], $l[1]);
        continue;
      } else {
        $.state = 8;
      }

    case 8:
      $l[4] = {};
      $1 = Object.defineProperty;

      if ($1) {
        $1 = Object.getOwnPropertyDescriptor;
        $.state = 9;
      } else {
        $.state = 9;
      }

    case 9:
      $l[5] = $1;
      $.goto = 10;
      $p = $forInIterator($l[1]);
      $.state = 10;

    case 10:
      $l[8] = $p;
      $.state = 11;

    case 11:
      $x.call = $l[8].next;
      $.goto = 12;
      $p = $l[8].next();
      $.state = 12;

    case 12:
      if ($p.done) {
        $l[4].default = $l[1];

        if ($l[3]) {
          $.goto = 21;
          $mcall("set", $l[3], $l[1], $l[4]);
          continue;
        } else {
          $.goto = 21;
          continue;
        }
      } else {
        $l[6] = $p.value;
        $l[9] = $l[6] !== "default";

        if ($l[9]) {
          $.goto = 20;
          $p = $mcall("call", Object.prototype.hasOwnProperty, $l[1], $l[6]);
          continue;
        } else {
          $.state = 13;
        }
      }

    case 13:
      if ($l[9]) {
        if ($l[5]) {
          $.goto = 19;
          $p = $mcall("getOwnPropertyDescriptor", Object, $l[1], $l[6]);
          continue;
        } else {
          $l[9] = null;
          $.goto = 15;
          continue;
        }
      } else {
        $.state = 14;
      }

    case 14:
      $.goto = 11;
      continue;

    case 15:
      $l[7] = $l[9];
      $1 = $l[7];

      if ($1) {
        $1 = $l[7].get;

        if ($1) {
          $.goto = 18;
          continue;
        } else {
          $1 = $l[7].set;
          $.goto = 18;
          continue;
        }
      } else {
        $.state = 16;
      }

    case 16:
      if ($1) {
        $.goto = 17;
        $mcall("defineProperty", Object, $l[4], $l[6], $l[7]);
        $.state = 17;
      } else {
        $l[4][$l[6]] = $l[1][$l[6]];
        $.state = 17;
      }

    case 17:
      $.goto = 14;
      continue;

    case 18:
      $.goto = 16;
      continue;

    case 19:
      $l[9] = $p;
      $.goto = 15;
      continue;

    case 20:
      $l[9] = $p;
      $.goto = 13;
      continue;

    case 21:
      $.result = $l[4];
      $.goto = 26;
      continue;

    case 22:
      $.result = $p;
      $.goto = 26;
      continue;

    case 23:
      $l[8] = $p;
      $.goto = 7;
      continue;

    case 24:
      $.goto = 4;
      continue;

    case 25:
      $.goto = 26;
      return $unhandled($.error);

    case 26:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [2, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [2, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
    $m$4 = $M.fun("m$4", "a", null, $m$0, [], 0, 1, "3:0-6:1", 130, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      return $yld(1);

    case 1:
      $.goto = 3;
      return $yld(2);

    case 2:
      $.goto = 3;
      return $unhandledG($.error);

    case 3:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "4:2-4:9", $s$5], [2, "5:2-5:9", $s$5], [16, "6:1-6:1", $s$5], [16, "6:1-6:1", $s$5]]);

$M.moduleExports();