var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  _some: "$0",
  _interopRequireDefault: "$1",
  _slicedToArray: "$2",
  _nonIterableRest: "$3",
  _iterableToArrayLimit: "$4",
  _arrayWithHoles: "$5",
  _b: "$6",
  a: "$7",
  a1: "$8"
}, null, false],
    $s$2 = [{
  Some: "$9",
  b: "$10",
  _Some: "$11",
  other: "$12",
  b2: "$13",
  somethingElse: "$14"
}, $s$1, false],
    $s$3 = [{
  obj: "$0"
}, $s$1, false],
    $s$4 = [{
  arr: "$0",
  i: "$1"
}, $s$1, false],
    $s$5 = [{
  arr: "$0",
  i: "$1",
  _arr: "$2",
  _n: "$3",
  _d: "$4",
  _e: "$5",
  _i: "$6",
  _s: "$7"
}, $s$1, false],
    $s$6 = [{
  err: "$8"
}, $s$5, false],
    $s$7 = [{
  arr: "$0"
}, $s$1, false],
    $s$8 = [{
  Some: "$0",
  _proto: "$1"
}, $s$2, false],
    $s$9 = [{
  a: "$0"
}, $s$8, false],
    $s$10 = [{
  zz: "$0"
}, $s$2, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c._interopRequireDefault($);
        $.$.$8 = $c.a1($);
        $.$.$5 = $c._arrayWithHoles($);
        $.$.$4 = $c._iterableToArrayLimit($);
        $.$.$3 = $c._nonIterableRest($);
        $.$.$2 = $c._slicedToArray($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        exports.__esModule = true;
        $.goto = 2;
        $M.brk(1);
        continue;

      case 2:
        exports.a = void 0;
        $.goto = 3;
        $M.brk(2);
        continue;

      case 3:
        $.goto = 4;
        $p = $M.evalDir("some");
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = $.$.$1)($p);
        continue;

      case 5:
        $.$.$0 = $p;
        $.goto = 6;
        $M.brk(27);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = M.profile).dbg$call(M, "es");
        continue;

      case 7:
        $.goto = 8;
        $M.brk(28);
        continue;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = $.$.$2)($.$.$0.default, 2);
        continue;

      case 9:
        $.$.$6 = $p;
        $.$.$7 = $.$.$6[1];
        $.goto = 10;
        $M.brk(29);
        continue;

      case 10:
        exports.a = $.$.$7;
        $.$.$14 = $c.somethingElse($);
        $.goto = 11;
        $M.brk(30);
        continue;

      case 11:
        $.goto = 12;
        $p =
        /*#__PURE__*/
        ($M.context.call = $c.f($))();
        continue;

      case 12:
        $.$.$9 = $p;
        $.goto = 13;
        $M.brk(35);
        continue;

      case 13:
        $.$.$10 = $.$.$7;
        $.goto = 14;
        $M.brk(36);
        continue;

      case 14:
        $.goto = 15;
        $p = ($M.context.call = $.$.$2)($.$.$9, 3);
        continue;

      case 15:
        $.$.$11 = $p;
        $.$.$12 = $.$.$11[1];
        $.$.$13 = $.$.$11[2];
        return $M.ret();

      case 16:
        return $M.ret($.value);

      case 17:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$1], [null, "s", $s$1], ["2:0-2:21", "s", $s$1], [null, "e", $s$1], [null, "e", $s$1], ["1:0-1:16", "s", $s$1], ["1:0-1:15", "e", $s$1], [null, "s", $s$1], [null, "e", $s$1], [null, "s", $s$1], [null, "s", $s$2], [null, "e", $s$2], ["11:2-11:12", "s", $s$2], [null, "s", $s$2], [null, "e", $s$2], [], [], []]);
$M.fun("m$1", "_interopRequireDefault", "m$0", ["obj"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(3);
        continue;

      case 1:
        $0 = $.$.$0;

        if ($0) {
          $0 = $.$.$0.__esModule;
          $.state = 2;
        } else {
          $.state = 2;
        }

      case 2:
        if ($0) {
          $.value = $.$.$0;
          $.state = 3;
        } else {
          $.value = {
            default: $.$.$0
          };
          $.state = 3;
        }

      case 3:
        return $M.ret();

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$3], [], [], [], [], []]);
$M.fun("m$2", "_slicedToArray", "m$0", ["arr", "i"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(4);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = $.$$.$.$5)($.$.$0);
        continue;

      case 2:
        $.value = $p;

        if (r) {
          $.state = 3;
        } else {
          $.goto = 4;
          $p = ($M.context.call = $.$$.$.$4)($.$.$0, $.$.$1);
          continue;
        }

      case 3:
        if (r) {
          $.goto = 5;
          continue;
        } else {
          $.goto = 6;
          $p = ($M.context.call = $.$$.$.$3)();
          continue;
        }

      case 4:
        $.value = $p;
        $.goto = 3;
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.value = $p;
        $.goto = 5;
        continue;

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$4], [null, "e", $s$4], [null, "e", $s$4], [null, "e", $s$4], [], [], [], [], []]);
$M.fun("m$3", "_nonIterableRest", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(5);
        continue;

      case 1:
        $.goto = 2;
        $p = new ($M.context.call = TypeError)("Invalid attempt to destructure non-iterable instance");
        continue;

      case 2:
        return $M.ret($p);

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$1], [null, "e", $s$1], [], [], []]);
$M.fun("m$4", "_iterableToArrayLimit", "m$0", ["arr", "i"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 4;
        $M.brk(6);
        continue;

      case 1:
        $.goto = 32;
        $M.brk(19);
        continue;

      case 2:
        $.goto = 29;
        $M.brk(22);
        continue;

      case 3:
        $8 = $.value;
        $.goto = 27;
        $M.brk(17);
        continue;

      case 4:
        $.$.$11 = Symbol.iterator;
        $.goto = 5;
        $p = ($M.context.call = Object)($.$.$0);
        continue;

      case 5:
        $.$.$11 = $.$.$11 in $p;

        if ($.$.$11) {
          $.state = 6;
        } else {
          $0 = Object.prototype.toString;
          $.goto = 7;
          $p = ($M.context.call = $0.call).dbg$call($0, $.$.$0);
          continue;
        }

      case 6:
        if (!$.$.$11) {
          $.goto = 26;
          $M.brk(7);
          continue;
        } else {
          $.goto = 8;
          continue;
        }

      case 7:
        $.$.$11 = $p === "[object Arguments]";
        $.goto = 6;
        continue;

      case 8:
        $.goto = 9;
        $M.brk(8);
        continue;

      case 9:
        $.$.$2 = [];
        $.goto = 10;
        $M.brk(9);
        continue;

      case 10:
        $.$.$3 = true;
        $.goto = 11;
        $M.brk(10);
        continue;

      case 11:
        $.$.$4 = false;
        $.goto = 12;
        $M.brk(11);
        continue;

      case 12:
        $.$.$5 = undefined;
        $.goto = 13;
        $M.brk(12);
        continue;

      case 13:
        $.goto = 14;
        $M.brk(13);
        continue;

      case 14:
        $.goto = 15;
        $p = ($M.context.call = $.$.$0[Symbol.iterator]).dbg$call($.$.$0);
        continue;

      case 15:
        $.$.$6 = $p;
        $.state = 16;

      case 16:
        $.goto = 17;
        $p = ($M.context.call = $.$.$6.next).dbg$call($.$.$6);
        continue;

      case 17:
        if (!($.$.$3 = ($.$.$7 = $p).done)) {
          $.goto = 21;
          $M.brk(14);
          continue;
        } else {
          $.state = 18;
        }

      case 18:
        $.$.$9 = 19;
        $.goto = 1;
        continue;

      case 19:
        $.goto = 20;
        $M.brk(24);
        continue;

      case 20:
        return $M.ret($.$.$2);

      case 21:
        $.goto = 22;
        ($M.context.call = $.$.$2.push).dbg$call($.$.$2, $.$.$7.value);
        continue;

      case 22:
        $.goto = 23;
        $M.brk(15);
        continue;

      case 23:
        $0 = $.$.$1;

        if ($0) {
          $0 = $.$.$2.length === $.$.$1;
          $.state = 24;
        } else {
          $.state = 24;
        }

      case 24:
        if ($0) {
          $.goto = 18;
          $M.brk(16);
          continue;
        } else {
          $.state = 25;
        }

      case 25:
        $.$.$3 = true;
        $.goto = 16;
        continue;

      case 26:
        return $M.ret();

      case 27:
        $.$.$4 = true;
        $.goto = 28;
        $M.brk(18);
        continue;

      case 28:
        $.$.$5 = $.$.$8;
        $.goto = 19;
        continue;

      case 29:
        if ($.$.$4) {
          $.goto = 31;
          $M.brk(23);
          continue;
        } else {
          $.state = 30;
        }

      case 30:
        $.goto = $.$.$10;
        continue;

      case 31:
        return $M.ret($.$.$5);

      case 32:
        $.goto = 33;
        $M.brk(20);
        continue;

      case 33:
        $0 = !$.$.$3;

        if ($0) {
          $0 = $.$.$6["return"] != null;
          $.state = 34;
        } else {
          $.state = 34;
        }

      case 34:
        if ($0) {
          $.goto = 37;
          $M.brk(21);
          continue;
        } else {
          $.state = 35;
        }

      case 35:
        $.$.$10 = 36;
        $.goto = 2;
        continue;

      case 36:
        $.goto = $.$.$9;
        continue;

      case 37:
        $.goto = 35;
        ($M.context.call = $.$.$6["return"]).dbg$call($.$.$6);
        continue;

      case 38:
        return $M.ret($.value);

      case 39:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
    case 27:
    case 28:
      $.$.$9 = 39;
      $.goto = 1;
      break;

    case 32:
    case 33:
    case 34:
    case 35:
    case 37:
    case 38:
      $.$.$10 = 39;
      $.goto = 2;
      break;

    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
      $.goto = 3;
      break;

    default:
      $.goto = 39;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 32:
    case 33:
    case 34:
    case 35:
    case 37:
    case 38:
      $.$.$10 = 38;
      $.goto = 2;
      break;

    case 3:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 27:
    case 28:
      $.$.$9 = 38;
      $.goto = 1;
      break;

    default:
      $.goto = 38;
      break;
  }
}, [[null, "s", $s$5], [null, "s", $s$5], [null, "s", $s$5], [null, "s", $s$6], [null, "e", $s$5], [null, "e", $s$5], [null, "s", $s$5], [], [null, "s", $s$5], [null, "s", $s$5], [null, "s", $s$5], [null, "s", $s$5], [null, "s", $s$5], [null, "s", $s$5], [null, "e", $s$5], [], [null, "e", $s$5], [null, "s", $s$5], [], [null, "s", $s$5], [], [null, "e", $s$5], [null, "s", $s$5], [], [null, "s", $s$5], [], [], [null, "s", $s$6], [], [null, "s", $s$5], [], [], [null, "s", $s$5], [], [null, "s", $s$5], [], [], [null, "e", $s$5], [], []]);
$M.fun("m$5", "_arrayWithHoles", "m$0", ["arr"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(25);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = Array.isArray).dbg$call(Array, $.$.$0);
        continue;

      case 2:
        if ($p) {
          $.goto = 4;
          $M.brk(26);
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        return $M.ret();

      case 4:
        return $M.ret($.$.$0);

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$7], [null, "e", $s$7], [null, "s", $s$7], [], [], [], []]);
$M.fun("m$6", "a1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        return $M.ret();

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$7", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.Some($);
        $.goto = 1;
        $M.brk(31);
        continue;

      case 1:
        $.$.$1 = $.$.$0.prototype;
        $.goto = 2;
        $M.brk(32);
        continue;

      case 2:
        $.$.$1.a = $c.a($);
        $.goto = 3;
        $M.brk(34);
        continue;

      case 3:
        return $M.ret($.$.$0);

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$8], [null, "s", $s$8], [null, "s", $s$8], [], [], []]);
$M.fun("m$8", "Some", "m$7", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        return $M.ret();

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$9", "a", "m$7", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(33);
        continue;

      case 1:
        $.goto = 2;
        $M.awt(b_1);
        continue;

      case 2:
        return $M.retA();

      case 3:
        return $M.retA($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["8:6-8:16", "s", $s$9], [null, null, null], [], [], []]);
$M.fun("m$10", "somethingElse", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(37);
        continue;

      case 1:
        return $M.retA($c.zz($));

      case 2:
        return $M.retA($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["14:4-17:6", "s", $s$2], [], [], []]);
$M.fun("m$11", "zz", "m$10", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(38);
        continue;

      case 1:
        $.goto = 2;
        $p = new ($M.context.call = $.$$.$$.$.$9)();
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff_1)($p);
        continue;

      case 3:
        $.goto = 4;
        $M.awt($p);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(39);
        continue;

      case 5:
        $.goto = 6;
        $p = ($M.context.call = eff_2)($.$$.$$.$.$7, $.$$.$$.$.$10);
        continue;

      case 6:
        $.goto = 7;
        $M.awt($p);
        continue;

      case 7:
        return $M.retA();

      case 8:
        return $M.retA($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["15:6-15:30", "s", $s$10], ["15:18-15:28", "e", $s$10], ["15:12-15:29", "e", $s$10], [null, null, null], ["16:6-16:24", "s", $s$10], ["16:12-16:23", "e", $s$10], [null, null, null], [], [], []]);
module.exports = $M.exports();