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
        ($M.context.call = eff0)($.$.$0);
        continue;

      case 1:
        $.$.$0++;
        $.goto = 2;
        ($M.context.call = eff1)($.$.$0);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff1)($.$.$0);
        continue;

      case 3:
        $.$.$0++;
        $.goto = 4;
        ($M.context.call = eff1)($.$.$0);
        continue;

      case 4:
        return $M.ret();

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-3:9", "e", $s$2], ["5:2-5:9", "e", $s$2], ["6:2-6:9", "e", $s$2], ["8:2-8:9", "e", $s$2], [], [], []]);
module.exports = $M.exports();