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
        ($M.context.call = p1)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = p2)();
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = e1)();
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = M)($p);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = e)(2);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = M)($p);
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
}, null, null, [["2:2-2:6", "e", $s$1], ["3:2-3:6", "e", $s$1], ["4:4-4:8", "e", $s$1], ["4:2-4:9", "e", $s$1], ["5:4-5:8", "e", $s$1], ["5:2-5:9", "e", $s$1], [], [], []]);
module.exports = $M.exports();