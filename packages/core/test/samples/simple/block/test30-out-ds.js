var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1",
  b: "$2"
}, $s$1, false],
    $s$3 = [{
  i: "$0"
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
        $.$.$2 = $c.b($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.$.$0 = 0;
        $.$.$1 = 0;
        $.goto = 2;
        $M.brk(4);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff3)($.$.$0, $.$.$1);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(5);
        continue;

      case 4:
        $M.lset($.$, "i", $.$.$0 + 1);
        $M.lset($.$, "j", $.$.$1 - 1);
        $.goto = 5;
        $M.brk(6);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = $.$.$2)($.$.$0);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(7);
        continue;

      case 7:
        $M.lset($.$, "i", $.$.$0 - 1);
        $M.lset($.$, "j", $.$.$1 + 1);
        $.goto = 8;
        $M.brk(8);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff4)($.$.$0, $.$.$1);
        continue;

      case 9:
        return $M.ret();

      case 10:
        return $M.ret($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-3:10", "s", $s$2], ["9:2-9:13", "s", $s$2], ["9:2-9:12", "e", $s$2], ["10:2-10:11", "s", $s$2], ["11:2-11:7", "s", $s$2], ["11:2-11:6", "e", $s$2], ["12:2-12:11", "s", $s$2], ["13:2-13:13", "s", $s$2], ["13:2-13:12", "e", $s$2], [], [], []]);
$M.fun("m$2", "b", "m$1", ["i"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff1)($.$.$0, $.$$.$.$1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(2);
        continue;

      case 3:
        $M.lset($.$, "i", $.$.$0 + 1);
        $M.lset($.$$.$, "j", $.$$.$.$1 + 1);
        $.goto = 4;
        $M.brk(3);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff2)($.$.$0, $.$$.$.$1);
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
}, null, null, [["5:4-5:15", "s", $s$3], ["5:4-5:14", "e", $s$3], ["6:4-6:13", "s", $s$3], ["7:4-7:15", "s", $s$3], ["7:4-7:14", "e", $s$3], [], [], []]);
module.exports = $M.exports();