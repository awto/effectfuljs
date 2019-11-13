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
        if (true) {
          $.goto = 5;
          $M.brk(1);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        $M.brk(2);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = M.pure).dbg$call(M);
        continue;

      case 4:
        return $M.ret($p);

      case 5:
        1 + 1;
        $.goto = 2;
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:18", "s", $s$1], ["2:12-2:18", "s", $s$1], ["3:2-3:18", "s", $s$1], ["3:9-3:17", "e", $s$1], [], [], [], []]);
module.exports = $M.exports();