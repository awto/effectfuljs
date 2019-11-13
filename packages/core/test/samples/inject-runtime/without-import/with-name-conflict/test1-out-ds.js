var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  M: "$0",
  a: "$1"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.a($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.$.$0 = 10;
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:11", "s", $s$1], [], [], []]);
$M.fun("m$1", "a", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
        continue;

      case 1:
        $.goto = 2;
        $M.yld(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(2);
        continue;

      case 3:
        $.goto = 4;
        $M.yld(2);
        continue;

      case 4:
        return $M.retG();

      case 5:
        return $M.retG($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-3:10", "s", $s$1], [null, null, null], ["4:2-4:10", "s", $s$1], [null, null, null], [], [], []]);
module.exports = $M.exports();