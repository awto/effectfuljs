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
        ($M.context.call = eff0)();
        continue;

      case 1:
        $.$.$0 = 0;
        $.$.$0++;
        $.goto = 2;
        ($M.context.call = eff1)($.$.$0);
        continue;

      case 2:
        $.$.$0++;

        if (t) {
          $.goto = 5;
          ($M.context.call = eff2)($.$.$0);
          continue;
        } else {
          $.$.$0++;
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        ($M.context.call = eff5)($.$.$0);
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.$.$0++;
        $.goto = 3;
        ($M.context.call = eff4)($.$.$0);
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:8", "e", $s$2], ["5:2-5:9", "e", $s$2], ["8:4-8:11", "e", $s$2], ["14:2-14:9", "e", $s$2], [], ["10:4-10:11", "e", $s$2], [], []]);
module.exports = $M.exports();