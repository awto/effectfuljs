var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false];
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
        $.goto = 4;
        ($M.context.call = M.profile).dbg$call(M, "minimal");
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = p1)();
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = console.profile).dbg$call(console, "minimal");
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = p2)();
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = console.profileEnd).dbg$call(console);
        continue;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = e1)();
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = M)($p);
        continue;

      case 10:
        $.goto = 11;
        $p = ($M.context.call = e)(2);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = M)($p);
        continue;

      case 12:
        return $M.ret();

      case 13:
        return $M.ret($.value);

      case 14:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:19", "e", $s$1], ["3:2-3:6", "e", $s$1], ["4:2-4:6", "e", $s$1], ["5:2-5:22", "e", $s$1], ["6:2-6:6", "e", $s$1], ["7:2-7:28", "e", $s$1], ["8:2-8:6", "e", $s$1], ["9:2-9:22", "e", $s$1], ["10:4-10:8", "e", $s$1], ["10:2-10:9", "e", $s$1], ["11:4-11:8", "e", $s$1], ["11:2-11:9", "e", $s$1], [], [], []]);
module.exports = $M.exports();