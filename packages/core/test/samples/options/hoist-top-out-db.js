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
  arr: "$0"
}, $s$1, false],
    $s$6 = [{
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
        exports.__esModule = true;
        exports.a = void 0;
        $.goto = 1;
        $p = $M.evalDir("some");
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = $.$.$1)($p);
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        ($M.context.call = M.profile).dbg$call(M, "es");
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = $.$.$2)($.$.$0.default, 2);
        continue;

      case 4:
        $.$.$6 = $p;
        $.$.$7 = $.$.$6[1];
        exports.a = $.$.$7;
        $.$.$14 = $c.somethingElse($);
        $.goto = 5;
        $p =
        /*#__PURE__*/
        ($M.context.call = $c.f($))();
        continue;

      case 5:
        $.$.$9 = $p;
        $.$.$10 = $.$.$7;
        $.goto = 6;
        $p = ($M.context.call = $.$.$2)($.$.$9, 3);
        continue;

      case 6:
        $.$.$11 = $p;
        $.$.$12 = $.$.$11[1];
        $.$.$13 = $.$.$11[2];
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$1], [null, "e", $s$1], ["1:0-1:15", "e", $s$1], [null, "e", $s$1], [null, "e", $s$2], [null, "e", $s$2], [], [], []]);
$M.fun("m$1", "_interopRequireDefault", "m$0", ["obj"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $0 = $.$.$0;

        if ($0) {
          $0 = $.$.$0.__esModule;
          $.state = 1;
        } else {
          $.state = 1;
        }

      case 1:
        if ($0) {
          $.value = $.$.$0;
          $.state = 2;
        } else {
          $.value = {
            default: $.$.$0
          };
          $.state = 2;
        }

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
}, null, null, [[], [], [], [], []]);
$M.fun("m$2", "_slicedToArray", "m$0", ["arr", "i"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = $.$$.$.$5)($.$.$0);
        continue;

      case 1:
        $.value = $p;

        if (r) {
          $.state = 2;
        } else {
          $.goto = 3;
          $p = ($M.context.call = $.$$.$.$4)($.$.$0, $.$.$1);
          continue;
        }

      case 2:
        if (r) {
          $.goto = 4;
          continue;
        } else {
          $.goto = 5;
          $p = ($M.context.call = $.$$.$.$3)();
          continue;
        }

      case 3:
        $.value = $p;
        $.goto = 2;
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.value = $p;
        $.goto = 4;
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$3], [null, "e", $s$3], [null, "e", $s$3], [], [], [], [], []]);
$M.fun("m$3", "_nonIterableRest", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = new ($M.context.call = TypeError)("Invalid attempt to destructure non-iterable instance");
        continue;

      case 1:
        return $M.ret($p);

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$1], [], [], []]);
$M.fun("m$4", "_iterableToArrayLimit", "m$0", ["arr", "i"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$11 = Symbol.iterator;
        $.goto = 4;
        $p = ($M.context.call = Object)($.$.$0);
        continue;

      case 1:
        $.goto = 18;
        continue;

      case 2:
        if ($.$.$4) {
          return $M.ret($.$.$5);
        } else {
          $.goto = 17;
          continue;
        }

      case 3:
        $8 = $.value;
        $.$.$4 = true;
        $.$.$5 = $.$.$8;
        $.goto = 13;
        continue;

      case 4:
        $.$.$11 = $.$.$11 in $p;

        if ($.$.$11) {
          $.state = 5;
        } else {
          $0 = Object.prototype.toString;
          $.goto = 6;
          $p = ($M.context.call = $0.call).dbg$call($0, $.$.$0);
          continue;
        }

      case 5:
        if (!$.$.$11) {
          return $M.ret();
        } else {
          $.goto = 7;
          continue;
        }

      case 6:
        $.$.$11 = $p === "[object Arguments]";
        $.goto = 5;
        continue;

      case 7:
        $.$.$2 = [];
        $.$.$3 = true;
        $.$.$4 = false;
        $.$.$5 = undefined;
        $.state = 8;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = $.$.$0[Symbol.iterator]).dbg$call($.$.$0);
        continue;

      case 9:
        $.$.$6 = $p;
        $.state = 10;

      case 10:
        $.goto = 11;
        $p = ($M.context.call = $.$.$6.next).dbg$call($.$.$6);
        continue;

      case 11:
        if (!($.$.$3 = ($.$.$7 = $p).done)) {
          $.goto = 14;
          ($M.context.call = $.$.$2.push).dbg$call($.$.$2, $.$.$7.value);
          continue;
        } else {
          $.state = 12;
        }

      case 12:
        $.$.$9 = 13;
        $.goto = 1;
        continue;

      case 13:
        return $M.ret($.$.$2);

      case 14:
        $0 = $.$.$1;

        if ($0) {
          $0 = $.$.$2.length === $.$.$1;
          $.state = 15;
        } else {
          $.state = 15;
        }

      case 15:
        if ($0) {
          $.goto = 12;
          continue;
        } else {
          $.state = 16;
        }

      case 16:
        $.$.$3 = true;
        $.goto = 10;
        continue;

      case 17:
        $.goto = $.$.$10;
        continue;

      case 18:
        $0 = !$.$.$3;

        if ($0) {
          $0 = $.$.$6["return"] != null;
          $.state = 19;
        } else {
          $.state = 19;
        }

      case 19:
        if ($0) {
          $.goto = 20;
          ($M.context.call = $.$.$6["return"]).dbg$call($.$.$6);
          continue;
        } else {
          $.state = 20;
        }

      case 20:
        $.$.$10 = 21;
        $.goto = 2;
        continue;

      case 21:
        $.goto = $.$.$9;
        continue;

      case 22:
        return $M.ret($.value);

      case 23:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
      $.$.$9 = 23;
      $.goto = 1;
      break;

    case 18:
    case 19:
    case 20:
    case 22:
      $.$.$10 = 23;
      $.goto = 2;
      break;

    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 14:
    case 15:
    case 16:
      $.goto = 3;
      break;

    default:
      $.goto = 23;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 18:
    case 19:
    case 20:
    case 22:
      $.$.$10 = 22;
      $.goto = 2;
      break;

    case 3:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 14:
    case 15:
    case 16:
      $.$.$9 = 22;
      $.goto = 1;
      break;

    default:
      $.goto = 22;
      break;
  }
}, [[null, "e", $s$4], [], [], [], [null, "e", $s$4], [], [], [], [null, "e", $s$4], [], [null, "e", $s$4], [null, "e", $s$4], [], [], [], [], [], [], [], [null, "e", $s$4], [], [], [], []]);
$M.fun("m$5", "_arrayWithHoles", "m$0", ["arr"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = Array.isArray).dbg$call(Array, $.$.$0);
        continue;

      case 1:
        if ($p) {
          return $M.ret($.$.$0);
        } else {
          $.state = 2;
        }

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
}, null, null, [[null, "e", $s$5], [], [], [], []]);
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
        $.$.$1 = $.$.$0.prototype;
        $.$.$1.a = $c.a($);
        return $M.ret($.$.$0);

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
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
        $M.awt(b_1);
        continue;

      case 1:
        return $M.retA();

      case 2:
        return $M.retA($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [], [], []]);
$M.fun("m$10", "somethingElse", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        return $M.retA($c.zz($));

      case 1:
        return $M.retA($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$11", "zz", "m$10", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = new ($M.context.call = $.$$.$$.$.$9)();
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff_1)($p);
        continue;

      case 2:
        $.goto = 3;
        $M.awt($p);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff_2)($.$$.$$.$.$7, $.$$.$$.$.$10);
        continue;

      case 4:
        $.goto = 5;
        $M.awt($p);
        continue;

      case 5:
        return $M.retA();

      case 6:
        return $M.retA($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["15:18-15:28", "e", $s$6], ["15:12-15:29", "e", $s$6], [null, null, null], ["16:12-16:23", "e", $s$6], [null, null, null], [], [], []]);
module.exports = $M.exports();