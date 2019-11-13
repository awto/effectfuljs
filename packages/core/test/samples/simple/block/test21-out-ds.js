var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1"
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
  var $1, $0;

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
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $1 = $.$.$1;
        $M.lset($.$, "j", $1 + 1);
        $.goto = 3;
        ($M.context.call = eff0)($0, $1);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff1)($.$.$0);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(3);
        continue;

      case 6:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 7;
        $M.brk(4);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff2)(2, $.$.$1);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(5);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = eff3)($M.lset($.$, "i", $.$.$0 + 2), $.$.$1);
        continue;

      case 10:
        $.goto = 11;
        $M.brk(6);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = eff4)($.$.$1);
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
}, null, null, [["2:2-3:10", "s", $s$2], ["4:2-4:17", "s", $s$2], ["4:2-4:16", "e", $s$2], ["5:2-5:10", "s", $s$2], ["5:2-5:9", "e", $s$2], ["6:2-6:9", "s", $s$2], ["7:2-7:13", "s", $s$2], ["7:2-7:12", "e", $s$2], ["8:2-8:20", "s", $s$2], ["8:2-8:19", "e", $s$2], ["9:2-9:10", "s", $s$2], ["9:2-9:9", "e", $s$2], [], [], []]);
module.exports = $M.exports();