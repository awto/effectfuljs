var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0"
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
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff0)();
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.$.$0 = 0;
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        $.$.$0++;
        $.goto = 5;
        $M.brk(3);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff1)($.$.$0);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(4);
        continue;

      case 7:
        $.$.$0++;
        $.goto = 8;
        $M.brk(5);
        continue;

      case 8:
        if (t) {
          $.goto = 13;
          $M.brk(6);
          continue;
        } else {
          $.goto = 9;
          $M.brk(9);
          continue;
        }

      case 9:
        t;
        $.state = 10;

      case 10:
        $.goto = 11;
        $M.brk(10);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = eff5)($.$.$0);
        continue;

      case 12:
        return $M.ret();

      case 13:
        $.goto = 14;
        ($M.context.call = eff2)($.$.$0);
        continue;

      case 14:
        $.goto = 15;
        $M.brk(7);
        continue;

      case 15:
        $.$.$0++;
        $.goto = 16;
        $M.brk(8);
        continue;

      case 16:
        $.goto = 10;
        ($M.context.call = eff4)($.$.$0);
        continue;

      case 17:
        return $M.ret($.value);

      case 18:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:9", "s", $s$2], ["2:2-2:8", "e", $s$2], ["3:2-3:12", "s", $s$2], ["4:2-4:6", "s", $s$2], ["5:2-5:10", "s", $s$2], ["5:2-5:9", "e", $s$2], ["6:2-6:6", "s", $s$2], ["7:2-13:3", "s", $s$2], ["8:4-8:12", "s", $s$2], [], ["14:2-14:10", "s", $s$2], ["14:2-14:9", "e", $s$2], [], ["8:4-8:11", "e", $s$2], ["9:4-9:8", "s", $s$2], ["10:4-10:12", "s", $s$2], ["10:4-10:11", "e", $s$2], [], []]);
module.exports = $M.exports();