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
  source: "$0",
  excluded: "$1",
  target: "$2",
  key: "$3",
  i: "$4",
  sourceSymbolKeys: "$5"
}, $s$1, false],
    $s$5 = [{
  source: "$0",
  excluded: "$1",
  target: "$2",
  sourceKeys: "$3",
  key: "$4",
  i: "$5"
}, $s$1, false],
    $s$6 = [{
  arr: "$0"
}, $s$1, false],
    $s$7 = [{
  iter: "$0"
}, $s$1, false],
    $s$8 = [{
  arr: "$0"
}, $s$1, false],
    $s$9 = [{
  b1: "$0"
}, $s$1, false],
    $s$10 = [{
  b1: "$0"
}, $s$1, false],
    $s$11 = [{
  a: "$0"
}, $s$1, false],
    $s$12 = [{
  b1: "$0",
  b2: "$1"
}, $s$1, false],
    $s$13 = [{
  b1: "$0",
  b2: "$1"
}, $s$1, false],
    $s$14 = [{
  a: "$0",
  c: "$1"
}, $s$1, false],
    $s$15 = [{
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
    $s$16 = [{
  cc: "$0"
}, $s$1, false],
    $s$17 = [{
  cc: "$0"
}, $s$1, false],
    $s$18 = [{
  cc: "$1"
}, $s$17, false],
    $s$19 = [{
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
        exports.a = $.$.$9;
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
$M.fun("m$1", "_slicedToArray", "m$0", ["arr", "i"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = $.$$.$.$7)($.$.$0);
        continue;

      case 1:
        $.value = $p;

        if (r) {
          $.state = 2;
        } else {
          $.goto = 3;
          $p = ($M.context.call = $.$$.$.$1)($.$.$0, $.$.$1);
          continue;
        }

      case 2:
        if (r) {
          $.goto = 4;
          continue;
        } else {
          $.goto = 5;
          $p = ($M.context.call = $.$$.$.$5)();
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
}, null, null, [[null, "e", $s$2], [null, "e", $s$2], [null, "e", $s$2], [], [], [], [], []]);
$M.fun("m$2", "_iterableToArrayLimit", "m$0", ["arr", "i"], 0, function () {
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
}, [[null, "e", $s$3], [], [], [], [null, "e", $s$3], [], [], [], [null, "e", $s$3], [], [null, "e", $s$3], [null, "e", $s$3], [], [], [], [], [], [], [], [null, "e", $s$3], [], [], [], []]);
$M.fun("m$3", "_objectWithoutProperties", "m$0", ["source", "excluded"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        if ($.$.$0 == null) {
          return $M.ret({});
        } else {
          $.state = 1;
        }

      case 1:
        $.goto = 2;
        $p = ($M.context.call = $.$$.$.$3)($.$.$0, $.$.$1);
        continue;

      case 2:
        $.$.$2 = $p;

        if (Object.getOwnPropertySymbols) {
          $.goto = 4;
          $p = ($M.context.call = Object.getOwnPropertySymbols).dbg$call(Object, $.$.$0);
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        return $M.ret($.$.$2);

      case 4:
        $.$.$5 = $p;
        $.$.$4 = 0;
        $.state = 5;

      case 5:
        if ($.$.$4 < $.$.$5.length) {
          $.$.$3 = $.$.$5[$.$.$4];
          $.goto = 6;
          $p = ($M.context.call = $.$.$1.indexOf).dbg$call($.$.$1, $.$.$3);
          continue;
        } else {
          $.goto = 3;
          continue;
        }

      case 6:
        if ($p >= 0) {
          $.goto = 10;
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        $0 = Object.prototype.propertyIsEnumerable;
        $.goto = 8;
        $p = ($M.context.call = $0.call).dbg$call($0, $.$.$0, $.$.$3);
        continue;

      case 8:
        if (!$p) {
          $.goto = 10;
          continue;
        } else {
          $.state = 9;
        }

      case 9:
        $.$.$2[$.$.$3] = $.$.$0[$.$.$3];
        $.state = 10;

      case 10:
        $.$.$4++;
        $.goto = 5;
        continue;

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [null, "e", $s$4], [null, "e", $s$4], [], [], [null, "e", $s$4], [], [null, "e", $s$4], [], [], [], [], []]);
$M.fun("m$4", "_objectWithoutPropertiesLoose", "m$0", ["source", "excluded"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        if ($.$.$0 == null) {
          return $M.ret({});
        } else {
          $.state = 1;
        }

      case 1:
        $.$.$2 = {};
        $.goto = 2;
        $p = ($M.context.call = Object.keys).dbg$call(Object, $.$.$0);
        continue;

      case 2:
        $.$.$3 = $p;
        $.$.$5 = 0;
        $.state = 3;

      case 3:
        if ($.$.$5 < $.$.$3.length) {
          $.$.$4 = $.$.$3[$.$.$5];
          $.goto = 4;
          $p = ($M.context.call = $.$.$1.indexOf).dbg$call($.$.$1, $.$.$4);
          continue;
        } else {
          return $M.ret($.$.$2);
        }

      case 4:
        if ($p >= 0) {
          $.goto = 6;
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.$.$2[$.$.$4] = $.$.$0[$.$.$4];
        $.state = 6;

      case 6:
        $.$.$5++;
        $.goto = 3;
        continue;

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [null, "e", $s$5], [], [null, "e", $s$5], [], [], [], [], []]);
$M.fun("m$5", "_toArray", "m$0", ["arr"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = $.$$.$.$7)($.$.$0);
        continue;

      case 1:
        $.value = $p;

        if (r) {
          $.state = 2;
        } else {
          $.goto = 3;
          $p = ($M.context.call = $.$$.$.$6)($.$.$0);
          continue;
        }

      case 2:
        if (r) {
          $.goto = 4;
          continue;
        } else {
          $.goto = 5;
          $p = ($M.context.call = $.$$.$.$5)();
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
}, null, null, [[null, "e", $s$6], [null, "e", $s$6], [null, "e", $s$6], [], [], [], [], []]);
$M.fun("m$6", "_nonIterableRest", "m$0", [], 0, function () {
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
$M.fun("m$7", "_iterableToArray", "m$0", ["iter"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = Symbol.iterator;
        $.goto = 1;
        $p = ($M.context.call = Object)($.$.$0);
        continue;

      case 1:
        $.$.$1 = $.$.$1 in $p;

        if ($.$.$1) {
          $.state = 2;
        } else {
          $0 = Object.prototype.toString;
          $.goto = 3;
          $p = ($M.context.call = $0.call).dbg$call($0, $.$.$0);
          continue;
        }

      case 2:
        if ($.$.$1) {
          $.goto = 5;
          $p = ($M.context.call = Array.from).dbg$call(Array, $.$.$0);
          continue;
        } else {
          $.goto = 4;
          continue;
        }

      case 3:
        $.$.$1 = $p === "[object Arguments]";
        $.goto = 2;
        continue;

      case 4:
        return $M.ret();

      case 5:
        return $M.ret($p);

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$7], [null, "e", $s$7], [null, "e", $s$7], [], [], [], [], []]);
$M.fun("m$8", "_arrayWithHoles", "m$0", ["arr"], 0, function () {
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
}, null, null, [[null, "e", $s$8], [], [], [], []]);
$M.fun("m$9", "aS", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        ($M.context.call = eff)("a");
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)("b");
        continue;

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
}, null, null, [["2:11-2:17", "e", $s$9], ["3:2-3:10", "e", $s$9], ["4:2-4:10", "e", $s$9], [], [], []]);
$M.fun("m$10", "a", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = 0;
        $.goto = 1;
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        ($M.context.call = eff)("a");
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)("b");
        continue;

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
}, null, null, [["11:7-11:13", "e", $s$10], ["12:2-12:10", "e", $s$10], ["13:2-13:10", "e", $s$10], [], [], []]);
$M.fun("m$11", "a1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        ($M.context.call = eff)("a");
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)("b");
        continue;

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
}, null, null, [["18:6-18:12", "e", $s$11], ["19:2-19:10", "e", $s$11], ["20:2-20:10", "e", $s$11], [], [], []]);
$M.fun("m$12", "bS", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = ($M.context.call = eff)(2);
        continue;

      case 2:
        $.$.$1 = $p;
        $.goto = 3;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)($.$.$1);
        continue;

      case 4:
        return $M.ret();

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["24:11-24:17", "e", $s$12], ["25:9-25:15", "e", $s$12], ["26:2-26:9", "e", $s$12], ["27:2-27:9", "e", $s$12], [], [], []]);
$M.fun("m$13", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = ($M.context.call = eff)(2);
        continue;

      case 2:
        $.$.$1 = $p;
        $.goto = 3;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)($.$.$1);
        continue;

      case 4:
        $.$.$0 = $.$.$1 = 100;
        return $M.ret();

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["31:11-31:17", "e", $s$13], ["32:9-32:15", "e", $s$13], ["33:2-33:9", "e", $s$13], ["34:2-34:9", "e", $s$13], [], [], []]);
$M.fun("m$14", "b1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = ($M.context.call = eff)(2);
        continue;

      case 2:
        $.$.$1 = $p;
        $.goto = 3;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)($.$.$1);
        continue;

      case 4:
        return $M.ret();

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["40:7-40:13", "e", $s$14], ["40:21-40:27", "e", $s$14], ["41:2-41:8", "e", $s$14], ["42:2-42:8", "e", $s$14], [], [], []]);
$M.fun("m$15", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        $.$.$0 = $p;
        $.$.$1 = 2;
        $.goto = 2;
        $p = ($M.context.call = eff)(3);
        continue;

      case 2:
        $.$.$2 = $p;
        $.goto = 3;
        ($M.context.call = eff)("a");
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)("b");
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff)(4);
        continue;

      case 5:
        $.$.$3 = $p;
        $.$.$4 = 5;
        $.goto = 6;
        $p = ($M.context.call = eff)(6);
        continue;

      case 6:
        $.$.$5 = $p;
        $.goto = 7;
        $p = ($M.context.call = eff)(7);
        continue;

      case 7:
        $.$.$6 = $p;
        $.$.$7 = 8;
        $.goto = 8;
        $p = ($M.context.call = eff)("x");
        continue;

      case 8:
        $.$.$8 = $p;
        $.$.$9 = "y";
        $.goto = 9;
        $p = ($M.context.call = eff)("z");
        continue;

      case 9:
        $.$.$10 = $p;
        $.goto = 10;
        ($M.context.call = eff)(9);
        continue;

      case 10:
        $.$.$0 = $.$.$1 = $.$.$2 = $.$.$3 = $.$.$4 = $.$.$5 = $.$.$6 = $.$.$7 = $.$.$8 = $.$.$9 = $.$.$10 = 1000;
        $.goto = 11;
        ($M.context.call = eff)(10);
        continue;

      case 11:
        return $M.ret();

      case 12:
        return $M.ret($.value);

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["46:10-46:16", "e", $s$15], ["48:8-48:14", "e", $s$15], ["49:2-49:10", "e", $s$15], ["50:2-50:10", "e", $s$15], ["51:10-51:16", "e", $s$15], ["53:8-53:14", "e", $s$15], ["54:8-54:14", "e", $s$15], ["56:10-56:18", "e", $s$15], ["58:8-58:16", "e", $s$15], ["59:2-59:8", "e", $s$15], ["61:2-61:9", "e", $s$15], [], [], []]);
$M.fun("m$16", "d", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff1)("a");
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = ($M.context.call = eff)(2);
        continue;

      case 2:
        $.$.$0.some = $p;
        $.goto = 3;
        $p = ($M.context.call = eff)("b");
        continue;

      case 3:
        $.$.$0 = $p;
        $.goto = 4;
        $p = ($M.context.call = eff)(3);
        continue;

      case 4:
        $.$.$0.some += $p;
        $.goto = 5;
        $p = ($M.context.call = eff)("c");
        continue;

      case 5:
        $p.some++;
        some["d"]--;
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["65:2-65:11", "e", $s$1], ["65:19-65:25", "e", $s$1], ["66:2-66:10", "e", $s$1], ["66:19-66:25", "e", $s$1], ["67:2-67:10", "e", $s$1], [], [], []]);
$M.fun("m$17", "e1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(1, $.$.$0);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = ($M.context.call = eff)(2, $.$.$0);
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        ($M.context.call = eff)(2, $.$.$0);
        continue;

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
}, null, null, [["71:11-71:21", "e", $s$16], ["72:7-72:17", "e", $s$16], ["73:2-73:12", "e", $s$16], [], [], []]);
$M.fun("m$18", "e2", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(1, $.$.$0);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = ($M.context.call = eff)(2, $.$.$0);
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        ($M.context.call = eff)(3, $.$.$0);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)(4, $.$.$1);
        continue;

      case 4:
        $.$.$1 = $p;
        $.goto = 5;
        $p = ($M.context.call = eff)(5, $.$.$1);
        continue;

      case 5:
        $.$.$1 = $p;
        $.goto = 6;
        ($M.context.call = eff)(6, $.$.$1);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(7, $.$.$0);
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
}, null, null, [["76:11-76:21", "e", $s$17], ["77:7-77:17", "e", $s$17], ["78:2-78:12", "e", $s$17], ["80:15-80:25", "e", $s$18], ["81:9-81:19", "e", $s$18], ["82:4-82:14", "e", $s$18], ["84:2-84:12", "e", $s$17], [], [], []]);
$M.fun("m$19", "es6", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff_1)();
        continue;

      case 1:
        $.$.$3 = $p;
        $.goto = 2;
        $p = ($M.context.call = $.$$.$.$4)($.$.$3);
        continue;

      case 2:
        $.$.$4 = $p;
        $.$.$5 = $.$.$4[1];
        $.$.$6 = $.$.$4[2];
        $.goto = 3;
        $p = ($M.context.call = $.$.$4.slice).dbg$call($.$.$4, 3);
        continue;

      case 3:
        $.$.$7 = $p;
        $.goto = 4;
        $p = ($M.context.call = eff)(2);
        continue;

      case 4:
        $.$.$8 = $p;
        $.goto = 5;
        $p = ($M.context.call = $.$$.$.$4)($.$.$8.m);
        continue;

      case 5:
        $.$.$9 = $p;
        $.$.$10 = $.$.$9[0];
        $.$.$11 = $.$.$9[1];
        $.$.$12 = $.$.$11.b;
        $.$.$13 = $.$.$11.m;
        $.goto = 6;
        $p = ($M.context.call = $.$$.$.$2)($.$.$11, ["b", "m"]);
        continue;

      case 6:
        $.$.$14 = $p;
        $.goto = 7;
        $p = ($M.context.call = $.$.$9.slice).dbg$call($.$.$9, 2);
        continue;

      case 7:
        $.$.$15 = $p;
        $.goto = 8;
        $p = ($M.context.call = eff_1)();
        continue;

      case 8:
        $.$.$20 = $p;
        $.goto = 9;
        $p = ($M.context.call = eff)(2);
        continue;

      case 9:
        $.$.$0 = $p;
        $.goto = 10;
        $p = ($M.context.call = $.$$.$.$0)($.$.$0.m, 2);
        continue;

      case 10:
        $.$.$1 = $p;
        $.$.$10 = $.$.$1[0];
        $.$.$2 = $.$.$1[1];
        $.$.$12 = $.$.$2.b;
        $.$.$13 = $.$.$2.m;
        $.goto = 11;
        $p = ($M.context.call = $.$$.$.$2)($.$.$2, ["b", "m"]);
        continue;

      case 11:
        $.$.$14 = $p;
        $.goto = 12;
        $p = ($M.context.call = $.$.$20)($.$.$0);
        continue;

      case 12:
        $.$.$16 = $p;
        $.goto = 13;
        $p = ($M.context.call = $.$$.$.$0)($.$.$16, 3);
        continue;

      case 13:
        $.$.$17 = $p;
        $.$.$5 = $.$.$17[1];
        $.$.$6 = $.$.$17[2];
        $.goto = 14;
        $p = ($M.context.call = eff_4)();
        continue;

      case 14:
        $.$.$18 = $p;
        $.goto = 15;
        $p = ($M.context.call = $.$$.$.$4)($.$.$18);
        continue;

      case 15:
        $.$.$19 = $p;
        $.$.$5 = $.$.$19[0];
        $.goto = 16;
        $p = ($M.context.call = $.$.$19.slice).dbg$call($.$.$19, 1);
        continue;

      case 16:
        $.$.$7 = $p;
        return $M.ret();

      case 17:
        return $M.ret($.value);

      case 18:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["88:26-88:33", "e", $s$19], [null, "e", $s$19], [null, "e", $s$19], ["91:6-91:12", "e", $s$19], [null, "e", $s$19], [null, "e", $s$19], [null, "e", $s$19], ["92:13-92:20", "e", $s$19], ["95:8-95:14", "e", $s$19], [null, "e", $s$19], [null, "e", $s$19], ["92:13-96:3", "e", $s$19], [null, "e", $s$19], ["97:17-97:24", "e", $s$19], [null, "e", $s$19], [null, "e", $s$19], [], [], []]);
module.exports = $M.exports();