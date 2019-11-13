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
        $.$.$0 = 0;
        $.goto = 2;
        $M.brk(1);
        continue;

      case 2:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 3;
        $M.brk(2);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff1)($.$.$0);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(3);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(4);
        continue;

      case 7:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 8;
        $M.brk(5);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff2)($.$.$0);
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
}, null, null, [["2:2-2:12", "s", $s$2], ["4:4-4:8", "s", $s$2], ["5:4-5:12", "s", $s$2], ["5:4-5:11", "e", $s$2], ["7:2-7:9", "s", $s$2], ["7:2-7:8", "e", $s$2], ["9:4-9:8", "s", $s$2], ["12:4-12:12", "s", $s$2], ["12:4-12:11", "e", $s$2], [], [], []]);
module.exports = $M.exports();