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
        $.$.$0 = 0;
        $.goto = 1;
        ($M.context.call = eff0)();
        continue;

      case 1:
        $.$.$0 += 2;
        $.goto = 2;
        ($M.context.call = effM)();
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = effN)();
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = effI1)(++$.$.$0);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff2)($p);
        continue;

      case 5:
        $.$.$1 = $p;
        $.$.$2 = $.$.$0++;
        $.goto = 6;
        $p = ($M.context.call = eff3)($.$.$0);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff1)($.$.$1, $.$.$2, $p);
        continue;

      case 7:
        $.goto = 8;
        $p = ($M.context.call = effN)();
        continue;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = effI)($p);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = effM)($p);
        continue;

      case 10:
        $.goto = 11;
        $p = ($M.context.call = effI)();
        continue;

      case 11:
        $.$.$1 = $p;
        $.goto = 12;
        $p = ($M.context.call = effJ)();
        continue;

      case 12:
        $.goto = 13;
        ($M.context.call = eff4)($.$.$1, $p);
        continue;

      case 13:
        $.goto = 14;
        ($M.context.call = eff5)();
        continue;

      case 14:
        return $M.ret();

      case 15:
        return $M.ret($.value);

      case 16:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-3:8", "e", $s$2], ["5:2-5:8", "e", $s$2], ["6:2-6:8", "e", $s$2], ["7:12-7:22", "e", $s$2], ["7:7-7:23", "e", $s$2], ["7:30-7:37", "e", $s$2], ["7:2-7:38", "e", $s$2], ["8:12-8:18", "e", $s$2], ["8:7-8:19", "e", $s$2], ["8:2-8:20", "e", $s$2], ["9:7-9:13", "e", $s$2], ["9:15-9:21", "e", $s$2], ["9:2-9:22", "e", $s$2], ["10:2-10:8", "e", $s$2], [], [], []]);
module.exports = $M.exports();