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
        $.goto = 2;
        $p = ($M.context.call = read1)();
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(2);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = write)($.$.$0);
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
}, null, null, [["2:2-2:18", "s", $s$2], ["2:10-2:17", "e", $s$2], ["3:2-3:9", "s", $s$2], ["3:2-3:8", "e", $s$2], ["4:2-4:11", "s", $s$2], ["4:2-4:10", "e", $s$2], [], [], []]);
module.exports = $M.exports();