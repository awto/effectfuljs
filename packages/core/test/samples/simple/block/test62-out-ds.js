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
$M.fun("m$1", "a", "m$0", ["i"], 0, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.$.$2 = 0;
        $.goto = 2;
        $M.brk(1);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 5;
        ($M.context.call = eff)($0, $M.lset($.$, "j", 1));
        continue;

      case 5:
        $.goto = 6;
        $M.brk(3);
        continue;

      case 6:
        $0 = $.$.$1;
        $M.lset($.$, "j", $0 + 1);
        $1 = $.$.$2;
        $M.lset($.$, "k", $1 + 1);
        $.goto = 7;
        ($M.context.call = eff)($0, $1);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(4);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 9:
        $.goto = 10;
        $M.brk(5);
        continue;

      case 10:
        $.goto = 11;
        ($M.context.call = eff)($M.lset($.$, "j", 3));
        continue;

      case 11:
        $.goto = 12;
        $M.brk(6);
        continue;

      case 12:
        $.goto = 13;
        ($M.context.call = eff)($.$.$1);
        continue;

      case 13:
        $.goto = 14;
        $M.brk(7);
        continue;

      case 14:
        $.goto = 15;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 15:
        return $M.ret();

      case 16:
        return $M.ret($.value);

      case 17:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-3:10", "s", $s$2], ["4:2-4:9", "s", $s$2], ["4:2-4:8", "e", $s$2], ["5:2-5:20", "s", $s$2], ["5:2-5:19", "e", $s$2], ["6:2-6:16", "s", $s$2], ["6:2-6:15", "e", $s$2], ["7:2-7:9", "s", $s$2], ["7:2-7:8", "e", $s$2], ["8:2-8:15", "s", $s$2], ["8:2-8:14", "e", $s$2], ["9:2-9:9", "s", $s$2], ["9:2-9:8", "e", $s$2], ["10:2-10:9", "s", $s$2], ["10:2-10:8", "e", $s$2], [], [], []]);
module.exports = $M.exports();