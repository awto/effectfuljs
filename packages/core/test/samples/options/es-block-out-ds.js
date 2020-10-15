var $M = require("@effectful/debugger"),
    $forInIterator = $M.forInIterator,
    $awt = $M.awt,
    $context = $M.context,
    $ret = $M.ret,
    $retA = $M.retA,
    $unhandled = $M.unhandled,
    $unhandledA = $M.unhandledA,
    $raise = $M.raise,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $get = $M.get,
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
      $brk();
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
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = $get($l[1], "default");
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
    $m$1 = $M.fun("m$1", "_getRequireWildcardCache", null, $m$0, [], 0, 2, null, 0, function _getRequireWildcardCache($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if (typeof WeakMap !== "function") {
        $.state = 1;
      } else {
        $.goto = 2;
        continue;
      }

    case 1:
      $.result = null;
      $.goto = 5;
      continue;

    case 2:
      $.goto = 3;
      $p = new ($context.call = WeakMap)();
      $.state = 3;

    case 3:
      $lset($l, 1,
      /*cache*/
      $p);
      $lset($l[0], 2,
      /*_getRequireWildcardCache*/
      $m$2($));
      $.result = $l[1];
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
}, null, null, 1, [[0, null, $s$2], [0, null, $s$2], [2, null, $s$2], [0, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
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
    $m$3 = $M.fun("m$3", "_interopRequireWildcard", null, $m$0, ["obj"], 1, 11, null, 0, function _interopRequireWildcard($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[8] = $l[1];

      if ($l[8]) {
        $.state = 1;
      } else {
        $.goto = 3;
        continue;
      }

    case 1:
      $.goto = 2;
      $p = $get($l[1], "__esModule");
      $.state = 2;

    case 2:
      $l[8] = $p;
      $.state = 3;

    case 3:
      if ($l[8]) {
        $.state = 4;
      } else {
        $.goto = 5;
        continue;
      }

    case 4:
      $.result = $l[1];
      $.goto = 55;
      continue;

    case 5:
      $1 = $l[1] === null;

      if ($1) {
        $.state = 6;
      } else {
        $.goto = 51;
        continue;
      }

    case 6:
      if ($1) {
        $.state = 7;
      } else {
        $.goto = 8;
        continue;
      }

    case 7:
      $.result = {
        default: $l[1]
      };
      $.goto = 55;
      continue;

    case 8:
      $.goto = 9;
      $p = ($context.call = $l[0][2])();
      $.state = 9;

    case 9:
      $lset($l, 2,
      /*cache*/
      $p);
      $l[9] = $l[2];

      if ($l[9]) {
        $.state = 10;
      } else {
        $.goto = 12;
        continue;
      }

    case 10:
      $.goto = 11;
      $p = $mcall("has", $l[2], $l[1]);
      $.state = 11;

    case 11:
      $l[9] = $p;
      $.state = 12;

    case 12:
      if ($l[9]) {
        $.state = 13;
      } else {
        $.goto = 15;
        continue;
      }

    case 13:
      $.goto = 14;
      $p = $mcall("get", $l[2], $l[1]);
      $.state = 14;

    case 14:
      $.result = $p;
      $.goto = 55;
      continue;

    case 15:
      $lset($l, 3,
      /*newObj*/
      {});
      $.goto = 16;
      $p = $get(Object, "defineProperty");
      $.state = 16;

    case 16:
      $l[10] = $p;

      if ($l[10]) {
        $.state = 17;
      } else {
        $.goto = 19;
        continue;
      }

    case 17:
      $.goto = 18;
      $p = $get(Object, "getOwnPropertyDescriptor");
      $.state = 18;

    case 18:
      $l[10] = $p;
      $.state = 19;

    case 19:
      $lset($l, 4,
      /*hasPropertyDescriptor*/
      $l[10]);
      $.state = 20;

    case 20:
      $l = $.$ = [$l, void 0, void 0, void 0];
      $.goto = 21;
      $p = $forInIterator($l[0][1]);
      $.state = 21;

    case 21:
      $l[1] = $p;
      $.state = 22;

    case 22:
      $context.call = $l[1].next;
      $.goto = 23;
      $p = $l[1].next();
      $.state = 23;

    case 23:
      if ($p.done) {
        $.state = 24;
      } else {
        $.goto = 25;
        continue;
      }

    case 24:
      $l[0][7] = 47;
      $.goto = 46;
      continue;

    case 25:
      $lset($l[0], 5,
      /*key*/
      $p.value);
      $.goto = 26;
      $p = $get(Object, "prototype");
      $.state = 26;

    case 26:
      $.goto = 27;
      $p = $get($p, "hasOwnProperty");
      $.state = 27;

    case 27:
      $.goto = 28;
      $p = $mcall("call", $p, $l[0][1], $l[0][5]);
      $.state = 28;

    case 28:
      if ($p) {
        $.state = 29;
      } else {
        $.goto = 44;
        continue;
      }

    case 29:
      if ($l[0][4]) {
        $.state = 30;
      } else {
        $.goto = 43;
        continue;
      }

    case 30:
      $.goto = 31;
      $p = $mcall("getOwnPropertyDescriptor", Object, $l[0][1], $l[0][5]);
      $.state = 31;

    case 31:
      $l[2] = $p;
      $.state = 32;

    case 32:
      $lset($l[0], 6,
      /*desc*/
      $l[2]);
      $l[3] = $l[0][6];

      if ($l[3]) {
        $.state = 33;
      } else {
        $.goto = 38;
        continue;
      }

    case 33:
      $.goto = 34;
      $p = $get($l[0][6], "get");
      $.state = 34;

    case 34:
      $l[3] = $p;

      if ($l[3]) {
        $.state = 35;
      } else {
        $.goto = 36;
        continue;
      }

    case 35:
      $.goto = 38;
      continue;

    case 36:
      $.goto = 37;
      $p = $get($l[0][6], "set");
      $.state = 37;

    case 37:
      $l[3] = $p;
      $.goto = 35;
      continue;

    case 38:
      if ($l[3]) {
        $.state = 39;
      } else {
        $.goto = 41;
        continue;
      }

    case 39:
      $.goto = 40;
      $mcall("defineProperty", Object, $l[0][3], $l[0][5], $l[0][6]);
      $.state = 40;

    case 40:
      $.goto = 44;
      continue;

    case 41:
      $.goto = 42;
      $p = $get($l[0][1], $l[0][5]);
      $.state = 42;

    case 42:
      $.goto = 40;
      $set($l[0][3], $l[0][5], $p);
      continue;

    case 43:
      $l[2] = null;
      $.goto = 32;
      continue;

    case 44:
      $l = $.$ = [$l[0], $l[1], void 0, void 0];
      $.goto = 22;
      continue;

    case 45:
      return $raise($.error);

    case 46:
      $l = $.$ = $l[0];
      $.goto = $l[7];
      continue;

    case 47:
      $.goto = 48;
      $set($l[3], "default", $l[1]);
      $.state = 48;

    case 48:
      if ($l[2]) {
        $.state = 49;
      } else {
        $.goto = 50;
        continue;
      }

    case 49:
      $.goto = 50;
      $mcall("set", $l[2], $l[1], $l[3]);
      $.state = 50;

    case 50:
      $.result = $l[3];
      $.goto = 55;
      continue;

    case 51:
      $1 = typeof $l[1] !== "object";

      if ($1) {
        $.state = 52;
      } else {
        $.goto = 53;
        continue;
      }

    case 52:
      $1 = typeof $l[1] !== "function";
      $.state = 53;

    case 53:
      $.goto = 6;
      continue;

    case 54:
      $.goto = 55;
      return $unhandled($.error);

    case 55:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
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
    case 23:
    case 22:
      $.goto = 46;
      $l[0][7] = 45;
      break;

    default:
      $.goto = 54;
  }
}, function ($, $l) {
  switch ($.state) {
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
    case 23:
    case 22:
      $l[0][7] = 55;
      $.goto = 46;
      break;

    default:
      $.goto = 55;
      break;
  }
}, 1, [[0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [2, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [0, null, $s$5], [2, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
    $m$4 = $M.fun("m$4", "a", null, $m$0, [], 0, 1, "21:0-28:1", 1, function a($, $l, $p) {
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
      $p = $get($l[0][1], "default");
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
    $m$5 = $M.fun("m$5", "b", null, $m$0, [], 0, 1, "30:0-37:1", 1, function b($, $l, $p) {
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
      $p = $get($l[0][1], "block");
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = $p)("par");
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
    $m$6 = $M.fun("m$6", "c", null, $m$0, [], 0, 1, "39:0-46:1", 1, function c($, $l, $p) {
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
      $p = $get($l[0][1], "block");
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = $p)("par");
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
    $m$7 = $M.fun("m$7", "d", null, $m$0, [], 0, 1, "48:0-55:1", 1, function d($, $l, $p) {
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