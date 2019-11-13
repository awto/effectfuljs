var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1"
}, $s$1, false],
    $s$3 = [{
  b: "$0",
  i: "$1",
  k: "$2",
  z: "$3"
}, $s$2, false];
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
        $.$.$0 = 0;
        $.$.$1 = 0;
        $.goto = 2;
        $M.brk(1);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff1)($.$.$0, $.$.$1);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        $M.lset($.$, "i", $.$.$0 + 1);
        $M.lset($.$, "j", $.$.$1 + 1);
        $.goto = 5;
        $M.brk(3);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = $c.b($))($.$.$0, $.$.$1);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(9);
        continue;

      case 7:
        $M.lset($.$, "i", $.$.$0 + 1);
        $M.lset($.$, "j", $.$.$1 + 1);
        $.goto = 8;
        $M.brk(10);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff5)($.$.$0, $.$.$1);
        continue;

      case 9:
        $.goto = 10;
        $M.brk(11);
        continue;

      case 10:
        $.goto = 11;
        ($M.context.call = eff6)($.$.$0, $.$.$1);
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
}, null, null, [["2:2-3:10", "s", $s$2], ["4:2-4:13", "s", $s$2], ["4:2-4:12", "e", $s$2], ["5:2-5:11", "s", $s$2], ["6:2-12:11", "s", $s$2], ["6:2-12:10", "e", $s$2], ["13:2-13:11", "s", $s$2], ["14:2-14:13", "s", $s$2], ["14:2-14:12", "e", $s$2], ["15:2-15:13", "s", $s$2], ["15:2-15:12", "e", $s$2], [], [], []]);
$M.fun("m$2", "b", "m$1", ["i", "k"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(4);
        continue;

      case 1:
        $.$.$3 = 0;
        $.goto = 2;
        $M.brk(5);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff2)($.$.$1, $.$$.$.$1, $.$.$2, $.$.$3);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(6);
        continue;

      case 4:
        $M.lset($.$, "i", $.$.$1 + 1);
        $M.lset($.$$.$, "j", $.$$.$.$1 + 1);
        $M.lset($.$, "k", $.$.$2 + 1);
        $M.lset($.$, "z", $.$.$3 + 1);
        $.goto = 5;
        $M.brk(7);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff3)($.$.$1, $.$$.$.$1, $.$.$2, $.$.$3);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(8);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff4)($.$.$1, $.$$.$.$1, $.$.$2, $.$.$3);
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
}, null, null, [["7:4-7:14", "s", $s$3], ["8:4-8:21", "s", $s$3], ["8:4-8:20", "e", $s$3], ["9:4-9:23", "s", $s$3], ["10:4-10:21", "s", $s$3], ["10:4-10:20", "e", $s$3], ["11:4-11:21", "s", $s$3], ["11:4-11:20", "e", $s$3], [], [], []]);
module.exports = $M.exports();