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
        ($M.context.call = eff1)();
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        if ($.$$.$.$0) {
          $.goto = 7;
          $M.brk(2);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.goto = 5;
        $M.brk(3);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff6)();
        continue;

      case 6:
        return $M.ret();

      case 7:
        $.goto = 8;
        $p = ($M.context.call = eff5)(5);
        continue;

      case 8:
        return $M.ret($p);

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:9", "s", $s$1], ["2:2-2:8", "e", $s$1], ["3:2-3:24", "s", $s$1], ["3:9-3:24", "s", $s$1], ["4:2-4:9", "s", $s$1], ["4:2-4:8", "e", $s$1], [], ["3:16-3:23", "e", $s$1], [], [], []]);
module.exports = $M.exports();