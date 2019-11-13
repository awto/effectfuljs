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
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = M.profile).dbg$call(M, "defaultFull");
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = p1)();
        continue;

      case 4:
        $.goto = 5;
        $M.brk(2);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = p2)();
        continue;

      case 6:
        $.goto = 7;
        $M.brk(6);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = M.profile).dbg$call(M, "defaultMinimal");
        continue;

      case 8:
        $.goto = 9;
        $M.brk(7);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = p2)();
        continue;

      case 10:
        $.goto = 11;
        $M.brk(8);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = p3)();
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
}, null, null, [["2:2-2:27", "s", $s$2], ["2:2-2:26", "e", $s$2], ["3:2-3:7", "s", $s$2], ["3:2-3:6", "e", $s$2], ["4:2-4:7", "s", $s$2], ["4:2-4:6", "e", $s$2], ["10:2-10:30", "s", $s$2], ["10:2-10:29", "e", $s$2], ["11:2-11:7", "s", $s$2], ["11:2-11:6", "e", $s$2], ["12:2-12:7", "s", $s$2], ["12:2-12:6", "e", $s$2], [], [], []]);
$M.fun("m$2", "a", "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(3);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = console.log).dbg$call(console, "hi");
        continue;

      case 2:
        $.goto = 3;
        $M.brk(4);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = e1)();
        continue;

      case 4:
        $.goto = 5;
        $M.brk(5);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = e2)();
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
}, null, null, [["6:4-6:22", "s", $s$2], ["6:4-6:21", "e", $s$2], ["7:4-7:9", "s", $s$2], ["7:4-7:8", "e", $s$2], ["8:4-8:9", "s", $s$2], ["8:4-8:8", "e", $s$2], [], [], []]);
$M.fun("m$3", "b", "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(9);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = p4)();
        continue;

      case 2:
        $.goto = 3;
        $M.brk(10);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = p5)();
        continue;

      case 4:
        $.goto = 5;
        $M.brk(11);
        continue;

      case 5:
        $.goto = 6;
        $p = ($M.context.call = e1)();
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = M)($p);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(12);
        continue;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = e)(2);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = M)($p);
        continue;

      case 10:
        return $M.ret();

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["14:4-14:9", "s", $s$2], ["14:4-14:8", "e", $s$2], ["15:4-15:9", "s", $s$2], ["15:4-15:8", "e", $s$2], ["16:4-16:12", "s", $s$2], ["16:6-16:10", "e", $s$2], ["16:4-16:11", "e", $s$2], ["17:4-17:12", "s", $s$2], ["17:6-17:10", "e", $s$2], ["17:4-17:11", "e", $s$2], [], [], []]);
module.exports = $M.exports();