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
        $p = ($M.context.call = effb)(2);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)($p);
        continue;

      case 3:
        $.$.$0 = $p;
        $.goto = 4;
        $p = ($M.context.call = effc)(3);
        continue;

      case 4:
        5 + $.$.$0 + $p;
        return $M.ret();

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:29", "s", $s$1], ["2:10-2:17", "e", $s$1], ["2:6-2:18", "e", $s$1], ["2:21-2:28", "e", $s$1], [], [], []]);
module.exports = $M.exports();