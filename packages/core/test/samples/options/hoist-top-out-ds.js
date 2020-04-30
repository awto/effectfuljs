var $M = require("@effectful/debugger"),
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
    $set = $M.set,
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
  obj: [1, null]
}, $s$1, 1],
    $s$4 = [{
  arr: [1, null],
  i: [2, null]
}, $s$1, 1],
    $s$5 = [{}, $s$1, 1],
    $s$6 = [{
  o: [1, null],
  minLen: [2, null],
  n: [3, null]
}, $s$1, 1],
    $s$7 = [{
  arr: [1, null],
  len: [2, null],
  i: [3, null],
  arr2: [4, null]
}, $s$1, 1],
    $s$8 = [{}, $s$7, 2],
    $s$9 = [{
  arr: [1, null],
  i: [2, null],
  _arr: [3, null],
  _n: [4, null],
  _d: [5, null],
  _e: [6, null],
  _i: [7, null],
  _s: [8, null]
}, $s$1, 1],
    $s$10 = [{}, $s$9, 2],
    $s$11 = [{
  err: [9, null]
}, $s$9, 1],
    $s$12 = [{
  arr: [1, null]
}, $s$1, 1],
    $s$13 = [{}, $s$1, 1],
    $s$14 = [{
  Some: [1, null],
  _proto: [2, null]
}, $s$2, 1],
    $s$15 = [{}, $s$14, 2],
    $s$16 = [{}, $s$14, 2],
    $s$17 = [{}, $s$2, 1],
    $s$18 = [{}, $s$17, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 18, "1:0-20:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 2,
      /*_interopRequireDefault*/
      $m$1($));
      $lset($l, 3,
      /*_slicedToArray*/
      $m$2($));
      $lset($l, 4,
      /*_nonIterableRest*/
      $m$3($));
      $lset($l, 5,
      /*_unsupportedIterableToArray*/
      $m$4($));
      $lset($l, 6,
      /*_arrayLikeToArray*/
      $m$5($));
      $lset($l, 7,
      /*_iterableToArrayLimit*/
      $m$6($));
      $lset($l, 8,
      /*_arrayWithHoles*/
      $m$7($));
      $lset($l, 11,
      /*a1*/
      $m$8($));
      $set(module.exports, "__esModule", true);
      $set(module.exports, "a", void 0);
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.moduleId = require.resolve("some"), $M.force(require("some")));
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = $l[2])($p);
      $.state = 3;

    case 3:
      $lset($l, 1,
      /*_some*/
      $p);
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("profile", M, "es");
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      $p = ($context.call = $l[3])($l[1].default, 2);
      $.state = 7;

    case 7:
      $lset($l, 9,
      /*_b*/
      $p);
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $lset($l, 10,
      /*a*/
      $l[9][1]);
      $set(module.exports, "a", $l[10]);
      $lset($l, 17,
      /*somethingElse*/
      $m$12($));
      $.goto = 9;
      $brk();
      $.state = 9;

    case 9:
      $.goto = 10;
      $p = /*#__PURE__*/($context.call = $m$9($))();
      $.state = 10;

    case 10:
      $lset($l, 12,
      /*Some*/
      $p);
      $.goto = 11;
      $brk();
      $.state = 11;

    case 11:
      $lset($l, 13,
      /*b*/
      $l[10]);
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      $.goto = 13;
      $p = ($context.call = $l[3])($l[12], 3);
      $.state = 13;

    case 13:
      $lset($l, 14,
      /*_Some*/
      $p);
      $.goto = 14;
      $brk();
      $.state = 14;

    case 14:
      $lset($l, 15,
      /*other*/
      $l[14][1]);
      $.goto = 15;
      $brk();
      $.state = 15;

    case 15:
      $lset($l, 16,
      /*b2*/
      $l[14][2]);
      $.goto = 17;
      $brk();
      continue;

    case 16:
      $.goto = 17;
      return $unhandled($.error);

    case 17:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "2:0-2:21", $s$1], [2, null, $s$1], [2, null, $s$1], [4, "1:0-1:16", $s$1], [2, "1:0-1:15", $s$1], [4, "3:14-3:20", $s$1], [2, null, $s$1], [4, "3:14-3:15", $s$1], [4, "6:8-9:12", $s$2], [2, null, $s$2], [4, "11:2-11:12", $s$2], [4, "12:11-12:28", $s$2], [2, null, $s$2], [4, "12:11-12:16", $s$2], [4, "12:18-12:20", $s$2], [36, "19:1-19:1", $s$1], [16, "20:0-20:0", $s$1], [16, "20:0-20:0", $s$1]]),
    $m$1 = $M.fun("m$1", "_interopRequireDefault", null, $m$0, ["obj"], 1, 2, null, 0, function _interopRequireDefault($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $1 = $l[1];

      if ($1) {
        $.state = 1;
      } else {
        $.goto = 2;
        continue;
      }

    case 1:
      $1 = $l[1].__esModule;
      $.state = 2;

    case 2:
      if ($1) {
        $.state = 3;
      } else {
        $.goto = 5;
        continue;
      }

    case 3:
      $.result = $l[1];
      $.state = 4;

    case 4:
      $.goto = 7;
      continue;

    case 5:
      $.result = {
        default: $l[1]
      };
      $.goto = 4;
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
    $m$2 = $M.fun("m$2", "_slicedToArray", null, $m$0, ["arr", "i"], 0, 3, null, 0, function _slicedToArray($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = $l[0][8])($l[1]);
      $.state = 1;

    case 1:
      $.result = $p;

      if ($.result) {
        $.state = 2;
      } else {
        $.goto = 9;
        continue;
      }

    case 2:
      if ($.result) {
        $.state = 3;
      } else {
        $.goto = 7;
        continue;
      }

    case 3:
      if ($.result) {
        $.state = 4;
      } else {
        $.goto = 5;
        continue;
      }

    case 4:
      $.goto = 12;
      continue;

    case 5:
      $.goto = 6;
      $p = ($context.call = $l[0][4])();
      $.state = 6;

    case 6:
      $.result = $p;
      $.goto = 4;
      continue;

    case 7:
      $.goto = 8;
      $p = ($context.call = $l[0][5])($l[1], $l[2]);
      $.state = 8;

    case 8:
      $.result = $p;
      $.goto = 3;
      continue;

    case 9:
      $.goto = 10;
      $p = ($context.call = $l[0][7])($l[1], $l[2]);
      $.state = 10;

    case 10:
      $.result = $p;
      $.goto = 2;
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [2, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
    $m$3 = $M.fun("m$3", "_nonIterableRest", null, $m$0, [], 0, 1, null, 0, function _nonIterableRest($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = new ($context.call = TypeError)("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
    $m$4 = $M.fun("m$4", "_unsupportedIterableToArray", null, $m$0, ["o", "minLen"], 1, 5, null, 0, function _unsupportedIterableToArray($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      if (!$l[1]) {
        $.state = 1;
      } else {
        $.goto = 2;
        continue;
      }

    case 1:
      $.goto = 24;
      continue;

    case 2:
      if (typeof $l[1] === "string") {
        $.state = 3;
      } else {
        $.goto = 5;
        continue;
      }

    case 3:
      $.goto = 4;
      $p = ($context.call = $l[0][6])($l[1], $l[2]);
      $.state = 4;

    case 4:
      $.result = $p;
      $.goto = 24;
      continue;

    case 5:
      $.goto = 6;
      $p = $mcall("call", Object.prototype.toString, $l[1]);
      $.state = 6;

    case 6:
      $.goto = 7;
      $p = $mcall("slice", $p, 8, -1);
      $.state = 7;

    case 7:
      $lset($l, 3,
      /*n*/
      $p);
      $1 = $l[3] === "Object";

      if ($1) {
        $.state = 8;
      } else {
        $.goto = 9;
        continue;
      }

    case 8:
      $1 = $l[1].constructor;
      $.state = 9;

    case 9:
      if ($1) {
        $.state = 10;
      } else {
        $.goto = 11;
        continue;
      }

    case 10:
      $lset($l, 3,
      /*n*/
      $l[1].constructor.name);
      $.state = 11;

    case 11:
      $1 = $l[3] === "Map";

      if ($1) {
        $.state = 12;
      } else {
        $.goto = 22;
        continue;
      }

    case 12:
      if ($1) {
        $.state = 13;
      } else {
        $.goto = 15;
        continue;
      }

    case 13:
      $.goto = 14;
      $p = $mcall("from", Array, $l[1]);
      $.state = 14;

    case 14:
      $.result = $p;
      $.goto = 24;
      continue;

    case 15:
      $l[4] = $l[3] === "Arguments";

      if ($l[4]) {
        $.state = 16;
      } else {
        $.goto = 20;
        continue;
      }

    case 16:
      if ($l[4]) {
        $.state = 17;
      } else {
        $.goto = 19;
        continue;
      }

    case 17:
      $.goto = 18;
      $p = ($context.call = $l[0][6])($l[1], $l[2]);
      $.state = 18;

    case 18:
      $.result = $p;
      $.goto = 24;
      continue;

    case 19:
      $.goto = 24;
      continue;

    case 20:
      $.goto = 21;
      $p = $mcall("test", /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/, $l[3]);
      $.state = 21;

    case 21:
      $l[4] = $p;
      $.goto = 16;
      continue;

    case 22:
      $1 = $l[3] === "Set";
      $.goto = 12;
      continue;

    case 23:
      $.goto = 24;
      return $unhandled($.error);

    case 24:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [2, null, $s$6], [0, null, $s$6], [2, null, $s$6], [2, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [2, null, $s$6], [0, null, $s$6], [0, null, $s$6], [0, null, $s$6], [2, null, $s$6], [0, null, $s$6], [0, null, $s$6], [2, null, $s$6], [0, null, $s$6], [0, null, $s$6], [16, null, $s$6], [16, null, $s$6]]),
    $m$5 = $M.fun("m$5", "_arrayLikeToArray", null, $m$0, ["arr", "len"], 1, 6, null, 0, function _arrayLikeToArray($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $1 = $l[2] == null;

      if ($1) {
        $.state = 1;
      } else {
        $.goto = 11;
        continue;
      }

    case 1:
      if ($1) {
        $.state = 2;
      } else {
        $.goto = 3;
        continue;
      }

    case 2:
      $lset($l, 2,
      /*len*/
      $l[1].length);
      $.state = 3;

    case 3:
      $l = $.$ = [$l];
      $.state = 4;

    case 4:
      $lset($l[0], 3,
      /*i*/
      0);
      $.goto = 5;
      $p = new ($context.call = Array)($l[0][2]);
      $.state = 5;

    case 5:
      $lset($l[0], 4,
      /*arr2*/
      $p);
      $.state = 6;

    case 6:
      if ($l[0][3] < $l[0][2]) {
        $.state = 7;
      } else {
        $.goto = 8;
        continue;
      }

    case 7:
      $set($l[0][4], $l[0][3], $l[0][1][$l[0][3]]);
      $l = $.$ = $l.slice();
      $lset($l[0], 3,
      /*i*/
      $l[0][3] + 1);
      $.goto = 6;
      continue;

    case 8:
      $l[0][5] = 10;
      $.state = 9;

    case 9:
      $l = $.$ = $l[0];
      $.goto = $l[5];
      continue;

    case 10:
      $.result = $l[4];
      $.goto = 13;
      continue;

    case 11:
      $1 = $l[2] > $l[1].length;
      $.goto = 1;
      continue;

    case 12:
      $.goto = 13;
      return $unhandled($.error);

    case 13:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][5] = 12;
      $.goto = 9;
      break;

    default:
      $.goto = 12;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][5] = 13;
      $.goto = 9;
      break;

    default:
      $.goto = 13;
      break;
  }
}, 1, [[0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [2, null, $s$8], [0, null, $s$8], [0, null, $s$7], [0, null, $s$8], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [16, null, $s$7], [16, null, $s$7]]),
    $m$6 = $M.fun("m$6", "_iterableToArrayLimit", null, $m$0, ["arr", "i"], 1, 17, null, 0, function _iterableToArrayLimit($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[15] = typeof Symbol === "undefined";

      if ($l[15]) {
        $.state = 1;
      } else {
        $.goto = 30;
        continue;
      }

    case 1:
      if ($l[15]) {
        $.state = 2;
      } else {
        $.goto = 3;
        continue;
      }

    case 2:
      $.goto = 33;
      continue;

    case 3:
      $lset($l, 3,
      /*_arr*/
      []);
      $lset($l, 4,
      /*_n*/
      true);
      $lset($l, 5,
      /*_d*/
      false);
      $lset($l, 6,
      /*_e*/
      undefined);
      $.state = 4;

    case 4:
      $l = $.$ = [$l];
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = $mcall(Symbol.iterator, $l[0][1]);
      $.state = 6;

    case 6:
      $lset($l[0], 7,
      /*_i*/
      $p);
      $.state = 7;

    case 7:
      $.goto = 8;
      $p = $mcall("next", $l[0][7]);
      $.state = 8;

    case 8:
      if (!$lset($l[0], 4,
      /*_n*/
      $lset($l[0], 8,
      /*_s*/
      $p).done)) {
        $.state = 9;
      } else {
        $.goto = 15;
        continue;
      }

    case 9:
      $.goto = 10;
      $mcall("push", $l[0][3], $l[0][8].value);
      $.state = 10;

    case 10:
      $1 = $l[0][2];

      if ($1) {
        $.state = 11;
      } else {
        $.goto = 12;
        continue;
      }

    case 11:
      $1 = $l[0][3].length === $l[0][2];
      $.state = 12;

    case 12:
      if ($1) {
        $.state = 13;
      } else {
        $.goto = 14;
        continue;
      }

    case 13:
      $.goto = 15;
      continue;

    case 14:
      $l = $.$ = $l.slice();
      $lset($l[0], 4,
      /*_n*/
      true);
      $.goto = 7;
      continue;

    case 15:
      $l[0][12] = 17;
      $.state = 16;

    case 16:
      $l = $.$ = $l[0];
      $.goto = $l[12];
      continue;

    case 17:
      $l[10] = 29;
      $.goto = 19;
      continue;

    case 18:
      $lset($l, 9,
      /*err*/
      $.error);
      $.error = void 0;
      $lset($l, 5,
      /*_d*/
      true);
      $lset($l, 6,
      /*_e*/
      $l[9]);
      $l[10] = 29;
      $.state = 19;

    case 19:
      $.state = 20;

    case 20:
      $1 = !$l[4];

      if ($1) {
        $.state = 21;
      } else {
        $.goto = 22;
        continue;
      }

    case 21:
      $1 = $l[7]["return"] != null;
      $.state = 22;

    case 22:
      if ($1) {
        $.state = 23;
      } else {
        $.goto = 24;
        continue;
      }

    case 23:
      $.goto = 24;
      $mcall("return", $l[7]);
      $.state = 24;

    case 24:
      $l[13] = 28;
      $.state = 25;

    case 25:
      if ($l[5]) {
        $.state = 26;
      } else {
        $.goto = 27;
        continue;
      }

    case 26:
      $.goto = 27;
      return $raise($l[6]);

    case 27:
      $.error = $l[14];
      $.goto = $l[13];
      continue;

    case 28:
      $.error = $l[11];
      $.goto = $l[10];
      continue;

    case 29:
      $.result = $l[3];
      $.goto = 33;
      continue;

    case 30:
      $l[16] = Symbol.iterator;
      $.goto = 31;
      $p = ($context.call = Object)($l[1]);
      $.state = 31;

    case 31:
      $l[15] = !($l[16] in $p);
      $.goto = 1;
      continue;

    case 32:
      $.goto = 33;
      return $unhandled($.error);

    case 33:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 17:
    case 16:
    case 4:
      $.goto = 18;
      break;

    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][12] = 18;
      $.goto = 16;
      break;

    case 24:
    case 23:
    case 22:
    case 21:
    case 20:
      $l[14] = $.error;
      $l[13] = 32;
      $.goto = 25;
      break;

    case 18:
      $l[11] = $.error;
      $l[10] = 32;
      $.goto = 19;
      break;

    default:
      $.goto = 32;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 18:
    case 17:
    case 16:
    case 4:
      $l[10] = 33;
      $.goto = 19;
      break;

    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      $l[0][12] = 19;
      $l[0][10] = 33;
      $.goto = 16;
      break;

    case 24:
    case 23:
    case 22:
    case 21:
    case 20:
      $l[13] = 33;
      $.goto = 25;
      break;

    default:
      $.goto = 33;
      break;
  }
}, 1, [[0, null, $s$9], [0, null, $s$9], [0, null, $s$9], [0, null, $s$9], [1, null, $s$9], [3, null, $s$10], [1, null, $s$10], [3, null, $s$10], [1, null, $s$9], [3, null, $s$10], [1, null, $s$9], [1, null, $s$9], [1, null, $s$9], [1, null, $s$9], [1, null, $s$9], [1, null, $s$9], [1, null, $s$9], [1, null, $s$9], [0, null, $s$11], [0, null, $s$9], [0, null, $s$9], [0, null, $s$9], [0, null, $s$9], [2, null, $s$9], [0, null, $s$9], [0, null, $s$9], [0, null, $s$9], [0, null, $s$9], [0, null, $s$9], [0, null, $s$9], [2, null, $s$9], [0, null, $s$9], [16, null, $s$9], [16, null, $s$9]]),
    $m$7 = $M.fun("m$7", "_arrayWithHoles", null, $m$0, ["arr"], 0, 2, null, 0, function _arrayWithHoles($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $mcall("isArray", Array, $l[1]);
      $.state = 1;

    case 1:
      if ($p) {
        $.state = 2;
      } else {
        $.goto = 3;
        continue;
      }

    case 2:
      $.result = $l[1];
      $.goto = 5;
      continue;

    case 3:
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
}, null, null, 1, [[2, null, $s$12], [0, null, $s$12], [0, null, $s$12], [0, null, $s$12], [16, null, $s$12], [16, null, $s$12]]),
    $m$8 = $M.fun("m$8", "a1", null, $m$0, [], 0, 1, "4:0-4:16", 0, function a1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      $brk();
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[36, "4:16-4:16", $s$13], [16, "4:16-4:16", $s$13], [16, "4:16-4:16", $s$13]]),
    $m$9 = $M.fun("m$9", null, null, $m$0, [], 0, 3, null, 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*Some*/
      $m$10($));
      $lset($l, 2,
      /*_proto*/
      $l[1].prototype);
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $set($l[2], "a", $m$11($));
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
}, null, null, 1, [[4, "7:4-9:11", $s$14], [0, null, $s$14], [16, null, $s$14], [16, null, $s$14]]),
    $m$10 = $M.fun("m$10", "Some", null, $m$9, [], 0, 1, null, 0, function Some($, $l, $p) {
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
}, null, null, 2, [[0, null, $s$15], [16, null, $s$15], [16, null, $s$15]]),
    $m$11 = $M.fun("m$11", "a", null, $m$9, [], 0, 1, "7:4-9:5", 1, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt(b_1);

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
}, null, null, 2, [[4, "8:6-8:16", $s$16], [2, "8:6-8:15", $s$16], [36, "9:5-9:5", $s$16], [16, "9:5-9:5", $s$16], [16, "9:5-9:5", $s$16]]),
    $m$12 = $M.fun("m$12", "somethingElse", null, $m$0, [], 0, 1, "13:2-18:3", 1, function somethingElse($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.result = $m$13($);
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandledA($.error);

    case 3:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "14:4-17:6", $s$17], [0, null, $s$17], [16, "18:3-18:3", $s$17], [16, "18:3-18:3", $s$17]]),
    $m$13 = $M.fun("m$13", "zz", null, $m$12, [], 0, 1, "14:11-17:5", 1, function zz($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = new ($context.call = $l[0][0][12])();
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = eff_1)($p);
      $.state = 3;

    case 3:
      $.goto = 4;
      return $awt($p);

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($context.call = eff_2)($l[0][0][10], $l[0][0][13]);
      $.state = 6;

    case 6:
      $.goto = 7;
      return $awt($p);

    case 7:
      $.goto = 9;
      $brk();
      continue;

    case 8:
      $.goto = 9;
      return $unhandledA($.error);

    case 9:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "15:6-15:30", $s$18], [2, "15:18-15:28", $s$18], [2, "15:12-15:29", $s$18], [2, "15:6-15:29", $s$18], [4, "16:6-16:24", $s$18], [2, "16:12-16:23", $s$18], [2, "16:6-16:23", $s$18], [36, "17:5-17:5", $s$18], [16, "17:5-17:5", $s$18], [16, "17:5-17:5", $s$18]]);

$M.moduleExports();