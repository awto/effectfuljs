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
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$2 = 0;
        $.goto = 1;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)($.$.$0++, $.$.$1 = 1);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)($.$.$1++, $.$.$2++);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)($.$.$1 = 3);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)($.$.$1);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 7:
        return $M.ret();

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:2-4:8", "e", $s$2], ["5:2-5:19", "e", $s$2], ["6:2-6:15", "e", $s$2], ["7:2-7:8", "e", $s$2], ["8:2-8:14", "e", $s$2], ["9:2-9:8", "e", $s$2], ["10:2-10:8", "e", $s$2], [], [], []]);
module.exports = $M.exports();