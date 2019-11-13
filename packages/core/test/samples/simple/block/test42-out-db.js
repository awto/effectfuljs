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
        ($M.context.call = eff1)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff2)();
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff3)();
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)(4);
        continue;

      case 4:
        if ($p) {
          $.state = 5;
        } else {
          return $M.ret();
        }

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(5);
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
}, null, null, [["2:2-2:8", "e", $s$1], ["3:2-3:8", "e", $s$1], ["5:4-5:10", "e", $s$1], ["6:8-6:14", "e", $s$1], [], ["9:2-9:8", "e", $s$1], [], [], []]);
module.exports = $M.exports();