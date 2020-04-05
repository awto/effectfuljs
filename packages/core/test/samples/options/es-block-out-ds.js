var $M = require("@effectful/debugger/api"),
    $forInIterator = $M.forInIterator,
    $awt = $M.awt,
    $context = $M.context,
    $ret = $M.ret,
    $retA = $M.retA,
    $unhandled = $M.unhandled,
    $unhandledA = $M.unhandledA,
    $set = $M.set,
    $brk = $M.brk,
    $lset = $M.lset,
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
    $s$5 = [{}, $s$4, 2],
    $s$6 = [{}, $s$1, 1],
    $s$7 = [{}, $s$1, 1],
    $s$8 = [{}, $s$1, 1],
    $s$9 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 8, "1:0-56:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 2,
      /*_getRequireWildcardCache*/
      $m$1($));
      $lset($l, 3,
      /*_interopRequireWildcard*/
      $m$3($));
      $lset($l, 4,
      /*a*/
      $m$4($));
      $lset($l, 5,
      /*b*/
      $m$5($));
      $lset($l, 6,
      /*c*/
      $m$6($));
      $lset($l, 7,
      /*d*/
      $m$7($));
      $.goto = 1;
      $brk("1:0-1:32");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.moduleId = require.resolve("@effectful/core"), $M.force(require("@effectful/core")));
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = $l[3])($p);
      $.state = 3;

    case 3:
      $lset($l, 1,
      /*_core*/
      $p);
      $.goto = 4;
      $brk("4:0-19:3");
      $.state = 4;

    case 4:
      $.goto = 6;
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

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "1:0-1:32", $s$1], [2, null, $s$1], [2, null, $s$1], [4, "4:0-19:3", $s$1], [2, "4:0-19:2", $s$1], [16, "56:0-56:0", $s$1], [16, "56:0-56:0", $s$1]]),
    $m$1 = $M.fun("m$1", "_getRequireWildcardCache", null, $m$0, [], 0, 2, null, 0, function _getRequireWildcardCache($, $l, $p) {
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
      $lset($l, 1,
      /*cache*/
      $p);
      $lset($l[0], 2,
      /*_getRequireWildcardCache*/
      $m$2($));
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
    $m$2 = $M.fun("m$2", null, null, $m$1, [], 0, 1, null, 0, function ($, $l, $p) {
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
    $m$3 = $M.fun("m$3", "_interopRequireWildcard", null, $m$0, ["obj"], 1, 9, null, 0, function _interopRequireWildcard($, $l, $p) {
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
        $.goto = 28;
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
          $.goto = 26;
          continue;
        } else {
          $.goto = 26;
          continue;
        }
      }

    case 3:
      if ($1) {
        $.result = {
          default: $l[1]
        };
        $.goto = 28;
        continue;
      } else {
        $.state = 4;
      }

    case 4:
      $.goto = 5;
      $p = ($context.call = $l[0][2])();
      $.state = 5;

    case 5:
      $lset($l, 2,
      /*cache*/
      $p);
      $l[8] = $l[2];

      if ($l[8]) {
        $.goto = 25;
        $p = $mcall("has", $l[2], $l[1]);
        continue;
      } else {
        $.state = 6;
      }

    case 6:
      if ($l[8]) {
        $.goto = 24;
        $p = $mcall("get", $l[2], $l[1]);
        continue;
      } else {
        $.state = 7;
      }

    case 7:
      $lset($l, 3,
      /*newObj*/
      {});
      $1 = Object.defineProperty;

      if ($1) {
        $1 = Object.getOwnPropertyDescriptor;
        $.state = 8;
      } else {
        $.state = 8;
      }

    case 8:
      $lset($l, 4,
      /*hasPropertyDescriptor*/
      $1);
      $.state = 9;

    case 9:
      $l = $.$ = [$l, void 0, void 0];
      $.goto = 10;
      $p = $forInIterator($l[0][1]);
      $.state = 10;

    case 10:
      $l[1] = $p;
      $.state = 11;

    case 11:
      $l = $.$ = $l.slice();
      $.state = 12;

    case 12:
      $context.call = $l[1].next;
      $.goto = 13;
      $p = $l[1].next();
      $.state = 13;

    case 13:
      if ($p.done) {
        $l[0][7] = 22;
        $.goto = 21;
        continue;
      } else {
        $lset($l[0], 5,
        /*key*/
        $p.value);
        $.goto = 14;
        $p = $mcall("call", Object.prototype.hasOwnProperty, $l[0][1], $l[0][5]);
        $.state = 14;
      }

    case 14:
      if ($p) {
        if ($l[0][4]) {
          $.goto = 20;
          $p = $mcall("getOwnPropertyDescriptor", Object, $l[0][1], $l[0][5]);
          continue;
        } else {
          $l[2] = null;
          $.goto = 16;
          continue;
        }
      } else {
        $.state = 15;
      }

    case 15:
      $l = $.$ = $l.slice();
      $.goto = 12;
      continue;

    case 16:
      $lset($l[0], 6,
      /*desc*/
      $l[2]);
      $1 = $l[0][6];

      if ($1) {
        $1 = $l[0][6].get;

        if ($1) {
          $.goto = 19;
          continue;
        } else {
          $1 = $l[0][6].set;
          $.goto = 19;
          continue;
        }
      } else {
        $.state = 17;
      }

    case 17:
      if ($1) {
        $.goto = 18;
        $mcall("defineProperty", Object, $l[0][3], $l[0][5], $l[0][6]);
        $.state = 18;
      } else {
        $set($l[0][3], $l[0][5], $l[0][1][$l[0][5]]);
        $.state = 18;
      }

    case 18:
      $.goto = 15;
      continue;

    case 19:
      $.goto = 17;
      continue;

    case 20:
      $l[2] = $p;
      $.goto = 16;
      continue;

    case 21:
      $l = $.$ = $l[0];
      $.goto = $l[7];
      continue;

    case 22:
      $set($l[3], "default", $l[1]);

      if ($l[2]) {
        $.goto = 23;
        $mcall("set", $l[2], $l[1], $l[3]);
        $.state = 23;
      } else {
        $.state = 23;
      }

    case 23:
      $.result = $l[3];
      $.goto = 28;
      continue;

    case 24:
      $.result = $p;
      $.goto = 28;
      continue;

    case 25:
      $l[8] = $p;
      $.goto = 6;
      continue;

    case 26:
      $.goto = 3;
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
    case 20:
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
      $l[0][7] = 27;
      $.goto = 21;
      break;

    default:
      $.goto = 27;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 20:
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
      $l[0][7] = 28;
      $.goto = 21;
      break;

    default:
      $.goto = 28;
      break;
  }
}, 1, [[0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [2, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [1, null, $s$4], [1, null, $s$4], [3, null, $s$5], [3, null, $s$5], [1, null, $s$4], [1, null, $s$5], [3, null, $s$5], [1, null, $s$4], [1, null, $s$4], [1, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
    $m$4 = $M.fun("m$4", "a", null, $m$0, [], 0, 1, "21:0-28:1", 1, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("22:2-22:12");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt(s_1);

    case 2:
      $.goto = 3;
      $brk("24:4-24:19");
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("block", $l[0][1].default, "par");
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("25:4-25:14");
      $.state = 5;

    case 5:
      $.goto = 6;
      return $awt(p_1);

    case 6:
      $.goto = 7;
      $brk("26:4-26:14");
      $.state = 7;

    case 7:
      $.goto = 9;
      return $awt(p_2);

    case 8:
      $.goto = 9;
      return $unhandledA($.error);

    case 9:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "22:2-22:12", $s$6], [2, "22:2-22:11", $s$6], [4, "24:4-24:19", $s$6], [2, "24:4-24:18", $s$6], [4, "25:4-25:14", $s$6], [2, "25:4-25:13", $s$6], [4, "26:4-26:14", $s$6], [2, "26:4-26:13", $s$6], [16, "28:1-28:1", $s$6], [16, "28:1-28:1", $s$6]]),
    $m$5 = $M.fun("m$5", "b", null, $m$0, [], 0, 1, "30:0-37:1", 1, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("31:2-31:12");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt(s_1);

    case 2:
      $.goto = 3;
      $brk("33:4-33:16");
      $.state = 3;

    case 3:
      0;
      $.goto = 4;
      ($context.call = $l[0][1].block)("par");
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("34:4-34:14");
      $.state = 5;

    case 5:
      $.goto = 6;
      return $awt(p_1);

    case 6:
      $.goto = 7;
      $brk("35:4-35:14");
      $.state = 7;

    case 7:
      $.goto = 9;
      return $awt(p_2);

    case 8:
      $.goto = 9;
      return $unhandledA($.error);

    case 9:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "31:2-31:12", $s$7], [2, "31:2-31:11", $s$7], [4, "33:4-33:16", $s$7], [2, "33:4-33:15", $s$7], [4, "34:4-34:14", $s$7], [2, "34:4-34:13", $s$7], [4, "35:4-35:14", $s$7], [2, "35:4-35:13", $s$7], [16, "37:1-37:1", $s$7], [16, "37:1-37:1", $s$7]]),
    $m$6 = $M.fun("m$6", "c", null, $m$0, [], 0, 1, "39:0-46:1", 1, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("40:2-40:12");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt(s_1);

    case 2:
      $.goto = 3;
      $brk("42:4-42:17");
      $.state = 3;

    case 3:
      0;
      $.goto = 4;
      ($context.call = $l[0][1].block)("par");
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("43:4-43:14");
      $.state = 5;

    case 5:
      $.goto = 6;
      return $awt(p_1);

    case 6:
      $.goto = 7;
      $brk("44:4-44:14");
      $.state = 7;

    case 7:
      $.goto = 9;
      return $awt(p_2);

    case 8:
      $.goto = 9;
      return $unhandledA($.error);

    case 9:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "40:2-40:12", $s$8], [2, "40:2-40:11", $s$8], [4, "42:4-42:17", $s$8], [2, "42:4-42:16", $s$8], [4, "43:4-43:14", $s$8], [2, "43:4-43:13", $s$8], [4, "44:4-44:14", $s$8], [2, "44:4-44:13", $s$8], [16, "46:1-46:1", $s$8], [16, "46:1-46:1", $s$8]]),
    $m$7 = $M.fun("m$7", "d", null, $m$0, [], 0, 1, "48:0-55:1", 1, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("49:2-49:12");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt(s_1);

    case 2:
      $.goto = 3;
      $brk("51:4-51:12");
      $.state = 3;

    case 3:
      "par";
      $.goto = 4;
      $brk("52:4-52:14");
      $.state = 4;

    case 4:
      $.goto = 5;
      return $awt(p_1);

    case 5:
      $.goto = 6;
      $brk("53:4-53:14");
      $.state = 6;

    case 6:
      $.goto = 8;
      return $awt(p_2);

    case 7:
      $.goto = 8;
      return $unhandledA($.error);

    case 8:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "49:2-49:12", $s$9], [2, "49:2-49:11", $s$9], [4, "51:4-51:12", $s$9], [4, "52:4-52:14", $s$9], [2, "52:4-52:13", $s$9], [4, "53:4-53:14", $s$9], [2, "53:4-53:13", $s$9], [16, "55:1-55:1", $s$9], [16, "55:1-55:1", $s$9]]);

$M.moduleExports();