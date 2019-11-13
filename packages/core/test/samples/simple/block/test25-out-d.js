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
        $M.brk(1);
        continue;

      case 2:
        if (ee) {
          $.goto = 7;
          $M.brk(2);
          continue;
        } else {
          $.goto = 3;
          $M.brk(4);
          continue;
        }

      case 3:
        $.goto = 4;
        ($M.context.call = eff1)($.$.$0++);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(5);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff2)($.$.$0++);
        continue;

      case 6:
        return $M.ret();

      case 7:
        $.goto = 8;
        ($M.context.call = eff1)($.$.$0++);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(3);
        continue;

      case 9:
        $.goto = 6;
        ($M.context.call = eff2)($.$.$0++);
        continue;

      case 10:
        return $M.ret($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:8", "s", $s$2], ["3:2-9:3", "s", $s$2], ["4:4-4:14", "s", $s$2], ["7:4-7:13", "e", $s$2], ["8:4-8:14", "s", $s$2], ["8:4-8:13", "e", $s$2], [], ["4:4-4:13", "e", $s$2], ["5:4-5:14", "s", $s$2], ["5:4-5:13", "e", $s$2], [], []]);
module.exports = $M.exports();