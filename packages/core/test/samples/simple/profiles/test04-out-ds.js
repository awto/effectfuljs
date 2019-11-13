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
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $M.mcall("log", console, "hi");
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = e1)();
        continue;

      case 4:
        $.goto = 5;
        $M.brk(2);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = e2)();
        continue;

      case 6:
        $.goto = 7;
        $M.brk(3);
        continue;

      case 7:
        $.goto = 8;
        $M.mcall("profile", M, "minimal");
        continue;

      case 8:
        $.goto = 9;
        $M.brk(4);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = p1)();
        continue;

      case 10:
        $.goto = 11;
        $M.brk(5);
        continue;

      case 11:
        $.goto = 12;
        $M.mcall("profile", console, "minimal");
        continue;

      case 12:
        $.goto = 13;
        $M.brk(6);
        continue;

      case 13:
        $.goto = 14;
        ($M.context.call = p2)();
        continue;

      case 14:
        $.goto = 15;
        $M.brk(7);
        continue;

      case 15:
        $.goto = 16;
        $M.mcall("profileEnd", console);
        continue;

      case 16:
        $.goto = 17;
        $M.brk(8);
        continue;

      case 17:
        $.goto = 18;
        $p = ($M.context.call = e1)();
        continue;

      case 18:
        $.goto = 19;
        ($M.context.call = M)($p);
        continue;

      case 19:
        $.goto = 20;
        $M.brk(9);
        continue;

      case 20:
        $.goto = 21;
        $p = ($M.context.call = e)(2);
        continue;

      case 21:
        $.goto = 22;
        ($M.context.call = M)($p);
        continue;

      case 22:
        return $M.ret();

      case 23:
        return $M.ret($.value);

      case 24:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:20", "s", $s$1], ["2:2-2:19", "e", $s$1], ["3:2-3:7", "s", $s$1], ["3:2-3:6", "e", $s$1], ["4:2-4:7", "s", $s$1], ["4:2-4:6", "e", $s$1], ["5:2-5:23", "s", $s$1], ["5:2-5:22", "e", $s$1], ["6:2-6:7", "s", $s$1], ["6:2-6:6", "e", $s$1], ["7:2-7:29", "s", $s$1], ["7:2-7:28", "e", $s$1], ["8:2-8:7", "s", $s$1], ["8:2-8:6", "e", $s$1], ["9:2-9:23", "s", $s$1], ["9:2-9:22", "e", $s$1], ["10:2-10:10", "s", $s$1], ["10:4-10:8", "e", $s$1], ["10:2-10:9", "e", $s$1], ["11:2-11:10", "s", $s$1], ["11:4-11:8", "e", $s$1], ["11:2-11:9", "e", $s$1], [], [], []]);
module.exports = $M.exports();