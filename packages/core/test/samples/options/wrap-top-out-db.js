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
  arr: "$0"
}, $s$1, false],
    $s$6 = [{
  Some: "$0",
  _proto: "$1"
}, $s$2, false],
    $s$7 = [{
  a: "$0"
}, $s$6, false],
    $s$8 = [{
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
        $p =
        /*#__PURE__*/
        ($M.context.call = $c.f($))();
        continue;

      case 1:
        $.$.$5 = $p;
        $.$.$6 = a;
        $.goto = 2;
        $p = ($M.context.call = $.$.$0)($.$.$5, 3);
        continue;

      case 2:
        $.$.$8 = $p;
        $.$.$9 = $.$.$8[1];
        $.$.$10 = $.$.$8[2];
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$2], [null, "e", $s$2], [], [], []]);
$M.fun("m$1", "_slicedToArray", "m$0", ["arr", "i"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = $.$$.$.$3)($.$.$0);
        continue;

      case 1:
        $.value = $p;

        if (r) {
          $.state = 2;
        } else {
          $.goto = 3;
          $p = ($M.context.call = $.$$.$.$2)($.$.$0, $.$.$1);
          continue;
        }

      case 2:
        if (r) {
          $.goto = 4;
          continue;
        } else {
          $.goto = 5;
          $p = ($M.context.call = $.$$.$.$1)();
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
$M.fun("m$2", "_nonIterableRest", "m$0", [], 0, function () {
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
$M.fun("m$3", "_iterableToArrayLimit", "m$0", ["arr", "i"], 0, function () {
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
$M.fun("m$4", "_arrayWithHoles", "m$0", ["arr"], 0, function () {
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
        $p = new ($M.context.call = $.$$.$.$0)();
        continue;

      case 1:
        $.goto = 2;
        $M.awt($p);
        continue;

      case 2:
        $.goto = 3;
        $p = new ($M.context.call = $.$$.$.$7)();
        continue;

      case 3:
        $.goto = 4;
        $M.awt($p);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = $.$$.$.$4)();
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
}, null, null, [["5:12-5:22", "e", $s$7], [null, null, null], ["6:12-6:27", "e", $s$7], [null, null, null], ["7:6-7:10", "e", $s$7], [], [], []]);
$M.fun("m$9", "Something", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = $.$$.$.$4)($.$$.$.$6);
        continue;

      case 1:
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["12:4-12:9", "e", $s$2], [], [], []]);
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
        $p = ($M.context.call = $.$$.$$.$.$7)();
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
        $p = new ($M.context.call = $.$$.$$.$.$5)();
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff_2)($p);
        continue;

      case 5:
        $.goto = 6;
        $M.awt($p);
        continue;

      case 6:
        $.goto = 7;
        $p = ($M.context.call = eff_3)(a, $.$$.$$.$.$6);
        continue;

      case 7:
        $.goto = 8;
        $M.awt($p);
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
}, null, null, [["17:18-17:29", "e", $s$8], ["17:12-17:30", "e", $s$8], [null, null, null], ["18:18-18:28", "e", $s$8], ["18:12-18:29", "e", $s$8], [null, null, null], ["19:12-19:23", "e", $s$8], [null, null, null], [], [], []]);
module.exports = $M.exports();