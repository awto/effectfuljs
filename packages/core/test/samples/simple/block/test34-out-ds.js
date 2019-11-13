var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false];
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
        ($M.context.call = eff)(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)(2);
        continue;

      case 4:
        if ($p) {
          $.goto = 6;
          $M.brk(2);
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        return $M.ret();

      case 6:
        $.goto = 7;
        ($M.context.call = eff3)();
        continue;

      case 7:
        $.goto = 8;
        $M.brk(3);
        continue;

      case 8:
        $.goto = 5;
        ($M.context.call = eff4)();
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:9", "s", $s$1], ["2:2-2:8", "e", $s$1], ["3:2-6:3", "s", $s$1], ["3:6-3:12", "e", $s$1], ["4:4-4:11", "s", $s$1], [], ["4:4-4:10", "e", $s$1], ["5:4-5:11", "s", $s$1], ["5:4-5:10", "e", $s$1], [], []]);
module.exports = $M.exports();