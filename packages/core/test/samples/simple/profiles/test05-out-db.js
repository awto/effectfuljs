var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  a: "$0",
  b: "$1"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
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
$M.fun("m$1", "a", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$1 = $c.b($);
        $.goto = 1;
        ($M.context.call = M.profile).dbg$call(M, "defaultFull");
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = p1)();
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = p2)();
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = M.profile).dbg$call(M, "defaultMinimal");
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = p2)();
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = p3)();
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
}, null, null, [["2:2-2:26", "e", $s$2], ["3:2-3:6", "e", $s$2], ["4:2-4:6", "e", $s$2], ["10:2-10:29", "e", $s$2], ["11:2-11:6", "e", $s$2], ["12:2-12:6", "e", $s$2], [], [], []]);
$M.fun("m$2", "a", "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = console.log).dbg$call(console, "hi");
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = e1)();
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = e2)();
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
}, null, null, [["6:4-6:21", "e", $s$2], ["7:4-7:8", "e", $s$2], ["8:4-8:8", "e", $s$2], [], [], []]);
$M.fun("m$3", "b", "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = p4)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = p5)();
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = e1)();
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = M)($p);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = e)(2);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = M)($p);
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
}, null, null, [["14:4-14:8", "e", $s$2], ["15:4-15:8", "e", $s$2], ["16:6-16:10", "e", $s$2], ["16:4-16:11", "e", $s$2], ["17:6-17:10", "e", $s$2], ["17:4-17:11", "e", $s$2], [], [], []]);
module.exports = $M.exports();