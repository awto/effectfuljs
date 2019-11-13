var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1",
  k: "$2"
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
        $.$.$1 = 0;
        $.$.$2 = 0;
        $.goto = 2;
        $M.brk(1);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)($.$.$0, $.$.$1, $.$.$2);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
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
        $.goto = 8;
        $M.brk(5);
        continue;

      case 8:
        $M.lset($.$, "k", 10);
        $.goto = 9;
        $M.brk(6);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = eff2)();
        continue;

      case 10:
        $.goto = 11;
        $M.brk(7);
        continue;

      case 11:
        $.goto = 12;
        $M.brk(8);
        continue;

      case 12:
        $.goto = 11;
        ($M.context.call = eff4)($.$.$2, $.$.$1);
        continue;

      case 13:
        return $M.ret($.value);

      case 14:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-4:10", "s", $s$2], ["5:2-5:15", "s", $s$2], ["5:2-5:14", "e", $s$2], ["6:2-19:3", "s", $s$2], ["7:4-7:12", "s", $s$2], ["7:4-7:11", "e", $s$2], ["8:4-18:5", "s", $s$2], ["9:6-9:13", "s", $s$2], ["10:6-10:13", "s", $s$2], ["10:6-10:12", "e", $s$2], ["11:6-13:7", "s", $s$2], ["12:8-12:19", "s", $s$2], ["12:8-12:18", "e", $s$2], [], []]);
module.exports = $M.exports();