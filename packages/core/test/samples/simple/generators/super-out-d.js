var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  _inheritsLoose: "$0",
  aa: "$1"
}, null, false],
    $s$2 = [{
  subClass: "$0",
  superClass: "$1"
}, $s$1, false],
    $s$3 = [{
  A: "$0",
  B: "$1"
}, $s$1, false],
    $s$4 = [{
  A: "$0",
  _proto: "$1"
}, $s$3, false],
    $s$5 = [{
  method: "$0"
}, $s$4, false],
    $s$6 = [{
  smethod: "$0"
}, $s$4, false],
    $s$7 = [{
  _A: "$0",
  B: "$1",
  _proto2: "$2"
}, $s$3, false],
    $s$8 = [{
  method: "$0"
}, $s$7, false],
    $s$9 = [{
  smethod: "$0"
}, $s$7, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c._inheritsLoose($);
        $.$.$1 = $c.aa($);
        $.goto = 1;
        $M.brk(3);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = M.profile).dbg$call(M, "es");
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
}, null, null, [["1:0-1:16", "s", $s$1], ["1:0-1:15", "e", $s$1], [], [], []]);
$M.fun("m$1", "_inheritsLoose", "m$0", ["subClass", "superClass"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = Object.create).dbg$call(Object, $.$.$1.prototype);
        continue;

      case 2:
        $.$.$0.prototype = $p;
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.$.$0.prototype.constructor = $.$.$0;
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        $.$.$0.__proto__ = $.$.$1;
        return $M.ret();

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$2], [null, "e", $s$2], [null, "s", $s$2], [null, "s", $s$2], [], [], []]);
$M.fun("m$2", "aa", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(4);
        continue;

      case 1:
        $.goto = 2;
        $p =
        /*#__PURE__*/
        ($M.context.call = $c.f($))();
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        $M.brk(11);
        continue;

      case 3:
        $.goto = 4;
        $p =
        /*#__PURE__*/
        ($M.context.call = $c.f($))($.$.$0);
        continue;

      case 4:
        $.$.$1 = $p;
        return $M.retA();

      case 5:
        return $M.retA($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$3], [null, "e", $s$3], [null, "s", $s$3], [null, "e", $s$3], [], [], []]);
$M.fun("m$3", null, "m$2", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.A($);
        $.goto = 1;
        $M.brk(5);
        continue;

      case 1:
        $.$.$1 = $.$.$0.prototype;
        $.goto = 2;
        $M.brk(6);
        continue;

      case 2:
        $.$.$1.method = $c.method($);
        $.goto = 3;
        $M.brk(8);
        continue;

      case 3:
        $.$.$0.smethod = $c.smethod($);
        $.goto = 4;
        $M.brk(10);
        continue;

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
}, null, null, [[null, "s", $s$4], [null, "s", $s$4], [null, "s", $s$4], [null, "s", $s$4], [], [], []]);
$M.fun("m$4", "A", "m$3", [], 0, function () {
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
$M.fun("m$5", "method", "m$3", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(7);
        continue;

      case 1:
        return $M.retA("from A");

      case 2:
        return $M.retA($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["6:6-6:22", "s", $s$5], [], [], []]);
$M.fun("m$6", "smethod", "m$3", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(9);
        continue;

      case 1:
        return $M.retA("static from A");

      case 2:
        return $M.retA($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["9:6-9:29", "s", $s$6], [], [], []]);
$M.fun("m$7", null, "m$2", ["_A"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.B($);
        $.goto = 1;
        $M.brk(12);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = $.$$.$.$0)($.$.$1, $.$.$0);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(14);
        continue;

      case 3:
        $.$.$2 = $.$.$1.prototype;
        $.goto = 4;
        $M.brk(15);
        continue;

      case 4:
        $.$.$2.method = $c.method($);
        $.goto = 5;
        $M.brk(17);
        continue;

      case 5:
        $.$.$1.smethod = $c.smethod($);
        $.goto = 6;
        $M.brk(19);
        continue;

      case 6:
        return $M.ret($.$.$1);

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$7], [null, "e", $s$7], [null, "s", $s$7], [null, "s", $s$7], [null, "s", $s$7], [null, "s", $s$7], [], [], []]);
$M.fun("m$8", "B", "m$7", [], 24, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(13);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = $.$$.$.$0.apply).dbg$call($.$$.$.$0, $.self, $.args);
        continue;

      case 2:
        $.value = $p;

        if (r) {
          $.state = 3;
        } else {
          $.value = $.self;
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
}, null, null, [[null, "s", $s$7], [null, "e", $s$7], [], [], [], []]);
$M.fun("m$9", "method", "m$7", [], 9, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(16);
        continue;

      case 1:
        $0 = $.$$.$.$0.prototype.method;
        $.goto = 2;
        $p = ($M.context.call = $0.call).dbg$call($0, $.self);
        continue;

      case 2:
        $.goto = 3;
        $p = $M.awt($p);
        continue;

      case 3:
        return $M.retA("from B " + $p);

      case 4:
        return $M.retA($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["15:6-15:48", "s", $s$8], [null, "e", $s$8], [null, null, null], [], [], []]);
$M.fun("m$10", "smethod", "m$7", [], 9, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(18);
        continue;

      case 1:
        $0 = $.$$.$.$0.method;
        $.goto = 2;
        $p = ($M.context.call = $0.call).dbg$call($0, $.self);
        continue;

      case 2:
        $.goto = 3;
        $p = $M.awt($p);
        continue;

      case 3:
        return $M.retA("static from B " + $p);

      case 4:
        return $M.retA($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["18:6-18:55", "s", $s$9], [null, "e", $s$9], [null, null, null], [], [], []]);
module.exports = $M.exports();