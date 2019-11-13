var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  _slicedToArray: "$0",
  _iterableToArrayLimit: "$1",
  _objectWithoutProperties: "$2",
  _objectWithoutPropertiesLoose: "$3",
  _toArray: "$4",
  _nonIterableRest: "$5",
  _iterableToArray: "$6",
  _arrayWithHoles: "$7",
  aS: "$8",
  a: "$9",
  a1: "$10",
  bS: "$11",
  b: "$12",
  b1: "$13",
  c: "$14",
  d: "$15",
  e1: "$16",
  e2: "$17",
  es6: "$18"
}, null, false],
    $s$2 = [{
  arr: "$0",
  i: "$1"
}, $s$1, false],
    $s$3 = [{
  arr: "$0",
  i: "$1",
  _arr: "$2",
  _n: "$3",
  _d: "$4",
  _e: "$5",
  _i: "$6",
  _s: "$7"
}, $s$1, false],
    $s$4 = [{
  err: "$8"
}, $s$3, false],
    $s$5 = [{
  source: "$0",
  excluded: "$1",
  target: "$2",
  key: "$3",
  i: "$4",
  sourceSymbolKeys: "$5"
}, $s$1, false],
    $s$6 = [{
  source: "$0",
  excluded: "$1",
  target: "$2",
  sourceKeys: "$3",
  key: "$4",
  i: "$5"
}, $s$1, false],
    $s$7 = [{
  arr: "$0"
}, $s$1, false],
    $s$8 = [{
  iter: "$0"
}, $s$1, false],
    $s$9 = [{
  arr: "$0"
}, $s$1, false],
    $s$10 = [{
  b1: "$0"
}, $s$1, false],
    $s$11 = [{
  b1: "$0"
}, $s$1, false],
    $s$12 = [{
  a: "$0"
}, $s$1, false],
    $s$13 = [{
  b1: "$0",
  b2: "$1"
}, $s$1, false],
    $s$14 = [{
  b1: "$0",
  b2: "$1"
}, $s$1, false],
    $s$15 = [{
  a: "$0",
  c: "$1"
}, $s$1, false],
    $s$16 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3",
  e: "$4",
  f: "$5",
  g: "$6",
  j: "$7",
  x: "$8",
  y: "$9",
  z: "$10"
}, $s$1, false],
    $s$17 = [{
  cc: "$0"
}, $s$1, false],
    $s$18 = [{
  cc: "$0"
}, $s$1, false],
    $s$19 = [{
  cc: "$1"
}, $s$18, false],
    $s$20 = [{
  _eff2: "$0",
  _eff2$m: "$1",
  _eff2$m$: "$2",
  _eff_: "$3",
  _eff_2: "$4",
  a: "$5",
  b: "$6",
  arr1: "$7",
  _eff: "$8",
  _eff$m: "$9",
  e: "$10",
  _eff$m$: "$11",
  f: "$12",
  m: "$13",
  obj: "$14",
  arr2: "$15",
  _eff_3: "$16",
  _eff_4: "$17",
  _eff_5: "$18",
  _eff_6: "$19"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c._slicedToArray($);
        $.$.$18 = $c.es6($);
        $.$.$17 = $c.e2($);
        $.$.$16 = $c.e1($);
        $.$.$15 = $c.d($);
        $.$.$14 = $c.c($);
        $.$.$13 = $c.b1($);
        $.$.$12 = $c.b($);
        $.$.$11 = $c.bS($);
        $.$.$10 = $c.a1($);
        $.$.$9 = $c.a($);
        $.$.$8 = $c.aS($);
        $.$.$7 = $c._arrayWithHoles($);
        $.$.$6 = $c._iterableToArray($);
        $.$.$5 = $c._nonIterableRest($);
        $.$.$4 = $c._toArray($);
        $.$.$3 = $c._objectWithoutPropertiesLoose($);
        $.$.$2 = $c._objectWithoutProperties($);
        $.$.$1 = $c._iterableToArrayLimit($);
        $.goto = 1;
        $M.brk(54);
        continue;

      case 1:
        exports.a = $.$.$9;
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["7:0-7:14", "s", $s$1], [], [], []]);
$M.fun("m$1", "_slicedToArray", "m$0", ["arr", "i"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = $.$$.$.$7)($.$.$0);
        continue;

      case 2:
        $.value = $p;

        if (r) {
          $.state = 3;
        } else {
          $.goto = 4;
          $p = ($M.context.call = $.$$.$.$1)($.$.$0, $.$.$1);
          continue;
        }

      case 3:
        if (r) {
          $.goto = 5;
          continue;
        } else {
          $.goto = 6;
          $p = ($M.context.call = $.$$.$.$5)();
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
}, null, null, [[null, "s", $s$2], [null, "e", $s$2], [null, "e", $s$2], [null, "e", $s$2], [], [], [], [], []]);
$M.fun("m$2", "_iterableToArrayLimit", "m$0", ["arr", "i"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 4;
        $M.brk(1);
        continue;

      case 1:
        $.goto = 32;
        $M.brk(14);
        continue;

      case 2:
        $.goto = 29;
        $M.brk(17);
        continue;

      case 3:
        $8 = $.value;
        $.goto = 27;
        $M.brk(12);
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
          $M.brk(2);
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
        $M.brk(3);
        continue;

      case 9:
        $.$.$2 = [];
        $.goto = 10;
        $M.brk(4);
        continue;

      case 10:
        $.$.$3 = true;
        $.goto = 11;
        $M.brk(5);
        continue;

      case 11:
        $.$.$4 = false;
        $.goto = 12;
        $M.brk(6);
        continue;

      case 12:
        $.$.$5 = undefined;
        $.goto = 13;
        $M.brk(7);
        continue;

      case 13:
        $.goto = 14;
        $M.brk(8);
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
          $M.brk(9);
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
        $M.brk(19);
        continue;

      case 20:
        return $M.ret($.$.$2);

      case 21:
        $.goto = 22;
        ($M.context.call = $.$.$2.push).dbg$call($.$.$2, $.$.$7.value);
        continue;

      case 22:
        $.goto = 23;
        $M.brk(10);
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
          $M.brk(11);
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
        $M.brk(13);
        continue;

      case 28:
        $.$.$5 = $.$.$8;
        $.goto = 19;
        continue;

      case 29:
        if ($.$.$4) {
          $.goto = 31;
          $M.brk(18);
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
        $M.brk(15);
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
          $M.brk(16);
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
}, [[null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$4], [null, "e", $s$3], [null, "e", $s$3], [null, "s", $s$3], [], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "e", $s$3], [], [null, "e", $s$3], [null, "s", $s$3], [], [null, "s", $s$3], [], [null, "e", $s$3], [null, "s", $s$3], [], [null, "s", $s$3], [], [], [null, "s", $s$4], [], [null, "s", $s$3], [], [], [null, "s", $s$3], [], [null, "s", $s$3], [], [], [null, "e", $s$3], [], []]);
$M.fun("m$3", "_objectWithoutProperties", "m$0", ["source", "excluded"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(20);
        continue;

      case 1:
        if ($.$.$0 == null) {
          $.goto = 22;
          $M.brk(21);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        $M.brk(22);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = $.$$.$.$3)($.$.$0, $.$.$1);
        continue;

      case 4:
        $.$.$2 = $p;
        $.goto = 5;
        $M.brk(23);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(24);
        continue;

      case 6:
        if (Object.getOwnPropertySymbols) {
          $.goto = 9;
          $M.brk(25);
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        $.goto = 8;
        $M.brk(33);
        continue;

      case 8:
        return $M.ret($.$.$2);

      case 9:
        $.goto = 10;
        $p = ($M.context.call = Object.getOwnPropertySymbols).dbg$call(Object, $.$.$0);
        continue;

      case 10:
        $.$.$5 = $p;
        $.goto = 11;
        $M.brk(26);
        continue;

      case 11:
        $.$.$4 = 0;
        $.state = 12;

      case 12:
        if ($.$.$4 < $.$.$5.length) {
          $.goto = 13;
          $M.brk(27);
          continue;
        } else {
          $.goto = 7;
          continue;
        }

      case 13:
        $.$.$3 = $.$.$5[$.$.$4];
        $.goto = 14;
        $M.brk(28);
        continue;

      case 14:
        $.goto = 15;
        $p = ($M.context.call = $.$.$1.indexOf).dbg$call($.$.$1, $.$.$3);
        continue;

      case 15:
        if ($p >= 0) {
          $.goto = 21;
          $M.brk(29);
          continue;
        } else {
          $.state = 16;
        }

      case 16:
        $.goto = 17;
        $M.brk(30);
        continue;

      case 17:
        $0 = Object.prototype.propertyIsEnumerable;
        $.goto = 18;
        $p = ($M.context.call = $0.call).dbg$call($0, $.$.$0, $.$.$3);
        continue;

      case 18:
        if (!$p) {
          $.goto = 21;
          $M.brk(31);
          continue;
        } else {
          $.state = 19;
        }

      case 19:
        $.goto = 20;
        $M.brk(32);
        continue;

      case 20:
        $.$.$2[$.$.$3] = $.$.$0[$.$.$3];
        $.state = 21;

      case 21:
        $.$.$4++;
        $.goto = 12;
        continue;

      case 22:
        return $M.ret({});

      case 23:
        return $M.ret($.value);

      case 24:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$5], [null, "s", $s$5], [null, "s", $s$5], [null, "e", $s$5], [null, "s", $s$5], [null, "s", $s$5], [null, "s", $s$5], [null, "s", $s$5], [], [null, "e", $s$5], [null, "s", $s$5], [], [null, "s", $s$5], [null, "s", $s$5], [null, "e", $s$5], [null, "s", $s$5], [null, "s", $s$5], [null, "e", $s$5], [null, "s", $s$5], [null, "s", $s$5], [], [], [], [], []]);
$M.fun("m$4", "_objectWithoutPropertiesLoose", "m$0", ["source", "excluded"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(34);
        continue;

      case 1:
        if ($.$.$0 == null) {
          $.goto = 16;
          $M.brk(35);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        $M.brk(36);
        continue;

      case 3:
        $.$.$2 = {};
        $.goto = 4;
        $M.brk(37);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = Object.keys).dbg$call(Object, $.$.$0);
        continue;

      case 5:
        $.$.$3 = $p;
        $.goto = 6;
        $M.brk(38);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(39);
        continue;

      case 7:
        $.$.$5 = 0;
        $.state = 8;

      case 8:
        if ($.$.$5 < $.$.$3.length) {
          $.goto = 10;
          $M.brk(40);
          continue;
        } else {
          $.goto = 9;
          $M.brk(44);
          continue;
        }

      case 9:
        return $M.ret($.$.$2);

      case 10:
        $.$.$4 = $.$.$3[$.$.$5];
        $.goto = 11;
        $M.brk(41);
        continue;

      case 11:
        $.goto = 12;
        $p = ($M.context.call = $.$.$1.indexOf).dbg$call($.$.$1, $.$.$4);
        continue;

      case 12:
        if ($p >= 0) {
          $.goto = 15;
          $M.brk(42);
          continue;
        } else {
          $.state = 13;
        }

      case 13:
        $.goto = 14;
        $M.brk(43);
        continue;

      case 14:
        $.$.$2[$.$.$4] = $.$.$0[$.$.$4];
        $.state = 15;

      case 15:
        $.$.$5++;
        $.goto = 8;
        continue;

      case 16:
        return $M.ret({});

      case 17:
        return $M.ret($.value);

      case 18:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$6], [null, "s", $s$6], [null, "s", $s$6], [null, "s", $s$6], [null, "e", $s$6], [null, "s", $s$6], [null, "s", $s$6], [], [null, "s", $s$6], [], [null, "s", $s$6], [null, "e", $s$6], [null, "s", $s$6], [null, "s", $s$6], [], [], [], [], []]);
$M.fun("m$5", "_toArray", "m$0", ["arr"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(45);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = $.$$.$.$7)($.$.$0);
        continue;

      case 2:
        $.value = $p;

        if (r) {
          $.state = 3;
        } else {
          $.goto = 4;
          $p = ($M.context.call = $.$$.$.$6)($.$.$0);
          continue;
        }

      case 3:
        if (r) {
          $.goto = 5;
          continue;
        } else {
          $.goto = 6;
          $p = ($M.context.call = $.$$.$.$5)();
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
}, null, null, [[null, "s", $s$7], [null, "e", $s$7], [null, "e", $s$7], [null, "e", $s$7], [], [], [], [], []]);
$M.fun("m$6", "_nonIterableRest", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(46);
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
$M.fun("m$7", "_iterableToArray", "m$0", ["iter"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(47);
        continue;

      case 1:
        $.$.$1 = Symbol.iterator;
        $.goto = 2;
        $p = ($M.context.call = Object)($.$.$0);
        continue;

      case 2:
        $.$.$1 = $.$.$1 in $p;

        if ($.$.$1) {
          $.state = 3;
        } else {
          $0 = Object.prototype.toString;
          $.goto = 4;
          $p = ($M.context.call = $0.call).dbg$call($0, $.$.$0);
          continue;
        }

      case 3:
        if ($.$.$1) {
          $.goto = 6;
          $M.brk(48);
          continue;
        } else {
          $.goto = 5;
          continue;
        }

      case 4:
        $.$.$1 = $p === "[object Arguments]";
        $.goto = 3;
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.goto = 7;
        $p = ($M.context.call = Array.from).dbg$call(Array, $.$.$0);
        continue;

      case 7:
        return $M.ret($p);

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$8], [null, "e", $s$8], [null, "e", $s$8], [null, "s", $s$8], [], [], [null, "e", $s$8], [], [], []]);
$M.fun("m$8", "_arrayWithHoles", "m$0", ["arr"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(49);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = Array.isArray).dbg$call(Array, $.$.$0);
        continue;

      case 2:
        if ($p) {
          $.goto = 4;
          $M.brk(50);
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
}, null, null, [[null, "s", $s$9], [null, "e", $s$9], [null, "s", $s$9], [], [], [], []]);
$M.fun("m$9", "aS", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(51);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(1);
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        $M.brk(52);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)("a");
        continue;

      case 4:
        $.goto = 5;
        $M.brk(53);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)("b");
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:18", "s", $s$10], ["2:11-2:17", "e", $s$10], ["3:2-3:11", "s", $s$10], ["3:2-3:10", "e", $s$10], ["4:2-4:11", "s", $s$10], ["4:2-4:10", "e", $s$10], [], [], []]);
$M.fun("m$10", "a", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(55);
        continue;

      case 1:
        $.$.$0 = 0;
        $.goto = 2;
        $M.brk(56);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(1);
        continue;

      case 3:
        $.$.$0 = $p;
        $.goto = 4;
        $M.brk(57);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)("a");
        continue;

      case 5:
        $.goto = 6;
        $M.brk(58);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)("b");
        continue;

      case 7:
        return $M.ret();

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["10:2-10:13", "s", $s$11], ["11:2-11:14", "s", $s$11], ["11:7-11:13", "e", $s$11], ["12:2-12:11", "s", $s$11], ["12:2-12:10", "e", $s$11], ["13:2-13:11", "s", $s$11], ["13:2-13:10", "e", $s$11], [], [], []]);
$M.fun("m$11", "a1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(59);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(60);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(1);
        continue;

      case 3:
        $.$.$0 = $p;
        $.goto = 4;
        $M.brk(61);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)("a");
        continue;

      case 5:
        $.goto = 6;
        $M.brk(62);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)("b");
        continue;

      case 7:
        return $M.ret();

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["17:2-17:8", "s", $s$12], ["18:2-18:13", "s", $s$12], ["18:6-18:12", "e", $s$12], ["19:2-19:11", "s", $s$12], ["19:2-19:10", "e", $s$12], ["20:2-20:11", "s", $s$12], ["20:2-20:10", "e", $s$12], [], [], []]);
$M.fun("m$12", "bS", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(63);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(1);
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        $p = ($M.context.call = eff)(2);
        continue;

      case 3:
        $.$.$1 = $p;
        $.goto = 4;
        $M.brk(64);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(65);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)($.$.$1);
        continue;

      case 7:
        return $M.ret();

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["24:2-25:16", "s", $s$13], ["24:11-24:17", "e", $s$13], ["25:9-25:15", "e", $s$13], ["26:2-26:10", "s", $s$13], ["26:2-26:9", "e", $s$13], ["27:2-27:10", "s", $s$13], ["27:2-27:9", "e", $s$13], [], [], []]);
$M.fun("m$13", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(66);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(1);
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        $p = ($M.context.call = eff)(2);
        continue;

      case 3:
        $.$.$1 = $p;
        $.goto = 4;
        $M.brk(67);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(68);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)($.$.$1);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(69);
        continue;

      case 8:
        $.$.$0 = $.$.$1 = 100;
        return $M.ret();

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["31:2-32:16", "s", $s$14], ["31:11-31:17", "e", $s$14], ["32:9-32:15", "e", $s$14], ["33:2-33:10", "s", $s$14], ["33:2-33:9", "e", $s$14], ["34:2-34:10", "s", $s$14], ["34:2-34:9", "e", $s$14], ["35:2-35:16", "s", $s$14], [], [], []]);
$M.fun("m$14", "b1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(70);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(71);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(1);
        continue;

      case 3:
        $.$.$0 = $p;
        $.goto = 4;
        $p = ($M.context.call = eff)(2);
        continue;

      case 4:
        $.$.$1 = $p;
        $.goto = 5;
        $M.brk(72);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(73);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)($.$.$1);
        continue;

      case 8:
        return $M.ret();

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["39:2-39:11", "s", $s$15], ["40:2-40:29", "s", $s$15], ["40:7-40:13", "e", $s$15], ["40:21-40:27", "e", $s$15], ["41:2-41:9", "s", $s$15], ["41:2-41:8", "e", $s$15], ["42:2-42:9", "s", $s$15], ["42:2-42:8", "e", $s$15], [], [], []]);
$M.fun("m$15", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(74);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(1);
        continue;

      case 2:
        $.$.$0 = $p;
        $.$.$1 = 2;
        $.goto = 3;
        $p = ($M.context.call = eff)(3);
        continue;

      case 3:
        $.$.$2 = $p;
        $.goto = 4;
        $M.brk(75);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)("a");
        continue;

      case 5:
        $.goto = 6;
        $M.brk(76);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)("b");
        continue;

      case 7:
        $.goto = 8;
        $M.brk(77);
        continue;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = eff)(4);
        continue;

      case 9:
        $.$.$3 = $p;
        $.$.$4 = 5;
        $.goto = 10;
        $p = ($M.context.call = eff)(6);
        continue;

      case 10:
        $.$.$5 = $p;
        $.goto = 11;
        $p = ($M.context.call = eff)(7);
        continue;

      case 11:
        $.$.$6 = $p;
        $.$.$7 = 8;
        $.goto = 12;
        $M.brk(78);
        continue;

      case 12:
        $.goto = 13;
        $p = ($M.context.call = eff)("x");
        continue;

      case 13:
        $.$.$8 = $p;
        $.$.$9 = "y";
        $.goto = 14;
        $p = ($M.context.call = eff)("z");
        continue;

      case 14:
        $.$.$10 = $p;
        $.goto = 15;
        $M.brk(79);
        continue;

      case 15:
        $.goto = 16;
        ($M.context.call = eff)(9);
        continue;

      case 16:
        $.goto = 17;
        $M.brk(80);
        continue;

      case 17:
        $.$.$0 = $.$.$1 = $.$.$2 = $.$.$3 = $.$.$4 = $.$.$5 = $.$.$6 = $.$.$7 = $.$.$8 = $.$.$9 = $.$.$10 = 1000;
        $.goto = 18;
        $M.brk(81);
        continue;

      case 18:
        $.goto = 19;
        ($M.context.call = eff)(10);
        continue;

      case 19:
        return $M.ret();

      case 20:
        return $M.ret($.value);

      case 21:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["46:2-48:15", "s", $s$16], ["46:10-46:16", "e", $s$16], ["48:8-48:14", "e", $s$16], ["49:2-49:11", "s", $s$16], ["49:2-49:10", "e", $s$16], ["50:2-50:11", "s", $s$16], ["50:2-50:10", "e", $s$16], ["51:2-55:10", "s", $s$16], ["51:10-51:16", "e", $s$16], ["53:8-53:14", "e", $s$16], ["54:8-54:14", "e", $s$16], ["56:2-58:17", "s", $s$16], ["56:10-56:18", "e", $s$16], ["58:8-58:16", "e", $s$16], ["59:2-59:9", "s", $s$16], ["59:2-59:8", "e", $s$16], ["60:2-60:51", "s", $s$16], ["61:2-61:10", "s", $s$16], ["61:2-61:9", "e", $s$16], [], [], []]);
$M.fun("m$16", "d", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(82);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff1)("a");
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        $p = ($M.context.call = eff)(2);
        continue;

      case 3:
        $.$.$0.some = $p;
        $.goto = 4;
        $M.brk(83);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff)("b");
        continue;

      case 5:
        $.$.$0 = $p;
        $.goto = 6;
        $p = ($M.context.call = eff)(3);
        continue;

      case 6:
        $.$.$0.some += $p;
        $.goto = 7;
        $M.brk(84);
        continue;

      case 7:
        $.goto = 8;
        $p = ($M.context.call = eff)("c");
        continue;

      case 8:
        $p.some++;
        $.goto = 9;
        $M.brk(85);
        continue;

      case 9:
        some["d"]--;
        return $M.ret();

      case 10:
        return $M.ret($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["65:2-65:26", "s", $s$1], ["65:2-65:11", "e", $s$1], ["65:19-65:25", "e", $s$1], ["66:2-66:26", "s", $s$1], ["66:2-66:10", "e", $s$1], ["66:19-66:25", "e", $s$1], ["67:2-67:18", "s", $s$1], ["67:2-67:10", "e", $s$1], ["68:2-68:14", "s", $s$1], [], [], []]);
$M.fun("m$17", "e1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(86);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(1, $.$.$0);
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        $M.brk(87);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)(2, $.$.$0);
        continue;

      case 4:
        $.$.$0 = $p;
        $.goto = 5;
        $M.brk(88);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(2, $.$.$0);
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["71:2-71:22", "s", $s$17], ["71:11-71:21", "e", $s$17], ["72:2-72:18", "s", $s$17], ["72:7-72:17", "e", $s$17], ["73:2-73:13", "s", $s$17], ["73:2-73:12", "e", $s$17], [], [], []]);
$M.fun("m$18", "e2", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(89);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(1, $.$.$0);
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        $M.brk(90);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)(2, $.$.$0);
        continue;

      case 4:
        $.$.$0 = $p;
        $.goto = 5;
        $M.brk(91);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(3, $.$.$0);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(92);
        continue;

      case 7:
        $.goto = 8;
        $p = ($M.context.call = eff)(4, $.$.$1);
        continue;

      case 8:
        $.$.$1 = $p;
        $.goto = 9;
        $M.brk(93);
        continue;

      case 9:
        $.goto = 10;
        $p = ($M.context.call = eff)(5, $.$.$1);
        continue;

      case 10:
        $.$.$1 = $p;
        $.goto = 11;
        $M.brk(94);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = eff)(6, $.$.$1);
        continue;

      case 12:
        $.goto = 13;
        $M.brk(95);
        continue;

      case 13:
        $.goto = 14;
        ($M.context.call = eff)(7, $.$.$0);
        continue;

      case 14:
        return $M.ret();

      case 15:
        return $M.ret($.value);

      case 16:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["76:2-76:22", "s", $s$18], ["76:11-76:21", "e", $s$18], ["77:2-77:18", "s", $s$18], ["77:7-77:17", "e", $s$18], ["78:2-78:13", "s", $s$18], ["78:2-78:12", "e", $s$18], ["80:4-80:26", "s", $s$19], ["80:15-80:25", "e", $s$19], ["81:4-81:20", "s", $s$19], ["81:9-81:19", "e", $s$19], ["82:4-82:15", "s", $s$19], ["82:4-82:14", "e", $s$19], ["84:2-84:13", "s", $s$18], ["84:2-84:12", "e", $s$18], [], [], []]);
$M.fun("m$19", "es6", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(96);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(97);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff_1)();
        continue;

      case 3:
        $.$.$3 = $p;
        $.goto = 4;
        $p = ($M.context.call = $.$$.$.$4)($.$.$3);
        continue;

      case 4:
        $.$.$4 = $p;
        $.$.$5 = $.$.$4[1];
        $.$.$6 = $.$.$4[2];
        $.goto = 5;
        $p = ($M.context.call = $.$.$4.slice).dbg$call($.$.$4, 3);
        continue;

      case 5:
        $.$.$7 = $p;
        $.goto = 6;
        $M.brk(98);
        continue;

      case 6:
        $.goto = 7;
        $p = ($M.context.call = eff)(2);
        continue;

      case 7:
        $.$.$8 = $p;
        $.goto = 8;
        $p = ($M.context.call = $.$$.$.$4)($.$.$8.m);
        continue;

      case 8:
        $.$.$9 = $p;
        $.$.$10 = $.$.$9[0];
        $.$.$11 = $.$.$9[1];
        $.$.$12 = $.$.$11.b;
        $.$.$13 = $.$.$11.m;
        $.goto = 9;
        $p = ($M.context.call = $.$$.$.$2)($.$.$11, ["b", "m"]);
        continue;

      case 9:
        $.$.$14 = $p;
        $.goto = 10;
        $p = ($M.context.call = $.$.$9.slice).dbg$call($.$.$9, 2);
        continue;

      case 10:
        $.$.$15 = $p;
        $.goto = 11;
        $M.brk(99);
        continue;

      case 11:
        $.goto = 12;
        $p = ($M.context.call = eff_1)();
        continue;

      case 12:
        $.$.$20 = $p;
        $.goto = 13;
        $p = ($M.context.call = eff)(2);
        continue;

      case 13:
        $.$.$0 = $p;
        $.goto = 14;
        $p = ($M.context.call = $.$$.$.$0)($.$.$0.m, 2);
        continue;

      case 14:
        $.$.$1 = $p;
        $.$.$10 = $.$.$1[0];
        $.$.$2 = $.$.$1[1];
        $.$.$12 = $.$.$2.b;
        $.$.$13 = $.$.$2.m;
        $.goto = 15;
        $p = ($M.context.call = $.$$.$.$2)($.$.$2, ["b", "m"]);
        continue;

      case 15:
        $.$.$14 = $p;
        $.goto = 16;
        $p = ($M.context.call = $.$.$20)($.$.$0);
        continue;

      case 16:
        $.$.$16 = $p;
        $.goto = 17;
        $M.brk(100);
        continue;

      case 17:
        $.goto = 18;
        $p = ($M.context.call = $.$$.$.$0)($.$.$16, 3);
        continue;

      case 18:
        $.$.$17 = $p;
        $.goto = 19;
        $M.brk(101);
        continue;

      case 19:
        $.$.$5 = $.$.$17[1];
        $.goto = 20;
        $M.brk(102);
        continue;

      case 20:
        $.$.$6 = $.$.$17[2];
        $.goto = 21;
        $M.brk(103);
        continue;

      case 21:
        $.goto = 22;
        $p = ($M.context.call = eff_4)();
        continue;

      case 22:
        $.$.$18 = $p;
        $.goto = 23;
        $M.brk(104);
        continue;

      case 23:
        $.goto = 24;
        $p = ($M.context.call = $.$$.$.$4)($.$.$18);
        continue;

      case 24:
        $.$.$19 = $p;
        $.goto = 25;
        $M.brk(105);
        continue;

      case 25:
        $.$.$5 = $.$.$19[0];
        $.goto = 26;
        $M.brk(106);
        continue;

      case 26:
        $.goto = 27;
        $p = ($M.context.call = $.$.$19.slice).dbg$call($.$.$19, 1);
        continue;

      case 27:
        $.$.$7 = $p;
        return $M.ret();

      case 28:
        return $M.ret($.value);

      case 29:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$20], [null, "s", $s$20], ["88:26-88:33", "e", $s$20], [null, "e", $s$20], [null, "e", $s$20], [null, "s", $s$20], ["91:6-91:12", "e", $s$20], [null, "e", $s$20], [null, "e", $s$20], [null, "e", $s$20], [null, "s", $s$20], ["92:13-92:20", "e", $s$20], ["95:8-95:14", "e", $s$20], [null, "e", $s$20], [null, "e", $s$20], ["92:13-96:3", "e", $s$20], [null, "s", $s$20], [null, "e", $s$20], [null, "s", $s$20], [null, "s", $s$20], [null, "s", $s$20], ["97:17-97:24", "e", $s$20], [null, "s", $s$20], [null, "e", $s$20], [null, "s", $s$20], [null, "s", $s$20], [null, "e", $s$20], [], [], []]);
module.exports = $M.exports();