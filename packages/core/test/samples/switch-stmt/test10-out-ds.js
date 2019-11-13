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
        $.goto = 3;
        ($M.context.call = eff)();
        continue;

      case 3:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 5;
        $M.brk(3);
        continue;

      case 5:
        switch ($M.lset($.$, "i", $.$.$0 + 2)) {
          case 1:
            $.goto = 14;
            $M.brk(4);
            continue;

          case 2:
            $.goto = 6;
            continue;

          case 3:
            $.goto = 7;
            continue;

          default:
            $.goto = 8;
            continue;
        }

      case 6:
        $.goto = 12;
        $M.brk(6);
        continue;

      case 7:
        $.goto = 11;
        $M.brk(8);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(9);
        $.state = 9;

      case 9:
        $.goto = 10;
        ($M.context.call = eff)($.$.$0);
        $.state = 10;

      case 10:
        return $M.ret();

      case 11:
        $.goto = 8;
        $M.mcall("log", console, "hi", $.$.$0);
        continue;

      case 12:
        $.goto = 13;
        ($M.context.call = effB)($.$.$0);
        $.state = 13;

      case 13:
        $.goto = 8;
        $M.brk(7);
        continue;

      case 14:
        $.goto = 15;
        ($M.context.call = effB)($M.lset($.$, "i", $.$.$0 + 3));
        $.state = 15;

      case 15:
        $.goto = 8;
        $M.brk(5);
        continue;

      case 16:
        return $M.ret($.value);

      case 17:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:12", "s", $s$2], ["3:2-3:8", "s", $s$2], ["3:2-3:7", "e", $s$2], ["4:2-4:9", "s", $s$2], ["5:2-14:3", "s", $s$2], ["7:6-7:21", "s", $s$2], ["10:6-10:14", "s", $s$2], ["13:6-13:27", "s", $s$2], ["15:2-15:9", "s", $s$2], ["15:2-15:8", "e", $s$2], [], ["13:6-13:26", "e", $s$2], ["10:6-10:13", "e", $s$2], ["11:6-11:12", "s", $s$2], ["7:6-7:20", "e", $s$2], ["8:6-8:12", "s", $s$2], [], []]);
module.exports = $M.exports();