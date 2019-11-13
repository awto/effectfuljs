var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1"
}, $s$1, false],
    $s$3 = [{
  b: "$0",
  i: "$1",
  k: "$2",
  z: "$3"
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
        $.$.$0 = 0;
        $.$.$1 = 0;
        $.goto = 1;
        ($M.context.call = eff1)($.$.$0, $.$.$1);
        continue;

      case 1:
        $.$.$0++;
        $.$.$1++;
        $.goto = 2;
        ($M.context.call = $c.b($))($.$.$0, $.$.$1);
        continue;

      case 2:
        $.$.$0++;
        $.$.$1++;
        $.goto = 3;
        ($M.context.call = eff5)($.$.$0, $.$.$1);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff6)($.$.$0, $.$.$1);
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
}, null, null, [["4:2-4:12", "e", $s$2], ["6:2-12:10", "e", $s$2], ["14:2-14:12", "e", $s$2], ["15:2-15:12", "e", $s$2], [], [], []]);
$M.fun("m$2", "b", "m$1", ["i", "k"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$3 = 0;
        $.goto = 1;
        ($M.context.call = eff2)($.$.$1, $.$$.$.$1, $.$.$2, $.$.$3);
        continue;

      case 1:
        $.$.$1++;
        $.$$.$.$1++;
        $.$.$2++;
        $.$.$3++;
        $.goto = 2;
        ($M.context.call = eff3)($.$.$1, $.$$.$.$1, $.$.$2, $.$.$3);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff4)($.$.$1, $.$$.$.$1, $.$.$2, $.$.$3);
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
}, null, null, [["8:4-8:20", "e", $s$3], ["10:4-10:20", "e", $s$3], ["11:4-11:20", "e", $s$3], [], [], []]);
module.exports = $M.exports();