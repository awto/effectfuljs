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
        $p = $M.evalDir("mod");
        continue;

      case 1:
        $.$.$2 = $p;
        $.$.$3 = $.$.$2.mod;
        $.goto = 2;
        $p =
        /*#__PURE__*/
        ($M.context.call = $c.f($))();
        continue;

      case 2:
        $.$.$5 = $p;
        $.$.$6 = {
          objFn: $c.f($)
        };
        exports.fn2 = $c.fn1($);
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:16-1:30", "e", $s$1], [null, "e", $s$1], [], [], []]);
$M.fun("m$1", "_defineProperties", "m$0", ["target", "props"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$2 = 0;
        $.state = 1;

      case 1:
        if ($.$.$2 < $.$.$1.length) {
          $.$.$3 = $.$.$1[$.$.$2];
          $0 = $.$.$3.enumerable;

          if ($0) {
            $.state = 2;
          } else {
            $0 = false;
            $.state = 2;
          }
        } else {
          return $M.ret();
        }

      case 2:
        $.$.$3.enumerable = $0;
        $.$.$3.configurable = true;

        if ("value" in $.$.$3) {
          $.$.$3.writable = true;
          $.state = 3;
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        ($M.context.call = Object.defineProperty).dbg$call(Object, $.$.$0, $.$.$3.key, $.$.$3);
        continue;

      case 4:
        $.$.$2++;
        $.goto = 1;
        continue;

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], [], [null, "e", $s$2], [], [], []]);
$M.fun("m$2", "_createClass", "m$0", ["Constructor", "protoProps", "staticProps"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        if ($.$.$1) {
          $.goto = 1;
          ($M.context.call = $.$$.$.$0)($.$.$0.prototype, $.$.$1);
          continue;
        } else {
          $.state = 1;
        }

      case 1:
        if ($.$.$2) {
          $.goto = 2;
          ($M.context.call = $.$$.$.$0)($.$.$0, $.$.$2);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        return $M.ret($.$.$0);

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$3], [null, "e", $s$3], [], [], []]);
$M.fun("m$3", "C", "m$0", ["a"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        continue;

      case 1:
        $1 = $.value;
        $.goto = 5;
        ($M.context.call = $.$$.$.$3.proc3).dbg$call($.$$.$.$3, $.$.$1);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = $.$$.$.$3.fn1).dbg$call($.$$.$.$3, $.$.$0);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = $.$$.$.$3.proc1).dbg$call($.$$.$.$3, $p);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = $.$$.$.$3.proc2).dbg$call($.$$.$.$3);
        continue;

      case 5:
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
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
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, null, [[], ["8:4-8:16", "e", $s$5], ["5:14-5:24", "e", $s$4], ["5:4-5:25", "e", $s$4], ["6:4-6:15", "e", $s$4], [], [], []]);
$M.fun("m$4", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.Cl($);
        $.$.$1 = $.$.$0.prototype;
        $.$.$1.func = $c.func($);
        $.$.$1.func = $c.func($);
        $.goto = 1;
        ($M.context.call = $.$$.$.$1)($.$.$0, [{
          key: "prop1",
          get: $c.f($),
          set: $c.f($)
        }]);
        continue;

      case 1:
        return $M.ret($.$.$0);

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$6], [], [], []]);
$M.fun("m$5", "Cl", "m$4", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = not_traced)();
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
}, null, null, [["14:4-14:16", "e", $s$6], [], [], []]);
$M.fun("m$6", "func", "m$4", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = not_traced)();
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
}, null, null, [["23:4-23:16", "e", $s$7], [], [], []]);
$M.fun("m$7", "func", "m$4", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = not_traced)($c.f($));
        continue;

      case 1:
        return $M.retG();

      case 2:
        return $M.retG($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["26:4-26:43", "e", $s$8], [], [], []]);
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
        ($M.context.call = not_traced)();
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
}, null, null, [["17:4-17:16", "e", $s$6], [], [], []]);
$M.fun("m$10", null, "m$4", ["value"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = not_traced)();
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
}, null, null, [["20:4-20:16", "e", $s$9], [], [], []]);
$M.fun("m$11", null, "m$0", ["a"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = new ($M.context.call = $.$$.$.$5)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = $p.fn).dbg$call($p, $.$.$0);
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
}, null, null, [["32:4-32:12", "e", $s$10], ["32:4-32:18", "e", $s$10], [], [], []]);
$M.fun("m$12", "fn1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = $.$$.$.$3.f2).dbg$call($.$$.$.$3);
        continue;

      case 1:
        $.$.$1 = $p;
        $.goto = 2;
        $p = new ($M.context.call = $.$$.$.$4)();
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = $.$$.$.$3.some).dbg$call($.$$.$.$3, {
          a: $.$.$1,
          b: [$p]
        });
        continue;

      case 3:
        return $M.ret($p);

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["37:23-37:31", "e", $s$11], ["37:37-37:44", "e", $s$11], ["37:9-37:48", "e", $s$11], [], [], []]);
module.exports = $M.exports();