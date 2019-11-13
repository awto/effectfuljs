var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  _slicedToArray: "$0",
  _nonIterableRest: "$1",
  _iterableToArrayLimit: "$2",
  _arrayWithHoles: "$3",
  a1: "$4"
}, null, false],
    $s$2 = [{
  Some: "$5",
  b: "$6",
  Something: "$7",
  _Some: "$8",
  other: "$9",
  b2: "$10",
  somethingElse: "$11"
}, $s$1, false],
    $s$3 = [{
  arr: "$0",
  i: "$1"
}, $s$1, false],
    $s$4 = [{
  arr: "$0",
  i: "$1",
  _arr: "$2",
  _n: "$3",
  _d: "$4",
  _e: "$5",
  _i: "$6",
  _s: "$7"
}, $s$1, false],
    $s$5 = [{
  err: "$8"
}, $s$4, false],
    $s$6 = [{
  arr: "$0"
}, $s$1, false],
    $s$7 = [{
  Some: "$0",
  _proto: "$1"
}, $s$2, false],
    $s$8 = [{
  a: "$0"
}, $s$7, false],
    $s$9 = [{
  zz: "$0"
}, $s$2, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c._slicedToArray($);
        $.$.$4 = $c.a1($);
        $.$.$3 = $c._arrayWithHoles($);
        $.$.$2 = $c._iterableToArrayLimit($);
        $.$.$1 = $c._nonIterableRest($);
        $.$.$7 = $c.Something($);
        $.$.$11 = $c.somethingElse($);
        $.goto = 1;
        $M.brk(23);
        continue;

      case 1:
        $.goto = 2;
        $p =
        /*#__PURE__*/
        ($M.context.call = $c.f($))();
        continue;

      case 2:
        $.$.$5 = $p;
        $.goto = 3;
        $M.brk(30);
        continue;

      case 3:
        $.$.$6 = a;
        $.goto = 4;
        $M.brk(32);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = $.$.$0)($.$.$5, 3);
        continue;

      case 5:
        $.$.$8 = $p;
        $.$.$9 = $.$.$8[1];
        $.$.$10 = $.$.$8[2];
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$2], [null, "e", $s$2], ["10:2-10:12", "s", $s$2], [null, "s", $s$2], [null, "e", $s$2], [], [], []]);
$M.fun("m$1", "_slicedToArray", "m$0", ["arr", "i"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = $.$$.$.$3)($.$.$0);
        continue;

      case 2:
        $.value = $p;

        if (r) {
          $.state = 3;
        } else {
          $.goto = 4;
          $p = ($M.context.call = $.$$.$.$2)($.$.$0, $.$.$1);
          continue;
        }

      case 3:
        if (r) {
          $.goto = 5;
          continue;
        } else {
          $.goto = 6;
          $p = ($M.context.call = $.$$.$.$1)();
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
}, null, null, [[null, "s", $s$3], [null, "e", $s$3], [null, "e", $s$3], [null, "e", $s$3], [], [], [], [], []]);
$M.fun("m$2", "_nonIterableRest", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
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
$M.fun("m$3", "_iterableToArrayLimit", "m$0", ["arr", "i"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 1:
        $.goto = 32;
        $M.brk(15);
        continue;

      case 2:
        $.goto = 29;
        $M.brk(18);
        continue;

      case 3:
        $8 = $.value;
        $.goto = 27;
        $M.brk(13);
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
          $M.brk(3);
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
        $M.brk(4);
        continue;

      case 9:
        $.$.$2 = [];
        $.goto = 10;
        $M.brk(5);
        continue;

      case 10:
        $.$.$3 = true;
        $.goto = 11;
        $M.brk(6);
        continue;

      case 11:
        $.$.$4 = false;
        $.goto = 12;
        $M.brk(7);
        continue;

      case 12:
        $.$.$5 = undefined;
        $.goto = 13;
        $M.brk(8);
        continue;

      case 13:
        $.goto = 14;
        $M.brk(9);
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
          $M.brk(10);
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
        $M.brk(20);
        continue;

      case 20:
        return $M.ret($.$.$2);

      case 21:
        $.goto = 22;
        ($M.context.call = $.$.$2.push).dbg$call($.$.$2, $.$.$7.value);
        continue;

      case 22:
        $.goto = 23;
        $M.brk(11);
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
          $M.brk(12);
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
        $M.brk(14);
        continue;

      case 28:
        $.$.$5 = $.$.$8;
        $.goto = 19;
        continue;

      case 29:
        if ($.$.$4) {
          $.goto = 31;
          $M.brk(19);
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
        $M.brk(16);
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
          $M.brk(17);
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
}, [[null, "s", $s$4], [null, "s", $s$4], [null, "s", $s$4], [null, "s", $s$5], [null, "e", $s$4], [null, "e", $s$4], [null, "s", $s$4], [], [null, "s", $s$4], [null, "s", $s$4], [null, "s", $s$4], [null, "s", $s$4], [null, "s", $s$4], [null, "s", $s$4], [null, "e", $s$4], [], [null, "e", $s$4], [null, "s", $s$4], [], [null, "s", $s$4], [], [null, "e", $s$4], [null, "s", $s$4], [], [null, "s", $s$4], [], [], [null, "s", $s$5], [], [null, "s", $s$4], [], [], [null, "s", $s$4], [], [null, "s", $s$4], [], [], [null, "e", $s$4], [], []]);
$M.fun("m$4", "_arrayWithHoles", "m$0", ["arr"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(21);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = Array.isArray).dbg$call(Array, $.$.$0);
        continue;

      case 2:
        if ($p) {
          $.goto = 4;
          $M.brk(22);
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
}, null, null, [[null, "s", $s$6], [null, "e", $s$6], [null, "s", $s$6], [], [], [], []]);
$M.fun("m$5", "a1", "m$0", [], 0, function () {
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
$M.fun("m$6", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.Some($);
        $.goto = 1;
        $M.brk(24);
        continue;

      case 1:
        $.$.$1 = $.$.$0.prototype;
        $.goto = 2;
        $M.brk(25);
        continue;

      case 2:
        $.$.$1.a = $c.a($);
        $.goto = 3;
        $M.brk(29);
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
}, null, null, [[null, "s", $s$7], [null, "s", $s$7], [null, "s", $s$7], [], [], []]);
$M.fun("m$7", "Some", "m$6", [], 0, function () {
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
$M.fun("m$8", "a", "m$6", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(26);
        continue;

      case 1:
        $.goto = 2;
        $p = new ($M.context.call = $.$$.$.$0)();
        continue;

      case 2:
        $.goto = 3;
        $M.awt($p);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(27);
        continue;

      case 4:
        $.goto = 5;
        $p = new ($M.context.call = $.$$.$.$7)();
        continue;

      case 5:
        $.goto = 6;
        $M.awt($p);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(28);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = $.$$.$.$4)();
        continue;

      case 8:
        return $M.retA();

      case 9:
        return $M.retA($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["5:6-5:23", "s", $s$8], ["5:12-5:22", "e", $s$8], [null, null, null], ["6:6-6:28", "s", $s$8], ["6:12-6:27", "e", $s$8], [null, null, null], ["7:6-7:11", "s", $s$8], ["7:6-7:10", "e", $s$8], [], [], []]);
$M.fun("m$9", "Something", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(31);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = $.$$.$.$4)($.$$.$.$6);
        continue;

      case 2:
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["12:4-12:10", "s", $s$2], ["12:4-12:9", "e", $s$2], [], [], []]);
$M.fun("m$10", "somethingElse", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(33);
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
}, null, null, [["16:4-20:6", "s", $s$2], [], [], []]);
$M.fun("m$11", "zz", "m$10", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(34);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = $.$$.$$.$.$7)();
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
        $M.brk(35);
        continue;

      case 5:
        $.goto = 6;
        $p = new ($M.context.call = $.$$.$$.$.$5)();
        continue;

      case 6:
        $.goto = 7;
        $p = ($M.context.call = eff_2)($p);
        continue;

      case 7:
        $.goto = 8;
        $M.awt($p);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(36);
        continue;

      case 9:
        $.goto = 10;
        $p = ($M.context.call = eff_3)(a, $.$$.$$.$.$6);
        continue;

      case 10:
        $.goto = 11;
        $M.awt($p);
        continue;

      case 11:
        return $M.retA();

      case 12:
        return $M.retA($.value);

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["17:6-17:31", "s", $s$9], ["17:18-17:29", "e", $s$9], ["17:12-17:30", "e", $s$9], [null, null, null], ["18:6-18:30", "s", $s$9], ["18:18-18:28", "e", $s$9], ["18:12-18:29", "e", $s$9], [null, null, null], ["19:6-19:24", "s", $s$9], ["19:12-19:23", "e", $s$9], [null, null, null], [], [], []]);
module.exports = $M.exports();