var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1",
  b: "$2"
}, $s$1, false],
    $s$3 = [{
  i: "$0"
}, $s$2, false];
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
        $.$.$2 = $c.b($);
        $.$.$0 = 0;
        $.$.$1 = 0;
        $.goto = 1;
        ($M.context.call = eff3)($.$.$0, $.$.$1);
        continue;

      case 1:
        $.$.$0++;
        $.$.$1--;
        $.goto = 2;
        ($M.context.call = $.$.$2)($.$.$0);
        continue;

      case 2:
        $.$.$0--;
        $.$.$1++;
        $.goto = 3;
        ($M.context.call = eff4)($.$.$0, $.$.$1);
        continue;

      case 3:
        return $M.ret();

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["9:2-9:12", "e", $s$2], ["11:2-11:6", "e", $s$2], ["13:2-13:12", "e", $s$2], [], [], []]);
$M.fun("m$2", "b", "m$1", ["i"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff1)($.$.$0, $.$$.$.$1);
        continue;

      case 1:
        $.$.$0++;
        $.$$.$.$1++;
        $.goto = 2;
        ($M.context.call = eff2)($.$.$0, $.$$.$.$1);
        continue;

      case 2:
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["5:4-5:14", "e", $s$3], ["7:4-7:14", "e", $s$3], [], [], []]);
module.exports = $M.exports();