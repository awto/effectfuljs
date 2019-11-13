var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  _defineProperties: "$0",
  _createClass: "$1",
  _require: "$2",
  mod: "$3",
  C: "$4",
  Cl: "$5",
  obj1: "$6"
}, null, false],
    $s$2 = [{
  target: "$0",
  props: "$1",
  i: "$2",
  descriptor: "$3"
}, $s$1, false],
    $s$3 = [{
  Constructor: "$0",
  protoProps: "$1",
  staticProps: "$2"
}, $s$1, false],
    $s$4 = [{
  a: "$0"
}, $s$1, false],
    $s$5 = [{
  e: "$1"
}, $s$4, false],
    $s$6 = [{
  Cl: "$0",
  _proto: "$1"
}, $s$1, false],
    $s$7 = [{
  func: "$0"
}, $s$6, false],
    $s$8 = [{
  func: "$0"
}, $s$6, false],
    $s$9 = [{
  value: "$0"
}, $s$6, false],
    $s$10 = [{
  a: "$0"
}, $s$1, false],
    $s$11 = [{
  fn1: "$0"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c._defineProperties($);
        $.$.$4 = $c.C($);
        $.$.$1 = $c._createClass($);
        $.goto = 1;
        $M.brk(12);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.evalDir("mod");
        continue;

      case 2:
        $.$.$2 = $p;
        $.$.$3 = $.$.$2.mod;
        $.goto = 3;
        $M.brk(17);
        continue;

      case 3:
        $.goto = 4;
        $p =
        /*#__PURE__*/
        ($M.context.call = $c.f($))();
        continue;

      case 4:
        $.$.$5 = $p;
        $.goto = 5;
        $M.brk(28);
        continue;

      case 5:
        $.$.$6 = {
          objFn: $c.f($)
        };
        $.goto = 6;
        $M.brk(30);
        continue;

      case 6:
        $M.set(exports, "fn2", $c.fn1($));
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$1], ["1:16-1:30", "e", $s$1], [null, "s", $s$1], [null, "e", $s$1], ["30:0-34:2", "s", $s$1], ["36:0-38:2", "s", $s$1], [], [], []]);
$M.fun("m$1", "_defineProperties", "m$0", ["target", "props"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.$.$2 = 0;
        $.state = 2;

      case 2:
        if ($.$.$2 < $.$.$1.length) {
          $.goto = 3;
          $M.brk(1);
          continue;
        } else {
          return $M.ret();
        }

      case 3:
        $.$.$3 = $.$.$1[$.$.$2];
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        $0 = $.$.$3.enumerable;

        if ($0) {
          $.state = 5;
        } else {
          $0 = false;
          $.state = 5;
        }

      case 5:
        $M.set($.$.$3, "enumerable", $0);
        $.goto = 6;
        $M.brk(3);
        continue;

      case 6:
        $M.set($.$.$3, "configurable", true);
        $.goto = 7;
        $M.brk(4);
        continue;

      case 7:
        if ("value" in $.$.$3) {
          $.goto = 11;
          $M.brk(5);
          continue;
        } else {
          $.state = 8;
        }

      case 8:
        $.goto = 9;
        $M.brk(6);
        continue;

      case 9:
        $.goto = 10;
        $M.mcall("defineProperty", Object, $.$.$0, $.$.$3.key, $.$.$3);
        continue;

      case 10:
        $M.lset($.$, "i", $.$.$2 + 1);
        $.goto = 2;
        continue;

      case 11:
        $M.set($.$.$3, "writable", true);
        $.goto = 8;
        continue;

      case 12:
        return $M.ret($.value);

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$2], [], [null, "s", $s$2], [null, "s", $s$2], [], [null, "s", $s$2], [null, "s", $s$2], [null, "s", $s$2], [null, "s", $s$2], [null, "e", $s$2], [], [], [], []]);
$M.fun("m$2", "_createClass", "m$0", ["Constructor", "protoProps", "staticProps"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(7);
        continue;

      case 1:
        if ($.$.$1) {
          $.goto = 7;
          $M.brk(8);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        $M.brk(9);
        continue;

      case 3:
        if ($.$.$2) {
          $.goto = 6;
          $M.brk(10);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.goto = 5;
        $M.brk(11);
        continue;

      case 5:
        return $M.ret($.$.$0);

      case 6:
        $.goto = 4;
        ($M.context.call = $.$$.$.$0)($.$.$0, $.$.$2);
        continue;

      case 7:
        $.goto = 2;
        ($M.context.call = $.$$.$.$0)($.$.$0.prototype, $.$.$1);
        continue;

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [], [null, "e", $s$3], [null, "e", $s$3], [], []]);
$M.fun("m$3", "C", "m$0", ["a"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(13);
        continue;

      case 1:
        $1 = $.value;
        $.goto = 8;
        $M.brk(16);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(14);
        continue;

      case 3:
        $.goto = 4;
        $p = $M.mcall("fn1", $.$$.$.$3, $.$.$0);
        continue;

      case 4:
        $.goto = 5;
        $M.mcall("proc1", $.$$.$.$3, $p);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(15);
        continue;

      case 6:
        $.goto = 7;
        $M.mcall("proc2", $.$$.$.$3);
        continue;

      case 7:
        return $M.ret();

      case 8:
        $.goto = 7;
        $M.mcall("proc3", $.$$.$.$3, $.$.$1);
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      $.goto = 1;
      break;

    default:
      $.goto = 10;
      break;
  }
}, null, [["4:2-9:3", "s", $s$4], ["8:4-8:17", "s", $s$5], ["5:4-5:26", "s", $s$4], ["5:14-5:24", "e", $s$4], ["5:4-5:25", "e", $s$4], ["6:4-6:16", "s", $s$4], ["6:4-6:15", "e", $s$4], [], ["8:4-8:16", "e", $s$5], [], []]);
$M.fun("m$4", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.Cl($);
        $.goto = 1;
        $M.brk(19);
        continue;

      case 1:
        $.$.$1 = $.$.$0.prototype;
        $.goto = 2;
        $M.brk(20);
        continue;

      case 2:
        $M.set($.$.$1, "func", $c.func($));
        $.goto = 3;
        $M.brk(22);
        continue;

      case 3:
        $M.set($.$.$1, "func", $c.func($));
        $.goto = 4;
        $M.brk(24);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = $.$$.$.$1)($.$.$0, [{
          key: "prop1",
          get: $c.f($),
          set: $c.f($)
        }]);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(27);
        continue;

      case 6:
        return $M.ret($.$.$0);

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$6], [null, "s", $s$6], [null, "s", $s$6], [null, "s", $s$6], [null, "e", $s$6], [null, "s", $s$6], [], [], []]);
$M.fun("m$5", "Cl", "m$4", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(18);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = not_traced)();
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
}, null, null, [["14:4-14:17", "s", $s$6], ["14:4-14:16", "e", $s$6], [], [], []]);
$M.fun("m$6", "func", "m$4", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(21);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = not_traced)();
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
}, null, null, [["23:4-23:17", "s", $s$7], ["23:4-23:16", "e", $s$7], [], [], []]);
$M.fun("m$7", "func", "m$4", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(23);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = not_traced)($c.f($));
        continue;

      case 2:
        return $M.retG();

      case 3:
        return $M.retG($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["26:4-26:44", "s", $s$8], ["26:4-26:43", "e", $s$8], [], [], []]);
$M.fun("m$8", null, "m$7", [], 4, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = traced)(1);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = ($M.context.call = traced)(2);
        continue;

      case 2:
        return $M.ret($.$.$0 + $p);

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["26:21-26:30", "e", $s$8], ["26:33-26:42", "e", $s$8], [], [], []]);
$M.fun("m$9", null, "m$4", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(25);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = not_traced)();
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
}, null, null, [["17:4-17:17", "s", $s$6], ["17:4-17:16", "e", $s$6], [], [], []]);
$M.fun("m$10", null, "m$4", ["value"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(26);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = not_traced)();
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
}, null, null, [["20:4-20:17", "s", $s$9], ["20:4-20:16", "e", $s$9], [], [], []]);
$M.fun("m$11", null, "m$0", ["a"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(29);
        continue;

      case 1:
        $.goto = 2;
        $p = new ($M.context.call = $.$$.$.$5)();
        continue;

      case 2:
        $.goto = 3;
        $M.mcall("fn", $p, $.$.$0);
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
}, null, null, [["32:4-32:19", "s", $s$10], ["32:4-32:12", "e", $s$10], ["32:4-32:18", "e", $s$10], [], [], []]);
$M.fun("m$12", "fn1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(31);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.mcall("f2", $.$$.$.$3);
        continue;

      case 2:
        $.$.$1 = $p;
        $.goto = 3;
        $p = new ($M.context.call = $.$$.$.$4)();
        continue;

      case 3:
        $.goto = 4;
        $p = $M.mcall("some", $.$$.$.$3, {
          a: $.$.$1,
          b: [$p]
        });
        continue;

      case 4:
        return $M.ret($p);

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["37:2-37:49", "s", $s$11], ["37:23-37:31", "e", $s$11], ["37:37-37:44", "e", $s$11], ["37:9-37:48", "e", $s$11], [], [], []]);
module.exports = $M.exports();