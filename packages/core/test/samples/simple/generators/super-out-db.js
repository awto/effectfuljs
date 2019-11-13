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
  _A: "$0",
  B: "$1",
  _proto2: "$2"
}, $s$3, false],
    $s$5 = [{
  method: "$0"
}, $s$4, false],
    $s$6 = [{
  smethod: "$0"
}, $s$4, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c._inheritsLoose($);
        $.$.$1 = $c.aa($);
        $.goto = 1;
        ($M.context.call = M.profile).dbg$call(M, "es");
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
}, null, null, [["1:0-1:15", "e", $s$1], [], [], []]);
$M.fun("m$1", "_inheritsLoose", "m$0", ["subClass", "superClass"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = Object.create).dbg$call(Object, $.$.$1.prototype);
        continue;

      case 1:
        $.$.$0.prototype = $p;
        $.$.$0.prototype.constructor = $.$.$0;
        $.$.$0.__proto__ = $.$.$1;
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$2], [], [], []]);
$M.fun("m$2", "aa", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p =
        /*#__PURE__*/
        ($M.context.call = $c.f($))();
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p =
        /*#__PURE__*/
        ($M.context.call = $c.f($))($.$.$0);
        continue;

      case 2:
        $.$.$1 = $p;
        return $M.retA();

      case 3:
        return $M.retA($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$3], [null, "e", $s$3], [], [], []]);
$M.fun("m$3", null, "m$2", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.A($);
        $.$.$1 = $.$.$0.prototype;
        $.$.$1.method = $c.method($);
        $.$.$0.smethod = $c.smethod($);
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
        return $M.retA("from A");

      case 1:
        return $M.retA($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$6", "smethod", "m$3", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        return $M.retA("static from A");

      case 1:
        return $M.retA($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$7", null, "m$2", ["_A"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.B($);
        $.goto = 1;
        ($M.context.call = $.$$.$.$0)($.$.$1, $.$.$0);
        continue;

      case 1:
        $.$.$2 = $.$.$1.prototype;
        $.$.$2.method = $c.method($);
        $.$.$1.smethod = $c.smethod($);
        return $M.ret($.$.$1);

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$4], [], [], []]);
$M.fun("m$8", "B", "m$7", [], 24, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = $.$$.$.$0.apply).dbg$call($.$$.$.$0, $.self, $.args);
        continue;

      case 1:
        $.value = $p;

        if (r) {
          $.state = 2;
        } else {
          $.value = $.self;
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
}, null, null, [[null, "e", $s$4], [], [], [], []]);
$M.fun("m$9", "method", "m$7", [], 9, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $0 = $.$$.$.$0.prototype.method;
        $.goto = 1;
        $p = ($M.context.call = $0.call).dbg$call($0, $.self);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.awt($p);
        continue;

      case 2:
        return $M.retA("from B " + $p);

      case 3:
        return $M.retA($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$5], [null, null, null], [], [], []]);
$M.fun("m$10", "smethod", "m$7", [], 9, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $0 = $.$$.$.$0.method;
        $.goto = 1;
        $p = ($M.context.call = $0.call).dbg$call($0, $.self);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.awt($p);
        continue;

      case 2:
        return $M.retA("static from B " + $p);

      case 3:
        return $M.retA($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$6], [null, null, null], [], [], []]);
module.exports = $M.exports();