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
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = 0;
        $.$.$1 = 0;
        $.goto = 1;
        ($M.context.call = eff0)($.$.$0, $.$.$1);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff1)($.$.$0++, $.$.$1++);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff2)($.$.$0);
        continue;

      case 3:
        $.$.$0 += 1;
        $.goto = 4;
        ($M.context.call = eff3)(2, $.$.$1);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff4)($.$.$0 += 2, $.$.$1);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff5)($.$.$1);
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:2-4:12", "e", $s$2], ["5:2-5:16", "e", $s$2], ["6:2-6:9", "e", $s$2], ["8:2-8:12", "e", $s$2], ["9:2-9:19", "e", $s$2], ["10:2-10:9", "e", $s$2], [], [], []]);
module.exports = $M.exports();