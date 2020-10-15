var $M = require("@effectful/debugger"),
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
  _slicedToArray: [1, null],
  _nonIterableRest: [2, null],
  _unsupportedIterableToArray: [3, null],
  _arrayLikeToArray: [4, null],
  _iterableToArrayLimit: [5, null],
  _arrayWithHoles: [6, null],
  a1: [7, "1:9-1:11"]
}, null, 0],
    $s$2 = [{
  Some: [8, "3:8-3:12"],
  b: [9, "10:6-10:7"],
  Something: [10, "11:11-11:20"],
  _Some: [11, null],
  other: [12, "14:11-14:16"],
  b2: [13, "14:18-14:20"],
  somethingElse: [14, "15:17-15:30"]
}, $s$1, 0],
    $s$3 = [{
  arr: [1, null],
  i: [2, null]
}, $s$1, 1],
    $s$4 = [{}, $s$1, 1],
    $s$5 = [{
  o: [1, null],
  minLen: [2, null],
  n: [3, null]
}, $s$1, 1],
    $s$6 = [{
  arr: [1, null],
  len: [2, null],
  i: [3, null],
  arr2: [4, null]
}, $s$1, 1],
    $s$7 = [{
  arr: [1, null],
  i: [2, null],
  _arr: [3, null],
  _n: [4, null],
  _d: [5, null],
  _e: [6, null],
  _i: [7, null],
  _s: [8, null]
}, $s$1, 1],
    $s$8 = [{
  err: [9, null]
}, $s$7, 1],
    $s$9 = [{
  arr: [1, null]
}, $s$1, 1],
    $s$10 = [{}, $s$1, 1],
    $s$11 = [{
  Some: [1, null],
  _proto: [2, null]
}, $s$2, 1],
    $s$12 = [{}, $s$11, 2],
    $s$13 = [{}, $s$11, 2],
    $s$14 = [{}, $s$2, 1],
    $s$15 = [{}, $s$2, 1],
    $s$16 = [{}, $s$15, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 15, "1:0-23:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $l[5] = $m$5($);
      $l[6] = $m$6($);
      $l[7] = $m$7($);
      $l[10] = $m$11($);
      $l[14] = $m$12($);
      $.goto = 1;
      $p = /*#__PURE__*/($context.call = $m$8($))();
      $.state = 1;

    case 1:
      $l[8] = $p;
      $l[9] = a;
      $.goto = 2;
      $p = ($context.call = $l[1])($l[8], 3);
      $.state = 2;

    case 2:
      $l[11] = $p;
      $l[12] = $l[11][1];
      $l[13] = $l[11][2];
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
}, null, null, 0, [[2, null, $s$2], [2, null, $s$2], [0, null, $s$2], [16, "23:0-23:0", $s$1], [16, "23:0-23:0", $s$1]]),
    $m$1 = $M.fun("m$1", "_slicedToArray", null, $m$0, ["arr", "i"], 0, 3, null, 128, function _slicedToArray($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = $l[0][6])($l[1]);
      $.state = 1;

    case 1:
      $.result = $p;

      if ($.result) {
        $.state = 2;
      } else {
        $.goto = 7;
        $p = ($context.call = $l[0][5])($l[1], $l[2]);
        continue;
      }

    case 2:
      if ($.result) {
        $.state = 3;
      } else {
        $.goto = 6;
        $p = ($context.call = $l[0][3])($l[1], $l[2]);
        continue;
      }

    case 3:
      if ($.result) {
        $.state = 4;
      } else {
        $.goto = 5;
        $p = ($context.call = $l[0][2])();
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
}, null, null, 1, [[2, null, $s$3], [2, null, $s$3], [2, null, $s$3], [2, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [16, null, $s$3], [16, null, $s$3]]),
    $m$2 = $M.fun("m$2", "_nonIterableRest", null, $m$0, [], 0, 1, null, 128, function _nonIterableRest($, $l, $p) {
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
}, null, null, 1, [[2, null, $s$4], [0, null, $s$4], [16, null, $s$4], [16, null, $s$4]]),
    $m$3 = $M.fun("m$3", "_unsupportedIterableToArray", null, $m$0, ["o", "minLen"], 1, 5, null, 128, function _unsupportedIterableToArray($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      if (!$l[1]) {
        $.goto = 16;
        continue;
      } else {
        $.state = 1;
      }

    case 1:
      if (typeof $l[1] === "string") {
        $.goto = 14;
        $p = ($context.call = $l[0][4])($l[1], $l[2]);
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      $p = $mcall("call", Object.prototype.toString, $l[1]);
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = $mcall("slice", $p, 8, -1);
      $.state = 4;

    case 4:
      $l[3] = $p;
      $1 = $l[3] === "Object";

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
      $1 = $l[3] === "Map";

      if ($1) {
        $.state = 7;
      } else {
        $1 = $l[3] === "Set";
        $.state = 7;
      }

    case 7:
      if ($1) {
        $.goto = 13;
        $p = $mcall("from", Array, $l[1]);
        continue;
      } else {
        $.state = 8;
      }

    case 8:
      $l[4] = $l[3] === "Arguments";

      if ($l[4]) {
        $.state = 9;
      } else {
        $.goto = 12;
        $p = $mcall("test", /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/, $l[3]);
        continue;
      }

    case 9:
      if ($l[4]) {
        $.goto = 11;
        $p = ($context.call = $l[0][4])($l[1], $l[2]);
        continue;
      } else {
        $.state = 10;
      }

    case 10:
      $.goto = 16;
      continue;

    case 11:
      $.result = $p;
      $.goto = 16;
      continue;

    case 12:
      $l[4] = $p;
      $.goto = 9;
      continue;

    case 13:
      $.result = $p;
      $.goto = 16;
      continue;

    case 14:
      $.result = $p;
      $.goto = 16;
      continue;

    case 15:
      $.goto = 16;
      return $unhandled($.error);

    case 16:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[0, null, $s$5], [2, null, $s$5], [2, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [2, null, $s$5], [2, null, $s$5], [2, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [0, null, $s$5], [16, null, $s$5], [16, null, $s$5]]),
    $m$4 = $M.fun("m$4", "_arrayLikeToArray", null, $m$0, ["arr", "len"], 1, 5, null, 128, function _arrayLikeToArray($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $1 = $l[2] == null;

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
      $p = new ($context.call = Array)($l[2]);
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
}, null, null, 1, [[0, null, $s$6], [0, null, $s$6], [2, null, $s$6], [0, null, $s$6], [0, null, $s$6], [16, null, $s$6], [16, null, $s$6]]),
    $m$5 = $M.fun("m$5", "_iterableToArrayLimit", null, $m$0, ["arr", "i"], 1, 16, null, 128, function _iterableToArrayLimit($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[14] = typeof Symbol === "undefined";

      if ($l[14]) {
        $.state = 1;
      } else {
        $l[15] = Symbol.iterator;
        $.goto = 22;
        $p = ($context.call = Object)($l[1]);
        continue;
      }

    case 1:
      if ($l[14]) {
        $.goto = 24;
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $l[3] = [];
      $l[4] = true;
      $l[5] = false;
      $l[6] = undefined;
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = $mcall(Symbol.iterator, $l[1]);
      $.state = 4;

    case 4:
      $l[7] = $p;
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = $mcall("next", $l[7]);
      $.state = 6;

    case 6:
      if (!($l[4] = ($l[8] = $p).done)) {
        $.goto = 8;
        $mcall("push", $l[3], $l[8].value);
        continue;
      } else {
        $.state = 7;
      }

    case 7:
      $l[10] = 21;
      $.goto = 13;
      continue;

    case 8:
      $1 = $l[2];

      if ($1) {
        $1 = $l[3].length === $l[2];
        $.state = 9;
      } else {
        $.state = 9;
      }

    case 9:
      if ($1) {
        $.goto = 7;
        continue;
      } else {
        $.state = 10;
      }

    case 10:
      $l[4] = true;
      $.goto = 5;
      continue;

    case 11:
      $l[9] = $.error;
      $.error = void 0;
      $l[5] = true;
      $l[6] = $l[9];
      $l[10] = 21;
      $.goto = 13;
      continue;

    case 12:
      return $raise($l[11]);

    case 13:
      $.state = 14;

    case 14:
      $1 = !$l[4];

      if ($1) {
        $1 = $l[7]["return"] != null;
        $.state = 15;
      } else {
        $.state = 15;
      }

    case 15:
      if ($1) {
        $.goto = 16;
        $mcall("return", $l[7]);
        $.state = 16;
      } else {
        $.state = 16;
      }

    case 16:
      $l[12] = 20;
      $.goto = 18;
      continue;

    case 17:
      return $raise($l[13]);

    case 18:
      if ($l[5]) {
        $.goto = 19;
        return $raise($l[6]);
      } else {
        $.state = 19;
      }

    case 19:
      $.goto = $l[12];
      continue;

    case 20:
      $.goto = $l[10];
      continue;

    case 21:
      $.result = $l[3];
      $.goto = 24;
      continue;

    case 22:
      $l[14] = !($l[15] in $p);
      $.goto = 1;
      continue;

    case 23:
      $.goto = 24;
      return $unhandled($.error);

    case 24:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 16:
    case 15:
    case 14:
      $.goto = 18;
      $l[12] = 17;
      $l[13] = $.error;
      break;

    case 11:
      $.goto = 13;
      $l[10] = 12;
      $l[11] = $.error;
      break;

    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
      $.goto = 11;
      break;

    default:
      $.goto = 23;
  }
}, function ($, $l) {
  switch ($.state) {
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
      $l[10] = 24;
      $.goto = 13;
      break;

    case 16:
    case 15:
    case 14:
      $l[12] = 24;
      $.goto = 18;
      break;

    default:
      $.goto = 24;
      break;
  }
}, 1, [[2, null, $s$7], [0, null, $s$7], [0, null, $s$7], [3, null, $s$7], [1, null, $s$7], [3, null, $s$7], [3, null, $s$7], [1, null, $s$7], [1, null, $s$7], [1, null, $s$7], [1, null, $s$7], [0, null, $s$8], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [2, null, $s$7], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [0, null, $s$7], [16, null, $s$7], [16, null, $s$7]]),
    $m$6 = $M.fun("m$6", "_arrayWithHoles", null, $m$0, ["arr"], 0, 2, null, 128, function _arrayWithHoles($, $l, $p) {
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
}, null, null, 1, [[2, null, $s$9], [0, null, $s$9], [0, null, $s$9], [16, null, $s$9], [16, null, $s$9]]),
    $m$7 = $M.fun("m$7", "a1", null, $m$0, [], 0, 1, "1:0-1:16", 128, function a1($, $l, $p) {
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
}, null, null, 1, [[0, null, $s$10], [16, "1:16-1:16", $s$10], [16, "1:16-1:16", $s$10]]),
    $m$8 = $M.fun("m$8", null, null, $m$0, [], 0, 3, "4:4-8:11", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$9($);
      $l[2] = $l[1].prototype;
      $l[2].a = $m$10($);
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
}, null, null, 1, [[0, null, $s$11], [16, "8:11-8:11", $s$11], [16, "8:11-8:11", $s$11]]),
    $m$9 = $M.fun("m$9", "Some", null, $m$8, [], 0, 1, null, 128, function Some($, $l, $p) {
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
}, null, null, 2, [[0, null, $s$12], [16, null, $s$12], [16, null, $s$12]]),
    $m$10 = $M.fun("m$10", "a", null, $m$8, [], 0, 1, "4:4-8:5", 129, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = new ($context.call = $l[0][1])();
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt($p);

    case 2:
      $.goto = 3;
      $p = new ($context.call = $l[0][0][10])();
      $.state = 3;

    case 3:
      $.goto = 4;
      return $awt($p);

    case 4:
      $.goto = 6;
      ($context.call = $l[0][0][7])();
      continue;

    case 5:
      $.goto = 6;
      return $unhandledA($.error);

    case 6:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "5:12-5:22", $s$13], [2, "5:6-5:22", $s$13], [2, "6:12-6:27", $s$13], [2, "6:6-6:27", $s$13], [2, "7:6-7:10", $s$13], [16, "8:5-8:5", $s$13], [16, "8:5-8:5", $s$13]]),
    $m$11 = $M.fun("m$11", "Something", null, $m$0, [], 0, 1, "11:2-13:3", 128, function Something($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      ($context.call = $l[0][7])($l[0][9]);
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "12:4-12:9", $s$14], [16, "13:3-13:3", $s$14], [16, "13:3-13:3", $s$14]]),
    $m$12 = $M.fun("m$12", "somethingElse", null, $m$0, [], 0, 1, "15:2-21:3", 129, function somethingElse($, $l, $p) {
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
}, null, null, 1, [[0, null, $s$15], [16, "21:3-21:3", $s$15], [16, "21:3-21:3", $s$15]]),
    $m$13 = $M.fun("m$13", "zz", null, $m$12, [], 0, 1, "16:11-20:5", 129, function zz($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = $l[0][0][10])();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = eff_1)($p);
      $.state = 2;

    case 2:
      $.goto = 3;
      return $awt($p);

    case 3:
      $.goto = 4;
      $p = new ($context.call = $l[0][0][8])();
      $.state = 4;

    case 4:
      $.goto = 5;
      $p = ($context.call = eff_2)($p);
      $.state = 5;

    case 5:
      $.goto = 6;
      return $awt($p);

    case 6:
      $.goto = 7;
      $p = ($context.call = eff_3)(a, $l[0][0][9]);
      $.state = 7;

    case 7:
      $.goto = 9;
      return $awt($p);

    case 8:
      $.goto = 9;
      return $unhandledA($.error);

    case 9:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "17:18-17:29", $s$16], [2, "17:12-17:30", $s$16], [2, "17:6-17:30", $s$16], [2, "18:18-18:28", $s$16], [2, "18:12-18:29", $s$16], [2, "18:6-18:29", $s$16], [2, "19:12-19:23", $s$16], [2, "19:6-19:23", $s$16], [16, "20:5-20:5", $s$16], [16, "20:5-20:5", $s$16]]);

$M.moduleExports();